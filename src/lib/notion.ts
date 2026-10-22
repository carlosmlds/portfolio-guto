export interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  video: string;
  image: string;
}

const rawDatabaseId = import.meta.env['VITE_NOTION_DATABASE_ID'];

function extractDatabaseId(urlOrId: string | undefined): string | null {
  if (!urlOrId) return null;
  const match = urlOrId.match(/([a-f0-9]{32})/i);
  return (match && match[1]) ? match[1] : urlOrId.replace(/-/g, '');
}

export async function fetchProjectsFromNotion(): Promise<Project[]> {
  const token = import.meta.env['VITE_NOTION_TOKEN'];
  const databaseId = extractDatabaseId(rawDatabaseId);

  if (!databaseId || !token) {
    console.warn('ID da Base de Dados ou Token não configurados no .env.local');
    return [];
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ${response.status}: ${errorData.message || 'Falha na requisição'}`);
    }

    const data = await response.json();
    console.log('Projetos retornados do Notion:', data.results);

return data.results.map((page: any) => {
  const props = page.properties;

  // Pega o título buscando por 'Título', 'Title' ou 'Name'
  const title = props.Título?.title?.[0]?.plain_text 
    ?? props.Title?.title?.[0]?.plain_text 
    ?? props.Name?.title?.[0]?.plain_text 
    ?? 'Sem título';

  const category = props.Categoria?.select?.name ?? props.Category?.select?.name ?? 'Design';
  const role = props.Função?.rich_text?.[0]?.plain_text ?? props.Role?.rich_text?.[0]?.plain_text ?? 'Design';
  const description = props.Descrição?.rich_text?.[0]?.plain_text ?? props.Description?.rich_text?.[0]?.plain_text ?? '';
  const video = props.Vídeo?.url ?? props.Video?.url ?? props.Link?.url ?? '';

  // Procura a imagem em várias colunas possíveis ('Capa', 'Imagem', 'Cover', 'Image')
  const capaProp = props.Capa ?? props.Imagem ?? props.Cover ?? props.Image;
  let image = '';

  if (capaProp) {
    if (capaProp.type === 'url') {
      image = capaProp.url ?? '';
    } else if (capaProp.type === 'files' && capaProp.files?.length > 0) {
      const fileObj = capaProp.files[0];
      image = fileObj.file?.url ?? fileObj.external?.url ?? '';
    } else if (capaProp.type === 'rich_text' && capaProp.rich_text?.[0]?.plain_text) {
      image = capaProp.rich_text[0].plain_text;
    }
  }

  return {
    id: page.id,
    title,
    category,
    role,
    description,
    video,
    image,
  };
});
  } catch (error) {
    console.error('Erro ao buscar projetos do Notion:', error);
    return [];
  }
}