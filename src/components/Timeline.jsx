import { useEffect, useRef } from 'react';
import { GraduationCap, Users, Code2, Anchor } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    id: 1,
    year: '2023',
    period: '2023 — Sekarang',
    title: 'D3 Teknik Informatika',
    org: 'Politeknik Negeri Batam (Polibatam)',
    description: 'Menempuh pendidikan D3 Teknik Informatika dengan fokus pada pengembangan web full-stack. Aktif dalam proyek akademik, PBL (Project-Based Learning), dan kegiatan organisasi mahasiswa.',
    icon: GraduationCap,
    type: 'education',
    tags: ['Laravel', 'PHP', 'MySQL', 'Networking'],
  },
  {
    id: 2,
    year: '2024',
    period: '2024 — Sekarang',
    title: 'Anggota Aktif HMTI',
    org: 'Himpunan Mahasiswa Teknik Informatika, Polibatam',
    description: 'Aktif berpartisipasi dalam kegiatan dan kepanitiaan HMTI. Terlibat dalam pengembangan IETECS Photobooth App sebagai bagian dari event IETECS.',
    icon: Users,
    type: 'organization',
    tags: ['Kepanitiaan', 'Event Organizer', 'IETECS'],
  },
  {
    id: 3,
    year: '2024',
    period: 'Semester 3–4',
    title: 'CosRent — Proyek PBL',
    org: 'Tim 5 Orang, Polibatam',
    description: 'Memimpin backend development sistem rental cosplay berbasis web sebagai proyek PBL kelompok. Stack: Laravel, MySQL, Tailwind CSS.',
    icon: Code2,
    type: 'project',
    tags: ['Laravel', 'MySQL', 'Backend Lead', 'PBL'],
  },
  {
    id: 4,
    year: '2025',
    period: '2025 — Sekarang',
    title: 'Portfolio v2 — Kapten Rangga',
    org: 'Solo Project',
    description: 'Membangun ulang website portfolio pribadi dari vanilla HTML/CSS/JS menjadi React + Vite + Tailwind + GSAP. Sebuah proyek yang menunjukkan kemampuan full-stack dan desain modern.',
    icon: Anchor,
    type: 'project',
    tags: ['React', 'Vite', 'GSAP', 'Lenis'],
  },
];

const typeStyles = {
  education:    { dot: 'bg-[#0D9488] border-[#0D9488]',    label: 'text-[#0D9488]' },
  organization: { dot: 'bg-[#D4A017] border-[#D4A017]',    label: 'text-[#D4A017]' },
  project:      { dot: 'bg-[#8B6347] border-[#8B6347]',    label: 'text-[#F5DEB3]' },
};

export default function Timeline() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
      });
      // Each timeline item animates as it scrolls into view
      const items = sectionRef.current?.querySelectorAll('.timeline-item');
      items?.forEach((item, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(item, {
          x: fromLeft ? -50 : 50,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 87%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="py-24 px-4 bg-[#0F0904]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest mb-2">
            — Jejak Layar —
          </p>
          <h2 className="section-title">Peta Perjalanan</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-[#D4A017] text-lg">🧭</span>
          </div>
          <p className="text-[#6B5240] text-sm mt-4">
            Milestone pendidikan, organisasi, dan proyek yang telah aku lalui.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#3D2B1A] via-[#6F4E37] to-[#3D2B1A]" />

          <div className="flex flex-col gap-12">
            {timelineData.map((item, index) => {
              const { dot, label } = typeStyles[item.type] || typeStyles.project;
              const isLeft = index % 2 === 0;
              const Icon = item.icon;

              return (
                <div key={item.id} className="timeline-item relative flex items-start gap-4 md:gap-0">
                  {/* Mobile: left line */}
                  <div className="md:hidden flex flex-col items-center mr-4 shrink-0">
                    <div className={`w-3 h-3 rounded-full border-2 ${dot} shrink-0 mt-1.5`} />
                    {index < timelineData.length - 1 && (
                      <div className="flex-1 w-px bg-[#3D2B1A] mt-1 min-h-[3rem]" />
                    )}
                  </div>

                  {/* Desktop layout */}
                  <div className={`hidden md:flex w-full items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content card */}
                    <div className="w-5/12">
                      <div
                        className={`relative p-5 rounded-xl border border-[#3D2B1A] bg-[#160E08] hover:border-[#6F4E37] transition-colors duration-300 ${isLeft ? 'mr-8' : 'ml-8'}`}
                      >
                        {/* Year badge */}
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#3D2B1A] text-[#D4A017] mb-3">
                          {item.period}
                        </span>

                        <div className="flex items-start gap-3 mb-2">
                          <div className="p-1.5 rounded-lg bg-[#1E1208] border border-[#3D2B1A] shrink-0">
                            <Icon size={14} className={label} />
                          </div>
                          <div>
                            <h3 className="text-[#F5DEB3] font-semibold text-sm leading-tight">{item.title}</h3>
                            <p className="text-[#6B5240] text-xs mt-0.5">{item.org}</p>
                          </div>
                        </div>

                        <p className="text-[#F5DEB3]/60 text-xs leading-relaxed mb-3">{item.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-[#3D2B1A]/60 text-[#F5DEB3]/50 border border-[#3D2B1A]">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Arrow pointer */}
                        <div
                          className={`absolute top-5 hidden md:block w-0 h-0 ${
                            isLeft
                              ? '-right-3 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-l-[#3D2B1A]'
                              : '-left-3 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[12px] border-r-[#3D2B1A]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="w-2/12 flex justify-center items-start pt-5">
                      <div className={`w-4 h-4 rounded-full border-2 ${dot} bg-[#0F0904] shadow-md`} />
                    </div>

                    {/* Year label (opposite side) */}
                    <div className="w-5/12 flex items-start pt-4">
                      <span className={`font-pirate text-2xl ${label} opacity-40 ${isLeft ? 'ml-8' : 'mr-8 text-right w-full'}`}>
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {/* Mobile: card */}
                  <div className="md:hidden flex-1">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#3D2B1A] text-[#D4A017] mb-2">
                      {item.period}
                    </span>
                    <div className="p-4 rounded-xl border border-[#3D2B1A] bg-[#160E08]">
                      <div className="flex items-start gap-2 mb-2">
                        <Icon size={14} className={`${label} mt-0.5 shrink-0`} />
                        <div>
                          <h3 className="text-[#F5DEB3] font-semibold text-sm">{item.title}</h3>
                          <p className="text-[#6B5240] text-xs">{item.org}</p>
                        </div>
                      </div>
                      <p className="text-[#F5DEB3]/60 text-xs leading-relaxed mb-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-[#3D2B1A]/60 text-[#F5DEB3]/50 border border-[#3D2B1A]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
