import { Link } from 'react-router';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-[#2B468B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <p className="font-sans font-semibold text-xs uppercase tracking-widest text-white/70 mb-4">
            Get in touch
          </p>
          <a
            href="mailto:hello@clarion.org"
            className="font-sans font-bold text-3xl md:text-5xl text-white hover:text-[#F58220] transition-colors"
          >
            hello@clarion.org
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 mb-12" />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <img src="/images/logo.jpg" alt="Clari-ON" className="h-6 md:h-8 object-contain" />
              </div>
              <span className="font-semibold text-lg text-white">
                Clarion Global
              </span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Education & Skill Pvt. Ltd. Crafting access, awareness, and impact
              through education and communication since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white/60 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/work', label: 'Key Areas' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/80 hover:text-[#F58220] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Areas */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white/60 mb-4">
              Key Areas
            </h4>
            <ul className="space-y-2">
              {[
                'Notebook Initiative',
                'IEC & BCC',
                'Comic Learning',
                'Cultural Docs',
                'Strategic Comms',
              ].map((area) => (
                <li key={area}>
                  <Link
                    to="/work"
                    className="text-sm text-white/80 hover:text-[#F58220] transition-colors"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60 font-sans">
            &copy; {new Date().getFullYear()} Clarion Education & Skill Pvt. Ltd.
          </p>
          <p className="text-xs text-white/60 font-sans">
            Bihar &middot; Jharkhand &middot; West Bengal
          </p>
        </div>
      </div>
    </footer>
  );
}
