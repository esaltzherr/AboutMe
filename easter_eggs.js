/* =========================================================
   ELROY SALTZHERR • PORTFOLIO HOVER EASTER EGGS ENGINE
   Rich, tactile, responsive micro-interactions for every major card.
   ========================================================= */

(function initEasterEggs() {
  // Web Audio Synthesizer for Easter Egg SFX
  class EggAudio {
    constructor() { this.ctx = null; }
    init() { if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; this.ctx = new AC(); } }
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
    playHello() {
      this.init();
      this.playTone(523.25, 0.08, 'triangle', 0.1);
      setTimeout(() => this.playTone(659.25, 0.14, 'triangle', 0.12), 70);
    }
    playGunshot() {
      this.init();
      this.playTone(380, 0.04, 'sawtooth', 0.15);
      setTimeout(() => this.playTone(180, 0.08, 'square', 0.1), 30);
    }
    playErase() {
      this.init();
      this.playTone(180, 0.06, 'sawtooth', 0.05);
      setTimeout(() => this.playTone(220, 0.06, 'sawtooth', 0.05), 60);
    }
    playBlockDrop() {
      this.init();
      this.playTone(140, 0.08, 'triangle', 0.12);
    }
    playEmber() {
      this.init();
      this.playTone(440 + Math.random() * 200, 0.12, 'sine', 0.04);
    }
    playGhost() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.25);
      g.gain.setValueAtTime(0.06, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(g); g.connect(this.ctx.destination);
      osc.start(); osc.stop(this.ctx.currentTime + 0.25);
    }
    playChaChing() {
      this.init();
      this.playTone(987.77, 0.08, 'sine', 0.1);
      setTimeout(() => this.playTone(1318.51, 0.18, 'sine', 0.12), 70);
    }
    playBullseye() {
      this.init();
      this.playTone(350, 0.05, 'sawtooth', 0.12);
      setTimeout(() => this.playTone(880, 0.18, 'triangle', 0.15), 60);
    }
    playMastery() {
      this.init();
      [587, 880, 1174, 1760].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.2, 'triangle', 0.1), i * 80);
      });
    }
    playCounterspell() {
      this.init();
      this.playTone(220, 0.3, 'sawtooth', 0.08);
      setTimeout(() => this.playTone(880, 0.25, 'sine', 0.1), 100);
    }
    playCatch() {
      this.init();
      [659, 783, 1046, 1318].forEach((f, i) => {
        setTimeout(() => this.playTone(f, 0.15, 'square', 0.08), i * 90);
      });
    }
    playScore() {
      this.init();
      this.playTone(440, 0.1, 'triangle', 0.12);
      setTimeout(() => this.playTone(880, 0.25, 'triangle', 0.15), 100);
    }
  }

  const sfx = new EggAudio();
  document.addEventListener('click', () => sfx.init(), { once: true });
  document.addEventListener('mouseover', () => sfx.init(), { once: true });

  // Inject CSS Styles for Easter Eggs
  const style = document.createElement('style');
  style.textContent = `
    /* Easter Egg 1: Hello Bubble */
    .easter-hello-bubble {
      position: absolute;
      top: -34px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: #fbbf24;
      color: #0f172a;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.65rem;
      padding: 5px 10px;
      border-radius: 8px;
      font-weight: bold;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
      z-index: 1000;
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      white-space: nowrap;
    }
    .easter-hello-bubble::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px 5px 0;
      border-style: solid;
      border-color: #fbbf24 transparent;
      display: block;
      width: 0;
    }
    .easter-hello-bubble.show {
      transform: translateX(-50%) scale(1);
    }

    /* Easter Egg 2: Dark Throne Spotlight */
    body.dark-throne-active::before {
      content: '';
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(3, 7, 18, 0.85);
      pointer-events: none;
      z-index: 900;
      transition: opacity 0.3s;
    }
    .featured-project-card.dt-blaze {
      position: relative;
      z-index: 950 !important;
      box-shadow: 0 0 50px rgba(244, 63, 94, 0.6), 0 0 80px rgba(245, 158, 11, 0.35) !important;
      border-color: #f43f5e !important;
      transition: all 0.3s ease;
    }

    /* Floating particles & effects */
    .easter-particle {
      position: absolute;
      pointer-events: none;
      z-index: 999;
      user-select: none;
      animation: floatFade 1.2s ease-out forwards;
    }
    @keyframes floatFade {
      0% { opacity: 1; transform: translate(0, 0) scale(0.6); }
      100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1.4); }
    }

    /* Ricocheting Bullet */
    .easter-bullet {
      position: absolute;
      width: 7px;
      height: 7px;
      background: #fef08a;
      box-shadow: 0 0 10px #f59e0b, 0 0 20px #ef4444;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
    }

    /* Falling Stacking Blocks */
    .easter-block {
      position: absolute;
      font-size: 1.4rem;
      pointer-events: none;
      z-index: 999;
      animation: dropGrow 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }
    @keyframes dropGrow {
      0% { transform: translateY(-40px) scale(0.4); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(0) scale(1.3); opacity: 1; }
    }

    /* Eraser effect */
    .easter-eraser {
      position: absolute;
      font-size: 1.6rem;
      pointer-events: none;
      z-index: 999;
      transition: all 0.5s ease;
    }

    /* Robot peeking */
    .easter-robot-peek {
      position: absolute;
      top: -28px;
      right: 20px;
      font-size: 2.2rem;
      pointer-events: none;
      z-index: 999;
      animation: peekBob 1.2s ease-in-out infinite alternate;
    }
    @keyframes peekBob {
      from { transform: translateY(0) rotate(-5deg); }
      to { transform: translateY(-8px) rotate(5deg); }
    }

    /* Language Speech Tag */
    .easter-lang-tag {
      position: absolute;
      background: rgba(99, 102, 241, 0.9);
      color: #fff;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 800;
      pointer-events: none;
      z-index: 999;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      animation: floatFade 1.4s ease-out forwards;
    }

    /* Mastery Emote */
    .easter-mastery-crest {
      position: absolute;
      top: -46px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: linear-gradient(135deg, #1e3a8a 0%, #0369a1 100%);
      border: 2px solid #38bdf8;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.6);
      padding: 6px 14px;
      border-radius: 999px;
      color: #fff;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.62rem;
      z-index: 1000;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .easter-mastery-crest.show {
      transform: translateX(-50%) scale(1);
    }

    /* Counterspell Stack */
    .easter-counterspell-banner {
      position: absolute;
      top: -38px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      background: #1e3a8a;
      border: 2px solid #60a5fa;
      box-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
      color: #93c5fd;
      padding: 5px 12px;
      border-radius: 8px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.58rem;
      pointer-events: none;
      z-index: 1000;
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .easter-counterspell-banner.show {
      transform: translateX(-50%) scale(1);
    }
  `;
  document.head.appendChild(style);

  // 1. Profile Picture: "Hello!"
  const avatars = document.querySelectorAll('.brand-avatar, .hero-card-img-wrapper');
  avatars.forEach(av => {
    av.style.position = 'relative';
    const bubble = document.createElement('div');
    bubble.className = 'easter-hello-bubble';
    bubble.textContent = '👋 Hello!';
    av.appendChild(bubble);

    av.addEventListener('mouseenter', () => {
      bubble.classList.add('show');
      sfx.playHello();
    });
    av.addEventListener('mouseleave', () => bubble.classList.remove('show'));
  });

  // 2. Dark Throne: Darken everything else + Blaze Glow
  const dtCard = document.querySelector('#featured .featured-project-card');
  if (dtCard) {
    dtCard.addEventListener('mouseenter', () => {
      document.body.classList.add('dark-throne-active');
      dtCard.classList.add('dt-blaze');
      sfx.playTone(180, 0.4, 'sawtooth', 0.06);
    });
    dtCard.addEventListener('mouseleave', () => {
      document.body.classList.remove('dark-throne-active');
      dtCard.classList.remove('dt-blaze');
    });
  }

  // Helper to find project cards by text
  function findProjectCard(titleText) {
    const cards = document.querySelectorAll('.project-card');
    for (let c of cards) {
      const h3 = c.querySelector('.project-card-title');
      if (h3 && h3.textContent.toLowerCase().includes(titleText.toLowerCase())) return c;
    }
    return null;
  }

  // 3. Where's My Gun?: Gunfire Ricochets
  const gunCard = findProjectCard("Where's My Gun");
  if (gunCard) {
    gunCard.style.position = 'relative';
    gunCard.addEventListener('mouseenter', () => {
      sfx.playGunshot();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const bullet = document.createElement('div');
          bullet.className = 'easter-bullet';
          bullet.style.left = '40px';
          bullet.style.top = '50px';
          gunCard.appendChild(bullet);

          let bx = 40, by = 50, bvx = (Math.random() + 0.6) * 12, bvy = (Math.random() - 0.5) * 10;
          let life = 35;
          const bInt = setInterval(() => {
            bx += bvx; by += bvy;
            if (bx <= 0 || bx >= gunCard.offsetWidth - 10) bvx = -bvx;
            if (by <= 0 || by >= gunCard.offsetHeight - 10) bvy = -bvy;
            bullet.style.left = bx + 'px';
            bullet.style.top = by + 'px';
            life--;
            if (life <= 0) {
              clearInterval(bInt);
              bullet.remove();
            }
          }, 20);
        }, i * 140);
      }
    });
  }

  // 4. Pencil Pusher: Eraser rubs out text and sketches back
  const pencilCard = findProjectCard("Pencil Pusher");
  if (pencilCard) {
    const desc = pencilCard.querySelector('.project-card-desc');
    pencilCard.addEventListener('mouseenter', () => {
      if (desc && !desc.classList.contains('erasing')) {
        desc.classList.add('erasing');
        sfx.playErase();
        desc.style.transition = 'all 0.3s ease';
        desc.style.opacity = '0.08';
        desc.style.filter = 'blur(4px)';
        desc.style.transform = 'skewX(8deg)';

        setTimeout(() => {
          desc.style.opacity = '1';
          desc.style.filter = 'none';
          desc.style.transform = 'none';
          desc.classList.remove('erasing');
        }, 1100);
      }
    });
  }

  // 5. Building Scaler: Stacking & growing blocks
  const scalerCard = findProjectCard("Building Scaler");
  if (scalerCard) {
    scalerCard.style.position = 'relative';
    scalerCard.addEventListener('mouseenter', () => {
      const emojis = ['🟥', '🟦', '🟩', '🟨'];
      emojis.forEach((em, idx) => {
        setTimeout(() => {
          const b = document.createElement('div');
          b.className = 'easter-block';
          b.textContent = em;
          b.style.left = `${30 + idx * 55}px`;
          b.style.bottom = `${30 + idx * 12}px`;
          scalerCard.appendChild(b);
          sfx.playBlockDrop();
          setTimeout(() => b.remove(), 1800);
        }, idx * 180);
      });
    });
  }

  // 6. The Last Ember: Darkness and rising burning embers
  const emberCard = findProjectCard("Last Ember");
  if (emberCard) {
    emberCard.style.position = 'relative';
    emberCard.addEventListener('mouseenter', () => {
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const p = document.createElement('div');
          p.className = 'easter-particle';
          p.style.width = '6px';
          p.style.height = '6px';
          p.style.borderRadius = '50%';
          p.style.background = Math.random() < 0.5 ? '#f59e0b' : '#ef4444';
          p.style.boxShadow = '0 0 8px #f59e0b';
          p.style.left = `${Math.random() * emberCard.offsetWidth}px`;
          p.style.top = `${emberCard.offsetHeight - 20}px`;
          p.style.setProperty('--tx', `${(Math.random() - 0.5) * 60}px`);
          p.style.setProperty('--ty', `-${60 + Math.random() * 80}px`);
          emberCard.appendChild(p);
          sfx.playEmber();
          setTimeout(() => p.remove(), 1200);
        }, i * 70);
      }
    });
  }

  // 7. Possession Escape: Spooky floating ghosts
  const ghostCard = findProjectCard("Possession Escape");
  if (ghostCard) {
    ghostCard.style.position = 'relative';
    ghostCard.addEventListener('mouseenter', () => {
      sfx.playGhost();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const g = document.createElement('div');
          g.className = 'easter-particle';
          g.style.fontSize = '1.8rem';
          g.textContent = '👻';
          g.style.left = `${30 + i * 80}px`;
          g.style.top = '40px';
          g.style.setProperty('--tx', `${(Math.random() - 0.5) * 120}px`);
          g.style.setProperty('--ty', `-${40 + Math.random() * 60}px`);
          ghostCard.appendChild(g);
          setTimeout(() => g.remove(), 1400);
        }, i * 150);
      }
    });
  }

  // 8. E-Commerce Automation / Jambelles: Robot throws money confetti
  const ecomCard = findProjectCard("E-Commerce") || findProjectCard("Jambelles");
  if (ecomCard) {
    ecomCard.style.position = 'relative';
    ecomCard.addEventListener('mouseenter', () => {
      sfx.playChaChing();
      const bot = document.createElement('div');
      bot.className = 'easter-robot-peek';
      bot.textContent = '🤖';
      ecomCard.appendChild(bot);
      setTimeout(() => bot.remove(), 1800);

      const cash = ['💵', '💸', '💰'];
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const bill = document.createElement('div');
          bill.className = 'easter-particle';
          bill.style.fontSize = '1.2rem';
          bill.textContent = cash[Math.floor(Math.random() * cash.length)];
          bill.style.left = `${ecomCard.offsetWidth - 50}px`;
          bill.style.top = '10px';
          bill.style.setProperty('--tx', `-${Math.random() * 200 + 40}px`);
          bill.style.setProperty('--ty', `${Math.random() * 120}px`);
          ecomCard.appendChild(bill);
          setTimeout(() => bill.remove(), 1200);
        }, i * 80);
      }
    });
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

  // 9. Languages: Multi-language greetings fly out
  const langCard = findSkillCard("Languages");
  if (langCard) {
    langCard.style.position = 'relative';
    langCard.addEventListener('mouseenter', () => {
      sfx.playTone(523, 0.08, 'sine');
      const hellos = ['¡Hola!', 'Bonjour!', 'こんにちは!', 'Ciao!', 'Olá!', 'Hallo!', '你好!'];
      hellos.forEach((w, idx) => {
        setTimeout(() => {
          const pill = document.createElement('div');
          pill.className = 'easter-lang-tag';
          pill.textContent = w;
          pill.style.left = `${langCard.offsetWidth / 2 - 30}px`;
          pill.style.top = '30px';
          const angle = (idx / hellos.length) * Math.PI * 2;
          pill.style.setProperty('--tx', `${Math.cos(angle) * 90}px`);
          pill.style.setProperty('--ty', `${Math.sin(angle) * 70}px`);
          langCard.appendChild(pill);
          setTimeout(() => pill.remove(), 1400);
        }, idx * 60);
      });
    });
  }

  // 10. Engines & Tech: Controller button mashing
  const engineCard = findSkillCard("Engines");
  if (engineCard) {
    engineCard.style.position = 'relative';
    engineCard.addEventListener('mouseenter', () => {
      const pad = document.createElement('div');
      pad.className = 'easter-particle';
      pad.style.fontSize = '2rem';
      pad.textContent = '🎮';
      pad.style.left = '45%';
      pad.style.top = '-20px';
      pad.style.setProperty('--tx', '0px');
      pad.style.setProperty('--ty', '-20px');
      engineCard.appendChild(pad);

      for (let i = 0; i < 6; i++) {
        setTimeout(() => sfx.playTone(300 + Math.random() * 400, 0.04, 'square', 0.06), i * 60);
      }
      setTimeout(() => pad.remove(), 1000);
    });
  }

  // 11. Gameplay & Design: Arrow shoots target bullseye
  const designCard = findSkillCard("Gameplay & Design");
  if (designCard) {
    designCard.style.position = 'relative';
    designCard.addEventListener('mouseenter', () => {
      const arrow = document.createElement('div');
      arrow.textContent = '🏹 ➔';
      arrow.style.position = 'absolute';
      arrow.style.left = '10px';
      arrow.style.top = '16px';
      arrow.style.fontSize = '1.4rem';
      arrow.style.transition = 'left 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
      arrow.style.pointerEvents = 'none';
      arrow.style.zIndex = '999';
      designCard.appendChild(arrow);

      setTimeout(() => {
        arrow.style.left = '80px';
        sfx.playBullseye();
        setTimeout(() => arrow.remove(), 600);
      }, 50);
    });
  }

  // Helper for DNA / Philosophy Cards
  function findDnaCard(titleText) {
    const cards = document.querySelectorAll('.dna-card');
    for (let c of cards) {
      const t = c.querySelector('.dna-title');
      if (t && t.textContent.toLowerCase().includes(titleText.toLowerCase())) return c;
    }
    return null;
  }

  // 12. League of Legends: Diamond Mastery 7 Crest
  const leagueCard = findDnaCard("League of Legends");
  if (leagueCard) {
    leagueCard.style.position = 'relative';
    const crest = document.createElement('div');
    crest.className = 'easter-mastery-crest';
    crest.innerHTML = '💎 MASTERY VII • DIAMOND';
    leagueCard.appendChild(crest);

    leagueCard.addEventListener('mouseenter', () => {
      crest.classList.add('show');
      sfx.playMastery();
    });
    leagueCard.addEventListener('mouseleave', () => crest.classList.remove('show'));
  }

  // 13. Magic The Gathering: "In Response..." Counterspell Stack
  const mtgCard = findDnaCard("Magic");
  if (mtgCard) {
    mtgCard.style.position = 'relative';
    const stackBanner = document.createElement('div');
    stackBanner.className = 'easter-counterspell-banner';
    stackBanner.textContent = '⚡ IN RESPONSE... [COUNTERSPELL]';
    mtgCard.appendChild(stackBanner);

    mtgCard.addEventListener('mouseenter', () => {
      stackBanner.classList.add('show');
      sfx.playCounterspell();
    });
    mtgCard.addEventListener('mouseleave', () => stackBanner.classList.remove('show'));
  }

  // 14. Pokémon: Pokéball catch animation
  const pokeCard = findDnaCard("Pokémon");
  if (pokeCard) {
    pokeCard.style.position = 'relative';
    pokeCard.addEventListener('mouseenter', () => {
      const ball = document.createElement('div');
      ball.textContent = '🔴';
      ball.style.position = 'absolute';
      ball.style.right = '20px';
      ball.style.top = '10px';
      ball.style.fontSize = '1.8rem';
      ball.style.pointerEvents = 'none';
      ball.style.zIndex = '999';
      ball.style.transition = 'all 0.4s ease';
      pokeCard.appendChild(ball);

      setTimeout(() => {
        ball.style.transform = 'translate(-60px, 30px) rotate(360deg) scale(1.3)';
        sfx.playCatch();
        setTimeout(() => ball.remove(), 1200);
      }, 50);
    });
  }

  // 15. Sports & Multi-Sport: Random Soccer / Basketball / Baseball score
  const sportsCard = findDnaCard("Sports");
  if (sportsCard) {
    sportsCard.style.position = 'relative';
    sportsCard.addEventListener('mouseenter', () => {
      sfx.playScore();
      const sportItems = [
        { icon: '⚽', txt: 'GOAAAL! 🥅' },
        { icon: '🏀', txt: 'SWISH! 3-PTR 🎯' },
        { icon: '⚾', txt: 'HOMERUN! 🏟️' }
      ];
      const pick = sportItems[Math.floor(Math.random() * sportItems.length)];
      const popup = document.createElement('div');
      popup.className = 'easter-hello-bubble show';
      popup.style.background = '#06b6d4';
      popup.style.color = '#fff';
      popup.textContent = `${pick.icon} ${pick.txt}`;
      sportsCard.appendChild(popup);
      setTimeout(() => popup.remove(), 1400);
    });
  }

  console.log("Portfolio Easter Eggs Engine initialized successfully.");
})();
