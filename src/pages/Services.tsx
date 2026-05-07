import { useEffect } from 'react';
import {
  ArrowRight,
  FileText,
  RefreshCw,
  HelpCircle,
  CheckCircle,
  Users,
  Search,
  BarChart2,
  Globe,
} from 'lucide-react';

interface ServicesProps {
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
      { threshold: 0.08 }
    );
    document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
      <span className="text-slate-400 text-sm leading-relaxed font-light">{children}</span>
    </li>
  );
}

const services = [
  {
    icon: Users,
    badge: null,
    title: 'Ideal Customer Profile Research',
    positioning: 'Know exactly who to sell to before you spend a single dollar on outreach',
    forYouIf: "Your sales team is prospecting broadly but closing narrowly — or you're entering a new market and need to define your best-fit customer before building pipeline.",
    bullets: [
      'A fully built ICP document covering company firmographics, trigger events, tech stack patterns, and buying signals',
      "Analysis of what your best existing customers have in common",
      "A negative ICP — who looks like a fit but isn't, and why",
      'A one-page ICP summary your sales team uses as a daily targeting filter',
    ],
    delivered: 'A structured report and one-page summary. Delivered within 7 business days.',
  },
  {
    icon: Search,
    badge: 'Core Service',
    title: 'Account Intelligence and Intent Research',
    positioning: 'Find the companies already in a buying cycle — before your competitors do',
    forYouIf: "You want your sales team focused on companies that are actively in market right now — not cold accounts that may buy in 18 months.",
    bullets: [
      'Deep signal research per account — hiring patterns, technology changes, tender events, leadership appointments',
      'An intent score for each account — act this week or next quarter',
      'A tiered contact map — who to approach, their role in the buying decision, and in what order',
      'A custom pitch angle per account — what to say, how to open, what pain to reference',
      'A priority ranking across all accounts so your team knows exactly where to start',
    ],
    delivered: 'A complete, ready-to-use account intelligence pack. Delivered within 5 to 10 business days depending on volume.',
  },
  {
    icon: BarChart2,
    badge: null,
    title: 'Competitor Intelligence',
    positioning: "Know what you're up against — and exactly where you win",
    forYouIf: "You keep losing deals to the same competitors and don't fully understand why — or you're entering a market and need to understand the landscape before you position.",
    bullets: [
      'Structured profiles of your top 5 to 10 competitors — positioning, pricing signals, target markets, strengths, weaknesses',
      'Hiring signal analysis revealing their strategic direction',
      'Customer sentiment from review sites and public sources',
      'A gap map showing where competitors are weak and where you have a genuine advantage',
    ],
    delivered: 'An executive-ready competitor intelligence report. Delivered within 7 to 10 business days.',
  },
  {
    icon: Globe,
    badge: null,
    title: 'Go-to-Market Strategy Research',
    positioning: 'Everything your team needs to enter a market, build pipeline, and win',
    forYouIf: "You're launching into a new market, vertical, or geography and need a complete research foundation — ICP, target accounts, competitive landscape, and entry strategy in one place.",
    bullets: [
      'Full ICP definition for the target market',
      'Market landscape overview — key players, structure, and whitespace opportunities',
      'Account intelligence on the top 15 to 20 priority target accounts',
      'Competitor analysis of the main players in that market',
      'A GTM research summary tying everything together with recommended entry sequencing',
    ],
    delivered: 'A phased research engagement delivered over 3 to 4 weeks.',
  },
];

const engagements = [
  { icon: FileText, title: 'Project Based', desc: 'One service, one deliverable, clear scope. Good if you have a specific research need right now.' },
  { icon: RefreshCw, title: 'Monthly Retainer', desc: 'Ongoing monthly research. I refresh accounts, monitor signals, and add new intelligence every month. Good if you want a continuous edge.' },
  { icon: HelpCircle, title: 'Not Sure Yet', desc: "Tell me what you're working on and I'll tell you which service fits — or whether a custom scope makes more sense." },
];

export default function Services({ onNavigate }: ServicesProps) {
  useIntersectionObserver();

  return (
    <div>
      {/* Page header */}
      <section className="pt-32 pb-16 section-mid relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 90%, rgba(34,211,238,0.07) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.3), transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.05)' }}>
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Research that tells your sales team exactly where to look
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto">
            Four services. All built on deep, custom research. No scraped data. No generic reports.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 section-dark">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="animate-in rounded-2xl overflow-hidden relative group transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms`, background: '#0D2137', border: '1px solid rgba(34,211,238,0.08)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.03), transparent)' }} />
                <div className="p-8 sm:p-10 relative">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' }}>
                      <Icon size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">{svc.title}</h2>
                        {svc.badge && (
                          <span className="px-2.5 py-1 text-xs font-bold rounded-full tracking-wide" style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)', color: '#22D3EE' }}>
                            {svc.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm italic mt-1 font-light">{svc.positioning}</p>
                    </div>
                  </div>

                  <div className="h-px mb-6" style={{ background: 'rgba(34,211,238,0.08)' }} />

                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 text-cyan-400">This is for you if</p>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">{svc.forYouIf}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 text-slate-300">What you get</p>
                    <ul className="space-y-2.5">
                      {svc.bullets.map((b, bi) => <Bullet key={bi}>{b}</Bullet>)}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(34,211,238,0.08)' }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#334E68' }}>Delivered as</p>
                    <p className="text-slate-400 text-sm font-light">{svc.delivered}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-20 section-mid relative">
        <div className="absolute inset-0 grid-pattern-fine pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-12 animate-in">
            <h2 className="text-3xl font-bold text-white tracking-tight">How to engage</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {engagements.map((eng, i) => {
              const Icon = eng.icon;
              return (
                <div key={eng.title} className="animate-in border-glow rounded-xl p-6 card-hover" style={{ transitionDelay: `${i * 100}ms`, background: '#0A1628' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' }}>
                    <Icon size={18} className="text-teal-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-3">{eng.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{eng.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Page CTA */}
      <section className="py-20 section-light relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center animate-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">Not sure where to start?</h2>
          <p className="text-slate-400 mb-8 font-light">Tell me about your pipeline challenge and I'll tell you exactly which service fits.</p>
          <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm btn-primary">
            Let's talk <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
