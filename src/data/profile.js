// src/data/profile.js — Single source of truth for personal info

const profile = {
  name: 'Rangga Surya Saputra',
  alias: 'Kapten Rangga',
  tagline: 'Full-Stack Developer · Kutu Buku Lautan Digital',
  bio: `Mahasiswa D3 Teknik Informatika di Politeknik Negeri Batam (Polibatam),
    dengan fokus pada pengembangan web full-stack berbasis Laravel dan PHP.
    Aktif di organisasi mahasiswa HMTI, dan suka membangun solusi digital
    yang nyata — dari sistem rental cosplay sampai aplikasi photobooth.`,
  status: 'Mahasiswa D3 Teknik Informatika, Polibatam',
  focus: ['Backend Development', 'Networking', 'Cybersecurity', 'Machine Learning'],
  organization: 'HMTI (Himpunan Mahasiswa Teknik Informatika)',
  location: 'Batam, Indonesia',
  email: 'ranggasurya0711@gmail.com', // update dengan email asli
  socials: {
    github: 'https://github.com/xynhiroo',
    linkedin: 'https://www.linkedin.com/in/rangga-surya-saputra-583844297',
    instagram: 'https://www.instagram.com/voltrhiro',
  },
  cvUrl: null, // Set to '/cv.pdf' when file is ready
};

export default profile;
