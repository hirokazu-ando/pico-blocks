# PicoBlocks

**Raspberry Pi Pico / MicroPython 向けブロックプログラミング環境**

ブロックを並べるだけで MicroPython コードが自動生成されます。
Web Serial API 対応ブラウザ（Chrome / Edge）から Pico への書き込み・実行も可能です。

**デモ → https://hirokazu-ando.github.io/pico-blocks/**

![PCBターミナル風のダークUI](https://img.shields.io/badge/UI-PCB%20Terminal-00ff41?style=flat-square&labelColor=060b06)
![MicroPython](https://img.shields.io/badge/MicroPython-v1.23-2196F3?style=flat-square)
![Blockly](https://img.shields.io/badge/Blockly-Zelos-E53935?style=flat-square)

---

## 特徴

- **ブロック → MicroPython 自動変換**：ブロックを置くたびにリアルタイムで生成
- **PoliviaBot 専用ブロック**：モーター・LED・スイッチ・超音波・ラインセンサー対応
- **Web Serial 接続**：Pico を接続して直接実行・main.py 書き込みが可能
- **コーディングモード**：生成されたコードをそのまま手編集できる
- **iPad 対応（デモモード）**：Web Serial 非対応環境では接続ボタンが自動的に非表示になり、ブロック操作・コード確認をタッチで体験できる
- **XML 保存 / 読込**：作成したブロックプログラムをファイルに保存して再利用できる

---

## ブロックカテゴリ

| カテゴリ | 主なブロック |
|---------|------------|
| **PoliviaBot** | 前進・後退・旋回・停止・LED・スイッチ・超音波センサー・ラインセンサー |
| **繰り返し** | ずっと繰り返す・〇回繰り返す・カウンター繰り返し |
| **分岐** | if / elif / else・比較・AND / OR / NOT |
| **時間** | 秒数待機 |
| **出力** | デジタル出力（HIGH / LOW） |
| **入力** | デジタル入力・アナログ入力（ADC） |
| **変数** | 変数セット・増減・条件比較 |
| **値** | 変数値・数値リテラル |
| **表示** | print・ラベル付き表示・区切り線 |

---

## 使い方

### デモ（書き込み不要）

1. https://hirokazu-ando.github.io/pico-blocks/ を開く
2. 左のカテゴリからブロックをドラッグして並べる
3. 右側にリアルタイムで MicroPython コードが生成される

iPad / スマートフォンでも動作します（タッチ操作対応）。

### Pico に書き込む

Chrome または Edge（デスクトップ版）が必要です。

1. 上記 URL を Chrome / Edge で開く
2. Raspberry Pi Pico を USB 接続する
3. 「接続」ボタン → ポートを選択
4. 「▶ 実行」でコードを直接実行、または「書き込み」で main.py に保存

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| ブロックエンジン | [Blockly](https://developers.google.com/blockly)（Zelos レンダラー） |
| コードエディタ | [CodeMirror 5](https://codemirror.net/)（Python シンタックスハイライト） |
| シリアル通信 | Web Serial API（Raw REPL） |
| 対象ハードウェア | Raspberry Pi Pico / Pico W |
| 対象言語 | MicroPython |

---

## 対応ブラウザ

| ブラウザ | ブロック操作 | Pico 接続 |
|---------|-----------|----------|
| Chrome（デスクトップ） | ✅ | ✅ |
| Edge（デスクトップ） | ✅ | ✅ |
| Safari（iPad / Mac） | ✅ | ❌（Web Serial 非対応） |
| Firefox | ✅ | ❌（Web Serial 非対応） |

---

## PoliviaBot について

PoliviaBot は大阪公立大学工業高等専門学校で開発しているロボット教材です。
本ツールはその専用プログラミング環境として開発しました。

---

## ライセンス

MIT License
