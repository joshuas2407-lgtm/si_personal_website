/* =====================================================================
   App: navigation, swiping and page rendering.
   Content lives in data/content.js — you shouldn't need to edit this
   file just to add projects, jobs, certificates, etc.

   To add a whole new page:
     1. Add an entry to PAGES below ({ id, label, render }).
     2. Write its render function (returns an HTML string).
   ===================================================================== */
(function () {
  "use strict";

  const S = window.SITE || {};

  /* ---------- helpers ---------- */
  const esc = (v) =>
    String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const list = (arr, fn) => (Array.isArray(arr) ? arr.map(fn).join("") : "");
  const isExternal = (url) => /^https?:\/\//i.test(url || "");
  const linkAttrs = (url) => `href="${esc(url)}"${isExternal(url) ? ' target="_blank" rel="noopener"' : ""}`;

  const header = (eyebrow, title, sub) => `
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h1 class="page-title">${esc(title)}</h1>
    ${sub ? `<p class="muted">${esc(sub)}</p>` : ""}`;

  const empty = (msg) => `<div class="placeholder-box"><p class="muted">${msg}</p></div>`;

  /* ---------- page renderers ---------- */
  function renderHome() {
    const parts = String(S.name || "Your Name").split(" ");
    const last = parts.length > 1 ? parts.pop() : "";
    return `
      <div class="hero">
        <p class="eyebrow">Hello, I'm</p>
        <h1 class="hero-name">${esc(parts.join(" "))} <span class="accent">${esc(last)}</span></h1>
        <p class="hero-tagline">${esc(S.tagline)}</p>
        <p class="hero-intro">${esc(S.intro)}</p>
        <p class="swipe-hint">← swipe or use arrow keys to explore →</p>
      </div>`;
  }

  function renderAbout() {
    const a = S.about || {};
    const photo = a.photo
      ? `<img class="about-photo" src="${esc(a.photo)}" alt="Photo of ${esc(S.name)}" />`
      : `<div class="about-photo placeholder" aria-hidden="true">◆</div>`;
    return `
      ${header("01 — About", "About Me")}
      <div class="panel about">
        <div class="about-top">
          <div class="about-photo-frame">${photo}</div>
          <ul class="facts">
            ${list(a.facts, (f) => `<li><span class="label">${esc(f.label)}</span><span>${esc(f.value)}</span></li>`)}
          </ul>
        </div>
        <div class="about-bio">
          ${list(a.paragraphs, (p) => `<p>${esc(p)}</p>`)}
        </div>
      </div>`;
  }

  const bullets = (pts) => (pts && pts.length ? `<ul>${list(pts, (p) => `<li>${esc(p)}</li>`)}</ul>` : "");
  const meta = (...parts) => parts.filter(Boolean).map(esc).join(" · ");

  function renderExperience() {
    const items = S.experience || [];
    return `
      ${header("02 — Experience", "Experience", "Where I've worked and volunteered.")}
      ${items.length ? `<div class="timeline">
        ${list(items, (e) => `
          <article class="timeline-item panel">
            <div class="meta">${meta(e.dates, e.location)}</div>
            <h3>${esc(e.role)} <span class="org">@ ${esc(e.org)}</span></h3>
            ${e.note ? `<div class="note">${esc(e.note)}</div>` : ""}
            ${bullets(e.points)}
          </article>`)}
      </div>` : empty("No experience added yet.")}`;
  }

  // Turns any YouTube link (youtu.be, watch?v=, shorts, embed) into its video id.
  function youtubeId(url) {
    const m = String(url || "").match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/);
    return m ? m[1] : "";
  }

  function videoEmbed(p) {
    const id = youtubeId(p.video);
    if (!id) return "";
    return `
      <div class="video">
        <iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(p.title)} video"
          loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>`;
  }

  function projectCard(p) {
    return `
      <article class="card project">
        ${videoEmbed(p)}
        ${p.image && !p.video ? `<img src="${esc(p.image)}" alt="" loading="lazy" />` : ""}
        ${p.gallery && p.gallery.length ? `<div class="gallery">${list(p.gallery, (g, i) => {
          // Each item is either "path/to/image" or { src, caption, wide }
          const src = typeof g === "string" ? g : g.src;
          const cap = typeof g === "string" ? "" : g.caption || "";
          const wide = typeof g === "object" && g.wide;
          const label = cap || `${p.title} image ${i + 1}`;
          return `
          <figure${wide ? ' class="wide"' : ""}>
            <a href="${esc(src)}" target="_blank" rel="noopener" aria-label="${esc(label)}, opens full size">
              <img src="${esc(src)}" alt="${esc(label)}" loading="lazy" />
            </a>
            ${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}
          </figure>`;
        })}</div>` : ""}
        ${p.date ? `<div class="date">${esc(p.date)}</div>` : ""}
        <h3>${esc(p.title)}</h3>
        <p class="muted">${esc(p.summary)}</p>
        ${p.note ? `<div class="note">${esc(p.note)}</div>` : ""}
        ${bullets(p.points)}
        ${p.tags && p.tags.length ? `<ul class="tags">${list(p.tags, (t) => `<li class="tag">${esc(t)}</li>`)}</ul>` : ""}
        ${p.links && p.links.length ? `<div class="links">${list(p.links, (l) => `<a ${linkAttrs(l.url)}>${esc(l.label)} ↗</a>`)}</div>` : ""}
      </article>`;
  }

  function renderProjects() {
    const p = S.projects || {};
    const count = (arr) => `${(arr || []).length} project${(arr || []).length === 1 ? "" : "s"}`;
    return `
      ${header("03 — Projects", "Projects", "Pick a category to see what I've built.")}
      <div class="choice-row">
        <a class="choice software" href="#/projects/software">
          <span class="choice-icon" aria-hidden="true">⌨</span>
          <span class="choice-label">Software</span>
          <span class="choice-count">${count(p.software)}</span>
          <span class="choice-cta">View software projects →</span>
        </a>
        <a class="choice hardware" href="#/projects/hardware">
          <span class="choice-icon" aria-hidden="true">⚙</span>
          <span class="choice-label">Hardware</span>
          <span class="choice-count">${count(p.hardware)}</span>
          <span class="choice-cta">View hardware projects →</span>
        </a>
      </div>`;
  }

  function renderProjectCategory(kind) {
    const other = kind === "software" ? "hardware" : "software";
    const title = kind[0].toUpperCase() + kind.slice(1);
    const items = (S.projects || {})[kind] || [];
    return () => `
      <div class="subnav">
        <a href="#/projects">← Projects</a><span class="sep">/</span>
        <span class="badge ${kind}">${title}</span>
        <span class="sep">·</span>
        <a href="#/projects/${other}">Switch to ${other} →</a>
      </div>
      ${header(`03 — Projects / ${title}`, `${title} Projects`)}
      ${items.length ? `<div class="grid wide">${list(items, projectCard)}</div>` : empty(`No ${kind} projects added yet.`)}`;
  }

  function renderStack() {
    return `
      ${header("04 — Stack", "Stack", "Languages, frameworks and tools I work with.")}
      <div class="grid">
        ${list(S.stack, (g) => `
          <section class="card stack-group">
            <h3>${esc(g.group)}</h3>
            <div class="chips">${list(g.items, (i) => `<span class="chip">${esc(i)}</span>`)}</div>
          </section>`)}
      </div>`;
  }

  function certGrid(items) {
    return `<div class="grid">
      ${list(items, (c) => `
        <article class="card cert">
          ${c.image ? `<a class="cert-image" href="${esc(c.image)}" target="_blank" rel="noopener" aria-label="View certificate: ${esc(c.name)}"><img src="${esc(c.image)}" alt="Certificate: ${esc(c.name)}" loading="lazy" /></a>` : ""}
          <h3>${esc(c.name)}</h3>
          ${c.issuer ? `<div class="issuer">${esc(c.issuer)}</div>` : ""}
          ${c.date ? `<div class="date">${esc(c.date)}</div>` : ""}
          ${c.url ? `<div class="links"><a ${linkAttrs(c.url)}>View credential ↗</a></div>` : ""}
        </article>`)}
    </div>`;
  }

  function renderCertificates() {
    const certs = S.certificates || [];
    const awards = S.awards || [];
    return `
      ${header("05 — Certificates", "Certificates & Awards")}
      ${certs.length ? `<h2 class="section-title">Certificates</h2>${certGrid(certs)}` : ""}
      ${awards.length ? `<h2 class="section-title">Awards</h2>${certGrid(awards)}` : ""}
      ${!certs.length && !awards.length ? empty("No certificates added yet.") : ""}`;
  }

  function renderContact() {
    const c = S.contact || {};
    return `
      ${header("06 — Contact", "Contact")}
      <div class="panel">
        <p>${esc(c.blurb)}</p>
        <ul class="contact-list">
          ${list(c.links, (l) => `
            <li><a ${linkAttrs(l.url)}><span class="label">${esc(l.label)}</span><span class="value">${esc(l.value)}</span></a></li>`)}
        </ul>
      </div>`;
  }

  function renderResume() {
    const r = S.resume || {};
    if (!r.file) {
      return `
        ${header("07 — Resume", "Resume")}
        <div class="placeholder-box">
          <p>Resume coming soon.</p>
          <p class="muted">To add one, put your PDF in <code>assets/resume/</code> and set
          <code>resume.file</code> in <code>data/content.js</code>.</p>
        </div>`;
    }
    return `
      ${header("07 — Resume", "Resume", r.updated ? `Last updated ${r.updated}` : "")}
      <div class="btn-row" style="margin:0 0 18px">
        <a class="btn" href="${esc(r.file)}" download>Download PDF ↓</a>
        <a class="btn alt" ${linkAttrs(r.file)} target="_blank" rel="noopener">Open in new tab ↗</a>
      </div>
      <iframe class="resume-frame" src="${esc(r.file)}" title="Resume"></iframe>`;
  }

  /* ---------- page registry (order = taskbar + swipe order) ---------- */
  const PAGES = [
    { id: "home", label: "Home", render: renderHome },
    { id: "about", label: "About", render: renderAbout },
    { id: "experience", label: "Experience", render: renderExperience },
    { id: "projects", label: "Projects", render: renderProjects },
    { id: "stack", label: "Stack", render: renderStack },
    { id: "certificates", label: "Certificates", render: renderCertificates },
    { id: "contact", label: "Contact", render: renderContact },
    { id: "resume", label: "Resume", render: renderResume },
  ];

  // Subpages: shown under their parent in the taskbar; when swiping they
  // sit just after the parent (left = back to parent, right = next page).
  const SUBPAGES = {
    "projects/software": { parent: "projects", label: "Software Projects", render: renderProjectCategory("software") },
    "projects/hardware": { parent: "projects", label: "Hardware Projects", render: renderProjectCategory("hardware") },
  };

  /* ---------- DOM ---------- */
  const stage = document.getElementById("stage");
  const nav = document.getElementById("nav");
  const dots = document.getElementById("dots");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  document.getElementById("brand-name").textContent = S.name || "";
  if (S.name) document.title = S.name;

  nav.innerHTML = PAGES.map((p) => `<a href="#/${p.id}" data-id="${p.id}">${esc(p.label)}</a>`).join("");
  dots.innerHTML = PAGES.map((p) => `<button class="dot" data-id="${p.id}" aria-label="${esc(p.label)}"></button>`).join("");
  dots.addEventListener("click", (e) => {
    const id = e.target.dataset && e.target.dataset.id;
    if (id) go(id);
  });

  /* ---------- routing ---------- */
  const indexOf = (id) => PAGES.findIndex((p) => p.id === id);

  // Position used for swipe/transition direction. Subpages sit at parent + 0.5.
  function position(route) {
    if (SUBPAGES[route]) return indexOf(SUBPAGES[route].parent) + 0.5;
    return indexOf(route);
  }

  function currentRoute() {
    const r = location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
    if (SUBPAGES[r] || indexOf(r) >= 0) return r;
    return "home";
  }

  function go(route) {
    if ("#/" + route !== location.hash) location.hash = "#/" + route;
  }

  function step(dir) {
    const pos = position(current);
    let target;
    if (dir > 0) target = Math.floor(pos) + 1;
    else target = Math.ceil(pos) - 1;
    if (target >= 0 && target < PAGES.length) go(PAGES[target].id);
  }

  let current = null;
  let currentEl = null;

  function show(route) {
    if (route === current) return;
    const page = SUBPAGES[route] || PAGES[indexOf(route)];
    const dir = current === null ? 0 : Math.sign(position(route) - position(current)) || 1;

    const el = document.createElement("section");
    el.className = "page";
    el.setAttribute("aria-label", page.label);
    el.innerHTML = `<div class="page-inner">${page.render()}</div>`;
    if (dir) el.classList.add(dir > 0 ? "enter-from-right" : "enter-from-left");
    stage.appendChild(el);

    if (currentEl) {
      const old = currentEl;
      old.classList.add(dir > 0 ? "leave-to-left" : "leave-to-right");
      const remove = () => old.remove();
      old.addEventListener("animationend", remove, { once: true });
      setTimeout(remove, 700);
    }

    currentEl = el;
    current = route;
    updateChrome();
    if (window.Backdrop) window.Backdrop.shift(dir);
  }

  function updateChrome() {
    const activeId = SUBPAGES[current] ? SUBPAGES[current].parent : current;
    nav.querySelectorAll("a").forEach((a) => {
      const on = a.dataset.id === activeId;
      a.classList.toggle("active", on);
      if (on) {
        a.setAttribute("aria-current", "page");
        a.scrollIntoView({ block: "nearest", inline: "nearest" });
      } else a.removeAttribute("aria-current");
    });
    dots.querySelectorAll(".dot").forEach((d) => d.classList.toggle("active", d.dataset.id === activeId));
    const pos = position(current);
    prevBtn.disabled = pos <= 0;
    nextBtn.disabled = pos >= PAGES.length - 1;
    const label = (SUBPAGES[current] || PAGES[indexOf(current)]).label;
    document.title = current === "home" ? S.name || "Home" : `${label} · ${S.name || ""}`;
  }

  window.addEventListener("hashchange", () => show(currentRoute()));
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  /* ---------- keyboard ---------- */
  window.addEventListener("keydown", (e) => {
    if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });

  /* ---------- touch swipe ---------- */
  let tx = 0, ty = 0, tracking = false;
  stage.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    tracking = true;
    tx = e.touches[0].clientX;
    ty = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (!tracking) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - tx;
    const dy = t.clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ---------- trackpad horizontal swipe ---------- */
  let wheelAcc = 0, wheelLock = false, wheelTimer = null;
  stage.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    if (wheelLock) return;
    wheelAcc += e.deltaX;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => (wheelAcc = 0), 200);
    if (Math.abs(wheelAcc) > 90) {
      step(wheelAcc > 0 ? 1 : -1);
      wheelAcc = 0;
      wheelLock = true;
      setTimeout(() => (wheelLock = false), 800);
    }
  }, { passive: true });

  /* ---------- start ---------- */
  show(currentRoute());
})();
