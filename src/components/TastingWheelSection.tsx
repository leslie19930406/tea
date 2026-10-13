import React, { useState } from 'react';
import { Compass, Sparkles, Feather, Wind, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types/puerh';

interface TastingWheelSectionProps {
  language: Language;
}

export const TastingWheelSection: React.FC<TastingWheelSectionProps> = ({ language }) => {
  const [selectedProfileKey, setSelectedProfileKey] = useState<'banzhang' | 'bingdao' | 'yiwu' | 'jingmai'>('banzhang');

  const profiles = {
    banzhang: {
      nameEn: 'Lao Ban Zhang Imperial Profile',
      nameZh: '老班章霸气风味轮',
      taglineEn: 'Dominant mountain qi, instant huigan, deep forest honey',
      taglineZh: '霸气刚烈 · 苦涩秒化 · 泉涌生津',
      metrics: {
        wildAroma: 95,
        liquorThickness: 98,
        throatResonance: 96,
        chaQiPower: 99,
        infusionEndurance: 98,
        agingPotential: 100,
      },
      descriptorListEn: ['Dominant Wild Orchid', 'Raw Honey Nectar', 'Ancient Camphor', 'Petrichor Earth', 'Spinal Warmth'],
      descriptorListZh: ['霸烈野兰香', '深山浓郁花蜜', '老木沉香', '雨林温热土壤', '周身发汗通透'],
    },
    bingdao: {
      nameEn: 'Bingdao Snow Mountain Profile',
      nameZh: '冰岛老寨极甜风味轮',
      taglineEn: 'Crystalline rock sugar, non-bitter, glacial throat sweetness',
      taglineZh: '冰糖清甜 · 喉底生凉 · 柔顺如蜜',
      metrics: {
        wildAroma: 92,
        liquorThickness: 90,
        throatResonance: 99,
        chaQiPower: 88,
        infusionEndurance: 95,
        agingPotential: 96,
      },
      descriptorListEn: ['Crystalline Rock Sugar', 'Glacial Snow Coolness', 'White Orchid Floral', 'Zero Bitterness', 'Silky Spring'],
      descriptorListZh: ['纯正老冰糖甜', '深喉雪山清凉感', '白幽兰芳芬', '入口毫无苦涩', '如天山甘泉'],
    },
    yiwu: {
      nameEn: 'Yi Wu Bohetang Hidden Power Profile',
      nameZh: '易武薄荷塘绵柔深沉风味轮',
      taglineEn: 'Silky softness with hidden inner strength, mint cooling resonance',
      taglineZh: '绵里藏针 · 薄荷清凉 · 柔润醇美',
      metrics: {
        wildAroma: 94,
        liquorThickness: 96,
        throatResonance: 98,
        chaQiPower: 94,
        infusionEndurance: 96,
        agingPotential: 99,
      },
      descriptorListEn: ['Mint-Cool Throat Resonance', 'Ripe Peach Blossom', 'Velvet Broth', 'Enduring Salivation', 'Deep Tranquility'],
      descriptorListZh: ['薄荷清凉深幽喉韵', '野山桃粉花香', '丝绒滑润汤感', '舌底鸣泉不息', '安详禅定体感'],
    },
    jingmai: {
      nameEn: 'Jingmai Thousand-Year Heritage Profile',
      nameZh: '景迈万亩古茶世遗风味轮',
      taglineEn: 'UNESCO orchid fragrance, honeyed silk, wild herb symbiosis',
      taglineZh: '空谷幽兰 · 汤水含香 · 药草共生',
      metrics: {
        wildAroma: 98,
        liquorThickness: 91,
        throatResonance: 94,
        chaQiPower: 89,
        infusionEndurance: 94,
        agingPotential: 95,
      },
      descriptorListEn: ['Ethereal Valley Orchid', 'Wild Herb Fragrance', 'Subtle Honey Glaze', 'Longan Sweetness', 'Breeze-like Qi'],
      descriptorListZh: ['空谷深幽兰香', '名贵草药共生香', '晶润蜜汁感', '温和桂圆香', '如沐山风体感'],
    },
  };

  const current = profiles[selectedProfileKey];

  return (
    <section id="tasting-wheel" className="py-24 bg-[#0a0f0c] relative border-t border-[#1a291e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18261c] border border-[#2c4432] text-xs text-[#8cb892] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span className="font-cinzel uppercase tracking-wider">
              {language === 'en' ? 'Sensory Wheel & Terroir Mapping' : '感官风味轮与国际杯测体系'}
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#eff5f0] tracking-tight">
            {language === 'en' ? (
              <>
                The Terroir Sensory Compass: <br />
                <span className="text-[#8bc492] font-serif italic">
                  Mapping Flavor, Qi & Resonance
                </span>
              </>
            ) : (
              <>
                古树普洱杯测罗盘 <br />
                <span className="text-[#8bc492] font-serif-sc font-normal">
                  香气、汤感、喉韵与体感多维解析
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#9fb3a2] font-serif-sc">
            {language === 'en'
              ? 'International tea sommeliers and buyers evaluate old-arbor Pu-erh not only by superficial bitterness, but by five dimensional depths: Cha Qi power, throat cooling depth, liquor thickness, aroma purity, and aging stamina.'
              : '国际专业茶评审视古树普洱，远不止于入口的一时苦甜，而是综合体察“香、厚、气、韵、化”五重维度。点击切换不同传奇名山，洞察其特有的生物质谱。'}
          </p>
        </div>

        {/* Profile Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {(Object.keys(profiles) as (keyof typeof profiles)[]).map((key) => {
            const isSelected = key === selectedProfileKey;
            return (
              <button
                key={key}
                onClick={() => setSelectedProfileKey(key)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all border font-serif-sc ${
                  isSelected
                    ? 'bg-[#243c2b] border-[#538a5d] text-[#eff8f1] shadow-xl'
                    : 'bg-[#121a14] border-[#1e2c20] text-[#8ea391] hover:text-[#d4e4d7]'
                }`}
              >
                {language === 'en' ? profiles[key].nameEn : profiles[key].nameZh}
              </button>
            );
          })}
        </div>

        {/* Sensory Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111913] rounded-3xl border border-[#223627] p-6 sm:p-10 shadow-2xl">
          {/* Left: Interactive Metric Bars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs text-[#7ea583] uppercase tracking-wider font-cinzel">
                {language === 'en' ? current.taglineEn : current.taglineZh}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#eaf2ec] mt-1">
                {language === 'en' ? current.nameEn : current.nameZh}
              </h3>
            </div>

            {/* Metrics Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-serif-sc text-[#c2d4c5] mb-1">
                  <span>{language === 'en' ? 'Wild Mountain Aroma (山野幽香)' : '山野幽香纯净度'}</span>
                  <span className="font-bold text-[#8fe599]">{current.metrics.wildAroma} / 100</span>
                </div>
                <div className="w-full bg-[#1b271e] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3e7248] to-[#63c973] transition-all duration-700"
                    style={{ width: `${current.metrics.wildAroma}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-serif-sc text-[#c2d4c5] mb-1">
                  <span>{language === 'en' ? 'Broth Thickness & Viscosity (汤感醇厚稠润)' : '汤感醇厚稠润度'}</span>
                  <span className="font-bold text-[#8fe599]">{current.metrics.liquorThickness} / 100</span>
                </div>
                <div className="w-full bg-[#1b271e] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3e7248] to-[#63c973] transition-all duration-700"
                    style={{ width: `${current.metrics.liquorThickness}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-serif-sc text-[#c2d4c5] mb-1">
                  <span>{language === 'en' ? 'Throat Depth & Cooling Sweetness (深幽喉韵与生津)' : '深幽喉韵与生津感'}</span>
                  <span className="font-bold text-[#8fe599]">{current.metrics.throatResonance} / 100</span>
                </div>
                <div className="w-full bg-[#1b271e] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3e7248] to-[#63c973] transition-all duration-700"
                    style={{ width: `${current.metrics.throatResonance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-serif-sc text-[#c2d4c5] mb-1">
                  <span>{language === 'en' ? 'Cha Qi & Spinal Body Warmth (深层茶气透达感)' : '深层茶气透达体感'}</span>
                  <span className="font-bold text-[#8fe599]">{current.metrics.chaQiPower} / 100</span>
                </div>
                <div className="w-full bg-[#1b271e] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3e7248] to-[#63c973] transition-all duration-700"
                    style={{ width: `${current.metrics.chaQiPower}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-serif-sc text-[#c2d4c5] mb-1">
                  <span>{language === 'en' ? 'Infusion Endurance (30+ Steeps Potential)' : '耐泡度（三十道持久度）'}</span>
                  <span className="font-bold text-[#8fe599]">{current.metrics.infusionEndurance} / 100</span>
                </div>
                <div className="w-full bg-[#1b271e] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3e7248] to-[#63c973] transition-all duration-700"
                    style={{ width: `${current.metrics.infusionEndurance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-serif-sc text-[#c2d4c5] mb-1">
                  <span>{language === 'en' ? 'Decadal Aging & Maturation Potential (五十年越陈越香)' : '数十年陈化蜕变指数'}</span>
                  <span className="font-bold text-[#8fe599]">{current.metrics.agingPotential} / 100</span>
                </div>
                <div className="w-full bg-[#1b271e] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#b58b38] to-[#e4ba59] transition-all duration-700"
                    style={{ width: `${current.metrics.agingPotential}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Flavor Notes Cluster & Expert Cupping Note (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0f1611] border border-[#1f2e22] space-y-5">
            <h4 className="text-xs font-semibold text-[#8de297] uppercase tracking-wider font-cinzel flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Signature Tasting Descriptors' : '代表性标志风味群'}</span>
            </h4>

            {/* Flavor chips rendered as clean unboxed typographic list per anti-pill guidelines */}
            <div className="space-y-2 text-xs font-serif-sc text-[#cfded2]">
              {(language === 'en' ? current.descriptorListEn : current.descriptorListZh).map((desc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[#152017] border border-[#213324]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#64c973]" />
                  <span>{desc}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#172118] border border-[#253928] text-xs text-[#9eb6a2] font-serif-sc leading-relaxed">
              <strong className="text-[#e2eee4] block mb-1">
                {language === 'en' ? 'Master Cupper Note:' : '国家级评茶师品鉴语录：'}
              </strong>
              {language === 'en'
                ? 'Old arbor tea contains high concentrations of amino acids and aromatic terpenes synthesized during centuries of adaptation to the misty canopy. When steeped with soft boiling water, it delivers unmatched physiological relaxation.'
                : '古树茶历经数百年在原始树冠环境下合成极高浓度的茶氨酸与芳香萜烯类物质。沸水冲注之下，茶汤油亮稠滑，能给予品饮者最深层的神经系统放松与身心安定。'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
