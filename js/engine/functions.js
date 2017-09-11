raf = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(a){ window.setTimeout(a,1E3/60); };

caf = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame;

Object.prototype.inherits = function(parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};

var abs = Math.abs,
    cos = Math.cos,
    sin = Math.sin,
    tan = Math.tan,
    atan = Math.atan,
    atan2 = Math.atan2,
    ceil = Math.ceil,
    floor = Math.floor,
    max = Math.max,
    min = Math.min,
    pow = Math.pow,
    sqrt = Math.sqrt,
    round = Math.round,
    rnd = Math.random,
    now = Date.now,
    PI = Math.PI,
    // TODO: Probably is better to call this clamp and make the high value optional
    // Check if a number Is In Range
    iir = function(n, l, h) {
      if (n < l) return l;
      if (h !== null && h !== undefined && n > h) return h;
      return n;
    },
    // Generate random integer between min (inclusive) and max (exclusive) range
    rndr = function(a, b) {
      return floor(rnd() * (b - a)) + a;
    },
    // Choose random element from array
    rnde = function(e) {
      return e[rndr(0, e.length)];
    }
    //lim = function(x, y) {
    //  return (x > y) ? y : x;
    //};
