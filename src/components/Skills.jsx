import { useEffect, useRef } from 'react';
import { Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiLaravel, SiPhp, SiMysql, SiPython,
  SiTailwindcss, SiJavascript, SiTypescript, SiReact,
  SiHtml5, SiGit, SiGithub, SiLinux, SiFigma, SiPostman,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import skillCategories from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

// Peta nama icon ke komponen react-icons dengan warna brand resmi
const SKILL_ICON_MAP = {
  laravel:    { Icon: SiLaravel,     color: '#FF2D20' },
  php:        { Icon: SiPhp,         color: '#8892BF' },
  mysql:      { Icon: SiMysql,       color: '#4479A1' },
  python:     { Icon: SiPython,      color: '#3776AB' },
  java:       { Icon: DiJava,        color: '#ED8B00' },
  tailwind:   { Icon: SiTailwindcss, color: '#06B6D4' },
  javascript: { Icon: SiJavascript,  color: '#F7DF1E' },
  typescript: { Icon: SiTypescript,  color: '#3178C6' },
  react:      { Icon: SiReact,       color: '#61DAFB' },
  html:       { Icon: SiHtml5,       color: '#E34F26' },
  git:        { Icon: SiGit,         color: '#F05032' },
  github:     { Icon: SiGithub,      color: '#F5DEB3' },
  linux:      { Icon: SiLinux,       color: '#FCC624' },
  figma:      { Icon: SiFigma,       color: '#F24E1E' },
  postman:    { Icon: SiPostman,     color: '#FF6C37' },
};

const categoryColors = {
  teal: {
    border: 'border-[#0D9488]/30',
    bg: 'bg-[#0D9488]/10',
    text: 'text-[#0D9488]',
    badge: 'bg-[#0D9488]/15 text-[#14B8A6] border-[#0D9488]/30',
    chipHover: 'hover:border-[#0D9488]/60 hover:bg-[#0D9488]/5',
  },
  gold: {
    border: 'border-[#D4A017]/30',
    bg: 'bg-[#D4A017]/10',
    text: 'text-[#D4A017]',
    badge: 'bg-[#D4A017]/15 text-[#FFD700] border-[#D4A017]/30',
    chipHover: 'hover:border-[#D4A017]/60 hover:bg-[#D4A017]/5',
  },
  wood: {
    border: 'border-[#6F4E37]/50',
    bg: 'bg-[#6F4E37]/10',
    text: 'text-[#8B6347]',
    badge: 'bg-[#6F4E37]/20 text-[#F5DEB3] border-[#6F4E37]/40',
    chipHover: 'hover:border-[#6F4E37]/80 hover:bg-[#6F4E37]/10',
  },
};

function SkillChip({ name, icon, chipHoverClass }) {
  const entry = SKILL_ICON_MAP[icon];

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border border-[#3D2B1A] bg-[#1E1208]/90 transition-all duration-200 ${chipHoverClass} group cursor-default`}>
      <div className="p-2 rounded-md bg-[#160E08] border border-[#3D2B1A] shrink-0 group-hover:scale-110 transition-transform duration-200">
        {entry ? (
          <entry.Icon
            size={20}
            color={entry.color}
            aria-hidden="true"
          />
        ) : (
          <Code2 size={20} className="text-[#F5DEB3]/50" aria-hidden="true" />
        )}
      </div>
      <span className="text-sm font-medium text-[#F5DEB3] group-hover:text-white transition-colors">{name}</span>
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
                className={`p-6 rounded-xl border ${colors.border} bg-[#160E08] flex flex-col justify-between gap-5`}
              >
                {/* Card Header & Skills */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-[#3D2B1A] pb-4">
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-widest ${colors.text}`}>
                        {category.label}
                      </span>
                      <h3 className="font-pirate text-lg text-[#F5DEB3] mt-0.5">{category.title}</h3>
                    </div>
                    <span className={`text-xl px-2.5 py-1.5 rounded-lg ${colors.bg}`} aria-hidden="true">
                      {category.icon}
                    </span>
                  </div>

                  {/* Skill Badges / Chips */}
                  <div className="flex flex-col gap-2.5">
                    {category.skills.map((skill) => (
                      <SkillChip
                        key={skill.name}
                        name={skill.name}
                        icon={skill.icon}
                        chipHoverClass={colors.chipHover}
                      />
                    ))}
                  </div>
                </div>

                {/* Category badge */}
                <div className="pt-3 border-t border-[#3D2B1A]">
                  <span className={`text-xs px-2.5 py-1 rounded border ${colors.badge} font-medium`}>
                    {category.skills.length} skills
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
