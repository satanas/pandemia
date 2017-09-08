var Zombie = function(x, y) {
  var _ = this;
  _.mindist = 500; // min distance to start chasing the player
  _.path = []; // points of path
  _.ctimer = 300; // check time in ms
  _.ccount = 0; // time counter before checking new route
  _.angle = 0;
  _.trackingPos;
  _.bcount = 0; // biting counter
  _.s = rnd() + MZS; // speed
  _.health = rndr(3, 5);
  _.hsc = 0; // hurt sound counter
  _.gc = rndr(0, 4000); // growl counter
  _.d = 'd'; // direction
  _.anim = new Animator([0, 1], 150);

  _.inherits(Sprite);
  _.inherits(AStar);
  Sprite.call(_, x, y, 64, 64);
  AStar.call(_, $.lvl.ww, $.lvl.wh);

  _.u = function() {
    // TODO: Move the seek behavior to a separated file inside ai folder
    _.ccount += $.e;
    _.hsc = iir(_.hsc - $.e, 0);
    _.gc = iir(_.gc - $.e, 0);
    if (_.bcount > 0) {
      _.bcount = iir(_.bcount - $.e, 0);
      return
    }
    if (!_.gc && (rnd() > 0.98) && _.trackingPos) {
      $.sn.p('zg');
      _.gc = rndr(1000, 4000);
    }
    var d = _.getdist(_, $.player); // distance in pixels between zombie and player

    // The zombie doesn't have a path to walk
    if (_.path.length === 0) {
      if ((d <= _.mindist) && (round(d) > 40)) {
        _.path = _.findpath(_, $.player, MAX_ZOMBIE_PATH_DISTANCE);
        _.trackingPos = new Point($.player.x, $.player.y);
      }
    } else {
      if (d > _.mindist) {
        _.trackingPos = null;
        _.path = [];
        return;
      }
      var nextPos = _.path[0],
          dist = _.getdist(_, nextPos),
          appliedDist, dx, dy;
      _.anim.u();
      // The zombie reached the current node
      if (dist === 0) {
        // We remove the current node from the path and let the walking continue
        _.path.shift();
      } else {
        _.angle = atan2(nextPos.y - _.y, nextPos.x - _.x);
        appliedDist = min(dist, _.s);
        dx = appliedDist * cos(_.angle);
        dy = appliedDist * sin(_.angle);

        if (abs(dx) > abs(dy)) {
          _.d = (dx < 0) ? DIR.LEFT : DIR.RIGHT;
        } else {
          _.d = (dy < 0) ? DIR.UP : DIR.DOWN;
        }

        _.x += dx;
        _.y += dy;

        _.updateRect();

        // Recalculate path if destination point changed
        if (_.ccount >= _.ctimer && _.trackingPos !== null && ($.player.x !== _.trackingPos.x || $.player.y !== _.trackingPos.y)) {
          _.clrPath();
        }
      }
    }

    // Collisions with bullets
    $.g.b.c(_, function(p, b) {
      if (b.type !== WEAPONS.FLAME.ID) b.a = 0;
      _.health -= 1;

      if (_.health <= 0) {
        $.sn.p('zd');
        _.a = 0;
        if (rnd() >= DROP_RATE) {
          var i = rndr(2, 6),
              x = _.x + (_.w / 2),
              y = _.b.b - 32;
          if (i === ITEMS.AMMO) {
            $.g.i.add(new Ammo(x, y));
          } else if (i === ITEMS.PISTOL) {
            $.g.i.add(new Pistol(x, y));
          } else if (i === ITEMS.SHOTGUN) {
            $.g.i.add(new Shotgun(x, y));
          } else if (i === ITEMS.FLAME) {
            $.g.i.add(new Flame(x, y));
          }
        }
      } else {
        if (!_.hsc) {
          $.sn.p('zh');
          _.hsc = 700;
        }
      }
    });
  };

  _.r = function(p) {
    // Head
    $.x.fs('#a0d6ab');
    $.x.fr(p.x + 2, p.y, 62, 38);
    // Chest
    $.x.fs('#83bd90');
    $.x.fr(p.x + 16, p.y + 38, 34, 13);
    // Waist
    $.x.fs('#8b938d');
    $.x.fr(p.x + 16, p.y + 50, 34, 5);
    // Feet
    // If the zombie is stopped
    if (!_.trackingPos) {
      $.x.fr(p.x + 16, p.y + 55, 14, 8);
      $.x.fr(p.x + 36, p.y + 55, 14, 8);
    } else if (_.anim.g()) {
      $.x.fr(p.x + 16, p.y + 55, 14, 8);
    } else if (!_.anim.g()) {
      $.x.fr(p.x + 36, p.y + 55, 14, 8);
    }

    if (_.d === DIR.UP) {
      // Arms
      $.x.fs('#8ecc9b');
      $.x.fr(p.x + 9, p.y + 39, 7, 5);
      $.x.fr(p.x + 50, p.y + 39, 7, 5);
    } else if (_.d === DIR.DOWN) {
      // Arms
      $.x.fs('#8ecc9b');
      $.x.fr(p.x + 9, p.y + 39, 7, 10);
      $.x.fr(p.x + 50, p.y + 39, 7, 10);
      // Hands
      $.x.fs('#84ae8d');
      $.x.fr(p.x + 9, p.y + 49, 7, 5);
      $.x.fr(p.x + 50, p.y + 49, 7, 5);
      // Face
      $.x.fs('#5a5a5a');
      $.x.fr(p.x + 15, p.y + 19, 6, 6);
      $.x.fr(p.x + 45, p.y + 19, 6, 6);
      $.x.fr(p.x + 32, p.y + 26, 2, 9);
      $.x.fr(p.x + 27, p.y + 31, 12, 2);
    } else if (_.d === DIR.LEFT) {
      // Arms
      $.x.fs('#8ecc9b');
      $.x.fr(p.x + 11, p.y + 40, 16, 7);
      // Hands
      $.x.fs('#84ae8d');
      $.x.fr(p.x + 5, p.y + 40, 6, 7);
      // Face
      $.x.fs('#5a5a5a');
      $.x.fr(p.x + 10, p.y + 19, 6, 6);
      $.x.fr(p.x + 2, p.y + 26, 2, 9);
      $.x.fr(p.x + 4, p.y + 31, 4, 2);
    } else if (_.d === DIR.RIGHT) {
      // Arms
      $.x.fs('#8ecc9b');
      $.x.fr(p.x + 39, p.y + 40, 16, 7);
      // Hands
      $.x.fs('#84ae8d');
      $.x.fr(p.x + 55, p.y + 40, 6, 7);
      // Face
      $.x.fs('#5a5a5a');
      $.x.fr(p.x + 50, p.y + 19, 6, 6);
      $.x.fr(p.x + 62, p.y + 26, 2, 9);
      $.x.fr(p.x + 58, p.y + 31, 4, 2);
    }

    //$.x.bp();
    //$.x.ss('#11c1fc');
    //$.x.arc(p.x + (_.w / 2), p.y + (_.h / 2), _.mindist, 0, 2 * PI);
    //$.x.k();

    //_.path.forEach(function(o) {
    //  var z = $.cam.transformCoordinates(new Rect(o.x, o.y, 32, 32));
    //  $.x.ss('#ff0000');
    //  $.x.sr(z.x, z.y, 32, 32);
    //});

  };

  _.bite = function() {
    _.bcount = rndr(MIN_BITING_DURATION, MIN_BITING_DURATION + 200);
    return rndr(4, 8);
  }

  _.clrPath = function() {
    _.path.splice(1, _.path.length);
    _.ccount = 0;
  };
};
