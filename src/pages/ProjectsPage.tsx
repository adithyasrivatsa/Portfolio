import { Link } from 'react-router-dom';
import Projects from '../components/Projects';
import { getAllArticles } from '../utils/markdownHelper';
import DecryptedText from '../components/DecryptedText';

export default function ProjectsPage() {
  const articles = getAllArticles('projects');

  return (
    <div className="pt-20">
      <Projects />

      <section className="py-24 border-t-8 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
            <DecryptedText text="Endeavors" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link 
                key={article.slug} 
                to={`/article/${article.slug}`}
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
              </Link>
            ))}
            
            {articles.length === 0 && (
              <div className="col-span-2 text-center py-12 border-2 border-black border-dashed opacity-50 font-mono">
                [NO_PROJECTS_FOUND : ADD_.MD_FILES_TO_SYSTEM]
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
