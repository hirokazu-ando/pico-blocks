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
      this.appendValueInput('W').setCheck(null).appendField('\u5e45');
      this.appendValueInput('H').setCheck(null).appendField('\u9ad8\u3055');
      this.appendValueInput('ROT').setCheck(null).appendField('\u56de\u8ee2\u89d2\u5ea6');
      this.appendDummyInput()
        .appendField('\u53cd\u8ee2')
        .appendField(new Blockly.FieldDropdown([
          ['\u306a\u3057', 'NONE'],
          ['\u5de6\u53f3', 'X'],
          ['\u4e0a\u4e0b', 'Y'],
          ['\u4e21\u65b9', 'XY']
        ]), 'FLIP');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('\u753b\u50cfURL\u3092\u8aad\u307f\u8fbc\u3093\u3067\u753b\u9762\u306b\u63cf\u753b\u3057\u307e\u3059\u3002\u5e45\u30fb\u9ad8\u3055\u304c -1 \u306a\u3089\u539f\u5927\u3001\u56de\u8ee2\u89d2\u5ea6 0 \u306a\u3089\u7121\u52b9\u3001\u53cd\u8ee2\u306f transform.flip \u3067\u3059\u3002');
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

  Blockly.Blocks['game_rect_collidepoint'] = {
    init: function() {
      this.appendValueInput('RECT').setCheck(null).appendField('Rect');
      this.appendDummyInput().appendField('\u306e\u70b9');
      this.appendValueInput('X').setCheck(null).appendField('x');
      this.appendValueInput('Y').setCheck(null).appendField('y');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('Rect.collidepoint(x, y) \u3067\u70b9\u304c\u5185\u5074\u304b\u5224\u5b9a\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['game_rect_union'] = {
    init: function() {
      this.appendValueInput('A').setCheck(null).appendField('Rect');
      this.appendDummyInput().appendField('\u3068');
      this.appendValueInput('B').setCheck(null).appendField('Rect');
      this.appendDummyInput().appendField('\u3092\u5305\u3080\u6700\u5c0f');
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('Rect.union(other) \u3067\u8ca0\u306a\u3057\u533a\u9593\u3092\u8fd4\u3057\u307e\u3059\u3002');
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

  // ===== \u30bf\u30a4\u30de\u30fc =====
  Blockly.Blocks['game_get_ticks'] = {
    init: function() {
      this.appendDummyInput().appendField('\u30b2\u30fc\u30e0\u958b\u59cb\u304b\u3089\u306e\u6642\u9593\uff08ms\uff09');
      this.setOutput(true, 'Number');
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('pygame.time.get_ticks() \u2014 \u30b2\u30fc\u30e0\u958b\u59cb\u304b\u3089\u306e\u7d4c\u904e\u6642\u9593\uff08\u30df\u30ea\u79d2\uff09\u30021000\u3067\u5272\u308b\u3068\u79d2\u306b\u306a\u308a\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };

  // ===== \u30de\u30a6\u30b9 =====
  Blockly.Blocks['game_mouse_x'] = {
    init: function() {
      this.appendDummyInput().appendField('\u30de\u30a6\u30b9\u306eX\u5ea7\u6a19');
      this.setOutput(true, 'Number');
      this.setColour(P.ioKeyboard || '#00897B');
      this.setTooltip('pygame.mouse.get_pos()[0] \u2014 \u30de\u30a6\u30b9\u30ab\u30fc\u30bd\u30eb\u306eX\u5ea7\u6a19\u3002');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['game_mouse_y'] = {
    init: function() {
      this.appendDummyInput().appendField('\u30de\u30a6\u30b9\u306eY\u5ea7\u6a19');
      this.setOutput(true, 'Number');
      this.setColour(P.ioKeyboard || '#00897B');
      this.setTooltip('pygame.mouse.get_pos()[1] \u2014 \u30de\u30a6\u30b9\u30ab\u30fc\u30bd\u30eb\u306eY\u5ea7\u6a19\u3002');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['game_mouse_pressed'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('\u30de\u30a6\u30b9\u306e')
        .appendField(new Blockly.FieldDropdown([
          ['\u5de6\u30dc\u30bf\u30f3', '0'],
          ['\u53f3\u30dc\u30bf\u30f3', '2'],
          ['\u4e2d\u30dc\u30bf\u30f3', '1']
        ]), 'BTN')
        .appendField('\u304c\u62bc\u3055\u308c\u3066\u3044\u308b');
      this.setOutput(true, 'Boolean');
      this.setColour(P.ioKeyboard || '#00897B');
      this.setTooltip('pygame.mouse.get_pressed() \u2014 \u6307\u5b9a\u3057\u305f\u30de\u30a6\u30b9\u30dc\u30bf\u30f3\u304c\u62bc\u3055\u308c\u3066\u3044\u308b\u304b\u5224\u5b9a\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };

  // ===== \u8272\u30d7\u30ea\u30bb\u30c3\u30c8 =====
  var GAME_COLORS = [
    ['\u8d64', '#EF4444'],
    ['\u6a59', '#F97316'],
    ['\u9ec4', '#FACC15'],
    ['\u9ec4\u7dd1', '#84CC16'],
    ['\u7dd1', '#22C55E'],
    ['\u6c34\u8272', '#38BDF8'],
    ['\u9752', '#3B82F6'],
    ['\u7d2b', '#A855F7'],
    ['\u30d4\u30f3\u30af', '#EC4899'],
    ['\u767d', '#F8FAFC'],
    ['\u7070', '#64748B'],
    ['\u9ed2', '#1E293B'],
    ['\u91d1', '#FFD700'],
    ['\u6697\u3044\u9752', '#0F172A'],
  ];

  Blockly.Blocks['game_color'] = {
    init: function() {
      var dd = new Blockly.FieldDropdown(GAME_COLORS, function(v) {
        var b = this.sourceBlock_;
        if (b) b.setColour(v);
      });
      this.appendDummyInput()
        .appendField('\u8272')
        .appendField(dd, 'COLOR');
      this.setOutput(true, 'Colour');
      this.setColour(GAME_COLORS[0][1]);
      this.setTooltip('\u30b2\u30fc\u30e0\u3067\u3088\u304f\u4f7f\u3046\u8272\u3092\u65e5\u672c\u8a9e\u540d\u3067\u9078\u3079\u307e\u3059\u3002\u30ab\u30b9\u30bf\u30e0\u8272\u306f colour_picker \u30d6\u30ed\u30c3\u30af\u3092\u4f7f\u3063\u3066\u304f\u3060\u3055\u3044\u3002');
      this.setHelpUrl('');
    }
  };

  // ===== \u753b\u50cf\u30d7\u30ea\u30bb\u30c3\u30c8 =====
  var GAME_SPRITES = [
    [{ src: 'assets/game-icons/player_ship.svg', width: 24, height: 24, alt: '\u30d7\u30ec\u30a4\u30e4\u30fc' }, 'assets/game-icons/player_ship.svg'],
    [{ src: 'assets/game-icons/rocket.svg',       width: 24, height: 24, alt: '\u30ed\u30b1\u30c3\u30c8' },       'assets/game-icons/rocket.svg'],
    [{ src: 'assets/game-icons/enemy_bug.svg',   width: 24, height: 24, alt: '\u6575\uff08\u30c9\u30ed\u30fc\u30f3\uff09' }, 'assets/game-icons/enemy_bug.svg'],
    [{ src: 'assets/game-icons/coin.svg',        width: 24, height: 24, alt: '\u30b3\u30a4\u30f3' },           'assets/game-icons/coin.svg'],
    [{ src: 'assets/game-icons/gem.svg',         width: 24, height: 24, alt: '\u30b8\u30a7\u30e0' },           'assets/game-icons/gem.svg'],
    [{ src: 'assets/game-icons/star.svg',        width: 24, height: 24, alt: '\u30b9\u30bf\u30fc' },           'assets/game-icons/star.svg'],
    [{ src: 'assets/game-icons/heart.svg',       width: 24, height: 24, alt: '\u30cf\u30fc\u30c8' },           'assets/game-icons/heart.svg'],
    [{ src: 'assets/game-icons/bullet.svg',      width: 24, height: 24, alt: '\u5f3e' },                       'assets/game-icons/bullet.svg'],
    [{ src: 'assets/game-icons/energy.svg',      width: 24, height: 24, alt: '\u30a8\u30ca\u30b8\u30fc' },       'assets/game-icons/energy.svg'],
    [{ src: 'assets/game-icons/shield.svg',      width: 24, height: 24, alt: '\u30b7\u30fc\u30eb\u30c9' },       'assets/game-icons/shield.svg'],
    [{ src: 'assets/game-icons/spike.svg',       width: 24, height: 24, alt: '\u30c8\u30b2' },                  'assets/game-icons/spike.svg'],
    [{ src: 'assets/game-icons/meteor.svg',      width: 24, height: 24, alt: '\u30e1\u30c6\u30aa' },            'assets/game-icons/meteor.svg'],
    [{ src: 'assets/game-icons/portal.svg',      width: 24, height: 24, alt: '\u30dd\u30fc\u30bf\u30eb' },       'assets/game-icons/portal.svg'],
    [{ src: 'assets/game-icons/crate.svg',       width: 24, height: 24, alt: '\u6728\u7bb1' },                  'assets/game-icons/crate.svg'],
  ];

  Blockly.Blocks['game_image_preset'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('\u5185\u8535\u753b\u50cf')
        .appendField(new Blockly.FieldDropdown(GAME_SPRITES), 'IMG');
      this.setOutput(true, 'String');
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('\u3042\u3089\u304b\u3058\u3081\u7528\u610f\u3055\u308c\u305f\u30b2\u30fc\u30e0\u7528\u753b\u50cf\u3092\u9078\u3073\u307e\u3059\u3002game_draw_image \u306e URL \u306b\u5dee\u3057\u8fbc\u3093\u3067\u4f7f\u3044\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };

  // ===== Rect\u5c5e\u6027\u53d6\u5f97 =====
  Blockly.Blocks['game_rect_attr'] = {
    init: function() {
      this.appendValueInput('RECT').setCheck(null).appendField('Rect');
      this.appendDummyInput()
        .appendField('\u306e')
        .appendField(new Blockly.FieldDropdown([
          ['x\u5ea7\u6a19', 'x'],
          ['y\u5ea7\u6a19', 'y'],
          ['\u5e45', 'width'],
          ['\u9ad8\u3055', 'height'],
          ['\u4e2d\u5fc3x', 'centerx'],
          ['\u4e2d\u5fc3y', 'centery']
        ]), 'ATTR');
      this.setOutput(true, 'Number');
      this.setInputsInline(true);
      this.setColour(P.game || '#8E24AA');
      this.setTooltip('Rect \u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306e\u5c5e\u6027\uff08x/y/\u5e45/\u9ad8\u3055/\u4e2d\u5fc3\uff09\u3092\u53d6\u5f97\u3057\u307e\u3059\u3002');
      this.setHelpUrl('');
    }
  };
})();
