AFRAME.registerComponent("follow-camera", {
  tick: function() {
    var cam = document.getElementById("camera").parentElement;
    var pos = cam.getAttribute("position");
    pos.x = this.el.object3D.position.x;
    pos.y = this.el.object3D.position.y * 0.5;
    pos.z = this.el.object3D.position.z + 4;
    cam.setAttribute("position", pos);
  }
});

AFRAME.registerComponent("dirlight", {
  init: function() {
    var scene = this.el.sceneEl.object3D;
    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-1, 1, 0);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024 * 4;
    dirLight.shadow.mapSize.height = 1024 * 4;
    var d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 500;
    dirLight.shadow.bias = -0.00001;
    scene.add(dirLight);
  }
});

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
    this.collidable = document.querySelector("#world");
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

    //Do the actual movement/rotation
    this.el.object3D.setRotationFromQuaternion(this.quat);
    if (this.thrust) {
      var vector = new THREE.Vector3(0, 1, 0);
      vector.applyQuaternion(this.el.object3D.quaternion);
      this.movement.add(
        vector.multiplyScalar((timeDelta / 1000) * this.thrust * 7)
      );
    }
    this.movement.add(this.gravityVector);
    this.movement.x *= 0.98;
    this.movement.z *= 0.98;
    this.el.object3D.position.add(
      this.movement.clone().multiplyScalar(timeDelta / 1000)
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
      this.movement.x = 0;
      this.movement.y = 0;
      this.movement.z = 0;
    }
  }
});
