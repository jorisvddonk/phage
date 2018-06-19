AFRAME.registerComponent("place-on-ground", {
  init: function() {
    this.iter = 0;
  },
  tick: function(time, timeDelta) {
    this.iter += 1;
    if (this.iter > 100) {
      // ack, taking too long! Probably no surface underneath!
      this.el.removeAttribute("place-on-ground");
    }
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = 0;
    this.raycaster.far = 1000;
    this.raycaster_dir = new THREE.Vector3(0, -1, 0);
    var pos = this.el.object3D.position;
    this.TEMP_VEC = new THREE.Vector3(pos.x, pos.y + 4, pos.z);
    this.raycaster.set(this.TEMP_VEC, this.raycaster_dir);
    this.collidable = document.querySelector("#collidables");
    var intersects = this.raycaster.intersectObject(
      this.collidable.object3D,
      true
    );
    var y = 0;
    if (intersects.length > 0) {
      this.el.setAttribute("position", intersects.pop().point);
      setTimeout(() => {
        this.el.removeAttribute("place-on-ground");
      });
    }
  }
});
