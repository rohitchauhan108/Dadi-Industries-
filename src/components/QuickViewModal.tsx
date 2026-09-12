import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppProductOrderUrl, openWhatsApp } from '../utils/whatsapp';
import { X, Star, ShoppingBag, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    setIsCartOpen,
    openProductDetail
  } = useShop();

  const [selectedWeight, setSelectedWeight] = useState(quickViewProduct ? quickViewProduct.weight : '250g');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentVariant = quickViewProduct.variants.find(v => v.weight === selectedWeight) || {
    price: quickViewProduct.price,
    originalPrice: quickViewProduct.originalPrice
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedWeight, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-[#0B2819]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF7F0] rounded-3xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-[#EAE1D0] z-10 animate-in fade-in zoom-in duration-200">
        
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-[#5E6E64] hover:text-[#103C26] hover:bg-[#FAF7F0] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          
          {/* Product Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#EAE1D0] shadow-xs">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-serif font-bold text-[#C69D32] uppercase tracking-wider block">
                {quickViewProduct.categoryLabel}
              </span>
              <h3 className="font-serif font-bold text-xl text-[#103C26] leading-snug">
                {quickViewProduct.name}
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex text-[#C69D32]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#14241B]">{quickViewProduct.rating}</span>
              <span className="text-[11px] text-[#5E6E64] font-sans">({quickViewProduct.reviewCount} reviews)</span>
            </div>

            <p className="text-xs text-[#5E6E64] leading-relaxed line-clamp-3 font-sans">
              {quickViewProduct.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-2xl text-[#103C26]">
                ₹{currentVariant.price}
              </span>
              {currentVariant.originalPrice && (
                <span className="text-xs text-[#5E6E64] line-through font-sans">
                  ₹{currentVariant.originalPrice}
                </span>
              )}
            </div>

            {/* Weight Options */}
            <div>
              <span className="text-[11px] font-serif font-bold text-[#103C26] block mb-1.5">Pack Size:</span>
              <div className="flex gap-2">
                {quickViewProduct.variants.map(v => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedWeight(v.weight)}
                    className={`text-xs font-serif font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      selectedWeight === v.weight
                        ? 'bg-[#103C26] text-[#FAF7F0] border-[#103C26]'
                        : 'bg-white text-[#14241B] border-[#EAE1D0]'
                    }`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-1.5 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-2.5 px-3 rounded-xl font-serif font-bold text-xs shadow-xs transition-all cursor-pointer border border-[#C69D32]/40"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E8C86A]" />
                  <span>Add to Basket</span>
                </button>

                <button
                  onClick={() => {
                    const url = createWhatsAppProductOrderUrl(
                      quickViewProduct,
                      selectedWeight,
                      quantity,
                      currentVariant.price
                    );
                    openWhatsApp(url);
                    setQuickViewProduct(null);
                  }}
                  className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-3 rounded-xl font-serif font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Order on WA</span>
                </button>
              </div>

              <button
                onClick={() => openProductDetail(quickViewProduct.id)}
                className="w-full text-center text-xs font-serif font-bold text-[#103C26] hover:text-[#C69D32] transition-colors py-1 cursor-pointer"
              >
                View Complete Ingredients & Nutrition →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
