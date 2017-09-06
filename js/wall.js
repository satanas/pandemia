var Wall = function(x, y) {
  var _ = this;

  _.inherits(Sprite);
  Sprite.call(_, x, y, GRID_SIZE, GRID_SIZE);

  _.r = function(p) {
    $.x.s();
    $.x.fs('#ffff00');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
};

var Barricade = function(x, y) {
  var _ = this;

  _.health = rndr(4, 6);
  _.inherits(Sprite);
  Sprite.call(_, x, y, GRID_SIZE, GRID_SIZE);

  _.u = function() {
    $.g.b.c(_, function(w, b) {
      _.health -= 1;
      if (_.health <= 0) _.a = 0;
    });
  }

  _.r = function(p) {
    $.x.s();
    $.x.fs('#f0f');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  }
};
