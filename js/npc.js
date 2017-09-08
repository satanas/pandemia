var Scientist = function(x, y) {
  var _ = this;
  _.st = 0; // State of dialog
  // Dialog array
  _.dg = [
    'Sarge, come here\nI need your help...',
    'Pick up the vaccine\nand bring it to me',
    'Good! Now blow up the\nbarricade and take it\nto the safe point\nYou\'re our only hope'
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

    $.txt.r(p.x - 64, p.y - 60, _.dg[_.st], 2, '#fff', {vspacing: 5});
    if (_.st === 1) {
      $.txt.r(100, 170, 'Vaccine', 2, '#fff');
    }
  }

  // Go to the next step of the dialog
  _.n = function() {
    _.st += 1;
  }
}
