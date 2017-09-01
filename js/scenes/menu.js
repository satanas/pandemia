var MenuScene = function() {
  var _ = this;
  _.inherits(Scene);
  Scene.call(_);

  _.update = function() {
    $.x.clr('#fff');
    $.x.s();
    $.x.ct('Pandemia', 75, 280, 'red', 'courier');

    $.x.r();

    if ($.in.p(13)) {
      _.exit();
      $.scn.game = new GameScene();
      $.scn.game.start();
    }
  }
}
