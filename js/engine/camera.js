var Camera = function(w, h, ww, wh) {
  var _ = this;
  _.w = w; // Viewport width
  _.h = h; // Viewport height
  _.ww = ww; // World width
  _.wh = wh; // World height
  _.ofx = 0;
  _.ofy = 0;
  _.tg = 0;

  // Set world size
  _.setWorldSize = function(w, h) {
    _.ww = w;
    _.wh = h;
  };

  // Set target. This target will be followed by the camera
  _.setTarget = function(t) {
    _.tg = t;
  };

  // Transform coordinates
  _.transformCoordinates = function(o) {
    return {
      x: o.x - _.ofx,
      y: o.y - _.ofy,
      r: o.b.r - _.ofx,
      b: o.b.b - _.ofy
    };
  };

  // In view: indicates if the object is inside the viewport
  // Used to avoid rendering objects outside the view
  _.inView = function(o) {
    var t = _.transformCoordinates(o);
    return ((t.r >= 0 && t.r <= _.w) || (t.x >= 0 && t.x <= _.w)) &&
           ((t.b >= 0 && t.b <= _.h) || (t.y >= 0 && t.y <= _.h));
  };

  // Update
  _.u = function() {
    if (!_.tg) return;
    // Update offset according the target
    var tx, ty = 0,
        mw = _.w / 2,
        mh = _.h / 2;
    if (_.ww <= _.w) {
      // If world width is smaller than viewport width, then tx = target.x so offset x is zero
      tx = _.tg.x;
    } else if (_.tg.x <= (mw)) {
      // If target.x is before the middle of the viewport, offset x is zero
      tx = _.tg.x;
    } else if ((_.tg.x > mw) && (_.tg.x + mw <= _.ww)) {
      // If target x is after the middle of the viewport and still not in the end of the world,
      // offset x is the middle viewport
      tx = mw;
    } else if ((_.tg.x > mw) && (_.tg.x + mw > _.ww)) {
      // If target x is after the middle of the viewport and reached the end of the world,
      // offset x is the difference between the world width and the target.x
      tx = _.w - (_.ww - _.tg.x);
    }

    if (_.wh <= _.h) {
      ty = _.tg.y;
    } else if (_.tg.y <= (mh)) {
      ty = _.tg.y;
    } else if ((_.tg.y > mh) && (_.tg.y + mh <= _.wh)) {
      ty = mh;
    } else if ((_.tg.y > mh) && (_.tg.y + mh > _.wh)) {
      ty = _.h - (_.wh - _.tg.y);
    }
    _.ofx = _.tg.x - tx;
    _.ofy = _.tg.y - ty;
  };

  // Render
  _.r = function(k) {
    if (!k) return;
    if (!(k instanceof Array)) k = [k];

    k.forEach(function(o) {
      if (_.inView(o)) {
        var t = _.transformCoordinates(o);
        o.r(t);
      }
    });
  };
};
