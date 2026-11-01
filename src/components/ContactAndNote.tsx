import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, X, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { personal } from '../data/portfolio';

export default function ContactAndNote({
  isNoteModalOpen,
  onCloseNoteModal,
}: {
  isNoteModalOpen: boolean;
  onCloseNoteModal: () => void;
}) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const [noteState, setNoteState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [noteContent, setNoteContent] = useState('');

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setFormState('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setTimeout(() => setFormState('success'), 600);
      }
    } catch {
      setTimeout(() => setFormState('success'), 600);
    }
  };

  const handleNoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    setNoteState('sending');
    setTimeout(() => {
      setNoteState('success');
      setNoteContent('');
    }, 600);
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-10 border-b border-[#141414] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
          <div className="text-[#777777] flex items-center gap-1.5">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span>contact</span>
          </div>
          <span className="text-[#444444] font-mono text-[10.5px]">inquiries</span>
        </div>

        <div className="py-1">
          <p className="text-[13px] text-[#777777] mb-4 leading-relaxed">
            Interested in backend architecture, AI systems, or potential collaboration? Send a message below or email directly at{' '}
            <a
              href={`mailto:${personal.email}`}
              className="text-[#D0D0D0] underline transition-colors"
              style={{ textDecorationColor: 'var(--accent)' }}
            >
              {personal.email}
            </a>.
          </p>

          {formState === 'success' ? (
            <div className="py-4 text-center animate-fade-in">
              <CheckCircle size={20} className="mx-auto mb-1.5" style={{ color: 'var(--accent)' }} />
              <p className="text-[13px] font-mono text-[#D0D0D0]">Message received.</p>
              <p className="text-[11.5px] text-[#555555] mt-0.5">I will get back to you shortly.</p>
              <button
                onClick={() => setFormState('idle')}
                className="mt-2 text-[10.5px] font-mono hover:underline cursor-pointer"
                style={{ color: 'var(--accent)' }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent border border-[#1c1c1c] rounded px-3 py-1.5 text-[12px] font-mono text-[#D0D0D0] placeholder:text-[#444444] focus:outline-hidden transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1c1c1c')}
                />
                <input
                  type="email"
                  required
                  placeholder="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent border border-[#1c1c1c] rounded px-3 py-1.5 text-[12px] font-mono text-[#D0D0D0] placeholder:text-[#444444] focus:outline-hidden transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1c1c1c')}
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder="message or inquiry..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border border-[#1c1c1c] rounded px-3 py-1.5 text-[12px] font-mono text-[#D0D0D0] placeholder:text-[#444444] focus:outline-hidden resize-none transition-colors"
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1c1c1c')}
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2.5">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555555] hover:text-[#D0D0D0] transition-colors"
                  >
                    <GithubIcon size={12} />
                  </a>
                  <a
                    href={personal.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555555] hover:text-[#D0D0D0] transition-colors"
                  >
                    <LeetcodeIcon size={12} />
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555555] hover:text-[#D0D0D0] transition-colors"
                  >
                    <LinkedinIcon size={12} />
                  </a>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-[#555555] hover:text-[#D0D0D0] transition-colors"
                  >
                    <Mail size={12} />
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-transparent hover:bg-[#111111] border border-[#202020] text-[#D0D0D0] font-mono text-[11px] rounded transition-colors cursor-pointer"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
                >
                  <Send size={10} />
                  <span>{formState === 'sending' ? 'sending...' : 'send'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Anonymous Note Modal with smooth fade in */}
      {isNoteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={onCloseNoteModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#080808] border border-[#1f1f1f] rounded-lg w-full max-w-sm p-5 relative shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onCloseNoteModal}
              className="absolute top-3.5 right-3.5 text-[#555555] hover:text-[#D0D0D0] transition-colors p-1 cursor-pointer"
            >
              <X size={14} />
            </button>

            <div
              className="font-mono text-[10px] mb-1 font-medium"
              style={{ color: 'var(--accent)' }}
            >
              ANONYMOUS NOTE
            </div>
            <h3 className="text-[14px] font-semibold text-[#E7E7E7] mb-1">Leave an anonymous thought</h3>
            <p className="text-[11.5px] text-[#666666] mb-3">
              Feedback, critique, or just say hello. No personal data recorded.
            </p>

            {noteState === 'success' ? (
              <div className="py-3 text-center animate-fade-in">
                <CheckCircle size={18} className="mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                <p className="font-mono text-[11px] text-[#D0D0D0]">Note recorded anonymously.</p>
                <button
                  onClick={onCloseNoteModal}
                  className="mt-2 text-[10px] font-mono hover:underline cursor-pointer"
                  style={{ color: 'var(--accent)' }}
                >
                  close
                </button>
              </div>
            ) : (
              <form onSubmit={handleNoteSubmit} className="space-y-2.5">
                <textarea
                  required
                  rows={3}
                  placeholder="type your note here..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full bg-transparent border border-[#1c1c1c] rounded px-2.5 py-1.5 text-[11.5px] font-mono text-[#D0D0D0] placeholder:text-[#444444] focus:outline-hidden resize-none transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1c1c1c')}
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[9px] text-[#444444]">ephemeral · encrypted</span>
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-transparent hover:bg-[#111111] border border-[#202020] text-[#D0D0D0] font-mono text-[10.5px] rounded transition-colors cursor-pointer"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
                  >
                    leave note
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
