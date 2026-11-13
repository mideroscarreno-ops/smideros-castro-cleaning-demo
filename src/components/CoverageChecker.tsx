import { useState, type FormEvent } from 'react';
import { MapPin, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { CONFIRMED_SERVICE_AREAS } from '../data/castroData';

interface CoverageCheckerProps {
  onProceedWithLocation: (locationQuery: string) => void;
}

export function CoverageChecker({ onProceedWithLocation }: CoverageCheckerProps) {
  const [query, setQuery] = useState('');
  const [activeCity, setActiveCity] = useState<string>('Oklahoma City');
  const [checkResult, setCheckResult] = useState<{
    status: 'confirmed' | 'confirm-direct' | 'empty';
    message: string;
    matchedCity?: string;
  } | null>(null);

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = query.trim();
    if (!cleaned) {
      setCheckResult({
        status: 'empty',
        message: 'Enter a city name or 5-digit Oklahoma City metro ZIP code to check.',
      });
      return;
    }

    const lower = cleaned.toLowerCase();
    const matchedByCity = CONFIRMED_SERVICE_AREAS.find(
      (area) => area.city.toLowerCase() === lower || area.city.toLowerCase().includes(lower)
    );
    const matchedByZip = CONFIRMED_SERVICE_AREAS.find((area) =>
      area.zips.some((zip) => zip === cleaned)
    );

    const match = matchedByCity || matchedByZip;
    if (match) {
      setActiveCity(match.city);
      setCheckResult({
        status: 'confirmed',
        matchedCity: match.city,
        message: `${match.city} (${cleaned}) is within Castro Cleaning’s published Oklahoma City metro service area. Exact scheduling and facility availability are confirmed directly for each property.`,
      });
      return;
    }

    if (/^73[01]\d{2}$/.test(cleaned)) {
      setCheckResult({
        status: 'confirm-direct',
        message: `ZIP code ${cleaned} falls within the broader 730/731 central Oklahoma postal region. Please submit an inquiry or contact Castro Cleaning directly to confirm service availability for your specific facility.`,
      });
      return;
    }

    setCheckResult({
      status: 'confirm-direct',
      message: `"${cleaned}" is outside the primary listed OKC metro cities. Service availability is confirmed individually per facility—reach out directly to verify coverage for your property.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left: Confirmed Service Areas */}
      <div className="lg:col-span-7 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONFIRMED_SERVICE_AREAS.map((area) => {
            const isSelected = activeCity === area.city;
            return (
              <button
                key={area.city}
                type="button"
                onClick={() => {
                  setActiveCity(area.city);
                  setQuery(area.city);
                  setCheckResult({
                    status: 'confirmed',
                    matchedCity: area.city,
                    message: `${area.city} is a confirmed Oklahoma City metro service area. Facility availability is verified per property.`,
                  });
                }}
                className={`text-left p-4 rounded-lg border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#14283B] text-white border-[#14283B]'
                    : 'bg-white text-[#14283B] border-[#E6EBED] hover:border-[#167D83]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-base">{area.city}</span>
                  <MapPin
                    aria-hidden="true"
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#BE9473]' : 'text-[#167D83]'
                    }`}
                  />
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isSelected ? 'text-[#E6EBED]/80' : 'text-[#566774]'
                  }`}
                >
                  {area.note}
                </p>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[#566774] leading-relaxed">
          Surrounding Oklahoma City metropolitan communities are reviewed on a property-by-property basis. Service availability is confirmed individually for each facility.
        </p>
      </div>

      {/* Right: Interactive City / ZIP Check */}
      <div className="lg:col-span-5 bg-white border border-[#E6EBED] rounded-lg p-6 sm:p-8 space-y-5">
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-[#14283B]">Check Facility Coverage</h3>
          <p className="text-sm text-[#566774]">
            Enter your Oklahoma City metro city or ZIP code to verify published service areas.
          </p>
        </div>

        <form onSubmit={handleCheck} className="space-y-3" noValidate>
          <div>
            <label
              htmlFor="coverage-location-input"
              className="block text-xs font-semibold text-[#14283B] mb-1.5"
            >
              City or ZIP Code
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                id="coverage-location-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Edmond or 73102"
                className="flex-1 min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B] placeholder:text-[#566774]/65 focus:border-[#167D83] focus:bg-white transition-colors"
              />
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Verify Area
              </button>
            </div>
          </div>
        </form>

        {checkResult && (
          <div
            role="status"
            aria-live="polite"
            className={`p-4 rounded-md border text-sm leading-relaxed flex items-start gap-3 ${
              checkResult.status === 'confirmed'
                ? 'bg-[#167D83]/8 border-[#167D83]/30 text-[#14283B]'
                : checkResult.status === 'empty'
                  ? 'bg-[#BE9473]/12 border-[#BE9473]/40 text-[#14283B]'
                  : 'bg-[#F7FAFB] border-[#E6EBED] text-[#14283B]'
            }`}
          >
            {checkResult.status === 'confirmed' ? (
              <CheckCircle2
                aria-hidden="true"
                className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5"
              />
            ) : (
              <Info aria-hidden="true" className="w-5 h-5 text-[#566774] shrink-0 mt-0.5" />
            )}
            <div className="space-y-3">
              <p>{checkResult.message}</p>
              {checkResult.status !== 'empty' && (
                <button
                  type="button"
                  onClick={() => onProceedWithLocation(query.trim() || activeCity)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#167D83] hover:text-[#116267] transition-colors cursor-pointer"
                >
                  Inquire for {query.trim() || activeCity}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
