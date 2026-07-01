import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workCategories, workItems } from '../data/workItems';
import type { WorkItem } from '../types/content';

gsap.registerPlugin(ScrollTrigger);

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
            {workCategories.map((cat) => (
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