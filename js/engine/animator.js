// Calculates and returns the frame required for that step of the animation.
// Receives the array of images and the duration of each frame
// arr: Array of images
// d: frame duration
var Animator = function(arr, d, f) {
  var _ = this;
  _.arr = arr; // Array of images
  _.d = d; // Frame duration
  _.c = 0; // Animation counter
  _.f = f || 0; // Frame index
  _.cb = 0; // Callback to be called on every frame change

  // Update
  _.u = function() {
    _.c += $.e;
    if (_.c > _.d) {
      _.c = 0;
      _.f += 1;
      _.f = (_.f > _.arr.length - 1) ? 0 : _.f;
      if (_.cb) _.cb(_.f);
    }
  };

  // Get frame
  _.g = function() {
    return _.arr[_.f];
  };
};
