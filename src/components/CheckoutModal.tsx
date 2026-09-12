import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, ShieldCheck, CreditCard, QrCode, Banknote, Lock } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    placeOrder,
    showToast,
    user,
    authLoading,
    openAuthModal,
    setCurrentView
  } = useShop();

  useEffect(() => {
    if (!authLoading && !user) {
      openAuthModal('signin');
      setCurrentView('shop');
    }
  }, [authLoading, openAuthModal, setCurrentView, user]);

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [state, setState] = useState(user?.state || '');
  const [pincode, setPincode] = useState(user?.pincode || '');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fill the form once the signed-in user's profile loads (e.g. session restored after a page refresh).
  useEffect(() => {
    if (!user) return;
    setCustomerName(prev => prev || user.name);
    setPhone(prev => prev || user.phone);
    setEmail(prev => prev || user.email);
    setAddress(prev => prev || user.address || '');
    setCity(prev => prev || user.city || '');
    setState(prev => prev || user.state || '');
    setPincode(prev => prev || user.pincode || '');
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#FAF7F0]">
        <span className="text-sm font-serif text-[#5E6E64]">Loading your account…</span>
      </div>
    );
  }

  if (!user) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || !city || !pincode) {
      showToast('Please fill in all mandatory delivery details.', 'warning');
      return;
    }

    setIsProcessing(true);

    placeOrder({
        customerName,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        paymentMethod
      }).catch(error => {
        showToast(error instanceof Error ? error.message : 'Unable to start payment.', 'warning');
      }).finally(() => {
      setIsProcessing(false);
      });
  };

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FAF7F0] rounded-3xl w-full p-6 sm:p-8 shadow-xl border border-[#EAE1D0]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE1D0] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#103C26] text-[#E8C86A] flex items-center justify-center border border-[#C69D32]/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-[#103C26]">Secure Checkout</h2>
              <span className="text-[11px] text-[#5E6E64] flex items-center gap-1 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2F7A52]" /> 256-Bit SSL Encrypted & Protected
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#5E6E64] hover:text-[#103C26] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Customer & Address Form (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              <h3 className="font-serif font-bold text-base text-[#103C26] border-b border-[#EAE1D0] pb-2">
                1. Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                <div>
                  <label className="block text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Rohit Chauhan"
                    className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#EAE1D0] text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#EAE1D0] text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                  />
                </div>
              </div>

              <div className="font-sans">
                <label className="block text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                  Email for Tracking *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#EAE1D0] text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                />
              </div>

              <div className="font-sans">
                <label className="block text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                  Street Address & Landmark *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Flat / House number, street and landmark"
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#EAE1D0] text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 font-sans">
                <div>
                  <label className="block text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#EAE1D0] text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="State"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#EAE1D0] text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                    placeholder="Pincode"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#EAE1D0] text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <h3 className="font-serif font-bold text-base text-[#103C26] border-b border-[#EAE1D0] pb-2 mb-3">
                  2. Payment Method
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#103C26] bg-[#103C26]/10 font-bold'
                        : 'border-[#EAE1D0] bg-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-[#C69D32]" />
                    <span className="text-xs font-serif text-[#103C26] block">UPI / QR</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#103C26] bg-[#103C26]/10 font-bold'
                        : 'border-[#EAE1D0] bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#C69D32]" />
                    <span className="text-xs font-serif text-[#103C26] block">Cards</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#103C26] bg-[#103C26]/10 font-bold'
                        : 'border-[#EAE1D0] bg-white'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mx-auto mb-1 text-[#C69D32]" />
                    <span className="text-xs font-serif text-[#103C26] block">Cash on Del.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#EAE1D0] space-y-4 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="font-serif font-bold text-base text-[#103C26] mb-3">
                  Order Summary ({cart.length} items)
                </h3>

                {/* Items preview */}
                <div className="max-h-48 overflow-y-auto space-y-2.5 mb-4 pr-1 font-sans">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="text-[#5E6E64]">{item.quantity}x</span>
                        <span className="font-semibold text-[#14241B] truncate">{item.product.name} ({item.selectedWeight})</span>
                      </div>
                      <span className="font-serif font-bold text-[#103C26] shrink-0">₹{item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Costs */}
                <div className="space-y-1.5 text-xs pt-3 border-t border-[#EAE1D0] font-sans">
                  <div className="flex justify-between text-[#5E6E64]">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#2F7A52] font-semibold">
                      <span>Discount</span>
                      <span>- ₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5E6E64]">
                    <span>Shipping Fee</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-[#103C26] pt-2 border-t border-[#EAE1D0]">
                    <span>Total Payable</span>
                    <span className="font-serif text-lg text-[#103C26]">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-3.5 px-6 rounded-xl font-serif font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer border border-[#C69D32]/40"
                >
                  {isProcessing ? (
                    <span>Confirming Order...</span>
                  ) : (
                    <>
                      <span>Place Order • ₹{totalAmount}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </form>

      </div>
      </div>
    </div>
  );
};
