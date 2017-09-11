var Spawner = function(room) {
  var _ = this;
  _.ro = room;
  _.ad = 1000; // activation distance
  _.z = []; // array of zombies
  _.c = 0; // respawn counter

  _.inherits(Sprite);
  Sprite.call(_, _.ro.x, _.ro.y, 64, 64);

  _.u = function() {
    // TODO: Move this function to some common place
    var z,
        d = sqrt(pow(_.x - $.player.x, 2) + pow(_.y - $.player.y, 2)),
        x = floor(rndr(_.ro.x, _.ro.x + _.ro.w - 32)),
        y = floor(rndr(_.ro.y, _.ro.y + _.ro.h - 32)),
        pn = d <= _.ad || $.o.rect($.player, _.ro); // Is the player near the spawner?

    if (!_.c && !pn) {
      z = new Zombie(x, y);
      _.z.push(z)
      $.g.z.add(z);
      if (_.z.length >= 20) _.c = 8000;
    } else if (!pn) {
      _.c = iir(_.c - $.e, 0);
    }
    _.z = _.z.filter(function(e) {
      return e.a;
    });
  };

  _.r = function(p) {
    //$.x.ss('#00b');
    //$.x.bp();
    //$.x.arc(p.x, p.y, _.ad, 0, 2 * PI);
    //$.x.k();
  }
};
