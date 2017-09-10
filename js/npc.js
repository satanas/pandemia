var Scientist = function(x, y) {
  var _ = this;
  _.anim = new Animator([0, 1], 300);
  _.st = 0; // State of dialog
  _.ba = 1; // Barricade alive flag
  // Dialog array
  _.fda = [
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
  ];
  _.sda = [
    [
      'please. It is our last chance.',
      'Get it back and take it to the safe zone,',
      'vaccine is out there, in great danger.',
      'Well, seems like Sarge is dead and the'
    ]
  ];
  _.dg = ($.scn.game.tries) ? _.sda : _.fda;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.u = function() {
    _.anim.u();
  }

  _.r = function(p) {
    var i,
        y = 290,
        c = '#fff',
        s = 'sans-serif';

    $.x.fs('#fff000');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.ss(c);
    $.x.bp();
    $.x.mv(p.x - 64, p.y - 20);
    $.x.lt(p.x + 64 * 2, p.y - 20);
    $.x.mv(p.x + (_.w / 2), p.y);
    $.x.lt(p.x - 5, p.y - 20);
    $.x.k();
    $.x.cp();


    for (i=0; i < _.dg[_.st].length; i++) {
      $.x.ft(_.dg[_.st][i], 16, 250, y - (i * 20), c, s);
    }
    if (_.st === 1 && _.anim.g()) {
      $.x.ft('VACCINE', 16, 110, 180, c, s);
    } else if (_.st === 2 && _.anim.g() && _.ba) {
      $.x.ft('BARRICADE', 16, 880, 300, c, s);
    }
  }

  // Go to the next step of the dialog
  _.n = function() {
    _.st += 1;
  }
}
