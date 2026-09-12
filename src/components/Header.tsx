"use client";
import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  createWhatsAppInquiryUrl,
  openWhatsApp,
  WHATSAPP_DISPLAY_PHONE,
} from "../utils/whatsapp";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  Sparkles,
} from "lucide-react";
import { Instagram, Facebook } from "lucide-react";

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartItemCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    openAuthModal,
    user,
    authLoading,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{
    label: string;
    view: "home" | "story" | "why-dadi" | "contact" | "shop";
    onClick?: () => void;
  }> = [
    { label: "Home", view: "home" },
    { label: "Shop Pickles", view: "shop" },
    { label: "Our Story", view: "story" },
    { label: "Why Dadi", view: "why-dadi" },
    { label: "Contact", view: "contact" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-[#EAE1D0] shadow-xs transition-all w-full">
      {/* 1. Top Announcement & Support Bar */}
      <div className="bg-[#103C26] text-[#FAF7F0] py-2 px-4 sm:px-8 text-[11px] sm:text-xs font-serif border-b border-[#C69D32]/30">
        <div className="max-w-9xl mx-auto flex items-center justify-between gap-4 px-3 sm:px-6 lg:px-10">
          {/* Left Section: Delivery Info */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[#E8C86A] font-semibold tracking-wider uppercase text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Delivery in Dehradun</span>
            </span>
            <span className="hidden md:inline text-xl font-extrabold bg-gradient-to-b from-[#E8C86A] to-white bg-clip-text text-transparent">
              |
            </span>
            <span className="hidden md:inline text-white/80 font-sans text-[14px]">
              Pan-India Delivery Available
            </span>
          </div>

          {/* Right Section: WhatsApp & Socials */}
          <div className="flex items-center gap-4 sm:gap-6 font-sans">
            <button
              onClick={() =>
                openWhatsApp(
                  createWhatsAppInquiryUrl(
                    "Namaste Dadi Industries! I would like to place an order directly via WhatsApp.",
                  ),
                )
              }
              className="flex items-center gap-1.5 text-white hover:text-[#1EBE5D] font-bold transition-colors cursor-pointer"
              title="Order on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">Order:</span>
              <span className="underline">{WHATSAPP_DISPLAY_PHONE}</span>
            </button>

            <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/dadi.industries/"
                className="w-8 h-8 rounded-full bg-[#103C26] hover:bg-[#C69D32] hover:text-[#0B2819] text-[#FAF7F0] flex items-center justify-center transition-colors border border-[#C69D32]/30"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/people/Dadi-Industries/61594086487390/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#103C26] hover:bg-[#C69D32] hover:text-[#0B2819] text-[#FAF7F0] flex items-center justify-center transition-colors border border-[#C69D32]/30"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main High-Craft Brand Row */}
      <div className="max-w-8xl mx-auto px-3 sm:px-1 lg:px-18">
        <div className="flex items-center justify-between h-20 sm:h-22 gap-2 sm:gap-4">
          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-lg font-medium font-sans">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.onClick) {
                      link.onClick();
                    } else if (link.view) {
                      setCurrentView(link.view);
                    }
                  }}
                  className={`relative py-1 tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-[#103C26] font-bold"
                      : "text-[#2D3E33] hover:text-[#103C26]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C69D32] to-[#103C26] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Center Brand Identity (Logo) - Increased Size */}
          <div
            onClick={() => setCurrentView("home")}
            className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 text-center flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Namaste Dadi Industries Logo"
              height={85}
              width={170}
              className="w-[160px] h-[80px] sm:w-[180px] sm:h-[90px] object-contain"
            />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-[#14241B] hover:bg-[#F3ECE0] hover:text-[#103C26] transition-colors cursor-pointer"
              aria-label="Search"
              title="Search Pickles"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full text-[#14241B] hover:bg-[#F3ECE0] hover:text-[#103C26] transition-colors cursor-pointer"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#B9442C] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Authentication Actions (Desktop Only) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => user ? setCurrentView("account") : openAuthModal("signin")}
                className="flex items-center gap-1.5 text-[#103C26] hover:text-[#0B2819] py-2 px-2.5 rounded-full font-serif font-bold text-xs transition-all cursor-pointer"
              >
                <User className="w-7 h-7" />
                <span className="hidden xl:inline">{user ? user.name : 'Login'}</span>
              </button>
            </div>

            {/* Shopping Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-3.5 sm:py-2 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] rounded-full transition-all shadow-md active:scale-95 border border-[#C69D32]/50 cursor-pointer flex items-center justify-center"
              aria-label="Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#E8C86A]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C69D32] text-[#0B2819] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#14241B] hover:bg-[#F3ECE0] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Animated Mobile Drawer Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#FAF7F0] border-b border-[#EAE1D0] ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100 py-6 px-5"
            : "max-h-0 opacity-0 py-0 px-5 pointer-events-none"
        }`}
      >
        <div className="space-y-4">
          {/* User Status / Login Bar in Mobile Drawer */}
          {!authLoading && (
            <div className="p-3.5 bg-white rounded-2xl border border-[#EAE1D0]">
              <div className="flex items-center gap-2 w-full">
                {user ? (
                  <button
                    onClick={() => {
                      setCurrentView("account");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-5 py-2.5 rounded-xl text-xs font-serif font-bold shadow-sm transition-all active:scale-95 text-center cursor-pointer"
                  >
                    My Account
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        openAuthModal("signin");
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 border border-[#103C26] text-[#103C26] hover:bg-[#F3ECE0] px-5 py-2.5 rounded-xl text-xs font-serif font-bold shadow-sm transition-all active:scale-95 text-center cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal("signup");
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 bg-[#103C26] hover:bg-[#0B2819] text-[#FAF7F0] px-5 py-2.5 rounded-xl text-xs font-serif font-bold shadow-sm transition-all active:scale-95 text-center cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  } else if (link.view) {
                    setCurrentView(link.view);
                  }
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-left py-2.5 px-3 rounded-xl text-base font-serif font-bold text-[#14241B] hover:bg-white hover:text-[#103C26] transition-colors cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#C69D32]">→</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE1D0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5E6E64]">
            <span className="font-serif">Harbazwala, Uttarakhand</span>
            <span className="text-[#103C26] font-serif font-bold">
              100% Sun-Cured Heritage
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
