// On-screen touch controls for mobile devices.
//
// The controls simply drive the same keystates that the keyboard system
// tracks, so the spaceship component needs no changes at all: holding THRUST
// is identical to holding "A", and so on.
AFRAME.registerSystem("touch", {
  init: function () {
    this.keyboard = null;
    if (!this.touchCapable()) {
      return;
    }
    this.injectStyles();
    this.createControls();
  },

  // Show controls on any touch-capable device. `?touch=1` forces them on
  // (handy for testing on a desktop).
  touchCapable: function () {
    if (window.location.search.indexOf("touch") !== -1) {
      return true;
    }
    return (
      "ontouchstart" in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
    );
  },

  keyState: function (code, down) {
    if (!this.keyboard) {
      this.keyboard = this.el.systems["keyboard"];
    }
    if (this.keyboard) {
      this.keyboard.keystate[code] = down;
    }
  },

  injectStyles: function () {
    var style = document.createElement("style");
    style.textContent = [
      "#phage-touch-controls {",
      "  position: fixed;",
      "  inset: 0;",
      "  z-index: 100;",
      "  pointer-events: none;",
      "  user-select: none;",
      "  -webkit-user-select: none;",
      "  touch-action: none;",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;",
      "}",
      ".phage-touch-pad {",
      "  position: absolute;",
      "  left: 20px;",
      "  bottom: 20px;",
      "  display: grid;",
      "  grid-template-columns: repeat(3, 58px);",
      "  grid-template-rows: repeat(3, 58px);",
      "  gap: 6px;",
      "}",
      ".phage-touch-actions {",
      "  position: absolute;",
      "  right: 20px;",
      "  bottom: 20px;",
      "  display: flex;",
      "  align-items: flex-end;",
      "  gap: 16px;",
      "}",
      ".phage-touch-button {",
      "  pointer-events: auto;",
      "  touch-action: none;",
      "  -webkit-tap-highlight-color: transparent;",
      "  display: flex;",
      "  align-items: center;",
      "  justify-content: center;",
      "  width: 58px;",
      "  height: 58px;",
      "  padding: 0;",
      "  border: 2px solid rgba(255, 255, 255, 0.7);",
      "  border-radius: 50%;",
      "  background: rgba(20, 20, 30, 0.35);",
      "  color: #fff;",
      "  font-size: 18px;",
      "  font-weight: 700;",
      "  letter-spacing: 0.04em;",
      "  backdrop-filter: blur(2px);",
      "  transition: background 0.08s ease, transform 0.08s ease;",
      "}",
      ".phage-touch-button.is-pressed {",
      "  background: rgba(120, 200, 255, 0.75);",
      "  transform: scale(0.94);",
      "}",
      ".phage-touch-up { grid-column: 2; grid-row: 1; }",
      ".phage-touch-left { grid-column: 1; grid-row: 2; }",
      ".phage-touch-right { grid-column: 3; grid-row: 2; }",
      ".phage-touch-down { grid-column: 2; grid-row: 3; }",
      ".phage-touch-actions .phage-touch-button {",
      "  width: 82px;",
      "  height: 82px;",
      "  font-size: 13px;",
      "}",
      ".phage-touch-thrust { background: rgba(40, 120, 40, 0.45); }",
      ".phage-touch-fire { background: rgba(140, 40, 40, 0.45); }"
    ].join("\n");
    document.head.appendChild(style);
  },

  makeButton: function (label, code, extraClass) {
    var self = this;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "phage-touch-button" + (extraClass ? " " + extraClass : "");
    btn.textContent = label;

    var press = function (e) {
      e.preventDefault();
      btn.classList.add("is-pressed");
      self.keyState(code, true);
    };
    var release = function (e) {
      e.preventDefault();
      btn.classList.remove("is-pressed");
      self.keyState(code, false);
    };

    btn.addEventListener("pointerdown", press);
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointercancel", release);
    btn.addEventListener("pointerleave", release);
    btn.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    return btn;
  },

  createControls: function () {
    var wrap = document.createElement("div");
    wrap.id = "phage-touch-controls";

    var movePad = document.createElement("div");
    movePad.className = "phage-touch-pad";
    movePad.appendChild(this.makeButton("\u25B2", "ArrowUp", "phage-touch-up"));
    movePad.appendChild(this.makeButton("\u25C0", "ArrowLeft", "phage-touch-left"));
    movePad.appendChild(this.makeButton("\u25B6", "ArrowRight", "phage-touch-right"));
    movePad.appendChild(this.makeButton("\u25BC", "ArrowDown", "phage-touch-down"));

    var actions = document.createElement("div");
    actions.className = "phage-touch-actions";
    actions.appendChild(this.makeButton("FIRE", "Space", "phage-touch-fire"));
    actions.appendChild(this.makeButton("THRUST", "KeyA", "phage-touch-thrust"));

    wrap.appendChild(movePad);
    wrap.appendChild(actions);
    document.body.appendChild(wrap);
  }
});