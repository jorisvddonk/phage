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
