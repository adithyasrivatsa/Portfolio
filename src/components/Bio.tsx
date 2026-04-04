import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';

export default function Bio() {
  return (
    <section className="py-20 md:py-32 border-b-8 border-black bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-center"
        >
          {/* Left Column: Heading */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 border-l-8 border-black pl-6 py-2">
              <DecryptedText text="Operator" hoverText="Identity" />
            </h2>
          </div>

          {/* Right Column: Bio Copy */}
          <div className="space-y-8 font-sans">
            <p className="text-2xl md:text-3xl font-medium leading-tight">
              I am <span className="font-black uppercase">Adithya Srivatsa</span>. I architect production-grade Agentic RAG systems and intelligent autonomy pipelines.
            </p>
            <p className="text-xl md:text-2xl font-medium opacity-80 leading-snug">
              Currently interning at <strong>DRDO–DRDL</strong> while pursuing a specialized Diploma in AI & ML. My focus is on writing robust, resilient automation code ahead of the curve.
            </p>
            
            <div className="pt-8">
              <Link 
                to="/me" 
                className="group relative inline-flex items-center gap-4 bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
              >
                Know More About Me
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
