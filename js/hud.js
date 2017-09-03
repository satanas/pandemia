var HUD = function() {
  var _ = this;
  _.barMaxWidth = 200;
  _.barWidth = _.barMaxWidth;

  _.u = function() {
    _.barWidth = $.player.humanity * 2;
  };

  _.r = function() {
    var o = $.text.draw({
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

    $.x.s();
    $.x.fs('#333');
    $.x.fr(o.width + 25, 15, 200, 20);
    $.x.fs('#ff0000');
    $.x.fr(o.width + 25, 15, _.barWidth, 20);
    $.x.r();

    _.drawIcon(650, 10, ITEMS.SYRINGE, 'Syringe', 640, !$.player.has(ITEMS.SYRINGE));
    _.drawIcon(720, 10, ITEMS.ANTIGENS, 'Antigen', 710, !$.player.has(ITEMS.ANTIGENS));
    _.drawIcon(790, 10, ITEMS.STABILIZERS, 'MgSO4', 790, !$.player.has(ITEMS.STABILIZERS));
    _.drawIcon(860, 10, ITEMS.ANTIBIOTICS, 'Anti-B', 855, !$.player.has(ITEMS.ANTIBIOTICS));
    _.drawIcon(930, 10, ITEMS.ADJUVANTS, 'AI-13', 928, !$.player.has(ITEMS.ADJUVANTS));
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
