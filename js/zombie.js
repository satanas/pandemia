var Zombie = function(x, y, s) {
  var _ = this;
  _.mindist = 500; // min distance to start chasing the player
  _.path = []; // points of path
  _.ctimer = 300; // check time in ms
  _.cc = 0; // time counter before checking new route
  _.an = 0;
  _.tp = 0; // Tracking pos
  _.bc = 0; // biting counter
  _.s = rnd() + MIN_ZS; // speed
  _.hsc = 0; // hurt sound counter
  _.gc = rndr(0, 4000); // growl counter
  _.d = 'd'; // direction
  _.anim = new Animator([0, 1]);
  _.sol = s; // If sol = true, means that this zombie was a soldier before and should have more health
  _.health = (s) ? 50 : rndr(3, 5);

  _.inherits(Sprite);
  _.inherits(AStar);
  Sprite.call(_, x, y, 64, 64);
  AStar.call(_, $.lvl.ww, $.lvl.wh);

  _.u = function() {
    if ($.scn.game.end === 2) return;

    // TODO: Move the seek behavior to a separated file inside ai folder
    _.cc += $.e;
    _.hsc = iir(_.hsc - $.e, 0);
    _.gc = iir(_.gc - $.e, 0);
    _.bc = iir(_.bc - $.e, 0);

    if (!_.gc && (rnd() > 0.98) && _.tp) {
      $.sn.p('zg');
      _.gc = rndr(1000, 4000);
    }
    var d = _.getdist(_, $.player); // distance in pixels between zombie and player

    // The zombie doesn't have a path to walk
    if (!_.bc) {
      if (_.path.length === 0) {
        if ((d <= _.mindist) && (round(d) > 40)) {
          _.path = _.findpath(_, $.player, MAX_ZPD);
          _.tp = new Point($.player.x, $.player.y);
        }
      } else {
        if (d > _.mindist) {
          _.tp = null;
          _.path = [];
          return;
        }
        var np = _.path[0], // next pos
            dist = _.getdist(_, np),
            ad, // Applied dist
            dx, dy;
        _.anim.u();
        // The zombie reached the current node
        if (dist === 0) {
          // We remove the current node from the path and let the walking continue
          _.path.shift();
        } else {
          _.an = atan2(np.y - _.y, np.x - _.x);
          ad = min(dist, _.s);
          dx = ad * cos(_.an);
          dy = ad * sin(_.an);

          if (abs(dx) > abs(dy)) {
            _.d = (dx < 0) ? DIR.LEFT : DIR.RIGHT;
          } else {
            _.d = (dy < 0) ? DIR.UP : DIR.DOWN;
          }

          _.x += dx;
          _.y += dy;

          _.updateRect();

          // Recalculate path if destination point changed
          if (_.cc >= _.ctimer && _.tp !== null && ($.player.x !== _.tp.x || $.player.y !== _.tp.y)) {
            _.clrPath();
          }
        }
      }
    }

    // Collisions with bullets
    $.g.b.c(_, function(p, b) {
      if (b.type !== WPN.FL.ID) b.a = 0;
      _.health -= 1;

      if (_.health <= 0) {
        $.sn.p('zd');
        _.a = 0;
        // Create explosion in NPC groups to avoid the need of creating a new one
        $.g.n.add(new Exp(_.x, _.y));
        if (rnd() >= DROP) {
          var i = rndr(3, 6),
              x = _.x,
              y = _.y;
          // Probability: 0-8 ammo, 9-10 weapon
          if (rnd() <= 0.8) {
            $.g.i.add(new Ammo(x, y));
          } else {
            if (i === IT.M) {
              $.g.i.add(new Gun(x, y));
            } else if (i === IT.S) {
              $.g.i.add(new Shotgun(x, y));
            } else if (i === IT.F) {
              $.g.i.add(new Flame(x, y));
            }
          }
        }
      } else {
        if (!_.hsc) {
          $.sn.p('zh');
          _.hsc = 700;
        }
      }
    });

    $.g.h.c(_, function(p, z) {
      if (z.end) {
        z.occ(); // Occupy safe zone to avoid delivering the vaccine
      }
    });
  };

  _.r = function(p) {
    Zombie.d(p.x, p.y, _.d, _.tp, _.anim, _.sol);
  }
  _.bite = function() {
    _.bc = rndr(MIN_BD, MIN_BD + 200);
    return rndr(4, 8);
  }

  _.clrPath = function() {
    _.path.splice(1, _.path.length);
    _.cc = 0;
  };
};

Zombie.d = function(x, y, d, tp, an, sol) {
  var cc, wc, ac, hc, bc; // Chest, waist, arms, head, face and body colors
  hc = '#84ae8d';
  if (sol) {
    bc = '#607d8b';
    cc = '#727254';
    wc = '#203622';
    ac = AC;
  } else {
    bc = '#a0d6ab';
    cc = '#83bd90';
    wc = '#8b938d';
    ac = '#8ecc9b';
  }
  // Head
  $.x.fs(bc);
  $.x.fr(x + 2, y, 62, 38);
  // Chest
  $.x.fs(cc);
  $.x.fr(x + 16, y + 38, 34, 13);
  // Waist
  $.x.fs(wc);
  $.x.fr(x + 16, y + 50, 34, 5);
  // Feet
  // If the zombie is stopped
  if (!tp) {
    $.x.fr(x + 16, y + 55, 14, 8);
    $.x.fr(x + 36, y + 55, 14, 8);
  } else if (an){
    if (an.g()) {
      $.x.fr(x + 16, y + 55, 14, 8);
    } else {
      $.x.fr(x + 36, y + 55, 14, 8);
    }
  }

  if (d === DIR.UP) {
    // Arms
    $.x.fs(ac);
    $.x.fr(x + 9, y + 39, 7, 5);
    $.x.fr(x + 50, y + 39, 7, 5);
  } else if (d === DIR.DOWN) {
    // Arms
    $.x.fs(ac);
    $.x.fr(x + 9, y + 39, 7, 10);
    $.x.fr(x + 50, y + 39, 7, 10);
    // Hands
    $.x.fs(hc);
    $.x.fr(x + 9, y + 49, 7, 5);
    $.x.fr(x + 50, y + 49, 7, 5);
    // Face
    $.x.fs(FC);
    $.x.fr(x + 15, y + 19, 6, 6);
    $.x.fr(x + 45, y + 19, 6, 6);
    $.x.fr(x + 32, y + 26, 2, 9);
    $.x.fr(x + 27, y + 31, 12, 2);
  } else if (d === DIR.LEFT) {
    // Arms
    $.x.fs(ac);
    $.x.fr(x + 11, y + 40, 16, 7);
    // Hands
    $.x.fs(hc);
    $.x.fr(x + 5, y + 40, 6, 7);
    // Face
    $.x.fs(FC);
    $.x.fr(x + 10, y + 19, 6, 6);
    $.x.fr(x + 2, y + 26, 2, 9);
    $.x.fr(x + 4, y + 31, 4, 2);
  } else if (d === DIR.RIGHT) {
    // Arms
    $.x.fs(ac);
    $.x.fr(x + 39, y + 40, 16, 7);
    // Hands
    $.x.fs(hc);
    $.x.fr(x + 55, y + 40, 6, 7);
    // Face
    $.x.fs(FC);
    $.x.fr(x + 50, y + 19, 6, 6);
    $.x.fr(x + 62, y + 26, 2, 9);
    $.x.fr(x + 58, y + 31, 4, 2);
  }
};
