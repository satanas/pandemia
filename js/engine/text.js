var Text = function() {
  var _ = this;
  _.size = 5;
  _.fontMap = {};
  _.LETTERS = {
    '1': [
       [  , ,  1,  , 0 ],
       [  , 1, 1,  , 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    '2': [
       [ 1, 1, 1, 1, 0 ],
       [  ,  ,  ,  , 1 ],
       [  , 1, 1, 1, 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    '3': [
       [ 1, 1, 1, 1, 0 ],
       [  ,  ,  ,  , 1 ],
       [  , 1, 1, 1, 1 ],
       [  ,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 0 ]
    ],
    '4': [
       [ 1,  ,  , 1, 0 ],
       [ 1,  ,  , 1, 0 ],
       [ 1, 1, 1, 1, 1 ],
       [  ,  ,  , 1, 0 ],
       [  ,  ,  , 1, 0 ]
    ],
    '5': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1, 1, 0 ],
       [  ,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 0 ]
    ],
    '6': [
       [  , 1, 1, 1, 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1, 1, 0 ],
       [ 1,  ,  ,  , 1 ],
       [  , 1, 1, 1, 0 ]
    ],
    '7': [
       [ 1, 1, 1, 1, 1 ],
       [  ,  ,  ,  , 1 ],
       [  ,  ,  , 1, 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ]
    ],
    '8': [
       [  , 1, 1, 1, 0 ],
       [ 1,  ,  ,  , 1 ],
       [  , 1, 1, 1, 0 ],
       [ 1,  ,  ,  , 1 ],
       [  , 1, 1, 1, 0 ]
    ],
    '9': [
       [  , 1, 1, 1, 0 ],
       [ 1,  ,  ,  , 1 ],
       [  , 1, 1, 1, 1 ],
       [  ,  ,  ,  , 1 ],
       [  , 1, 1, 1, 0 ]
    ],
    '0': [
       [  , 1, 1, 1, 0 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [  , 1, 1, 1, 0 ]
    ],
    'A': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ]
    ],
    'B': [
       [ 1, 1, 1, 1, 0 ],
       [ 1,  ,  , 1, 0 ],
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'C': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'D': [
       [ 1, 1, 1, 1, 0 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 0 ]
    ],
    'E': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1,  , 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'F': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1,  , 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1,  ,  ,  , 0 ]
    ],
    'G': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 0 ],
       [ 1,  , 1, 1, 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'H': [
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ]
    ],
    'I': [
       [ 1, 1, 1, 1, 1 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'J': [
       [  ,  ,  ,  , 1 ],
       [  ,  ,  ,  , 1 ],
       [  ,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'K': [
       [ 1,  ,  , 1, 0 ],
       [ 1,  , 1,  , 0 ],
       [ 1, 1, 1,  , 0 ],
       [ 1,  ,  , 1, 0 ],
       [ 1,  ,  ,  , 1 ]
    ],
    'L': [
       [ 1,  ,  ,  , 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'M': [
       [ 1,  ,  ,  , 1 ],
       [ 1, 1,  , 1, 1 ],
       [ 1,  , 1,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ]
    ],
    'N': [
       [ 1,  ,  ,  , 1 ],
       [ 1, 1,  ,  , 1 ],
       [ 1,  , 1,  , 1 ],
       [ 1,  ,  , 1, 1 ],
       [ 1,  ,  ,  , 1 ]
    ],
    'O': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'P': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 0 ],
       [ 1,  ,  ,  , 0 ]
    ],
    'Q': [
       [ 1, 1, 1, 1, 0 ],
       [ 1,  ,  , 1, 0 ],
       [ 1,  ,  , 1, 0 ],
       [ 1,  ,  , 1, 0 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'R': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  , 1, 0 ],
       [ 1,  ,  ,  , 1 ]
    ],
    'S': [
       [ 1, 1, 1, 1, 1 ],
       [ 1,  ,  ,  , 0 ],
       [ 1, 1, 1, 1, 1 ],
       [  ,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'T': [
       [ 1, 1, 1, 1, 1 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ]
    ],
    'U': [
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    'V': [
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [  , 1,  , 1, 0 ],
       [  ,  , 1,  , 0 ]
    ],
    'W': [
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1,  , 1,  , 1 ],
       [ 1, 1,  , 1, 1 ],
       [ 1,  ,  ,  , 1 ]
    ],
    'X': [
       [ 1,  ,  ,  , 1 ],
       [  , 1,  , 1, 0 ],
       [  ,  , 1,  , 0 ],
       [  , 1,  , 1, 0 ],
       [ 1,  ,  ,  , 1 ]
    ],
    'Y': [
       [ 1,  ,  ,  , 1 ],
       [ 1,  ,  ,  , 1 ],
       [ 1, 1, 1, 1, 1 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ]
    ],
    'Z': [
       [ 1, 1, 1, 1, 1 ],
       [  ,  ,  , 1, 0 ],
       [  ,  , 1,  , 0 ],
       [  , 1,  ,  , 0 ],
       [ 1, 1, 1, 1, 1 ]
    ],
    ' ': [
       [  ,  ,  ,  , 0 ],
       [  ,  ,  ,  , 0 ],
       [  ,  ,  ,  , 0 ],
       [  ,  ,  ,  , 0 ],
       [  ,  ,  ,  , 0 ]
    ],
    ',': [
       [  ,  ,  ,  , 0 ],
       [  ,  ,  ,  , 0 ],
       [  ,  ,  ,  , 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  , 1,  , 0 ]
    ],
    '+': [
       [  ,  ,  ,  , 0 ],
       [  ,  , 1,  , 0 ],
       [  , 1, 1, 1, 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  ,  ,  , 0 ]
    ],
    '/': [
       [  ,  ,  ,  , 1 ],
       [  ,  ,  , 1, 0 ],
       [  ,  , 1,  , 0 ],
       [  , 1,  ,  , 0 ],
       [ 1,  ,  ,  , 0 ]
    ],
    ':': [
       [  ,  ,  ,  , 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  ,  ,  , 0 ],
       [  ,  , 1,  , 0 ],
       [  ,  ,  ,  , 0 ]
    ],
    '@': [
       [  1, 1, 1, 1, 1 ],
       [   ,  ,  ,  , 1 ],
       [  1, 1, 1,  , 1 ],
       [  1,  , 1,  , 1 ],
       [  1, 1, 1, 1, 1 ]
    ],
    '-': [
       [  ,  ,  ,  ,  ],
       [  ,  ,  ,  ,  ],
       [  , 1, 1, 1,  ],
       [  ,  ,  ,  ,  ],
       [  ,  ,  ,  ,  ],
    ],
    '.': [
       [  ,  ,  ,  ,  ],
       [  ,  ,  ,  ,  ],
       [  ,  ,  ,  ,  ],
       [  ,  ,  ,  ,  ],
       [  ,  , 1,  ,  ],
    ],
    '!': [
       [  ,  , 1,  ,  ],
       [  ,  , 1,  ,  ],
       [  ,  , 1,  ,  ],
       [  ,  ,  ,  ,  ],
       [  ,  , 1,  ,  ],
    ]
  };

  // s = font size
  // c = font color
  _.createFont = function(s, c) {
    var i, l,
        fd = s + '+' + c, // font id
        keys = Object.keys(_.LETTERS);

    _.fontMap[fd] = {};

    for (i=0; i < keys.length; i++) {
      l = _.LETTERS[keys[i]] || _.LETTERS[' '];
      _.fontMap[fd][keys[i]] = cache(_.size * s, _.size * s, function(cx, cv) {
        var x, y;
        cx.fillStyle = c;
        for (y = 0; y < _.size; y++ ) {
          for (x = 0; x < _.size; x++ ) {
            if (l[y][x] === 1 ) {
              cx.beginPath();
              cx.rect(x * s, y * s, s, s);
              cx.fill();
            }
          }
        }
        l = null;
      }); // end of cache call
    }
    c = null;
  }

  // s = scale
  // c = color
  // hs = hspacing
  _.drawLine = function(ox, oy, text, s, c, hs) {
    var ff = s + '+' + c, // font family
        i, x, y, l;

    for (i = 0; i < text.length; i++) {
      // TODO: improve unknown
      l = text.charAt(i) || _.LETTERS[' '];
      $.x.drawImage($.txt.fontMap[ff][l], ox + ((s * _.size) + hs) * i, oy);
      //$.x.rect( opt.x + ( x * opt.scale ) + ( ( _.size * opt.scale ) + opt.hspacing ) * i, opt.y + y * opt.scale, opt.scale, opt.scale );
    }
  };

  // tx = text
  // sc: scale
  // x: X coord. Default: 0
  // y: Y coord. Default: 0
  // c: CSS color. Default: #000
  //
  // opt =
  //   halign: horizontal alignment. Values: 'center', 'right'
  //   valign: vertical alignment. Values: 'center', 'bottom'
  //   hspacing: horizontal spacing. Default: 1,
  //   vspacing: vertical spacing. Default: 1,
  //   snap: round to the lower integer. Default: false
  _.r = function(tx, x, y, sc, c, opt) {
    opt = opt || {};
    opt.vspacing = opt.vspacing || 1;
    opt.hspacing = opt.hspacing || 1;

    var letterSize = _.size * sc,
        lines = tx.split("\n"),
        linesCopy = lines.slice(0),
        lineCount = lines.length,
        longestLine = linesCopy.sort( function ( a, b ) { return b.length - a.length; } )[ 0 ],
        textWidth = ( longestLine.length * letterSize ) + ( ( longestLine.length - 1 ) * opt.hspacing ),
        textHeight = ( lineCount * letterSize ) + ( ( lineCount - 1 ) * opt.vspacing );

    for (var i = 0; i < lineCount; i++) {
      var line = lines[i],
          lineWidth = (line.length * letterSize) + ((line.length - 1) * opt.hspacing);
      y = y + (letterSize + opt.vspacing) * i;

      if (opt.halign === 'center') {
        x = ($.vw - lineWidth) / 2;
      } else if (opt.halign == 'right') {
        x = $.vw - lineWidth;
      }

      if (opt.valign === 'center') {
        y = ($.vh - textHeight) / 2;
      } else if( opt.valign == 'bottom' ) {
        y = $.vh - textHeight;
      }

      if (opt.snap) {
        x = Math.floor(x);
        y = Math.floor(y);
      }

      //if (opt.shadow) {
      //  _.drawLine({
      //    x: x + opt.shadow.value,
      //    y: y + opt.shadow.value,
      //    text: line.toUpperCase(),
      //    hspacing: opt.hspacing,
      //    scale: sc,
      //    color: opt.shadow.color
      //  });
      //}
      _.drawLine(x, y, line.toUpperCase(), sc, c, opt.hspacing);
    }

    return {
      lines: lines,
      width: textWidth,
      height: textHeight
    };
  };
};
