var GameScene = function() {
  var _ = this;
  _.ww = 3200;
  _.wh = 3200;
  _.maxBlur = 5;
  _.c = $.byId("c"); // canvas

  _.inherits(Scene);
  Scene.call(_);

  $.o = new Collisions();

  // Collision groups
  $.g.walls = new Group(); // Walls
  $.g.z = new Group(); // Zombies
  $.g.s = new Group(); // Spawners
  $.g.i = new Group(); // Items
  $.g.h = new Group(); // Start and end points
  $.g.bullets = new Group(); // Bullets
  $.g.boxes = new Group(); // Pushables boxes

  $.lvl.gen(_.wh, _.wh, Wall);
  $.cam.setWorldSize(_.ww, _.wh);
  $.cam.setTarget($.player);
  $.ss = new ScreenShake();
  $.hud = new HUD();

  _.update = function() {
    $.x.clr('#ccc');

    // Update
    $.g.s.u();
    $.g.z.u();
    $.g.i.u();
    $.g.h.u();
    $.g.bullets.u();
    $.player.u();
    $.g.boxes.u();
    $.cam.u();
    $.hud.u();
    $.ss.u();
    _.fx();

    // Render
    $.g.h.r();
    $.g.walls.r();
    $.g.s.r();
    $.g.i.r();
    $.cam.r($.player);
    $.g.z.r();
    $.g.boxes.r();
    $.g.bullets.r();
    $.player.drawAim();
    $.hud.r();
  };

  _.fx = function() {
    var h = $.player.humanity,
        g = 0,
        b = 0;

    g = iir((100 - h) * 2, 0, 100);
    if (h <= 70 && h > 0) {
      b = iir((70 - h) * 2, 0, 100);
    }
    //console.log(h, g, b);
    _.c.style.filter = "grayscale(" + g + "%) blur(" + (b * _.maxBlur / 100) + "px)";
  };

  _.inst = function() {
  }
}
