class SecurityIntroAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.unlocked = false;
    this.ambientInterval = null;
    this.lastHoverMs = 0;

    this.unlockFromGesture = this.unlockFromGesture.bind(this);
    this.bindUnlockListeners();
  }

  bindUnlockListeners() {
    const opts = { once: true, passive: true };
    document.addEventListener("pointerdown", this.unlockFromGesture, opts);
    document.addEventListener("keydown", this.unlockFromGesture, opts);
    document.addEventListener("touchstart", this.unlockFromGesture, opts);
  }

  unlockFromGesture() {
    void this.unlock();
  }

  ensureContext() {
    if (this.ctx) {
      return true;
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      return false;
    }

    this.ctx = new AudioContextCtor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.16;
    this.master.connect(this.ctx.destination);
    return true;
  }

  async unlock() {
    if (!this.enabled || !this.ensureContext()) {
      return;
    }

    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch (_error) {
        return;
      }
    }

    this.unlocked = true;
    this.startAmbient();
  }

  setEnabled(nextEnabled) {
    this.enabled = Boolean(nextEnabled);

    if (!this.enabled) {
      this.stopAmbient();
      return;
    }

    void this.unlock();
  }

  tone({
    freq = 220,
    duration = 0.1,
    gain = 0.12,
    type = "sine",
    attack = 0.004,
    release = 0.06,
    slideTo = null,
  }) {
    if (!this.enabled || !this.unlocked || !this.ctx || !this.master) {
      return;
    }

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(10, slideTo), now + duration);
    }

    env.gain.setValueAtTime(0.0001, now);
    env.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), now + attack);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration + release);

    osc.connect(env);
    env.connect(this.master);

    osc.start(now);
    osc.stop(now + duration + release + 0.02);
  }

  noiseBurst({ duration = 0.08, gain = 0.08 }) {
    if (!this.enabled || !this.unlocked || !this.ctx || !this.master) {
      return;
    }

    const frameCount = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, frameCount, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i += 1) {
      const falloff = 1 - i / frameCount;
      data[i] = (Math.random() * 2 - 1) * falloff;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 500;

    const env = this.ctx.createGain();
    const now = this.ctx.currentTime;
    env.gain.setValueAtTime(gain, now);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(filter);
    filter.connect(env);
    env.connect(this.master);

    source.start(now);
    source.stop(now + duration + 0.02);
  }

  playBootPulse() {
    this.tone({ freq: 110, duration: 0.09, gain: 0.07, type: "sine" });
    this.tone({ freq: 240, duration: 0.07, gain: 0.06, type: "triangle" });
  }

  playGlitch() {
    this.noiseBurst({ duration: 0.07, gain: 0.07 });
    this.tone({ freq: 860, duration: 0.045, gain: 0.05, type: "square" });
  }

  playMorphSweep() {
    this.tone({ freq: 160, slideTo: 420, duration: 0.18, gain: 0.08, type: "sawtooth" });
  }

  playReadyChime() {
    this.tone({ freq: 420, duration: 0.08, gain: 0.08, type: "triangle" });
    window.setTimeout(() => {
      this.tone({ freq: 620, duration: 0.11, gain: 0.08, type: "triangle" });
    }, 95);
  }

  playHoverTick() {
    const nowMs = performance.now();
    if (nowMs - this.lastHoverMs < 90) {
      return;
    }
    this.lastHoverMs = nowMs;
    this.tone({ freq: 760, duration: 0.04, gain: 0.035, type: "square" });
  }

  playEnterWhoosh() {
    this.noiseBurst({ duration: 0.16, gain: 0.08 });
    this.tone({ freq: 460, slideTo: 180, duration: 0.2, gain: 0.09, type: "sawtooth" });
  }

  playAmbientPing() {
    this.tone({ freq: 72, duration: 0.12, gain: 0.03, type: "sine" });
    this.tone({ freq: 148, duration: 0.07, gain: 0.02, type: "triangle" });
  }

  startAmbient() {
    if (!this.enabled || !this.unlocked || this.ambientInterval) {
      return;
    }

    this.ambientInterval = window.setInterval(() => {
      if (!document.hidden) {
        this.playAmbientPing();
      }
    }, 1800);
  }

  stopAmbient() {
    if (!this.ambientInterval) {
      return;
    }
    window.clearInterval(this.ambientInterval);
    this.ambientInterval = null;
  }

  destroy() {
    this.stopAmbient();
  }
}

class FuturisticCryptoIntro {
  constructor() {
    this.intro = document.getElementById("intro-screen");
    this.title = document.getElementById("intro-title");
    this.enterBtn = document.getElementById("intro-enter-btn");
    this.soundToggleBtn = document.getElementById("sound-toggle-btn");
    this.soundToggleValue = document.getElementById("sound-toggle-value");
    this.buttonStatus = document.getElementById("button-status");

    this.matrixCanvas = document.getElementById("matrix-canvas");
    this.networkCanvas = document.getElementById("network-canvas");
    this.packetCanvas = document.getElementById("packet-canvas");

    this.matrixCtx = this.matrixCanvas ? this.matrixCanvas.getContext("2d") : null;
    this.networkCtx = this.networkCanvas ? this.networkCanvas.getContext("2d") : null;
    this.packetCtx = this.packetCanvas ? this.packetCanvas.getContext("2d") : null;

    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Quality setting detection
    this.lowPowerMode = window.matchMedia("(prefers-reduced-data: reduce)").matches || navigator.deviceMemory < 4;

    this.symbols = [
      "0",
      "1",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "XOR",
      "RSA",
      "AES",
      "SHA",
      "ECC",
      "TLS",
      "[",
      "]",
      "{",
      "}",
      "<",
      ">",
      "&",
      "|",
      "^",
      "+",
      "-",
      "*",
      "%",
      "#",
      "🔐",
      "🔑",
      "⚔",
      "Σ",
    ];

    this.streams = [];
    this.nodes = [];
    this.packets = [];
    this.ripples = [];

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.max(1, window.devicePixelRatio || 1);

    this.frameId = null;
    this.exiting = false;
    this.startTime = performance.now();

    this.audio = new SecurityIntroAudio();

    this.onResize = this.onResize.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.animate = this.animate.bind(this);

    this.init();
  }

  init() {
    if (!this.intro || !this.title || !this.enterBtn || !this.matrixCtx || !this.networkCtx || !this.packetCtx) {
      return;
    }

    this.setupCanvasSizes();
    this.buildMatrixStreams();
    this.buildNetworkNodes();
    this.buildPackets();

    window.addEventListener("resize", this.onResize);
    document.addEventListener("keydown", this.onKeyDown);

    this.enterBtn.addEventListener("mouseenter", () => {
      this.audio.playHoverTick();
    });

    this.enterBtn.addEventListener("click", () => {
      void this.audio.unlock();
      this.audio.playEnterWhoosh();
      this.exitIntro();
    });

    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener("click", () => {
        const nextEnabled = this.soundToggleBtn.classList.contains("is-off");
        this.audio.setEnabled(nextEnabled);
        this.updateSoundToggle(nextEnabled);
        if (nextEnabled) {
          this.audio.playReadyChime();
        }
      });
    }

    this.updateSoundToggle(true);

    this.runTimeline();

    if (!this.prefersReducedMotion) {
      this.animate();
    }
  }

  setupCanvasSizes() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.max(1, window.devicePixelRatio || 1);

    const canvases = [this.matrixCanvas, this.networkCanvas, this.packetCanvas];

    canvases.forEach((canvas) => {
      canvas.width = Math.floor(this.width * this.dpr);
      canvas.height = Math.floor(this.height * this.dpr);
      canvas.style.width = `${this.width}px`;
      canvas.style.height = `${this.height}px`;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    });
  }

  buildMatrixStreams() {
    this.streams = [];
    const spacing = 24;
    const count = Math.max(18, Math.floor(this.width / spacing));

    for (let i = 0; i < count; i += 1) {
      const streamLength = 12 + Math.floor(Math.random() * 18);
      this.streams.push({
        x: i * spacing + Math.random() * 10,
        y: -Math.random() * this.height,
        speed: 1.2 + Math.random() * 2.6,
        length: streamLength,
        glyphs: Array.from({ length: streamLength }, () => this.pickSymbol()),
        opacity: 0.28 + Math.random() * 0.52,
      });
    }
  }

  buildNetworkNodes() {
    const baseCount = this.width < 700 ? 8 : 12;
    const count = this.lowPowerMode ? Math.floor(baseCount * 0.7) : baseCount;
    this.nodes = [];

    for (let i = 0; i < count; i += 1) {
      const baseX = 60 + Math.random() * (this.width - 120);
      const baseY = 60 + Math.random() * (this.height - 120);
      this.nodes.push({
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        phase: Math.random() * Math.PI * 2,
        driftSpeed: 0.4 + Math.random() * 0.8,
      });
    }

    this.ripples = [];
  }

  buildPackets() {
    const baseCount = this.width < 700 ? 26 : 44;
    const count = this.lowPowerMode ? Math.floor(baseCount * 0.6) : baseCount;
    this.packets = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: -0.4 - Math.random() * 0.8,
      size: 1 + Math.random() * 2.6,
      alpha: 0.2 + Math.random() * 0.7,
      hueShift: Math.random() > 0.5 ? 0 : 1,
    }));
  }

  runTimeline() {
    this.setTitle("SECURE SYSTEM INITIALIZING...");
    void this.audio.unlock();
    this.audio.playBootPulse();

    if (this.prefersReducedMotion) {
      this.setTitle("CRYPTOGRAPHY SIMULATION ENGINE");
      this.audio.playMorphSweep();
      this.enableEntry();
      return;
    }

    window.setTimeout(() => {
      if (this.exiting) {
        return;
      }
      this.title.classList.add("glitching");
      this.audio.playGlitch();
    }, 1200);

    window.setTimeout(() => {
      if (this.exiting) {
        return;
      }
      this.setTitle("CRYPTOGRAPHY SIMULATION ENGINE");
      this.audio.playMorphSweep();
    }, 2100);

    window.setTimeout(() => {
      if (this.exiting) {
        return;
      }
      this.enableEntry();
      this.audio.playReadyChime();
    }, 3200);
  }

  updateSoundToggle(isEnabled) {
    if (!this.soundToggleBtn || !this.soundToggleValue) {
      return;
    }

    this.soundToggleBtn.classList.toggle("is-off", !isEnabled);
    this.soundToggleBtn.setAttribute("aria-pressed", String(isEnabled));
    this.soundToggleValue.textContent = isEnabled ? "ON" : "OFF";
  }

  setTitle(text) {
    this.title.textContent = text;
    this.title.dataset.text = text;
  }

  enableEntry() {
    this.enterBtn.disabled = false;
    if (this.buttonStatus) {
      this.buttonStatus.textContent = "(press enter or click)";
    }
    this.enterBtn.focus({ preventScroll: true });
  }

  onResize() {
    this.setupCanvasSizes();
    this.buildMatrixStreams();
    this.buildNetworkNodes();
    this.buildPackets();
  }

  onKeyDown(event) {
    if (event.key === "Enter" && !this.enterBtn.disabled) {
      event.preventDefault();
      void this.audio.unlock();
      this.audio.playEnterWhoosh();
      this.exitIntro();
    }
    if (event.key === "Escape" && !this.exiting) {
      event.preventDefault();
      void this.audio.unlock();
      this.audio.playEnterWhoosh();
      this.exitIntro();
    }
  }

  exitIntro() {
    if (this.exiting || this.enterBtn.disabled) {
      return;
    }

    this.exiting = true;
    this.title.classList.remove("glitching");
    this.setTitle("ENTERING SIMULATION...");
    this.intro.classList.add("is-exiting");

    if (this.frameId) {
      window.cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }

    window.setTimeout(() => {
      this.intro.remove();
      document.body.classList.remove("intro-active");
      document.removeEventListener("keydown", this.onKeyDown);
      window.removeEventListener("resize", this.onResize);
      this.audio.destroy();
    }, 900);
  }

  pickSymbol() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  drawMatrixRain() {
    this.matrixCtx.fillStyle = "rgba(10, 15, 31, 0.16)";
    this.matrixCtx.fillRect(0, 0, this.width, this.height);

    for (let s = 0; s < this.streams.length; s += 1) {
      const stream = this.streams[s];

      for (let i = 0; i < stream.length; i += 1) {
        const y = stream.y - i * 18;

        if (y < -40 || y > this.height + 30) {
          continue;
        }

        const alpha = stream.opacity * (1 - i / stream.length);
        const isHead = i === 0;
        const color = isHead
          ? `rgba(0, 255, 159, ${Math.min(1, alpha + 0.25)})`
          : `rgba(0, 240, 255, ${alpha})`;

        this.matrixCtx.font = isHead ? "700 14px Share Tech Mono" : "500 12px Share Tech Mono";
        this.matrixCtx.fillStyle = color;
        this.matrixCtx.shadowColor = isHead ? "#00ff9f" : "#00f0ff";
        this.matrixCtx.shadowBlur = isHead ? 14 : 7;
        this.matrixCtx.fillText(stream.glyphs[i], stream.x, y);
      }

      this.matrixCtx.shadowBlur = 0;
      stream.y += stream.speed;

      if (Math.random() < 0.02) {
        const swapIndex = Math.floor(Math.random() * stream.glyphs.length);
        stream.glyphs[swapIndex] = this.pickSymbol();
      }

      if (stream.y - stream.length * 18 > this.height + 60) {
        stream.y = -Math.random() * this.height * 0.4;
        stream.speed = 1.2 + Math.random() * 2.6;
        stream.opacity = 0.28 + Math.random() * 0.52;
        stream.glyphs = stream.glyphs.map(() => this.pickSymbol());
      }
    }
  }

  updateAndDrawNetwork(nowMs) {
    this.networkCtx.clearRect(0, 0, this.width, this.height);

    const t = nowMs / 1000;

    for (let i = 0; i < this.nodes.length; i += 1) {
      const node = this.nodes[i];
      node.x = node.baseX + Math.cos(t * node.driftSpeed + node.phase) * 9;
      node.y = node.baseY + Math.sin(t * node.driftSpeed + node.phase * 0.9) * 9;
    }

    for (let i = 0; i < this.nodes.length; i += 1) {
      for (let j = i + 1; j < this.nodes.length; j += 1) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 320) {
          continue;
        }

        const energy = 1 - dist / 320;
        const pulse = 0.35 + 0.65 * Math.sin(t * 2 + i * 0.8 + j * 0.5) ** 2;
        const alpha = 0.08 + energy * 0.3 * pulse;

        this.networkCtx.beginPath();
        this.networkCtx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        this.networkCtx.lineWidth = 0.8 + energy * 1.1;
        this.networkCtx.moveTo(a.x, a.y);
        this.networkCtx.lineTo(b.x, b.y);
        this.networkCtx.stroke();
      }
    }

    if (Math.random() < 0.02) {
      const source = this.nodes[Math.floor(Math.random() * this.nodes.length)];
      if (source) {
        this.ripples.push({ x: source.x, y: source.y, radius: 2, life: 1 });
      }
    }

    for (let i = this.ripples.length - 1; i >= 0; i -= 1) {
      const ripple = this.ripples[i];
      ripple.radius += 1.5;
      ripple.life -= 0.02;

      if (ripple.life <= 0) {
        this.ripples.splice(i, 1);
        continue;
      }

      this.networkCtx.beginPath();
      this.networkCtx.strokeStyle = `rgba(138, 43, 226, ${ripple.life * 0.45})`;
      this.networkCtx.lineWidth = 1.2;
      this.networkCtx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      this.networkCtx.stroke();
    }

    for (let i = 0; i < this.nodes.length; i += 1) {
      const node = this.nodes[i];
      const pulse = 0.55 + 0.45 * Math.sin(t * 3 + node.phase);
      const r = 2.3 + pulse * 2.4;

      this.networkCtx.beginPath();
      this.networkCtx.fillStyle = `rgba(0, 255, 159, ${0.58 + pulse * 0.4})`;
      this.networkCtx.shadowColor = "#00ff9f";
      this.networkCtx.shadowBlur = 14;
      this.networkCtx.arc(node.x, node.y, r, 0, Math.PI * 2);
      this.networkCtx.fill();
    }

    this.networkCtx.shadowBlur = 0;
  }

  updateAndDrawPackets(nowMs) {
    this.packetCtx.clearRect(0, 0, this.width, this.height);

    const t = nowMs / 1000;

    for (let i = 0; i < this.packets.length; i += 1) {
      const p = this.packets[i];
      p.x += p.vx + Math.sin(t + i) * 0.04;
      p.y += p.vy;

      if (p.x < -10) {
        p.x = this.width + 10;
      }
      if (p.x > this.width + 10) {
        p.x = -10;
      }
      if (p.y < -10) {
        p.y = this.height + 10;
      }
      if (p.y > this.height + 10) {
        p.y = -10;
      }

      const color = p.hueShift === 0
        ? `rgba(0, 240, 255, ${p.alpha})`
        : `rgba(0, 255, 159, ${p.alpha})`;

      this.packetCtx.beginPath();
      this.packetCtx.fillStyle = color;
      this.packetCtx.shadowColor = p.hueShift === 0 ? "#00f0ff" : "#00ff9f";
      this.packetCtx.shadowBlur = 10;
      this.packetCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.packetCtx.fill();
    }

    this.packetCtx.shadowBlur = 0;
  }

  animate(nowMs = performance.now()) {
    if (this.exiting) {
      return;
    }

    this.drawMatrixRain();
    this.updateAndDrawNetwork(nowMs);
    this.updateAndDrawPackets(nowMs);

    this.frameId = window.requestAnimationFrame(this.animate);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FuturisticCryptoIntro();
});
