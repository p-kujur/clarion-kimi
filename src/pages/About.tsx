import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: '2015',
    title: 'Foundation',
    description:
      'Clarion Education & Skill Pvt. Ltd. was founded with the belief that access to quality learning tools should not be constrained by geography or income.',
  },
  {
    year: '2016',
    title: 'The ₹5 Notebook',
    description:
      'Developed ultra-affordable school notebooks priced at ₹5, redesigning the entire value chain from paper quality to printing scale.',
  },
  {
    year: '2018',
    title: 'IEC Material Scale-Up',
    description:
      'Expanded IEC and Behaviour Change Communication work across public health, sanitation, and nutrition campaigns in Bihar and Jharkhand.',
  },
  {
    year: '2020',
    title: 'MASK-MAN Comic',
    description:
      'Conceptualised and developed MASK-MAN, a pandemic-sensitive comic book for children, demonstrating edutainment as a public health tool.',
  },
  {
    year: '2022',
    title: 'Multi-State Presence',
    description:
      'Extended operations across Bihar, Jharkhand, and West Bengal with recognition through academic case documentation.',
  },
  {
    year: '2024',
    title: 'Full Portfolio',
    description:
      'A comprehensive portfolio spanning education systems, strategic communication, cultural documentation, and audio-visual storytelling.',
  },
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        '.about-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Sections
      gsap.utils.toArray('.about-section').forEach((section) => {
        gsap.fromTo(
          section as Element,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section as Element,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Timeline items
      const timelineItems = document.querySelectorAll('.timeline-item');
      gsap.fromTo(
        timelineItems,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-14 bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-[#2B468B] overflow-hidden">
        <div className="about-hero-content relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center lg:text-left w-full">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-white/70 mb-6">
            About Clarion
          </p>
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wide max-w-4xl">
            CRAFTING ACCESS, AWARENESS, AND IMPACT
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="about-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="font-sans font-bold text-sm uppercase tracking-widest text-[#F58220] mb-4">
                Our Story
              </p>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-gray-900 tracking-wide leading-tight">
                A purpose-driven <span className="text-[#F58220]">social enterprise</span>
              </h2>
            </div>
            <div className="md:col-span-7">
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Clarion Education & Skill Pvt. Ltd. is a purpose-driven social
                  enterprise that operates at the intersection of education,
                  communication, and social innovation. Founded with the belief
                  that access to quality learning tools and credible information
                  should not be constrained by geography or income, Clarion has
                  consistently worked to design low-cost, high-impact educational
                  and communication solutions.
                </p>
                <p>
                  From reimagining the economics of school stationery to
                  developing culturally rooted IEC (Information, Education and
                  Communication) material, Clarion's work reflects a deep
                  understanding of grassroots realities and a strong capability
                  to translate policy intent into tangible, people-centric
                  outcomes.
                </p>
                <p>
                  We serve governments, development institutions, corporates, and
                  communities across Bihar, Jharkhand, and West Bengal — enabling
                  access, awareness, and aspiration where they matter the most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="about-section py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-sans font-bold text-sm uppercase tracking-widest text-[#F58220] mb-4">
              Core Philosophy
            </p>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-gray-900 tracking-wide">
              What We Believe
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Education Beyond Classrooms',
                description:
                  'Education extends beyond classrooms and textbooks. Every everyday object can become a learning medium.',
              },
              {
                title: 'Communication as Change Agent',
                description:
                  'Communication, when designed responsibly, can shift behaviour at scale. Visual storytelling is our core tool.',
              },
              {
                title: 'Context Over Template',
                description:
                  'Grassroots realities demand contextual solutions. We design for the communities we serve, not for boardrooms.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-t-2 border-gray-200 pt-6"
              >
                <span className="font-sans font-bold text-sm text-[#F58220] mb-4 block">
                  0{i + 1}
                </span>
                <h3 className="font-sans font-bold text-xl text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="font-sans font-bold text-sm uppercase tracking-widest text-[#F58220] mb-4">
              Our Journey
            </p>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-gray-900 tracking-wide">
              Milestones
            </h2>
          </div>

          <div className="timeline-container relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px" />

            <div className="space-y-12">
              {timelineItems.map((item, i) => (
                <div
                  key={i}
                  className={`timeline-item relative grid md:grid-cols-2 gap-8 ${
                    i % 2 === 0 ? '' : 'md:text-right'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-1.5 w-3 h-3 rounded-full bg-[#F58220] md:-translate-x-1.5 -translate-x-1.5 border-[3px] border-white" />

                  {/* Content */}
                  <div className={`pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    <span className="font-sans font-bold text-2xl text-[#F58220] mb-2 block">
                      {item.year}
                    </span>
                    <h3 className="font-sans font-bold text-xl text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
