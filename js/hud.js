var HUD = function() {
  var _ = this;
  _.barMaxWidth = 200;
  _.barWidth = _.barMaxWidth;

  _.u = function() {
    _.barWidth = $.player.humanity * 2;
  };

  _.r = function() {
    var weapon, o = $.txt.r(20, 20, 'Humanity:', 2, '#fff');
    $.txt.r(0, 85, $.player.weapon.ID, 2, '#fff', { halign: 'center' });
    $.txt.r(400, 85, $.player.ammo + '', 2, '#fff');

    $.x.fs('#333');
    $.x.fr(o.width + 25, 15, 200, 20);
    $.x.fs('#f00');
    $.x.fr(o.width + 25, 15, _.barWidth, 20);
    if ($.player.vaccine) {
      $.x.fs('rgba(0,0,0,0.6)');
      $.x.fr(($.vw - 64) / 2, 15, 64, 64);
    }
    $.x.ss('#fff');
    $.x.lineWidth = 4
    $.x.sr(($.vw - 64) / 2, 15, 64, 64);
  }
};
