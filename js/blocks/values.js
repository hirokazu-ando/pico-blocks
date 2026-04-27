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

// Blockly標準の colour_picker を使わず、最小限のカラーピッカーブロックを自前定義する
// （blockly.min.js のみ読み込んでいるため、標準ブロック定義が存在しない）
Blockly.Blocks['colour_picker'] = {
  init: function() {
    const isHex = function(v) {
      if (v == null) return null;
      const s = String(v).trim();
      return /^#[0-9a-fA-F]{6}$/.test(s) ? s : null;
    };
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('#ff0000', function(v) {
        // 不正値は無視して前の値を維持（null返し）
        return isHex(v);
      }), 'COLOUR');
    this.setOutput(true, null);
    this.setColour(P.literals);
    this.setTooltip('色を指定します（"#rrggbb" 形式）');
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
