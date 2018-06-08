AFRAME.registerComponent("bullet", {
  schema: {
    velocity: {
      type: "vec3"
    }
  },
  init: function() {
    this.game = this.el.sceneEl.systems["game"];
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = 0;
    this.raycaster.far = this.data.velocity.clone().multiplyScalar(1000); // TODO: use data from age.max

    var pos = this.el.object3D.position.clone();
    this.raycaster.set(pos, this.data.velocity);
    this.collisionPoint = null;
    var intersects = this.raycaster.intersectObject(
      this.game.collidables.object3D,
      true
    );
    if (intersects.length > 0) {
      this.collisionPoint = intersects[0].point;
    }
  },
  tick: function(time, timeDelta) {
    if (
      this.collisionPoint &&
      this.collisionPoint.distanceToSquared(this.el.object3D.position) < 2
    ) {
      this.game.addExplosion(this.collisionPoint);
      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        return;
      }
    }
    this.el.object3D.position.add(
      this.data.velocity.clone().multiplyScalar(timeDelta / 1000)
    );
  }
});
