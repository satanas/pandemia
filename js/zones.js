// Zone used to exit the lab and start the game
var StartZ = function(x, y) {
  var _ = this;
  _.start = 1;
  _.ac = 0; // alert counter
  _.inherits(Sprite);
  Sprite.call(_, x, y, 54, 172);

  _.u = function() {
    _.ac = iir(_.ac - $.e, 0);
    if (_.ac && !$.scn.game.tries) {
      $.msg ='You cannot leave the lab without the vaccine';
    }
  }

  _.r = function(p) {
  }

  // Show alert
  _.al = function() {
    if (_.ac) return;
    _.ac = 2000;
  }
}

// Zone used to detect the end of the game
var EndZ = function(cx, cy) {
  var _ = this;
  _.end = 1;
  _.ow = 256;
  _.oh = 160;
  _.oc = 0; // Occupy counter
  _.inherits(Sprite);
  Sprite.call(_, cx - 64, cy - 40, _.ow / 2, _.oh / 2);

  _.u = function() {
    _.oc = iir(_.oc - $.e, 0);
    if (_.oc) {
      $.msg = 'There are zombies in the safe point. Kill them first!';
    }
  }

  _.r = function(p) {
    $.x.fs('white');
    $.x.fr(p.x - 64, p.y - 40, _.ow, _.oh);
    $.x.fs('limegreen');
    $.x.fr(p.x - 64, p.y + 90, _.ow, 30);
    $.x.fs('red');
    $.x.fr(p.x, p.y, _.w, _.h);
  }

  // Occupy zone (used by zombies)
  _.occ = function() {
    _.oc = 1000;
  }
}

// Zone used to detect player movement and render instructions
var IntroZ = function(x, y) {
  var _ = this;
  _.intro = 1;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 192, 192);

  _.r = function(p) {
  };
}
