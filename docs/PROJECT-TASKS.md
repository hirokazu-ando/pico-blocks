# PycoBlocks -- Project tasks & session handoff

**Purpose:** Single place for task status so work continues after any chat or agent ends.  
**Rule:** Append **Handoff log** at end of each session. Move items between Active / Done / Backlog.

**Integration (Claude workspace):** Root **`CLAUDE.md`** step 5 and **`rules/session-start.md`** (PycoBlocks subsection) tell every agent to read this file first. **`AGENTS.md`** in this repo is the short entry point. **Context memo:** [MEMO-pico-blocks-sakigake-policy-2026-04.md](MEMO-pico-blocks-sakigake-policy-2026-04.md).

---

## Next session (read first)

1. Read **Handoff log** (newest entry at top).  
2. Work **Active tasks** from top to bottom unless handoff says otherwise.  
3. Docs: [python-learning-site-plan.md](python-learning-site-plan.md), [curriculum-detail.md](curriculum-detail.md), [curriculum-sakigake-urls.tsv](curriculum-sakigake-urls.tsv).  
4. Demo URL: see root [README.md](../README.md).

---

## Current milestone (one line)

Ship Sakigake MVP (few lessons + PycoBlocks entry) and stabilize curriculum / URL tracking (TSV).

---

## Active tasks (priority top-first)

- [ ] **Sakigake MVP:** Define landing + lesson 1--3 structure (copy vs PycoBlocks link vs iframe).  
- [ ] **curriculum-sakigake-urls.tsv:** Fill `sakigake_article_url` as posts go live (by `unit_id`).  
- [ ] **curriculum-detail.md:** Restore full Japanese unit tables in UTF-8 via editor (avoid tool-only bulk writes on OneDrive).  
- [ ] **PycoBlocks:** Lesson deep-links (mode query, starter XML) -- open issue when needed.  
- [x] **PycoBlocks ブロック追加:** カリキュラム対応ブロック追加・ツールボックス整理（2026-04-20）
- [ ] **QA:** Open `index.html` locally; smoke-test Python intro + MicroPython codegen/run.

---

## Backlog

- [ ] Part 2 stack: pick one stack for games (e.g. Pygame) for the whole track.  
- [ ] Part 3 gen-AI: write campus policy / allowed tools blurb.  
- [ ] Optional link to workspace root `revision_log.md` if PycoBlocks mistakes should mirror lab-wide rules.

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
| PycoBlocks embed | iframe vs new tab (same-origin constraints) |

---

## Handoff log (append NEW blocks at the TOP)

### 2026-04-20 (light theme)

- **Done:** ライトモード（白テーマ）追加。`css/style.css` に `[data-theme="light"]` を追加（背景・ヘッダー・CodeMirror・Blocklyツールボックスの色を白系に上書き）。`js/app.js` の `THEMES` 配列に `{id:'light', label:'白', cmTheme:'default'}` を追加し、`applyTheme` で CodeMirror テーマも切替（dracula↔default）。ボタンは既存の「緑→青→橙→白→緑」サイクルに統合。`localStorage` で記憶済み。
- **Next:** Chrome で index.html を開き、ボタンを「白」に切替して動作確認。
- **Notes:** Blockly ブロック本体の色はライト化対象外（Blockly の SVG/theme API で別途対応が必要）。

### 2026-04-20 (security)

- **Done:** セキュリティ調査 + 修正。SRI integrity 属性を全外部CDN（Blockly/Skulpt/CodeMirror 計5ファイル）に追加。Blockly バージョンを `@12.5.1` にピン留め。`.gitignore` を新規作成（.env・node_modules・__pycache__ 等を登録）。APIキー流出・個人情報露出・eval使用なし確認済み。
- **Next:** ブラウザ実機動作確認（index.html を Chrome で開き SRI エラーが出ないか確認）。その後 Sakigake MVP 定義。
- **Notes:** Google Fonts は動的レスポンスのため SRI 適用不可（仕様上の制限）。

### 2026-04-20

- **Done:** Python入門モードにカリキュラム第0部対応ブロックを追加。リスト（6ブロック）・関数（5ブロック）・計算追加（4ブロック: 型変換/絶対値/round/乱数）・ループ制御（break/continue）・リストfor-each。計17ブロック追加。MicroPython toolboxからvar_if_greater/less除外（pico_if+cond_compareで代替）。全JS構文チェック・ユニットテスト8/8 pass。
- **Next:** ブラウザ実機動作確認（index.htmlをChromeで開いてQA）。その後 Sakigake MVP定義。
- **Notes:** libasound2 未インストールのためPlaywright自動テスト不可。ローカルChromeでの手動確認を推奨。

### 2026-04-19 (session end)

- **Done (this session, outside pico code):** `??/public-channels-en.md` + `public-channels.md` stub; `startup-manager/SKILL.md` public-channel table; user decided to split ??? / ?? / ???.  
- **Next:** Pick next item from **Active tasks**; fill `public-channels-en.md` TBDs when domain/shop URL are set.  
- **Note:** User signed off for now.

### 2026-04-19 (memo)

- **Done:** **`docs/MEMO-pico-blocks-sakigake-policy-2026-04.md`** � consolidated memo (tech highlight, curriculum, TSV, monetization/PoliviaBot/PycoBlocks free, company timeline, Claude/CLAUDE.md linkage). English body for stable encoding on OneDrive.  
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
