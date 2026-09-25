# BaggaFarms — Modern Web Application Specification

## 1. Project Overview
**BaggaFarms** is a high-performance, mobile-first Progressive Web Application (PWA) built for commercial poultry farm operations. It replaces paper logbooks with real-time flock lifecycle tracking, financial ledgers, logistics dispatch management, and automated efficiency analytics (Feed Conversion Ratio, Mortality Rate, Profit & Loss).

---

## 2. Technical Stack & Infrastructure
* **Currency:** Pakistani Rupee (PKR / Rs.) — All financial forms, invoices, and analytics tables default to PKR.
* **Frontend Framework:** Next.js (App Router, TypeScript)
* **Styling & Design System:** Tailwind CSS + `shadcn/ui`
* **Iconography & Visuals:** `lucide-react`
* **Charts & Data Visualization:** Tremor (`@tremor/react`) or Recharts (Clean, non-AI-slop executive dashboard styling)
* **Backend & Database:** Supabase (PostgreSQL, Supabase Auth, Row Level Security)
* **Deployment & Hosting:** Vercel (Production) + Supabase Cloud ($0 Tier)
* **State Management & Data Fetching:** React Server Components + Next.js Server Actions + TanStack Query

---

## 3. UI/UX Design System Guidelines (Anti-AI-Slop Architecture)
To ensure BaggaFarms looks like a polished, high-ticket SaaS platform rather than a generic template:
* **Typography:** Clean sans-serif hierarchy using Inter or Geist UI. Strict rhythm, high contrast readability for outdoor mobile usage.
* **Color Palette:** Deep slate/charcoal backgrounds or neutral light surfaces (`zinc-900` / `zinc-50`), accented with muted emerald (`emerald-600`) for revenue/health indicators, and subtle amber/red badges for warnings.
* **Component Usage:** Rely strictly on established libraries (`shadcn/ui`, Tailwind CSS). No custom CSS hackery, no flashy gradients or unnecessary glassmorphism.
* **Layout Structure:** Bottom navigation bar for mobile viewports, responsive sidebar navigation for desktop viewports. High-density data tables with sorting, filtering, and pagination.
* **Currency Formatting:** Format all monetary figures using PKR standards (e.g., `Rs. 250,000` or `PKR 250,000`).

---

## 4. Core Feature Specifications

### Module A: Active Flock & Batch Management
* **Flock Creation:** Modal form to initialize a batch (Batch Name, Type: Broiler/Layer, Initial Count, Arrival Date, Vendor/Origin).
* **Live Status Dashboard:** Real-time metrics showing Active Bird Count, Batch Age in days/weeks, and status badge (`Active` vs. `Closed`).
* **Closure & Historical Lock:** Workflow to mark a batch as `Closed` upon final sale, triggering batch finalization metrics.

### Module B: Daily Operations Logger
* **Quick-Entry Mobile Form:**
  * Daily Mortality Count (Auto-deducts from active flock count).
  * Feed Bags Consumed (Auto-converts to total kg).
  * Sample Weight Average (kg).
  * Eggs Collected (if Layer flock).
  * Free-text Operational Notes (vaccines, temperature, incidents).

### Module C: Dispatch & Logistics Manager (Driver Tracking)
* **Driver & Vehicle Logs:** Record every truck leaving the farm.
  * Fields: Driver Name, Driver Phone, Vehicle/Truck Number, Birds/Crates Loaded, Gross/Net Weight (kg), Destination Buyer.
  * Generates a digital Delivery Note for driver verification.

### Module D: Financial Ledger & Buyer Debt Tracking (PKR)
* **Transactions:** Categorized Income (Bird Sales, Manure, Egg Sales) and Expenses (Feed, Electricity, Transport, Medicine, Labor) denominated in PKR.
* **Buyer Credit Ledger:** Tracks outstanding debts in PKR for buyers purchasing on credit, allowing partial payment logging and balance tracking.

### Module E: Business Intelligence & Farm Metrics
* **Feed Conversion Ratio (FCR):** Automated formula:
  $$\text{FCR} = \frac{\text{Total Feed Consumed (kg)}}{\text{Total Weight Gained (kg)}}$$
* **Mortality Rate Tracker:** Percentage loss per flock flagged with visual thresholds.
* **Batch Profit & Loss (P&L):** Net profit calculated in PKR per closed batch ($Revenue - Expenses$).

---

## 5. PostgreSQL Database Schema (Supabase)

```sql
-- 1. FLOCKS TABLE
create table flocks (
  id uuid primary key default gen_random_id(),
  batch_name text not null,
  flock_type text check (flock_type in ('broiler', 'layer')) default 'broiler',
  initial_count integer not null,
  current_count integer not null,
  arrival_date date not null,
  status text check (status in ('active', 'closed')) default 'active',
  created_at timestamp with time zone default now()
);

-- 2. DAILY LOGS TABLE
create table daily_logs (
  id uuid primary key default gen_random_id(),
  flock_id uuid references flocks(id) on delete cascade not null,
  log_date date not null default CURRENT_DATE,
  mortality_count integer default 0,
  feed_bags_consumed numeric(5,2) default 0,
  average_weight_kg numeric(5,2),
  eggs_collected integer default 0,
  notes text,
  created_at timestamp with time zone default now()
);

-- 3. DISPATCHES TABLE (DRIVERS)
create table dispatches (
  id uuid primary key default gen_random_id(),
  flock_id uuid references flocks(id) on delete cascade not null,
  driver_name text not null,
  driver_phone text,
  vehicle_number text not null,
  birds_loaded integer not null,
  crates_count integer,
  gross_weight_kg numeric(10,2),
  buyer_name text,
  dispatch_time timestamp with time zone default now(),
  notes text
);

-- 4. TRANSACTIONS TABLE (PKR Denominated)
create table transactions (
  id uuid primary key default gen_random_id(),
  flock_id uuid references flocks(id) on delete cascade,
  type text check (type in ('expense', 'income')) not null,
  category text not null,
  amount numeric(12,2) not null, -- Stored in PKR
  currency text default 'PKR',
  quantity numeric(10,2),
  buyer_name text,
  payment_status text check (payment_status in ('paid', 'pending', 'partial')) default 'paid',
  notes text,
  transaction_date date default CURRENT_DATE,
  created_at timestamp with time zone default now()
);