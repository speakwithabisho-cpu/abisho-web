import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';

type Page = 'home' | 'services' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      <Nav currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1">
        {currentPage === 'home' && <Home onNavigate={navigate} />}
        {currentPage === 'services' && <Services onNavigate={navigate} />}
        {currentPage === 'contact' && <Contact />}
      </main>
      <Footer />
    </div>
  );
}
