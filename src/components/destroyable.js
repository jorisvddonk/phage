AFRAME.registerComponent("destroyable", {
  schema: {
    hp: {
      type: "int"
    },
    explosionColor: {
      type: "color",
      default: "#fc4"
    },
    explosionSize: {
      type: "float",
      default: 0.5
    }
  },
  init: function(data) {
    this.game = this.el.sceneEl.systems["game"];
    this.hp = this.data.hp;
    this.el.addEventListener("hitWithBullet", () => {
      this.registerHit(1);
    });
  },
  registerHit: function(dmg) {
    this.hp = this.hp - dmg;
    if (this.hp <= 0) {
      if (this.el.parentNode) {
        this.game.addExplosion(
          this.el.getAttribute("position"),
          this.data.explosionSize,
          this.data.explosionColor
        );
        this.el.parentNode.removeChild(this.el);
        return;
      }
    }
  }
});
