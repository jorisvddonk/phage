AFRAME.registerComponent("destroyable", {
  schema: {
    hp: {
      type: "int"
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
        this.game.addExplosion(this.el.getAttribute("position"), 0.5);
        this.el.parentNode.removeChild(this.el);
        return;
      }
    }
  }
});
