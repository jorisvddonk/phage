var SimplexNoise = require("simplex-noise");
AFRAME.registerSystem("terrain-data", {
  init: function() {
    console.log("Terrain data system loaded!");
    this.simplex = new SimplexNoise();
  },
  getHeightForCoordinates: function(x, y) {
    return this.simplex.noise2D(x, y);
  }
});
