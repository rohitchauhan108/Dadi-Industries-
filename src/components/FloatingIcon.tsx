"use client"
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  createWhatsAppProductOrderUrl,
  createWhatsAppCartOrderUrl,
  createWhatsAppInquiryUrl,
  openWhatsApp,
  WHATSAPP_DISPLAY_PHONE
} from '../utils/whatsapp';
import { X, Send, ShoppingBag, Sparkles, MessageCircle, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export const WhatsAppFloatingWidget: React.FC = () => {
  const { products, cart, subtotal, discountAmount, shippingFee, totalAmount } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedQuickProduct, setSelectedQuickProduct] = useState<string>('mango-pickle-special');

  const popularPickles = products.slice(0, 4);

  const handleOrderCartOnWhatsApp = () => {
    if (cart.length === 0) return;
    const url = createWhatsAppCartOrderUrl(
      cart,
      subtotal,
      discountAmount,
      shippingFee,
      totalAmount,
    );
    openWhatsApp(url);
    setIsOpen(false);
  };

  const handleOrderQuickProduct = (productId: string) => {
    const product = products.find(p => p.id === productId) || products[0];
    const url = createWhatsAppProductOrderUrl(
      product,
      product.weight,
      1,
      product.price
    );
    openWhatsApp(url);
    setIsOpen(false);
  };

  const handleSendCustomInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createWhatsAppInquiryUrl(customMessage.trim() || undefined);
    openWhatsApp(url);
    setCustomMessage('');
    setIsOpen(false);
  };

  const handleGeneralChat = () => {
    const url = createWhatsAppInquiryUrl();
    openWhatsApp(url);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger Button with 'group' class for hover effects */}
      <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 group">
        
        {/* Floating Tooltip Pill (Desktop) - Shows only on hover */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-[#103C26] text-[#FAF7F0] px-3.5 py-2 rounded-full shadow-lg border border-[#C69D32]/40 text-xs font-serif font-bold cursor-pointer hover:bg-[#0B2819] transition-all opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>Order on WhatsApp</span>
          </div>
        )}

        {/* Circular Action Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center ${
            isOpen 
              ? 'bg-[#103C26] text-[#FAF7F0] rotate-90 border border-[#C69D32]/40' 
              : 'bg-[#25D366] text-white hover:bg-[#1EBE5D] hover:scale-110 shadow-emerald-900/30'
          }`}
          aria-label="Direct WhatsApp Order"
          title="Direct WhatsApp Order & Helpline"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C69D32] border-2 border-white rounded-full" />
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Modal / Quick Order Card */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-[#FAF7F0] rounded-3xl shadow-2xl border border-[#EAE1D0] overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#103C26] p-4 sm:p-5 text-white flex items-center justify-between border-b border-[#C69D32]/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#FAF7F0]">
                    Dadi Industries WhatsApp
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#A8BDB1] font-sans">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>Direct Order Desk ({WHATSAPP_DISPLAY_PHONE})</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#C8D6CD] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto font-sans">
            
            {/* Quick 1-Tap Bestseller Order */}
            <div className="space-y-2">
              <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#5E6E64] block">
                Quick Order Bestsellers (1-Tap):
              </span>
              <div className="space-y-1.5">
                {popularPickles.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleOrderQuickProduct(p.id)}
                    className="flex items-center justify-between p-2.5 bg-white hover:bg-[#F3ECE0] rounded-xl border border-[#EAE1D0] transition-colors cursor-pointer group/item"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-9 h-9 rounded-lg object-cover border border-[#EAE1D0] shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="font-serif font-bold text-xs text-[#103C26] truncate group-hover/item:text-[#C69D32]">
                          {p.name}
                        </h4>
                        <span className="text-[10px] text-[#5E6E64] block">
                          ₹{p.price} • {p.weight}
                        </span>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-[11px] font-serif font-bold text-[#25D366] group-hover/item:translate-x-0.5 transition-transform shrink-0">
                      <span>Order</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Message / Order Form */}
            <form onSubmit={handleSendCustomInquiry} className="space-y-2 pt-2 border-t border-[#EAE1D0]">
              <label className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26] block">
                Custom Order / Recipe Query:
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Need 2kg Mango Pickle + 500g Lahsun Chutney in Delhi"
                  value={customMessage}
                  onChange={e => setCustomMessage(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 text-xs bg-white rounded-xl border border-[#EAE1D0] text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 text-[#25D366] hover:text-[#1EBE5D] cursor-pointer"
                  title="Send to WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* General Chat Button */}
            <button
              onClick={handleGeneralChat}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F0] text-[#103C26] py-2.5 px-4 rounded-xl font-serif font-bold text-xs border border-[#EAE1D0] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chat with Dadi Customer Care</span>
            </button>

          </div>

          {/* Micro Footer */}
          <div className="bg-[#FAF7F0] px-4 py-2.5 border-t border-[#EAE1D0] text-center text-[10px] text-[#5E6E64] font-sans">
            ⚡ Fast response • 100% Genuine Sun-Cured Heritage Pickles
          </div>

        </div>
      )}
    </>
  );
};