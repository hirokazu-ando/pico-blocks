Blockly.Blocks['pico_wait'] = {
  init: function() {
    this.appendValueInput('SEC').setCheck('Number');
    this.appendDummyInput().appendField('秒待つ');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00695C');
  }
};
Blockly.Blocks['pico_repeat'] = {
  init: function() {
    this.appendValueInput('TIMES').setCheck('Number');
    this.appendDummyInput().appendField('回繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E65100');
  }
};
Blockly.Blocks['pico_forever'] = {
  init: function() {
    this.appendDummyInput().appendField('ずっと繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setColour('#E65100');
  }
};

// ===== 複合 if ブロック（if / elif / else を+ボタンで追加） =====

Blockly.Blocks['pico_if_elseif'] = {
  init: function() {
    this.appendDummyInput().appendField('elif');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#6A1B9A');
    this.setTooltip('elif ブランチ');
  }
};

Blockly.Blocks['pico_if_else'] = {
  init: function() {
    this.appendDummyInput().appendField('else');
    this.setPreviousStatement(true);
    this.setColour('#6A1B9A');
    this.setTooltip('else ブランチ');
  }
};

Blockly.Blocks['pico_if'] = {
  elseifCount_: 0,
  elseCount_: 0,

  init: function() {
    this.elseifCount_ = 0;
    this.elseCount_   = 0;

    this.appendValueInput('IF0')
      .setCheck('Boolean')
      .appendField('もし');
    this.appendDummyInput('IF0_LABEL').appendField('だったら');
    this.appendStatementInput('DO0').setCheck(null);
    this._addButtons();

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6A1B9A');
    this.setTooltip('条件に応じて処理を分岐します。+ボタンで elif/else を追加できます');
  },

  _addBranch: function() {
    if (this.elseifCount_ === 0) {
      this._addElseIf();
    } else if (this.elseCount_ === 0) {
      this._addElse();
    } else {
      this.removeInput('BUTTONS');
      this.removeInput('ELSE_LABEL');
      this.removeInput('ELSE');
      this.elseCount_ = 0;

      this.elseifCount_++;
      const i = this.elseifCount_;
      this.appendValueInput('IF' + i)
        .setCheck('Boolean')
        .appendField('そうでなくもし');
      this.appendDummyInput('IF' + i + '_LABEL').appendField('だったら');
      this.appendStatementInput('DO' + i).setCheck(null);

      this.elseCount_ = 1;
      this.appendDummyInput('ELSE_LABEL').appendField('そうでなければ');
      this.appendStatementInput('ELSE').setCheck(null);

      this._addButtons();
      this.render && this.render();
    }
  },

  _addButtons: function() {
    if (this.getInput('BUTTONS')) this.removeInput('BUTTONS');
    this.appendDummyInput('BUTTONS')
      .appendField(new Blockly.FieldImage(
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" rx="4" fill="%23FF9800"/><text x="10" y="15" text-anchor="middle" font-size="16" fill="white" font-family="monospace">+</text></svg>',
        20, 20, '+', () => { this._addBranch(); }
      ))
      .appendField(new Blockly.FieldImage(
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" rx="4" fill="%23757575"/><text x="10" y="15" text-anchor="middle" font-size="16" fill="white" font-family="monospace">-</text></svg>',
        20, 20, '-', () => { this._removeLast(); }
      ));
  },

  _addElseIf: function() {
    const hasElse = this.elseCount_ > 0;
    if (hasElse) {
      this.removeInput('ELSE_LABEL');
      this.removeInput('ELSE');
    }
    this.removeInput('BUTTONS');

    this.elseifCount_++;
    const i = this.elseifCount_;
    this.appendValueInput('IF' + i)
      .setCheck('Boolean')
      .appendField('そうでなくもし');
    this.appendDummyInput('IF' + i + '_LABEL').appendField('だったら');
    this.appendStatementInput('DO' + i).setCheck(null);

    if (hasElse) {
      this.appendDummyInput('ELSE_LABEL').appendField('そうでなければ');
      this.appendStatementInput('ELSE').setCheck(null);
    }
    this._addButtons();
    this.initSvg && this.render();
  },

  _addElse: function() {
    if (this.elseCount_ > 0) return;
    this.removeInput('BUTTONS');
    this.elseCount_ = 1;
    this.appendDummyInput('ELSE_LABEL').appendField('そうでなければ');
    this.appendStatementInput('ELSE').setCheck(null);
    this._addButtons();
    this.initSvg && this.render();
  },

  _removeLast: function() {
    if (this.elseCount_ > 0) {
      this.removeInput('ELSE_LABEL');
      this.removeInput('ELSE');
      this.elseCount_ = 0;
    } else if (this.elseifCount_ > 0) {
      const i = this.elseifCount_;
      this.removeInput('IF' + i);
      this.removeInput('IF' + i + '_LABEL');
      this.removeInput('DO' + i);
      this.elseifCount_--;
    }
    this.removeInput('BUTTONS');
    this._addButtons();
    this.initSvg && this.render();
  },

  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('elseif', this.elseifCount_);
    container.setAttribute('else', this.elseCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    const targetElseif = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    const targetElse   = parseInt(xmlElement.getAttribute('else'),   10) || 0;
    this._rebuildShape(targetElseif, targetElse);
  },

  _rebuildShape: function(elseifCount, elseCount) {
    for (let i = 1; this.getInput('IF' + i); i++) {
      this.removeInput('IF' + i);
      if (this.getInput('IF' + i + '_LABEL')) this.removeInput('IF' + i + '_LABEL');
      this.removeInput('DO' + i);
    }
    if (this.getInput('ELSE_LABEL')) this.removeInput('ELSE_LABEL');
    if (this.getInput('ELSE'))       this.removeInput('ELSE');
    if (this.getInput('BUTTONS'))    this.removeInput('BUTTONS');

    this.elseifCount_ = 0;
    this.elseCount_   = 0;

    for (let i = 0; i < elseifCount; i++) {
      this.elseifCount_++;
      const idx = this.elseifCount_;
      this.appendValueInput('IF' + idx).setCheck('Boolean').appendField('そうでなくもし');
      this.appendDummyInput('IF' + idx + '_LABEL').appendField('だったら');
      this.appendStatementInput('DO' + idx).setCheck(null);
    }
    if (elseCount > 0) {
      this.elseCount_ = 1;
      this.appendDummyInput('ELSE_LABEL').appendField('そうでなければ');
      this.appendStatementInput('ELSE').setCheck(null);
    }
    this._addButtons();
  }
};

// for range(N)
Blockly.Blocks['pico_for_range'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('変数')
      .appendField(new Blockly.FieldTextInput('i'), 'VAR')
      .appendField('を');
    this.appendValueInput('N').setCheck('Number');
    this.appendDummyInput().appendField('回繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E65100');
    this.setTooltip('指定した回数だけ繰り返します。変数に現在の回数(0始まり)が入ります');
  }
};

// for range(START, STOP, STEP)
Blockly.Blocks['pico_for_from_to'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('変数')
      .appendField(new Blockly.FieldTextInput('i'), 'VAR')
      .appendField('を');
    this.appendValueInput('START').setCheck('Number');
    this.appendDummyInput().appendField('から');
    this.appendValueInput('STOP').setCheck('Number');
    this.appendDummyInput().appendField('まで');
    this.appendValueInput('STEP').setCheck('Number');
    this.appendDummyInput().appendField('ずつ繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E65100');
    this.setTooltip('START から STOP まで STEP ずつ増やしながら繰り返します');
  }
};
