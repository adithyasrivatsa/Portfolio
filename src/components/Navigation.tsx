import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';

export default function Navigation() {
  return (
    <nav className="border-b-8 border-black sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-black tracking-tighter uppercase">
          <DecryptedText text="ADITHYA" />
        </Link>
        <div className="hidden md:flex gap-8 font-black uppercase text-sm tracking-widest">
          <Link to="/philosophy" className="hover:underline decoration-8 underline-offset-8">
            <DecryptedText text="Thinking" hoverText="Philosophy" />
          </Link>
          <Link to="/vision" className="hover:underline decoration-8 underline-offset-8">
            <DecryptedText text="Vision" hoverText="Teleology" />
          </Link>
          <Link to="/projects" className="hover:underline decoration-8 underline-offset-8">
            <DecryptedText text="Projects" hoverText="Endeavors" />
          </Link>
          <Link to="/blog" className="hover:underline decoration-8 underline-offset-8">
            <DecryptedText text="Blog" hoverText="Journal" />
          </Link>
          <Link to="/contact" className="hover:underline decoration-8 underline-offset-8">
            <DecryptedText text="Conversations" hoverText="Dialogue" />
          </Link>
        </div>
        <div className="flex gap-6 font-black uppercase text-xs">
          <a href="https://github.com/Hundred-Trillion" target="_blank" rel="noreferrer" className="hover:underline">Github</a>
          <a href="https://www.linkedin.com/in/adithyasrivatsa/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
        </div>
      </div>
    </nav>
  );
}
