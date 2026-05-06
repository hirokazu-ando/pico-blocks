// =====================================================
// PycoBlocks Part 2 - csv Skulpt module shim
// csv.reader / csv.writer  (basic RFC 4180 subset:
//   - comma delimiter
//   - double-quoted fields with "" escape
//   - LF / CRLF line endings)
// =====================================================

(() => {
  'use strict';

  const CSV_JS = String.raw`var $builtinmodule = function(name) {
  'use strict';
  var mod = {};
  var Sk = globalThis.Sk;

  function makePyNamespace() {
    var ns = {};
    function toName(n) { return (typeof n === 'string') ? n : Sk.ffi.remapToJs(n); }
    ns.tp$getattr = function(n) {
      var k = toName(n);
      if (Object.prototype.hasOwnProperty.call(ns, k)) return ns[k];
      throw new Sk.builtin.AttributeError(k);
    };
    ns.tp$setattr = function(n, v) { ns[toName(n)] = v; };
    return ns;
  }

  function readContent(arg) {
    // file-like: call .read()
    try {
      var readAttr = arg && arg.tp$getattr ? arg.tp$getattr(new Sk.builtin.str('read')) : null;
      if (readAttr) {
        var resPy = Sk.misceval.callsimArray(readAttr, []);
        return String(Sk.ffi.remapToJs(resPy) || '');
      }
    } catch (e) { /* fall through */ }
    // iterable of strings
    var arr = Sk.ffi.remapToJs(arg);
    if (Array.isArray(arr)) return arr.join('\n');
    return String(arr || '');
  }

  function parseCsv(text) {
    var rows = [];
    var i = 0, n = text.length;
    while (i < n) {
      var row = [];
      while (true) {
        var field = '';
        if (text[i] === '"') {
          i++;
          while (i < n) {
            if (text[i] === '"') {
              if (text[i + 1] === '"') { field += '"'; i += 2; }
              else { i++; break; }
            } else {
              field += text[i++];
            }
          }
        } else {
          while (i < n && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') {
            field += text[i++];
          }
        }
        row.push(field);
        if (text[i] === ',') { i++; continue; }
        break;
      }
      rows.push(row);
      if (text[i] === '\r') i++;
      if (text[i] === '\n') i++;
    }
    // Drop trailing empty row from final newline
    if (rows.length > 0) {
      var last = rows[rows.length - 1];
      if (last.length === 1 && last[0] === '') rows.pop();
    }
    return rows;
  }

  function csvEscape(s) {
    var str = (s === null || s === undefined) ? '' : String(s);
    if (/[,"\r\n]/.test(str)) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  // csv.reader は本来遅延イテレータだが、教育用 CSV では list 返却で
  // list(csv.reader(_f)) / for row in csv.reader(_f): の両方が成立する。
  mod.reader = new Sk.builtin.func(function(source /*, dialect */) {
    var content = readContent(source);
    var rows = parseCsv(content);
    return Sk.ffi.remapToPy(rows);
  });

  mod.writer = new Sk.builtin.func(function(file_obj /*, dialect */) {
    var writeAttr = file_obj && file_obj.tp$getattr ? file_obj.tp$getattr(new Sk.builtin.str('write')) : null;
    if (!writeAttr) throw new Sk.builtin.TypeError('csv.writer requires a file-like object with .write()');

    var w = makePyNamespace();

    function writeLine(row_py) {
      var row = Sk.ffi.remapToJs(row_py);
      if (!Array.isArray(row)) row = [row];
      var line = row.map(csvEscape).join(',');
      Sk.misceval.callsimArray(writeAttr, [Sk.ffi.remapToPy(line + '\n')]);
    }

    w.writerow = new Sk.builtin.func(function(row_py) {
      writeLine(row_py);
      return Sk.builtin.none.none$;
    });

    w.writerows = new Sk.builtin.func(function(rows_py) {
      var rows = Sk.ffi.remapToJs(rows_py);
      if (!Array.isArray(rows)) throw new Sk.builtin.TypeError('writerows requires an iterable of rows');
      rows.forEach(function(r) { writeLine(Sk.ffi.remapToPy(r)); });
      return Sk.builtin.none.none$;
    });

    return w;
  });

  // Constants commonly referenced
  mod.QUOTE_MINIMAL    = Sk.ffi.remapToPy(0);
  mod.QUOTE_ALL        = Sk.ffi.remapToPy(1);
  mod.QUOTE_NONNUMERIC = Sk.ffi.remapToPy(2);
  mod.QUOTE_NONE       = Sk.ffi.remapToPy(3);

  return mod;
};`;

  window.PycoCsv = {
    source: CSV_JS,
    installIntoSkulpt: function(Sk) {
      if (!Sk) return;
      if (!Sk.builtinFiles) Sk.builtinFiles = { files: {} };
      if (!Sk.builtinFiles['files']) Sk.builtinFiles['files'] = {};
      Sk.builtinFiles['files']['csv.js'] = CSV_JS;
      Sk.builtinFiles['files']['csv/__init__.js'] = CSV_JS;
    }
  };
})();
