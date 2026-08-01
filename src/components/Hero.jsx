import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import profile from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

// Kompas SVG interaktif — berputar saat hover & mengikuti scroll progress
function CompassRose() {
  const compassRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !compassRef.current) return;

    // Rotasi idle floating
    gsap.to(compassRef.current, {
      rotation: 360,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    // Scroll-driven rotation boost
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        gsap.to(compassRef.current, {
          rotation: `+=${self.getVelocity() / 60}`,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={compassRef}
      className="relative w-40 h-40 opacity-20 select-none pointer-events-none"
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="100" cy="100" r="95" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="6 4"/>
        <polygon points="100,10 108,90 100,80 92,90" fill="#FFD700"/>
        <polygon points="100,190 108,110 100,120 92,110" fill="#F5DEB3" opacity="0.6"/>
        <polygon points="10,100 90,92 80,100 90,108" fill="#F5DEB3" opacity="0.6"/>
        <polygon points="190,100 110,92 120,100 110,108" fill="#F5DEB3" opacity="0.6"/>
        <circle cx="100" cy="100" r="12" fill="#D4A017" opacity="0.8"/>
        <circle cx="100" cy="100" r="6" fill="#FFD700"/>
        <text x="97" y="28" fill="#FFD700" fontSize="14" fontFamily="serif" fontWeight="bold">N</text>
        <text x="97" y="183" fill="#F5DEB3" fontSize="12" fontFamily="serif" opacity="0.7">S</text>
        <text x="22" y="104" fill="#F5DEB3" fontSize="12" fontFamily="serif" opacity="0.7">W</text>
        <text x="174" y="104" fill="#F5DEB3" fontSize="12" fontFamily="serif" opacity="0.7">E</text>
        <line x1="30" y1="30" x2="170" y2="170" stroke="#D4A017" strokeWidth="0.5" opacity="0.4"/>
        <line x1="170" y1="30" x2="30" y2="170" stroke="#D4A017" strokeWidth="0.5" opacity="0.4"/>
      </svg>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Entrance sequence
      tl.from(badgeRef.current, { y: -20, opacity: 0, duration: 0.6 })
        .from(headingRef.current, { y: 40, opacity: 0, duration: 0.9 }, '-=0.3')
        .from(subheadingRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
        .from(taglineRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from(socialsRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(scrollRef.current, { opacity: 0, duration: 0.5 }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Background — peta.jpg dengan sepia dark filter */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/peta.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.7) brightness(0.15) saturate(0.8)',
        }}
      />
      {/* Colour accent overlay — teal & gold glow */}
      <div className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(13,148,136,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(212,160,23,0.10) 0%, transparent 50%)
          `,
        }}
      />
      {/* Dark vignette — top light, bottom full dark */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#160E08]/40 via-transparent to-[#160E08]" />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A017]/60 to-transparent z-10" />

      {/* Compass — top-right, rotating */}
      <div id="compass-hero" className="absolute top-24 right-8 lg:right-16 z-10">
        <CompassRose />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A017]/40 bg-[#D4A017]/10 text-[#D4A017] text-xs font-medium tracking-widest uppercase mb-6">
          <span>⚓</span>
          <span>Kapten Rangga — Kutu Buku Lautan Digital</span>
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-pirate text-5xl sm:text-6xl lg:text-8xl text-[#FFD700] leading-tight mb-4"
          style={{ textShadow: '0 0 40px rgba(212,160,23,0.5), 0 2px 4px rgba(0,0,0,0.8)' }}
        >
          Rangga Surya<br />
          <span className="text-[#F5DEB3]">Saputra</span>
        </h1>

        {/* Sub-heading */}
        <p ref={subheadingRef} className="text-lg sm:text-xl text-[#F5DEB3]/80 font-medium mb-2">
          D3 Teknik Informatika · Politeknik Negeri Batam
        </p>
        <p ref={taglineRef} className="text-sm sm:text-base text-[#0D9488] font-medium tracking-wide mb-10">
          Full-Stack Developer · Laravel · PHP · MySQL · Tailwind CSS
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#projects" className="btn-gold w-full sm:w-auto justify-center">
            🗺️ Lihat Harta Karun
          </a>
          <a href="#contact" className="btn-outline w-full sm:w-auto justify-center">
            📜 Kirim Pesan Botol
          </a>
        </div>

        {/* Social quick links */}
        <div ref={socialsRef} className="flex justify-center items-center gap-5 mt-10">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-[#3D2B1A] bg-[#1E1208]/60 text-[#F5DEB3]/60 hover:text-[#FFD700] hover:border-[#D4A017] hover:scale-110 transition-all duration-200"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-[#3D2B1A] bg-[#1E1208]/60 text-[#F5DEB3]/60 hover:text-[#0D9488] hover:border-[#0D9488] hover:scale-110 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={profile.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-[#3D2B1A] bg-[#1E1208]/60 text-[#F5DEB3]/60 hover:text-[#FFD700] hover:border-[#D4A017] hover:scale-110 transition-all duration-200"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#F5DEB3]/30 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
