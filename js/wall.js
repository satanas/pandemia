var Wall = function(x, y) {
  var _ = this;

  _.inherits(Sprite);
  Sprite.call(_, x, y, GRID_SIZE, GRID_SIZE);

  _.r = function(p) {
    $.x.fs('#888');
    $.x.fr(p.x, p.y, _.w, _.h);
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
      if (_.health <= 0) {
        _.a = 0;
        $.sn.p('ex');
      }
    });
  }

  _.r = function(p) {
    $.x.fs('#f0f');
    $.x.fr(p.x, p.y, _.w, _.h);
  }
};

var Floor = function(x, y) {
  var _ = this;

  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.r = function(p) {
    $.x.fillStyle = '#433641';
    $.x.fillRect(p.x, p.y, 32, 32);
    $.x.fillRect(p.x + 32, p.y + 32, 64, 64);
    $.x.fillStyle = '#50434e';
    $.x.fillRect(p.x + 32, p.y, 64, 32);
    $.x.fillRect(p.x, p.y + 32, 32, 64);

    $.x.fillStyle = '#4b3746';
    $.x.fillRect(p.x, p.y, 32, 4);
    $.x.fillRect(p.x + 32, p.y + 32, 32, 4);
    $.x.fillStyle = '#3e2a3e';
    $.x.fillRect(p.x + 32, p.y, 32, 4);
    $.x.fillRect(p.x, p.y + 32, 32, 4);
    $.x.fillStyle = '#5b4e59';
    $.x.fillRect(p.x + 32, p.y + 28, 32, 4);
    $.x.fillRect(p.x, p.y + 60, 32, 4);
  }
}
