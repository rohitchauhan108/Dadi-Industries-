import React, { useState } from "react";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { Star, Heart, Eye, ShoppingBag, Check, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    setQuickViewProduct,
    addToCart,
    setIsCartOpen,
    wishlist,
    toggleWishlist,
  } = useShop();

  const [selectedWeight, setSelectedWeight] = useState(product.weight);
  const [justAdded, setJustAdded] = useState(false);
  const images = product.galleryImages?.length > 1
    ? product.galleryImages
    : [product.image];

  const isWishlisted = wishlist.includes(product.id);
  const currentVariant = product.variants.find(
    (v) => v.weight === selectedWeight,
  ) || {
    price: product.price,
    originalPrice: product.originalPrice,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, 1);
    setIsCartOpen(true);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      onClick={() => openProductDetail(product.id)}
      className="group cursor-pointer bg-white rounded-2xl border border-[#EAE1D0] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        {/* Top Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3ECE0]">
          <img
            src={images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-100 group-hover:opacity-0 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
          <img
            src={images[1] ?? images[0]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />

          {/* Top Badges: Veg mark & Spice tag */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            {/* Standard Indian 100% Veg Mark */}
            <div
              className="w-5 h-5 bg-white rounded-sm border border-emerald-700 flex items-center justify-center p-0.5 shadow-xs"
              title="100% Vegetarian"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
            </div>

            {/* Spice tag */}
            <span className="text-[10px] font-medium px-2 py-0.5 bg-white/95 backdrop-blur-xs text-[#103C26] rounded-md border border-[#EAE1D0] shadow-xs uppercase tracking-wider font-serif">
              {product.spiceLevel}
            </span>
          </div>

          {/* Wishlist and Quick View Action Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
                isWishlisted
                  ? "bg-[#B9442C] text-white"
                  : "bg-white/90 text-[#14241B] hover:bg-white hover:text-[#B9442C]"
              }`}
              aria-label="Wishlist"
              title="Add to Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>

            {/* Quick View */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="p-2 rounded-full bg-white/90 text-[#14241B] hover:bg-white hover:text-[#103C26] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-sm"
              aria-label="Quick View"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* WhatsApp */}
            <button
              onClick={(e) => {
                e.stopPropagation();

                const message = `Hi, I'm interested in ${product.name}. Can you please share more details?`;
                const whatsappNumber = "919876543210"; // Replace with your WhatsApp number

                window.open(
                  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
                  "_blank",
                );
              }}
              className="p-2 rounded-full bg-[#25D366] text-white hover:bg-white hover:text-[#25D366] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-sm cursor-pointer"
              aria-label="WhatsApp"
              title="Contact on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </button>
          </div>

          {/* New Arrival or Bestseller Tag */}
          {/* {product.isBestseller && (
            <div className="absolute bottom-2 left-2 bg-[#103C26] text-[#FAF7F0] text-[10px] font-serif font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md shadow-xs border border-[#C69D32]/40">
              Heritage Bestseller
            </div>
          )}
          {product.isNewArrival && (
            <div className="absolute bottom-2 left-2 bg-[#C69D32] text-[#0B2819] text-[10px] font-serif font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md shadow-xs">
              Artisanal Batch
            </div>
          )} */}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5">
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            {/* <div className="flex text-[#C69D32]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div> */}
            {/* <span className="text-xs font-bold text-[#14241B] font-sans">{product.rating}</span> */}
            {/* <span className="text-[11px] text-[#5E6E64] font-sans">({product.reviewCount})</span> */}
          </div>

          {/* Product Title */}
          <h3 className="font-serif font-bold text-base text-[#103C26] group-hover:text-[#C69D32] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / short description */}
          {/* <p className="text-xs text-[#5E6E64] line-clamp-2 mt-1 leading-relaxed font-sans">
            {product.tagline}
          </p> */}

          {/* Weight Variant Selector */}
          {/* <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-[#5E6E64]">Jar Size:</span>
            <div className="flex items-center gap-1">
              {product.variants.map(v => (
                <button
                  key={v.weight}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedWeight(v.weight);
                  }}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded transition-colors ${
                    selectedWeight === v.weight
                      ? 'bg-[#103C26] text-[#FAF7F0] font-semibold'
                      : 'bg-[#F3ECE0] text-[#14241B] hover:bg-[#EAE1D0]'
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Row: Price & Add to Cart */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
        <div className="pt-3 flex items-center justify-between gap-2">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-lg text-[#103C26]">
                ₹{currentVariant.price}
              </span>
              {currentVariant.originalPrice && (
                <span className="text-xs text-[#5E6E64] line-through">
                  ₹{currentVariant.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#5E6E64] block -mt-0.5 font-sans">
              All taxes included
            </span>
          </div>

          {/* Add to Cart Button */}
          <div className="flex items-center justify-end">
            <button
              onClick={handleAddToCart}
              disabled={justAdded}
              className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2.5 rounded-full transition-all active:scale-95 shadow-xs font-serif ${
                justAdded
                  ? "bg-[#C69D32] text-[#0B2819] font-bold"
                  : "bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] border border-[#C69D32]/40"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E8C86A]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
