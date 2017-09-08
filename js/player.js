var Player = function(x, y) {
  var _ = this;
  _.mxs = 0; // max speed
  _.d = DIR.LEFT; // direction
  _.s = 0.35; // speed

  _.dx = 0;
  _.dy = 0;
  _.ic = 0; // invincibility counter
  _.humanity = 100;
  _.humanityDecay = _.humanity / (7 * 60); // 7 min
  _.hc = 0; // healing counter
  _.vaccine = 0;
  _.angle = 0;
  _.ammo = 500;

  _.skinColor = '#ffe499';
  _.hairColor = '#795548';
  _.aim = new Point(0, 0);
  _.weapon = WEAPONS.MG;
  _.anim = new Animator([0, 1], 150);

  //var x = room.x + (room.w / 2) - 32,
  //    y = room.y + (room.h / 2) - 32;

  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.u = function() {
    if (_.hc > 0) {
      _.hc = iir(_.hc - $.e, 0);
    } else {
      _.humanity = iir(_.humanity - ($.e * _.humanityDecay / 1000), 0.1);
    }
    _.mxs = iir(-1.5 + (_.humanity / 10), MIN_PLAYER_SPEED);
    _.shotDelay = iir(_.shotDelay - $.e, 0);
    _.anim.u();

    if (_.ic > 0) {
      _.ic = iir(_.ic - $.e, 0);
      // Slow down 20% if recovering
      // _.mxs = iir(_.mxs - (_.mxs * 0.2), MIN_PLAYER_SPEED);
    }

    if ($.in.p(INPUT.LEFT)) {
      _.d = DIR.LEFT;
      _.dx -= _.s;
    } else if ($.in.p(INPUT.RIGHT)) {
      _.d = DIR.RIGHT;
      _.dx += _.s;
    }

    if ($.in.p(INPUT.UP)) {
      _.d = DIR.UP;
      _.dy -= _.s;
    } else if ($.in.p(INPUT.DOWN)) {
      _.d = DIR.DOWN;
      _.dy += _.s;
    }

    _.dx = iir(_.dx, -_.mxs, _.mxs);
    _.dy = iir(_.dy, -_.mxs, _.mxs);

    if (!$.in.p(INPUT.LEFT) && !$.in.p(INPUT.RIGHT)) {
      _.dx = 0;
    }
    if (!$.in.p(INPUT.UP) && !$.in.p(INPUT.DOWN)) {
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
        _.humanity -= z.bite();
        _.ic = INVINCIBILITY_TIME;
        _.dropVaccine();
        $.scn.game.be = 30;
        $.ss.shake(1.8, 200)
        $.sn.p('ph');
        if (_.humanity > 0) {
        } else {
          // game over
          $.sn.p('go');
        }
      });
    }

    // Collisions with items
    $.g.i.c(_, function(p, i) {
      i.a = 0;
      if (i.type === ITEMS.MEDIKIT) {
        _.hc = MEDIKIT_DURATION;
      } else if (i.type === ITEMS.AM) {
        _.ammo += AMMO_PER_BOX;
      } else {
        if (i.type === ITEMS.MG) {
          _.weapon = WEAPONS.MG;
        } else if (i.type === ITEMS.SG) {
          _.weapon = WEAPONS.SG;
        } else if (i.type === ITEMS.FL) {
          _.weapon = WEAPONS.FL;
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
      });
    }
    if (_.vaccine) {
      _.vaccine.x = _.x + 16;
      _.vaccine.y = _.y;
    }

    $.g.h.c(_, function(p, z) {
      if (z.end && _.vaccine) {
        // Stop all the zombies, fade out, etc
        console.log('you win');
      } else if (z.intro && _.vaccine) {
        $.scn.game.game();
      }
    });

    _.updateRect();

    if (_.shooting && !_.shotDelay) {
      _.shoot();
    }
    //console.log('bullets', $.g.b.e.length);
  };

  _.r = function(p) {
    // Render vaccine first if the player is heading up to cover the box
    // with the head of the char
    if (_.d === DIR.UP) {
      if (_.vaccine) {
        _.vaccine.draw(p.x + 16, p.y - 6);
      } else {
        // Hands
        $.x.fs('#f3c17f');
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
      $.x.fs('#4b4e44');
      $.x.fr(p.x + 9, p.y + 39, 7, 5);
      $.x.fr(p.x + 50, p.y + 39, 7, 5);
    }
    if (_.d === DIR.DOWN) {
      // Hands
      $.x.fs('#f3c17f');
      $.x.fr(p.x + 9, p.y + 44, 7, 5);
      $.x.fr(p.x + 50, p.y + 44, 7, 5);
      // Face
      $.x.fs('#5a5a5a');
      $.x.fr(p.x + 15, p.y + 19, 6, 6);
      $.x.fr(p.x + 45, p.y + 19, 6, 6);
      $.x.fr(p.x + 27, p.y + 31, 12, 2);
      if (_.vaccine) {
        _.vaccine.draw(p.x + 16, p.y + 16);
      }
    } else if (_.d === DIR.LEFT) {
      // Arms
      $.x.fs('#4b4e44');
      $.x.fr(p.x + 11, p.y + 40, 16, 7);
      // Hands
      $.x.fs('#f3c17f');
      $.x.fr(p.x + 5, p.y + 40, 6, 7);
      if (_.vaccine) {
        _.vaccine.draw(p.x - 30, p.y + 16);
      }
      // Face
      $.x.fs('#5a5a5a');
      $.x.fr(p.x + 10, p.y + 19, 6, 6);
      $.x.fr(p.x + 4, p.y + 31, 4, 2);
    } else if (_.d === DIR.RIGHT) {
      // Arms
      $.x.fs('#4b4e44');
      $.x.fr(p.x + 39, p.y + 40, 16, 7);
      // Hands
      $.x.fs('#f3c17f');
      $.x.fr(p.x + 55, p.y + 40, 6, 7);
      if (_.vaccine) {
        _.vaccine.draw(p.x + 62, p.y + 16);
      }
      // Face
      $.x.fs('#5a5a5a');
      $.x.fr(p.x + 50, p.y + 19, 6, 6);
      $.x.fr(p.x + 58, p.y + 31, 4, 2);
    }

    // debug
    $.x.lineWidth = 1;
    var c = _.getCenter(p),
        mag = 100
    $.x.ss('#f00');
    $.x.bp();
    $.x.mv(c.x, c.y);
    $.x.lt(c.x + (mag * cos(_.angle)), c.y + (mag * sin(_.angle)));
    $.x.k();
  }

  _.shoot = function() {
    if (!_.ammo) {
      return
    }
    _.dropVaccine();
    _.shotDelay = _.weapon.DELAY;
    var c = _.getCenter();
    _.ammo -= 1;
    $.g.b.add(new Bullet(c.x, c.y, _.angle, _.weapon));
    if (_.weapon.ID === WEAPONS.SG.ID) {
      $.g.b.add(new Bullet(c.x, c.y, _.angle + (rndr(4, 15) * PI / 180), _.weapon));
      $.g.b.add(new Bullet(c.x, c.y, _.angle - (rndr(4, 15) * PI / 180), _.weapon));
      _.ammo = iir(_.ammo - 2, 0);
      $.sn.p('sh');
    } else if (_.weapon.ID === WEAPONS.FL.ID) {
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

  _.dropVaccine = function() {
    if (_.vaccine) {
      _.vaccine.drop(_);
      _.vaccine = 0;
    }
  }

  _.getCenter = function() {
    // p is the transformed point of the sprite
    return new Point(_.x + (_.w / 2), _.y + (_.h / 2));
  }

  _.getOffsetCenter = function(p) {
    // p is the transformed point of the sprite
    return new Point(p.x + (_.w * _.scaleX / 2), p.y + (_.h * _.scaleY / 2));
  }

  _.updateAim = function(e) {
    var rect = $.cv.getBoundingClientRect(),
        p = $.cam.transformPointCoordinates(_.x, _.y), // transform coordinates to viewport coords
        c = _.getOffsetCenter(p);

    _.scaleX = $.cv.width / rect.width;
    _.scaleY = $.cv.height / rect.height;

    _.aim.x = (e.clientX - rect.left) * _.scaleX;
    _.aim.y = (e.clientY - rect.top) * _.scaleY;
    _.angle = atan2((_.aim.y - c.y), (_.aim.x - c.x));
  }

  _.drawAim = function() {
    $.x.fs('#f00');
    $.x.bp();
    $.x.arc(_.aim.x, _.aim.y, 2, 0, 2 * PI);
    $.x.cp();
    $.x.f();
    $.x.fr(_.aim.x, _.aim.y - 14, 1, 8);
    $.x.fr(_.aim.x, _.aim.y + 7, 1, 8);
    $.x.fr(_.aim.x - 14, _.aim.y, 8, 1);
    $.x.fr(_.aim.x + 7, _.aim.y, 8, 1);
  }

  $.cv.addEventListener('mousemove', function(e) {
    _.updateAim(e);
  }, false);

  $.cv.addEventListener('mousedown', function(e) {
    _.shooting = 1;
  });

  $.cv.addEventListener('mouseup', function(e) {
    _.shooting = 0;
  });
};
