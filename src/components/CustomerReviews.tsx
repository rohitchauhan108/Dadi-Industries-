import React from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#EAE1D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103C26] tracking-tight">
            Dadi Ka Swaad, Aapki Zubaani
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5E6E64] max-w-xl mx-auto font-sans">
            Read how authentic heritage recipes and sun-cured spices have won a permanent spot on dining tables across India.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#EAE1D0] hover:border-[#C69D32] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C69D32]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#103C26]/20" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#14241B] leading-relaxed italic mb-4 font-serif">
                  “{rev.comment}”
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#EAE1D0]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#103C26]">
                      {rev.author}
                    </h4>
                    <span className="text-[11px] text-[#5E6E64] block font-sans">
                      {rev.location}
                    </span>
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#103C26] bg-[#103C26]/10 px-2 py-0.5 rounded-full border border-[#103C26]/20">
                      <CheckCircle2 className="w-3 h-3 text-[#2F7A52]" /> Verified
                    </span>
                  )}
                </div>
                {rev.productName && (
                  <span className="mt-2 text-[10.5px] font-serif font-semibold text-[#8F6B1C] block truncate">
                    Item: {rev.productName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
