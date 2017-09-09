var GameScene = function() {
  var _ = this;
  _.maxBlur = 5;
  _.c = $.byId("c"); // canvas
  _.be = 0; // bite effect flag
  _.end = 0; // ending flag. 1 = game over, 2 = win
  _.fl = 0; // floor flag. 0 = intro

  _.inherits(Scene);
  Scene.call(_);

  $.ss = new ScreenShake();
  $.hud = new HUD();

  _.init = function() {
    // Clear all groups before start
    Object.keys($.g).forEach(function(g) { $.g[g].clr() })
    _.be = 0;
    _.end = 0;
    $.msg = 0;

    // If intro
    if (!_.fl) {
      _.ww = 1024;
      _.wh = 576;
      $.lvl.iroom(_.ww, _.wh);
    } else {
      _.ww = 3200;
      _.wh = 3200;
      $.lvl.gen(_.ww, _.wh);
    }
    $.cam.setWorldSize(_.ww, _.wh);
    $.cam.setTarget($.player);
    _.iz = 1;
  }

  // Next floor
  _.nf = function() {
    _.fl += 1;
    _.reset();
    _.init();
  }

  _.update = function() {
    $.x.clr('#404c54');
    $.msg = 0; // Clearing the msg buffer

    _.be = iir(_.be - $.e, 0);
    // Update
    $.g.w.u();
    $.g.s.u();
    $.g.z.u();
    $.g.i.u();
    $.g.h.u();
    $.g.x.u();
    $.player.u();
    $.g.n.u();
    $.g.b.u();
    $.cam.u();
    $.hud.u();
    $.ss.u();

    // Render
    $.g.s.r(); // spawners and floor
    $.g.h.r(); // zones
    $.g.w.r(); // walls
    $.g.z.r(); // zombies
    $.g.i.r(); // items
    $.cam.r($.player);
    $.g.n.r(); // NPCs
    $.g.x.r(); // vaccine
    $.g.b.r(); // bullets
    $.player.drawAim();
    $.hud.r();
    _.fx();
    _.gm();

    if (!_.fl) _.pi();
    _.mod();
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
    $.x.fs('rgba(0,0,0,0.5)');
    $.x.fr(300, 460, 430, 70);
    $.x.ct('WASD, ZQSD and ARROWS to move', 20, 490, '#fff', 'sans-serif');
    $.x.ct('MOUSE to aim and shoot', 20, 515, '#fff', 'sans-serif');
  }

  // To be called on game over
  _.over = function() {
    _.end = 1;
    $.sn.p('go');
  }

  // To be called when the player reaches the goal
  _.win = function() {
    _.end = 2;
  }

  // Print global message
  _.gm = function() {
    if ($.msg) {
      $.x.ct($.msg, 30, 200, '#fff', 'sans-serif');
    }
  }

  // Render modal for gameover/win
  _.mod = function() {
    if (!_.end) return;

    var w = 600,
        h = 500,
        c = '#fff',
        s = 'sans-serif',
        x = ($.vw - w) / 2,
        y = ($.vh - h) / 2;
    $.x.globalAlpha = 0.9;
    $.x.fs(c);
    $.x.fr(x, y, w, h);
    if (_.end === 1) {
      $.x.fs('#111');
      $.x.fr(x + 30, y, w - 60, h);

      Zombie.draw(410, y + 160, DIR.DOWN);
      Vaccine.draw(430, y + 245);

      $.x.ct('GAME OVER', 50, y + 80, c, s);
      $.x.ft('x  100', 30, 500, y + 200, c, s);
      $.x.ft('x  1', 30, 500, y + 270, c, s);
      $.x.ct('You could not save the human race.', 18, y + 350, c, s);
    } else if (_.end === 2) {
      $.x.fs('#f80');
      $.x.fr(x + 30, y, w - 60, h);

      $.x.ct('WELL DONE!', 50, y + 80, c, s);
      $.x.ct('You delivered the vaccine to the safe zone at the cost', 18, y + 150, c, s);
      $.x.ct('of your own life to save the human race. You are A HERO', 18, y + 175, c, s);

      Zombie.draw(420, y + 220, DIR.DOWN);
      $.x.ft('x  100', 30, 510, y + 260, c, s);

      $.x.ct('Thanks for playing!', 25, y + 360, c, s);
    }
    $.x.ct('ENTER to play again. ESC to exit.', 20, y + 450, c, s);

    $.x.globalAlpha = 1;

    if ($.in.p(INPUT.E)) {
      _.fl = 0
      _.init();
    }
  }
}
