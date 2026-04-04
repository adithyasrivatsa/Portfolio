import { motion } from 'motion/react';
import DecryptedText from '../components/DecryptedText';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
          <DecryptedText text="THE LORE" hoverText="ADITHYA" />
        </h1>
        
        <div className="border-l-8 border-black pl-8 space-y-6 text-xl md:text-2xl font-medium">
          <p>
            I am Adithya Srivatsa. I recently turned 18, I live in Hyderabad, and I am a Hindu Brahmin.
          </p>
          <p>
            Currently, I'm an intern at <strong>DRDO–DRDL</strong> (Defence Research & Development Laboratory) while simultaneously enrolled in an AI & ML diploma at the Government Institute of Electronics. I hold an NCC C-Certificate, and outside of code, I'm a musician—I play the Mridangam.
          </p>
          <p className="font-bold">
            I don't fake my interests. I genuinely like technology and AI. 
          </p>
          <p>
            I'm building production-grade agentic RAG architectures while most people my age are trying to figure out what major to pick. But I also know exactly what my failure points are.
          </p>
        </div>
      </motion.div>

      {/* S.W.O.T Matrix */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 bg-black text-white inline-block px-4 py-2">
          S.W.O.T. ANALYSIS
        </h2>
        <p className="font-mono text-sm opacity-50 mb-8 uppercase">[Good: I'm aware. Most people aren't.]</p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Strengths */}
          <div className="border-4 border-black p-8 bg-white paper-shadow hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0px_rgba(0,0,0,1)] transition-all">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2">
              <DecryptedText text="Strengths" />
            </h3>
            <ul className="space-y-4 font-mono font-bold">
              <li>&gt; Unshakable confidence.</li>
              <li>&gt; Liquid-like fluency in English & Telugu.</li>
              <li>&gt; Brave and action-oriented.</li>
              <li>&gt; Elite at managing cliché last-minute pressure situations and pulling it off.</li>
              <li>&gt; Adapts ("liquid-like") to chaos.</li>
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="border-4 border-black p-8 bg-zinc-100 paper-shadow hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0px_rgba(0,0,0,1)] transition-all">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 text-zinc-500">
              <DecryptedText text="Weaknesses" />
            </h3>
            <ul className="space-y-4 font-mono text-zinc-600 line-through decoration-zinc-400 decoration-2">
              <li className="no-underline">&gt; Highly volatile mindset.</li>
              <li className="no-underline">&gt; Interests shift faster than my dedication. I don't stay focused on one thing for long.</li>
              <li className="no-underline">&gt; Low patience for listening to others.</li>
              <li className="no-underline">&gt; I hate unsolicited wisdom or advice.</li>
              <li className="no-underline">&gt; I tend to judge quickly. (I am trying to cure this.)</li>
            </ul>
          </div>

          {/* Opportunities */}
          <div className="border-4 border-black p-8 bg-white paper-shadow hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0px_rgba(0,0,0,1)] transition-all md:col-start-1">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2">
              <DecryptedText text="Opportunities" />
            </h3>
            <ul className="space-y-4 font-mono font-bold">
              <li>&gt; Age = 18. Huge margin to make mistakes without being judged permanently.</li>
              <li>&gt; DRDO Internship gave me massive room to grow and network.</li>
              <li>&gt; High-risk, high-ambition paths are fully backed by parents.</li>
              <li>&gt; Diploma track provides a massive early-specialization headstart.</li>
              <li>&gt; Already grasping and building agentic architectures ahead of the curve.</li>
            </ul>
          </div>

          {/* Threats */}
          <div className="border-4 border-red-900 border-dashed p-8 bg-red-50 text-red-950 paper-shadow hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-8px_8px_0px_rgba(139,32,32,1)] transition-all">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-4 border-red-900 pb-2">
              <DecryptedText text="Threats" />
            </h3>
            <ul className="space-y-4 font-mono font-bold">
              <li>[!] Inconsistency &gt; Talent (My biggest risk).</li>
              <li>[!] Ego blocking learning (Not listening = slow growth).</li>
              <li>[!] Distraction loops (Shiny Object Syndrome).</li>
              <li>[!] Burnout from extreme ambition paired with zero patience.</li>
              <li>[!] Underestimating the power of raw discipline.</li>
            </ul>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
