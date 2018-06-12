AFRAME.registerSystem("keyboard", {
  init: function() {
    console.log("Keyboard initialized");
    this.keystate = {};
    window.addEventListener("keydown", e => {
      this.keystate[e.code] = true;
    });
    window.addEventListener("keyup", e => {
      this.keystate[e.code] = false;
    });
  },
  isKeyDown: function(keyCode) {
    return this.keystate[keyCode] === true;
  }
});
