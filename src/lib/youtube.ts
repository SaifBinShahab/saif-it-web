// Build-time fetch of a channel's latest uploads via the public YouTube RSS
// feed — no API key required. Falls back to manual entries in siteConfig if
// the fetch fails, returns nothing, or no channel ID is configured.
export type YTVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
};

export async function getLatestVideos(channelId: string, max = 3): Promise<YTVideo[]> {
  if (!channelId) return [];

  // The RSS endpoint only accepts a real channel ID (starts with "UC..."),
  // not a @handle or a custom URL slug. This is the most common
  // misconfiguration, so fail loudly at build time rather than silently
  // showing nothing.
  if (!/^UC[\w-]{22}$/.test(channelId)) {
    console.warn(
      `[youtube] "${channelId}" doesn't look like a channel ID (it should start with "UC" and be 24 characters). ` +
        `A @handle or channel URL won't work with the RSS feed — open your channel, go to ` +
        `"Share channel" > "Copy channel ID" to get the right value.`
    );
  }

  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      // Some hosts/edges reject requests with no User-Agent.
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioBuild/1.0)" },
    });
    if (!res.ok) {
      console.warn(`[youtube] RSS fetch failed with status ${res.status} for channel "${channelId}".`);
      return [];
    }
    const xml = await res.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, max);
    if (entries.length === 0) {
      console.warn(`[youtube] RSS feed for "${channelId}" returned no <entry> items.`);
    }
    return entries.map((m) => {
      const block = m[1];
      const id = block.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
      const title = block.match(/<title>(.*?)<\/title>/)?.[1] ?? "Untitled";
      const publishedAt = block.match(/<published>(.*?)<\/published>/)?.[1] ?? "";
      const thumbnail =
        block.match(/<media:thumbnail url="(.*?)"/)?.[1] ??
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      return { id, title: decodeXmlEntities(title), publishedAt, thumbnail };
    });
  } catch (err) {
    console.warn(`[youtube] RSS fetch threw for channel "${channelId}":`, err);
    return [];
  }
}

function decodeXmlEntities(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
