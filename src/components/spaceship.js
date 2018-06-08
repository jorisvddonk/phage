AFRAME.registerComponent("spaceship", {
  init: function() {
    this.game = this.el.sceneEl.systems["game"];
    this.game.registerShip(this);
    this.thrust = 0;
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.el.addEventListener("gripchanged", e => {
      if (e.detail.value > 0.01) {
        this.thrust = e.detail.value;
      } else {
        this.thrust = 0;
      }
    });
    this.gravityVector = new THREE.Vector3(0, -0.06, 0);

    this.gamepad = navigator.getGamepads()[0];
    window.addEventListener("gamepadconnected", e => {
      console.log(`switched to gamepad ${e.gamepad.index}`);
      this.gamepad = e.gamepad;
    });
    this.quat = new THREE.Quaternion();
    this.quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
    this.TEMPQUAT = new THREE.Quaternion();
    this.TEMP_VEC = new THREE.Vector3(0, 0, 0);
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = 0;
    this.raycaster.far = 100;
    this.raycaster_dir = new THREE.Vector3(0, -1, 0);
    this.collidable = document.querySelector("#collidables");
  },
  tick: function(time, timeDelta) {
    var axis_h = 0;
    var axis_v = 0;
    if (
      this.gamepad &&
      this.gamepad.axes[3] &&
      this.gamepad.axes[0] &&
      this.gamepad.buttons[6]
    ) {
      this.thrust = this.gamepad.buttons[6].value;

      axis_h = this.gamepad.axes[0];
      if (axis_h < 0.1 && axis_h > -0.1) {
        axis_h = 0;
      }
      axis_v = this.gamepad.axes[3];
      if (axis_v < 0.1 && axis_v > -0.1) {
        axis_v = 0;
      }
    }

    if (this.gamepad && this.gamepad.buttons[7]) {
      if (this.gamepad.buttons[7].value > 0.1) {
        this.game.shoot();
      }
    }

    /* // mirror oculus rift hand position
    this.el.object3D.setRotationFromQuaternion(
      this.el.children[0].object3D.quaternion
    );
    */
    this.TEMPQUAT.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      axis_h * -0.05
    ).normalize();
    this.quat.premultiply(this.TEMPQUAT);
    this.TEMPQUAT.set(axis_v * 0.01, 0, 0, 1).normalize();
    this.quat.multiply(this.TEMPQUAT);

    //Do the actual velocity/rotation
    this.el.object3D.setRotationFromQuaternion(this.quat);
    if (this.thrust) {
      var vector = new THREE.Vector3(0, 1, 0);
      vector.applyQuaternion(this.el.object3D.quaternion);
      this.velocity.add(
        vector.multiplyScalar((timeDelta / 1000) * this.thrust * 7)
      );
    }
    this.velocity.add(this.gravityVector);
    this.velocity.x *= 0.98;
    this.velocity.z *= 0.98;
    this.el.object3D.position.add(
      this.velocity.clone().multiplyScalar(timeDelta / 1000)
    );

    var pos = this.el.object3D.position;
    this.TEMP_VEC.set(pos.x, pos.y + 4, pos.z);
    this.raycaster.set(this.TEMP_VEC, this.raycaster_dir);
    var intersects = this.raycaster.intersectObject(
      this.collidable.object3D,
      true
    );
    var y = 0;
    if (intersects.length > 0) {
      y = intersects[0].point.y;
    }

    if (this.el.object3D.position.y < y) {
      this.el.object3D.position.y = y;
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.velocity.z = 0;
    }
  }
});
