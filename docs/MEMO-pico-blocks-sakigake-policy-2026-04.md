# MEMO (as of 2026-04): PicoBlocks, Sakigake curriculum, ops, business

Single place to recover context if a chat or agent session ends. **Authoritative task list:** [PROJECT-TASKS.md](PROJECT-TASKS.md).

---

## 1. PicoBlocks (tech)

- **Block-to-code line highlight** was extended so **value blocks** (e.g. string literal) also map to the generated line: `registerExprBlocksAtLine`, `registerExprBlocksAtLineFromInput`, and value-input detection (including via block output connection).
- **Policy:** keep **PicoBlocks free and open**; state that in README / site copy.
- **QA:** open `index.html` locally; smoke-test Python intro mode + MicroPython codegen.

---

## 2. Sakigake curriculum (planning docs)

- **Trajectory:** Part 0 browser basics ? Part 1 Pico + robot ? Part 2 PC games/app skeleton (e.g. Pygame) ? Part 3 gen-AI-assisted dev (ethics + workflow).
- **References (structure only, no copying):** JavaDrive Python intro, Real Python, W3Schools, learnpython.org, official Python tutorial for deep links.
- **Files:**
  - `python-learning-site-plan.md` — rollout phases (MVP ? expand).
  - `curriculum-detail.md` — unit tables; **restore full Japanese in UTF-8 inside the editor** (OneDrive + bulk tool writes can mojibake Japanese).
  - `curriculum-sakigake-urls.tsv` — **master list** for each `unit_id` and **`sakigake_article_url`** when a post goes live.

---

## 3. Monetization & brand (intent)

- **PicoBlocks:** stays **free**.
- **PoliviaBot:** **trademark filed** — use naming consistently on kits, docs, and sales pages.
- **Revenue shape:** **hardware / kit (“media”) sales** + **partial paywall on Sakigake articles** (e.g. teacher packs, answers).
- **Timing:** formal revenue aligned with **company incorporation planned April next year** (calendar year +1 after 2026-04); until then focus on audience, curriculum, and brand clarity.

---

## 4. Task mgmt + Claude / Cursor parity

- **`docs/PROJECT-TASKS.md`** — Active tasks + **Handoff log (newest first)** for continuity across tools.
- **`AGENTS.md`** — minimal agent startup / shutdown checklist; paths to workspace root `CLAUDE.md` and `rules/session-start.md`.
- **Workspace `CLAUDE.md`** — session start **step 5:** when touching PicoBlocks, read `PROJECT-TASKS.md` first; on exit, append Handoff if work was done.
- **`rules/session-start.md`** — PicoBlocks subsection + link to `????.md` one-liner.

---

## 5. Likely next steps

1. Sakigake MVP: landing + lessons 1–3 + PicoBlocks link or embed decision.
2. Fill `curriculum-sakigake-urls.tsv` as articles publish.
3. Restore Japanese curriculum tables in `curriculum-detail.md` (UTF-8, manual).
4. Align with incorporation timeline (April): SKUs, invoicing, Terms when selling.

---

## 6. File index (this repo `docs/`)

| File | Role |
|------|------|
| PROJECT-TASKS.md | Tasks + handoff |
| MEMO-pico-blocks-sakigake-policy-2026-04.md | This memo |
| python-learning-site-plan.md | Site rollout |
| curriculum-detail.md | Curriculum + optional Sakigake URL column |
| curriculum-sakigake-urls.tsv | URL tracking by unit |
