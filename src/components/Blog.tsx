import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';
import { getRecentArticles } from '../utils/markdownHelper';

export default function Blog() {
  const recentArticles = getRecentArticles('blog', 3);

  return (
    <section id="blog" className="py-16 md:py-24 border-b-8 border-black bg-[#fdfcf0]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none inline-block">
              <DecryptedText text="THE LOGBOOK" />
            </h2>
            <Link to="/blog" className="font-black uppercase tracking-widest hover:underline decoration-4 underline-offset-8">
              View All Logs &rarr;
            </Link>
          </div>

          <div className="space-y-6">
            {recentArticles.map((article) => (
              <Link 
                key={article.slug} 
                to={`/article/${article.slug}`}
                className="block border-8 border-black p-8 bg-white relative group cursor-pointer hover:-translate-y-2 transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[-8px_8px_0px_rgba(0,0,0,1)]"
              >
                <div className="absolute top-1/2 -translate-y-1/2 right-8 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-12 h-12" />
                </div>
                <div className="font-mono font-black bg-black text-white px-3 py-1 inline-block text-sm mb-6 uppercase tracking-widest">
                  <DecryptedText text={article.metadata.date} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight group-hover:underline decoration-4 underline-offset-4">
                  <DecryptedText text={article.metadata.title} />
                </h3>
                <p className="font-bold opacity-70 text-lg border-l-4 border-black pl-4">
                  {article.metadata.description}
                </p>
              </Link>
            ))}

            {recentArticles.length === 0 && (
              <div className="border-4 border-black border-dashed p-12 text-center opacity-50 font-mono font-bold uppercase">
                [NO RECENT BLOG POSTS WRITTEN]
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
