var Scientist = function(x, y) {
  var _ = this;
  _.anim = new Animator([0, 1]);
  _.st = 0; // State of dialog
  _.ba = 1; // Barricade alive flag
  // Dialog array
  _.fda = [
    [
      'Soldier, come here. I need your help'
    ],[
      'the safe zone. So, pick it up...',
      'human race delivering the vaccine to',
      'are all infected. But we can save the',
      'The zombies overrun the place and we'
    ], [
      'the vaccine before you lose your humanity.',
      'Now blow up the barricade and deliver'
    ]
  ];
  _.sda = [
    [
      'take it to the safe zone.',
      'Go soldier! Retrieve the vaccine and',
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
        c = WH,
        s = FN,
        bc = '#c68642'; // body color

    // Head
    $.x.fs(bc);
    $.x.fr(p.x + 2, p.y, 62, 38);
    // Chest
    $.x.fs(c);
    $.x.fr(p.x + 16, p.y + 38, 34, 13);
    $.x.fr(p.x + 16, p.y + 50, 34, 5);
    $.x.fs('#2196f3');
    $.x.fr(p.x + 43, p.y + 38, 7, 18);
    // Feet
    $.x.fs('#333');
    $.x.fr(p.x + 16, p.y + 55, 14, 8);
    $.x.fr(p.x + 36, p.y + 55, 14, 8);
    // Arms
    $.x.fs('#ededed');
    $.x.fr(p.x + 30, p.y + 40, 7, 16);
    // Hands
    $.x.fs(bc);
    $.x.fr(p.x + 30, p.y + 51, 6, 7);
    // Face
    $.x.fs(FC);
    $.x.fr(p.x + 50, p.y + 19, 6, 6);
    $.x.fr(p.x + 58, p.y + 31, 4, 2);

    $.x.ss(c);
    $.x.bp();
    $.x.mv(p.x - 64, p.y - 20);
    $.x.lt(p.x + 64 * 2, p.y - 20);
    $.x.mv(p.x + 42, p.y);
    $.x.lt(p.x + 5, p.y - 20);
    $.x.cp();
    $.x.k();


    for (i=0; i < _.dg[_.st].length; i++) {
      //$.txt.r(_.dg[_.st][i], 250, y - (i * 20), 2, '#fff');
      $.x.ft(_.dg[_.st][i], 16, 250, y - (i * 20), c, s);
    }
    if (_.st === 1 && _.anim.g()) {
      $.txt.r('Vaccine', 100, 170, 2, '#fff');
    } else if (_.st === 2 && _.anim.g() && _.ba) {
      $.txt.r('Barricade', 880, 285, 2, '#fff');
    }
  }

  // Go to the next step of the dialog
  _.n = function() {
    _.st += 1;
  }
}

var Soldier = function(x, y) {
  var _ = this;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.r = function(p) {
    // Head
    $.x.fs('#ffca85');
    $.x.fr(p.x + 2, p.y, 62, 38);
    // Chest
    $.x.fs('#727254');
    $.x.fr(p.x + 16, p.y + 38, 34, 13);
    // Waist
    $.x.fs('#203622');
    $.x.fr(p.x + 16, p.y + 50, 34, 5);
    // Feet
    $.x.fr(p.x + 16, p.y + 55, 14, 8);
    $.x.fr(p.x + 36, p.y + 55, 14, 8);
    // Arms
    $.x.fs(AC);
    $.x.fr(p.x + 9, p.y + 39, 7, 5);
    $.x.fr(p.x + 50, p.y + 39, 7, 5);
    // Hands
    $.x.fs(HC);
    $.x.fr(p.x + 9, p.y + 44, 7, 5);
    $.x.fr(p.x + 50, p.y + 44, 7, 5);
    // Face
    $.x.fs(FC);
    $.x.fr(p.x + 15, p.y + 19, 6, 6);
    $.x.fr(p.x + 45, p.y + 19, 6, 6);
    $.x.fr(p.x + 27, p.y + 31, 12, 2);
  }
}
