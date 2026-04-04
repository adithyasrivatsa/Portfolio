import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';
import { getRecentArticles } from '../utils/markdownHelper';

export default function Philosophy() {
  const recentArticles = getRecentArticles('philosophy', 3);

  return (
    <section id="philosophy" className="py-16 md:py-24 border-b-8 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
                <DecryptedText text="THINKING" hoverText="PHILOSOPHY" />
              </h2>
              <p className="text-xl md:text-2xl font-bold uppercase border-l-4 border-black pl-4">Shards of thought, essays, and perspective.</p>
            </div>
            <Link to="/philosophy" className="font-black uppercase tracking-widest hover:underline decoration-4 underline-offset-8">
              View All Thoughts &rarr;
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article, i) => {
              const CustomTag = article.metadata.customLink ? 'a' : Link;
              const linkProps = article.metadata.customLink 
                ? { href: article.metadata.customLink } 
                : { to: `/article/${article.slug}` };

              return (
              <CustomTag 
                key={article.slug} 
                {...linkProps as any}
                className="group relative border-8 border-black p-8 bg-zinc-50 cursor-pointer min-h-[350px] flex flex-col justify-between hover:-translate-y-2 hover:translate-x-2 transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[-8px_8px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <div className="text-5xl mb-6 opacity-20 font-black">
                    <DecryptedText text={`0${i+1}`} />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-4 leading-tight group-hover:underline decoration-4 underline-offset-4">
                    <DecryptedText text={article.metadata.title} />
                  </h3>
                  <p className="font-bold opacity-80 leading-snug">
                    {article.metadata.description}
                  </p>
                </div>
                <div className="mt-8 flex justify-between items-end">
                  <span className="font-mono text-sm opacity-50 font-bold uppercase">{article.metadata.date}</span>
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                    <ArrowRight />
                  </div>
                </div>
              </CustomTag>
              );
            })}
            
            {recentArticles.length === 0 && (
              <div className="col-span-full border-4 border-black border-dashed p-12 text-center opacity-50 font-mono font-bold uppercase">
                [NO RECENT THOUGHTS WRITTEN]
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
