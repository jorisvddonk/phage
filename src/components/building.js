AFRAME.registerComponent("building", {
  init: function() {
    this.el.setAttribute("building-model-top", "");
    this.el.setAttribute("building-model-bottom", "");
    this.el.setAttribute("place-on-ground", "");
    this.el.setAttribute("destroyable", "hp", 10);
  }
});
