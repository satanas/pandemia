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

  _.toGrid = function() {
    return new Rect(floor(_.x / GRID_SIZE), floor(_.y / GRID_SIZE), _.w / GRID_SIZE, _.h / GRID_SIZE);
  };

  _.center = function() {
    return new Point(_.x + (_.w / 2), _.y + (_.h / 2));
  }

  _.update();
};

Rect.fromGrid = function(o) {
  return new Rect(o.x * GRID_SIZE, o.y * GRID_SIZE, o.w * GRID_SIZE, o.h * GRID_SIZE);
};
