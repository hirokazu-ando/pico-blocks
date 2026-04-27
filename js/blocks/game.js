// =====================================================
// Game mode block definitions
// =====================================================

(() => {
  const P = window.PycoPalette;

  const T = {
    init: '\u30b2\u30fc\u30e0\u3092\u521d\u671f\u5316\u3059\u308b',
    width: '\u5e45',
    height: '\u9ad8\u3055',
    title: '\u30bf\u30a4\u30c8\u30eb',
    loop: '\u30b2\u30fc\u30e0\u30eb\u30fc\u30d7\u3092\u958b\u59cb\u3059\u308b',
    events: '\u30a6\u30a3\u30f3\u30c9\u30a6\u3092\u9589\u3058\u305f\u3089\u7d42\u4e86\u3059\u308b',
    frame: '\u753b\u9762\u3092\u66f4\u65b0\u3059\u308b',
    fill1: '\u753b\u9762\u3092',
    fill2: '\u8272\u3067\u5857\u308a\u3064\u3076\u3059',
    rect: '\u56db\u89d2\u5f62\u3092\u63cf\u304f',
    circle: '\u5186\u3092\u63cf\u304f',
    line: '\u7dda\u3092\u63cf\u304f',
    text: '\u6587\u5b57\u3092\u66f8\u304f',
    textLabel: '\u6587\u5b57',
    size: '\u5927\u304d\u3055',
    color: '\u8272',
    radius: '\u534a\u5f84',
    key: '\u30ad\u30fc',
    keyPressed: '\u304c\u62bc\u3055\u308c\u3066\u3044\u308b',
    right: '\u53f3\u77e2\u5370',
    left: '\u5de6\u77e2\u5370',
    up: '\u4e0a\u77e2\u5370',
    down: '\u4e0b\u77e2\u5370',
    space: '\u30b9\u30da\u30fc\u30b9',
    collideMid: '\u3068',
    collideTail: '\u304c\u91cd\u306a\u3063\u3066\u3044\u308b',
    quit: '\u30b2\u30fc\u30e0\u3092\u7d42\u4e86\u3059\u308b'
  };

  Blockly.Blocks['game_init'] = {
    init: function() {
      this.appendDummyInput().appendField(T.init);
      this.appendValueInput('W').setCheck(null).appendField(T.width);
      this.appendValueInput('H').setCheck(null).appendField(T.height);
      this.appendValueInput('TITLE').setCheck(null).appendField(T.title);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame\u3092\u521d\u671f\u5316\u3057\u3001\u30b2\u30fc\u30e0\u753b\u9762\u3092\u4f5c\u6210\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_loop'] = {
    init: function() {
      this.appendDummyInput().appendField(T.loop);
      this.appendStatementInput('DO').setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('while running \u306e\u4e2d\u306b\u51e6\u7406\u3092\u66f8\u304f\u305f\u3081\u306e\u67a0\u3067\u3059\u3002');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['game_events'] = {
    init: function() {
      this.appendDummyInput().appendField(T.events);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame.QUIT \u3092\u691c\u51fa\u3057\u305f\u3089 running = False \u306b\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['game_flip'] = {
    init: function() {
      this.appendDummyInput().appendField(T.frame);
      this.appendValueInput('FPS').setCheck(null).appendField('FPS');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame.display.flip() \u3068 clock.tick(FPS) \u3092\u5b9f\u884c\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_fill'] = {
    init: function() {
      this.appendValueInput('COLOR').setCheck(null).appendField(T.fill1);
      this.appendDummyInput().appendField(T.fill2);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('screen.fill(COLOR) \u3092\u5b9f\u884c\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_draw_rect'] = {
    init: function() {
      this.appendDummyInput().appendField(T.rect);
      this.appendValueInput('X').setCheck(null).appendField('x');
      this.appendValueInput('Y').setCheck(null).appendField('y');
      this.appendValueInput('W').setCheck(null).appendField(T.width);
      this.appendValueInput('H').setCheck(null).appendField(T.height);
      this.appendValueInput('COLOR').setCheck(null).appendField(T.color);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame.draw.rect() \u3067\u56db\u89d2\u5f62\u3092\u63cf\u304d\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_draw_circle'] = {
    init: function() {
      this.appendDummyInput().appendField(T.circle);
      this.appendValueInput('X').setCheck(null).appendField('x');
      this.appendValueInput('Y').setCheck(null).appendField('y');
      this.appendValueInput('R').setCheck(null).appendField(T.radius);
      this.appendValueInput('COLOR').setCheck(null).appendField(T.color);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame.draw.circle() \u3067\u5186\u3092\u63cf\u304d\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_draw_line'] = {
    init: function() {
      this.appendDummyInput().appendField(T.line);
      this.appendValueInput('X1').setCheck(null).appendField('x1');
      this.appendValueInput('Y1').setCheck(null).appendField('y1');
      this.appendValueInput('X2').setCheck(null).appendField('x2');
      this.appendValueInput('Y2').setCheck(null).appendField('y2');
      this.appendValueInput('COLOR').setCheck(null).appendField(T.color);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame.draw.line() \u3067\u7dda\u3092\u63cf\u304d\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_draw_text'] = {
    init: function() {
      this.appendDummyInput().appendField(T.text);
      this.appendValueInput('TEXT').setCheck(null).appendField(T.textLabel);
      this.appendValueInput('X').setCheck(null).appendField('x');
      this.appendValueInput('Y').setCheck(null).appendField('y');
      this.appendValueInput('SIZE').setCheck(null).appendField(T.size);
      this.appendValueInput('COLOR').setCheck(null).appendField(T.color);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('\u6587\u5b57\u3092\u63cf\u753b\u3057\u3066\u753b\u9762\u3078\u8cbc\u308a\u4ed8\u3051\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_draw_image'] = {
    init: function() {
      this.appendDummyInput().appendField('\u753b\u50cf\u3092\u63cf\u753b\u3059\u308b');
      this.appendValueInput('URL').setCheck(null).appendField('URL');
      this.appendValueInput('X').setCheck(null).appendField('x');
      this.appendValueInput('Y').setCheck(null).appendField('y');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('\u753b\u50cfURL\u3092\u8aad\u307f\u8fbc\u3093\u3067\u753b\u9762\u306b\u63cf\u753b\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_key_pressed'] = {
    init: function() {
      this.appendDummyInput()
        .appendField(T.key)
        .appendField(new Blockly.FieldDropdown([
          [T.right, 'K_RIGHT'],
          [T.left, 'K_LEFT'],
          [T.up, 'K_UP'],
          [T.down, 'K_DOWN'],
          [T.space, 'K_SPACE'],
          ['Enter', 'K_RETURN'],
          ['W', 'K_w'],
          ['A', 'K_a'],
          ['S', 'K_s'],
          ['D', 'K_d']
        ]), 'KEY')
        .appendField(T.keyPressed);
      this.setOutput(true, 'Boolean');
      this.setColour(P.ioKeyboard);
      this.setTooltip('pygame.key.get_pressed()[pygame.K_XXX] \u3067\u62bc\u4e0b\u72b6\u614b\u3092\u53d6\u5f97\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['game_rect'] = {
    init: function() {
      this.appendDummyInput().appendField('Rect(');
      this.appendValueInput('X').setCheck(null).appendField('x');
      this.appendValueInput('Y').setCheck(null).appendField('y');
      this.appendValueInput('W').setCheck(null).appendField(T.width);
      this.appendValueInput('H').setCheck(null).appendField(T.height);
      this.appendDummyInput().appendField(')');
      this.setOutput(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame.Rect(x, y, w, h) \u3092\u4f5c\u6210\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks['game_collide'] = {
    init: function() {
      this.appendValueInput('A').setCheck(null).appendField('Rect');
      this.appendDummyInput().appendField(T.collideMid);
      this.appendValueInput('B').setCheck(null).appendField('Rect');
      this.appendDummyInput().appendField(T.collideTail);
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('Rect.colliderect(other) \u3067\u5f53\u305f\u308a\u5224\u5b9a\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['game_quit'] = {
    init: function() {
      this.appendDummyInput().appendField(T.quit);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame.quit() \u3092\u5b9f\u884c\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };
})();
