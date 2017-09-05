var MediKit = function(x, y) {
  var _ = this;

  _.type = ITEMS.MEDIKIT;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#fff');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.fs('#f00');
    $.x.fr(p.x + 12, p.y + 6, 8, 20);
    $.x.fr(p.x + 6, p.y + 12, 20, 8);
    $.x.r();
  };
}

var Ammo = function(x, y) {
  var _ = this;

  _.type = ITEMS.AMMO;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#00f');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  };
}

var Pistol = function(x, y) {
  var _ = this;

  _.type = ITEMS.PISTOL;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#0aa');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  };
}

var Shotgun = function(x, y) {
  var _ = this;

  _.type = ITEMS.SHOTGUN;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#a0a');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  };
}

var Flame = function(x, y) {
  var _ = this;

  _.type = ITEMS.FLAME;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#aa0');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
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
    $.x.s();
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
    $.x.r();
  };

  _.isPickable = function() {
    return !_.pickupDelay;
  }

  _.drop = function(p) {
    // p = player position
    _.pickupDelay = VACCINE_PICKUP_DELAY;
    _.x = p.x + 16;
    _.y = p.b.b - 32;
  }
}
