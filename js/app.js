document.addEventListener('DOMContentLoaded', function() {

  // ===== 右クリックメニュー 日本語化 =====
  Object.assign(Blockly.Msg, {
    DUPLICATE_BLOCK:     'ブロックを複製',
    ADD_COMMENT:         'コメントを追加',
    REMOVE_COMMENT:      'コメントを削除',
    COLLAPSE_BLOCK:      '折りたたむ',
    EXPAND_BLOCK:        '展開する',
    DISABLE_BLOCK:       '無効にする',
    ENABLE_BLOCK:        '有効にする',
    DELETE_BLOCK:        'ブロックを削除',
    DELETE_X_BLOCKS:     '%1 個のブロックを削除',
    DELETE_ALL_BLOCKS:   'すべてのブロックを削除',
    HELP:                'ヘルプ',
    UNDO:                '元に戻す',
    REDO:                'やり直す',
    CLEAN_UP:            '整理する',
    COLLAPSE_ALL:        'すべて折りたたむ',
    EXPAND_ALL:          'すべて展開する',
    INLINE_INPUTS:       '入力をインライン表示',
    EXTERNAL_INPUTS:     '入力を別行に表示',
  });

  const pcbTheme = Blockly.Theme.defineTheme('pcbTerminal', {
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour: '#0b150b',
      toolboxBackgroundColour:   '#080e08',
      toolboxForegroundColour:   '#a0c8a0',
      flyoutBackgroundColour:    '#0a140a',
      flyoutForegroundColour:    '#c8e6c8',
      flyoutOpacity:             1,
      scrollbarColour:           '#1a3a1a',
      scrollbarOpacity:          0.7,
      insertionMarkerColour:     '#00ff41',
      insertionMarkerOpacity:    0.4,
      cursorColour:              '#00ff41',
    }
  });

  const workspace = Blockly.inject('blockly-div', {
    toolbox: document.getElementById('toolbox'),
    theme: pcbTheme,
    renderer: 'zelos',
    scrollbars: true,
    trashcan: true,
    zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3 }
  });
  const editor = CodeMirror(document.getElementById('code-editor'), {
    value: '# ブロックを追加してください',
    mode: 'python',
    theme: 'dracula',
    lineNumbers: true,
    readOnly: true,
    lineWrapping: false,
    tabSize: 4,
    indentWithTabs: false,
  });
  let codingMode = false;

  // ブロックの日本語ラベルを返す
  function blockLabel(block) {
    switch (block.type) {
      case 'pico_led_on':      return `出力ピン${block.getFieldValue('PIN')} → HIGH（点灯）`;
      case 'pico_led_off':     return `出力ピン${block.getFieldValue('PIN')} → LOW（消灯）`;
      case 'pico_digital_write': {
        const v = block.getFieldValue('VAL') === '1' ? 'HIGH' : 'LOW';
        return `GPIOピン${block.getFieldValue('PIN')} → ${v}`;
      }
      case 'pico_wait':        return `秒数待機`;
      case 'pico_repeat':      return `繰り返す`;
      case 'pico_forever':     return `ずっと繰り返す（無限ループ）`;
      case 'pvb_forward':      return `前進する`;
      case 'pvb_backward':     return `後退する`;
      case 'pvb_turn_right':   return `右旋回`;
      case 'pvb_turn_left':    return `左旋回`;
      case 'pvb_stop':         return `止まる（モーター停止）`;
      case 'pvb_led_on': {
        const n = block.getFieldValue('LED') === '11' ? '1' : '2';
        return `LED${n} 点灯（GP${block.getFieldValue('LED')}）`;
      }
      case 'pvb_led_off': {
        const n = block.getFieldValue('LED') === '11' ? '1' : '2';
        return `LED${n} 消灯（GP${block.getFieldValue('LED')}）`;
      }
      case 'pvb_if_switch': {
        const n = block.getFieldValue('SW') === '13' ? '1' : '2';
        return `スイッチ${n} が押されていたら（GP${block.getFieldValue('SW')}）`;
      }
      case 'pvb_sonar_val':    return '超音波センサーの距離（cm）';
      case 'pvb_line_val': {
        const l = block.getFieldValue('SENSOR') === '26' ? '左' : block.getFieldValue('SENSOR') === '27' ? '中' : '右';
        return `ラインセンサー（${l}）の値`;
      }
      case 'pvb_switch_val': {
        const n = block.getFieldValue('SW') === '13' ? '1' : '2';
        return `スイッチ${n} の値`;
      }
      case 'pvb_sonar':        return `超音波センサーで距離を測る → 変数「${block.getFieldValue('VAR')}」に格納`;
      case 'pvb_if_obstacle':  return `障害物が近かったら`;
      case 'pvb_line_read': {
        const l = block.getFieldValue('SENSOR') === '26' ? '左' : block.getFieldValue('SENSOR') === '27' ? '中' : '右';
        return `ラインセンサー（${l}）を読む → 変数「${block.getFieldValue('VAR')}」に格納`;
      }
      case 'pvb_if_line': {
        const l = block.getFieldValue('SENSOR') === '26' ? '左' : block.getFieldValue('SENSOR') === '27' ? '中' : '右';
        const c = block.getFieldValue('COLOR') === 'black' ? '黒' : '白';
        return `ラインセンサー（${l}）が${c}だったら`;
      }
      case 'pvb_print':        return `変数「${block.getFieldValue('VAR')}」を表示する`;
      case 'var_set':          return `変数「${block.getFieldValue('VAR')}」に値をセットする`;
      case 'var_change':       return `変数「${block.getFieldValue('VAR')}」を増減する`;
      case 'var_if_greater':   return `変数「${block.getFieldValue('VAR')}」が大きかったら`;
      case 'var_if_less':      return `変数「${block.getFieldValue('VAR')}」が小さかったら`;
      case 'print_text':       return `「${block.getFieldValue('TEXT')}」を表示する`;
      case 'print_var_label':  return `「${block.getFieldValue('LABEL')}」+ 変数「${block.getFieldValue('VAR')}」を表示する`;
      case 'print_separator':  return `区切り線を表示する`;
      case 'val_var':         return `変数「${block.getFieldValue('VAR')}」`;
      case 'val_number':      return `数値 ${block.getFieldValue('NUM')}`;
      case 'cond_compare':    return `比較（${block.getFieldValue('OP')}）`;
      case 'cond_and':        return `かつ（AND）`;
      case 'cond_or':         return `または（OR）`;
      case 'cond_not':        return `でない（NOT）`;
      case 'pico_if': {
        const eic = block.elseifCount_ || 0;
        const ec  = block.elseCount_   || 0;
        let label = '条件分岐（if';
        if (eic > 0) label += ` + ${eic}×elif`;
        if (ec  > 0) label += ' + else';
        return label + '）';
      }
      case 'pico_digital_read':     return `ピン${block.getFieldValue('PIN')} デジタル入力 → 変数「${block.getFieldValue('VAR')}」`;
      case 'pico_analog_read':      return `ADCピン${block.getFieldValue('PIN')} アナログ入力 → 変数「${block.getFieldValue('VAR')}」`;
      case 'pico_digital_read_val': return `ピン${block.getFieldValue('PIN')} の入力値`;
      case 'pico_analog_read_val':  return `ADCピン${block.getFieldValue('PIN')} のアナログ値`;
      case 'pico_for_range':  return `${block.getFieldValue('VAR')} を N 回繰り返す`;
      case 'pico_for_from_to': return `${block.getFieldValue('VAR')} を範囲指定で繰り返す`;
      default:                 return block.type;
    }
  }

  // コメント行を生成（トップレベルは区切り線付き、ネストは▶スタイル）
  function commentLine(block, indent) {
    const label = blockLabel(block);
    if (indent === '') {
      const bar = '─'.repeat(Math.max(0, 40 - label.length));
      return `# ┌─ ${label} ${bar}\n`;
    }
    return `${indent}# ▶ ${label}\n`;
  }

  // コメント表示フラグ（トグルボタンで切り替え）
  let showComments = true;
  let fileMode = false;

  function valueToCode(block, inputName, defaultVal) {
    if (defaultVal === undefined) defaultVal = '0';
    const input = block.getInput(inputName);
    if (!input || !input.connection || !input.connection.targetBlock()) {
      return String(defaultVal);
    }
    return valueBlockToCode(input.connection.targetBlock());
  }

  function valueBlockToCode(block) {
    if (!block) return '0';
    switch (block.type) {
      case 'val_var':
        return block.getFieldValue('VAR') || 'x';
      case 'val_number':
        return String(block.getFieldValue('NUM') !== null ? block.getFieldValue('NUM') : '0');
      case 'cond_compare': {
        const left  = valueToCode(block, 'LEFT', '0');
        const right = valueToCode(block, 'RIGHT', '0');
        const op    = block.getFieldValue('OP');
        return `(${left} ${op} ${right})`;
      }
      case 'cond_and': {
        const a = valueToCode(block, 'A', 'True');
        const b = valueToCode(block, 'B', 'True');
        return `(${a} and ${b})`;
      }
      case 'cond_or': {
        const a = valueToCode(block, 'A', 'False');
        const b = valueToCode(block, 'B', 'False');
        return `(${a} or ${b})`;
      }
      case 'cond_not': {
        const a = valueToCode(block, 'A', 'True');
        return `(not ${a})`;
      }
      case 'pico_digital_read_val': {
        const pin = block.getFieldValue('PIN');
        return `Pin(${pin}, Pin.IN).value()`;
      }
      case 'pico_analog_read_val': {
        const pin = block.getFieldValue('PIN');
        return `ADC(${pin}).read_u16()`;
      }
      case 'pvb_switch_val': {
        const sw = block.getFieldValue('SW');
        return `(Pin(${sw}, Pin.IN, Pin.PULL_UP).value() == 0)`;
      }
      case 'pvb_line_val': {
        const sensor = block.getFieldValue('SENSOR');
        return `ADC(${sensor}).read_u16()`;
      }
      case 'pvb_sonar_val':
        return '_pvb_sonar_cm()';
      default:
        return '0';
    }
  }

  // ブロックをMicroPythonコードに変換（再帰）
  function blockToCode(block, indent) {
    if (!block) return '';
    indent = indent || '';
    let code = showComments ? commentLine(block, indent) : '';

    switch (block.type) {

      // ===== 基本GPIO =====
      case 'pico_led_on': {
        const pin = block.getFieldValue('PIN');
        code += indent + `Pin(${pin}, Pin.OUT).value(1)\n`;
        break;
      }
      case 'pico_led_off': {
        const pin = block.getFieldValue('PIN');
        code += indent + `Pin(${pin}, Pin.OUT).value(0)\n`;
        break;
      }
      case 'pico_digital_write': {
        const pin = block.getFieldValue('PIN');
        const val = block.getFieldValue('VAL');
        code += indent + `Pin(${pin}, Pin.OUT).value(${val})\n`;
        break;
      }

      // ===== 制御 =====
      case 'pico_wait': {
        const sec = valueToCode(block, 'SEC', '1');
        code += indent + `utime.sleep(${sec})\n`;
        break;
      }
      case 'pico_repeat': {
        const times = valueToCode(block, 'TIMES', '10');
        const inner = statementToCode(block, 'DO', indent + '    ');
        code += indent + `for _ in range(${times}):\n` + (inner || indent + '    pass\n');
        break;
      }
      case 'pico_forever': {
        const inner = statementToCode(block, 'DO', indent + '    ');
        code += indent + `while True:\n` + (inner || indent + '    pass\n');
        break;
      }

      // ===== PoliviaBot UME モーター =====
      case 'pvb_forward': {
        const spd = valueToCode(block, 'SPEED', '50');
        code += indent + `_d = ${spd} * 65535 // 100\n`;
        code += indent + `_lm.duty_u16(0); _rm.duty_u16(0)\n`;
        code += indent + `_lp.duty_u16(_d); _rp.duty_u16(_d)\n`;
        break;
      }
      case 'pvb_backward': {
        const spd = valueToCode(block, 'SPEED', '50');
        code += indent + `_d = ${spd} * 65535 // 100\n`;
        code += indent + `_lp.duty_u16(0); _rp.duty_u16(0)\n`;
        code += indent + `_lm.duty_u16(_d); _rm.duty_u16(_d)\n`;
        break;
      }
      case 'pvb_turn_right': {
        const spd = valueToCode(block, 'SPEED', '50');
        code += indent + `_d = ${spd} * 65535 // 100\n`;
        code += indent + `_lm.duty_u16(0); _rm.duty_u16(_d)\n`;
        code += indent + `_lp.duty_u16(_d); _rp.duty_u16(0)\n`;
        break;
      }
      case 'pvb_turn_left': {
        const spd = valueToCode(block, 'SPEED', '50');
        code += indent + `_d = ${spd} * 65535 // 100\n`;
        code += indent + `_lm.duty_u16(_d); _rm.duty_u16(0)\n`;
        code += indent + `_lp.duty_u16(0); _rp.duty_u16(_d)\n`;
        break;
      }
      case 'pvb_stop': {
        code += indent + `_lp.duty_u16(0); _rp.duty_u16(0)\n`;
        code += indent + `_lm.duty_u16(0); _rm.duty_u16(0)\n`;
        break;
      }

      // ===== PoliviaBot LED / スイッチ =====
      case 'pvb_led_on': {
        const led = block.getFieldValue('LED');
        code += indent + `Pin(${led}, Pin.OUT).value(1)\n`;
        break;
      }
      case 'pvb_led_off': {
        const led = block.getFieldValue('LED');
        code += indent + `Pin(${led}, Pin.OUT).value(0)\n`;
        break;
      }
      case 'pvb_if_switch': {
        const sw = block.getFieldValue('SW');
        const inner = statementToCode(block, 'DO', indent + '    ');
        code += indent + `if Pin(${sw}, Pin.IN, Pin.PULL_UP).value() == 0:\n`;
        code += inner || indent + '    pass\n';
        break;
      }

      // ===== センサー =====
      case 'pvb_sonar': {
        const varName = block.getFieldValue('VAR');
        code += indent + `_trig = Pin(7, Pin.OUT); _echo = Pin(6, Pin.IN)\n`;
        code += indent + `_trig.value(0); utime.sleep_us(2)\n`;
        code += indent + `_trig.value(1); utime.sleep_us(10); _trig.value(0)\n`;
        code += indent + `while _echo.value() == 0: pass\n`;
        code += indent + `_t0 = utime.ticks_us()\n`;
        code += indent + `while _echo.value() == 1: pass\n`;
        code += indent + `${varName} = utime.ticks_diff(utime.ticks_us(), _t0) / 58\n`;
        break;
      }
      case 'pvb_if_obstacle': {
        const dist  = valueToCode(block, 'DIST', '20');
        const inner = statementToCode(block, 'DO', indent + '    ');
        code += indent + `_trig = Pin(7, Pin.OUT); _echo = Pin(6, Pin.IN)\n`;
        code += indent + `_trig.value(0); utime.sleep_us(2)\n`;
        code += indent + `_trig.value(1); utime.sleep_us(10); _trig.value(0)\n`;
        code += indent + `while _echo.value() == 0: pass\n`;
        code += indent + `_t0 = utime.ticks_us()\n`;
        code += indent + `while _echo.value() == 1: pass\n`;
        code += indent + `_dist_cm = utime.ticks_diff(utime.ticks_us(), _t0) / 58\n`;
        code += indent + `if _dist_cm < ${dist}:\n`;
        code += inner || indent + '    pass\n';
        break;
      }
      case 'pvb_line_read': {
        const sensor = block.getFieldValue('SENSOR');
        const varName = block.getFieldValue('VAR');
        code += indent + `${varName} = ADC(${sensor}).read_u16()\n`;
        break;
      }
      case 'pvb_if_line': {
        const sensor = block.getFieldValue('SENSOR');
        const color = block.getFieldValue('COLOR');
        const inner = statementToCode(block, 'DO', indent + '    ');
        const op = color === 'black' ? '>' : '<';
        code += indent + `if ADC(${sensor}).read_u16() ${op} 32767:\n`;
        code += inner || indent + '    pass\n';
        break;
      }
      case 'pvb_print': {
        const varName = block.getFieldValue('VAR');
        code += indent + `print(${varName})\n`;
        break;
      }
      case 'pico_if': {
        const cond0 = valueToCode(block, 'IF0', 'True');
        const do0   = statementToCode(block, 'DO0', indent + '    ');
        code += indent + `if ${cond0}:\n`;
        code += do0 || indent + '    pass\n';
        for (let i = 1; block.getInput('IF' + i); i++) {
          const condI = valueToCode(block, 'IF' + i, 'True');
          const doI   = statementToCode(block, 'DO' + i, indent + '    ');
          code += indent + `elif ${condI}:\n`;
          code += doI || indent + '    pass\n';
        }
        if (block.getInput('ELSE')) {
          const doElse = statementToCode(block, 'ELSE', indent + '    ');
          code += indent + `else:\n`;
          code += doElse || indent + '    pass\n';
        }
        break;
      }
      case 'var_set': {
        const v   = block.getFieldValue('VAR');
        const val = valueToCode(block, 'VALUE', '0');
        code += indent + `${v} = ${val}\n`;
        break;
      }
      case 'var_change': {
        const v   = block.getFieldValue('VAR');
        const amt = valueToCode(block, 'AMOUNT', '1');
        code += indent + `${v} += ${amt}\n`;
        break;
      }
      case 'pico_digital_read': {
        const pin = block.getFieldValue('PIN');
        const varName = block.getFieldValue('VAR');
        code += indent + `${varName} = Pin(${pin}, Pin.IN).value()\n`;
        break;
      }
      case 'pico_analog_read': {
        const pin = block.getFieldValue('PIN');
        const varName = block.getFieldValue('VAR');
        code += indent + `${varName} = ADC(${pin}).read_u16()\n`;
        break;
      }
      case 'val_var':
      case 'val_number':
      case 'cond_compare':
      case 'cond_and':
      case 'cond_or':
      case 'cond_not':
      case 'pico_if_elseif':
      case 'pico_if_else':
      case 'pico_digital_read_val':
      case 'pico_analog_read_val':
      case 'pvb_switch_val':
      case 'pvb_line_val':
      case 'pvb_sonar_val':
        break;
      case 'pico_for_range': {
        const v      = block.getFieldValue('VAR');
        const n      = valueToCode(block, 'N', '10');
        const doCode = statementToCode(block, 'DO', indent + '    ');
        code += indent + `for ${v} in range(${n}):\n`;
        code += doCode || indent + '    pass\n';
        break;
      }
      case 'pico_for_from_to': {
        const v      = block.getFieldValue('VAR');
        const start  = valueToCode(block, 'START', '0');
        const stop   = valueToCode(block, 'STOP', '10');
        const step   = valueToCode(block, 'STEP', '1');
        const doCode = statementToCode(block, 'DO', indent + '    ');
        code += indent + `for ${v} in range(${start}, ${stop}, ${step}):\n`;
        code += doCode || indent + '    pass\n';
        break;
      }
      case 'var_if_greater': {
        const v     = block.getFieldValue('VAR');
        const thr   = valueToCode(block, 'THRESHOLD', '0');
        const inner = statementToCode(block, 'DO', indent + '    ');
        code += indent + `if ${v} > ${thr}:\n`;
        code += inner || indent + '    pass\n';
        break;
      }
      case 'var_if_less': {
        const v     = block.getFieldValue('VAR');
        const thr   = valueToCode(block, 'THRESHOLD', '0');
        const inner = statementToCode(block, 'DO', indent + '    ');
        code += indent + `if ${v} < ${thr}:\n`;
        code += inner || indent + '    pass\n';
        break;
      }
      case 'print_text': {
        const text = JSON.stringify(block.getFieldValue('TEXT'));
        code += indent + `print(${text})\n`;
        break;
      }
      case 'print_var_label': {
        const label = JSON.stringify(block.getFieldValue('LABEL'));
        const varName = block.getFieldValue('VAR');
        code += indent + `print(${label} + str(${varName}))\n`;
        break;
      }
      case 'print_separator': {
        code += indent + `print('----------------')\n`;
        break;
      }

      default:
        code += indent + `pass  # 未対応ブロック: ${block.type}\n`;
    }

    // トップレベルはブロック間に空行を入れる
    if (indent === '') code += '\n';

    // 次のブロックへ
    const next = block.getNextBlock ? block.getNextBlock() : null;
    if (next) code += blockToCode(next, indent);

    return code;
  }

  // STATEMENT入力（ブロックの中身）を展開
  function statementToCode(block, inputName, indent) {
    const input = block.getInput(inputName);
    if (!input || !input.connection || !input.connection.targetBlock()) return '';
    return blockToCode(input.connection.targetBlock(), indent);
  }

  // コード生成メイン
  function generateCode() {
    if (fileMode) return;

    // ワークスペース内の全ブロックタイプを収集
    const allBlocks = workspace.getAllBlocks(false);
    const blockTypes = new Set(allBlocks.map(b => b.type));

    // モーター制御ブロックが含まれているか確認
    const motorTypes = ['pvb_forward','pvb_backward','pvb_turn_right','pvb_turn_left','pvb_stop'];
    const hasMotor = motorTypes.some(t => blockTypes.has(t));

    // 超音波センサー値ブロックが含まれているか確認
    const hasSonarVal = blockTypes.has('pvb_sonar_val');

    const baseHeader = 'from machine import Pin, PWM, ADC\nimport utime\n\n';
    const motorInit =
      '_lp = PWM(Pin(0)); _lp.freq(1000)\n' +
      '_lm = PWM(Pin(1)); _lm.freq(1000)\n' +
      '_rp = PWM(Pin(2)); _rp.freq(1000)\n' +
      '_rm = PWM(Pin(3)); _rm.freq(1000)\n\n';
    const sonarHelper =
      'def _pvb_sonar_cm():\n' +
      '    _trig = Pin(7, Pin.OUT); _echo = Pin(6, Pin.IN)\n' +
      '    _trig.value(0); utime.sleep_us(2)\n' +
      '    _trig.value(1); utime.sleep_us(10); _trig.value(0)\n' +
      '    while _echo.value() == 0: pass\n' +
      '    _t0 = utime.ticks_us()\n' +
      '    while _echo.value() == 1: pass\n' +
      '    return utime.ticks_diff(utime.ticks_us(), _t0) / 58\n\n';

    let header = baseHeader;
    if (hasMotor) header += motorInit;
    if (hasSonarVal) header += sonarHelper;
    let code = '';
    const topBlocks = workspace.getTopBlocks(true);
    for (const block of topBlocks) {
      code += blockToCode(block, '');
    }
    if (!codingMode) {
      editor.setValue(header + (code || '# ブロックを追加してください'));
    }
  }

  // ===== ツールボックスエリアへのドラッグで削除 =====
  workspace.addChangeListener(function(e) {
    if (e.type !== Blockly.Events.BLOCK_DRAG || e.isStart) return;
    const block = workspace.getBlockById(e.blockId);
    if (!block) return;

    // ツールボックスのDOM幅を取得
    const toolboxEl = document.querySelector('.blocklyToolboxDiv');
    if (!toolboxEl) return;
    const toolboxRight = toolboxEl.getBoundingClientRect().right;

    // ブロックのSVG座標をスクリーン座標に変換
    const blocklyDiv = document.getElementById('blockly-div');
    const divLeft = blocklyDiv.getBoundingClientRect().left;
    const blockXY = block.getRelativeToSurfaceXY();
    const scale = workspace.scale;
    const metrics = workspace.getMetrics();
    const blockScreenX = divLeft + (blockXY.x + metrics.contentLeft) * scale;

    if (blockScreenX < toolboxRight) {
      Blockly.Events.disable();
      try { block.dispose(false, true); } finally { Blockly.Events.enable(); }
      generateCode();
    }
  });

  // ワークスペース変更時に自動更新
  workspace.addChangeListener(function(e) {
    // ブロックを操作したら読み込みファイルモードを解除
    if (fileMode && e.type !== Blockly.Events.VIEWPORT_CHANGE && e.type !== Blockly.Events.SELECTED) {
      fileMode = false;
    }
    generateCode();
  });
  generateCode();

  const btnComments = document.getElementById('btn-toggle-comments');
  btnComments.addEventListener('click', function() {
    showComments = !showComments;
    btnComments.textContent = showComments ? 'コメント ON' : 'コメント OFF';
    btnComments.classList.toggle('comments-off', !showComments);
    generateCode();
  });

  const btnCodingMode = document.getElementById('btn-coding-mode');
  btnCodingMode.addEventListener('click', function() {
    codingMode = !codingMode;
    editor.setOption('readOnly', codingMode ? false : true);
    btnCodingMode.textContent = codingMode ? 'ブロックモード' : 'コーディングモード';
    btnCodingMode.classList.toggle('coding-active', codingMode);
    if (!codingMode) {
      generateCode();
    }
  });

  // ===== ブロック XML 保存 =====
  document.getElementById('btn-save-xml').addEventListener('click', function() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToText(xml);
    const blob = new Blob([text], { type: 'application/xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'blocks.xml';
    a.click();
  });

  // ===== ブロック XML 読込 =====
  document.getElementById('btn-load-xml').addEventListener('click', function() {
    document.getElementById('xml-input').click();
  });

  document.getElementById('xml-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const dom = new DOMParser().parseFromString(ev.target.result, 'text/xml');
        const xml = dom.documentElement;
        workspace.clear();
        Blockly.Xml.domToWorkspace(xml, workspace);
      } catch (err) {
        alert('XML の読み込みに失敗しました: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  document.getElementById('btn-download').addEventListener('click', function() {
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'main.py';
    a.click();
  });

  document.getElementById('btn-load').addEventListener('click', function() {
    document.getElementById('file-input').click();
  });

  document.getElementById('file-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      fileMode = true;
      editor.setValue(ev.target.result);
      document.getElementById('serial-status').textContent = file.name + ' を読み込みました';
      document.getElementById('serial-status').className = 'serial-status serial-status--ok';
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // ===== デモモード（Web Serial 非対応環境：iPad Safari 等） =====
  const hasSerial = 'serial' in navigator;
  if (!hasSerial) {
    document.getElementById('demo-badge').style.display = '';
    ['serial-sep', 'btn-connect', 'btn-run', 'btn-stop', 'btn-write'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  // ===== Web Serial：接続 / 書き込み =====
  const btnConnect = document.getElementById('btn-connect');
  const btnWrite   = document.getElementById('btn-write');
  const statusEl   = document.getElementById('serial-status');

  function setSerialStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = 'serial-status' + (type ? ' serial-status--' + type : '');
  }

  // ===== シリアルモニター =====
  const monitorOutput  = document.getElementById('monitor-output');
  const btnMonitorClear = document.getElementById('btn-monitor-clear');

  function appendMonitor(text) {
    monitorOutput.textContent += text;
    monitorOutput.scrollTop = monitorOutput.scrollHeight;
  }

  btnMonitorClear.addEventListener('click', function() {
    monitorOutput.textContent = '';
  });

  function updateSerialUI() {
    const connected = PicoSerial.isConnected();
    btnConnect.textContent = connected ? '切断' : '接続';
    btnConnect.classList.toggle('connected', connected);
    btnWrite.disabled = !connected;
    document.getElementById('btn-run').disabled = !connected;
    document.getElementById('btn-stop').disabled = !connected;
    // 接続時は自動でモニター開始、切断時は停止
    if (connected && !PicoSerial.isMonitoring()) {
      PicoSerial.startMonitor(appendMonitor);
    } else if (!connected) {
      PicoSerial.stopMonitor();
    }
  }

  btnConnect.addEventListener('click', async function() {
    if (PicoSerial.isConnected()) {
      await PicoSerial.disconnect();
      setSerialStatus('切断しました', 'dim');
      updateSerialUI();
      return;
    }
    try {
      setSerialStatus('ポートを選択中...', '');
      await PicoSerial.connect();
      setSerialStatus('接続済み', 'ok');
      updateSerialUI();
    } catch (e) {
      const msg = e.message.includes('open') || e.message.includes('Failed')
        ? 'ポートが他のアプリ（Thonny等）に使用中です'
        : e.message.includes('No port selected') || e.message.includes('cancelled')
        ? 'キャンセルされました'
        : e.message;
      setSerialStatus('接続失敗: ' + msg, 'err');
      updateSerialUI();
    }
  });

  document.getElementById('btn-run').addEventListener('click', async function() {
    const code = editor.getValue();
    document.getElementById('btn-run').disabled = true;
    btnWrite.disabled = true;
    btnConnect.disabled = true;
    try {
      await PicoSerial.runCode(code, msg => setSerialStatus(msg, 'progress'), appendMonitor);
    } catch (e) {
      setSerialStatus('実行エラー: ' + e.message, 'err');
    } finally {
      updateSerialUI();
      btnConnect.disabled = false;
    }
  });

  document.getElementById('btn-stop').addEventListener('click', async function() {
    try {
      await PicoSerial.stopCode();
      setSerialStatus('⏹ 停止しました', 'dim');
    } catch (e) {
      setSerialStatus('停止エラー: ' + e.message, 'err');
    }
  });

  btnWrite.addEventListener('click', async function() {
    const code = editor.getValue();
    btnWrite.disabled = true;
    btnConnect.disabled = true;
    try {
      await PicoSerial.writeMainPy(code, msg => setSerialStatus(msg, 'progress'));
      setSerialStatus('✓ 書き込み完了', 'ok');
    } catch (e) {
      setSerialStatus('書き込みエラー: ' + e.message, 'err');
    } finally {
      updateSerialUI();
      btnConnect.disabled = false;
    }
  });

  // ===== リサイズ機能 =====

  // 左右リサイズ（ブロックエリア ↔ コードパネル）
  (function() {
    const divider    = document.querySelector('.divider');
    const blocklyDiv = document.getElementById('blockly-div');
    const codePanel  = document.querySelector('.code-panel');
    const mainEl     = document.querySelector('.main');
    let dragging = false, startX = 0, startW = 0;

    function startDrag(clientX) {
      dragging = true;
      startX = clientX;
      startW = blocklyDiv.getBoundingClientRect().width;
      divider.classList.add('dragging');
      document.body.style.userSelect = 'none';
    }
    function onMove(clientX) {
      if (!dragging) return;
      const mainW = mainEl.getBoundingClientRect().width;
      const divW  = divider.getBoundingClientRect().width;
      const newW  = Math.max(200, Math.min(mainW - divW - 200, startW + (clientX - startX)));
      blocklyDiv.style.width = newW + 'px';
      blocklyDiv.style.flex  = 'none';
      codePanel.style.flex   = '1';
      Blockly.svgResize(workspace);
    }
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      divider.classList.remove('dragging');
      document.body.style.userSelect = '';
    }

    divider.addEventListener('mousedown', e => { document.body.style.cursor = 'col-resize'; startDrag(e.clientX); });
    divider.addEventListener('touchstart', e => { e.preventDefault(); startDrag(e.touches[0].clientX); }, { passive: false });
    document.addEventListener('mousemove', e => onMove(e.clientX));
    document.addEventListener('touchmove', e => { if (dragging) { e.preventDefault(); onMove(e.touches[0].clientX); } }, { passive: false });
    document.addEventListener('mouseup', () => { document.body.style.cursor = ''; endDrag(); });
    document.addEventListener('touchend', endDrag);
  })();

  // 上下リサイズ（コード表示 ↔ シリアルモニタ）
  (function() {
    const handle      = document.getElementById('monitor-resize-handle');
    const codeOutput  = document.getElementById('code-editor');
    const monitorOut  = document.getElementById('monitor-output');
    let dragging = false, startY = 0, startH = 0;

    function startDrag(clientY) {
      dragging = true;
      startY = clientY;
      startH = codeOutput.getBoundingClientRect().height;
      handle.classList.add('dragging');
      document.body.style.userSelect = 'none';
    }
    function onMove(clientY) {
      if (!dragging) return;
      const newH = Math.max(60, startH + (clientY - startY));
      codeOutput.style.flex = `0 0 ${newH}px`;
      monitorOut.style.flex = '1 1 0';
    }
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('dragging');
      document.body.style.userSelect = '';
    }

    handle.addEventListener('mousedown', e => { document.body.style.cursor = 'row-resize'; startDrag(e.clientY); });
    handle.addEventListener('touchstart', e => { e.preventDefault(); startDrag(e.touches[0].clientY); }, { passive: false });
    document.addEventListener('mousemove', e => onMove(e.clientY));
    document.addEventListener('touchmove', e => { if (dragging) { e.preventDefault(); onMove(e.touches[0].clientY); } }, { passive: false });
    document.addEventListener('mouseup', () => { document.body.style.cursor = ''; endDrag(); });
    document.addEventListener('touchend', endDrag);
  })();
});
