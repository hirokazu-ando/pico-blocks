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
    this.appendDummyInput('TOP')
      .appendField('辞書 {')
      .appendField(new Blockly.FieldDropdown([
        ['1件', '1'], ['2件', '2'], ['3件', '3'], ['4件', '4']
      ], this.onCountChanged_.bind(this)), 'COUNT');
    this.rebuildShape_();
    this.setOutput(true, null);
    this.setColour(P.dict);
    this.setTooltip('辞書リテラルを作ります（例: {"name": "Taro", "age": 16}）。キーと値のペアを1〜4個設定できます。');
    this.setHelpUrl('');
  },

  onCountChanged_: function(val) {
    this.itemCount_ = parseInt(val, 10);
    this.rebuildShape_();
  },

  mutationToDom: function() {
    const el = Blockly.utils.xml.createElement('mutation');
    el.setAttribute('items', this.itemCount_);
    return el;
  },

  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    const f = this.getField('COUNT');
    if (f) f.setValue(String(this.itemCount_));
    this.rebuildShape_();
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

})();
