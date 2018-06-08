AFRAME.registerComponent("age", {
  schema: {
    max: {
      type: "float"
    }
  },
  init: function() {
    this.age = 0;
  },
  tick: function(time, timeDelta) {
    this.age += timeDelta;
    if (this.age > this.data.max) {
      this.el.parentNode.removeChild(this.el);
    }
  }
});
