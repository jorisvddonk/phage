AFRAME.registerComponent("tree-model", {
  init: function() {
    this.geometry_bottom = new THREE.Geometry();

    var addVec = (rad, dist, height) => {
      if (!height) {
        height = 0;
      }
      this.geometry_bottom.vertices.push(
        new THREE.Vector3(Math.sin(rad) * dist, height, Math.cos(rad) * dist)
      );
    };
    addVec((Math.PI / 1.5) * 0, 0.75, 0.5);
    addVec((Math.PI / 1.5) * 1, 0.75, 0.5);
    addVec((Math.PI / 1.5) * 2, 0.75, 0.5);
    addVec(0, 0, 3);
    addVec((Math.PI / 1.5) * 0, 0.25, 0);
    addVec((Math.PI / 1.5) * 1, 0.25, 0);
    addVec((Math.PI / 1.5) * 2, 0.25, 0);
    addVec((Math.PI / 1.5) * 0, 0.25, 0.5);
    addVec((Math.PI / 1.5) * 1, 0.25, 0.5);
    addVec((Math.PI / 1.5) * 2, 0.25, 0.5);
    this.geometry_bottom.faces.push(new THREE.Face3(0, 1, 2));
    this.geometry_bottom.faces.push(new THREE.Face3(0, 1, 3));
    this.geometry_bottom.faces.push(new THREE.Face3(1, 2, 3));
    this.geometry_bottom.faces.push(new THREE.Face3(2, 0, 3));

    this.geometry_bottom.faces.push(new THREE.Face3(4, 5, 7));
    this.geometry_bottom.faces.push(new THREE.Face3(5, 7, 8));
    this.geometry_bottom.faces.push(new THREE.Face3(5, 6, 8));
    this.geometry_bottom.faces.push(new THREE.Face3(6, 8, 9));
    this.geometry_bottom.faces.push(new THREE.Face3(6, 7, 4));
    this.geometry_bottom.faces.push(new THREE.Face3(7, 9, 6));

    this.geometry_bottom.faces.forEach(function(face, i) {
      if (i < 4) {
        face.color.setRGB(0.1, 0.4, 0.1);
      } else {
        face.color.setRGB(0.4, 0.2, 0.1);
      }
    });

    this.geometry_bottom.scale(0.2, 0.2, 0.2);

    this.material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      roughness: 1,
      metalness: 0,
      flatShading: true,
      vertexColors: THREE.FaceColors
    });
    this.geometry_bottom.computeVertexNormals();
    this.geometry_bottom.computeFaceNormals();
    this.geometry_bottom.computeBoundingSphere();
    var mesh = new THREE.Mesh(this.geometry_bottom, this.material);
    this.el.setObject3D("meshTree", mesh);
  }
});
