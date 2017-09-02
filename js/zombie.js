var Zombie = function(x, y) {
  var _ = this;
  _.mindist = 500; // min distance to start chasing the player
  _.path = []; // points of path
  _.ctimer = 300; // check time in ms
  _.ccount = 0; // time counter before checking new route
  _.angle = 0;
  _.trackingPos;
  _.s = (rnd() * 0.5) + MIN_ZOMBIE_SPEED;
  _.damage = rndr(4, 8);

  console.log('speed', _.s, 'damage', _.damage);
  _.inherits(Sprite);
  _.inherits(AStar);
  Sprite.call(_, x, y, 32, 32);
  AStar.call(_, $.lvl.ww, $.lvl.wh);

  _.u = function() {
    // TODO: Move the seek behavior to a separated file inside ai folder
    _.ccount += $.e;
    var d = _.getdist(_, $.player); // distance in pixels between zombie and player

    // The zombie doesn't have a path to walk
    if (_.path.length === 0) {
      if ((d <= _.mindist) && (round(d) > 40)) {
        _.path = _.findpath(_, $.player, MAX_ZOMBIE_PATH_DISTANCE);
        _.trackingPos = new Point($.player.x, $.player.y);
      }
    } else {
      const nextPos = _.path[0];
      const dist = _.getdist(_, nextPos);
      // The zombie reached the current node
      if (dist === 0) {
        // We remove the current node from the path and let the walking continue
        _.path.shift();
      } else {
        _.angle = atan2(nextPos.y - _.y, nextPos.x - _.x);
        const appliedDist = min(dist, _.s);

        _.x += appliedDist * cos(_.angle);
        _.y += appliedDist * sin(_.angle);

        _.updateRect();

        // Recalculate path if destination point changed
        if (_.ccount >= _.ctimer && _.trackingPos !== null && ($.player.x !== _.trackingPos.x || $.player.y !== _.trackingPos.y)) {
          _.clrPath();
        }
      }
    }
  };

  _.r = function(p) {
    $.x.s();
    $.x.fs('#00ff00');
    $.x.fr(p.x, p.y, _.w, _.h);

    //$.x.bp();
    //$.x.ss('#11c1fc');
    //$.x.arc(p.x + (_.w / 2), p.y + (_.h / 2), _.mindist, 0, 2 * PI);
    //$.x.k();

    //_.path.forEach(function(o) {
    //  var z = $.cam.transformCoordinates(new Rect(o.x, o.y, 32, 32));
    //  $.x.ss('#ff0000');
    //  $.x.sr(z.x, z.y, 32, 32);
    //});

    $.x.r();
  };

  _.clrPath = function() {
    _.path.splice(1, _.path.length);
    _.ccount = 0;
  };
};
