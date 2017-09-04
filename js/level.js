// Based on http://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268
// Arguments: level number, width, height, number of enemies, item to be placed, leaf size
// TODO: Extract grid behavior outside the level, inherit and only implement the parts relevant for this level
var Level = function() {
  var _ = this;
  _.ww = 0;
  _.wh = 0;
  _.map = [];
  _.leafs = [];
  _.root = null;
  // TODO: Pass maxLeafSize as parameter
  _.maxLeafSize = 20;

  _.arooms = [];

  _.gen = function(w, h) {
    var i = 0, j = 0;
    _.ww = w / GRID_SIZE;
    _.wh = h / GRID_SIZE;

    _.makeLeafs();
    _.root.createRooms();

    //        i ...
    //        ↓
    //      +---+---+---+---+
    //  j → | O | O | O | O |
    //  .   +---+---+---+---+
    //  .   |   |   |   |   |
    //  .   +---+---+---+---+
    //      |   |   |   |   |
    //      +---+---+---+---+
    // j represents a full row, so it should iterate over the Y coord
    // i represents the column, so it should iterate over the X coord
    //
    // Fill map with non-walkable blocks (walls)
    for (j=0; j<_.wh; j++) {
      _.map[j] = [];
      for (i=0; i<_.ww; i++) {
        _.map[j][i] = "#"
      }
    }

    // Now we set walkable blocks according to the available rooms
    _.leafs.forEach(function(leaf) {
      var room = leaf.room;
      if (room !== null) {
        _.arooms.push(Rect.fromGrid(room));
        for (j=room.y; j<room.y + room.h; j++) {
          for (i=room.x; i<room.x + room.w; i++)
            _.map[j][i] = ".";
        }
      }

      leaf.halls.forEach(function(hall) {
        if (hall === null || hall === undefined) return;
        //_.arooms.push(Rect.fromGrid(hall));
        for (j=hall.y; j<hall.y + hall.h; j++) {
          for (i=hall.x; i<hall.x + hall.w; i++)
            _.map[j][i] = ".";
        }
      });
    });

    // Load the walls
    for (j=0; j<_.wh; j++) {
      for (i=0; i<_.ww; i++) {
        if (_.isWall(i, j)) {
          $.g.walls.add(new Wall(i * GRID_SIZE, j * GRID_SIZE));
        }
      }
    }

    // Add player
    // TODO: Assign player to an empty room (centered)
    $.player = new Player(120, 120);
    $.g.i.add(new Antigens(320, 320));

    // Extract the arooms from the array once they're used. Use a while loop
    // to avoid modifying the condition for the for loop
    var assignedIndexes = [];
    for (i=0; i < _.arooms.length / 3; i++) {
      do {
        j = rndr(0, _.arooms.length)
      } while (assignedIndexes.indexOf(j) !== -1);
      _.addSpawner(_.arooms[j]);
      assignedIndexes.push(j);
    }

    // Load items
    //assignedIndexes = [];
    //for (i=0; i < _.arooms.length / 3; i++) {
    //  do {
    //    j = rndr(0, _.arooms.length)
    //  } while (assignedIndexes.indexOf(j) !== -1);
    //  _.addSpawner(_.arooms[j]);
    //  assignedIndexes.push(j);
    //}

    // Printing map to console
    _.print();
  };

  _.isWall = function(x, y) {
    return (_.map[y][x] === '#');
  }

  _.getWorldSize = function() {
    return [_.ww, _.wh];
  };

  _.length = function() {
    return _.ww * _.wh;
  };

  _.addSpawner = function(room) {
    var s = new Spawner(room, $.player),
        rect = new Rect(s.x, s.y, s.w, s.h).toGrid();

    $.g.s.add(s);
    for (j=rect.y; j<rect.b.b; j++) {
      for (i=rect.x; i<rect.b.r; i++) {
        _.map[j][i] = "s"
      }
    }
  };

  _.makeLeafs = function() {
    var didsplit = true;

    _.root = new Leaf(0, 0, _.ww, _.wh);
    _.leafs.push(_.root);

    while (didsplit) {
      didsplit = false;

      for (var i=0; i < _.leafs.length; i++) {
        var l = _.leafs[i];

        // If this leaf is not already split
        if (l.lc === null && l.rc === null) {
          // Split if the leaf is too big or 75% chance
          if (l.w > _.maxLeafSize || l.h > _.maxLeafSize || rnd() > 0.25) {
            // Split the leaf
            if (l.split()) {
              _.leafs.push(l.lc);
              _.leafs.push(l.rc);
              didsplit = true;
            }
          }
        }
      } // end for
    }
  };

  _.print = function() {
    var v, u, row;
    for (v=0; v<_.wh; v++) {
      row = [];
      for (u=0; u<_.ww; u++) {
        row.push(_.map[v][u]);
      }
      console.log(v, row.join(''));
    }
  };

};

var Leaf = function(x, y, w, h) {
  var _ = this;
  _.x = x;
  _.y = y;
  _.w = w;
  _.h = h;
  _.lc = null; // left child
  _.rc = null; //right child
  _.min = 20; // min leaf size
  _.room = null;
  _.halls = [];

  _.split = function() {
    // Abort if the lead if already splitted
    if (_.lc !== null || _.rc !== null)
      return false;

    // Determine direction of split
    // if the width is >25% larger than the height, we split vertically
    // if the height is >25% larger than the width, we split horizontally
    // else we split randomly
    var splith = !!rndr(0, 2);
    if (_.w > _.h && _.w / _.h >= 1.25) {
      splith = false;
    } else if (_.h > _.w && _.h / _.w >= 1.25) {
      splith = true;
    }

    // Determine max height or width
    var max = (splith ? _.h : _.w) - _.min;
    // Abort if the area is too small to split
    if (max <= _.min)
      return false;

    // Determine where we're going to split
    var split = rndr(_.min, max + 1);

    // Create the left and right children
    if (splith) {
      _.lc = new Leaf(_.x, _.y, _.w, split);
      _.rc = new Leaf(_.x, _.y + split, _.w, _.h - split);
    } else {
      _.lc = new Leaf(_.x, _.y, split, _.h);
      _.rc = new Leaf(_.x + split, _.y, _.w - split, _.h);
    }

    return true;
  };

  // This function generates all the rooms and hallways for this lead and its children
  _.createRooms = function() {
    if (_.lc !== null || _.rc !== null) {
      if (_.lc !== null)
        _.lc.createRooms();
      if (_.rc !== null)
        _.rc.createRooms();
      if (_.lc !== null && _.rc !== null)
        _.createHall(_.lc.getRoom(), _.rc.getRoom());
    } else {
      // This leaf is ready to make a room. The room can be 3 x 3 tiles to the size of the leaf - 2.
      // Then, place the room within the leaf, but don't put it right against the side of the leaf because
      // that would merge the two rooms together.
      // TODO: Pass minimum size of the room as parameter
      var w = rndr(5, _.w - 2),
          h = rndr(5, _.h - 2),
          x = rndr(1, _.w - w - 1),
          y = rndr(1, _.h - h - 1);
      _.room = new Rect(_.x + x, _.y + y, w, h);
    }
  };

  // Iterate all the through these leafs to find a room, if one exists.
  _.getRoom = function() {
    if (_.room !== null) {
      return _.room;
    } else {
      var lRoom, rRoom;
      if (_.lc !== null)
        lRoom = _.lc.getRoom();
      if (_.rc !== null)
        rRoom = _.rc.getRoom();

      if (lRoom === null && rRoom === null)
        return null;
      else if (rRoom === null)
        return lRoom;
      else if (lRoom === null)
        return rRoom;
      else if (rnd() > 0.5)
        return lRoom;
      else
        return rRoom;
    }
  };

  // TODO: Pass hall height as parameter
  // Now we'll connect these two rooms together with hallways
  _.createHall = function(lRoom, rRoom) {
    var p1 = new Point(rndr(lRoom.b.l + 1, lRoom.b.r - 2), rndr(lRoom.b.t + 1, lRoom.b.b - 2)),
        p2 = new Point(rndr(rRoom.b.l + 1, rRoom.b.r - 2), rndr(rRoom.b.t + 1, rRoom.b.b - 2)),
        w = p2.x - p1.x,
        h = p2.y - p1.y,
        hallHeight = 6;

    if (w < 0) {
      if (h < 0) {
        if (rnd() < 0.5) {
          _.halls.push(new Rect(p2.x, p1.y, abs(w), hallHeight));
          _.halls.push(new Rect(p2.x, p2.y, hallHeight, abs(h)));
        } else {
          _.halls.push(new Rect(p2.x, p2.y, abs(w), hallHeight));
          _.halls.push(new Rect(p1.x, p2.y, hallHeight, abs(h)));
        }
      } else if (h > 0) {
        if (rnd() < 0.5) {
          _.halls.push(new Rect(p2.x, p1.y, abs(w), hallHeight));
          _.halls.push(new Rect(p2.x, p1.y, hallHeight, abs(h)));
        } else {
          _.halls.push(new Rect(p2.x, p2.y, abs(w), hallHeight));
          _.halls.push(new Rect(p1.x, p1.y, hallHeight, abs(h)));
        }
      } else { // if (h === 0)
          _.halls.push(new Rect(p2.x, p2.y, abs(w), hallHeight));
      }
    } else if (w > 0) {
      if (h < 0) {
        if (rnd() < 0.5) {
          _.halls.push(new Rect(p1.x, p2.y, abs(w), hallHeight));
          _.halls.push(new Rect(p1.x, p2.y, hallHeight, abs(h)));
        } else {
          _.halls.push(new Rect(p1.x, p1.y, abs(w), hallHeight));
          _.halls.push(new Rect(p2.x, p2.y, hallHeight, abs(h)));
        }
      } else if (h > 0) {
        if (rnd() < 0.5) {
          _.halls.push(new Rect(p1.x, p1.y, abs(w), hallHeight));
          _.halls.push(new Rect(p2.x, p1.y, hallHeight, abs(h)));
        } else {
          _.halls.push(new Rect(p1.x, p2.y, abs(w), hallHeight));
          _.halls.push(new Rect(p1.x, p1.y, hallHeight, abs(h)));
        }
      } else { // if (h === 0)
          _.halls.push(new Rect(p1.x, p1.y, abs(w), hallHeight));
      }
    } else { // if (w === 0)
      if (h < 0) {
          _.halls.push(new Rect(p2.x, p2.y, hallHeight, abs(h)));
      } else if (h > 0) {
          _.halls.push(new Rect(p1.x, p1.y, hallHeight, abs(h)));
      }
    }
  };
};
