import { useState, useEffect } from 'react';
import type { RouteId } from './data/castroData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { SubPages } from './components/SubPages';
import type { QuoteMode } from './components/QuoteExperience';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<RouteId>('home');
  const [quoteMode, setQuoteMode] = useState<QuoteMode>('quick');
  const [prefilledIndustry, setPrefilledIndustry] = useState<string>('');
  const [prefilledLocation, setPrefilledLocation] = useState<string>('');

  const handleNavigate = (route: RouteId) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (options?: {
    mode?: QuoteMode;
    industry?: string;
    location?: string;
  }) => {
    if (options?.mode) setQuoteMode(options.mode);
    if (options?.industry !== undefined) setPrefilledIndustry(options.industry);
    if (options?.location !== undefined) setPrefilledLocation(options.location);
    setActiveRoute('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const titles: Record<RouteId, string> = {
      home: 'Castro Cleaning | Commercial Cleaning in the Oklahoma City Metro',
      services: 'Commercial Cleaning Services | Castro Cleaning OKC Metro',
      industries: 'Industries We Serve | Castro Cleaning OKC Metro',
      approach: 'Our Approach | Castro Cleaning OKC Metro',
      areas: 'Service Areas — Oklahoma City Metro | Castro Cleaning',
      faq: 'Frequently Asked Questions | Castro Cleaning',
      walkthrough: 'Request a Walkthrough | Castro Cleaning',
      quote: 'Request a Commercial Cleaning Quote | Castro Cleaning',
      about: 'About Castro Cleaning | Commercial Cleaning OKC Metro',
      contact: 'Contact Castro Cleaning | Oklahoma City Metro',
    };
    document.title = titles[activeRoute];
  }, [activeRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFB] text-[#14283B]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#14283B] focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <Header activeRoute={activeRoute} onNavigate={handleNavigate} />

      <main id="main-content" className="flex-1">
        {activeRoute === 'home' ? (
          <HomePage onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        ) : (
          <SubPages
            route={activeRoute}
            quoteMode={quoteMode}
            prefilledIndustry={prefilledIndustry}
            prefilledLocation={prefilledLocation}
            onNavigate={handleNavigate}
            onOpenQuote={handleOpenQuote}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
