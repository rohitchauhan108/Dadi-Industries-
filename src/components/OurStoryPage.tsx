import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { createWhatsAppInquiryUrl, openWhatsApp } from '../utils/whatsapp';
import { 
  Sun, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  Quote, 
  Flame,
  Award,
  BookOpen
} from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  const { setCurrentView } = useShop();
  const [activeStep, setActiveStep] = useState(0);

  const craftSteps = [
    {
      step: '01',
      title: 'Dawn Handpicking in Himalayan Foothills',
      subtitle: 'Only Unblemished, Firm Mountain Produce',
      description: 'Every morning at 5:30 AM, our farmer partners in Harbazwala and nearby hill groves harvest raw green mangoes and mountain lemons still glistening with dew. No bruised fruits, no cold storage.',
      details: 'We reject 40% of standard market fruits to choose only produce with high natural pectin and firm texture suitable for long sun curing.',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      tag: 'Raw Sourcing'
    },
    {
      step: '02',
      title: 'Sil-Batta & Roasted Whole Spice Blending',
      subtitle: 'Never Fine Powdered; Always Coarsely Crushed',
      description: 'Factory pickles use pre-ground dusty powders. At Dadi Industries, whole roasted fennel (saunf), fenugreek (methi), nigella (kalonji), and wild yellow mustard are hand-crushed on heavy granite stone.',
      details: 'Coarse stone grinding ruptures the spice oil cells without burning them, retaining the vibrant aroma that fills the entire room when you unseal a jar.',
      icon: Sparkles,
      image: 'https://i.pinimg.com/1200x/9c/e5/05/9ce505d6c42c36c0eb9a871c68c91217.jpg',
      tag: 'Ancestral Spicing'
    },
    {
      step: '03',
      title: '21 Days of Himalayan Terrace Sun-Curing',
      subtitle: 'Glazed Ceramic Martabans & Muslin Cloths',
      description: 'No steam cooking. No artificial heaters. The spices and fruits are layered in heavy terracotta martabans, tied with pristine white muslin cloth (malmal), and set out under natural sunlight for three full weeks.',
      details: 'Every afternoon, our master makers gently stir the jars in a circular clockwise motion so every piece absorbs warmth and oil evenly.',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
      tag: 'Solar Maturation'
    },
    {
      step: '04',
      title: 'Kachi Ghani Cold-Pressed Mustard Oil Bath',
      subtitle: 'Nature’s Eternal Preservative — Zero Chemical Acids',
      description: 'We submerge the matured pickles in single-origin, first-press Kachi Ghani mustard oil infused with pure Hathras hing (asafoetida) and Sendha Namak (rock salt).',
      details: 'The natural pungency of cold-pressed oil creates a sterile, living seal that preserves the crunch and tang for years without a single drop of synthetic vinegar.',
      icon: ShieldCheck,
      image: 'https://i.pinimg.com/1200x/ef/dc/98/efdc98b92c06cfe2316edba833b9edf5.jpg',
      tag: 'Pure Sealing'
    }
  ];

  return (
    <div className="bg-[#FAF7F0] min-h-screen py-10 sm:py-16 text-[#103C26]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Evocative Hero Banner with Soulful Headline */}
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3ECE0] border border-[#C69D32]/40 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#C69D32]" />
            <span className="text-xs font-serif uppercase tracking-[0.2em] font-bold text-[#103C26]">
              A Tribute to Every Indian Grandmother
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#103C26] leading-[1.08]">
            “Haath Geela Mat Lagana...” <br />
            <span className="font-editorial italic font-normal text-[#C69D32]">
              The Sacred Taste of Home That Time Cannot Erase.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#5E6E64] max-w-3xl mx-auto leading-relaxed font-sans font-normal pt-2">
            Every Indian remembers the summer vacation terrace: the intoxicating aroma of warm mustard oil, terracotta martabans covered with white muslin, and Dadi guarding her pickles with fierce love.
          </p>
        </div>

        {/* 2. Emotional Cinematic Story Visual */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] sm:aspect-[21/9] bg-[#0B2819]">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1600&q=85"
            alt="Traditional Indian Sun Cured Spices and Ceramic Martabans"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2819] via-[#0B2819]/40 to-transparent" />
          
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-[#FAF7F0] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#E8C86A]">
                Born in Harbazwala, Dehradun
              </span>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#FAF7F0]">
                Where Ancient Mountain Traditions Meet Honest Kitchen Craft
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-bold bg-[#C69D32] text-[#0B2819] px-4 py-2 rounded-full shadow-md">
                100% Traditional Sun-Cured
              </span>
            </div>
          </div>
        </div>

        {/* 3. The Grandmother's Letter (Emotional Gripping Narrative) */}
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-14 border border-[#C69D32]/30 shadow-lg relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-60 h-60 bg-[#C69D32]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="flex items-center gap-3 text-[#C69D32]">
              <Quote className="w-8 h-8 rotate-180 opacity-70" />
              <span className="font-serif uppercase tracking-[0.25em] text-xs font-bold text-[#103C26]">
                An Open Letter from Dadi's Kitchen
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#103C26] leading-snug">
              “Kyunki Pyaar Ko Jaldi Mein Nahi Pakaaya Jaa Sakta.”
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#3B4D41] leading-relaxed font-sans">
              <p>
                When you grow up and leave home for college or jobs in big cities, you realize that something is missing from your plate. The canteen food fills your stomach, the fancy restaurants offer novelty, but nothing comforts your weary heart like a spoonful of genuine <em>Ghar Ka Achaar</em>.
              </p>
              <p>
                Commercial pickles available in supermarkets are cooked in minutes using high-pressure steamers, swimming in synthetic acetic acid, artificial yellow dyes, and cheap refined palm oil. They taste sour, but they have no soul.
              </p>
              <p>
                At <strong>Dadi Industries</strong>, we refused to compromise. We chose the difficult, forgotten path: <strong>Waiting 21 sun-lit days for every single batch</strong>. Hand-roasting every fenugreek seed. Squeezing cold-pressed mustard oil in traditional wooden expellers. Because our children and grandchildren across India deserve real, unadulterated nourishment.
              </p>
            </div>

            <div className="pt-6 border-t border-[#EAE1D0] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-serif font-bold text-lg text-[#103C26] block">
                  — The Elders & Artisans of Dadi Industries
                </span>
                <span className="text-xs text-[#5E6E64] font-sans">Harbazwala, Dehradun • Uttarakhand</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-serif font-bold text-[#2F7A52] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#2F7A52]" /> Zero Chemical Preservatives
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Interactive Craft Demonstration: The 4 Sacred Steps */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#C69D32]">
              STEP-BY-STEP DEMONSTRATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103C26]">
              How True Indian Achaar Is Created
            </h2>
            <p className="text-sm text-[#5E6E64] font-sans">
              Explore the four meticulous phases that distinguish our artisanal sun-fermentation from mass commercial canning.
            </p>
          </div>

          {/* Interactive Step Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {craftSteps.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#103C26] text-[#FAF7F0] border-[#C69D32] shadow-md -translate-y-1'
                    : 'bg-white text-[#103C26] border-[#EAE1D0] hover:bg-[#F3ECE0]'
                }`}
              >
                <span className={`text-[10px] font-serif font-bold tracking-widest uppercase block ${
                  activeStep === idx ? 'text-[#E8C86A]' : 'text-[#C69D32]'
                }`}>
                  Phase {s.step}
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm mt-1 leading-snug truncate">
                  {s.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Active Step Feature Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE1D0] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#C69D32]/40 text-xs font-serif font-bold text-[#103C26]">
                <span>Phase {craftSteps[activeStep].step}</span>
                <span>•</span>
                <span className="text-[#C69D32]">{craftSteps[activeStep].tag}</span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#103C26] leading-tight">
                {craftSteps[activeStep].title}
              </h3>
              
              <h5 className="font-serif text-sm font-semibold text-[#2F7A52]">
                {craftSteps[activeStep].subtitle}
              </h5>

              <p className="text-sm sm:text-base text-[#5E6E64] leading-relaxed font-sans">
                {craftSteps[activeStep].description}
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#EAE1D0] text-xs sm:text-sm text-[#103C26] font-medium font-sans">
                💡 <strong>The Dadi Difference:</strong> {craftSteps[activeStep].details}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-[4/3] bg-[#F3ECE0]">
              <img
                src={craftSteps[activeStep].image}
                alt={craftSteps[activeStep].title}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* 5. Pure Heritage vs Commercial Demonstration Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EAE1D0] shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#C69D32]">
              THE TRUTH ABOUT YOUR FOOD
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#103C26]">
              Dadi Industries vs Mass-Produced Factory Pickles
            </h3>
            <p className="text-xs text-[#5E6E64] font-sans">
              See why Homemade traditional pickles taste infinitely richer and support digestive health.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-[#103C26]/20 bg-[#FAF7F0]">
                  <th className="p-3.5 font-serif font-bold text-[#103C26]">Quality Pillar</th>
                  <th className="p-3.5 font-serif font-bold text-[#103C26] bg-[#103C26]/10 rounded-t-xl">
                    🌿 Dadi Industries (Sun-Cured)
                  </th>
                  <th className="p-3.5 font-serif font-bold text-[#5E6E64]">
                    🏭 Factory Supermarket Pickles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE1D0] font-sans">
                <tr>
                  <td className="p-3.5 font-bold text-[#103C26]">Maturation Process</td>
                  <td className="p-3.5 bg-[#FAF7F0] font-semibold text-[#2F7A52]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2F7A52]" />
                      <span>21 Days Slow Himalayan Sun-Curing</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-[#5E6E64]">
                    <div className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>2-Hour Steam Cooking in Metal Vats</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-[#103C26]">Oil Sourcing</td>
                  <td className="p-3.5 bg-[#FAF7F0] font-semibold text-[#2F7A52]">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2F7A52]" />
                      <span>100% First-Press Cold-Pressed Kachi Ghani Mustard Oil</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-[#5E6E64]">
                    <div className="flex items-start gap-1.5">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>Refined Palm Oil & Low-grade Blended Oils</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-[#103C26]">Preservatives</td>
                  <td className="p-3.5 bg-[#FAF7F0] font-semibold text-[#2F7A52]">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2F7A52]" />
                      <span>Natural Sendha Namak (Rock Salt) & Mustard Oil living barrier</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-[#5E6E64]">
                    <div className="flex items-start gap-1.5">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>Glacial Acetic Acid & Sodium Benzoate (INS 211)</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-[#103C26]">Colors & Flavoring</td>
                  <td className="p-3.5 bg-[#FAF7F0] font-semibold text-[#2F7A52]">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2F7A52]" />
                      <span>Pure Varanasi Turmeric & Hathras Hing (Zero Colors)</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-[#5E6E64]">
                    <div className="flex items-start gap-1.5">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>Synthetic Tartrazine Yellow & Artificial Acidity Regulators</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-3.5 font-bold text-[#103C26]">Gut & Digestion</td>
                  <td className="p-3.5 bg-[#FAF7F0] font-semibold text-[#2F7A52]">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2F7A52]" />
                      <span>Rich in natural gut-friendly friendly enzymes from slow fermentation</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-[#5E6E64]">
                    <div className="flex items-start gap-1.5">
                      <XCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>May trigger heartburn and sharp acidic reflux</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Call to Action */}
        <div className="bg-gradient-to-r from-[#103C26] via-[#0B2819] to-[#103C26] rounded-3xl p-8 sm:p-12 text-[#FAF7F0] text-center border border-[#C69D32]/40 shadow-xl space-y-6">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-[#C69D32] flex items-center justify-center mx-auto text-[#E8C86A]">
            <Heart className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-xl mx-auto">
            Ready to Bring True Grandmother’s Magic Back to Your Dining Table?
          </h2>

          <p className="text-sm sm:text-base text-[#FAF7F0]/80 max-w-lg mx-auto font-sans">
            Every jar ordered supports independent organic farmers in Uttarakhand and keeps ancestral culinary wisdom alive.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#C69D32] hover:bg-[#E8C86A] text-[#0B2819] px-8 py-4 rounded-full font-serif font-bold text-sm sm:text-base transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Explore All Homemade Pickles</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openWhatsApp(createWhatsAppInquiryUrl('Namaste Dadi Industries! I read your story and want to order authentic pickles on WhatsApp.'))}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-7 py-4 rounded-full font-serif font-bold text-sm sm:text-base transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
