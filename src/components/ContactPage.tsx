import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppInquiryUrl, openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Order Support',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please fill in your name, phone number, and message.', 'warning');
      return;
    }

    setIsSubmitted(true);
    showToast('Message sent! Dadi Industries team will contact you shortly.', 'success');
  };

  const address = "Harbazwala, near Kanti Mart, Sainik Colony, Dehradun 248001";

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We Are Here For You</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103C26] tracking-tight">
            Baat Kijiye, Dadi Ke Ghar Ki Tarah
          </h1>
          <p className="text-sm sm:text-xl text-[#5E6E64] max-w-xl mx-auto font-sans">
            Have questions about our pickles, bulk wholesale orders, or need help with a delivery? Reach out to our family team anytime.
          </p>
        </div>

        {/* Contact Form & Information Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#EAE1D0] shadow-md">
            
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in">
                <div className="w-16 h-16 rounded-full bg-[#103C26]/10 text-[#103C26] flex items-center justify-center mx-auto border border-[#103C26]/20">
                  <CheckCircle2 className="w-10 h-10 text-[#2F7A52]" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#103C26]">
                  Dhanyawaad, {formData.name}!
                </h3>
                <p className="text-sm text-[#5E6E64] max-w-md mx-auto font-sans">
                  We have received your message regarding <strong>{formData.inquiryType}</strong>. Our customer care team in Uttarakhand will respond to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', inquiryType: 'Order Support', message: '' });
                  }}
                  className="bg-[#103C26] text-white font-serif text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#0B2819] transition-colors cursor-pointer border border-[#C69D32]/40"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#103C26] mb-2">
                  Send Us A Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohit Chauhan"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] rounded-xl border border-[#EAE1D0] text-sm text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 86300 00405"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] rounded-xl border border-[#EAE1D0] text-sm text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="rohits502010@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] rounded-xl border border-[#EAE1D0] text-sm text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] rounded-xl border border-[#EAE1D0] text-sm text-[#14241B] focus:outline-hidden focus:border-[#103C26] cursor-pointer"
                    >
                      <option value="Order Support">Order Tracking & Support</option>
                      <option value="Wholesale / Bulk">Bulk & Retail Store Distribution</option>
                      <option value="Product Question">Recipe & Ingredients Query</option>
                      <option value="Feedback">Customer Review / Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#103C26] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] rounded-xl border border-[#EAE1D0] text-sm text-[#14241B] focus:outline-hidden focus:border-[#103C26]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] py-3.5 px-6 rounded-xl font-serif font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer border border-[#C69D32]/40"
                >
                  <Send className="w-4 h-4 text-[#E8C86A]" />
                  <span>Send Message to Dadi Industries</span>
                </button>
              </form>
            )}

          </div>

          {/* Right: Direct Information & Facility Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-3xl border border-[#EAE1D0] shadow-md space-y-4">
              <div className="flex items-center gap-3 text-[#103C26]">
                <div className="w-10 h-10 rounded-xl bg-[#103C26]/10 flex items-center justify-center border border-[#103C26]/20">
                  <MapPin className="w-5 h-5 text-[#C69D32]" />
                </div>
                <div>
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#5E6E64]">Kitchen & Facility</span>
                  <h3 className="font-serif font-bold text-base text-[#103C26]">Dadi Industries</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5E6E64] leading-relaxed font-sans">
                {address}
              </p>

              <div className="pt-2 border-t border-[#EAE1D0] flex items-center justify-between">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#103C26] hover:text-[#C69D32] transition-colors"
                >
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C69D32]" />
                </a>
              </div>
            </div>

            {/* Quick Contact Points */}
            <div className="bg-white p-6 rounded-3xl border border-[#EAE1D0] space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C69D32]" />
                <div>
                  <span className="text-[11px] text-[#5E6E64] block font-sans">Email Inquiries:</span>
                  <span className="text-xs font-serif font-bold text-[#103C26]">sumit421976@gmail.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#2F7A52]" />
                <div>
                  <span className="text-[11px] text-[#5E6E64] block font-sans">Support Timings:</span>
                  <span className="text-xs font-serif font-bold text-[#103C26]">Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              {/* Direct WhatsApp Ordering Action */}
              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp(createWhatsAppInquiryUrl('Namaste Dadi Industries! I would like to place an order / speak to your customer care team.'))}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Order via WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
