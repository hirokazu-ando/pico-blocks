# Sakigake × PycoBlocks: Python learning site rollout plan

**Goal:** Publish staged Python teaching materials on [sakigake-robo.com](https://sakigake-robo.com/), inspired by the structure of [JavaDrive Python intro](https://www.javadrive.jp/python/), using **PycoBlocks** embedded or linked.

**Detailed curriculum (parts 0–3):** [curriculum-detail.md](curriculum-detail.md)  
**Track published article URLs:** [curriculum-sakigake-urls.tsv](curriculum-sakigake-urls.tsv) (`sakigake_article_url` column).  
**Python intro toolbox (for writing):** [pycoblocks-python-intro-toolbox.md](pycoblocks-python-intro-toolbox.md)  
**Machine-readable Part 0 + draft generator:** [data/curriculum-articles-part0.json](data/curriculum-articles-part0.json) · [`tools/generate_sakigake_draft.py`](../tools/generate_sakigake_draft.py)

**Rules**

- Do not copy third-party prose; use others only for ordering ideas.
- Decide separately whether to merge with the existing WordPress "Python" category.

---

## Deliverables (concept)

| Item | Place |
|------|--------|
| Lesson text | Sakigake pages / posts |
| Block IDE | `pico-blocks` on GitHub Pages — iframe or new tab |
| Starter workspace | `.xml` or future URL params |

---

## Phases (see curriculum-detail for “start here” notes)

- **A** — Scope: one curriculum sheet; block vs text-only topics.
- **B** — MVP on Sakigake: one course entry + 2–3 lessons with PycoBlocks link.
- **C** — Expand content following part 0 ? 3.
- **D** — UX (progress, checks) — optional.
- **E** — PycoBlocks deep links — optional.

---

## Lesson template (copy)

1. Title  
2. Audience / prerequisites  
3. Time (read / hands-on)  
4. Learning outcome (verbs)  
5. Body  
6. PycoBlocks activity  
7. One check question  
8. Next lesson link  

---

## References

- [sakigake-robo.com](https://sakigake-robo.com/)  
- [JavaDrive Python](https://www.javadrive.jp/python/)  
- [curriculum-detail.md](curriculum-detail.md) · [curriculum-sakigake-urls.tsv](curriculum-sakigake-urls.tsv)

---

## Changelog

| Date | Note |
|------|------|
| 2026-04-19 | Added Sakigake URL TSV tracking; plan file normalized (encoding-safe). |
| 2026-04-20 | Linked `curriculum-articles-part0.json` and `generate_sakigake_draft.py` for article automation. |
