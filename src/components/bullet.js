AFRAME.registerComponent("bullet", {
  schema: {
    velocity: {
      type: "vec3"
    }
  },
  init: function() {
    this.age = 0;
  },
  tick: function(time, timeDelta) {
    this.el.object3D.position.add(
      this.data.velocity.clone().multiplyScalar(timeDelta / 1000)
    );
    this.age += timeDelta;
    if (this.age > 700) {
      this.el.parentNode.removeChild(this.el);
    }
  }
});
