import { Tag, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GithubIcon } from './SocialIcons';

const stackColors = {
  Laravel:       'bg-[#FF2D20]/10 text-[#FF6B6B] border-[#FF2D20]/20',
  PHP:           'bg-[#8892BF]/10 text-[#8892BF] border-[#8892BF]/20',
  MySQL:         'bg-[#4479A1]/10 text-[#6BA3BE] border-[#4479A1]/20',
  'Tailwind CSS':'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20',
  JavaScript:    'bg-[#F7DF1E]/10 text-[#F7DF1E] border-[#F7DF1E]/20',
  TypeScript:    'bg-[#3178C6]/10 text-[#5BA4F5] border-[#3178C6]/20',
  Python:        'bg-[#3776AB]/10 text-[#5FA8D3] border-[#3776AB]/20',
  React:         'bg-[#61DAFB]/10 text-[#61DAFB] border-[#61DAFB]/20',
  Vite:          'bg-[#646CFF]/10 text-[#9B9FFF] border-[#646CFF]/20',
  GSAP:          'bg-[#88CE02]/10 text-[#88CE02] border-[#88CE02]/20',
  Lenis:         'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20',
  'Canvas API':  'bg-[#F5DEB3]/10 text-[#F5DEB3] border-[#F5DEB3]/20',
  'Web Audio API':'bg-[#D4A017]/10 text-[#D4A017] border-[#D4A017]/20',
  HTML:          'bg-[#E34F26]/10 text-[#E34F26] border-[#E34F26]/20',
  CSS:           'bg-[#1572B6]/10 text-[#5BA4F5] border-[#1572B6]/20',
  Java:          'bg-[#ED8B00]/10 text-[#ED8B00] border-[#ED8B00]/20',
};

const statusBadge = {
  Completed:   'bg-[#0D9488]/15 text-[#14B8A6] border-[#0D9488]/30',
  'In Progress':'bg-[#D4A017]/15 text-[#FFD700] border-[#D4A017]/30',
  Planned:     'bg-[#6F4E37]/20 text-[#F5DEB3] border-[#6F4E37]/30',
};

export default function ProjectCard({ project }) {
  const {
    title,
    subtitle,
    description,
    stack,
    category,
    status,
    featured,
    githubUrl,
    demoUrl,
    thumbnail,
  } = project;

  return (
    <article
      className={`group relative flex flex-col rounded-xl border bg-[#160E08] overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50
        ${featured ? 'border-[#D4A017]/30 hover:border-[#D4A017]/60' : 'border-[#3D2B1A] hover:border-[#6F4E37]'}
      `}
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-gradient-to-br from-[#2A1A0E] to-[#0F0904] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`Screenshot ${title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Placeholder decorative */
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center opacity-30">
              <div className="font-pirate text-4xl text-[#D4A017] mb-1">⚓</div>
              <div className="text-[#F5DEB3] text-xs tracking-widest uppercase">Screenshot Soon</div>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#D4A017] text-[#160E08] uppercase tracking-wide">
            Featured
          </div>
        )}

        {/* Status badge */}
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium border ${statusBadge[status] || statusBadge.Completed}`}>
          {status}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        <p className="text-[#0D9488] text-xs font-semibold uppercase tracking-widest mb-1">{category}</p>

        {/* Title — link ke detail page */}
        <Link
          to={`/projects/${project.slug}`}
          className="font-pirate text-xl text-[#FFD700] hover:text-[#FFE55C] transition-colors mb-0.5 block"
        >
          {title}
        </Link>
        <p className="text-[#F5DEB3]/50 text-xs mb-3 italic">{subtitle}</p>

        {/* Description */}
        <p className="text-[#F5DEB3]/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {stack.map((tech) => (
            <span
              key={tech}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${stackColors[tech] || 'bg-[#3D2B1A]/50 text-[#F5DEB3]/60 border-[#3D2B1A]'}`}
            >
              <Tag size={8} />
              {tech}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex items-center flex-wrap gap-2 pt-3 border-t border-[#3D2B1A]">
          {/* Link ke halaman detail */}
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017]/20 transition-all duration-200"
          >
            🗺️ Lihat Detail
          </Link>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#1E1208] border border-[#3D2B1A] text-[#F5DEB3]/70 hover:text-[#FFD700] hover:border-[#D4A017]/50 transition-all duration-200"
            >
              <GithubIcon size={12} />
              GitHub
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#0D9488]/10 border border-[#0D9488]/30 text-[#0D9488] hover:bg-[#0D9488]/20 transition-all duration-200"
            >
              <ExternalLink size={12} />
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
