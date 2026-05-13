# SPEC 1: Vercel Drafts UI — Admin Review & Approval

## Purpose

Admin can review incoming equipment drafts, see extracted data preview, approve to go live or reject with notes.

---

## Authentication & Authorisation

| Concern | Decision |
|---------|----------|
| Auth method | `ADMIN_SECRET_KEY` env variable. Admin sends key in request header: `Authorization: Bearer <key>` |
| Admin identity | Single admin (MVP). Key stored in Vercel env vars, never committed to repo |
| Session | Stateless. Every API call validates the key. No cookies, no JWT refresh |
| Unauthenticated access | Returns HTTP 401 `{ "error": "Unauthorized" }` |
| Invalid key | Returns HTTP 403 `{ "error": "Forbidden" }` |

**Middleware pattern (Next.js):**

```typescript
// pages/api/admin/* middleware
export function verifyAdmin(req) {
  const key = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!key || key !== process.env.ADMIN_SECRET_KEY) {
    return { authorized: false, status: 401 };
  }
  return { authorized: true };
}
```

---

## Pages

### `/admin/drafts` — Draft Queue (List View)

**Layout:** Full-width table with sticky header.

| Column | Sortable | Notes |
|--------|----------|-------|
| Thumbnail | No | First image, 60×60px crop |
| Title | Yes | Truncate at 40 chars |
| Make/Model | Yes | Single column |
| Year | Yes | |
| Source | Yes | Domain badge |
| Received | Yes | Relative time ("2h ago") |
| Status | Filter only | Badge: pending/approved/rejected |
| Actions | No | View button |

**Filters:**
- Tabs: All | Pending | Approved | Rejected
- Date range: last 7 days / 30 days / all time
- Sort: newest first (default), oldest first, source domain, make

**Pagination:**
- Default page size: 20
- Cursor-based pagination (not offset)
- API: `GET /api/drafts?cursor=<uuid>&limit=20&status=pending`

**Performance:** Use `Promise.all()` parallel fetching to load all draft cards simultaneously. Do NOT load sequentially with delays — sequential loading adds N × 150ms of wait time.

---

### `/admin/drafts/[id]` — Draft Detail (Expanded View)

**Sections:**

1. **Header bar** — Title, status badge, source URL (opens in new tab), received time
2. **Image gallery** — Grid of thumbnails (up to 10). Click → opens original CDN URL
3. **Fields panel** — Read-only display of all extracted fields
4. **Admin notes** — Text field, saved on any action
5. **Action bar** — Approve, Reject, Edit buttons (sticky to bottom on mobile)

**Long description handling:**
- Truncate descriptions at 200 characters with "..."
- "Read more" button expands full text inline
- "Show less" collapses back
- Use `white-space: pre-wrap` on expanded text to preserve newlines
- See Implementation Patterns section below

**Field editing rules:**
- Editable fields: title, make, model, year, mileage, fuel_type, transmission, colour, description, location
- Non-editable: source_url, source_domain, images, dealer (these come from extraction, not manually corrected)
- Validation:
  - `year`: 4-digit integer, 1900-2030
  - `mileage`: alphanumeric string (may contain commas/spaces)
  - `description`: max 5000 chars
- Post-edit state: unsaved edits tracked in component state
- Abandoned edit: [Cancel] button resets to saved values
- Edit history: NOT logged for MVP (future: `draft_edit_history` table)
- **Locking rule:** Once `status=approved`, draft is read-only. No edits after approval.

---

## "Goes Live" Mechanism

```
Admin clicks [Approve]
        ↓
redact_pii(listing)          ← strip all PII (see below)
        ↓
INSERT INTO live_equipment   ← from equipment_drafts data
        ↓
UPDATE equipment_drafts SET status='approved', approved_at=now(), approved_by=admin
        ↓
Trigger notification (approved confirmation)
```

**PII Redaction Function:**

Before any listing goes live (status → approved), all personal data must be removed:

```python
def redact_pii(listing: dict) -> dict:
    """Remove all PII before pushing to live_equipment."""
    import re

    # Fields to redact: email addresses, phone numbers, full addresses
    # Fields to keep: make, model, year, mileage, description (cleaned), location (city/country only)

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

    # Keep location as city/country only (strip full addresses)
    if redacted.get('location'):
        parts = redacted['location'].split(',')
        redacted['location'] = ','.join(parts[:2]).strip()  # city, country

    return redacted
```

---

## Optimistic UI

| Action | Behaviour |
|--------|-----------|
| Approve click | Button shows spinner immediately. API call fires. On success: row moves to Approved tab. On failure: button resets, error toast shown |
| Reject click | Confirm modal appears. On confirm: row moves to Rejected tab |
| Edit save | Field unfocus → API call. On success: field shows new value. On failure: field reverts, error toast |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/drafts` | List drafts — cursor pagination, filter by status/date/source |
| GET | `/api/drafts/[id]` | Single draft with all fields |
| PATCH | `/api/drafts/[id]` | Edit editable fields (blocked if already approved) |
| POST | `/api/drafts/[id]/approve` | Approve → move to live_equipment, redact PII |
| POST | `/api/drafts/[id]/reject` | Reject with optional note |
| DELETE | `/api/drafts/[id]` | Hard delete (admin only, for test data cleanup) |

**Request/response shapes:**

```typescript
// GET /api/drafts?cursor=<uuid>&limit=20&status=pending
{
  "drafts": [ /* array of draft objects */ ],
  "next_cursor": "<uuid or null>",
  "total_count": 47
}

// POST /api/drafts/[id]/approve
// Request: { }  // auth in header
// Response: { "success": true, "live_id": "<uuid>" }

// POST /api/drafts/[id]/reject
// Request: { "reason": "optional note" }
// Response: { "success": true }

// PATCH /api/drafts/[id]
// Request: { "title": "...", "make": "...", /* any editable field */ }
// Response: { "success": true, "draft": { /* updated draft */ }}
```

---

## Data Shape (Supabase equipment_drafts)

```json
{
  "id": "uuid",
  "source_url": "https://controller.com/listing/for-sale/248196293/...",
  "status": "pending|approved|rejected",
  "title": "2018 PILATUS PC-12 NG",
  "make": "PILATUS",
  "model": "PC-12 NG",
  "year": "2018",
  "mileage": "2,230",
  "fuel_type": "",
  "transmission": "",
  "colour": "",
  "description": "Air-conditioning System Steep Approach...",
  "images": ["url1", "url2"],
  "dealer": "",
  "location": "Guernsey, Channel Island, United Kingdom",
  "source_domain": "controller.com",
  "received_at": "2026-01-15T09:00:00Z",
  "approved_at": null,
  "approved_by": null,
  "rejected_at": null,
  "rejected_by": null,
  "notified_at": null,
  "notification_id": null,
  "notes": null
}
```

---

## Image Handling

Draft images come from various sources with different formats. Handle them as follows:

### Direct CDN URLs
Most sources (rbauction, mascus, etc.) return direct CDN URLs. Store as-is in `images` JSONB array.

### Next.js `/_next/image` proxy URLs
If the source is a Next.js site, images appear in HTML as:
```html
<img src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F...&w=432&h=324&q=75">
```
Decode the `url` query param to get the original CDN URL.

### Sanity CMS refs
If source uses Sanity CMS, image refs in `__NEXT_DATA__` look like:
```
image-2262ea54a34d10eaa5028c98cbd384dcbc4a5a0e-1600x1200-jpg
```
Reconstruct as: `https://cdn.sanity.io/images/{project}/production/{hash}-{dims}.{ext}`

### Image pre-fetching
For admin preview performance:
- On draft creation, pre-download all images to local static storage
- Serve from local paths in admin UI (avoids CDN fetching on each view)
- Path format: `public/drafts/{draft_id}/img-0.jpg`, `public/drafts/{draft_id}/img-1.jpg`
- Store the local paths in `images` field, not remote URLs

---

## Performance

### Parallel loading
When loading the draft list or detail page, fetch all data in parallel using `Promise.all()`. Do NOT loop sequentially — sequential loops add N × 150ms of artificial delay.

```typescript
// GOOD
const allDrafts = await Promise.all(
  draftUrls.map(url => fetch(`/api/drafts/${url}`).then(r => r.json()))
);

// BAD — never do this
for (const url of urls) {
  const res = await fetch(url);
  results.push(await res.json());
  await new Promise(r => setTimeout(r, 150));  // unnecessary
}
```

### API caching (60s TTL)
Cache draft API responses for 60 seconds to avoid re-fetching the same draft within a session.

```typescript
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 60_000;

function getCached(url: string) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  // fetch, then:
  cache.set(url, { data: result, ts: Date.now() });
}
```

---

## Supabase Tables (hazelrigg-listings project)

```sql
-- equipment_drafts
CREATE TABLE equipment_drafts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url       TEXT NOT NULL,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  title            TEXT,
  make             TEXT,
  model            TEXT,
  year             TEXT,
  mileage          TEXT,
  fuel_type        TEXT,
  transmission     TEXT,
  colour           TEXT,
  description      TEXT,
  images           JSONB DEFAULT '[]',
  dealer           TEXT,
  location         TEXT,
  source_domain    TEXT,
  received_at      TIMESTAMPTZ DEFAULT now(),
  approved_at      TIMESTAMPTZ,
  approved_by      TEXT,
  rejected_at      TIMESTAMPTZ,
  rejected_by      TEXT,
  notified_at      TIMESTAMPTZ,
  notification_id  TEXT,
  notes            TEXT
);

-- live_equipment (approval target)
CREATE TABLE live_equipment (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id         UUID REFERENCES equipment_drafts(id),
  source_url       TEXT NOT NULL,
  title            TEXT,
  make             TEXT,
  model            TEXT,
  year             TEXT,
  mileage          TEXT,
  fuel_type        TEXT,
  transmission     TEXT,
  colour           TEXT,
  description      TEXT,
  images           JSONB DEFAULT '[]',
  dealer           TEXT,
  location         TEXT,
  source_domain    TEXT,
  published_at     TIMESTAMPTZ DEFAULT now(),
  published_by     TEXT
);

-- notifications_log
CREATE TABLE notifications_log (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id     UUID REFERENCES equipment_drafts(id),
  channel      TEXT CHECK (channel IN ('email', 'slack')),
  event        TEXT CHECK (event IN ('created', 'approved', 'rejected', 'failed')),
  sent_at      TIMESTAMPTZ DEFAULT now(),
  status       TEXT CHECK (status IN ('sent', 'failed', 'retrying')),
  error        TEXT,
  retries      INT DEFAULT 0
);

-- Indexes
CREATE INDEX idx_drafts_status ON equipment_drafts(status);
CREATE INDEX idx_drafts_received ON equipment_drafts(received_at DESC);
CREATE INDEX idx_live_published ON live_equipment(published_at DESC);
CREATE INDEX idx_notifications_draft ON notifications_log(draft_id);
```

---

## NFRs (Non-Functional Requirements)

| Requirement | Value |
|-------------|-------|
| Availability | Best-effort MVP (no SLA) |
| Data retention | Drafts kept indefinitely, no auto-delete |
| GDPR | All PII stripped before going live via redact_pii() |
| Logging | All state transitions logged with timestamp + actor |
| Rate limits | HIIP max 10 concurrent extractions per domain |
| Schema migrations | Additive-only (new columns OK, no column deletions) |
| Version strategy | All schema changes versioned in /docs/migrations/ |

---

## Dependencies

| Component | Depends on |
|-----------|-----------|
| Drafts UI | Supabase (equipment_drafts, live_equipment), Admin auth |
| Goes live | Supabase (live_equipment), Vercel reads from this |

---

## Implementation Patterns

### Expand/collapse long descriptions

```tsx
function DescriptionField({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const truncated = text.length > 200;

  return (
    <div>
      <p className={expanded ? styles.descriptionExpanded : ''}>
        {expanded ? text : text.slice(0, 200)}
        {!expanded && truncated && '...'}
      </p>
      {truncated && (
        <button
          className={styles.expandBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
```

```css
.descriptionExpanded {
  white-space: pre-wrap;
  word-break: break-word;
}

.expandBtn {
  background: none;
  border: none;
  color: #b8860b;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

### Image scroll strip (per card)

```tsx
function ImageStrip({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function go(dir: 'prev' | 'next') {
    const next = dir === 'next'
      ? (active + 1) % images.length
      : (active - 1 + images.length) % images.length;
    setActive(next);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next * 100}%)`;
    }
  }

  return (
    <div className={styles.imageWrap}>
      {images.length > 1 && (
        <button className={styles.scrollBtnLeft} onClick={() => go('prev')}>‹</button>
      )}
      <div className={styles.imageContainer}>
        <div ref={trackRef} className={styles.imageTrack} style={{ transform: `translateX(-${active * 100}%)` }}>
          {images.map((src, i) => (
            <div key={i} className={styles.imgSlide}>
              <img src={src} alt={`Image ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <button className={styles.scrollBtnRight} onClick={() => go('next')}>›</button>
      )}
      {images.length > 1 && (
        <div className={styles.imgCounter}>{active + 1} / {images.length}</div>
      )}
    </div>
  );
}
```

```css
.imageContainer {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.imageTrack {
  display: flex;
  height: 100%;
  transition: transform 0.3s ease;
}

.imgSlide {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}
```