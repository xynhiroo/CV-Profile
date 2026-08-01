import { useState, useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const filters = ['Semua', 'Web App', 'Event App', 'Creative / Side Project', 'Portfolio'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = activeFilter === 'Semua'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  // Initial entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('article');
    if (!cards.length) return;

    gsap.from(cards, {
      y: 30, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08,
      clearProps: 'all',
    });
  }, [activeFilter, filtered.length]);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <p className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest mb-2">
            — Harta yang Ditemukan —
          </p>
          <h2 className="section-title">Harta Karun</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-[#D4A017] text-lg">🗺️</span>
          </div>
          <p className="text-[#6B5240] text-sm mt-4 max-w-md mx-auto">
            Proyek-proyek nyata yang sudah aku bangun — dari sistem web sampai aplikasi event.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-[#D4A017] border-[#D4A017] text-[#160E08]'
                  : 'bg-transparent border-[#3D2B1A] text-[#F5DEB3]/60 hover:border-[#6F4E37] hover:text-[#F5DEB3]'
              }`}
            >
              {f === 'Semua' && <Filter size={10} />}
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6B5240]">
            <p className="font-pirate text-2xl mb-2">Harta tidak ditemukan</p>
            <p className="text-sm">Coba filter yang lain 🔍</p>
          </div>
        )}
      </div>
    </section>
  );
}
