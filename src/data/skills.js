// src/data/skills.js — Tech stack grouped by category

export const skillCategories = [
  {
    id: 'backend',
    label: 'Backend',
    title: 'Server & Database',
    icon: '⚓',
    color: 'teal',
    skills: [
      { name: 'Laravel', icon: 'laravel', level: 90 },
      { name: 'PHP', icon: 'php', level: 88 },
      { name: 'MySQL', icon: 'mysql', level: 85 },
      { name: 'Python', icon: 'python', level: 70 },
      { name: 'Java', icon: 'java', level: 65 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    title: 'UI & Interaksi',
    icon: '🗺️',
    color: 'gold',
    skills: [
      { name: 'Tailwind CSS', icon: 'tailwind', level: 90 },
      { name: 'JavaScript', icon: 'javascript', level: 80 },
      { name: 'TypeScript', icon: 'typescript', level: 65 },
      { name: 'React', icon: 'react', level: 60 },
      { name: 'HTML & CSS', icon: 'html', level: 92 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Others',
    title: 'Peralatan Kapal',
    icon: '🔧',
    color: 'wood',
    skills: [
      { name: 'Git & GitHub', icon: 'git', level: 82 },
      { name: 'Linux', icon: 'linux', level: 70 },
      { name: 'Figma', icon: 'figma', level: 60 },
      { name: 'Postman', icon: 'postman', level: 75 },
    ],
  },
];

export default skillCategories;
