import { useEffect, useRef } from 'react';
import { MapPin, BookOpen, Users, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profile from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: BookOpen, label: 'Status', value: 'D3 Teknik Informatika, Polibatam' },
  { icon: Code2,    label: 'Stack Utama', value: 'Laravel · PHP · MySQL · Tailwind' },
  { icon: Users,    label: 'Organisasi', value: 'HMTI Polibatam' },
  { icon: MapPin,   label: 'Lokasi', value: 'Batam, Indonesia' },
];

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
      });
      // Photo — from left
      gsap.from(photoRef.current, {
        x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: photoRef.current, start: 'top 85%' },
      });
      // Text — from right
      gsap.from(textRef.current, {
        x: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest mb-2">
            — Siapakah Kapten Ini? —
          </p>
          <h2 className="section-title">Tentang Aku</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-[#D4A017] text-lg">⚓</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Photo */}
          <div ref={photoRef} className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Wanted poster frame */}
              <div className="relative w-64 sm:w-72 lg:w-80">
                {/* Outer frame */}
                <div className="absolute -inset-3 border-2 border-[#D4A017]/30 rounded-lg" />
                <div className="absolute -inset-6 border border-[#D4A017]/15 rounded-lg" />

                {/* Card */}
                <div className="relative bg-gradient-to-b from-[#2A1A0E] to-[#1E1208] border-2 border-[#6F4E37] rounded-lg p-4 shadow-2xl shadow-black/60">
                  {/* WANTED header */}
                  <div className="text-center mb-3">
                    <span className="font-pirate text-[#D4A017] text-xl tracking-[0.3em] uppercase">
                      Wanted
                    </span>
                    <div className="h-px bg-[#6F4E37] mt-1" />
                  </div>

                  {/* Photo */}
                  <div className="relative overflow-hidden rounded">
                    <img
                      src="/images/me1.jpeg"
                      alt="Foto Rangga Surya Saputra"
                      className="w-full aspect-[3/4] object-cover"
                      style={{ filter: 'sepia(0.2) contrast(1.05)' }}
                      onError={(e) => {
                        // Fallback jika gambar belum ada
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className="hidden w-full aspect-[3/4] bg-[#3D2B1A] items-center justify-center rounded">
                      <span className="text-5xl">🏴‍☠️</span>
                    </div>
                  </div>

                  {/* Name below photo */}
                  <div className="text-center mt-3">
                    <p className="font-pirate text-[#F5DEB3] text-sm tracking-widest">
                      KAPTEN RANGGA
                    </p>
                    <p className="text-[#6B5240] text-xs mt-0.5">
                      Full-Stack Dev · Bajak Laut Digital
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Bio & Highlights */}
          <div ref={textRef}>
            <h3 className="font-pirate text-2xl lg:text-3xl text-[#FFD700] mb-4">
              Halo, Aku Rangga 👋
            </h3>
            <p className="text-[#F5DEB3]/80 leading-relaxed mb-4 text-sm lg:text-base">
              Mahasiswa D3 Teknik Informatika di Politeknik Negeri Batam (Polibatam),
              dengan fokus pada <span className="text-[#0D9488] font-medium">pengembangan web full-stack</span> berbasis
              Laravel dan PHP. Aku suka membangun solusi digital yang nyata dan bermanfaat.
            </p>
            <p className="text-[#F5DEB3]/70 leading-relaxed mb-8 text-sm lg:text-base">
              Selain coding, aku aktif di organisasi mahasiswa{' '}
              <span className="text-[#D4A017] font-medium">HMTI (Himpunan Mahasiswa Teknik Informatika)</span>,
              dan punya ketertarikan di bidang networking, cybersecurity, dan machine learning.
              Saat ini sedang mencari kesempatan magang atau posisi entry-level full-stack developer.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#1E1208]/80 border border-[#3D2B1A] hover:border-[#6F4E37] transition-colors duration-200"
                >
                  <div className="mt-0.5 p-1.5 rounded bg-[#0D9488]/15 text-[#0D9488] shrink-0">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-[#6B5240] text-xs uppercase tracking-wider">{label}</p>
                    <p className="text-[#F5DEB3] text-sm font-medium mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Focus areas */}
            <div className="mt-6">
              <p className="text-[#6B5240] text-xs uppercase tracking-wider mb-3">Area Fokus</p>
              <div className="flex flex-wrap gap-2">
                {profile.focus.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 text-xs rounded-full border border-[#D4A017]/30 bg-[#D4A017]/10 text-[#D4A017]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
