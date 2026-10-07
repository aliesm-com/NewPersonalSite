export const site = {
  name: 'Ali Esmaeili',
  title: 'Senior Software Engineer',
  email: 'Hi@aliesm.com',
  github: 'https://github.com/aliesm-com',
  linkedin: 'https://www.linkedin.com/in/aliesm-com',
  description:
    'Senior software engineer building scalable backends, AI-powered products, and reliable developer platforms.',
  resume: '/Ali-Esmaeili-CV.pdf',
};

export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
  { href: '/experience/', label: 'Experience' },
  { href: '/lab/', label: 'Lab' },
  { href: '/media/', label: 'Media' },
  { href: '/contact/', label: 'Contact' },
];

export const skills = [
  { title: 'Engineering', items: 'Python · Django · DRF · Go · FastAPI' },
  { title: 'AI & data', items: 'LLMs · AI Agents · PostgreSQL · ClickHouse' },
  { title: 'Platform', items: 'Docker · Ansible · CI/CD · Linux · Nginx' },
];

export const experience = [
  {
    start: 'Jul 2023',
    end: 'Present',
    role: 'Senior Software Engineer',
    company: 'Neurocage Systems LTD',
    type: 'Full-time · Remote · Montreal, Canada',
    description:
      'High-reliability embedded software, hardware integration, AI analytics and automation. Django management panels, device integrations and CI/CD pipelines.',
    tags: ['Embedded systems', 'AI analytics', 'Platform engineering'],
  },
  {
    start: 'Sep 2024',
    end: 'Present',
    role: 'Backend Engineer',
    company: 'Ai Run',
    type: 'Self-employed · Iran',
    description:
      'Python and Go backends for AI-driven applications. Production workflows combining LLMs, NLP, Streamlit and n8n with Docker and automated delivery.',
    tags: ['Python & Go', 'AI systems', 'DevOps'],
  },
  {
    start: 'Jun 2025',
    end: 'Present',
    role: 'Technical Consultant',
    company: 'Acticomp',
    type: 'Contract · Hybrid · Alborz, Iran',
    description:
      'Software integration for network and security teams, API and Ansible automation, and technical documentation.',
    tags: ['API integration', 'Automation', 'Consulting'],
  },
  {
    start: 'Jun 2021',
    end: 'Jul 2025',
    role: 'Engineer → Team Lead → Consultant',
    company: 'Mizfa Tools',
    type: 'Alborz, Iran',
    description:
      'Django APIs and search features, followed by leading SEO analytics data pipelines and advising on architecture and backend performance.',
    tags: ['SEO analytics', 'Data pipelines', 'Technical leadership'],
    milestones: [
      { period: 'Jun 2021 – May 2022', title: 'Software Engineer' },
      { period: 'May 2022 – May 2023', title: 'Technical Team Lead' },
      { period: 'Jun 2023 – Jul 2025', title: 'Technical Consultant' },
    ],
  },
];
