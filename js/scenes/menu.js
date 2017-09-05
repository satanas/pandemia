var MenuScene = function() {
  var _ = this;
  _.inherits(Scene);
  Scene.call(_);

  $.text = new Text();

  _.update = function() {
    $.x.clr('#fff');
    $.text.r(0, 180, 'Pandemia', 15, '#3cdb02', {
      halign: 'center',
      hspacing: 10,
    });

    if ($.in.p(13)) {
      _.exit();
      $.scn.game = new GameScene();
      $.scn.game.start();
    }
  }
}
