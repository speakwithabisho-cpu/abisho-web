import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavProps {
  currentPage: 'home' | 'services' | 'contact';
  onNavigate: (page: 'home' | 'services' | 'contact') => void;
}

export default function Nav({ currentPage, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPage]);

  const links: {
    label: string;
    page: 'home' | 'services' | 'contact';
  }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-cyan-500/10 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
      style={
        scrolled
          ? {
              backgroundColor:
                'rgba(10, 22, 40, 0.88)',
            }
          : undefined
      }
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200"
          >
            <img
              src="/logo.png"
              alt="Abisho Logo"
              className="w-9 h-9 object-contain"
            />

            <span className="text-xl font-bold text-white tracking-tight">
              Abisho
            </span>
          </button>

          {/* Desktop links + CTA */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  currentPage === page
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}

                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-200 ${
                    currentPage === page
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}

            <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                currentPage === 'contact'
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              } hidden`}
            >
              Contact

              <span
                className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-200 ${
                  currentPage === 'contact'
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            {/* CTA */}
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold btn-primary"
            >
              Get in touch

              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? 'max-h-56 opacity-100 mt-4'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className="flex flex-col gap-1 pb-4 border-t pt-4"
            style={{
              borderColor:
                'rgba(34,211,238,0.1)',
            }}
          >
            {links.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`text-left px-2 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                  currentPage === page
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => onNavigate('contact')}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold btn-primary"
            >
              Get in touch

              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
