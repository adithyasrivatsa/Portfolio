import { BookOpen, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-black text-white border-b-8 border-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] mb-6 tracking-tighter">
              Begin the <br /> <DecryptedText text="CONVERSATION" hoverText="DIALOGUE" />
            </h2>
          </div>
          <div className="space-y-6">
            <a 
              href="mailto:archlinuxadithya@gmail.com" 
              className="relative block w-full bg-white text-black p-8 md:p-12 text-3xl md:text-4xl font-black uppercase text-center hover:bg-black hover:text-white transition-all group"
            >
              <div className="absolute inset-0 bg-zinc-800 translate-x-4 translate-y-4 -z-10 border-4 md:border-8 border-white group-hover:translate-x-8 group-hover:translate-y-8 transition-all duration-150"></div>
              <DecryptedText text="Send Message" hoverText="Transmit Intent" />
            </a>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/blog" className="border-4 border-white p-6 flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors cursor-pointer font-black uppercase text-lg">
                <BookOpen size={24} /> <DecryptedText text="BLOG" />
              </Link>
              <Link to="/philosophy" className="border-4 border-white p-6 flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors cursor-pointer font-black uppercase text-lg">
                <Plus size={24} /> <DecryptedText text="SHARDS" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
