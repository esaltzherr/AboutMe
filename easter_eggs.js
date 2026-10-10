/* =========================================================
   ELROY SALTZHERR • PORTFOLIO HOVER EASTER EGGS ENGINE v5.0
   Tactile, responsive, perfectly positioned micro-interactions:
   - Secret Tracker HUD: 0/18 Discovered
   - UCSC Banana Slug peek directly above UCSC (just the slug)
   - Dark Throne dynamic mouse flashlight in darkness
   - Building Scaler persistent 2D physics blocks with timed disappearance,
     quieter throttled audio, and randomized block shapes
   - The Last Ember hopping, bouncing fire sprites & ember trails
   - Possession Escape with human facing the correct direction and "AHHHHHH!!!!!"
   - E-Commerce randomized spawn origin along top & varied angles
   - Gameplay & Design Crit popup with randomized tilt angle (±15°)
   - Technical Skills badges with clean scale-in animation (no sliding)
   - League of Legends official Mastery 7 crest (clean)
   - Magic: The Gathering Counterspell card peeking from the corner
   - Pokémon: Pokéball VISIBLY flying across the card from corner to the hovered mon,
     with low catch rates, authentic quotes & temporary vanish
   - Competitive Robotics: stationary badge (no sliding)
   - Sports Visual Soccer Goal & Basketball Hoop (fixed layout)
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
      this.playTone(660, 0.08, 'sine', 0.06);
      setTimeout(() => this.playTone(880, 0.12, 'triangle', 0.08), 70);
    }
    playHello() {
      this.init();
      this.playTone(523.25, 0.08, 'triangle', 0.09);
      setTimeout(() => this.playTone(659.25, 0.14, 'triangle', 0.1), 70);
    }
    playTorchIgnite() {
      this.init();
      this.playTone(180, 0.25, 'sawtooth', 0.03);
      setTimeout(() => this.playTone(220, 0.35, 'sine', 0.04), 100);
    }
    playGunshot() {
      this.init();
      this.playTone(320, 0.05, 'sawtooth', 0.16);
      setTimeout(() => this.playTone(140, 0.09, 'square', 0.1), 25);
    }
    playRicochet() {
      this.init();
      this.playTone(800 + Math.random() * 400, 0.05, 'triangle', 0.06);
    }
    playErase() {
      this.init();
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          this.playTone(160 + (i % 2) * 40, 0.04, 'sawtooth', 0.025);
        }, i * 60);
      }
    }
    // Very quiet throttled clack for physics blocks
    playBlockClack() {
      this.init();
      this.playTone(240 + Math.random() * 80, 0.03, 'triangle', 0.02);
    }
    playFireCrackling() {
      this.init();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => this.playTone(400 + Math.random() * 300, 0.06, 'sine', 0.025), i * 80);
      }
    }
    playGhostChase() {
      this.init();
      if (!this.ctx) return;
      for (let i = 0; i < 4; i++) {
        setTimeout(() => this.playTone(240 + (i % 2) * 40, 0.04, 'triangle', 0.035), i * 140);
      }
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.4);
      g.gain.setValueAtTime(0.035, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(g); g.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.4);
    }
    playChaChing() {
      this.init();
      this.playTone(987.77, 0.08, 'sine', 0.1);
      setTimeout(() => this.playTone(1318.51, 0.22, 'sine', 0.12), 70);
    }
    playMastery() {
      this.init();
      [587.33, 880, 1174.66, 1760].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.25, 'triangle', 0.11), i * 75);
      });
    }
    playCounterspell() {
      this.init();
      this.playTone(180, 0.25, 'sawtooth', 0.06);
      setTimeout(() => this.playTone(880, 0.35, 'sine', 0.1), 80);
    }
    playPokeballBounce() {
      this.init();
      this.playTone(340, 0.04, 'sine', 0.07);
      setTimeout(() => this.playTone(220, 0.06, 'triangle', 0.05), 20);
    }
    playPokeballWobble() {
      this.init();
      this.playTone(440, 0.05, 'sine', 0.06);
      setTimeout(() => this.playTone(330, 0.05, 'sine', 0.04), 40);
    }
    playPokemonCaught() {
      this.init();
      [659, 783, 1046, 1318].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.18, 'square', 0.08), i * 90);
      });
    }
    playPokemonBreakout() {
      this.init();
      this.playTone(240, 0.1, 'sawtooth', 0.08);
      setTimeout(() => this.playTone(180, 0.15, 'square', 0.06), 80);
    }
    playShinySparkle() {
      this.init();
      [1046.5, 1318.5, 1567.98, 2093].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.12, 'triangle', 0.08), i * 60);
      });
    }
    playWhistle() {
      this.init();
      this.playTone(1046.5, 0.15, 'square', 0.07);
      setTimeout(() => this.playTone(1046.5, 0.25, 'square', 0.09), 120);
    }
    playBuzzer() {
      this.init();
      this.playTone(220, 0.3, 'sawtooth', 0.09);
    }
    playGizmo() {
      this.init();
      this.playTone(330, 0.05, 'square', 0.05);
      setTimeout(() => this.playTone(659.25, 0.15, 'triangle', 0.08), 100);
    }
    playCritHit() {
      this.init();
      this.playTone(260, 0.04, 'sawtooth', 0.16);
      setTimeout(() => this.playTone(880, 0.2, 'triangle', 0.13), 30);
    }
    playCloudTerminal() {
      this.init();
      [600, 750, 900, 1200].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.03, 'sine', 0.04), i * 35);
      });
    }
    playRoboticsMotor() {
      this.init();
      this.playTone(140, 0.25, 'sawtooth', 0.05);
      setTimeout(() => this.playTone(440, 0.1, 'square', 0.07), 200);
    }
    playSecretUnlocked() {
      this.init();
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.15, 'triangle', 0.07), i * 70);
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

    /* UCSC Banana Slug (Real Banana Slug Vector above UCSC) */
    .ucsc-slug-peek {
      position: absolute;
      top: -34px;
      right: 28px;
      pointer-events: none;
      z-index: 200;
      transform: translateY(10px) scale(0);
      transform-origin: bottom center;
      transition: transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .ucsc-slug-peek.show {
      transform: translateY(0) scale(1);
    }
    .ucsc-slug-peek svg {
      display: block;
      filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 8px rgba(250, 204, 21, 0.5));
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
      border-radius: 3px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      z-index: 104;
      transition: opacity 0.5s ease, transform 0.1s linear;
    }

    /* Last Ember Bouncing Fire Sprites */
    .ember-bouncing-flame {
      position: absolute !important;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 103;
      user-select: none;
      filter: drop-shadow(0 0 10px #f97316);
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

    /* Possession Escape: Human correctly flipped & readable */
    .easter-corridor-runner {
      position: absolute !important;
      font-size: 1.7rem;
      pointer-events: none;
      z-index: 105;
      user-select: none;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));
      transition: transform 0.15s ease;
    }
    .easter-corridor-ghost {
      position: absolute !important;
      font-size: 1.8rem;
      pointer-events: none;
      z-index: 104;
      user-select: none;
      filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.8));
      transition: transform 0.15s ease;
    }
    .easter-screaming-bubble-v2 {
      position: absolute !important;
      background: #ef4444;
      color: #fff;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.55rem;
      padding: 5px 9px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
      pointer-events: none;
      z-index: 106;
      white-space: nowrap;
    }

    /* E-Commerce Top Fountain Arc */
    .easter-ecom-item-v2 {
      position: absolute !important;
      font-size: 1.55rem;
      pointer-events: none;
      z-index: 105;
      animation: ecomArc 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes ecomArc {
      0% { transform: translate(-50%, -50%) scale(0.4) rotate(0deg); opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translate(calc(-50% + var(--ex)), calc(-50% + var(--ey))) scale(1.1) rotate(var(--erot)); opacity: 0; }
    }

    /* Technical Skills Overlays (Smooth scale-in, NO sliding) */
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
      animation: badgeScaleIn 0.25s ease;
    }
    .easter-crit-splash {
      position: absolute !important;
      top: 50%; left: 50%;
      background: rgba(15, 23, 42, 0.95);
      border: 3px solid #fbbf24;
      box-shadow: 0 0 35px rgba(251, 191, 36, 0.8);
      border-radius: 12px;
      padding: 10px 16px;
      text-align: center;
      pointer-events: none;
      z-index: 105;
      animation: critExplodeRandom 0.85s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes critExplodeRandom {
      0% { transform: translate(-50%, -50%) scale(0.3) rotate(var(--crot, 0deg)); opacity: 0; }
      25% { transform: translate(-50%, -50%) scale(1.15) rotate(var(--crot, 0deg)); opacity: 1; }
      75% { transform: translate(-50%, -50%) scale(1) rotate(var(--crot, 0deg)); opacity: 1; }
      100% { transform: translate(-50%, -60%) scale(0.9) rotate(var(--crot, 0deg)); opacity: 0; }
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

    /* Clean Scale-in for right-anchored badges (NO horizontal sliding!) */
    @keyframes badgeScaleIn {
      from { transform: scale(0.6); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    /* League of Legends: Interactive Champion Bubbles & Mastery 7 Emote */
    .league-bubbles-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 16px;
      padding: 10px 0 6px 0;
    }
    .league-champ-bubble {
      position: relative;
      border-radius: 50%;
      cursor: pointer;
      border: 2.5px solid #ca8a04;
      background: #0f172a;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(234, 179, 8, 0.2);
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s, box-shadow 0.2s;
      flex-shrink: 0;
    }
    .league-champ-bubble:hover {
      transform: translateY(-6px) scale(1.08);
      border-color: #facc15;
      box-shadow: 0 0 25px rgba(250, 204, 21, 0.8), inset 0 0 15px rgba(250, 204, 21, 0.4);
    }
    .league-champ-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }
    .league-mastery-popup {
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%) scale(0);
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
      z-index: 120;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.25s ease;
      opacity: 0;
      white-space: nowrap;
    }
    .league-mastery-popup.show {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
    .league-mastery-crest-icon {
      width: 58px;
      height: auto;
      filter: drop-shadow(0 0 14px rgba(234, 179, 8, 0.9));
      animation: masteryGleam 1.8s ease-in-out infinite alternate;
    }
    .league-mastery-pts-badge {
      margin-top: 4px;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid #eab308;
      box-shadow: 0 0 12px rgba(234, 179, 8, 0.5);
      color: #fef08a;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.52rem;
      padding: 3px 8px;
      border-radius: 999px;
      text-align: center;
      letter-spacing: 0.05em;
    }
    @keyframes masteryGleam {
      0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.7)); }
      100% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(250, 204, 21, 0.95)); }
    }
    .lol-mastery-crest-img {
      position: absolute !important;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 110px; height: auto;
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

    /* Pokémon Pokéball Throw & Vanish */
    .pokemon-card {
      cursor: pointer !important;
      transition: transform 0.3s ease, opacity 0.35s ease, filter 0.3s ease !important;
    }
    .pokemon-card:not(.pokemon-caught-vanish):not(.pokemon-absorbing) {
      opacity: 1 !important;
      filter: none !important;
    }
    .pokemon-absorbing {
      opacity: 0.3 !important;
      filter: brightness(2.2) drop-shadow(0 0 14px #ef4444) !important;
      transform: scale(0.88) !important;
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
    .pokemon-card.pokemon-respawn-burst .sparkle.s1,
    .pokemon-card.show-sparkles .sparkle.s1 {
      animation: shiny-sparkle-1 1.1s cubic-bezier(0.25, 1, 0.5, 1) infinite !important;
    }
    .pokemon-card.pokemon-respawn-burst .sparkle.s2,
    .pokemon-card.show-sparkles .sparkle.s2 {
      animation: shiny-sparkle-2 1.1s cubic-bezier(0.25, 1, 0.5, 1) infinite 0.16s !important;
    }
    .pokemon-card.pokemon-respawn-burst .sparkle.s3,
    .pokemon-card.show-sparkles .sparkle.s3 {
      animation: shiny-sparkle-3 1.1s cubic-bezier(0.25, 1, 0.5, 1) infinite 0.32s !important;
    }
    .pokemon-card.pokemon-respawn-burst .sparkle.s4,
    .pokemon-card.show-sparkles .sparkle.s4 {
      animation: shiny-sparkle-4 1.1s cubic-bezier(0.25, 1, 0.5, 1) infinite 0.48s !important;
    }
    .easter-shiny-star {
      position: absolute !important;
      top: 45%; left: 50%;
      pointer-events: none;
      font-size: 16px;
      color: #fef08a;
      text-shadow: 0 0 8px #f59e0b, 0 0 16px #ffffff;
      z-index: 20;
      animation: shinyStarBurst 1.1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }
    @keyframes shinyStarBurst {
      0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
      25% { transform: translate(calc(-50% + var(--sx) * 0.6), calc(-50% + var(--sy) * 0.6)) scale(1.5) rotate(90deg); opacity: 1; }
      75% { transform: translate(calc(-50% + var(--sx)), calc(-50% + var(--sy))) scale(1.1) rotate(180deg); opacity: 0.9; }
      100% { transform: translate(calc(-50% + var(--sx) * 1.2), calc(-50% + var(--sy) * 1.2)) scale(0) rotate(270deg); opacity: 0; }
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
    .easter-pokeball-sprite {
      position: absolute !important;
      width: 34px; height: 34px;
      pointer-events: none;
      z-index: 106;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6));
      transition: transform 0.14s ease-out;
    }
    .easter-pokeball-sprite .pokeball-svg {
      width: 100%; height: 100%;
      display: block;
    }
    .easter-pokeball-sprite.ball-burst .pokeball-top-half {
      transform: translateY(-24px) rotate(-35deg) scale(0.9);
      opacity: 0;
      transition: transform 0.35s cubic-bezier(0.15, 0.9, 0.3, 1.2), opacity 0.3s ease;
    }
    .easter-pokeball-sprite.ball-burst .pokeball-bottom-half {
      transform: translateY(18px) rotate(22deg) scale(0.9);
      opacity: 0;
      transition: transform 0.35s cubic-bezier(0.15, 0.9, 0.3, 1.2), opacity 0.3s ease;
    }
    .easter-pokeball-sprite.ball-caught {
      filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.9)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6));
      transform: scale(1.18);
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .easter-poof-particle {
      position: absolute !important;
      pointer-events: none;
      z-index: 108;
      font-size: 1.1rem;
      animation: poofScatter 0.5s ease-out forwards;
    }
    @keyframes poofScatter {
      0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
      100% { transform: translate(var(--px), var(--py)) scale(1.4); opacity: 0; }
    }

    /* Competitive Robotics Status Badge (NO sliding!) */
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
      animation: badgeScaleIn 0.25s ease;
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
     1. UCSC BANANA SLUG PEEK (REAL BANANA SLUG VECTOR)
     ========================================================= */
  const badgePill = document.querySelector('.badge-pill');
  if (badgePill) {
    badgePill.style.position = 'relative';
    const slug = document.createElement('div');
    slug.className = 'ucsc-slug-peek';
    slug.innerHTML = `
      <svg class="ucsc-slug-svg" viewBox="0 0 120 48" width="90" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="slug-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="40%" stop-color="#facc15"/>
            <stop offset="100%" stop-color="#eab308"/>
          </linearGradient>
        </defs>
        <!-- Slime trail gleam -->
        <path d="M 12 43 Q 60 41 108 43" stroke="rgba(253, 224, 71, 0.45)" stroke-width="3" stroke-linecap="round"/>
        <!-- Slug Body -->
        <path d="M 12 42 C 25 40, 40 32, 58 26 C 66 23, 76 22, 88 23 C 98 24, 106 28, 105 35 C 104 40, 94 42, 82 42 C 55 42, 35 43, 12 42 Z" fill="url(#slug-grad)" stroke="#ca8a04" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- Mantle (saddle) -->
        <path d="M 64 24 C 68 20, 84 20, 88 24 C 90 28, 86 34, 76 34 C 66 34, 62 28, 64 24 Z" fill="#fde047" stroke="#d97706" stroke-width="1.2"/>
        <!-- Upper Eye Stalks (Tentacles) -->
        <path d="M 97 24 C 99 18, 102 12, 104 8" stroke="#ca8a04" stroke-width="2" stroke-linecap="round"/>
        <circle cx="104" cy="8" r="2.2" fill="#78350f"/>
        <circle cx="104.5" cy="7.5" r="0.8" fill="#ffffff"/>
        <path d="M 102 26 C 106 20, 110 14, 113 11" stroke="#ca8a04" stroke-width="2" stroke-linecap="round"/>
        <circle cx="113" cy="11" r="2.2" fill="#78350f"/>
        <circle cx="113.5" cy="10.5" r="0.8" fill="#ffffff"/>
        <!-- Lower Sensory Tentacles -->
        <path d="M 104 33 C 107 35, 110 36, 112 36" stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M 101 36 C 103 38, 106 39, 108 39" stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Characteristic Banana Slug Spots -->
        <ellipse cx="40" cy="35" rx="2.2" ry="1.4" fill="#854d0e" opacity="0.65"/>
        <ellipse cx="52" cy="30" rx="2.5" ry="1.5" fill="#854d0e" opacity="0.65"/>
        <ellipse cx="60" cy="36" rx="1.8" ry="1.2" fill="#854d0e" opacity="0.55"/>
        <ellipse cx="78" cy="27" rx="2.2" ry="1.3" fill="#854d0e" opacity="0.65"/>
        <ellipse cx="85" cy="32" rx="1.6" ry="1" fill="#854d0e" opacity="0.55"/>
        <ellipse cx="30" cy="39" rx="1.6" ry="1" fill="#854d0e" opacity="0.55"/>
      </svg>
    `;
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
     6. BUILDING SCALER: UPRIGHT AABB STACKING & PURE TIME-BASED LIFECYCLE
     ========================================================= */
  const scalerCard = findProjectCard("Building Scaler");
  if (scalerCard) {
    scalerCard.style.position = 'relative';
    const blockColors = ['#ef4444', '#3b82f6', '#f97316', '#eab308', '#22c55e', '#a855f7', '#06b6d4'];

    const persistentBodies = [];
    const floorY = scalerCard.offsetHeight - 30;
    let physLoopRunning = false;
    let lastClackTime = 0;

    function runPhysLoop() {
      if (physLoopRunning) return;
      physLoopRunning = true;

      const loopInt = setInterval(() => {
        let activeMoving = false;
        const now = Date.now();

        for (let a = persistentBodies.length - 1; a >= 0; a--) {
          const bA = persistentBodies[a];

          // Pure time-based lifetime (6.5s)
          const elapsed = now - bA.spawnTime;
          if (elapsed >= bA.lifespan) {
            bA.el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            bA.el.style.opacity = '0';
            bA.el.style.transform = 'scale(0.4)';
            const toRemove = bA.el;
            setTimeout(() => { if (toRemove && toRemove.parentNode) toRemove.remove(); }, 350);
            persistentBodies.splice(a, 1);

            // Re-enable physics for any block that was resting above
            for (let k = 0; k < persistentBodies.length; k++) {
              const bK = persistentBodies[k];
              if (bK.y + bK.h < floorY - 2) {
                bK.settled = false;
                bK.vy = Math.max(bK.vy, 0.5);
              }
            }
            continue;
          } else if (elapsed >= bA.lifespan - 1200) {
            // Fade out smoothly in final 1.2 seconds
            bA.el.style.opacity = ((bA.lifespan - elapsed) / 1200).toFixed(2);
          }

          // Active support check: if a settled block is above the floor, verify it still has a block directly beneath it!
          if (bA.settled && (bA.y + bA.h < floorY - 2)) {
            let hasSupport = false;
            for (let b = 0; b < persistentBodies.length; b++) {
              if (a === b) continue;
              const bB = persistentBodies[b];
              const verticalGap = Math.abs((bA.y + bA.h) - bB.y);
              const minX = Math.max(bA.x, bB.x);
              const maxX = Math.min(bA.x + bA.w, bB.x + bB.w);
              const hOverlap = maxX - minX;

              if (verticalGap <= 4 && hOverlap > 4) {
                hasSupport = true;
                break;
              }
            }
            if (!hasSupport) {
              bA.settled = false;
              bA.vy = Math.max(bA.vy, 0.5);
              activeMoving = true;
            }
          }

          if (bA.settled) continue;

          bA.vy += 0.65; // Gravity
          bA.x += bA.vx;
          bA.y += bA.vy;
          activeMoving = true;

          // While falling, gentle upright sway (within ±3 degrees)
          if (!bA.settled) {
            bA.rot = Math.sin((now - bA.spawnTime) * 0.008) * 3;
          }

          // Floor collision (Accurate hitbox: bottom is y + h)
          if (bA.y + bA.h >= floorY) {
            bA.y = floorY - bA.h;
            bA.vy = -bA.vy * 0.2;
            bA.vx *= 0.65;
            bA.rot = 0; // Snap perfectly upright on impact!
            if (Math.abs(bA.vy) < 0.6) {
              bA.vy = 0;
              bA.vx = 0;
              bA.rot = 0;
              bA.settled = true;
            }
          }

          // Wall collision
          if (bA.x <= 15) {
            bA.x = 15;
            bA.vx = -bA.vx * 0.4;
          }
          const maxW = scalerCard.offsetWidth - bA.w - 15;
          if (bA.x >= maxW) {
            bA.x = maxW;
            bA.vx = -bA.vx * 0.4;
          }

          // Accurate AABB collision between all bodies
          for (let b = 0; b < persistentBodies.length; b++) {
            if (a === b) continue;
            const bB = persistentBodies[b];

            // Centers
            const cxA = bA.x + bA.w * 0.5;
            const cyA = bA.y + bA.h * 0.5;
            const cxB = bB.x + bB.w * 0.5;
            const cyB = bB.y + bB.h * 0.5;

            const dx = cxA - cxB;
            const dy = cyA - cyB;

            const halfW = (bA.w + bB.w) * 0.5;
            const halfH = (bA.h + bB.h) * 0.5;

            const overlapX = halfW - Math.abs(dx);
            const overlapY = halfH - Math.abs(dy);

            if (overlapX > 0 && overlapY > 0) {
              // Colliding! Straighten out instantly
              bA.rot = 0;
              if (bB.settled) bB.rot = 0;

              if (overlapX < overlapY) {
                // Horizontal collision (hit side of another block)
                const signX = dx > 0 ? 1 : -1;
                if (bB.settled) {
                  bA.x += signX * overlapX;
                  bA.vx = -bA.vx * 0.3;
                } else if (bA.settled) {
                  bB.x -= signX * overlapX;
                  bB.vx = -bB.vx * 0.3;
                } else {
                  bA.x += signX * overlapX * 0.5;
                  bB.x -= signX * overlapX * 0.5;
                  const vAvg = (bA.vx - bB.vx) * 0.35;
                  bA.vx = vAvg;
                  bB.vx = -vAvg;
                }
              } else {
                // Vertical collision (stacking)
                if (dy < 0) {
                  // A is on top of B (A lands directly on top of B!)
                  bA.y = bB.y - bA.h;
                  bA.vy = -bA.vy * 0.15;
                  bA.vx *= 0.6;
                  bA.rot = 0;
                  if (Math.abs(bA.vy) < 0.6) {
                    bA.vy = 0;
                    bA.vx = 0;
                    bA.settled = true;
                  }
                } else {
                  // B is on top of A
                  if (bA.settled) {
                    bB.y = bA.y - bB.h;
                    bB.vy = -bB.vy * 0.15;
                    bB.vx *= 0.6;
                    bB.rot = 0;
                    if (Math.abs(bB.vy) < 0.6) {
                      bB.vy = 0;
                      bB.vx = 0;
                      bB.settled = true;
                    }
                  } else {
                    bA.y += overlapY * 0.5;
                    bB.y -= overlapY * 0.5;
                  }
                }
              }

              // Throttled quiet clack audio
              if (now - lastClackTime > 450) {
                sfx.playBlockClack();
                lastClackTime = now;
              }
            }
          }

          bA.el.style.left = `${bA.x}px`;
          bA.el.style.top = `${bA.y}px`;
          bA.el.style.transform = bA.rot !== 0 ? `rotate(${bA.rot}deg)` : 'none';
        }

        if (!activeMoving && persistentBodies.length === 0) {
          clearInterval(loopInt);
          physLoopRunning = false;
        }
      }, 25);
    }

    scalerCard.addEventListener('mouseenter', () => {
      markSecret('scaler_blocks');

      // Randomized block shapes: Square (24x24), Wide (36x18), Tall (18x36)
      const shapes = [
        { w: 24, h: 24 },
        { w: 36, h: 18 },
        { w: 18, h: 36 }
      ];

      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const el = document.createElement('div');
          el.className = 'physics-tetris-block';
          el.style.width = `${shape.w}px`;
          el.style.height = `${shape.h}px`;
          el.style.background = blockColors[Math.floor(Math.random() * blockColors.length)];
          scalerCard.appendChild(el);

          const body = {
            el,
            w: shape.w,
            h: shape.h,
            x: 35 + Math.random() * (scalerCard.offsetWidth - 110),
            y: 10,
            vx: (Math.random() - 0.5) * 2,
            vy: 1,
            rot: 0,
            settled: false,
            spawnTime: Date.now(),
            lifespan: 6500 // Purely time-based 6.5s lifetime
          };
          persistentBodies.push(body);
          runPhysLoop();
        }, i * 160);
      }
    });
  }

  /* =========================================================
     7. THE LAST EMBER: BOUNCING FIRE SPRITES & TRAILING EMBERS
     ========================================================= */
  const emberCard = findProjectCard("Last Ember");
  if (emberCard) {
    emberCard.style.position = 'relative';

    emberCard.addEventListener('mouseenter', () => {
      sfx.playFireCrackling();
      markSecret('last_ember');

      // 3 Dynamic Bouncing Fire Sprites
      for (let f = 0; f < 3; f++) {
        const flame = document.createElement('div');
        flame.className = 'ember-bouncing-flame';
        flame.textContent = '🔥';
        emberCard.appendChild(flame);

        let fx = 30 + f * 90;
        let fy = emberCard.offsetHeight - 50;
        let fvx = (Math.random() - 0.5) * 7;
        let fvy = -Math.random() * 6 - 5;
        let bounces = 0;

        const flameInt = setInterval(() => {
          fvy += 0.45; // Gravity
          fx += fvx;
          fy += fvy;

          // Floor Bounce
          if (fy >= emberCard.offsetHeight - 42) {
            fy = emberCard.offsetHeight - 42;
            fvy = -Math.random() * 5 - 4;
            fvx = (Math.random() - 0.5) * 6;
            bounces++;
          }
          // Wall Bounce
          if (fx <= 15 || fx >= emberCard.offsetWidth - 35) {
            fvx = -fvx;
          }

          flame.style.left = `${fx}px`;
          flame.style.top = `${fy}px`;

          // Drop glowing ember particle
          if (Math.random() < 0.4) {
            const p = document.createElement('div');
            p.className = 'easter-fire-particle';
            p.style.background = Math.random() < 0.6 ? '#f97316' : '#facc15';
            p.style.boxShadow = '0 0 8px #f97316';
            p.style.left = `${fx + 8}px`;
            p.style.top = `${fy + 8}px`;
            p.style.setProperty('--tx', `${(Math.random() - 0.5) * 40}px`);
            p.style.setProperty('--ty', `-${30 + Math.random() * 50}px`);
            emberCard.appendChild(p);
            setTimeout(() => p.remove(), 1000);
          }

          if (bounces >= 4) {
            clearInterval(flameInt);
            flame.remove();
          }
        }, 28);
      }
    });
  }

  /* =========================================================
     8. POSSESSION ESCAPE: CORRECT FACING DIRECTION & "AHHHHHH!!!!!"
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
      let vx = 3.0; // Slower, readable corridor speed
      const trackY = ghostCard.offsetHeight - 58;

      const chaseInt = setInterval(() => {
        rx += vx;

        // Facing direction fix:
        // In fonts, runner emoji faces LEFT by default.
        // When moving RIGHT (vx > 0), scaleX(-1) makes him face RIGHT!
        // When moving LEFT (vx < 0), scaleX(1) makes him face LEFT!
        if (vx > 0) {
          runner.style.transform = 'scaleX(-1)';
          ghost.style.transform = 'scaleX(-1)';
        } else {
          runner.style.transform = 'scaleX(1)';
          ghost.style.transform = 'scaleX(1)';
        }

        if (rx >= ghostCard.offsetWidth - 60) {
          vx = -vx;
        } else if (rx <= 25 && vx < 0) {
          clearInterval(chaseInt);
          runner.remove();
          ghost.remove();
          scream.remove();
          return;
        }

        runner.style.left = `${rx}px`;
        runner.style.top = `${trackY}px`;
        scream.style.left = `${rx - 25}px`;
        scream.style.top = `${trackY - 26}px`;

        const gx = rx - (vx > 0 ? 55 : -55);
        ghost.style.left = `${gx}px`;
        ghost.style.top = `${trackY - 4 + Math.sin(rx * 0.08) * 8}px`;
      }, 25);
    });
  }

  /* =========================================================
     9. E-COMMERCE / JAMBELLES: RANDOMIZED ORIGIN & ANGLES
     ========================================================= */
  const ecomCard = findProjectCard("E-Commerce") || findProjectCard("Jambelles");
  if (ecomCard) {
    ecomCard.style.position = 'relative';

    ecomCard.addEventListener('mouseenter', () => {
      sfx.playChaChing();
      markSecret('ecom_fountain');

      const items = ['🛹', '🧦', '👕', '🧢', '💵', '📦', '💸', '✨'];

      // Randomize spawn origin across the top of the card
      const spawnX = 40 + Math.random() * (ecomCard.offsetWidth - 80);

      items.forEach((icon, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'easter-ecom-item-v2';
        itemEl.textContent = icon;
        itemEl.style.left = `${spawnX}px`;
        itemEl.style.top = '25px';

        // Randomized downward spread angle
        const angle = (0.15 + (idx / items.length) * 0.7) * Math.PI;
        const dist = 90 + Math.random() * 85;
        itemEl.style.setProperty('--ex', `${Math.cos(angle) * dist}px`);
        itemEl.style.setProperty('--ey', `${Math.sin(angle) * dist + 35}px`);
        itemEl.style.setProperty('--erot', `${(Math.random() - 0.5) * 360}deg`);

        ecomCard.appendChild(itemEl);
        setTimeout(() => itemEl.remove(), 2400); // Stays visible longer
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
     11. SKILLS: ENGINES & TECH (3D PHYSX DEBUGGER - NO SLIDING!)
     ========================================================= */
  const engineCard = findSkillCard("Engines");
  if (engineCard) {
    engineCard.style.position = 'relative';
    engineCard.addEventListener('mouseenter', () => {
      // Remove any existing badge
      const existing = engineCard.querySelector('.easter-gizmo-box');
      if (existing) existing.remove();

      sfx.playGizmo();
      markSecret('skills_engines');

      const gizmo = document.createElement('div');
      gizmo.className = 'easter-gizmo-box';
      gizmo.innerHTML = '⚙️ PHYSX 3D • 60 FPS [OK]';
      engineCard.appendChild(gizmo);
      setTimeout(() => gizmo.remove(), 1800);
    });
  }

  /* =========================================================
     12. SKILLS: GAMEPLAY & DESIGN (RANDOMIZED ANGLE CRIT SPLASH)
     ========================================================= */
  const designCard = findSkillCard("Gameplay & Design");
  if (designCard) {
    designCard.style.position = 'relative';
    designCard.addEventListener('mouseenter', () => {
      sfx.playCritHit();
      markSecret('skills_gameplay');

      // Randomize tilt angle within ±15 degrees (~20% range)
      const randomRot = (Math.random() - 0.5) * 24;

      const splash = document.createElement('div');
      splash.className = 'easter-crit-splash';
      splash.style.setProperty('--crot', `${randomRot}deg`);
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
     14. LEAGUE OF LEGENDS: INTERACTIVE CHAMPION BUBBLES & MASTERY EMOTE
     ========================================================= */
  const leagueCard = findDnaCard("League of Legends");
  if (leagueCard) {
    leagueCard.style.position = 'relative';

    const bubbles = leagueCard.querySelectorAll('.league-champ-bubble');
    bubbles.forEach(bubble => {
      const champ = bubble.dataset.champ || 'Champion';
      const pts = bubble.dataset.pts || '';

      const popup = document.createElement('div');
      popup.className = 'league-mastery-popup';
      popup.innerHTML = `
        <img src="images/mastery_7.png" alt="Mastery 7" class="league-mastery-crest-icon" />
        <div class="league-mastery-pts-badge">${champ} • ${pts}</div>
      `;
      bubble.appendChild(popup);

      bubble.addEventListener('mouseenter', () => {
        popup.classList.add('show');
        sfx.playMastery();
        markSecret('league_mastery');
      });

      bubble.addEventListener('mouseleave', () => {
        popup.classList.remove('show');
      });
    });

    // Fallback if legacy single image is present
    const legacyImg = leagueCard.querySelector('.mastery-chart-box img');
    if (legacyImg && bubbles.length === 0) {
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
      leagueCard.addEventListener('mouseleave', () => crestImg.classList.remove('show'));
    }
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
     16. POKÉMON: GAME-ACCURATE POKÉBALLS, SHAKES & BREAKS
     ========================================================= */
  const pokeCard = findDnaCard("Pokémon");
  if (pokeCard) {
    pokeCard.style.position = 'relative';
    const ballTiers = [
      {
        name: 'Poké Ball',
        rate: 0.15,
        svg: `<svg width="34" height="34" viewBox="0 0 100 100" class="pokeball-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="shine-poke" cx="35%" cy="30%" r="50%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="#0f172a" />
          <g class="pokeball-bottom-half">
            <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc" />
            <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#cbd5e1" opacity="0.3" />
          </g>
          <g class="pokeball-top-half">
            <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#e11d48" />
            <ellipse cx="38" cy="24" rx="22" ry="12" fill="url(#shine-poke)" />
          </g>
          <rect x="4" y="47" width="92" height="6" fill="#0f172a" />
          <circle cx="50" cy="50" r="15" fill="#0f172a" />
          <circle cx="50" cy="50" r="9" fill="#f8fafc" />
          <circle cx="50" cy="50" r="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
        </svg>`
      },
      {
        name: 'Great Ball',
        rate: 0.22,
        svg: `<svg width="34" height="34" viewBox="0 0 100 100" class="pokeball-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="shine-great" cx="35%" cy="30%" r="50%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="#0f172a" />
          <g class="pokeball-bottom-half">
            <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc" />
          </g>
          <g class="pokeball-top-half">
            <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#2563eb" />
            <path d="M 14 36 C 18 20 28 14 38 12 C 34 22 28 32 18 42 Z" fill="#ef4444" />
            <path d="M 86 36 C 82 20 72 14 62 12 C 66 22 72 32 82 42 Z" fill="#ef4444" />
            <ellipse cx="50" cy="20" rx="20" ry="10" fill="url(#shine-great)" />
          </g>
          <rect x="4" y="47" width="92" height="6" fill="#0f172a" />
          <circle cx="50" cy="50" r="15" fill="#0f172a" />
          <circle cx="50" cy="50" r="9" fill="#f8fafc" />
          <circle cx="50" cy="50" r="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
        </svg>`
      },
      {
        name: 'Ultra Ball',
        rate: 0.32,
        svg: `<svg width="34" height="34" viewBox="0 0 100 100" class="pokeball-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="shine-ultra" cx="35%" cy="30%" r="50%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="#0f172a" />
          <g class="pokeball-bottom-half">
            <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc" />
          </g>
          <g class="pokeball-top-half">
            <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#18181b" />
            <path d="M 20 46 L 24 20 C 34 10 66 10 76 20 L 80 46 L 68 46 L 65 26 C 58 20 42 20 35 26 L 32 46 Z" fill="#eab308" />
            <ellipse cx="50" cy="22" rx="16" ry="8" fill="url(#shine-ultra)" />
          </g>
          <rect x="4" y="47" width="92" height="6" fill="#0f172a" />
          <circle cx="50" cy="50" r="15" fill="#0f172a" />
          <circle cx="50" cy="50" r="9" fill="#f8fafc" />
          <circle cx="50" cy="50" r="5" fill="#fde047" stroke="#ca8a04" stroke-width="1.5" />
        </svg>`
      },
      {
        name: 'Master Ball',
        rate: 0.99,
        svg: `<svg width="34" height="34" viewBox="0 0 100 100" class="pokeball-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0f172a" />
          <g class="pokeball-bottom-half">
            <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc" />
          </g>
          <g class="pokeball-top-half">
            <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#7e22ce" />
            <circle cx="24" cy="28" r="12" fill="#ec4899" stroke="#be185d" stroke-width="1.5" />
            <circle cx="76" cy="28" r="12" fill="#ec4899" stroke="#be185d" stroke-width="1.5" />
            <text x="50" y="34" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="18" fill="#ffffff">M</text>
          </g>
          <rect x="4" y="47" width="92" height="6" fill="#0f172a" />
          <circle cx="50" cy="50" r="15" fill="#0f172a" />
          <circle cx="50" cy="50" r="9" fill="#f8fafc" />
          <circle cx="50" cy="50" r="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
        </svg>`
      }
    ];

    const failQuotes = [
      "Oh no! The Pokémon broke free!",
      "Aww! It appeared to be caught!",
      "Shoot! It was so close, too!",
      "Darn! Almost had it!"
    ];

    function triggerShinySparkles(targetMon) {
      sfx.playShinySparkle();
      targetMon.classList.add('show-sparkles');
      const symbols = ['✦', '✨', '✦', '⭐', '✨', '✦'];
      for (let i = 0; i < symbols.length; i++) {
        const star = document.createElement('div');
        star.className = 'easter-shiny-star';
        star.textContent = symbols[i];
        const angle = (i / symbols.length) * 2 * Math.PI;
        const dist = 32 + (i % 2) * 10;
        star.style.setProperty('--sx', `${Math.cos(angle) * dist}px`);
        star.style.setProperty('--sy', `${Math.sin(angle) * dist}px`);
        targetMon.appendChild(star);
        setTimeout(() => star.remove(), 1100);
      }
      setTimeout(() => targetMon.classList.remove('show-sparkles'), 1600);
    }

    const monCards = pokeCard.querySelectorAll('.pokemon-card');
    monCards.forEach(mon => {
      mon.addEventListener('mouseenter', () => {
        if (mon.classList.contains('pokemon-caught-vanish') || mon.dataset.ballActive === 'true') return;
        mon.dataset.ballActive = 'true';
        markSecret('pokemon_catch');

        const tier = ballTiers[Math.floor(Math.random() * ballTiers.length)];
        const monName = mon.querySelector('.pokemon-info-name') ? mon.querySelector('.pokemon-info-name').textContent.replace('✨', '').trim() : 'Pokémon';

        // 100% accurate coordinates relative to pokeCard
        const pokeRect = pokeCard.getBoundingClientRect();
        const monRect = mon.getBoundingClientRect();
        const targetX = monRect.left - pokeRect.left + monRect.width * 0.5 - 17;
        const targetY = monRect.top - pokeRect.top + monRect.height * 0.5 - 17;

        // Launch ball from top-right corner of card
        const startX = pokeCard.offsetWidth - 45;
        const startY = 25;

        const ball = document.createElement('div');
        ball.className = 'easter-pokeball-sprite';
        ball.innerHTML = tier.svg;
        ball.style.left = `${startX}px`;
        ball.style.top = `${startY}px`;
        pokeCard.appendChild(ball);

        sfx.playPokeballBounce();

        let step = 0;
        const totalSteps = 16;
        const throwInt = setInterval(() => {
          step++;
          const t = step / totalSteps;
          // Parabolic trajectory towards the hovered mon
          const curX = startX + (targetX - startX) * t;
          const curY = startY + (targetY - startY) * t - Math.sin(t * Math.PI) * 38;

          ball.style.left = `${curX}px`;
          ball.style.top = `${curY}px`;
          ball.style.transform = `rotate(${step * 35}deg)`;

          if (step >= totalSteps) {
            clearInterval(throwInt);
            sfx.playPokeballBounce();

            // Pokémon absorbs into ball
            mon.classList.add('pokemon-absorbing');

            const rollSuccess = Math.random() < tier.rate;

            // Wobble 1 (at 320ms)
            setTimeout(() => {
              sfx.playPokeballWobble();
              ball.style.transform = 'rotate(-26deg) scale(1.12)';
              setTimeout(() => {
                ball.style.transform = 'rotate(18deg) scale(1.12)';
                setTimeout(() => {
                  ball.style.transform = 'rotate(0deg) scale(1)';
                }, 130);
              }, 130);
            }, 320);

            // Wobble 2 (at 900ms)
            setTimeout(() => {
              sfx.playPokeballWobble();
              ball.style.transform = 'rotate(-26deg) scale(1.12)';
              setTimeout(() => {
                ball.style.transform = 'rotate(18deg) scale(1.12)';
                setTimeout(() => {
                  ball.style.transform = 'rotate(0deg) scale(1)';
                }, 130);
              }, 130);
            }, 900);

            // Outcome (at 1500ms): Break or Wobble 3 & Catch
            setTimeout(() => {
              if (!rollSuccess) {
                // FAILED: BALL BREAKS!
                sfx.playPokemonBreakout();
                ball.classList.add('ball-burst');

                // Burst particles
                const poofIcons = ['💥', '💨', '✨', '💨'];
                const angles = [45, 135, 225, 315];
                poofIcons.forEach((icon, pi) => {
                  const p = document.createElement('div');
                  p.className = 'easter-poof-particle';
                  p.textContent = icon;
                  const rad = angles[pi] * Math.PI / 180;
                  p.style.setProperty('--px', `${Math.cos(rad) * 28}px`);
                  p.style.setProperty('--py', `${Math.sin(rad) * 28}px`);
                  p.style.left = ball.style.left;
                  p.style.top = ball.style.top;
                  pokeCard.appendChild(p);
                  setTimeout(() => p.remove(), 500);
                });

                // Pokémon breaks free - remove absorbing class and restore full appearance immediately
                mon.classList.remove('pokemon-absorbing');
                mon.style.filter = '';
                mon.style.opacity = '';
                mon.style.transform = '';
                triggerShinySparkles(mon);

                const failBanner = document.createElement('div');
                failBanner.className = 'pokemon-fail-banner';
                const quote = failQuotes[Math.floor(Math.random() * failQuotes.length)];
                failBanner.textContent = `❌ ${quote}`;
                pokeCard.appendChild(failBanner);

                setTimeout(() => {
                  ball.remove();
                  failBanner.remove();
                  mon.style.filter = '';
                  mon.style.opacity = '';
                  mon.style.transform = '';
                  mon.dataset.ballActive = 'false';
                }, 1500);
              } else {
                // SUCCESS: Wobble 3 and Click!
                sfx.playPokeballWobble();
                ball.style.transform = 'rotate(-26deg) scale(1.12)';
                setTimeout(() => {
                  ball.style.transform = 'rotate(18deg) scale(1.12)';
                  setTimeout(() => {
                    ball.style.transform = 'rotate(0deg) scale(1)';

                    // Click! Caught!
                    setTimeout(() => {
                      sfx.playPokemonCaught();
                      ball.classList.add('ball-caught');
                      mon.classList.remove('pokemon-absorbing');
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
                        mon.style.filter = '';
                        mon.style.opacity = '';
                        mon.style.transform = '';
                        mon.classList.add('pokemon-respawn-burst');
                        triggerShinySparkles(mon);
                        setTimeout(() => {
                          mon.classList.remove('pokemon-respawn-burst');
                          mon.style.filter = '';
                          mon.style.opacity = '';
                          mon.style.transform = '';
                          mon.dataset.ballActive = 'false';
                        }, 1200);
                      }, 4500);
                    }, 350);
                  }, 130);
                }, 130);
              }
            }, 1500);
          }
        }, 25);
      });
    });
  }

  /* =========================================================
     17. COMPETITIVE ROBOTICS: FRC DRIVER STATUS (STATIONARY - NO SLIDING!)
     ========================================================= */
  const roboticsCard = findDnaCard("Robotics");
  if (roboticsCard) {
    roboticsCard.style.position = 'relative';

    roboticsCard.addEventListener('mouseenter', () => {
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
     18. SPORTS: VISUAL SOCCER GOAL & BASKETBALL HOOP
     ========================================================= */
  const sportsCard = findDnaCard("Sports");
  if (sportsCard) {
    sportsCard.style.position = 'relative';

    sportsCard.addEventListener('mouseenter', () => {
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

  console.log("Portfolio Easter Eggs Engine v5.0 initialized. Total secrets:", TOTAL_SECRETS);
})();
