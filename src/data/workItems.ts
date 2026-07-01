import type { WorkItem } from '../types/content';

export const workItems: WorkItem[] = [
  {
    id: 'five-rupee-notebook',
    title: 'The ₹5 Notebook Initiative',
    category: 'Education Innovation',
    featured: true,
    description:
      'Ultra-affordable school notebooks priced at ₹5, redesigning the entire value chain from paper quality to printing scale.',
    longDescription:
      "One of Clarion's most widely recognised interventions has been the development of ultra-affordable school notebooks priced at ₹5, at a time when comparable notebooks in the market cost ₹25-₹30. We redesigned the entire notebook value chain — from paper quality to printing scale. IEC and social messaging was integrated on notebook covers and selected inner pages. Notebooks became a learning and awareness medium beyond school hours, engaging parents and guardians. Advertising by government departments, CSR programmes, and NGOs helped subsidise production costs.",
    tags: ['Education', 'Innovation', 'Scale', 'Cost Reduction'],
    impact: [
      'Hundreds of thousands of notebooks distributed across Bihar, Jharkhand, and West Bengal',
      'Adoption by multiple district administrations and government departments',
      'Recognition as a case study in sustainability and social entrepreneurship',
    ],
  },
  {
    id: 'iec-behaviour-change',
    title: 'IEC & Behaviour Change Communication',
    category: 'Communication',
    featured: true,
    description:
      'Contextual, visual, and behaviour-focused IEC material for low-literacy and rural audiences.',
    longDescription:
      'Clarion has developed a strong body of work in designing IEC material that is contextual, visual, and behaviour-focused, especially for low-literacy and rural audiences. Key formats include IEC-infused notebooks, posters, charts, visual advisories, comic books, illustrated narratives, thematic exercise books and learning aids. Our thematic focus areas include public health (COVID-19, hygiene, vaccination), child protection and safety, nutrition and maternal health, water, sanitation, and environmental conservation, and disaster preparedness and climate resilience.',
    tags: ['Communication', 'Health', 'Rural', 'BCC'],
    impact: [
      'IEC material reaching hundreds of thousands of children and families',
      'Multi-state presence with contextual material for each region',
      'Trusted partner to government departments and NGOs',
    ],
  },
  {
    id: 'mask-man-comic',
    title: 'MASK-MAN Comic Series',
    category: 'Edutainment',
    featured: true,
    description:
      'A pandemic-sensitive comic book using storytelling and humour to communicate health awareness to children.',
    longDescription:
      'During the COVID-19 pandemic, Clarion conceptualised and developed MASK-MAN, a pandemic-sensitive comic book aimed at children and adolescents. The comic uses storytelling through fictional characters, humour, and peer-to-peer interaction. It clearly differentiates between facts, myths, and taboos with a step-by-step narrative flow: awareness → conflict → resolution → moral learning. Interactive elements include puzzles, crosswords, and QR codes linking to authentic advisories.',
    tags: ['Edutainment', 'Health', 'Children', 'COVID-19'],
    impact: [
      'Enabled risk communication without fear-mongering',
      'Improved engagement and recall among young readers',
      'Demonstrated the effectiveness of edutainment as a public health tool',
    ],
  },
  {
    id: 'cultural-documentation',
    title: 'Cultural & Regional Documentation',
    category: 'Cultural Heritage',
    featured: true,
    description:
      'Thematic and culturally rooted educational material using regional icons and narratives to strengthen identity.',
    longDescription:
      'Clarion has worked on thematic and culturally rooted educational material, using regional icons and narratives to strengthen identity and engagement. Notable examples include Jannayak Birsa Munda themed notebooks and IEC material, as well as region-specific notebooks and visual stories reflecting local history, livelihoods, and aspirations. These interventions reinforce learning while simultaneously celebrating indigenous knowledge and regional pride.',
    tags: ['Culture', 'Identity', 'Regional', 'Heritage'],
    impact: [
      'Preserved and promoted indigenous knowledge through educational materials',
      'Strengthened regional identity among young learners',
      'Created culturally relevant learning ecosystems',
    ],
  },
  {
    id: 'strategic-communication',
    title: 'Strategic Communication & Branding',
    category: 'Communications',
    description:
      'Branding, PR support, social media management, and perception management for development initiatives.',
    longDescription:
      'Clarion has supported institutions and initiatives through strategic communication and branding, particularly in the development and public sector space. Key assignments include branding and PR support for Pan IIT Alumni initiatives in Jharkhand, social media management, stakeholder communication, and visibility enhancement, as well as perception management and narrative building for government-linked initiatives.',
    tags: ['Branding', 'PR', 'Social Media', 'Strategy'],
    impact: [
      'Enhanced visibility for development initiatives',
      'Structured communication strategies focusing on engagement and outreach',
      'Dual capability in both strategy and execution',
    ],
  },
  {
    id: 'audio-visual-documentation',
    title: 'Audio-Visual Documentation',
    category: 'Documentation',
    description:
      'Documenting institutional journeys and development models through professional audio-visual storytelling.',
    longDescription:
      'Clarion has undertaken assignments that involve documenting institutional journeys and development models. A key example includes NABARD - Jharkhand: Documentation of the journey of Farmer Producer Organisations (FPOs), capturing processes, milestones, and community-institution collaboration through audio-visual storytelling. These outputs serve both as learning resources and advocacy tools, enabling replication and policy learning.',
    tags: ['Documentation', 'Video', 'FPO', 'NABARD'],
    impact: [
      'Captured institutional knowledge for replication',
      'Created advocacy tools for policy learning',
      'Documented community-institution collaboration',
    ],
  },
  {
    id: 'education-systems',
    title: 'Education Systems & Academic Support',
    category: 'Education Systems',
    description:
      'Curriculum design, learning frameworks, assessment tools, and competitive exam preparation material.',
    longDescription:
      "Beyond communication products, Clarion has contributed to designing school infrastructure layouts, supporting curriculum design and learning frameworks, developing study material and test series for competitive examinations, and creating subject-specific assessment tools for mathematics, English, aptitude, and foundational learning. This breadth of work highlights Clarion's strong grounding in education systems thinking.",
    tags: ['Education', 'Curriculum', 'Assessment', 'Systems'],
    impact: [
      'Supported holistic education system improvement',
      'Developed assessment tools for foundational learning',
      'Created competitive exam preparation materials',
    ],
  },
];

export const featuredWorkItems = workItems.filter((item) => item.featured);

export const workCategories = [
  'All',
  ...Array.from(new Set(workItems.map((item) => item.category))),
];