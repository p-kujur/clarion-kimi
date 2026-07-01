import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { homePrinciples } from '../data/principles';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote reveal
      gsap.fromTo(
        quoteRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Body text reveal
      gsap.fromTo(
        bodyRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Principles stagger
      if (principlesRef.current) {
        const items = principlesRef.current.querySelectorAll('.principle-item');
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: principlesRef.current,
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
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gray-50 border-t border-gray-100"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <p className="font-sans font-bold text-sm uppercase tracking-widest text-[#F58220] mb-12">
          Our Philosophy
        </p>

        {/* Main quote */}
        <h2
          ref={quoteRef}
          className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight tracking-wide mb-12 max-w-4xl"
        >
          At Clarion, we believe that{' '}
          <span className="text-[#F58220]">education</span> extends
          beyond classrooms. We believe that communication, when designed
          responsibly, can shift{' '}
          <span className="text-[#F58220]">behaviour at scale</span>.
        </h2>

        {/* Body */}
        <div ref={bodyRef} className="max-w-3xl mb-16">
          <p className="text-lg text-gray-600 leading-relaxed">
            From reimagining the economics of school stationery to developing
            culturally rooted educational material, Clarion's work reflects a
            deep understanding of grassroots realities and a strong capability
            to translate policy intent into tangible, people-centric outcomes.
          </p>
        </div>

        {/* Principles */}
        <div ref={principlesRef} className="grid md:grid-cols-3 gap-12">
          {homePrinciples.map((principle, i) => (
            <div
              key={i}
              className="principle-item border-t-2 border-gray-200 pt-6"
            >
              <span className="font-sans font-bold text-sm text-[#F58220] mb-4 block">
                0{i + 1}
              </span>
              <p className="font-sans font-bold text-xl text-gray-900 leading-snug">{principle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
