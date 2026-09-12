import React from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppInquiryUrl, openWhatsApp } from '../utils/whatsapp';
import { Sparkles, ArrowRight, CheckCircle2, Gift } from 'lucide-react';

export const Cta: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();
  return (
    <section className="w-full py-12 sm:py-16 bg-[#FAF7F0] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main CTA Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2819] via-[#103C26] to-[#0B2819] border border-[#C69D32]/40 shadow-2xl p-8 sm:p-12 lg:p-16 text-[#FAF7F0]">
          
          {/* Background Decorative Accents */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#C69D32]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#E8C86A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2.5 bg-[#C69D32] text-[#0B2819] text-xs sm:text-sm font-serif font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Taste the Authentic Tradition</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#FAF7F0]">
                Bring Home the Pure Essence of <span className="text-[#E8C86A]">Grandmother's Kitchen</span>
              </h2>

              <p className="text-base sm:text-lg text-[#FAF7F0]/90 font-sans max-w-xl leading-relaxed">
                Homemade in small batches using cold-pressed Kachi Ghani mustard oil, sun-dried raw spices, and absolute patience. No artificial preservatives—just pure soul.
              </p>

              {/* Value Props Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans text-sm text-[#FAF7F0]/90">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E8C86A] shrink-0" />
                  <span>100% Sun-Cured & Natural</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E8C86A] shrink-0" />
                  <span>Free Shipping Above ₹499</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E8C86A] shrink-0" />
                  <span>Traditional Terracotta Cured</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E8C86A] shrink-0" />
                  <span>Direct from Uttarakhand</span>
                </div>
              </div>

            </div>

            {/* Right Action Box Column */}
            <div className="lg:col-span-5 bg-black/25 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between space-y-6 shadow-inner">
              
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-[#E8C86A]">
                  <Gift className="w-5 h-5" />
                  <span className="font-serif font-bold text-xs sm:text-sm uppercase tracking-wider">A Taste Worth Sharing</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F0]">
                  Taste the Difference in Every Jar
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F0]/80">
                  Explore the handmade collection or order instantly through WhatsApp with our heritage specialists.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('shop');
                  }}
                  className="w-full bg-[#C69D32] hover:bg-[#E8C86A] text-[#0B2819] py-4 rounded-full font-serif font-bold text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <span>Explore All Achaar Flavours</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => openWhatsApp(createWhatsAppInquiryUrl('Namaste Dadi Industries! I want to order traditional pickles.'))}
                  className="w-full bg-white/15 hover:bg-white/25 text-[#FAF7F0] backdrop-blur-md border border-white/30 py-4 rounded-full font-serif font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Order Directly on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Cta;