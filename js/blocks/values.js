// ===== 値ブロック（角丸長方形） =====

(() => {
const P = window.PycoPalette;

Blockly.Blocks['val_var'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('x'), 'VAR');
    this.setOutput(true, null);
    this.setColour(P.literals);
    this.setTooltip('変数の値を表します');
  }
};

Blockly.Blocks['val_number'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity), 'NUM');
    this.setOutput(true, 'Number');
    this.setColour(P.literals);
    this.setTooltip('数値を表します');
  }
};

// @blockly/field-colour プラグイン由来の field_colour（FieldColour）を使うカラーピッカー。
// プラグインが Blockly.fieldRegistry.register('field_colour', FieldColour) をロード時に実行するので、
// このブロック init は plugin スクリプト読み込み後に呼ばれる前提（index.html のスクリプト順）。
Blockly.Blocks['colour_picker'] = {
  init: function() {
    const FieldColourCtor = (typeof FieldColour !== 'undefined') ? FieldColour : Blockly.FieldColour;
    const colourField = FieldColourCtor
      ? new FieldColourCtor('#ff0000')
      : new Blockly.FieldTextInput('#ff0000');
    this.appendDummyInput().appendField(colourField, 'COLOUR');
    this.setOutput(true, null);
    this.setColour(P.literals);
    this.setTooltip('色を指定します（クリックでパレットから選択）');
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
    this.setColour(P.logic);
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
    this.setColour(P.logic);
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
    this.setColour(P.logic);
    this.setTooltip('どちらかが真のとき真');
  }
};

Blockly.Blocks['cond_not'] = {
  init: function() {
    this.appendValueInput('A').setCheck('Boolean');
    this.appendDummyInput().appendField('でない');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(P.logic);
    this.setTooltip('条件を反転します');
  }
};

})();
