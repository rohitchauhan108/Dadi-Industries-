import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppProductOrderUrl, openWhatsApp } from '../utils/whatsapp';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Sun,
  Flame,
  Info,
  Leaf,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setCurrentView,
    addToCart,
    wishlist,
    toggleWishlist,
    showToast
  } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [selectedWeight, setSelectedWeight] = useState(product.weight);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'nutrition' | 'storage'>('details');

  const isWishlisted = wishlist.includes(product.id);
  const currentVariant = product.variants.find(v => v.weight === selectedWeight) || {
    price: product.price,
    originalPrice: product.originalPrice
  };

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const relatedProducts = products.filter(p => p.id !== product.id && (p.category === product.category || p.isBestseller)).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
  };

  const handleWhatsAppOrder = () => {
    const url = createWhatsAppProductOrderUrl(
      product,
      selectedWeight,
      quantity,
      currentVariant.price
    );
    openWhatsApp(url);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!', 'info');
  };

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation Bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#103C26] hover:text-[#C69D32] transition-colors py-1.5 px-3 rounded-lg hover:bg-white border border-transparent hover:border-[#EAE1D0] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-serif font-semibold text-[#5E6E64] hover:text-[#103C26] transition-colors p-2 cursor-pointer"
            title="Share this product"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share Pickle</span>
          </button>
        </div>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#EAE1D0]">
          
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#F3ECE0] border border-[#EAE1D0] shadow-xl">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={showPreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-[#103C26] shadow-md hover:bg-white transition-colors cursor-pointer"
                    aria-label="Previous product image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={showNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-[#103C26] shadow-md hover:bg-white transition-colors cursor-pointer"
                    aria-label="Next product image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-sm border border-emerald-700 flex items-center justify-center p-0.5 shadow-sm" title="100% Vegetarian">
                  <div className="w-3 h-3 rounded-full bg-emerald-700" />
                </div>
                <span className="text-xs font-serif font-bold px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[#103C26] rounded-md shadow-xs border border-[#EAE1D0]">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#B9442C] text-white'
                    : 'bg-white/90 text-[#14241B] hover:bg-white hover:text-[#B9442C]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#103C26] scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Micro Trust Strip */}
            <div className="grid grid-cols-3 gap-2 pt-3">
              <div className="bg-white p-3 rounded-xl text-center border border-[#EAE1D0]">
                <Sun className="w-4 h-4 text-[#C69D32] mx-auto mb-1" />
                <span className="text-[11px] font-serif font-bold text-[#103C26] block">Sun Cured</span>
                <span className="text-[9.5px] text-[#5E6E64] font-sans">Clay Martabans</span>
              </div>
              <div className="bg-white p-3 rounded-xl text-center border border-[#EAE1D0]">
                <Leaf className="w-4 h-4 text-[#2F7A52] mx-auto mb-1" />
                <span className="text-[11px] font-serif font-bold text-[#103C26] block">Cold-Pressed</span>
                <span className="text-[9.5px] text-[#5E6E64] font-sans">Kachi Ghani Oil</span>
              </div>
              <div className="bg-white p-3 rounded-xl text-center border border-[#EAE1D0]">
                <Sparkles className="w-4 h-4 text-[#C69D32] mx-auto mb-1" />
                <span className="text-[11px] font-serif font-bold text-[#103C26] block">Zero Chemicals</span>
                <span className="text-[9.5px] text-[#5E6E64] font-sans">100% Desi Taste</span>
              </div>
            </div>

          </div>

          {/* Right Column: Details & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Tagline */}
            <div>
              {product.hindiName && (
                <span className="text-xs font-serif font-bold text-[#C69D32] tracking-wide block mb-1">
                  {product.hindiName}
                </span>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#103C26] tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#5E6E64] leading-relaxed font-sans">
                {product.tagline}
              </p>
            </div>

            {/* Rating & Spice Badge Row */}
            <div className="flex flex-wrap items-center gap-4 py-2 border-y border-[#EAE1D0]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#C69D32]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#14241B]">{product.rating}</span>
                <span className="text-xs text-[#5E6E64] font-sans">({product.reviewCount} verified reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#5E6E64] font-sans">Spice Level:</span>
                <span className="font-serif font-bold text-[#B9442C] bg-[#B9442C]/10 px-2 py-0.5 rounded-md">
                  {product.spiceLevel}
                </span>
              </div>
            </div>

            {/* Price & Savings */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#103C26]">
                  ₹{currentVariant.price}
                </span>
                {currentVariant.originalPrice && (
                  <span className="text-lg text-[#5E6E64] line-through">
                    ₹{currentVariant.originalPrice}
                  </span>
                )}
                {currentVariant.originalPrice && (
                  <span className="text-xs font-serif font-bold text-[#103C26] bg-[#103C26]/10 px-2.5 py-1 rounded-full border border-[#103C26]/20">
                    Save ₹{currentVariant.originalPrice - currentVariant.price}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#5E6E64] block font-sans">
                Inclusive of all taxes • Fresh artisanal batch dispatched within 24 hours
              </span>
            </div>

            {/* Weight / Pack Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] block">
                Select Pack Weight:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedWeight(v.weight)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-serif font-bold text-xs transition-all cursor-pointer ${
                      selectedWeight === v.weight
                        ? 'border-[#103C26] bg-[#103C26] text-white shadow-md'
                        : 'border-[#EAE1D0] bg-white text-[#14241B] hover:border-[#103C26]'
                    }`}
                  >
                    <span>{v.weight}</span>
                    <span className={selectedWeight === v.weight ? 'text-[#E8C86A]' : 'text-[#5E6E64]'}>
                      ₹{v.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector + Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                
                {/* Quantity Buttons */}
                <div className="flex items-center bg-white rounded-xl border border-[#EAE1D0] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-base text-[#103C26] hover:bg-[#FAF7F0] rounded-lg transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#103C26]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-base text-[#103C26] hover:bg-[#FAF7F0] rounded-lg transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-3.5 px-6 rounded-xl font-serif font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer border border-[#C69D32]/40"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E8C86A]" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Direct WhatsApp Order */}
              <div>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  title="Direct Order via WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Delivery & Assurance Details */}
            <div className="bg-white p-4 rounded-2xl border border-[#EAE1D0] space-y-2 text-xs text-[#5E6E64]">
              <div className="flex items-center gap-2 text-[#103C26] font-semibold">
                <Truck className="w-4 h-4 text-[#C69D32]" />
                <span className="font-sans">Free shipping on all orders above ₹499 across India</span>
              </div>
              <div className="flex items-center gap-2 text-[#103C26] font-semibold">
                <RotateCcw className="w-4 h-4 text-[#2F7A52]" />
                <span className="font-sans">Leak-proof protective food-grade packaging guaranteed</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Info Section (Description, Ingredients, Nutrition, Storage) */}
        <div className="py-12 border-b border-[#EAE1D0]">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-3 border-b border-[#EAE1D0] pb-4 overflow-x-auto">
            {[
              { id: 'details' as const, label: 'Heritage Story & Recipe' },
              { id: 'ingredients' as const, label: '100% Pure Ingredients' },
              { id: 'storage' as const, label: 'Storage & Pairings' },
              { id: 'nutrition' as const, label: 'Nutritional Facts' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-serif font-bold text-base sm:text-lg pb-2 px-3 transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#103C26]'
                    : 'text-[#5E6E64] hover:text-[#103C26]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C69D32] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-6 max-w-4xl">
            {activeTab === 'details' && (
              <div className="space-y-4 text-sm sm:text-base text-[#5E6E64] leading-relaxed font-sans">
                <p>{product.description}</p>
                <div className="bg-white p-5 rounded-2xl border border-[#EAE1D0]">
                  <h4 className="font-serif font-bold text-base text-[#103C26] mb-2">
                    Why It Tastes Distinctively Authentic:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2F7A52] shrink-0 mt-0.5" />
                      <span><strong>Oil base:</strong> {product.oilType}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2F7A52] shrink-0 mt-0.5" />
                      <span><strong>Shelf life:</strong> {product.shelfLife}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2F7A52] shrink-0 mt-0.5" />
                      <span><strong>Preparation:</strong> Sun-ripened naturally without accelerated chemical cooking</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <p className="text-sm text-[#5E6E64] font-sans">
                  Crafted exclusively with unadulterated whole spices and farm-fresh produce:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-white text-[#103C26] text-xs sm:text-sm font-serif font-semibold px-3.5 py-1.5 rounded-full border border-[#EAE1D0] shadow-2xs"
                    >
                      🌿 {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-4 text-sm sm:text-base text-[#5E6E64] font-sans">
                <div className="bg-white p-5 rounded-2xl border border-[#EAE1D0]">
                  <h4 className="font-serif font-bold text-base text-[#103C26] mb-1">
                    Storage Guidelines
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5E6E64]">{product.storageInfo}</p>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-[#103C26] mb-2">
                    Best Culinary Pairings:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.pairingSuggestions.map((sug, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#14241B] bg-white p-3 rounded-xl border border-[#EAE1D0]">
                        <span className="text-[#C69D32]">✦</span>
                        <span>{sug}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4 font-sans">
                <p className="text-xs text-[#5E6E64]">Approximate values per 100g serving:</p>
                {product.nutritionPer100g ? (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="bg-white p-3.5 rounded-xl text-center border border-[#EAE1D0]">
                      <span className="text-[11px] text-[#5E6E64] block">Energy</span>
                      <span className="font-serif font-bold text-sm text-[#103C26]">{product.nutritionPer100g.energy}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl text-center border border-[#EAE1D0]">
                      <span className="text-[11px] text-[#5E6E64] block">Protein</span>
                      <span className="font-serif font-bold text-sm text-[#103C26]">{product.nutritionPer100g.protein}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl text-center border border-[#EAE1D0]">
                      <span className="text-[11px] text-[#5E6E64] block">Carbs</span>
                      <span className="font-serif font-bold text-sm text-[#103C26]">{product.nutritionPer100g.carbohydrates}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl text-center border border-[#EAE1D0]">
                      <span className="text-[11px] text-[#5E6E64] block">Fats</span>
                      <span className="font-serif font-bold text-sm text-[#103C26]">{product.nutritionPer100g.fat}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl text-center border border-[#EAE1D0]">
                      <span className="text-[11px] text-[#5E6E64] block">Sodium</span>
                      <span className="font-serif font-bold text-sm text-[#103C26]">{product.nutritionPer100g.sodium}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#5E6E64]">Natural ingredients only. Zero artificial preservatives.</p>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 sm:pt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#C69D32]">
                  MORE FROM DADI'S PANTRY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#103C26] mt-1">
                  You May Also Like
                </h3>
              </div>

              <button
                onClick={() => setCurrentView('shop')}
                className="text-xs font-serif font-bold text-[#103C26] hover:text-[#C69D32] transition-colors cursor-pointer"
              >
                Back to Shop →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
