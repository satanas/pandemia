var MenuScene = function() {
  var _ = this;
  _.inherits(Scene);
  Scene.call(_);

  _.anim = new Animator([0, 1], 150);
  _.xc = 0; // exit counter
  _.ef = 0; // exiting flag


  _.update = function() {
    var i, j;
    _.xc = iir(_.xc - $.e, 0);
    if (_.xc === 0 && _.ef) {
      _.exit();
      $.scn.game = new GameScene();
      $.scn.game.intro();
    } else if (!_.ef) {
      _.anim.u();
    }
    $.x.clr('#fff');
    $.x.ss('#f80');

    $.x.bp();
    $.x.lineWidth = 12;
    for (j=0; j<2; j++) {
      for (i=0; i<20; i++) {
        $.x.mv((1024 * j) - (30 * (j + 1)), i * 30);
        $.x.lt((1024 * j) + 60, (i + 1) * 30);
        $.x.k();
      }
    }
    $.x.cp();
    $.x.fs('#f80');
    $.x.fr(50, 0, $.vw - 100, $.vh);

    $.txt.r(0, 60, 'Pandemia', 15, '#fff', {
      halign: 'center',
      hspacing: 15,
    });
    if (_.anim.g()) {
      $.txt.r(0, $.vh - 80, 'Press Enter to start', 4, '#fff', {
        halign: 'center',
        hspacing: 2,
      });
    }
    $.txt.r(0, $.vh - 30, 'By satanas82 for js13k 2017', 1.7, '#fff', {
      halign: 'center',
      hspacing: 2,
    });
    var cx = floor($.vw / 2),
        cy = floor($.vh / 2) + 40,
        r = 60, // radius
        s = 40, // radius 2
        d = 10, // depth
        o = (r * 2) - (s * 2); // offset
    $.x.fs('white');
    _.dc(cx, cy - r + d, r);
    _.dc(cx - r + d, cy + (r / 2), r);
    _.dc(cx + r - d, cy + (r / 2), r);

    $.x.fs('#f80');
    _.dc(cx, cy - o - 30, s);
    _.dc(cx - o - 30, cy + o, s);
    _.dc(cx + o + 30, cy + o, s);
    _.dc(cx, cy, d);

    if ($.in.p(13) && !_.ef) {
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
