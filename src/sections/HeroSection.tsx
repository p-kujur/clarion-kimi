import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { Facebook, Instagram, Twitter, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          socialRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2B468B] pt-20"
    >
      {/* Animated particles overlay (Kept from original but recolored to fit the new blue theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto flex flex-col justify-center">
        <div className="max-w-4xl mx-auto lg:mx-0 lg:ml-[15%]">
          <h1
            ref={titleRef}
            className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.2] mb-8 tracking-wide"
          >
            CRAFTING ACCESS, AWARENESS,
            <br />
            AND IMPACT THROUGH
            <br />
            EDUCATION & COMMUNICATION
          </h1>

          <p
            ref={subtitleRef}
            className="font-sans text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mb-8"
          >
            Clarion Education & Skill Pvt. Ltd. is a purpose-driven social
            enterprise designing low-cost, high-impact educational and
            communication solutions for governments, institutions,
            corporates, and communities.
          </p>

          <div ref={socialRef} className="flex items-center gap-5 mb-10 text-white">
            <a href="#" className="hover:text-[#F58220] transition-colors"><Facebook size={22} fill="currentColor" strokeWidth={0} /></a>
            <a href="#" className="hover:text-[#F58220] transition-colors"><Instagram size={22} /></a>
            <a href="#" className="hover:text-[#F58220] transition-colors"><Twitter size={22} fill="currentColor" strokeWidth={0} /></a>
          </div>

          <div ref={ctaRef}>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F58220] text-[#171717] font-sans font-bold text-sm rounded shadow-lg hover:bg-[#ff963d] transition-colors"
            >
              Explore Our Work
              <ArrowUpRight size={18} className="stroke-[3]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
