import frontMatter from 'front-matter';

type ArticleMetadata = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

export type Article = {
  slug: string;
  category: string;
  metadata: ArticleMetadata;
  content: string;
};

// Auto-discover all .md files in the content folders: philosophy, blog, projects, vision
const markdownFiles = import.meta.glob('../content/**/*.md', { eager: true, query: '?raw', import: 'default' });

export function getAllArticles(filterCategory?: string): Article[] {
  const articles: Article[] = [];

  for (const path in markdownFiles) {
    const rawContent = markdownFiles[path] as string;
    
    // Extract category from path: "../content/blog/my-post.md"
    const pathParts = path.split('/');
    const categoryName = pathParts[2] || 'uncategorized';
    const slug = pathParts[pathParts.length - 1].replace('.md', '');

    if (filterCategory && categoryName !== filterCategory) {
      continue;
    }

    try {
      const { attributes, body } = frontMatter<ArticleMetadata>(rawContent);
      articles.push({
        slug,
        category: categoryName,
        metadata: attributes,
        content: body,
      });
    } catch (e) {
      console.warn(`Failed to parse frontmatter for ${path}`);
    }
  }

  // Sort by newest first
  return articles.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}

export function getRecentArticles(category: string, limit: number = 3): Article[] {
  return getAllArticles(category).slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

