var GameScene = function() {
  var _ = this;
  _.maxBlur = 5;
  _.c = $.byId("c"); // canvas
  _.be = 0; // bite effect flag

  _.inherits(Scene);
  Scene.call(_);

  $.ss = new ScreenShake();
  $.hud = new HUD();

  // Pattern creation for the floor
  ////_.tc = document.createElement('canvas'); // temporary canvas
  ////_.tc.width = 64;
  ////_.tc.height = 64;
  ////_.tx = _.tc.getContext('2d'); // temporary context
  ////// Big 4 blocks
  ////_.tx.fillStyle = '#433641';
  ////_.tx.fillRect(0, 0, 32, 32);
  ////_.tx.fillRect(32, 32, 64, 64);
  ////_.tx.fillStyle = '#50434e';
  ////_.tx.fillRect(32, 0, 64, 32);
  ////_.tx.fillRect(0, 32, 32, 64);
  ////// Strips
  ////_.tx.fillStyle = '#4b3746';
  ////_.tx.fillRect(0, 0, 32, 4);
  ////_.tx.fillRect(32, 32, 32, 4);
  ////_.tx.fillStyle = '#3e2a3e';
  ////_.tx.fillRect(32, 0, 32, 4);
  ////_.tx.fillRect(0, 32, 32, 4);
  ////_.tx.fillStyle = '#5b4e59';
  ////_.tx.fillRect(32, 28, 32, 4);
  ////_.tx.fillRect(0, 60, 32, 4);
  ////_.pt = $.x.createPattern(_.tc, 'repeat');

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
    $.x.clr('#404c54');
    // Pattern stuff
    //$.x.fs(_.pt);
    //$.x.fillRect(0, 0, $.vw, $.vh);

    _.be = iir(_.be - $.e, 0);
    // Update
    $.g.w.u();
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

    // Render
    $.g.s.r();
    $.g.w.r();
    $.g.h.r();
    $.g.i.r();
    $.cam.r($.player);
    $.g.z.r();
    $.g.x.r();
    $.g.b.r();
    $.player.drawAim();
    $.hud.r();
    _.fx();

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

    if (_.be) {
      //$.x.fs("rgba(255,0,0," + lim(_.t.fo / t, 1) +")");
      $.x.fs("rgba(255,0,0,0.4)");
      $.x.fr(0, 0, $.vw, $.vh);
    }
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
