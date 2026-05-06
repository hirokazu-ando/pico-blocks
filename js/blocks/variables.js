(() => {
const P = window.PycoPalette;

Blockly.Blocks['var_set'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('変数')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('を');
    this.appendValueInput('VALUE').setCheck(null);
    this.appendDummyInput().appendField('にする');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.variables);
    this.setTooltip('変数に値をセットします');
  }
};

Blockly.Blocks['var_change'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('変数')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('を');
    this.appendValueInput('AMOUNT').setCheck('Number');
    this.appendDummyInput().appendField('だけ増やす');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.variables);
    this.setTooltip('変数の値を増減します');
  }
};

Blockly.Blocks['var_set2'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('変数')
      .appendField(new Blockly.FieldVariable('a'), 'VAR1')
      .appendField(',')
      .appendField(new Blockly.FieldVariable('b'), 'VAR2')
      .appendField('を');
    this.appendValueInput('VALUE1').setCheck(null);
    this.appendDummyInput().appendField(',');
    this.appendValueInput('VALUE2').setCheck(null);
    this.appendDummyInput().appendField('にする');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.variables);
    this.setTooltip('2変数に同時に値をセットします（タプル代入）');
  }
};

Blockly.Blocks['var_if_greater'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('もし変数')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('が');
    this.appendValueInput('THRESHOLD').setCheck('Number');
    this.appendDummyInput().appendField('より大きかったら');
    this.appendStatementInput('DO')
      .appendField('なら');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.variables);
  }
};

})();

Blockly.Blocks['var_if_less'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('もし変数')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('が');
    this.appendValueInput('THRESHOLD').setCheck('Number');
    this.appendDummyInput().appendField('より小さかったら');
    this.appendStatementInput('DO')
      .appendField('なら');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.variables);
  }
};
