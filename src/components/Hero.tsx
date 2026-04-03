import { motion } from 'motion/react';
import DecryptedText from './DecryptedText';

export default function Hero() {
  return (
    <>
      <section className="border-b-8 border-black py-12 md:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <h1 className="text-[12vw] sm:text-5xl md:text-[9rem] font-black uppercase leading-[0.8] tracking-tighter mb-4 break-words">
              <DecryptedText text="ART" hoverText="AESTHETICS" speed={0.2} /> <br />
              <span className="text-outline-black text-transparent" style={{ WebkitTextStroke: '2px black' }}>
                <DecryptedText text="LOGIC" hoverText="REASON" speed={0.2} />
              </span> <br />
              <DecryptedText text="CHARACTER" hoverText="ETHOS" speed={0.2} />
            </h1>
            <div className="max-w-3xl border-l-[4px] md:border-l-[10px] border-black pl-4 md:pl-6 py-1">
              <p className="text-base sm:text-lg md:text-2xl font-black uppercase leading-tight italic">
                Adithya: A creator navigating the void between <span className="bg-black text-white px-2"><DecryptedText text="Philosophy" /></span> and <span className="bg-black text-white px-2 mt-1 inline-block"><DecryptedText text="Creation" /></span>.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[12rem] font-black opacity-5 pointer-events-none select-none uppercase">
          <DecryptedText text="Thinking" />
        </div>
      </section>

      {/* Marquee - Ultra Thick */}
      <div className="bg-black text-white py-4 overflow-hidden whitespace-nowrap border-b-8 border-black">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="inline-block text-2xl font-black uppercase tracking-[0.2em]"
        >
          NIETZSCHE • DA VINCI • TURING • KANT • PICASSO • LOVELACE • HEIDEGGER • WARHOL •&nbsp;
          NIETZSCHE • DA VINCI • TURING • KANT • PICASSO • LOVELACE • HEIDEGGER • WARHOL •&nbsp;
        </motion.div>
      </div>
    </>
  );
}
