import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import profile from '../data/profile';

const quickLinks = [
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Harta Karun', href: '#projects' },
  { label: 'Peta Perjalanan', href: '#timeline' },
  { label: 'Kontak', href: '#contact' },
];

const socials = [
  { icon: GithubIcon, href: profile.socials.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: InstagramIcon, href: profile.socials.instagram, label: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#3D2B1A] bg-[#0F0904] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚓</span>
              <span className="font-pirate text-xl text-[#FFD700]">Kapten Rangga</span>
            </div>
            <p className="text-[#6B5240] text-sm leading-relaxed">
              Rangga Surya Saputra — D3 Teknik Informatika, Polibatam.
              Full-stack developer dengan semangat bajak laut digital.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-pirate text-[#D4A017] text-sm uppercase tracking-widest mb-4">
              Peta Situs
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#6B5240] text-sm hover:text-[#F5DEB3] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-pirate text-[#D4A017] text-sm uppercase tracking-widest mb-4">
              Temukan di Lautan
            </h4>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#6B5240] text-sm hover:text-[#FFD700] transition-colors duration-200"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#3D2B1A] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6B5240]">
          <p>© {currentYear} Rangga Surya Saputra. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-[#D4A017] mx-1">⚓</span> by{' '}
            <span className="font-pirate text-[#D4A017] ml-1">Kapten Rangga</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
