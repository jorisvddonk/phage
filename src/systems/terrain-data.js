var url = require("url");
var SimplexNoise = require("simplex-noise");
AFRAME.registerSystem("terrain-data", {
  init: function() {
    var parsedURL = url.parse(document.location.toString(), true);
    var seed = undefined;
    if (parsedURL.query.seed) {
      seed = parsedURL.query.seed;
    }
    console.log(
      "Terrain data system loaded! " + (seed ? "Seed : " + seed : "")
    );
    this.simplex = new SimplexNoise(seed);
  },
  getHeightForCoordinates: function(x, y) {
    return this.simplex.noise2D(x, y);
  }
});
