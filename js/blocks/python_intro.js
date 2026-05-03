// =====================================================
// Python入門モード専用ブロック定義
// =====================================================

(() => {
const P = window.PycoPalette;

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
    this.setColour(P.ioKeyboard);
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
    this.setColour(P.literals);
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
    this.setColour(P.literals);
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
    this.setColour(P.math);
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
    this.setColour(P.math);
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
    this.setColour(P.loops);
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
    this.setColour(P.display);
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
    this.setColour(P.lists);
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
    this.setColour(P.lists);
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
    this.setColour(P.lists);
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
    this.setColour(P.lists);
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
    this.setColour(P.lists);
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
    this.setColour(P.loops);
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
    this.setColour(P.loops);
    this.setTooltip('ループを即座に終了します（break）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_continue'] = {
  init: function() {
    this.appendDummyInput().appendField('次のループへ（continue）');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(P.loops);
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
    this.setColour(P.functions);
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
    this.setColour(P.functions);
    this.setTooltip('引数1つの関数を定義します（def name(param):）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_def_args2'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('関数')
      .appendField(new Blockly.FieldTextInput('my_func'), 'NAME')
      .appendField('（引数:')
      .appendField(new Blockly.FieldTextInput('a'), 'PARAM1')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('b'), 'PARAM2')
      .appendField('）を定義する');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.functions);
    this.setTooltip('引数2つの関数を定義します（def name(a, b):）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_def_args3'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('関数')
      .appendField(new Blockly.FieldTextInput('my_func'), 'NAME')
      .appendField('（引数:')
      .appendField(new Blockly.FieldTextInput('a'), 'PARAM1')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('b'), 'PARAM2')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('c'), 'PARAM3')
      .appendField('）を定義する');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.functions);
    this.setTooltip('引数3つの関数を定義します（def name(a, b, c):）');
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
    this.setColour(P.functions);
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
    this.setColour(P.functions);
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
    this.setColour(P.functions);
    this.setTooltip('関数の戻り値を取得します');
    this.setHelpUrl('');
  }
};

// ===== 自作モジュール呼び出しブロック（文） =====
function _moduleOptions() {
  if (typeof window.getPyModuleOptions === 'function') return window.getPyModuleOptions();
  return [['（読込中）', '__none__']];
}

function _funcOptions() {
  const block = this.getSourceBlock ? this.getSourceBlock() : this.sourceBlock_;
  const mod = block ? block.getFieldValue('MODULE') : '__none__';
  if (typeof window.getPyModuleFunctions === 'function') return window.getPyModuleFunctions(mod);
  return [['（読込中）', '__none__']];
}

Blockly.Blocks['py_module_call_stmt'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('モジュール')
      .appendField(new Blockly.FieldDropdown(_moduleOptions), 'MODULE')
      .appendField('の関数')
      .appendField(new Blockly.FieldDropdown(_funcOptions), 'FUNC')
      .appendField('を呼び出す（引数:');
    this.appendValueInput('ARG').setCheck(null);
    this.appendDummyInput().appendField('）');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.modules);
    this.setTooltip('モジュールを選んでから関数をプルダウンで選択してください。');
    this.setHelpUrl('');
  }
};

// ===== 自作モジュール呼び出しブロック（値） =====
Blockly.Blocks['py_module_call_val'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('モジュール')
      .appendField(new Blockly.FieldDropdown(_moduleOptions), 'MODULE')
      .appendField('の関数')
      .appendField(new Blockly.FieldDropdown(_funcOptions), 'FUNC')
      .appendField('（引数:');
    this.appendValueInput('ARG').setCheck(null);
    this.appendDummyInput().appendField('）の結果');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.modules);
    this.setTooltip('モジュールを選んでから関数をプルダウンで選択してください。');
    this.setHelpUrl('');
  }
};

// =====================================================
// クラスブロック（0-16）
// =====================================================

Blockly.Blocks['py_class_def'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('クラス')
      .appendField(new Blockly.FieldTextInput('MyClass'), 'NAME')
      .appendField('を定義する');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.classes);
    this.setTooltip('クラスを定義します（class Name:）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_class_init'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('初期化（self, 引数:')
      .appendField(new Blockly.FieldVariable('name'), 'PARAM')
      .appendField('）');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.classes);
    this.setTooltip('__init__メソッドを定義します（引数1つ）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_class_init2'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('初期化（self, 引数:')
      .appendField(new Blockly.FieldVariable('width'), 'PARAM1')
      .appendField(',')
      .appendField(new Blockly.FieldVariable('height'), 'PARAM2')
      .appendField('）');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.classes);
    this.setTooltip('__init__メソッドを定義します（引数2つ）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_class_method'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('メソッド')
      .appendField(new Blockly.FieldTextInput('greet'), 'NAME')
      .appendField('（引数なし）');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.classes);
    this.setTooltip('selfのみのメソッドを定義します（def name(self):）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_class_method1'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('メソッド')
      .appendField(new Blockly.FieldTextInput('my_method'), 'NAME')
      .appendField('（引数:')
      .appendField(new Blockly.FieldVariable('param'), 'PARAM')
      .appendField('）');
    this.appendStatementInput('BODY').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.classes);
    this.setTooltip('引数1つのメソッドを定義します（def name(self, param):）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_self_set'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('self.')
      .appendField(new Blockly.FieldTextInput('attr'), 'ATTR')
      .appendField('に');
    this.appendValueInput('VALUE').setCheck(null);
    this.appendDummyInput().appendField('を入れる');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.classes);
    this.setTooltip('self の属性に値を代入します（self.attr = value）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_self_get'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('self.')
      .appendField(new Blockly.FieldTextInput('attr'), 'ATTR');
    this.setOutput(true, null);
    this.setColour(P.classes);
    this.setTooltip('self の属性を取得します（self.attr）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_new_instance'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('クラス')
      .appendField(new Blockly.FieldTextInput('MyClass'), 'NAME')
      .appendField('（引数:');
    this.appendValueInput('ARG').setCheck(null);
    this.appendDummyInput().appendField('）で作る');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.classes);
    this.setTooltip('クラスのインスタンスを作ります（ClassName(arg)）。引数不要なら空欄のままにしてください');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_method_call_stmt'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('obj'), 'INST')
      .appendField('.')
      .appendField(new Blockly.FieldTextInput('method'), 'METHOD')
      .appendField('（引数:');
    this.appendValueInput('ARG').setCheck(null);
    this.appendDummyInput().appendField('）を呼ぶ');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.classes);
    this.setTooltip('メソッドを呼び出します（obj.method(arg)）。引数不要なら空欄のままにしてください');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_attr_get'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('obj'), 'INST')
      .appendField('.')
      .appendField(new Blockly.FieldTextInput('attr'), 'ATTR');
    this.setOutput(true, null);
    this.setColour(P.classes);
    this.setTooltip('インスタンスの属性を取得します（obj.attr）');
    this.setHelpUrl('');
  }
};

// =====================================================
// 例外処理ブロック（0-17）
// =====================================================

const EX_TYPES = [
  ['エラー全般（Exception）', 'Exception'],
  ['ValueError',          'ValueError'],
  ['ZeroDivisionError',   'ZeroDivisionError'],
  ['TypeError',           'TypeError'],
  ['IndexError',          'IndexError'],
  ['KeyError',            'KeyError'],
];

Blockly.Blocks['py_try_except'] = {
  init: function() {
    this.appendDummyInput().appendField('試す：');
    this.appendStatementInput('BODY').setCheck(null);
    this.appendDummyInput()
      .appendField('エラー（')
      .appendField(new Blockly.FieldDropdown(EX_TYPES), 'ETYPE')
      .appendField('）のとき：');
    this.appendStatementInput('HANDLER').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.exceptions);
    this.setTooltip('try/except：エラーが起きたときの処理を書きます（try: ... except ExcType:）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_try_except_as'] = {
  init: function() {
    this.appendDummyInput().appendField('試す：');
    this.appendStatementInput('BODY').setCheck(null);
    this.appendDummyInput()
      .appendField('エラーを')
      .appendField(new Blockly.FieldVariable('e'), 'EVAR')
      .appendField('として受け取る：');
    this.appendStatementInput('HANDLER').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.exceptions);
    this.setTooltip('try/except Exception as e：エラーの内容を変数に受け取ります（try: ... except Exception as e:）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_raise'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('エラーを発生させる（')
      .appendField(new Blockly.FieldDropdown([
        ['ValueError',   'ValueError'],
        ['TypeError',    'TypeError'],
        ['Exception',    'Exception'],
      ]), 'ETYPE')
      .appendField('：');
    this.appendValueInput('MSG').setCheck(null);
    this.appendDummyInput().appendField('）');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.exceptions);
    this.setTooltip('raise：意図的にエラーを発生させます（raise ExcType("msg")）');
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
    this.setColour(P.math);
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
    this.setColour(P.math);
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
    this.setColour(P.math);
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
    this.setColour(P.math);
    this.setTooltip('指定した桁数で四捨五入します（round）');
    this.setHelpUrl('');
  }
};

// =====================================================
// f文字列ブロック
// =====================================================

Blockly.Blocks['py_fstring'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('f"')
      .appendField(new Blockly.FieldTextInput('こんにちは、'), 'PRE')
      .appendField('{');
    this.appendValueInput('VAR').setCheck(null);
    this.appendDummyInput()
      .appendField('}')
      .appendField(new Blockly.FieldTextInput('さん'), 'POST')
      .appendField('"');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.literals);
    this.setTooltip('f文字列：変数を埋め込んだ文字列を作ります（例: f"こんにちは、{name}さん"）');
    this.setHelpUrl('');
  }
};

// =====================================================
// 辞書（dict）ブロック
// =====================================================

Blockly.Blocks['py_dict_new'] = {
  init: function() {
    this.appendDummyInput().appendField('空の辞書 { }');
    this.setOutput(true, null);
    this.setColour(P.dict);
    this.setTooltip('空の辞書 {} を返します。var_set ブロックと組み合わせて変数に入れてください。');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_dict_set'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('辞書')
      .appendField(new Blockly.FieldVariable('my_dict'), 'DICT')
      .appendField('の');
    this.appendValueInput('KEY').setCheck(null);
    this.appendDummyInput().appendField('に');
    this.appendValueInput('VAL').setCheck(null);
    this.appendDummyInput().appendField('を入れる');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.dict);
    this.setTooltip('辞書のキーに値をセットします（dict[key] = value）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_dict_get'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('辞書')
      .appendField(new Blockly.FieldVariable('my_dict'), 'DICT')
      .appendField('の');
    this.appendValueInput('KEY').setCheck(null);
    this.appendDummyInput().appendField('の値');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.dict);
    this.setTooltip('辞書からキーに対応する値を取得します（dict[key]）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_dict_keys'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('辞書')
      .appendField(new Blockly.FieldVariable('my_dict'), 'DICT')
      .appendField('のキー一覧');
    this.setOutput(true, null);
    this.setColour(P.dict);
    this.setTooltip('辞書のキーをリストとして返します（list(dict.keys())）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_dict_literal'] = {
  itemCount_: 2,

  init: function() {
    const countField = new Blockly.FieldDropdown([
      ['1件', '1'], ['2件', '2'], ['3件', '3'], ['4件', '4']
    ]);
    this.appendDummyInput('TOP')
      .appendField('辞書 {')
      .appendField(countField, 'COUNT');
    this.rebuildShape_();
    this.setOutput(true, null);
    this.setColour(P.dict);
    this.setTooltip('辞書リテラルを作ります（例: {"name": "Taro", "age": 16}）。キーと値のペアを1〜4個設定できます。');
    this.setHelpUrl('');
    // init 完了後にバリデーターを設定（init 中の早期発火を防ぐ）
    countField.setValidator(this.onCountChanged_.bind(this));
  },

  onCountChanged_: function(val) {
    this.itemCount_ = parseInt(val, 10);
    this.rebuildShape_();
  },

  mutationToDom: function() {
    const el = document.createElement('mutation');
    el.setAttribute('items', this.itemCount_);
    return el;
  },

  domToMutation: function(xmlElement) {
    const n = parseInt(xmlElement.getAttribute('items'), 10);
    if (!isNaN(n)) this.itemCount_ = n;
    // setValue の前に rebuildShape_ を呼んでから件数表示を同期する（バリデーター経由の二重実行を防ぐ）
    this.rebuildShape_();
    const f = this.getField('COUNT');
    if (f) {
      const saved = f.getValidator ? f.getValidator() : null;
      if (saved) f.setValidator(null);
      f.setValue(String(this.itemCount_));
      if (saved) f.setValidator(saved);
    }
  },

  rebuildShape_: function() {
    let i = 0;
    while (this.getInput('PAIR' + i)) {
      this.removeInput('PAIR' + i);
      i++;
    }
    if (this.getInput('BOTTOM')) this.removeInput('BOTTOM');
    for (let j = 0; j < this.itemCount_; j++) {
      this.appendValueInput('PAIR' + j)
        .appendField('  キー')
        .appendField(new Blockly.FieldTextInput('key' + (j + 1)), 'KEY' + j)
        .appendField('値');
    }
    this.appendDummyInput('BOTTOM').appendField('}');
  }
};


// =====================================================
// 0-19: タプル・セット
// =====================================================

Blockly.Blocks['py_tuple_literal'] = {
  itemCount_: 2,
  init: function() {
    const countField = new Blockly.FieldDropdown([
      ['1個', '1'], ['2個', '2'], ['3個', '3'], ['4個', '4'], ['5個', '5']
    ]);
    this.appendDummyInput('TOP')
      .appendField('タプル (')
      .appendField(countField, 'COUNT');
    this.rebuildShape_();
    this.setOutput(true, null);
    this.setColour(P.tuples);
    this.setTooltip('変更できないデータの並び（タプル）を作ります');
    this.setHelpUrl('');
    countField.setValidator(this.onCountChanged_.bind(this));
  },
  onCountChanged_: function(val) {
    this.itemCount_ = parseInt(val, 10);
    this.rebuildShape_();
  },
  mutationToDom: function() {
    const el = document.createElement('mutation');
    el.setAttribute('items', this.itemCount_);
    return el;
  },
  domToMutation: function(xmlElement) {
    const n = parseInt(xmlElement.getAttribute('items'), 10);
    if (!isNaN(n)) this.itemCount_ = n;
    this.rebuildShape_();
    const f = this.getField('COUNT');
    if (f) {
      const saved = f.getValidator ? f.getValidator() : null;
      if (saved) f.setValidator(null);
      f.setValue(String(this.itemCount_));
      if (saved) f.setValidator(saved);
    }
  },
  rebuildShape_: function() {
    let i = 0;
    while (this.getInput('ITEM' + i)) { this.removeInput('ITEM' + i); i++; }
    if (this.getInput('BOTTOM')) this.removeInput('BOTTOM');
    for (let j = 0; j < this.itemCount_; j++) {
      this.appendValueInput('ITEM' + j)
        .appendField(j === 0 ? '' : ',');
    }
    this.appendDummyInput('BOTTOM').appendField(')');
  }
};

Blockly.Blocks['py_set_literal'] = {
  itemCount_: 2,
  init: function() {
    const countField = new Blockly.FieldDropdown([
      ['1個', '1'], ['2個', '2'], ['3個', '3'], ['4個', '4'], ['5個', '5']
    ]);
    this.appendDummyInput('TOP')
      .appendField('セット {')
      .appendField(countField, 'COUNT');
    this.rebuildShape_();
    this.setOutput(true, null);
    this.setColour(P.tuples);
    this.setTooltip('重複なし・順序なしのデータの集まり（セット）を作ります');
    this.setHelpUrl('');
    countField.setValidator(this.onCountChanged_.bind(this));
  },
  onCountChanged_: function(val) {
    this.itemCount_ = parseInt(val, 10);
    this.rebuildShape_();
  },
  mutationToDom: function() {
    const el = document.createElement('mutation');
    el.setAttribute('items', this.itemCount_);
    return el;
  },
  domToMutation: function(xmlElement) {
    const n = parseInt(xmlElement.getAttribute('items'), 10);
    if (!isNaN(n)) this.itemCount_ = n;
    this.rebuildShape_();
    const f = this.getField('COUNT');
    if (f) {
      const saved = f.getValidator ? f.getValidator() : null;
      if (saved) f.setValidator(null);
      f.setValue(String(this.itemCount_));
      if (saved) f.setValidator(saved);
    }
  },
  rebuildShape_: function() {
    let i = 0;
    while (this.getInput('ITEM' + i)) { this.removeInput('ITEM' + i); i++; }
    if (this.getInput('BOTTOM')) this.removeInput('BOTTOM');
    for (let j = 0; j < this.itemCount_; j++) {
      this.appendValueInput('ITEM' + j)
        .appendField(j === 0 ? '' : ',');
    }
    this.appendDummyInput('BOTTOM').appendField('}');
  }
};

Blockly.Blocks['py_set_add'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('セット')
      .appendField(new Blockly.FieldVariable('my_set'), 'SET');
    this.appendValueInput('VALUE').setCheck(null).appendField('に');
    this.appendDummyInput().appendField('を追加する');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.tuples);
    this.setTooltip('セットに要素を追加します（set.add(x)）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_set_discard'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('セット')
      .appendField(new Blockly.FieldVariable('my_set'), 'SET');
    this.appendValueInput('VALUE').setCheck(null).appendField('から');
    this.appendDummyInput().appendField('を削除する');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.tuples);
    this.setTooltip('セットから要素を削除します（set.discard(x)）。要素がなくてもエラーになりません。');
    this.setHelpUrl('');
  }
};

// =====================================================
// 0-20: リスト内包表記
// =====================================================

Blockly.Blocks['py_list_comp'] = {
  init: function() {
    this.appendDummyInput().appendField('[');
    this.appendValueInput('EXPR').setCheck(null);
    this.appendDummyInput()
      .appendField('for')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('in');
    this.appendValueInput('LIST').setCheck(null);
    this.appendDummyInput().appendField(']');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.lists);
    this.setTooltip('[式 for 変数 in リスト] の形でリストを作ります（リスト内包表記）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_list_comp_if'] = {
  init: function() {
    this.appendDummyInput().appendField('[');
    this.appendValueInput('EXPR').setCheck(null);
    this.appendDummyInput()
      .appendField('for')
      .appendField(new Blockly.FieldVariable('x'), 'VAR')
      .appendField('in');
    this.appendValueInput('LIST').setCheck(null);
    this.appendDummyInput().appendField('if');
    this.appendValueInput('COND').setCheck(null);
    this.appendDummyInput().appendField(']');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.lists);
    this.setTooltip('[式 for 変数 in リスト if 条件] の形でリストを絞り込みながら作ります');
    this.setHelpUrl('');
  }
};

// =====================================================
// 0-21: 組み込み関数
// =====================================================

Blockly.Blocks['py_enumerate_for'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('番号')
      .appendField(new Blockly.FieldVariable('i'), 'IDX')
      .appendField('と値')
      .appendField(new Blockly.FieldVariable('v'), 'VAL')
      .appendField('で');
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST')
      .appendField('を順に繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.builtins);
    this.setTooltip('enumerate() で番号と値を同時に取り出しながら繰り返します（for i, v in enumerate(list)）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_zip_for'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('変数')
      .appendField(new Blockly.FieldVariable('a'), 'VAR_A')
      .appendField('と')
      .appendField(new Blockly.FieldVariable('b'), 'VAR_B')
      .appendField('で');
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('list1'), 'LIST_A')
      .appendField('と')
      .appendField(new Blockly.FieldVariable('list2'), 'LIST_B')
      .appendField('を同時に繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.builtins);
    this.setTooltip('zip() で2つのリストを同時に繰り返します（for a, b in zip(list1, list2)）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_sorted_call'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST')
      .appendField('を')
      .appendField(new Blockly.FieldDropdown([['昇順', 'False'], ['降順', 'True']]), 'REVERSE')
      .appendField('に並び替え');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.builtins);
    this.setTooltip('sorted() でリストを並び替えた新しいリストを返します（元のリストは変わりません）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_min_call'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST')
      .appendField('の最小値');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.builtins);
    this.setTooltip('min() でリストの中の最小値を返します');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_max_call'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST')
      .appendField('の最大値');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.builtins);
    this.setTooltip('max() でリストの中の最大値を返します');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_sum_call'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST')
      .appendField('の合計');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.builtins);
    this.setTooltip('sum() でリストの全要素の合計を返します');
    this.setHelpUrl('');
  }
};

// =====================================================
// 0-18: 文字列メソッド
// =====================================================

Blockly.Blocks['py_str_split'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('文字列')
      .appendField(new Blockly.FieldVariable('text'), 'VAR')
      .appendField('を')
      .appendField(new Blockly.FieldTextInput(','), 'SEP')
      .appendField('で分割（空欄=空白）');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.math);
    this.setTooltip('文字列を区切り文字で分割してリストにします（str.split()）。区切り文字を空欄にすると空白で分割します。');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_str_strip'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('文字列')
      .appendField(new Blockly.FieldVariable('text'), 'VAR')
      .appendField('の前後の空白を取り除く');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.math);
    this.setTooltip('文字列の先頭と末尾の空白を取り除きます（str.strip()）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_str_replace'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('文字列')
      .appendField(new Blockly.FieldVariable('text'), 'VAR')
      .appendField('の')
      .appendField(new Blockly.FieldTextInput('old'), 'OLD')
      .appendField('を')
      .appendField(new Blockly.FieldTextInput('new'), 'NEW')
      .appendField('に置換');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.math);
    this.setTooltip('文字列中の特定の文字列を別の文字列に置き換えます（str.replace()）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_str_find'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('文字列')
      .appendField(new Blockly.FieldVariable('text'), 'VAR')
      .appendField('の中で')
      .appendField(new Blockly.FieldTextInput('keyword'), 'SUB')
      .appendField('を探す');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.math);
    this.setTooltip('文字列中で部分文字列を検索し、最初の位置（インデックス）を返します。見つからなければ -1 を返します（str.find()）');
    this.setHelpUrl('');
  }
};

// =====================================================
// 0-21: 組み込み関数（追加）
// =====================================================

Blockly.Blocks['py_enumerate_start_for'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('番号（')
      .appendField(new Blockly.FieldNumber(1, 0, 100), 'START')
      .appendField('から）')
      .appendField(new Blockly.FieldVariable('i'), 'IDX')
      .appendField('と値')
      .appendField(new Blockly.FieldVariable('v'), 'VAL')
      .appendField('で');
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST')
      .appendField('を順に繰り返す');
    this.appendStatementInput('DO').setCheck(null);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(P.builtins);
    this.setTooltip('enumerate() で番号と値を同時に取り出します。番号の開始値を指定できます（for i, v in enumerate(list, start=N)）');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['py_map_call'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('リスト')
      .appendField(new Blockly.FieldVariable('my_list'), 'LIST')
      .appendField('の各要素を')
      .appendField(new Blockly.FieldDropdown([
        ['整数（int）',  'int'],
        ['小数（float）', 'float'],
        ['文字列（str）', 'str'],
        ['絶対値（abs）', 'abs'],
      ]), 'TYPE')
      .appendField('に変換したリスト');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(P.builtins);
    this.setTooltip('リストの全要素を一括変換した新しいリストを返します（list(map(type, list))）');
    this.setHelpUrl('');
  }
};

})();
