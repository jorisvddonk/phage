AFRAME.registerComponent("bullet", {
  schema: {
    velocity: {
      type: "vec3"
    }
  },
  init: function() {
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = 0;
    this.collidable = document.querySelector("#collidables");
    this.game = this.el.sceneEl.systems["game"];
  },
  tick: function(time, timeDelta) {
    var pos = this.el.object3D.position.clone();
    this.raycaster.far = this.data.velocity
      .clone()
      .multiplyScalar(timeDelta / 1000)
      .length();
    this.raycaster.set(pos, this.data.velocity);
    var intersects = this.raycaster.intersectObject(
      this.collidable.object3D,
      true
    );
    if (intersects.length > 0) {
      this.game.addExplosion(intersects[0].point.clone());
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
