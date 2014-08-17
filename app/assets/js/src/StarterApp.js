/*-------JSHint Directives-------*/
/* global StarterApp, THREE      */
/*-------------------------------*/
'use strict';


/****************************
 * App Function Constructor *
 ****************************/
function StarterApp() {
  // Functions defined in Core
  this.initializeSettings();
  this.initializeClock();
  this.initializeScene();
  this.initializeCamera();
  this.initializeControls();
  this.initializeHUD();
  this.initializeEventListeners();
}
