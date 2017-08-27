var MenuScene = function() {
  var _ = this;
  _.inherits(Scene);
  Scene.call(_);

  _.update = function() {
    $.x.clr('#fff');
    $.x.s();
    $.x.ct('PRISON', 75, 220, 'black', 'courier');
    $.x.ct('ESCAPE', 75, 295, '#ff7f00', 'courier');

    $.x.r();

    if ($.in.p(13)) {
      _.exit();
      $.scn.game = new GameScene();
      $.scn.game.start();
    }
  }
}
