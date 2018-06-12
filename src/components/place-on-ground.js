AFRAME.registerComponent("place-on-ground", {
  init: function() {
    this.raycaster = new THREE.Raycaster();
    this.raycaster.near = 0;
    this.raycaster.far = 100;
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
      this.el.setAttribute("position", intersects[0].point);
    }
  }
});
