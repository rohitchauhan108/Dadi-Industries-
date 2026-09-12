import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BestsellersSection: React.FC = () => {
  const { products, setCurrentView, setSelectedCategory } = useShop();

  const bestsellers = products.filter(p => p.isBestseller);

  const handleViewAll = () => {
    setSelectedCategory('all');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F0] border-b border-[#EAE1D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & View All Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favourites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103C26] tracking-tight">
              Dadi Ke Sabse Pasandida Achaar
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5E6E64] max-w-xl font-sans">
              Homemade in small batches with cold-pressed oils, pure rock salt, and spices that evoke the true taste of home.
            </p>
          </div>

          <button
            onClick={handleViewAll}
            className="group flex items-center gap-2 text-sm font-serif font-bold text-[#103C26] hover:text-[#C69D32] transition-colors self-start md:self-auto py-2"
          >
            <span>View All Pickles</span>
            <ArrowRight className="w-4 h-4 text-[#C69D32] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
