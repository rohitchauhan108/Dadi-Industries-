import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, CheckCircle2, XCircle, ArrowRight, Sun, Award, Sparkles, Heart, Leaf } from 'lucide-react';

export const WhyDadiPage: React.FC = () => {
  const { setCurrentView } = useShop();

  const comparison = [
    {
      feature: "Pickling Base",
      dadi: "100% Pure Cold-Pressed Kachi Ghani Mustard Oil & Natural Sun Brine",
      commercial: "Refined palm/cottonseed oil blends & synthetic acid bases"
    },
    {
      feature: "Ripening Method",
      dadi: "Aged naturally in glazed ceramic martabans under direct sunlight",
      commercial: "Industrial high-heat accelerated maturation with artificial stabilizers"
    },
    {
      feature: "Chemical Preservatives",
      dadi: "Zero synthetic preservatives (Sodium Benzoate / Potassium Sorbate free)",
      commercial: "Heavy chemical preservatives to extend artificial shelf life"
    },
    {
      feature: "Spices & Sourcing",
      dadi: "Dry-roasted whole spices hand-pounded for aroma, punch, and crunch",
      commercial: "Commercial spice extracts and artificial flavor enhancers"
    },
    {
      feature: "Salt Used",
      dadi: "Mineral-rich Himalayan Rock Salt (Sendha Namak) & Kala Namak",
      commercial: "Standard bleached chemical table salt"
    }
  ];

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Uncompromising Purity</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103C26] tracking-tight">
            Why Choose Dadi Industries?
          </h1>
          <p className="text-base sm:text-xl text-[#5E6E64] leading-relaxed font-sans">
            In an era of mass-manufactured chemical shortcuts, we take the long, traditional path. 
            Here is why families trust Dadi Industries for authentic home meals.
          </p>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-3xl border border-[#EAE1D0] overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8 bg-[#103C26] text-white flex items-center justify-between border-b border-[#C69D32]/40">
            <div>
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#E8C86A]">The Distinction You Can Taste</span>
              <h2 className="font-serif text-2xl font-bold mt-1 text-[#FAF7F0]">Dadi Industries vs Mass-Produced Brands</h2>
            </div>
            <Award className="w-8 h-8 text-[#E8C86A] hidden sm:block" />
          </div>

          <div className="divide-y divide-[#EAE1D0]">
            {comparison.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-serif font-bold text-base text-[#103C26]">
                    {item.feature}
                  </h3>
                </div>

                <div className="md:col-span-4 bg-[#103C26]/5 p-3.5 rounded-xl border border-[#103C26]/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#2F7A52] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[16px] font-serif font-bold uppercase tracking-wider text-[#103C26] block">Dadi Industries</span>
                    <p className="text-[15px] font-medium text-[#14241B] mt-0.5 font-sans">{item.dadi}</p>
                  </div>
                </div>

                <div className="md:col-span-4 bg-rose-50/50 p-3.5 rounded-xl border border-rose-200 flex items-start gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[16px] font-serif font-bold uppercase tracking-wider text-rose-800 block">Commercial Brands</span>
                    <p className="text-[15px] text-[#5E6E64] mt-0.5 font-sans">{item.commercial}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Quality Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE1D0] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#103C26] text-[#E8C86A] flex items-center justify-center font-bold text-lg border border-[#C69D32]/30">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#103C26]">Direct Farmer Partnerships</h3>
            <p className="text-lg text-[#5E6E64] leading-relaxed font-sans">
              We procure seasonal Ramkela raw mangoes, Guntur red chillies, and mountain lemons directly from certified regional grower networks.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE1D0] space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#103C26] text-[#E8C86A] flex items-center justify-center font-bold text-lg border border-[#C69D32]/30">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#103C26]">Slow-Crafted Sun Maturation</h3>
            <p className="text-lg text-[#5E6E64] leading-relaxed font-sans">
              No artificial heating chambers. We preserve the centuries-old art of sun-drying and jar aging to let spices blossom naturally.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-3 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-8 py-4 rounded-full font-serif font-bold text-base transition-all shadow-lg active:scale-95 border border-[#C69D32]/40 cursor-pointer"
          >
            <span>Explore All Traditional Pickles</span>
            <ArrowRight className="w-4 h-4 text-[#E8C86A]" />
          </button>
        </div>

      </div>
    </div>
  );
};
