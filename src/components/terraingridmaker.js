AFRAME.registerComponent("terraingridmaker", {
  init: function() {
    // Generate terrain by generating a bunch of entity elements that each cover a small section of the planet geometry
    // Splitting a terrain up into multiple geometries speeds up things like collision detection massively.
    var gridelements = 4; //the actual number of grid elements generated is this number, squared
    var gridsize = 25;
    for (var y = 0; y < gridelements; y++) {
      for (var x = 0; x < gridelements; x++) {
        var xmin = x * gridsize;
        var xmax = xmin + gridsize;
        var ymin = y * gridsize;
        var ymax = ymin + gridsize;
        var newElem = document.createElement("a-entity");
        var hscale = 0.5;
        newElem.setAttribute("position", {
          x: gridsize * gridelements * hscale * -0.5,
          z: gridsize * gridelements * hscale * 0.5,
          y: 0
        });
        newElem.setAttribute("terrain", "xmin", xmin);
        newElem.setAttribute("terrain", "xmax", xmax);
        newElem.setAttribute("terrain", "ymin", ymin);
        newElem.setAttribute("terrain", "ymax", ymax);
        newElem.setAttribute("terrain", "hscale", hscale);
        newElem.setAttribute("terrain", "vscale", 1);
        newElem.setAttribute("terrain", "noiseresolution", 0.1);
        this.el.appendChild(newElem);
      }
    }
  }
});
