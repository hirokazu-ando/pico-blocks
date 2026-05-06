// =====================================================
// PycoBlocks Part 2 - matplotlib.pyplot Skulpt module
// Chart.js ベースのグラフ描画エンジン
// =====================================================

(() => {
  'use strict';

  // matplotlib パッケージ（空の __init__）
  const MATPLOTLIB_INIT_JS = String.raw`var $builtinmodule = function(name) {
  'use strict';
  return {};
};`;

  // matplotlib.pyplot モジュール本体
  const PYPLOT_JS = String.raw`var $builtinmodule = function(name) {
  'use strict';
  var mod = {};
  var Sk = globalThis.Sk;

  function toJs(py) { return Sk.ffi.remapToJs(py); }

  var _datasets = [];
  var _chartType = null;
  var _title = '';
  var _xlabel = '';
  var _ylabel = '';
  var _xlim = null;
  var _ylim = null;

  function resetState() {
    _datasets = [];
    _chartType = null;
    _title = '';
    _xlabel = '';
    _ylabel = '';
    _xlim = null;
    _ylim = null;
  }

  mod.plot = new Sk.builtin.func(function(x_py, y_py) {
    var x = toJs(x_py);
    var y = (y_py !== undefined && y_py !== null) ? toJs(y_py) : null;
    if (!y) {
      y = x;
      x = x.map(function(_, i) { return i; });
    }
    _datasets.push({ type: 'line', x: x, y: y });
    if (!_chartType) _chartType = 'line';
    return Sk.builtin.none.none$;
  });

  mod.bar = new Sk.builtin.func(function(x_py, y_py) {
    _datasets.push({ type: 'bar', x: toJs(x_py), y: toJs(y_py) });
    if (!_chartType) _chartType = 'bar';
    return Sk.builtin.none.none$;
  });

  mod.scatter = new Sk.builtin.func(function(x_py, y_py) {
    _datasets.push({ type: 'scatter', x: toJs(x_py), y: toJs(y_py) });
    if (!_chartType) _chartType = 'scatter';
    return Sk.builtin.none.none$;
  });

  mod.hist = new Sk.builtin.func(function(data_py, bins_py) {
    var data = toJs(data_py);
    var bins = (bins_py !== undefined && bins_py !== null) ? toJs(bins_py) : 10;
    _datasets.push({ type: 'hist', data: data, bins: bins });
    if (!_chartType) _chartType = 'hist';
    return Sk.builtin.none.none$;
  });

  mod.title = new Sk.builtin.func(function(t_py) {
    _title = toJs(t_py);
    return Sk.builtin.none.none$;
  });

  mod.xlabel = new Sk.builtin.func(function(t_py) {
    _xlabel = toJs(t_py);
    return Sk.builtin.none.none$;
  });

  mod.ylabel = new Sk.builtin.func(function(t_py) {
    _ylabel = toJs(t_py);
    return Sk.builtin.none.none$;
  });

  mod.xlim = new Sk.builtin.func(function(lo_py, hi_py) {
    _xlim = [toJs(lo_py), toJs(hi_py)];
    return Sk.builtin.none.none$;
  });

  mod.ylim = new Sk.builtin.func(function(lo_py, hi_py) {
    _ylim = [toJs(lo_py), toJs(hi_py)];
    return Sk.builtin.none.none$;
  });

  mod.grid = new Sk.builtin.func(function() {
    return Sk.builtin.none.none$;
  });

  mod.legend = new Sk.builtin.func(function() {
    return Sk.builtin.none.none$;
  });

  mod.show = new Sk.builtin.func(function() {
    var spec = {
      datasets: _datasets,
      chartType: _chartType,
      title: _title,
      xlabel: _xlabel,
      ylabel: _ylabel,
      xlim: _xlim,
      ylim: _ylim
    };
    if (globalThis.PycoChart && globalThis.PycoChart.render) {
      globalThis.PycoChart.render(spec);
    }
    resetState();
    return Sk.builtin.none.none$;
  });

  return mod;
};`;

  // グラフ色セット
  const COLORS = [
    { border: 'rgba(54, 162, 235, 1)',  fill: 'rgba(54, 162, 235, 0.25)' },
    { border: 'rgba(255, 99, 132, 1)',  fill: 'rgba(255, 99, 132, 0.25)' },
    { border: 'rgba(75, 192, 192, 1)',  fill: 'rgba(75, 192, 192, 0.25)' },
    { border: 'rgba(255, 159, 64, 1)',  fill: 'rgba(255, 159, 64, 0.25)' },
    { border: 'rgba(153, 102, 255, 1)', fill: 'rgba(153, 102, 255, 0.25)' },
    { border: 'rgba(255, 205, 86, 1)',  fill: 'rgba(255, 205, 86, 0.25)' },
  ];

  function computeHistogram(data, numBins) {
    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var range = max - min || 1;
    var binWidth = range / numBins;
    var counts = new Array(numBins).fill(0);
    var labels = [];
    for (var i = 0; i < numBins; i++) {
      var lo = min + i * binWidth;
      var hi = lo + binWidth;
      labels.push(lo.toFixed(1) + '–' + hi.toFixed(1));
    }
    data.forEach(function(v) {
      var idx = Math.min(Math.floor((v - min) / binWidth), numBins - 1);
      counts[idx]++;
    });
    return { labels: labels, counts: counts };
  }

  function render(spec) {
    var area = document.getElementById('pyco-plot-area');
    if (!area) return;

    // 前回のグラフを破棄
    area.innerHTML = '';

    // 行ラッパーを表示（横幅ハンドルを含む）
    var plotRow = document.getElementById('pyco-plot-row');
    if (plotRow) {
      plotRow.style.display = 'flex';
      plotRow.style.flexDirection = 'row';
      plotRow.style.alignItems = 'stretch';
      plotRow.style.width = '100%';
    }
    if (!area.style.flex) area.style.flex = '1 1 0';
    area.style.minWidth = '0';

    // 初回表示時に高さを設定
    if (!area.style.height) area.style.height = '300px';

    // 縦リサイズハンドルを表示
    var handle = document.getElementById('plot-resize-handle');
    if (handle) handle.style.display = 'block';

    if (typeof Chart === 'undefined') {
      area.innerHTML = '<p style="color:red;padding:12px;">Chart.js が読み込まれていません</p>';
      return;
    }

    var datasets = spec.datasets || [];
    if (datasets.length === 0) return;

    var canvas = document.createElement('canvas');
    canvas.style.width  = '100%';
    canvas.style.height = '100%';
    area.appendChild(canvas);

    var type = spec.chartType || 'line';
    var chartType, chartData;

    var scaleX = { title: { display: !!spec.xlabel, text: spec.xlabel, font: { size: 13 } } };
    var scaleY = { title: { display: !!spec.ylabel, text: spec.ylabel, font: { size: 13 } } };
    if (spec.xlim) { scaleX.min = spec.xlim[0]; scaleX.max = spec.xlim[1]; }
    if (spec.ylim) { scaleY.min = spec.ylim[0]; scaleY.max = spec.ylim[1]; }

    var options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: !!spec.title,
          text: spec.title,
          font: { size: 16 }
        },
        legend: { display: datasets.length > 1 }
      },
      scales: { x: scaleX, y: scaleY }
    };

    if (type === 'hist') {
      var d = datasets[0];
      var h = computeHistogram(d.data, d.bins);
      chartType = 'bar';
      chartData = {
        labels: h.labels,
        datasets: [{
          label: 'Count',
          data: h.counts,
          backgroundColor: COLORS[0].fill,
          borderColor: COLORS[0].border,
          borderWidth: 1,
          barPercentage: 1.0,
          categoryPercentage: 1.0
        }]
      };
      options.scales.x.offset = false;

    } else if (type === 'scatter') {
      chartType = 'scatter';
      chartData = {
        datasets: datasets.map(function(d, i) {
          var c = COLORS[i % COLORS.length];
          return {
            label: '系列' + (i + 1),
            data: d.x.map(function(xi, j) { return { x: xi, y: d.y[j] }; }),
            backgroundColor: c.border,
            pointRadius: 5,
            pointHoverRadius: 7
          };
        })
      };

    } else if (type === 'bar') {
      chartType = 'bar';
      chartData = {
        labels: datasets[0].x.map(String),
        datasets: datasets.map(function(d, i) {
          var c = COLORS[i % COLORS.length];
          return {
            label: '系列' + (i + 1),
            data: d.y,
            backgroundColor: c.fill,
            borderColor: c.border,
            borderWidth: 1
          };
        })
      };

    } else {
      // line（デフォルト）
      chartType = 'line';
      chartData = {
        labels: datasets[0].x.map(String),
        datasets: datasets.map(function(d, i) {
          var c = COLORS[i % COLORS.length];
          return {
            label: '系列' + (i + 1),
            data: d.y,
            borderColor: c.border,
            backgroundColor: c.fill,
            tension: 0.1,
            fill: false,
            pointRadius: 4,
            pointHoverRadius: 6
          };
        })
      };
    }

    new Chart(canvas, { type: chartType, data: chartData, options: options });
  }

  function installIntoSkulpt(Sk) {
    if (!Sk) return;
    if (!Sk.builtinFiles) Sk.builtinFiles = { files: {} };
    if (!Sk.builtinFiles['files']) Sk.builtinFiles['files'] = {};

    var files = Sk.builtinFiles['files'];

    // matplotlib パッケージ（複数パスで登録）
    ['matplotlib.js', 'matplotlib/__init__.js', 'src/lib/matplotlib/__init__.js'].forEach(function(p) {
      files[p] = MATPLOTLIB_INIT_JS;
    });

    // matplotlib.pyplot サブモジュール（複数パスで登録）
    ['matplotlib/pyplot.js', 'src/lib/matplotlib/pyplot.js'].forEach(function(p) {
      files[p] = PYPLOT_JS;
    });
  }

  window.PycoChart = {
    render: render,
    installIntoSkulpt: installIntoSkulpt
  };
})();
