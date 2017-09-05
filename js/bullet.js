var Bullet = function(cx, cy, angle, type) {
  var _ = this;
  _.angle = angle;
  _.type = type;
  _.speed = _.type.SPEED;
  _.damage = _.type.DAM;
  _.lifetime = 400; // only valid for flame
  if (_.type.ID === WEAPONS.FLAME.ID) {
    _.angle += (rnde([-15, -10, 0, 10, 15]) * PI / 180);
    _.xdecay = rndr(50, 80); // per second
    _.color = 7;
    _.w = rndr(40, 60);
  }

  _.inherits(Sprite);
  Sprite.call(_, cx, cy, _.type.SIZE, _.type.SIZE);

  _.u = function() {
    _.x += _.speed * cos(_.angle);
    _.y += _.speed * sin(_.angle);

    // Collisions with walls
    $.g.walls.c(_, function(p, w) {
      _.a = 0;
    });

    if (!$.cam.inView(_) || !_.lifetime) {
      _.a = 0;
    }

    // TODO: Update rect should run inside sprite. I forgot to call this method and
    // lost more than 1 hour debugging
    _.updateRect();

    if (_.type.ID === WEAPONS.FLAME.ID) {
      //_.w = iir(_.w - ($.e * _.xdecay / 1000), 1);
      _.lifetime = iir(_.lifetime - $.e, 0);
      _.color = iir(_.color + ($.e / 12), 7, 22);
    }
  }

  _.r = function(p) {
    var c = _.color * 255 / 100,
        o = _.lifetime / 200;
    $.x.s();
    $.x.fs('hsla(' + c + ',100%,50%,' + o + ')');
    $.x.bp();
    $.x.arc(p.x, p.y, _.w / 2, 0, 2 * PI);
    $.x.f();
    $.x.cp();
    $.x.r();
  }
}
