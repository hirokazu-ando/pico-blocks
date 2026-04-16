Blockly.Blocks['print_text'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('「')
      .appendField(new Blockly.FieldTextInput('Hello'), 'TEXT')
      .appendField('」を表示する');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#607D8B');
  }
};

Blockly.Blocks['print_var_label'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('「')
      .appendField(new Blockly.FieldTextInput('dist='), 'LABEL')
      .appendField('」+ 変数')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('を表示する');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#607D8B');
  }
};

Blockly.Blocks['print_separator'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('区切り線を表示する');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#607D8B');
  }
};
