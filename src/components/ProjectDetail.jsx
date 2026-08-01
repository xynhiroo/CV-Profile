import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Tag, CheckCircle, Users, Code2, Calendar } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import projects from '../data/projects';

// Warna stack badge (sama seperti ProjectCard)
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

const statusConfig = {
  Completed:    { label: 'Selesai',     cls: 'bg-[#0D9488]/15 text-[#14B8A6] border-[#0D9488]/30' },
  'In Progress':{ label: 'In Progress', cls: 'bg-[#D4A017]/15 text-[#FFD700] border-[#D4A017]/30' },
  Planned:      { label: 'Planned',     cls: 'bg-[#6F4E37]/20 text-[#F5DEB3] border-[#6F4E37]/30' },
};

// Kompas dekoratif mini
function CompassMini() {
  return (
    <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
      <circle cx="100" cy="100" r="95" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="6 4"/>
      <polygon points="100,10 108,90 100,80 92,90" fill="#FFD700"/>
      <polygon points="100,190 108,110 100,120 92,110" fill="#F5DEB3" opacity="0.6"/>
      <polygon points="10,100 90,92 80,100 90,108" fill="#F5DEB3" opacity="0.6"/>
      <polygon points="190,100 110,92 120,100 110,108" fill="#F5DEB3" opacity="0.6"/>
      <circle cx="100" cy="100" r="12" fill="#D4A017" opacity="0.8"/>
      <circle cx="100" cy="100" r="6" fill="#FFD700"/>
    </svg>
  );
}

// Project tidak ditemukan
function NotFound({ onBack }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <span className="text-6xl mb-4">🏴‍☠️</span>
      <h1 className="font-pirate text-3xl text-[#FFD700] mb-2">Harta Tidak Ditemukan</h1>
      <p className="text-[#F5DEB3]/60 mb-8">Proyek yang kamu cari tidak ada di peta ini.</p>
      <button onClick={onBack} className="btn-outline">
        <ArrowLeft size={16} />
        Kembali ke Harta Karun
      </button>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <NotFound onBack={() => navigate('/')} />;

  const {
    title, subtitle, description, stack, category, role, status,
    githubUrl, demoUrl, thumbnail, images, highlights,
  } = project;

  const sc = statusConfig[status] || statusConfig.Completed;

  // Proyek sebelum/sesudah untuk navigasi
  const currentIdx = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const nextProject = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-[#160E08]">
      {/* ── Navbar mini ── */}
      <header className="sticky top-0 z-50 bg-[#160E08]/95 backdrop-blur-md border-b border-[#3D2B1A]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#F5DEB3]/70 hover:text-[#FFD700] transition-colors text-sm">
            <ArrowLeft size={16} />
            <span>Kembali ke Harta Karun</span>
          </Link>
          <Link to="/" className="font-pirate text-lg text-[#D4A017] hover:text-[#FFD700] transition-colors">
            ⚓ Kapten Rangga
          </Link>
        </div>
      </header>

      {/* ── Hero proyek ── */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg, #D4A017 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Compass deco */}
        <div className="absolute top-8 right-8 pointer-events-none">
          <CompassMini />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#6B5240] mb-6">
            <Link to="/" className="hover:text-[#D4A017] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#projects" className="hover:text-[#D4A017] transition-colors">Harta Karun</Link>
            <span>/</span>
            <span className="text-[#F5DEB3]/60">{title}</span>
          </nav>

          {/* Category & Status badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0D9488]/15 text-[#0D9488] border border-[#0D9488]/30 uppercase tracking-widest">
              {category}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${sc.cls}`}>
              {sc.label}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-pirate text-4xl sm:text-5xl lg:text-6xl text-[#FFD700] mb-2"
              style={{ textShadow: '0 0 30px rgba(212,160,23,0.3)' }}>
            {title}
          </h1>
          <p className="text-[#F5DEB3]/50 text-lg italic mb-6">{subtitle}</p>

          {/* Quick meta */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-[#F5DEB3]/60">
              <Users size={14} className="text-[#0D9488]" />
              <span><span className="text-[#6B5240]">Peran:</span> {role}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#F5DEB3]/60">
              <Calendar size={14} className="text-[#D4A017]" />
              <span><span className="text-[#6B5240]">Status:</span> {sc.label}</span>
            </div>
          </div>

          {/* Stack badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {stack.map((tech) => (
              <span
                key={tech}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium border ${stackColors[tech] || 'bg-[#3D2B1A]/50 text-[#F5DEB3]/60 border-[#3D2B1A]'}`}
              >
                <Tag size={10} />
                {tech}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="flex flex-wrap gap-3">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm py-2 px-4">
                <GithubIcon size={15} />
                Lihat di GitHub
              </a>
            )}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm py-2 px-4">
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#3D2B1A] to-transparent max-w-5xl mx-auto" />

      {/* ── Main content ── */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — main content */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Screenshot / Thumbnail */}
            <div className="rounded-xl overflow-hidden border border-[#3D2B1A] aspect-video bg-gradient-to-br from-[#2A1A0E] to-[#0F0904] flex items-center justify-center">
              {thumbnail ? (
                <img src={thumbnail} alt={`Screenshot ${title}`} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center opacity-30">
                  <div className="font-pirate text-5xl text-[#D4A017] mb-2">⚓</div>
                  <p className="text-[#F5DEB3] text-sm tracking-widest uppercase">Screenshot Segera Hadir</p>
                  <p className="text-[#6B5240] text-xs mt-1">Tambahkan gambar ke <code className="text-[#0D9488]">public/images/</code></p>
                </div>
              )}
            </div>

            {/* Additional images */}
            {images && images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-[#3D2B1A] aspect-video bg-[#1E1208]">
                    <img src={img} alt={`${title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="p-6 rounded-xl border border-[#3D2B1A] bg-[#160E08]">
              <h2 className="font-pirate text-xl text-[#FFD700] mb-4">Tentang Proyek</h2>
              <p className="text-[#F5DEB3]/75 leading-relaxed text-sm sm:text-base">{description}</p>
            </div>
          </div>

          {/* Right — sidebar */}
          <div className="flex flex-col gap-6">

            {/* Highlights */}
            <div className="p-6 rounded-xl border border-[#D4A017]/20 bg-[#160E08]">
              <h3 className="font-pirate text-lg text-[#FFD700] mb-4">
                🗺️ Fitur Unggulan
              </h3>
              <ul className="flex flex-col gap-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#0D9488] shrink-0 mt-0.5" />
                    <span className="text-[#F5DEB3]/75 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project meta */}
            <div className="p-6 rounded-xl border border-[#3D2B1A] bg-[#160E08]">
              <h3 className="font-pirate text-lg text-[#FFD700] mb-4">Detail Proyek</h3>
              <dl className="flex flex-col gap-4">
                <div>
                  <dt className="text-[#6B5240] text-xs uppercase tracking-wider mb-1">Kategori</dt>
                  <dd className="text-[#F5DEB3] text-sm">{category}</dd>
                </div>
                <div>
                  <dt className="text-[#6B5240] text-xs uppercase tracking-wider mb-1">Peranku</dt>
                  <dd className="text-[#F5DEB3] text-sm">{role}</dd>
                </div>
                <div>
                  <dt className="text-[#6B5240] text-xs uppercase tracking-wider mb-1">Status</dt>
                  <dd>
                    <span className={`px-2 py-0.5 rounded text-xs border ${sc.cls}`}>{sc.label}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[#6B5240] text-xs uppercase tracking-wider mb-2">Tech Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {stack.map((tech) => (
                      <span key={tech} className={`px-2 py-0.5 rounded text-[10px] font-medium border ${stackColors[tech] || 'bg-[#3D2B1A]/50 text-[#F5DEB3]/60 border-[#3D2B1A]'}`}>
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg border border-[#3D2B1A] bg-[#160E08] text-[#F5DEB3]/60 hover:text-[#FFD700] hover:border-[#D4A017]/50 transition-all text-sm">
                  <GithubIcon size={15} />
                  Source Code di GitHub
                </a>
              )}
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg border border-[#0D9488]/30 bg-[#0D9488]/10 text-[#0D9488] hover:bg-[#0D9488]/20 transition-all text-sm">
                  <ExternalLink size={15} />
                  Lihat Live Demo
                </a>
              )}
              {!githubUrl && !demoUrl && (
                <p className="text-[#6B5240] text-xs italic text-center py-2">Link repo & demo segera hadir</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Prev/Next Navigation ── */}
      <section className="py-12 px-4 border-t border-[#3D2B1A]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[#6B5240] text-xs uppercase tracking-widest mb-6">Jelajahi Harta Lainnya</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-[#3D2B1A] bg-[#160E08] hover:border-[#D4A017]/40 hover:-translate-y-0.5 transition-all group"
              >
                <ArrowLeft size={16} className="text-[#6B5240] group-hover:text-[#D4A017] transition-colors shrink-0" />
                <div>
                  <p className="text-[#6B5240] text-xs uppercase tracking-wider">Sebelumnya</p>
                  <p className="font-pirate text-[#F5DEB3] group-hover:text-[#FFD700] transition-colors">{prevProject.title}</p>
                </div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="flex items-center justify-end gap-3 p-4 rounded-xl border border-[#3D2B1A] bg-[#160E08] hover:border-[#D4A017]/40 hover:-translate-y-0.5 transition-all group sm:col-start-2"
              >
                <div className="text-right">
                  <p className="text-[#6B5240] text-xs uppercase tracking-wider">Berikutnya</p>
                  <p className="font-pirate text-[#F5DEB3] group-hover:text-[#FFD700] transition-colors">{nextProject.title}</p>
                </div>
                <ArrowLeft size={16} className="text-[#6B5240] group-hover:text-[#D4A017] transition-colors rotate-180 shrink-0" />
              </Link>
            ) : <div />}
          </div>

          <div className="text-center mt-8">
            <Link to="/#projects" className="btn-gold text-sm">
              🗺️ Semua Harta Karun
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer mini ── */}
      <footer className="border-t border-[#3D2B1A] py-6 text-center text-xs text-[#6B5240]">
        © {new Date().getFullYear()} Rangga Surya Saputra · Made with ⚓ by Kapten Rangga
      </footer>
    </div>
  );
}
