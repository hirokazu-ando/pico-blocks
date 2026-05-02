// =====================================================
// Part 2: データ分析モード専用ブロック定義
// matplotlib / statistics / csv
// =====================================================

(() => {
'use strict';
const P = window.PycoPalette;

// ─────────────────────────────────────────
// matplotlib.pyplot ブロック (color: P.chart)
// ─────────────────────────────────────────

Blockly.Blocks['py_import_plt'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('import matplotlib.pyplot as plt');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('matplotlibをインポートする（グラフを描く前に一番最初に置く）');
  }
};

Blockly.Blocks['py_plt_plot'] = {
  init: function() {
    this.appendValueInput('X')
      .setCheck(null)
      .appendField('折れ線グラフ  plt.plot(  x:');
    this.appendValueInput('Y')
      .setCheck(null)
      .appendField('  y:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('折れ線グラフのデータを追加する');
  }
};

Blockly.Blocks['py_plt_bar'] = {
  init: function() {
    this.appendValueInput('X')
      .setCheck(null)
      .appendField('棒グラフ  plt.bar(  ラベル:');
    this.appendValueInput('Y')
      .setCheck(null)
      .appendField('  高さ:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('棒グラフのデータを追加する');
  }
};

Blockly.Blocks['py_plt_scatter'] = {
  init: function() {
    this.appendValueInput('X')
      .setCheck(null)
      .appendField('散布図  plt.scatter(  x:');
    this.appendValueInput('Y')
      .setCheck(null)
      .appendField('  y:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('散布図のデータを追加する');
  }
};

Blockly.Blocks['py_plt_hist'] = {
  init: function() {
    this.appendValueInput('DATA')
      .setCheck(null)
      .appendField('ヒストグラム  plt.hist(  データ:');
    this.appendDummyInput()
      .appendField('  bins:')
      .appendField(new Blockly.FieldDropdown([
        ['5',   '5'],
        ['10',  '10'],
        ['20',  '20'],
        ['自動', 'auto'],
      ]), 'BINS')
      .appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('ヒストグラムを追加する');
  }
};

Blockly.Blocks['py_plt_title'] = {
  init: function() {
    this.appendValueInput('TEXT')
      .setCheck(null)
      .appendField('タイトル  plt.title(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('グラフのタイトルを設定する');
  }
};

Blockly.Blocks['py_plt_xlabel'] = {
  init: function() {
    this.appendValueInput('TEXT')
      .setCheck(null)
      .appendField('X軸ラベル  plt.xlabel(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('X軸のラベルを設定する');
  }
};

Blockly.Blocks['py_plt_ylabel'] = {
  init: function() {
    this.appendValueInput('TEXT')
      .setCheck(null)
      .appendField('Y軸ラベル  plt.ylabel(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('Y軸のラベルを設定する');
  }
};

Blockly.Blocks['py_plt_show'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('グラフを表示  plt.show()');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.chart);
    this.setTooltip('グラフを画面に表示する（plt.plotなどの後に呼ぶ）');
  }
};

// ─────────────────────────────────────────
// statistics ブロック (color: P.stats)
// ─────────────────────────────────────────

Blockly.Blocks['py_import_stats'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('import statistics');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.stats);
    this.setTooltip('statisticsモジュールをインポートする（統計計算に使う）');
  }
};

Blockly.Blocks['py_stats_mean'] = {
  init: function() {
    this.appendValueInput('DATA')
      .setCheck(null)
      .appendField('平均  statistics.mean(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.stats);
    this.setTooltip('リストの平均を返す');
  }
};

Blockly.Blocks['py_stats_median'] = {
  init: function() {
    this.appendValueInput('DATA')
      .setCheck(null)
      .appendField('中央値  statistics.median(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.stats);
    this.setTooltip('リストの中央値を返す');
  }
};

Blockly.Blocks['py_stats_stdev'] = {
  init: function() {
    this.appendValueInput('DATA')
      .setCheck(null)
      .appendField('標準偏差  statistics.stdev(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.stats);
    this.setTooltip('リストの標準偏差を返す');
  }
};

Blockly.Blocks['py_stats_mode'] = {
  init: function() {
    this.appendValueInput('DATA')
      .setCheck(null)
      .appendField('最頻値  statistics.mode(');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.stats);
    this.setTooltip('リストの最頻値を返す');
  }
};

// ─────────────────────────────────────────
// csv ブロック (color: P.stats)
// ─────────────────────────────────────────

Blockly.Blocks['py_import_csv'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('import csv');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.stats);
    this.setTooltip('csvモジュールをインポートする');
  }
};

Blockly.Blocks['py_csv_read_rows'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('CSV読み込み  変数')
      .appendField(new Blockly.FieldVariable('rows'), 'VAR')
      .appendField('← ファイル名:')
      .appendField(new Blockly.FieldTextInput('data.csv'), 'FILENAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.stats);
    this.setTooltip('仮想FSのCSVを行リスト（文字列リスト）として読む。先頭行はヘッダとしてスキップされる');
  }
};

Blockly.Blocks['py_csv_get_col'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('列を取り出す  変数')
      .appendField(new Blockly.FieldVariable('col'), 'VAR')
      .appendField('← rows変数')
      .appendField(new Blockly.FieldVariable('rows'), 'ROWS')
      .appendField('  列番号:')
      .appendField(new Blockly.FieldNumber(0, 0), 'COL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.stats);
    this.setTooltip('CSVのrowsから指定列番号の値を数値リストとして取り出す');
  }
};

})();
