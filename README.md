# PicoBlocks

**Python 入門からロボット制御まで対応するブロックプログラミング環境**

ブロックを並べるだけで Python / MicroPython コードが自動生成されます。
ブラウザ内で Python を実行する「Python入門モード」と、Raspberry Pi Pico に書き込む「MicroPythonモード」の2モードを搭載しています。

**デモ → https://hirokazu-ando.github.io/pico-blocks/**

**タスク・セッション引き継ぎ** → [`docs/PROJECT-TASKS.md`](docs/PROJECT-TASKS.md)（ワークスペース [`CLAUDE.md`](../../CLAUDE.md) のセッション手順 step 5 と連携／[`AGENTS.md`](AGENTS.md) が最短入口）  
**文脈メモ（2026-04）** → [`docs/MEMO-pico-blocks-sakigake-policy-2026-04.md`](docs/MEMO-pico-blocks-sakigake-policy-2026-04.md)

魁高専（[sakigake-robo.com](https://sakigake-robo.com/)）向けの公開計画 → [`docs/python-learning-site-plan.md`](docs/python-learning-site-plan.md)  
**カリキュラム詳細（単元表・進行案）** → [`docs/curriculum-detail.md`](docs/curriculum-detail.md)  
**魁高専記事 URL の追跡（TSV）** → [`docs/curriculum-sakigake-urls.tsv`](docs/curriculum-sakigake-urls.tsv)

![PCBターミナル風のダークUI](https://img.shields.io/badge/UI-PCB%20Terminal-00ff41?style=flat-square&labelColor=060b06)
![MicroPython](https://img.shields.io/badge/MicroPython-v1.23-2196F3?style=flat-square)
![Blockly](https://img.shields.io/badge/Blockly-Zelos-E53935?style=flat-square)
![Python入門](https://img.shields.io/badge/Python入門-Skulpt-f7c948?style=flat-square)

---

## 2つのモード

### 🐍 Python入門モード

Python をこれから学ぶ学生向けのモードです。  
ブラウザ内で **Skulpt** により実行されるため、**実機不要**。`▶ 実行` ボタンで即座に動作確認できます。  
授業の導入・自学自習・プログラミング入門に適しています。

- 文字列・True/False・算術演算ブロックを含む充実したブロックセット
- キーボード入力（`input()`）対応
- 変数名はドロップダウンで選択（手打ち不要）
- while ループ・for ループ両対応

### 🤖 MicroPythonモード（Raspberry Pi Pico / PoliviaBot）

Raspberry Pi Pico やロボット教材「PoliviaBot」を使った制御学習向けのモードです。  
Web Serial API でブラウザから Pico に直接接続し、コードの実行・`main.py` 書き込みができます。

---

## ブロック一覧

### Python入門モード

| カテゴリ | ブロック |
|---------|---------|
| **繰り返し** | 〇回繰り返す・カウンター繰り返す（from-to）・while ループ |
| **分岐** | if / elif / else・比較（文字列も可）・AND / OR / NOT |
| **時間** | 秒数待機 |
| **変数** | セット・増減（変数名はドロップダウン選択） |
| **値** | 変数・数値・文字列・True / False |
| **計算** | 算術演算（+ − × ÷ // % **）・文字列連結 |
| **入力** | キーボード入力（テキスト・整数・小数） |
| **表示** | 値を表示・テキスト表示・ラベル＋変数・区切り線 |

### MicroPythonモード

| カテゴリ | ブロック |
|---------|---------|
| **PoliviaBot** | 前進・後退・旋回・停止・LED・スイッチ・超音波センサー・ラインセンサー |
| **繰り返し** | ずっと繰り返す・〇回繰り返す・カウンター繰り返し |
| **分岐** | if / elif / else・比較・AND / OR / NOT |
| **時間** | 秒数待機 |
| **出力** | デジタル出力（HIGH / LOW） |
| **入力** | デジタル入力・アナログ入力（ADC） |
| **変数** | セット・増減・条件比較 |
| **値** | 変数・数値 |
| **表示** | print・ラベル付き・区切り線 |

---

## 使い方

### Python入門モードで試す（実機不要）

1. [デモURL](https://hirokazu-ando.github.io/pico-blocks/) を開く
2. 「Python入門」ボタンを選ぶ（初期状態で選択済み）
3. 左のカテゴリからブロックをドラッグして並べる
4. 右側にリアルタイムで Python コードが生成される
5. `▶ 実行` ボタンで実行結果を確認する

iPad / スマートフォンでも動作します（タッチ操作対応）。

### Pico に書き込む（MicroPythonモード）

Chrome または Edge（デスクトップ版）が必要です。

1. 上記 URL を Chrome / Edge で開く
2. 「MicroPython」ボタンを選ぶ
3. Raspberry Pi Pico を USB 接続する
4. 「接続」ボタン → ポートを選択
5. ブロックを並べてコードを生成する
6. 「▶ 実行」で直接実行、または「書き込み」で `main.py` に保存

---

## チュートリアル機能

`📘 ガイド` ボタンを押すと、手順を順番に案内するチュートリアルパネルが開きます。

- **Python入門**：print → 変数 → 繰り返し → if → キーボード入力 の5ステップ
- **MicroPython**：LED点灯 → 点滅 → PoliviaBot前進 → スイッチ制御 の4ステップ
- ブロックを置くと自動でクリア判定（次へボタンが有効になる）
- 💡 ヒントの折りたたみ表示に対応

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| ブロックエンジン | [Blockly](https://developers.google.com/blockly)（Zelos レンダラー） |
| コードエディタ | [CodeMirror 5](https://codemirror.net/)（Python シンタックスハイライト） |
| Python 実行（ブラウザ内） | [Skulpt](https://skulpt.org/) v1.2.0 |
| シリアル通信 | Web Serial API（Raw REPL） |
| 対象ハードウェア | Raspberry Pi Pico / Pico W |
| 対象言語 | 標準 Python（入門モード）/ MicroPython（Pico モード） |

---

## 対応ブラウザ

| ブラウザ | ブロック操作・Python実行 | Pico 接続（MicroPython） |
|---------|----------------------|----------------------|
| Chrome（デスクトップ） | ✅ | ✅ |
| Edge（デスクトップ） | ✅ | ✅ |
| Safari（iPad / Mac） | ✅ | ❌（Web Serial 非対応） |
| Firefox | ✅ | ❌（Web Serial 非対応） |

---

## PoliviaBot について

PoliviaBot は大阪公立大学工業高等専門学校で開発しているロボット教材です。  
本ツールはその専用プログラミング環境として開発しましたが、Python入門モードは  
Pico 不要でどなたでも利用できます。

---

## ライセンス

MIT License
