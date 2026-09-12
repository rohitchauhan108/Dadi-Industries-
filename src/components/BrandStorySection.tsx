import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck, Sun, Leaf } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden border-b border-[#EAE1D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex items-center gap-2">
              <span className="font-handwritten text-3xl sm:text-4xl text-[#103C26] font-bold">
                From Our Ancestral Rasoi
              </span>
              <span className="w-10 h-px bg-[#C69D32] inline-block" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103C26] leading-tight">
              A Taste That Feels <br />
              <span className="italic font-editorial font-normal text-[#C69D32]">Like Home</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E6E64] leading-relaxed font-sans">
              Dadi Industries is founded on the timeless culinary traditions of Indian grandmothers — sun-ripened recipes passed through generations, slow-fermented in earthen martabans with hand-ground spices and pure cold-pressed mustard oil.
            </p>

            {/* 3 Key Benefits */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE1D0]">
                <div className="w-10 h-10 rounded-full bg-[#103C26]/10 text-[#103C26] flex items-center justify-center shrink-0 mt-0.5 border border-[#103C26]/20">
                  <Leaf className="w-5 h-5 text-[#2F7A52]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#103C26]">Paramparik Ancestral Recipes</h4>
                  <p className="text-xs sm:text-sm text-[#5E6E64] mt-0.5 font-sans">
                    Handed down through families and perfected over generations of traditional North & South Indian kitchens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE1D0]">
                <div className="w-10 h-10 rounded-full bg-[#C69D32]/15 text-[#C69D32] flex items-center justify-center shrink-0 mt-0.5 border border-[#C69D32]/30">
                  <Sparkles className="w-5 h-5 text-[#8F6B1C]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#103C26]">Pure Natural Ingredients</h4>
                  <p className="text-xs sm:text-sm text-[#5E6E64] mt-0.5 font-sans">
                    Crisp handpicked green mangoes, Himalayan pink rock salt, and authentic cold-pressed kachi ghani mustard oil.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE1D0]">
                <div className="w-10 h-10 rounded-full bg-[#103C26]/10 text-[#103C26] flex items-center justify-center shrink-0 mt-0.5 border border-[#103C26]/20">
                  <Sun className="w-5 h-5 text-[#C69D32]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#103C26]">Sun-Cured In Clay Martabans</h4>
                  <p className="text-xs sm:text-sm text-[#5E6E64] mt-0.5 font-sans">
                    Naturally ripened under the Indian sun for weeks to achieve deep flavor complexity without chemicals.
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentView('story')}
                className="group inline-flex items-center gap-3 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-7 py-3.5 rounded-full font-serif font-medium text-sm transition-all shadow-md active:scale-95 border border-[#C69D32]/40"
              >
                <span>Discover Our Heritage Story</span>
                <ArrowRight className="w-4 h-4 text-[#E8C86A] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Composition with Artisanal Highlights */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Primary Background Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-[#F3ECE0]">
                <img
                  src="/home/ingredients.webp"
                  alt="Authentic Indian Spices and Traditional Kitchen Ingredients"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B2819]/80 via-transparent to-black/10" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 text-[#E8C86A] text-xs font-serif font-bold uppercase tracking-wider mb-1">
                    <Sun className="w-4 h-4" />
                    <span>Sun-Cured Tradition</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    Pure Cold-Pressed Mustard Oil & Spices
                  </h3>
                </div>
              </div>

              {/* Floating Quality Seal */}
              <div className="lg:absolute mt-5 -top-8 -left-12 border-l-2 border-t-2 border-[#103c26] bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#103C26] text-[#E8C86A] flex items-center justify-center text-xl font-serif font-bold">
                  DI
                </div>
                <div>
                  <div className="text-xs font-serif font-bold text-[#103C26] uppercase tracking-wider">Quality • Trust • Natural</div>
                  <div className="text-[11px] text-[#5E6E64]">Zero artificial colors or preservatives</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
