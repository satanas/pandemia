var Player = function(x, y) {
  var _ = this;
  _.mxs = 0; // max speed
  _.d = 'l'; // direction
  _.s = 0.35; // speed

  _.dx = 0;
  _.dy = 0;
  _.ic = 0; // invincibility counter
  _.intensity = 0;
  _.humanity = 100;
  _.humanityDecay = _.humanity / (7 * 60); // 7 min
  _.collectedItems = [];
  _.hc = 0; // healing counter

  _.sex = 'm';
  _.skinColor = '#ffe499';
  _.hairColor = '#795548';

  //var x = room.x + (room.w / 2) - 32,
  //    y = room.y + (room.h / 2) - 32;

  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.u = function() {
    if (_.hc > 0) {
      _.hc = iir(_.hc - $.e, 0);
    } else {
      _.humanity = iir(_.humanity - ($.e * _.humanityDecay / 1000), 0.1);
    }
    //console.log('humanity', _.humanity, _.collectedItems);
    _.mxs = iir(-1.5 + (_.humanity / 10), MIN_PLAYER_SPEED);

    if (_.ic > 0) {
      _.ic = iir(_.ic - $.e, 0);
      // Slow down 20% if recovering
      // _.mxs = iir(_.mxs - (_.mxs * 0.2), MIN_PLAYER_SPEED);
    }

    if ($.in.p(INPUT.LEFT)) {
      _.d = 'l';
      _.dx -= _.s;
    } else if ($.in.p(INPUT.RIGHT)) {
      _.d = 'r';
      _.dx += _.s;
    }

    if ($.in.p(INPUT.UP)) {
      _.d = 'u';
      _.dy -= _.s;
    } else if ($.in.p(INPUT.DOWN)) {
      _.d = 'd';
      _.dy += _.s;
    }

    _.dx = iir(_.dx, -_.mxs, _.mxs);
    _.dy = iir(_.dy, -_.mxs, _.mxs);

    if (!$.in.p(INPUT.LEFT) && !$.in.p(INPUT.RIGHT)) {
      _.dx = 0;
    }
    if (!$.in.p(INPUT.UP) && !$.in.p(INPUT.DOWN)) {
      _.dy = 0;
    }

    _.x += _.dx;
    _.y += _.dy;

    _.updateRect();

    // Collisions with walls
    // p = Player
    // w = Wall
    $.g.walls.c(_, function(p, w) {
      if($.o.top(p, w)) {
        p.y = w.b.b;
      } else if ($.o.bottom(p, w)) {
        p.y = w.b.t - p.h;
      }
      if ($.o.left(p, w)) {
        p.x = w.b.r;
      } else if ($.o.right(p, w)) {
        p.x = w.b.l - p.w;
      }
    });

    // Collisions with zombies
    if (_.ic === 0) {
      $.g.z.c(_, function(p, z) {
        _.humanity -= z.bite();
        _.ic = INVINCIBILITY_TIME;
        $.ss.shake(1.8, 200)
      });
    }

    // Collisions with items
    $.g.i.c(_, function(p, i) {
      i.a = 0;
      if (i.type === ITEMS.MEDIKIT) {
        _.hc = MEDIKIT_DURATION;
      } else {
        _.collectedItems.push(i.type);
      }
    });

    _.updateRect();
  };

  _.r = function(p) {
    $.x.s();
    //if (_.ic !== 0)
    //  $.x.fs('#000000');
    //else
    //  $.x.fs('#ff0000');
    $.x.fs(_.skinColor);
    // Face
    $.x.fr(p.x + 16, p.y + 5, 34, 20);
    // Lab coat
    $.x.fs('white');
    $.x.fr(p.x + 16, p.y + 25, 34, 33);
    // Feet
    $.x.fs('black');
    $.x.fr(p.x + 22, p.y + 59, 9, 6);
    $.x.fr(p.x + 35, p.y + 59, 9, 6);

    if (_.d === 'd') {
      // T-shirt
      $.x.fs('#2196f3');
      $.x.fr(p.x + 29, p.y + 25, 8, 24);

      $.x.fs('black');
      $.x.fr(p.x + 29, p.y + 49, 8, 7);
      $.x.fr(p.x + 29, p.y + 56, 2, 3);
      $.x.fr(p.x + 35, p.y + 56, 2, 3);
      // Eyes
      $.x.fr(p.x + 24, p.y + 8, 4, 4);
      $.x.fr(p.x + 37, p.y + 8, 4, 4);
      // Hands
      $.x.fs(_.skinColor);
      $.x.fr(p.x + 16, p.y + 42, 4, 4);
      $.x.fr(p.x + 46, p.y + 42, 4, 4);
      // Hair
      $.x.fs(_.hairColor);
      if (_.sex === 'm') {
        $.x.fr(p.x + 16, p.y + 5, 4, 15);
        $.x.fr(p.x + 20, p.y + 1, 26, 4);
        $.x.fr(p.x + 46, p.y + 5, 4, 15);
      }
    } else if (_.d === 'u') {
      $.x.fs(_.hairColor);
      if (_.sex === 'm') {
        $.x.fr(p.x + 16, p.y + 5, 34, 15);
        $.x.fr(p.x + 20, p.y + 1, 26, 4);
      }
      // Hands
      $.x.fs(_.skinColor);
      $.x.fr(p.x + 16, p.y + 42, 4, 4);
      $.x.fr(p.x + 46, p.y + 42, 4, 4);
    } else if (_.d === 'l') {
    } else if (_.d === 'r') {
    }
    $.x.r();
  }

  _.has= function(item) {
    return _.collectedItems.indexOf(item) >= 0;
  }

  _.updateAim = function(e) {
    var rect = $.cv.getBoundingClientRect(),
        scaleX = $.cv.width / rect.width,
        scaleY = $.cv.height / rect.height;
    _.aimX = (e.clientX - rect.left) * scaleX;
    _.aimY = (e.clientY - rect.top) * scaleY;
  }

  _.drawAim = function() {
    if (_.aimX === undefined || _.aimY === undefined) return;

    $.x.s();
    $.x.bp();
    $.x.fs('red');
    $.x.arc(_.aimX, _.aimY, 2, 0, 2 * PI);
    $.x.f();
    $.x.cp();
    $.x.fr(_.aimX, _.aimY - 14, 1, 8);
    $.x.fr(_.aimX, _.aimY + 7, 1, 8);
    $.x.fr(_.aimX - 14, _.aimY, 8, 1);
    $.x.fr(_.aimX + 7, _.aimY, 8, 1);
    $.x.r();
  }

  $.cv.addEventListener('mousemove', function(e) {
    _.updateAim(e);
  }, false);
};
