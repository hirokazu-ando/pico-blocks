// =====================================================
// カスタム Python ブロック
// Blockly の FieldTextInput でユーザーが任意の Python を記述
// 生成コードはそのまま CODE フィールドの文字列を出力
// =====================================================

(() => {
  const P = window.PycoPalette;

  Blockly.Blocks['py_custom_stmt'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Python')
        .appendField(new Blockly.FieldTextInput('pass'), 'CODE');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.customPython || '#455A64');
      this.setTooltip(
        '生成される Python に 1 行を挿入します。複数行は「Python」ブロックを縦につなぐこと。合わせて import を書くこと。'
      );
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['py_custom_expr'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('式')
        .appendField(new Blockly.FieldTextInput('0'), 'CODE');
      this.setOutput(true, null);
      this.setColour(P.customPython || '#455A64');
      this.setTooltip(
        '1行の Python 式をそのまま値として挿入します。'
      );
      this.setHelpUrl('');
    }
  };
})();
