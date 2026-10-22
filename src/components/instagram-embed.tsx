import { useEffect, useRef, useState } from 'react';
import type { VideoEmbed } from '@/lib/video-embed';

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

const EMBED_SCRIPT = 'https://www.instagram.com/embed.js';
const GIVE_UP_AFTER_MS = 7000;

/**
 * Shows a public Instagram post or reel using Instagram's own embed widget.
 * The widget sizes itself, so posts of any format fit without cropping.
 * If the widget never reports a size (private profile, removed post, a link
 * that no longer works, or a slow load) we keep the embed in place and add a
 * link to the publication, so the preview window is never left empty.
 */
export function InstagramEmbed({ embed, title }: { embed: VideoEmbed; title: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'pending' | 'ready' | 'quiet'>('pending');

  useEffect(() => {
    const el = holder.current;
    const permalink = embed.permalink;
    if (!el || !permalink) return;

    setStatus('pending');
    el.replaceChildren();
    const quote = document.createElement('blockquote');
    quote.className = 'instagram-media';
    quote.setAttribute('data-instgrm-permalink', permalink);
    quote.setAttribute('data-instgrm-version', '14');
    quote.setAttribute('title', title);
    el.appendChild(quote);

    const process = () => window.instgrm?.Embeds?.process();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SCRIPT}"]`);
    if (existing) {
      process();
    } else {
      const script = document.createElement('script');
      script.src = EMBED_SCRIPT;
      script.async = true;
      script.onload = process;
      document.body.appendChild(script);
    }

    const started = Date.now();
    const timer = window.setInterval(() => {
      const frame = el.querySelector('iframe');
      const height = frame ? Number(frame.getAttribute('height')) || frame.getBoundingClientRect().height : 0;
      if (height > 60) {
        setStatus('ready');
        window.clearInterval(timer);
      } else if (Date.now() - started > GIVE_UP_AFTER_MS) {
        setStatus('quiet');
        window.clearInterval(timer);
      }
    }, 250);

    return () => {
      window.clearInterval(timer);
      el.replaceChildren();
    };
  }, [embed.permalink, title]);

  return (
    <>
      <div ref={holder} className="instagram-embed" data-status={status} />
      {status === 'quiet' ? (
        <div className="instagram-fallback">
          <p>Se a publicação não aparecer aqui, ela pode estar em um perfil privado ou fora do ar.</p>
        </div>
      ) : null}
      <a className="embed-link" href={embed.permalink} target="_blank" rel="noreferrer">
        Abrir publicação no Instagram
      </a>
    </>
  );
}
