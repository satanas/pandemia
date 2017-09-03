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

var Bottle = function(x, y) {
  var _ = this;
  _.anim = new Animator([0, 1, 2], 250);
  _.inherits(Sprite);
  Sprite.call(_, x, y, 32, 32);

  _.u = function() {
    _.anim.u();
  };

  _.r = function(p) {
    $.x.s();
    $.x.bp();
    $.x.fs('#e6e6e6');
    $.x.mv(p.x + 12, p.y + 16);
    $.x.lt(p.x + 2, p.y + 30);
    $.x.lt(p.x + 31, p.y + 30);
    $.x.lt(p.x + 21, p.y + 16);
    $.x.lt(p.x + 12, p.y + 16);
    $.x.fill();
    $.x.fr(p.x + 13, p.y + 3, 8, 13);
    $.x.fr(p.x + 12, p.y + 1, 10, 2);
    $.x.fs(_.liquidColor);
    $.x.bp();
    if (_.anim.g() === 0) {
      $.x.mv(p.x + 7, p.y + 23);
      $.x.lt(p.x + 2, p.y + 30);
      $.x.lt(p.x + 31, p.y +  30);
      $.x.lt(p.x + 25, p.y +  21);
      $.x.lt(p.x + 18, p.y +  21);
      $.x.lt(p.x + 16, p.y +  23);
      $.x.lt(p.x + 7, p.y + 23);
    } else {
      $.x.mv(p.x + 9, p.y + 21);
      $.x.lt(p.x + 2, p.y + 30);
      $.x.lt(p.x + 31, p.y +  30);
      $.x.lt(p.x + 26, p.y +  23);
      $.x.lt(p.x + 19, p.y +  23);
      $.x.lt(p.x + 17, p.y +  21);
      $.x.lt(p.x + 9, p.y + 21);
    }
    $.x.fill();
    $.x.r();
  }
}

var Antigens = function(x, y) {
  var _ = this;

  _.type = ITEMS.ANTIGENS;
  _.liquidColor = '#ff30c1';
  _.inherits(Bottle);
  Bottle.call(_, x, y);
}

var Stabilizers = function(x, y) {
  var _ = this;

  _.type = ITEMS.STABILIZERS;
  _.liquidColor = '#30f8ff';
  _.inherits(Bottle);
  Bottle.call(_, x, y);
}

var Antibiotics = function(x, y) {
  var _ = this;

  _.type = ITEMS.ANTIBIOTICS;
  _.liquidColor = '#ff8d30';
  _.inherits(Bottle);
  Bottle.call(_, x, y);
}

var Adjuvants = function(x, y) {
  var _ = this;

  _.type = ITEMS.ADJUVANTS;
  _.liquidColor = '#917c6b';
  _.inherits(Bottle);
  Bottle.call(_, x, y);
}


