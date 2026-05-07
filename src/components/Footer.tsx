import { Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 relative" style={{ background: '#040D12', borderTop: '1px solid rgba(34,211,238,0.08)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-light" style={{ color: '#334E68' }}>© 2026 Abisho George R</p>
          <div className="flex items-center gap-6">
            <a href="mailto:abisho@speakwithabisho.com" className="flex items-center gap-2 text-sm font-light transition-colors duration-200 hover:text-cyan-400" style={{ color: '#637899' }}>
              <Mail size={13} />
              abisho@speakwithabisho.com
            </a>
            <a href="https://linkedin.com/in/abishogeorge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-light transition-colors duration-200 hover:text-cyan-400" style={{ color: '#637899' }}>
              <Linkedin size={13} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
