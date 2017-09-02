var Spawner = function(room, player) {
  var _ = this;
  _.actDist = 700; // activation distance
  _.active = 0;
  _.player = player;

  _.count = 0;

  _.inherits(Sprite);
  // Randomize the point inside the room where the spawner is created
  var x = floor(rndr(room.x, room.x + room.w - 64)),
      y = floor(rndr(room.y, room.y + room.h - 64));

  Sprite.call(_, x, y, 64, 64);

  _.u = function() {
    // TODO: Move this function to some common place
    var d = sqrt(pow(_.x - _.player.x, 2) + pow(_.y - _.player.y, 2)),
        prevState = _.active;
    _.active = (d <= _.actDist);
    if (_.active && $.ai.spawnEnabled) {
      _.count += $.e;
      if (_.count >= $.ai.spawnTime) {
        _.count = 0;
        var x = floor(rndr(_.x - 64, _.x + 64)),
            y = floor(rndr(_.y - 64, _.y + 64));
        $.g.z.add(new Zombie(x, y));
      }
    }
  };

  _.r = function(p) {
    $.x.s();

    $.x.bp();
    $.x.ss('#11c1fc');
    $.x.arc(p.x + (_.w / 2), p.y + (_.h / 2), _.actDist, 0, 2 * PI);
    $.x.k();

    if (_.active)
      $.x.fs('#500275');
    else
      $.x.fs('#7a0400');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  };
};
