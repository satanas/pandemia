/* Start game on load */
window.addEventListener('load', function() {
  $.init();
  // Input
  $.in = new Input();
  // Collisions system
  $.co = new Collisions();
  // Sound manager
  $.sn = new Sound();
  // Bind keyboard
  //$.in.b([13, 37, 38, 39, 40, 32, 27]);
  $.in.b([13, 65, 68, 87, 83]);

  // Game Scenes
  $.scn = {};
  // SVG
  $.svg = new SVG();

  $.lvl = new Level();

  $.scn.menu = new MenuScene();
  $.scn.menu.loop();
});
