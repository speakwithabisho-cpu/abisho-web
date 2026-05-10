import { useEffect, useState } from 'react';
import {
  Send,
  Clock,
  Users,
  Globe,
  Shield,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

import { supabase } from '../supabase';

function useIntersectionObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );

    document
      .querySelectorAll('.animate-in')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

const trustItems = [
  {
    icon: Shield,
    text: 'Every engagement is custom researched — nothing is scraped or templated.',
  },
  {
    icon: Users,
    text: 'I work with a limited number of clients at a time.',
  },
  {
    icon: Globe,
    text: 'Based in India. Working with B2B companies across the US and international markets.',
  },
  {
    icon: Clock,
    text: 'Typical response time: within 24 hours.',
  },
];

export default function Contact() {
  useIntersectionObserver();

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    challenge: '',
    source: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('loading');

    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: form.name,
        company: form.company,
        email: form.email,
        challenge: form.challenge,
        source: form.source,
      });

    if (error) {
      console.error(error);
      setStatus('error');
      return;
    }

    setStatus('success');
    setSubmitted(true);

    setForm({
      name: '',
      company: '',
      email: '',
      challenge: '',
      source: '',
    });
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-16 section-mid relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 90%, rgba(34,211,238,0.07) 0%, transparent 70%)',
          }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(34,211,238,0.3), transparent)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              border: '1px solid rgba(34,211,238,0.2)',
              background: 'rgba(34,211,238,0.05)',
            }}
          >
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">
              Contact
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Let's talk
          </h1>

          <p className="text-slate-400 text-lg font-light max-w-xl mx-auto">
            Tell me what you're working on. If it's a good fit, I'll respond
            within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 section-dark">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left Form */}
            <div className="animate-in">
              {submitted ? (
                <div
                  className="rounded-2xl p-10 text-center"
                  style={{
                    background: '#0D2137',
                    border: '1px solid rgba(34,211,238,0.15)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      background: 'rgba(34,211,238,0.08)',
                      border: '1px solid rgba(34,211,238,0.2)',
                    }}
                  >
                    <CheckCircle
                      size={24}
                      className="text-teal-400"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    Message sent
                  </h3>

                  <p className="text-slate-400 font-light text-sm leading-relaxed">
                    Thanks for reaching out. I'll review what you've shared and
                    get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Your name{' '}
                        <span className="text-cyan-400">*</span>
                      </label>

                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Alex Johnson"
                        className="form-input w-full px-4 py-3 rounded-lg text-sm"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Your company{' '}
                        <span className="text-cyan-400">*</span>
                      </label>

                      <input
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="form-input w-full px-4 py-3 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Your email{' '}
                      <span className="text-cyan-400">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="alex@acmecorp.com"
                      className="form-input w-full px-4 py-3 rounded-lg text-sm"
                    />
                  </div>

                  {/* Challenge */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      What are you working on?{' '}
                      <span
                        className="font-normal normal-case tracking-normal"
                        style={{ color: '#334E68' }}
                      >
                        (optional)
                      </span>
                    </label>

                    <textarea
                      name="challenge"
                      value={form.challenge}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your pipeline challenge, target market, or what you're trying to figure out"
                      className="form-input w-full px-4 py-3 rounded-lg text-sm resize-none"
                    />
                  </div>

                  {/* Source */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      How did you find me?{' '}
                      <span className="text-cyan-400">*</span>
                    </label>

                    <select
                      name="source"
                      required
                      value={form.source}
                      onChange={handleChange}
                      className="form-input w-full px-4 py-3 rounded-lg text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>

                      <option value="linkedin">LinkedIn</option>
                      <option value="cold-email">Cold email</option>
                      <option value="referral">Referral</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <div
                      className="flex items-center gap-2 text-sm px-4 py-3 rounded-lg"
                      style={{
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.15)',
                        color: '#f87171',
                      }}
                    >
                      <AlertCircle size={16} />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <div
                          className="w-4 h-4 border-2 rounded-full animate-spin"
                          style={{
                            borderColor: 'rgba(4,13,18,0.3)',
                            borderTopColor: '#040D12',
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={15} />
                      </>
                    )}
                  </button>

                  <p
                    className="text-center text-xs"
                    style={{ color: '#334E68' }}
                  >
                    Prefer email? Reach me directly at{' '}
                    <a
                      href="mailto:abisho@speakwithabisho.com"
                      className="text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      abisho@speakwithabisho.com
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* Right Column */}
            <div className="animate-in lg:pt-2">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-6"
                style={{ color: '#334E68' }}
              >
                What to expect
              </p>

              <div className="space-y-4">
                {trustItems.map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 rounded-xl"
                      style={{
                        background: '#0D2137',
                        border: '1px solid rgba(34,211,238,0.08)',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: 'rgba(34,211,238,0.08)',
                          border: '1px solid rgba(34,211,238,0.15)',
                        }}
                      >
                        <Icon
                          size={14}
                          className="text-teal-400"
                        />
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed font-light">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
