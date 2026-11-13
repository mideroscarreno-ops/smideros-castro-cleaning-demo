import { ArrowRight, Check } from 'lucide-react';
import {
  APPROACH_STAGES,
  BRAND_INFO,
  COMMERCIAL_SERVICES,
  FACILITY_VARIATION_FACTORS,
  IMAGES,
  STANDARD_OF_CARE_PILLARS,
  type RouteId,
} from '../data/castroData';
import { ArchImage } from './ArchImage';
import { IndustryExplorer } from './IndustryExplorer';
import { CoverageChecker } from './CoverageChecker';
import { FaqSection } from './FaqSection';
import type { QuoteMode } from './QuoteExperience';

interface HomePageProps {
  onNavigate: (route: RouteId) => void;
  onOpenQuote: (options?: { mode?: QuoteMode; industry?: string; location?: string }) => void;
}

export function HomePage({ onNavigate, onOpenQuote }: HomePageProps) {
  return (
    <div>
      {/* B. CINEMATIC COMMERCIAL HERO */}
      <section className="relative bg-[#14283B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.heroLobby}
            alt="Contemporary commercial office building atrium with honed terrazzo flooring and sunlit architectural glass"
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#14283B]/95 via-[#14283B]/80 to-[#14283B]/35"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#BE9473]">
              Commercial Cleaning · Oklahoma City Metro
            </p>

            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.08] text-white">
              A Cleaner Business Starts With a Higher Standard.
            </h1>

            <p className="text-base sm:text-lg text-[#E6EBED] leading-relaxed max-w-xl">
              Professional commercial cleaning solutions tailored to your facility, schedule, and operational needs throughout the Oklahoma City metro.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenQuote({ mode: 'quick' })}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request a Cleaning Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 rounded-md border border-white/30 bg-[#14283B]/40 hover:bg-white/10 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* C. CLEANING THAT WORKS AROUND YOUR BUSINESS */}
      <section className="py-16 sm:py-24 bg-[#F7FAFB] border-b border-[#E6EBED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <p className="text-xs font-semibold text-[#167D83]">
                {BRAND_INFO.positioning}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-[#14283B] leading-tight">
                Your Facility Has Its Own Demands. Your Cleaning Plan Should Too.
              </h2>
              <p className="text-base text-[#566774] leading-relaxed">
                Commercial buildings never operate identically. A tailored service plan accounts for how your staff, visitors, and tenants move through the space before a schedule is finalized.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('walkthrough')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#167D83] hover:text-[#116267] transition-colors cursor-pointer"
                >
                  Request a facility walkthrough
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#E6EBED] border-y border-[#E6EBED] bg-white px-6 sm:px-8 rounded-lg">
              {FACILITY_VARIATION_FACTORS.map((factor, idx) => (
                <div
                  key={factor.title}
                  className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-5 flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-[#14283B]">{factor.title}</h3>
                  </div>
                  <p className="sm:col-span-7 text-sm text-[#566774] leading-relaxed">
                    {factor.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D. COMMERCIAL CLEANING SERVICES */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E6EBED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold text-[#167D83]">Commercial Capabilities</p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-[#14283B]">
                Structured Services for Commercial Properties
              </h2>
              <p className="text-base text-[#566774] leading-relaxed">
                From recurring janitorial maintenance to specialized commercial floor care and turnover preparation, each scope is structured around your facility’s real operating priorities.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] hover:bg-[#E6EBED]/60 text-sm font-semibold text-[#14283B] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
            >
              View All Services
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Asymmetric Architectural Bento / Editorial Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Marquee Service 1 */}
            <div className="lg:col-span-7 bg-[#F7FAFB] border border-[#E6EBED] rounded-lg overflow-hidden flex flex-col justify-between">
              <ArchImage
                src={COMMERCIAL_SERVICES[1].image}
                alt={COMMERCIAL_SERVICES[1].imageAlt}
                aspectClass="aspect-[16/9]"
              />
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums">
                    {COMMERCIAL_SERVICES[0].index}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#14283B]">
                    {COMMERCIAL_SERVICES[0].title} &amp; Office Care
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#566774] leading-relaxed">
                  {COMMERCIAL_SERVICES[0].summary} Paired with focused upkeep for conference suites, executive offices, breakrooms, and glass partitions.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {COMMERCIAL_SERVICES[0].scopePoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs sm:text-sm text-[#14283B]">
                      <Check className="w-4 h-4 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Marquee Service 2: Floor Care */}
            <div className="lg:col-span-5 bg-[#14283B] text-white rounded-lg overflow-hidden flex flex-col justify-between">
              <ArchImage
                src={COMMERCIAL_SERVICES[2].image}
                alt={COMMERCIAL_SERVICES[2].imageAlt}
                aspectClass="aspect-[4/3]"
              />
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums">
                    {COMMERCIAL_SERVICES[2].index}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {COMMERCIAL_SERVICES[2].title}
                  </h3>
                </div>
                <p className="text-sm text-[#E6EBED]/85 leading-relaxed">
                  {COMMERCIAL_SERVICES[2].summary}
                </p>
                <ul className="space-y-2 pt-1">
                  {COMMERCIAL_SERVICES[2].scopePoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs sm:text-sm text-[#E6EBED]">
                      <Check className="w-4 h-4 text-[#BE9473] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Secondary Services Row */}
            {COMMERCIAL_SERVICES.slice(3, 6).map((service) => (
              <div
                key={service.id}
                className="lg:col-span-4 bg-[#F7FAFB] border border-[#E6EBED] rounded-lg p-6 sm:p-7 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums block">
                    {service.index}
                  </span>
                  <h3 className="text-lg font-bold text-[#14283B]">{service.title}</h3>
                  <p className="text-sm text-[#566774] leading-relaxed">{service.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenQuote({ mode: 'detailed' })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167D83] hover:text-[#116267] transition-colors self-start cursor-pointer"
                >
                  Include in Quote Scope
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. INDUSTRIES WE SERVE */}
      <section className="py-16 sm:py-24 bg-[#F7FAFB] border-b border-[#E6EBED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold text-[#167D83]">Industry Inquiry Categories</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-[#14283B]">
              Industries We Serve Across the OKC Metro
            </h2>
            <p className="text-base text-[#566774] leading-relaxed">
              Select a commercial property category below to review common cleaning considerations and start a tailored inquiry for your facility.
            </p>
          </div>

          <IndustryExplorer
            onSelectIndustryForQuote={(industryName) =>
              onOpenQuote({ mode: 'detailed', industry: industryName })
            }
          />
        </div>
      </section>

      {/* F. THE CASTRO CLEANING APPROACH */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E6EBED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold text-[#167D83]">Structured Coordination</p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-[#14283B]">
                The Castro Cleaning Approach
              </h2>
              <p className="text-base text-[#566774] leading-relaxed">
                A clear, three-stage process designed to align scope, schedule, and communication directly with your operations team.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('approach')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#167D83] hover:text-[#116267] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explore Our Approach
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {APPROACH_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="bg-[#F7FAFB] border border-[#E6EBED] rounded-lg p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[#BE9473] tabular-nums">
                    Stage {stage.step}
                  </span>
                  <h3 className="text-xl font-bold text-[#14283B]">{stage.title}</h3>
                  <p className="text-sm text-[#566774] leading-relaxed">{stage.description}</p>
                </div>

                <ul className="pt-4 border-t border-[#E6EBED] space-y-2">
                  {stage.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-[#14283B]">
                      <Check className="w-3.5 h-3.5 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. STANDARD OF CARE & H. TRANSPARENT SOCIAL PROOF */}
      <section className="py-16 sm:py-24 bg-[#E6EBED]/45 border-b border-[#E6EBED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* G. Standard of Care */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#167D83]">Operational Reliability</p>
                <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-[#14283B]">
                  A Professional Standard of Care
                </h2>
                <p className="text-base text-[#566774] leading-relaxed">
                  Dependable commercial cleaning relies on steady execution, tailored scope planning, and transparent communication with facility decision-makers.
                </p>
              </div>

              <div className="bg-white border border-[#E6EBED] rounded-lg divide-y divide-[#E6EBED] px-6">
                {STANDARD_OF_CARE_PILLARS.map((pillar) => (
                  <div key={pillar.index} className="py-5 flex items-start gap-4">
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums mt-1 shrink-0">
                      {pillar.index}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-[#14283B]">{pillar.title}</h3>
                      <p className="text-sm text-[#566774] leading-relaxed">{pillar.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* H. Transparent Social Proof */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#14283B] text-white rounded-lg p-7 sm:p-9 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[#BE9473]">
                    Long-Term Commercial Partnerships
                  </p>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white leading-tight">
                    Building Lasting Business Relationships.
                  </h2>
                  <p className="text-sm sm:text-base text-[#E6EBED]/85 leading-relaxed">
                    Castro Cleaning is committed to earning trust through dependable recurring care and clear communication across Oklahoma City metro facilities.
                  </p>
                </div>

                {/* Future-ready verified case study container — intentionally unpopulated with fake content */}
                <div className="border border-white/15 bg-white/5 rounded-md p-5 space-y-2.5">
                  <p className="text-xs font-semibold text-[#BE9473]">
                    Client Case Studies — In Development
                  </p>
                  <p className="text-xs sm:text-sm text-[#E6EBED]/80 leading-relaxed">
                    Verified customer success stories and facility partnership profiles are currently being compiled and will be published here as client approvals are finalized.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('about')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#BE9473] transition-colors cursor-pointer"
                  >
                    About Castro Cleaning
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* I. OKLAHOMA CITY METRO COVERAGE */}
      <section className="py-16 sm:py-24 bg-[#F7FAFB] border-b border-[#E6EBED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold text-[#167D83]">Regional Coverage</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-[#14283B]">
              Local Commercial Cleaning for the OKC Metro.
            </h2>
            <p className="text-base text-[#566774] leading-relaxed">
              Serving commercial properties across Oklahoma City, Edmond, Yukon, Mustang, Moore, Norman, Midwest City, and surrounding metro communities.
            </p>
          </div>

          <CoverageChecker
            onProceedWithLocation={(loc) =>
              onOpenQuote({ mode: 'quick', location: loc })
            }
          />
        </div>
      </section>

      {/* J. FAQ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E6EBED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-semibold text-[#167D83]">Common Questions</p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight text-[#14283B]">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-[#566774] leading-relaxed">
                Clear, transparent answers about service scoping, walkthrough coordination, supplies, and coverage.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#167D83] hover:text-[#116267] transition-colors cursor-pointer"
              >
                View full FAQ page
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="lg:col-span-8">
              <FaqSection />
            </div>
          </div>
        </div>
      </section>

      {/* K. FINAL CONVERSION SECTION */}
      <section className="py-16 sm:py-24 bg-[#14283B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold text-[#BE9473]">
              Start Your Facility Conversation
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Let’s Build a Cleaner Standard for Your Business.
            </h2>
            <p className="text-base sm:text-lg text-[#E6EBED]/85 leading-relaxed max-w-2xl">
              Tell us about your facility and explore a commercial cleaning plan built around your needs—choose a quick inquiry or complete our detailed five-step scope builder.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenQuote({ mode: 'detailed' })}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request a Free Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onOpenQuote({ mode: 'quick' })}
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 rounded-md border border-white/25 hover:bg-white/10 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Discuss Your Facility
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
