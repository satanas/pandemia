var HUD = function() {
  var _ = this;
  _.bmx = 300;
  _.bw = _.bmx;
  _.mm = new R($.vw - 140, $.vh - 140, 120, 120); // Minimap width and height

  _.sws = function(w, h) {
    _.ww = w;
    _.wh = h;
  }

  _.u = function() {
    _.bw = $.player.hum * _.bmx / 100;
  };

  _.r = function() {
    var c = WH, // text color
        s = FN; // text scale

    // Humanity bar
    $.x.fs('#333');
    $.x.fr(50, 30, _.bmx, 30);
    $.x.fs(RD);
    $.x.fr(50, 30, _.bw, 30);
    $.x.ft('HUMANITY', 26, 60, 55, c, s);

    // Ammo
    Ammo.d(670, 30);
    $.x.ft('AMMO:', 26, 720, 55, c, s);
    $.x.ft($.player.ammo + '', 26, 820, 55, c, s);

    // Weapon icon
    var cx = ($.vw - 64) / 2,
        wn; // Weapon name
    $.x.fs('rgba(220,220,220,0.6)');
    $.x.fr(cx - 2, 14, 68, 68);
    $.x.ss(c);
    $.x.lw(4);
    $.x.sr(cx - 2, 14, 68, 68);
    if ($.player.wpn.ID === WPN.MG.ID) {
      Gun.d(cx, 16, 64, 64);
    } else if ($.player.wpn.ID === WPN.SG.ID) {
      Shotgun.d(cx, 16, 64, 64);
    } else if ($.player.wpn.ID === WPN.FL.ID) {
      Flame.d(cx, 16, 64, 64);
    }

    // Weapon overlay for vaccine
    if ($.player.vaccine) {
      $.x.fs('rgba(0,0,0,0.8)');
      $.x.fr(cx, 16, 64, 64);
      Vaccine.d(cx + 16, 32);
      wn = 'VACCINE';
    } else {
      wn = $.player.wpn.ID;
    }
    $.x.ct(wn, 18, 105, c, s);

    // Minimap
    var px,
        py,
        vc = '#f0f', // Vaccine color
        sc = '#0f0' // Safe zone color;
    if ($.scn.game.zn) {
      _.dc(_.mm.x + 5, _.mm.y - 18, sc);
      $.x.ft('= safe zone', 11, _.mm.x + 10, _.mm.y - 15, c, s);
      _.dc(_.mm.x + 5, _.mm.y - 8, vc);
      $.x.ft('= vaccine', 11, _.mm.x + 10, _.mm.y - 5, c, s);
      $.x.ga(0.5);
      $.x.fs('#04d');
      $.x.fr(_.mm.x, _.mm.y, _.mm.w, _.mm.h);
      $.x.ga(0.7);

      // Draw player position
      _.rp($.player.x, $.player.y, c);

      // Draw safe zone position
      _.rp($.endzone.x, $.endzone.y, sc);

      // Draw vaccine position
      _.rp($.vaccine.x, $.vaccine.y, vc);

      $.x.ga(1);
    }
  }

  // Render point position
  _.rp = function(x, y, c) {
    var px = floor(x * 120 / _.ww),
        py = floor(y * 120 / _.wh);
    _.dc(_.mm.x + px, _.mm.y + py, c);
  }

  // Draw just a circle
  _.dc = function(x, y, c) {
    $.x.fs(c);
    $.x.bp();
    $.x.arc(x, y, 2, 0, 2 * PI);
    $.x.cp();
    $.x.f();
  }
};
