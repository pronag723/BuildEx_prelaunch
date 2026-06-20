/* ─────────────────────────────────────────────────────────────────────────
   BuildEx — Launch landing page configuration
   This is the ONLY file you need to edit before going live.
   ───────────────────────────────────────────────────────────────────────── */
window.LAUNCH = {
  // Target date/time for the countdown (ISO 8601, UTC "Z" recommended).
  // Placeholder ~2 weeks out — replace with the real launch moment.
  LAUNCH_DATE: "2026-07-05T17:00:00Z",

  // Primary CTA — your Discord invite.
  DISCORD_URL: "https://discord.gg/REPLACE_ME",

  // Where the "Enter BuildEx" button points once the timer hits zero.
  SITE_URL: "https://pronag723.github.io/BuildEx/",

  // Extra social buttons (rendered as ghost buttons next to Discord).
  // icon = any lucide icon name (https://lucide.dev/icons). NOTE: lucide no
  // longer ships brand logos (youtube/twitter/etc.), so we use generic icons.
  SOCIALS: [
    { label: "YouTube", url: "https://youtube.com/@REPLACE_ME", icon: "play" },
    { label: "X / Twitter", url: "https://x.com/REPLACE_ME", icon: "at-sign" },
    { label: "TikTok", url: "https://tiktok.com/@REPLACE_ME", icon: "music" }
  ]
};
