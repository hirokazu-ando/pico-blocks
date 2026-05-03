// =====================================================
// Part 6: 機械学習ブロック定義
// pyco_ml: KNN / LinearRegression / accuracy / split
// =====================================================

(() => {
'use strict';
const P = window.PycoPalette;

Blockly.Blocks['ml_import'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('import pyco_ml');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.ml);
    this.setTooltip('機械学習モジュールをインポートする（最初に置く）');
  }
};

Blockly.Blocks['ml_knn'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('KNN分類器  変数')
      .appendField(new Blockly.FieldVariable('clf'), 'VAR')
      .appendField('← pyco_ml.KNN(  k:')
      .appendField(new Blockly.FieldNumber(3, 1, 20, 1), 'K')
      .appendField(')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.ml);
    this.setTooltip('K近傍法の分類器を作る。k は近くのデータを何個見るか');
  }
};

Blockly.Blocks['ml_linreg'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('線形回帰  変数')
      .appendField(new Blockly.FieldVariable('reg'), 'VAR')
      .appendField('← pyco_ml.LinearRegression()');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.ml);
    this.setTooltip('線形回帰モデルを作る（数値の予測に使う）');
  }
};

Blockly.Blocks['ml_fit'] = {
  init: function() {
    this.appendValueInput('MODEL')
      .setCheck(null)
      .appendField('学習  モデル:');
    this.appendValueInput('X_TRAIN')
      .setCheck(null)
      .appendField('  訓練データ X:');
    this.appendValueInput('Y_TRAIN')
      .setCheck(null)
      .appendField('  ラベル y:');
    this.appendDummyInput().appendField('  .fit()');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.ml);
    this.setTooltip('モデルを訓練データで学習させる');
  }
};

Blockly.Blocks['ml_predict_stmt'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('予測  変数')
      .appendField(new Blockly.FieldVariable('result'), 'VAR')
      .appendField('←');
    this.appendValueInput('MODEL')
      .setCheck(null)
      .appendField('モデル:');
    this.appendValueInput('X_TEST')
      .setCheck(null)
      .appendField('  .predict( テストデータ:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.ml);
    this.setTooltip('テストデータを予測して変数に代入する');
  }
};

Blockly.Blocks['ml_predict_val'] = {
  init: function() {
    this.appendValueInput('MODEL')
      .setCheck(null)
      .appendField('予測: モデル:');
    this.appendValueInput('X_TEST')
      .setCheck(null)
      .appendField('  .predict( テストデータ:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.ml);
    this.setTooltip('テストデータを予測した結果を返す（値として使う）');
  }
};

Blockly.Blocks['ml_accuracy'] = {
  init: function() {
    this.appendValueInput('Y_TRUE')
      .setCheck(null)
      .appendField('正解率  pyco_ml.accuracy(  正解:');
    this.appendValueInput('Y_PRED')
      .setCheck(null)
      .appendField('  予測:');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.ml);
    this.setTooltip('正解率（0.0〜1.0）を計算して返す');
  }
};

Blockly.Blocks['ml_split'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('データ分割  X訓練:')
      .appendField(new Blockly.FieldVariable('X_tr'), 'X_TR')
      .appendField('  Xテスト:')
      .appendField(new Blockly.FieldVariable('X_te'), 'X_TE')
      .appendField('  y訓練:')
      .appendField(new Blockly.FieldVariable('y_tr'), 'Y_TR')
      .appendField('  yテスト:')
      .appendField(new Blockly.FieldVariable('y_te'), 'Y_TE');
    this.appendValueInput('X')
      .setCheck(null)
      .appendField('  ← pyco_ml.train_test_split(  X:');
    this.appendValueInput('Y')
      .setCheck(null)
      .appendField('  y:');
    this.appendDummyInput()
      .appendField('  テスト割合:')
      .appendField(new Blockly.FieldNumber(0.2, 0.05, 0.5, 0.05), 'RATIO')
      .appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.ml);
    this.setTooltip('データを訓練用とテスト用に分割する（テスト割合: 0.05〜0.5）');
  }
};

})();
