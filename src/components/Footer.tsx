import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppInquiryUrl, openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ExternalLink, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();
  const [showMapModal, setShowMapModal] = useState(false);

  const address = "Harbazwala, near Kanti Mart, Sainik Colony, Dehradun 248001";

  const handlePageNav = (view: 'home' | 'shop' | 'story' | 'why-dadi' | 'contact') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B2819] text-[#C8D6CD] pt-16 pb-12 border-t border-[#C69D32]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#16472F]">
          
          {/* Col 1: Brand Info (4 Cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div onClick={() => handlePageNav('home')} className="cursor-pointer">
              {/* <Logo variant="dark" size="lg" /> */}
              <img src="/footer-logo.jpeg" alt="Dadi Industries Logo" 
              height={50}
              width={100} />
            </div>
            <p className="text-[16px] text-[#A8BDB1] leading-relaxed max-w-sm font-sans">
              Homemade traditional Indian pickles, sun-cured in earthen martabans using pure cold-pressed mustard oil, aromatic hand-ground spices, and the timeless heritage of grandmother's kitchen.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/dadi.industries/" 
                // onClick={(e) => { e.preventDefault(); alert("Follow Dadi Industries on Instagram @dadiindustries (Demo)"); }}
                className="w-9 h-9 rounded-full bg-[#103C26] hover:bg-[#C69D32] hover:text-[#0B2819] text-[#FAF7F0] flex items-center justify-center transition-colors border border-[#C69D32]/30"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/people/Dadi-Industries/61594086487390/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#103C26] hover:bg-[#C69D32] hover:text-[#0B2819] text-[#FAF7F0] flex items-center justify-center transition-colors border border-[#C69D32]/30"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Shop Flavours (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FAF7F0] tracking-wide">
              Shop Flavours
            </h4>
            <ul className="space-y-2 text-sm font-sans text-[#C8D6CD]">
              <li>
                <button onClick={() => { setSelectedCategory('aachar'); handlePageNav('shop'); }} className="hover:text-[#E8C86A] transition-colors cursor-pointer">
                  Achaar
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('candy'); handlePageNav('shop'); }} className="hover:text-[#E8C86A] transition-colors cursor-pointer">
                  Candy
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('murabba'); handlePageNav('shop'); }} className="hover:text-[#E8C86A] transition-colors cursor-pointer">
                  Murabba
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('chutney'); handlePageNav('shop'); }} className="hover:text-[#E8C86A] transition-colors cursor-pointer">
                  Chutney
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FAF7F0] tracking-wide">
              Company
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <button onClick={() => handlePageNav('story')} className="hover:text-[#E8C86A] transition-colors cursor-pointer">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('why-dadi')} className="hover:text-[#E8C86A] transition-colors cursor-pointer">
                  Why Dadi
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('contact')} className="hover:text-[#E8C86A] transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/c/918630000405"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E8C86A] transition-colors"
                >
                  Full Catalog
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FAF7F0] tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <a href="/shipping-delivery" className="hover:text-[#E8C86A] transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="/returns-guarantee" className="hover:text-[#E8C86A] transition-colors">
                  Returns & Guarantee
                </a>
              </li>
              <li>
                <a href="/faqs-tips" className="hover:text-[#E8C86A] transition-colors">
                  FAQs & Tips
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-[#E8C86A] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-[#E8C86A] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Contact (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-[#FAF7F0] tracking-wide">
              Facility Address
            </h4>
            <div className="space-y-2.5 text-sm text-[#C8D6CD] font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E8C86A] shrink-0 mt-0.5" />
                <span>Harbazwala, near Kanti Mart, Sainik Colony, Dehradun 248001</span>
              </div>
              
             

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E8C86A] shrink-0" />
                <span className="truncate">sumit421976@gmail.com</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => openWhatsApp(createWhatsAppInquiryUrl('Namaste Dadi Industries! I would like to place an order via WhatsApp.'))}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-white transition-colors bg-[#25D366] hover:bg-[#1EBE5D] px-3 py-2 rounded-lg cursor-pointer shadow-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Order</span>
                </button>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8BDB1]">
          <div className="flex items-center gap-2 font-sans">
            <span>© 2026 Dadi Industries. All Rights Reserved.</span>
            <span className="text-[#16472F]">|</span>
            <span className="text-[#E8C86A] font-serif italic">“Ghar Ka Swaad, Har Nivaale Mein”</span>
          </div>

          <div className="flex items-center gap-4 font-sans">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#E8C86A]" /> 100% Safe & Secure Checkout
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-[#B9442C]" /> Proudly Made in India
            </span>
          </div>
        </div>

      </div>

      {/* Google Maps Location Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] text-[#103C26] max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C69D32]/50 relative animate-in fade-in zoom-in duration-200">
            <h3 className="font-serif font-bold text-2xl mb-2 text-[#103C26]">Dadi Industries Heritage Facility</h3>
            <p className="text-sm text-[#5E6E64] mb-4 font-sans">
              Harbazwala, near Kanti Mart, Sainik Colony, Dehradun 248001
            </p>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#F3ECE0] mb-6 border border-[#EAE1D0] flex items-center justify-center text-center p-4">
              <div>
                <MapPin className="w-10 h-10 text-[#C69D32] mx-auto mb-2 animate-bounce" />
                <p className="text-sm font-serif font-bold text-[#103C26]">Harbazwala, Sainik Colony Production Facility</p>
                <p className="text-xs text-[#5E6E64] font-sans">Dehradun, Uttarakhand</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 font-serif">
              <button
                onClick={() => setShowMapModal(false)}
                className="px-4 py-2 text-sm font-semibold text-[#5E6E64] hover:text-[#103C26] cursor-pointer"
              >
                Close
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md border border-[#C69D32]/40"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E8C86A]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};