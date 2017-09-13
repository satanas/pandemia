var Input = function() {
  var _ = this,
      ps = {},
      // Register the type of event (up: 1, down: -1)
      ev = {};

  D.body.addEventListener('keydown', function(e) {
    if (e.keyCode in ps) {
      e.preventDefault();
      ev[e.keyCode] = -1;
      ps[e.keyCode] = 1;
    }
  });

  D.body.addEventListener('keyup', function(e) {
    if (e.keyCode in ps) {
      e.preventDefault();
      ev[e.keyCode] = 1;
      ps[e.keyCode] = 0;
    }
  });

  /* Is pressed */
  _.p = function(c) {
    if (c instanceof Array) {
      for(var i=0; i < c.length; i++) {
        if (!!ps[c[i]]) return 1;
      }
      return 0;
    } else {
      return !!ps[c];
    }
  };
  /* Is released */
  //_.r = function(c) {
  //  return ev[c] === 1;
  //};
  ///* Is down */
  //_.d = function(c) {
  //  return ev[c] === -1;
  //};
  /* Update */
  _.u = function() {
    Object.keys(ps).forEach(function(k){
      ev[k] = 0;
    });
  };
  /* Bind */
  _.b = function(ks) {
    ks.forEach(function(k){
      ps[k] = 0;
      ev[k] = 0;
    });
  };
  /* Clear */
  //_.c = function() {
  //  Object.keys(ps).forEach(function(k){
  //    ev[k] = 0;
  //    ps[k] = 0;
  //  });
  //};
};
