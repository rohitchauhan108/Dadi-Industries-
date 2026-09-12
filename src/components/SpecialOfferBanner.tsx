import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export const SpecialOfferBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleShopNow = () => {
    setSelectedCategory('all');
    setCurrentView('shop');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div 
          className="relative rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat text-white p-8 sm:p-12 shadow-2xl border border-[#C69D32]/40 min-h-[420px] flex items-center"
          style={{ backgroundImage: `url('/home/cta.webp')` }}
        >
          {/* Dark Overlay with Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2819]/90 via-[#103C26]/70 to-[#16472F]/50 pointer-events-none" />

          {/* Background gold glow */}
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#C69D32]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#C69D32] text-[#0B2819] text-xs font-serif font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Festive Heritage Offer</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F0] leading-tight">
                Bring Home Authentic Desi Swaad
              </h2>

              <p className="text-sm sm:text-base text-[#C8D6CD] max-w-xl font-sans">
                Explore our Homemade achaar collection and bring the true taste of home to your dining table.
              </p>

            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={handleShopNow}
                className="bg-[#C69D32] hover:bg-[#D8B244] text-[#0B2819] px-8 py-4 rounded-full font-serif font-bold text-base shadow-xl flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#E8C86A]"
              >
                <span>Shop All Pickles</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};