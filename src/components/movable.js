AFRAME.registerComponent("movable", {
  schema: {
    velocity: {
      type: "vec3"
    }
  },
  init: function() {},
  tick: function(time, timeDelta) {
    this.el.object3D.position.add(
      this.data.velocity.clone().multiplyScalar(timeDelta / 1000)
    );
  }
});
