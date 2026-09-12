import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export const IndianMealExperience: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const [activeMeal, setActiveMeal] = useState(0);

  const mealPairings = [
    {
      name: "Subah Ka Garam Paratha",
      tag: "Breakfast Classic",
      pairWith: "Dadi's Special Mango Achaar",
      desc: "Crisp golden aloo or gobhi parathas served with a dollop of fresh white butter and a spoonful of tangy sun-cured mango pickle.",
      image: "/home/indian-tradition-1.webp",
      categoryId: "aachar"
    },
    {
      name: "Comforting Dal-Chawal",
      tag: "Lunch Staple",
      pairWith: "Digestive Lemon & Green Chilli Achaar",
      desc: "Steaming hot basmati rice with fragrant arhar dal, desi ghee, roasted papad, and digestive sun-ripened nimbu pickle.",
      image: "/home/indian-tradition-2.webp",
      categoryId: "aachar"
    },
    {
      name: "Barish Wali Moong Khichdi",
      tag: "Cozy Dinners",
      pairWith: "Banarasi Stuffed Red Chilli Achaar",
      desc: "Khichdi ke chaar yaar: dahi, papad, ghee aur Dadi ka chatpata hand-stuffed Banarasi Lal Mirch achaar.",
      image: "/home/indian-tradition-3.webp",
      categoryId: "aachar"
    },
    {
      name: "Travel & Tea-Time Thepla",
      tag: "Travel Favorite",
      pairWith: "Sweet & Sour Mango Chunda",
      desc: "Soft Gujarati methi theplas layered with golden jaggery-infused mango chunda — the ultimate nostalgic on-the-go meal.",
      image: "/home/indian-tradition-4.webp",
      categoryId: "aachar"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#EAE1D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#C69D32] mb-2 inline-block">
            INDIAN CULINARY TRADITION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103C26] tracking-tight">
            Har Khane Ka Perfect Saathi
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-[#5E6E64] max-w-2xl mx-auto font-handwritten text-[#103C26]">
            “Ek chammach Dadi ka achaar, aur har khana ban jaaye khaas.”
          </p>
        </div>

        {/* Interactive Meal Experience Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F0] rounded-3xl p-6 sm:p-10 border border-[#EAE1D0]">
          
          {/* Meal Options Selection on Left */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#5E6E64] mb-4">
              Select Your Meal Pairing:
            </h3>
            {mealPairings.map((meal, idx) => (
              <div
                key={idx}
                onClick={() => setActiveMeal(idx)}
                className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 border ${
                  activeMeal === idx
                    ? 'bg-white border-[#103C26] shadow-md -translate-y-0.5'
                    : 'bg-white/50 border-transparent hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-serif font-bold text-[#103C26] uppercase tracking-wider">
                    {meal.tag}
                  </span>
                  {activeMeal === idx && (
                    <span className="w-2 h-2 rounded-full bg-[#C69D32]" />
                  )}
                </div>
                <h4 className="font-serif font-bold text-base sm:text-lg text-[#103C26] mt-1">
                  {meal.name}
                </h4>
                <p className="text-xs text-[#5E6E64] mt-1 line-clamp-1 font-sans">
                  Best paired with: <span className="font-medium text-[#103C26]">{meal.pairWith}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Featured Meal Visual on Right */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-[#EAE1D0] p-6 sm:p-8">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-6 bg-[#F3ECE0]">
                <img
                  src={mealPairings[activeMeal].image}
                  alt={mealPairings[activeMeal].name}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#103C26]/90 backdrop-blur-md text-white text-[11px] font-serif font-bold uppercase px-3 py-1 rounded-full border border-[#C69D32]/40">
                  {mealPairings[activeMeal].tag}
                </div>
              </div>

              <div>
                <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#C69D32]">
                  Recommended Pairing
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#103C26] mt-1">
                  {mealPairings[activeMeal].pairWith}
                </h3>
                <p className="text-lg text-[#5E6E64] mt-2 leading-relaxed font-sans">
                  {mealPairings[activeMeal].desc}
                </p>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#EAE1D0]">
                  <span className="text-xs font-serif font-bold text-[#103C26] uppercase tracking-wider">
                    Authentic Homemade Flavours
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCategory(mealPairings[activeMeal].categoryId);
                      setCurrentView('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-xs font-serif font-bold text-[#103C26] hover:text-[#C69D32] transition-colors"
                  >
                    <span>Shop This Flavour</span>
                    <ArrowRight className="w-4 h-4 text-[#C69D32]" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
