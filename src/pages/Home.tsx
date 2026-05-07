import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Users,
  BarChart2,
  Search,
  Globe,
  ChevronDown,
  Target,
  Zap,
  Map,
  Package,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'home' | 'services' | 'contact') => void;
}

function useIntersectionObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number; r: number; hue: number; opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.4,
        hue: Math.random() > 0.5 ? 186 : 174, // cyan or teal
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(186, 85%, 65%, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const serviceCards = [
  { icon: Users, title: 'Ideal Customer Profile Research', desc: 'Define exactly who your best-fit customer is before you build pipeline.' },
  { icon: Search, title: 'Account Intelligence and Intent Research', desc: 'Find companies already in a buying cycle before your competitors do.' },
  { icon: BarChart2, title: 'Competitor Intelligence', desc: 'Understand the landscape, find the gaps, and know exactly where you win.' },
  { icon: Globe, title: 'Go-to-Market Strategy Research', desc: 'A complete research foundation for entering a new market, vertical, or geography.' },
];

const steps = [
  { num: '01', icon: Target, title: 'We define the target', desc: 'We align on your ICP, your target market, and what a high-value account looks like for your business.' },
  { num: '02', icon: Search, title: 'I do the research', desc: 'I go deep on hiring patterns, technology signals, tender announcements, leadership changes, and market movements — identifying which accounts are in an active buying cycle right now.' },
  { num: '03', icon: Map, title: 'I score and map', desc: 'Every account is scored by signal strength and urgency. I map the right decision-makers, tier them by buying role, and identify the exact angle to use with each one.' },
  { num: '04', icon: Package, title: 'You get a ready-to-use pack', desc: 'You receive a complete intelligence pack — signal evidence, opportunity score, contact map, and pitch narrative. Your team opens the right conversations immediately.' },
];

export default function Home({ onNavigate }: HomeProps) {
  useIntersectionObserver();

  const scrollToHow = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-pattern section-dark">
        <ParticleCanvas />

        {/* Layered radial glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 35%, rgba(34,211,238,0.08) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 40% at 30% 70%, rgba(45,212,191,0.05) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0A1628)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)' }}>
            <Zap size={12} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">B2B Research & Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
            <span className="text-white">Your next best client</span>
            <br className="hidden sm:block" />
            <span className="text-white"> is already in market.</span>
            <br className="hidden sm:block" />
            <span className="text-gradient-hero"> You just don't know it yet.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            I help B2B sales teams find companies in active buying cycles — and give them everything they need to start the right conversation at the right time.
          </p>

          <button onClick={scrollToHow} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm btn-primary">
            See How I Work
            <ArrowRight size={16} />
          </button>

          <p className="mt-6 text-xs tracking-wide" style={{ color: 'rgba(148,163,184,0.5)' }}>
            Currently working with a limited number of clients · Based in India · Serving US and international markets
          </p>
        </div>

        <button onClick={scrollToHow} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyan-400 transition-colors animate-bounce" aria-label="Scroll down">
          <ChevronDown size={24} />
        </button>
      </section>

      {/* ── Problem Statement ── */}
      <section className="section-mid py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none grid-pattern-fine" />
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.3), transparent)' }} />
        <div className="max-w-3xl mx-auto px-6">
          <div className="animate-in">
            <div className="pl-8 relative">
              <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full" style={{ background: 'linear-gradient(to bottom, #22D3EE, #2DD4BF)' }} />
              <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light mb-4">
                Most B2B sales teams are prospecting into accounts that aren't ready to buy. They work off cold lists, generic intent data, and gut feel. The result is wasted outreach, long cycles, and pipeline that never closes.
              </p>
              <p className="text-xl sm:text-2xl text-white font-medium leading-relaxed">
                The companies that are actually ready to buy right now — mid-transformation, actively evaluating, under pressure to decide — are invisible until someone does the work to find them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-24 section-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-in">
              <div className="inline-block px-2.5 py-1 rounded text-xs font-semibold tracking-widest uppercase mb-5" style={{ background: 'rgba(34,211,238,0.08)', color: '#22D3EE', border: '1px solid rgba(34,211,238,0.15)' }}>
                About
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">What I do</h2>
              <p className="text-slate-400 leading-relaxed mb-4 text-lg font-light">
                I build research-backed intelligence that tells B2B sales teams exactly which companies to target, who to speak to, and what to say.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6 font-light">
                I work with firms in the ERP, consulting, and B2B SaaS space — combining hiring signal analysis, technology monitoring, market research, and competitive intelligence into outputs your team can use immediately. Every engagement is custom. Nothing is scraped or automated.
              </p>
              <p className="text-sm font-semibold text-cyan-400">
                Currently working with a limited number of clients.
              </p>
            </div>

            {/* Data viz graphic */}
            <div className="animate-in relative flex items-center justify-center h-80">
              {/* Outer rings */}
              <div className="absolute w-72 h-72 rounded-full" style={{ border: '1px solid rgba(34,211,238,0.06)' }} />
              <div className="absolute w-56 h-56 rounded-full" style={{ border: '1px solid rgba(34,211,238,0.1)' }} />
              <div className="absolute w-40 h-40 rounded-full" style={{ border: '1px dashed rgba(45,212,191,0.15)' }} />

              {/* Spinning ring */}
              <div className="absolute w-64 h-64 rounded-full animate-spin-slow" style={{ border: '1px solid transparent', background: 'linear-gradient(#0A1628, #0A1628) padding-box, conic-gradient(from 0deg, rgba(34,211,238,0.3), transparent 60%, transparent 80%, rgba(45,212,191,0.2)) border-box' }} />

              {/* Center node */}
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center glow-cyan" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(45,212,191,0.08))', border: '1px solid rgba(34,211,238,0.3)' }}>
                <BarChart2 size={24} className="text-cyan-400" />
              </div>

              {/* Orbiting nodes */}
              {[0, 72, 144, 216, 288].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x = Math.cos(rad) * 96;
                const y = Math.sin(rad) * 96;
                const icons = [Search, Target, Globe, Map, Package];
                const Icon = icons[i];
                return (
                  <div key={deg} className="absolute w-10 h-10 rounded-lg flex items-center justify-center" style={{ transform: `translate(${x}px, ${y}px)`, background: '#0D2137', border: '1px solid rgba(34,211,238,0.15)' }}>
                    <Icon size={14} className="text-teal-400" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 section-mid relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none grid-pattern-fine" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.3), transparent)' }} />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16 animate-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">How it works</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="animate-in relative" style={{ transitionDelay: `${i * 100}ms` }}>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0 -ml-3" style={{ background: 'linear-gradient(to right, rgba(34,211,238,0.2), transparent)' }} />
                  )}
                  <div className="border-glow rounded-xl p-6 h-full flex flex-col card-hover relative z-10" style={{ background: '#0A1628' }}>
                    <div className="text-5xl font-bold mb-4 font-mono leading-none" style={{ color: 'rgba(34,211,238,0.15)' }}>{step.num}</div>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' }}>
                      <Icon size={18} className="text-cyan-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-3 text-sm leading-snug">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light flex-1">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services Teaser ── */}
      <section className="py-24 section-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 animate-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Four ways to work together</h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              From defining your ideal customer to building a full go-to-market research foundation — every service is built around one goal: putting your sales team in front of the right companies at the right time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  onClick={() => onNavigate('services')}
                  className="animate-in text-left rounded-xl p-6 card-hover group relative overflow-hidden"
                  style={{ transitionDelay: `${i * 80}ms`, background: '#0D2137', border: '1px solid rgba(34,211,238,0.08)' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.04), rgba(45,212,191,0.02))' }} />
                  <div className="relative">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-all duration-200" style={{ background: '#112844', border: '1px solid rgba(34,211,238,0.12)' }}>
                      <Icon size={17} className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-200" />
                    </div>
                    <h3 className="text-white text-sm font-semibold mb-2 leading-snug">{card.title}</h3>
                    <p className="text-xs leading-relaxed font-light" style={{ color: '#637899' }}>{card.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Learn more <ArrowRight size={12} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-10 animate-in">
            <button onClick={() => onNavigate('services')} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm btn-outline">
              View All Services <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 section-light relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-fine pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(34,211,238,0.07) 0%, transparent 70%)' }} />
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.05), transparent)' }} />
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'linear-gradient(315deg, rgba(45,212,191,0.05), transparent)' }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center animate-in">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-6" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
            <Zap size={20} className="text-cyan-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight leading-snug">
            If you're building pipeline and want to do it smarter, let's talk.
          </h2>
          <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm btn-primary">
            Get in touch <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
