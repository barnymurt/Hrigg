# HIIP & Admin — Scraping & Performance Learnings

Documenting lessons learned from building the brochure and applying them to HIIP and Admin tools.

---

## 1. Image Extraction Patterns

### `/_next/image` src attributes (Next.js sites)
Next.js proxies images through `/_next/image` in the HTML, not direct CDN URLs.

**In HTML source:**
```html
<img src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F...&w=432&h=324&q=75">
```

**Decoding:**
```python
from urllib.parse import unquote, parse_qs, urlparse

def extract_from_nextjs_src(src_value):
    qs = parse_qs(urlparse(src_value).query)
    return unquote(qs['url'][0])  # returns the original CDN URL
```

### Sanity CMS image refs → CDN URLs
Sanity stores image refs in `__NEXT_DATA__` as `image-{hash}-{dims}.{ext}`.

**Ref format:** `image-2262ea54a34d10eaa5028c98cbd384dcbc4a5a0e-1600x1200-jpg`

**Reconstruction:**
```python
parts = ref.replace('image-', '').rsplit('-', 1)
hash_dims = parts[0]   # '2262ea54a34d10eaa5028c98cbd384dcbc4a5a0e-1600x1200'
ext = parts[1]         # 'jpg'
cdn_url = f"https://cdn.sanity.io/images/{project}/production/{hash_dims}.{ext}"
```

### `__NEXT_DATA__` beats HTML parsing
Next.js apps embed rich structured data in `<script id="__NEXT_DATA__">`. Always check for this before regex-parsing HTML. Contains title, specs, images, brand names — more reliable than DOM extraction.

```python
next_data_match = re.search(r'<script[^>]*id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
next_data = json.loads(next_data_match[1])
product = next_data['props']['pageProps']['product']
```

### OG image is only the first image
`og:image` meta tag gives one thumbnail, not the full gallery. Don't treat it as complete.

### Strip query params from filenames on Windows
URLs with `?rect=...&w=...&q=...` cause `EINVAL` errors when saving to disk on Windows.

**Fix:**
```python
raw_filename = url.split('/')[-1]
base = raw_filename.split('?')[0]  # strip all query params
filename = base if base else f'img-{j}'
```

---

## 2. Bot Protection Bypass

### Vercel infrastructure bypass
Direct `curl`/`wget` to Vercel-deployed routes returns 401. Use `npx vercel curl <url>` — it routes through Vercel's infrastructure and succeeds.

### Site blocking patterns
Common block signals:
- `403 Forbidden`
- `Pardon Our Interruption` (Distil Networks)
- `Access Denied`
- `X-Distil-Auth` headers

### Playwright with persistent profile
For stubborn sites (e.g. controller.com), use Playwright with a persistent browser profile to maintain session cookies and bypass bot detection.

```python
with sync_playwright() as p:
    context = p.chromium.launch_persistent_context(
        user_data_dir=profile_path,
        headless=True,
        args=['--disable-blink-features=AutomationControlled', '--no-sandbox']
    )
    page = context.pages[0] if context.pages else context.new_page()
    page.goto(url, wait_until='domcontentloaded', timeout=30000)
    time.sleep(15)  # wait for React hydration
    html = page.content()
```

---

## 3. Performance

### `Promise.all` for parallel fetching
Sequential loading with delays: `33 items × 150ms = 10+ seconds`
Parallel `Promise.all`: `~1-2 seconds total`

```typescript
// BAD: sequential with delay
for (const url of urls) {
  const res = await fetch(url);
  results.push(await res.json());
  await new Promise(r => setTimeout(r, 150));
}

// GOOD: parallel
const all = await Promise.all(urls.map(url => fetch(`/api/extract?url=${url}`)));
const results = await Promise.all(all.map(r => r.json()));
```

### In-memory API cache (60s TTL)
Avoid re-fetching the same URL within a session.

```typescript
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 60_000;

function getCached(url: string) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  // ... fetch and cache
  cache.set(url, { data: result, ts: Date.now() });
}
```

### Pre-download images locally (avoid CDN at render time)
Download all images upfront into `public/images/` and serve as static files. Vercel serves them instantly, no CDN fetching, no hotlinking protection to deal with.

```python
# In download script
PUBLIC_IMAGES = os.path.join(BASE_DIR, 'public', 'images')
os.makedirs(PUBLIC_IMAGES, exist_ok=True)
```

---

## 4. CSS & UI Patterns

### CSS Modules don't allow `:root` variables
CSS Modules throw errors on pure selectors like `:root {}`. Hardcode string values, or use a separate global CSS file for CSS variables.

**Bad:**
```css
/* page.module.css */
:root { --amber: #b8860b; }  /* ERROR in CSS Modules */
```

**Good:**
```css
/* Use string values directly */
.tabActive { background: #b8860b; color: #1a1a1a; }
```

### `scrollRef.current.style.transform` + React state for smooth animations
State drives re-renders; direct DOM manipulation drives the visual update (avoids lag).

```typescript
function goTo(dir: 'prev' | 'next') {
  const newIdx = dir === 'next'
    ? (activeImg + 1) % images.length
    : (activeImg - 1 + images.length) % images.length;
  setActiveImg(newIdx);  // triggers re-render if needed
  if (scrollRef.current) {
    scrollRef.current.style.transform = `translateX(-${newIdx * 100}%)`;  // immediate visual update
  }
}
```

### Expand/collapse for long descriptions
Cards with truncated text (200 char limit) need a "Read more" button.

```typescript
const [expanded, setExpanded] = useState(false);
const desc = listing.description || '';
const truncated = desc.length > 200;

return (
  <div>
    <p className={expanded ? styles.descriptionExpanded : ''}>
      {expanded ? desc : desc.slice(0, 200)}
      {!expanded && truncated && '...'}
    </p>
    {truncated && (
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show less' : 'Read more'}
      </button>
    )}
  </div>
);
```

---

## 5. Next.js Specific

### Next.js Image component requires domain allowlist
`<Image>` component requires remote domains to be allowlisted in `next.config.js`. Regular `<img>` tags bypass this.

```javascript
// next.config.js
images: {
  remotePatterns: ['https://cdn.sanity.io', 'https://media.sandhills.com'],
}
```

### Local build fails but `npx vercel --prod` works
Corrupted `package-lock.json` in parent workspace causes `npm run build` to error with `Cannot read properties of undefined (reading 'os')`. Vercel CLI handles this differently. Use `npx vercel --prod` for production deploys.

### Always use `--prod` flag
`npx vercel` deploys to preview. `--prod` is required for production.

---

## 6. Deployment

### Vercel aliases give stable URLs
Each deploy gets a new hash URL. The alias (`brochure-hazelrigg-projects.vercel.app`) stays stable across deploys. Use aliases for sharing before custom domain is ready.

### SSL certs need DNS configured first
Vercel shows "creating SSL certificate asynchronously" until DNS points to Vercel. Domain must be added with CNAME or nameservers set before SSL provisions.

---

## 7. PII Redaction (Admin/Drafts)

Before any listing goes live (status → approved), strip personal data:

```python
def redact_pii(listing: dict) -> dict:
    import re
    pii_patterns = {
        'email': re.compile(r'[\w.-]+@[\w.-]+\.\w+'),
        'phone': re.compile(r'\+?[\d\s\-()]{7,}'),
    }
    def clean_field(value):
        if not isinstance(value, str):
            return value
        value = pii_patterns['email'].sub('[EMAIL REDACTED]', value)
        value = pii_patterns['phone'].sub('[PHONE REDACTED]', value)
        return value

    redacted = listing.copy()
    for field in ['description', 'dealer', 'location', 'title']:
        if field in redacted and redacted[field]:
            redacted[field] = clean_field(redacted[field])
    # Keep location as city/country only
    if redacted.get('location'):
        parts = redacted['location'].split(',')
        redacted['location'] = ','.join(parts[:2]).strip()
    return redacted
```

---

## 8. Fuel/Category Derivation from URL

Derive fuel_type or category from the URL path rather than hardcoding.

```python
FUEL_FROM_SLUG = {
    'natural-gas': 'Natural Gas',
    'biogas': 'Biogas',
    'lpg': 'LPG',
    'landfill-gas': 'Landfill Gas',
    'syngas': 'Syngas',
    'wood-gas': 'Wood Gas',
}

def fuel_from_url(url: str) -> str:
    slug = urlparse(url).path.split('/')[-1]
    for key, fuel in FUEL_FROM_SLUG.items():
        if key in slug:
            return fuel
    return 'Natural Gas'
```

---

## 9. Source Connectors (HIIP)

### Firecrawl as primary scraper
HIIP Next.js uses Firecrawl for scraping. Firecrawl's `scrape()` returns markdown + metadata. Image URLs embedded as markdown links `![](url)` or in metadata.

### Image extraction patterns by source
| Source | Pattern |
|--------|---------|
| rbauction | `cdn.ironpla.net` in markdown `![]()` |
| controller.com | `media.sandhills.com/img.axd?...` from React hydration |
| gasengineexchange | Sanity ref in `__NEXT_DATA__` → CDN reconstruction |
| hrowen.co.uk | JSON-LD `image` array |
| Generic | `og:image` meta tag (first image only) |

### When Firecrawl fails
If Firecrawl returns incomplete data, fall back to direct `requests.get()` with proper headers, or Playwright for JS-rendered pages.

---

## 10. Database Schema Notes

### Drafts table (`equipment_drafts`)
- `images JSONB DEFAULT '[]'` — store as array, never single string
- `source_domain` — extracted from URL, used for filtering
- `status` — `pending|approved|rejected` with CHECK constraint

### Live equipment (`live_equipment`)
- Inserted from drafts after PII redaction + approval
- `draft_id` REFERENCES equipment_drafts(id) — keep link for audit trail

### Indexes
```sql
CREATE INDEX idx_drafts_status ON equipment_drafts(status);
CREATE INDEX idx_drafts_received ON equipment_drafts(received_at DESC);
CREATE INDEX idx_live_published ON live_equipment(published_at DESC);
```