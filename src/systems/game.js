AFRAME.registerSystem("game", {
  init: function() {
    console.log("Game loaded! Welcome to Phage!");
    this.ship = null;
    this.bullets = [];
    this.world = document.getElementById("world");
  },
  registerShip: function(ship) {
    this.ship = ship;
  },
  shoot: function() {
    var bullet = document.createElement("a-sphere");
    bullet.setAttribute("bullet", "");
    bullet.setAttribute("radius", 0.01);
    bullet.setAttribute("age", "max", 700);
    bullet.setAttribute("sound", "src", "#shoot");
    bullet.setAttribute("sound", "autoplay", true);
    bullet.setAttribute("position", this.ship.el.object3D.position);
    var vector = new THREE.Vector3(0, 0, -10);
    vector.applyQuaternion(this.ship.el.object3D.quaternion);
    vector.add(this.ship.velocity);
    bullet.setAttribute("bullet", "velocity", vector);
    this.world.appendChild(bullet);
  },
  addExplosion: function(position) {
    var explosion = document.createElement("a-sphere");
    explosion.setAttribute("explosion", "");
    explosion.setAttribute("radius", 0.03);
    explosion.setAttribute("sound", "src", "#hit");
    explosion.setAttribute("sound", "autoplay", true);
    explosion.setAttribute("position", position);
    explosion.setAttribute("age", "max", 1000);
    this.world.appendChild(explosion);
  }
});
