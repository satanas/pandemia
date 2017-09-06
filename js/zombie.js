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

  _.inherits(Sprite);
  _.inherits(AStar);
  Sprite.call(_, x, y, 64, 64);
  AStar.call(_, $.lvl.ww, $.lvl.wh);

  _.u = function() {
    // TODO: Move the seek behavior to a separated file inside ai folder
    _.ccount += $.e;
    if (_.bcount > 0) {
      _.bcount = iir(_.bcount - $.e, 0);
      return
    }
    var d = _.getdist(_, $.player); // distance in pixels between zombie and player

    // The zombie doesn't have a path to walk
    if (_.path.length === 0) {
      if ((d <= _.mindist) && (round(d) > 40)) {
        _.path = _.findpath(_, $.player, MAX_ZOMBIE_PATH_DISTANCE);
        _.trackingPos = new Point($.player.x, $.player.y);
      }
    } else {
      const nextPos = _.path[0];
      const dist = _.getdist(_, nextPos);
      // The zombie reached the current node
      if (dist === 0) {
        // We remove the current node from the path and let the walking continue
        _.path.shift();
      } else {
        _.angle = atan2(nextPos.y - _.y, nextPos.x - _.x);
        const appliedDist = min(dist, _.s);

        _.x += appliedDist * cos(_.angle);
        _.y += appliedDist * sin(_.angle);

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
        _.a = 0;
        if (rnd() >= DROP_RATE) {
          var i = rndr(1, 6),
              x = _.x + (_.w / 2),
              y = _.b.b - 32;
          if (i === ITEMS.MEDIKIT) {
            $.g.i.add(new MediKit(x, y));
          } else if (i === ITEMS.AMMO) {
            $.g.i.add(new Ammo(x, y));
          } else if (i === ITEMS.PISTOL) {
            $.g.i.add(new Pistol(x, y));
          } else if (i === ITEMS.SHOTGUN) {
            $.g.i.add(new Shotgun(x, y));
          } else if (i === ITEMS.FLAME) {
            $.g.i.add(new Flame(x, y));
          }
        }
      }
    });
  };

  _.r = function(p) {
    $.x.s();
    $.x.fs('#00ff00');
    $.x.fr(p.x, p.y, _.w, _.h);

    //$.x.bp();
    //$.x.ss('#11c1fc');
    //$.x.arc(p.x + (_.w / 2), p.y + (_.h / 2), _.mindist, 0, 2 * PI);
    //$.x.k();

    //_.path.forEach(function(o) {
    //  var z = $.cam.transformCoordinates(new Rect(o.x, o.y, 32, 32));
    //  $.x.ss('#ff0000');
    //  $.x.sr(z.x, z.y, 32, 32);
    //});

    $.x.r();
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
