import korpus40 from '@/assets/korpus-40-anos.jpg';
import lav1 from '@/assets/lav60-Dd7Ko9JpyVO.jpg';
import lav2 from '@/assets/lav60-DeZWJg8iNq2.jpg';
import lav3 from '@/assets/lav60-DdUQz28J7NP.jpg';
import lav4 from '@/assets/lav60-DdcJB98JvC_.jpg';
import lav5 from '@/assets/lav60-DbWQ_0ppsDC.jpg';

const lavRole = 'Produção, captação, edição, motion & IA';
const lavDesc = 'Reel para a Lavanderia 60 Minutos: produção completa, da captação à edição e motion, com recursos de vídeo com IA.';

export const categories = ['Todos', 'Institucional', 'Social media', 'Motion design', 'Eventos', 'Casamentos'] as const;

export type Project = {
  title: string;
  category: string;
  /** Capa do card. Opcional: publicações do Instagram usam uma capa própria do site. */
  image?: string;
  role: string;
  description: string;
  /** Link do YouTube, Vimeo ou Instagram do trabalho. */
  video?: string;
};

export const projects: Project[] = [
  { title: 'Bruna & Naldo — Pré-wedding', category: 'Casamentos', image: 'https://i.ytimg.com/vi/s8g4KQc9UJY/hqdefault.jpg', role: 'Captação & edição', description: 'Bruna e Naldo por locações de São Paulo. O antes do sim, com toda a cumplicidade do casal.', video: 'https://youtu.be/s8g4KQc9UJY' },
  { title: 'Korpus — 40 anos', category: 'Institucional', image: korpus40, role: 'Campanha & edição', description: 'Vídeo da campanha dos 40 anos da Korpus, publicado no Instagram da academia.', video: 'https://www.instagram.com/reel/DRLHC22mGpI/' },
  { title: 'Ana Daura — 1 aninho', category: 'Eventos', image: 'https://i.ytimg.com/vi/nXvwzOxN4po/hqdefault.jpg', role: 'Captação & edição', description: 'O primeiro aninho de Ana Daura em um mundo de Branca de Neve: decoração, detalhes e a doçura da festa.', video: 'https://youtu.be/nXvwzOxN4po' },
  { title: 'Ceci & Vitor — Pré-wedding', category: 'Casamentos', image: 'https://i.ytimg.com/vi/dB4IjycgjFM/hqdefault.jpg', role: 'Captação & edição', description: 'O pré-wedding de Ceci e Vitor: o carinho do casal antes do grande dia.', video: 'https://youtu.be/dB4IjycgjFM' },
  { title: 'Lucas — 5 anos', category: 'Eventos', image: 'https://i.ytimg.com/vi/LLDwmoBoc-8/hqdefault.jpg', role: 'Captação & edição', description: 'Os 5 anos do Lucas com tema de Copa do Mundo e futebol: festa com clima de final de campeonato.', video: 'https://youtu.be/LLDwmoBoc-8' },
  { title: 'Nascimento de Antonella', category: 'Eventos', image: 'https://i.ytimg.com/vi/SocH6xwzYbY/hqdefault.jpg', role: 'Captação & edição', description: 'A chegada de Antonella, registrada com delicadeza para a família guardar para sempre.', video: 'https://youtu.be/SocH6xwzYbY' },
  { title: 'Korpus — Evento', category: 'Motion design', image: 'https://i.ytimg.com/vi/34iQ8jDQ73M/hqdefault.jpg', role: 'Motion design', description: 'Motion criado para a Korpus sobre um evento realizado pela academia.', video: 'https://youtu.be/34iQ8jDQ73M' },
  { title: 'Campanha de doação de sangue', category: 'Motion design', image: 'https://i.ytimg.com/vi/GiaAbTLvNVs/hqdefault.jpg', role: 'Motion design', description: 'Motion para uma campanha de incentivo à doação de sangue.', video: 'https://youtu.be/GiaAbTLvNVs' },
  { title: 'Korpus — Kafé Junino', category: 'Motion design', image: 'https://i.ytimg.com/vi/hSkGwGTkeWQ/hqdefault.jpg', role: 'Motion design & edição', description: 'Motion criado para o Kafé Junino, o evento de São João da academia Korpus.', video: 'https://youtube.com/shorts/hSkGwGTkeWQ' },
  { title: 'Lavanderia 60 Minutos — Reel 1', category: 'Social media', image: lav1, role: lavRole, description: lavDesc, video: 'https://www.instagram.com/lavanderia60minutos/reel/Dd7Ko9JpyVO/' },
  { title: 'Lavanderia 60 Minutos — Reel 2', category: 'Social media', image: lav2, role: lavRole, description: lavDesc, video: 'https://www.instagram.com/lavanderia60minutos/reel/DeZWJg8iNq2/' },
  { title: 'Lavanderia 60 Minutos — Reel 3', category: 'Social media', image: lav3, role: lavRole, description: lavDesc, video: 'https://www.instagram.com/lavanderia60minutos/reel/DdUQz28J7NP/' },
  { title: 'Lavanderia 60 Minutos — Reel 4', category: 'Social media', image: lav4, role: lavRole, description: lavDesc, video: 'https://www.instagram.com/lavanderia60minutos/reel/DdcJB98JvC_/' },
  { title: 'Lavanderia 60 Minutos — Reel 5', category: 'Social media', image: lav5, role: lavRole, description: lavDesc, video: 'https://www.instagram.com/lavanderia60minutos/reel/DbWQ_0ppsDC/' },
];