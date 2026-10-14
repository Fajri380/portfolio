const DEFAULT_SITE_URL = "https://FajriRamadhan.com";

function normalizeSiteUrl(rawUrl: string): string {
  const normalized = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  try {
    const parsed = new URL(normalized);
    parsed.pathname = "/";
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL,
);

export const siteHost = new URL(`${siteUrl}/`).host;

export const fajriDevUrl = "https://fiaztechnologies.github.io";
export const linkHubUrl = "https://links.muhammadfiaz.com";
export const githubUrl = "https://github.com/Fajri380";
export const githubSnakeGraphUrl =
  "https://ghchart.rshah.org/Fajri380";
export const linkedinUrl = "https://www.linkedin.com/in/fajri-ramadhan-a37654310/?isSelfProfile=true";
export const xUrl = "https://x.com/muhammadfiaz_";
export const youtubeUrl = "https://www.youtube.com/@muhammad_fiaz";
export const hackatimeUrl =
  process.env.NEXT_PUBLIC_CODING_STATS_PROVIDER === "hackatime"
    ? "https://heatmap.shymike.dev/?id=30609&timezone=UTC"
    : "https://wakatime.com/@muhammadfiaz";
export const sponsorUrl = "https://github.com/sponsors/muhammad-fiaz/";
export const donationUrl = "https://pay.muhammadfiaz.com/";
export const ogImageUrl = `${siteUrl}/opengraph-image`;
