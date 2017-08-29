var Zombie = function(x, y) {
  var _ = this;
  _.d = 'l'; // direction
  _.s = 2.05; // speed
  _.o = 'l'; // orientation
  _.dx = 0;
  _.dy = 0;
  _.mindist = 400; // min distance to start chasing the player
  _.path = []; // points of path

  _.inherits(Sprite);
  _.inherits(AStar);
  Sprite.call(_, x, y, 32, 64);
  AStar.call(_, $.lvl.ww, $.lvl.wh);

  _.u = function() {
    var a = new Point(_.x, _.y), // current zombie location
        b = new Point($.player.x, $.player.y), // player location
        d = _.getdist(a, b), // distance in pixels between zombie and player
        cp = a.toGrid(); // current zombie location in grid coordinates

    // The zombie doesn't have a path to walk
    if (_.path.length === 0) {
      if ((d <= _.mindist) && (round(d) > 40)) {
        _.path = _.findpath(a.toGrid(), b.toGrid());
        //console.log(_.path);
      }
    } else {
      var dp = _.path[_.path.length - 1]; // last point (destination) of current path
      // The zombie reached the current node
      if (cp.x === _.path[0].x && cp.y === _.path[0].y) {
        // We remove the current node from the path and let the walking continue
        _.path.splice(0, 1);
      } else {
        if (cp.x < _.path[0].x) {
          _.dx = _.s;
          _.o = 'r';
        } else if (cp.x > _.path[0].x) {
          _.dx = -_.s;
          _.o = 'l';
        } else {
          _.dx = 0;
        }

        if (cp.y < _.path[0].y) {
          _.dy = _.s;
          _.o = 'd';
        } else if (cp.y > _.path[0].y) {
          _.dy = -_.s;
          _.o = 'u';
        } else {
          _.dy = 0;
        }

        if (b.toGrid().x !== dp.x || b.toGrid().y !== dp.y) {
          _.path = [];
        }
      }
    }

    //if (_.path.length === 0) {
    //  _.dx = 0;
    //  _.dy = 0;
    //}

    //_.dx = iir(_.dx, -_.mxs, _.mxs);
    //_.dy = iir(_.dy, -_.mxs, _.mxs);

    //console.log('asas', _.dx, _.dy);
    _.x += _.dx;
    _.y += _.dy;

    _.updateRect();
    // Check for collisions with walls
    // p = Zombie
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
    $.x.fs('#00ff00');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
};
