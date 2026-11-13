import { useState, type FormEvent } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  Info,
  AlertCircle,
} from 'lucide-react';
import { BRAND_INFO, INDUSTRIES_SERVED } from '../data/castroData';

export type QuoteMode = 'quick' | 'detailed';

interface QuoteExperienceProps {
  initialMode?: QuoteMode;
  prefilledIndustry?: string;
  prefilledLocation?: string;
}

const PROPERTY_TYPES = [
  'Single-Tenant Office Building',
  'Multi-Tenant Commercial Suite',
  'Medical / Dental Clinic',
  'Educational Campus / School',
  'Bank / Financial Branch',
  'Industrial / Warehouse Office',
  'Retail Storefront / Showroom',
  'Hospitality / Event Venue',
  'Religious / Community Facility',
  'Municipal / Civic Property',
  'Other Commercial Space',
];

const FREQUENCIES = [
  '5 Days / Week (Daily)',
  '3 Days / Week',
  '2 Days / Week',
  'Weekly',
  'Bi-Weekly',
  'One-Time / Turnover',
  'Unsure — Need Recommendation',
];

const PREFERRED_HOURS = [
  'After Business Hours (Evening)',
  'Early Morning (Before Opening)',
  'During Daytime Hours',
  'Weekend Window',
  'Flexible / To Be Discussed',
];

const PRIORITY_AREAS = [
  'Lobbies & Reception Areas',
  'Private Offices & Workstations',
  'Conference & Meeting Rooms',
  'Restrooms & Locker Rooms',
  'Breakrooms & Kitchens',
  'High-Traffic Corridors',
  'Interior Glass & Entry Doors',
];

const ADDITIONAL_REQUIREMENTS = [
  'Hard-Surface Floor Care (Stripping / Waxing / Buffing)',
  'Commercial Carpet Maintenance',
  'Interior / Ground-Level Window Washing',
  'Post-Construction / Turnover Cleanup',
  'Eco-Conscious Product Preferences',
];

const FLOORING_TYPES = [
  'Commercial Carpet / Carpet Tile',
  'VCT / Vinyl Tile',
  'Luxury Vinyl Plank (LVP)',
  'Ceramic / Porcelain Tile',
  'Terrazzo or Natural Stone',
  'Sealed / Polished Concrete',
  'Hardwood / Laminate',
];

const SUPPLIES_PREFERENCES = [
  'Discuss supply options during quote review',
  'Castro Cleaning to provide cleaning chemicals & equipment',
  'Client provides facility consumables (paper, soap, liners)',
  'Coordinate both cleaning products & restocking consumables',
];

const DETAILED_STEPS = [
  { id: 1, label: 'Facility' },
  { id: 2, label: 'Cleaning Requirements' },
  { id: 3, label: 'Facility Details' },
  { id: 4, label: 'Contact' },
  { id: 5, label: 'Review' },
];

export function QuoteExperience({
  initialMode = 'quick',
  prefilledIndustry = '',
  prefilledLocation = '',
}: QuoteExperienceProps) {
  const [mode, setMode] = useState<QuoteMode>(initialMode);

  // Quick Inquiry State
  const [quickForm, setQuickForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    location: prefilledLocation,
    facilityType: prefilledIndustry || '',
    message: '',
  });
  const [quickErrors, setQuickErrors] = useState<Record<string, string>>({});
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  // Detailed 5-Step Quote State
  const [step, setStep] = useState<number>(1);
  const [detailedForm, setDetailedForm] = useState({
    // Step 1: Facility
    industry: prefilledIndustry || '',
    propertyType: '',
    squareFootage: '',
    location: prefilledLocation,
    // Step 2: Cleaning Requirements
    frequency: '',
    preferredHours: '',
    priorities: [] as string[],
    additionalRequirements: [] as string[],
    // Step 3: Facility Details
    flooringTypes: [] as string[],
    restroomCount: '',
    highTrafficAreas: '',
    suppliesPreference: SUPPLIES_PREFERENCES[0],
    // Step 4: Contact
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [detailedSubmitted, setDetailedSubmitted] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const toggleArrayValue = (
    field: 'priorities' | 'additionalRequirements' | 'flooringTypes',
    value: string
  ) => {
    setDetailedForm((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value],
      };
    });
  };

  const handleQuickSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!quickForm.companyName.trim()) errs.companyName = 'Company name is required.';
    if (!quickForm.contactName.trim()) errs.contactName = 'Contact name is required.';
    if (!quickForm.email.trim()) {
      errs.email = 'Business email is required.';
    } else if (!isValidEmail(quickForm.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!quickForm.location.trim()) errs.location = 'City or ZIP code is required.';
    if (!quickForm.facilityType.trim()) errs.facilityType = 'Please select a facility type.';

    setQuickErrors(errs);
    if (Object.keys(errs).length === 0) {
      setQuickSubmitted(true);
    }
  };

  const validateDetailedStep = (targetStep: number): boolean => {
    const errs: Record<string, string> = {};
    if (targetStep === 1) {
      if (!detailedForm.industry) errs.industry = 'Please select an industry.';
      if (!detailedForm.propertyType) errs.propertyType = 'Please select a property type.';
      if (!detailedForm.squareFootage.trim()) {
        errs.squareFootage = 'Approximate square footage is required.';
      }
      if (!detailedForm.location.trim()) errs.location = 'City or ZIP code is required.';
    } else if (targetStep === 2) {
      if (!detailedForm.frequency) errs.frequency = 'Please select a desired frequency.';
      if (!detailedForm.preferredHours) errs.preferredHours = 'Please select preferred hours.';
      if (detailedForm.priorities.length === 0) {
        errs.priorities = 'Select at least one cleaning priority.';
      }
    } else if (targetStep === 3) {
      if (detailedForm.flooringTypes.length === 0) {
        errs.flooringTypes = 'Select at least one flooring type.';
      }
    } else if (targetStep === 4) {
      if (!detailedForm.companyName.trim()) errs.companyName = 'Company name is required.';
      if (!detailedForm.contactName.trim()) errs.contactName = 'Contact name is required.';
      if (!detailedForm.email.trim()) {
        errs.email = 'Email address is required.';
      } else if (!isValidEmail(detailedForm.email)) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateDetailedStep(step)) {
      setStep((s) => Math.min(5, s + 1));
    }
  };

  const handleDetailedSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDetailedSubmitted(true);
  };

  const buildSummaryText = (kind: 'quick' | 'detailed') => {
    if (kind === 'quick') {
      return [
        'CASTRO CLEANING — QUICK COMMERCIAL INQUIRY',
        `Company: ${quickForm.companyName}`,
        `Contact: ${quickForm.contactName}`,
        `Email: ${quickForm.email}`,
        `City / ZIP: ${quickForm.location}`,
        `Facility Type: ${quickForm.facilityType}`,
        `Message: ${quickForm.message || 'None provided'}`,
      ].join('\n');
    }

    return [
      'CASTRO CLEANING — DETAILED COMMERCIAL QUOTE REQUEST',
      `Company: ${detailedForm.companyName}`,
      `Contact: ${detailedForm.contactName}`,
      `Email: ${detailedForm.email}`,
      `Phone: ${detailedForm.phone || 'Not provided'}`,
      `Industry: ${detailedForm.industry}`,
      `Property Type: ${detailedForm.propertyType}`,
      `Approx. Sq Ft: ${detailedForm.squareFootage}`,
      `City / ZIP: ${detailedForm.location}`,
      `Frequency: ${detailedForm.frequency}`,
      `Preferred Hours: ${detailedForm.preferredHours}`,
      `Main Priorities: ${detailedForm.priorities.join(', ')}`,
      `Additional Services: ${detailedForm.additionalRequirements.join(', ') || 'None selected'}`,
      `Flooring Types: ${detailedForm.flooringTypes.join(', ')}`,
      `Restrooms: ${detailedForm.restroomCount || 'Not specified'}`,
      `High-Traffic Areas: ${detailedForm.highTrafficAreas || 'Not specified'}`,
      `Supplies Preference: ${detailedForm.suppliesPreference}`,
      `Notes: ${detailedForm.notes || 'None'}`,
    ].join('\n');
  };

  const copySummary = async (kind: 'quick' | 'detailed') => {
    try {
      await navigator.clipboard.writeText(buildSummaryText(kind));
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2500);
    } catch {
      // Clipboard unsupported in restricted context
    }
  };

  return (
    <div className="space-y-8">
      {/* Pathway Selector Tabs */}
      <div className="bg-white border border-[#E6EBED] rounded-lg p-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setMode('quick');
            setQuickErrors({});
          }}
          className={`text-left p-4 rounded-md transition-colors cursor-pointer ${
            mode === 'quick'
              ? 'bg-[#14283B] text-white'
              : 'bg-transparent text-[#14283B] hover:bg-[#F7FAFB]'
          }`}
        >
          <p
            className={`text-xs font-semibold mb-1 ${
              mode === 'quick' ? 'text-[#BE9473]' : 'text-[#167D83]'
            }`}
          >
            Option A · Fast Start
          </p>
          <p className="font-[family-name:var(--font-display)] text-base font-bold">
            Quick Commercial Inquiry
          </p>
          <p
            className={`text-xs mt-1 ${
              mode === 'quick' ? 'text-[#E6EBED]/80' : 'text-[#566774]'
            }`}
          >
            Best if you prefer to connect first before sharing detailed building specifications.
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setMode('detailed');
            setStepErrors({});
          }}
          className={`text-left p-4 rounded-md transition-colors cursor-pointer ${
            mode === 'detailed'
              ? 'bg-[#14283B] text-white'
              : 'bg-transparent text-[#14283B] hover:bg-[#F7FAFB]'
          }`}
        >
          <p
            className={`text-xs font-semibold mb-1 ${
              mode === 'detailed' ? 'text-[#BE9473]' : 'text-[#167D83]'
            }`}
          >
            Option B · 5-Step Scope Builder
          </p>
          <p className="font-[family-name:var(--font-display)] text-base font-bold">
            Detailed Cleaning Quote
          </p>
          <p
            className={`text-xs mt-1 ${
              mode === 'detailed' ? 'text-[#E6EBED]/80' : 'text-[#566774]'
            }`}
          >
            Share facility size, schedule, flooring, and supply preferences for a tailored proposal.
          </p>
        </button>
      </div>

      {/* OPTION A: QUICK COMMERCIAL INQUIRY */}
      {mode === 'quick' && (
        <div className="bg-white border border-[#E6EBED] rounded-lg p-6 sm:p-8 lg:p-10">
          {quickSubmitted ? (
            <div className="space-y-6">
              <div className="p-5 rounded-md bg-[#167D83]/8 border border-[#167D83]/30 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-2 text-sm text-[#14283B]">
                  <p className="font-bold">
                    Demonstration Preview — Inquiry Prepared (Not Sent to a Live Server)
                  </p>
                  <p className="text-[#566774] leading-relaxed">
                    This website redesign is a frontend demonstration created by S.Mideros Agency. No inquiry was transmitted electronically. To submit a real commercial inquiry to Castro Cleaning, send your prepared summary directly by email or phone below.
                  </p>
                </div>
              </div>

              <div className="bg-[#F7FAFB] border border-[#E6EBED] rounded-md p-5 space-y-2 text-sm">
                <p className="font-semibold text-[#14283B] mb-2">Prepared Inquiry Details</p>
                <p>
                  <span className="text-[#566774]">Company:</span> {quickForm.companyName}
                </p>
                <p>
                  <span className="text-[#566774]">Contact:</span> {quickForm.contactName} (
                  {quickForm.email})
                </p>
                <p>
                  <span className="text-[#566774]">Location:</span> {quickForm.location}
                </p>
                <p>
                  <span className="text-[#566774]">Facility Type:</span> {quickForm.facilityType}
                </p>
                {quickForm.message && (
                  <p>
                    <span className="text-[#566774]">Message:</span> {quickForm.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
                    `Commercial Cleaning Inquiry — ${quickForm.companyName}`
                  )}&body=${encodeURIComponent(buildSummaryText('quick'))}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Email Summary to {BRAND_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={() => copySummary('quick')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#E6EBED] bg-white hover:bg-[#F7FAFB] text-sm font-medium text-[#14283B] transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  {copiedNotice ? 'Copied Summary' : 'Copy Details'}
                </button>
                <button
                  type="button"
                  onClick={() => setQuickSubmitted(false)}
                  className="text-sm font-medium text-[#566774] hover:text-[#14283B] px-3 py-2 cursor-pointer"
                >
                  Edit Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} noValidate className="space-y-6">
              <div className="space-y-1.5 pb-4 border-b border-[#E6EBED]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#14283B]">
                  Quick Commercial Inquiry
                </h3>
                <p className="text-sm text-[#566774]">
                  Provide basic facility information to start a conversation with Castro Cleaning. Fields marked with * are required.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="quick-company"
                    className="block text-sm font-medium text-[#14283B] mb-1.5"
                  >
                    Company Name *
                  </label>
                  <input
                    id="quick-company"
                    type="text"
                    value={quickForm.companyName}
                    onChange={(e) =>
                      setQuickForm({ ...quickForm, companyName: e.target.value })
                    }
                    placeholder="Organization or building name"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B] focus:border-[#167D83] focus:bg-white transition-colors"
                  />
                  {quickErrors.companyName && (
                    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      {quickErrors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="quick-contact"
                    className="block text-sm font-medium text-[#14283B] mb-1.5"
                  >
                    Contact Name *
                  </label>
                  <input
                    id="quick-contact"
                    type="text"
                    value={quickForm.contactName}
                    onChange={(e) =>
                      setQuickForm({ ...quickForm, contactName: e.target.value })
                    }
                    placeholder="Full name"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B] focus:border-[#167D83] focus:bg-white transition-colors"
                  />
                  {quickErrors.contactName && (
                    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      {quickErrors.contactName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="quick-email"
                    className="block text-sm font-medium text-[#14283B] mb-1.5"
                  >
                    Business Email *
                  </label>
                  <input
                    id="quick-email"
                    type="email"
                    value={quickForm.email}
                    onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B] focus:border-[#167D83] focus:bg-white transition-colors"
                  />
                  {quickErrors.email && (
                    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      {quickErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="quick-location"
                    className="block text-sm font-medium text-[#14283B] mb-1.5"
                  >
                    City or ZIP Code *
                  </label>
                  <input
                    id="quick-location"
                    type="text"
                    value={quickForm.location}
                    onChange={(e) => setQuickForm({ ...quickForm, location: e.target.value })}
                    placeholder="e.g. Oklahoma City, Edmond, or 73102"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B] focus:border-[#167D83] focus:bg-white transition-colors"
                  />
                  {quickErrors.location && (
                    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      {quickErrors.location}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="quick-facility-type"
                  className="block text-sm font-medium text-[#14283B] mb-1.5"
                >
                  Type of Facility *
                </label>
                <select
                  id="quick-facility-type"
                  value={quickForm.facilityType}
                  onChange={(e) =>
                    setQuickForm({ ...quickForm, facilityType: e.target.value })
                  }
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B] focus:border-[#167D83] focus:bg-white transition-colors"
                >
                  <option value="">Select facility industry...</option>
                  {INDUSTRIES_SERVED.map((ind) => (
                    <option key={ind.id} value={ind.name}>
                      {ind.name}
                    </option>
                  ))}
                </select>
                {quickErrors.facilityType && (
                  <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {quickErrors.facilityType}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="quick-message"
                  className="block text-sm font-medium text-[#14283B] mb-1.5"
                >
                  Brief Message <span className="text-[#566774] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="quick-message"
                  rows={3}
                  value={quickForm.message}
                  onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                  placeholder="Share helpful context such as preferred days, floor care needs, or whether you would like an on-site walkthrough."
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B] focus:border-[#167D83] focus:bg-white transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#566774]">
                  Frontend redesign demonstration. Real inquiries can be sent directly to{' '}
                  {BRAND_INFO.email}.
                </p>
                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-3 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request a Cleaning Consultation
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* OPTION B: DETAILED 5-STEP CLEANING QUOTE */}
      {mode === 'detailed' && (
        <div className="bg-white border border-[#E6EBED] rounded-lg overflow-hidden">
          {/* Progress Header */}
          <div className="bg-[#F7FAFB] border-b border-[#E6EBED] px-6 sm:px-8 py-5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <p className="text-xs font-semibold text-[#167D83]">
                Step {step} of {DETAILED_STEPS.length}
              </p>
              <p className="text-xs text-[#566774]">
                Click any completed step to review or edit
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {DETAILED_STEPS.map((item) => {
                const isCurrent = item.id === step;
                const isCompleted = item.id < step;
                const canJump = item.id <= step && !detailedSubmitted;
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={!canJump}
                    onClick={() => canJump && setStep(item.id)}
                    className={`text-left p-2.5 rounded-md border transition-colors ${
                      isCurrent
                        ? 'bg-[#14283B] text-white border-[#14283B]'
                        : isCompleted
                          ? 'bg-white text-[#14283B] border-[#167D83]/40 hover:border-[#167D83] cursor-pointer'
                          : 'bg-white/50 text-[#566774] border-[#E6EBED] cursor-default'
                    }`}
                  >
                    <span className="block font-[family-name:var(--font-mono)] text-[11px] tabular-nums opacity-75">
                      0{item.id}
                    </span>
                    <span className="block text-xs font-semibold truncate mt-0.5">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {detailedSubmitted ? (
              <div className="space-y-6">
                <div className="p-5 rounded-md bg-[#167D83]/8 border border-[#167D83]/30 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-2 text-sm text-[#14283B]">
                    <p className="font-bold">
                      Demonstration Preview — Commercial Quote Scope Prepared (Not Transmitted)
                    </p>
                    <p className="text-[#566774] leading-relaxed">
                      Because this redesign is a frontend demonstration by S.Mideros Agency with no live backend connected, your quote request was not transmitted automatically. You can email this completed scope directly to {BRAND_INFO.email} or copy it below.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
                      `Commercial Cleaning Quote Request — ${detailedForm.companyName}`
                    )}&body=${encodeURIComponent(buildSummaryText('detailed'))}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Email Scope to {BRAND_INFO.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => copySummary('detailed')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#E6EBED] bg-white hover:bg-[#F7FAFB] text-sm font-medium text-[#14283B] transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    {copiedNotice ? 'Copied Full Scope' : 'Copy Scope Summary'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDetailedSubmitted(false);
                      setStep(1);
                    }}
                    className="text-sm font-medium text-[#566774] hover:text-[#14283B] px-3 py-2 cursor-pointer"
                  >
                    Modify Scope
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDetailedSubmit} noValidate className="space-y-6">
                {/* STEP 1: FACILITY */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#14283B]">Step 1 — Facility</h3>
                      <p className="text-sm text-[#566774]">
                        Identify your building’s industry category, property format, and location.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="det-industry"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Industry *
                        </label>
                        <select
                          id="det-industry"
                          value={detailedForm.industry}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, industry: e.target.value })
                          }
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        >
                          <option value="">Select industry...</option>
                          {INDUSTRIES_SERVED.map((ind) => (
                            <option key={ind.id} value={ind.name}>
                              {ind.name}
                            </option>
                          ))}
                        </select>
                        {stepErrors.industry && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.industry}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="det-property-type"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Property Type *
                        </label>
                        <select
                          id="det-property-type"
                          value={detailedForm.propertyType}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, propertyType: e.target.value })
                          }
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        >
                          <option value="">Select property type...</option>
                          {PROPERTY_TYPES.map((pt) => (
                            <option key={pt} value={pt}>
                              {pt}
                            </option>
                          ))}
                        </select>
                        {stepErrors.propertyType && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.propertyType}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="det-sqft"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Approximate Square Footage *
                        </label>
                        <input
                          id="det-sqft"
                          type="text"
                          value={detailedForm.squareFootage}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, squareFootage: e.target.value })
                          }
                          placeholder="e.g. 8,500 sq ft or Unsure"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        />
                        {stepErrors.squareFootage && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.squareFootage}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="det-location"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          City or ZIP Code *
                        </label>
                        <input
                          id="det-location"
                          type="text"
                          value={detailedForm.location}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, location: e.target.value })
                          }
                          placeholder="e.g. Norman or 73072"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        />
                        {stepErrors.location && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: CLEANING REQUIREMENTS */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#14283B]">
                        Step 2 — Cleaning Requirements
                      </h3>
                      <p className="text-sm text-[#566774]">
                        Outline your preferred service cadence, timing window, and priority zones.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="det-frequency"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Desired Frequency *
                        </label>
                        <select
                          id="det-frequency"
                          value={detailedForm.frequency}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, frequency: e.target.value })
                          }
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        >
                          <option value="">Select frequency...</option>
                          {FREQUENCIES.map((freq) => (
                            <option key={freq} value={freq}>
                              {freq}
                            </option>
                          ))}
                        </select>
                        {stepErrors.frequency && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.frequency}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="det-hours"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Preferred Cleaning Hours *
                        </label>
                        <select
                          id="det-hours"
                          value={detailedForm.preferredHours}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, preferredHours: e.target.value })
                          }
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        >
                          <option value="">Select timing window...</option>
                          {PREFERRED_HOURS.map((hr) => (
                            <option key={hr} value={hr}>
                              {hr}
                            </option>
                          ))}
                        </select>
                        {stepErrors.preferredHours && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.preferredHours}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#14283B] mb-2">
                        Main Cleaning Priorities *
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {PRIORITY_AREAS.map((area) => {
                          const checked = detailedForm.priorities.includes(area);
                          return (
                            <button
                              key={area}
                              type="button"
                              onClick={() => toggleArrayValue('priorities', area)}
                              className={`text-left px-3.5 py-2.5 rounded-md border text-sm flex items-center gap-2.5 min-h-[44px] transition-colors cursor-pointer ${
                                checked
                                  ? 'bg-[#14283B] text-white border-[#14283B]'
                                  : 'bg-[#F7FAFB] text-[#14283B] border-[#E6EBED] hover:border-[#167D83]/50'
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                                  checked
                                    ? 'bg-[#167D83] border-[#167D83] text-white'
                                    : 'border-[#566774]/40 bg-white'
                                }`}
                              >
                                {checked && <Check className="w-3 h-3" />}
                              </span>
                              <span>{area}</span>
                            </button>
                          );
                        })}
                      </div>
                      {stepErrors.priorities && (
                        <p className="mt-1.5 text-xs text-red-700">{stepErrors.priorities}</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#14283B] mb-2">
                        Additional Service Requirements{' '}
                        <span className="text-[#566774] font-normal">(Optional)</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ADDITIONAL_REQUIREMENTS.map((req) => {
                          const checked = detailedForm.additionalRequirements.includes(req);
                          return (
                            <button
                              key={req}
                              type="button"
                              onClick={() => toggleArrayValue('additionalRequirements', req)}
                              className={`text-left px-3.5 py-2.5 rounded-md border text-sm flex items-center gap-2.5 min-h-[44px] transition-colors cursor-pointer ${
                                checked
                                  ? 'bg-[#167D83]/10 text-[#14283B] border-[#167D83]'
                                  : 'bg-[#F7FAFB] text-[#566774] border-[#E6EBED] hover:border-[#167D83]/50'
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                                  checked
                                    ? 'bg-[#167D83] border-[#167D83] text-white'
                                    : 'border-[#566774]/40 bg-white'
                                }`}
                              >
                                {checked && <Check className="w-3 h-3" />}
                              </span>
                              <span>{req}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: FACILITY DETAILS */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#14283B]">
                        Step 3 — Facility Details
                      </h3>
                      <p className="text-sm text-[#566774]">
                        Share flooring surfaces, restroom count, and supply coordination preferences.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#14283B] mb-2">
                        Flooring Types Present *
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {FLOORING_TYPES.map((floor) => {
                          const checked = detailedForm.flooringTypes.includes(floor);
                          return (
                            <button
                              key={floor}
                              type="button"
                              onClick={() => toggleArrayValue('flooringTypes', floor)}
                              className={`text-left px-3.5 py-2.5 rounded-md border text-sm flex items-center gap-2.5 min-h-[44px] transition-colors cursor-pointer ${
                                checked
                                  ? 'bg-[#14283B] text-white border-[#14283B]'
                                  : 'bg-[#F7FAFB] text-[#14283B] border-[#E6EBED] hover:border-[#167D83]/50'
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                                  checked
                                    ? 'bg-[#167D83] border-[#167D83] text-white'
                                    : 'border-[#566774]/40 bg-white'
                                }`}
                              >
                                {checked && <Check className="w-3 h-3" />}
                              </span>
                              <span>{floor}</span>
                            </button>
                          );
                        })}
                      </div>
                      {stepErrors.flooringTypes && (
                        <p className="mt-1.5 text-xs text-red-700">{stepErrors.flooringTypes}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="det-restrooms"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Number of Restrooms{' '}
                          <span className="text-[#566774] font-normal">(Optional)</span>
                        </label>
                        <input
                          id="det-restrooms"
                          type="text"
                          value={detailedForm.restroomCount}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, restroomCount: e.target.value })
                          }
                          placeholder="e.g. 4 multi-stall or 2 single"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="det-traffic"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          High-Traffic Areas{' '}
                          <span className="text-[#566774] font-normal">(Optional)</span>
                        </label>
                        <input
                          id="det-traffic"
                          type="text"
                          value={detailedForm.highTrafficAreas}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, highTrafficAreas: e.target.value })
                          }
                          placeholder="e.g. Main atrium, main corridor, breakroom"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="det-supplies"
                        className="block text-sm font-medium text-[#14283B] mb-1.5"
                      >
                        Supplies Preferences
                      </label>
                      <select
                        id="det-supplies"
                        value={detailedForm.suppliesPreference}
                        onChange={(e) =>
                          setDetailedForm({ ...detailedForm, suppliesPreference: e.target.value })
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                      >
                        {SUPPLIES_PREFERENCES.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONTACT */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#14283B]">Step 4 — Contact</h3>
                      <p className="text-sm text-[#566774]">
                        Let Castro Cleaning know who should receive your tailored cleaning proposal.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="det-company"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Company Name *
                        </label>
                        <input
                          id="det-company"
                          type="text"
                          value={detailedForm.companyName}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, companyName: e.target.value })
                          }
                          placeholder="Organization or property name"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        />
                        {stepErrors.companyName && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.companyName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="det-contact-name"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Contact Name *
                        </label>
                        <input
                          id="det-contact-name"
                          type="text"
                          value={detailedForm.contactName}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, contactName: e.target.value })
                          }
                          placeholder="Full name"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        />
                        {stepErrors.contactName && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.contactName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="det-email"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Email *
                        </label>
                        <input
                          id="det-email"
                          type="email"
                          value={detailedForm.email}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, email: e.target.value })
                          }
                          placeholder="name@company.com"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        />
                        {stepErrors.email && (
                          <p className="mt-1.5 text-xs text-red-700">{stepErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="det-phone"
                          className="block text-sm font-medium text-[#14283B] mb-1.5"
                        >
                          Phone <span className="text-[#566774] font-normal">(Optional)</span>
                        </label>
                        <input
                          id="det-phone"
                          type="tel"
                          value={detailedForm.phone}
                          onChange={(e) =>
                            setDetailedForm({ ...detailedForm, phone: e.target.value })
                          }
                          placeholder="(405) 000-0000"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="det-notes"
                        className="block text-sm font-medium text-[#14283B] mb-1.5"
                      >
                        Additional Notes{' '}
                        <span className="text-[#566774] font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="det-notes"
                        rows={3}
                        value={detailedForm.notes}
                        onChange={(e) =>
                          setDetailedForm({ ...detailedForm, notes: e.target.value })
                        }
                        placeholder="Mention building access procedures, walkthrough interest, or specific target start timelines."
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-[#14283B]">Step 5 — Review Request</h3>
                      <p className="text-sm text-[#566774]">
                        Verify your facility scope below. Select Edit on any section to adjust details before continuing.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Summary Block 1 */}
                      <div className="p-5 rounded-md bg-[#F7FAFB] border border-[#E6EBED] space-y-2">
                        <div className="flex items-center justify-between border-b border-[#E6EBED] pb-2 mb-2">
                          <span className="text-xs font-semibold text-[#14283B]">
                            01 · Facility
                          </span>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-xs font-semibold text-[#167D83] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Industry:</span> {detailedForm.industry}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Property:</span>{' '}
                          {detailedForm.propertyType}
                        </p>
                        <p className="text-sm text-[#14283B] tabular-nums">
                          <span className="text-[#566774]">Approx. Area:</span>{' '}
                          {detailedForm.squareFootage}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Location:</span> {detailedForm.location}
                        </p>
                      </div>

                      {/* Summary Block 2 */}
                      <div className="p-5 rounded-md bg-[#F7FAFB] border border-[#E6EBED] space-y-2">
                        <div className="flex items-center justify-between border-b border-[#E6EBED] pb-2 mb-2">
                          <span className="text-xs font-semibold text-[#14283B]">
                            02 · Cleaning Requirements
                          </span>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="text-xs font-semibold text-[#167D83] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Frequency:</span>{' '}
                          {detailedForm.frequency}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Hours:</span>{' '}
                          {detailedForm.preferredHours}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Priorities:</span>{' '}
                          {detailedForm.priorities.join(', ')}
                        </p>
                        {detailedForm.additionalRequirements.length > 0 && (
                          <p className="text-sm text-[#14283B]">
                            <span className="text-[#566774]">Additional:</span>{' '}
                            {detailedForm.additionalRequirements.join(', ')}
                          </p>
                        )}
                      </div>

                      {/* Summary Block 3 */}
                      <div className="p-5 rounded-md bg-[#F7FAFB] border border-[#E6EBED] space-y-2">
                        <div className="flex items-center justify-between border-b border-[#E6EBED] pb-2 mb-2">
                          <span className="text-xs font-semibold text-[#14283B]">
                            03 · Facility Details
                          </span>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="text-xs font-semibold text-[#167D83] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Flooring:</span>{' '}
                          {detailedForm.flooringTypes.join(', ')}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Restrooms:</span>{' '}
                          {detailedForm.restroomCount || 'Not specified'}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">High-Traffic:</span>{' '}
                          {detailedForm.highTrafficAreas || 'Not specified'}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Supplies:</span>{' '}
                          {detailedForm.suppliesPreference}
                        </p>
                      </div>

                      {/* Summary Block 4 */}
                      <div className="p-5 rounded-md bg-[#F7FAFB] border border-[#E6EBED] space-y-2">
                        <div className="flex items-center justify-between border-b border-[#E6EBED] pb-2 mb-2">
                          <span className="text-xs font-semibold text-[#14283B]">
                            04 · Contact
                          </span>
                          <button
                            type="button"
                            onClick={() => setStep(4)}
                            className="text-xs font-semibold text-[#167D83] hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Company:</span>{' '}
                          {detailedForm.companyName}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Name:</span> {detailedForm.contactName}
                        </p>
                        <p className="text-sm text-[#14283B]">
                          <span className="text-[#566774]">Email:</span> {detailedForm.email}
                        </p>
                        {detailedForm.phone && (
                          <p className="text-sm text-[#14283B] tabular-nums">
                            <span className="text-[#566774]">Phone:</span> {detailedForm.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#566774] leading-relaxed">
                      Note: This redesign is a frontend demonstration. Submitting prepares your review summary locally without transmitting data to a remote server; you can email the prepared scope directly to {BRAND_INFO.email}.
                    </p>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="pt-4 border-t border-[#E6EBED] flex items-center justify-between gap-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-md border border-[#E6EBED] bg-white hover:bg-[#F7FAFB] text-sm font-medium text-[#14283B] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      Previous
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-6 py-2.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Request My Commercial Cleaning Quote
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
