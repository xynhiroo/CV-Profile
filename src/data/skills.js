// src/data/skills.js — Tech stack grouped by category

export const skillCategories = [
  {
    id: 'backend',
    label: 'Backend',
    title: 'Server & Database',
    icon: '⚓',
    color: 'teal',
    skills: [
      { name: 'Laravel', icon: 'laravel' },
      { name: 'PHP', icon: 'php' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    title: 'UI & Interaksi',
    icon: '🗺️',
    color: 'gold',
    skills: [
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'HTML & CSS', icon: 'html' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Others',
    title: 'Peralatan Kapal',
    icon: '🔧',
    color: 'wood',
    skills: [
      { name: 'Git & GitHub', icon: 'git' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Postman', icon: 'postman' },
    ],
  },
];

export default skillCategories;
