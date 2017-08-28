var Player = function(x, y) {
  var _ = this;
  _.mxs = 9.50; // max speed
  _.d = 'l'; // direction
  _.s = 0.35; // speed

  _.dx = 0;
  _.dy = 0;

  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 64);

  _.u = function() {
    if ($.in.p(37)) {
      _.d = 'l';
      _.dx -= _.s;
    } else if ($.in.p(39)) {
      _.d = 'r';
      _.dx += _.s;
    }

    if ($.in.p(38)) {
      _.d = 'u';
      _.dy -= _.s;
    } else if ($.in.p(40)) {
      _.d = 'd';
      _.dy += _.s;
    }

    _.dx = iir(_.dx, -_.mxs, _.mxs);
    _.dy = iir(_.dy, -_.mxs, _.mxs);

    if (!$.in.p(37) && !$.in.p(39)) {
      _.dx = 0;
    }
    if (!$.in.p(38) && !$.in.p(40)) {
      _.dy = 0;
    }

    _.x += _.dx;
    _.y += _.dy;

    _.updateRect();
    // Check for collisions with walls
    // p = Player
    // w = Wall
    $.g.walls.c(_, function(p, w) {
      if($.o.top(p, w)) {
        p.y = w.b.b;
      } else if ($.o.bottom(p, w)) {
        p.y = w.b.t - p.h;
      }
      if ($.o.left(p, w)) {
        p.x = w.b.r;
      } else if ($.o.right(p, w)) {
        p.x = w.b.l - p.w;
      }
    });

    _.updateRect();

  };

  _.r = function(p) {
    $.x.s();
    $.x.fs('#ff0000');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
};
