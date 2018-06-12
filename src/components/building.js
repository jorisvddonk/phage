AFRAME.registerComponent("building", {
  init: function() {
    var top = document.createElement("a-entity");
    top.setAttribute("building-model-top", "");
    var bottom = document.createElement("a-entity");
    bottom.setAttribute("building-model-bottom", "");
    this.el.appendChild(top);
    this.el.appendChild(bottom);
    this.el.setAttribute("place-on-ground", "");
  }
});
