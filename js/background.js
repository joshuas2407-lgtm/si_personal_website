/* =====================================================================
   Backdrop: animated triangular lattice.
   - Lines shimmer continuously.
   - Backdrop.shift(dir) re-shapes the pattern, drifts the grid and sends
     a light wave across the screen. app.js calls it on every page change.
   Tweak the CONFIG values to change the look.
   ===================================================================== */
(function () {
  "use strict";

  const CONFIG = {
    cellSize: 58,            // triangle side length in px
    faintAlpha: 0.08,        // alpha of the always-visible background grid
    strongAlpha: 0.9,        // max alpha of the highlighted band
    lineWidth: 1.15,
    colors: [                // left → right gradient of the lines
      [0.0, "#ff2fd0"],      // magenta
      [0.25, "#ef3ae6"],
      [0.5, "#b84dff"],
      [0.72, "#9b4dff"],     // purple
      [0.88, "#7f5cff"],
      [0.96, "#14d39a"],     // emerald accent
      [1.0, "#ffd23f"],      // yellow accent
    ],
    bgInner: "#2c1260",      // deep purple centre
    bgOuter: "#120a30",      // dark purple-blue edges
    glows: [                 // soft colour washes: x, y (0–1 of screen), radius (× screen), colour
      [0.18, 0.3, 0.6, "rgba(255, 47, 208, 0.18)"],   // magenta
      [0.82, 0.72, 0.65, "rgba(155, 77, 255, 0.2)"],  // purple
    ],
    // Silk ribbons down the right side of the screen.
    // x = centre line (fraction of screen width), amp = how far it sways,
    // width = ribbon width, twist = how often it twists, speed = idle drift,
    // colors = top → bottom, strands = number of fine lines, alpha = brightness.
    ribbons: [
      { x: 0.8,  amp: 0.07, freq: 1.5, width: 0.075, twist: 2.2, speed: 0.22,  colors: ["#b84dff", "#ff2fd0"], strands: 18, alpha: 0.32 },
      { x: 0.87, amp: 0.05, freq: 2.0, width: 0.05,  twist: 1.6, speed: -0.17, colors: ["#7f5cff", "#c03cff"], strands: 14, alpha: 0.28 },
      { x: 0.74, amp: 0.09, freq: 1.1, width: 0.04,  twist: 2.8, speed: 0.15,  colors: ["#ff2fd0", "#9b4dff"], strands: 12, alpha: 0.24 },
    ],
  };

  const canvas = document.getElementById("backdrop");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0, H = 0, dpr = 1;
  let edges = [];
  const BUCKETS = 16;

  // Animated state
  const state = {
    offX: 0, offY: 0, tOffX: 0, tOffY: 0,
    grad: 0, tGrad: 0,          // gradient angle tilt
    waveX: -1e4, waveDir: 1, waveStart: -1,
    rPhase: 0, tRPhase: 0,      // ribbon shape
    rShift: 0, tRShift: 0,      // ribbon sideways drift
    seed: makeSeed(),
  };

  function makeSeed() {
    return {
      nx: Math.random() * 100,
      ny: Math.random() * 100,
      bandPhase: Math.random() * Math.PI * 2,
      bandFreq: 0.8 + Math.random() * 1.2,
      bandY: 0.42 + Math.random() * 0.16,
      thick: 0.16 + Math.random() * 0.08,
    };
  }

  /* ---------- value noise ---------- */
  const hash = (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const smooth = (t) => t * t * (3 - 2 * t);
  function noise(x, y) {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = smooth(x - ix), fy = smooth(y - iy);
    const a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  }
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

  /* ---------- pattern mask: a wavy horizontal band broken up by noise ---------- */
  function targetWeight(e, seed) {
    const centre = H * seed.bandY + Math.sin((e.mx / W) * Math.PI * seed.bandFreq + seed.bandPhase) * H * 0.07;
    const half = H * seed.thick * (0.75 + 0.5 * noise(e.mx / 300 + seed.nx, seed.ny));
    const band = clamp01(1 - Math.abs(e.my - centre) / half);
    const n = noise(e.mx / 190 + seed.nx, e.my / 190 + seed.ny);
    const p = clamp01(band * 1.1 + (n - 0.55) * 1.4);
    // Random gate gives the fragmented "some edges missing" look.
    return e.rnd < p ? 0.35 + 0.65 * p : 0;
  }

  /* ---------- build lattice ---------- */
  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    const s = CONFIG.cellSize;
    const h = (s * Math.sqrt(3)) / 2;
    const cols = Math.ceil(W / s) + 4;
    const rows = Math.ceil(H / h) + 4;
    const ox = -2 * s, oy = -2 * h;
    const vx = (r, c) => ox + c * s + (r % 2 ? s / 2 : 0);
    const vy = (r) => oy + r * h;

    edges = [];
    const add = (x1, y1, x2, y2) => {
      const e = {
        x1, y1, x2, y2,
        mx: (x1 + x2) / 2, my: (y1 + y2) / 2,
        rnd: Math.random(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.6,
        w: 0, tw: 0,
      };
      edges.push(e);
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = vx(r, c), y = vy(r);
        if (c + 1 < cols) add(x, y, vx(r, c + 1), y);
        if (r + 1 < rows) {
          if (r % 2 === 0) {
            if (c - 1 >= 0) add(x, y, vx(r + 1, c - 1), vy(r + 1));
            add(x, y, vx(r + 1, c), vy(r + 1));
          } else {
            add(x, y, vx(r + 1, c), vy(r + 1));
            if (c + 1 < cols) add(x, y, vx(r + 1, c + 1), vy(r + 1));
          }
        }
      }
    }
    retarget(true);
  }

  function retarget(instant) {
    for (const e of edges) {
      e.tw = targetWeight(e, state.seed);
      if (instant) e.w = e.tw;
    }
  }

  /* ---------- drawing ---------- */
  function makeGradient() {
    const a = state.grad;
    const cx = W / 2, cy = H / 2;
    const dx = Math.cos(a) * W * 0.6, dy = Math.sin(a) * W * 0.6;
    const g = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
    for (const [stop, col] of CONFIG.colors) g.addColorStop(stop, col);
    return g;
  }

  const paths = Array.from({ length: BUCKETS }, () => []);

  function draw(time) {
    const t = time / 1000;
    const ease = reduceMotion ? 1 : 0.045;

    state.offX += (state.tOffX - state.offX) * ease;
    state.offY += (state.tOffY - state.offY) * ease;
    state.grad += (state.tGrad - state.grad) * ease;

    // Light wave sweeping across after a page change
    let waveActive = false;
    if (state.waveStart >= 0 && !reduceMotion) {
      const p = (time - state.waveStart) / 1300;
      if (p < 1) {
        waveActive = true;
        const from = state.waveDir > 0 ? -300 : W + 300;
        const to = state.waveDir > 0 ? W + 300 : -300;
        state.waveX = from + (to - from) * p;
      } else state.waveStart = -1;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Background
    const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
    bg.addColorStop(0, CONFIG.bgInner);
    bg.addColorStop(1, CONFIG.bgOuter);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    for (const [gx, gy, gr, col] of CONFIG.glows) {
      const x = gx * W, y = gy * H, r = gr * Math.max(W, H);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, col);
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    for (const p of paths) p.length = 0;

    for (const e of edges) {
      e.w += (e.tw - e.w) * (reduceMotion ? 1 : 0.06);
      const shimmer = reduceMotion ? 0.8 : 0.55 + 0.45 * Math.sin(t * e.speed + e.phase);
      let a = CONFIG.faintAlpha + e.w * CONFIG.strongAlpha * shimmer;
      if (waveActive) {
        const d = (e.mx - state.waveX) / 160;
        a += Math.exp(-d * d) * (0.25 + e.w * 0.5);
      }
      if (a <= 0.01) continue;
      const b = Math.min(BUCKETS - 1, Math.floor(a * BUCKETS));
      paths[b].push(e);
    }

    ctx.save();
    ctx.translate(state.offX, state.offY);
    ctx.strokeStyle = makeGradient();
    ctx.lineCap = "round";
    for (let b = 0; b < BUCKETS; b++) {
      const list = paths[b];
      if (!list.length) continue;
      ctx.globalAlpha = (b + 0.5) / BUCKETS;
      ctx.lineWidth = b > BUCKETS * 0.6 ? CONFIG.lineWidth * 1.35 : CONFIG.lineWidth;
      ctx.beginPath();
      for (const e of list) {
        ctx.moveTo(e.x1, e.y1);
        ctx.lineTo(e.x2, e.y2);
      }
      ctx.stroke();
    }
    ctx.restore();

    drawRibbons(reduceMotion ? 0 : t, ease);
  }

  /* ---------- silk ribbons ---------- */
  function drawRibbons(t, ease) {
    state.rPhase += (state.tRPhase - state.rPhase) * ease;
    state.rShift += (state.tRShift - state.rShift) * ease;

    const S = Math.min(Math.max(W, 480), 1600); // keeps proportions sane on tiny/huge screens
    const step = 14;
    const dim = W < 720 ? 0.55 : 1; // softer on phones, where ribbons sit behind text
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = 1;

    CONFIG.ribbons.forEach((r, j) => {
      const ph = state.rPhase * (j % 2 ? -1 : 1) + j * 1.9;
      const tt = t * r.speed;
      const baseX = r.x * W + state.rShift * (1 + j * 0.4);
      const amp = r.amp * S, width = r.width * S;

      // Centre line and half-width at each height
      const ys = [], cs = [], hs = [];
      for (let y = -40; y <= H + 40; y += step) {
        const v = y / H;
        ys.push(y);
        cs.push(baseX + amp * Math.sin(v * Math.PI * r.freq + ph + tt) + amp * 0.35 * Math.sin(v * Math.PI * r.freq * 2.3 - tt * 1.4));
        hs.push(width * Math.cos(v * Math.PI * r.twist + ph * 0.8 + tt * 1.3));
      }

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, r.colors[0]);
      grad.addColorStop(1, r.colors[1]);
      ctx.strokeStyle = grad;
      ctx.fillStyle = grad;

      // Translucent body of the ribbon
      ctx.globalAlpha = r.alpha * 0.22 * dim;
      ctx.beginPath();
      for (let k = 0; k < ys.length; k++) ctx.lineTo(cs[k] - hs[k], ys[k]);
      for (let k = ys.length - 1; k >= 0; k--) ctx.lineTo(cs[k] + hs[k], ys[k]);
      ctx.closePath();
      ctx.fill();

      // Fine strands, brighter towards the edges like folded silk
      for (let i = 0; i < r.strands; i++) {
        const u = i / (r.strands - 1) - 0.5;
        ctx.globalAlpha = r.alpha * (0.35 + 1.3 * Math.abs(u)) * dim;
        ctx.beginPath();
        for (let k = 0; k < ys.length; k++) {
          const x = cs[k] + 2 * u * hs[k] + Math.sin(ys[k] / 90 + i * 0.7 + tt * 2) * 2;
          if (k === 0) ctx.moveTo(x, ys[k]);
          else ctx.lineTo(x, ys[k]);
        }
        ctx.stroke();
      }
    });
    ctx.restore();
  }

  function loop(time) {
    draw(time);
    if (!reduceMotion) requestAnimationFrame(loop);
  }

  /* ---------- public API ---------- */
  window.Backdrop = {
    shift(dir) {
      const s = CONFIG.cellSize;
      state.seed = makeSeed();
      state.tOffX = (Math.random() - 0.5) * s;
      state.tOffY = (Math.random() - 0.5) * s * 0.6;
      state.tGrad = (Math.random() - 0.5) * 0.5;
      // Ribbons roll forward/back with the page direction and drift sideways
      state.tRPhase += (dir < 0 ? -1 : 1) * (1.2 + Math.random() * 1.2);
      state.tRShift = (Math.random() - 0.5) * Math.min(W, 1400) * 0.06;
      state.waveDir = dir < 0 ? -1 : 1;
      state.waveStart = dir ? performance.now() : -1;
      retarget(false);
      if (reduceMotion) requestAnimationFrame(draw);
    },
  };

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      build();
      if (reduceMotion) requestAnimationFrame(draw);
    }, 150);
  });

  build();
  requestAnimationFrame(loop);
})();
