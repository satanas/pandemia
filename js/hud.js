var HUD = function() {
  var _ = this;
  _.barMaxWidth = 200;
  _.barWidth = _.barMaxWidth;

  _.u = function() {
    _.barWidth = $.player.humanity * 2;
  };

  _.r = function() {
    var weapon,
        c = '#fff', // text color
        s = 4, // text scale
        ha = { halign: 'center' }, // horizontal alignment
        o = $.txt.r(20, 40, 'Humanity:', s, c),
        p = $.txt.r(700, 40, 'Ammo:', s, c);

    // Humanity bar
    $.x.fs('#333');
    $.x.fr(o.width + 25, 30, 200, 30);
    $.x.fs('#f00');
    $.x.fr(o.width + 25, 30, _.barWidth, 30);
    // Ammo
    Ammo.draw(650, 35);
    $.txt.r(p.width + 725, 40, $.player.ammo + '', s, c);

    // Weapon icon
    var cx = ($.vw - 64) / 2;
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
      $.x.fr(($.vw - 64) / 2, 15, 64, 64);
      $.txt.r(0, 90, 'Vaccine', 2, c, ha);
    } else {
      $.txt.r(0, 90, $.player.weapon.ID, 2, c, ha);
    }
  }
};
