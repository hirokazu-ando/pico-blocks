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
    NEW_VARIABLE:        '新しい変数を作る',
    NEW_VARIABLE_TITLE:  '新しい変数の名前:',
    RENAME_VARIABLE:     '変数の名前を変える',
    RENAME_VARIABLE_TITLE:'変数「%1」の新しい名前:',
    DELETE_VARIABLE:     '変数「%1」を削除する',
    DELETE_VARIABLE_CONFIRMATION:'変数「%1」は %2 か所で使われています。削除しますか？',
    VARIABLE_CATEGORY_NAME:'変数',
    VARIABLE_ALREADY_EXISTS:'変数「%1」はすでに存在します。',
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
    toolbox: document.getElementById('toolbox-python'),
    theme: pcbTheme,
    renderer: 'zelos',
    scrollbars: true,
    trashcan: true,
    zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3 }
  });

  const lightTheme = Blockly.Theme.defineTheme('pycoLight', {
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour: '#f8fff8',
      toolboxBackgroundColour:   '#f0f6f0',
      toolboxForegroundColour:   '#1a2a1a',
      flyoutBackgroundColour:    '#eef6ee',
      flyoutForegroundColour:    '#1a2a1a',
      flyoutOpacity:             1,
      scrollbarColour:           '#b0ccb0',
      scrollbarOpacity:          0.8,
      insertionMarkerColour:     '#1e7a1e',
      insertionMarkerOpacity:    0.4,
      cursorColour:              '#1e7a1e',
    }
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
  let currentMode = 'micropython'; // 初期値は後で applyMode('python') で上書き

  // ===== ファイルタブ管理（Python入門モードのみ） =====
  let pyFiles = [{ name: 'main.py', content: '# ブロックを追加してください', blockXml: null }];
  let activeFileIdx = 0;

  // モジュール選択ドロップダウン用：ブロック定義（python_intro.js）から参照
  window.getPyModuleOptions = function() {
    const mods = pyFiles
      .filter(function(f, i) { return i !== 0; })
      .map(function(f) {
        const name = f.name.replace(/\.py$/, '');
        return [name, name];
      });
    return mods.length > 0 ? mods : [['（モジュールなし）', '__none__']];
  };

  // 指定モジュール内の関数名一覧（ブロック定義の関数ドロップダウンから参照）
  window.getPyModuleFunctions = function(modName) {
    if (!modName || modName === '__none__') return [['（モジュールを選択）', '__none__']];
    const file = pyFiles.find(function(f) { return f.name === modName + '.py'; });
    if (!file) return [['（モジュールなし）', '__none__']];
    const content = file.content || '';
    const funcs = [];
    const re = /^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm;
    let m;
    while ((m = re.exec(content)) !== null) {
      funcs.push([m[1], m[1]]);
    }
    return funcs.length > 0 ? funcs : [['（関数なし）', '__none__']];
  };

  function saveCurrentFile() {
    pyFiles[activeFileIdx].content = editor.getValue();
  }

  function renderFileTabs() {
    const bar = document.getElementById('file-tabs');
    bar.innerHTML = '';
    pyFiles.forEach(function(f, i) {
      const tab = document.createElement('div');
      tab.className = 'file-tab' + (i === activeFileIdx ? ' active' : '');
      const name = document.createElement('span');
      name.className = 'file-tab-name';
      name.textContent = f.name;
      tab.appendChild(name);
      if (i !== 0) {
        const close = document.createElement('span');
        close.className = 'file-tab-close';
        close.textContent = '×';
        close.title = '削除';
        close.addEventListener('click', function(e) {
          e.stopPropagation();
          if (!confirm(f.name + ' を削除しますか？')) return;
          // 削除前に現在のエディタ内容を保存
          saveCurrentFile();
          pyFiles.splice(i, 1);
          const nextIdx = activeFileIdx >= pyFiles.length ? pyFiles.length - 1
                        : activeFileIdx === i            ? Math.max(0, i - 1)
                        : activeFileIdx > i              ? activeFileIdx - 1
                        : activeFileIdx;
          activeFileIdx = nextIdx;
          editor.setValue(pyFiles[activeFileIdx].content);
          editor.setOption('readOnly', activeFileIdx === 0 ? !codingMode : false);
          // 削除後のアクティブファイルのBlocklyワークスペースを復元
          workspace.clear();
          if (pyFiles[activeFileIdx].blockXml) {
            try {
              const dom = new DOMParser().parseFromString(pyFiles[activeFileIdx].blockXml, 'text/xml');
              Blockly.Xml.domToWorkspace(dom.documentElement, workspace);
            } catch (e) {
              console.warn('ワークスペース復元失敗:', e);
            }
          }
          // ツールボックスも切替
          if (currentMode === 'python') {
            const tbId = activeFileIdx === 0 ? 'toolbox-python' : 'toolbox-module';
            workspace.updateToolbox(document.getElementById(tbId));
          }
          renderFileTabs();
        });
        tab.appendChild(close);
      }
      tab.addEventListener('click', function() { switchFile(i); });
      bar.appendChild(tab);
    });
    const addBtn = document.createElement('button');
    addBtn.id = 'btn-add-file';
    addBtn.textContent = '+';
    addBtn.title = 'ファイルを追加';
    addBtn.addEventListener('click', addNewFile);
    bar.appendChild(addBtn);
  }

  function switchFile(idx) {
    saveCurrentFile();
    // 現在のワークスペースXMLを保存
    const curXml = Blockly.Xml.workspaceToDom(workspace);
    pyFiles[activeFileIdx].blockXml = Blockly.Xml.domToText(curXml);

    activeFileIdx = idx;
    editor.setValue(pyFiles[idx].content);
    // main.py はブロックモード時 readonly、サブファイルは常に編集可
    editor.setOption('readOnly', idx === 0 ? !codingMode : false);

    // 切替先ファイルのBlocklyワークスペースを復元
    workspace.clear();
    if (pyFiles[idx].blockXml) {
      try {
        const dom = new DOMParser().parseFromString(pyFiles[idx].blockXml, 'text/xml');
        Blockly.Xml.domToWorkspace(dom.documentElement, workspace);
      } catch (e) {
        console.warn('ワークスペース復元失敗:', e);
      }
    }

    // ツールボックス切替: main.py → python/micropython、サブファイル → module
    if (currentMode === 'python') {
      const tbId = idx === 0 ? 'toolbox-python' : 'toolbox-module';
      workspace.updateToolbox(document.getElementById(tbId));
    }

    renderFileTabs();
  }

  function addNewFile() {
    const raw = prompt('ファイル名を入力してください（例: mymodule.py）');
    if (!raw || !raw.trim()) return;
    const fname = raw.trim().endsWith('.py') ? raw.trim() : raw.trim() + '.py';
    if (pyFiles.find(function(f) { return f.name === fname; })) {
      alert(fname + ' はすでに存在します');
      return;
    }
    pyFiles.push({ name: fname, content: '', blockXml: null });
    switchFile(pyFiles.length - 1);
  }
  let Tutorial;   // 後で代入（generateCode から参照するため先に宣言）
  let blockLineMap = new Map(); // blockId → { from, to }（CodeMirror の 0 始まり行番号）
  const BLOCK_SEL_BG_CLASS = 'block-selection-highlight';
  let _emitCtx = { line: 0 };
  function _nl(s) {
    return (s.match(/\n/g) || []).length;
  }
  function appendLocal(code, frag) {
    if (frag) _emitCtx.line += _nl(frag);
    return code + frag;
  }
  /** 子の blockToCode 戻りは子側で行数加算済み。空のときは pass 行だけ加算 */
  function appendChildBody(code, childText, passLine) {
    if (childText) return code + childText;
    return appendLocal(code, passLine);
  }

  /**
   * 式用（VALUE）入力だけ追跡する。statement 入力（DO など）は別行なのでここでは辿らない。
   * 接続方向で判定（圧縮 Blockly でもクラス名に依存しにくい）。
   */
  function isBlocklyValueInput(inp) {
    if (!inp || !inp.connection) return false;
    const tb = inp.connection.targetBlock();
    if (!tb) return false;
    if (tb.outputConnection && tb.outputConnection.targetConnection === inp.connection) return true;
    if (tb.previousConnection && tb.previousConnection.targetConnection === inp.connection) return false;
    const ctor = inp.constructor && inp.constructor.name;
    if (ctor === 'StatementInput' || ctor === 'DummyInput') return false;
    if (ctor === 'ValueInput') return true;
    const t = inp.type;
    if (typeof Blockly !== 'undefined') {
      if (Blockly.INPUT_VALUE !== undefined && t === Blockly.INPUT_VALUE) return true;
      if (Blockly.inputs && Blockly.inputs.inputTypes && t === Blockly.inputs.inputTypes.VALUE) return true;
    }
    return t === 1 || t === 'input_value';
  }

  /** 式ブロックとその子（演算・比較など）を、与えられた行に紐付けて blockLineMap に登録する */
  function registerExprBlocksAtLine(block, lineNo) {
    if (!block) return;
    blockLineMap.set(block.id, { from: lineNo, to: lineNo });
    const inputs = block.inputList;
    for (let i = 0; i < inputs.length; i++) {
      const inp = inputs[i];
      if (!isBlocklyValueInput(inp)) continue;
      const tb = inp.connection && inp.connection.targetBlock();
      if (tb) registerExprBlocksAtLine(tb, lineNo);
    }
  }

  function registerExprBlocksAtLineFromInput(parentBlock, inputName, lineNo) {
    const input = parentBlock.getInput(inputName);
    if (!input || !input.connection || !input.connection.targetBlock()) return;
    registerExprBlocksAtLine(input.connection.targetBlock(), lineNo);
  }

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
      case 'pvb_sonar':        return `超音波センサーで距離を測る → 変数「${getVarName(block, 'VAR')}」に格納`;
      case 'pvb_if_obstacle':  return `障害物が近かったら`;
      case 'pvb_line_read': {
        const l = block.getFieldValue('SENSOR') === '26' ? '左' : block.getFieldValue('SENSOR') === '27' ? '中' : '右';
        return `ラインセンサー（${l}）を読む → 変数「${getVarName(block, 'VAR')}」に格納`;
      }
      case 'pvb_if_line': {
        const l = block.getFieldValue('SENSOR') === '26' ? '左' : block.getFieldValue('SENSOR') === '27' ? '中' : '右';
        const c = block.getFieldValue('COLOR') === 'black' ? '黒' : '白';
        return `ラインセンサー（${l}）が${c}だったら`;
      }
      case 'pvb_print':        return `変数「${getVarName(block, 'VAR')}」を表示する`;
      case 'var_set':          return `変数「${getVarName(block, 'VAR')}」に値をセットする`;
      case 'var_change':       return `変数「${getVarName(block, 'VAR')}」を増減する`;
      case 'var_if_greater':   return `変数「${getVarName(block, 'VAR')}」が大きかったら`;
      case 'var_if_less':      return `変数「${getVarName(block, 'VAR')}」が小さかったら`;
      case 'print_text':       return `「${block.getFieldValue('TEXT')}」を表示する`;
      case 'print_var_label':  return `「${block.getFieldValue('LABEL')}」+ 変数「${getVarName(block, 'VAR')}」を表示する`;
      case 'print_separator':  return `区切り線を表示する`;
      case 'val_var':         return `変数「${getVarName(block, 'VAR')}」`;
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
      case 'pico_digital_read':     return `ピン${block.getFieldValue('PIN')} デジタル入力 → 変数「${getVarName(block, 'VAR')}」`;
      case 'pico_analog_read':      return `ADCピン${block.getFieldValue('PIN')} アナログ入力 → 変数「${getVarName(block, 'VAR')}」`;
      case 'pico_digital_read_val': return `ピン${block.getFieldValue('PIN')} の入力値`;
      case 'pico_analog_read_val':  return `ADCピン${block.getFieldValue('PIN')} のアナログ値`;
      case 'pico_for_range':  return `${getVarName(block, 'VAR')} を N 回繰り返す`;
      case 'pico_for_from_to': return `${getVarName(block, 'VAR')} を範囲指定で繰り返す`;
      case 'val_str':        return `文字列「${block.getFieldValue('TEXT')}」`;
      case 'val_bool':       return block.getFieldValue('BOOL') === 'True' ? 'True（真）' : 'False（偽）';
      case 'py_math_op':     return `算術演算（${block.getFieldValue('OP')}）`;
      case 'py_str_concat':  return '文字列連結';
      case 'py_while':       return 'while ループ';
      case 'py_print':       return '値を表示する';
      case 'py_input': {
        const typeLabel = { str: 'テキスト', int: '数値（整数）', float: '数値（小数）' }[block.getFieldValue('TYPE')] || 'テキスト';
        return `キーボード入力（${typeLabel}）→ 変数「${getVarName(block, 'VAR')}」`;
      }
      case 'py_list_empty':    return '空のリスト []';
      case 'py_list_append':   return `リスト「${getVarName(block, 'LIST')}」に追加する`;
      case 'py_list_get':      return `リスト「${getVarName(block, 'LIST')}」の要素取得`;
      case 'py_list_set':      return `リスト「${getVarName(block, 'LIST')}」の要素変更`;
      case 'py_list_len':      return `リスト「${getVarName(block, 'LIST')}」の長さ`;
      case 'py_for_list':      return `リスト「${getVarName(block, 'LIST')}」を順に繰り返す`;
      case 'py_break':         return 'ループを抜ける（break）';
      case 'py_continue':      return '次のループへ（continue）';
      case 'py_def_noarg':  return `関数「${block.getFieldValue('NAME')}」を定義する`;
      case 'py_def':        return `関数「${block.getFieldValue('NAME')}」（引数: ${getVarName(block, 'PARAM')}）を定義する`;
      case 'py_def_args2':  return `関数「${block.getFieldValue('NAME')}」（引数: ${block.getFieldValue('PARAM1')}, ${block.getFieldValue('PARAM2')}）を定義する`;
      case 'py_def_args3':  return `関数「${block.getFieldValue('NAME')}」（引数: ${block.getFieldValue('PARAM1')}, ${block.getFieldValue('PARAM2')}, ${block.getFieldValue('PARAM3')}）を定義する`;
      case 'py_return':     return '戻り値を返す（return）';
      case 'py_call_stmt':        return `関数「${block.getFieldValue('NAME')}」を呼び出す`;
      case 'py_call_val':         return `関数「${block.getFieldValue('NAME')}」の結果`;
      case 'py_module_call_stmt': return `モジュール「${block.getFieldValue('MODULE')}」の「${block.getFieldValue('FUNC')}」を呼び出す`;
      case 'py_module_call_val':  return `モジュール「${block.getFieldValue('MODULE')}」の「${block.getFieldValue('FUNC')}」の結果`;
      case 'py_random_int':    return 'ランダムな整数';
      case 'py_type_cast':     return `型変換（${block.getFieldValue('TYPE')}）`;
      case 'py_abs':           return '絶対値（abs）';
      case 'py_round':         return '四捨五入（round）';
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

  // FieldVariable の表示名を安全に取得するヘルパー
  // FieldVariable は getFieldValue() が内部 ID を返すため、
  // getVariable().name で表示名を取得する
  function getVarName(block, fieldName) {
    const field = block.getField(fieldName || 'VAR');
    if (field && typeof field.getVariable === 'function') {
      const v = field.getVariable();
      if (v && v.name) return v.name;
    }
    return block.getFieldValue(fieldName || 'VAR') || fieldName || 'x';
  }

  function getSelectedBlockId() {
    try {
      if (typeof Blockly !== 'undefined' && Blockly.common && typeof Blockly.common.getSelected === 'function') {
        const sel = Blockly.common.getSelected();
        if (sel && sel.id != null) return sel.id;
      }
    } catch (e) { /* */ }
    try {
      if (typeof workspace.getSelected === 'function') {
        const b = workspace.getSelected();
        if (b && b.id != null) return b.id;
      }
      if (typeof workspace.getSelectedBlock === 'function') {
        const b = workspace.getSelectedBlock();
        if (b && b.id != null) return b.id;
      }
    } catch (e) { /* */ }
    return null;
  }

  /** markText + インラインブロック幅指定は CM5 の行描画を壊すことがあるため、行背景クラスのみ使う */
  function clearBlockSelectionHighlight() {
    try {
      const n = editor.lineCount();
      for (let i = 0; i < n; i++) {
        editor.removeLineClass(i, 'background', BLOCK_SEL_BG_CLASS);
      }
    } catch (e) { /* */ }
  }

  function paintBlockSelectionHighlight(blockId) {
    clearBlockSelectionHighlight();
    if (blockId == null || blockId === '') return;
    const info = blockLineMap.get(blockId);
    if (!info) return;
    const lc = editor.lineCount();
    if (info.from < 0 || info.from >= lc) return;
    const last = Math.min(info.to, lc - 1);
    if (last < info.from) return;
    try {
      for (let line = info.from; line <= last; line++) {
        editor.addLineClass(line, 'background', BLOCK_SEL_BG_CLASS);
      }
      editor.scrollIntoView({ line: info.from, ch: 0 }, 80);
    } catch (err) {
      console.warn('paintBlockSelectionHighlight', err);
    }
  }

  function refreshBlockSelectionHighlight() {
    paintBlockSelectionHighlight(getSelectedBlockId());
  }

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
        return getVarName(block, 'VAR') || 'x';
      case 'val_number':
        return String(block.getFieldValue('NUM') !== null ? block.getFieldValue('NUM') : '0');
      case 'val_str': {
        const text = block.getFieldValue('TEXT') || '';
        return JSON.stringify(text);
      }
      case 'val_bool':
        return block.getFieldValue('BOOL') === 'True' ? 'True' : 'False';
      case 'py_math_op': {
        const left  = valueToCode(block, 'LEFT', '0');
        const right = valueToCode(block, 'RIGHT', '0');
        const op    = block.getFieldValue('OP');
        return `(${left} ${op} ${right})`;
      }
      case 'py_str_concat': {
        const a = valueToCode(block, 'A', '""');
        const b = valueToCode(block, 'B', '""');
        return `(str(${a}) + str(${b}))`;
      }
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
      case 'py_list_empty':
        return '[]';
      case 'py_list_get': {
        const listName = getVarName(block, 'LIST');
        const idx = valueToCode(block, 'INDEX', '0');
        return `${listName}[${idx}]`;
      }
      case 'py_list_len': {
        const listName = getVarName(block, 'LIST');
        return `len(${listName})`;
      }
      case 'py_random_int': {
        const from = valueToCode(block, 'FROM', '1');
        const to   = valueToCode(block, 'TO', '10');
        return `random.randint(${from}, ${to})`;
      }
      case 'py_type_cast': {
        const val  = valueToCode(block, 'VALUE', '0');
        const type = block.getFieldValue('TYPE');
        return `${type}(${val})`;
      }
      case 'py_abs': {
        const val = valueToCode(block, 'VALUE', '0');
        return `abs(${val})`;
      }
      case 'py_round': {
        const val    = valueToCode(block, 'VALUE', '0');
        const digits = valueToCode(block, 'DIGITS', '2');
        return `round(${val}, ${digits})`;
      }
      case 'py_call_val': {
        const name = block.getFieldValue('NAME');
        const arg  = valueToCode(block, 'ARG', '');
        return `${name}(${arg})`;
      }
      case 'py_module_call_val': {
        const mod  = block.getFieldValue('MODULE');
        const func = block.getFieldValue('FUNC');
        const arg  = valueToCode(block, 'ARG', '');
        if (!mod || mod === '__none__') return `${func}(${arg})`;
        return `${mod}.${func}(${arg})`;
      }
      default:
        return '0';
    }
  }

  // ブロックをMicroPythonコードに変換（再帰）
  function blockToCode(block, indent) {
    if (!block) return '';
    indent = indent || '';
    const blockOwnFrom = _emitCtx.line;
    let code = '';
    if (showComments) {
      code = appendLocal(code, commentLine(block, indent));
    }

    switch (block.type) {

      // ===== 基本GPIO =====
      case 'pico_led_on': {
        const pin = block.getFieldValue('PIN');
        code = appendLocal(code, indent + `Pin(${pin}, Pin.OUT).value(1)\n`);
        break;
      }
      case 'pico_led_off': {
        const pin = block.getFieldValue('PIN');
        code = appendLocal(code, indent + `Pin(${pin}, Pin.OUT).value(0)\n`);
        break;
      }
      case 'pico_digital_write': {
        const pin = block.getFieldValue('PIN');
        const val = block.getFieldValue('VAL');
        code = appendLocal(code, indent + `Pin(${pin}, Pin.OUT).value(${val})\n`);
        break;
      }

      // ===== 制御 =====
      case 'pico_wait': {
        const lnWait = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'SEC', lnWait);
        const sec = valueToCode(block, 'SEC', '1');
        code = appendLocal(code, currentMode === 'python'
          ? indent + `time.sleep(${sec})\n`
          : indent + `utime.sleep(${sec})\n`);
        break;
      }
      case 'pico_repeat': {
        const lnRep = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'TIMES', lnRep);
        const times = valueToCode(block, 'TIMES', '10');
        code = appendLocal(code, indent + `for _ in range(${times}):\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }
      case 'pico_forever': {
        code = appendLocal(code, indent + `while True:\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }

      // ===== PoliviaBot UME モーター =====
      case 'pvb_forward': {
        const lnFwd = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'SPEED', lnFwd);
        const spd = valueToCode(block, 'SPEED', '50');
        code = appendLocal(code, indent + `_d = ${spd} * 65535 // 100\n`);
        code = appendLocal(code, indent + `_lm.duty_u16(0); _rm.duty_u16(0)\n`);
        code = appendLocal(code, indent + `_lp.duty_u16(_d); _rp.duty_u16(_d)\n`);
        break;
      }
      case 'pvb_backward': {
        const lnBwd = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'SPEED', lnBwd);
        const spd = valueToCode(block, 'SPEED', '50');
        code = appendLocal(code, indent + `_d = ${spd} * 65535 // 100\n`);
        code = appendLocal(code, indent + `_lp.duty_u16(0); _rp.duty_u16(0)\n`);
        code = appendLocal(code, indent + `_lm.duty_u16(_d); _rm.duty_u16(_d)\n`);
        break;
      }
      case 'pvb_turn_right': {
        const lnTR = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'SPEED', lnTR);
        const spd = valueToCode(block, 'SPEED', '50');
        code = appendLocal(code, indent + `_d = ${spd} * 65535 // 100\n`);
        code = appendLocal(code, indent + `_lm.duty_u16(0); _rm.duty_u16(_d)\n`);
        code = appendLocal(code, indent + `_lp.duty_u16(_d); _rp.duty_u16(0)\n`);
        break;
      }
      case 'pvb_turn_left': {
        const lnTL = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'SPEED', lnTL);
        const spd = valueToCode(block, 'SPEED', '50');
        code = appendLocal(code, indent + `_d = ${spd} * 65535 // 100\n`);
        code = appendLocal(code, indent + `_lm.duty_u16(_d); _rm.duty_u16(0)\n`);
        code = appendLocal(code, indent + `_lp.duty_u16(0); _rp.duty_u16(_d)\n`);
        break;
      }
      case 'pvb_stop': {
        code = appendLocal(code, indent + `_lp.duty_u16(0); _rp.duty_u16(0)\n`);
        code = appendLocal(code, indent + `_lm.duty_u16(0); _rm.duty_u16(0)\n`);
        break;
      }

      // ===== PoliviaBot LED / スイッチ =====
      case 'pvb_led_on': {
        const led = block.getFieldValue('LED');
        code = appendLocal(code, indent + `Pin(${led}, Pin.OUT).value(1)\n`);
        break;
      }
      case 'pvb_led_off': {
        const led = block.getFieldValue('LED');
        code = appendLocal(code, indent + `Pin(${led}, Pin.OUT).value(0)\n`);
        break;
      }
      case 'pvb_if_switch': {
        const sw = block.getFieldValue('SW');
        code = appendLocal(code, indent + `if Pin(${sw}, Pin.IN, Pin.PULL_UP).value() == 0:\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }

      // ===== センサー =====
      case 'pvb_sonar': {
        const varName = getVarName(block, 'VAR');
        code = appendLocal(code, indent + `_trig = Pin(7, Pin.OUT); _echo = Pin(6, Pin.IN)\n`);
        code = appendLocal(code, indent + `_trig.value(0); utime.sleep_us(2)\n`);
        code = appendLocal(code, indent + `_trig.value(1); utime.sleep_us(10); _trig.value(0)\n`);
        code = appendLocal(code, indent + `while _echo.value() == 0: pass\n`);
        code = appendLocal(code, indent + `_t0 = utime.ticks_us()\n`);
        code = appendLocal(code, indent + `while _echo.value() == 1: pass\n`);
        code = appendLocal(code, indent + `${varName} = utime.ticks_diff(utime.ticks_us(), _t0) / 58\n`);
        break;
      }
      case 'pvb_if_obstacle': {
        code = appendLocal(code, indent + `_trig = Pin(7, Pin.OUT); _echo = Pin(6, Pin.IN)\n`);
        code = appendLocal(code, indent + `_trig.value(0); utime.sleep_us(2)\n`);
        code = appendLocal(code, indent + `_trig.value(1); utime.sleep_us(10); _trig.value(0)\n`);
        code = appendLocal(code, indent + `while _echo.value() == 0: pass\n`);
        code = appendLocal(code, indent + `_t0 = utime.ticks_us()\n`);
        code = appendLocal(code, indent + `while _echo.value() == 1: pass\n`);
        code = appendLocal(code, indent + `_dist_cm = utime.ticks_diff(utime.ticks_us(), _t0) / 58\n`);
        const lnObs = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'DIST', lnObs);
        const dist  = valueToCode(block, 'DIST', '20');
        code = appendLocal(code, indent + `if _dist_cm < ${dist}:\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }
      case 'pvb_line_read': {
        const sensor = block.getFieldValue('SENSOR');
        const varName = getVarName(block, 'VAR');
        code = appendLocal(code, indent + `${varName} = ADC(${sensor}).read_u16()\n`);
        break;
      }
      case 'pvb_if_line': {
        const sensor = block.getFieldValue('SENSOR');
        const color = block.getFieldValue('COLOR');
        const op = color === 'black' ? '>' : '<';
        code = appendLocal(code, indent + `if ADC(${sensor}).read_u16() ${op} 32767:\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }
      case 'pvb_print': {
        const varName = getVarName(block, 'VAR');
        code = appendLocal(code, indent + `print(${varName})\n`);
        break;
      }
      case 'pico_if': {
        const lnIf0 = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'IF0', lnIf0);
        const cond0 = valueToCode(block, 'IF0', 'True');
        code = appendLocal(code, indent + `if ${cond0}:\n`);
        const do0   = statementToCode(block, 'DO0', indent + '    ');
        code = appendChildBody(code, do0, indent + '    pass\n');
        for (let i = 1; block.getInput('IF' + i); i++) {
          const lnElif = _emitCtx.line;
          registerExprBlocksAtLineFromInput(block, 'IF' + i, lnElif);
          const condI = valueToCode(block, 'IF' + i, 'True');
          code = appendLocal(code, indent + `elif ${condI}:\n`);
          const doI   = statementToCode(block, 'DO' + i, indent + '    ');
          code = appendChildBody(code, doI, indent + '    pass\n');
        }
        if (block.getInput('ELSE')) {
          code = appendLocal(code, indent + `else:\n`);
          const doElse = statementToCode(block, 'ELSE', indent + '    ');
          code = appendChildBody(code, doElse, indent + '    pass\n');
        }
        break;
      }
      case 'var_set': {
        const v   = getVarName(block, 'VAR');
        const lnSet = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'VALUE', lnSet);
        const val = valueToCode(block, 'VALUE', '0');
        code = appendLocal(code, indent + `${v} = ${val}\n`);
        break;
      }
      case 'var_change': {
        const v   = getVarName(block, 'VAR');
        const lnChg = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'AMOUNT', lnChg);
        const amt = valueToCode(block, 'AMOUNT', '1');
        code = appendLocal(code, indent + `${v} += ${amt}\n`);
        break;
      }
      case 'pico_digital_read': {
        const pin = block.getFieldValue('PIN');
        const varName = getVarName(block, 'VAR');
        code = appendLocal(code, indent + `${varName} = Pin(${pin}, Pin.IN).value()\n`);
        break;
      }
      case 'pico_analog_read': {
        const pin = block.getFieldValue('PIN');
        const varName = getVarName(block, 'VAR');
        code = appendLocal(code, indent + `${varName} = ADC(${pin}).read_u16()\n`);
        break;
      }
      case 'val_var':
      case 'val_number':
      case 'val_str':
      case 'val_bool':
      case 'py_math_op':
      case 'py_str_concat':
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
      case 'py_list_empty':
      case 'py_list_get':
      case 'py_list_len':
      case 'py_random_int':
      case 'py_type_cast':
      case 'py_abs':
      case 'py_round':
      case 'py_call_val':
        break;
      case 'pico_for_range': {
        const v      = getVarName(block, 'VAR');
        const lnForN = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'N', lnForN);
        const n      = valueToCode(block, 'N', '10');
        code = appendLocal(code, indent + `for ${v} in range(${n}):\n`);
        const doCode = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, doCode, indent + '    pass\n');
        break;
      }
      case 'pico_for_from_to': {
        const v      = getVarName(block, 'VAR');
        const lnRange = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'START', lnRange);
        registerExprBlocksAtLineFromInput(block, 'STOP', lnRange);
        registerExprBlocksAtLineFromInput(block, 'STEP', lnRange);
        const start  = valueToCode(block, 'START', '0');
        const stop   = valueToCode(block, 'STOP', '10');
        const step   = valueToCode(block, 'STEP', '1');
        code = appendLocal(code, indent + `for ${v} in range(${start}, ${stop}, ${step}):\n`);
        const doCode = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, doCode, indent + '    pass\n');
        break;
      }
      case 'var_if_greater': {
        const v     = getVarName(block, 'VAR');
        const lnGt = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'THRESHOLD', lnGt);
        const thr   = valueToCode(block, 'THRESHOLD', '0');
        code = appendLocal(code, indent + `if ${v} > ${thr}:\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }
      case 'var_if_less': {
        const v     = getVarName(block, 'VAR');
        const lnLt = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'THRESHOLD', lnLt);
        const thr   = valueToCode(block, 'THRESHOLD', '0');
        code = appendLocal(code, indent + `if ${v} < ${thr}:\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }
      case 'print_text': {
        const text = JSON.stringify(block.getFieldValue('TEXT'));
        code = appendLocal(code, indent + `print(${text})\n`);
        break;
      }
      case 'print_var_label': {
        const label = JSON.stringify(block.getFieldValue('LABEL'));
        const varName = getVarName(block, 'VAR');
        const lnPvl = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'VAR', lnPvl);
        code = appendLocal(code, indent + `print(${label} + str(${varName}))\n`);
        break;
      }
      case 'print_separator': {
        code = appendLocal(code, indent + `print('----------------')\n`);
        break;
      }

      // ===== Python入門専用 =====
      case 'py_input': {
        const varName = getVarName(block, 'VAR');
        const prompt  = JSON.stringify(block.getFieldValue('PROMPT'));
        const type    = block.getFieldValue('TYPE');
        if (type === 'int') {
          code = appendLocal(code, indent + `${varName} = int(input(${prompt}))\n`);
        } else if (type === 'float') {
          code = appendLocal(code, indent + `${varName} = float(input(${prompt}))\n`);
        } else {
          code = appendLocal(code, indent + `${varName} = input(${prompt})\n`);
        }
        break;
      }
      case 'py_while': {
        const lnWhile = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'COND', lnWhile);
        const cond  = valueToCode(block, 'COND', 'True');
        code = appendLocal(code, indent + `while ${cond}:\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }
      case 'py_print': {
        const lnPrint = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'VALUE', lnPrint);
        const val = valueToCode(block, 'VALUE', '""');
        code = appendLocal(code, indent + `print(${val})\n`);
        break;
      }

      // ===== リスト =====
      case 'py_list_append': {
        const listName = getVarName(block, 'LIST');
        const lnApp = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'VALUE', lnApp);
        const val = valueToCode(block, 'VALUE', 'None');
        code = appendLocal(code, indent + `${listName}.append(${val})\n`);
        break;
      }
      case 'py_list_set': {
        const listName = getVarName(block, 'LIST');
        const lnIdx = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'INDEX', lnIdx);
        registerExprBlocksAtLineFromInput(block, 'VALUE', lnIdx);
        const idx = valueToCode(block, 'INDEX', '0');
        const val = valueToCode(block, 'VALUE', 'None');
        code = appendLocal(code, indent + `${listName}[${idx}] = ${val}\n`);
        break;
      }
      case 'py_for_list': {
        const itemVar  = getVarName(block, 'VAR');
        const listName = getVarName(block, 'LIST');
        code = appendLocal(code, indent + `for ${itemVar} in ${listName}:\n`);
        const inner = statementToCode(block, 'DO', indent + '    ');
        code = appendChildBody(code, inner, indent + '    pass\n');
        break;
      }

      // ===== ループ制御 =====
      case 'py_break':
        code = appendLocal(code, indent + `break\n`);
        break;
      case 'py_continue':
        code = appendLocal(code, indent + `continue\n`);
        break;

      // ===== 関数 =====
      case 'py_def_noarg': {
        const name = block.getFieldValue('NAME');
        code = appendLocal(code, indent + `def ${name}():\n`);
        const body = statementToCode(block, 'BODY', indent + '    ');
        code = appendChildBody(code, body, indent + '    pass\n');
        break;
      }
      case 'py_def': {
        const name  = block.getFieldValue('NAME');
        const param = getVarName(block, 'PARAM');
        code = appendLocal(code, indent + `def ${name}(${param}):\n`);
        const body = statementToCode(block, 'BODY', indent + '    ');
        code = appendChildBody(code, body, indent + '    pass\n');
        break;
      }
      case 'py_def_args2': {
        const name = block.getFieldValue('NAME');
        const p1   = block.getFieldValue('PARAM1');
        const p2   = block.getFieldValue('PARAM2');
        code = appendLocal(code, indent + `def ${name}(${p1}, ${p2}):\n`);
        const body = statementToCode(block, 'BODY', indent + '    ');
        code = appendChildBody(code, body, indent + '    pass\n');
        break;
      }
      case 'py_def_args3': {
        const name = block.getFieldValue('NAME');
        const p1   = block.getFieldValue('PARAM1');
        const p2   = block.getFieldValue('PARAM2');
        const p3   = block.getFieldValue('PARAM3');
        code = appendLocal(code, indent + `def ${name}(${p1}, ${p2}, ${p3}):\n`);
        const body = statementToCode(block, 'BODY', indent + '    ');
        code = appendChildBody(code, body, indent + '    pass\n');
        break;
      }
      case 'py_return': {
        const lnRet = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'VALUE', lnRet);
        const retVal = valueToCode(block, 'VALUE', 'None');
        code = appendLocal(code, indent + `return ${retVal}\n`);
        break;
      }
      case 'py_call_stmt': {
        const name = block.getFieldValue('NAME');
        const lnCall = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'ARG', lnCall);
        const arg = valueToCode(block, 'ARG', '');
        code = appendLocal(code, indent + `${name}(${arg})\n`);
        break;
      }
      case 'py_module_call_stmt': {
        const mod    = block.getFieldValue('MODULE');
        const func   = block.getFieldValue('FUNC');
        const lnMod  = _emitCtx.line;
        registerExprBlocksAtLineFromInput(block, 'ARG', lnMod);
        const arg    = valueToCode(block, 'ARG', '');
        const call   = (!mod || mod === '__none__') ? `${func}(${arg})` : `${mod}.${func}(${arg})`;
        code = appendLocal(code, indent + call + '\n');
        break;
      }

      default:
        code = appendLocal(code, indent + `pass  # 未対応ブロック: ${block.type}\n`);
    }

    if (indent === '') {
      code = appendLocal(code, '\n');
    }

    blockLineMap.set(block.id, {
      from: blockOwnFrom,
      to: Math.max(blockOwnFrom, _emitCtx.line - 1)
    });

    const next = block.getNextBlock ? block.getNextBlock() : null;
    if (next) {
      code += blockToCode(next, indent);
    }

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

    let header;

    const cm = showComments ? '' : '# ';  // コメントOFF時はimport行を # で無効化

    if (currentMode === 'python') {
      // ─── Python入門モード：使用ブロックに応じてimportを挿入 ───
      const needsTime   = blockTypes.has('pico_wait');
      const needsRandom = blockTypes.has('py_random_int');
      const importLines = [];
      if (needsTime)   importLines.push((showComments ? '# 時間待機（time.sleep）用\n' : '') + `${cm}import time`);
      if (needsRandom) importLines.push((showComments ? '# 乱数生成（random.randint）用\n' : '') + `${cm}import random`);
      // 自作モジュール呼び出しブロックで使われているモジュールを収集してimport
      const usedModules = new Set();
      allBlocks.forEach(function(b) {
        if (b.type === 'py_module_call_stmt' || b.type === 'py_module_call_val') {
          const mod = b.getFieldValue('MODULE');
          if (mod && mod !== '__none__') usedModules.add(mod);
        }
      });
      usedModules.forEach(function(mod) {
        importLines.push((showComments ? `# 自作モジュール ${mod} をインポート\n` : '') + `${cm}import ${mod}`);
      });
      header = importLines.length ? importLines.join('\n') + '\n\n' : '';
    } else {
      // ─── MicroPythonモード：既存ロジック ───
      const motorTypes = ['pvb_forward','pvb_backward','pvb_turn_right','pvb_turn_left','pvb_stop'];
      const hasMotor   = motorTypes.some(t => blockTypes.has(t));
      const hasSonarVal = blockTypes.has('pvb_sonar_val');

      const baseHeader =
        (showComments ? '# Picoのピン・PWM・ADC制御用\n' : '') + `${cm}from machine import Pin, PWM, ADC\n` +
        (showComments ? '# 時間待機用（MicroPython版 time モジュール）\n' : '') + `${cm}import utime\n\n`;
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

      header = baseHeader;
      if (hasMotor)    header += motorInit;
      if (hasSonarVal) header += sonarHelper;
    }

    const isMain = activeFileIdx === 0;

    blockLineMap.clear();
    _emitCtx.line = isMain ? (header.match(/\n/g) || []).length : 0;
    let code = '';
    const topBlocks = workspace.getTopBlocks(true);
    for (const block of topBlocks) {
      code += blockToCode(block, '');
    }
    // サブファイル（モジュール）はheaderなし・空でもプレースホルダーなし
    const generated = isMain
      ? header + (code || '# ブロックを追加してください')
      : (code || '');
    pyFiles[activeFileIdx].content = generated;
    if (!codingMode) {
      editor.setValue(generated);
    }

    // コーディングモードではエディタとブロック由来の行が一致しないため選択ハイライトしない
    if (!codingMode) {
      refreshBlockSelectionHighlight();
    } else {
      clearBlockSelectionHighlight();
    }

    // チュートリアル自動チェック（Tutorial代入済みの場合のみ）
    if (Tutorial) Tutorial.check(blockTypes);
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
    // VIEWPORT_CHANGE / BLOCK_DRAG開始はコード変化なしのためスキップ
    if (e.type === Blockly.Events.VIEWPORT_CHANGE) return;
    if (e.type === Blockly.Events.BLOCK_DRAG && e.isStart) return;
    // 選択のみが変わったときはコード内容は変わらないので再生成しない
    if (e.type === Blockly.Events.SELECTED) return;
    // ブロックを変更したらエラーハイライトをクリア
    clearErrorHighlights();
    generateCode();
  });

  workspace.addChangeListener(function(e) {
    if (e.type !== Blockly.Events.SELECTED) return;
    if (codingMode) {
      clearBlockSelectionHighlight();
      return;
    }
    let id = (e.newElementId != null && e.newElementId !== '') ? e.newElementId : null;
    if (!id) id = getSelectedBlockId();
    paintBlockSelectionHighlight(id);
  });

  generateCode();

  // ===== テーマ切替（黒/白） =====
  const THEMES = [
    { id: 'dark',  label: '黒',  cmTheme: 'dracula', blocklyTheme: pcbTheme   },
    { id: 'light', label: '白',  cmTheme: 'default', blocklyTheme: lightTheme },
  ];
  let currentTheme = localStorage.getItem('pyco-theme') || 'dark';

  function applyTheme(themeId) {
    currentTheme = themeId;
    const t = THEMES.find(function(t) { return t.id === themeId; }) || THEMES[0];
    document.documentElement.setAttribute('data-theme', themeId === 'dark' ? '' : themeId);
    document.getElementById('btn-theme').textContent = t.label;
    editor.setOption('theme', t.cmTheme);
    workspace.setTheme(t.blocklyTheme);
    localStorage.setItem('pyco-theme', themeId);
  }

  document.getElementById('btn-theme').addEventListener('click', function() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // ===== コードエリア フォントサイズ =====
  const FONT_SIZES = [10, 11, 12, 13, 14, 16, 18, 20, 24];
  const FONT_DEFAULT = 13;
  let currentFontSize = parseInt(localStorage.getItem('pyco-font-size'), 10) || FONT_DEFAULT;

  function applyFontSize(size) {
    currentFontSize = size;
    editor.getWrapperElement().style.fontSize = size + 'px';
    editor.refresh();
    document.getElementById('monitor-output').style.fontSize = size + 'px';
    localStorage.setItem('pyco-font-size', size);
  }

  document.getElementById('btn-font-inc').addEventListener('click', function() {
    const idx = FONT_SIZES.indexOf(currentFontSize);
    if (idx < FONT_SIZES.length - 1) applyFontSize(FONT_SIZES[idx + 1]);
  });

  document.getElementById('btn-font-dec').addEventListener('click', function() {
    const idx = FONT_SIZES.indexOf(currentFontSize);
    if (idx > 0) applyFontSize(FONT_SIZES[idx - 1]);
  });

  applyTheme(currentTheme);
  applyFontSize(currentFontSize);

  const btnComments = document.getElementById('btn-toggle-comments');
  btnComments.addEventListener('click', function() {
    showComments = !showComments;
    btnComments.textContent = showComments ? '# ON' : '# OFF';
    btnComments.classList.toggle('comments-off', !showComments);
    generateCode();
  });

  // ===== 構文リファレンス データ =====
  const SYNTAX_REF = {
    python: [
      {
        cat: '変数',
        items: [
          { label: '代入',      code: 'x = 10' },
          { label: '文字列',    code: 'x = "hello"' },
          { label: '演算代入',  code: 'x += 1' },
        ]
      },
      {
        cat: '表示',
        items: [
          { label: 'print',     code: 'print(x)' },
          { label: '文字列+変数', code: 'print("x=", x)' },
        ]
      },
      {
        cat: '入力',
        items: [
          { label: 'input',     code: 'x = input("名前: ")' },
          { label: 'int変換',   code: 'n = int(input())' },
        ]
      },
      {
        cat: '繰り返し',
        items: [
          { label: 'for range',    code: 'for i in range(10):\n    ...' },
          { label: 'for start→stop', code: 'for i in range(1,11):\n    ...' },
          { label: 'for リスト',   code: 'for x in my_list:\n    ...' },
          { label: 'while',        code: 'while 条件:\n    ...' },
          { label: 'break',        code: 'break' },
          { label: 'continue',     code: 'continue' },
        ]
      },
      {
        cat: '分岐',
        items: [
          { label: 'if',        code: 'if 条件:\n    ...' },
          { label: 'if/else',   code: 'if 条件:\n    ...\nelse:\n    ...' },
          { label: 'elif',      code: 'elif 条件:\n    ...' },
        ]
      },
      {
        cat: '比較・論理',
        items: [
          { label: '比較',      code: 'x == y  x != y\nx > y   x <= y' },
          { label: 'and/or',   code: 'x > 0 and x < 10\nx == 1 or x == 2' },
          { label: 'not',       code: 'not 条件' },
        ]
      },
      {
        cat: '計算',
        items: [
          { label: '四則',      code: 'x + y  x - y\nx * y  x / y' },
          { label: '整数除算',  code: 'x // y' },
          { label: '余り',      code: 'x % y' },
          { label: '型変換',    code: 'int(x)  float(x)  str(x)' },
          { label: '絶対値',    code: 'abs(x)' },
          { label: '四捨五入',  code: 'round(x, 2)' },
          { label: '乱数',      code: 'import random\nrandom.randint(1, 10)' },
        ]
      },
      {
        cat: 'リスト',
        items: [
          { label: '作成',      code: 'my_list = []' },
          { label: '追加',      code: 'my_list.append(x)' },
          { label: '取得',      code: 'x = my_list[0]' },
          { label: '変更',      code: 'my_list[0] = x' },
          { label: '長さ',      code: 'len(my_list)' },
          { label: '初期値あり', code: 'my_list = [1, 2, 3]' },
        ]
      },
      {
        cat: '関数',
        items: [
          { label: '定義（引数なし）', code: 'def my_func():\n    ...' },
          { label: '定義（引数あり）', code: 'def my_func(x):\n    ...' },
          { label: 'return',           code: 'return 値' },
          { label: '呼び出し',         code: 'my_func()\nmy_func(引数)' },
          { label: '戻り値を使う',     code: 'result = my_func(x)' },
        ]
      },
    ],
    micropython: [
      {
        cat: 'セットアップ',
        items: [
          { label: 'import',    code: 'from machine import Pin\nimport utime' },
          { label: 'LED出力',   code: 'led = Pin(25, Pin.OUT)' },
          { label: 'ピン入力',  code: 'btn = Pin(14, Pin.IN,\n         Pin.PULL_UP)' },
        ]
      },
      {
        cat: '出力',
        items: [
          { label: 'HIGH',      code: 'led.value(1)' },
          { label: 'LOW',       code: 'led.value(0)' },
          { label: 'トグル',   code: 'led.toggle()' },
        ]
      },
      {
        cat: '入力',
        items: [
          { label: 'デジタル読み', code: 'v = btn.value()' },
          { label: 'アナログ読み', code: 'from machine import ADC\nadc = ADC(26)\nv = adc.read_u16()' },
        ]
      },
      {
        cat: '時間',
        items: [
          { label: '待機(秒)',  code: 'utime.sleep(1)' },
          { label: '待機(ms)', code: 'utime.sleep_ms(500)' },
        ]
      },
      {
        cat: '繰り返し',
        items: [
          { label: '無限ループ', code: 'while True:\n    ...' },
          { label: 'for',       code: 'for i in range(10):\n    ...' },
        ]
      },
      {
        cat: '分岐',
        items: [
          { label: 'if',        code: 'if 条件:\n    ...' },
          { label: 'if/else',   code: 'if 条件:\n    ...\nelse:\n    ...' },
        ]
      },
      {
        cat: 'PoliviaBot',
        items: [
          { label: '前進',      code: 'forward(speed)' },
          { label: '後退',      code: 'backward(speed)' },
          { label: '右折/左折', code: 'turn_right(s)\nturn_left(s)' },
          { label: '停止',      code: 'stop()' },
          { label: '超音波',    code: 'dist = sonar()' },
        ]
      },
    ]
  };

  function buildSyntaxPanel(mode) {
    const data = SYNTAX_REF[mode] || SYNTAX_REF.python;
    const container = document.getElementById('syntax-content');
    document.getElementById('syntax-mode-label').textContent =
      mode === 'micropython' ? 'MicroPython' : 'Python入門';
    if (!container) return;
    container.replaceChildren();

    data.forEach(function(cat) {
      const catEl = document.createElement('div');
      catEl.className = 'syn-cat';

      const titleEl = document.createElement('div');
      titleEl.className = 'syn-cat-title';
      titleEl.textContent = cat.cat;
      catEl.appendChild(titleEl);

      cat.items.forEach(function(item) {
        const itemEl = document.createElement('div');
        itemEl.className = 'syn-item';
        itemEl.dataset.code = item.code;
        itemEl.title = 'クリックで挿入';

        const labelEl = document.createElement('span');
        labelEl.className = 'syn-label';
        labelEl.textContent = item.label;
        itemEl.appendChild(labelEl);

        const codeEl = document.createElement('code');
        const lines = String(item.code || '').split('\n');
        lines.forEach(function(line, i) {
          if (i > 0) codeEl.appendChild(document.createElement('br'));
          codeEl.appendChild(document.createTextNode(line));
        });
        itemEl.appendChild(codeEl);

        catEl.appendChild(itemEl);
      });

      container.appendChild(catEl);
    });
  }

  // 構文パネルのクリックでエディタに挿入
  document.getElementById('syntax-content').addEventListener('click', function(e) {
    const item = e.target.closest('.syn-item');
    if (!item) return;
    const code = item.dataset.code;
    if (!code) return;
    editor.replaceSelection(code);
    editor.focus();
    // 挿入フラッシュ演出
    item.classList.add('syn-item--inserted');
    setTimeout(function() { item.classList.remove('syn-item--inserted'); }, 400);
  });

  const btnCodingMode = document.getElementById('btn-coding-mode');
  btnCodingMode.addEventListener('click', function() {
    codingMode = !codingMode;
    // main.py はブロックモード時 readonly、サブファイルは常に編集可
    editor.setOption('readOnly', activeFileIdx === 0 ? !codingMode : false);
    btnCodingMode.textContent = codingMode ? 'ブロック' : 'コード編集';
    btnCodingMode.classList.toggle('coding-active', codingMode);
    document.querySelector('.main').classList.toggle('coding-mode', codingMode);
    if (codingMode) {
      buildSyntaxPanel(currentMode);
      setTimeout(function() { editor.refresh(); }, 30);
    } else {
      generateCode();
      setTimeout(function() { Blockly.svgResize(workspace); }, 50);
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
    saveCurrentFile();
    const activeFile = pyFiles[activeFileIdx];
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = currentMode === 'python' ? activeFile.name : 'main.py';
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
      if (currentMode === 'python') {
        // Python入門モード: ファイル名でタブを検索、なければ追加
        let idx = pyFiles.findIndex(function(f) { return f.name === file.name; });
        if (idx === -1) {
          pyFiles.push({ name: file.name, content: ev.target.result });
          idx = pyFiles.length - 1;
        } else {
          pyFiles[idx].content = ev.target.result;
        }
        switchFile(idx);
      } else {
        fileMode = true;
        editor.setValue(ev.target.result);
        document.getElementById('serial-status').textContent = file.name + ' を読み込みました';
        document.getElementById('serial-status').className = 'serial-status serial-status--ok';
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // ===== Web Serial 対応チェック =====
  const hasSerial = 'serial' in navigator;

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

  // ===== モード切替 =====

  // モードを切り替える（clearWorkspace=trueのときワークスペースをクリア）
  function applyMode(mode, clearWorkspace) {
    currentMode = mode;
    if (clearWorkspace) workspace.clear();

    // モードボタン
    document.getElementById('btn-mode-python').classList.toggle('mode-btn--active', mode === 'python');
    document.getElementById('btn-mode-micropython').classList.toggle('mode-btn--active', mode === 'micropython');

    // ツールボックス切り替え
    workspace.updateToolbox(document.getElementById('toolbox-' + mode));

    // ラベル更新
    document.getElementById('title-sub').textContent =
      mode === 'python' ? 'Python 入門' : 'Raspberry Pi Pico / MicroPython';
    document.getElementById('code-header-title').textContent =
      mode === 'python' ? 'Python Output' : 'MicroPython Output';
    const tutLabel = document.getElementById('tut-mode-label');
    if (tutLabel) tutLabel.textContent = mode === 'python' ? 'Python入門' : 'MicroPython';

    // シリアル関連ボタン（MicroPython && Web Serial対応のみ表示）
    const showSerial = mode === 'micropython' && hasSerial;
    ['serial-sep', 'btn-connect', 'btn-run', 'btn-stop', 'btn-write'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = showSerial ? '' : 'none';
    });

    // DEMOバッジ（MicroPythonモードでWeb Serial非対応のみ表示）
    const demoBadge = document.getElementById('demo-badge');
    if (demoBadge) demoBadge.style.display = (mode === 'micropython' && !hasSerial) ? '' : 'none';

    // Python シェル UI の切り替え
    const btnRunPy  = document.getElementById('btn-run-python');
    const runPySep  = document.getElementById('run-py-sep');
    const monTitle  = document.getElementById('monitor-header-title');
    const monOut    = document.getElementById('monitor-output');
    if (mode === 'python') {
      if (btnRunPy) btnRunPy.style.display = '';
      if (runPySep) runPySep.style.display = '';
      if (monTitle) monTitle.textContent = 'Python シェル';
      if (monOut)   { monOut.innerHTML = ''; monOut.classList.add('python-shell'); }
    } else {
      if (btnRunPy) btnRunPy.style.display = 'none';
      if (runPySep) runPySep.style.display = 'none';
      if (monTitle) monTitle.textContent = 'シリアルモニタ';
      if (monOut)   { monOut.innerHTML = ''; monOut.classList.remove('python-shell'); }
    }

    // チュートリアルリセット
    Tutorial.resetForMode();

    // ファイルタブバー表示切り替え（Python入門モードのみ）
    const fileTabs = document.getElementById('file-tabs');
    if (fileTabs) {
      fileTabs.style.display = mode === 'python' ? '' : 'none';
      if (mode === 'python') renderFileTabs();
    }

    // コード再生成
    generateCode();

    // コーディングモード中はモード変更時に構文パネルも更新
    if (codingMode) {
      buildSyntaxPanel(mode);
    }

  }

  // モードボタンのイベント
  document.getElementById('btn-mode-python').addEventListener('click', function() {
    if (currentMode === 'python') return;
    const hasBlocks = workspace.getAllBlocks(false).length > 0;
    if (hasBlocks && !confirm('Python入門モードに切り替えます。\nワークスペースのブロックがクリアされます。よろしいですか？')) return;
    applyMode('python', true);
  });

  document.getElementById('btn-mode-micropython').addEventListener('click', function() {
    if (currentMode === 'micropython') return;
    const hasBlocks = workspace.getAllBlocks(false).length > 0;
    if (hasBlocks && !confirm('MicroPythonモードに切り替えます。\nワークスペースのブロックがクリアされます。よろしいですか？')) return;
    applyMode('micropython', true);
  });

  // ===== Python シェル実行（Skulpt） =====

  let _pyStopRequested = false;

  function skulptRead(x) {
    // pyFiles から検索（'./foo.py' 形式にも対応）
    const bare = x.replace(/^\.\//, '');
    const found = pyFiles.find(function(f) { return f.name === bare; });
    if (found) return found.content;
    // Skulpt 組み込みにフォールバック
    if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) {
      throw "File not found: '" + x + "'";
    }
    return Sk.builtinFiles['files'][x];
  }

  function setPythonRunning(running) {
    const btnRun  = document.getElementById('btn-run-python');
    const btnStop = document.getElementById('btn-stop-python');
    btnRun.disabled    = running;
    btnRun.textContent = running ? '実行中…' : '▶ 実行';
    btnStop.style.display = running ? '' : 'none';
  }

  function runPython() {
    if (typeof Sk === 'undefined') {
      appendShellText('[エラー] Skulptが読み込まれていません。ネットワーク接続を確認してください。\n', true);
      return;
    }

    saveCurrentFile();
    const mainFile = pyFiles.find(function(f) { return f.name === 'main.py'; });
    const code   = mainFile ? mainFile.content : editor.getValue();
    const monOut = document.getElementById('monitor-output');

    monOut.innerHTML = '';
    appendShellText('>>> 実行開始\n', false, 'py-prompt');

    _pyStopRequested = false;
    clearErrorHighlights();
    setPythonRunning(true);

    Sk.configure({
      output: function(text) {
        appendShellText(text);
        monOut.scrollTop = monOut.scrollHeight;
      },
      read: skulptRead,
      inputfun: function(prompt) {
        const answer = window.prompt(prompt || '');
        appendShellText((prompt || '') + (answer !== null ? answer : '') + '\n', false, 'py-prompt');
        return answer !== null ? answer : '';
      },
      inputfunTakesPrompt: true,
      yieldLimit: 200,   // 200ステップごとにブラウザへ制御を返す（停止ボタン応答に必要）
      __future__: Sk.python3,
    });

    Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody('<stdin>', false, code, true);
    }, {
      '*': function() {
        if (_pyStopRequested) {
          throw new Sk.builtin.SystemExit('停止');
        }
      }
    }).then(function() {
      appendShellText('>>> 完了\n', false, 'py-prompt');
    }).catch(function(err) {
      if (_pyStopRequested) {
        appendShellText('>>> 停止しました\n', false, 'py-prompt');
        return;
      }
      const parsed = parseSkulptError(err);
      // シェルにエラー表示
      appendShellText('\n' + parsed.title + '\n', true);
      // ブロックハイライト（コーディングモードでなく blockLineMap がある場合のみ）
      if (!codingMode && blockLineMap.size > 0) {
        const bid = parsed.lineno ? blockIdAtLine(parsed.lineno) : null;
        showErrorOnBlock(bid, parsed.title, parsed.detail);
      }
    }).finally(function() {
      setPythonRunning(false);
      monOut.scrollTop = monOut.scrollHeight;
    });
  }

  function appendShellText(text, isError, cls) {
    const monOut = document.getElementById('monitor-output');
    const span   = document.createElement('span');
    if (isError) {
      span.className = 'py-error';
    } else if (cls) {
      span.className = cls;
    }
    span.textContent = text;
    monOut.appendChild(span);
  }

  // ===== エラーハイライト =====

  // blockLineMap（0始まり行番号）から最も近いブロックIDを返す
  function blockIdAtLine(lineNo1) {
    const lineNo0 = lineNo1 - 1; // Skulptは1始まり → 0始まりに変換
    let bestId = null, bestDist = Infinity;
    blockLineMap.forEach(function(range, id) {
      const dist = lineNo0 >= range.from && lineNo0 <= range.to
        ? 0
        : Math.min(Math.abs(lineNo0 - range.from), Math.abs(lineNo0 - range.to));
      if (dist < bestDist) { bestDist = dist; bestId = id; }
    });
    return bestId;
  }

  function clearErrorHighlights() {
    workspace.getAllBlocks(false).forEach(function(b) {
      b.getSvgRoot().classList.remove('block-error-highlight');
    });
    const panel = document.getElementById('error-hint');
    if (panel) panel.style.display = 'none';
  }

  function showErrorOnBlock(blockId, title, detail) {
    clearErrorHighlights();
    const block = blockId ? workspace.getBlockById(blockId) : null;
    if (block) {
      block.getSvgRoot().classList.add('block-error-highlight');
      // エラーブロックが見えるようにスクロール
      block.select();
    }
    const panel = document.getElementById('error-hint');
    if (!panel) return;
    document.getElementById('error-hint-title').textContent = title;
    document.getElementById('error-hint-body').textContent = detail;
    panel.style.display = 'block';
  }

  // Skulptエラーを解析して { lineno, title, detail } を返す
  function parseSkulptError(err) {
    const tp = err.tp$name || '';
    let rawMsg = '';
    try { rawMsg = err.args.v[0].v; } catch (e) { rawMsg = err.toString ? err.toString() : String(err); }

    // 行番号取得（tracebackの最後のフレーム）
    let lineno = null;
    if (err.traceback && err.traceback.length > 0) {
      lineno = err.traceback[err.traceback.length - 1].lineno;
    }

    // エラー種別ごとの日本語タイトル＋解説
    let title = tp ? tp + ': ' + rawMsg : rawMsg;
    let detail = '';

    if (tp === 'NameError') {
      const m = rawMsg.match(/name '(.+?)' is not defined/);
      const name = m ? `「${m[1]}」` : '変数・関数名';
      title = `NameError — ${name} が見つかりません`;
      detail = `${name} はまだ定義されていません。\n・スペルミスがないか確認してください\n・変数を使う前に「変数に入れる」ブロックで値をセットしてください\n・関数を使う前に「関数を定義する」ブロックが必要です`;
    } else if (tp === 'TypeError') {
      title = `TypeError — データの型が合っていません`;
      if (rawMsg.includes('unsupported operand') || rawMsg.includes('can only concatenate')) {
        detail = `文字列と数値を足し算しようとしています。\n・数値に変換するには「型変換（int/float）」ブロックを使ってください\n・文字列として結合するには「文字列に変換（str）」してから「文字列連結」ブロックを使ってください`;
      } else if (rawMsg.includes('takes') && rawMsg.includes('argument')) {
        detail = `関数に渡す引数の数が間違っています。\n・関数定義の引数の数と、呼び出し時の引数の数を合わせてください`;
      } else {
        detail = `型（文字列・数値・リストなど）が合っていない操作をしています。\n原因: ${rawMsg}`;
      }
    } else if (tp === 'ZeroDivisionError') {
      title = `ZeroDivisionError — 0 で割っています`;
      detail = `割り算の右側（割る数）が 0 になっています。\n0 では割れないので、割る数が 0 にならないか確認してください。`;
    } else if (tp === 'IndexError') {
      title = `IndexError — リストの番号が範囲外です`;
      detail = `リストに存在しない番号（インデックス）にアクセスしています。\n・リストの長さを「リストの長さ」ブロックで確認してください\n・番号は 0 から始まります（1番目 = 0、2番目 = 1…）`;
    } else if (tp === 'AttributeError') {
      title = `AttributeError — 存在しない機能を呼び出しています`;
      detail = `その変数・オブジェクトには、その機能（メソッド）がありません。\n原因: ${rawMsg}`;
    } else if (tp === 'ValueError') {
      title = `ValueError — 値の形式が正しくありません`;
      if (rawMsg.includes('invalid literal') && rawMsg.includes('int')) {
        detail = `文字列を整数（int）に変換しようとしましたが、数字以外の文字が含まれています。\n・入力した文字列が「123」のような数字だけかどうか確認してください`;
      } else {
        detail = `値の形式が正しくありません。\n原因: ${rawMsg}`;
      }
    } else if (tp === 'IndentationError' || tp === 'SyntaxError') {
      title = `${tp} — コードの形式エラー（ブロックモードでは通常発生しません）`;
      detail = `コーディングモードで直接書いたコードに問題があります。\n原因: ${rawMsg}`;
    } else if (rawMsg.includes('execLimit') || rawMsg.includes('Execution exceeded')) {
      title = `TimeLimitError — 実行ステップ数の上限を超えました`;
      detail = `ループが終わらずに繰り返し続けている可能性があります。\n・「ずっと繰り返す（while True）」の中に終了条件があるか確認してください\n・繰り返し回数が多すぎないか確認してください`;
      lineno = null; // 特定行なし
    } else {
      detail = rawMsg;
    }

    return { lineno: lineno, title: title, detail: detail };
  }

  document.getElementById('error-hint-close').addEventListener('click', clearErrorHighlights);

  document.getElementById('btn-run-python').addEventListener('click', runPython);
  document.getElementById('btn-stop-python').addEventListener('click', function() {
    _pyStopRequested = true;
  });

  // ===== チュートリアルマネージャー =====
  function setSafeRichText(targetEl, html) {
    if (!targetEl) return;
    const raw = (html == null) ? '' : String(html);
    if (!raw) {
      targetEl.replaceChildren();
      return;
    }

    // Tiny sanitizer: allow basic formatting only, strip all attributes.
    const allowed = new Set(['P', 'BR', 'B', 'STRONG', 'I', 'EM', 'CODE', 'PRE', 'UL', 'OL', 'LI', 'SPAN']);
    const parser = new DOMParser();
    const doc = parser.parseFromString('<div>' + raw + '</div>', 'text/html');
    const root = doc.body && doc.body.firstElementChild;
    if (!root) {
      targetEl.textContent = raw;
      return;
    }

    function cloneNodeSafe(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return document.createTextNode(node.textContent || '');
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return null;

      const tag = node.tagName;
      if (!allowed.has(tag)) {
        // Keep text content of disallowed elements (e.g., script/style/a/img).
        return document.createTextNode(node.textContent || '');
      }

      const el = document.createElement(tag.toLowerCase());
      for (const child of Array.from(node.childNodes)) {
        const safeChild = cloneNodeSafe(child);
        if (safeChild) el.appendChild(safeChild);
      }
      return el;
    }

    const frag = document.createDocumentFragment();
    for (const child of Array.from(root.childNodes)) {
      const safe = cloneNodeSafe(child);
      if (safe) frag.appendChild(safe);
    }
    targetEl.replaceChildren(frag);
  }

  Tutorial = {
    currentStep: 0,
    isOpen: false,

    init() {
      document.getElementById('btn-tutorial').addEventListener('click', () => {
        if (this.isOpen) this.close(); else this.open();
      });
      document.getElementById('tut-close').addEventListener('click', () => this.close());
      document.getElementById('tut-hint-toggle').addEventListener('click', () => {
        const hint = document.getElementById('tut-hint');
        const btn  = document.getElementById('tut-hint-toggle');
        const shown = hint.style.display !== 'none';
        hint.style.display = shown ? 'none' : 'block';
        btn.textContent    = shown ? '💡 ヒントを見る' : '💡 ヒントを隠す';
      });
      document.getElementById('tut-prev').addEventListener('click', () => this.prev());
      document.getElementById('tut-next').addEventListener('click', () => this.next());
    },

    open() {
      this.isOpen = true;
      document.getElementById('tutorial-panel').classList.add('tutorial-panel--open');
      document.getElementById('btn-tutorial').classList.add('tutorial-active');
      this.render();
      // Blocklyのリサイズを通知
      setTimeout(() => Blockly.svgResize(workspace), 310);
    },

    close() {
      this.isOpen = false;
      document.getElementById('tutorial-panel').classList.remove('tutorial-panel--open');
      document.getElementById('btn-tutorial').classList.remove('tutorial-active');
      setTimeout(() => Blockly.svgResize(workspace), 310);
    },

    steps() {
      return (typeof TUTORIALS !== 'undefined' && TUTORIALS[currentMode]) || [];
    },

    resetForMode() {
      this.currentStep = 0;
      if (this.isOpen) this.render();
    },

    render() {
      const steps = this.steps();
      if (!steps.length) return;
      const idx   = Math.min(this.currentStep, steps.length - 1);
      const step  = steps[idx];
      const total = steps.length;

      document.getElementById('tut-title').textContent    = step.title;
      setSafeRichText(document.getElementById('tut-body'), step.body);
      setSafeRichText(document.getElementById('tut-hint'), step.hint);
      document.getElementById('tut-hint').style.display  = 'none';
      document.getElementById('tut-hint-toggle').textContent = '💡 ヒントを見る';
      document.getElementById('tut-progress').textContent = `${idx + 1} / ${total}`;
      document.getElementById('tut-pbar-fill').style.width = `${(idx + 1) / total * 100}%`;

      document.getElementById('tut-prev').disabled = (idx === 0);
      const nextBtn = document.getElementById('tut-next');
      nextBtn.disabled    = true;
      nextBtn.textContent = (idx === total - 1) ? '完了 ✓' : '次へ ▶';

      const checkEl = document.getElementById('tut-check');
      checkEl.textContent = '○ 待機中';
      checkEl.className   = 'tut-check';

      // 現在のワークスペース状態で即時チェック
      const blockTypes = new Set(workspace.getAllBlocks(false).map(b => b.type));
      this._applyCheck(step, blockTypes);
    },

    check(blockTypes) {
      if (!this.isOpen) return;
      const steps = this.steps();
      if (!steps.length) return;
      this._applyCheck(steps[this.currentStep], blockTypes);
    },

    _applyCheck(step, blockTypes) {
      const passed  = step.check(blockTypes);
      const checkEl = document.getElementById('tut-check');
      const nextBtn = document.getElementById('tut-next');
      if (passed) {
        checkEl.textContent = '✓ クリア！';
        checkEl.className   = 'tut-check tut-check--done';
        nextBtn.disabled    = false;
      } else {
        checkEl.textContent = '○ 待機中';
        checkEl.className   = 'tut-check';
        nextBtn.disabled    = true;
      }
    },

    next() {
      const steps = this.steps();
      if (this.currentStep < steps.length - 1) {
        this.currentStep++;
        this.render();
      } else {
        this.close();
      }
    },

    prev() {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.render();
      }
    },
  };

  // ===== リサイズ機能 =====

  // 左右 / 上下リサイズ（ブロックエリア ↔ コードパネル）
  // ≤900px の縦積みレイアウト時は clientY で高さリサイズに自動切替
  (function() {
    const divider    = document.querySelector('.divider');
    const blocklyDiv = document.getElementById('blockly-div');
    const codePanel  = document.querySelector('.code-panel');
    const mainEl     = document.querySelector('.main');
    let dragging = false;
    let startX = 0, startY = 0, startW = 0, startH = 0;

    function isColumnMode() {
      return window.innerWidth <= 900;
    }

    function startDrag(clientX, clientY) {
      dragging = true;
      divider.classList.add('dragging');
      document.body.style.userSelect = 'none';
      if (isColumnMode()) {
        startY = clientY;
        startH = blocklyDiv.getBoundingClientRect().height;
        document.body.style.cursor = 'row-resize';
      } else {
        startX = clientX;
        startW = blocklyDiv.getBoundingClientRect().width;
        document.body.style.cursor = 'col-resize';
      }
    }

    function onMove(clientX, clientY) {
      if (!dragging) return;
      if (isColumnMode()) {
        const mainH = mainEl.getBoundingClientRect().height;
        const divH  = divider.getBoundingClientRect().height;
        const newH  = Math.max(100, Math.min(mainH - divH - 100, startH + (clientY - startY)));
        blocklyDiv.style.height = newH + 'px';
        blocklyDiv.style.flex   = 'none';
        codePanel.style.flex    = '1';
      } else {
        const mainW = mainEl.getBoundingClientRect().width;
        const divW  = divider.getBoundingClientRect().width;
        const newW  = Math.max(200, Math.min(mainW - divW - 200, startW + (clientX - startX)));
        blocklyDiv.style.width = newW + 'px';
        blocklyDiv.style.flex  = 'none';
        codePanel.style.flex   = '1';
      }
      Blockly.svgResize(workspace);
    }

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      divider.classList.remove('dragging');
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    divider.addEventListener('mousedown',  e => startDrag(e.clientX, e.clientY));
    divider.addEventListener('touchstart', e => { e.preventDefault(); startDrag(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
    document.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    document.addEventListener('touchmove', e => { if (dragging) { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: false });
    document.addEventListener('mouseup',   () => endDrag());
    document.addEventListener('touchend',  () => endDrag());
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

  // ===== スクリーンショット保存 =====
  (function registerScreenshotMenu() {
    function captureWorkspaceAsPng() {
      const blocks = workspace.getAllBlocks(false);
      if (blocks.length === 0) { alert('ブロックがありません'); return; }

      const blockCanvas = workspace.getCanvas();
      const bbox = blockCanvas.getBBox();
      if (!bbox || bbox.width === 0 || bbox.height === 0) { alert('ブロックがありません'); return; }

      const padding = 20;

      // blockCanvas の CTM（translate+scale）でSVGルート座標に変換
      const ctm = blockCanvas.getCTM();
      const x1 = ctm.a * bbox.x + ctm.e;
      const y1 = ctm.d * bbox.y + ctm.f;
      const x2 = ctm.a * (bbox.x + bbox.width)  + ctm.e;
      const y2 = ctm.d * (bbox.y + bbox.height) + ctm.f;

      const viewX = x1 - padding;
      const viewY = y1 - padding;
      const viewW = (x2 - x1) + padding * 2;
      const viewH = (y2 - y1) + padding * 2;
      const imgW  = Math.ceil(viewW);
      const imgH  = Math.ceil(viewH);

      // BlobURL経由では外部CSS・CSS変数が解決されないため、
      // クローン前にオリジナル要素のcomputedスタイルをインライン属性に書き込む
      const inlineProps = ['fill', 'font-family', 'font-size', 'font-weight'];
      const textEls = Array.from(blockCanvas.querySelectorAll('text, tspan'));
      const savedAttrs = textEls.map(el => {
        const saved = {};
        inlineProps.forEach(p => { saved[p] = el.getAttribute(p); });
        return saved;
      });
      textEls.forEach(el => {
        const cs = window.getComputedStyle(el);
        inlineProps.forEach(p => {
          const camel = p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          const val = cs[camel] || cs.getPropertyValue(p);
          if (val && val !== 'none' && val !== '') el.setAttribute(p, val);
        });
      });

      // blockCanvas のみを新しいSVGにラップ（背景・ツールボックスを含めない）
      const ns = 'http://www.w3.org/2000/svg';
      const newSvg = document.createElementNS(ns, 'svg');
      newSvg.setAttribute('xmlns', ns);
      newSvg.setAttribute('width',   imgW);
      newSvg.setAttribute('height',  imgH);
      newSvg.setAttribute('viewBox', `${viewX} ${viewY} ${viewW} ${viewH}`);

      // defs（フィルター・クリッピング定義）をコピー
      const origDefs = workspace.getParentSvg().querySelector('defs');
      if (origDefs) newSvg.appendChild(origDefs.cloneNode(true));

      // ブロック本体をコピー（インライン属性が書き込まれた状態でクローン）
      newSvg.appendChild(blockCanvas.cloneNode(true));

      // オリジナル要素を元の状態に戻す
      textEls.forEach((el, i) => {
        inlineProps.forEach(p => {
          const v = savedAttrs[i][p];
          if (v === null) el.removeAttribute(p);
          else el.setAttribute(p, v);
        });
      });

      const svgStr = new XMLSerializer().serializeToString(newSvg);
      const blob   = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url    = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width  = imgW;
        canvas.height = imgH;
        canvas.getContext('2d').drawImage(img, 0, 0);

        const a = document.createElement('a');
        const now = new Date();
        const ts = now.getFullYear()
          + String(now.getMonth() + 1).padStart(2, '0')
          + String(now.getDate()).padStart(2, '0') + '_'
          + String(now.getHours()).padStart(2, '0')
          + String(now.getMinutes()).padStart(2, '0')
          + String(now.getSeconds()).padStart(2, '0');
        a.download = `pyco_blocks_${ts}.png`;
        a.href = canvas.toDataURL('image/png');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };
      img.onerror = function() { URL.revokeObjectURL(url); alert('画像の生成に失敗しました'); };
      img.src = url;
    }

    const menuDef = {
      displayText: '全ブロックを画像保存',
      preconditionFn: function() {
        return workspace.getAllBlocks(false).length > 0 ? 'enabled' : 'disabled';
      },
      callback: function() { captureWorkspaceAsPng(); },
      weight: 200,
    };

    Blockly.ContextMenuRegistry.registry.register(
      Object.assign({ id: 'pcb_screenshot_block', scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK }, menuDef)
    );
    Blockly.ContextMenuRegistry.registry.register(
      Object.assign({ id: 'pcb_screenshot_workspace', scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE }, menuDef)
    );
  })();

  // ===== 初期化 =====
  Tutorial.init();
  // URLパラメータ ?mode=micropython でモードを指定できる（省略時は python）
  const _urlMode = new URLSearchParams(window.location.search).get('mode');
  applyMode(_urlMode === 'micropython' ? 'micropython' : 'python', false);
});
