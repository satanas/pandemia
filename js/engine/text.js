var Text = function() {
  var _ = this;
  _.size = 5;
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
    ]
  };


  _.drawLine = function(opt) {
    $.x.s();
    $.x.fs(opt.color);
    for( var i = 0; i < opt.text.length; i++ ) {
      // TODO: improve unknown
      var letter = _.LETTERS[ ( opt.text.charAt( i ) ) ] || _.LETTERS[' '];
      for( var y = 0; y < _.size; y++ ) {
        for( var x = 0; x < _.size; x++ ) {
          if( letter[ y ][ x ] === 1 ) {
            $.x.rect( opt.x + ( x * opt.scale ) + ( ( _.size * opt.scale ) + opt.hspacing ) * i, opt.y + y * opt.scale, opt.scale, opt.scale );
          }
        }
      }
    }
    $.x.fill();
    $.x.r();
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
  _.r = function(x, y, tx, sc, c, opt) {
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
      _.drawLine({
        x: x,
        y: y,
        text: line.toUpperCase(),
        hspacing: opt.hspacing,
        scale: sc,
        color: c
      });
    }

    return {
      lines: lines,
      width: textWidth,
      height: textHeight
    };
  };
};
