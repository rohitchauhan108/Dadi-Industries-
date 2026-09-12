import React from 'react';
import { Users, BookOpen, Utensils, ShieldCheck } from 'lucide-react';

export const TrustStatsStrip: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Happy Families",
      desc: "Delivered across 200+ Indian cities"
    },
    {
      icon: BookOpen,
      value: "15+",
      label: "Ancestral Recipes",
      desc: "Preserved from traditional home kitchens"
    },
    {
      icon: Utensils,
      value: "20+",
      label: "Flavour Varieties",
      desc: "Pickles, chutneys & aromatic masalas"
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Natural & Pure",
      desc: "Sun-cured with zero artificial chemicals"
    }
  ];

  return (
    <section className="bg-[#103C26] text-white py-16 sm:py-20 relative overflow-hidden border-y border-[#C69D32]/30 shadow-2xl">
      {/* Background rich golden ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#C69D32]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#E8C86A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2819] border border-[#C69D32]/40 mb-3 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8C86A] animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase font-serif font-bold tracking-[0.25em] text-[#E8C86A]">
              Quality • Trust • Heritage
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF7F0] tracking-tight">
            Trusted by Households All Over India
          </h2>
          <p className="text-xs sm:text-sm text-[#C8D6CD] font-sans mt-2 max-w-lg mx-auto">
            Crafted with patience, sun-cured to perfection, and delivered straight from our ancestral kitchen.
          </p>
        </div>

        {/* 4 Stats Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col items-center text-center p-6 rounded-3xl bg-gradient-to-b from-[#16472F]/70 to-[#0B2819]/90 border border-[#C69D32]/30 hover:border-[#E8C86A] hover:-translate-y-1.5 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#C69D32]/10 overflow-hidden"
              >
                {/* Top subtle decorative highlight bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-[#C69D32] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Icon Container with multi-layered depth */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E5638] to-[#103C26] text-[#E8C86A] flex items-center justify-center mb-4 shadow-inner border border-[#C69D32]/40 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Stat Value with Gradient Shimmer */}
                <div className="font-serif font-bold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0] to-[#E8C86A] tracking-tight">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-xs sm:text-sm font-serif font-bold text-[#E8C86A] mt-1.5 tracking-wide">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs text-[#C8D6CD]/90 mt-1 font-sans leading-relaxed">
                  {stat.desc}
                </div>

                {/* Bottom subtle ambient card glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#C69D32]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};