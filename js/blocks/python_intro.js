// =====================================================
// Python入門モード専用ブロック定義
// =====================================================

// キーボード入力ブロック
// テキスト:    var = input("prompt")
// 数値(整数):  var = int(input("prompt"))
// 数値(小数):  var = float(input("prompt"))
Blockly.Blocks['py_input'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('キーボード入力 (')
      .appendField(new Blockly.FieldDropdown([
        ['テキスト',    'str'],
        ['数値（整数）', 'int'],
        ['数値（小数）', 'float'],
      ]), 'TYPE')
      .appendField(') を')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('に入れる');
    this.appendDummyInput()
      .appendField('  案内文:')
      .appendField(new Blockly.FieldTextInput('入力してください'), 'PROMPT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00838F');
    this.setTooltip('input() でキーボードから値を受け取ります。\n数値を受け取る場合は int() や float() で変換されます。');
    this.setHelpUrl('');
  }
};

// ===== 文字列値ブロック =====
Blockly.Blocks['val_str'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('"')
      .appendField(new Blockly.FieldTextInput('Hello'), 'TEXT')
      .appendField('"');
    this.setOutput(true, null);
    this.setColour('#5C81A6');
    this.setTooltip('文字列の値を表します');
    this.setHelpUrl('');
  }
};

// ===== 真偽値ブロック =====
Blockly.Blocks['val_bool'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['True（真）', 'True'],
        ['False（偽）', 'False'],
      ]), 'BOOL');
    this.setOutput(true, 'Boolean');
    this.setColour('#5C81A6');
    this.setTooltip('True（真）またはFalse（偽）の値を表します');
    this.setHelpUrl('');
  }
};

// ===== 算術演算ブロック =====
Blockly.Blocks['py_math_op'] = {
  init: function() {
    this.appendValueInput('LEFT').setCheck(null);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['+（足し算）', '+'],
        ['-（引き算）', '-'],
        ['×（掛け算）', '*'],
        ['÷（割り算）', '/'],
        ['//（整数除算）', '//'],
        ['%（余り）', '%'],
        ['**（べき乗）', '**'],
      ]), 'OP');
    this.appendValueInput('RIGHT').setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#B71C1C');
    this.setTooltip('算術演算を行います');
    this.setHelpUrl('');
  }
};

// ===== 文字列連結ブロック =====
Blockly.Blocks['py_str_concat'] = {
  init: function() {
    this.appendValueInput('A').setCheck(null);
    this.appendDummyInput().appendField('と');
    this.appendValueInput('B').setCheck(null);
    this.appendDummyInput().appendField('をつなげる');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#B71C1C');
    this.setTooltip('str() で文字列に変換してから連結します');
    this.setHelpUrl('');
  }
};

// ===== while ループブロック =====
Blockly.Blocks['py_while'] = {
  init: function() {
    this.appendValueInput('COND')
      .setCheck('Boolean')
      .appendField('ずっと');
    this.appendDummyInput().appendField('の間 繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E65100');
    this.setTooltip('条件が True の間、中の処理を繰り返します');
    this.setHelpUrl('');
  }
};

// ===== 汎用 print ブロック（値ブロックを受け取る） =====
Blockly.Blocks['py_print'] = {
  init: function() {
    this.appendValueInput('VALUE').setCheck(null);
    this.appendDummyInput().appendField('を表示する');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#607D8B');
    this.setTooltip('変数・数値・文字列など何でも表示できます');
    this.setHelpUrl('');
  }
};

// =====================================================
// リスト（list）ブロック
// =====================================================

Blockly.Blocks['py_list_empty'] = {
  init: function() {
    this.appendDummyInput().appendField('空のリスト [ ]');
    this.setOutput(true, null);
    this.setColour('#00897B');
    this.setTooltip('空のリスト [] を返します');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_list_append'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST');
    this.appendDummyInput().appendField('に');
    this.appendValueInput('VALUE').setCheck(null);
    this.appendDummyInput().appendField('を追加する');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('リストの末尾に値を追加します（append）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_list_get'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST');
    this.appendDummyInput().appendField('の');
    this.appendValueInput('INDEX').setCheck('Number');
    this.appendDummyInput().appendField('番目');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#00897B');
    this.setTooltip('リストのi番目の要素を取得します（0始まり）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_list_set'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST');
    this.appendDummyInput().appendField('の');
    this.appendValueInput('INDEX').setCheck('Number');
    this.appendDummyInput().appendField('番目を');
    this.appendValueInput('VALUE').setCheck(null);
    this.appendDummyInput().appendField('にする');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('リストのi番目の要素を変更します');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_list_len'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST');
    this.appendDummyInput().appendField('の長さ');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour('#00897B');
    this.setTooltip('リストの要素数を返します（len）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_for_list'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('変数')
      .appendField(new Blockly.FieldVariable('item'), 'VAR');
    this.appendDummyInput().appendField('← リスト');
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST');
    this.appendDummyInput().appendField('を順に繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E65100');
    this.setTooltip('リストの要素を1つずつ取り出して繰り返します（for item in list）');
    this.setHelpUrl('');
  }
};

// =====================================================
// ループ制御
// =====================================================

Blockly.Blocks['py_break'] = {
  init: function() {
    this.appendDummyInput().appendField('ループを抜ける（break）');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour('#E65100');
    this.setTooltip('ループを即座に終了します（break）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_continue'] = {
  init: function() {
    this.appendDummyInput().appendField('次のループへ（continue）');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour('#E65100');
    this.setTooltip('残りの処理を飛ばして次の繰り返しへ進みます（continue）');
    this.setHelpUrl('');
  }
};

// =====================================================
// 関数（function）ブロック
// =====================================================

Blockly.Blocks['py_def_noarg'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('関数')
      .appendField(new Blockly.FieldTextInput('my_func'), 'NAME')
      .appendField('を定義する');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F57F17');
    this.setTooltip('引数なしの関数を定義します（def name():）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_def'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('関数')
      .appendField(new Blockly.FieldTextInput('my_func'), 'NAME')
      .appendField('（引数:')
      .appendField(new Blockly.FieldVariable('x'), 'PARAM')
      .appendField('）を定義する');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F57F17');
    this.setTooltip('引数1つの関数を定義します（def name(param):）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_return'] = {
  init: function() {
    this.appendValueInput('VALUE').setCheck(null);
    this.appendDummyInput().appendField('を返す（return）');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour('#F57F17');
    this.setTooltip('値を返して関数を終了します（return）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_call_stmt'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('関数')
      .appendField(new Blockly.FieldTextInput('my_func'), 'NAME')
      .appendField('を呼び出す（引数:');
    this.appendValueInput('ARG').setCheck(null);
    this.appendDummyInput().appendField('）');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F57F17');
    this.setTooltip('関数を呼び出します。引数不要なら何もつなげないでください');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_call_val'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('関数')
      .appendField(new Blockly.FieldTextInput('my_func'), 'NAME')
      .appendField('（引数:');
    this.appendValueInput('ARG').setCheck(null);
    this.appendDummyInput().appendField('）の結果');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#F57F17');
    this.setTooltip('関数の戻り値を取得します');
    this.setHelpUrl('');
  }
};

// ===== 自作モジュール呼び出しブロック（文） =====
Blockly.Blocks['py_module_call_stmt'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('モジュール')
      .appendField(new Blockly.FieldDropdown(function() {
        if (typeof window.getPyModuleOptions === 'function') {
          return window.getPyModuleOptions();
        }
        return [['（読込中）', '__none__']];
      }), 'MODULE')
      .appendField('の関数')
      .appendField(new Blockly.FieldTextInput('my_func'), 'FUNC')
      .appendField('を呼び出す（引数:');
    this.appendValueInput('ARG').setCheck(null);
    this.appendDummyInput().appendField('）');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E65100');
    this.setTooltip('自作モジュールの関数を呼び出します。タブで作ったモジュールをプルダウンで選んでください。');
    this.setHelpUrl('');
  }
};

// ===== 自作モジュール呼び出しブロック（値） =====
Blockly.Blocks['py_module_call_val'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('モジュール')
      .appendField(new Blockly.FieldDropdown(function() {
        if (typeof window.getPyModuleOptions === 'function') {
          return window.getPyModuleOptions();
        }
        return [['（読込中）', '__none__']];
      }), 'MODULE')
      .appendField('の関数')
      .appendField(new Blockly.FieldTextInput('my_func'), 'FUNC')
      .appendField('（引数:');
    this.appendValueInput('ARG').setCheck(null);
    this.appendDummyInput().appendField('）の結果');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#E65100');
    this.setTooltip('自作モジュールの関数の戻り値を取得します。');
    this.setHelpUrl('');
  }
};

// =====================================================
// 計算追加ブロック
// =====================================================

Blockly.Blocks['py_random_int'] = {
  init: function() {
    this.appendValueInput('FROM').setCheck('Number');
    this.appendDummyInput().appendField('以上');
    this.appendValueInput('TO').setCheck('Number');
    this.appendDummyInput().appendField('以下のランダムな整数');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour('#B71C1C');
    this.setTooltip('ランダムな整数を返します（random.randint(a, b)）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_type_cast'] = {
  init: function() {
    this.appendValueInput('VALUE').setCheck(null);
    this.appendDummyInput()
      .appendField('を')
      .appendField(new Blockly.FieldDropdown([
        ['整数（int）',  'int'],
        ['小数（float）', 'float'],
        ['文字列（str）', 'str'],
      ]), 'TYPE')
      .appendField('に変換');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#B71C1C');
    this.setTooltip('値を指定した型に変換します（int/float/str）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_abs'] = {
  init: function() {
    this.appendValueInput('VALUE').setCheck('Number');
    this.appendDummyInput().appendField('の絶対値');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour('#B71C1C');
    this.setTooltip('絶対値を返します（abs）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_round'] = {
  init: function() {
    this.appendValueInput('VALUE').setCheck('Number');
    this.appendDummyInput().appendField('を小数点');
    this.appendValueInput('DIGITS').setCheck('Number');
    this.appendDummyInput().appendField('桁に丸める');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour('#B71C1C');
    this.setTooltip('指定した桁数で四捨五入します（round）');
    this.setHelpUrl('');
  }
};
