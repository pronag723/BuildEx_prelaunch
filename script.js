/* ─────────────────────────────────────────────────────────────────────────
   BuildEx — Launch landing page behaviour
   · Mouse-following animated gradient (more interactive than main site)
   · Swipeable feature card deck with CSS mockups (mirrors FeaturesDeckSection)
   · Countdown → "Enter BuildEx" flip
   · Platform-branded social CTA buttons
   ───────────────────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  var CFG = window.LAUNCH || {};
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Brand icon definitions ────────────────────────────────────────────── */
  var BRAND = {
    discord: {
      svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.112 18.1.133 18.115a19.884 19.884 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
      color: "#a5b4fc", bg: "rgba(88,101,242,.15)", border: "rgba(88,101,242,.40)",
      hoverBg: "#5865F2", hoverColor: "#fff", hoverShadow: "0 0 28px rgba(88,101,242,.5)"
    },
    youtube: {
      svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      color: "#fca5a5", bg: "rgba(255,0,0,.10)", border: "rgba(255,0,0,.28)",
      hoverBg: "#FF0000", hoverColor: "#fff", hoverShadow: "0 0 24px rgba(255,0,0,.45)"
    },
    x: {
      svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
      color: "#e2e8f0", bg: "rgba(255,255,255,.08)", border: "rgba(255,255,255,.20)",
      hoverBg: "#000", hoverColor: "#fff", hoverShadow: "0 0 20px rgba(255,255,255,.15)"
    },
    tiktok: {
      svg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.28 8.28 0 004.84 1.54V7.04a4.85 4.85 0 01-1.07-.35z"/></svg>',
      color: "#e2e8f0", bg: "rgba(255,255,255,.08)", border: "rgba(255,255,255,.20)",
      hoverBg: "#010101", hoverColor: "#fff", hoverShadow: "0 0 20px rgba(255,255,255,.12)"
    }
  };

  /* ── In-card mockup HTML generators (mirror FeaturesDeckSection.jsx) ─────── */
  function mockPreview() {
    return '<div class="fd-mock fd-mock-preview">' +
      '<div class="fd-viewer-bar">' +
        '<span class="fd-dot"></span><span class="fd-dot"></span><span class="fd-dot"></span>' +
        '<span class="fd-viewer-label">3D preview</span>' +
      '</div>' +
      '<div class="fd-stage"><div class="fd-voxel">' +
        '<span class="fd-face fd-top"></span>' +
        '<span class="fd-face fd-left"></span>' +
        '<span class="fd-face fd-right"></span>' +
      '</div></div>' +
      '<div class="fd-hint">Drag to rotate · scroll to zoom</div>' +
    '</div>';
  }

  function mockEscrow() {
    return '<div class="fd-mock fd-mock-escrow">' +
      '<div class="fd-lock"><i data-lucide="lock"></i></div>' +
      '<div class="fd-flow">' +
        '<span class="fd-node">Buyer</span>' +
        '<span class="fd-line"></span>' +
        '<span class="fd-node fd-node-active"><i data-lucide="shield"></i>Escrow</span>' +
        '<span class="fd-line"></span>' +
        '<span class="fd-node">Builder</span>' +
      '</div>' +
      '<div class="fd-escrow-note">Funds released only after you approve</div>' +
    '</div>';
  }

  function mockRank() {
    var tiers = [
      { l: "Rookie",   p: "15%", w: 34  },
      { l: "Advanced", p: "12%", w: 56  },
      { l: "Expert",   p: "8%",  w: 78  },
      { l: "Master",   p: "5%",  w: 100 }
    ];
    return '<div class="fd-mock fd-mock-rank">' +
      tiers.map(function (t, i) {
        var top = i === tiers.length - 1 ? " fd-rank-top" : "";
        return '<div class="fd-rank-row">' +
          '<span class="fd-rank-name">' + t.l + '</span>' +
          '<span class="fd-rank-bar"><span class="fd-rank-fill' + top + '" style="width:' + t.w + '%"></span></span>' +
          '<span class="fd-rank-pct">' + t.p + '</span>' +
        '</div>';
      }).join("") +
    '</div>';
  }

  function mockReview() {
    var star = '<svg viewBox="0 0 24 24" width="13" height="13" fill="#fbbf24" aria-hidden="true"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>';
    return '<div class="fd-mock fd-mock-review">' +
      '<div class="fd-review-head">' +
        '<span class="fd-avatar">E</span>' +
        '<div>' +
          '<div class="fd-review-name">EmberCraft</div>' +
          '<div class="fd-stars">' + star + star + star + star + star + '</div>' +
        '</div>' +
        '<span class="fd-verified"><i data-lucide="check"></i>Verified</span>' +
      '</div>' +
      '<p class="fd-review-body">&ldquo;Hired straight from the feed and the spawn turned out incredible.&rdquo;</p>' +
    '</div>';
  }

  function mockChat() {
    return '<div class="fd-mock fd-mock-chat">' +
      '<div class="fd-bubble fd-bubble-in">Can you add a dragon tower?</div>' +
      '<div class="fd-bubble fd-bubble-out">On it — sending a preview soon ✶</div>' +
      '<div class="fd-track">' +
        '<span class="fd-track-step"><span class="fd-track-dot fd-track-done"></span>Paid</span>' +
        '<span class="fd-track-step"><span class="fd-track-dot fd-track-done"></span>In progress</span>' +
        '<span class="fd-track-step"><span class="fd-track-dot"></span>Delivered</span>' +
      '</div>' +
    '</div>';
  }

  var FEATURES = [
    { icon: "box",            title: "Interactive 3D Previews",    body: "Rotate and zoom an automatic 3D render of the build before you confirm — no downloads, no guesswork.", bullets: ["Rotate · zoom · inspect", "Generated at delivery", "Approve with confidence"], mock: mockPreview },
    { icon: "shield",         title: "Escrow-Protected Payments",  body: "Your payment is held safely and only released to the builder once you’ve approved the delivery.",      bullets: ["Funds held in escrow", "Released on approval", "Disputes resolved fairly"],          mock: mockEscrow  },
    { icon: "trophy",         title: "Earned Ranking System",      body: "Builders climb from Rookie to Master through real completed orders — higher ranks pay lower fees.",      bullets: ["Ranks from real metrics", "Lower commission per tier", "Rewards proven quality"],    mock: mockRank    },
    { icon: "star",           title: "Verified Reviews",           body: "Every review comes from a real, completed order — so the ratings you see are ones you can trust.",       bullets: ["Order-gated reviews", "One review per order", "Honest, real feedback"],              mock: mockReview  },
    { icon: "message-circle", title: "Live Chat & Order Tracking", body: "Message builders directly, share files and photos, and follow your order from payment to delivery.",         bullets: ["Direct messaging", "Paste & send photos", "Live order status"],                      mock: mockChat    }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ── Render card deck ──────────────────────────────────────────────────── */
  function renderDeck() {
    var deck = document.getElementById("fd-deck");
    var dotsEl = document.getElementById("fd-dots");
    if (!deck) return;

    deck.innerHTML = FEATURES.map(function (f, i) {
      var bullets = f.bullets.map(function (b) {
        return '<li><i data-lucide="check"></i>' + esc(b) + "</li>";
      }).join("");
      return '<article class="features-card glass" data-idx="' + i + '" aria-label="' + esc(f.title) + '">' +
        '<div class="features-card-mock">' + f.mock() + "</div>" +
        '<div class="features-card-body">' +
          '<span class="icon-tile icon-tile-lg"><i data-lucide="' + f.icon + '"></i></span>' +
          '<h3 class="fd-card-title">' + esc(f.title) + "</h3>" +
          '<p class="fd-card-body-text">' + esc(f.body) + "</p>" +
          '<ul class="features-bullets">' + bullets + "</ul>" +
        "</div>" +
      "</article>";
    }).join("");

    if (dotsEl) {
      dotsEl.innerHTML = FEATURES.map(function (f, i) {
        return '<button class="features-dot' + (i === 0 ? " is-active" : "") +
          '" data-idx="' + i + '" aria-label="' + esc(f.title) + '"></button>';
      }).join("");
    }
  }

  /* ── Deck interaction ──────────────────────────────────────────────────── */
  function setupDeck() {
    var deck   = document.getElementById("fd-deck");
    var dotsEl = document.getElementById("fd-dots");
    if (!deck) return;

    var n       = FEATURES.length;
    var active  = 0;
    var dx      = 0;
    var dragging = false;
    var startX  = 0;

    function cards() { return deck.querySelectorAll(".features-card"); }
    function dots()  { return dotsEl ? dotsEl.querySelectorAll(".features-dot") : []; }

    function layout() {
      cards().forEach(function (card, i) {
        var pos   = (i - active + n) % n;
        var front = pos === 0;
        var xform = front
          ? "translateX(" + dx + "px) rotate(" + (dx * 0.025) + "deg) scale(1)"
          : "translateY(" + (pos * 18) + "px) scale(" + (1 - pos * 0.05) + ")";

        card.style.transform    = xform;
        card.style.opacity      = pos > 2 ? "0" : pos === 2 ? "0.55" : "1";
        card.style.zIndex       = String(n - pos);
        card.style.pointerEvents = front ? "auto" : "none";
        card.setAttribute("aria-hidden", String(!front));
        card.classList.toggle("is-front", front);
        card.style.transition   = (dragging && front)
          ? "none"
          : "transform .55s cubic-bezier(.4,0,.2,1), opacity .5s ease";
      });
      dots().forEach(function (d, i) { d.classList.toggle("is-active", i === active); });
    }

    function go(dir) { active = (active + dir + n) % n; dx = 0; dragging = false; layout(); }

    var prevBtn = document.getElementById("fd-prev");
    var nextBtn = document.getElementById("fd-next");
    if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(1);  });

    if (dotsEl) {
      dotsEl.addEventListener("click", function (e) {
        var btn = e.target.closest(".features-dot");
        if (!btn) return;
        var idx = parseInt(btn.getAttribute("data-idx"), 10);
        if (!isNaN(idx)) { active = idx; dx = 0; dragging = false; layout(); }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "ArrowRight") go(1);
    });

    deck.addEventListener("pointerdown", function (e) {
      if (!e.target.closest(".is-front")) return;
      dragging = true;
      startX   = e.clientX;
      dx       = 0;
    });
    document.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      dx = e.clientX - startX;
      layout();
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      if      (dx <= -80) go(1);
      else if (dx >=  80) go(-1);
      else { dx = 0; layout(); }
    }
    document.addEventListener("pointerup",     endDrag);
    document.addEventListener("pointercancel", endDrag);

    layout();
  }

  /* ── Wire CTA buttons ──────────────────────────────────────────────────── */
  function renderCtas() {
    var discordBtn = document.getElementById("discord-btn");
    if (discordBtn && CFG.DISCORD_URL) discordBtn.href = CFG.DISCORD_URL;

    var enterBtn = document.getElementById("enter-btn");
    if (enterBtn && CFG.SITE_URL) enterBtn.href = CFG.SITE_URL;

    var socialsEl = document.getElementById("socials");
    if (!socialsEl || !Array.isArray(CFG.SOCIALS)) return;

    socialsEl.innerHTML = CFG.SOCIALS.map(function (s) {
      var b = BRAND[s.platform] || BRAND.x;
      return '<a class="lp-btn" href="' + esc(s.url) + '"' +
        ' data-platform="' + esc(s.platform || "x") + '"' +
        ' target="_blank" rel="noopener noreferrer">' +
        b.svg + esc(s.label) +
      "</a>";
    }).join("");

    // Apply brand styles via JS (avoids needing per-platform CSS classes)
    socialsEl.querySelectorAll("a[data-platform]").forEach(function (a) {
      var b = BRAND[a.getAttribute("data-platform")] || BRAND.x;
      a.style.background   = b.bg;
      a.style.borderColor  = b.border;
      a.style.color        = b.color;
      a.addEventListener("mouseenter", function () {
        this.style.background  = b.hoverBg;
        this.style.color       = b.hoverColor;
        this.style.borderColor = b.hoverBg;
        this.style.boxShadow   = b.hoverShadow;
        this.style.transform   = "translateY(-2px)";
      });
      a.addEventListener("mouseleave", function () {
        this.style.background  = b.bg;
        this.style.color       = b.color;
        this.style.borderColor = b.border;
        this.style.boxShadow   = "";
        this.style.transform   = "";
      });
    });
  }

  /* ── Countdown ─────────────────────────────────────────────────────────── */
  function goLive() {
    var cd   = document.getElementById("countdown");
    var live = document.getElementById("live-state");
    if (cd)   cd.hidden   = true;
    if (live) live.hidden = false;
  }

  function setupCountdown() {
    var target = new Date(CFG.LAUNCH_DATE).getTime();
    var cd     = document.getElementById("countdown");
    if (!cd) return;
    if (isNaN(target)) { goLive(); return; }

    var els = {
      days:    cd.querySelector('[data-unit="days"]'),
      hours:   cd.querySelector('[data-unit="hours"]'),
      minutes: cd.querySelector('[data-unit="minutes"]'),
      seconds: cd.querySelector('[data-unit="seconds"]')
    };
    var timer = null;

    function pad(n) { return (n < 10 ? "0" : "") + n; }

    function setNum(el, val) {
      if (!el || el.textContent === val) return;
      el.textContent = val;
      if (!reduced) {
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
      }
    }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) { clearInterval(timer); goLive(); return; }
      var s = Math.floor(diff / 1000);
      setNum(els.days,    String(Math.floor(s / 86400)));
      setNum(els.hours,   pad(Math.floor((s % 86400) / 3600)));
      setNum(els.minutes, pad(Math.floor((s % 3600) / 60)));
      setNum(els.seconds, pad(s % 60));
    }

    tick();
    timer = setInterval(tick, 1000);
  }

  /* ── Scroll-driven gradient (mirrors useGradientBackground.js exactly) ── */
  function setupGradient() {
    var gb = document.querySelector(".gradient-background");
    var eg = document.querySelector(".gradient-edge-glow");
    if (!gb || !eg) return;

    var cfg = { edgeOffset: 12, speed: 1, smoothing: 0.08, idleDrift: 0.00003, swayAmp: 0.015, swaySpeed: 0.0004 };
    var cp1 = 0, cp2 = 0.5, tp1 = 0, tp2 = 0.5;
    var lastScroll = window.pageYOffset || 0;
    var raf = 0;

    function periToXY(p, off) {
      var pp  = ((p % 1) + 1) % 1;
      var seg = pp * 4;
      var si  = Math.floor(seg);
      var sp  = seg - si;
      switch (si) {
        case 0:  return { x: off + sp * (100 - off * 2),           y: off                              };
        case 1:  return { x: 100 - off,                            y: off + sp * (100 - off * 2)       };
        case 2:  return { x: 100 - off - sp * (100 - off * 2),    y: 100 - off                        };
        default: return { x: off,                                  y: 100 - off - sp * (100 - off * 2) };
      }
    }

    function tick(ts) {
      var sy    = window.pageYOffset || 0;
      var delta = sy - lastScroll;
      if (Math.abs(delta) > 0) { tp1 += delta * 0.0008 * cfg.speed; tp2 -= delta * 0.0006 * cfg.speed; }
      tp1 += cfg.idleDrift;
      tp2 -= cfg.idleDrift * 0.7;
      lastScroll = sy;
      tp1 = ((tp1 % 1) + 1) % 1;
      tp2 = ((tp2 % 1) + 1) % 1;
      var d1 = tp1 - cp1; if (d1 >  0.5) d1 -= 1; if (d1 < -0.5) d1 += 1;
      var d2 = tp2 - cp2; if (d2 >  0.5) d2 -= 1; if (d2 < -0.5) d2 += 1;
      cp1 += d1 * cfg.smoothing;
      cp2 += d2 * cfg.smoothing;
      var sw1 = Math.sin(ts * cfg.swaySpeed) * cfg.swayAmp;
      var sw2 = Math.cos(ts * cfg.swaySpeed * 1.3) * cfg.swayAmp * 0.8;
      var p1  = periToXY(cp1 + sw1, cfg.edgeOffset);
      var p2  = periToXY(cp2 + sw2, cfg.edgeOffset + 3);
      gb.style.setProperty("--gradient-x",  p1.x.toFixed(1) + "%");
      gb.style.setProperty("--gradient-y",  p1.y.toFixed(1) + "%");
      gb.style.setProperty("--gradient-x2", p2.x.toFixed(1) + "%");
      gb.style.setProperty("--gradient-y2", p2.y.toFixed(1) + "%");
      var breathe = 1 + Math.sin(ts * 0.0003) * 0.12;
      eg.style.opacity = (0.45 + breathe * 0.2).toFixed(3);
      raf = requestAnimationFrame(tick);
    }

    function start() { if (!raf) { lastScroll = window.pageYOffset || 0; raf = requestAnimationFrame(tick); } }
    function stop()  { if (raf)  { cancelAnimationFrame(raf); raf = 0; } }

    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    start();
  }

  /* ── Init ───────────────────────────────────────────────────────────────── */
  function init() {
    renderDeck();
    setupDeck();
    renderCtas();
    setupCountdown();
    setupGradient();
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
