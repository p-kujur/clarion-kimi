import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  impact?: string[];
}

const workItems: WorkItem[] = [
  {
    id: 1,
    title: 'The ₹5 Notebook Initiative',
    category: 'Education Innovation',
    description:
      'Ultra-affordable school notebooks priced at ₹5, redesigning the entire value chain from paper quality to printing scale.',
    longDescription:
      'One of Clarion\'s most widely recognised interventions has been the development of ultra-affordable school notebooks priced at ₹5, at a time when comparable notebooks in the market cost ₹25-₹30. We redesigned the entire notebook value chain — from paper quality to printing scale. IEC and social messaging was integrated on notebook covers and selected inner pages. Notebooks became a learning and awareness medium beyond school hours, engaging parents and guardians. Advertising by government departments, CSR programmes, and NGOs helped subsidise production costs.',
    tags: ['Education', 'Innovation', 'Scale', 'Cost Reduction'],
    impact: [
      'Hundreds of thousands of notebooks distributed across Bihar, Jharkhand, and West Bengal',
      'Adoption by multiple district administrations and government departments',
      'Recognition as a case study in sustainability and social entrepreneurship',
    ],
  },
  {
    id: 2,
    title: 'IEC & Behaviour Change Communication',
    category: 'Communication',
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
    id: 3,
    title: 'MASK-MAN Comic Series',
    category: 'Edutainment',
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
    id: 4,
    title: 'Cultural & Regional Documentation',
    category: 'Cultural Heritage',
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
    id: 5,
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
    id: 6,
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
    id: 7,
    title: 'Education Systems & Academic Support',
    category: 'Education Systems',
    description:
      'Curriculum design, learning frameworks, assessment tools, and competitive exam preparation material.',
    longDescription:
      'Beyond communication products, Clarion has contributed to designing school infrastructure layouts, supporting curriculum design and learning frameworks, developing study material and test series for competitive examinations, and creating subject-specific assessment tools for mathematics, English, aptitude, and foundational learning. This breadth of work highlights Clarion\'s strong grounding in education systems thinking.',
    tags: ['Education', 'Curriculum', 'Assessment', 'Systems'],
    impact: [
      'Supported holistic education system improvement',
      'Developed assessment tools for foundational learning',
      'Created competitive exam preparation materials',
    ],
  },
];

const categories = ['All', ...Array.from(new Set(workItems.map((w) => w.category)))];

export default function Work() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const filteredWork =
    activeCategory === 'All'
      ? workItems
      : workItems.filter((w) => w.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-card-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={pageRef} className="pt-14 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center bg-[#2B468B] overflow-hidden">
        <div className="work-hero-content relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center lg:text-left">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-white/70 mb-6">
            Our Work
          </p>
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wide max-w-4xl mb-6">
            KEY AREAS OF IMPACT
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto lg:mx-0">
            From disrupting school stationery ecosystems to documenting
            institutional journeys, our work demonstrates how thoughtful design,
            strategic partnerships, and deep contextual understanding can
            transform ordinary tools into powerful agents of change.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 font-sans font-bold text-sm tracking-wide rounded transition-colors shadow-sm ${
                  activeCategory === cat
                    ? 'bg-[#2B468B] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#2B468B] hover:text-[#2B468B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWork.map((item) => (
              <div
                key={item.id}
                className="work-card-item group cursor-pointer bg-white border border-gray-200 rounded p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                onClick={() => setSelectedWork(item)}
              >
                <div className="mb-auto">
                  <p className="font-sans font-bold text-xs uppercase tracking-wider text-[#F58220] mb-3">
                    {item.category}
                  </p>
                  <h3 className="font-sans font-bold text-xl text-gray-900 group-hover:text-[#2B468B] transition-colors mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed line-clamp-3 mb-6">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm font-semibold text-[#2B468B] group-hover:text-[#F58220] transition-colors">
                  Read more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedWork(null)}
        >
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Area without image */}
            <div className="bg-[#2B468B] p-8 md:p-12 relative">
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-[#F58220] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <p className="font-sans font-bold text-xs uppercase tracking-wider text-white/70 mb-3">
                {selectedWork.category}
              </p>
              <h2 className="font-sans font-bold text-3xl md:text-5xl text-white leading-tight">
                {selectedWork.title}
              </h2>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 bg-white">
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                {selectedWork.longDescription}
              </p>

              {/* Impact */}
              {selectedWork.impact && (
                <div className="bg-gray-50 p-6 md:p-8 rounded border border-gray-100">
                  <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-[#2B468B] mb-6">
                    Impact & Reach
                  </h4>
                  <ul className="space-y-4">
                    {selectedWork.impact.map((point, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="w-2 h-2 rounded-full bg-[#F58220] mt-2 shrink-0" />
                        <span className="text-base text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
