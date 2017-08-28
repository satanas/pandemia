var Rect = function(x, y, w, h) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = w;
  _.h = h;

  // Update rect bounds
  _.update = function() {
    _.b = {
      b: _.y + _.h,
      t: _.y,
      l: _.x,
      r: _.x + _.w
    };
  };

  _.pointInRect = function(p) {
    //if (p.x >= _.x && p.y
  };

  _.update();
};
