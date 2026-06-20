/* ─────────────────────────────────────────────────────────────────────────
   BuildEx — Launch landing page behavior
   - Animated perimeter gradient (ported from the main app's page.jsx)
   - Countdown to LAUNCH_DATE, flips to "Enter BuildEx" at zero
   - CTA wiring + feature cards + reveal-on-scroll
   ───────────────────────────────────────────────────────────────────────── */

(function () {
  "use strict";

  var CFG = window.LAUNCH || {};
  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Feature data (mirrors app/home/components/FeaturesDeckSection.jsx) ──────
  var FEATURES = [
    {
      icon: "box",
      title: "Interactive 3D Previews",
      body: "Rotate and zoom an automatic 3D render of the build before you confirm — no downloads, no guesswork.",
      bullets: ["Rotate · zoom · inspect", "Generated at delivery", "Approve with confidence"]
    },
    {
      icon: "shield",
      title: "Escrow-Protected Payments",
      body: "Your payment is held safely and only released to the builder once you've approved the delivery.",
      bullets: ["Funds held in escrow", "Released on approval", "Disputes resolved fairly"]
    },
    {
      icon: "trophy",
      title: "Earned Ranking System",
      body: "Builders climb from Rookie to Master through real completed orders and ratings — higher ranks pay lower fees.",
      bullets: ["Ranks from real metrics", "Lower commission per tier", "Rewards proven quality"]
    },
    {
      icon: "star",
      title: "Verified Reviews",
      body: "Every review comes from a real, completed order — so the ratings you see are ones you can trust.",
      bullets: ["Order-gated reviews", "One review per order", "Honest, real feedback"]
    },
    {
      icon: "message-circle",
      title: "Live Chat & Order Tracking",
      body: "Message builders directly, share files and photos, and follow your order from payment to delivery.",
      bullets: ["Direct messaging", "Paste & send photos", "Live order status"]
    }
  ];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ── Build feature cards ────────────────────────────────────────────────────
  function renderFeatures() {
    var grid = document.getElementById("features-grid");
    if (!grid) return;
    grid.innerHTML = FEATURES.map(function (f) {
      var bullets = f.bullets
        .map(function (b) {
          return '<li><i data-lucide="check"></i>' + escapeHtml(b) + "</li>";
        })
        .join("");
      return (
        '<article class="lp-card glass">' +
        '<span class="icon-tile icon-tile-lg"><i data-lucide="' + f.icon + '"></i></span>' +
        '<h3 class="lp-card-title">' + escapeHtml(f.title) + "</h3>" +
        '<p class="lp-card-body">' + escapeHtml(f.body) + "</p>" +
        '<ul class="lp-card-bullets">' + bullets + "</ul>" +
        "</article>"
      );
    }).join("");
  }

  // ── Wire CTA buttons from config ───────────────────────────────────────────
  function renderCtas() {
    var discord = document.getElementById("discord-btn");
    if (discord && CFG.DISCORD_URL) discord.href = CFG.DISCORD_URL;

    var enter = document.getElementById("enter-btn");
    if (enter && CFG.SITE_URL) enter.href = CFG.SITE_URL;

    var socials = document.getElementById("socials");
    if (socials && Array.isArray(CFG.SOCIALS)) {
      socials.innerHTML = CFG.SOCIALS.map(function (s) {
        return (
          '<a class="lp-btn lp-btn-ghost" href="' + escapeHtml(s.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<i data-lucide="' + escapeHtml(s.icon || "link") + '"></i>' +
          escapeHtml(s.label) +
          "</a>"
        );
      }).join("");
    }
  }

  // ── Countdown ──────────────────────────────────────────────────────────────
  function goLive() {
    var countdown = document.getElementById("countdown");
    var live = document.getElementById("live-state");
    if (countdown) countdown.hidden = true;
    if (live) live.hidden = false;
  }

  function setupCountdown() {
    var target = new Date(CFG.LAUNCH_DATE).getTime();
    var countdown = document.getElementById("countdown");
    if (!countdown) return;

    // Bad/missing date — fail gracefully into the live state.
    if (isNaN(target)) {
      goLive();
      return;
    }

    var nums = {
      days: countdown.querySelector('[data-unit="days"]'),
      hours: countdown.querySelector('[data-unit="hours"]'),
      minutes: countdown.querySelector('[data-unit="minutes"]'),
      seconds: countdown.querySelector('[data-unit="seconds"]')
    };
    var timer = null;

    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }

    function setNum(el, value) {
      if (!el || el.textContent === value) return;
      el.textContent = value;
      if (!prefersReducedMotion) {
        el.classList.remove("tick");
        // reflow to restart the animation
        void el.offsetWidth;
        el.classList.add("tick");
      }
    }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        if (timer) clearInterval(timer);
        goLive();
        return;
      }
      var totalSeconds = Math.floor(diff / 1000);
      var days = Math.floor(totalSeconds / 86400);
      var hours = Math.floor((totalSeconds % 86400) / 3600);
      var minutes = Math.floor((totalSeconds % 3600) / 60);
      var seconds = totalSeconds % 60;

      setNum(nums.days, String(days));
      setNum(nums.hours, pad(hours));
      setNum(nums.minutes, pad(minutes));
      setNum(nums.seconds, pad(seconds));
    }

    tick();
    timer = setInterval(tick, 1000);
  }

  // ── Reveal-on-scroll for feature cards ─────────────────────────────────────
  function setupReveal() {
    var cards = document.querySelectorAll(".lp-card");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      cards.forEach(function (c) {
        c.classList.add("revealed");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var idx = Array.prototype.indexOf.call(cards, el);
            el.style.transitionDelay = Math.min(idx, 5) * 80 + "ms";
            el.classList.add("revealed");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach(function (c) {
      observer.observe(c);
    });
  }

  // ── Animated perimeter gradient (ported from app/page.jsx) ─────────────────
  function setupGradient() {
    var gradientBg = document.querySelector(".gradient-background");
    var edgeGlow = document.querySelector(".gradient-edge-glow");
    if (!gradientBg || !edgeGlow) return;

    // Static fallback: leave the default CSS gradient positions.
    if (prefersReducedMotion) return;

    var config = {
      edgeOffset: 12,
      speedMultiplier: 1,
      smoothing: 0.08,
      idleDrift: 0.00003,
      swayAmplitude: 0.015,
      swaySpeed: 0.0004
    };

    var currentProgress1 = 0;
    var currentProgress2 = 0.5;
    var targetProgress1 = 0;
    var targetProgress2 = 0.5;
    var lastScrollY = window.pageYOffset;

    function perimeterToPosition(progress, offset) {
      var totalProgress = ((progress % 1) + 1) % 1;
      var segment = totalProgress * 4;
      var sideIndex = Math.floor(segment);
      var sideProgress = segment - sideIndex;

      switch (sideIndex) {
        case 0:
          return { x: offset + sideProgress * (100 - offset * 2), y: offset };
        case 1:
          return { x: 100 - offset, y: offset + sideProgress * (100 - offset * 2) };
        case 2:
          return { x: 100 - offset - sideProgress * (100 - offset * 2), y: 100 - offset };
        case 3:
          return { x: offset, y: 100 - offset - sideProgress * (100 - offset * 2) };
        default:
          return { x: offset, y: offset };
      }
    }

    function update(timestamp) {
      var time = timestamp || performance.now();
      var currentScrollY = window.pageYOffset;
      var scrollDelta = currentScrollY - lastScrollY;

      if (Math.abs(scrollDelta) > 0) {
        targetProgress1 += scrollDelta * 0.0008 * config.speedMultiplier;
        targetProgress2 -= scrollDelta * 0.0006 * config.speedMultiplier;
      }

      targetProgress1 += config.idleDrift;
      targetProgress2 -= config.idleDrift * 0.7;
      lastScrollY = currentScrollY;
      targetProgress1 = ((targetProgress1 % 1) + 1) % 1;
      targetProgress2 = ((targetProgress2 % 1) + 1) % 1;

      var diff1 = targetProgress1 - currentProgress1;
      if (diff1 > 0.5) diff1 -= 1;
      if (diff1 < -0.5) diff1 += 1;

      var diff2 = targetProgress2 - currentProgress2;
      if (diff2 > 0.5) diff2 -= 1;
      if (diff2 < -0.5) diff2 += 1;

      currentProgress1 += diff1 * config.smoothing;
      currentProgress2 += diff2 * config.smoothing;

      var sway1 = Math.sin(time * config.swaySpeed) * config.swayAmplitude;
      var sway2 = Math.cos(time * config.swaySpeed * 1.3) * config.swayAmplitude * 0.8;
      var pos1 = perimeterToPosition(currentProgress1 + sway1, config.edgeOffset);
      var pos2 = perimeterToPosition(currentProgress2 + sway2, config.edgeOffset + 3);

      gradientBg.style.setProperty("--gradient-x", pos1.x + "%");
      gradientBg.style.setProperty("--gradient-y", pos1.y + "%");
      gradientBg.style.setProperty("--gradient-x2", pos2.x + "%");
      gradientBg.style.setProperty("--gradient-y2", pos2.y + "%");

      var breathe = 1 + Math.sin(time * 0.0003) * 0.12;
      edgeGlow.style.opacity = String(0.45 + breathe * 0.2);
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    renderFeatures();
    renderCtas();
    setupCountdown();
    setupReveal();
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
