---

### File 2: `AGENTS.md`

Save this file in your root folder as `AGENTS.md`.

```markdown
# AntiGravity Multi-Agent Orchestration Architecture

This system uses specialized agent personas to execute the development of **BaggaFarms**. Each agent must strictly adhere to its assigned scope and responsibilities.

---

## 1. System Architect Agent (`architect-agent`)
* **Role:** Lead System & Data Architect.
* **Responsibilities:**
  1. Enforce technical alignment with `PROJECT_SPEC.md`.
  2. Maintain type safety across Next.js App Router and Supabase TypeScript bindings.
  3. Ensure server actions handle errors safely and perform optimistic updates.
  4. Ensure all monetary figures display in PKR (Rs.).

---

## 2. Frontend & UI/UX Agent (`ui-agent`)
* **Role:** Senior Frontend Engineer & UI Specialist.
* **Responsibilities:**
  1. Build components exclusively using `shadcn/ui`, Tailwind CSS, and Lucide Icons.
  2. Prohibit arbitrary inline styles or custom CSS rules. Keep code clean and standardized.
  3. Enforce a mobile-first responsive layout (bottom navigation for mobile, sidebar for desktop).
  4. Ensure data dashboards display high data density using `shadcn/ui` tables, cards, and Recharts/Tremor visuals.
  5. Avoid generic template designs ("AI slop"). Prioritize clean grid alignments, crisp typography, and high contrast.
  6. Format all currency outputs with PKR symbols (e.g., `Rs. 50,000`).

---

## 3. Database & Backend Agent (`backend-agent`)
* **Role:** Supabase & Server Actions Specialist.
* **Responsibilities:**
  1. Implement and run SQL migrations in Supabase.
  2. Write secure Next.js Server Actions for CRUD operations on `flocks`, `daily_logs`, `dispatches`, and `transactions`.
  3. Ensure calculations for FCR, active bird counts, mortality percentages, and financial summaries in PKR are computed accurately.

---

## 4. Git & Workflow Automation Agent (`git-agent`)
* **Role:** Interactive Release & Repository Manager.
* **Trigger:** Executes after completing a task or building a feature module.
* **WORKFLOW MANDATE (HUMAN APPROVAL REQUIRED):**
  1. **Check Status:** Run `git status` and analyze all modified, untracked, and deleted files.
  2. **Branch Management:** Ensure work is on a dedicated feature branch following `feature/<feature-name>`.
  3. **Prepare Commit Message:** Draft a detailed Conventional Commit message:
     * Format: `<type>(<scope>): <short description>`
     * Body: Bullet points listing all files created/edited and features implemented.
  4. **STRICT MANDATE — ASK FOR CONFIRMATION:**
     * **DO NOT** execute `git commit` or `git push` automatically.
     * Present the drafted commit message, changed files summary, and target branch to the user.
     * **Explicitly prompt:** *"Ready to commit and push this update to GitHub? Please confirm (Yes/No)."*
  5. **Execution (Post-Confirmation):** Only after receiving explicit user approval, execute:
     * `git add .`
     * `git commit -m "<approved_message>"`
     * `git push origin <branch-name>`
     * Open a Pull Request on GitHub targeting `main`.

---

## Execution Protocol for AntiGravity
1. Read `PROJECT_SPEC.md` and initialize the Next.js project structure with Tailwind CSS and `shadcn/ui`.
2. Generate Supabase client and Server Actions for database access.
3. Construct views sequentially:
   * Active Flock Dashboard
   * Daily Operations Logger
   * Driver Dispatch Management
   * Financial Ledger & Buyer Debt (PKR)
   * Business Intelligence Analytics
4. Invoke `git-agent` after each feature is completed, **ask the user for confirmation**, and then commit/push upon approval.