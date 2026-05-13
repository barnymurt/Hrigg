# HIIP - Hazelrigg Inventory Intelligence Platform

AI-augmented sourcing pipeline for used industrial equipment, aircraft, and luxury vehicles.

## Architecture

```
Marketplace Sources → Raw Listings → Classification → Normalisation → Candidate Queue → Operator Voting → Desirability Score
```

## Tech Stack

- **Database:** Supabase (Postgres 15)
- **LLM:** MiniMax M2.7
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui components

## Setup

1. Copy `.env.example` to `.env.local` and fill in your credentials:
   - `MINIMAX_API_KEY` from platform.minimax.io
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project
   - `SUPABASE_SERVICE_ROLE_KEY` from Supabase (for server-side operations)

2. Run the database migration in Supabase:
   ```bash
   # Apply migrations via Supabase dashboard or CLI
   # File: supabase/migrations/001_initial_schema.sql
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/poll` | POST | Trigger polling of all enabled sources |
| `/api/classify` | POST | Classify a raw listing (body: `{ rawListingId }`) |
| `/api/vote` | POST | Submit a vote on a candidate |
| `/api/candidates` | GET | List candidates (query params: `?status=candidate&minScore=0.6`) |
| `/api/sources` | GET/POST | List or add sources |
| `/api/categories` | GET | List all active categories |

## Categories (Initial)

### Industrial Equipment (Phase 1-2)
- Mobile Harbour Cranes
- Crawler Cranes
- Tower Cranes
- Container Cranes
- Centrifugal, Slurry, Dewatering, Marine Pumps
- Diesel Generators (≥100kW)
- Heavy Trailers / Transporters
- Tower Lights
- Industrial Diesel Engines
- Mining Haul Trucks
- Wheel Loaders
- Large Excavators
- Crushers / Screens
- Conveyors
- Ship Loaders

### Aircraft (Phase 3)
- Private Jets
- Turboprop Aircraft
- Helicopters

### Luxury Vehicles (Deferred)
- TBD - sources to be identified

## Vote Dimensions

| Dimension | 1 | 3 | 5 |
|-----------|---|---|---|
| Condition | As-is / for parts | Used, functional | Refurbished / excellent |
| Source Reliability | Unknown, no report | Partial data | Trusted source, full report |
| Resellability | Niche, hard to move | Standard equipment | High demand, easily shippable |
| Price to Margin | Overpriced / thin | Fair market price | Strong margin opportunity |
| Listing Completeness | Missing key info | Partial info | Complete: year, price, hours, photos |

## Desirability Score

```
desirability = (0.4 × classifier_score) + (0.6 × avg_vote_score)
```

- **Threshold for acquisition consideration:** ≥ 0.75
- **Vote confidence:** Low (< 3 votes), Standard (3-20), High (> 20)

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Lint
npm run lint
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MINIMAX_API_KEY` | Yes | MiniMax API key |
| `MINIMAX_MODEL` | No | Model to use (default: MiniMax-M2.7) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-side only) |