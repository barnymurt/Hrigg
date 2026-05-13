"""
HIIP — Hazelrigg Intelligent Inventory Parser
Takes a URL, fetches the view-source HTML, extracts structured listing data
and templates it for the Hazelrigg site format.

Sources supported:
- hrowen.co.uk (JSON-LD schema via requests)
- controller.com (React hydration via Playwright with persistent profile)
- gasengineexchange.com (__NEXT_DATA__ extraction via Sanity CMS)

New domains are auto-detected and can be onboarded via hiip_onboard.py

Key extraction patterns:
- __NEXT_DATA__: Next.js apps embed rich structured data in <script id="__NEXT_DATA__">
  Always check for this before regex-parsing HTML.
- /_next/image src: Next.js proxies images through /_next/image?url=... in HTML.
  Decode ?url= param to get the original CDN URL.
- Sanity CMS refs: image-{hash}-{dims}.{ext} in __NEXT_DATA__ → cdn.sanity.io CDN reconstruction
- OG image is only the FIRST image, not the full gallery.
- Strip query params from filenames on Windows to avoid EINVAL errors.
"""

import re
import json
import sys
import time
import os

try:
    import requests
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests", "-q"])
    import requests

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright", "-q"])
    from playwright.sync_api import sync_playwright

from urllib.parse import urlparse

REGISTRY_PATH = "C:\\Dev\\Hazelrigg\\website proposal\\test_hiip\\domain_registry.json"
PROFILES_BASE = "C:\\Dev\\Hazelrigg\\website proposal\\test_hiip\\profiles"


def load_registry():
    if os.path.exists(REGISTRY_PATH):
        with open(REGISTRY_PATH, 'r') as f:
            return json.load(f)
    return {}


def get_domain(url):
    return urlparse(url).netloc


def get_profile_path(domain):
    safe = domain.replace('.', '_')
    return os.path.join(PROFILES_BASE, safe)


def get_domain_config(url):
    """Get fetch strategy and profile for a domain from registry."""
    registry = load_registry()
    domain = get_domain(url)
    entry = registry.get(domain, {})

    if entry.get('status') == 'active':
        return {
            'strategy': entry.get('fetch_strategy', 'requests'),
            'profile_path': entry.get('profile_path'),
            'extractor': entry.get('extractor', 'auto'),
        }
    return {'strategy': 'requests', 'profile_path': None, 'extractor': 'auto'}


def extract_year_from_title(title):
    match = re.search(r'\b(19[0-9]\d|20[0-2]\d)\b', title)
    return match.group(1) if match else ""


def extract_fuel_from_url(url):
    url_lower = url.lower()
    if 'petrol-parallel-phev' in url_lower or 'parallel-phev' in url_lower:
        return "Petrol Parallel PHEV"
    if 'plug-in-hybrid' in url_lower or 'plug-in' in url_lower or 'phev' in url_lower:
        return "Plug-in Hybrid"
    if 'hybrid' in url_lower:
        return "Hybrid"
    if 'electric' in url_lower or '-ev-' in url_lower or '/ev/' in url_lower:
        return "Electric"
    if 'diesel' in url_lower:
        return "Diesel"
    if 'petrol' in url_lower:
        return "Petrol"
    return ""


def fetch_view_source(url):
    """Fetch HTML using the appropriate strategy for this domain."""
    config = get_domain_config(url)
    domain = get_domain(url)

    # Try requests first (works for most non-protected sites)
    if config['strategy'] != 'playwright_persistent':
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-GB,en;q=0.9',
        }
        try:
            response = requests.get(url, headers=headers, timeout=15)
            blocked_phrases = ["Pardon Our Interruption", "Distil", "Access Denied", "403 Forbidden"]
            if response.status_code == 200 and not any(p in response.text for p in blocked_phrases):
                return response.text, response.status_code
        except Exception:
            pass

    # Fall back to Playwright with persistent profile
    profile_path = config.get('profile_path') or get_profile_path(domain)

    return fetch_with_playwright(url, profile_path)


def fetch_with_playwright(url, profile_path=None):
    """Fetch using Playwright with persistent profile for Distil-protected sites."""
    if profile_path is None:
        profile_path = get_profile_path(get_domain(url))

    try:
        with sync_playwright() as p:
            context = p.chromium.launch_persistent_context(
                user_data_dir=profile_path,
                headless=True,
                args=[
                    '--disable-blink-features=AutomationControlled',
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--disable-extensions',
                    '--disable-plugins',
                ],
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                viewport={'width': 1440, 'height': 900},
                ignore_https_errors=True,
                accept_downloads=False,
            )
            page = context.pages[0] if context.pages else context.new_page()
            # For controller.com, warm up on the homepage first
            domain = get_domain(url)
            if 'controller' in domain:
                page.goto('https://www.controller.com/', wait_until='networkidle', timeout=15000)
            page.goto(url, wait_until='domcontentloaded', timeout=30000)
            time.sleep(15)
            html = page.content()
            context.close()

            # Detect stale profile (got challenge page despite having a profile)
            if len(html) < 10_000 or "Pardon Our Interruption" in html:
                print(f"  ⚠ Profile may be stale for {domain} — consider re-onboarding")
            return html, 200
    except Exception as e:
        return f"Error: {e}", None


def extract_json_ld(html):
    """Extract Schema.org JSON-LD data (Car, Product, Offer, Aircraft)."""
    listings = []
    pattern = r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
    matches = re.findall(pattern, html, re.DOTALL | re.IGNORECASE)

    for match in matches:
        try:
            data = json.loads(match.strip())
            if isinstance(data, dict) and "@graph" in data:
                for item in data.get("@graph", []):
                    if item.get("@type") in ["Car", "Product", "Offer", "Aircraft"]:
                        listings.append(item)
            elif isinstance(data, list):
                for item in data:
                    if item.get("@type") in ["Car", "Product", "Offer", "Aircraft"]:
                        listings.append(item)
            elif isinstance(data, dict) and data.get("@type") in ["Car", "Product", "Offer", "Aircraft"]:
                listings.append(data)
        except (json.JSONDecodeError, Exception):
            continue
    return listings


def extract_from_sandhills(html):
    """Extract listing data from the React hydration script (Controller.com)."""
    result = {}

    scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
    react_script = None
    for s in scripts:
        if len(s) > 10000 and 'loadableReady' in s:
            react_script = s
            break

    if not react_script:
        return result

    mfr = re.search(r'"Manufacturer"\s*:\s*"([^"]+)"', react_script)
    model = re.search(r'"Model"\s*:\s*"([^"]+)"', react_script)
    year_m = re.search(r'"Specs"\s*:\s*\{[^}]*?"Year"\s*:\s*\{[^}]*?"Value"\s*:\s*"(\d{4})"', react_script)
    time_m = re.search(r'"TotalTime"\s*:\s*\{[^}]*?"Value"\s*:\s*"([\d,]+)"', react_script)
    location = re.search(r'"FormattedLocation"\s*:\s*"([^"]+)"', react_script)
    seller = re.search(r'"SellerName"\s*:\s*"([^"]+)"', react_script)

    media_ids = re.findall(r'"DisplayImageMediaId"\s*:\s*(\d+)', react_script)

    # Extract full Sandhills image URLs from HTML (with checksum) instead of building from media ID
    import html as html_module
    raw_urls = re.findall(r'https://media\.sandhills\.com/img\.axd\?[^"\'<>\s]+', html)
    full_urls = list(dict.fromkeys(html_module.unescape(u) for u in raw_urls))
    if full_urls:
        result['images'] = full_urls[:20]
    elif media_ids:
        base = 'https://media.sandhills.com/img.axd?id={id}&wid=4326165471&rwl=False&p=&ext=&w=614&h=460&t=&lp=&c=True&wt=False&sz=Max&rt=0'
        img_list = []
        for mid in media_ids:
            img_list.append(base.format(id=mid))
        result['images'] = img_list

    if mfr:
        result['make'] = mfr.group(1)
    if model:
        result['model'] = model.group(1)
    if year_m:
        result['year'] = year_m.group(1)
    if time_m:
        result['mileage'] = time_m.group(1)
    if location:
        result['location'] = location.group(1)
    if seller:
        result['dealer'] = seller.group(1)

    options_match = re.search(r'"Options"\s*:\s*\[(.*?)\]', react_script, re.DOTALL)
    if options_match:
        opts = re.findall(r'"Value"\s*:\s*"([^"]+)"', options_match.group(1))
        if opts:
            result['description'] = ' '.join(opts[:30])

    # Fallback: extract description from HTML div if not in React script
    if not result.get('description'):
        result['description'] = extract_description_from_html(html)

    return result


def extract_from_gasengineexchange(html, url):
    """Extract listing data from gasengineexchange.com using __NEXT_DATA__."""
    result = {}

    next_data_match = re.search(r'<script[^>]*id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
    if not next_data_match:
        return result

    try:
        next_data = json.loads(next_data_match.group(1))
    except json.JSONDecodeError:
        return result

    props = next_data.get('props', {})
    page_props = props.get('pageProps', {})
    product = page_props.get('product', {})

    if not product:
        return result

    result['title'] = product.get('title', '') or product.get('titleseo', '')
    result['make'] = (product.get('brandNames') or [''])[0] if product.get('brandNames') else ''
    model_raw = product.get('model', '') or ''
    if not model_raw and result.get('title'):
        title = result['title']
        model_match = re.search(r'\b(G\d{4}[A-Z]?|J\d{3}[A-Z]?|TCG\d{4}|G\d{2}[A-Z]{2}|OC-\d+|J416|J616|2G[-\s]\w+|AGENITOR|canopy)\b', title, re.IGNORECASE)
        if model_match:
            model_raw = model_match.group(0)
    result['model'] = model_raw

    kw_raw = product.get('kw', '')
    result['power'] = f"{kw_raw} kW" if kw_raw else ''

    result['year'] = str(product.get('year', '')) if product.get('year') else ''
    result['hours'] = str(product.get('hour', '')) if product.get('hour') not in (None, '') else ''

    volt = product.get('volt', '')
    result['voltage'] = f"{volt} V" if volt else ''

    hz = product.get('hz', '')
    result['frequency'] = f"{hz} Hz" if hz else ''

    condition_raw = product.get('condition', '')
    if condition_raw == 'NewCondition':
        result['condition'] = 'New'
    elif condition_raw == 'UsedCondition':
        result['condition'] = 'Used'
    else:
        result['condition'] = condition_raw

    result['fuel_type'] = 'Natural Gas'

    unit_count = product.get('unit', '')
    if unit_count and int(unit_count) > 1:
        result['units'] = unit_count

    result['sku'] = product.get('sku', '')

    def render_sanity_blocks(obj):
        if isinstance(obj, str):
            return obj
        if isinstance(obj, list):
            return '\n'.join(render_sanity_blocks(item) for item in obj if render_sanity_blocks(item))
        if isinstance(obj, dict):
            children = obj.get('children', [])
            if children:
                return ''.join(c.get('text', '') for c in children if isinstance(c, dict))
        return ''

    desc_parts = []
    scope = product.get('scope', [])
    if scope:
        scope_text = render_sanity_blocks(scope)
        if scope_text:
            desc_parts.append(scope_text)

    inspection = page_props.get('inspection', '')
    if inspection:
        desc_parts.append(inspection)

    full_desc = product.get('description', '')
    if full_desc:
        desc_parts.append(full_desc)

    if not desc_parts:
        excerpt = product.get('excerpt', '')
        if excerpt:
            desc_parts.append(excerpt)

    result['description'] = '\n'.join(desc_parts)

    images = extract_sanity_images_from_ref(product)

    if images:
        result['images'] = images[:20]

    return result


def extract_description_from_html(html):
    """Extract description from HTML div for sites like controller.com where content is in DOM."""
    # controller.com uses: <div class="detail__specs-value">Description text here</div>
    # Multiple divs exist — find the one with multi-line content (the description/options list)
    matches = re.findall(r'<div[^>]*class="detail__specs-value"[^>]*>(.*?)</div>', html, re.DOTALL | re.IGNORECASE)
    for m in matches:
        # Clean HTML tags
        text = re.sub(r'<[^>]+>', ' ', m)
        text = re.sub(r'\s+', ' ', text).strip()
        # Description div has embedded newlines between options (not the short spec values)
        if '\r\n' in m or '\\n' in m or len(text) > 100:
            # Replace HTML entity &amp; with &
            text = text.replace('&amp;', '&')
            return text
    return ""


def extract_description_meta(html):
    """Extract description from HTML meta tags (Open Graph or standard meta description)."""
    for pattern in [
        r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:description["\']',
        r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']',
    ]:
        m = re.search(pattern, html, re.IGNORECASE)
        if m:
            return m.group(1).strip()
    return ""


def extract_nextjs_image_src(src_attr: str) -> str | None:
    """
    Decode a /_next/image?url=... src attribute to get the original CDN URL.
    Next.js proxies images through /_next/image in HTML, not direct CDN URLs.
    """
    from urllib.parse import unquote, parse_qs, urlparse
    try:
        qs = parse_qs(urlparse(src_attr).query)
        encoded_url = qs.get('url', [''])[0]
        if encoded_url:
            return unquote(encoded_url)
    except Exception:
        pass
    return None


def extract_sanity_images_from_ref(product: dict, project_id: str = 'bf1z1gj3') -> list:
    """
    Extract CDN image URLs from a Sanity CMS product.images array.
    Ref format: image-{hash}-{dims}.{ext}  e.g. image-2262ea54a34d10eaa5028c98cbd384dcbc4a5a0e-1600x1200-jpg
    Reconstruct: https://cdn.sanity.io/images/{project}/production/{hash}-{dims}.{ext}
    """
    images = []
    raw_images = product.get('images', [])
    for img in raw_images:
        if isinstance(img, dict):
            asset = img.get('asset', {})
            ref = asset.get('_ref', '') if isinstance(asset, dict) else ''
            if ref and ref.startswith('image-'):
                parts = ref.replace('image-', '').rsplit('-', 1)
                if len(parts) == 2:
                    hash_dims, ext = parts
                    cdn_url = f"https://cdn.sanity.io/images/{project_id}/production/{hash_dims}.{ext}"
                    images.append(cdn_url)
        elif isinstance(img, str) and img:
            images.append(img)
    return images[:20]


def extract_all_images_from_html(html: str) -> list:
    """
    Extract all possible image URLs from HTML, in priority order:
    1. /_next/image?url=... src attributes (Next.js proxy URLs)
    2. cdn.sanity.io direct URLs (Sanity CDN)
    3. cdn.ironpla.net (Ritchie Bros)
    4. media.sandhills.com (Sandhills/Controller)
    5. og:image meta tag
    Returns deduplicated list of absolute image URLs.
    """
    import html as html_module
    urls = set()

    # 1. /_next/image src attributes — decode proxy URLs
    src_matches = re.findall(r'src="(/_next/image\?[^"]+)"', html)
    for src in src_matches:
        decoded = extract_nextjs_image_src(src)
        if decoded:
            urls.add(decoded)

    # 2. Direct Sanity CDN URLs
    sanity_matches = re.findall(r'https://cdn\.sanity\.io/images/[^"\'<>\s]+', html)
    urls.update(sanity_matches)

    # 3. Ritchie Bros cdn.ironpla.net
    ironpla_matches = re.findall(r'https://cdn\.ironpla\.net/[^"\'<>\s]+', html)
    urls.update(ironpla_matches)

    # 4. Sandhills media.sandhills.com (with checksum in URL)
    sandhills_matches = re.findall(r'https://media\.sandhills\.com/img\.axd\?[^"\'<>\s]+', html)
    unescaped = [html_module.unescape(u) for u in sandhills_matches]
    urls.update(unescaped)

    # 5. OG image (only one — use as last resort, not full gallery)
    og_match = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not og_match:
        og_match = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', html, re.IGNORECASE)
    if og_match and og_match.group(1).startswith('http'):
        urls.add(og_match.group(1))

    return list(urls)


def safe_filename_from_url(url: str, index: int = 0) -> str:
    """
    Extract a safe filename from a URL, stripping all query params.
    Windows can't handle ? & in filenames — split on ? first.
    """
    raw = url.split('/')[-1]
    base = raw.split('?')[0] if '?' in raw else raw
    if not base or '.' not in base:
        base = f'img-{index}.jpg'
    return base


def extract_from_html(html):
    """Extract all possible data sources from HTML."""
    result = {}
    result['title'] = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    result['title'] = result['title'].group(1).strip() if result['title'] else ""
    return result


def detect_site_extractor(url, html):
    """Auto-detect which extractor to use based on content."""
    # JSON-LD present -> use json_ld extractor
    if '<script type="application/ld+json"' in html.lower():
        return 'json_ld'

    # React hydration script (Sandhills/Controller style) -> use sandhills
    if 'loadableReady' in html and 'TradeSites' in html:
        return 'sandhills'

    return 'generic'


def parse_listing(url):
    """Main function: fetch URL, extract data, return structured listing."""
    print(f"\nFetching: {url}")

    html, status = fetch_view_source(url)
    if status is None or (isinstance(html, str) and html.startswith("Error")):
        return {"error": str(html)}

    print(f"Fetched {len(html)} bytes")

    data = extract_from_html(html)
    json_ld = extract_json_ld(html)
    vehicle_data = {}

    if json_ld:
        print(f"Found {len(json_ld)} JSON-LD records")
        for item in json_ld:
            if isinstance(item, dict) and item.get('@type') in ['Car', 'Product', 'Offer', 'Aircraft']:
                vehicle_data = item
                break

    result = {
        "source_url": url,
        "title": vehicle_data.get("name", data.get('title', '')),
        "make": vehicle_data.get("brand", {}).get("name", "") if isinstance(vehicle_data.get("brand"), dict) else vehicle_data.get("brand", ""),
        "model": vehicle_data.get("model", ""),
        "year": vehicle_data.get("vehicleModelDate", "") or extract_year_from_title(vehicle_data.get("name", data.get('title', ''))),
        "mileage": vehicle_data.get("mileageFromOdometer", {}).get("value", "") if isinstance(vehicle_data.get("mileageFromOdometer"), dict) else vehicle_data.get("mileageFromOdometer", ""),
        # URL fuel type is usually more specific (e.g. "Petrol Parallel PHEV" vs generic "Hybrid")
        "fuel_type": (extract_fuel_from_url(url) if extract_fuel_from_url(url) else (vehicle_data.get("fuelType", "") if vehicle_data.get("fuelType", "") not in ("", "Unknown") else "")),
        "transmission": vehicle_data.get("vehicleTransmission", ""),
        "colour": vehicle_data.get("color", ""),
        "description": vehicle_data.get("description", "") or extract_description_meta(html),
        "images": vehicle_data.get("image", []) if isinstance(vehicle_data.get("image"), list) else [vehicle_data.get("image")] if vehicle_data.get("image") else [],
        "dealer": vehicle_data.get("seller", {}).get("name", "") if isinstance(vehicle_data.get("seller"), dict) else "",
        "location": vehicle_data.get("seller", {}).get("address", {}).get("addressLocality", "") if isinstance(vehicle_data.get("seller", {}).get("address"), dict) else "",
    }

    for key, value in list(result.items()):
        if value is None or value == "None" or value == [] or value == {}:
            result[key] = ""

    # Dedicated extractor for gasengineexchange.com — uses __NEXT_DATA__ (all fields, 15 images)
    # Run FIRST so it takes priority over JSON-LD (which only has 1 image and generic fields)
    if 'gasengineexchange' in get_domain(url):
        gee_data = extract_from_gasengineexchange(html, url)
        if gee_data:
            gee_images = gee_data.pop('images', None)
            result.update(gee_data)
            if gee_images:
                result['images'] = gee_images
            print(f"  gasengineexchange.com extracted: {gee_data.get('title', 'N/A')}")
    else:
        # For non-Sanity sources, try to extract images from HTML using all patterns
        all_imgs = extract_all_images_from_html(html)
        if all_imgs:
            result['images'] = all_imgs[:20]

    # If key fields still empty, try Controller.com sandhills extractor
    domain = get_domain(url)
    if 'controller' in domain and (not result.get('make') or not result.get('model')):
        print("Using sandhills extractor for controller.com")
        result.update(extract_from_sandhills(html))

    if not result['title'] or result['title'] == 'N/A':
        result['title'] = data.get('title', '')

    return result


def template_for_hazelrigg(listing):
    """Template extracted data into Hazelrigg listing format."""
    if "error" in listing:
        return f"Error: {listing['error']}"

    lines = []
    lines.append("=" * 50)
    lines.append("HAZELRIGG LISTING TEMPLATE")
    lines.append("=" * 50)
    lines.append("")
    lines.append(f"TITLE: {listing.get('title', 'N/A')}")
    lines.append(f"MAKE/MODEL: {listing.get('make', 'N/A')} {listing.get('model', 'N/A')}")
    lines.append(f"YEAR: {listing.get('year', 'N/A')}")
    lines.append(f"MILEAGE/HOURS: {listing.get('mileage', 'N/A')}")
    lines.append(f"FUEL TYPE: {listing.get('fuel_type', 'N/A')}")
    lines.append(f"TRANSMISSION: {listing.get('transmission', 'N/A')}")
    lines.append(f"COLOUR: {listing.get('colour', 'N/A')}")
    lines.append(f"DEALER: {listing.get('dealer', 'N/A')}")
    lines.append(f"LOCATION: {listing.get('location', 'N/A')}")
    desc = listing.get('description', 'N/A')
    lines.append(f"DESCRIPTION: {desc[:500]}..." if len(desc) > 500 else f"DESCRIPTION: {desc}")
    lines.append(f"IMAGES: {len(listing.get('images', []))} found")
    for i, img in enumerate(listing.get('images', [])[:10], 1):
        lines.append(f"  Image {i}: {img}")
    lines.append("")
    lines.append(f"SOURCE URL: {listing.get('source_url', 'N/A')}")

    return "\n".join(lines)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python hiip.py <URL>")
        print("Example: python hiip.py https://www.hrowen.co.uk/used-car/bentley-flying-spur...")
        sys.exit(1)

    url = sys.argv[1]
    listing = parse_listing(url)
    output = template_for_hazelrigg(listing)
    print(output)