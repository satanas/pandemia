// Based on http://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268
// Arguments: level number, width, height, number of enemies, item to be placed, leaf size
// TODO: Extract grid behavior outside the level, inherit and only implement the parts relevant for this level
var Level = function() {
  var _ = this;
  _.ww = 0;
  _.wh = 0;
  _.map = [];
  _.bkmap = []; // to save the map for the retries
  _.leafs = [];
  _.root = null;
  // TODO: Pass maxLeafSize as parameter
  _.maxLeafSize = 20;

  _.arooms = [];
  _.srooms = [];
  _.pcoord = 0;
  _.os = new Rect(0, 0, 0, 0); // Original map size

  // Generate intro room
  _.iroom = function(w, h) {
    var i = 0, j = 0;
    _.ww = w / GS;
    _.wh = h / GS;

    for (j=0; j<_.wh; j++) {
      _.map[j] = [];
      for (i=0; i<_.ww; i++) {
        if (j === 0 || j === _.wh - 1 || i === 0 || i === _.ww - 1) {
          if ((j >= 3 && j <= 5) && i === 15) {
            if (!$.scn.game.tries) {
              $.g.w.add(new Barricade((i - 1) * GS, j * GS));
            }
            continue;
          }

          _.map[j][i] = "#"
          $.g.w.add(new Wall(i * GS, j * GS));
        } else {
          _.map[j][i] = "."
          $.g.d.add(new Floor(i * GS, j * GS));
        }
      }
    }
    //_.print();
    $.g.h.add(new StartZ(970, 202));
    $.player = new Player(640, 320);
    $.scientist = new Scientist(320, 320);
    $.g.n.add($.scientist);
    $.g.h.add(new IntroZ(256, 256));
    // Create the vaccine only the first time
    if (!$.scn.game.tries) {
      $.g.x.add(new Vaccine(128, 128));
    }
    // Add remaining soldiers
    for (i=0; i < MAX_SOLD - $.scn.game.tries; i++) {
      $.g.n.add(new Soldier(378 + (i * 100), 110));
    }
  }

  _.gen = function(w, h) {
    var i = 0, j = 0;
    _.ww = w / GS;
    _.wh = h / GS;
    _.os.w = _.ww;
    _.os.h = _.wh;

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
          for (i=room.x; i<room.x + room.w; i++) {
            _.map[j][i] = ".";
            $.g.d.add(new Floor(i * GS, j * GS));
          }
        }
      }

      leaf.halls.forEach(function(hall) {
        if (hall === null || hall === undefined) return;
        //_.arooms.push(Rect.fromGrid(hall));
        for (j=hall.y; j<hall.y + hall.h; j++) {
          for (i=hall.x; i<hall.x + hall.w; i++) {
            _.map[j][i] = ".";
            $.g.d.add(new Floor(i * GS, j * GS));
          }
        }
      });
    });

    // Load the walls
    for (j=0; j<_.wh; j++) {
      for (i=0; i<_.ww; i++) {
        if (_.isWall(i, j)) {
          $.g.w.add(new Wall(i * GS, j * GS));
        }
      }
    }

    var assignedIndexes = [], c, px, py;
    // Add player and vaccine in starting room
    i = rndr(0, _.arooms.length)
    c = _.arooms[i].center();
    $.vaccine = new Vaccine(c.x, c.y);
    $.g.x.add($.vaccine);
    _.pcoord = new Point(c.x, c.y);
    $.player.reset(c.x, c.y);
    assignedIndexes.push(i);
    // Add ending room
    do {
      j = rndr(0, _.arooms.length)
    } while (j !== i && _.getdist(c, _.arooms[j]) <= 2000);
    c = _.arooms[j].center();
    $.endzone = new EndZ(c.x, c.y);
    $.g.h.add($.endzone);

    // Extract the arooms from the array once they're used. Use a while loop
    // to avoid modifying the condition for the for loop
    for (i=0; i < _.arooms.length; i++) {
      if (assignedIndexes.indexOf(i) === -1) {
        _.addSpawner(_.arooms[i]);
        _.srooms.push(_.arooms[i]);
      }
    }

    // Save the map for later
    _.bkmap = _.map.slice(0);
    // Printing map to console
    //_.print();
  };

  _.reload = function() {
    _.map = _.bkmap.slice(0);
    _.ww = _.os.w;
    _.wh = _.os.h;
    $.g.h.add($.endzone);
    $.g.x.add($.vaccine);
    // Add zombie soldiers around the lost vaccine
    $.g.z.add(new Zombie($.vaccine.x, $.vaccine.y, 1));
    $.player.reset(_.pcoord.x, _.pcoord.y);

    // Load the walls
    for (j=0; j<_.wh; j++) {
      for (i=0; i<_.ww; i++) {
        var x = _.map[j][i];
        if (x === '#') {
          $.g.w.add(new Wall(i * GS, j * GS));
        } else if (x === '.') {
          $.g.d.add(new Floor(i * GS, j * GS));
        }
      }
    }

    for (i=0; i < _.srooms.length; i++) {
      $.g.s.add(new Spawner(_.srooms[i]));
    }
  }

  _.isWall = function(x, y) {
    return (_.map[y][x] === '#');
  }

  _.getWorldSize = function() {
    return new Rect(0, 0, _.ww * GS, _.wh * GS);
  };

  _.length = function() {
    return _.ww * _.wh;
  };

  _.addSpawner = function(room) {
    var s = new Spawner(room),
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

  _.getdist = function(p, q) {
    return sqrt(pow(p.x - q.x, 2) + pow(p.y - q.y, 2));
    //return abs(p.x - q.x) + abs(p.y - q.y);
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
  _.min = 10; // min leaf size
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
        hallHeight = 3;

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
