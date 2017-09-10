var Wall = function(x, y) {
  var _ = this;

  _.inherits(Sprite);
  Sprite.call(_, x, y, GS, GS);

  _.r = function(p) {
    $.x.lw(1);
    $.x.fs('#c2c2c2');
    $.x.ss('#949494');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.sr(p.x, p.y, _.w, _.h);
    //$.x.bp();
    //$.x.mv(p.x, p.y + 32);
    //$.x.lt(p.x + 64, p.y + 32);
    //$.x.mv(p.x + 32, p.y);
    //$.x.lt(p.x + 32, p.y + 64);
    //$.x.cp();
    //$.x.k();
  }
};

var Barricade = function(x, y) {
  var _ = this;

  _.health = rndr(4, 6);
  _.inherits(Sprite);
  Sprite.call(_, x, y, GS, GS);

  _.u = function() {
    $.g.b.c(_, function(w, b) {
      _.health -= 1;
      if (_.health <= 0) {
        _.a = 0;
        // Set the barricade flag off so the message disappear
        $.scientist.ba = 0;
        $.sn.p('ex');
      }
    });
  }

  _.r = function(p) {
    $.x.lw(1);
    for (var i=0; i<3; i++) {
      $.x.fs('#8d5524');
      $.x.fr(p.x, p.y, _.w, _.h);
      $.x.ss('#522900');
      $.x.bp();
      $.x.mv(p.x, p.y);
      $.x.lt(p.x + 64, p.y);
      //$.x.mv(p.x + 15, p.y);
      //$.x.lt(p.x + 15, p.y + 21);
      //$.x.mv(p.x + 54, p.y);
      //$.x.lt(p.x + 54, p.y + 21);
      $.x.mv(p.x, p.y + 21);
      $.x.lt(p.x + 64, p.y + 21);
      //$.x.mv(p.x + 32, p.y + 22);
      //$.x.lt(p.x + 32, p.y + 43);
      $.x.mv(p.x, p.y + 44);
      $.x.lt(p.x + 64, p.y + 44);
      //$.x.mv(p.x + 15, p.y + 45);
      //$.x.lt(p.x + 15, p.y + 64);
      //$.x.mv(p.x + 54, p.y + 45);
      //$.x.lt(p.x + 54, p.y + 64);
      $.x.cp();
      $.x.k();
    }
  }
};

var Floor = function(x, y) {
  var _ = this;

  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.r = function(p) {
    $.x.lw(1);
    $.x.fs('#787878');
    $.x.ss('#696969');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.sr(p.x, p.y, _.w, _.h);
    $.x.bp();
    $.x.mv(p.x, p.y + 32);
    $.x.lt(p.x + 64, p.y + 32);
    $.x.mv(p.x + 32, p.y);
    $.x.lt(p.x + 32, p.y + 64);
    $.x.cp();
    $.x.k();
  }
}
