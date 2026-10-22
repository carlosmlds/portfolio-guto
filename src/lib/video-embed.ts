// Browser-safe: parses a YouTube, Vimeo or Instagram link into an address the
// site can show inside its own preview window. No server or upload involved.

export type VideoProvider = 'youtube' | 'vimeo' | 'instagram';

export type VideoEmbed = {
  provider: VideoProvider;
  id: string;
  embedUrl: string;
  /** Canonical post/reel address; only present for Instagram embeds. */
  permalink?: string;
  /** True for vertical videos (YouTube Shorts, Instagram reels) so the preview window goes tall. */
  vertical?: boolean;
};

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID = /^\d{6,12}$/;
const INSTAGRAM_ID = /^[A-Za-z0-9_-]{5,}$/;

function youtube(id: string, vertical = false): VideoEmbed | null {
  if (!YOUTUBE_ID.test(id)) return null;
  return {
    provider: 'youtube',
    id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
    ...(vertical ? { vertical: true } : {}),
  };
}

function vimeo(id: string): VideoEmbed | null {
  if (!VIMEO_ID.test(id)) return null;
  return {
    provider: 'vimeo',
    id,
    embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`,
  };
}

function instagram(kind: 'p' | 'reel', id: string): VideoEmbed | null {
  if (!INSTAGRAM_ID.test(id)) return null;
  return {
    provider: 'instagram',
    id,
    embedUrl: `https://www.instagram.com/${kind}/${id}/embed/`,
    permalink: `https://www.instagram.com/${kind}/${id}/`,
    ...(kind === 'reel' ? { vertical: true } : {}),
  };
}

/**
 * Accepts the link forms a video producer actually shares:
 *   https://youtu.be/dQw4w9WgXcQ
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PL123
 *   https://www.youtube.com/shorts/abcdefghijk
 *   https://www.youtube.com/embed/dQw4w9WgXcQ
 *   https://vimeo.com/76979871
 *   https://player.vimeo.com/video/76979871?h=aBcDeF
 *   https://www.instagram.com/p/ABCdefghijk/
 *   https://www.instagram.com/reel/ABCdefghijk/
 *   https://www.instagram.com/reels/ABCdefghijk/
 * Anything else returns null, so the caller keeps its current preview.
 */
export function parseVideoLink(input?: string | null): VideoEmbed | null {
  const raw = input?.trim();
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

  const host = url.hostname.replace(/^www\./, '').toLowerCase();
  const path = url.pathname.replace(/\/+$/, '');

  if (host === 'youtu.be') return youtube(path.slice(1).split('/')[0] ?? '');

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    const fromQuery = url.searchParams.get('v');
    if (fromQuery) return youtube(fromQuery);
    const fromPath = /^\/(shorts|embed|live)\/([^/]+)$/.exec(path);
    return fromPath ? youtube(fromPath[2] ?? '', fromPath[1] === 'shorts') : null;
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const last = path.split('/').filter(Boolean).pop() ?? '';
    return vimeo(last);
  }

  if (host === 'instagram.com' || host === 'm.instagram.com' || host === 'instagr.am') {
    // Also accepts links copied from a profile: /lavanderia60minutos/reel/ID/
    const match = /^(?:\/[A-Za-z0-9_.]+)?\/(p|reel|reels|tv)\/([^/]+)$/.exec(path);
    if (!match) return null;
    return instagram(match[1] === 'p' || match[1] === 'tv' ? 'p' : 'reel', match[2] ?? '');
  }

  return null;
}
