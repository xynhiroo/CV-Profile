import { useState, useEffect, useRef } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import profile from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_ACCESS_KEY = 'e917dcfb-55e1-48de-9414-1b56970ebf86';

const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    href: profile.socials.github,
    icon: GithubIcon,
    handle: '@xynhiroo',
    color: 'hover:text-[#FFD700] hover:border-[#D4A017]',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: profile.socials.linkedin,
    icon: LinkedinIcon,
    handle: 'Rangga Surya Saputra',
    color: 'hover:text-[#0D9488] hover:border-[#0D9488]',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: profile.socials.instagram,
    icon: InstagramIcon,
    handle: '@voltrhiro',
    color: 'hover:text-[#FFD700] hover:border-[#D4A017]',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
      });
      gsap.from(leftRef.current, {
        x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 85%' },
      });
      gsap.from(rightRef.current, {
        x: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Name: required, min 2 chars
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Nama harus diisi dan minimal 2 karakter.';
    }

    // Email: required, valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Alamat email tidak valid (contoh: kapten@lautan.com).';
    }

    // Message: required, min 10 chars
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Pesan harus diisi dan minimal 10 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? (checked ? 'true' : '') : value;
    setFormData((prev) => ({ ...prev, [name]: val }));

    // Clear error on change if field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!validate()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Build FormData for Web3Forms API submission
      const bodyData = new FormData();
      bodyData.append('access_key', WEB3FORMS_ACCESS_KEY);
      bodyData.append('name', formData.name.trim());
      bodyData.append('email', formData.email.trim());
      bodyData.append('message', formData.message.trim());
      bodyData.append('botcheck', formData.botcheck || '');
      bodyData.append('subject', `[Kapten Rangga Portfolio] Pesan baru dari ${formData.name.trim()}`);
      bodyData.append('from_name', 'Kapten Rangga Botol Post');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: bodyData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', botcheck: '' });
        setErrors({});
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Gagal mengirim pesan botol. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      setStatus('error');
      setErrorMessage('Terjadi gangguan jaringan saat mengirim pesan. Coba beberapa saat lagi.');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest mb-2">
            — Sampaikan Pesanmu —
          </p>
          <h2 className="section-title">Pesan dalam Botol</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-[#D4A017] text-lg">📜</span>
          </div>
          <p className="text-[#6B5240] text-sm mt-4 max-w-md mx-auto">
            Punya proyek menarik, tawaran magang, atau sekadar ingin menyapa?
            Kirimkan pesanmu ke kapal ini!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Social Links */}
          <div ref={leftRef} className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-pirate text-xl text-[#FFD700] mb-2">Temukan Aku Di</h3>

            {socialLinks.map(({ id, label, href, icon: Icon, handle, color }) => (
              <a
                key={id}
                id={`social-${id}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 rounded-xl border border-[#3D2B1A] bg-[#160E08] text-[#F5DEB3]/60 transition-all duration-200 ${color} hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40`}
              >
                <div className="p-2 rounded-lg bg-[#1E1208] border border-[#3D2B1A]">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">{label}</p>
                  <p className="text-sm mt-0.5">{handle}</p>
                </div>
              </a>
            ))}

            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#3D2B1A] bg-[#160E08] text-[#F5DEB3]/60">
              <div className="p-2 rounded-lg bg-[#1E1208] border border-[#3D2B1A]">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider">Email Direct</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm mt-0.5 text-[#F5DEB3]/80 hover:text-[#FFD700] transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div ref={rightRef} className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-xl border border-[#3D2B1A] bg-[#160E08] relative">
              <h3 className="font-pirate text-xl text-[#FFD700] mb-6">Tulis Pesanmu</h3>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#0D9488]/15 border border-[#0D9488]/40 flex items-center justify-center text-[#14B8A6] animate-bounce">
                    <CheckCircle size={36} />
                  </div>
                  <div>
                    <p className="font-pirate text-2xl text-[#FFD700] mb-1">
                      Pesan dalam botol sudah terkirim! 🏴‍☠️
                    </p>
                    <p className="text-[#F5DEB3]/75 text-sm max-w-md mx-auto">
                      Pesanmu telah hanyut ke dermaga Kapten Rangga. Aku akan membaca dan membalas secepatnya!
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-gold text-sm mt-2"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Honeypot Spam Protection (Hidden from real users) */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    checked={!!formData.botcheck}
                    onChange={handleChange}
                  />

                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5240] mb-2">
                      Nama Kapten <span className="text-[#D4A017]">*</span>
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5240]" />
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Siapa namamu?"
                        className={`w-full pl-9 pr-4 py-3 rounded-lg bg-[#1E1208] border ${
                          errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-[#3D2B1A] focus:border-[#D4A017]'
                        } text-[#F5DEB3] placeholder-[#6B5240] text-sm focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5240] mb-2">
                      Email <span className="text-[#D4A017]">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5240]" />
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className={`w-full pl-9 pr-4 py-3 rounded-lg bg-[#1E1208] border ${
                          errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-[#3D2B1A] focus:border-[#D4A017]'
                        } text-[#F5DEB3] placeholder-[#6B5240] text-sm focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5240] mb-2">
                      Pesan <span className="text-[#D4A017]">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare size={14} className="absolute left-3 top-3.5 text-[#6B5240]" />
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tulis pesanmu di sini (minimal 10 karakter)..."
                        className={`w-full pl-9 pr-4 py-3 rounded-lg bg-[#1E1208] border ${
                          errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-[#3D2B1A] focus:border-[#D4A017]'
                        } text-[#F5DEB3] placeholder-[#6B5240] text-sm focus:outline-none transition-colors resize-none`}
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* General Error Message with Retry */}
                  {status === 'error' && (
                    <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-red-200 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-red-400 shrink-0" />
                        <span>{errorMessage || 'Gagal mengirim pesan botol. Periksa koneksimu.'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-900/60 hover:bg-red-800/80 border border-red-500/60 text-white font-medium text-xs transition-colors shrink-0"
                      >
                        <RefreshCw size={12} />
                        Coba Lagi
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-gold justify-center disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="animate-spin text-base">⚓</span>
                        Hanyutkan Botol...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Kirim Pesan Botol
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
