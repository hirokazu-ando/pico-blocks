// =====================================================
// Python入門モード専用ブロック定義
// =====================================================

// キーボード入力ブロック
// テキスト:    var = input("prompt")
// 数値(整数):  var = int(input("prompt"))
// 数値(小数):  var = float(input("prompt"))
Blockly.Blocks['py_input'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('キーボード入力 (')
      .appendField(new Blockly.FieldDropdown([
        ['テキスト',    'str'],
        ['数値（整数）', 'int'],
        ['数値（小数）', 'float'],
      ]), 'TYPE')
      .appendField(') を')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('に入れる');
    this.appendDummyInput()
      .appendField('  案内文:')
      .appendField(new Blockly.FieldTextInput('入力してください'), 'PROMPT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00838F');
    this.setTooltip('input() でキーボードから値を受け取ります。\n数値を受け取る場合は int() や float() で変換されます。');
    this.setHelpUrl('');
  }
};

// ===== 文字列値ブロック =====
Blockly.Blocks['val_str'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('"')
      .appendField(new Blockly.FieldTextInput('Hello'), 'TEXT')
      .appendField('"');
    this.setOutput(true, null);
    this.setColour('#5C81A6');
    this.setTooltip('文字列の値を表します');
    this.setHelpUrl('');
  }
};

// ===== 真偽値ブロック =====
Blockly.Blocks['val_bool'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['True（真）', 'True'],
        ['False（偽）', 'False'],
      ]), 'BOOL');
    this.setOutput(true, 'Boolean');
    this.setColour('#5C81A6');
    this.setTooltip('True（真）またはFalse（偽）の値を表します');
    this.setHelpUrl('');
  }
};

// ===== 算術演算ブロック =====
Blockly.Blocks['py_math_op'] = {
  init: function() {
    this.appendValueInput('LEFT').setCheck(null);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['+（足し算）', '+'],
        ['-（引き算）', '-'],
        ['×（掛け算）', '*'],
        ['÷（割り算）', '/'],
        ['//（整数除算）', '//'],
        ['%（余り）', '%'],
        ['**（べき乗）', '**'],
      ]), 'OP');
    this.appendValueInput('RIGHT').setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#B71C1C');
    this.setTooltip('算術演算を行います');
    this.setHelpUrl('');
  }
};

// ===== 文字列連結ブロック =====
Blockly.Blocks['py_str_concat'] = {
  init: function() {
    this.appendValueInput('A').setCheck(null);
    this.appendDummyInput().appendField('と');
    this.appendValueInput('B').setCheck(null);
    this.appendDummyInput().appendField('をつなげる');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#B71C1C');
    this.setTooltip('str() で文字列に変換してから連結します');
    this.setHelpUrl('');
  }
};

// ===== while ループブロック =====
Blockly.Blocks['py_while'] = {
  init: function() {
    this.appendValueInput('COND')
      .setCheck('Boolean')
      .appendField('ずっと');
    this.appendDummyInput().appendField('の間 繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E65100');
    this.setTooltip('条件が True の間、中の処理を繰り返します');
    this.setHelpUrl('');
  }
};

// ===== 汎用 print ブロック（値ブロックを受け取る） =====
Blockly.Blocks['py_print'] = {
  init: function() {
    this.appendValueInput('VALUE').setCheck(null);
    this.appendDummyInput().appendField('を表示する');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#607D8B');
    this.setTooltip('変数・数値・文字列など何でも表示できます');
    this.setHelpUrl('');
  }
};
