var SVG = function() {
  var _ = this;

  // Create new image from SVG data. You must omit the svg tag, since the method adds it to
  // the string. Just add the content of the svg
  _.n = function(data, w, h) {
    var i = new Image();
    data = '<svg width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg">' + data + '</svg>';

    i.src = 'data:image/svg+xml;base64,' + window.btoa(data);
    i.width = w + '';
    i.height = h + '';
    return i;
  };
};
