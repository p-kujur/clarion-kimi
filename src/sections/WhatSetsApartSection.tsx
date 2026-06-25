import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    title: 'Economics meets Empathy',
    description:
      'We merge rigorous cost analysis with deep human understanding, creating solutions that are both financially sustainable and emotionally resonant.',
  },
  {
    title: 'Visual-Narrative Design',
    description:
      'Our design capability is grounded in field realities. We simplify complex messages into relatable visual stories that communities embrace.',
  },
  {
    title: 'Scaling Social Innovation',
    description:
      'Proven experience in taking pilot projects to statewide implementation through strategic partnerships with government and civil society.',
  },
  {
    title: 'Education + Communication + Execution',
    description:
      'A unique portfolio balancing education delivery, communication strategy, and creative execution under one roof.',
  },
];

export default function WhatSetsApartSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.diff-item');
        gsap.fromTo(
          items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-[#140b06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#c8956c] mb-4">
            What Sets Us Apart
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f3ece4] tracking-tight max-w-2xl">
            We don&apos;t just deliver projects — we build{' '}
            <span className="italic text-[#c8956c]">models</span> for change
          </h2>
        </div>

        {/* Differentiators */}
        <div ref={itemsRef} className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {differentiators.map((item, i) => (
            <div
              key={i}
              className="diff-item border-t border-[rgba(200,149,108,0.2)] pt-6"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-[#c8956c] mt-1 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-[#f3ece4] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8c7b6b] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-base text-[#8c7b6b] mb-6 max-w-xl mx-auto">
            Through its diverse yet interconnected portfolio, Clarion continues
            to enable access, awareness, and aspiration — quietly but
            consistently shaping outcomes where they matter the most.
          </p>
        </div>
      </div>
    </section>
  );
}
