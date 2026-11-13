import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react';
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
import { QuoteExperience, type QuoteMode } from './QuoteExperience';
import { WalkthroughSection } from './WalkthroughSection';

interface SubPageHeaderProps {
  kicker: string;
  title: string;
  description: string;
}

function SubPageHeader({ kicker, title, description }: SubPageHeaderProps) {
  return (
    <section className="bg-[#14283B] text-white py-14 sm:py-20 border-b border-[#14283B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold text-[#BE9473]">{kicker}</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#E6EBED]/85 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

interface SubPageProps {
  route: Exclude<RouteId, 'home'>;
  quoteMode: QuoteMode;
  prefilledIndustry: string;
  prefilledLocation: string;
  onNavigate: (route: RouteId) => void;
  onOpenQuote: (options?: { mode?: QuoteMode; industry?: string; location?: string }) => void;
}

export function SubPages({
  route,
  quoteMode,
  prefilledIndustry,
  prefilledLocation,
  onNavigate,
  onOpenQuote,
}: SubPageProps) {
  if (route === 'services') {
    return (
      <div>
        <SubPageHeader
          kicker="Commercial Cleaning Services"
          title="Commercial Facility Services Tailored to Your Building"
          description="Structured recurring janitorial service, corporate office upkeep, restroom sanitization, specialized floor care, glass cleaning, and post-construction turnover support across the OKC metro."
        />
        <section className="py-16 sm:py-20 bg-[#F7FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COMMERCIAL_SERVICES.map((service) => (
                <article
                  key={service.id}
                  className="bg-white border border-[#E6EBED] rounded-lg overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <ArchImage
                      src={service.image}
                      alt={service.imageAlt}
                      aspectClass="aspect-[16/9]"
                    />
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums">
                          {service.index}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#14283B]">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-sm sm:text-base text-[#566774] leading-relaxed">
                        {service.summary}
                      </p>
                      <ul className="pt-3 border-t border-[#E6EBED] space-y-2">
                        {service.scopePoints.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5 text-sm text-[#14283B]">
                            <Check
                              className="w-4 h-4 text-[#167D83] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="px-6 sm:px-8 py-4 bg-[#F7FAFB] border-t border-[#E6EBED] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => onOpenQuote({ mode: 'detailed' })}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#167D83] hover:text-[#116267] transition-colors cursor-pointer"
                    >
                      Request Quote for This Service
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="bg-[#14283B] text-white rounded-lg p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h2 className="text-2xl font-bold text-white">
                  Need a Custom Commercial Scope?
                </h2>
                <p className="text-sm text-[#E6EBED]/85 leading-relaxed">
                  Share your facility size, flooring mix, and operating hours to coordinate a cleaning plan built around your property.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenQuote({ mode: 'detailed' })}
                  className="px-5 py-3 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Detailed Cleaning Quote
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('walkthrough')}
                  className="px-5 py-3 rounded-md border border-white/25 hover:bg-white/10 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Request a Walkthrough
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (route === 'industries') {
    return (
      <div>
        <SubPageHeader
          kicker="Industries We Serve"
          title="Commercial Inquiry Categories Across OKC Metro Sectors"
          description="Explore common facility considerations across ten commercial property sectors. Every cleaning scope is tailored directly with your team—without assumptions or boilerplate checklists."
        />
        <section className="py-16 sm:py-20 bg-[#F7FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <IndustryExplorer
              onSelectIndustryForQuote={(industryName) =>
                onOpenQuote({ mode: 'detailed', industry: industryName })
              }
            />
          </div>
        </section>
      </div>
    );
  }

  if (route === 'approach') {
    return (
      <div>
        <SubPageHeader
          kicker="Our Approach"
          title="Structured Planning. Consistent Commercial Execution."
          description="How Castro Cleaning evaluates facility requirements, defines scope expectations, and coordinates ongoing service for businesses across the Oklahoma City metro."
        />
        <section className="py-16 sm:py-20 bg-[#F7FAFB] border-b border-[#E6EBED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {APPROACH_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="bg-white border border-[#E6EBED] rounded-lg p-7 sm:p-8 space-y-5"
                >
                  <span className="font-[family-name:var(--font-mono)] text-sm font-medium text-[#BE9473] tabular-nums block">
                    Stage {stage.step}
                  </span>
                  <h2 className="text-xl font-bold text-[#14283B]">{stage.title}</h2>
                  <p className="text-sm text-[#566774] leading-relaxed">{stage.description}</p>
                  <ul className="pt-4 border-t border-[#E6EBED] space-y-2.5">
                    {stage.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs sm:text-sm text-[#14283B]">
                        <Check className="w-4 h-4 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#14283B]">
                  Factors Shaping Every Commercial Plan
                </h2>
                <p className="text-base text-[#566774] leading-relaxed">
                  Before preparing a proposal, Castro Cleaning evaluates how your building operates day to day.
                </p>
                <div className="bg-white border border-[#E6EBED] rounded-lg divide-y divide-[#E6EBED] px-6">
                  {FACILITY_VARIATION_FACTORS.map((item, idx) => (
                    <div key={item.title} className="py-4 flex items-baseline gap-3">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#14283B]">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-[#566774] mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#14283B]">
                  Five Pillars of Service Consistency
                </h2>
                <p className="text-base text-[#566774] leading-relaxed">
                  Focused operational habits designed to sustain long-term commercial partnerships.
                </p>
                <div className="bg-white border border-[#E6EBED] rounded-lg divide-y divide-[#E6EBED] px-6">
                  {STANDARD_OF_CARE_PILLARS.map((pillar) => (
                    <div key={pillar.index} className="py-4 flex items-start gap-3">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums mt-0.5">
                        {pillar.index}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#14283B]">{pillar.title}</h3>
                        <p className="text-xs sm:text-sm text-[#566774] mt-0.5">{pillar.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (route === 'areas') {
    return (
      <div>
        <SubPageHeader
          kicker="Service Areas"
          title="Local Commercial Cleaning for the Oklahoma City Metro"
          description="Verify published service cities across the Oklahoma City metropolitan area or check your facility’s ZIP code below."
        />
        <section className="py-16 sm:py-20 bg-[#F7FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CoverageChecker
              onProceedWithLocation={(loc) =>
                onOpenQuote({ mode: 'quick', location: loc })
              }
            />
          </div>
        </section>
      </div>
    );
  }

  if (route === 'faq') {
    return (
      <div>
        <SubPageHeader
          kicker="Frequently Asked Questions"
          title="Answers About Quotes, Walkthroughs, Supplies, and Coverage"
          description="Straightforward information based on published policies. For property-specific confirmation—including insurance documentation or custom scope requests—contact Castro Cleaning directly."
        />
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <FaqSection />

            <div className="bg-[#F7FAFB] border border-[#E6EBED] rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-[#14283B]">
                  Need confirmation for a specific facility policy?
                </h2>
                <p className="text-sm text-[#566774]">
                  Reach Castro Cleaning directly at {BRAND_INFO.email} or {BRAND_INFO.phone}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Contact Details
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (route === 'walkthrough') {
    return (
      <div>
        <SubPageHeader
          kicker="Request a Walkthrough"
          title="Coordinate an On-Site Facility Walkthrough"
          description="Walkthroughs help evaluate flooring, traffic zones, entry procedures, and cleaning priorities in person. Scheduling is coordinated directly with Castro Cleaning."
        />
        <section className="py-16 sm:py-20 bg-[#F7FAFB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <WalkthroughSection />
          </div>
        </section>
      </div>
    );
  }

  if (route === 'quote') {
    return (
      <div>
        <SubPageHeader
          kicker="Commercial Cleaning Quotes"
          title="Choose the Quote Pathway That Fits Your Timeline"
          description="Start with a lightweight Quick Commercial Inquiry if you want to connect first, or complete the Detailed Cleaning Quote to share square footage, schedules, flooring, and supplies preferences."
        />
        <section className="py-16 sm:py-20 bg-[#F7FAFB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuoteExperience
              key={`${quoteMode}-${prefilledIndustry}-${prefilledLocation}`}
              initialMode={quoteMode}
              prefilledIndustry={prefilledIndustry}
              prefilledLocation={prefilledLocation}
            />
          </div>
        </section>
      </div>
    );
  }

  if (route === 'about') {
    return (
      <div>
        <SubPageHeader
          kicker="About Castro Cleaning"
          title="Professional Commercial Cleaning. Built Around Your Business."
          description="A local commercial cleaning provider serving businesses and institutions throughout the Oklahoma City metropolitan area with structured, facility-specific service planning."
        />
        <section className="py-16 sm:py-20 bg-[#F7FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[#14283B]">
                  Dedicated Commercial Focus for OKC Metro Properties
                </h2>
                <p className="text-base text-[#566774] leading-relaxed">
                  Castro Cleaning focuses on commercial spaces—supporting offices, medical clinics, educational campuses, retail properties, industrial offices, and civic or religious facilities across the Oklahoma City metropolitan area.
                </p>
                <p className="text-base text-[#566774] leading-relaxed">
                  Rather than applying rigid, generic residential checklists to business environments, every engagement starts with understanding your property’s schedule, surfaces, and operational priorities so your cleaning plan fits smoothly into your workday.
                </p>
              </div>
              <div className="lg:col-span-6">
                <ArchImage
                  src={IMAGES.facilityReception}
                  alt="Spotless contemporary commercial reception hall in natural light"
                  aspectClass="aspect-[4/3]"
                  className="rounded-lg border border-[#E6EBED]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#E6EBED] rounded-lg p-7 space-y-2.5">
                <h3 className="text-lg font-bold text-[#14283B]">Facility-Specific Planning</h3>
                <p className="text-sm text-[#566774] leading-relaxed">
                  Cleaning scopes reflect actual floor types, restroom counts, foot traffic, and building hours.
                </p>
              </div>
              <div className="bg-white border border-[#E6EBED] rounded-lg p-7 space-y-2.5">
                <h3 className="text-lg font-bold text-[#14283B]">Dependable Processes</h3>
                <p className="text-sm text-[#566774] leading-relaxed">
                  Consistent routines and attention to shared common spaces help properties stay presentation-ready.
                </p>
              </div>
              <div className="bg-white border border-[#E6EBED] rounded-lg p-7 space-y-2.5">
                <h3 className="text-lg font-bold text-[#14283B]">Long-Term Relationships</h3>
                <p className="text-sm text-[#566774] leading-relaxed">
                  Focused on earning recurring trust through clear communication and steady day-to-day follow-through.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // CONTACT PAGE
  return (
    <div>
      <SubPageHeader
        kicker="Contact Castro Cleaning"
        title="Connect With Castro Cleaning in the Oklahoma City Metro"
        description="Reach out directly by email or phone, or start a structured commercial quote or walkthrough request online."
      />
      <section className="py-16 sm:py-20 bg-[#F7FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Direct Contact Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#E6EBED] rounded-lg p-7 sm:p-8 space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-[#14283B]">{BRAND_INFO.name}</h2>
                  <p className="text-sm text-[#566774]">{BRAND_INFO.region}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#E6EBED]">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-[#566774]">Email</p>
                      <a
                        href={`mailto:${BRAND_INFO.email}`}
                        className="text-base font-semibold text-[#14283B] hover:text-[#167D83] underline underline-offset-4 decoration-[#167D83]/40 transition-colors"
                      >
                        {BRAND_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-[#566774]">Phone</p>
                      <a
                        href={BRAND_INFO.phoneHref}
                        className="text-base font-semibold text-[#14283B] hover:text-[#167D83] tabular-nums transition-colors"
                      >
                        {BRAND_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-[#566774]">Service Coverage</p>
                      <p className="text-sm text-[#14283B] leading-relaxed">
                        Oklahoma City, Edmond, Yukon, Mustang, Moore, Norman, Midwest City, and surrounding OKC metro communities (confirmed per facility).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6EBED] space-y-3">
                  <p className="text-xs font-semibold text-[#14283B]">Clear Next Steps</p>
                  <p className="text-sm text-[#566774] leading-relaxed">
                    Share your facility location and industry via Quick Inquiry for an initial discussion, or use the Detailed Quote builder to outline square footage, flooring, and schedule preferences before coordinating a walkthrough.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Pathways */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-[#E6EBED] rounded-lg p-7 sm:p-8 space-y-4">
                <p className="text-xs font-semibold text-[#167D83]">Option A · Lightweight Start</p>
                <h2 className="text-2xl font-bold text-[#14283B]">Quick Commercial Inquiry</h2>
                <p className="text-sm text-[#566774] leading-relaxed">
                  Prefer to connect with Castro Cleaning before assembling building square footage and surface lists? Share your contact details, city or ZIP, and facility type.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenQuote({ mode: 'quick' })}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Open Quick Inquiry
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="bg-[#14283B] text-white rounded-lg p-7 sm:p-8 space-y-4">
                <p className="text-xs font-semibold text-[#BE9473]">Option B · Complete Scope</p>
                <h2 className="text-2xl font-bold text-white">Detailed Cleaning Quote</h2>
                <p className="text-sm text-[#E6EBED]/85 leading-relaxed">
                  Ready to share square footage, frequency, preferred cleaning hours, flooring surfaces, and supply preferences? Complete our five-step commercial scope builder.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenQuote({ mode: 'detailed' })}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Start Detailed Quote
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('walkthrough')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/25 hover:bg-white/10 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Request a Walkthrough
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
