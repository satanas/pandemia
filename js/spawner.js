var Spawner = function(room, player, aiDirector) {
  var _ = this;
  _.aiDirector = aiDirector;

  _.inherits(Sprite);
  // Randomize the point inside the room where the spawner is created
  var x = floor(rndr(room.x, room.x + room.w - 64)),
      y = floor(rndr(room.y, room.y + room.h - 64));
  //var x = room.x + (room.w / 2) - 32,
  //    y = room.y + (room.h / 2) - 32;

  console.log('spawner', x, y);
  Sprite.call(_, x, y, 64, 64);
  // Is player close enough?

  _.r = function(p) {
    $.x.s();
    $.x.fs('#7a0400');
    $.x.fr(p.x, p.y, _.w, _.h);
    $.x.r();
  };
};
