import React from 'react';
import { Leaf, ShieldCheck, Mail, MapPin, Phone, Globe, ArrowUp } from 'lucide-react';
import { Language } from '../types/puerh';

interface FooterProps {
  language: Language;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090d0a] border-t border-[#1a281e] text-[#9eb4a2] text-xs font-serif-sc pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#192b1e] border border-[#2b4431] flex items-center justify-center text-[#7de28d]">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold text-[#eef4f0] uppercase tracking-wider block">
                  Yunnan Arbor
                </span>
                <span className="text-[11px] text-[#789d7d] block font-serif-sc">
                  云境古茶 · 国际外贸独立站
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8ca390] leading-relaxed max-w-sm">
              {language === 'en'
                ? 'Dedicated to exporting pure single-origin ancient tree Pu-erh from Yunnan\'s pristine rainforests. Zero chemical intervention, traditional sun-drying craftsmanship, and profound human-nature harmony.'
                : '专注云南原始热带雨林古树茶纯料出口。坚持零化学干预、古法柴火铁锅杀青与高原日光晒青，为全球茶人与高端机构呈献具有生命蜕变力的正统普洱茶。'}
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#718f75]">
              <ShieldCheck className="w-4 h-4 text-[#5ec66e]" />
              <span>{language === 'en' ? 'SGS 508 Multi-Residue Zero Pesticide Guaranteed' : 'SGS 508项零农残检测合格 · 海关商检官方植检'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#e1eee3] uppercase tracking-wider">
              {language === 'en' ? 'Terroir & Mountain' : '名山秘境'}
            </h4>
            <ul className="space-y-2 text-xs text-[#8ca390]">
              <li><a href="#terroir" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? 'Lao Ban Zhang Imperial' : '布朗山老班章'}</a></li>
              <li><a href="#terroir" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? 'Jingmai Ancient Forest (UNESCO)' : '景迈万亩古茶林（世界遗产）'}</a></li>
              <li><a href="#terroir" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? 'Yi Wu Bohetang Valley' : '易武薄荷塘国有林'}</a></li>
              <li><a href="#terroir" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? 'Bingdao Snow Mountain' : '勐库冰岛老寨'}</a></li>
              <li><a href="#terroir" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? 'Xigui Manglu Cliffs' : '昔归忙麓山烂石'}</a></li>
            </ul>
          </div>

          {/* Craft & Communion */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#e1eee3] uppercase tracking-wider">
              {language === 'en' ? 'Craft & Philosophy' : '工艺与品饮'}
            </h4>
            <ul className="space-y-2 text-xs text-[#8ca390]">
              <li><a href="#craftsmanship" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? '7-Stage Natural Craft' : '七大古法制茶工序'}</a></li>
              <li><a href="#craftsmanship" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? 'Why Machine Drying Fails' : '为何机器烘干丧失活性'}</a></li>
              <li><a href="#communion" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? 'Cha Qi & Spinal Warmth' : '茶气透达与身体经络'}</a></li>
              <li><a href="#communion" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? '30-Steeping Evolutionary Arc' : '三十道茶汤生命之舞'}</a></li>
              <li><a href="#tasting-wheel" className="hover:text-[#8ce297] transition-colors">{language === 'en' ? 'Sensory Tasting Wheel' : '感官风味轮与杯测'}</a></li>
            </ul>
          </div>

          {/* Export Trade Logistics Hubs */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#e1eee3] uppercase tracking-wider">
              {language === 'en' ? 'Export Operations' : '外贸运营枢纽'}
            </h4>
            <div className="space-y-2 text-xs text-[#8ca390]">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#6ec279] shrink-0 mt-0.5" />
                <span>
                  <strong>{language === 'en' ? 'Origin Hub:' : '产区总仓：'}</strong> Kunming Comprehensive Bonded Zone, Yunnan, China
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#6ec279] shrink-0 mt-0.5" />
                <span>
                  <strong>{language === 'en' ? 'Ocean Port:' : '出口口岸：'}</strong> Shenzhen Yantian / Guangzhou Nansha Port
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#6ec279] shrink-0 mt-0.5" />
                <span>export@yunnanarbor-tea.com</span>
              </div>
              <button
                onClick={onOpenInquiry}
                className="mt-2 w-full py-2 rounded-lg bg-[#192b1e] hover:bg-[#223928] text-[#8ce297] font-semibold border border-[#2d4933] transition-colors"
              >
                {language === 'en' ? 'Request Sample Dispatch' : '申请海外免费茶样寄送'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#152218] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6f8873]">
          <div>
            © {new Date().getFullYear()} YUNNAN ARBOR (云境古茶) International Trade Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>{language === 'en' ? 'Incoterms 2020: FOB · CIF · DDP' : '支持贸易条款：FOB · CIF · DDP'}</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#8aa38e] hover:text-[#d2e2d5] transition-colors"
            >
              <span>{language === 'en' ? 'Top' : '返回顶部'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
