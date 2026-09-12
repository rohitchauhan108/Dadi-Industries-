'use client';

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ShopProvider } from '@/src/context/ShopContext';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';
import { CartDrawer } from '@/src/components/CartDrawer';
import { WishlistDrawer } from '@/src/components/WishlistDrawer';
import { QuickViewModal } from '@/src/components/QuickViewModal';
import { SearchModal } from '@/src/components/SearchModal';
import { AuthModal } from '@/src/components/AuthModal';
import { ToastContainer } from '@/src/components/Toast';
import { WhatsAppFloatingWidget } from '@/src/components/FloatingIcon';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 bg-[#103C26] text-[#E8C86A] p-3 rounded-full shadow-xl hover:bg-[#0B2819] transition-all hover:scale-105 active:scale-95 border border-[#C69D32]/40 cursor-pointer"
      aria-label="Scroll to top"
      title="Back to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#14241B] selection:bg-[#103C26] selection:text-[#FAF7F0]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <SearchModal />
        <AuthModal />
        <ToastContainer />
        <WhatsAppFloatingWidget />
        <ScrollToTopButton />
      </div>
    </ShopProvider>
  );
}
