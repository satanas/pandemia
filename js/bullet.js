var Bullet = function(cx, cy, an, type) {
  var _ = this;
  _.an = an;
  _.type = type;
  _.sp = _.type.SP;
  _.lt = 500; // only valid for flame
  if (_.type.ID === WPN.FL.ID) {
    _.an += rndr(-8, 8) * PI / 180;
    _.anVar = _.an + (rnde([-20, -15, 0, 15, 20]) * PI / 180);
    _.xdecay = 20; //rndr(50, 80); // per second
    _.color = 7;
    _.w = rndr(40, 60);
  }

  _.inherits(Sprite);
  Sprite.call(_, cx, cy, _.type.SI, _.type.SI);

  _.u = function() {
    _.x += _.sp * cos(_.an);
    _.y += _.sp * sin(_.an);

    // Collisions with walls
    if (_.type.ID !== WPN.FL.ID) {
      $.g.w.c(_, function(p, w) {
        _.a = 0;
      });
    } else {
      _.w = iir(_.w - ($.e * _.xdecay / 1000), 1);
      _.lt = iir(_.lt - $.e, 0);
      _.color = iir(_.color + ($.e / 12), 7, 22);
      if (_.lt < 400 && _.anVar) {
        _.an = _.anVar;
        _.anVar = 0;
      }
    }

    if (!$.cam.inView(_) || !_.lt) _.a = 0;

    // TODO: Update rect should run inside sprite. I forgot to call this method and
    // lost more than 1 hour debugging
    _.updateRect();
  }

  _.r = function(p) {
    if (_.type.ID === WPN.FL.ID) {
      var c = _.color * 255 / 100,
          o = _.lt / 200;
      $.x.fs('hsla(' + c + ',100%,50%,' + o + ')');
    } else {
      $.x.fs(WH);
    }
    $.x.bp();
    $.x.arc(p.x, p.y, _.w / 2, 0, 2 * PI);
    $.x.cp();
    $.x.f();
  }
}

var Exp = function(x, y) {
  var _ = this;

  _.l = 100;
  _.inherits(Sprite);
  Sprite.call(_, x, y, 64, 64);

  _.u = function() {
    _.l -= $.e;
    _.w = iir(_.w - ($.e * 64 / 100), 0);
    if (_.l < 0) _.a = 0;
  }

  _.r = function(p) {
    $.x.fs(WH);
    $.x.bp();
    $.x.arc(p.x + 32, p.y + 32, _.w, 0, 2 * PI);
    $.x.cp();
    $.x.f();
  }
}
