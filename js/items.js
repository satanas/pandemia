var MediKit = function(x, y) {
  var _ = this;

  _.type = ITEMS.MEDIKIT;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.fs('#fff');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.fs('#f00');
    $.x.fr(p.x + 12, p.y + 6, 8, 20);
    $.x.fr(p.x + 6, p.y + 12, 20, 8);
  };
}

var Ammo = function(x, y) {
  var _ = this;

  _.type = ITEMS.AMMO;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.fs('#00f');
    $.x.fr(p.x, p.y, _.w, _.h);
  };
}

var Pistol = function(x, y) {
  var _ = this;

  _.type = ITEMS.PISTOL;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.fs('#0aa');
    $.x.fr(p.x, p.y, _.w, _.h);
  };
}

var Shotgun = function(x, y) {
  var _ = this;

  _.type = ITEMS.SHOTGUN;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.fs('#a0a');
    $.x.fr(p.x, p.y, _.w, _.h);
  };
}

var Flame = function(x, y) {
  var _ = this;

  _.type = ITEMS.FLAME;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.fs('#aa0');
    $.x.fr(p.x, p.y, _.w, _.h);
  };
}

var Vaccine = function(x, y) {
  var _ = this;
  _.anim = new Animator([0, 1], 100);
  _.pickupDelay = 0;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.u = function() {
    _.anim.u();
    _.pickupDelay = iir(_.pickupDelay - $.e, 0);
    _.updateRect();
  }

  _.r = function(p) {
    if (_.pickupDelay > 0) {
      if (_.anim.g()) {
        $.x.fs('#f00');
      } else {
        $.x.fs('#fff');
      }
    } else {
      $.x.fs('#fff');
    }
    $.x.fr(p.x, p.y, _.w, _.h);
  };

  _.isPickable = function() {
    return !_.pickupDelay;
  }

  _.drop = function(p) {
    // p = player position
    $.sn.p('vd');
    _.pickupDelay = VACCINE_PICKUP_DELAY;
    _.x = p.x + 16;
    _.y = p.b.b - 32;
  }
}
