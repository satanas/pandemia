var Scientist = function(x, y) {
  var _ = this;
  _.st = 0; // State of dialog
  // Dialog array
  _.dg = [
    [
      'Sarge, come here. I need your help'
    ],[
      'the safe point. So, pick it up...',
      'human race delivering the vaccine to',
      'are all infected. But we can save the',
      'The zombies overrun the place and we'
    ], [
      'your humanity. You are our only hope.',
      'deliver the vaccine before you lose',
      'Good! Now blow up the barricade and'
    ]
  ]
  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.u = function() {
  }

  _.r = function(p) {
    $.x.fs('#fff000');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.ss('#fff');
    $.x.bp();
    $.x.mv(p.x - 64, p.y - 20);
    $.x.lt(p.x + 64 * 2, p.y - 20);
    $.x.mv(p.x + (_.w / 2), p.y);
    $.x.lt(p.x - 5, p.y - 20);
    $.x.k();
    $.x.cp();

    var i, y = 290;
    for (i=0; i < _.dg[_.st].length; i++) {
      $.x.ft(_.dg[_.st][i], 16, 250, y - (i * 20), '#fff', 'sans-serif');
    }
    if (_.st === 1) {
      $.txt.r(100, 170, 'Vaccine', 2, '#fff');
    }
  }

  // Go to the next step of the dialog
  _.n = function() {
    _.st += 1;
  }
}
