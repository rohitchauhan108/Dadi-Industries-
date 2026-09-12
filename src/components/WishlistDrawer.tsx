import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    openProductDetail,
    setCurrentView
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-[#0B2819]/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F0] shadow-2xl flex flex-col justify-between border-l border-[#EAE1D0] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE1D0] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#B9442C] fill-current" />
              <h2 className="font-serif font-bold text-xl text-[#103C26]">Saved Flavours</h2>
              <span className="bg-[#B9442C] text-white text-xs font-serif font-bold px-2.5 py-0.5 rounded-full">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full text-[#5E6E64] hover:text-[#103C26] hover:bg-[#FAF7F0] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white text-[#B9442C] flex items-center justify-center mx-auto text-2xl border border-[#EAE1D0]">
                  ❤️
                </div>
                <h3 className="font-serif font-bold text-lg text-[#103C26]">Your wishlist is empty</h3>
                <p className="text-xs text-[#5E6E64] max-w-xs mx-auto font-sans">
                  Click the heart icon on any pickle or chutney to save your favourites for later.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] text-xs font-serif font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer border border-[#C69D32]/40"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              wishlistedProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#EAE1D0] flex gap-3 items-center justify-between shadow-2xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#EAE1D0] cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductDetail(product.id);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetail(product.id);
                      }}
                      className="font-serif font-bold text-xs sm:text-sm text-[#103C26] truncate cursor-pointer hover:text-[#C69D32]"
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs font-serif font-bold text-[#103C26] block mt-0.5">
                      ₹{product.price} ({product.weight})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(product, product.weight, 1)}
                      className="p-2 bg-[#103C26] text-white rounded-xl hover:bg-[#0B2819] transition-colors cursor-pointer border border-[#C69D32]/30"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#E8C86A]" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 text-[#5E6E64] hover:text-[#B9442C] hover:bg-[#FAF7F0] rounded-xl transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-5 border-t border-[#EAE1D0] bg-white">
              <button
                onClick={() => {
                  wishlistedProducts.forEach(p => addToCart(p, p.weight, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-3 rounded-xl font-serif font-bold text-xs shadow-md cursor-pointer border border-[#C69D32]/40"
              >
                Add All Saved Items to Basket
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
