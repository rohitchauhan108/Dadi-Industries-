import React from 'react';

export default function Marquees() {
  const items = [
    "Sun-cured in mustard oil",
    "Handmade in Uttarakhand",
    "100% vegetarian",
    "No artificial preservatives",
    "Family recipes",
    "Slow matured",
    "Naturally fermented",
    "Traditional achar",
    "Fresh harvest",
    "Authentic flavours",
  ];

  // Duplicate the array to ensure a seamless infinite scroll loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0D301E] via-[#103C26] to-[#0D301E] py-5 text-[#FAF7F0] shadow-md border-y-3 border-dashed border-[#EAE1D0]/40">
      
      {/* Optional decorative corner vignette or inner shadow styling */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/20" />

      <div className="flex min-w-max items-center gap-10 text-[11px] font-serif font-semibold uppercase tracking-[0.25em] whitespace-nowrap [animation:marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
        {duplicatedItems.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-10 group">
            <span className="transition-colors duration-300 group-hover:text-[#E8C86A]">
              {item}
            </span>
            <span className="text-[#E8C86A] text-lg select-none opacity-80">
              ✦
            </span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-30%);
          }
        }
      `}</style>
    </div>
  );
}