// =====================================================
// PycoBlocks Part 6 - pyco_ml Skulpt module
// K-Nearest Neighbors / Linear Regression / utilities
// =====================================================

(() => {
  'use strict';

  const ML_JS = String.raw`var $builtinmodule = function(name) {
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

  function toJs(py) { return Sk.ffi.remapToJs(py); }
  function toPy(js) { return Sk.ffi.remapToPy(js); }

  function euclidean(a, b) {
    var s = 0;
    for (var i = 0; i < a.length; i++) s += (a[i] - b[i]) * (a[i] - b[i]);
    return Math.sqrt(s);
  }

  function knnPredictOne(Xtr, ytr, k, x) {
    var dists = Xtr.map(function(xi, i) { return { d: euclidean(xi, x), label: ytr[i] }; });
    dists.sort(function(a, b) { return a.d - b.d; });
    var votes = {};
    dists.slice(0, k).forEach(function(n) { votes[n.label] = (votes[n.label] || 0) + 1; });
    var best = null, bestN = 0;
    Object.keys(votes).forEach(function(lb) { if (votes[lb] > bestN) { bestN = votes[lb]; best = lb; } });
    return best;
  }

  function ensureRow(r) { return Array.isArray(r) ? r : [r]; }

  // KNN(k) constructor: returns a classifier object
  mod.KNN = new Sk.builtin.func(function(k_py) {
    var k = k_py ? toJs(k_py) : 3;
    var obj = makePyNamespace();
    var _Xtr = null, _ytr = null;

    obj.fit = new Sk.builtin.func(function(X_py, y_py) {
      _Xtr = toJs(X_py);
      _ytr = toJs(y_py);
      return Sk.builtin.none.none$;
    });

    obj.predict = new Sk.builtin.func(function(X_py) {
      var X = toJs(X_py);
      var Xtr = _Xtr.map(ensureRow);
      var results = X.map(function(x) { return knnPredictOne(Xtr, _ytr, k, ensureRow(x)); });
      return toPy(results);
    });

    obj.predict_one = new Sk.builtin.func(function(x_py) {
      var x = ensureRow(toJs(x_py));
      return toPy(knnPredictOne(_Xtr.map(ensureRow), _ytr, k, x));
    });

    return obj;
  });

  // LinearRegression() constructor: 1D least-squares regression
  mod.LinearRegression = new Sk.builtin.func(function() {
    var obj = makePyNamespace();
    var _w = 0, _b = 0;

    obj.fit = new Sk.builtin.func(function(X_py, y_py) {
      var X = toJs(X_py).map(function(r) { return Array.isArray(r) ? r[0] : r; });
      var y = toJs(y_py);
      var n = X.length, sx = 0, sy = 0, sxy = 0, sx2 = 0;
      for (var i = 0; i < n; i++) { sx += X[i]; sy += y[i]; sxy += X[i]*y[i]; sx2 += X[i]*X[i]; }
      var denom = n * sx2 - sx * sx;
      _w = denom !== 0 ? (n * sxy - sx * sy) / denom : 0;
      _b = (sy - _w * sx) / n;
      return Sk.builtin.none.none$;
    });

    obj.predict = new Sk.builtin.func(function(X_py) {
      var X = toJs(X_py).map(function(r) { return Array.isArray(r) ? r[0] : r; });
      return toPy(X.map(function(x) { return _w * x + _b; }));
    });

    obj.predict_one = new Sk.builtin.func(function(x_py) {
      var x = toJs(x_py);
      return toPy(_w * (Array.isArray(x) ? x[0] : x) + _b);
    });

    obj.get_coef      = new Sk.builtin.func(function() { return toPy(_w); });
    obj.get_intercept = new Sk.builtin.func(function() { return toPy(_b); });

    return obj;
  });

  // accuracy(y_true, y_pred) → 0.0〜1.0
  mod.accuracy = new Sk.builtin.func(function(yt_py, yp_py) {
    var yt = toJs(yt_py), yp = toJs(yp_py);
    if (!yt || !yt.length) return toPy(0.0);
    var correct = 0;
    for (var i = 0; i < yt.length; i++) if (String(yt[i]) === String(yp[i])) correct++;
    return toPy(correct / yt.length);
  });

  // train_test_split(X, y, ratio=0.2) → [X_tr, X_te, y_tr, y_te]
  mod.train_test_split = new Sk.builtin.func(function(X_py, y_py, ratio_py) {
    var X = toJs(X_py), y = toJs(y_py);
    var ratio = ratio_py ? toJs(ratio_py) : 0.2;
    var n = X.length, n_te = Math.floor(n * ratio), n_tr = n - n_te;
    return toPy([X.slice(0, n_tr), X.slice(n_tr), y.slice(0, n_tr), y.slice(n_tr)]);
  });

  return mod;
};`;

  window.PycoML = {
    source: ML_JS,
    installIntoSkulpt: function(Sk) {
      if (!Sk) return;
      if (!Sk.builtinFiles) Sk.builtinFiles = { files: {} };
      if (!Sk.builtinFiles['files']) Sk.builtinFiles['files'] = {};
      Sk.builtinFiles['files']['pyco_ml.js'] = ML_JS;
      Sk.builtinFiles['files']['pyco_ml/__init__.js'] = ML_JS;
    }
  };
})();
