// Zone used to exit the lab and start the game
var StartZ = function(x, y) {
  var _ = this;
  _.start = 1;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 54, 172);

  _.r = function(p) {
    //$.x.fs('red');
    //$.x.fr(p.x, p.y, _.w, _.h);
  }
}

// Zone used to detect the end of the game
var EndZ = function(cx, cy) {
  var _ = this;
  _.end = 1;
  _.ow = 256;
  _.oh = 160;
  _.inherits(Sprite);
  Sprite.call(_, cx - 128, cy - 80, _.ow - 64, _.oh - 64);

  _.r = function(p) {
    $.x.fs('white');
    $.x.fr(p.x, p.y, _.ow, _.oh);
    $.x.fs('limegreen');
    $.x.fr(p.x, p.y + 130, _.ow, 30);

    $.txt.r(p.x + 65, p.y + 140, 'Safe Point', 2, '#fff', {hspacing: 4});
  }
}

// Zone used to detect player movement and render instructions
var IntroZ = function(x, y) {
  var _ = this;
  _.intro = 1;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 192, 192);

  _.r = function(p) {
    $.x.fs('red');
    $.x.fr(p.x, p.y, _.w, _.h);
  };
}
