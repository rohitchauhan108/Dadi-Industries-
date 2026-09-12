import React from 'react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('shop');
  };

  return (
    <section id="categories-section" className="py-14 sm:py-20 bg-[#FAF7F0] border-b border-[#EAE1D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32]">
              <Sparkles className="w-4 h-4" />
              <span>Authentic Selections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103C26] mt-1.5">
              Explore By Flavour Heritage
            </h2>
          </div>
        </div>

        {/* 5-Column Responsive Showcase Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center justify-center p-6 sm:p-8 text-center group cursor-pointer bg-white rounded-3xl border border-[#EAE1D0] hover:border-[#C69D32] hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
            >
              {/* Subtle top gold accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#103C26] via-[#C69D32] to-[#103C26] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Category image with zoom */}
              <div className="mb-4 w-24 overflow-hidden transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Bold Category Name in Serif */}
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#103C26] group-hover:text-[#C69D32] transition-colors leading-tight">
                {cat.name}
              </h3>

              {/* Tagline */}
              <p className="text-xs sm:text-sm font-medium text-[#5E6E64] mt-2 line-clamp-1 font-sans">
                {cat.tagline}
              </p>

              {/* Varieties pill */}
              <span className="mt-4 inline-block text-xs font-bold text-[#103C26] bg-[#F3ECE0] px-3.5 py-1 rounded-full group-hover:bg-[#103C26] group-hover:text-[#FAF7F0] transition-colors uppercase tracking-wider font-serif">
                {cat.itemCount} Flavours
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
