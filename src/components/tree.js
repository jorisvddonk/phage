AFRAME.registerComponent("tree", {
  init: function() {
    this.el.setAttribute("tree-model", "");
    this.el.setAttribute("place-on-ground", "");
    this.el.setAttribute("destroyable", "hp", 1);
    this.el.setAttribute("rotation", {
      x: 0,
      y: Math.random() * 360,
      z: 0
    });
  }
});
