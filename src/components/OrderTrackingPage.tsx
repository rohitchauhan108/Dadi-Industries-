import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, Truck, Home, ArrowRight, ShieldCheck, Download, Share2, Sparkles } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { lastOrder, setCurrentView } = useShop();

  if (!lastOrder) {
    return (
      <div className="min-h-screen py-20 text-center bg-[#FAF7F0] px-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-white text-[#103C26] flex items-center justify-center mx-auto text-2xl border border-[#EAE1D0]">
            📦
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#103C26]">No Active Order Found</h2>
          <p className="text-xs text-[#5E6E64] font-sans">Explore our traditional pickles and place an order to track it live here.</p>
          <button
            onClick={() => setCurrentView('home')}
            className="bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-6 py-2.5 rounded-full text-xs font-serif font-bold cursor-pointer border border-[#C69D32]/40"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { title: "Order Confirmed", desc: "Received at Uttarakhand facility", icon: CheckCircle2, completed: true, current: false },
    { title: "Packed with Care", desc: "Cushioned leak-proof protective seal", icon: Package, completed: true, current: true },
    { title: "In Transit", desc: "Dispatched via Express Courier", icon: Truck, completed: false, current: false },
    { title: "Delivered", desc: `Estimated by ${lastOrder.estimatedDelivery}`, icon: Home, completed: false, current: false }
  ];

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Header */}
        <div className="bg-[#103C26] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#C69D32]/40 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#C69D32] text-[#0B2819] text-xs font-serif font-extrabold uppercase px-3.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Order Placed Successfully</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF7F0]">
                Dhanyawaad, {lastOrder.customerName}!
              </h1>
              <p className="text-xs sm:text-sm text-[#C8D6CD] font-sans">
                Your traditional achaar is being prepared with pure ingredients and utmost care.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center sm:text-right">
              <span className="text-[11px] text-[#C8D6CD] block font-sans">Order Tracking ID</span>
              <span className="font-mono font-bold text-lg text-[#E8C86A]">{lastOrder.orderId}</span>
              <span className="text-[10px] text-[#A8BDB1] block mt-0.5 font-sans">Est. Delivery: {lastOrder.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Live Delivery Progress Tracker */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE1D0] space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-[#103C26]">Live Shipment Tracker</h3>
            <span className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#103C26] bg-[#103C26]/10 px-2.5 py-1 rounded-full border border-[#103C26]/20">
              <span className="w-2 h-2 rounded-full bg-[#2F7A52] animate-ping" /> Fresh Batch Preparation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    step.completed
                      ? 'bg-[#FAF7F0] border-[#103C26] shadow-2xs'
                      : 'bg-white/40 border-transparent opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      step.completed ? 'bg-[#103C26] text-[#E8C86A]' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#5E6E64] font-sans">Step 0{idx + 1}</span>
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#103C26]">{step.title}</h4>
                  <p className="text-[11px] text-[#5E6E64] mt-0.5 font-sans">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Summary Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Items Purchased (7 cols) */}
          <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-[#EAE1D0] space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-base text-[#103C26] border-b border-[#EAE1D0] pb-3">
              Items in this Order ({lastOrder.items.length})
            </h3>

            <div className="space-y-3">
              {lastOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EAE1D0]"
                    />
                    <div>
                      <span className="font-serif font-bold text-[#103C26] block">{item.product.name}</span>
                      <span className="text-[#5E6E64] text-[11px] font-sans">Size: {item.selectedWeight} • Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-[#103C26]">₹{item.unitPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-[#EAE1D0] space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-[#5E6E64]">
                <span>Subtotal</span>
                <span>₹{lastOrder.subtotal}</span>
              </div>
              {lastOrder.discount > 0 && (
                <div className="flex justify-between text-[#2F7A52] font-semibold">
                  <span>Savings</span>
                  <span>- ₹{lastOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#5E6E64]">
                <span>Express Courier Shipping</span>
                <span>{lastOrder.shipping === 0 ? 'FREE' : `₹${lastOrder.shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-[#103C26] pt-2 border-t border-[#EAE1D0]">
                <span>Total Paid</span>
                <span className="text-[#103C26]">₹{lastOrder.total}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Next Actions (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EAE1D0] space-y-3 text-xs shadow-xs">
              <h3 className="font-serif font-bold text-base text-[#103C26]">Delivery Address</h3>
              <p className="text-[#14241B] font-semibold font-sans">{lastOrder.customerName}</p>
              <p className="text-[#5E6E64] leading-relaxed font-sans">
                {lastOrder.address}, {lastOrder.city}, {lastOrder.state} - {lastOrder.pincode}
              </p>
              <p className="text-[#5E6E64] font-sans">Phone: {lastOrder.phone}</p>
              <p className="text-[#5E6E64] font-sans">Payment: <span className="uppercase font-serif font-bold text-[#103C26]">{lastOrder.paymentMethod}</span></p>
            </div>

            <button
              onClick={() => setCurrentView('home')}
              className="w-full flex items-center justify-center gap-2 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-3.5 px-6 rounded-2xl font-serif font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer border border-[#C69D32]/40"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4 text-[#E8C86A]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
