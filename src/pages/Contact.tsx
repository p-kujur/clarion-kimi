import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.contact-info-section',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-14 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center bg-[#2B468B] overflow-hidden">
        <div className="contact-hero relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-white/70 mb-6">
            Get in Touch
          </p>
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wide max-w-4xl mx-auto mb-6">
            LET'S START A <span className="text-[#F58220]">CONVERSATION</span>
          </h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Whether you are a government body, CSR initiative, NGO, or academic
            institution — we would love to explore how we can collaborate.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info-section py-20 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="bg-gray-50 p-10 md:p-16 border border-gray-100 rounded text-center shadow-sm">
            <p className="font-sans font-bold text-sm uppercase tracking-widest text-[#F58220] mb-10">
              Contact Information
            </p>

            <div className="space-y-10 mb-12">
              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">
                  Email
                </h4>
                <a
                  href="mailto:hello@clarion.org"
                  className="text-xl md:text-2xl text-gray-900 font-semibold hover:text-[#F58220] transition-colors"
                >
                  hello@clarion.org
                </a>
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">
                  Operating Regions
                </h4>
                <p className="text-lg text-gray-700">
                  Bihar &middot; Jharkhand &middot; West Bengal
                </p>
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">
                  Work With Us
                </h4>
                <p className="text-lg text-gray-700 leading-relaxed max-w-lg mx-auto">
                  We collaborate with government departments, CSR programmes,
                  NGOs, and academic institutions to create scalable social
                  impact.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="border-t border-gray-200 pt-10">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-500 mb-6">
                Areas of Interest
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Education Innovation',
                  'IEC & BCC',
                  'Comic Learning',
                  'Cultural Documentation',
                  'Strategic Communication',
                  'AV Documentation',
                ].map((area) => (
                  <span
                    key={area}
                    className="font-sans font-semibold text-sm tracking-wide text-gray-600 px-4 py-2 bg-white border border-gray-200 rounded"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
