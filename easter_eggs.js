/* =========================================================
   ELROY SALTZHERR • PORTFOLIO HOVER EASTER EGGS ENGINE v4.0
   Tactile, responsive, perfectly positioned micro-interactions:
   - Secret Tracker HUD: 0/18 Discovered
   - UCSC Banana Slug peek directly above UCSC (no long text)
   - Dark Throne dynamic mouse flashlight in darkness
   - Building Scaler persistent multi-instance 2D physics blocks
   - The Last Ember impactful flames & rising embers (fixed layout)
   - Possession Escape readable corridor chase with "AHHHHHH!!!!!"
   - E-Commerce top-origin randomized angle merchandise fountain (lasts longer)
   - All 4 Technical Skills & Toolset interactive effects
   - League of Legends official Mastery 7 crest (clean, no 1% text)
   - Magic: The Gathering Counterspell card peeking from the corner
   - Pokémon Hover-to-Catch with low catch rates, breakouts & temporary vanish
   - Competitive Robotics FRC Driver Station (fixed positioning)
   - Sports Visual Soccer Goal & Basketball Hoop (fixed positioning)
   ========================================================= */

(function initEasterEggs() {
  // Web Audio Synthesizer
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

    playSlug() {
      this.init();
      this.playTone(660, 0.08, 'sine', 0.08);
      setTimeout(() => this.playTone(880, 0.12, 'triangle', 0.1), 70);
    }
    playHello() {
      this.init();
      this.playTone(523.25, 0.08, 'triangle', 0.1);
      setTimeout(() => this.playTone(659.25, 0.14, 'triangle', 0.12), 70);
    }
    playTorchIgnite() {
      this.init();
      this.playTone(180, 0.25, 'sawtooth', 0.04);
      setTimeout(() => this.playTone(220, 0.35, 'sine', 0.05), 100);
    }
    playGunshot() {
      this.init();
      this.playTone(320, 0.05, 'sawtooth', 0.18);
      setTimeout(() => this.playTone(140, 0.09, 'square', 0.12), 25);
    }
    playRicochet() {
      this.init();
      this.playTone(800 + Math.random() * 400, 0.06, 'triangle', 0.08);
    }
    playErase() {
      this.init();
      for (let i = 0; i < 4; i++) {
        setTimeout(() => this.playTone(160 + (i % 2) * 40, 0.04, 'sawtooth', 0.03), i * 60);
      }
    }
    playBlockClack() {
      this.init();
      this.playTone(260 + Math.random() * 120, 0.04, 'triangle', 0.1);
      setTimeout(() => this.playTone(140, 0.07, 'sine', 0.08), 20);
    }
    playFireCrackling() {
      this.init();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => this.playTone(400 + Math.random() * 300, 0.08, 'sine', 0.03), i * 80);
      }
    }
    playGhostChase() {
      this.init();
      if (!this.ctx) return;
      for (let i = 0; i < 4; i++) {
        setTimeout(() => this.playTone(240 + (i % 2) * 40, 0.04, 'triangle', 0.04), i * 140);
      }
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.4);
      g.gain.setValueAtTime(0.04, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(g); g.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.4);
    }
    playChaChing() {
      this.init();
      this.playTone(987.77, 0.08, 'sine', 0.12);
      setTimeout(() => this.playTone(1318.51, 0.22, 'sine', 0.15), 70);
    }
    playMastery() {
      this.init();
      [587.33, 880, 1174.66, 1760].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.25, 'triangle', 0.12), i * 75);
      });
    }
    playCounterspell() {
      this.init();
      this.playTone(180, 0.25, 'sawtooth', 0.07);
      setTimeout(() => this.playTone(880, 0.35, 'sine', 0.12), 80);
    }
    playPokeballBounce() {
      this.init();
      this.playTone(340, 0.04, 'sine', 0.08);
      setTimeout(() => this.playTone(220, 0.06, 'triangle', 0.06), 20);
    }
    playPokeballWobble() {
      this.init();
      this.playTone(440, 0.06, 'sine', 0.07);
      setTimeout(() => this.playTone(330, 0.06, 'sine', 0.05), 40);
    }
    playPokemonCaught() {
      this.init();
      [659, 783, 1046, 1318].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.18, 'square', 0.09), i * 90);
      });
    }
    playPokemonBreakout() {
      this.init();
      this.playTone(240, 0.1, 'sawtooth', 0.1);
      setTimeout(() => this.playTone(180, 0.15, 'square', 0.08), 80);
    }
    playWhistle() {
      this.init();
      this.playTone(1046.5, 0.15, 'square', 0.08);
      setTimeout(() => this.playTone(1046.5, 0.25, 'square', 0.1), 120);
    }
    playBuzzer() {
      this.init();
      this.playTone(220, 0.3, 'sawtooth', 0.1);
    }
    playGizmo() {
      this.init();
      this.playTone(330, 0.05, 'square', 0.06);
      setTimeout(() => this.playTone(659.25, 0.15, 'triangle', 0.09), 100);
    }
    playCritHit() {
      this.init();
      this.playTone(260, 0.04, 'sawtooth', 0.18);
      setTimeout(() => this.playTone(880, 0.2, 'triangle', 0.15), 30);
    }
    playCloudTerminal() {
      this.init();
      [600, 750, 900, 1200].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.03, 'sine', 0.05), i * 35);
      });
    }
    playRoboticsMotor() {
      this.init();
      this.playTone(140, 0.25, 'sawtooth', 0.06);
      setTimeout(() => this.playTone(440, 0.1, 'square', 0.08), 200);
    }
    playSecretUnlocked() {
      this.init();
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.15, 'triangle', 0.08), i * 70);
      });
    }
  }

  const sfx = new EggAudio();
  document.addEventListener('click', () => sfx.init(), { once: true });
  document.addEventListener('mouseover', () => sfx.init(), { once: true });

  // Secrets Tracker State
  const TOTAL_SECRETS = 18;
  const foundSecrets = new Set();

  function markSecret(name) {
    if (!foundSecrets.has(name)) {
      foundSecrets.add(name);
      sfx.playSecretUnlocked();
      updateTrackerHUD();
    }
  }

  function updateTrackerHUD() {
    const countEl = document.getElementById('egg-found-count');
    const chip = document.getElementById('egg-tracker-chip');
    if (countEl) countEl.textContent = foundSecrets.size;
    if (chip) {
      chip.classList.add('bump');
      setTimeout(() => chip.classList.remove('bump'), 300);
    }
    if (foundSecrets.size === TOTAL_SECRETS) {
      if (chip) chip.innerHTML = '🏆 ALL 18 SECRETS FOUND! MASTER!';
    }
  }

  // Inject CSS Styles
  const style = document.createElement('style');
  style.textContent = `
    /* Secrets Tracker HUD Chip */
    .egg-tracker-chip {
      position: fixed;
      top: 14px;
      right: 20px;
      background: rgba(15, 23, 42, 0.94);
      border: 1.5px solid #fbbf24;
      border-radius: 999px;
      padding: 6px 14px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.58rem;
      color: #fbbf24;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.6), 0 0 15px rgba(251, 191, 36, 0.3);
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 8px;
      user-select: none;
      pointer-events: none;
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s, color 0.2s;
    }
    .egg-tracker-chip.bump {
      transform: scale(1.18);
      border-color: #38bdf8;
      color: #38bdf8;
    }

    /* UCSC Banana Slug (Just the slug above UCSC) */
    .ucsc-slug-peek {
      position: absolute;
      top: -24px;
      right: 18px;
      font-size: 1.35rem;
      pointer-events: none;
      z-index: 200;
      transform: scale(0);
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6));
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .ucsc-slug-peek.show {
      transform: scale(1);
    }

    /* Dark Throne Flashlight Spotlight */
    .dt-flashlight-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 24px;
      pointer-events: none;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.35s ease;
      background: radial-gradient(circle 140px at var(--fx, 50%) var(--fy, 50%), transparent 0%, rgba(2, 6, 23, 0.94) 85%);
    }
    .dt-flashlight-overlay.active { opacity: 1; }
    .dt-torch-aura {
      position: absolute;
      width: 140px; height: 140px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 101;
      transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(251, 191, 36, 0.28) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 75%);
      mix-blend-mode: screen;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .dt-torch-aura.active { opacity: 1; }

    /* Hello Bubble */
    .easter-hello-bubble-v2 {
      position: absolute;
      top: 16px; left: 50%;
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
    }
    .easter-hello-bubble-v2.show { transform: translateX(-50%) scale(1); }

    /* Where's My Gun Muzzle & Bullet */
    .easter-muzzle-flash {
      position: absolute;
      width: 24px; height: 24px;
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
      width: 8px; height: 8px;
      background: #fef08a;
      box-shadow: 0 0 10px #fbbf24, 0 0 20px #f59e0b;
      border-radius: 50%;
      pointer-events: none;
      z-index: 102;
    }

    /* Pencil Eraser */
    .easter-eraser-tool {
      position: absolute;
      width: 38px; height: 22px;
      background: linear-gradient(135deg, #f472b6 0%, #db2777 100%);
      border: 2px solid #be185d;
      border-radius: 4px;
      box-shadow: 0 4px 14px rgba(219, 39, 119, 0.6);
      font-family: 'Press Start 2P', monospace;
      font-size: 0.38rem;
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      pointer-events: none;
      z-index: 105;
      transform: rotate(-15deg);
      transition: left 0.25s linear, top 0.25s linear;
    }
    .easter-eraser-crumb {
      position: absolute;
      width: 4px; height: 4px;
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

    /* Building Scaler 2D Physics Blocks */
    .physics-tetris-block {
      position: absolute;
      width: 24px; height: 24px;
      border-radius: 4px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.4);
      pointer-events: none;
      z-index: 104;
    }

    /* Last Ember Fire Elements */
    .ember-fire-tongue {
      position: absolute !important;
      font-size: 1.4rem;
      pointer-events: none;
      z-index: 103;
      animation: fireTongue 0.9s ease-in-out infinite alternate;
    }
    @keyframes fireTongue {
      from { transform: translateY(0) scale(0.9); opacity: 0.85; }
      to { transform: translateY(-8px) scale(1.15); opacity: 1; }
    }
    .easter-fire-particle {
      position: absolute !important;
      width: 7px; height: 7px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 102;
      animation: fireRise 1.2s ease-out forwards;
    }
    @keyframes fireRise {
      0% { opacity: 1; transform: translate(0, 0) scale(1); }
      100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.3); }
    }

    /* Possession Escape */
    .easter-corridor-runner {
      position: absolute !important;
      font-size: 1.7rem;
      pointer-events: none;
      z-index: 105;
      user-select: none;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));
      transition: transform 0.2s;
    }
    .easter-corridor-ghost {
      position: absolute !important;
      font-size: 1.8rem;
      pointer-events: none;
      z-index: 104;
      user-select: none;
      filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8));
    }
    .easter-screaming-bubble-v2 {
      position: absolute !important;
      background: #ef4444;
      color: #fff;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.52rem;
      padding: 4px 8px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
      pointer-events: none;
      z-index: 106;
      white-space: nowrap;
    }

    /* E-Commerce Top Fountain Arc */
    .easter-ecom-item-v2 {
      position: absolute !important;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 105;
      animation: ecomArc 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes ecomArc {
      0% { transform: translate(-50%, -50%) scale(0.4) rotate(0deg); opacity: 1; }
      75% { opacity: 1; }
      100% { transform: translate(calc(-50% + var(--ex)), calc(-50% + var(--ey))) scale(1.1) rotate(var(--erot)); opacity: 0; }
    }

    /* Technical Skills Overlays */
    .easter-lang-bubble {
      position: absolute !important;
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
    .easter-gizmo-box {
      position: absolute !important;
      top: 14px; right: 14px;
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
      animation: popIn 0.25s ease;
    }
    .easter-crit-splash {
      position: absolute !important;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: rgba(15, 23, 42, 0.95);
      border: 3px solid #fbbf24;
      box-shadow: 0 0 35px rgba(251, 191, 36, 0.8);
      border-radius: 12px;
      padding: 10px 16px;
      text-align: center;
      pointer-events: none;
      z-index: 105;
      animation: critExplode 0.85s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes critExplode {
      0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
      25% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
      75% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -60%) scale(0.9); opacity: 0; }
    }
    .easter-cloud-terminal {
      position: absolute !important;
      bottom: 12px; left: 12px; right: 12px;
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

    /* League of Legends: Clean Official Old Highest Mastery Icon */
    .lol-mastery-crest-img {
      position: absolute !important;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 105px; height: auto;
      filter: drop-shadow(0 0 25px rgba(56, 189, 248, 0.85));
      pointer-events: none;
      z-index: 105;
      transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .lol-mastery-crest-img.show {
      transform: translate(-50%, -50%) scale(1);
    }

    /* MTG Counterspell Peeking from Corner */
    .mtg-card-img-corner {
      position: absolute !important;
      bottom: -60px; right: -40px;
      transform: rotate(-14deg) scale(0.7);
      width: 145px; height: auto;
      border-radius: 8px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.9), 0 0 30px rgba(59, 130, 246, 0.8);
      pointer-events: none;
      z-index: 106;
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      opacity: 0;
    }
    .mtg-card-img-corner.show {
      bottom: 12px; right: 14px;
      transform: rotate(-8deg) scale(1);
      opacity: 1;
    }
    .mtg-response-banner-v2 {
      position: absolute !important;
      top: 14px; left: 50%;
      transform: translateX(-50%) scale(0);
      background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%);
      border: 2px solid #60a5fa;
      box-shadow: 0 0 25px rgba(96, 165, 250, 0.65);
      color: #93c5fd;
      padding: 6px 14px;
      border-radius: 8px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.58rem;
      pointer-events: none;
      z-index: 105;
      white-space: nowrap;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .mtg-response-banner-v2.show { transform: translateX(-50%) scale(1); }

    /* Pokémon Caught Vanish */
    .pokemon-card {
      cursor: pointer !important;
      transition: transform 0.3s, opacity 0.4s !important;
    }
    .pokemon-caught-vanish {
      opacity: 0 !important;
      transform: scale(0.2) rotate(15deg) !important;
      filter: blur(4px) !important;
      pointer-events: none !important;
    }
    .pokemon-respawn-burst {
      animation: respawnSparkle 0.8s ease-out forwards;
    }
    @keyframes respawnSparkle {
      0% { opacity: 0; transform: scale(0.4); filter: brightness(3); }
      50% { opacity: 1; transform: scale(1.15); filter: brightness(2); }
      100% { opacity: 1; transform: scale(1); filter: brightness(1); }
    }
    .pokemon-fail-banner {
      position: absolute !important;
      bottom: 16px; left: 50%;
      transform: translateX(-50%) scale(0);
      background: rgba(239, 68, 68, 0.95);
      border: 2px solid #fca5a5;
      color: #fff;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.55rem;
      padding: 6px 12px;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.6);
      pointer-events: none;
      z-index: 107;
      white-space: nowrap;
      animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .easter-caught-banner {
      position: absolute !important;
      bottom: 16px; left: 50%;
      transform: translateX(-50%) scale(0);
      background: #facc15;
      color: #0f172a;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.55rem;
      padding: 6px 12px;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(250, 204, 21, 0.6);
      pointer-events: none;
      z-index: 107;
      white-space: nowrap;
      animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    /* Competitive Robotics Status */
    .easter-frc-status {
      position: absolute !important;
      top: 14px; right: 14px;
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
      animation: popIn 0.25s ease;
    }

    /* Sports Scene Box & Visual Net/Hoop */
    .sports-scene-box {
      position: absolute !important;
      top: 0; left: 0; right: 0; bottom: 0;
      pointer-events: none;
      z-index: 104;
      overflow: hidden;
    }
    .sports-goal-net {
      position: absolute !important;
      top: 25px; right: 20px;
      width: 75px; height: 55px;
      border-top: 4px solid #fff;
      border-right: 4px solid #fff;
      border-left: 2px solid rgba(255,255,255,0.4);
      background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 10px),
                        repeating-linear-gradient(-45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 2px, transparent 2px, transparent 10px);
      box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
      transition: transform 0.15s ease;
    }
    .sports-goal-net.hit { transform: scale(1.15) skewX(8deg); }
    .sports-hoop-rim {
      position: absolute !important;
      top: 25px; right: 30px;
      width: 44px; height: 16px;
      border: 3px solid #f97316;
      border-radius: 50%;
    }
    .sports-hoop-net {
      position: absolute !important;
      top: 36px; right: 34px;
      width: 36px; height: 32px;
      background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 2px, transparent 2px, transparent 6px),
                        repeating-linear-gradient(-45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 2px, transparent 2px, transparent 6px);
      border-bottom: 2px solid #fff;
    }
    .sports-flying-ball {
      position: absolute !important;
      font-size: 1.6rem;
      pointer-events: none;
      z-index: 106;
      transition: left 0.55s cubic-bezier(0.25, 1, 0.5, 1), top 0.55s cubic-bezier(0.25, 1, 0.5, 1), transform 0.55s ease;
    }
    .easter-sports-score-v2 {
      position: absolute !important;
      top: 14px; left: 50%;
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
    .easter-sports-score-v2.show { transform: translateX(-50%) scale(1); }

    @keyframes popIn {
      from { transform: translateX(-50%) scale(0.6); opacity: 0; }
      to { transform: translateX(-50%) scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Inject Tracker Chip at Top Right
  const trackerChip = document.createElement('div');
  trackerChip.id = 'egg-tracker-chip';
  trackerChip.className = 'egg-tracker-chip';
  trackerChip.innerHTML = '🥚 SECRETS: <span id="egg-found-count">0</span>/' + TOTAL_SECRETS;
  document.body.appendChild(trackerChip);

  // Helper selectors
  function findProjectCard(titleText) {
    const cards = document.querySelectorAll('.project-card');
    for (let c of cards) {
      const h3 = c.querySelector('.project-card-title');
      if (h3 && h3.textContent.toLowerCase().includes(titleText.toLowerCase())) return c;
    }
    return null;
  }

  function findSkillCard(titleText) {
    const cards = document.querySelectorAll('.skill-card');
    for (let c of cards) {
      const h3 = c.querySelector('.skill-card-title');
      if (h3 && h3.textContent.toLowerCase().includes(titleText.toLowerCase())) return c;
    }
    return null;
  }

  function findDnaCard(titleText) {
    const cards = document.querySelectorAll('.dna-card');
    for (let c of cards) {
      const t = c.querySelector('.dna-title');
      if (t && t.textContent.toLowerCase().includes(titleText.toLowerCase())) return c;
    }
    return null;
  }

  /* =========================================================
     1. UCSC BANANA SLUG PEEK (ONLY SLUG ABOVE UCSC)
     ========================================================= */
  const badgePill = document.querySelector('.badge-pill');
  if (badgePill) {
    badgePill.style.position = 'relative';
    const slug = document.createElement('div');
    slug.className = 'ucsc-slug-peek';
    slug.innerHTML = '🍌 🐌';
    badgePill.appendChild(slug);

    badgePill.addEventListener('mouseenter', () => {
      slug.classList.add('show');
      sfx.playSlug();
      markSecret('ucsc_slug');
    });
    badgePill.addEventListener('mouseleave', () => slug.classList.remove('show'));
  }

  /* =========================================================
     2. DARK THRONE: DYNAMIC MOUSE FLASHLIGHT IN DARKNESS
     ========================================================= */
  const dtCard = document.querySelector('#featured .featured-project-card');
  if (dtCard) {
    dtCard.style.position = 'relative';

    const flOverlay = document.createElement('div');
    flOverlay.className = 'dt-flashlight-overlay';
    dtCard.appendChild(flOverlay);

    const torch = document.createElement('div');
    torch.className = 'dt-torch-aura';
    dtCard.appendChild(torch);

    dtCard.addEventListener('mouseenter', () => {
      flOverlay.classList.add('active');
      torch.classList.add('active');
      sfx.playTorchIgnite();
      markSecret('dark_throne_torch');
    });

    dtCard.addEventListener('mousemove', (e) => {
      const rect = dtCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      flOverlay.style.setProperty('--fx', `${x}px`);
      flOverlay.style.setProperty('--fy', `${y}px`);
      torch.style.left = `${x}px`;
      torch.style.top = `${y}px`;
    });

    dtCard.addEventListener('mouseleave', () => {
      flOverlay.classList.remove('active');
      torch.classList.remove('active');
    });
  }

  /* =========================================================
     3. PROFILE PICTURE: "HELLO!" SPEECH BUBBLE
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
      sfx.playHello();
      markSecret('profile_hello');
    });
    heroCard.addEventListener('mouseleave', () => bubble.classList.remove('show'));
  }

  /* =========================================================
     4. WHERE'S MY GUN?: ALIGNED GUN BARREL & RICOCHET
     ========================================================= */
  const gunCard = findProjectCard("Where's My Gun");
  if (gunCard) {
    gunCard.style.position = 'relative';
    gunCard.addEventListener('mouseenter', () => {
      sfx.playGunshot();
      markSecret('gun_ricochet');

      const media = gunCard.querySelector('.project-card-media');
      const originX = media ? media.offsetLeft + media.offsetWidth * 0.49 : gunCard.offsetWidth * 0.49;
      const originY = media ? media.offsetTop + media.offsetHeight * 0.64 : 110;

      const flash = document.createElement('div');
      flash.className = 'easter-muzzle-flash';
      flash.style.left = `${originX + 10}px`;
      flash.style.top = `${originY + 6}px`;
      gunCard.appendChild(flash);
      setTimeout(() => flash.remove(), 150);

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
            bx += bvx; by += bvy;
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
     5. PENCIL PUSHER: VISIBLE PINK ERASER & SLOWER RUBBING
     ========================================================= */
  const pencilCard = findProjectCard("Pencil Pusher");
  if (pencilCard) {
    const desc = pencilCard.querySelector('.project-card-desc');
    pencilCard.addEventListener('mouseenter', () => {
      markSecret('pencil_eraser');
      if (desc && !desc.classList.contains('erasing-active')) {
        desc.classList.add('erasing-active');
        sfx.playErase();

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

        let sweep = 0;
        const sweepInt = setInterval(() => {
          sweep++;
          const progress = (sweep % 4) / 3;
          eraser.style.left = `${descLeft + progress * (descW - 40)}px`;
          eraser.style.top = `${descTop + (sweep / 12) * (descH - 20)}px`;

          const crumb = document.createElement('div');
          crumb.className = 'easter-eraser-crumb';
          crumb.style.left = eraser.style.left;
          crumb.style.top = eraser.style.top;
          crumb.style.setProperty('--cx', `${(Math.random() - 0.5) * 20}px`);
          pencilCard.appendChild(crumb);
          setTimeout(() => crumb.remove(), 800);

          if (sweep >= 10) clearInterval(sweepInt);
        }, 140);

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
     6. BUILDING SCALER: PERSISTENT MULTI-INSTANCE 2D PHYSICS
     ========================================================= */
  const scalerCard = findProjectCard("Building Scaler");
  if (scalerCard) {
    scalerCard.style.position = 'relative';
    const blockColors = ['#ef4444', '#3b82f6', '#f97316', '#eab308', '#22c55e', '#a855f7', '#06b6d4'];

    // Persistent simulation state
    const persistentBodies = [];
    const floorY = scalerCard.offsetHeight - 42;
    let physLoopRunning = false;

    function runPhysLoop() {
      if (physLoopRunning) return;
      physLoopRunning = true;

      const loopInt = setInterval(() => {
        let activeMoving = false;

        for (let a = 0; a < persistentBodies.length; a++) {
          const bA = persistentBodies[a];
          if (bA.settled) continue;

          bA.vy += 0.65; // Gravity
          bA.x += bA.vx;
          bA.y += bA.vy;
          bA.rot += bA.vrot;
          activeMoving = true;

          // Floor
          if (bA.y >= floorY) {
            bA.y = floorY;
            bA.vy = -bA.vy * 0.32;
            bA.vx *= 0.75;
            bA.vrot *= 0.7;
            if (Math.abs(bA.vy) < 0.6) {
              bA.vy = 0;
              bA.settled = true;
            }
          }

          // Walls
          if (bA.x <= 15) { bA.x = 15; bA.vx = -bA.vx * 0.5; }
          if (bA.x >= scalerCard.offsetWidth - 40) { bA.x = scalerCard.offsetWidth - 40; bA.vx = -bA.vx * 0.5; }

          // Collide with ALL other bodies (including previous instances!)
          for (let b = 0; b < persistentBodies.length; b++) {
            if (a === b) continue;
            const bB = persistentBodies[b];
            const dx = bA.x - bB.x;
            const dy = bA.y - bB.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 26) {
              const overlap = 26 - dist;
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);

              bA.x += nx * overlap * 0.5;
              bA.y += ny * overlap * 0.5;
              bB.x -= nx * overlap * 0.5;
              bB.y -= ny * overlap * 0.5;

              bA.vx += nx * 1.5;
              bB.vx -= nx * 1.5;
              bB.settled = false; // Wake up settled block!
              sfx.playBlockClack();
            }
          }

          bA.el.style.left = `${bA.x}px`;
          bA.el.style.top = `${bA.y}px`;
          bA.el.style.transform = `rotate(${bA.rot}deg)`;
        }

        if (!activeMoving && persistentBodies.length > 0) {
          clearInterval(loopInt);
          physLoopRunning = false;
        }
      }, 25);
    }

    scalerCard.addEventListener('mouseenter', () => {
      markSecret('scaler_blocks');

      // Drop 2-3 new blocks each hover
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          if (persistentBodies.length > 18) {
            const oldest = persistentBodies.shift();
            if (oldest && oldest.el) oldest.el.remove();
          }

          const el = document.createElement('div');
          el.className = 'physics-tetris-block';
          const color = blockColors[Math.floor(Math.random() * blockColors.length)];
          el.style.background = color;
          scalerCard.appendChild(el);

          const body = {
            el,
            x: 35 + Math.random() * (scalerCard.offsetWidth - 90),
            y: 10,
            vx: (Math.random() - 0.5) * 3,
            vy: 1,
            rot: (Math.random() - 0.5) * 20,
            vrot: (Math.random() - 0.5) * 6,
            settled: false
          };
          persistentBodies.push(body);
          runPhysLoop();
        }, i * 160);
      }
    });
  }

  /* =========================================================
     7. THE LAST EMBER: FLAMES & SIDES EMBERS (FIXED LAYOUT)
     ========================================================= */
  const emberCard = findProjectCard("Last Ember");
  if (emberCard) {
    emberCard.style.position = 'relative';

    emberCard.addEventListener('mouseenter', () => {
      sfx.playFireCrackling();
      markSecret('last_ember');

      const flameSpots = [
        { left: '20px', bottom: '15px' },
        { left: '50%', bottom: '15px' },
        { right: '20px', bottom: '15px' },
        { left: '12px', top: '45%' },
        { right: '12px', top: '45%' }
      ];
      flameSpots.forEach((spot) => {
        const ft = document.createElement('div');
        ft.className = 'ember-fire-tongue';
        ft.textContent = '🔥';
        Object.assign(ft.style, spot);
        emberCard.appendChild(ft);
        setTimeout(() => ft.remove(), 1600);
      });

      for (let i = 0; i < 16; i++) {
        setTimeout(() => {
          const p = document.createElement('div');
          p.className = 'easter-fire-particle';
          p.style.background = Math.random() < 0.6 ? '#f97316' : '#facc15';
          p.style.boxShadow = '0 0 10px #f97316';
          p.style.left = `${Math.random() * emberCard.offsetWidth}px`;
          p.style.bottom = '16px';
          p.style.setProperty('--tx', `${(Math.random() - 0.5) * 80}px`);
          p.style.setProperty('--ty', `-${60 + Math.random() * 90}px`);
          emberCard.appendChild(p);
          setTimeout(() => p.remove(), 1200);
        }, i * 60);
      }
    });
  }

  /* =========================================================
     8. POSSESSION ESCAPE: READABLE CHASE WITH "AHHHHHH!!!!!"
     ========================================================= */
  const ghostCard = findProjectCard("Possession Escape");
  if (ghostCard) {
    ghostCard.style.position = 'relative';

    ghostCard.addEventListener('mouseenter', () => {
      sfx.playGhostChase();
      markSecret('possession_escape');

      const runner = document.createElement('div');
      runner.className = 'easter-corridor-runner';
      runner.textContent = '🏃';

      const ghost = document.createElement('div');
      ghost.className = 'easter-corridor-ghost';
      ghost.textContent = '👻';

      const scream = document.createElement('div');
      scream.className = 'easter-screaming-bubble-v2';
      scream.textContent = '😱 AHHHHHH!!!!!';

      ghostCard.appendChild(runner);
      ghostCard.appendChild(ghost);
      ghostCard.appendChild(scream);

      let rx = 30;
      let vx = 3.2; // Readable speed
      const trackY = ghostCard.offsetHeight - 58;

      const chaseInt = setInterval(() => {
        rx += vx;
        if (rx >= ghostCard.offsetWidth - 60) {
          vx = -vx;
          runner.style.transform = 'scaleX(-1)';
          ghost.style.transform = 'scaleX(-1)';
        } else if (rx <= 25 && vx < 0) {
          clearInterval(chaseInt);
          runner.remove();
          ghost.remove();
          scream.remove();
          return;
        }

        runner.style.left = `${rx}px`;
        runner.style.top = `${trackY}px`;
        scream.style.left = `${rx - 20}px`;
        scream.style.top = `${trackY - 26}px`;

        const gx = rx - (vx > 0 ? 55 : -55);
        ghost.style.left = `${gx}px`;
        ghost.style.top = `${trackY - 4 + Math.sin(rx * 0.08) * 8}px`;
      }, 25);
    });
  }

  /* =========================================================
     9. E-COMMERCE / JAMBELLES: TOP FOUNTAIN & LASTS LONGER
     ========================================================= */
  const ecomCard = findProjectCard("E-Commerce") || findProjectCard("Jambelles");
  if (ecomCard) {
    ecomCard.style.position = 'relative';

    ecomCard.addEventListener('mouseenter', () => {
      sfx.playChaChing();
      markSecret('ecom_fountain');

      const items = ['🛹', '🧦', '👕', '🧢', '💵', '📦', '💸', '✨'];

      items.forEach((icon, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'easter-ecom-item-v2';
        itemEl.textContent = icon;
        itemEl.style.left = '50%';
        itemEl.style.top = '25px'; // Origin at top part

        const angle = (0.2 + (idx / items.length) * 0.6) * Math.PI;
        const dist = 100 + Math.random() * 80;
        itemEl.style.setProperty('--ex', `${Math.cos(angle) * dist}px`);
        itemEl.style.setProperty('--ey', `${Math.sin(angle) * dist + 40}px`);
        itemEl.style.setProperty('--erot', `${(Math.random() - 0.5) * 360}deg`);

        ecomCard.appendChild(itemEl);
        setTimeout(() => itemEl.remove(), 2400); // Lasts longer
      });
    });
  }

  /* =========================================================
     10. SKILLS: LANGUAGES (RADIAL GREETINGS)
     ========================================================= */
  const langCard = findSkillCard("Languages");
  if (langCard) {
    langCard.style.position = 'relative';
    langCard.addEventListener('mouseenter', () => {
      sfx.playTone(523, 0.08, 'sine');
      markSecret('skills_languages');

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
     11. SKILLS: ENGINES & TECH (3D PHYSX DEBUGGER)
     ========================================================= */
  const engineCard = findSkillCard("Engines");
  if (engineCard) {
    engineCard.style.position = 'relative';
    engineCard.addEventListener('mouseenter', () => {
      sfx.playGizmo();
      markSecret('skills_engines');

      const gizmo = document.createElement('div');
      gizmo.className = 'easter-gizmo-box';
      gizmo.innerHTML = '⚙️ PHYSX 3D • 60 FPS [OK]';
      engineCard.appendChild(gizmo);
      setTimeout(() => gizmo.remove(), 1600);
    });
  }

  /* =========================================================
     12. SKILLS: GAMEPLAY & DESIGN (RPG CRIT HITSTOP)
     ========================================================= */
  const designCard = findSkillCard("Gameplay & Design");
  if (designCard) {
    designCard.style.position = 'relative';
    designCard.addEventListener('mouseenter', () => {
      sfx.playCritHit();
      markSecret('skills_gameplay');

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
     13. SKILLS: AI, CLOUD & TOOLS (LIVE CLUSTER TERMINAL)
     ========================================================= */
  const cloudCard = findSkillCard("AI, Cloud & Tools");
  if (cloudCard) {
    cloudCard.style.position = 'relative';
    cloudCard.addEventListener('mouseenter', () => {
      sfx.playCloudTerminal();
      markSecret('skills_cloud');

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
     14. LEAGUE OF LEGENDS: OFFICIAL IN-GAME MASTERY 7 CREST
     ========================================================= */
  const leagueCard = findDnaCard("League of Legends");
  if (leagueCard) {
    leagueCard.style.position = 'relative';

    const crestImg = document.createElement('img');
    crestImg.src = 'images/mastery_7.png';
    crestImg.alt = 'Mastery 7 Crest';
    crestImg.className = 'lol-mastery-crest-img';
    leagueCard.appendChild(crestImg);

    leagueCard.addEventListener('mouseenter', () => {
      crestImg.classList.add('show');
      sfx.playMastery();
      markSecret('league_mastery');
    });
    leagueCard.addEventListener('mouseleave', () => {
      crestImg.classList.remove('show');
    });
  }

  /* =========================================================
     15. MAGIC: THE GATHERING: COUNTERSPELL PEEKING FROM CORNER
     ========================================================= */
  const mtgCard = findDnaCard("Magic");
  if (mtgCard) {
    mtgCard.style.position = 'relative';

    const banner = document.createElement('div');
    banner.className = 'mtg-response-banner-v2';
    banner.innerHTML = '⚡ IN RESPONSE... [COUNTERSPELL]';
    mtgCard.appendChild(banner);

    const cardImg = document.createElement('img');
    cardImg.src = 'images/counterspell.png';
    cardImg.alt = 'Magic The Gathering Counterspell Card';
    cardImg.className = 'mtg-card-img-corner';
    mtgCard.appendChild(cardImg);

    mtgCard.addEventListener('mouseenter', () => {
      banner.classList.add('show');
      cardImg.classList.add('show');
      sfx.playCounterspell();
      markSecret('mtg_counterspell');
    });
    mtgCard.addEventListener('mouseleave', () => {
      banner.classList.remove('show');
      cardImg.classList.remove('show');
    });
  }

  /* =========================================================
     16. POKÉMON: HOVER-TO-CATCH, LOW CATCH RATE & VANISH
     ========================================================= */
  const pokeCard = findDnaCard("Pokémon");
  if (pokeCard) {
    pokeCard.style.position = 'relative';
    const ballTiers = [
      { name: 'Ultra Ball', top: '#1e293b', rate: 0.25 },
      { name: 'Great Ball', top: '#0284c7', rate: 0.18 },
      { name: 'Poké Ball', top: '#ef4444', rate: 0.12 }
    ];
    const failQuotes = [
      "Oh no! The Pokémon broke free!",
      "Aww! It appeared to be caught!",
      "Shoot! It was so close, too!",
      "Darn! Almost had it!"
    ];

    // Trigger on HOVER over any individual Pokemon card!
    const monCards = pokeCard.querySelectorAll('.pokemon-card');
    monCards.forEach(mon => {
      mon.addEventListener('mouseenter', () => {
        if (mon.classList.contains('pokemon-caught-vanish') || mon.dataset.ballActive === 'true') return;
        mon.dataset.ballActive = 'true';
        markSecret('pokemon_catch');

        const tier = ballTiers[Math.floor(Math.random() * ballTiers.length)];
        const monName = mon.querySelector('.pokemon-info-name') ? mon.querySelector('.pokemon-info-name').textContent.replace('✨', '').trim() : 'Pokémon';

        const ball = document.createElement('div');
        ball.className = 'easter-pokeball-sprite';
        ball.style.background = `linear-gradient(180deg, ${tier.top} 50%, #ffffff 50%)`;
        ball.innerHTML = '<div class="pokeball-mid-band"></div><div class="pokeball-btn-center"></div>';
        pokeCard.appendChild(ball);

        const targetX = mon.offsetLeft + mon.offsetWidth * 0.5 - 14;
        const targetY = mon.offsetTop + mon.offsetHeight * 0.5 - 14;

        ball.style.left = '20px';
        ball.style.top = '20px';
        sfx.playPokeballBounce();

        let bx = 20, by = 20;
        let bvx = (targetX - 20) / 14;
        let bvy = (targetY - 20) / 14;
        let step = 0;

        const throwInt = setInterval(() => {
          step++;
          bx += bvx; by += bvy;
          ball.style.left = `${bx}px`;
          ball.style.top = `${by}px`;
          ball.style.transform = `rotate(${step * 30}deg)`;

          if (step >= 14) {
            clearInterval(throwInt);
            sfx.playPokeballBounce();

            const rollSuccess = Math.random() < tier.rate;
            let wobbles = 0;

            const wobbleInt = setInterval(() => {
              wobbles++;
              sfx.playPokeballWobble();
              ball.style.transform = `rotate(${wobbles % 2 === 0 ? 18 : -18}deg) scale(1.15)`;

              // FAILED (Breakout)
              if (!rollSuccess && wobbles >= 2) {
                clearInterval(wobbleInt);
                sfx.playPokemonBreakout();
                ball.style.transform = 'scale(1.4)';

                const failBanner = document.createElement('div');
                failBanner.className = 'pokemon-fail-banner';
                const quote = failQuotes[Math.floor(Math.random() * failQuotes.length)];
                failBanner.textContent = `❌ ${quote}`;
                pokeCard.appendChild(failBanner);

                setTimeout(() => {
                  ball.remove();
                  failBanner.remove();
                  mon.dataset.ballActive = 'false';
                }, 1600);
              }
              // SUCCESS (Caught)
              else if (rollSuccess && wobbles >= 3) {
                clearInterval(wobbleInt);
                sfx.playPokemonCaught();
                ball.style.transform = 'scale(1.25)';

                mon.classList.add('pokemon-caught-vanish');

                const winBanner = document.createElement('div');
                winBanner.className = 'easter-caught-banner';
                winBanner.textContent = `⭐ All right! Shiny ${monName} was caught! ⭐`;
                pokeCard.appendChild(winBanner);

                setTimeout(() => {
                  ball.remove();
                  winBanner.remove();
                }, 2200);

                setTimeout(() => {
                  mon.classList.remove('pokemon-caught-vanish');
                  mon.classList.add('pokemon-respawn-burst');
                  setTimeout(() => {
                    mon.classList.remove('pokemon-respawn-burst');
                    mon.dataset.ballActive = 'false';
                  }, 800);
                }, 4500);
              }
            }, 350);
          }
        }, 25);
      });
    });
  }

  /* =========================================================
     17. COMPETITIVE ROBOTICS: FRC DRIVER STATUS (FIXED)
     ========================================================= */
  const roboticsCard = findDnaCard("Robotics");
  if (roboticsCard) {
    roboticsCard.style.position = 'relative';

    roboticsCard.addEventListener('mouseenter', () => {
      // Remove any existing badge first
      const existing = roboticsCard.querySelector('.easter-frc-status');
      if (existing) existing.remove();

      sfx.playRoboticsMotor();
      markSecret('robotics_driver');

      const status = document.createElement('div');
      status.className = 'easter-frc-status';
      status.innerHTML = '🤖 FRC 199 DEEP BLUE • DRIVER 1 [ACTIVE]';
      roboticsCard.appendChild(status);
      setTimeout(() => status.remove(), 1800);
    });
  }

  /* =========================================================
     18. SPORTS: VISUAL SOCCER GOAL & BASKETBALL HOOP (FIXED)
     ========================================================= */
  const sportsCard = findDnaCard("Sports");
  if (sportsCard) {
    sportsCard.style.position = 'relative';

    sportsCard.addEventListener('mouseenter', () => {
      // Remove any existing scenes/banners
      const existingScene = sportsCard.querySelector('.sports-scene-box');
      if (existingScene) existingScene.remove();
      const existingBanner = sportsCard.querySelector('.easter-sports-score-v2');
      if (existingBanner) existingBanner.remove();

      markSecret('sports_game');
      const mode = Math.random() < 0.5 ? 'soccer' : 'basketball';

      const scene = document.createElement('div');
      scene.className = 'sports-scene-box';
      sportsCard.appendChild(scene);

      if (mode === 'soccer') {
        const goal = document.createElement('div');
        goal.className = 'sports-goal-net';
        scene.appendChild(goal);

        const ball = document.createElement('div');
        ball.className = 'sports-flying-ball';
        ball.textContent = '⚽';
        ball.style.left = '20px';
        ball.style.top = `${sportsCard.offsetHeight - 50}px`;
        scene.appendChild(ball);

        setTimeout(() => {
          ball.style.left = `${sportsCard.offsetWidth - 80}px`;
          ball.style.top = '36px';
          ball.style.transform = 'rotate(720deg) scale(0.9)';
        }, 40);

        setTimeout(() => {
          goal.classList.add('hit');
          sfx.playWhistle();

          const banner = document.createElement('div');
          banner.className = 'easter-sports-score-v2 show';
          banner.innerHTML = '⚽ GOAAAL! (15+ YRS SOCCER ENDURANCE) 🥅';
          sportsCard.appendChild(banner);

          setTimeout(() => {
            scene.remove();
            banner.remove();
          }, 1800);
        }, 580);
      } else {
        const rim = document.createElement('div');
        rim.className = 'sports-hoop-rim';
        const net = document.createElement('div');
        net.className = 'sports-hoop-net';
        scene.appendChild(rim);
        scene.appendChild(net);

        const ball = document.createElement('div');
        ball.className = 'sports-flying-ball';
        ball.textContent = '🏀';
        ball.style.left = '20px';
        ball.style.top = `${sportsCard.offsetHeight - 50}px`;
        scene.appendChild(ball);

        setTimeout(() => {
          ball.style.left = `${sportsCard.offsetWidth - 70}px`;
          ball.style.top = '15px';
        }, 40);

        setTimeout(() => {
          ball.style.top = '48px';
          sfx.playBuzzer();

          const banner = document.createElement('div');
          banner.className = 'easter-sports-score-v2 show';
          banner.innerHTML = '🏀 SWISH! 3-POINTER AT THE BUZZER! 🎯';
          sportsCard.appendChild(banner);

          setTimeout(() => {
            scene.remove();
            banner.remove();
          }, 1800);
        }, 580);
      }
    });
  }

  console.log("Portfolio Easter Eggs Engine v4.0 initialized. Total secrets:", TOTAL_SECRETS);
})();
