AFRAME.registerComponent("bullet", {
  schema: {
    velocity: {
      type: "vec3"
    }
  },
  dependencies: ["movable", "age"],
  init: function() {
    this.game = this.el.sceneEl.systems["game"];
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = 0;

    this.raycaster.far = this.el.components.movable.data.velocity
      .clone()
      .multiplyScalar(this.el.components.age.data.max / 1000)
      .length();

    var pos = this.el.object3D.position.clone();
    this.raycaster.set(
      pos,
      this.el.components.movable.data.velocity.clone().normalize()
    );
    this.collision = null;
    var intersects = this.raycaster.intersectObject(
      this.game.collidables.object3D,
      true
    );
    if (intersects.length > 0) {
      this.collision = intersects[0];
    }
  },
  tick: function(time, timeDelta) {
    if (
      this.collision &&
      this.collision.point.distanceToSquared(this.el.object3D.position) < 2
    ) {
      this.game.addExplosion(this.collision.point);
      if (this.collision.object && this.collision.object.el) {
        this.collision.object.el.emit("hitWithBullet");
      }
      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        return;
      }
    }
  }
});
