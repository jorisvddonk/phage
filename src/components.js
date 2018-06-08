AFRAME.registerComponent("foo", {
  init: function() {
    this.thrust = 0;
    this.movement = new THREE.Vector3(0, 0, 0);
    this.el.addEventListener("gripchanged", e => {
      if (e.detail.value > 0.01) {
        this.thrust = e.detail.value;
      } else {
        this.thrust = 0;
      }
    });
    this.gravityVector = new THREE.Vector3(0, -0.1, 0);
  },
  tick: function(time, timeDelta) {
    this.el.object3D.setRotationFromQuaternion(
      this.el.children[0].object3D.quaternion
    );
    if (this.thrust) {
      var vector = new THREE.Vector3(0, 1, 0);
      vector.applyQuaternion(this.el.object3D.quaternion);
      this.movement.add(
        vector.multiplyScalar((timeDelta / 1000) * this.thrust * 10)
      );
    }
    this.movement.add(this.gravityVector);
    this.movement.x *= 0.98;
    this.movement.z *= 0.98;
    this.el.object3D.position.add(
      this.movement.clone().multiplyScalar(timeDelta / 1000)
    );
    if (this.el.object3D.position.y < 1) {
      this.el.object3D.position.y = 1;
      this.movement.x = 0;
      this.movement.y = 0;
      this.movement.z = 0;
    }
  }
});
