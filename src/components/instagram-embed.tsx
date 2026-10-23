import type { VideoEmbed } from '@/lib/video-embed';

export function InstagramEmbed({ embed, title }: { embed: VideoEmbed; title: string }) {
  // 1. Extraímos o permalink para uma variável local
  const permalink = embed.permalink;

  // 2. O TypeScript agora compreende que, se passar daqui, não é undefined
  if (!permalink) return null;

  // 3. Utilizamos a variável local com segurança
  const cleanPermalink = (permalink.split('?')[0] || '').replace(/\/$/, '');
  const darkEmbedUrl = `${cleanPermalink}/embed/captioned/?theme=dark`;

  return (
    <div className="w-full flex flex-col items-center bg-black/20 rounded-md overflow-hidden">
      <iframe
        src={darkEmbedUrl}
        title={title}
        className="w-full"
        style={{ height: '65vh', minHeight: '550px' }}
        frameBorder="0"
        scrolling="yes"
        allowTransparency={true}
      />
    </div>
  );
}