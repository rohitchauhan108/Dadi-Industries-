import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { ChevronDown, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#EAE1D0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103C26] tracking-tight">
            Sabhi Sawalon Ke Jawab
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5E6E64] font-sans">
            Everything you need to know about our slow sun-maturation methods, mustard oil base, authentic ingredients, and delivery across India.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF7F0] rounded-2xl border border-[#EAE1D0] overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#103C26] leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white text-[#103C26] flex items-center justify-center shrink-0 border border-[#EAE1D0] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#103C26] text-[#E8C86A] border-[#103C26]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5E6E64] leading-relaxed border-t border-[#EAE1D0] font-sans animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
