-- HIIP Database Schema
-- Version: 1.0

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================
-- SOURCES TABLE
-- Registry of all marketplace integrations
-- ============================================
create table sources (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  region text not null check (region in ('UK', 'EU', 'ME', 'NA', 'AU')),
  source_type text not null check (source_type in ('api', 'rss', 'scrape', 'manual')),
  base_url text not null,
  poll_interval_minutes int not null default 60,
  poll_timezone text not null default 'UTC',
  config jsonb not null default '{}'::jsonb,
  enabled boolean not null default true,
  last_polled_at timestamptz,
  last_success_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_sources_region on sources(region);
create index idx_sources_enabled on sources(enabled);
create index idx_sources_code on sources(code);

-- ============================================
-- CATEGORIES TABLE
-- Taxonomy with JSON Schemas per category
-- ============================================
create table categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references categories(id),
  slug text unique not null,
  name text not null,
  spec_schema jsonb not null default '{}'::jsonb,
  vote_weights jsonb,
  display_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_categories_slug on categories(slug);
create index idx_categories_active on categories(active);

-- ============================================
-- RAW_LISTINGS TABLE
-- Unmodified scraped output, deduplicated
-- ============================================
create table raw_listings (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references sources(id),
  url text not null,
  url_hash text not null,
  raw_markdown text,
  raw_data jsonb,
  scraped_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_status text not null default 'pending' check (processing_status in ('pending', 'processing', 'classified', 'rejected', 'error')),
  error_message text,
  unique (source_id, url_hash)
);

create index idx_raw_listings_source_id on raw_listings(source_id);
create index idx_raw_listings_status on raw_listings(processing_status);
create index idx_raw_listings_scraped_at on raw_listings(scraped_at);

-- ============================================
-- INVENTORY_ITEMS TABLE
-- Classified, normalised candidates
-- ============================================
create table inventory_items (
  id uuid primary key default gen_random_uuid(),
  raw_listing_id uuid references raw_listings(id),
  source_id uuid references sources(id),
  category_id uuid references categories(id),
  status text not null default 'candidate' check (status in ('candidate', 'acquired', 'listed', 'sold', 'rejected')),
  region_origin text check (region_origin in ('UK', 'EU', 'ME', 'NA', 'AU')),
  title text not null,
  manufacturer text,
  model text,
  year_of_manufacture int,
  condition text check (condition in ('new', 'refurbished', 'used_excellent', 'used_good', 'used_fair', 'as_is')),
  asking_price_amount numeric(12,2),
  asking_price_currency text,
  asking_price_gbp numeric(12,2),
  location_country text,
  location_city text,
  location_lat numeric,
  location_lng numeric,
  spec_data jsonb default '{}'::jsonb,
  classification_score numeric(3,2),
  classification_reasoning text,
  classification_model text,
  classification_at timestamptz,
  total_loss_signals jsonb,
  total_loss_score numeric(3,2),
  primary_image_url text,
  image_urls text[],
  desirability_score numeric(3,2),
  vote_count int default 0,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_inventory_items_status on inventory_items(status);
create index idx_inventory_items_category on inventory_items(category_id);
create index idx_inventory_items_source on inventory_items(source_id);
create index idx_inventory_items_classification_score on inventory_items(classification_score);
create index idx_inventory_items_desirability on inventory_items(desirability_score);
create index idx_inventory_items_created on inventory_items(created_at);

-- ============================================
-- OPERATOR_VOTES TABLE
-- Individual vote records per inventory item
-- ============================================
create table operator_votes (
  id uuid primary key default gen_random_uuid(),
  inventory_item_id uuid not null references inventory_items(id),
  operator_id uuid not null,
  condition_score int not null check (condition_score between 1 and 5),
  source_reliability_score int not null check (source_reliability_score between 1 and 5),
  resellability_score int not null check (resellability_score between 1 and 5),
  price_to_margin_score int not null check (price_to_margin_score between 1 and 5),
  listing_completeness_score int not null check (listing_completeness_score between 1 and 5),
  notes text,
  created_at timestamptz not null default now(),
  unique (inventory_item_id, operator_id)
);

create index idx_operator_votes_inventory on operator_votes(inventory_item_id);

-- ============================================
-- COMPARABLE_SALES TABLE
-- Pricing intelligence database
-- ============================================
create table comparable_sales (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id),
  manufacturer text,
  model text,
  year_of_manufacture int,
  condition text check (condition in ('new', 'refurbished', 'used_excellent', 'used_good', 'used_fair', 'as_is')),
  sale_price_gbp numeric(12,2) not null,
  sale_date date not null,
  source_label text,
  source_url text,
  spec_summary jsonb,
  notes text,
  created_at timestamptz not null default now()
);

create index idx_comparable_sales_category on comparable_sales(category_id);
create index idx_comparable_sales_sale_date on comparable_sales(sale_date);

-- ============================================
-- AI_ARTEFACTS TABLE
-- Audit log for every LLM call
-- ============================================
create table ai_artefacts (
  id uuid primary key default gen_random_uuid(),
  artefact_type text not null check (artefact_type in ('classification', 'normalisation', 'total_loss_check')),
  related_table text not null,
  related_id uuid not null,
  prompt_version text not null,
  model text not null,
  input_tokens int,
  output_tokens int,
  cost_tokens numeric,
  prompt jsonb not null,
  response jsonb not null,
  created_at timestamptz not null default now()
);

create index idx_ai_artefacts_type on ai_artefacts(artefact_type);
create index idx_ai_artefacts_related on ai_artefacts(related_table, related_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger sources_updated_at before update on sources
  for each row execute function update_updated_at();

create trigger categories_updated_at before update on categories
  for each row execute function update_updated_at();

create trigger inventory_items_updated_at before update on inventory_items
  for each row execute function update_updated_at();

-- ============================================
-- SEED DATA: INITIAL CATEGORIES
-- ============================================
insert into categories (slug, name, spec_schema, display_order) values
  ('mobile-harbour-crane', 'Mobile Harbour Cranes', '{"type": "object", "required": ["max_lifting_capacity_t", "max_outreach_m"], "properties": {"max_lifting_capacity_t": {"type": "number"}, "max_outreach_m": {"type": "number"}, "max_hoisting_height_m": {"type": "number"}, "engine_make": {"type": "string"}, "engine_kw": {"type": "number"}, "operating_hours": {"type": "integer"}, "boom_type": {"type": "string", "enum": ["lattice", "telescopic"]}, "ce_marked": {"type": "boolean"}, "tropicalised": {"type": "boolean"}}}', 1),
  ('crawler-crane', 'Crawler Cranes', '{"type": "object", "required": ["max_lifting_capacity_t", "max_boom_length_m"], "properties": {"max_lifting_capacity_t": {"type": "number"}, "max_boom_length_m": {"type": "number"}, "max_luffing_jib_length_m": {"type": "number"}, "engine_make": {"type": "string"}, "operating_hours": {"type": "integer"}, "ce_marked": {"type": "boolean"}}}', 2),
  ('tower-crane', 'Tower Cranes', '{"type": "object", "required": ["max_lifting_capacity_t", "max_hook_height_m"], "properties": {"max_lifting_capacity_t": {"type": "number"}, "max_hook_height_m": {"type": "number"}, "jib_length_m": {"type": "number"}, "engine_make": {"type": "string"}, "freestanding_height_m": {"type": "number"}}}', 3),
  ('container-crane', 'Container Cranes', '{"type": "object", "required": ["spreader_type", "lift_capacity_t"], "properties": {"spreader_type": {"type": "string"}, "lift_capacity_t": {"type": "number"}, "boom_type": {"type": "string"}, "electrical": {"type": "boolean"}}}', 4),
  ('centrifugal-pump', 'Centrifugal Pumps', '{"type": "object", "required": ["flow_rate_m3h", "head_m"], "properties": {"flow_rate_m3h": {"type": "number"}, "head_m": {"type": "number"}, "engine_make": {"type": "string"}, "engine_kw": {"type": "number"}, "self_priming": {"type": "boolean"}}}', 5),
  ('slurry-pump', 'Slurry Pumps', '{"type": "object", "required": ["flow_rate_m3h", "head_m"], "properties": {"flow_rate_m3h": {"type": "number"}, "head_m": {"type": "number"}, "solids_handling_mm": {"type": "number"}, "engine_kw": {"type": "number"}, "wetted_parts_material": {"type": "string"}}}', 6),
  ('dewatering-pump', 'Dewatering Pumps', '{"type": "object", "required": ["flow_rate_m3h", "head_m"], "properties": {"flow_rate_m3h": {"type": "number"}, "head_m": {"type": "number"}, "solid_handling_mm": {"type": "number"}, "engine_kw": {"type": "number"}, "suction_lift_m": {"type": "number"}}}', 7),
  ('marine-pump', 'Marine Pumps', '{"type": "object", "required": ["flow_rate_m3h", "head_m"], "properties": {"flow_rate_m3h": {"type": "number"}, "head_m": {"type": "number"}, "marine_approval": {"type": "string"}, "engine_kw": {"type": "number"}, "self_priming": {"type": "boolean"}}}', 8),
  ('diesel-generator', 'Diesel Generators (>=100kW)', '{"type": "object", "required": ["power_kw", "voltage_v"], "properties": {"power_kw": {"type": "number"}, "voltage_v": {"type": "number"}, "frequency_hz": {"type": "number"}, "engine_make": {"type": "string"}, "engine_kw": {"type": "number"}, "running_hours": {"type": "integer"}, "fuel_tank_capacity_l": {"type": "number"}}}', 9),
  ('heavy-trailer', 'Heavy Trailers / Transporters', '{"type": "object", "required": ["payload_capacity_t", "axles"], "properties": {"payload_capacity_t": {"type": "number"}, "axles": {"type": "integer"}, "trailer_type": {"type": "string"}, "brakes": {"type": "string"}, "suspension": {"type": "string"}}}', 10),
  ('tower-light', 'Tower Lights', '{"type": "object", "required": ["mast_height_m", "lumens"], "properties": {"mast_height_m": {"type": "number"}, "lumens": {"type": "number"}, "engine_kw": {"type": "number"}, "running_hours": {"type": "integer"}, "light_type": {"type": "string"}}}', 11),
  ('industrial-diesel-engine', 'Industrial Diesel Engines', '{"type": "object", "required": ["power_kw", "displacement_l"], "properties": {"power_kw": {"type": "number"}, "displacement_l": {"type": "number"}, "engine_make": {"type": "string"}, "fuel_type": {"type": "string"}, "running_hours": {"type": "integer"}}}', 12),
  ('mining-haul-truck', 'Mining Haul Trucks', '{"type": "object", "required": ["payload_capacity_t", "engine_kw"], "properties": {"payload_capacity_t": {"type": "number"}, "engine_make": {"type": "string"}, "engine_kw": {"type": "number"}, "running_hours": {"type": "integer"}, "transmission": {"type": "string"}, "dump_body_volume_m3": {"type": "number"}}}', 13),
  ('wheel-loader', 'Wheel Loaders', '{"type": "object", "required": ["bucket_capacity_m3", "engine_kw"], "properties": {"bucket_capacity_m3": {"type": "number"}, "engine_make": {"type": "string"}, "engine_kw": {"type": "number"}, "operating_hours": {"type": "integer"}, "breakout_force_kN": {"type": "number"}}}', 14),
  ('large-excavator', 'Large Excavators', '{"type": "object", "required": ["operating_weight_t", "bucket_capacity_m3"], "properties": {"operating_weight_t": {"type": "number"}, "bucket_capacity_m3": {"type": "number"}, "engine_make": {"type": "string"}, "engine_kw": {"type": "number"}, "dig_depth_m": {"type": "number"}, "operating_hours": {"type": "integer"}}}', 15),
  ('crusher-screen', 'Crushers / Screens', '{"type": "object", "required": ["throughput_tph", "crusher_type"], "properties": {"throughput_tph": {"type": "number"}, "crusher_type": {"type": "string"}, "engine_make": {"type": "string"}, "engine_kw": {"type": "number"}, "operating_hours": {"type": "integer"}}}', 16),
  ('conveyor', 'Conveyors', '{"type": "object", "required": ["belt_width_mm", "length_m"], "properties": {"belt_width_mm": {"type": "number"}, "length_m": {"type": "number"}, "belt_speed_mpm": {"type": "number"}, "engine_kw": {"type": "number"}, "inclination_angle_deg": {"type": "number"}}}', 17),
  ('ship-loader', 'Ship Loaders', '{"type": "object", "required": ["throughput_tph", "outreach_m"], "properties": {"throughput_tph": {"type": "number"}, "outreach_m": {"type": "number"}, "load_rate_tph": {"type": "number"}, "engine_kw": {"type": "number"}, "ship_size_max": {"type": "string"}}}', 18),
  ('private-jet', 'Private Jets', '{"type": "object", "required": ["make", "model", "year"], "properties": {"make": {"type": "string"}, "model": {"type": "string"}, "year": {"type": "integer"}, "total_time_airframe_hours": {"type": "number"}, "total_time_engines_hours": {"type": "number"}, "time_since_overhaul_hours": {"type": "number"}, "avionics": {"type": "string"}, "passenger_capacity": {"type": "integer"}, "max_takeoff_weight_kg": {"type": "number"}, "cruise_speed_kts": {"type": "number"}, "damage_history": {"type": "string"}}}', 19),
  ('turboprop', 'Turboprop Aircraft', '{"type": "object", "required": ["make", "model", "year"], "properties": {"make": {"type": "string"}, "model": {"type": "string"}, "year": {"type": "integer"}, "total_time_airframe_hours": {"type": "number"}, "total_time_engines_hours": {"type": "number"}, "time_since_overhaul_hours": {"type": "number"}, "avionics": {"type": "string"}, "passenger_capacity": {"type": "integer"}, "max_takeoff_weight_kg": {"type": "number"}, "cruise_speed_kts": {"type": "number"}, "damage_history": {"type": "string"}}}', 20),
  ('helicopter', 'Helicopters', '{"type": "object", "required": ["make", "model", "year"], "properties": {"make": {"type": "string"}, "model": {"type": "string"}, "year": {"type": "integer"}, "total_time_airframe_hours": {"type": "number"}, "total_time_engines_hours": {"type": "number"}, "time_since_overhaul_hours": {"type": "number"}, "avionics": {"type": "string"}, "passenger_capacity": {"type": "integer"}, "max_takeoff_weight_kg": {"type": "number"}, "range_nm": {"type": "number"}, "damage_history": {"type": "string"}}}', 21);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- SOURCES
alter table sources enable row level security;
create policy "anon_read_sources" on sources for select to anon using (true);
create policy "service_role_sources_all" on sources for all to service_role using (true);

-- CATEGORIES
alter table categories enable row level security;
create policy "anon_read_categories" on categories for select to anon using (true);
create policy "service_role_categories_all" on categories for all to service_role using (true);

-- RAW_LISTINGS
alter table raw_listings enable row level security;
create policy "anon_read_raw_listings" on raw_listings for select to anon using (true);
create policy "service_role_raw_listings_all" on raw_listings for all to service_role using (true);

-- INVENTORY_ITEMS
alter table inventory_items enable row level security;
create policy "anon_read_inventory_items" on inventory_items for select to anon using (true);
create policy "anon_insert_inventory_items" on inventory_items for insert to anon with check (true);
create policy "anon_update_inventory_items" on inventory_items for update to anon using (true);
create policy "service_role_inventory_items_all" on inventory_items for all to service_role using (true);

-- OPERATOR_VOTES
alter table operator_votes enable row level security;
create policy "anon_read_operator_votes" on operator_votes for select to anon using (true);
create policy "anon_insert_operator_votes" on operator_votes for insert to anon with check (true);
create policy "service_role_operator_votes_all" on operator_votes for all to service_role using (true);

-- COMPARABLE_SALES
alter table comparable_sales enable row level security;
create policy "anon_read_comparable_sales" on comparable_sales for select to anon using (true);
create policy "service_role_comparable_sales_all" on comparable_sales for all to service_role using (true);

-- AI_ARTEFACTS (service_role only - audit logs not public)
alter table ai_artefacts enable row level security;
create policy "service_role_ai_artefacts_all" on ai_artefacts for all to service_role using (true);