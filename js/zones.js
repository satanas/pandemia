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

  // Temporary canvas to render strips
  _.ca = document.createElement('canvas');
  _.ca.width = _.ow * 2;
  _.ca.width = _.oh * 2;
  _.cx = _.ca.getContext('2d');
  _.lw = 16;

  _.u = function() {
    _.oc = iir(_.oc - $.e, 0);
    if (_.oc) {
      $.msg = 'There are zombies in the safe point. Kill them first!';
    }
  }

  _.r = function(p) {
    var i,
        x = p.x - 64, // x coord for the render (not the hitbox)
        y = p.y - 40, // y coord for the render (not the hitbox)
        d; // d: double coord value

    _.cx.lineWidth = 1;
    _.cx.fillStyle = '#000';
    _.cx.beginPath();
    for (i=1; i<=13; i++) {
      d = _.lw * 2 * i;
      _.cx.moveTo(0, 0 + d);
      _.cx.lineTo(0, 0 + d - _.lw);
      _.cx.lineTo(0 + d - _.lw, 0);
      _.cx.lineTo(0 + d, 0);
      _.cx.lineTo(0, 0 + d);
      _.cx.closePath();
    }
    _.cx.fill();
    $.x.fs('yellow');
    $.x.fr(x, y, _.ow, _.oh);
    $.x.di(_.ca, 0, 0, 256, 160, x, y, 256, 160);
    $.x.fs('#000');
    $.x.fr(p.x - 64, p.y + 90, _.ow, 30);
    $.x.ft('SAFE ZONE', 18, p.x + 10, p.y + 110, '#fff', 'sans-serif');
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
