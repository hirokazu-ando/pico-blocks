// ===== 値ブロック（角丸長方形） =====

Blockly.Blocks['val_var'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('x'), 'VAR');
    this.setOutput(true, null);
    this.setColour('#5C81A6');
    this.setTooltip('変数の値を表します');
  }
};

Blockly.Blocks['val_number'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity), 'NUM');
    this.setOutput(true, 'Number');
    this.setColour('#5C81A6');
    this.setTooltip('数値を表します');
  }
};

Blockly.Blocks['cond_compare'] = {
  init: function() {
    this.appendValueInput('LEFT');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['>','>'], ['>=','>='], ['<','<'], ['<=','<='], ['==','=='], ['!=','!=']
      ]), 'OP');
    this.appendValueInput('RIGHT');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour('#6A1B9A');
    this.setTooltip('2つの値を比較します');
  }
};

Blockly.Blocks['cond_and'] = {
  init: function() {
    this.appendValueInput('A').setCheck('Boolean');
    this.appendDummyInput().appendField('かつ');
    this.appendValueInput('B').setCheck('Boolean');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour('#6A1B9A');
    this.setTooltip('両方が真のとき真');
  }
};

Blockly.Blocks['cond_or'] = {
  init: function() {
    this.appendValueInput('A').setCheck('Boolean');
    this.appendDummyInput().appendField('または');
    this.appendValueInput('B').setCheck('Boolean');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour('#6A1B9A');
    this.setTooltip('どちらかが真のとき真');
  }
};

Blockly.Blocks['cond_not'] = {
  init: function() {
    this.appendValueInput('A').setCheck('Boolean');
    this.appendDummyInput().appendField('でない');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour('#6A1B9A');
    this.setTooltip('条件を反転します');
  }
};
