import { useEffect, useRef, useState } from 'react';
import type { VideoEmbed } from '@/lib/video-embed';

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

const EMBED_SCRIPT = 'https://www.instagram.com/embed.js';
const GIVE_UP_AFTER_MS = 7000;

export function InstagramEmbed({ embed, title }: { embed: VideoEmbed; title: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'pending' | 'ready' | 'quiet'>('pending');

  useEffect(() => {
    const el = holder.current;
    const permalink = embed?.permalink;
    if (!el || !permalink) return;

    setStatus('pending');
    el.replaceChildren();
    
    const quote = document.createElement('blockquote');
    quote.className = 'instagram-media';
    quote.setAttribute('data-instgrm-permalink', permalink);
    quote.setAttribute('data-instgrm-version', '14');
    quote.setAttribute('title', title);
    quote.setAttribute('data-theme', 'dark');
    
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
  }, [embed?.permalink, title]);

  if (!embed?.permalink) return null;

  return (
    <>
      <div ref={holder} className="w-full" data-status={status} />
      {status === 'quiet' && (
        <div className="p-4 text-center border border-white/10 rounded-md mt-4">
          <p className="text-sm text-muted-foreground">A publicação não pôde ser carregada.</p>
        </div>
      )}
    </>
  );
}