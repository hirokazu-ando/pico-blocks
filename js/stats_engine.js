// =====================================================
// PycoBlocks Part 2 - statistics Skulpt module shim
// mean / median / median_low / median_high / mode /
// multimode / stdev / pstdev / variance / pvariance
// =====================================================

(() => {
  'use strict';

  const STATS_JS = String.raw`var $builtinmodule = function(name) {
  'use strict';
  var mod = {};
  var Sk = globalThis.Sk;

  function toJsList(py) {
    var v = Sk.ffi.remapToJs(py);
    if (!Array.isArray(v)) {
      throw new Sk.builtin.TypeError('expected an iterable of numbers');
    }
    var out = [];
    for (var i = 0; i < v.length; i++) {
      var x = Number(v[i]);
      if (!isFinite(x)) {
        throw new Sk.builtin.TypeError('cannot convert to number: ' + String(v[i]));
      }
      out.push(x);
    }
    return out;
  }

  function toPy(js) { return Sk.ffi.remapToPy(js); }

  function statsError(msg) {
    var E = mod.StatisticsError || Sk.builtin.ValueError;
    return new E(msg);
  }

  function meanArr(a) {
    var s = 0;
    for (var i = 0; i < a.length; i++) s += a[i];
    return s / a.length;
  }

  function sortedCopy(a) {
    return a.slice().sort(function(x, y) { return x - y; });
  }

  function medianArr(a) {
    var s = sortedCopy(a);
    var n = s.length;
    var mid = Math.floor(n / 2);
    return (n % 2 === 1) ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  }

  function medianLowArr(a) {
    var s = sortedCopy(a);
    var n = s.length;
    return (n % 2 === 1) ? s[Math.floor(n / 2)] : s[n / 2 - 1];
  }

  function medianHighArr(a) {
    var s = sortedCopy(a);
    return s[Math.floor(s.length / 2)];
  }

  function modeArr(a) {
    var counts = new Map();
    for (var i = 0; i < a.length; i++) {
      var k = a[i];
      counts.set(k, (counts.get(k) || 0) + 1);
    }
    var firstKey = a[0];
    var bestKey = firstKey, bestN = counts.get(firstKey);
    var iter = counts.entries();
    var step = iter.next();
    while (!step.done) {
      var pair = step.value;
      if (pair[1] > bestN) { bestN = pair[1]; bestKey = pair[0]; }
      step = iter.next();
    }
    return bestKey;
  }

  function multimodeArr(a) {
    var counts = new Map();
    var order = [];
    for (var i = 0; i < a.length; i++) {
      var k = a[i];
      if (!counts.has(k)) order.push(k);
      counts.set(k, (counts.get(k) || 0) + 1);
    }
    var maxN = 0;
    counts.forEach(function(n) { if (n > maxN) maxN = n; });
    var out = [];
    for (var j = 0; j < order.length; j++) {
      if (counts.get(order[j]) === maxN) out.push(order[j]);
    }
    return out;
  }

  function pvarianceArr(a) {
    var m = meanArr(a);
    var s = 0;
    for (var i = 0; i < a.length; i++) {
      var d = a[i] - m;
      s += d * d;
    }
    return s / a.length;
  }

  function varianceArr(a) {
    var m = meanArr(a);
    var s = 0;
    for (var i = 0; i < a.length; i++) {
      var d = a[i] - m;
      s += d * d;
    }
    return s / (a.length - 1);
  }

  // StatisticsError class (subclass of ValueError)
  mod.StatisticsError = Sk.misceval.buildClass(
    mod,
    function(gbl, loc) {},
    'StatisticsError',
    [Sk.builtin.ValueError]
  );

  mod.mean = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 1) throw statsError('mean requires at least one data point');
    return toPy(meanArr(a));
  });

  mod.median = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 1) throw statsError('no median for empty data');
    return toPy(medianArr(a));
  });

  mod.median_low = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 1) throw statsError('no median for empty data');
    return toPy(medianLowArr(a));
  });

  mod.median_high = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 1) throw statsError('no median for empty data');
    return toPy(medianHighArr(a));
  });

  mod.mode = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 1) throw statsError('no mode for empty data');
    return toPy(modeArr(a));
  });

  mod.multimode = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    return toPy(multimodeArr(a));
  });

  mod.stdev = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 2) throw statsError('stdev requires at least two data points');
    return toPy(Math.sqrt(varianceArr(a)));
  });

  mod.pstdev = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 1) throw statsError('pstdev requires at least one data point');
    return toPy(Math.sqrt(pvarianceArr(a)));
  });

  mod.variance = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 2) throw statsError('variance requires at least two data points');
    return toPy(varianceArr(a));
  });

  mod.pvariance = new Sk.builtin.func(function(data) {
    var a = toJsList(data);
    if (a.length < 1) throw statsError('pvariance requires at least one data point');
    return toPy(pvarianceArr(a));
  });

  return mod;
};`;

  window.PycoStats = {
    source: STATS_JS,
    installIntoSkulpt: function(Sk) {
      if (!Sk) return;
      if (!Sk.builtinFiles) Sk.builtinFiles = { files: {} };
      if (!Sk.builtinFiles['files']) Sk.builtinFiles['files'] = {};
      Sk.builtinFiles['files']['statistics.js'] = STATS_JS;
      Sk.builtinFiles['files']['statistics/__init__.js'] = STATS_JS;
    }
  };
})();
