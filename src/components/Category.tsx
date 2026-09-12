import React from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppInquiryUrl, openWhatsApp } from '../utils/whatsapp';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Category: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const categories = [
    {
      id: 'achaar',
      title: 'Traditional Sun-Cured Achaar',
      tagline: 'Grandmother’s Secret Recipes',
      description: 'Slow-matured in cold-pressed Kachi Ghani mustard oil and sun-cured in terracotta martabans under the mountain sun. Zero chemical preservatives.',
      image: '/home/achaar.webp',
      badge: 'Bestselling Range',
      categoryKey: 'aachar',
    },
    {
      id: 'candy',
      title: 'Himalayan Digestif Candies',
      tagline: 'Pachak & Sweet-Tangy Treats',
      description: 'Homemade digestive candies infused with wild Himalayan herbs, black salt, raw jaggery, and zesty spices to boost gut vitality after heavy meals.',
      image: '/home/candy.webp',
      badge: 'Pure & Wholesome',
      categoryKey: 'candy', // Maps to your ShopContext category
    }
  ];

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setCurrentView('shop');
  };

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0B2819]/10 text-[#0B2819] px-3.5 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-widest border border-[#C69D32]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C69D32]" />
            <span>Homemade Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2819] tracking-tight">
            Our Ancestral Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-700 font-sans">
            Rooted in Himalayan tradition, crafted with patience, and brought straight to your family dining table.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.categoryKey)}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EAE1D0] group bg-[#0B2819] flex flex-col justify-between min-h-[440px] sm:min-h-[480px] cursor-pointer"
            >
              {/* Background Image with Zoom Effect */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
              />

              {/* Rich Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2819] via-[#0B2819]/70 to-black/30" />

              {/* Top Badge & Tag */}
              <div className="relative z-10 p-6 sm:p-8 flex justify-between items-start">
                <span className="bg-[#C69D32] text-[#0B2819] text-xs font-serif font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">
                  {cat.badge}
                </span>
                <span className="text-xs sm:text-sm font-serif tracking-widest uppercase text-[#E8C86A] bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                  {cat.tagline}
                </span>
              </div>

              {/* Bottom Content & CTAs */}
              <div className="relative z-10 p-6 sm:p-8 text-[#FAF7F0] space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  {cat.title}
                </h3>
                
                <p className="text-base sm:text-lg text-[#FAF7F0]/90 font-sans max-w-lg leading-relaxed">
                  {cat.description}
                </p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(cat.categoryKey);
                  }}
                  className="inline-flex items-center gap-2 bg-[#C69D32] text-[#0B2819] hover:bg-white hover:text-[#C69D32] text-sm font-serif font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 shadow-md group/btn cursor-pointer"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Category;