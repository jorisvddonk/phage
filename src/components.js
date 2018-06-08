AFRAME.registerComponent("follow-camera", {
  tick: function() {
    var cam = document.getElementById("camera");
    cam.object3D.position.x = this.el.object3D.position.x;
    //cam.object3D.position.y = this.el.object3D.position.y + 1.6;
    cam.object3D.position.z = this.el.object3D.position.z + 2;
  }
});

AFRAME.registerComponent("spaceship", {
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

    this.geometry = new THREE.Geometry();

    this.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    this.geometry.vertices.push(new THREE.Vector3(2, 0, 0));
    this.geometry.vertices.push(new THREE.Vector3(1, 0, 1.5));
    this.geometry.vertices.push(new THREE.Vector3(-1, 0, 1.5));
    this.geometry.vertices.push(new THREE.Vector3(-2, 0, 0));
    this.geometry.vertices.push(new THREE.Vector3(-0.75, 0, -2.5));
    this.geometry.vertices.push(new THREE.Vector3(0.75, 0, -2.5));
    this.geometry.vertices.push(new THREE.Vector3(0, 1, 0));

    this.geometry.faces.push(new THREE.Face3(0, 1, 2));
    this.geometry.faces.push(new THREE.Face3(0, 2, 3));
    this.geometry.faces.push(new THREE.Face3(0, 3, 4));
    this.geometry.faces.push(new THREE.Face3(0, 4, 5));
    this.geometry.faces.push(new THREE.Face3(0, 5, 6));
    this.geometry.faces.push(new THREE.Face3(0, 6, 1));
    this.geometry.faces.push(new THREE.Face3(7, 1, 2));
    this.geometry.faces.push(new THREE.Face3(7, 2, 3));
    this.geometry.faces.push(new THREE.Face3(7, 3, 4));
    this.geometry.faces.push(new THREE.Face3(7, 4, 5));
    this.geometry.faces.push(new THREE.Face3(7, 5, 6));
    this.geometry.faces.push(new THREE.Face3(7, 6, 1));

    this.geometry.faces.forEach(function(face, i) {
      if (i < 6) {
        face.color.setRGB(0.5 + (i % 2) * 0.1, 0.2, 0.2);
      } else {
        face.color.setRGB(0.1, 0.3 + (i % 2) * 0.2, 0.7);
      }
    });

    this.geometry.scale(0.1, 0.1, 0.1);

    this.material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      roughness: 1,
      metalness: 0,
      flatShading: true,
      vertexColors: THREE.FaceColors
    });
    this.geometry.computeVertexNormals();
    this.geometry.computeFaceNormals();
    this.geometry.computeBoundingSphere();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.el.setObject3D("mesh", this.mesh);
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
    if (this.el.object3D.position.y < 1.1) {
      this.el.object3D.position.y = 1.1;
      this.movement.x = 0;
      this.movement.y = 0;
      this.movement.z = 0;
    }
  }
});
