var MenuScene = function() {
  var _ = this;
  _.inherits(Scene);
  Scene.call(_);

  _.anim = new Animator([0, 1], 150);

  _.init = function() {
    _.xc = 0; // exit counter
    _.de = 400 // delay before accepting keyboard events
    _.ef = 0; // exiting flag
  }

  _.update = function() {
    var i, j;
    _.de = iir(_.de - $.e, 0);
    _.xc = iir(_.xc - $.e, 0);
    if (_.xc === 0 && _.ef) {
      _.exit();
      $.scn.game.start();
    } else if (!_.ef) {
      _.anim.u();
    }
    $.x.clr(WH);
    $.x.ss('#f80');

    $.x.bp();
    $.x.lw(12);
    for (j=0; j<2; j++) {
      for (i=0; i<20; i++) {
        $.x.mv((1024 * j) - (30 * (j + 1)), i * 30);
        $.x.lt((1024 * j) + 60, (i + 1) * 30);
      }
    }
    $.x.cp();
    $.x.k();
    $.x.fs('#f80');
    $.x.fr(50, 0, $.vw - 100, $.vh);

    $.x.ct('PANDEMIA', 125, 150, WH, FN);
    if (_.anim.g()) {
      $.x.ct('Press ENTER to start', 35, 490, WH, FN);
    }
    $.x.ct('By @satanas82 for js13k 2017', 15, 550, '#eee', FN);
    var cx = floor($.vw / 2),
        cy = floor($.vh / 2) + 40,
        r = 60, // radius
        s = 40, // radius 2
        d = 10, // depth
        o = (r * 2) - (s * 2); // offset
    $.x.fs(WH);
    _.dc(cx, cy - r + d, r);
    _.dc(cx - r + d, cy + (r / 2), r);
    _.dc(cx + r - d, cy + (r / 2), r);

    $.x.fs('#f80');
    _.dc(cx, cy - o - 30, s);
    _.dc(cx - o - 30, cy + o, s);
    _.dc(cx + o + 30, cy + o, s);
    _.dc(cx, cy, d);

    if ($.in.p(INPUT.E) && !_.ef && !_.de) {
      _.ef = 1;
      _.xc = 300;
      _.anim.f = 0; // Turn off the press enter message
      $.sn.p('sl');
    }
  }

  // Function to draw circles
  _.dc = function(x, y, r) {
    $.x.bp();
    $.x.arc(x, y, r, 0, 2 * PI);
    $.x.cp();
    $.x.f();
  }
}
