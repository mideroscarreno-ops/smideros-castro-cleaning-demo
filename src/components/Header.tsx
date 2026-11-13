import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { RouteId } from '../data/castroData';

interface HeaderProps {
  activeRoute: RouteId;
  onNavigate: (route: RouteId) => void;
}

const DESKTOP_NAV: { id: RouteId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'industries', label: 'Industries' },
  { id: 'approach', label: 'Our Approach' },
  { id: 'areas', label: 'Service Areas' },
  { id: 'contact', label: 'Contact' },
];

const MOBILE_NAV: { id: RouteId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Commercial Cleaning Services' },
  { id: 'industries', label: 'Industries We Serve' },
  { id: 'approach', label: 'Our Approach' },
  { id: 'areas', label: 'Service Areas' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'about', label: 'About Castro Cleaning' },
  { id: 'contact', label: 'Contact' },
];

export function Header({ activeRoute, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (route: RouteId) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7FAFB]/95 backdrop-blur-md border-b border-[#E6EBED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-[#14283B] hover:text-[#167D83] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Castro Cleaning
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {DESKTOP_NAV.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#14283B]'
                    : 'text-[#566774] hover:text-[#14283B]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#167D83]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Action zone + Mobile menu trigger */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('walkthrough')}
            className="hidden xl:inline-flex items-center py-2 text-sm font-medium text-[#14283B] hover:text-[#167D83] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Schedule a Walkthrough
          </button>

          <button
            type="button"
            onClick={() => handleNav('quote')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#167D83] hover:bg-[#116267] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request a Free Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#E6EBED] bg-white text-[#14283B] hover:bg-[#E6EBED]/50 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E6EBED] bg-[#F7FAFB] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav aria-label="Mobile navigation" className="px-4 py-4 space-y-1">
            {MOBILE_NAV.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#14283B] text-white'
                      : 'text-[#14283B] hover:bg-[#E6EBED]/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 mt-4 border-t border-[#E6EBED] grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => handleNav('quote')}
                className="w-full py-3 px-4 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold text-center transition-colors cursor-pointer"
              >
                Request a Free Quote
              </button>
              <button
                type="button"
                onClick={() => handleNav('walkthrough')}
                className="w-full py-3 px-4 rounded-md border border-[#14283B]/20 bg-white hover:bg-[#E6EBED]/60 text-[#14283B] text-sm font-semibold text-center transition-colors cursor-pointer"
              >
                Schedule a Walkthrough
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
