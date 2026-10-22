import { describe, expect, it } from "vitest";

import { parseVideoLink } from "@/lib/video-embed";

describe("parseVideoLink", () => {
  it("reads a shared YouTube link", () => {
    expect(parseVideoLink("https://youtu.be/dQw4w9WgXcQ")).toEqual({
      provider: "youtube",
      id: "dQw4w9WgXcQ",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1",
    });
  });

  it("reads a YouTube watch link and ignores the playlist", () => {
    const parsed = parseVideoLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PL123&index=2");
    expect(parsed?.id).toBe("dQw4w9WgXcQ");
    expect(parsed?.embedUrl).not.toContain("PL123");
    expect(parsed?.vertical).toBeUndefined();
  });

  it("reads a YouTube Shorts link as a vertical video", () => {
    expect(parseVideoLink("https://youtube.com/shorts/hSkGwGTkeWQ")).toEqual({
      provider: "youtube",
      id: "hSkGwGTkeWQ",
      embedUrl: "https://www.youtube-nocookie.com/embed/hSkGwGTkeWQ?autoplay=1&rel=0&modestbranding=1",
      vertical: true,
    });
  });

  it("reads a Vimeo link with a private hash", () => {
    expect(parseVideoLink("https://player.vimeo.com/video/76979871?h=aBcDeFgH12")).toEqual({
      provider: "vimeo",
      id: "76979871",
      embedUrl: "https://player.vimeo.com/video/76979871?autoplay=1&dnt=1",
    });
  });

  it("reads a plain Vimeo link", () => {
    expect(parseVideoLink("https://vimeo.com/76979871")?.provider).toBe("vimeo");
  });

  it("reads an Instagram post link", () => {
    expect(parseVideoLink("https://www.instagram.com/p/BsOGulcndj-/")).toEqual({
      provider: "instagram",
      id: "BsOGulcndj-",
      embedUrl: "https://www.instagram.com/p/BsOGulcndj-/embed/",
      permalink: "https://www.instagram.com/p/BsOGulcndj-/",
    });
  });

  it("reads an Instagram reel link", () => {
    const parsed = parseVideoLink("https://www.instagram.com/reels/AbC12noprQ/?utm_source=ig_web");
    expect(parsed?.provider).toBe("instagram");
    expect(parsed?.id).toBe("AbC12noprQ");
    expect(parsed?.embedUrl).toBe("https://www.instagram.com/reel/AbC12noprQ/embed/");
    expect(parsed?.permalink).toBe("https://www.instagram.com/reel/AbC12noprQ/");
    expect(parsed?.vertical).toBe(true);
  });

  it("reads a reel link copied from a profile page", () => {
    const parsed = parseVideoLink("https://www.instagram.com/lavanderia60minutos/reel/Dd7Ko9JpyVO/");
    expect(parsed?.permalink).toBe("https://www.instagram.com/reel/Dd7Ko9JpyVO/");
    expect(parsed?.vertical).toBe(true);
  });

  it("returns null for Instagram links that are not a post or reel", () => {
    expect(parseVideoLink("https://www.instagram.com/guto/")).toBeNull();
    expect(parseVideoLink("https://www.instagram.com/explore/tags/video/")).toBeNull();
  });

  it("returns null for a link the site cannot play", () => {
    expect(parseVideoLink("https://example.com/reel.mp4")).toBeNull();
    expect(parseVideoLink("https://www.youtube.com/watch?v=short")).toBeNull();
    expect(parseVideoLink("")).toBeNull();
    expect(parseVideoLink(undefined)).toBeNull();
    expect(parseVideoLink("não tenho link ainda")).toBeNull();
  });
});
