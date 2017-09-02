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

var Syringe = function(x, y) {
  var _ = this;

  _.type = ITEMS.SYRINGE;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#4caf50');
    $.x.fr(p.x + 13, p.y + 6, 7, 19);
    $.x.fs('#9e9e9e');
    $.x.fr(p.x + 11, p.y + 1, 10, 2);
    $.x.fr(p.x + 15, p.y + 3, 3, 3);
    $.x.fr(p.x + 9, p.y + 8, 14, 2);
    $.x.fr(p.x + 16, p.y + 26, 1, 6);
    $.x.r();
  };
}

var Antigens = function(x, y) {
  var _ = this;

  _.type = ITEMS.ANTIGENS;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#ff30c1');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
}

var Stabilizers = function(x, y) {
  var _ = this;

  _.type = ITEMS.STABILIZERS;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#30f8ff');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
}

var Antibiotics = function(x, y) {
  var _ = this;

  _.type = ITEMS.ANTIBIOTICS;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#ff8d30');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
}

var Adjuvants = function(x, y) {
  var _ = this;

  _.type = ITEMS.ADJUVANTS;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#917c6b');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
}


