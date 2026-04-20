# PycoBlocks

**Python 入門からロボット制御まで対応するブロックプログラミング環境**

ブロックを並べるだけで Python / MicroPython コードが自動生成されます。

**デモ → https://hirokazu-ando.github.io/pyco-blocks/**

![PCBターミナル風のダークUI](https://img.shields.io/badge/UI-PCB%20Terminal-00ff41?style=flat-square&labelColor=060b06)
![MicroPython](https://img.shields.io/badge/MicroPython-v1.23-2196F3?style=flat-square)
![Blockly](https://img.shields.io/badge/Blockly-Zelos-E53935?style=flat-square)
![Python入門](https://img.shields.io/badge/Python入門-Skulpt-f7c948?style=flat-square)

---

## 2つのモード

### 🐍 Python入門モード

ブラウザ内で **Skulpt** により実行されるため、**実機不要**。  
授業の導入・自学自習・プログラミング入門に適しています。

- 文字列・True/False・算術演算・リスト・関数など充実したブロックセット
- キーボード入力（`input()`）対応
- 変数名はドロップダウンで選択
- while / for ループ、break / continue 対応

### 🤖 MicroPythonモード（Raspberry Pi Pico / PoliviaBot）

Web Serial API でブラウザから Pico に直接接続し、コードの実行・`main.py` 書き込みができます。

---

## ブロック一覧

### Python入門モード

| カテゴリ | ブロック |
|---------|---------|
| **繰り返し** | 〇回繰り返す・カウンター繰り返す・while・for-each・break / continue |
| **分岐** | if / elif / else・比較・AND / OR / NOT |
| **変数** | セット・増減 |
| **値** | 変数・数値・文字列・True / False |
| **計算** | 算術演算・文字列連結・型変換・絶対値・round・乱数 |
| **リスト** | 作成・追加・取得・長さ・検索・削除 |
| **関数** | 定義・引数あり・戻り値あり・呼び出し |
| **入力** | キーボード入力（テキスト・整数・小数） |
| **表示** | 値を表示・テキスト・ラベル＋変数・区切り線 |

### MicroPythonモード

| カテゴリ | ブロック |
|---------|---------|
| **PoliviaBot** | 前進・後退・旋回・停止・LED・スイッチ・超音波センサー・ラインセンサー |
| **繰り返し** | ずっと繰り返す・〇回繰り返す・カウンター繰り返し |
| **分岐** | if / elif / else・比較・AND / OR / NOT |
| **時間** | 秒数待機 |
| **出力** | デジタル出力（HIGH / LOW） |
| **入力** | デジタル入力・アナログ入力（ADC） |
| **変数** | セット・増減 |
| **値** | 変数・数値 |
| **表示** | print・ラベル付き・区切り線 |

---

## 使い方

### Python入門モード（実機不要）

1. [デモURL](https://hirokazu-ando.github.io/pyco-blocks/) を開く
2. 「Python」ボタンを選ぶ（初期状態で選択済み）
3. 左のカテゴリからブロックをドラッグして並べる
4. 右側にリアルタイムで Python コードが生成される
5. `▶ 実行` ボタンで実行結果を確認する

### MicroPythonモード（Pico接続）

Chrome または Edge（デスクトップ版）が必要です。

1. デモURL を Chrome / Edge で開く
2. 「μPython」ボタンを選ぶ
3. Raspberry Pi Pico を USB 接続する
4. 「接続」ボタン → ポートを選択
5. ブロックを並べてコードを生成する
6. 「▶ 実行」で直接実行、または「書き込み」で `main.py` に保存

---

## チュートリアル機能

`ガイド` ボタンを押すと手順を順番に案内するパネルが開きます。

- **Python入門**：print → 変数 → 繰り返し → if → キーボード入力
- **MicroPython**：LED点灯 → 点滅 → PoliviaBot前進 → スイッチ制御

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| ブロックエンジン | [Blockly](https://developers.google.com/blockly) 12.5.1（Zelos レンダラー） |
| コードエディタ | [CodeMirror](https://codemirror.net/) 5.65.16 |
| Python 実行 | [Skulpt](https://skulpt.org/) 1.2.0 |
| シリアル通信 | Web Serial API |
| 対象ハードウェア | Raspberry Pi Pico / Pico W |

---

## 対応ブラウザ

| ブラウザ | Python実行 | Pico接続 |
|---------|-----------|---------|
| Chrome / Edge（デスクトップ） | ✅ | ✅ |
| Safari（iPad / Mac） | ✅ | ❌ |
| Firefox | ✅ | ❌ |

---

## PoliviaBot について

PoliviaBot は大阪公立大学工業高等専門学校で開発しているロボット教材です。  
Python入門モードは Pico 不要でどなたでも利用できます。

---

## ライセンス

MIT License
