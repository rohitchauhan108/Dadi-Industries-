import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Search, SlidersHorizontal, ArrowUpDown, X, Filter, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useShop();

  const [spiceFilter, setSpiceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating' | 'new'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(650);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Spice level filter
      if (spiceFilter !== 'all' && product.spiceLevel !== spiceFilter) {
        return false;
      }
      // Max price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchTag = product.tagline.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchIng = product.ingredients.some(i => i.toLowerCase().includes(q));
        if (!matchName && !matchTag && !matchDesc && !matchIng) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'new') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // Popular (bestsellers first, then rating)
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.reviewCount - a.reviewCount;
    });
  }, [products, selectedCategory, spiceFilter, maxPrice, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSpiceFilter('all');
    setMaxPrice(650);
    setSearchQuery('');
    setSortBy('popular');
  };

  const hasActiveFilters = selectedCategory !== 'all' || spiceFilter !== 'all' || maxPrice < 650 || searchQuery !== '';

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dadi's Online Pantry</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103C26] mt-1 tracking-tight">
            Traditional Pickles & Homemade Chutneys
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#5E6E64] max-w-2xl font-sans">
            Browse our entire collection of sun-cured achaar, stone-ground chutneys and handmade spice blends. 
            Shipped fresh directly from our Uttarakhand kitchen.
          </p>
        </div>

        {/* Top Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE1D0] mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5E6E64] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ingredient, name (e.g. Mango, Mustard, Garlic, Lemon)..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7F0] rounded-xl border border-[#EAE1D0] text-sm text-[#14241B] placeholder-[#5E6E64] focus:outline-hidden focus:border-[#103C26] focus:ring-1 focus:ring-[#103C26]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E6E64] hover:text-[#103C26] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#FAF7F0] px-3.5 py-2.5 rounded-xl border border-[#EAE1D0] text-xs font-serif font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C69D32]" />
              <label htmlFor="sort-select" className="text-[#5E6E64] hidden sm:inline">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent text-[#103C26] font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="new">New Batches</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 bg-[#103C26] text-[#FAF7F0] px-3.5 py-2.5 rounded-xl text-xs font-serif font-bold shadow-xs cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-[#E8C86A]" />
              <span>Filters</span>
            </button>
          </div>

        </div>

        {/* Main Grid with Left Sidebar Filters + Right Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filters (Desktop & Mobile Drawer) */}
          <div className={`lg:col-span-3 space-y-6 ${
            mobileFilterOpen ? 'block fixed inset-0 z-50 bg-[#FAF7F0] p-6 overflow-y-auto' : 'hidden lg:block'
          }`}>
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE1D0] mb-4">
                <span className="font-serif font-bold text-lg text-[#103C26]">Filter Flavours</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg bg-white text-[#103C26] border border-[#EAE1D0] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Categories Filter */}
            <div className="bg-white p-5 rounded-2xl border border-[#EAE1D0]">
              <h3 className="font-serif font-bold text-base text-[#103C26] mb-3">
                Flavour Heritage
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between text-xs font-serif font-semibold py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#103C26] text-[#FAF7F0]'
                      : 'text-[#14241B] hover:bg-[#FAF7F0]'
                  }`}
                >
                  <span>All Flavours</span>
                  <span>{products.length}</span>
                </button>

                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between text-xs font-serif font-semibold py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#103C26] text-[#FAF7F0]'
                        : 'text-[#14241B] hover:bg-[#FAF7F0]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {/* <span>{cat.emoji}</span> */}
                      <span>{cat.name}</span>
                    </span>
                    <span>{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

      

            {/* Price Slider Filter */}
            <div className="bg-white p-5 rounded-2xl border border-[#EAE1D0]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-base text-[#103C26]">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-[#103C26] font-serif">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="650"
                step="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#103C26] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#5E6E64] mt-1 font-sans">
                <span>₹100</span>
                <span>₹650</span>
              </div>
            </div>

            {/* Reset Filters CTA */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2.5 px-4 bg-transparent border border-[#B9442C] text-[#B9442C] hover:bg-[#B9442C] hover:text-white rounded-xl text-xs font-serif font-bold transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            )}

            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-4 py-3 bg-[#103C26] text-white rounded-xl font-serif font-bold text-sm cursor-pointer"
              >
                Show {filteredProducts.length} Results
              </button>
            )}
          </div>

          {/* Right Column: Product Cards Grid */}
          <div className="lg:col-span-9">
            
            {/* Active Filter Pills Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
                <span className="text-[#5E6E64] font-medium font-sans">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="bg-[#103C26]/10 text-[#103C26] font-serif font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#103C26]/20">
                    Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </span>
                )}
                {spiceFilter !== 'all' && (
                  <span className="bg-[#103C26]/10 text-[#103C26] font-serif font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#103C26]/20">
                    Spice: {spiceFilter}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSpiceFilter('all')} />
                  </span>
                )}
                {maxPrice < 650 && (
                  <span className="bg-[#103C26]/10 text-[#103C26] font-serif font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#103C26]/20">
                    Under ₹{maxPrice}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(650)} />
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-[#103C26]/10 text-[#103C26] font-serif font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#103C26]/20">
                    "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#B9442C] underline font-serif font-semibold ml-2 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-serif font-semibold text-[#5E6E64]">
                Showing {filteredProducts.length} authentic products
              </span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE1D0] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F0] text-[#103C26] flex items-center justify-center mx-auto text-2xl border border-[#EAE1D0]">
                  🔍
                </div>
                <h3 className="font-serif font-bold text-xl text-[#103C26]">
                  No matching pickles or chutneys found
                </h3>
                <p className="text-sm text-[#5E6E64] max-w-md mx-auto font-sans">
                  Try adjusting your filter options or searching for different ingredients like Mango, Mustard, Lemon, or Banarasi Chilli.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-6 py-2.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer border border-[#C69D32]/40"
                >
                  View All Products
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
