/* =========================================================
   ELROY SALTZHERR • PORTFOLIO HOVER EASTER EGGS ENGINE v2.0
   Tactile, responsive, perfectly positioned micro-interactions
   for every major project, skill, and competitive DNA card.
   ========================================================= */

(function initEasterEggs() {
  // Web Audio Synthesizer for rich dynamic SFX
  class EggAudio {
    constructor() { this.ctx = null; }
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
    }
    playTone(freq, dur = 0.1, type = 'sine', gainVal = 0.08) {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        g.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
        osc.connect(g); g.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + dur);
      } catch(e) {}
    }

    // 1. Hello Chime
    playHello() {
      this.init();
      this.playTone(523.25, 0.08, 'triangle', 0.1);
      setTimeout(() => this.playTone(659.25, 0.14, 'triangle', 0.12), 70);
    }

    // 2. Dark Throne Golden Resonance
    playGoldenThrone() {
      this.init();
      if (!this.ctx) return;
      [220, 277.18, 329.63, 440, 554.37].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.5, 'sine', 0.06), i * 60);
      });
    }

    // 3. Gunshot & Ricochet
    playGunshot() {
      this.init();
      this.playTone(320, 0.05, 'sawtooth', 0.18);
      setTimeout(() => this.playTone(140, 0.09, 'square', 0.12), 25);
    }
    playRicochet() {
      this.init();
      this.playTone(800 + Math.random() * 400, 0.06, 'triangle', 0.08);
    }

    // 4. Pencil Eraser (Tactile rubber rubbing sound)
    playErase() {
      this.init();
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          this.playTone(160 + (i % 2) * 40, 0.04, 'sawtooth', 0.03);
        }, i * 60);
      }
    }

    // 5. Tetris Heavy Drop
    playBlockDrop() {
      this.init();
      this.playTone(180, 0.06, 'triangle', 0.14);
      setTimeout(() => this.playTone(110, 0.1, 'sine', 0.16), 40);
    }

    // 6. Fire Embers
    playFireCrackling() {
      this.init();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => this.playTone(400 + Math.random() * 300, 0.08, 'sine', 0.03), i * 80);
      }
    }

    // 7. Ghost Chase (Fast cartoon footsteps + spooky modulation)
    playGhostChase() {
      this.init();
      if (!this.ctx) return;
      // Footsteps
      for (let i = 0; i < 5; i++) {
        setTimeout(() => this.playTone(280 + (i % 2) * 50, 0.03, 'triangle', 0.05), i * 90);
      }
      // Ghost pitch bend
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.35);
      g.gain.setValueAtTime(0.05, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(g); g.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.35);
    }

    // 8. E-Commerce Cha-Ching & Merchandise Pop
    playChaChing() {
      this.init();
      this.playTone(987.77, 0.08, 'sine', 0.12);
      setTimeout(() => this.playTone(1318.51, 0.22, 'sine', 0.15), 70);
    }

    // 9. Languages
    playLangChime() {
      this.init();
      this.playTone(587.33, 0.09, 'triangle', 0.08);
      setTimeout(() => this.playTone(880, 0.14, 'triangle', 0.09), 80);
    }

    // 10. Engines 3D Gizmo Boot
    playGizmo() {
      this.init();
      this.playTone(330, 0.05, 'square', 0.06);
      setTimeout(() => this.playTone(493.88, 0.08, 'square', 0.07), 60);
      setTimeout(() => this.playTone(659.25, 0.15, 'triangle', 0.09), 120);
    }

    // 11. Gameplay Crit & Hitstop Crunch
    playCritHit() {
      this.init();
      this.playTone(260, 0.04, 'sawtooth', 0.18);
      setTimeout(() => {
        this.playTone(880, 0.2, 'triangle', 0.15);
        this.playTone(1760, 0.15, 'sine', 0.1);
      }, 30);
    }

    // 12. AI Cloud Terminal Chirp
    playCloudTerminal() {
      this.init();
      [600, 750, 900, 1200].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.03, 'sine', 0.05), i * 35);
      });
    }

    // 13. League Diamond Mastery Horns
    playMastery() {
      this.init();
      [587, 880, 1174, 1760].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.22, 'triangle', 0.11), i * 75);
      });
    }

    // 14. MTG Counterspell Mystic Surge
    playCounterspell() {
      this.init();
      this.playTone(180, 0.25, 'sawtooth', 0.07);
      setTimeout(() => this.playTone(880, 0.3, 'sine', 0.12), 80);
    }

    // 15. Pokéball Bounce & Caught Fanfare
    playPokeballBounce() {
      this.init();
      this.playTone(320, 0.04, 'sine', 0.08);
      setTimeout(() => this.playTone(220, 0.06, 'triangle', 0.06), 20);
    }
    playPokemonCaught() {
      this.init();
      [659, 783, 1046, 1318].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.18, 'square', 0.09), i * 90);
      });
    }

    // 16. Competitive Robotics Motor & Servo Lock
    playRoboticsMotor() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + 0.3);
      g.gain.setValueAtTime(0.06, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(g); g.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.35);
      setTimeout(() => this.playTone(600, 0.08, 'square', 0.08), 300);
    }

    // 17. Sports Scoring (Whistle & Crowd Cheer)
    playSportsScore() {
      this.init();
      this.playTone(1046.5, 0.12, 'square', 0.08);
      setTimeout(() => this.playTone(1046.5, 0.25, 'square', 0.1), 100);
      setTimeout(() => this.playTone(523.25, 0.35, 'triangle', 0.12), 220);
    }
  }

  const sfx = new EggAudio();
  document.addEventListener('click', () => sfx.init(), { once: true });
  document.addEventListener('mouseover', () => sfx.init(), { once: true });

  // Inject CSS Styles for all Easter Eggs
  const style = document.createElement('style');
  style.textContent = `
    /* =========================================================
       GLOBAL EASTER EGG STYLES
       ========================================================= */
    .easter-overlay-item {
      position: absolute;
      pointer-events: none;
      z-index: 100;
      user-select: none;
    }

    /* 1. Profile Picture: "Hello!" Bubble (Inside Card) */
    .easter-hello-bubble-v2 {
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      color: #0f172a;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.65rem;
      padding: 6px 14px;
      border-radius: 999px;
      font-weight: bold;
      pointer-events: none;
      box-shadow: 0 4px 18px rgba(251, 191, 36, 0.6);
      z-index: 100;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .easter-hello-bubble-v2::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px 6px 0;
      border-style: solid;
      border-color: #f59e0b transparent;
      display: block;
      width: 0;
    }
    .easter-hello-bubble-v2.show {
      transform: translateX(-50%) scale(1);
    }
    .hero-card-img-wrapper.hero-img-glow {
      box-shadow: 0 0 35px rgba(251, 191, 36, 0.45) !important;
      transition: box-shadow 0.3s ease;
    }

    /* 2. Dark Throne: Radiant Golden Light Source */
    body.dark-throne-active::before {
      content: '';
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: radial-gradient(circle at center, transparent 35%, rgba(5, 7, 12, 0.88) 85%);
      pointer-events: none;
      z-index: 900;
      transition: opacity 0.35s ease;
    }
    .featured-project-card.dt-gold-blaze {
      position: relative;
      z-index: 950 !important;
      box-shadow: 0 0 60px rgba(251, 191, 36, 0.7), 0 0 100px rgba(245, 158, 11, 0.45), inset 0 0 30px rgba(251, 191, 36, 0.25) !important;
      border-color: #fbbf24 !important;
      transition: all 0.35s ease;
    }
    .dt-gold-sparkle {
      position: absolute;
      font-size: 1.2rem;
      color: #fbbf24;
      pointer-events: none;
      z-index: 960;
      animation: dtSparkleFloat 1.2s ease-out forwards;
    }
    @keyframes dtSparkleFloat {
      0% { transform: translateY(0) scale(0.6); opacity: 1; }
      100% { transform: translateY(-45px) scale(1.3); opacity: 0; }
    }

    /* 3. Where's My Gun: Muzzle Flash & Ricochets */
    .easter-muzzle-flash {
      position: absolute;
      width: 24px;
      height: 24px;
      background: radial-gradient(circle, #fff 10%, #fbbf24 45%, #ef4444 80%, transparent 100%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 105;
      animation: muzzlePop 0.15s ease-out forwards;
    }
    @keyframes muzzlePop {
      0% { transform: scale(0.3); opacity: 1; }
      50% { transform: scale(1.6); opacity: 1; }
      100% { transform: scale(0.5); opacity: 0; }
    }
    .easter-bullet {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #fef08a;
      box-shadow: 0 0 10px #fbbf24, 0 0 20px #f59e0b;
      border-radius: 50%;
      pointer-events: none;
      z-index: 102;
    }

    /* 4. Pencil Pusher: Visible Rubber Eraser & Shavings */
    .easter-eraser-tool {
      position: absolute;
      width: 38px;
      height: 22px;
      background: linear-gradient(135deg, #f472b6 0%, #db2777 100%);
      border: 2px solid #be185d;
      border-radius: 4px;
      box-shadow: 0 4px 14px rgba(219, 39, 119, 0.6);
      font-family: 'Press Start 2P', monospace;
      font-size: 0.38rem;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 105;
      transform: rotate(-15deg);
      transition: left 0.25s linear, top 0.25s linear;
    }
    .easter-eraser-crumb {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #fbcfe8;
      border-radius: 50%;
      pointer-events: none;
      z-index: 104;
      animation: crumbFall 0.8s ease-out forwards;
    }
    @keyframes crumbFall {
      0% { opacity: 1; transform: translate(0, 0); }
      100% { opacity: 0; transform: translate(var(--cx), 20px); }
    }

    /* 5. Building Scaler: Tetris Falling Physics */
    .easter-tetris-piece {
      position: absolute;
      pointer-events: none;
      z-index: 102;
      display: grid;
      gap: 2px;
      transition: transform 0.1s ease;
    }
    .tetris-block-unit {
      width: 14px;
      height: 14px;
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.4);
    }

    /* 6. Last Ember: Impactful Fire & Side Embers */
    .ember-fire-tongue {
      position: absolute;
      font-size: 1.4rem;
      pointer-events: none;
      z-index: 103;
      animation: fireTongue 0.9s ease-in-out infinite alternate;
    }
    @keyframes fireTongue {
      from { transform: translateY(0) scale(0.9); opacity: 0.8; }
      to { transform: translateY(-8px) scale(1.15); opacity: 1; }
    }
    .easter-fire-particle {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 102;
      animation: fireRise 1.2s ease-out forwards;
    }
    @keyframes fireRise {
      0% { opacity: 1; transform: translate(0, 0) scale(1); }
      100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.3); }
    }

    /* 7. Possession Escape: Man running away from Ghost */
    .easter-runner {
      position: absolute;
      font-size: 1.7rem;
      pointer-events: none;
      z-index: 105;
      user-select: none;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));
    }
    .easter-ghost-chaser {
      position: absolute;
      font-size: 1.8rem;
      pointer-events: none;
      z-index: 104;
      user-select: none;
      filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8));
    }
    .easter-screaming-bubble {
      position: absolute;
      background: #ef4444;
      color: #fff;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.52rem;
      padding: 3px 6px;
      border-radius: 6px;
      pointer-events: none;
      z-index: 106;
      animation: screamShake 0.2s infinite alternate;
    }
    @keyframes screamShake {
      from { transform: translateY(-22px) rotate(-4deg); }
      to { transform: translateY(-22px) rotate(4deg); }
    }

    /* 8. E-Commerce / JAMBELLES: Center Fountain Burst */
    .easter-ecom-item {
      position: absolute;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 105;
      animation: ecomFountain 1.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }
    @keyframes ecomFountain {
      0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
      100% { transform: translate(calc(-50% + var(--ex)), calc(-50% + var(--ey))) scale(1.2); opacity: 0; }
    }

    /* 9. Languages Speech Tags */
    .easter-lang-bubble {
      position: absolute;
      background: rgba(99, 102, 241, 0.95);
      border: 1px solid #818cf8;
      color: #fff;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 800;
      pointer-events: none;
      z-index: 103;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
      animation: langFloat 1.2s ease-out forwards;
    }
    @keyframes langFloat {
      0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
      100% { transform: translate(calc(-50% + var(--lx)), calc(-50% + var(--ly))) scale(1.1); opacity: 0; }
    }

    /* 10. Engines & Tech: 3D Gizmo & Physics Debugger */
    .easter-gizmo-box {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(15, 23, 42, 0.94);
      border: 2px solid #38bdf8;
      border-radius: 8px;
      padding: 6px 10px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.52rem;
      color: #38bdf8;
      pointer-events: none;
      z-index: 104;
      box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);
      display: flex;
      align-items: center;
      gap: 6px;
      animation: popIn 0.25s ease;
    }

    /* 11. Gameplay & Design: RPG Hitstop & Crit Splash */
    .easter-crit-splash {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: rgba(15, 23, 42, 0.95);
      border: 3px solid #fbbf24;
      box-shadow: 0 0 35px rgba(251, 191, 36, 0.8);
      border-radius: 12px;
      padding: 10px 16px;
      text-align: center;
      pointer-events: none;
      z-index: 105;
      animation: critExplode 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes critExplode {
      0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
      25% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
      75% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -60%) scale(0.9); opacity: 0; }
    }

    /* 12. AI, Cloud & Tools: Terminal Deployment Readout */
    .easter-cloud-terminal {
      position: absolute;
      bottom: 12px;
      left: 12px;
      right: 12px;
      background: rgba(15, 23, 42, 0.96);
      border: 1px solid #10b981;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.3);
      border-radius: 8px;
      padding: 8px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem;
      color: #34d399;
      pointer-events: none;
      z-index: 105;
      animation: slideUpTerminal 0.25s ease;
    }
    @keyframes slideUpTerminal {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    /* 13. League of Legends: Diamond Mastery 7 Crest (Inside Card) */
    .easter-mastery-crest-v2 {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%);
      border: 2px solid #38bdf8;
      box-shadow: 0 0 28px rgba(56, 189, 248, 0.7);
      padding: 6px 14px;
      border-radius: 999px;
      color: #fff;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.58rem;
      z-index: 104;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .easter-mastery-crest-v2.show {
      transform: translateX(-50%) scale(1);
    }

    /* 14. Magic: The Gathering: In Response + Spell Card (Inside Card) */
    .easter-mtg-response-v2 {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%);
      border: 2px solid #60a5fa;
      box-shadow: 0 0 25px rgba(96, 165, 250, 0.65);
      color: #93c5fd;
      padding: 6px 12px;
      border-radius: 8px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.56rem;
      pointer-events: none;
      z-index: 105;
      white-space: nowrap;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .easter-mtg-response-v2.show {
      transform: translateX(-50%) scale(1);
    }
    .easter-mtg-card-pop {
      position: absolute;
      top: 52%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 140px;
      background: #0f172a;
      border: 3px solid #3b82f6;
      border-radius: 8px;
      padding: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 0 25px rgba(59, 130, 246, 0.5);
      font-family: 'Plus Jakarta Sans', sans-serif;
      pointer-events: none;
      z-index: 106;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .easter-mtg-card-pop.show {
      transform: translate(-50%, -50%) scale(1);
    }

    /* 15. Pokémon: Realistic Pokéball with Bouncing Physics */
    .easter-pokeball-sprite {
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
      pointer-events: none;
      z-index: 105;
      overflow: hidden;
      border: 2px solid #000;
    }
    .pokeball-btn-center {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 8px; height: 8px;
      background: #fff;
      border: 2px solid #000;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.9);
      z-index: 2;
    }
    .pokeball-mid-band {
      position: absolute;
      top: 50%; left: 0; right: 0;
      transform: translateY(-50%);
      height: 3px;
      background: #000;
      z-index: 1;
    }
    .easter-caught-banner {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: #facc15;
      color: #0f172a;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.58rem;
      padding: 6px 14px;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(250, 204, 21, 0.6);
      pointer-events: none;
      z-index: 106;
      white-space: nowrap;
      animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    /* 16. Competitive Robotics: FRC Driver Match Readout */
    .easter-frc-status {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(15, 23, 42, 0.94);
      border: 2px solid #a855f7;
      border-radius: 8px;
      padding: 6px 10px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.52rem;
      color: #c084fc;
      pointer-events: none;
      z-index: 104;
      box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
      display: flex;
      align-items: center;
      gap: 6px;
      animation: popIn 0.25s ease;
    }

    /* 17. Sports Scoring Banner (Inside Card) */
    .easter-sports-score-v2 {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: linear-gradient(135deg, #06b6d4 0%, #0284c7 100%);
      border: 2px solid #38bdf8;
      box-shadow: 0 0 25px rgba(6, 182, 212, 0.7);
      color: #fff;
      padding: 6px 14px;
      border-radius: 999px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.58rem;
      pointer-events: none;
      z-index: 105;
      white-space: nowrap;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .easter-sports-score-v2.show {
      transform: translateX(-50%) scale(1);
    }

    @keyframes popIn {
      from { transform: scale(0.6); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Helper to find project cards by title text
  function findProjectCard(titleText) {
    const cards = document.querySelectorAll('.project-card');
    for (let c of cards) {
      const h3 = c.querySelector('.project-card-title');
      if (h3 && h3.textContent.toLowerCase().includes(titleText.toLowerCase())) return c;
    }
    return null;
  }

  // Helper for skill cards
  function findSkillCard(titleText) {
    const cards = document.querySelectorAll('.skill-card');
    for (let c of cards) {
      const h3 = c.querySelector('.skill-card-title');
      if (h3 && h3.textContent.toLowerCase().includes(titleText.toLowerCase())) return c;
    }
    return null;
  }

  // Helper for DNA cards
  function findDnaCard(titleText) {
    const cards = document.querySelectorAll('.dna-card');
    for (let c of cards) {
      const t = c.querySelector('.dna-title');
      if (t && t.textContent.toLowerCase().includes(titleText.toLowerCase())) return c;
    }
    return null;
  }

  /* =========================================================
     1. PROFILE PICTURE: "HELLO!" SPEECH BUBBLE
     ========================================================= */
  const heroCard = document.querySelector('.hero-card');
  const heroImgWrapper = document.querySelector('.hero-card-img-wrapper');
  if (heroCard && heroImgWrapper) {
    const bubble = document.createElement('div');
    bubble.className = 'easter-hello-bubble-v2';
    bubble.innerHTML = '👋 Hello! Welcome!';
    heroImgWrapper.appendChild(bubble);

    heroCard.addEventListener('mouseenter', () => {
      bubble.classList.add('show');
      heroImgWrapper.classList.add('hero-img-glow');
      sfx.playHello();
    });
    heroCard.addEventListener('mouseleave', () => {
      bubble.classList.remove('show');
      heroImgWrapper.classList.remove('hero-img-glow');
    });
  }

  /* =========================================================
     2. DARK THRONE: RADIANT GOLDEN LIGHT SOURCE
     ========================================================= */
  const dtCard = document.querySelector('#featured .featured-project-card');
  if (dtCard) {
    dtCard.addEventListener('mouseenter', () => {
      document.body.classList.add('dark-throne-active');
      dtCard.classList.add('dt-gold-blaze');
      sfx.playGoldenThrone();

      // Emit golden sword sparkles
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const sp = document.createElement('div');
          sp.className = 'dt-gold-sparkle';
          sp.textContent = '✨';
          sp.style.left = `${30 + Math.random() * (dtCard.offsetWidth - 60)}px`;
          sp.style.top = `${40 + Math.random() * 80}px`;
          dtCard.appendChild(sp);
          setTimeout(() => sp.remove(), 1200);
        }, i * 120);
      }
    });
    dtCard.addEventListener('mouseleave', () => {
      document.body.classList.remove('dark-throne-active');
      dtCard.classList.remove('dt-gold-blaze');
    });
  }

  /* =========================================================
     3. WHERE'S MY GUN?: ALIGNED GUN BARREL & RICOCHET
     ========================================================= */
  const gunCard = findProjectCard("Where's My Gun");
  if (gunCard) {
    gunCard.style.position = 'relative';
    gunCard.addEventListener('mouseenter', () => {
      sfx.playGunshot();
      const media = gunCard.querySelector('.project-card-media');
      const originX = media ? media.offsetLeft + media.offsetWidth * 0.49 : gunCard.offsetWidth * 0.49;
      const originY = media ? media.offsetTop + media.offsetHeight * 0.64 : 110;

      // Muzzle Flash directly at gun barrel tip
      const flash = document.createElement('div');
      flash.className = 'easter-muzzle-flash';
      flash.style.left = `${originX + 10}px`;
      flash.style.top = `${originY + 6}px`;
      gunCard.appendChild(flash);
      setTimeout(() => flash.remove(), 150);

      // Fire 3 bouncing bullets from gun tip
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const bullet = document.createElement('div');
          bullet.className = 'easter-bullet';
          bullet.style.left = `${originX + 12}px`;
          bullet.style.top = `${originY + 8}px`;
          gunCard.appendChild(bullet);

          let bx = originX + 12;
          let by = originY + 8;
          let bvx = (Math.random() + 0.8) * 11;
          let bvy = (Math.random() * 0.8 + 0.4) * 9;
          let bounces = 0;
          let life = 38;

          const bInt = setInterval(() => {
            bx += bvx;
            by += bvy;
            let hit = false;
            if (bx <= 10 || bx >= gunCard.offsetWidth - 16) { bvx = -bvx; hit = true; }
            if (by <= 10 || by >= gunCard.offsetHeight - 16) { bvy = -bvy; hit = true; }
            if (hit) {
              bounces++;
              if (bounces <= 3) sfx.playRicochet();
            }
            bullet.style.left = bx + 'px';
            bullet.style.top = by + 'px';
            life--;
            if (life <= 0) {
              clearInterval(bInt);
              bullet.remove();
            }
          }, 20);
        }, i * 130);
      }
    });
  }

  /* =========================================================
     4. PENCIL PUSHER: VISIBLE PINK ERASER & SLOWER RUBBING
     ========================================================= */
  const pencilCard = findProjectCard("Pencil Pusher");
  if (pencilCard) {
    const desc = pencilCard.querySelector('.project-card-desc');
    pencilCard.addEventListener('mouseenter', () => {
      if (desc && !desc.classList.contains('erasing-active')) {
        desc.classList.add('erasing-active');
        sfx.playErase();

        // Create visible rubber eraser
        const eraser = document.createElement('div');
        eraser.className = 'easter-eraser-tool';
        eraser.textContent = 'ERASER';
        pencilCard.appendChild(eraser);

        const descTop = desc.offsetTop;
        const descLeft = desc.offsetLeft;
        const descW = desc.offsetWidth;
        const descH = desc.offsetHeight;

        eraser.style.left = `${descLeft + 10}px`;
        eraser.style.top = `${descTop + 10}px`;

        // Sweep back and forth over 1.8 seconds
        let sweep = 0;
        const sweepInt = setInterval(() => {
          sweep++;
          const progress = (sweep % 4) / 3;
          eraser.style.left = `${descLeft + progress * (descW - 40)}px`;
          eraser.style.top = `${descTop + (sweep / 12) * (descH - 20)}px`;

          // Drop eraser shavings
          const crumb = document.createElement('div');
          crumb.className = 'easter-eraser-crumb';
          crumb.style.left = eraser.style.left;
          crumb.style.top = eraser.style.top;
          crumb.style.setProperty('--cx', `${(Math.random() - 0.5) * 20}px`);
          pencilCard.appendChild(crumb);
          setTimeout(() => crumb.remove(), 800);

          if (sweep >= 10) clearInterval(sweepInt);
        }, 140);

        // Gradually fade and blur letters slower
        desc.style.transition = 'all 1.0s ease';
        desc.style.opacity = '0.08';
        desc.style.filter = 'blur(4px)';

        setTimeout(() => {
          eraser.remove();
          desc.style.transition = 'all 0.5s ease';
          desc.style.opacity = '1';
          desc.style.filter = 'none';
          desc.classList.remove('erasing-active');
        }, 1900);
      }
    });
  }

  /* =========================================================
     5. BUILDING SCALER: RANDOMIZED TETRIS FALLING BLOCKS
     ========================================================= */
  const scalerCard = findProjectCard("Building Scaler");
  if (scalerCard) {
    scalerCard.style.position = 'relative';
    const tetrisColors = ['#ef4444', '#3b82f6', '#f97316', '#eab308', '#22c55e', '#a855f7', '#06b6d4'];

    scalerCard.addEventListener('mouseenter', () => {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          const piece = document.createElement('div');
          piece.className = 'easter-tetris-piece';
          const color = tetrisColors[Math.floor(Math.random() * tetrisColors.length)];
          const randomCol = 25 + Math.random() * (scalerCard.offsetWidth - 80);

          // 2x2 tetromino blocks
          piece.style.gridTemplateColumns = 'repeat(2, 14px)';
          for (let b = 0; b < 4; b++) {
            const unit = document.createElement('div');
            unit.className = 'tetris-block-unit';
            unit.style.background = color;
            piece.appendChild(unit);
          }

          piece.style.left = `${randomCol}px`;
          piece.style.top = '10px';
          scalerCard.appendChild(piece);

          // Fall with gravity physics and stack at bottom
          let py = 10;
          let pvy = 1;
          const targetY = scalerCard.offsetHeight - 55 - (i * 14);

          const fallInt = setInterval(() => {
            pvy += 1.4;
            py += pvy;
            if (py >= targetY) {
              py = targetY;
              clearInterval(fallInt);
              sfx.playBlockDrop();
              setTimeout(() => piece.remove(), 1600);
            }
            piece.style.top = `${py}px`;
          }, 24);
        }, i * 220);
      }
    });
  }

  /* =========================================================
     6. THE LAST EMBER: IMPACTFUL FIRE FROM SIDES & BOTTOM
     ========================================================= */
  const emberCard = findProjectCard("Last Ember");
  if (emberCard) {
    emberCard.style.position = 'relative';
    emberCard.addEventListener('mouseenter', () => {
      sfx.playFireCrackling();

      // Flame tongues along bottom and sides
      const flameSpots = [
        { left: '20px', bottom: '15px' },
        { left: '50%', bottom: '15px' },
        { right: '20px', bottom: '15px' },
        { left: '12px', top: '45%' },
        { right: '12px', top: '45%' }
      ];
      flameSpots.forEach((spot, idx) => {
        const ft = document.createElement('div');
        ft.className = 'ember-fire-tongue';
        ft.textContent = '🔥';
        Object.assign(ft.style, spot);
        emberCard.appendChild(ft);
        setTimeout(() => ft.remove(), 1600);
      });

      // Swirling ember sparks rising up and inward
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          const p = document.createElement('div');
          p.className = 'easter-fire-particle';
          p.style.background = Math.random() < 0.6 ? '#f97316' : '#facc15';
          p.style.boxShadow = '0 0 10px #f97316';

          const fromSide = Math.random();
          if (fromSide < 0.35) {
            p.style.left = '16px';
            p.style.top = `${Math.random() * emberCard.offsetHeight}px`;
            p.style.setProperty('--tx', `${40 + Math.random() * 60}px`);
            p.style.setProperty('--ty', `-${30 + Math.random() * 60}px`);
          } else if (fromSide < 0.7) {
            p.style.right = '16px';
            p.style.top = `${Math.random() * emberCard.offsetHeight}px`;
            p.style.setProperty('--tx', `-${40 + Math.random() * 60}px`);
            p.style.setProperty('--ty', `-${30 + Math.random() * 60}px`);
          } else {
            p.style.left = `${Math.random() * emberCard.offsetWidth}px`;
            p.style.bottom = '16px';
            p.style.setProperty('--tx', `${(Math.random() - 0.5) * 80}px`);
            p.style.setProperty('--ty', `-${60 + Math.random() * 90}px`);
          }
          emberCard.appendChild(p);
          setTimeout(() => p.remove(), 1200);
        }, i * 55);
      }
    });
  }

  /* =========================================================
     7. POSSESSION ESCAPE: MAN RUNNING AWAY FROM GHOST
     ========================================================= */
  const ghostCard = findProjectCard("Possession Escape");
  if (ghostCard) {
    ghostCard.style.position = 'relative';
    ghostCard.addEventListener('mouseenter', () => {
      sfx.playGhostChase();

      const runner = document.createElement('div');
      runner.className = 'easter-runner';
      runner.textContent = '🏃💨';

      const ghost = document.createElement('div');
      ghost.className = 'easter-ghost-chaser';
      ghost.textContent = '👻';

      const scream = document.createElement('div');
      scream.className = 'easter-screaming-bubble';
      scream.textContent = 'AHHH! 😱';

      ghostCard.appendChild(runner);
      ghostCard.appendChild(ghost);
      ghostCard.appendChild(scream);

      let step = 0;
      const w = ghostCard.offsetWidth - 50;
      const h = ghostCard.offsetHeight - 50;

      // Circuit trajectory around perimeter of card
      const chaseInt = setInterval(() => {
        step += 0.08;
        // Runner leads
        const rx = 25 + (Math.sin(step) * 0.5 + 0.5) * (w - 20);
        const ry = 25 + (Math.cos(step) * 0.5 + 0.5) * (h - 20);
        runner.style.left = `${rx}px`;
        runner.style.top = `${ry}px`;
        scream.style.left = `${rx}px`;
        scream.style.top = `${ry}px`;

        // Ghost trails closely behind
        const gx = 25 + (Math.sin(step - 0.4) * 0.5 + 0.5) * (w - 20);
        const gy = 25 + (Math.cos(step - 0.4) * 0.5 + 0.5) * (h - 20);
        ghost.style.left = `${gx}px`;
        ghost.style.top = `${gy}px`;

        if (step > 6.28) {
          clearInterval(chaseInt);
          runner.remove();
          ghost.remove();
          scream.remove();
        }
      }, 25);
    });
  }

  /* =========================================================
     8. E-COMMERCE / JAMBELLES: CENTER FOUNTAIN MERCH BURST
     ========================================================= */
  const ecomCard = findProjectCard("E-Commerce") || findProjectCard("Jambelles");
  if (ecomCard) {
    ecomCard.style.position = 'relative';
    ecomCard.addEventListener('mouseenter', () => {
      sfx.playChaChing();
      const items = ['🛹', '🧦', '👕', '🧢', '💵', '📦', '💸', '✨'];

      items.forEach((icon, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'easter-ecom-item';
        itemEl.textContent = icon;
        itemEl.style.left = '50%';
        itemEl.style.top = '50%';

        const angle = (idx / items.length) * Math.PI * 2;
        const dist = 80 + Math.random() * 60;
        itemEl.style.setProperty('--ex', `${Math.cos(angle) * dist}px`);
        itemEl.style.setProperty('--ey', `${Math.sin(angle) * dist}px`);

        ecomCard.appendChild(itemEl);
        setTimeout(() => itemEl.remove(), 1300);
      });
    });
  }

  /* =========================================================
     9. LANGUAGES: MULTILINGUAL RADIAL GREETINGS
     ========================================================= */
  const langCard = findSkillCard("Languages");
  if (langCard) {
    langCard.style.position = 'relative';
    langCard.addEventListener('mouseenter', () => {
      sfx.playLangChime();
      const hellos = ['¡Hola!', 'Bonjour!', 'こんにちは!', 'Ciao!', 'Olá!', 'Hallo!'];
      hellos.forEach((w, idx) => {
        setTimeout(() => {
          const pill = document.createElement('div');
          pill.className = 'easter-lang-bubble';
          pill.textContent = w;
          pill.style.left = '50%';
          pill.style.top = '50%';
          const angle = (idx / hellos.length) * Math.PI * 2;
          pill.style.setProperty('--lx', `${Math.cos(angle) * 85}px`);
          pill.style.setProperty('--ly', `${Math.sin(angle) * 65}px`);
          langCard.appendChild(pill);
          setTimeout(() => pill.remove(), 1200);
        }, idx * 60);
      });
    });
  }

  /* =========================================================
     10. ENGINES & TECH: 3D GIZMO & PHYSICS COMPILER DEBUGGER
     ========================================================= */
  const engineCard = findSkillCard("Engines");
  if (engineCard) {
    engineCard.style.position = 'relative';
    engineCard.addEventListener('mouseenter', () => {
      sfx.playGizmo();
      const gizmo = document.createElement('div');
      gizmo.className = 'easter-gizmo-box';
      gizmo.innerHTML = '⚙️ PHYSX 3D • 60 FPS [OK]';
      engineCard.appendChild(gizmo);
      setTimeout(() => gizmo.remove(), 1600);
    });
  }

  /* =========================================================
     11. GAMEPLAY & DESIGN: RPG CRIT HITSTOP & DAMAGE SPLASH
     ========================================================= */
  const designCard = findSkillCard("Gameplay & Design");
  if (designCard) {
    designCard.style.position = 'relative';
    designCard.addEventListener('mouseenter', () => {
      sfx.playCritHit();

      // Screen-shake micro hitstop
      designCard.style.transform = 'scale(1.02) rotate(-1deg)';
      setTimeout(() => { designCard.style.transform = 'none'; }, 100);

      const splash = document.createElement('div');
      splash.className = 'easter-crit-splash';
      splash.innerHTML = `
        <div style="font-family:'Press Start 2P'; font-size:0.85rem; color:#facc15; margin-bottom:4px;">💥 CRIT! 9,999</div>
        <div style="font-family:'Press Start 2P'; font-size:0.55rem; color:#38bdf8;">⚔️ 4-HIT COMBO [MAX]</div>
      `;
      designCard.appendChild(splash);
      setTimeout(() => splash.remove(), 850);
    });
  }

  /* =========================================================
     12. AI, CLOUD & TOOLS: LIVE GCP CLUSTER TERMINAL
     ========================================================= */
  const cloudCard = findSkillCard("AI, Cloud & Tools");
  if (cloudCard) {
    cloudCard.style.position = 'relative';
    cloudCard.addEventListener('mouseenter', () => {
      sfx.playCloudTerminal();
      const term = document.createElement('div');
      term.className = 'easter-cloud-terminal';
      term.innerHTML = `
        <div><span style="color:#60a5fa;">$</span> gcloud run deploy stocks-bot --region us-central1</div>
        <div style="color:#a7f3d0;">✓ 0ms cold-start microservice live 🚀</div>
      `;
      cloudCard.appendChild(term);
      setTimeout(() => term.remove(), 2000);
    });
  }

  /* =========================================================
     13. LEAGUE OF LEGENDS: DIAMOND MASTERY 7 CREST
     ========================================================= */
  const leagueCard = findDnaCard("League of Legends");
  if (leagueCard) {
    leagueCard.style.position = 'relative';
    const crest = document.createElement('div');
    crest.className = 'easter-mastery-crest-v2';
    crest.innerHTML = '💎 MASTERY VII • TOP 1% DIAMOND';
    leagueCard.appendChild(crest);

    leagueCard.addEventListener('mouseenter', () => {
      crest.classList.add('show');
      sfx.playMastery();
    });
    leagueCard.addEventListener('mouseleave', () => crest.classList.remove('show'));
  }

  /* =========================================================
     14. MAGIC: THE GATHERING: IN RESPONSE & COUNTERSPELL CARD
     ========================================================= */
  const mtgCard = findDnaCard("Magic");
  if (mtgCard) {
    mtgCard.style.position = 'relative';
    const banner = document.createElement('div');
    banner.className = 'easter-mtg-response-v2';
    banner.innerHTML = '⚡ IN RESPONSE... [COUNTERSPELL]';
    mtgCard.appendChild(banner);

    const spellCard = document.createElement('div');
    spellCard.className = 'easter-mtg-card-pop';
    spellCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-weight:800; font-size:0.75rem; color:#93c5fd; border-bottom:1px solid #3b82f6; padding-bottom:4px;">
        <span>Counterspell</span>
        <span style="color:#60a5fa;">💧💧</span>
      </div>
      <div style="font-size:0.62rem; color:#e2e8f0; margin-top:6px; line-height:1.4;">
        Counter target spell.
      </div>
    `;
    mtgCard.appendChild(spellCard);

    mtgCard.addEventListener('mouseenter', () => {
      banner.classList.add('show');
      spellCard.classList.add('show');
      sfx.playCounterspell();
    });
    mtgCard.addEventListener('mouseleave', () => {
      banner.classList.remove('show');
      spellCard.classList.remove('show');
    });
  }

  /* =========================================================
     15. POKÉMON: AUTHENTIC POKÉBALL TIER & TARGET CATCH
     ========================================================= */
  const pokeCard = findDnaCard("Pokémon");
  if (pokeCard) {
    pokeCard.style.position = 'relative';
    const ballTiers = [
      { name: 'Ultra Ball', top: '#1e293b', accent: '#facc15' },
      { name: 'Great Ball', top: '#0284c7', accent: '#ef4444' },
      { name: 'Master Ball', top: '#7c3aed', accent: '#ec4899' },
      { name: 'Poké Ball', top: '#ef4444', accent: '#ef4444' }
    ];

    pokeCard.addEventListener('mouseenter', () => {
      const tier = ballTiers[Math.floor(Math.random() * ballTiers.length)];

      // Construct Authentic Styled Pokéball
      const ball = document.createElement('div');
      ball.className = 'easter-pokeball-sprite';
      ball.style.background = `linear-gradient(180deg, ${tier.top} 50%, #ffffff 50%)`;
      ball.innerHTML = `
        <div class="pokeball-mid-band"></div>
        <div class="pokeball-btn-center"></div>
      `;

      // Spawn at corner
      ball.style.left = '20px';
      ball.style.top = '20px';
      pokeCard.appendChild(ball);

      // Find one of the 6 pokemon mini cards inside
      const monCards = pokeCard.querySelectorAll('.pokemon-card');
      const targetMon = monCards.length ? monCards[Math.floor(Math.random() * monCards.length)] : null;
      const targetX = targetMon ? targetMon.offsetLeft + 20 : pokeCard.offsetWidth * 0.5;
      const targetY = targetMon ? targetMon.offsetTop + 20 : pokeCard.offsetHeight * 0.5;

      // Realistic Bouncing Trajectory
      let bx = 20, by = 20;
      let bvx = (targetX - 20) / 20;
      let bvy = -4;
      let bounces = 0;

      const ballInt = setInterval(() => {
        bvy += 0.8;
        bx += bvx;
        by += bvy;

        if (by >= targetY && bounces < 2) {
          by = targetY;
          bvy = -bvy * 0.5;
          bounces++;
          sfx.playPokeballBounce();
        }

        ball.style.left = `${bx}px`;
        ball.style.top = `${by}px`;
        ball.style.transform = `rotate(${bx * 8}deg)`;

        if (bounces >= 2 && Math.abs(by - targetY) < 10) {
          clearInterval(ballInt);
          sfx.playPokemonCaught();

          // Wobble animation & celebration stars
          ball.style.transform = 'scale(1.25)';
          const banner = document.createElement('div');
          banner.className = 'easter-caught-banner';
          banner.textContent = `⭐ GOTCHA! CAUGHT IN ${tier.name.toUpperCase()}! ⭐`;
          pokeCard.appendChild(banner);

          setTimeout(() => {
            ball.remove();
            banner.remove();
          }, 1800);
        }
      }, 30);
    });
  }

  /* =========================================================
     16. COMPETITIVE ROBOTICS: FRC DRIVER MATCH READOUT
     ========================================================= */
  const roboticsCard = findDnaCard("Robotics");
  if (roboticsCard) {
    roboticsCard.style.position = 'relative';
    roboticsCard.addEventListener('mouseenter', () => {
      sfx.playRoboticsMotor();
      const status = document.createElement('div');
      status.className = 'easter-frc-status';
      status.innerHTML = '🤖 FRC 199 DEEP BLUE • DRIVER 1 [ACTIVE]';
      roboticsCard.appendChild(status);
      setTimeout(() => status.remove(), 1800);
    });
  }

  /* =========================================================
     17. SPORTS: SOCCER GOAL, BASKETBALL SWISH, OR BASEBALL
     ========================================================= */
  const sportsCard = findDnaCard("Sports");
  if (sportsCard) {
    sportsCard.style.position = 'relative';
    const banner = document.createElement('div');
    banner.className = 'easter-sports-score-v2';
    sportsCard.appendChild(banner);

    sportsCard.addEventListener('mouseenter', () => {
      sfx.playSportsScore();
      const sportItems = [
        { icon: '⚽', txt: 'GOAAAL! 15+ YRS SOCCER ENDURANCE 🥅' },
        { icon: '🏀', txt: 'SWISH! 3-POINTER AT THE BUZZER 🎯' },
        { icon: '⚾', txt: 'HOMERUN! GRAND SLAM 🏟️' }
      ];
      const pick = sportItems[Math.floor(Math.random() * sportItems.length)];
      banner.innerHTML = `${pick.icon} ${pick.txt}`;
      banner.classList.add('show');
    });
    sportsCard.addEventListener('mouseleave', () => banner.classList.remove('show'));
  }

  console.log("Portfolio Easter Eggs Engine v2.0 initialized.");
})();
