// ===== デジタル出力 =====

Blockly.Blocks['pico_led_on'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('LEDを点灯する  ピン')
      .appendField(new Blockly.FieldNumber(25, 0, 28), 'PIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#388E3C');
    this.setTooltip('指定したピンのLEDを点灯します');
  }
};
Blockly.Blocks['pico_led_off'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('LEDを消灯する  ピン')
      .appendField(new Blockly.FieldNumber(25, 0, 28), 'PIN');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#388E3C');
    this.setTooltip('指定したピンのLEDを消灯します');
  }
};
Blockly.Blocks['pico_digital_write'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('ピン')
      .appendField(new Blockly.FieldNumber(0, 0, 28), 'PIN')
      .appendField('を')
      .appendField(new Blockly.FieldDropdown([['HIGH','1'],['LOW','0']]), 'VAL')
      .appendField('にする');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#388E3C');
  }
};

// ===== デジタル入力 =====

Blockly.Blocks['pico_digital_read'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('デジタル入力  ピン')
      .appendField(new Blockly.FieldNumber(0, 0, 28), 'PIN')
      .appendField('を読み  変数')
      .appendField(new Blockly.FieldTextInput('val'), 'VAR')
      .appendField('に入れる');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00838F');
    this.setTooltip('デジタルピンの値（0 or 1）を変数に入れます');
  }
};

// ===== アナログ入力 =====

Blockly.Blocks['pico_analog_read'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('アナログ入力  ADCピン')
      .appendField(new Blockly.FieldDropdown([['GP26 (ADC0)','26'],['GP27 (ADC1)','27'],['GP28 (ADC2)','28']]), 'PIN')
      .appendField('を読み  変数')
      .appendField(new Blockly.FieldTextInput('val'), 'VAR')
      .appendField('に入れる');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00838F');
    this.setTooltip('アナログ値（0〜65535）を変数に入れます。GP26/27/28のみ使用可能');
  }
};

// ===== 入力値ブロック（値として使用）=====

Blockly.Blocks['pico_digital_read_val'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('ピン')
      .appendField(new Blockly.FieldNumber(0, 0, 28), 'PIN')
      .appendField('の入力値');
    this.setOutput(true, 'Boolean');
    this.setColour('#00838F');
    this.setTooltip('デジタルピンの値（True/False）を返します。条件ブロックにはめ込めます');
  }
};

Blockly.Blocks['pico_analog_read_val'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('ADCピン')
      .appendField(new Blockly.FieldDropdown([['GP26','26'],['GP27','27'],['GP28','28']]), 'PIN')
      .appendField('のアナログ値');
    this.setOutput(true, 'Number');
    this.setColour('#00838F');
    this.setTooltip('アナログ入力値（0〜65535）を返します。比較ブロックにはめ込めます');
  }
};
