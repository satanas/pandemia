// Reciprocal of x^2 function
// http://mathdemos.org/mathdemos/family_of_functions/recip_func_xsquared_vary_a.gif
var AIDirector = function() {
  var _ = this;

  _.fullThreat = 1000;
  _.minThreat = 8000;

  //_.intensity = 0;
  _.spawnEnabled = 1;
  //_.damage = 0;
  _.spawnTime = _.fullThreat;
  //_.count = 0;

  //_.reportAttack = function() {
  //  // TODO: Put magic number elsewhere
  //  _.damage += 50;
  //};

  _.u = function() {
    //var spawners, humanity, enemies, a;

    //_.count += $.e;
    //if (_.count >= 5000) {
    //  _.count = 0;
    //  _.damage = iir(_.damage - 50, 0);
    //}
    //// Total spawners / active spawners
    ////a = $.g.s.e.filter(function(s) { return s.active }).length;
    ////a = (a <= 0) ? 0.1 : a;
    ////spawners = $.g.s.e.length / a;
    //humanity = 2 / pow(100 - 3, 2);
    ////enemies = 40 * sqrt($.g.z.e.length, 1 / 3);
    //_.intensity = spawners + _.damage + humanity + enemies;
    //console.log('spawners', spawners, 'damage', _.damage, 'humanity', humanity, 'enemies', enemies, 'intensity', _.intensity);
  };
};
