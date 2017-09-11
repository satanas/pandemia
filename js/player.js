var Player = function(x, y) {
  var _ = this;
  _.mxs = 0; // Max speed
  _.d = DIR.LEFT; // Direction
  _.s = 0.35; // Speed

  _.dx = 0;
  _.dy = 0;
  _.ic = 0; // Invincibility counter
  _.hum = 100; // Humanity
  _.hd = _.hum / (7 * 60); // Humanity decay 7 min
  _.hc = 0; // healing counter
  _.vaccine = 0;
  _.an = 0;
  _.ammo = 500;

  _.skinColor = '#ffe499';
  _.hairColor = '#795548';
  _.aim = new Point(0, 0);
  _.wpn = WPN.MG;
  _.anim = new Animator([0, 1], 150);

  //var x = room.x + (room.w / 2) - 32,
  //    y = room.y + (room.h / 2) - 32;

  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.u = function() {
    if ($.scn.game.end !== 0) return;

    if (_.hc > 0) {
      _.hc = iir(_.hc - $.e, 0);
    } else {
      _.hum = iir(_.hum - ($.e * _.hd / 1000), 0.1);
    }
    _.mxs = iir(-1.5 + (_.hum / 10), MIN_PS);
    _.sd = iir(_.sd - $.e, 0);
    _.anim.u();

    if (_.ic > 0) {
      _.ic = iir(_.ic - $.e, 0);
    }

    if ($.in.p(IN.L)) {
      _.d = DIR.LEFT;
      _.dx -= _.s;
    } else if ($.in.p(IN.R)) {
      _.d = DIR.RIGHT;
      _.dx += _.s;
    }

    if ($.in.p(IN.U)) {
      _.d = DIR.UP;
      _.dy -= _.s;
    } else if ($.in.p(IN.D)) {
      _.d = DIR.DOWN;
      _.dy += _.s;
    }

    _.dx = iir(_.dx, -_.mxs, _.mxs);
    _.dy = iir(_.dy, -_.mxs, _.mxs);

    if (!$.in.p(IN.L) && !$.in.p(IN.R)) {
      _.dx = 0;
    }
    if (!$.in.p(IN.U) && !$.in.p(IN.D)) {
      _.dy = 0;
    }

    _.x += _.dx;
    _.y += _.dy;

    // Checking world limit collisions
    _.x = iir(_.x, 0, $.cam.ww - _.w);
    _.y = iir(_.y, 0, $.cam.wh - _.h);

    _.updateRect();

    // Collisions with walls
    // p = Player
    // w = Wall
    $.g.w.c(_, function(p, w) {
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
    if (_.ic === 0) {
      $.g.z.c(_, function(p, z) {
        _.hum -= z.bite();
        _.ic = INV_TIME;
        _.drop();
        $.scn.game.be = 30;
        //$.ss.shake(1.8, 200)
        $.sn.p('ph');
        if (_.hum > 0) {
        } else {
          $.scn.game.over();
        }
      });
    }

    // Collisions with items
    $.g.i.c(_, function(p, i) {
      i.a = 0;
      $.sn.p('it');
      if (i.t === IT.A) {
        _.ammo += AMMO;
      } else {
        if (i.t === IT.M) {
          _.wpn = WPN.MG;
        } else if (i.t === IT.S) {
          _.wpn = WPN.SG;
        } else if (i.t === IT.F) {
          _.wpn = WPN.FL;
        }
      }
    });

    // If the player doesn't have the vaccine, we check for collisions with the vaccine box
    if (!_.vaccine) {
      $.g.x.c(_, function(p, b) {
        if (b.isPickable()) {
          $.sn.p('vp');
          b.pick();
          _.vaccine = b;
        }
        var s = $.scientist;
        if (s.st === 1) {
          s.n();
        }
      });
    }
    if (_.vaccine) {
      _.vaccine.x = _.x + 16;
      _.vaccine.y = _.y;
    }

    // Collisions with zones/sensors
    $.g.h.c(_, function(p, z) {
      if (z.end && _.vaccine && !z.o) {
        // Stop all the zombies, fade out, etc
        $.scn.game.win();
      } else if (z.intro) {
        if ($.scn.game.tries) return;
        var s = $.scientist;
        if (s.st === 0) s.n();
      } else if (z.start) {
        if (!$.scn.game.tries) {
          if (_.vaccine) {
            $.scn.game.nz();
          } else {
            z.al();
          }
        } else {
          $.scn.game.nz();
        }
      }
    });

    _.updateRect();

    if (_.shooting && !_.sd) _.shoot();
  };

  _.r = function(p) {
    // Render vaccine first if the player is heading up to cover the box
    // with the head of the char
    if (_.d === DIR.UP) {
      if (_.vaccine) {
        Vaccine.d(p.x + 16, p.y - 6);
      } else {
        // Hands
        $.x.fs(HC);
        $.x.fr(p.x + 9, p.y + 44, 7, 5);
        $.x.fr(p.x + 50, p.y + 44, 7, 5);
      }
    }
    // Head
    $.x.fs('#ffca85');
    $.x.fr(p.x + 2, p.y, 62, 38);
    // Chest
    $.x.fs('#727254');
    $.x.fr(p.x + 16, p.y + 38, 34, 13);
    // Waist
    $.x.fs('#203622');
    $.x.fr(p.x + 16, p.y + 50, 34, 5);
    // Feet
    // If the player is stopped
    if (!_.dx && !_.dy) {
      $.x.fr(p.x + 16, p.y + 55, 14, 8);
      $.x.fr(p.x + 36, p.y + 55, 14, 8);
    } else if (_.anim.g()) {
      $.x.fr(p.x + 16, p.y + 55, 14, 8);
    } else if (!_.anim.g()) {
      $.x.fr(p.x + 36, p.y + 55, 14, 8);
    }

    if (_.d === DIR.UP || _.d === DIR.DOWN) {
      // Arms
      $.x.fs(AC);
      $.x.fr(p.x + 9, p.y + 39, 7, 5);
      $.x.fr(p.x + 50, p.y + 39, 7, 5);
    }
    if (_.d === DIR.DOWN) {
      // Hands
      $.x.fs(HC);
      $.x.fr(p.x + 9, p.y + 44, 7, 5);
      $.x.fr(p.x + 50, p.y + 44, 7, 5);
      // Face
      $.x.fs(FC);
      $.x.fr(p.x + 15, p.y + 19, 6, 6);
      $.x.fr(p.x + 45, p.y + 19, 6, 6);
      $.x.fr(p.x + 27, p.y + 31, 12, 2);
      if (_.vaccine) {
        Vaccine.d(p.x + 16, p.y + 16);
      }
    } else if (_.d === DIR.LEFT) {
      // Arms
      $.x.fs(AC);
      $.x.fr(p.x + 11, p.y + 40, 16, 7);
      // Hands
      $.x.fs(HC);
      $.x.fr(p.x + 5, p.y + 40, 6, 7);
      if (_.vaccine) {
        Vaccine.d(p.x - 30, p.y + 16);
      }
      // Face
      $.x.fs(FC);
      $.x.fr(p.x + 10, p.y + 19, 6, 6);
      $.x.fr(p.x + 4, p.y + 31, 4, 2);
    } else if (_.d === DIR.RIGHT) {
      // Arms
      $.x.fs(AC);
      $.x.fr(p.x + 39, p.y + 40, 16, 7);
      // Hands
      $.x.fs(HC);
      $.x.fr(p.x + 55, p.y + 40, 6, 7);
      if (_.vaccine) {
        Vaccine.d(p.x + 62, p.y + 16);
      }
      // Face
      $.x.fs(FC);
      $.x.fr(p.x + 50, p.y + 19, 6, 6);
      $.x.fr(p.x + 58, p.y + 31, 4, 2);
    }

    // debug
    //$.x.lw(1);
    //var c = _.offc(p),
    //    mag = 100
    //$.x.ss(RD);
    //$.x.bp();
    //$.x.mv(c.x, c.y);
    //$.x.lt(c.x + (mag * cos(_.an)), c.y + (mag * sin(_.an)));
    //$.x.k();
  }

  _.shoot = function() {
    if (!_.ammo) return;
    _.drop();
    _.sd = _.wpn.DL; // shoot delay
    var i, c = _.getCenter();
    _.ammo -= 1;
    $.g.b.add(new Bullet(c.x, c.y, _.an, _.wpn));
    if (_.wpn.ID === WPN.SG.ID) {
      for (i=4;i--;) {
        $.g.b.add(new Bullet(c.x, c.y, _.an + (rndr(4, 15) * PI / 180), _.wpn));
        _.ammo = iir(_.ammo - 1, 0);
      }
      $.sn.p('sh');
    } else if (_.wpn.ID === WPN.FL.ID) {
      $.sn.p('fl');
    } else {
      $.sn.p('gu');
    }
  }

  _.reset = function(x, y) {
    _.x = x;
    _.y = y;
    _.vaccine = 0;
  }

  _.drop = function() {
    if (_.vaccine) {
      _.vaccine.drop(_);
      _.vaccine = 0;
    }
  }

  _.getCenter = function() {
    // p is the transformed point of the sprite
    return new Point(_.x + (_.w / 2), _.y + (_.h / 2));
  }

  // Get offset center
  _.offc = function(p) {
    // p is the transformed point of the sprite
    return new Point(p.x + (_.w * _.scaleX / 2), p.y + (_.h * _.scaleY / 2));
  }

  _.uAim = function(e) {
    var rect = $.cv.getBoundingClientRect(),
        p = $.cam.txPCoord(_.x, _.y), // transform coordinates to viewport coords
        c = _.offc(p);

    _.scaleX = $.cv.width / rect.width;
    _.scaleY = $.cv.height / rect.height;

    _.aim.x = (e.clientX - rect.left) * _.scaleX;
    _.aim.y = (e.clientY - rect.top) * _.scaleY;
    _.an = atan2((_.aim.y - c.y), (_.aim.x - c.x));
  }

  _.dAim = function() {
    $.x.fs(RD);
    $.x.bp();
    $.x.arc(_.aim.x, _.aim.y, 2, 0, 2 * PI);
    $.x.cp();
    $.x.f();
    $.x.fr(_.aim.x - 2, _.aim.y - 18, 5, 12);
    $.x.fr(_.aim.x - 2, _.aim.y + 7, 5, 12);
    $.x.fr(_.aim.x - 18, _.aim.y - 2, 12, 5);
    $.x.fr(_.aim.x + 7, _.aim.y - 2, 12, 5);
  }

  $.cv.addEventListener('mousemove', function(e) {
    _.uAim(e);
  }, false);

  $.cv.addEventListener('mousedown', function(e) {
    _.shooting = 1;
  });

  $.cv.addEventListener('mouseup', function(e) {
    _.shooting = 0;
  });
};
