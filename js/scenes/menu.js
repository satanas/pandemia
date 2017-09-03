var MenuScene = function() {
  var _ = this;
  _.inherits(Scene);
  Scene.call(_);

  $.text = new Text();

  _.update = function() {
    $.x.clr('#fff');
    //$.x.ct('Pandemia', 125, 290, 'red', 'courier');
    $.text.draw({
      y: 180,
      halign: 'center',
      text: 'Pandemia',
      hspacing: 10,
      scale: 15,
      color: '#3cdb02'
    });

    if ($.in.p(13)) {
      _.exit();
      $.scn.game = new GameScene();
      $.scn.game.start();
    }
  }
}
