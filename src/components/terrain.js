AFRAME.registerComponent("terrain", {
  schema: {
    xmin: { default: 0, min: 0, max: Number.MAX_SAFE_INTEGER, type: "int" },
    xmax: { default: 99, min: 0, max: Number.MAX_SAFE_INTEGER, type: "int" },
    ymin: { default: 0, min: 0, max: Number.MAX_SAFE_INTEGER, type: "int" },
    ymax: { default: 99, min: 0, max: Number.MAX_SAFE_INTEGER, type: "int" },
    noiseresolution: { default: 0.1, type: "float" },
    hscale: { default: 0.5, type: "float" },
    vscale: { default: 1, type: "float" }
  },
  init: function() {
    this.terrainData = this.el.sceneEl.systems["terrain-data"];
    this.geometry = new THREE.Geometry();
    var xdiff = this.data.xmax - this.data.xmin;
    var ydiff = this.data.ymax - this.data.ymin;
    for (var y = this.data.ymin; y <= this.data.ymax; y++) {
      for (var x = this.data.xmin; x <= this.data.xmax; x++) {
        var z = this.terrainData.getHeightForCoordinates(
          x * this.data.noiseresolution,
          y * this.data.noiseresolution
        );
        if (z <= 0) {
          z = 0;
        }
        this.geometry.vertices.push(new THREE.Vector3(x, y, z));
      }
    }

    function gv(x, y) {
      return y * (xdiff + 1) + x;
    }

    for (var ry = 0; ry <= ydiff - 1; ry++) {
      for (var rx = 0; rx <= xdiff - 1; rx++) {
        this.geometry.faces.push(
          new THREE.Face3(
            gv(rx + 0, ry + 0),
            gv(rx + 1, ry + 0),
            gv(rx + 0, ry + 1)
          )
        );
        this.geometry.faces.push(
          new THREE.Face3(
            gv(rx + 1, ry + 0),
            gv(rx + 1, ry + 1),
            gv(rx + 0, ry + 1)
          )
        );
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

    this.geometry.scale(this.data.hscale, this.data.hscale, this.data.vscale);
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
