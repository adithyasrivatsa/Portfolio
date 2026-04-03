import { motion } from 'motion/react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';
import { getRecentArticles } from '../utils/markdownHelper';

export default function Projects() {
  const recentArticles = getRecentArticles('projects', 3);

  return (
    <section id="projects" className="py-16 md:py-24 border-b-8 border-black bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter">
            <DecryptedText text="DECLARATION" hoverText="MANIFESTO" /> <br /> & <DecryptedText text="PROJECTS" hoverText="WORKS" />
          </h2>
          <Link to="/projects" className="font-black text-base md:text-xl uppercase border-4 md:border-8 border-black px-6 py-3 bg-black text-white hover:bg-white hover:text-black transition-colors">
            <DecryptedText text="View All Endeavors" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 gap-y-16">
          {recentArticles.map((article, i) => (
            <motion.div 
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="relative border-8 border-black p-8 flex flex-col justify-between min-h-[450px] bg-white group hover:bg-black hover:text-white transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-zinc-200 translate-x-4 translate-y-4 -z-10 border-8 border-black group-hover:translate-x-6 group-hover:translate-y-6 group-hover:bg-zinc-800 transition-all duration-300 pointer-events-none"></div>
              
              <div>
                <div className="text-2xl font-black mb-8 border-b-4 border-black group-hover:border-white pb-1 inline-block">
                  <DecryptedText text={`0${i+1}`} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-black uppercase mb-4 leading-none">
                  <DecryptedText text={article.metadata.title} />
                </h3>
                <p className="text-lg font-bold opacity-90 leading-tight">
                  <DecryptedText text={article.metadata.description} />
                </p>
              </div>
              
              <div className="mt-8">
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.metadata.tags?.map(tag => (
                    <span key={tag} className="text-xs font-black border-2 md:border-4 border-black group-hover:border-white px-2 py-1 uppercase bg-zinc-100 group-hover:bg-zinc-800">
                      <DecryptedText text={tag} />
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/article/${article.slug}`}
                  className="w-full py-4 border-4 border-black group-hover:border-white font-black uppercase flex items-center justify-center gap-3 bg-white text-black group-hover:bg-white group-hover:text-black transition-all active:scale-95"
                >
                  <DecryptedText text="Read Project" /> <Eye className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}

          {recentArticles.length === 0 && (
            <div className="col-span-3 border-4 border-black border-dashed p-12 text-center opacity-50 font-mono font-bold uppercase">
              [NO RECENT PROJECTS UPLOADED]
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
