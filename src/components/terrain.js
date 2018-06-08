var SimplexNoise = require("simplex-noise");
AFRAME.registerComponent("terrain", {
  init: function() {
    var simplex = new SimplexNoise();
    this.geometry = new THREE.Geometry();
    var SIZE = 100;
    var RESO = 0.1;
    var VRESO = 2;

    for (var y = 0; y < SIZE; y++) {
      for (var x = 0; x < SIZE; x++) {
        var z = simplex.noise2D(x * RESO, y * RESO) * VRESO;
        if (z <= 0) {
          z = 0;
        }
        this.geometry.vertices.push(new THREE.Vector3(x, y, z));
      }
    }

    for (var y = 0; y < SIZE - 1; y++) {
      for (var x = 0; x < SIZE - 1; x++) {
        var i = x + y * SIZE;
        var ij = x + (y + 1) * SIZE;
        this.geometry.faces.push(new THREE.Face3(i, i + 1, ij));
        this.geometry.faces.push(new THREE.Face3(ij, i + 1, ij + 1));
      }
    }

    this.geometry.faces.forEach((face, i) => {
      if (
        this.geometry.vertices[face.a].z == 0 &&
        this.geometry.vertices[face.b].z == 0 &&
        this.geometry.vertices[face.c].z == 0
      ) {
        face.color.setRGB(0.1, 0.3 + Math.random() * 0.03, 0.7);
      } else {
        face.color.setRGB(0.2, 0.5 + Math.random() * 0.01, 0.2);
      }
    });

    this.geometry.translate(SIZE * -0.5, SIZE * -0.5, 0);
    this.geometry.scale(0.5, 0.5, 0.5);

    this.material = new THREE.MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      flatShading: true,
      vertexColors: THREE.FaceColors
    });
    this.geometry.computeVertexNormals();
    this.geometry.computeFaceNormals();
    this.geometry.computeBoundingSphere();
    this.geometry.colorsNeedUpdate = true;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.el.setObject3D("mesh", this.mesh);
  }
});