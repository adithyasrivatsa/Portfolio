import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PhilosophyPage from './pages/PhilosophyPage';
import ArticleView from './pages/ArticleView';
import VisionPage from './pages/VisionPage';
import ProjectsPage from './pages/ProjectsPage';
import ArticlesPage from './pages/ArticlesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import DecryptedText from './components/DecryptedText';

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#fdfcf0] text-black selection:bg-black selection:text-white font-sans flex flex-col">
      <Navigation />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/article/:slug" element={<ArticleView />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t-8 border-black mt-auto bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 font-black uppercase text-sm tracking-tighter">
          <div className="text-center md:text-left">
            <DecryptedText text="ADITHYA" /> <br />
            <span className="opacity-50"><DecryptedText text="Thinker & Creator" /></span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {isHomePage && (
              <a href="#" className="hover:underline underline-offset-8 decoration-4">
                <DecryptedText text="Back to Top" />
              </a>
            )}
            <a href="mailto:archlinuxadithya@gmail.com" className="hover:underline underline-offset-8 decoration-4">
              <DecryptedText text="Contact" />
            </a>
          </div>
          <div className="text-right opacity-30 font-mono text-xs">
            [SYSTEM: ONLINE] <br />
            VERSION 1.0.0
          </div>
        </div>
      </footer>
    </div>
  );
}
