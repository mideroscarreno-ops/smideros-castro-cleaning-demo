import { useState, type FormEvent } from 'react';
import { Calendar, Info, Mail, AlertCircle } from 'lucide-react';
import { BRAND_INFO, INDUSTRIES_SERVED } from '../data/castroData';

export function WalkthroughSection() {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    cityOrZip: '',
    industry: '',
    preferredWindow: 'Weekday Morning',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.companyName.trim()) errs.companyName = 'Company name is required.';
    if (!form.contactName.trim()) errs.contactName = 'Contact name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'A valid email address is required.';
    }
    if (!form.cityOrZip.trim()) errs.cityOrZip = 'City or ZIP code is required.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-white border border-[#E6EBED] rounded-lg p-6 sm:p-8 lg:p-10">
      {submitted ? (
        <div className="space-y-6">
          <div className="p-5 rounded-md bg-[#167D83]/8 border border-[#167D83]/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-2 text-sm text-[#14283B]">
              <p className="font-bold">
                Demonstration Preview — Walkthrough Request Prepared (Not Automatically Booked)
              </p>
              <p className="text-[#566774] leading-relaxed">
                This frontend redesign does not transmit forms or automatically book calendar appointments. Walkthrough dates and facility access are coordinated directly with Castro Cleaning. You can send your prepared request directly via email below.
              </p>
            </div>
          </div>

          <div className="bg-[#F7FAFB] border border-[#E6EBED] rounded-md p-5 space-y-2 text-sm">
            <p>
              <span className="text-[#566774]">Company:</span> {form.companyName}
            </p>
            <p>
              <span className="text-[#566774]">Contact:</span> {form.contactName} ({form.email})
            </p>
            <p>
              <span className="text-[#566774]">Location:</span> {form.cityOrZip}
            </p>
            <p>
              <span className="text-[#566774]">Preferred Timing:</span> {form.preferredWindow}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
                `Facility Walkthrough Request — ${form.companyName}`
              )}&body=${encodeURIComponent(
                `Company: ${form.companyName}\nContact: ${form.contactName}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nLocation: ${form.cityOrZip}\nIndustry: ${form.industry || 'Not specified'}\nPreferred Window: ${form.preferredWindow}\nNotes: ${form.notes || 'None'}`
              )}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Email Request to {BRAND_INFO.email}
            </a>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-sm font-medium text-[#566774] hover:text-[#14283B] px-3 py-2 cursor-pointer"
            >
              Edit Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="flex items-start gap-3 p-4 rounded-md bg-[#F7FAFB] border border-[#E6EBED]">
            <Calendar className="w-5 h-5 text-[#167D83] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-[#566774] leading-relaxed">
              Submitting a walkthrough request starts scheduling coordination directly with Castro Cleaning. Appointment availability is confirmed individually rather than automatically booked.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="wt-company" className="block text-sm font-medium text-[#14283B] mb-1.5">
                Company / Facility Name *
              </label>
              <input
                id="wt-company"
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
              />
              {errors.companyName && (
                <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {errors.companyName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="wt-contact" className="block text-sm font-medium text-[#14283B] mb-1.5">
                Contact Name *
              </label>
              <input
                id="wt-contact"
                type="text"
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
              />
              {errors.contactName && (
                <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {errors.contactName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="wt-email" className="block text-sm font-medium text-[#14283B] mb-1.5">
                Business Email *
              </label>
              <input
                id="wt-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="wt-phone" className="block text-sm font-medium text-[#14283B] mb-1.5">
                Phone <span className="text-[#566774] font-normal">(Optional)</span>
              </label>
              <input
                id="wt-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
              />
            </div>

            <div>
              <label htmlFor="wt-city" className="block text-sm font-medium text-[#14283B] mb-1.5">
                City or ZIP Code *
              </label>
              <input
                id="wt-city"
                type="text"
                value={form.cityOrZip}
                onChange={(e) => setForm({ ...form, cityOrZip: e.target.value })}
                placeholder="e.g. Yukon or 73099"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
              />
              {errors.cityOrZip && (
                <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {errors.cityOrZip}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="wt-industry" className="block text-sm font-medium text-[#14283B] mb-1.5">
                Facility Industry <span className="text-[#566774] font-normal">(Optional)</span>
              </label>
              <select
                id="wt-industry"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
              >
                <option value="">Select industry...</option>
                {INDUSTRIES_SERVED.map((ind) => (
                  <option key={ind.id} value={ind.name}>
                    {ind.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="wt-window" className="block text-sm font-medium text-[#14283B] mb-1.5">
              Preferred Walkthrough Window
            </label>
            <select
              id="wt-window"
              value={form.preferredWindow}
              onChange={(e) => setForm({ ...form, preferredWindow: e.target.value })}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
            >
              <option value="Weekday Morning">Weekday Morning</option>
              <option value="Weekday Midday">Weekday Midday</option>
              <option value="Weekday Late Afternoon">Weekday Late Afternoon</option>
              <option value="Flexible — Coordinate via Email/Phone">
                Flexible — Coordinate via Email/Phone
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="wt-notes" className="block text-sm font-medium text-[#14283B] mb-1.5">
              Walkthrough Focus Notes{' '}
              <span className="text-[#566774] font-normal">(Optional)</span>
            </label>
            <textarea
              id="wt-notes"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Any specific zones, flooring, or building entry instructions to keep in mind."
              className="w-full px-3.5 py-2.5 rounded-md border border-[#E6EBED] bg-[#F7FAFB] text-sm text-[#14283B]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-[#566774]">
              Frontend demonstration only. Real walkthrough coordination is handled directly with Castro Cleaning.
            </p>
            <button
              type="submit"
              className="min-h-[44px] px-6 py-3 rounded-md bg-[#167D83] hover:bg-[#116267] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request Facility Walkthrough
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
