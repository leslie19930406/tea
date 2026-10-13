import React from 'react';
import { X, ShieldCheck, Mountain, TreeDeciduous, Sparkles, Send, Droplets, Thermometer, Layers, CheckCircle2 } from 'lucide-react';
import { Language, Currency, TeaProduct } from '../types/puerh';
import { currencyRates } from '../data/puerhData';

interface ProductDetailModalProps {
  product: TeaProduct | null;
  onClose: () => void;
  language: Language;
  currency: Currency;
  onOpenInquiryForProduct: (product: TeaProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  language,
  currency,
  onOpenInquiryForProduct,
}) => {
  if (!product) return null;

  const formatPrice = (usdAmount: number) => {
    const rateInfo = currencyRates[currency];
    const converted = Math.round(usdAmount * rateInfo.rateFromUSD);
    return `${rateInfo.symbol}${converted.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#101712] border border-[#273d2c] rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#1c2c20] flex items-center justify-between bg-[#121c15]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-cinzel text-[#7fa984]">
              {language === 'en' ? product.originMountainEn : product.originMountainZh}
            </span>
            <span className="text-[#3c5541]">·</span>
            <span className="text-xs text-[#a2d8ab] font-serif-sc">
              {product.vintageYear} {language === 'en' ? 'Harvest' : '年份'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#18231a] text-[#8ea391] hover:text-white border border-[#263828] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Top Overview: Visual + Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-square bg-[#152017]">
              <img
                src={product.imageUrl}
                alt={product.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0d140f]/90 backdrop-blur-sm border border-[#233527] flex items-center justify-between text-xs">
                <span className="text-[#96b89b] font-cinzel">{product.shapeEn.split(' ')[0]}</span>
                <span className="text-[#7fe08e] font-bold font-cinzel">{product.weightGrams}g</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ebf3ed]">
                {language === 'en' ? product.nameEn : product.nameZh}
              </h2>
              <div className="text-xs text-[#8aa38e] font-serif-sc">
                {language === 'en' ? product.subtitleEn : product.subtitleZh}
              </div>

              {/* Terroir & Origin Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#142017] border border-[#223525]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#7ea383]">
                    <Mountain className="w-3.5 h-3.5 text-[#6ec279]" />
                    <span>{language === 'en' ? 'Harvest Altitude' : '产区海拔'}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#e1ece3] mt-0.5 font-serif-sc">
                    {product.altitude} Meters
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#142017] border border-[#223525]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#7ea383]">
                    <TreeDeciduous className="w-3.5 h-3.5 text-[#6ec279]" />
                    <span>{language === 'en' ? 'Ancient Tree Age' : '树龄'}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#e1ece3] mt-0.5 font-serif-sc">
                    {product.treeAge}
                  </div>
                </div>
              </div>

              {/* Master Artisan info */}
              <div className="p-3 rounded-xl bg-[#162118] border border-[#243527] text-xs text-[#a4bba8] font-serif-sc">
                <span className="text-[#8ec895] font-semibold">
                  {language === 'en' ? 'Master Artisan: ' : '非遗监制大师：'}
                </span>
                {language === 'en' ? product.masterArtisanEn : product.masterArtisanZh}
              </div>

              {/* Pricing strip */}
              <div className="p-4 rounded-xl bg-[#152319] border border-[#263e2c] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#76937b] uppercase tracking-wider font-cinzel">
                    {language === 'en' ? 'Export Price / Cake' : '单饼外贸参考价'}
                  </div>
                  <div className="text-xl font-bold font-cinzel text-[#7fe08e]">
                    {formatPrice(product.priceUSD)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-[#76937b] uppercase tracking-wider font-cinzel">
                    {language === 'en' ? 'Sample Evaluation' : '25g 精准盲品样'}
                  </div>
                  <div className="text-sm font-semibold text-[#d0e0d3] font-cinzel">
                    {formatPrice(product.samplePriceUSD)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Narrative & Tasting Notes */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#8ee098] uppercase tracking-wider font-cinzel">
              {language === 'en' ? 'Terroir Narrative & Sensory Character' : '山场生态与品饮感知'}
            </h3>
            <p className="text-xs sm:text-sm text-[#b2c6b5] font-serif-sc leading-relaxed">
              {language === 'en' ? product.descriptionEn : product.descriptionZh}
            </p>

            <div className="p-4 rounded-xl bg-[#142017] border border-[#233526] space-y-2">
              <span className="text-xs font-semibold text-[#d6e5d8] font-serif-sc block">
                {language === 'en' ? 'Cupping Flavor Profile:' : '杯测特征与风味群：'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(language === 'en' ? product.tastingNotesEn : product.tastingNotesZh).map(
                  (note, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#192b1e] border border-[#2a4531] text-xs text-[#a6e2b0] font-serif-sc"
                    >
                      {note}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Steeping Protocol (Gongfu Brewing Guide) */}
          <div className="p-5 rounded-2xl bg-[#0f1711] border border-[#1f3022] space-y-4">
            <h3 className="text-xs font-semibold text-[#8ce297] uppercase tracking-wider font-cinzel flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-[#6ec279]" />
              <span>{language === 'en' ? 'Recommended Gongfu Brewing Protocol' : '专业功夫茶道冲泡建议'}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-serif-sc">
              <div className="p-3 rounded-xl bg-[#142017] border border-[#223525]">
                <div className="text-[11px] text-[#75967b]">{language === 'en' ? 'Water Temp' : '推荐水温'}</div>
                <div className="text-sm font-bold text-[#e1eee3] mt-0.5">98°C - 100°C</div>
              </div>

              <div className="p-3 rounded-xl bg-[#142017] border border-[#223525]">
                <div className="text-[11px] text-[#75967b]">{language === 'en' ? 'Leaf Ratio' : '茶水比例'}</div>
                <div className="text-sm font-bold text-[#e1eee3] mt-0.5">7g / 110ml (1:16)</div>
              </div>

              <div className="p-3 rounded-xl bg-[#142017] border border-[#223525]">
                <div className="text-[11px] text-[#75967b]">{language === 'en' ? 'Awakening Rinse' : '温润醒茶'}</div>
                <div className="text-sm font-bold text-[#e1eee3] mt-0.5">5 - 8s (Discard)</div>
              </div>

              <div className="p-3 rounded-xl bg-[#142017] border border-[#223525]">
                <div className="text-[11px] text-[#75967b]">{language === 'en' ? 'Steep Potential' : '耐泡道数'}</div>
                <div className="text-sm font-bold text-[#7fe08e] mt-0.5">
                  {product.specifications.infusionPotential}
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Packaging Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif-sc text-[#a2bba6]">
            <div className="p-4 rounded-xl bg-[#131c15] border border-[#213024] space-y-1">
              <div className="font-semibold text-[#ceddcf]">
                {language === 'en' ? 'Export Packaging Standard:' : '外贸包装规格：'}
              </div>
              <p>{language === 'en' ? product.specifications.packagingEn : product.specifications.packagingZh}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#131c15] border border-[#213024] space-y-1">
              <div className="font-semibold text-[#ceddcf]">
                {language === 'en' ? 'Aging & Storage Advice:' : '仓储陈化建议：'}
              </div>
              <p>{language === 'en' ? product.specifications.storageMethodEn : product.specifications.storageMethodZh}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-6 border-t border-[#1c2c20] bg-[#121c15] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#8aa38e]">
            <ShieldCheck className="w-4 h-4 text-[#5ec66e]" />
            <span>{language === 'en' ? 'SGS 508 Pesticide Zero-ND Verified' : 'SGS 508项零农残检测合格'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#162219] hover:bg-[#1e2f23] text-[#c0d4c3] text-xs font-medium border border-[#253928] transition-colors"
            >
              {language === 'en' ? 'Close' : '关闭'}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenInquiryForProduct(product);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2c4b31] to-[#3a6442] hover:from-[#345939] hover:to-[#44764e] text-white text-xs font-semibold shadow-lg transition-all border border-[#52845a] flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Request Sample / Wholesale Quote' : '索取样品 / 批发询盘'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
