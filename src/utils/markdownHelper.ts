import frontMatter from 'front-matter';

export interface Article {
  slug: string;
  category: string;
  metadata: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
    customLink?: string;
  };
  content: string;
}

export function getAllArticles(category?: string): Article[] {
  let modules: Record<string, unknown> = {};
  
  if (!category || category === 'philosophy') {
    Object.assign(modules, import.meta.glob('/src/content/philosophy/*.md', { query: '?raw', import: 'default', eager: true }));
  }
  if (!category || category === 'blog') {
    Object.assign(modules, import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true }));
  }
  if (!category || category === 'projects') {
    Object.assign(modules, import.meta.glob('/src/content/projects/*.md', { query: '?raw', import: 'default', eager: true }));
  }
  if (!category || category === 'vision') {
    Object.assign(modules, import.meta.glob('/src/content/vision/*.md', { query: '?raw', import: 'default', eager: true }));
  }

  const articles: Article[] = [];

  for (const path in modules) {
    const rawContent = modules[path] as string;
    try {
      const { attributes, body } = frontMatter<any>(rawContent);
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      const pathParts = path.split('/');
      const itemCategory = category || pathParts[pathParts.length - 2] || 'uncategorized';

      articles.push({
        slug,
        category: itemCategory,
        metadata: {
          title: attributes.title || 'Untitled',
          date: attributes.date || 'Unknown Date',
          description: attributes.description || '',
          tags: attributes.tags,
          customLink: attributes.customLink,
        },
        content: body,
      });
    } catch (e) {
      console.warn(`Failed to parse frontmatter for ${path}`);
    }
  }

  return articles.sort((a, b) => new Date(b.metadata.date).valueOf() - new Date(a.metadata.date).valueOf());
}

export function getRecentArticles(category: string, limit: number): Article[] {
  return getAllArticles(category).slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find(a => a.slug === slug) || null;
}
