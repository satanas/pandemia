var Zombie = function(x, y) {
  var _ = this;
  _.d = 'l'; // direction
  _.s = 1.05; // speed
  _.o = 'l'; // orientation
  _.mindist = 400; // min distance to start chasing the player
  _.path = []; // points of path
  _.ctimer = 1000; // check time in ms
  _.ccount = 0; // time counter before checking new route
  _.angle = 0;
  _.trackingPos;

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
        _.path = _.findpath(_, $.player);
        _.trackingPos = new Point($.player.x, $.player.y);
        //console.log('path changed', Date.now(), _.path);
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
        const appliedDist = min(dist, ZOMBIE_SPEED);

        //console.log('nextPos', nextPos.x, nextPos.y, 'x,y', _.x, _.y, 'dist', cos(_.angle) * dist, sin(_.angle) * dist, 'appliedDist', appliedDist, 'z', ZOMBIE_SPEED, 'angle', _.angle);
        _.x += appliedDist * cos(_.angle);
        _.y += appliedDist * sin(_.angle);

        _.updateRect();

        // Recalculate path if destination point changed
        //console.log('px, py', $.player.x, $.player.y, 'ox, oy', _.trackingPos.x, _.trackingPos.y);
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

    _.path.forEach(function(o) {
      var z = $.cam.transformCoordinates(new Rect(o.x, o.y, 32, 32));
      $.x.ss('#ff0000');
      $.x.sr(z.x, z.y, 32, 32);
    });

    $.x.r();
  };

  _.clrPath = function() {
    _.path = [];
    _.ccount = 0;
  };

  _.inPlace = function(p1, p2) {
    return (abs(p1.x - p2.x) <= _.s && abs(p1.y - p2.y) <= _.s);
  };
};
