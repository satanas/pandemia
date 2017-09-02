var Player = function(x, y) {
  var _ = this;
  _.mxs = 8.50; // max speed
  _.d = 'l'; // direction
  _.s = 0.35; // speed

  _.dx = 0;
  _.dy = 0;
  _.ic = 0; // invincibility counter
  _.intensity = 0;
  _.humanity = 100;
  _.humanityDecay = _.humanity / (7 * 60); // 7 min

  //var x = room.x + (room.w / 2) - 32,
  //    y = room.y + (room.h / 2) - 32;

  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 64);

  _.u = function() {
    _.humanity = iir(_.humanity - ($.e * _.humanityDecay / 1000), 0.1);
    //_.intensity += 1 / _.humanity;
    _.ic = iir(_.ic - $.e, 0);
    console.log(_.humanity);

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

    // Collisions with walls
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

    // Collisions with zombies
    // p = Player
    // w = Wall
    if (_.ic === 0) {
      $.g.z.c(_, function(p, z) {
        _.humanity -= z.damage;
        _.ic = INVINCIBILITY_TIME;
      });
    }

    _.updateRect();
  };

  _.r = function(p) {
    $.x.s();
    if (_.ic !== 0)
      $.x.fs('#000000');
    else
      $.x.fs('#ff0000');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
};
