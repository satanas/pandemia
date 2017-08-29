// Based on http://buildnewgames.com/astar/
var AStar = function(ww, wh) {
  var _ = this;
  _.ww = ww;
  _.wh = wh;

  // Manhattan distance
  _.getdist = function(p, q) {
    return abs(p.x - q.x) + abs(p.y - q.y);
  };

  // Returns adjacent available cells north, south, east and west that aren't blocked.
  _.neighbours = function(x, y) {
    var n = y - 1, // north
        s = y + 1, // south
        e = x + 1, // east
        w = x - 1, // west
        aN = n > -1 && !$.lvl.isWall(x, n),   // available north
        aS = s < _.wh && !$.lvl.isWall(x, s), // available south
        aE = e < _.ww && !$.lvl.isWall(e, y), // available east
        aW = w > -1 && !$.lvl.isWall(w, y),   // available west
        r = []; // result
    if (aN)
      r.push({x:x, y:n});
    if (aS)
      r.push({x:x, y:s});
    if (aE)
      r.push({x:e, y:y});
    if (aW)
      r.push({x:w, y:y});
    return r;
  };

  _.findpath = function(a, b) {
    var start = new Node(null, a, _.ww), // start node
        end = new Node(null, b, _.ww), // end node
        mlen = $.lvl.length(), // map size
        wcells = new Array(mlen), // array to store world cells
        lopen = [start], // list of currently open nodes
        lclosed = [], // list of closed nodes
        res = [], // result
        xneigh, // reference to a nearby node
        xnode , // reference to a node being considered now
        xpath, // reference to a node that starts a path in question
        len, max, min, i, j;
    while (len = lopen.length) {
      max = mlen;
      min = -1;
      for (i=0; i<len; i++) {
        if (lopen[i].f < max) {
          max = lopen[i].f;
          min = i;
        }
      }
      xnode = lopen.splice(min, 1)[0];
      if (xnode.v === end.v) { // is it the destination node?
        xpath = lclosed[lclosed.push(xnode) - 1];
        do {
          res.push(new Point(xpath.x, xpath.y));
        } while (xpath = xpath.p);
        wcells = lclosed = lopen = [];
        res.reverse();
      } else { // not the destination
        xneigh = _.neighbours(xnode.x, xnode.y);
        for (i=0, j=xneigh.length; i < j; i++) {
          xpath = new Node(xnode, xneigh[i], _.ww);
          if (!wcells[xpath.v]) {
            xpath.g = xnode.g + _.getdist(xneigh[i], xnode);
            xpath.f = xnode.g + _.getdist(xneigh[i], end);
            lopen.push(xpath);
            wcells[xpath.v] = true;
          }
        }
        lclosed.push(xnode);
      }
    }
    return res;
  };
};

var Node = function(pa, po, ww) {
  var _ = this;
  _.p = pa; // parent
  _.v = po.x + (po.y * ww); // value
  _.x = po.x;
  _.y = po.y;
  _.f = 0;
  _.g = 0;
};
