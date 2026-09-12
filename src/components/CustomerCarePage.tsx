'use client';

import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { createWhatsAppInquiryUrl, openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck
} from 'lucide-react';

type CustomerCarePageKey = 'shipping' | 'returns' | 'faqs' | 'privacy' | 'terms';

const PAGE_CONTENT: Record<CustomerCarePageKey, {
  eyebrow: string;
  title: string;
  intro: string;
}> = {
  shipping: {
    eyebrow: 'Customer Care / Delivery',
    title: 'Shipping & Delivery',
    intro: 'From our kitchen in Dehradun to your dining table, we pack every order carefully and keep delivery details simple.'
  },
  returns: {
    eyebrow: 'Customer Care / Promise',
    title: 'Returns & Guarantee',
    intro: 'Every jar should reach you safely and taste just right. If something goes wrong, our family team is here to make it right.'
  },
  faqs: {
    eyebrow: 'Customer Care / Helpful Answers',
    title: 'FAQs & Tips',
    intro: 'Find quick answers about ingredients, storage, orders, delivery, and getting the best flavour from every jar.'
  },
  privacy: {
    eyebrow: 'Customer Care / Your Information',
    title: 'Privacy Policy',
    intro: 'We respect the trust behind every order and keep your information limited to what helps us serve you well.'
  },
  terms: {
    eyebrow: 'Customer Care / Store Guidelines',
    title: 'Terms of Service',
    intro: 'These simple guidelines explain how orders, payments, delivery, and support work when you shop with Dadi Industries.'
  }
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103C26]">{title}</h2>
    <div className="text-sm sm:text-base text-[#5E6E64] leading-relaxed font-sans space-y-3">{children}</div>
  </section>
);

const SupportCta: React.FC = () => (
  <div className="bg-[#103C26] rounded-3xl p-6 sm:p-8 text-[#FAF7F0] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
    <div>
      <p className="font-serif text-xl font-bold">Still need a hand?</p>
      <p className="text-sm text-[#C8D6CD] mt-1">Our Dehradun team is happy to help with your order.</p>
    </div>
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => openWhatsApp(createWhatsAppInquiryUrl('Namaste Dadi Industries! I need help with my order.'))}
        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-xl text-sm font-serif font-bold transition-colors cursor-pointer"
      >
        WhatsApp Us <ArrowRight className="w-4 h-4" />
      </button>
      <a href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl text-sm font-serif font-bold transition-colors">
        Contact Team <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </div>
);

const ShippingPage: React.FC = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { icon: PackageCheck, title: 'Carefully packed', text: 'Each jar is checked, sealed, cushioned, and packed for its journey.' },
        { icon: Truck, title: 'Pan-India delivery', text: 'We deliver across India through trusted courier partners.' },
        { icon: Clock3, title: 'Dispatch updates', text: 'We share order and delivery updates using your contact details.' }
      ].map(({ icon: Icon, title, text }) => (
        <div key={title} className="bg-[#FAF7F0] rounded-2xl border border-[#EAE1D0] p-5">
          <Icon className="w-7 h-7 text-[#C69D32] mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#103C26]">{title}</h3>
          <p className="text-sm text-[#5E6E64] mt-1">{text}</p>
        </div>
      ))}
    </div>
    <Section title="Delivery timelines">
      <p>Orders are usually packed within 1–2 working days. Delivery generally takes 3–7 working days after dispatch, depending on your pincode and courier network. Dehradun orders may arrive sooner.</p>
      <p>Unexpected weather, holidays, remote-area routing, or courier delays can extend this estimate. We will always try to keep you informed.</p>
    </Section>
    <Section title="Shipping charges">
      <p>Shipping is free for orders of ₹499 or more. Orders below ₹499 may have a flat ₹49 courier charge, shown clearly in your basket before payment.</p>
    </Section>
    <Section title="When your order arrives">
      <ul className="list-disc pl-5 space-y-2">
        <li>Please check the outer package for visible damage before accepting it.</li>
        <li>Take a quick photo or video if the parcel or jar appears damaged.</li>
        <li>Contact us within 48 hours with your order details so we can help quickly.</li>
      </ul>
    </Section>
    <SupportCta />
  </>
);

const ReturnsPage: React.FC = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { icon: ShieldCheck, title: 'Quality promise', text: 'We stand behind the quality and care in every jar.' },
        { icon: RotateCcw, title: 'Quick resolution', text: 'Report an issue within 48 hours of delivery.' },
        { icon: CheckCircle2, title: 'Fair support', text: 'We assess every case with care, not a one-size-fits-all rule.' }
      ].map(({ icon: Icon, title, text }) => (
        <div key={title} className="bg-[#FAF7F0] rounded-2xl border border-[#EAE1D0] p-5">
          <Icon className="w-7 h-7 text-[#C69D32] mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#103C26]">{title}</h3>
          <p className="text-sm text-[#5E6E64] mt-1">{text}</p>
        </div>
      ))}
    </div>
    <Section title="Damaged, leaking, or incorrect orders">
      <p>We accept support requests for jars damaged in transit, leakage, missing items, or an item that does not match your order. Please contact us within 48 hours of delivery at <a className="text-[#103C26] font-semibold underline" href="mailto:sumit421976@gmail.com">sumit421976@gmail.com</a> or WhatsApp {WHATSAPP_DISPLAY_PHONE}.</p>
      <p>Include your order number, a short description, and clear photos of the parcel and product. This helps us resolve the issue without delay.</p>
    </Section>
    <Section title="Replacement or refund">
      <p>After reviewing the details, we may arrange a replacement, store credit, or refund for the affected item. Refunds are sent to the original payment method where possible and may take 5–7 working days to appear.</p>
    </Section>
    <Section title="What we cannot accept as a return">
      <ul className="list-disc pl-5 space-y-2">
        <li>Opened or partially consumed products where there is no quality or transit issue.</li>
        <li>Requests made after the 48-hour reporting window without a documented exception.</li>
        <li>Changes of mind or taste preferences, because food products cannot be resold safely.</li>
      </ul>
    </Section>
    <SupportCta />
  </>
);

const FaqsPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <>
      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="bg-[#FAF7F0] rounded-2xl border border-[#EAE1D0] overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 text-left p-5 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-serif font-bold text-base sm:text-lg text-[#103C26]">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#C69D32] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <p className="px-5 pb-5 text-sm text-[#5E6E64] leading-relaxed border-t border-[#EAE1D0] pt-4">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
      <Section title="Simple storage tips">
        <ul className="list-disc pl-5 space-y-2">
          <li>Always use a clean, dry spoon and close the lid firmly after serving.</li>
          <li>Store the jar in a cool, dry place away from direct sunlight.</li>
          <li>Refrigerate after opening for the best everyday freshness, especially in warm weather.</li>
        </ul>
      </Section>
      <SupportCta />
    </>
  );
};

const PrivacyPage: React.FC = () => (
  <>
    <Section title="Information we collect">
      <p>When you place an order or contact us, we may collect your name, phone number, email address, delivery address, pincode, order details, and messages you choose to send us.</p>
      <p>Payment details are handled by the relevant payment provider. We do not need or intend to store your complete card, UPI, or banking credentials.</p>
    </Section>
    <Section title="How we use your information">
      <ul className="list-disc pl-5 space-y-2">
        <li>Process, pack, deliver, and support your orders.</li>
        <li>Send order confirmations, delivery updates, and important service messages.</li>
        <li>Respond to questions, complaints, returns, and product feedback.</li>
        <li>Improve our products, website experience, and customer care.</li>
      </ul>
    </Section>
    <Section title="Sharing and protection">
      <p>We share only the information needed with delivery, payment, and technology partners who help us operate the store. We do not sell your personal information.</p>
      <p>We use reasonable administrative and technical safeguards, but no online transmission or storage system can be guaranteed completely secure.</p>
    </Section>
    <Section title="Your choices">
      <p>You can ask us to review, update, or delete personal information that we hold, subject to records we must retain for legal, accounting, or order-support reasons. Contact us at <a className="text-[#103C26] font-semibold underline" href="mailto:sumit421976@gmail.com">sumit421976@gmail.com</a>.</p>
    </Section>
    <p className="text-xs text-[#5E6E64] font-sans border-t border-[#EAE1D0] pt-5">Last updated: 10 September 2026</p>
    <SupportCta />
  </>
);

const TermsPage: React.FC = () => (
  <>
    <Section title="Using our store">
      <p>By using this website, you agree to provide accurate information, use the store lawfully, and keep your account or order details secure. We may update site content, product availability, prices, or delivery estimates when needed.</p>
    </Section>
    <Section title="Products and orders">
      <p>We aim to show accurate product names, images, ingredients, weights, and prices. Natural food products can have small variations in colour, texture, oil separation, and spice intensity between batches.</p>
      <p>An order is accepted when we confirm it. If an item becomes unavailable or an obvious pricing or inventory error occurs, we may contact you to correct or cancel the affected order and refund any amount paid for it.</p>
    </Section>
    <Section title="Payments and delivery">
      <p>You agree to pay the total shown at checkout, including applicable delivery charges. Delivery estimates are approximate and depend on courier conditions, holidays, weather, and the delivery address.</p>
    </Section>
    <Section title="Food safety and use">
      <p>Please review the product information and ingredient details before ordering, especially if you have allergies or dietary restrictions. Use a clean, dry spoon and follow the storage guidance on the product and our FAQs page.</p>
    </Section>
    <Section title="Support and liability">
      <p>Our support commitments for damaged, incorrect, or missing items are described in Returns & Guarantee. To the extent permitted by law, Dadi Industries is not responsible for indirect loss caused by courier delays, misuse, or circumstances outside our reasonable control.</p>
    </Section>
    <p className="text-xs text-[#5E6E64] font-sans border-t border-[#EAE1D0] pt-5">Last updated: 10 September 2026</p>
    <SupportCta />
  </>
);

export const CustomerCarePage: React.FC<{ page: CustomerCarePageKey }> = ({ page }) => {
  const content = PAGE_CONTENT[page];
  const pageBody = {
    shipping: <ShippingPage />,
    returns: <ReturnsPage />,
    faqs: <FaqsPage />,
    privacy: <PrivacyPage />,
    terms: <TermsPage />
  }[page];

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#103C26] tracking-tight">{content.title}</h1>
          <p className="mt-4 text-sm sm:text-lg text-[#5E6E64] leading-relaxed">{content.intro}</p>
        </div>

        <div className="bg-white rounded-3xl border border-[#EAE1D0] shadow-md p-6 sm:p-10 space-y-10">
          {pageBody}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-serif font-bold text-[#103C26]">
          <a href="/shipping-delivery" className="hover:text-[#C69D32]">Shipping</a>
          <a href="/returns-guarantee" className="hover:text-[#C69D32]">Returns</a>
          <a href="/faqs-tips" className="hover:text-[#C69D32]">FAQs</a>
          <a href="/privacy-policy" className="hover:text-[#C69D32]">Privacy</a>
          <a href="/terms-of-service" className="hover:text-[#C69D32]">Terms</a>
        </div>
      </div>
    </div>
  );
};
