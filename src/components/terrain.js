AFRAME.registerComponent("terrain", {
  init: function() {
    this.terrainData = this.el.sceneEl.systems["terrain-data"];
    this.geometry = new THREE.Geometry();
    var TERRAINSIZE = 100;
    var NOISE_RESOLUTION = 0.1;
    var TERRAIN_H_SCALE = 0.5;
    var TERRAIN_V_SCALE = 1;

    for (var y = 0; y < TERRAINSIZE; y++) {
      for (var x = 0; x < TERRAINSIZE; x++) {
        var z = this.terrainData.getHeightForCoordinates(
          x * NOISE_RESOLUTION,
          y * NOISE_RESOLUTION
        );
        if (z <= 0) {
          z = 0;
        }
        this.geometry.vertices.push(new THREE.Vector3(x, y, z));
      }
    }

    for (var y = 0; y < TERRAINSIZE - 1; y++) {
      for (var x = 0; x < TERRAINSIZE - 1; x++) {
        var i = x + y * TERRAINSIZE;
        var ij = x + (y + 1) * TERRAINSIZE;
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

    this.geometry.translate(TERRAINSIZE * -0.5, TERRAINSIZE * -0.5, 0);
    this.geometry.scale(TERRAIN_H_SCALE, TERRAIN_H_SCALE, TERRAIN_V_SCALE);
    this.geometry.rotateX(Math.PI * -0.5);

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
