/* ─────────────────────────────────────────────────────────────────────────
   BuildEx — Launch landing page configuration
   This is the ONLY file you need to edit before going live.
   ───────────────────────────────────────────────────────────────────────── */
window.LAUNCH = {
  // Target date/time for the countdown (ISO 8601, UTC "Z" recommended).
  LAUNCH_DATE: "2026-07-05T17:00:00Z",

  // Primary CTA — your Discord invite.
  DISCORD_URL: "https://discord.gg/REPLACE_ME",

  // Where the "Enter BuildEx" button points once the timer hits zero.
  SITE_URL: "https://pronag723.github.io/BuildEx/",

  // Extra social buttons. platform = "youtube" | "x" | "tiktok" | "discord"
  SOCIALS: [
    { label: "YouTube",    url: "https://youtube.com/@REPLACE_ME", platform: "youtube" },
    { label: "X / Twitter", url: "https://x.com/REPLACE_ME",       platform: "x"       },
    { label: "TikTok",     url: "https://tiktok.com/@REPLACE_ME",  platform: "tiktok"  },
    { label: "Reddit",     url: "https://reddit.com/r/REPLACE_ME", platform: "reddit"  }
  ]
};
