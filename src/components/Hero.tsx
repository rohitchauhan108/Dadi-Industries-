import React from 'react';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';
import { ArrowRight, Star, Sparkles, ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleShopAchaar = () => {
    setSelectedCategory('all');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreRange = () => {
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#FDFBF7] to-[#FAF7F0] pt-6 pb-14 sm:pb-20 lg:py-16 border-b border-[#EAE1D0]/60">
      {/* Decorative botanical backdrop elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-[#C69D32]/10 via-[#103C26]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-radial from-[#103C26]/8 to-transparent rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Headline & Story */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pr-4">
            
            {/* Heritage Hallmark Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F3ECE0] border border-[#C69D32]/30 w-fit mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#C69D32] animate-pulse" />
              <span className="text-xs uppercase font-serif tracking-[0.2em] text-[#103C26] font-semibold">
                Quality • Trust • Natural
              </span>
            </div>

            {/* Serif Italic Eyebrow */}
            <span className="text-[#2F7A52] font-handwritten text-2xl sm:text-3xl mb-1 block">
              Dadi’s Authentic Kitchen Heritage
            </span>

            {/* Bold Headline with Classic Roman Proportion */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] xl:text-[80px] leading-[1.02] sm:leading-[0.98] font-serif text-[#103C26] font-bold mb-5 tracking-tight">
              Ghar Ka Swaad<br />
              <span className="font-editorial italic font-normal text-[#C69D32]">Har Nivaale Mein</span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-[#5E6E64] text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-normal font-sans">
              Homemade with ancestral sun-cured techniques, pure cold-pressed mustard oil, and pristine handpicked spices. The authentic taste of home that stays with you.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 sm:mb-12">
              <button
                onClick={handleShopAchaar}
                className="bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-8 py-4 rounded-full font-medium shadow-xl flex items-center gap-3 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 cursor-pointer text-sm sm:text-base border border-[#C69D32]/50 group"
              >
                <span className="font-serif tracking-wide">Explore Pickles</span>
                <ArrowRight className="w-4 h-4 text-[#E8C86A] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleExploreRange}
                className="border-2 border-[#103C26]/80 text-[#103C26] px-7 py-3.5 rounded-full font-medium hover:bg-[#F3ECE0] transition-all duration-300 active:scale-95 cursor-pointer text-sm sm:text-base font-serif"
              >
                Our Categories
              </button>
            </div>

            {/* Trust Indicators with Gold & Natural Accents */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#EAE1D0] pt-6 sm:pt-8 max-w-lg">
              <div className="flex flex-col">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#C69D32]/30 flex items-center justify-center mb-2 shadow-xs">
                  <Leaf className="w-4 h-4 text-[#2F7A52]" />
                </div>
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-[#103C26]">100% Natural</div>
                <div className="text-[11.5px] text-[#5E6E64] mt-0.5 font-sans">Zero Preservatives</div>
              </div>

              <div className="flex flex-col">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#C69D32]/30 flex items-center justify-center mb-2 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#C69D32]" />
                </div>
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-[#103C26]">Sun-Cured</div>
                <div className="text-[11.5px] text-[#5E6E64] mt-0.5 font-sans">Traditional Martabans</div>
              </div>

              <div className="flex flex-col">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#C69D32]/30 flex items-center justify-center mb-2 shadow-xs">
                  <HeartHandshake className="w-4 h-4 text-[#103C26]" />
                </div>
                <div className="text-xs font-serif font-bold uppercase tracking-wider text-[#103C26]">Pure Desi</div>
                <div className="text-[11.5px] text-[#5E6E64] mt-0.5 font-sans">Cold-Pressed Mustard Oil</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-gradient-to-b from-[#F3ECE0] to-[#EAE1D0]/80 rounded-3xl p-6 sm:p-8 border border-[#EAE1D0] shadow-xl overflow-hidden">
              
              {/* Subtle background mandala pattern */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#103C26 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Main Featured Showcase Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#103C26] text-white shadow-2xl border-4 border-white/90">
                <div className="relative h-[340px] sm:h-[390px] w-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop" 
                    alt="Authentic Traditional Indian Pickles & Martaban" 
                    className="w-full h-full object-cover brightness-[0.92] contrast-[1.05] hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2819] via-transparent to-black/20" />
                  
                  {/* Floating Brand Badge */}
                  <div className="absolute top-4 left-4 bg-[#FAF7F0]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-[#C69D32]/40 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#2F7A52]" />
                    <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26]">
                      Heritage Recipe No. 04
                    </span>
                  </div>

                  {/* Bottom Highlight Information */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F0]/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[#EAE1D0]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C69D32] block">
                          Ancestral Recipe
                        </span>
                        <h4 className="font-serif text-lg font-bold text-[#103C26] leading-snug">
                          Kacchi Kairi Desi Mango Achaar
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#5E6E64] line-through block">₹299</span>
                        <span className="text-base font-bold text-[#103C26]">₹249</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circular Emblem Seal Floating in Top Right Corner */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FAF7F0] p-1 shadow-2xl border-2 border-[#C69D32]">
                  <Logo size="sm" showText={false} variant="light" className="w-full h-full flex items-center justify-center" />
                </div>
              </div>

              {/* Rating Review Badge Floating on Bottom Left */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-[#FAF7F0] p-3.5 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-[#EAE1D0]">
                <div className="w-10 h-10 rounded-xl bg-[#103C26] text-[#E8C86A] flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                  4.9★
                </div>
                <div>
                  <div className="text-xs font-serif font-bold text-[#103C26]">Verified Heritage Quality</div>
                  <div className="text-[11px] text-[#5E6E64]">Loved by 10,000+ Families</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

