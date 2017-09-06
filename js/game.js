/* Start game on load */
window.addEventListener('load', function() {
  $.init();
  // Input
  $.in = new Input();
  // Collisions system
  $.o = new Collisions();
  // Sound manager
  $.sn = new Sound();
  // Bind keyboard
  $.in.b([13, 65, 68, 87, 83]);

  // Collision groups
  $.g.w = new Group(); // Walls
  $.g.z = new Group(); // Zombies
  $.g.s = new Group(); // Spawners
  $.g.i = new Group(); // Items
  $.g.h = new Group(); // Start and end points
  $.g.b = new Group(); // Bullets
  $.g.x = new Group(); // Pushables boxes

  $.lvl = new Level();
  $.txt = new Text();

  // Game Scenes
  $.scn = {};
  $.scn.menu = new MenuScene();
  $.scn.menu.loop();
});
