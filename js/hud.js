var HUD = function() {
  var _ = this;
  _.barMaxWidth = 200;
  _.barWidth = _.barMaxWidth;

  _.u = function() {
    _.barWidth = $.player.humanity * 2;
  };

  _.r = function() {
    var weapon, o = $.text.draw({
      text: 'Humanity:',
      x: 20,
      y: 20,
      color: '#fff',
      scale: 2,
      shadow: {
        value: 1,
        color: '#000'
      }
    });

    $.text.draw({
      text: $.player.weapon.ID,
      y: 85,
      halign: 'center',
      color: '#fff',
      scale: 2,
      shadow: {
        value: 1,
        color: '#000'
      }
    });

    $.text.draw({
      text: $.player.ammo + '',
      x: 400,
      y: 85,
      color: '#fff',
      scale: 2,
      shadow: {
        value: 1,
        color: '#000'
      }
    });

    $.x.s();
    $.x.fs('#333');
    $.x.fr(o.width + 25, 15, 200, 20);
    $.x.fs('#ff0000');
    $.x.fr(o.width + 25, 15, _.barWidth, 20);
    if ($.player.vaccine) {
      $.x.fs('rgba(0,0,0,0.6)');
      $.x.fr(($.vw - 64) / 2, 15, 64, 64);
    }
    $.x.ss('#fff');
    $.x.lineWidth = 4
    $.x.sr(($.vw - 64) / 2, 15, 64, 64);
    $.x.r();

  }

  _.drawIcon = function(x, y, type, text, tx, bw) {
    $.x.s();
    $.x.fs('rgba(128,128,128, 0.4)');
    $.x.fr(x, y, 40, 40);
    $.x.r();
    if (type === ITEMS.SYRINGE) {
      Syringe.draw(x + 4, y + 4, 1);
    } else if (type === ITEMS.ANTIGENS) {
      new Antigens().draw(x + 4, y + 4, 0, bw);
    } else if (type === ITEMS.STABILIZERS) {
      new Stabilizers().draw(x + 4, y + 4, 0, bw);
    } else if (type === ITEMS.STABILIZERS) {
      new Stabilizers().draw(x + 4, y + 4, 0, bw);
    } else if (type === ITEMS.ANTIBIOTICS) {
      new Antibiotics().draw(x + 4, y + 4, 0, bw);
    } else if (type === ITEMS.ADJUVANTS) {
      new Adjuvants().draw(x + 4, y + 4, 0, bw);
    }

    $.text.draw({
      text: text,
      x: tx,
      y: 58,
      color: '#f00',
      scale: 1.5
    });
  };
};
