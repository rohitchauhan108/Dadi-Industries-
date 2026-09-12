import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppInquiryUrl, openWhatsApp } from '../utils/whatsapp';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import Marquees from './Marquees';

export const HomepageBanners: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSliderBanners = [
    {
      id: 1,
      tag: 'Grandmother’s Signature Recipe',
      heading: 'Sun-Cured Kacchi Kairi & Banarasi Lal Mirch',
      subheading: 'Prepared in pure cold-pressed Kachi Ghani mustard oil, seasoned with rock salt and slow-cured under mountain sun.',
      category: 'mango',
      ctaText: 'Shop Mango & Chilli',
      badge: 'Bestseller 2026'
    },
    {
      id: 2,
      tag: 'Himalayan Foothills Tradition',
      heading: 'Juicy Pahadi Khatta Meetha Nimbu Masala',
      subheading: 'Large thin-skinned mountain lemons slow-matured with jaggery, roasted ajwain, and black pepper for gut vitality.',
      category: 'lemon',
      ctaText: 'Explore Lemon Range',
      badge: 'Zero Chemical Preservatives'
    },
    {
      id: 3,
      tag: 'Ancestral Stone Grounding',
      heading: 'Fiery Lahsun & Roasted Spice Chutney',
      subheading: 'Pounded whole garlic cloves and Kashmiri red chillies sautéed in smoking mustard oil with whole roasted jeera.',
      category: 'chutney_masala',
      ctaText: 'Discover Chutneys',
      badge: 'Pungent & Authentic'
    }
  ];

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSliderBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSliderBanners.length]);

  return (
    <div className="w-full overflow-x-hidden">
      
      {/* 1. Fine High-Definition Showcase Carousel Banner with Video Background */}
      <div className="relative overflow-hidden shadow-2xl border-y sm:border border-[#C69D32]/30 bg-[#0B2819] aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[480px] sm:min-h-[440px] w-full">
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/home/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Rich Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0B2819]/95 via-[#0B2819]/80 to-black/40" />

        {/* Slider Text Content */}
        {heroSliderBanners.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-3xl text-[#FAF7F0] space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#C69D32] text-[#0B2819] text-xs sm:text-sm font-serif font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">
                  {slide.badge}
                </span>
                <span className="text-xs sm:text-sm font-serif tracking-widest uppercase text-[#E8C86A]">
                  {slide.tag}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FAF7F0]">
                {slide.heading}
              </h2>

              <p className="text-lg sm:text-xl text-[#FAF7F0]/90 leading-relaxed font-sans max-w-2xl">
                {slide.subheading}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-3">
                <button
                  className="bg-[#C69D32] hover:bg-[#E8C86A] text-[#0B2819] px-7 sm:px-9 py-4 rounded-full font-serif font-bold text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => openWhatsApp(createWhatsAppInquiryUrl(`Namaste Dadi Industries! I want to order ${slide.heading} via WhatsApp.`))}
                  className="bg-white/15 hover:bg-white/25 text-[#FAF7F0] backdrop-blur-md border border-white/30 px-6 py-4 rounded-full font-serif font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        {/* <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSliderBanners.length - 1 : prev - 1))}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-sm border border-white/20 transition-all cursor-pointer shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button> */}

        {/* <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSliderBanners.length)}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-sm border border-white/20 transition-all cursor-pointer shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button> */}

        {/* Indicator Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {heroSliderBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-10 bg-[#C69D32]' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <Marquees />

      {/* 2. Duo Aesthetic Heritage & Pairing Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Left: "Achaar Bina Thali Adhoori" */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#EAE1D0] group bg-[#FAF7F0] flex flex-col justify-between min-h-[380px] sm:min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80"
            alt="Indian Traditional Thali with Pickles"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2819] via-[#0B2819]/60 to-transparent" />
          
          <div className="relative z-10 p-6 sm:p-8">
            <span className="bg-[#103C26] text-[#E8C86A] text-xs font-serif font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#C69D32]/40">
              The Daily Ritual
            </span>
          </div>

          <div className="relative z-10 p-6 sm:p-8 text-[#FAF7F0] space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              “Achaar Bina Thali Adhoori”
            </h3>
            <p className="text-lg sm:text-xl text-[#FAF7F0]/90 font-sans max-w-md">
              Whether it’s hot ghee aloo parathas, comforting dal chawal, or evening khichdi — a single spoon elevates ordinary meals to a royal feast.
            </p>
            <button
              // onClick={() => {
              //   setSelectedCategory('all');
              //   setCurrentView('shop');
              // }}
              className="inline-flex items-center gap-2.5 text-sm sm:text-base font-serif font-bold text-[#E8C86A] group-hover:text-white transition-colors cursor-pointer pt-1"
            >
              <span>Explore All 12 Flavours</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Banner Right: "The 21-Day Solar Maturation" */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#EAE1D0] group bg-[#FAF7F0] flex flex-col justify-between min-h-[380px] sm:min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=80"
            alt="Terracotta Martabans in Sunlight"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#103C26] via-[#103C26]/60 to-transparent" />
          
          <div className="relative z-10 p-6 sm:p-8">
            <span className="bg-[#C69D32] text-[#0B2819] text-xs font-serif font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs">
              Ancient Terracotta Curing
            </span>
          </div>

          <div className="relative z-10 p-6 sm:p-8 text-[#FAF7F0] space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              21 Days of Himalayan Sunlight
            </h3>
            <p className="text-lg sm:text-xl text-[#FAF7F0]/90 font-sans max-w-md">
              Zero chemical preservatives or synthetic vinegar. We let nature, pure mustard oil, and Sendha rock salt mature our ingredients to perfection.
            </p>
            <button
              onClick={() => setCurrentView('story')}
              className="inline-flex items-center gap-2.5 text-sm sm:text-base font-serif font-bold text-[#E8C86A] group-hover:text-white transition-colors cursor-pointer pt-1"
            >
              <span>Read Our Heritage Story</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};