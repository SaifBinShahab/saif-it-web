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
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    if (!res.ok) return [];
    const xml = await res.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, max);
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
  } catch {
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
