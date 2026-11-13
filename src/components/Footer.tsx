import { BRAND_INFO, type RouteId } from '../data/castroData';

interface FooterProps {
  onNavigate: (route: RouteId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#14283B] text-[#F7FAFB] border-t border-[#14283B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white hover:text-[#BE9473] transition-colors cursor-pointer"
            >
              {BRAND_INFO.name}
            </button>
            <p className="text-sm text-[#E6EBED]/80 max-w-sm leading-relaxed">
              {BRAND_INFO.positioning} Commercial cleaning solutions tailored to your facility, schedule, and operational needs across the Oklahoma City metropolitan area.
            </p>
            <div className="pt-2 space-y-1.5 text-sm text-[#E6EBED]/80">
              <p>{BRAND_INFO.region}</p>
              <p>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="text-white hover:text-[#BE9473] underline underline-offset-4 decoration-white/25 transition-colors"
                >
                  {BRAND_INFO.email}
                </a>
              </p>
              <p>
                <a
                  href={BRAND_INFO.phoneHref}
                  className="text-white hover:text-[#BE9473] transition-colors tabular-nums"
                >
                  {BRAND_INFO.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#BE9473]">Capabilities &amp; Company</h3>
            <ul className="space-y-2.5 text-sm text-[#E6EBED]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Commercial Cleaning Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('industries')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Industries We Serve
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('approach')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Approach
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('areas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Service Areas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Castro Cleaning
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Inquiries */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-semibold text-[#BE9473]">Inquiries &amp; Resources</h3>
            <ul className="space-y-2.5 text-sm text-[#E6EBED]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('quote')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Request a Commercial Cleaning Quote
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('walkthrough')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Request a Facility Walkthrough
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Discreet Concept Disclosure */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#E6EBED]/65">
          <p>{BRAND_INFO.disclosure}</p>
          <p>
            Official reference:{' '}
            <a
              href={BRAND_INFO.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E6EBED]/85 hover:text-white underline underline-offset-2"
            >
              castrocleaningok.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
