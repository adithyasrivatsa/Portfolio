import { Link } from 'react-router-dom';
import Articles from '../components/Articles';
import { getAllArticles } from '../utils/markdownHelper';
import DecryptedText from '../components/DecryptedText';

export default function ArticlesPage() {
  const articles = getAllArticles('articles');

  return (
    <div className="pt-20">
      <Articles />

      <section className="py-24 border-t-8 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
            <DecryptedText text="The Crypt" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => {
              const CustomTag = article.metadata.customLink ? 'a' : Link;
              const linkProps = article.metadata.customLink 
                ? { href: article.metadata.customLink } 
                : { to: `/article/${article.slug}` };

              return (
              <CustomTag 
                key={article.slug} 
                {...linkProps as any}
                className="block border-4 border-black p-6 hover:bg-black hover:text-white transition-colors duration-300 group"
              >
                <div className="text-xs font-mono opacity-50 mb-4 group-hover:opacity-75">
                  [DATE: {article.metadata.date}]
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                  <DecryptedText text={article.metadata.title} />
                </h3>
                <p className="font-mono text-sm opacity-70 group-hover:opacity-90">
                  {article.metadata.description}
                </p>
              </CustomTag>
              );
            })}
            
            {articles.length === 0 && (
              <div className="col-span-2 text-center py-12 border-2 border-black border-dashed opacity-50 font-mono">
                [NO_ARTICLES_FOUND : ADD_.MD_FILES_TO_SYSTEM]
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
