var ScreenShake = function() {
  var _ = this;

  _.elapsed = 0;
  _.duration = 0;
  _.magnitude = 0;
  _.speed = 20;
  _.perc = 0; // percentage completed

  _.u = function() {
    if (_.duration !== 0 && _.elapsed < _.duration) {
      _.elapsed += $.e;
      var perc = _.elapsed / _.duration,
          damper = 1 - iir(4 * perc - 3, 0, 0.1),
          x = (rnd() % 32768) * rnde([-1, 1]);
          y = (rnd() % 32768) * rnde([-1, 1]);

      x *= _.magnitude * damper;
      y *= _.magnitude * damper;
      $.cam.ofx += x;
      $.cam.ofy += y;
      if (_.elapsed >= _.duration) {
        _.duration = 0;
      }
    }
  }
  _.shake = function(mag, dur) {
    _.elapsed = 0
    _.perc = 0;
    _.duration = dur;
    _.magnitude = mag;
  }
}
