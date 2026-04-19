# Curriculum detail & Sakigake article URL tracking

This file is saved in **UTF-8**. If titles or notes look wrong in an editor, switch the file encoding to UTF-8 (BOM optional on Windows).

## How to track public posts on [sakigake-robo.com](https://sakigake-robo.com/)

1. Open **[curriculum-sakigake-urls.tsv](curriculum-sakigake-urls.tsv)** in Excel, Google Sheets, or any text editor.
2. When a lesson article is published, paste the **full permalink** into the `sakigake_article_url` column for that `unit_id`.
3. Use the optional `note` column for status (e.g. `draft`, `published`) or the post title.

### Unit IDs (same numbering as the full curriculum tables)

| Part | `part` in TSV | Unit IDs |
|------|----------------|----------|
| 第0部 基礎 | `0` | `0-1` … `0-12` |
| 第1部 Pico・ロボット | `1` | `1-1` … `1-12` |
| 第2部 PC・ゲーム等 | `2` | `2-1` … `2-11` |
| 第3部 生成AI | `3` | `3-1` … `3-8` |

### Markdown tables with a 「魁高専記事 URL」 column

If you maintain a Markdown version of the curriculum with a **last column for Sakigake URLs**, treat **`curriculum-sakigake-urls.tsv` as the single source of truth**: update the TSV first, then copy URLs into Markdown if you need them in prose.

---

## Full curriculum tables (Japanese)

The detailed per-unit tables (goals, exercises, outcomes) are maintained in the same repository; if they are missing or corrupted due to encoding, regenerate from project notes or restore from backup.

**Planning context:** see [python-learning-site-plan.md](python-learning-site-plan.md).

---

## 更新履歴 (changelog)

| Date | Change |
|------|--------|
| 2026-04-19 | Added `curriculum-sakigake-urls.tsv` and URL-tracking workflow. Markdown full tables may be restored separately. |
