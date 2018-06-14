AFRAME.registerSystem("game", {
  init: function() {
    console.log("Game loaded! Welcome to Phage!");
    this.ship = null;
    this.bullets = [];
    this.world = document.getElementById("world");
    this.collidables = document.getElementById("collidables");
  },
  registerShip: function(ship) {
    this.ship = ship;
  },
  showThrust() {
    var fx = document.createElement("a-entity");
    fx.setAttribute("point", "size", 0.01);
    fx.setAttribute("point", "perspective", true);
    fx.setAttribute("point", "color", "#ff0");
    fx.setAttribute("age", "max", 100);
    fx.setAttribute("position", this.ship.el.object3D.position);
    var vector = new THREE.Vector3(
      Math.random() * 0.24 - 0.12,
      -1,
      Math.random() * 0.24 - 0.12
    );
    vector.applyQuaternion(this.ship.el.object3D.quaternion);
    vector.add(this.ship.velocity);
    fx.setAttribute("movable", "velocity", vector);
    this.world.appendChild(fx);
  },
  shoot: function() {
    var bullet = document.createElement("a-entity");
    bullet.setAttribute("bullet", "");
    bullet.setAttribute("point", "size", 0.01);
    bullet.setAttribute("point", "perspective", true);
    bullet.setAttribute("point", "color", "#fff");
    bullet.setAttribute("age", "max", 700);
    bullet.setAttribute("sound", "src", "#shoot");
    bullet.setAttribute("sound", "autoplay", true);
    bullet.setAttribute("position", this.ship.el.object3D.position);
    var vector = new THREE.Vector3(0, 0, -10);
    vector.applyQuaternion(this.ship.el.object3D.quaternion);
    vector.add(this.ship.velocity);
    bullet.setAttribute("movable", "velocity", vector);
    this.world.appendChild(bullet);
  },
  addExplosion: function(position, size) {
    var explosion = document.createElement("a-sphere");
    explosion.setAttribute("explosion", "");
    explosion.setAttribute(
      "color",
      size > 0.1 ? "rgb(255,200,100)" : "rgb(100,100,100)"
    );
    explosion.setAttribute("opacity", "0.75");
    explosion.setAttribute("radius", size !== undefined ? size : 0.03);
    explosion.setAttribute("sound", "src", "#hit");
    explosion.setAttribute("sound", "autoplay", true);
    explosion.setAttribute("position", position.clone());
    explosion.setAttribute("age", "max", 1000);
    this.world.appendChild(explosion);
  }
});
