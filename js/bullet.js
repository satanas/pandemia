var Bullet = function(cx, cy, angle, type) {
  var _ = this;
  _.angle = angle;
  _.type = type;
  _.speed = _.type.SPEED;
  _.damage = _.type.DAM;
  _.lifetime = 500; // only valid for flame
  if (_.type.ID === WEAPONS.FLAME.ID) {
    _.angle += rndr(-8, 8) * PI / 180;
    _.angleVar = _.angle + (rnde([-20, -15, 0, 15, 20]) * PI / 180);
    _.xdecay = 20; //rndr(50, 80); // per second
    _.color = 7;
    _.w = rndr(40, 60);
  }

  _.inherits(Sprite);
  Sprite.call(_, cx, cy, _.type.SIZE, _.type.SIZE);

  _.u = function() {
    _.x += _.speed * cos(_.angle);
    _.y += _.speed * sin(_.angle);

    // Collisions with walls
    if (_.type.ID !== WEAPONS.FLAME.ID) {
      $.g.w.c(_, function(p, w) {
        _.a = 0;
      });
    }

    if (!$.cam.inView(_) || !_.lifetime) {
      _.a = 0;
    }

    // TODO: Update rect should run inside sprite. I forgot to call this method and
    // lost more than 1 hour debugging
    _.updateRect();

    if (_.type.ID === WEAPONS.FLAME.ID) {
      _.w = iir(_.w - ($.e * _.xdecay / 1000), 1);
      _.lifetime = iir(_.lifetime - $.e, 0);
      _.color = iir(_.color + ($.e / 12), 7, 22);
      if (_.lifetime < 400 && _.angleVar) {
        _.angle = _.angleVar;
        _.angleVar = 0;
      }
      if (_.lifetime < 200 && _.damage) {
        _.damage = 0;
      }
    }
  }

  _.r = function(p) {
    $.x.s();
    if (_.type.ID === WEAPONS.FLAME.ID) {
      var c = _.color * 255 / 100,
          o = _.lifetime / 200;
      $.x.fs('hsla(' + c + ',100%,50%,' + o + ')');
    } else {
      $.x.fs('white');
    }
    $.x.bp();
    $.x.arc(p.x, p.y, _.w / 2, 0, 2 * PI);
    $.x.f();
    $.x.r();
  }
}
