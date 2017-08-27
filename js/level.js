var Level = function() {
  var _ = this;
  _.ww = 0;
  _.wh = 0;
  _.map = [];

  _.gen = function(w, h) {
    var i = 0, j = 0;
    _.ww = w / 32;
    _.wh = h / 32;

    for (j=0; j<_.wh; j++) {
      _.map[j] = [];
      for (i=0; i<_.ww; i++) {
        _.map[j][i] = "0"
      }
    }

    console.log('map:', _.map);
  };

  _.getWorldSize = function() {
    return [_.ww, _.wh];
  };
};
