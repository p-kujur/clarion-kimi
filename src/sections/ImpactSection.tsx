import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImpactStat {
  value: string;
  label: string;
}

const stats: ImpactStat[] = [
  { value: '6x', label: 'Cost reduction on educational materials' },
  { value: '100K+', label: 'Children and families reached' },
  { value: '3', label: 'States: Bihar, Jharkhand, West Bengal' },
  { value: '7+', label: 'Key intervention areas' },
];

const partners = [
  'Government Departments',
  'NABARD',
  'CSR Programmes',
  'NGOs',
  'Academic Institutions',
];

export default function ImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Partners animation
      if (partnersRef.current) {
        const partnerItems = partnersRef.current.querySelectorAll('.partner-item');
        gsap.fromTo(
          partnerItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: partnersRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-[#1a0e08]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/education-systems.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e08] via-transparent to-[#1a0e08]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#c8956c] mb-4">
            Impact at a Glance
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f3ece4] tracking-tight mb-6">
            Numbers That Matter
          </h2>
          <p className="text-base text-[#8c7b6b] max-w-xl mx-auto">
            Over the years, Clarion has consistently delivered high-impact
            solutions at scale, transforming how education and communication
            reach underserved communities.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20"
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="font-serif text-5xl md:text-6xl text-[#c8956c] mb-3">
                {stat.value}
              </div>
              <p className="text-sm text-[#8c7b6b] leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgba(200,149,108,0.15)] mb-16" />

        {/* Trusted Partners */}
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#6b5d4f] mb-8">
            Trusted Partners
          </p>
          <div
            ref={partnersRef}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {partners.map((partner) => (
              <span
                key={partner}
                className="partner-item font-mono text-xs uppercase tracking-wider text-[#8c7b6b] px-4 py-2 border border-[rgba(200,149,108,0.15)] hover:border-[#c8956c] hover:text-[#c8956c] transition-colors cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
