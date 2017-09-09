var HUD = function() {
  var _ = this;
  _.bmxw = 300;
  _.barWidth = _.bmxw;

  _.u = function() {
    _.barWidth = $.player.humanity * _.bmxw / 100;
  };

  _.r = function() {
    var weapon,
        c = '#fff', // text color
        s = 'sans-serif'; // font family

    // Humanity bar
    $.x.fs('#333');
    $.x.fr(50, 30, _.bmxw, 30);
    $.x.fs('#f00');
    $.x.fr(50, 30, _.barWidth, 30);
    $.x.ft('HUMANITY', 26, 60, 55, c, s);

    // Ammo
    Ammo.draw(670, 30);
    $.x.ft('AMMO:', 26, 720, 55, c, s);
    $.x.ft($.player.ammo + '', 26, 820, 55, c, s);

    // Weapon icon
    var cx = ($.vw - 64) / 2,
        wn; // Weapon name
    $.x.fs('rgba(220,220,220,0.6)');
    $.x.fr(cx - 2, 14, 68, 68);
    $.x.ss(c);
    $.x.lineWidth = 4
    $.x.sr(cx - 2, 14, 68, 68);
    if ($.player.weapon.ID === WEAPONS.MG.ID) {
      Gun.draw(cx, 16, 64, 64);
    } else if ($.player.weapon.ID === WEAPONS.SG.ID) {
      Shotgun.draw(cx, 16, 64, 64);
    } else if ($.player.weapon.ID === WEAPONS.FL.ID) {
      Flame.draw(cx, 16, 64, 64);
    }

    // Weapon overlay for vaccine
    if ($.player.vaccine) {
      $.x.fs('rgba(0,0,0,0.8)');
      $.x.fr(cx, 16, 64, 64);
      Vaccine.draw(cx + 16, 32);
      wn = 'VACCINE';
    } else {
      wn = $.player.weapon.ID;
    }
    $.x.ct(wn, 18, 105, c, s);
  }
};
