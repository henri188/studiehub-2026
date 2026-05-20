/* HydrarGyrum Sound System — synthesised via Web Audio API, no audio files needed */
(function(global) {
  'use strict';

  var MUTE_KEY = 'hg-sound-muted';
  var _ctx = null;
  var _primed = false;

  function getCtx() {
    if (!_ctx || _ctx.state === 'closed') {
      var Ctor = global.AudioContext || global.webkitAudioContext;
      if (!Ctor) return null;
      _ctx = new Ctor();
    }
    if (_ctx.state === 'suspended' && typeof _ctx.resume === 'function') _ctx.resume();
    return _ctx;
  }

  // Pre-warm AudioContext on first user gesture so the first sound plays instantly.
  // Browsers block audio until a gesture; without priming the very first .play() call
  // creates the context lazily and the very first tone is often inaudible / delayed.
  function prime() {
    if (_primed) return;
    _primed = true;
    var ac = getCtx();
    if (!ac) return;
    // Schedule a near-silent tone so the audio graph is fully initialised.
    try {
      var osc = ac.createOscillator();
      var gain = ac.createGain();
      gain.gain.setValueAtTime(0.00001, ac.currentTime);
      osc.frequency.value = 440;
      osc.connect(gain); gain.connect(ac.destination);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.02);
    } catch (e) {}
  }

  function attachPrimers() {
    var opts = { once: true, capture: true, passive: true };
    var fire = function() { prime(); };
    ['pointerdown', 'keydown', 'touchstart', 'mousedown'].forEach(function(ev) {
      global.addEventListener(ev, fire, opts);
    });
  }

  // freq Hz, type, peak volume, start delay (s), duration (s)
  function tone(ac, freq, type, vol, delay, dur) {
    var osc  = ac.createOscillator();
    var gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    var t = ac.currentTime + delay;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  // startFreq → endFreq exponential glide over dur seconds
  function sweep(ac, startFreq, endFreq, type, vol, delay, dur) {
    var osc  = ac.createOscillator();
    var gain = ac.createGain();
    osc.type = type;
    var t = ac.currentTime + delay;
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  var SOUNDS = {
    'task-check':    function(ac) { tone(ac,  660, 'sine',     0.06, 0,    0.10); },
    'task-uncheck':  function(ac) { tone(ac,  440, 'sine',     0.04, 0,    0.08); },
    'timer-start':   function(ac) { tone(ac,  523, 'sine',     0.05, 0,    0.08);
                                    tone(ac,  659, 'sine',     0.05, 0.09, 0.08); },
    'timer-stop':    function(ac) { tone(ac,  659, 'sine',     0.05, 0,    0.08);
                                    tone(ac,  523, 'sine',     0.04, 0.09, 0.08); },
    'timer-done':    function(ac) { tone(ac,  784, 'sine',     0.06, 0,    0.15);
                                    tone(ac,  988, 'sine',     0.06, 0.16, 0.15);
                                    tone(ac, 1175, 'sine',     0.06, 0.32, 0.22); },
    'navigate':      function(ac) { tone(ac,  440, 'sine',     0.04, 0,    0.07); },
    'tab-switch':    function(ac) { tone(ac,  587, 'triangle', 0.03, 0,    0.07); },
    'hint-reveal':   function(ac) { tone(ac,  587, 'sine',     0.04, 0,    0.10); },
    'correct':       function(ac) { tone(ac,  523, 'sine',     0.05, 0,    0.10);
                                    tone(ac,  659, 'sine',     0.05, 0.11, 0.10);
                                    tone(ac,  784, 'sine',     0.05, 0.22, 0.15); },
    'wrong':         function(ac) { tone(ac,  311, 'sawtooth', 0.03, 0,    0.18); },
    // theme sweeps — dramatic pitch glide
    'theme-dark':    function(ac) { sweep(ac, 1100,  80, 'sawtooth', 0.09, 0,    0.42);
                                    sweep(ac,  550,  55, 'sine',     0.05, 0.05, 0.48); },
    'theme-light':   function(ac) { sweep(ac,  200, 1800, 'sine',    0.07, 0,    0.28);
                                    tone(ac,  1760, 'triangle', 0.04, 0.24, 0.12);
                                    tone(ac,  2093, 'triangle', 0.03, 0.31, 0.10); },
    // oefentool extras
    'next-q':        function(ac) { tone(ac,  440, 'sine',     0.04, 0,    0.05);
                                    tone(ac,  523, 'sine',     0.03, 0.05, 0.05); },
    'filter-change': function(ac) { tone(ac,  392, 'triangle', 0.03, 0,    0.08); },
    'restart':       function(ac) { tone(ac,  523, 'sine',     0.05, 0,    0.07);
                                    tone(ac,  659, 'sine',     0.05, 0.08, 0.07);
                                    tone(ac,  784, 'sine',     0.05, 0.16, 0.07);
                                    tone(ac, 1047, 'sine',     0.06, 0.24, 0.15); },
  };

  var muted = false;
  try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch(e) {}

  global.HgSound = {
    muted: muted,
    play: function(name) {
      try {
        if (global.HgSound.muted || !SOUNDS[name]) return;
        var ac = getCtx();
        if (!ac) return;
        SOUNDS[name](ac);
      } catch(e) {}
    },
    prime: prime,
    toggleMute: function() {
      global.HgSound.muted = !global.HgSound.muted;
      try { localStorage.setItem(MUTE_KEY, global.HgSound.muted ? '1' : '0'); } catch(e) {}
      return global.HgSound.muted;
    },
  };

  // Attach gesture-priming listeners as soon as DOM is ready (or now if already ready).
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachPrimers, { once: true });
  } else {
    attachPrimers();
  }

})(window);
