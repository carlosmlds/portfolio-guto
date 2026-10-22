import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioShell } from '@/components/portfolio-shell';
import minhaFoto from '@/assets/guto-foto.png'; // Confirme se o nome do arquivo é exatamente este

export const Route = createFileRoute('/sobre')({
  head: () => ({ meta: [{ title: 'Sobre Guto — Um olhar para cada história' }, { name: 'description', content: 'Conheça o trabalho de Guto com captação, edição de vídeos e motion design para empresas, redes sociais e eventos.' }, { property: 'og:title', content: 'Sobre Guto — Filmmaker & editor' }, { property: 'og:description', content: 'Da primeira ideia ao último corte: captação, edição e motion design.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Sobre,
});

function Sobre() { 
  return (
    <PortfolioShell>
      <section className="content-page reveal">
        
        {/* GRADE ÚNICA: Título e texto na esquerda, a foto na direita desde o topo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUNA ESQUERDA: Título, parágrafos e serviços */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="eyebrow text-primary">POR TRÁS DOS VÍDEOS</p>
              <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
                Prazer, Guto.<br />Um olhar para cada história.
              </h1>
            </div>

            <p className="body-copy pt-2">
              Trabalho com captação e edição de vídeos, conectando imagem, ritmo e intenção. De conteúdos para empresas e redes sociais a eventos, festas e casamentos: cada projeto pede sua própria linguagem.
            </p>
            
            <p className="body-copy">
              Entre a câmera, a edição e o motion design, transformo ideias e momentos em histórias que ganham vida na tela.
            </p>
            
            <div className="services pt-4">
              {['Captação & edição', 'Vídeos institucionais', 'Social media', 'Motion graphics & motion design', 'Eventos, festas & casamentos'].map(s => (
                <div className="service-row" key={s}>
                  <span>{s}</span>
                  <ArrowUpRight size={17} className="text-primary" />
                </div>
              ))}
            </div>
          </div>

          {/* COLUNA DIREITA: A Foto agora vai subir e alinhar exatamente com o topo do título */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
              <img 
                src={minhaFoto} 
                alt="Guto" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>

        </div>

      </section>
    </PortfolioShell>
  ); 
}