AFRAME.registerComponent("generate-trees", {
  schema: {},
  init: function(data) {
    for (var i = 0; i < 300; i++) {
      var SIZE = 49; // TODO: receive this from terrain/world somehow.
      // TODO: do not place trees in water!
      var tree = document.createElement("a-entity");
      tree.setAttribute("tree", "");
      tree.setAttribute("position", {
        x: Math.random() * SIZE - SIZE * 0.5,
        y: 10,
        z: Math.random() * SIZE - SIZE * 0.5
      });
      this.el.appendChild(tree);
    }
  }
});
