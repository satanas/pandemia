// Start zone
var StartZ = function(cx, cy) {
  var _ = this;
  _.end = 0;
  _.inherits(Sprite);
  Sprite.call(_, cx - 128, cy - 80, 256, 160);

  $.g.boxes.add(new Vaccine(cx - 16, cy - 32));
  $.player = new Player(cx - 32, _.b.b + 12);

  _.r = function(p) {
    $.x.s();
    $.x.fs('red');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.fs('limegreen');
    $.x.fr(p.x, p.y + 130, _.w, 30);
    $.x.r();

    $.text.r(p.x + 25, p.y + 140, 'Pick up vaccine', 2, '#fff', {hspacing: 4});
  }
}

var EndZ = function(cx, cy) {
  var _ = this;
  _.end = 1;
  _.ow = 256;
  _.oh = 160;
  _.inherits(Sprite);
  Sprite.call(_, cx - 128, cy - 80, _.ow - 64, _.oh - 64);

  _.r = function(p) {
    $.x.s();
    $.x.fs('white');
    $.x.fr(p.x, p.y, _.ow, _.oh);
    $.x.fs('limegreen');
    $.x.fr(p.x, p.y + 130, _.ow, 30);
    $.x.r();

    $.text.r(p.x + 65, p.y + 140, 'Safe Point', 2, '#fff', {hspacing: 4});
  }
}
