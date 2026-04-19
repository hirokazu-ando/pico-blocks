# PicoBlocks -- Project tasks & session handoff

**Purpose:** Single place for task status so work continues after any chat or agent ends.  
**Rule:** Append **Handoff log** at end of each session. Move items between Active / Done / Backlog.

**Integration (Claude workspace):** Root **`CLAUDE.md`** step 5 and **`rules/session-start.md`** (PicoBlocks subsection) tell every agent to read this file first. **`AGENTS.md`** in this repo is the short entry point. **Context memo:** [MEMO-pico-blocks-sakigake-policy-2026-04.md](MEMO-pico-blocks-sakigake-policy-2026-04.md).

---

## Next session (read first)

1. Read **Handoff log** (newest entry at top).  
2. Work **Active tasks** from top to bottom unless handoff says otherwise.  
3. Docs: [python-learning-site-plan.md](python-learning-site-plan.md), [curriculum-detail.md](curriculum-detail.md), [curriculum-sakigake-urls.tsv](curriculum-sakigake-urls.tsv).  
4. Demo URL: see root [README.md](../README.md).

---

## Current milestone (one line)

Ship Sakigake MVP (few lessons + PicoBlocks entry) and stabilize curriculum / URL tracking (TSV).

---

## Active tasks (priority top-first)

- [ ] **Sakigake MVP:** Define landing + lesson 1--3 structure (copy vs PicoBlocks link vs iframe).  
- [ ] **curriculum-sakigake-urls.tsv:** Fill `sakigake_article_url` as posts go live (by `unit_id`).  
- [ ] **curriculum-detail.md:** Restore full Japanese unit tables in UTF-8 via editor (avoid tool-only bulk writes on OneDrive).  
- [ ] **PicoBlocks:** Lesson deep-links (mode query, starter XML) -- open issue when needed.  
- [ ] **QA:** Open `index.html` locally; smoke-test Python intro + MicroPython codegen/run.

---

## Backlog

- [ ] Part 2 stack: pick one stack for games (e.g. Pygame) for the whole track.  
- [ ] Part 3 gen-AI: write campus policy / allowed tools blurb.  
- [ ] Optional link to workspace root `revision_log.md` if PicoBlocks mistakes should mirror lab-wide rules.

---

## Completed recently

- [x] Sakigake rollout doc + URL tracking TSV (`curriculum-sakigake-urls.tsv`).  
- [x] Readable `python-learning-site-plan.md` + README links.  
- [x] Blockly selection highlight for value blocks (`registerExprBlocksAtLine` etc. in `js/app.js`).

---

## Blocked / decisions

| Topic | Question |
|-------|----------|
| MVP audience | Class-first vs Sakigake general reader |
| PicoBlocks embed | iframe vs new tab (same-origin constraints) |

---

## Handoff log (append NEW blocks at the TOP)

### 2026-04-19 (session end)

- **Done (this session, outside pico code):** `??/public-channels-en.md` + `public-channels.md` stub; `startup-manager/SKILL.md` public-channel table; user decided to split ??? / ?? / ???.  
- **Next:** Pick next item from **Active tasks**; fill `public-channels-en.md` TBDs when domain/shop URL are set.  
- **Note:** User signed off for now.

### 2026-04-19 (memo)

- **Done:** **`docs/MEMO-pico-blocks-sakigake-policy-2026-04.md`** ù consolidated memo (tech highlight, curriculum, TSV, monetization/PoliviaBot/PicoBlocks free, company timeline, Claude/CLAUDE.md linkage). English body for stable encoding on OneDrive.  
- **Next:** Same as Active tasks; fill `curriculum-sakigake-urls.tsv` when Sakigake posts go live.  
- **Note:** Full Japanese prose can be pasted into `curriculum-detail.md` locally via UTF-8 editor.

### 2026-04-19

- **Done:** Added `docs/PROJECT-TASKS.md`, `AGENTS.md`, README pointer for continuation after agent ends.  
- **Next:** Owner fills Active priorities; restore JP curriculum tables in `curriculum-detail.md` manually if needed.  
- **Note:** Prefer UTF-8 save in Cursor for long Japanese Markdown on OneDrive.

### Template (copy)

```
### YYYY-MM-DD

- **Done:**
- **Next:**
- **Notes:**
```
