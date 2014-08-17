/*-------JSHint Directives-------*/
/* global StarterApp             */
/*-------------------------------*/
'use strict';


/**********************
 * HUD Renderer Pause *
 **********************/
StarterApp.prototype.enablePausedHUD = function() {
  var container = document.createElement('div');
  container.className = 'hud-paused';
  container.textContent = 'Paused';
  this.utils.addToDOM(this.settings.meta.dom, container);
  this.HUD.paused = container;
};
