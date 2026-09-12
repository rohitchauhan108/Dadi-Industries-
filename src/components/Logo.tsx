import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'emblem-only' | 'gold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'light', 
  size = 'md',
  showTagline = true,
  showText = true,
  className = ''
}) => {
  const isDark = variant === 'dark';

  // Dimension scaling for the circular emblem
  const emblemSizes = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      {/* Precision Vector Emblem matching the authentic Dadi Industries Logo */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-full transition-transform duration-300 group-hover:scale-105 ${emblemSizes[size]}`}>
        <svg 
          className="w-full h-full drop-shadow-xs" 
          viewBox="0 0 240 240" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gold metallic gradients */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFB743" />
              <stop offset="35%" stopColor="#F5E4A8" />
              <stop offset="65%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#8C6615" />
            </linearGradient>

            <linearGradient id="goldRibbonGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#8C6615" />
              <stop offset="25%" stopColor="#DFB743" />
              <stop offset="60%" stopColor="#F7E6B2" />
              <stop offset="90%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#967018" />
            </linearGradient>

            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E5C3B" />
              <stop offset="50%" stopColor="#103C26" />
              <stop offset="100%" stopColor="#0B2819" />
            </linearGradient>

            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#438F60" />
              <stop offset="100%" stopColor="#1D5837" />
            </linearGradient>
            
            <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Inner Cream Medallion Circle */}
          <circle cx="120" cy="120" r="108" fill={isDark ? "#0D2517" : "#FDFBF7"} />

          {/* Outer Gold & Green Framing Arcs */}
          {/* Top-Right Gold Arc */}
          <path 
            d="M60 42 C95 24 165 24 200 68 C224 102 220 156 186 194" 
            stroke="url(#goldGrad)" 
            strokeWidth="5" 
            strokeLinecap="round" 
          />
          
          {/* Left / Bottom Emerald Swirl Arc */}
          <path 
            d="M50 48 C20 86 22 144 58 184 C92 222 152 220 186 195" 
            stroke="url(#emeraldGrad)" 
            strokeWidth="6" 
            strokeLinecap="round" 
          />

          {/* Inner fine accent ring */}
          <circle cx="120" cy="120" r="102" stroke="url(#goldGrad)" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="3 2" />

          {/* Top Royal Fleur-de-lis / Botanical Crown Ornament */}
          <g transform="translate(120, 36) scale(0.9)" filter="url(#subtleShadow)">
            {/* Center petal */}
            <path d="M0 -15 C-4 -6 -2 0 0 4 C2 0 4 -6 0 -15 Z" fill="url(#goldGrad)" />
            {/* Left petal */}
            <path d="M-2 -2 C-10 -8 -13 0 -5 4 C-3 3 -2 0 -2 -2 Z" fill="url(#goldGrad)" />
            {/* Right petal */}
            <path d="M2 -2 C10 -8 13 0 5 4 C3 3 2 0 2 -2 Z" fill="url(#goldGrad)" />
            {/* Horizontal band */}
            <rect x="-14" y="4" width="28" height="2" rx="1" fill="url(#goldGrad)" />
            <circle cx="0" cy="7" r="1.5" fill="url(#goldGrad)" />
          </g>

          {/* Central Monogram: Bold "D" in Emerald */}
          {/* Letter D Backbone and Loop */}
          <g filter="url(#subtleShadow)">
            <path 
              d="M62 94 H98 C128 94 146 110 146 136 C146 162 128 178 98 178 H62 V94 Z M80 162 H96 C116 162 127 151 127 136 C127 121 116 110 96 110 H80 V162 Z" 
              fill="url(#emeraldGrad)" 
            />

            {/* Serif feet for D */}
            <path d="M54 94 H84 V99 H54 Z M54 173 H84 V178 H54 Z" fill="url(#emeraldGrad)" />

            {/* Botanical Leaf Sprig inside the D's counter curve */}
            <g transform="translate(93, 142)">
              {/* Stem */}
              <path d="M-2 16 C3 8 7 0 10 -8" stroke="url(#leafGrad)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Leaf 1 (Left) */}
              <path d="M2 10 C-6 6 -8 -1 0 2 C4 4 3 8 2 10 Z" fill="url(#leafGrad)" />
              {/* Leaf 2 (Right) */}
              <path d="M6 3 C14 -1 16 -8 8 -5 C4 -3 5 1 6 3 Z" fill="url(#leafGrad)" />
              {/* Leaf 3 (Top) */}
              <path d="M10 -8 C6 -18 16 -20 18 -10 C16 -6 12 -7 10 -8 Z" fill="url(#leafGrad)" />
            </g>

            {/* Flowing Gold Ribbon Arc across the D */}
            <path 
              d="M50 162 C74 150 94 135 125 152 C138 159 146 156 150 148 C144 144 134 145 122 139 C96 126 72 142 50 162 Z" 
              fill="url(#goldRibbonGrad)" 
            />
          </g>

          {/* Letter "I" in Polished Gold */}
          <g filter="url(#subtleShadow)">
            {/* Top Serif */}
            <path d="M148 94 H184 V100 H171 V172 H184 V178 H148 V172 H161 V100 H148 V94 Z" fill="url(#goldGrad)" />
            {/* Inner vertical highlight */}
            <rect x="165" y="100" width="2" height="72" fill="#FFF2C2" fillOpacity="0.7" />
          </g>

          {/* Bottom Subtext: "QUALITY | TRUST | NATURAL" */}
          <text 
            x="120" 
            y="200" 
            textAnchor="middle" 
            fill={isDark ? "#E8C86A" : "#14241B"} 
            fontSize="8.5" 
            fontFamily="'Marcellus', serif" 
            letterSpacing="2.2" 
            fontWeight="600"
          >
            QUALITY | TRUST | NATURAL
          </text>

          {/* Bottom Leaf Accent */}
          <g transform="translate(120, 208) scale(0.7)">
            <path d="M0 -3 C-1 -1 -3 0 -5 0 C-2 2 0 1 0 4 C0 1 2 2 5 0 C3 0 1 -1 0 -3 Z" fill="url(#leafGrad)" />
            <circle cx="-12" cy="0" r="1" fill="url(#goldGrad)" />
            <circle cx="12" cy="0" r="1" fill="url(#goldGrad)" />
            <path d="M-22 0 H-15 M15 0 H22" stroke="url(#goldGrad)" strokeWidth="0.8" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Brand Typography Lockup */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className={`font-serif tracking-tight font-bold ${
              size === 'xl' ? 'text-4xl' :
              size === 'lg' ? 'text-2xl sm:text-3xl' : 
              size === 'sm' ? 'text-lg' : 
              size === 'xs' ? 'text-base' : 'text-xl sm:text-2xl'
            } ${isDark ? 'text-white' : 'text-[#103C26]'}`}>
              Dadi
            </span>
            <span className={`font-serif tracking-[0.18em] uppercase font-semibold ${
              size === 'xl' ? 'text-lg' :
              size === 'lg' ? 'text-xs sm:text-sm' : 
              size === 'sm' ? 'text-[10px]' : 
              size === 'xs' ? 'text-[9px]' : 'text-xs'
            } ${isDark ? 'text-[#E8C86A]' : 'text-[#C69D32]'}`}>
              Industries
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[10px] sm:text-[11px] font-medium tracking-wider uppercase ${
                isDark ? 'text-[#C8D6CD]' : 'text-[#5E6E64]'
              }`}>
                Quality • Trust • Natural
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
