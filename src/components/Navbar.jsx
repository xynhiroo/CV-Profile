import { useState, useEffect } from 'react';
import { Menu, X, Download, Anchor } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import profile from '../data/profile';

const navLinks = [
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Harta Karun', href: '#projects' },
  { label: 'Perjalanan', href: '#timeline' },
  { label: 'Piagam', href: '#certifications' },
  { label: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#160E08]/95 backdrop-blur-md border-b border-[#3D2B1A] shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group"
            aria-label="Home — Kapten Rangga"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 select-none">
              ⚓
            </span>
            <span className="font-pirate text-xl lg:text-2xl text-[#FFD700] group-hover:text-[#FFE55C] transition-colors duration-300">
              Kapten Rangga
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 rounded-md text-sm font-medium text-[#F5DEB3]/80 hover:text-[#FFD700] hover:bg-[#3D2B1A]/60 transition-all duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Download CV Button */}
            {profile.cvUrl ? (
              <a
                href={profile.cvUrl}
                download
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-[#D4A017] hover:bg-[#FFD700] text-[#160E08] transition-all duration-200 shadow-md shadow-[#D4A017]/20"
              >
                <Download size={14} />
                Download CV
              </a>
            ) : (
              <div className="relative group hidden sm:inline-block">
                <button
                  type="button"
                  disabled
                  aria-label="Download CV (Coming Soon)"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-[#3D2B1A]/70 text-[#F5DEB3]/40 border border-[#3D2B1A] cursor-not-allowed select-none transition-all duration-200"
                >
                  <Download size={14} className="text-[#6B5240]" />
                  <span>Download CV</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-normal">
                    Soon
                  </span>
                </button>
                {/* Tooltip on hover */}
                <div className="absolute top-full right-0 mt-2 hidden group-hover:flex items-center gap-1.5 z-50 whitespace-nowrap px-3 py-1.5 text-xs font-medium text-[#FFD700] bg-[#1E1208] border border-[#D4A017]/40 rounded shadow-xl pointer-events-none">
                  <span>📜</span>
                  <span>File CV sedang disiapkan (Coming Soon)</span>
                </div>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md text-[#F5DEB3] hover:bg-[#3D2B1A] transition-colors"
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="pb-4 flex flex-col gap-1 border-t border-[#3D2B1A] pt-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-md text-sm font-medium text-[#F5DEB3]/80 hover:text-[#FFD700] hover:bg-[#3D2B1A]/60 transition-all duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {/* Mobile CV button */}
            {profile.cvUrl ? (
              <li>
                <a
                  href={profile.cvUrl}
                  download
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 mx-4 mt-2 px-4 py-3 rounded-md text-sm font-semibold bg-[#D4A017] hover:bg-[#FFD700] text-[#160E08] transition-all duration-200 justify-center"
                >
                  <Download size={14} />
                  Download CV
                </a>
              </li>
            ) : (
              <li>
                <div className="mx-4 mt-2 px-4 py-3 rounded-md text-sm font-semibold bg-[#3D2B1A]/70 text-[#F5DEB3]/40 border border-[#3D2B1A] flex items-center justify-between select-none cursor-not-allowed">
                  <span className="flex items-center gap-2">
                    <Download size={14} className="text-[#6B5240]" />
                    Download CV
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20 font-normal">
                    Coming Soon
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
