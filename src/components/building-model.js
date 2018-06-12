AFRAME.registerComponent("building-model-bottom", {
  init: function() {
    this.geometry = new THREE.Geometry();

    var addVec = (rad, dist, height) => {
      if (!height) {
        height = 0;
      }
      this.geometry.vertices.push(
        new THREE.Vector3(Math.sin(rad) * dist, height, Math.cos(rad) * dist)
      );
    };
    addVec((Math.PI / 1.5) * 0, 0.75, 0);
    addVec((Math.PI / 1.5) * 1, 0.75, 0);
    addVec((Math.PI / 1.5) * 2, 0.75, 0);
    addVec(0, 0, 3);
    this.geometry.faces.push(new THREE.Face3(0, 1, 2));
    this.geometry.faces.push(new THREE.Face3(0, 1, 3));
    this.geometry.faces.push(new THREE.Face3(1, 2, 3));
    this.geometry.faces.push(new THREE.Face3(2, 0, 3));

    this.geometry.faces.forEach(function(face, i) {
      face.color.setRGB(0.6, 0.8, 0.9);
    });

    this.geometry.scale(0.2, 0.2, 0.2);

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
  }
});

AFRAME.registerComponent("building-model-top", {
  init: function() {
    this.geometry = new THREE.Geometry();

    var addVec = (rad, dist, height) => {
      if (!height) {
        height = 0;
      }
      this.geometry.vertices.push(
        new THREE.Vector3(Math.sin(rad) * dist, height, Math.cos(rad) * dist)
      );
    };
    addVec(0, 0, 3);
    addVec((Math.PI / 3) * 0, 1, 2.5);
    addVec((Math.PI / 3) * 1, 1, 2.5);
    addVec((Math.PI / 3) * 2, 1, 2.5);
    addVec((Math.PI / 3) * 3, 1, 2.5);
    addVec((Math.PI / 3) * 4, 1, 2.5);
    addVec((Math.PI / 3) * 5, 1, 2.5);

    addVec(Math.PI / 6 + (Math.PI / 3) * 0, 0.4, 3.5);
    addVec(Math.PI / 6 + (Math.PI / 3) * 1, 0.4, 3.5);
    addVec(Math.PI / 6 + (Math.PI / 3) * 2, 0.4, 3.5);
    addVec(Math.PI / 6 + (Math.PI / 3) * 3, 0.4, 3.5);
    addVec(Math.PI / 6 + (Math.PI / 3) * 4, 0.4, 3.5);
    addVec(Math.PI / 6 + (Math.PI / 3) * 5, 0.4, 3.5);
    this.geometry.faces.push(new THREE.Face3(0, 1, 2));
    this.geometry.faces.push(new THREE.Face3(0, 1, 7));
    this.geometry.faces.push(new THREE.Face3(0, 2, 7));
    this.geometry.faces.push(new THREE.Face3(1, 2, 7));

    this.geometry.faces.push(new THREE.Face3(0, 3, 4));
    this.geometry.faces.push(new THREE.Face3(0, 3, 9));
    this.geometry.faces.push(new THREE.Face3(0, 4, 9));
    this.geometry.faces.push(new THREE.Face3(3, 4, 9));

    this.geometry.faces.push(new THREE.Face3(0, 5, 6));
    this.geometry.faces.push(new THREE.Face3(0, 5, 11));
    this.geometry.faces.push(new THREE.Face3(0, 6, 11));
    this.geometry.faces.push(new THREE.Face3(5, 6, 11));

    this.geometry.faces.forEach(function(face, i) {
      face.color.setRGB(0.9, 0.6, 0.7);
    });

    this.geometry.scale(0.2, 0.2, 0.2);

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
    this.el.object3D.rotation.y += (timeDelta / 1000) * 6;
  }
});
