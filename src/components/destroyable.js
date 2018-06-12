AFRAME.registerComponent("destroyable", {
  schema: {
    hp: {
      type: "int"
    }
  },
  init: function(data) {
    this.hp = this.data.hp;
    console.log(this.hp);
    this.el.addEventListener("hitWithBullet", () => {
      this.registerHit(1);
    });
  },
  registerHit: function(dmg) {
    this.hp = this.hp - dmg;
    if (this.hp <= 0) {
      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        return;
      }
    }
  }
});
