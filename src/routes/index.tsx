import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowUpRight, Instagram, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { InstagramEmbed } from '@/components/instagram-embed';
import { categories, projects as initialProjects, type Project } from '@/lib/portfolio';
import { parseVideoLink, type VideoEmbed } from '@/lib/video-embed';
import { PortfolioShell } from '@/components/portfolio-shell';
import { fetchProjectsFromNotion } from '@/lib/notion';
import 'plyr-react/plyr.css';

// Carrega o Plyr dinamicamente apenas no navegador para evitar o erro "document is not defined" no servidor
const Plyr: any = lazy(() => import('plyr-react').then((mod: any) => ({ default: mod.default || mod.Plyr || mod })));

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Guto — Captação, edição & motion design' },
    { name: 'description', content: 'Portfólio de Guto. Vídeo, design e fotografia para marcas e redes sociais, além de filmes de eventos e casamentos.' },
    { property: 'og:title', content: 'Guto — Histórias em movimento' },
    { property: 'og:description', content: 'Vídeo, design e fotografia. Um olhar para cada história e cada marca.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const providerLabel: Record<VideoEmbed['provider'], string> = {
  youtube: 'YouTube',
  vimeo: 'Vimeo',
  instagram: 'Instagram',
};

function getYouTubeHdThumbnail(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url?.match(regExp);
  const videoId = match?.[2];

  return (videoId && videoId.length === 11) 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
    : null;
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url?.match(regExp);
  const videoId = match?.[2];
  return (videoId && videoId.length === 11) ? videoId : null;
}

function EmbedFrame({ embed, title }: { embed: VideoEmbed; title: string }) {
  if (embed.provider === 'instagram') return <InstagramEmbed embed={embed} title={title} />;
  return (
    <iframe
      src={embed.embedUrl}
      title={title}
      className={`w-full h-full ${embed.vertical ? 'is-vertical' : ''}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

function Index() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [category, setCategory] = useState('Todos');
  const [selected, setSelected] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Garante a renderização segura de componentes do cliente no navegador
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Busca os dados do Notion assim que a página carrega
  useEffect(() => {
    async function loadNotionData() {
      try {
        const notionProjects = await fetchProjectsFromNotion();
        console.log("Projetos vindos do Notion:", notionProjects);

        if (notionProjects && notionProjects.length > 0) {
          setProjectList((prevList) => {
            const filteredPrev = prevList.filter(
              (localProj) => !notionProjects.some((np) => np.title === localProj.title)
            );
            return [...notionProjects, ...filteredPrev];
          });
        } else {
          console.warn("O Notion conectou, mas retornou 0 projetos.");
        }
      } catch (err) {
        console.error("Erro ao buscar dados do Notion:", err);
      }
    }
    loadNotionData();
  }, []);

  // Cria as abas de categorias automaticamente com base no Notion
  const dynamicCategories = ['Todos', ...Array.from(new Set(projectList.map(p => p.category).filter(Boolean)))];

  const filtered = projectList.filter(p => category === 'Todos' || p.category === category);
  const selectedEmbed = selected ? parseVideoLink(selected.video) : null;

  // 1. Pega TODOS os projetos que estão com a caixinha marcada no Notion
  const featuredList = projectList.filter(p => p.destaque);
  
  // 2. Se não tiver nenhum marcado, usa o primeiro da lista como segurança
  const safeFeaturedList = featuredList.length > 0 ? featuredList : [projectList[0]].filter(Boolean);
  
  // 3. Define qual projeto vai aparecer na tela baseado no número do carrossel (featuredIndex)
  const featuredProject = safeFeaturedList[featuredIndex];

  const featuredTitle = featuredProject?.title ?? "Título do Trabalho";
  const featuredCategoryRole = featuredProject ? `${featuredProject.category} / ${featuredProject.role}` : "";
  const featuredDescription = featuredProject?.description ?? "Descrição do projeto destacando a proposta visual, captação ou edição.";

  const videoToDisplay = featuredProject?.video || "";
  const featuredEmbed = videoToDisplay ? parseVideoLink(videoToDisplay) : null;
  const youtubeId = getYouTubeId(videoToDisplay);

  const hdThumbnail = featuredProject?.image || getYouTubeHdThumbnail(videoToDisplay);

  return (
    <PortfolioShell>
      <section className="reveal flex flex-col gap-8 w-full mb-16 pt-10 md:pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
          <div>
            <p className="eyebrow text-primary">GUTO / FILMMAKER & EDITOR</p>
            <h1 className="text-4xl md:text-6xl font-bold mt-2 tracking-tight">
              Histórias em movimento<span className="text-primary">.</span>
            </h1>
          </div>

          <p className="intro-copy max-w-md text-muted-foreground text-sm md:text-base md:text-right leading-relaxed pb-1">
            Um olhar atento. Um corte preciso.<br />
            Captação, edição e motion design para marcas, pessoas e momentos.
          </p>
        </div>

        {/* --- BLOCO DO VÍDEO EM DESTAQUE --- */}
        <div className="w-full space-y-4 mt-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="eyebrow text-xs uppercase tracking-widest text-primary font-semibold">
                Destaque {safeFeaturedList.length > 1 ? `(${featuredIndex + 1}/${safeFeaturedList.length})` : ''}
              </span>
            </div>

            {/* Só mostra as setinhas se houver mais de 1 destaque marcado no Notion */}
            {safeFeaturedList.length > 1 && (
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setFeaturedIndex(prev => prev === 0 ? safeFeaturedList.length - 1 : prev - 1);
                    setIsPlaying(false);
                  }} 
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all cursor-pointer"
                  aria-label="Destaque anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setFeaturedIndex(prev => (prev + 1) % safeFeaturedList.length);
                    setIsPlaying(false);
                  }} 
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all cursor-pointer"
                  aria-label="Próximo destaque"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* DIV DA ANIMAÇÃO - AGORA ELA ABRAÇA O CONTEÚDO CORRETAMENTE */}
          <div key={featuredIndex} className="animate-in fade-in zoom-in-[0.98] slide-in-from-right-4 duration-500 ease-out space-y-4">
            
            {/* Player do Vídeo / Capa */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black relative">
              {!isPlaying && hdThumbnail ? (
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="group absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/10 transition-all z-10 cursor-pointer"
                  aria-label="Reproduzir vídeo em destaque"
                >
                  <img 
                    src={hdThumbnail} 
                    alt="Capa do trabalho em destaque" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 md:w-9 md:h-9 fill-current ml-1" />
                  </div>
                </button>
              ) : (
                isMounted && youtubeId ? (
                  <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-xs text-muted-foreground">Carregando player...</div>}>
                    <Plyr
                      source={{
                        type: 'video',
                        sources: [
                          {
                            src: youtubeId,
                            provider: 'youtube',
                          },
                        ],
                      }}
                      options={{
                        autoplay: true,
                        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                        youtube: {
                          noCookie: true,
                          rel: 0,
                          showinfo: 0,
                          iv_load_policy: 3,
                          modestbranding: 1,
                        },
                      }}
                    />
                  </Suspense>
                ) : (
                  featuredEmbed && <EmbedFrame embed={featuredEmbed} title="Trabalho em Destaque" />
                )
              )}
            </div>

            {/* TÍTULO, CATEGORIA E DESCRIÇÃO */}
            <div className="pt-3 flex flex-col gap-2 border-t border-white/10">
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  {featuredTitle}
                </h3>
                <p className="text-xs md:text-sm text-primary font-medium tracking-wide">
                  {featuredCategoryRole}
                </p>
              </div>
              
              <p className="text-xs md:text-sm text-muted-foreground max-w-3xl leading-relaxed">
                {featuredDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE TRABALHOS ABAIXO --- */}
      <section className="work-section mt-16" aria-label="Trabalhos">
        <div className="section-heading">
          <h2>Trabalhos selecionados<sup>{String(projectList.length).padStart(2, '0')}</sup></h2>
          <span className="eyebrow text-muted-foreground">CADA PROJETO, UM NOVO OLHAR</span>
        </div>
        <div className="filters" aria-label="Categorias de trabalho">
          {dynamicCategories.map(c => (
            <Button variant="filter" key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </Button>
          ))}
        </div>
        <div className="project-grid">
          {filtered.map(p => (
            <article key={p.title} className="reveal">
              <Button variant="project" onClick={() => setSelected(p)} aria-label={`Ver prévia de ${p.title}`}>
                <div className="w-full">
                  <div className={p.image ? 'project-image' : 'project-image is-instagram'}>
                    {p.image ? (
                      <img src={p.image} alt={p.title} width={1280} height={768} loading="lazy" />
                    ) : (
                      <>
                        <Instagram size={32} strokeWidth={1.4} aria-hidden="true" />
                        <span className="eyebrow">Publicação no Instagram</span>
                      </>
                    )}
                    <span className="project-open"><ArrowUpRight size={15} /></span>
                  </div>
                  <div className="project-details">
                    <h3>{p.title}</h3>
                    <p>{p.category} <span className="mx-2">/</span> {p.role}</p>
                  </div>
                </div>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
        <DialogContent className="preview-dialog">
          <DialogTitle>{selected?.title}</DialogTitle>
          <DialogDescription>{selected?.category} · {selected?.role}</DialogDescription>
          {selectedEmbed ? (
            <EmbedFrame embed={selectedEmbed} title={selected?.title ?? 'Publicação do projeto'} />
          ) : selected?.image ? (
            <img src={selected.image} alt={selected.title} />
          ) : (
            <p className="text-sm text-muted-foreground">Prévia indisponível.</p>
          )}
          <p className="text-sm text-muted-foreground">{selected?.description}</p>
          {selectedEmbed && selectedEmbed.provider !== 'instagram' && (
            <p className="text-xs text-muted-foreground">Vídeo hospedado no {providerLabel[selectedEmbed.provider]}.</p>
          )}
        </DialogContent>
      </Dialog>
    </PortfolioShell>
  );
}