import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skillCategories from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

// Skill icons sebagai SVG inline / emoji fallback
// Di Fase berikutnya bisa diganti dengan react-icons/devicons
const skillIcons = {
  laravel:    { emoji: '🔴', color: '#FF2D20' },
  php:        { emoji: '🐘', color: '#8892BF' },
  mysql:      { emoji: '🐬', color: '#4479A1' },
  python:     { emoji: '🐍', color: '#3776AB' },
  java:       { emoji: '☕', color: '#ED8B00' },
  tailwind:   { emoji: '🌊', color: '#06B6D4' },
  javascript: { emoji: '⚡', color: '#F7DF1E' },
  typescript: { emoji: '📘', color: '#3178C6' },
  react:      { emoji: '⚛️', color: '#61DAFB' },
  html:       { emoji: '🌐', color: '#E34F26' },
  git:        { emoji: '🌿', color: '#F05032' },
  linux:      { emoji: '🐧', color: '#FCC624' },
  figma:      { emoji: '🎨', color: '#F24E1E' },
  postman:    { emoji: '📮', color: '#FF6C37' },
};

const categoryColors = {
  teal: {
    border: 'border-[#0D9488]/30',
    bg: 'bg-[#0D9488]/10',
    text: 'text-[#0D9488]',
    bar: 'bg-[#0D9488]',
    badge: 'bg-[#0D9488]/15 text-[#14B8A6] border-[#0D9488]/30',
  },
  gold: {
    border: 'border-[#D4A017]/30',
    bg: 'bg-[#D4A017]/10',
    text: 'text-[#D4A017]',
    bar: 'bg-[#D4A017]',
    badge: 'bg-[#D4A017]/15 text-[#FFD700] border-[#D4A017]/30',
  },
  wood: {
    border: 'border-[#6F4E37]/50',
    bg: 'bg-[#6F4E37]/10',
    text: 'text-[#8B6347]',
    bar: 'bg-[#6F4E37]',
    badge: 'bg-[#6F4E37]/20 text-[#F5DEB3] border-[#6F4E37]/40',
  },
};

function SkillBar({ name, icon, level, barColor }) {
  const { emoji, color } = skillIcons[icon] || { emoji: '🔧', color: '#F5DEB3' };
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{emoji}</span>
          <span className="text-sm font-medium text-[#F5DEB3]">{name}</span>
        </div>
        <span className="text-xs text-[#6B5240] font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#3D2B1A] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
      });
      // Stagger the 3 category cards
      gsap.from(cardsRef.current?.children, {
        y: 50, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-4 bg-[#0F0904]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest mb-2">
            — Senjata di Kapal —
          </p>
          <h2 className="section-title">Keahlian</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-[#D4A017] text-lg">⚔️</span>
          </div>
          <p className="text-[#6B5240] text-sm mt-4 max-w-md mx-auto">
            Stack teknologi yang aku kuasai — senjata andalan sebagai developer full-stack.
          </p>
        </div>

        {/* Skill Categories Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const colors = categoryColors[category.color] || categoryColors.wood;
            return (
              <div
                key={category.id}
                className={`relative rounded-xl border ${colors.border} bg-[#160E08] p-6 hover:shadow-lg hover:shadow-black/40 transition-shadow duration-300`}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                      {category.label.slice(0, 2)}
                    </span>
                  </div>
                  <h3 className={`font-pirate text-lg ${colors.text}`}>{category.label}</h3>
                </div>

                {/* Skills list */}
                <div className="flex flex-col gap-4">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      icon={skill.icon}
                      level={skill.level}
                      barColor={colors.bar}
                    />
                  ))}
                </div>

                {/* Corner badge */}
                <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-medium border ${colors.badge}`}>
                  {category.skills.length} skills
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
