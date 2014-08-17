/*-------JSHint Directives-------*/
/* global StarterApp           */
/*-------------------------------*/
'use strict';


/****************
 * Main Program *
 ****************/
(function() {
  var city = new StarterApp();
  console.log(city);
  city.enableFloorGrid();
  city.updateScene();

})();
