import { Link, useLocation } from '@tanstack/react-router';
import { ArrowUpRight, Linkedin, Disc as BehanceIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

export function PortfolioShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return <div className="site-shell">
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="Guto — início">guto<span>.</span></Link>
      <nav className="site-nav" aria-label="Navegação principal">
        <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Trabalhos</Link>
        <Link to="/sobre" className={`nav-link ${pathname === '/sobre' ? 'active' : ''}`}>Sobre mim</Link>
        <Link to="/contato" className={`nav-link ${pathname === '/contato' ? 'active' : ''}`}>Contato</Link>
      </nav>
      <Button asChild variant="outline" className="header-cta" size="sm"><Link to="/contato">Vamos criar juntos <ArrowUpRight /></Link></Button>
    </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div className="footer-top"><div><p className="eyebrow text-muted-foreground mb-3">TEM UMA IDEIA EM MENTE?</p><h2>Vamos dar vida a ela.</h2></div><Button asChild size="lg"><Link to="/contato">Vamos conversar <ArrowUpRight /></Link></Button></div>
      
      {/* Adicionado apenas os links do LinkedIn e Behance aqui embaixo */}
      <div className="footer-bottom flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-white/5">
        <span>© {new Date().getFullYear()} Guto. Feito com intenção.</span>
        
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a 
            href="https://www.linkedin.com/in/carlos-miguel-lopes-198448224/?isSelfProfile=true" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Linkedin size={15} className="text-primary" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://www.behance.net/camilodesign" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <BehanceIcon size={15} className="text-primary" />
            <span>Behance</span>
          </a>
        </div>

        <span>Captação · Edição · Motion design</span>
      </div>
    </footer>
  </div>;
}