var GameScene = function() {
  var _ = this;
  _.ww = 4096;
  _.wh = 4096;
  _.maxBlur = 5;
  _.c = $.byId("c"); // canvas

  _.inherits(Scene);
  Scene.call(_);

  $.o = new Collisions();

  // Collision groups
  $.g.walls = new Group(); // Walls
  $.g.z = new Group(); // Zombies
  $.g.s = new Group(); // Spawners

  $.lvl.gen(_.wh, _.wh);
  $.g.z.add(new Zombie(300, 300));
  $.cam.setWorldSize(_.ww, _.wh);
  $.cam.setTarget($.player);

  // Load the walls
  for (var j=0; j<$.lvl.wh; j++) {
    for (var i=0; i<$.lvl.ww; i++) {
      if ($.lvl.isWall(j, i)) {
        $.g.walls.add(new Wall(j*32, i*32, 0));
      }
    }
  }

  _.update = function() {
    $.x.clr('#ccc');

    // Update
    $.g.z.u();
    $.player.u();
    $.cam.u();

    // Render
    $.g.walls.r();
    $.g.s.r();
    $.cam.r($.player);
    $.g.z.r();
  };

  _.applyFilter = function(g, b) {
    b = b * _.maxBlur / 100;
    _.c.style.filter = "grayscale(" + g + "%) blur(" + b + "px)";
  };

  //_.applyFilter(50, 100);
}
