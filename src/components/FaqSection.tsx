import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/castroData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-[#E6EBED] border-y border-[#E6EBED]">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-1">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              onClick={() => toggleItem(item.id)}
              className="w-full py-5 flex items-start justify-between gap-6 text-left group cursor-pointer"
            >
              <span className="flex items-baseline gap-4 min-w-0">
                <span className="font-[family-name:var(--font-mono)] text-xs text-[#BE9473] tabular-nums shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-[family-name:var(--font-display)] text-base sm:text-lg font-semibold text-[#14283B] group-hover:text-[#167D83] transition-colors">
                  {item.question}
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`w-5 h-5 text-[#566774] shrink-0 mt-0.5 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#167D83]' : ''
                }`}
              />
            </button>
            <div
              id={`faq-panel-${item.id}`}
              hidden={!isOpen}
              className="pb-6 pl-8 sm:pl-9 pr-6"
            >
              <p className="text-sm sm:text-base text-[#566774] leading-relaxed max-w-3xl">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
