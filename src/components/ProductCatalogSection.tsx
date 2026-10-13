import React, { useState } from 'react';
import { Package, ShieldCheck, Sparkles, Filter, Eye, Send, Mountain, Award } from 'lucide-react';
import { Language, Currency, TeaProduct, TeaType } from '../types/puerh';
import { teaProducts, currencyRates } from '../data/puerhData';

interface ProductCatalogSectionProps {
  language: Language;
  currency: Currency;
  onSelectProduct: (product: TeaProduct) => void;
  onOpenInquiryForProduct: (product: TeaProduct) => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  language,
  currency,
  onSelectProduct,
  onOpenInquiryForProduct,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<TeaType | 'all'>('all');

  const filteredProducts = teaProducts.filter((product) => {
    if (selectedFilter === 'all') return true;
    return product.type === selectedFilter;
  });

  const formatPrice = (usdAmount: number) => {
    const rateInfo = currencyRates[currency];
    const converted = Math.round(usdAmount * rateInfo.rateFromUSD);
    return `${rateInfo.symbol}${converted.toLocaleString()}`;
  };

  return (
    <section id="catalog" className="py-24 bg-[#0d140f] relative border-t border-[#1c2c20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18261c] border border-[#2b4432] text-xs text-[#8cb892] mb-3">
            <Package className="w-3.5 h-3.5" />
            <span className="font-cinzel uppercase tracking-wider">
              {language === 'en' ? 'Direct Export Reserve' : '外贸直供典藏茶品'}
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#eff5f0] tracking-tight">
            {language === 'en' ? (
              <>
                Single-Origin Ancient Tree Pu-erh <br />
                <span className="text-[#8bc492] font-serif italic">
                  International Export Allocations
                </span>
              </>
            ) : (
              <>
                原产地纯料古树普洱 <br />
                <span className="text-[#8bc492] font-serif-sc font-normal">
                  国际贸易配额 · 整筒笋壳与典藏单饼
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#9fb3a2] font-serif-sc">
            {language === 'en'
              ? 'Each batch is crafted under strict international food safety standards, accompanied by full phytosanitary clearance, SGS zero-residue testing, and export container logistics.'
              : '每批茶饼均由非遗制茶大师监制，配备中国海关植物检疫证书、SGS 508项零农残权威报告，支持航空特快寄样与海运整柜出口。'}
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {[
            { id: 'all', labelEn: 'All Allocations', labelZh: '全部配额茶品' },
            { id: 'sheng', labelEn: 'Raw Pu-erh (Sheng)', labelZh: '古树纯料生茶' },
            { id: 'vintage', labelEn: 'Aged Cellar Vintage', labelZh: '岁月干仓陈茶' },
            { id: 'shou', labelEn: 'Ripe Pu-erh (Shou)', labelZh: '特级古树熟茶' },
            { id: 'single_arbor', labelEn: 'Single-Arbor Master Reserve', labelZh: '古树单株特藏' },
          ].map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id as TeaType | 'all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border font-serif-sc ${
                  isActive
                    ? 'bg-[#243c2b] border-[#538a5d] text-[#eff8f1] shadow-xl'
                    : 'bg-[#121a14] border-[#1e2c20] text-[#8ea391] hover:text-[#d4e4d7]'
                }`}
              >
                {language === 'en' ? cat.labelEn : cat.labelZh}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((tea) => (
            <div
              key={tea.id}
              className="rounded-2xl bg-[#111913] border border-[#213526] hover:border-[#38593f] transition-all overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-2xl"
            >
              {/* Product Card Top Media */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#18231b]">
                <img
                  src={tea.imageUrl}
                  alt={tea.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111913] via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#0e1610]/85 backdrop-blur-md text-[11px] font-medium text-[#8ce297] border border-[#233827]">
                    {tea.vintageYear} {language === 'en' ? 'Harvest' : '年份'}
                  </span>
                  {tea.type === 'single_arbor' && (
                    <span className="px-2.5 py-1 rounded-md bg-[#3a2c16]/90 backdrop-blur-md text-[10px] font-semibold text-[#f0ca7d] border border-[#594424] flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {language === 'en' ? 'Single Arbor' : '古树单株'}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded bg-[#1c2c20]/90 backdrop-blur-md text-[10px] text-[#9ebfa3] border border-[#2b4231]">
                    {tea.treeAge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#d6e5d8]">
                  <span className="flex items-center gap-1 font-serif-sc">
                    <Mountain className="w-3.5 h-3.5 text-[#6ec279]" />
                    {tea.altitude}m {language === 'en' ? 'Elevation' : '海拔'}
                  </span>
                  <span className="text-[#a4bfa8] font-cinzel">{tea.shapeEn.split(' ')[0]}</span>
                </div>
              </div>

              {/* Product Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-[#78a27d] uppercase tracking-wider font-cinzel">
                    {language === 'en' ? tea.originMountainEn : tea.originMountainZh}
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-[#ebf3ed] mt-0.5 group-hover:text-[#91e29b] transition-colors">
                    {language === 'en' ? tea.nameEn : tea.nameZh}
                  </h3>
                  <p className="text-xs text-[#9eb6a3] mt-1.5 line-clamp-2 font-serif-sc leading-relaxed">
                    {language === 'en' ? tea.descriptionEn : tea.descriptionZh}
                  </p>
                </div>

                {/* Clean unboxed tasting tags per anti-pill guidelines */}
                <div className="text-[11px] text-[#86a88b] font-serif-sc pt-1">
                  <span className="text-[#688a6d] font-cinzel mr-1.5">
                    {language === 'en' ? 'Notes:' : '风味:'}
                  </span>
                  {(language === 'en' ? tea.tastingNotesEn : tea.tastingNotesZh)
                    .slice(0, 3)
                    .map((note, i, arr) => (
                      <span key={i}>
                        <span className="text-[#c1d6c4]">{note}</span>
                        {i < arr.length - 1 && <span className="mx-1 text-[#46634b]">·</span>}
                      </span>
                    ))}
                </div>

                {/* Pricing & MOQ Bar */}
                <div className="pt-3 border-t border-[#1d2d20] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#758e79] uppercase tracking-wider font-cinzel">
                      {language === 'en' ? 'Export Price / Cake' : '外贸单饼参考价'}
                    </div>
                    <div className="text-lg font-bold font-cinzel text-[#7fe08e]">
                      {formatPrice(tea.priceUSD)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-[#758e79] uppercase tracking-wider font-cinzel">
                      {language === 'en' ? 'Sample / 25g' : '品鉴茶样'}
                    </div>
                    <div className="text-xs font-semibold text-[#cfded2] font-cinzel">
                      {formatPrice(tea.samplePriceUSD)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => onSelectProduct(tea)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#172219] hover:bg-[#203024] text-[#bcd0bf] hover:text-white border border-[#2a3c2d] text-xs font-medium transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Lab & Specs' : '报告与参数'}</span>
                  </button>

                  <button
                    onClick={() => onOpenInquiryForProduct(tea)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#28432e] hover:bg-[#34583d] text-[#eff8f1] border border-[#487851] text-xs font-semibold shadow-md transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Sample / Quote' : '索样与订购'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
