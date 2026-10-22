import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioShell } from '@/components/portfolio-shell';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/contato')({
  head: () => ({ meta: [{ title: 'Contato — Crie seu próximo vídeo com Guto' }, { name: 'description', content: 'Prepare o briefing do seu projeto de captação, edição de vídeo ou motion design com Guto.' }, { property: 'og:title', content: 'Vamos criar juntos — Guto' }, { property: 'og:description', content: 'Uma ideia, uma história, um próximo projeto. Prepare seu briefing.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Contato,
});

function Contato() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    // Organiza a mensagem que vai direto para o seu WhatsApp
    const text = `Olá, Guto! Vim pelo portfólio.\n\n*Nome:* ${data.get('name')}\n*Contato:* ${data.get('contact')}\n*Projeto:* ${data.get('type')}\n\n*Ideia:* ${data.get('message')}`;
    
    // Seu número de WhatsApp com DDI e DDD (55 83 991082028)
    const numeroWhatsApp = "5583991082028";
    
    // Cria o link e abre o WhatsApp numa nova aba
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(text)}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <PortfolioShell>
      <section className="content-page reveal">
        <p className="eyebrow text-primary">VAMOS CRIAR JUNTOS</p>
        <h1>Seu próximo vídeo<br />começa com uma ideia.</h1>
        <form className="brief-form" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-5">
            <label>Seu nome<input name="name" className="brief-field" placeholder="Como posso te chamar?" required /></label>
            <label>Seu e-mail ou WhatsApp<input name="contact" className="brief-field" placeholder="Seu contato" required /></label>
          </div>
          <label>O que vamos criar?<select name="type" className="brief-field"><option>Captação e edição</option><option>Vídeo institucional</option><option>Social media</option><option>Motion design</option><option>Evento ou festa</option><option>Casamento</option><option>Outro projeto</option></select></label>
          <label>Conte um pouco sobre a sua ideia<textarea name="message" className="brief-field" rows={5} placeholder="O que você imagina? Se já tiver uma data, formato ou referência, pode contar também." required /></label>
          <p className="brief-note">Clique abaixo para enviar os detalhes diretamente para o WhatsApp de Guto.</p>
          <div>
            <Button type="submit" size="lg">
              Enviar pelo WhatsApp <ArrowUpRight className="ml-1" size={18} />
            </Button>
          </div>
        </form>
      </section>
    </PortfolioShell>
  );
}