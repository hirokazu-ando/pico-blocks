// ===== PoliviaBot UME ブロック定義 =====
// ピン配置: Motor_L+(GP0) Motor_L-(GP1) Motor_R+(GP2) Motor_R-(GP3)
//           LED1(GP11) LED2(GP12) SW1(GP13) SW2(GP14)

// 前進する
Blockly.Blocks['pvb_forward'] = {
  init: function() {
    this.appendDummyInput().appendField('前進する  速さ');
    this.appendValueInput('SPEED').setCheck('Number');
    this.appendDummyInput().appendField('%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
    this.setTooltip('PoliviaBotを前進させます');
  }
};

// 後退する
Blockly.Blocks['pvb_backward'] = {
  init: function() {
    this.appendDummyInput().appendField('後退する  速さ');
    this.appendValueInput('SPEED').setCheck('Number');
    this.appendDummyInput().appendField('%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
  }
};

// 右に曲がる
Blockly.Blocks['pvb_turn_right'] = {
  init: function() {
    this.appendDummyInput().appendField('右に曲がる  速さ');
    this.appendValueInput('SPEED').setCheck('Number');
    this.appendDummyInput().appendField('%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
  }
};

// 左に曲がる
Blockly.Blocks['pvb_turn_left'] = {
  init: function() {
    this.appendDummyInput().appendField('左に曲がる  速さ');
    this.appendValueInput('SPEED').setCheck('Number');
    this.appendDummyInput().appendField('%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
  }
};

// 止まる
Blockly.Blocks['pvb_stop'] = {
  init: function() {
    this.appendDummyInput().appendField('止まる');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
  }
};

// LED点灯
Blockly.Blocks['pvb_led_on'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('LED')
      .appendField(new Blockly.FieldDropdown([['1','11'],['2','12']]), 'LED')
      .appendField('を点灯する');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
  }
};

// LED消灯
Blockly.Blocks['pvb_led_off'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('LED')
      .appendField(new Blockly.FieldDropdown([['1','11'],['2','12']]), 'LED')
      .appendField('を消灯する');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
  }
};

// スイッチの値（Boolean 値ブロック）
Blockly.Blocks['pvb_switch_val'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('スイッチ')
      .appendField(new Blockly.FieldDropdown([['1','13'],['2','14']]), 'SW')
      .appendField('の値');
    this.setOutput(true, 'Boolean');
    this.setColour('#E53935');
    this.setTooltip('スイッチが押されているとき True を返します（GP13/GP14）');
  }
};

// スイッチが押されていたら
Blockly.Blocks['pvb_if_switch'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('もしスイッチ')
      .appendField(new Blockly.FieldDropdown([['1','13'],['2','14']]), 'SW')
      .appendField('が押されていたら');
    this.appendStatementInput('DO').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
  }
};
