var Scene = function() {
  var _ = this;

  _.reset = function() {
    // Exit the loop
    _.ex = 0;
    // Time-related variables and methods
    _.t = {
      s: 0, // Start time
      fo: 0, // Fade out time
    };
    $.e = 0;
    _.to = null; // Scene to transition to
  };

  _.start = function() {
    _.reset();
    _.init();
    _.loop();
  };

  _.init = function() {
  };

  // Fade out to another scene (calling recurrently)
  //_.fout = function(scene, t) {
  //  _.t.fo += $.e;
  //   $.x.fs("rgba(0,0,0," + lim(_.t.fo / t, 1) +")");
  //   $.x.fr(0, 0, $.vw, $.vh);

  //   if (_.t.fo >= t) {
  //     _.exit();
  //     scene.start();
  //   }
  //};

  _.loop = function() {
    // Calculate elapsed time
    $.e = (_.t.s !== 0) ? now() - _.t.s : 0;

    // This is to avoid wormholes:
    // https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    //if ($.e < 160) {

    // Update scene
    _.update();

    // Set start time
    _.t.s = now();
    if (!_.ex) {
      raf(_.loop.bind(_));
      //setTimeout(_.loop.bind(_), 20);
    } else {
      return;
    }
  };

  _.exit = function() {
    _.ex = 1;
  }

  _.reset();
};
