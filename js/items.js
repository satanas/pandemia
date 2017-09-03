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
    Syringe.draw(p.x, p.y, 0);
  };
}

Syringe.draw = function(x, y, bw) {
  var color = (bw) ? '#666' : '#4caf50';
  $.x.s();
    $.x.fs(color);
  $.x.fr(x + 13, y + 6, 7, 19);
  //$.x.fs('#9e9e9e');
  $.x.fs('#e6e6e6');
  $.x.fr(x + 11, y + 1, 10, 2);
  $.x.fr(x + 15, y + 3, 3, 3);
  $.x.fr(x + 9, y + 8, 14, 2);
  $.x.fr(x + 16, y + 26, 1, 6);
  $.x.r();
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
    _.draw(p.x, p.y, _.anim.g());
  }

  _.draw = function(x, y, f, bw) {
    lqColor = (bw) ? '#666' : _.liquidColor;

    $.x.s();
    $.x.bp();
    $.x.fs('#e6e6e6');
    $.x.mv(x + 12, y + 16);
    $.x.lt(x + 2, y + 30);
    $.x.lt(x + 31, y + 30);
    $.x.lt(x + 21, y + 16);
    $.x.lt(x + 12, y + 16);
    $.x.fill();
    $.x.fr(x + 13, y + 3, 8, 13);
    $.x.fr(x + 12, y + 1, 10, 2);
    $.x.fs(lqColor);
    $.x.bp();
    if (f === 0) {
      $.x.mv(x + 7, y + 23);
      $.x.lt(x + 2, y + 30);
      $.x.lt(x + 31, y +  30);
      $.x.lt(x + 25, y +  21);
      $.x.lt(x + 18, y +  21);
      $.x.lt(x + 16, y +  23);
      $.x.lt(x + 7, y + 23);
    } else {
      $.x.mv(x + 9, y + 21);
      $.x.lt(x + 2, y + 30);
      $.x.lt(x + 31, y +  30);
      $.x.lt(x + 26, y +  23);
      $.x.lt(x + 19, y +  23);
      $.x.lt(x + 17, y +  21);
      $.x.lt(x + 9, y + 21);
    }
    $.x.fill();
    $.x.r();
  };
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


