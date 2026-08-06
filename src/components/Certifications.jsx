import { useEffect, useRef } from 'react';
import { Award, ExternalLink, ShieldCheck, Scroll } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import certifications from '../data/certifications';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
      });
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-24 px-4 bg-[#160E08]/60 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest mb-2">
            — Pengakuan & Pencapaian —
          </p>
          <h2 className="section-title">Piagam Kapten</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-[#D4A017] text-lg">📜</span>
          </div>
          <p className="text-[#6B5240] text-sm mt-4 max-w-md mx-auto">
            Sertifikasi resmi, lisensi, dan piagam kompetensi yang dikumpulkan sepanjang pelayaran.
          </p>
        </div>

        {/* Content Container */}
        <div ref={contentRef}>
          {certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-xl border border-[#3D2B1A] bg-[#160E08] hover:border-[#D4A017]/50 transition-all duration-300 flex flex-col justify-between gap-4 card-hover group"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded border uppercase tracking-wider font-semibold ${
                          cert.type === 'physical'
                            ? 'bg-[#6F4E37]/20 text-[#F5DEB3] border-[#6F4E37]/40'
                            : 'bg-[#0D9488]/15 text-[#14B8A6] border-[#0D9488]/30'
                        }`}
                      >
                        {cert.type === 'physical' ? '📜 Fisik' : '💻 Digital'}
                      </span>
                      <span className="text-xs text-[#6B5240] font-mono">{cert.date}</span>
                    </div>

                    <h3 className="font-pirate text-xl text-[#F5DEB3] group-hover:text-[#FFD700] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[#6B5240] flex items-center gap-1.5 font-medium">
                      <ShieldCheck size={14} className="text-[#0D9488]" />
                      {cert.issuer}
                    </p>
                  </div>

                  {cert.credentialUrl && (
                    <div className="pt-3 border-t border-[#3D2B1A] flex justify-end">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#D4A017] hover:text-[#FFD700] font-medium transition-colors"
                      >
                        Lihat Kredensial
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Empty State Container */
            <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-2xl border border-[#3D2B1A] bg-[#160E08]/90 text-center flex flex-col items-center gap-4 relative overflow-hidden shadow-xl">
              {/* Decorative subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4A017]/5 via-transparent to-transparent pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-[#1E1208] border border-[#3D2B1A] flex items-center justify-center text-[#D4A017] shadow-inner">
                <Scroll size={32} />
              </div>

              <div>
                <h3 className="font-pirate text-2xl text-[#FFD700] mb-2">
                  Sertifikat akan segera ditambahkan ⚓
                </h3>
                <p className="text-[#F5DEB3]/70 text-sm leading-relaxed max-w-md mx-auto">
                  Piagam kelayakan pelayaran &amp; sertifikasi kompetensi sedang dalam proses dokumentasi dan pengumpulan.
                </p>
              </div>

              <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1208] border border-[#3D2B1A] text-xs text-[#6B5240]">
                <Award size={14} className="text-[#0D9488]" />
                <span>Status: Dalam Proses Dokumentasi</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
