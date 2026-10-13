import React from 'react';
import { ArrowDownRight, Compass, ShieldCheck, Mountain, Leaf, Sparkles, Send } from 'lucide-react';
import { Language } from '../types/puerh';

interface HeroSectionProps {
  language: Language;
  onOpenInquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language, onOpenInquiry }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#0a0f0c]">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=2000&q=85"
          alt="Yunnan Misty Ancient Tea Forest"
          className="w-full h-full object-cover object-center opacity-30 scale-105 animate-[pulse_14s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1411] via-[#0f1411]/80 to-[#0a0f0c]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d3523]/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left pt-6">
        {/* Editorial Origin Kicker */}
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-[#18261c]/80 border border-[#2e4734] backdrop-blur-sm text-xs text-[#a2c5a6]">
          <span className="w-2 h-2 rounded-full bg-[#52b763] animate-ping" />
          <span className="font-cinzel tracking-widest text-[#d5e7d8] uppercase">
            {language === 'en'
              ? 'Xishuangbanna · Lincang · Pu\'er Primeval Forests'
              : '西双版纳 · 临沧 · 普洱 原始森林古茶园'}
          </span>
          <span className="text-[#4b6d51]">·</span>
          <span>{language === 'en' ? 'Spring 2024 / Aged Reserves' : '头春纯料 & 岁月陈藏'}</span>
        </div>

        {/* Hero Main Heading */}
        <div className="max-w-4xl space-y-4">
          <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f3f7f4] leading-[1.1]">
            {language === 'en' ? (
              <>
                Where Ancient Trees Meet <br />
                <span className="bg-gradient-to-r from-[#98d49f] via-[#c6ebd0] to-[#e1f3e5] bg-clip-text text-transparent italic font-serif">
                  Profound Nature.
                </span>
              </>
            ) : (
              <>
                敬畏深山古树天工 <br />
                <span className="bg-gradient-to-r from-[#8fc996] via-[#c4e6cb] to-[#edf7f0] bg-clip-text text-transparent font-serif-sc font-normal">
                  在一杯茶中，与大自然深度对话
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#b0c4b4] max-w-2xl font-serif-sc font-light leading-relaxed">
            {language === 'en'
              ? 'Sourced from 300 to 800+ year-old wild arbor trees hidden deep within Yunnan\'s misty subtropical rainforests. Hand-picked, sun-dried, and stone-pressed by ancestral methods—delivering transformative living tea energy that awakens the human body and spirit.'
              : '严选藏匿于云南原始亚热带雨林中的300至800年野生古茶树。遵从古法徒手攀采、柴火杀青、烈日晒青与天然青石压制。不仅是一叶茶的远行，更是一次唤醒身心、与天地山川灵气的深度沟通。'}
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-10 max-w-5xl">
          <div className="p-4 rounded-xl bg-[#131d16]/80 border border-[#233527] hover:border-[#3d5e43] transition-all group backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-[#1c2c20] flex items-center justify-center text-[#7bc285] mb-2.5 group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-[#e1ece3] font-cinzel">
              {language === 'en' ? 'Extreme Scarcity' : '原料极其珍稀'}
            </h2>
            <p className="text-xs text-[#8ca391] mt-1 leading-relaxed">
              {language === 'en'
                ? '300-800+ yr arbor trees; strictly limited seasonal yields, non-clonal heritage genetics.'
                : '数百上千年野生型与栽培型大古树，单株年产不足2公斤，不施人工催芽。'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#131d16]/80 border border-[#233527] hover:border-[#3d5e43] transition-all group backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-[#1c2c20] flex items-center justify-center text-[#7bc285] mb-2.5 group-hover:scale-105 transition-transform">
              <Mountain className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-[#e1ece3] font-cinzel">
              {language === 'en' ? 'Virgin Terroir' : '原始森林绝佳生态'}
            </h2>
            <p className="text-xs text-[#8ca391] mt-1 leading-relaxed">
              {language === 'en'
                ? '1,800m altitude clouds & mist, volcanic mineral soils, zero pesticide contamination.'
                : '平均海拔1800米以上，万物共生，野生兰花寄生茶树，508项农残检测为0。'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#131d16]/80 border border-[#233527] hover:border-[#3d5e43] transition-all group backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-[#1c2c20] flex items-center justify-center text-[#7bc285] mb-2.5 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-[#e1ece3] font-cinzel">
              {language === 'en' ? 'Natural Craft' : '遵道自然古法'}
            </h2>
            <p className="text-xs text-[#8ca391] mt-1 leading-relaxed">
              {language === 'en'
                ? 'Hand-plucked, wood-fired iron wok kill-green, 100% natural UV solar dehydration.'
                : '纯手工轻柔揉捻，高山纯日光晒青保留活体酵素，石磨慢压适度呼吸。'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#131d16]/80 border border-[#233527] hover:border-[#3d5e43] transition-all group backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-[#1c2c20] flex items-center justify-center text-[#7bc285] mb-2.5 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-[#e1ece3] font-cinzel">
              {language === 'en' ? 'Deep Communion' : '人与自然深度沟通'}
            </h2>
            <p className="text-xs text-[#8ca391] mt-1 leading-relaxed">
              {language === 'en'
                ? 'Profound spinal Cha Qi warmth, 30+ steepings, restorative meditative presence.'
                : '通透体感茶气直达胸腹，生津回甘如高山甘露，三十道冲泡洗涤身心。'}
            </p>
          </div>
        </div>

        {/* Action Buttons & Trade Credentials */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onOpenInquiry}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2c4e33] to-[#3f6d49] hover:from-[#355f3f] hover:to-[#4a7f56] text-[#f4faf5] font-semibold text-sm tracking-wide shadow-xl hover:shadow-[0_0_20px_rgba(72,130,80,0.35)] transition-all border border-[#52865c]"
          >
            <Send className="w-4 h-4" />
            <span>
              {language === 'en' ? 'Request B2B Sample Kit & Catalog' : '索取外贸茶样与批发报价单'}
            </span>
          </button>

          <a
            href="#craftsmanship"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#152118]/80 hover:bg-[#1c2c20] text-[#c9decb] hover:text-white border border-[#2a3d2e] font-medium text-sm transition-all"
          >
            <span>{language === 'en' ? 'Seed-to-Cup Process' : '探索制茶全流程'}</span>
            <ArrowDownRight className="w-4 h-4 text-[#7cb784]" />
          </a>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0f1712] border border-[#213124] text-xs text-[#9eb6a2]">
            <ShieldCheck className="w-4 h-4 text-[#5dc76e]" />
            <span>{language === 'en' ? 'SGS Zero Residue · USDA & EU Organic' : 'SGS 508项零农残 · 欧盟/美国有机准入'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
