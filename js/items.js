var Ammo = function(x, y) {
  var _ = this;

  _.t = IT.A;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    Ammo.d(p.x, p.y);
  };
}

Ammo.d = function(x, y) {
  $.x.fs('#f6de88');
  $.x.fr(x, y, 32, 6);
  $.x.fs('#f2c010');
  $.x.fr(x, y + 6, 32, 6);
  $.x.fs('#9b4a0e');
  $.x.fr(x, y + 12, 32, 20);
  $.x.fs('#571a08');
  $.x.fr(x + 7, y, 6, 32);
  $.x.fr(x + 20, y, 6, 32);
  $.x.fs('#121212');
  $.x.fr(x, y + 27, 32, 5);
}

var Gun = function(x, y) {
  var _ = this;

  _.t = IT.M;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    Gun.d(p.x, p.y);
  };
}

Gun.d = function(x, y) {
  $.x.fs(FC);
  $.x.fr(x + 8, y + 14, 51, 9);
  $.x.fs('#2b2b2b');
  $.x.fr(x, y + 23, 64, 6);
  $.x.fr(x, y + 28, 4, 4);
  $.x.fr(x + 8, y + 28, 51, 4);
  $.x.fr(x + 12, y + 32, 42, 4);
  $.x.fr(x + 20, y + 36, 4, 4);
  $.x.fr(x + 8, y + 36, 11, 8);
  $.x.fr(x + 4, y + 40, 11, 8);
  $.x.fr(x + 28, y + 36, 10, 21);
  $.x.fr(x + 46, y + 36, 8, 14);
  $.x.fr(x + 12, y + 10, 8, 4);
  $.x.fr(x + 52, y + 10, 4, 4);
}

var Shotgun = function(x, y) {
  var _ = this;

  _.t = IT.S;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    Shotgun.d(p.x, p.y);
  };
}

Shotgun.d = function(x, y) {
  $.x.fs('#9e9e9e');
  $.x.fr(x + 12, y + 19, 52, 8);
  $.x.fr(x + 57, y + 11, 4, 8);
  $.x.fs(FC);
  $.x.fr(x + 12, y + 27, 52, 8);
  $.x.fs('#795548');
  $.x.fr(x, y + 31, 8, 24);
  $.x.fr(x + 4, y + 27, 8, 24);
  $.x.fr(x + 12, y + 35, 35, 8);
}

var Flame = function(x, y) {
  var _ = this;

  _.t = IT.F;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.r = function(p) {
    Flame.d(p.x, p.y);
  };
}

Flame.d = function(x, y) {
  $.x.fs('#f44336');
  $.x.fr(x + 10, y + 13, 30, 10);
  $.x.fs('#ffeb3b');
  $.x.fr(x + 40, y + 13, 4, 10);
  $.x.fs(BL);
  $.x.fr(x, y + 18, 4, 23);
  $.x.fr(x, y + 22, 64, 4);
  $.x.fr(x + 11, y + 18, 21, 4);
  $.x.fr(x, y + 26, 45, 6);
  $.x.fr(x + 5, y + 32, 5, 17);
  $.x.fr(x + 10, y + 32, 7, 4);
  $.x.fr(x + 8, y + 44, 7, 9);
  $.x.fr(x + 15, y + 44, 10, 3);
  $.x.fr(x + 21, y + 32, 4, 12);
}

var Vaccine = function(x, y) {
  var _ = this;
  _.pk = 0; // picked flag
  _.anim = new Animator([0, 1]);
  _.pd = 0;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.u = function() {
    _.anim.u();
    _.pd = iir(_.pd - $.e, 0);
    _.updateRect();
  }

  _.r = function(p) {
    if (_.pk) return;

    if (_.pd > 0) {
      if (_.anim.g()) {
        $.x.fs(RD);
        $.x.fr(p.x, p.y, _.w, _.h);
      } else {
        Vaccine.d(p.x, p.y);
      }
    } else {
      Vaccine.d(p.x, p.y);
    }
  };

  _.isPickable = function() {
    return !_.pd;
  }

  _.pick = function() {
    _.pk = 1;
  };

  _.drop = function(p) {
    // p = player position
    _.pk = 0;
    $.sn.p('vd');
    _.pd = VACC_PD;
    _.x = p.x + 16;
    _.y = p.b.b - 32;
  }
}

// d is the direction of the render
Vaccine.d = function(x, y, d) {
  $.x.fs('#3f51b5');
  $.x.fr(x, y, 32, 32);
  $.x.fs('#4caf50');
  $.x.fr(x + 13, y + 6, 7, 19);
  $.x.fs('#9e9e9e');
  $.x.fr(x + 11, y + 1, 10, 2);
  $.x.fr(x + 15, y + 3, 3, 3);
  $.x.fr(x + 9, y + 8, 14, 2);
  $.x.fr(x + 16, y + 26, 1, 6);
}
