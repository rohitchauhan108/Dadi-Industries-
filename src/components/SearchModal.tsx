import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, Star, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    products,
    isSearchOpen,
    setIsSearchOpen,
    openProductDetail,
    setSelectedCategory,
    setCurrentView
  } = useShop();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.ingredients.some(i => i.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [products, query]);

  if (!isSearchOpen) return null;

  const popularTags = ['Mango Achaar', 'Lemon', 'Banarasi Mirch', 'Garlic Chutney', 'Pachranga', 'Cold-Pressed'];

  const handleTagClick = (tag: string) => {
    setQuery(tag);
  };

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    openProductDetail(productId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div 
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-[#0B2819]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF7F0] rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#EAE1D0] z-10 animate-in fade-in zoom-in duration-200">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-6">
          <Search className="w-5 h-5 text-[#C69D32] absolute left-4" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search mango pickles, garlic chutney, stuffed chilli..."
            className="w-full pl-12 pr-12 py-3.5 bg-white rounded-2xl border border-[#EAE1D0] text-sm sm:text-base text-[#14241B] focus:outline-hidden focus:border-[#103C26] font-sans"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-3 p-1.5 rounded-full text-[#5E6E64] hover:text-[#103C26] hover:bg-[#FAF7F0] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="mb-6">
          <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#5E6E64] block mb-2">
            Popular Searches:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-xs bg-white hover:bg-[#FAF7F0] text-[#103C26] font-serif font-medium px-3.5 py-1.5 rounded-full border border-[#EAE1D0] transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="border-t border-[#EAE1D0] pt-4 space-y-2">
            <span className="text-xs font-serif font-semibold text-[#5E6E64] block mb-2">
              Found {searchResults.length} matching flavours:
            </span>

            {searchResults.length === 0 ? (
              <p className="text-xs text-[#5E6E64] py-4 text-center font-sans">
                No pickles matched "{query}". Try checking the spelling or browse our pantry categories.
              </p>
            ) : (
              searchResults.map(p => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p.id)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#FAF7F0] border border-[#EAE1D0] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#EAE1D0]"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#103C26]">{p.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#5E6E64] font-sans">
                        <span>₹{p.price}</span>
                        <span>•</span>
                        <span className="flex items-center text-[#C69D32]">
                          <Star className="w-3 h-3 fill-current inline mr-0.5" />
                          {p.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#103C26]" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
