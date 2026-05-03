// =====================================================
// Part 5: 画像処理ブロック定義
// pyco_cv: load / show / filter / pixel operations
// =====================================================

(() => {
'use strict';
const P = window.PycoPalette;

Blockly.Blocks['cv_import'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('import pyco_cv');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.cv);
    this.setTooltip('画像処理モジュールをインポートする（最初に置く）');
  }
};

Blockly.Blocks['cv_load'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('画像読込  変数')
      .appendField(new Blockly.FieldVariable('img'), 'VAR')
      .appendField('← pyco_cv.load(')
      .appendField(new Blockly.FieldDropdown([
        ['グラデーション', 'gradient'],
        ['チェック柄',     'checker'],
        ['サークル',       'circle'],
        ['ストライプ',     'stripes']
      ]), 'SAMPLE')
      .appendField(')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.cv);
    this.setTooltip('サンプル画像を読み込んで変数に代入する');
  }
};

Blockly.Blocks['cv_show'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('表示  pyco_cv.show(  画像:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.cv);
    this.setTooltip('画像を画面に表示する');
  }
};

Blockly.Blocks['cv_to_gray'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('グレースケール  pyco_cv.to_gray(  画像:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.cv);
    this.setTooltip('カラー画像をグレースケール（白黒）に変換して返す');
  }
};

Blockly.Blocks['cv_filter_blur'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('ぼかし  pyco_cv.filter_blur(  画像:');
    this.appendDummyInput()
      .appendField('  サイズ:')
      .appendField(new Blockly.FieldNumber(3, 1, 15, 2), 'SIZE')
      .appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.cv);
    this.setTooltip('画像をぼかして返す（サイズが大きいほどぼける）');
  }
};

Blockly.Blocks['cv_filter_edge'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('エッジ検出  pyco_cv.filter_edge(  画像:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.cv);
    this.setTooltip('ソーベルフィルタでエッジ（輪郭）を検出して返す');
  }
};

Blockly.Blocks['cv_brightness'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('明るさ  pyco_cv.brightness(  画像:');
    this.appendDummyInput()
      .appendField('  変化量:')
      .appendField(new Blockly.FieldNumber(50, -255, 255, 1), 'DELTA')
      .appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.cv);
    this.setTooltip('明るさを変えた画像を返す（正=明るく・負=暗く）');
  }
};

Blockly.Blocks['cv_get_pixel'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('ピクセル取得  pyco_cv.get_pixel(  画像:');
    this.appendValueInput('X')
      .setCheck(null)
      .appendField('  x:');
    this.appendValueInput('Y')
      .setCheck(null)
      .appendField('  y:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.cv);
    this.setTooltip('座標(x,y)のピクセルの色を [r, g, b] リストで返す');
  }
};

Blockly.Blocks['cv_set_pixel'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('ピクセル設定  pyco_cv.set_pixel(  画像:');
    this.appendValueInput('X')
      .setCheck(null)
      .appendField('  x:');
    this.appendValueInput('Y')
      .setCheck(null)
      .appendField('  y:');
    this.appendValueInput('R')
      .setCheck(null)
      .appendField('  r:');
    this.appendValueInput('G')
      .setCheck(null)
      .appendField('  g:');
    this.appendValueInput('B')
      .setCheck(null)
      .appendField('  b:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.cv);
    this.setTooltip('座標(x,y)のピクセルの色を(r,g,b)に変える');
  }
};

Blockly.Blocks['cv_width'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('幅  pyco_cv.get_width(  画像:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.cv);
    this.setTooltip('画像の幅（ピクセル数）を返す');
  }
};

Blockly.Blocks['cv_height'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('高さ  pyco_cv.get_height(  画像:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.cv);
    this.setTooltip('画像の高さ（ピクセル数）を返す');
  }
};

Blockly.Blocks['cv_resize'] = {
  init: function() {
    this.appendValueInput('IMG')
      .setCheck(null)
      .appendField('リサイズ  pyco_cv.resize(  画像:');
    this.appendValueInput('W')
      .setCheck(null)
      .appendField('  幅:');
    this.appendValueInput('H')
      .setCheck(null)
      .appendField('  高さ:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.cv);
    this.setTooltip('画像を指定した幅・高さにリサイズして返す');
  }
};

Blockly.Blocks['cv_copy'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('コピー  変数')
      .appendField(new Blockly.FieldVariable('img2'), 'VAR')
      .appendField('← pyco_cv.copy(');
    this.appendValueInput('IMG')
      .setCheck(null);
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.cv);
    this.setTooltip('画像のコピーを変数に代入する（元の画像を変えずに編集したいときに使う）');
  }
};

})();
