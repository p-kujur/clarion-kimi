import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkArea {
  title: string;
  description: string;
  tags: string[];
}

const workAreas: WorkArea[] = [
  {
    title: 'The ₹5 Notebook Initiative',
    description:
      'Ultra-affordable school notebooks priced at ₹5, redesigning the entire value chain from paper quality to printing scale. Hundreds of thousands distributed across Bihar, Jharkhand, and West Bengal.',
    tags: ['Education', 'Innovation', 'Scale'],
  },
  {
    title: 'IEC & Behaviour Change',
    description:
      'Contextual, visual, and behaviour-focused IEC material for low-literacy and rural audiences. Simplifying complex messages into relatable visual stories.',
    tags: ['Communication', 'Health', 'Rural'],
  },
  {
    title: 'MASK-MAN Comic Series',
    description:
      'A pandemic-sensitive comic book using storytelling, humour, and peer interaction to enable risk communication without fear-mongering among children.',
    tags: ['Edutainment', 'Health', 'Children'],
  },
  {
    title: 'Cultural Documentation',
    description:
      'Thematic and culturally rooted educational material using regional icons and narratives to strengthen identity and engagement.',
    tags: ['Culture', 'Identity', 'Regional'],
  },
];

export default function WorkAreasSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.work-card');
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="font-sans font-bold text-sm uppercase tracking-widest text-[#F58220] mb-4">
              Selected Initiatives
            </p>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-gray-900 tracking-wide">
              Key Areas of Work
            </h2>
          </div>
          <Link
            to="/work"
            className="mt-6 md:mt-0 font-sans font-bold text-sm uppercase tracking-widest text-[#2B468B] hover:text-[#F58220] transition-colors"
          >
            View All Work &rarr;
          </Link>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {workAreas.map((area, i) => (
            <div
              key={i}
              className="work-card group cursor-pointer bg-gray-50 border border-gray-200 rounded p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* Content */}
              <div className="mb-auto">
                {/* Title */}
                <h3 className="font-sans font-bold text-2xl text-gray-900 group-hover:text-[#2B468B] transition-colors mb-4">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-2 text-sm font-bold text-[#2B468B] group-hover:text-[#F58220] transition-colors">
                Learn more
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
  );
}
