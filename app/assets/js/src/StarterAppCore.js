/*-------JSHint Directives-------*/
/* global StarterApp, THREE      */
/*-------------------------------*/
'use strict';


/**********************
 * App Initialization *
 **********************/
StarterApp.prototype.initializeSettings = function() {
  this.settings = {
    meta: {
      dom: 'canvas-body',
    },

    camera: {
      fov: 45,
      near: 1,
      far: 1000,
      zoomX: 0,
      zoomY: 20,
      zoomZ: 50,
    },

    controls: {
      enabled: true,
      userPan: false,
      userPanSpeed: 0.5,
      minDistance: 10.0,
      maxDistance: 200.0,
      maxPolarAngle: (Math.PI/180) * 85,
    },

    renderer: {
      antialias: false,
    },
  };
};


StarterApp.prototype.initializeClock = function() {
  this.clock = new THREE.Clock();
  this.clock.delta = this.clock.getDelta();
};


StarterApp.prototype.initializeScene = function() {
  this.scene = new THREE.Scene();
  this.renderer = new THREE.WebGLRenderer(this.settings.renderer);
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.utils.addToDOM(this.settings.meta.dom, this.renderer.domElement);
  this.renderer.running = true;
};


StarterApp.prototype.initializeCamera = function() {
  var set = this.settings.camera;
  var aspect = window.innerWidth/window.innerHeight;
  this.camera = new THREE.PerspectiveCamera(set.fov, aspect, set.near, set.far);
  this.camera.position.set(set.zoomX, set.zoomY, set.zoomZ);
  this.camera.lookAt(this.scene.position);
  this.scene.add(this.camera);
};


StarterApp.prototype.initializeControls = function() {
  var set = this.settings.controls;
  this.controls = new THREE.OrbitControls(this.camera);
  for (var key in set) { this.controls[key] = set[key]; }
};


StarterApp.prototype.initializeHUD = function() {
  this.HUD = {};
  this.enablePausedHUD();
};


StarterApp.prototype.initializeEventListeners = function() {
  window.addEventListener('resize', this.resizeWindow.bind(this), false);
  window.addEventListener('focus', this.resumeClock.bind(this), false);
  window.addEventListener('blur', this.pauseClock.bind(this), false);
  window.addEventListener('keydown', this.keyboardInput.bind(this), false);
};


/****************************
 * App Renderer and Updater *
 ****************************/
StarterApp.prototype.renderScene = function() {
  this.renderer.render(this.scene, this.camera);
};


StarterApp.prototype.updateScene = function() {
  if (this.renderer.running) {
    window.requestAnimationFrame(this.updateScene.bind(this));
    this.controls.update();
    this.renderScene();
  }
};


StarterApp.prototype.resizeWindow = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
};


/*********************
 * App Clock Methods *
 *********************/
StarterApp.prototype.resumeClock = function() {
  this.clock.start();
};


StarterApp.prototype.pauseClock = function() {
  this.clock.stop();
};


StarterApp.prototype.resumeRenderer = function() {
  this.renderer.running = true;
  this.resumeClock();
  window.requestAnimationFrame(this.updateScene.bind(this));
};


StarterApp.prototype.pauseRenderer = function() {
  this.renderer.running = false;
  this.pauseClock();
};


StarterApp.prototype.togglePause = function() {
  if (this.renderer.running) {
    this.HUD.paused.style.display = 'block';
    this.controls.enabled = false;
    this.pauseRenderer();
  }
  else {
    this.HUD.paused.style.display = 'none';
    this.controls.enabled = true;
    this.resumeRenderer();
  }
};


/***********************
 * App Event Listeners *
 ***********************/
StarterApp.prototype.keyboardInput = function(event) {
  switch (event.which) {

  // spacebar: toggle pause
  case 32:
    event.preventDefault();
    this.togglePause();
    break;
  }
};


/**********************
 * App Public Methods *
 **********************/
StarterApp.prototype.changeSettings = function(type, dictionary) {
  var setting = this.settings[type];
  for (var key in dictionary) {
    if (setting.hasOwnProperty(key)) {
      setting[key] = dictionary[key];
    }
  }
};


StarterApp.prototype.addToScene = function(mesh) {
  this.scene.add(mesh);
};


StarterApp.prototype.enableFloorGrid = function(lines, steps, gridColor) {
  lines = lines || 20;
  steps = steps || 2;
  gridColor = gridColor || 0xFFFFFF;
  var floorGrid = new THREE.Geometry();
  var gridLine = new THREE.LineBasicMaterial( {color: gridColor} );
  for (var i = -lines; i <= lines; i += steps) {
    floorGrid.vertices.push(new THREE.Vector3(-lines, 0, i));
    floorGrid.vertices.push(new THREE.Vector3( lines, 0, i));
    floorGrid.vertices.push(new THREE.Vector3( i, 0, -lines));
    floorGrid.vertices.push(new THREE.Vector3( i, 0, lines));
  }
  this.scene.add(new THREE.Line(floorGrid, gridLine, THREE.LinePieces));
};
