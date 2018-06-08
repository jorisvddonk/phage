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
