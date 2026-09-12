import React from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppCartOrderUrl, openWhatsApp } from '../utils/whatsapp';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    freeShippingThreshold,
    setCurrentView
  } = useShop();

  if (!isCartOpen) return null;

  const freeShippingDifference = freeShippingThreshold - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleStartShopping = () => {
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#0B2819]/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F0] shadow-2xl flex flex-col justify-between border-l border-[#EAE1D0] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE1D0] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C69D32]" />
              <h2 className="font-serif font-bold text-xl text-[#103C26]">Your Pantry Basket</h2>
              <span className="bg-[#103C26] text-[#E8C86A] text-xs font-serif font-bold px-2.5 py-0.5 rounded-full border border-[#C69D32]/30">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-[#5E6E64] hover:text-[#103C26] hover:bg-[#FAF7F0] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-white px-6 py-3 border-b border-[#EAE1D0] text-xs">
              <div className="flex items-center justify-between text-[#103C26] font-semibold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C69D32]" />
                  {freeShippingDifference > 0 ? (
                    <span className="font-sans">Add <strong>₹{freeShippingDifference}</strong> more for <strong>FREE Delivery</strong></span>
                  ) : (
                    <span className="text-[#2F7A52] font-serif font-bold">🎉 You unlocked FREE Delivery across Dehradun!</span>
                  )}
                </span>
                <span className="font-serif font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#EAE1D0] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#103C26] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white text-[#103C26] flex items-center justify-center mx-auto text-2xl border border-[#EAE1D0]">
                  🫙
                </div>
                <h3 className="font-serif font-bold text-lg text-[#103C26]">Your basket is empty</h3>
                <p className="text-xs text-[#5E6E64] max-w-xs mx-auto font-sans">
                  Add some delicious mango, lemon, or chilli pickles from Dadi's authentic kitchen.
                </p>
                <button
                  onClick={handleStartShopping}
                  className="bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] text-xs font-serif font-bold px-6 py-2.5 rounded-full transition-colors shadow-xs border border-[#C69D32]/40 cursor-pointer"
                >
                  Explore Achaar Range
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  className="bg-white p-3.5 rounded-2xl border border-[#EAE1D0] flex gap-3 items-center justify-between shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#EAE1D0] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#103C26] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] font-sans text-[#5E6E64] block">
                      Size: {item.selectedWeight}
                    </span>
                    <span className="font-serif font-bold text-xs text-[#103C26] block mt-0.5">
                      ₹{item.unitPrice} each
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                      className="text-[#5E6E64] hover:text-[#B9442C] transition-colors p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center bg-[#FAF7F0] rounded-lg border border-[#EAE1D0] p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#103C26] hover:bg-white rounded cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#103C26]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#103C26] hover:bg-white rounded cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#EAE1D0] space-y-4">
              
              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#5E6E64]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#14241B]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2F7A52] font-semibold">
                    <span>Discount</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}
                {/* <div className="flex justify-between text-[#5E6E64]">
                  <span>Courier Shipping</span>
                  <span className="font-semibold text-[#14241B]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div> */}
                <div className="flex justify-between text-sm font-serif font-bold text-[#103C26] pt-2 border-t border-[#EAE1D0]">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg text-[#103C26]">₹{totalAmount}</span>
                </div>
              </div>

              {/* Checkout & WhatsApp Buttons */}
              <div className="space-y-2.5">
                {/* Standard Secure Checkout Button */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-3.5 px-6 rounded-2xl font-serif font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer border border-[#C69D32]/40"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#E8C86A]" />
                </button>

                {/* Direct WhatsApp Order Button */}
                <button
                  onClick={() => {
                    const url = createWhatsAppCartOrderUrl(
                      cart,
                      subtotal,
                      discountAmount,
                      shippingFee,
                      totalAmount,
                    );
                    openWhatsApp(url);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-6 rounded-2xl font-serif font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Order Basket on WhatsApp</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
