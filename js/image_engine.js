// =====================================================
// PycoBlocks Part 5 - pyco_cv Skulpt module
// Canvas API based image processing
// =====================================================

(() => {
  'use strict';

  const CV_JS = String.raw`var $builtinmodule = function(name) {
  'use strict';
  var mod = {};
  var Sk = globalThis.Sk;

  function getDisplayArea() {
    var area = document.getElementById('cv-display-area');
    if (area) area.style.display = 'block';
    return area;
  }

  // Internal image object: { _w, _h, _data: Uint8ClampedArray (RGBA) }
  function makeImg(w, h, data) {
    var obj = {};
    obj._w = w; obj._h = h;
    obj._data = (data instanceof Uint8ClampedArray) ? data : new Uint8ClampedArray(w * h * 4);
    if (!data) {
      for (var i = 0; i < obj._data.length; i += 4) {
        obj._data[i] = obj._data[i+1] = obj._data[i+2] = obj._data[i+3] = 255;
      }
    }
    obj.tp$getattr = function(n) {
      if (typeof n !== 'string') n = Sk.ffi.remapToJs(n);
      if (n === 'width')  return Sk.ffi.remapToPy(obj._w);
      if (n === 'height') return Sk.ffi.remapToPy(obj._h);
      throw new Sk.builtin.AttributeError(n);
    };
    return obj;
  }

  function genSample(name) {
    var w = 120, h = 120;
    var data = new Uint8ClampedArray(w * h * 4);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var i = (y * w + x) * 4;
        var r, g, b;
        if (name === 'gradient') {
          r = Math.round(x / (w - 1) * 255);
          g = Math.round(y / (h - 1) * 255);
          b = 128;
        } else if (name === 'checker') {
          var v = ((Math.floor(x / 15) + Math.floor(y / 15)) % 2) ? 220 : 50;
          r = g = b = v;
        } else if (name === 'circle') {
          var cx = w / 2, cy = h / 2, rr = 45;
          var dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
          r = dist < rr ? 230 : 30; g = dist < rr ? 180 : 30; b = dist < rr ? 60 : 80;
        } else if (name === 'stripes') {
          r = (Math.floor(x / 12) % 2) ? 210 : 50;
          g = (Math.floor(y / 12) % 2) ? 180 : 70;
          b = 120;
        } else {
          var c = (x + y) % 256; r = c; g = 255 - c; b = 128;
        }
        data[i] = r; data[i+1] = g; data[i+2] = b; data[i+3] = 255;
      }
    }
    return makeImg(w, h, data);
  }

  // load(name): load a preset sample image
  mod.load = new Sk.builtin.func(function(name_py) {
    return genSample(Sk.ffi.remapToJs(name_py));
  });

  // show(img): render to cv-display-area
  mod.show = new Sk.builtin.func(function(img_py) {
    var img = img_py;
    var canvas = document.createElement('canvas');
    canvas.width = img._w; canvas.height = img._h;
    canvas.style.cssText = 'border:1px solid #ccc;display:block;margin:4px auto;image-rendering:pixelated;';
    var ctx = canvas.getContext('2d');
    var idata = ctx.createImageData(img._w, img._h);
    idata.data.set(img._data);
    ctx.putImageData(idata, 0, 0);
    var area = getDisplayArea();
    if (area) {
      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:inline-block;margin:4px;text-align:center;';
      wrapper.appendChild(canvas);
      area.appendChild(wrapper);
    }
    return Sk.builtin.none.none$;
  });

  // to_gray(img): convert to grayscale
  mod.to_gray = new Sk.builtin.func(function(img_py) {
    var src = img_py;
    var out = new Uint8ClampedArray(src._w * src._h * 4);
    for (var i = 0; i < out.length; i += 4) {
      var g = Math.round(0.299 * src._data[i] + 0.587 * src._data[i+1] + 0.114 * src._data[i+2]);
      out[i] = out[i+1] = out[i+2] = g; out[i+3] = 255;
    }
    return makeImg(src._w, src._h, out);
  });

  // brightness(img, delta): add delta to each channel
  mod.brightness = new Sk.builtin.func(function(img_py, delta_py) {
    var src = img_py, d = delta_py ? Sk.ffi.remapToJs(delta_py) : 0;
    var out = new Uint8ClampedArray(src._w * src._h * 4);
    for (var i = 0; i < out.length; i += 4) {
      out[i]   = Math.max(0, Math.min(255, src._data[i]   + d));
      out[i+1] = Math.max(0, Math.min(255, src._data[i+1] + d));
      out[i+2] = Math.max(0, Math.min(255, src._data[i+2] + d));
      out[i+3] = 255;
    }
    return makeImg(src._w, src._h, out);
  });

  // filter_blur(img, size): box blur with given kernel size
  mod.filter_blur = new Sk.builtin.func(function(img_py, size_py) {
    var src = img_py, sz = size_py ? Sk.ffi.remapToJs(size_py) : 3;
    var half = Math.floor(sz / 2), w = src._w, h = src._h;
    var out = new Uint8ClampedArray(w * h * 4);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var sr = 0, sg = 0, sb = 0, cnt = 0;
        for (var ky = -half; ky <= half; ky++) {
          for (var kx = -half; kx <= half; kx++) {
            var nx = Math.max(0, Math.min(w - 1, x + kx));
            var ny = Math.max(0, Math.min(h - 1, y + ky));
            var ni = (ny * w + nx) * 4;
            sr += src._data[ni]; sg += src._data[ni+1]; sb += src._data[ni+2]; cnt++;
          }
        }
        var oi = (y * w + x) * 4;
        out[oi] = sr/cnt|0; out[oi+1] = sg/cnt|0; out[oi+2] = sb/cnt|0; out[oi+3] = 255;
      }
    }
    return makeImg(w, h, out);
  });

  // filter_edge(img): Sobel edge detection
  mod.filter_edge = new Sk.builtin.func(function(img_py) {
    var src = img_py, w = src._w, h = src._h;
    var out = new Uint8ClampedArray(w * h * 4);
    function gray(px, py) {
      var ii = (py * w + px) * 4;
      return 0.299 * src._data[ii] + 0.587 * src._data[ii+1] + 0.114 * src._data[ii+2];
    }
    for (var y = 1; y < h - 1; y++) {
      for (var x = 1; x < w - 1; x++) {
        var gx = -gray(x-1,y-1) - 2*gray(x-1,y) - gray(x-1,y+1)
                 +gray(x+1,y-1) + 2*gray(x+1,y) + gray(x+1,y+1);
        var gy = -gray(x-1,y-1) - 2*gray(x,y-1) - gray(x+1,y-1)
                 +gray(x-1,y+1) + 2*gray(x,y+1) + gray(x+1,y+1);
        var mag = Math.min(255, Math.sqrt(gx*gx + gy*gy));
        var oi = (y * w + x) * 4;
        out[oi] = out[oi+1] = out[oi+2] = mag|0; out[oi+3] = 255;
      }
    }
    return makeImg(w, h, out);
  });

  // get_pixel(img, x, y) → [r, g, b]
  mod.get_pixel = new Sk.builtin.func(function(img_py, x_py, y_py) {
    var img = img_py;
    var x = Sk.ffi.remapToJs(x_py), y = Sk.ffi.remapToJs(y_py);
    var i = (y * img._w + x) * 4;
    return Sk.ffi.remapToPy([img._data[i], img._data[i+1], img._data[i+2]]);
  });

  // set_pixel(img, x, y, r, g, b)
  mod.set_pixel = new Sk.builtin.func(function(img_py, x_py, y_py, r_py, g_py, b_py) {
    var img = img_py;
    var x = Sk.ffi.remapToJs(x_py), y = Sk.ffi.remapToJs(y_py);
    var i = (y * img._w + x) * 4;
    img._data[i]   = Sk.ffi.remapToJs(r_py);
    img._data[i+1] = Sk.ffi.remapToJs(g_py);
    img._data[i+2] = Sk.ffi.remapToJs(b_py);
    img._data[i+3] = 255;
    return Sk.builtin.none.none$;
  });

  mod.get_width  = new Sk.builtin.func(function(img_py) { return Sk.ffi.remapToPy(img_py._w); });
  mod.get_height = new Sk.builtin.func(function(img_py) { return Sk.ffi.remapToPy(img_py._h); });

  // resize(img, w, h)
  mod.resize = new Sk.builtin.func(function(img_py, nw_py, nh_py) {
    var src = img_py;
    var nw = Sk.ffi.remapToJs(nw_py), nh = Sk.ffi.remapToJs(nh_py);
    var c1 = document.createElement('canvas'); c1.width = src._w; c1.height = src._h;
    var id1 = c1.getContext('2d').createImageData(src._w, src._h);
    id1.data.set(src._data); c1.getContext('2d').putImageData(id1, 0, 0);
    var c2 = document.createElement('canvas'); c2.width = nw; c2.height = nh;
    var ctx2 = c2.getContext('2d');
    ctx2.drawImage(c1, 0, 0, nw, nh);
    var id2 = ctx2.getImageData(0, 0, nw, nh);
    return makeImg(nw, nh, new Uint8ClampedArray(id2.data));
  });

  // copy(img)
  mod.copy = new Sk.builtin.func(function(img_py) {
    return makeImg(img_py._w, img_py._h, img_py._data.slice());
  });

  return mod;
};`;

  window.PycoCv = {
    source: CV_JS,
    installIntoSkulpt: function(Sk) {
      if (!Sk) return;
      if (!Sk.builtinFiles) Sk.builtinFiles = { files: {} };
      if (!Sk.builtinFiles['files']) Sk.builtinFiles['files'] = {};
      Sk.builtinFiles['files']['pyco_cv.js'] = CV_JS;
      Sk.builtinFiles['files']['pyco_cv/__init__.js'] = CV_JS;
    }
  };
})();
