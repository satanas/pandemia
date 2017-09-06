var MenuScene = function() {
  var _ = this;
  _.inherits(Scene);
  Scene.call(_);

  $.text = new Text();

  _.update = function() {
    $.x.clr('#f80');
    $.text.r(0, 60, 'Pandemia', 15, '#fff', {
      halign: 'center',
      hspacing: 15,
    });
    $.text.r(0, $.vh - 80, 'Press Enter to start', 4, '#fff', {
      halign: 'center',
      hspacing: 2,
    });
    var cx = floor($.vw / 2),
        cy = floor($.vh / 2) + 40,
        r = 60, // radius
        s = 40, // radius 2
        d = 10, // depth
        o = (r * 2) - (s * 2); // offset
    $.x.s();
    $.x.fs('white');
    _.dc(cx, cy - r + d, r);
    _.dc(cx - r + d, cy + (r / 2), r);
    _.dc(cx + r - d, cy + (r / 2), r);

    $.x.fs('#f80');
    _.dc(cx, cy - o - 30, s);
    _.dc(cx - o - 30, cy + o, s);
    _.dc(cx + o + 30, cy + o, s);
    _.dc(cx, cy, d);
    $.x.r();

    if ($.in.p(13)) {
      _.exit();
      $.scn.game = new GameScene();
      $.scn.game.start();
    }
  }

  // Function to draw circles
  _.dc = function(x, y, r) {
    $.x.bp();
    $.x.arc(x, y, r, 0, 2 * PI);
    $.x.f();
  }
}
