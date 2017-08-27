var GameScene = function() {
  var _ = this;
  _.ww = 2048;
  _.wh = 2048;
  _.maxBlur = 5;
  _.c = $.byId("c"); // canvas

  _.inherits(Scene);
  Scene.call(_);
  $.lvl.gen(_.wh, _.wh);
  _.player = new Player(120, 120);
  $.cam.setWorldSize(_.ww, _.wh);
  $.cam.setTarget(_.player);

  _.update = function() {
    $.x.clr('#ccc');

    // Update
    _.player.u();
    $.cam.u();

    // Render
    $.cam.r(_.player);
  };

  _.applyFilter = function(g, b) {
    b = b * _.maxBlur / 100;
    _.c.style.filter = "grayscale(" + g + "%) blur(" + b + "px)";
  };

  //_.applyFilter(50, 100);
}
