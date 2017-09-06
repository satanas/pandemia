var GameScene = function() {
  var _ = this;
  _.maxBlur = 5;
  _.c = $.byId("c"); // canvas

  _.inherits(Scene);
  Scene.call(_);

  $.ss = new ScreenShake();
  $.hud = new HUD();

  _.init = function() {
    // Clear all groups before start
    Object.keys($.g).forEach(function(g) { $.g[g].clr() })
    _.intro = 0;
  }

  _.intro = function() {
    _.reset();
    _.init();
    _.intro = 1;
    _.ww = 1024;
    _.wh = 576;
    $.lvl.iroom(_.ww, _.wh);
    $.cam.setWorldSize(_.ww, _.wh);
    $.cam.setTarget($.player);
    _.loop();
  }

  _.game = function() {
    _.reset();
    _.init();
    _.ww = 3200;
    _.wh = 3200;
    $.lvl.gen(_.ww, _.wh);
    $.cam.setWorldSize(_.ww, _.wh);
    $.cam.setTarget($.player);
    // No need to run loop here because it ran first in the intro
    //_.loop();
  }

  _.update = function() {
    $.x.clr('#ccc');

    // Update
    $.g.s.u();
    $.g.z.u();
    $.g.i.u();
    $.g.h.u();
    $.g.x.u();
    $.player.u();
    $.g.b.u();
    $.cam.u();
    $.hud.u();
    $.ss.u();
    _.fx();

    // Render
    $.g.h.r();
    $.g.w.r();
    $.g.s.r();
    $.g.i.r();
    $.cam.r($.player);
    $.g.z.r();
    $.g.x.r();
    $.g.b.r();
    $.player.drawAim();
    $.hud.r();

    if (_.intro) _.pi();
  };

  _.fx = function() {
    var h = $.player.humanity,
        g = 0,
        b = 0;

    g = iir((100 - h) * 2, 0, 100);
    if (h <= 70 && h > 0) {
      b = iir((70 - h) * 2, 0, 100);
    }
    _.c.style.filter = "grayscale(" + g + "%) blur(" + (b * _.maxBlur / 100) + "px)";
  };

  // Print instructions method
  _.pi = function() {
    $.txt.r(0, _.wh - 120, 'wasd, zqsd and arrows to move\nMouse to aim and shoot', 3, '#000', {
      halign: 'center',
      hspacing: 2,
      vspacing: 20,
    });
  }

}
