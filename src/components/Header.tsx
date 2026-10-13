import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Globe, DollarSign, Mail, Menu, X, Leaf, Sparkles, Download } from 'lucide-react';
import { Language, Currency } from '../types/puerh';
import { currencyRates } from '../data/puerhData';
import { teaAudio } from '../utils/audioSynth';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  onOpenInquiry,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const newState = teaAudio.toggle();
    setIsAudioPlaying(newState);
  };

  const navLinks = [
    { href: '#terroir', labelEn: 'Primeval Terroir', labelZh: '原始森林生态' },
    { href: '#craftsmanship', labelEn: 'Natural Craft', labelZh: '古法自然工艺' },
    { href: '#communion', labelEn: 'Communion with Nature', labelZh: '人与自然共鸣' },
    { href: '#tasting-wheel', labelEn: 'Sensory Wheel', labelZh: '感官风味轮' },
    { href: '#catalog', labelEn: 'Export Collection', labelZh: '外贸典藏茶品' },
    { href: '#certifications', labelEn: 'Export Compliance', labelZh: '国际质检与资质' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f1411]/95 backdrop-blur-md border-b border-[#233127] shadow-xl py-3'
          : 'bg-gradient-to-b from-[#0a0d0b]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Origin Tag */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2a3c2e] to-[#162219] border border-[#3b5440] flex items-center justify-center text-[#9ec4a0] shadow-inner group-hover:border-[#5a8260] transition-colors">
              <Leaf className="w-5 h-5 text-[#88b88d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#e8eee9] uppercase">
                  Yunnan Arbor
                </span>
                <span className="text-xs text-[#8ca890] font-serif-sc border-l border-[#2e4233] pl-2 hidden sm:inline">
                  云境古茶
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-[#728d76] uppercase">
                {language === 'en' ? 'Ancient Tree Pu-erh · Terroir Direct' : '云南深山古树纯料 · 原产地直供外贸'}
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-[#c0cfc3] hover:text-[#9fe2a7] tracking-wider uppercase transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#689f70] hover:after:w-full after:transition-all"
              >
                {language === 'en' ? link.labelEn : link.labelZh}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Ambient Nature Soundscape Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all border ${
                isAudioPlaying
                  ? 'bg-[#1b2b1f] border-[#446a4a] text-[#8ce298] shadow-[0_0_12px_rgba(72,130,80,0.3)]'
                  : 'bg-[#141b16]/70 border-[#253629] text-[#8ea592] hover:border-[#38523d] hover:text-[#d3e2d6]'
              }`}
              title={
                isAudioPlaying
                  ? language === 'en'
                    ? 'Pause Yunnan Mountain Wind & Stream'
                    : '静音：暂停高山风林声'
                  : language === 'en'
                  ? 'Listen to Primeval Tea Forest Ambience'
                  : '开启：聆听原始茶林风泉'
              }
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#63d973] animate-pulse" />
                  <span className="font-serif-sc text-[11px]">
                    {language === 'en' ? 'Forest Sound: On' : '林泉山风 · 鸣'}
                  </span>
                  <span className="flex gap-0.5 items-end h-2.5">
                    <span className="w-0.5 h-2 bg-[#63d973] animate-[bounce_0.8s_infinite]"></span>
                    <span className="w-0.5 h-3 bg-[#63d973] animate-[bounce_0.6s_infinite_0.2s]"></span>
                    <span className="w-0.5 h-1.5 bg-[#63d973] animate-[bounce_0.9s_infinite_0.4s]"></span>
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="font-serif-sc text-[11px]">
                    {language === 'en' ? 'Forest Ambience' : '高山风声'}
                  </span>
                </>
              )}
            </button>

            {/* Currency Selector */}
            <div className="relative flex items-center bg-[#141c16] border border-[#283b2d] rounded-lg px-2 py-1 text-xs text-[#b8ccbc]">
              <DollarSign className="w-3 h-3 text-[#779a7d] mr-1" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-[#dce7de] focus:outline-none cursor-pointer pr-1"
                aria-label="Currency"
              >
                {(Object.keys(currencyRates) as Currency[]).map((c) => (
                  <option key={c} value={c} className="bg-[#121914] text-[#dce7de]">
                    {c} ({currencyRates[c].symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141c16] border border-[#283b2d] text-xs text-[#b8ccbc] hover:border-[#426148] transition-colors"
              title="Switch language / 切换中英文"
            >
              <Globe className="w-3 h-3 text-[#779a7d]" />
              <span className="font-medium">{language === 'en' ? '中文' : 'EN'}</span>
            </button>

            {/* Download Project ZIP */}
            <a
              href="/download/project-zip"
              download="puerh-tea-project.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18261c] hover:bg-[#223827] border border-[#2e4733] text-[#cbe4cf] text-xs font-medium tracking-wide transition-colors"
              title={language === 'en' ? 'Download Project ZIP' : '下载项目源码压缩包'}
            >
              <Download className="w-3.5 h-3.5 text-[#6ed47d]" />
              <span className="hidden xl:inline">{language === 'en' ? 'Download ZIP' : '下载源码包'}</span>
            </a>

            {/* B2B Export Inquiry Button */}
            <button
              onClick={onOpenInquiry}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#2c4832] to-[#3a5d40] hover:from-[#35573c] hover:to-[#456e4c] border border-[#527d59] text-[#eef6f0] text-xs font-semibold tracking-wide uppercase shadow-md hover:shadow-lg transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Export Inquiry' : '外贸询价 · 索样'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-lg border ${
                isAudioPlaying
                  ? 'bg-[#1e2f22] border-[#4b7a52] text-[#63d973]'
                  : 'bg-[#151c16] border-[#293b2d] text-[#8aa18e]'
              }`}
              aria-label="Toggle Forest Audio"
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="px-2 py-1.5 rounded-lg bg-[#151c16] border border-[#293b2d] text-xs text-[#b8ccbc]"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#151c16] border border-[#293b2d] text-[#c4d6c7]"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d130f] border-b border-[#233326] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#1c291f]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#bcd0bf] hover:text-[#76c983] py-2 px-1"
              >
                {language === 'en' ? link.labelEn : link.labelZh}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8aa18e]">{language === 'en' ? 'Currency:' : '货币:'}</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-[#151c16] border border-[#2a3c2e] text-xs rounded px-2 py-1 text-[#e2eee4]"
              >
                {(Object.keys(currencyRates) as Currency[]).map((c) => (
                  <option key={c} value={c}>
                    {c} ({currencyRates[c].symbol})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/download/project-zip"
                download="puerh-tea-project.zip"
                className="px-3 py-1.5 rounded bg-[#18261c] border border-[#2e4733] text-[#cbe4cf] text-xs font-semibold flex items-center gap-1"
              >
                <Download className="w-3 h-3 text-[#6ed47d]" />
                <span>{language === 'en' ? 'ZIP' : '源码'}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="px-3.5 py-1.5 rounded bg-[#325239] text-[#edf6ef] text-xs font-semibold"
              >
                {language === 'en' ? 'B2B Inquiry' : '外贸询盘'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
