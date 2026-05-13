"""
HIIP — Hazelrigg Intelligent Inventory Parser
Takes a URL, fetches the view-source HTML, extracts structured listing data
and templates it for the Hazelrigg site format.

Sources supported:
- hrowen.co.uk (JSON-LD schema via requests)
- controller.com (React hydration via Playwright with persistent profile)

New domains are auto-detected and can be onboarded via hiip_onboard.py
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
    images = []
    if media_ids:
        base = 'https://media.sandhills.com/img.axd?id={id}&wid=4326165471&rwl=False&p=&ext=&w=614&h=460&t=&lp=&c=True&wt=False&sz=Max&rt=0&checksum='
        for mid in media_ids:
            images.append(base.format(id=mid))
    if images:
        result['images'] = images

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

    # If key fields still empty, try Controller.com sandhills extractor
    domain = get_domain(url)
    if 'controller' in domain and (not result.get('make') or not result.get('model')):
        print("Using sandhills extractor for controller.com")
        result.update(extract_from_sandhills(html))

    # Auto-detect site type for future reference
    if not result.get('images') or not result.get('make'):
        site_type = detect_site_extractor(url, html)
        print(f"Auto-detected site type: {site_type}")

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