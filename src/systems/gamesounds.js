var Tone = require("tone");
AFRAME.registerSystem("gamesounds", {
  init: function() {
    this.sounds = {};
    this.sounds.thrust = new Tone.NoiseSynth({
      noise: { type: "brown" },
      envelope: { attack: 0.1, decay: 1, sustain: 1, release: 0.2 }
    }).toMaster();
    this.sounds.thrust.volume.value = -24;
    this.soundsPlaying = {};
  },
  startSound: function(name, attack) {
    if (attack === undefined) {
      attack = this.sounds[name].envelope.attack;
    }
    if (this.soundsPlaying[name]) {
      return;
    }
    this.sounds[name].triggerAttack(attack);
    this.soundsPlaying[name] = true;
  },
  stopSound: function(name, release) {
    if (release === undefined) {
      release = this.sounds[name].envelope.release;
    }
    if (!this.soundsPlaying[name]) {
      return;
    }
    this.sounds[name].triggerRelease(release);
    this.soundsPlaying[name] = false;
  }
});
