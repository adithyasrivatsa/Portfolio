import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getArticleBySlug } from '../utils/markdownHelper';
import DecryptedText from '../components/DecryptedText';

export default function ArticleView() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || '');

  if (!article) {
    return (
      <div className="pt-32 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4"><DecryptedText text="404" /></h1>
        <p className="opacity-50 font-mono mb-8">[ERROR: ARTICLE_NOT_FOUND]</p>
        <Link to="/" className="border-2 border-black px-6 py-3 font-black uppercase hover:bg-black hover:text-white transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-20 px-6 max-w-3xl mx-auto font-sans">
      <div className="mb-12 border-b-8 border-black pb-8">
        <Link to={`/${article.category}`} className="text-xs font-black uppercase tracking-widest hover:underline underline-offset-8 decoration-4 mb-8 inline-block">
          &lt; Back to Library
        </Link>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
          <DecryptedText text={article.metadata.title} />
        </h1>
        <div className="flex flex-wrap gap-4 text-xs font-mono opacity-50 uppercase">
          <span>[DATE: {article.metadata.date}]</span>
          {article.metadata.tags && (
            <span>[TAGS: {article.metadata.tags.join(', ')}]</span>
          )}
        </div>
      </div>

      <div className="prose prose-zinc prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:font-bold prose-a:underline prose-a:decoration-4 prose-code:font-mono max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
