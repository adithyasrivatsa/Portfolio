import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';
import { getRecentArticles } from '../utils/markdownHelper';

export default function Vision() {
  const recentArticles = getRecentArticles('vision', 3);

  return (
    <section id="vision" className="py-16 md:py-32 bg-black text-white border-b-8 border-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white h-full"></div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start md:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square bg-white text-black p-8 flex flex-col justify-between border-8 border-zinc-500 mb-8 md:mb-0">
              <div className="text-8xl md:text-[12rem] font-black leading-none">
                <DecryptedText text="V" hoverText="T" />
              </div>
              <div className="text-3xl font-black uppercase leading-none border-t-8 border-black pt-4 flex justify-between items-center">
                <DecryptedText text="The Vision" hoverText="The Teleology" />
                <Link to="/vision" className="text-sm border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                  &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">
               <DecryptedText text="Visions" hoverText="FUTURE" />
            </h2>
            
            <div className="flex flex-col gap-6">
              {recentArticles.map(article => (
                <Link 
                  to={`/article/${article.slug}`} 
                  key={article.slug}
                  className="block border-l-4 border-white pl-6 hover:pl-8 transition-all hover:text-zinc-300"
                >
                  <div className="font-mono text-sm opacity-50 mb-2">{article.metadata.date}</div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase leading-none mb-2">
                    <DecryptedText text={article.metadata.title} />
                  </h3>
                  <p className="text-lg opacity-80 leading-tight">
                    {article.metadata.description}
                  </p>
                </Link>
              ))}

              {recentArticles.length === 0 && (
                <div className="border-4 border-white border-dashed p-12 text-center opacity-50 font-mono font-bold uppercase">
                  [NO RECENT VISIONS UPLOADED]
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <div className="h-4 w-32 bg-white"></div>
              <div className="h-4 w-16 bg-zinc-600"></div>
              <div className="h-4 w-8 bg-zinc-800"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
