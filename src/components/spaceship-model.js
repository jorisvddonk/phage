AFRAME.registerComponent("spaceship-model", {
  init: function() {
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
  }
});
