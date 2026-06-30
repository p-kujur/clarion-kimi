import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Phone, MapPin } from 'lucide-react';

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
        '.contact-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.4,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-14 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center bg-[#2B468B] overflow-hidden">
        <div className="contact-hero relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center">
          <p className="font-sans font-bold text-sm uppercase tracking-widest text-white/60 mb-6">
            Get in Touch
          </p>
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-7xl text-white leading-tight tracking-wide max-w-4xl mx-auto mb-6">
            LET'S START A <br className="hidden md:block" />
            <span className="text-[#F58220]">CONVERSATION</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Whether you are a government body, CSR initiative, NGO, or academic
            institution — we would love to explore how we can collaborate.
          </p>
        </div>
      </section>

      {/* Contact Details — Open, Engaging Layout */}
      <section className="py-24 md:py-36 bg-white relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          {/* Primary CTA (Email) - Massive & Interactive */}
          <div className="contact-item mb-24 md:mb-32 group flex flex-col items-center text-center">
            <p className="font-sans font-bold text-xs uppercase tracking-widest text-[#F58220] mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-[#F58220]"></span> Direct Email <span className="w-12 h-px bg-[#F58220]"></span>
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=clarion.jh@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 md:gap-6 font-sans font-bold text-3xl md:text-5xl text-gray-900 transition-colors duration-500 hover:text-[#2B468B]"
            >
              clarion.jh@gmail.com
              <span className="p-3 md:p-5 rounded-full bg-gray-50 group-hover:bg-[#2B468B] group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <ArrowUpRight strokeWidth={2.5} className="w-8 h-8 md:w-12 md:h-12" />
              </span>
            </a>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
            
            {/* Phone */}
            <div className="contact-item group flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-6 rounded-xl bg-blue-50 flex items-center justify-center text-[#2B468B] group-hover:bg-[#F58220] group-hover:text-white transition-colors duration-300">
                <Phone className="w-5 h-5" strokeWidth={2} />
              </div>
              <p className="font-sans font-bold text-sm uppercase tracking-widest text-gray-900 mb-3">
                Call Us
              </p>
              <a
                href="tel:+919523685577"
                className="font-sans text-lg text-gray-600 hover:text-[#F58220] transition-colors duration-300 block"
              >
                +91 9523685577
              </a>
            </div>

            {/* Office */}
            <div className="contact-item group flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-6 rounded-xl bg-blue-50 flex items-center justify-center text-[#2B468B] group-hover:bg-[#F58220] group-hover:text-white transition-colors duration-300">
                <MapPin className="w-5 h-5" strokeWidth={2} />
              </div>
              <p className="font-sans font-bold text-sm uppercase tracking-widest text-gray-900 mb-3">
                Headquarters
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Lucas+Building,+Opp.+Arya+Hotel,+Lalpur,+Ranchi+-+834001"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-lg text-gray-600 not-italic leading-relaxed hover:text-[#F58220] transition-colors duration-300 block"
              >
                Lucas Building,<br />
                Opp. Arya Hotel, Lalpur,<br />
                Ranchi &mdash; 834001
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
