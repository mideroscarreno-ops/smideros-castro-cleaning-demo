import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { INDUSTRIES_SERVED } from '../data/castroData';
import { ArchImage } from './ArchImage';

interface IndustryExplorerProps {
  onSelectIndustryForQuote: (industryName: string) => void;
}

export function IndustryExplorer({ onSelectIndustryForQuote }: IndustryExplorerProps) {
  const [selectedId, setSelectedId] = useState<string>(INDUSTRIES_SERVED[0].id);
  const current = INDUSTRIES_SERVED.find((item) => item.id === selectedId) ?? INDUSTRIES_SERVED[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
      {/* Left Selector List */}
      <div
        role="tablist"
        aria-label="Commercial facility industries"
        className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5"
      >
        {INDUSTRIES_SERVED.map((industry, idx) => {
          const isSelected = industry.id === current.id;
          return (
            <button
              key={industry.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedId(industry.id)}
              className={`w-full text-left px-4 py-3 rounded-md border transition-colors flex items-center justify-between gap-3 min-h-[44px] cursor-pointer ${
                isSelected
                  ? 'bg-[#14283B] text-white border-[#14283B]'
                  : 'bg-white text-[#14283B] border-[#E6EBED] hover:border-[#167D83]/50 hover:bg-[#F7FAFB]'
              }`}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span
                  className={`font-[family-name:var(--font-mono)] text-xs tabular-nums shrink-0 ${
                    isSelected ? 'text-[#BE9473]' : 'text-[#566774]'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium truncate">{industry.name}</span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isSelected ? 'text-[#BE9473] translate-x-0.5' : 'text-[#566774]/60'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Right Detail Architectural Panel */}
      <div
        role="tabpanel"
        aria-label={current.name}
        className="lg:col-span-7 bg-white border border-[#E6EBED] rounded-lg overflow-hidden flex flex-col justify-between"
      >
        <div>
          <ArchImage
            src={current.image}
            alt={current.imageAlt}
            aspectClass="aspect-[16/9]"
          />
          <div className="p-6 sm:p-8 lg:p-10 space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#167D83]">
                Verified Inquiry Category · Commercial Facilities
              </p>
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#14283B] leading-tight">
                {current.name}
              </h3>
              <p className="text-base font-medium text-[#14283B]/85">{current.headline}</p>
            </div>

            <p className="text-sm sm:text-base text-[#566774] leading-relaxed">
              {current.description}
            </p>

            <div className="pt-4 border-t border-[#E6EBED]">
              <p className="text-xs font-semibold text-[#14283B] mb-3">
                Common Cleaning Considerations
              </p>
              <ul className="space-y-2.5">
                {current.considerations.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-[#566774]">
                    <Check
                      aria-hidden="true"
                      className="w-4 h-4 text-[#167D83] mt-0.5 shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 lg:px-10 py-5 bg-[#F7FAFB] border-t border-[#E6EBED] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-[#566774]">
            Scope and facility requirements are confirmed directly with Castro Cleaning.
          </p>
          <button
            type="button"
            onClick={() => onSelectIndustryForQuote(current.name)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Discuss Your Facility
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
