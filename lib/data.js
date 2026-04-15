// ─── Personal Info ────────────────────────────────────────────────────────────
export const personalInfo = {
  name: 'Ishami Gaelle Bega',
  firstName: 'Ishami',
  title: 'Software Developer',
  email: 'gaellebega@gmail.com', // ← replace with your real email
  location: 'Rwanda',
  available: true,
};

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skills = [
  // Frontend
  { name: 'HTML',         category: 'Frontend' },
  { name: 'CSS',          category: 'Frontend' },
  { name: 'JavaScript',   category: 'Frontend' },
  { name: 'React.js',     category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'UI/UX',        category: 'Frontend' },
  // Backend
  { name: 'Node.js',      category: 'Backend'  },
  { name: 'Python',       category: 'Backend'  },
  // Database
  { name: 'MySQL',        category: 'Database' },
  { name: 'MongoDB',      category: 'Database' },
  // Soft Skills
  { name: 'Communication', category: 'Soft Skills' },
  { name: 'Teamwork',      category: 'Soft Skills' },
];

// ─── Projects  (type: 'collab' | 'personal') ─────────────────────────────────
export const projects = [
  // ── Business / System Projects (personal) ──────────────────
  {
    id: 1,
    type: 'personal',
    title: 'Fleshy Bakery',
    description: 'Business website for selling bakery products — featuring a clean product catalogue, ordering flow, and brand-forward design.',
    tags: ['React', 'HTML', 'TailwindCSS', 'JavaScript'],
    bgImage: null,
    image: '/projects/first.png',
    bgColor: '#1f0f0a',
    github: 'https://github.com/gaellebega',
    live: null,
    featured: true,
  },
  {
    id: 2,
    type: 'personal',
    title: 'Grocery Delivery App',
    description: 'Platform where users can buy and sell groceries — connecting local vendors with customers through a fast, intuitive marketplace.',
    tags: ['React', 'HTML', 'TailwindCSS', 'JavaScript'],
    bgImage: null,
    image: '/projects/second.png',
    bgColor: '#0f1f0a',
    github: 'https://github.com/gaellebega',
    live: null,
    featured: false,
  },
  {
    id: 3,
    type: 'personal',
    title: 'Beauty Brand Website',
    description: 'E-commerce website for cosmetics and beauty products — showcasing collections with elegant UI and a smooth shopping experience.',
    tags: ['React', 'HTML', 'TailwindCSS', 'JavaScript'],
    bgImage: null,
    image: '/projects/third.png',
    bgColor: '#1a0f2e',
    github: 'https://github.com/gaellebega',
    live: null,
    featured: false,
  },
  {
    id: 4,
    type: 'collab',
    title: 'Umwalimu Loan Hub',
    description:   'Loan management system for teachers — enabling loan applications, approvals, and repayment tracking in one centralised platform.',
    tags: ['React', 'HTML', 'TailwindCSS', 'JavaScript','Node Js','Mongo db','My SQL'],
    bgImage: null,
    image: '/projects/forth.png',
    bgColor: '#0f1f2e',
    github: 'https://github.com/gaellebega',
    live: null,
    featured: true,
  },
  // ── Collaborated Projects ───────────────────────────────────
  {
    id: 5,
    type: 'personal',
    title: 'Bega Bags',
    description: 'Personal e-commerce project for selling bags — a curated storefront with product listings, cart, and checkout (planned for launch).',
    tags: ['React', 'HTML', 'TailwindCSS', 'JavaScript', 'Node.js', 'MongoDB'],
    bgImage: null,
    image: '/projects/fifth.png',
    bgColor: '#0f1f1a',
    github: 'https://github.com/gaellebega',
    live: null,
    featured: true,
  },
  {
    id: 6,
    type: 'collab',
    title: 'PCM System',
    description: 'Personal Computer Management system — tracks repair and maintenance records when users submit devices for fixing, with full job-lifecycle management.',
    tags: ['React', 'HTML', 'TailwindCSS', 'JavaScript', 'Node.js', 'MySQL'],
    bgImage: null,
    image: '/projects/sixth.png',
    bgColor: '#0a1a1f',
    github: 'https://github.com/gaellebega',
    live: null,
    featured: false,
  },
];

// ─── Honors & Certificates ────────────────────────────────────────────────────
export const awards = [
  {
    id: 1,
    title: "Leadership Development Program",
    organization: 'Beyond Success Rwanda',
    date: '2023',
    description: 'Completed  Beyond Success program by John Maxwell, where I gained invaluable leadership and personal growth skills',
    icon: '🏆',
  },
  {
    id: 2,
    title: 'She Can Code Bootcamp',
    organization: 'IGIRE Organisation',
    date: '2024',
    description: 'Successfully completed a 16-weeks front-end development bootcamp.',
    icon: '🎉',
  },
  {
    id: 3,
    title: 'EF English Profieciency Certificate',
    organization: 'Education First',
    date: '2024',
    description: 'Completed EF proficiency program',
    icon: '🎓',
  },
  {
    id: 4,
    title: 'Leadership Camp',
    organization: 'Ndabaga Impact',
    date: '2024',
    description: 'I attended the Ndabaga Impact program, which focused on developing leadership skills, technology skills, and public speaking.',
    icon: '⭐',
  },
{
  id: 5,
  title: 'Trainer',
  organization: 'TTA',
  date: '2025',
  description: 'Trained young teenagers in the basics of web development, introducing core concepts to help them understand how the web works.',
  icon: '💻',
},
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/gaellebega',
    handle: '@gaellebega',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ishami-gaelle-bega-12b8622b8/',
    handle: 'Ishami Gaelle Bega',
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com/buildsbybega', // ← replace with your real profile
    handle: '@buildsbybega',
  },
  {
    name: 'X',
    url: 'https://x.com/buildsbybega', // ← replace with your real handle
    handle: '@buildsbybega',
  },
];

// ─── Nav section keys ─────────────────────────────────────────────────────────
export const navSectionKeys = [
  { id: 'hero',     labelKey: 'nav.home'     },
  { id: 'about',    labelKey: 'nav.about'    },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'awards',   labelKey: 'nav.awards'   },
  { id: 'contact',  labelKey: 'nav.contact'  },
];

// Backwards-compat alias
export const navSections = navSectionKeys.map(({ id, labelKey }) => ({
  id,
  label: labelKey.replace('nav.', '').charAt(0).toUpperCase() + labelKey.replace('nav.', '').slice(1),
}));
