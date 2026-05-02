(() => {
const P = window.PycoPalette;
window.PycoPalette.files = '#0e7490';

Blockly.Blocks['print_text'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('「')
      .appendField(new Blockly.FieldTextInput('Hello'), 'TEXT')
      .appendField('」を表示する');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.display);
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
    this.setColour(P.display);
  }
};

Blockly.Blocks['print_separator'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('区切り線を表示する');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.display);
  }
};

Blockly.Blocks['py_file_write'] = {
  init: function() {
    this.setColour(window.PycoPalette.files);
    this.appendDummyInput()
      .appendField('ファイル書き込み')
      .appendField(new Blockly.FieldTextInput('data.txt'), 'FILENAME');
    this.appendValueInput('CONTENT')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('内容');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('ファイルにテキストを書き込む（上書き）');
  }
};

Blockly.Blocks['py_file_append'] = {
  init: function() {
    this.setColour(window.PycoPalette.files);
    this.appendDummyInput()
      .appendField('ファイル追記')
      .appendField(new Blockly.FieldTextInput('data.txt'), 'FILENAME');
    this.appendValueInput('CONTENT')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('内容');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('ファイルの末尾にテキストを追加する');
  }
};

Blockly.Blocks['py_file_read'] = {
  init: function() {
    this.setColour(window.PycoPalette.files);
    this.appendDummyInput()
      .appendField('ファイル読み込み')
      .appendField(new Blockly.FieldTextInput('data.txt'), 'FILENAME')
      .appendField('を')
      .appendField(new Blockly.FieldTextInput('content'), 'VAR')
      .appendField('に代入');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('ファイルの内容をすべて読み込んで変数に入れる');
  }
};

Blockly.Blocks['py_file_readlines'] = {
  init: function() {
    this.setColour(window.PycoPalette.files);
    this.appendDummyInput()
      .appendField('ファイルを行ごとに読む')
      .appendField(new Blockly.FieldTextInput('data.txt'), 'FILENAME')
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('lines'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('ファイルを1行ずつのリストとして読み込む');
  }
};

})();
