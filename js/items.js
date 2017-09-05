var MediKit = function(x, y) {
  var _ = this;

  _.type = ITEMS.MEDIKIT;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#ffffff');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.fs('#ff0000');
    $.x.fr(p.x + 12, p.y + 6, 8, 20);
    $.x.fr(p.x + 6, p.y + 12, 20, 8);
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
        $.x.fs('#ff0000');
      } else {
        $.x.fs('#ffffff');
      }
    } else {
      $.x.fs('#ffffff');
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
