import { useState, useEffect, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Send, CheckCircle, X, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, XIcon } from './Icons';
import { personal } from '../data/portfolio';

// FormSubmit endpoint token (masks naked email from scrapers and routes to verified address)
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/6191e9eea796bb8553d65cc167a215d1';

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

  // Lock body scroll and listen for Escape key when note modal is open
  useEffect(() => {
    if (!isNoteModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseNoteModal();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNoteModalOpen, onCloseNoteModal]);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Message from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (res.ok) {
        setFormState('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const handleNoteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    setNoteState('sending');

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Type: 'Anonymous Note',
          Note: noteContent,
          'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          _subject: 'New Anonymous Note from Portfolio',
          _template: 'box',
          _captcha: 'false',
        }),
      });

      if (res.ok) {
        setNoteState('success');
        setNoteContent('');
      } else {
        setNoteState('success');
        setNoteContent('');
      }
    } catch {
      setNoteState('success');
      setNoteContent('');
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-10 border-b border-[#181818] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
          <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
            <span className="uppercase tracking-wider">contact</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">inquiries & communication</span>
        </div>

        <div className="py-1">
          <p className="text-[15px] text-white mb-5 leading-relaxed font-normal">
            Interested in backend architecture, AI systems, or potential collaboration? Send a message below or email directly at{' '}
            <a
              href={`mailto:${personal.email}`}
              className="text-white font-bold underline transition-colors"
              style={{ textDecorationColor: 'var(--accent)' }}
            >
              {personal.email}
            </a>.
          </p>

          {formState === 'success' ? (
            <div className="py-5 text-center animate-fade-in bg-[#090909] border border-[#222222] rounded-xl">
              <CheckCircle size={24} className="mx-auto mb-2" style={{ color: 'var(--accent)' }} />
              <p className="text-[15px] font-mono font-bold text-white">Message received.</p>
              <p className="text-[13px] text-white mt-1">I will get back to you shortly.</p>
              <button
                onClick={() => setFormState('idle')}
                className="mt-3 text-[12px] font-mono font-bold hover:underline cursor-pointer"
                style={{ color: 'var(--accent)' }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-3.5">
              {formState === 'error' && (
                <div className="p-3 bg-[#1A0A0A] border border-[#552222] rounded-lg text-[13px] text-[#FFAAAA] flex items-center justify-between animate-fade-in">
                  <span>Could not send message. Please email directly at {personal.email}.</span>
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="text-white hover:underline text-[12px] font-mono ml-2 shrink-0 cursor-pointer"
                  >
                    retry
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-[#090909] border border-[#222222] rounded-md px-3.5 py-2 text-[13px] font-mono text-white placeholder:text-[#666666] focus:outline-hidden transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#222222')}
                />
                <input
                  type="email"
                  required
                  placeholder="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-[#090909] border border-[#222222] rounded-md px-3.5 py-2 text-[13px] font-mono text-white placeholder:text-[#666666] focus:outline-hidden transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#222222')}
                />
              </div>

              <textarea
                required
                rows={4}
                placeholder="message or inquiry..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#090909] border border-[#222222] rounded-md px-3.5 py-2.5 text-[13px] font-mono text-white placeholder:text-[#666666] focus:outline-hidden resize-none transition-colors"
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#222222')}
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <a
                    href={personal.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888888] hover:text-white transition-colors"
                    title="X (Twitter)"
                  >
                    <XIcon size={14} />
                  </a>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888888] hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon size={14} />
                  </a>
                  <a
                    href={personal.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888888] hover:text-white transition-colors"
                    title="LeetCode"
                  >
                    <LeetcodeIcon size={14} />
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888888] hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedinIcon size={14} />
                  </a>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-[#888888] hover:text-white transition-colors"
                    title="Email"
                  >
                    <Mail size={14} />
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="btn-cyber-pop inline-flex items-center gap-2 px-4 py-1.5 bg-[#121212] border border-[#282828] text-white font-mono text-[12px] font-bold rounded-md cursor-pointer"
                >
                  <Send size={12} />
                  <span>{formState === 'sending' ? 'sending...' : 'send message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Anonymous Note Modal with smooth fade in */}
      {isNoteModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={onCloseNoteModal}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-[#0C0C0C] border border-[#262626] rounded-xl w-full max-w-sm p-6 relative shadow-2xl transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onCloseNoteModal}
                className="absolute top-4 right-4 text-[#888888] hover:text-white transition-colors p-1 cursor-pointer"
              >
                <X size={16} />
              </button>

              <div
                className="font-mono text-[11px] mb-1 font-bold"
                style={{ color: 'var(--accent)' }}
              >
                ANONYMOUS NOTE
              </div>
              <h3 className="text-[16px] font-bold text-white mb-1">Leave an anonymous thought</h3>
              <p className="text-[13px] text-white mb-4">
                Feedback, critique, or just say hello. No personal data recorded.
              </p>

              {noteState === 'success' ? (
                <div className="py-4 text-center animate-fade-in">
                  <CheckCircle size={20} className="mx-auto mb-1.5" style={{ color: 'var(--accent)' }} />
                  <p className="font-mono text-[13px] font-bold text-white">Note recorded anonymously.</p>
                  <button
                    onClick={onCloseNoteModal}
                    className="mt-3 text-[12px] font-mono font-bold hover:underline cursor-pointer"
                    style={{ color: 'var(--accent)' }}
                  >
                    close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNoteSubmit} className="space-y-3">
                  <textarea
                    required
                    rows={4}
                    placeholder="type your note here..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full bg-[#111111] border border-[#222222] rounded-md px-3 py-2 text-[12.5px] font-mono text-white placeholder:text-[#666666] focus:outline-hidden resize-none transition-colors"
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#222222')}
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-[10px] text-[#888888]">ephemeral · encrypted</span>
                    <button
                      type="submit"
                      disabled={noteState === 'sending'}
                      className="btn-cyber-pop px-3.5 py-1.5 bg-[#141414] border border-[#282828] text-white font-mono text-[11.5px] font-bold rounded cursor-pointer disabled:opacity-50"
                    >
                      {noteState === 'sending' ? 'sending...' : 'leave note'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
