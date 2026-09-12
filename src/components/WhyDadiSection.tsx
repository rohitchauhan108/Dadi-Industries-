import React from 'react';
import { Sparkles, ShieldCheck, PackageCheck, UtensilsCrossed, Leaf, Heart } from 'lucide-react';

export const WhyDadiSection: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Traditional Heritage Taste",
      description: "Authentic recipes inspired by generations of Indian grandmothers, crafted without artificial flavourings.",
      accentBg: "bg-[#103C26]/10",
      accentText: "text-[#103C26]"
    },
    {
      icon: Leaf,
      title: "100% Pure & Natural",
      description: "Farm-fresh raw mangoes, mountain lemons, hand-pounded aromatic spices, and cold-pressed mustard oil.",
      accentBg: "bg-[#2F7A52]/15",
      accentText: "text-[#2F7A52]"
    },
    {
      icon: PackageCheck,
      title: "Hygienic Sealed Packaging",
      description: "Sealed in premium food-grade, leak-proof jars to preserve natural crunch, pungent aroma, and peak freshness.",
      accentBg: "bg-[#C69D32]/15",
      accentText: "text-[#8F6B1C]"
    },
    {
      icon: UtensilsCrossed,
      title: "The Heart of Every Indian Meal",
      description: "Elevates breakfast parathas, comforting dal-chawal, evening theplas, and festive family dinners.",
      accentBg: "bg-[#103C26]/10",
      accentText: "text-[#103C26]"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F0] border-b border-[#EAE1D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32] mb-2 inline-block">
            THE DADI PROMISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103C26] tracking-tight">
            Why Choose Dadi Industries?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5E6E64] max-w-xl mx-auto font-sans">
            We preserve traditional Indian culinary heritage by crafting pickles the way our elders did — with slow patience, absolute purity, and genuine affection.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#EAE1D0] hover:border-[#C69D32] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${feat.accentBg} ${feat.accentText} flex items-center justify-center mb-5 shadow-xs border border-[#EAE1D0]`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#103C26] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-base text-[#5E6E64] leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#FAF7F0] flex items-center text-xs font-serif font-bold text-[#103C26] uppercase tracking-wider">
                  <span>Quality • Trust • Natural</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
