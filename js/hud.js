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
        s = 4, // text scale
        ha = { halign: 'center' }, // horizontal alignment
        p = $.txt.r(700, 40, 'Ammo:', s, c);

    // Humanity bar
    $.x.fs('#333');
    $.x.fr(50, 30, _.bmxw, 30);
    $.x.fs('#f00');
    $.x.fr(50, 30, _.barWidth, 30);
    $.txt.r(70, 35, 'Humanity', s, c)

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
      $.x.fr(cx, 16, 64, 64);
      Vaccine.draw(cx + 16, 32);
      $.txt.r(0, 90, 'Vaccine', 2, c, ha);
    } else {
      $.txt.r(0, 90, $.player.weapon.ID, 2, c, ha);
    }
  }
};
