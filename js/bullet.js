var Bullet = function(x, y, angle) {
  var _ = this;
  _.angle = angle;
  _.speed = 50;

  _.inherits(Sprite);
  Sprite.call(_, x, y, 12, 12);

  _.u = function() {
    _.x += _.speed * cos(_.angle);
    _.y += _.speed * sin(_.angle);

    // Collisions with walls
    $.g.walls.c(_, function(p, w) {
      _.a = 0;
    });

    if (!$.cam.inView(_)) {
      _.a = 0;
    }

    // TODO: Update rect should run inside sprite. I forgot to call this method and
    // lost more than 1 hour debugging
    _.updateRect();
  }

  _.r = function(p) {
    $.x.s();
    $.x.fs('white');
    $.x.bp();
    $.x.arc(p.x, p.y, _.w / 2, 0, 2 * PI);
    $.x.f();
    $.x.cp();
    $.x.r();
  }
}
