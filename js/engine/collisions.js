var Collisions = function() {
  var _ = this;
  _.rect = function(o1, o2) {
    if (Object.keys(o1.b).length === 0 || Object.keys(o2.b).length === 0) return false;
    return !((o1.b.b < o2.b.t) ||
        (o1.b.t > o2.b.b) ||
        (o1.b.l > o2.b.r) ||
        (o1.b.r < o2.b.l));
  };

  _.faces = function(o1, o2) {
    return {
      t: abs(o1.b.b - o2.b.t),
      b: abs(o1.b.t - o2.b.b),
      l: abs(o1.b.r - o2.b.l),
      r: abs(o1.b.l - o2.b.r)
    };
  };

  _.bottom = function(o1, o2) {
    var f = _.faces(o1, o2);
    return (f.t < f.b && f.t < f.l && f.t < f.r);
  };

  _.top = function(o1, o2) {
    var f = _.faces(o1, o2);
    return (f.b < f.t && f.b < f.l && f.b < f.r);
  };

  _.right = function(o1, o2) {
    var f = _.faces(o1, o2);
    return (f.l < f.b && f.l < f.t && f.l < f.r);
  };

  _.left = function(o1, o2) {
    var f = _.faces(o1, o2);
    return (f.r < f.b && f.r < f.l && f.r < f.t);
  };
};
