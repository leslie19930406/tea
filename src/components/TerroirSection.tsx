import React, { useState } from 'react';
import { Mountain, TreeDeciduous, CloudFog, MapPin, Award, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language, MountainTerroir } from '../types/puerh';
import { mountainTerroirs } from '../data/puerhData';
import regeneratedTerroirImage from '../assets/images/regenerated_image_1791885730622.jpg';

interface TerroirSectionProps {
  language: Language;
  onSelectMountainForInquiry: (mountainName: string) => void;
}

export const TerroirSection: React.FC<TerroirSectionProps> = ({
  language,
  onSelectMountainForInquiry,
}) => {
  const [activeMountainId, setActiveMountainId] = useState<string>(mountainTerroirs[0].id);

  const selectedMountain =
    mountainTerroirs.find((m) => m.id === activeMountainId) || mountainTerroirs[0];

  return (
    <section id="terroir" className="py-24 bg-[#0c120e] relative border-t border-[#1a291e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16251b] border border-[#2b4231] text-xs text-[#8fbf95] mb-3">
            <TreeDeciduous className="w-3.5 h-3.5" />
            <span className="font-cinzel uppercase tracking-wider">
              {language === 'en' ? 'Pillar 1 & 2: Terroir & Scarcity' : '支柱一与支柱二：原料稀缺与生态'}
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#eef4f0] tracking-tight">
            {language === 'en' ? (
              <>
                Pristine Primeval Forests. <br />
                <span className="text-[#8ec795] font-serif italic">
                  Living Relics of Yunnan Terroir.
                </span>
              </>
            ) : (
              <>
                隐于原始雨林的高山秘境 <br />
                <span className="text-[#8ec795] font-serif-sc font-normal">
                  自然馈赠的稀缺古树基因
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#a3b8a6] leading-relaxed font-serif-sc">
            {language === 'en'
              ? 'Unlike mass-cultivated commercial terrace bushes (台地茶) that rely on chemical fertilizers and pesticides, our ancient arbor trees (古树茶) flourish wildly inside untouched subtropical rainforests. Deep roots draw millennia of mineral nutrients from volcanic soils.'
              : '不同于依靠化肥催芽、密植农药的现代台地矮化茶园，真正的云南古树茶扎根于原始热带雨林中。深达数米至十米的巨大根系，汲取千万年未受污染的腐殖土与深层火山矿物精粹。'}
          </p>
        </div>

        {/* Mountain Tabs Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 border-b border-[#1b2b20]">
          {mountainTerroirs.map((mountain) => {
            const isActive = mountain.id === activeMountainId;
            return (
              <button
                key={mountain.id}
                onClick={() => setActiveMountainId(mountain.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#223928] border-[#4f7f57] text-[#ecf5ee] shadow-lg'
                    : 'bg-[#121b15] border-[#1d2d21] text-[#90a693] hover:text-[#d3e3d6] hover:border-[#324b37]'
                }`}
              >
                <Mountain className="w-3.5 h-3.5 text-[#73b57b]" />
                <span className="font-serif-sc">
                  {language === 'en' ? mountain.nameEn : mountain.nameZh}
                </span>
                {mountain.unescoHeritage && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#3b5940] text-[#a9e4b2] uppercase tracking-wider">
                    UNESCO
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mountain Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-2xl bg-[#111a14] border border-[#233527] overflow-hidden shadow-2xl">
          {/* Visual Canvas (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full">
            <img
              src={regeneratedTerroirImage}
              alt={selectedMountain.nameEn}
              className="w-full h-full object-cover brightness-90 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111a14] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111a14]" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d140f]/80 backdrop-blur-md border border-[#2a3f2f] text-xs text-[#a2d8ab]">
                <MapPin className="w-3 h-3 text-[#5ccb6e]" />
                {selectedMountain.coordinates}
              </span>
              {selectedMountain.unescoHeritage && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#2a4530]/90 backdrop-blur-md border border-[#4d7b56] text-xs text-[#b8f5c3]">
                  <Award className="w-3.5 h-3.5" />
                  {language === 'en' ? 'World Cultural Heritage Site' : '联合国教科文组织世界遗产'}
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#0e1611]/90 backdrop-blur-sm border border-[#223526]">
              <div className="text-[11px] text-[#7ea083] uppercase tracking-wider font-cinzel">
                {language === 'en' ? 'Protected Annual Yield' : '受限纯料年产量'}
              </div>
              <div className="text-sm font-semibold text-[#e1eee3] font-serif-sc mt-0.5">
                {selectedMountain.annualOutputKg}
              </div>
            </div>
          </div>

          {/* Detailed Content (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              {/* Region and Title */}
              <div className="text-xs uppercase tracking-widest text-[#729b77] font-cinzel">
                {language === 'en' ? selectedMountain.regionEn : selectedMountain.regionZh}
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#edf4ef] mt-1">
                {language === 'en' ? selectedMountain.nameEn : selectedMountain.nameZh}
              </h3>

              {/* Terroir Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
                <div className="p-3 rounded-xl bg-[#162319] border border-[#253928]">
                  <div className="flex items-center gap-1 text-[11px] text-[#7da382] uppercase tracking-wider">
                    <CloudFog className="w-3.5 h-3.5 text-[#6eb877]" />
                    <span>{language === 'en' ? 'Elevation' : '高山海拔'}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#e5f0e7] mt-1 font-serif-sc">
                    {selectedMountain.elevation}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#162319] border border-[#253928]">
                  <div className="flex items-center gap-1 text-[11px] text-[#7da382] uppercase tracking-wider">
                    <TreeDeciduous className="w-3.5 h-3.5 text-[#6eb877]" />
                    <span>{language === 'en' ? 'Arbor Age' : '古树平均树龄'}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#e5f0e7] mt-1 font-serif-sc">
                    {selectedMountain.treeAgeAvg}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#162319] border border-[#253928]">
                  <div className="flex items-center gap-1 text-[11px] text-[#7da382] uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6eb877]" />
                    <span>{language === 'en' ? 'Chemical Residue' : '农药与化肥'}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#7fe08e] mt-1 font-serif-sc">
                    {language === 'en' ? '0.00% (Strictly 0)' : '0.00% (零残留)'}
                  </div>
                </div>
              </div>

              {/* Forest Ecology Description */}
              <div className="space-y-4 text-sm text-[#b2c6b5] font-serif-sc leading-relaxed">
                <div className="p-4 rounded-xl bg-[#142017]/60 border border-[#213425]">
                  <h4 className="text-xs font-semibold text-[#8ed897] uppercase tracking-wider font-cinzel mb-1">
                    {language === 'en' ? 'Virgin Forest Symbiosis' : '原始热带雨林生态共生'}
                  </h4>
                  <p>{language === 'en' ? selectedMountain.forestEcologyEn : selectedMountain.forestEcologyZh}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#142017]/60 border border-[#213425]">
                  <h4 className="text-xs font-semibold text-[#e6b970] uppercase tracking-wider font-cinzel mb-1">
                    {language === 'en' ? 'Flavor Signature & Cha Qi' : '标志性风味与深邃茶气'}
                  </h4>
                  <p>{language === 'en' ? selectedMountain.flavorSignatureEn : selectedMountain.flavorSignatureZh}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#1f1b13]/60 border border-[#42371d]">
                  <h4 className="text-xs font-semibold text-[#deb061] uppercase tracking-wider font-cinzel mb-1">
                    {language === 'en' ? 'Why This Leaf is Irreplaceable' : '为何此山场原料弥足珍贵'}
                  </h4>
                  <p>{language === 'en' ? selectedMountain.scarcityFactorEn : selectedMountain.scarcityFactorZh}</p>
                </div>
              </div>
            </div>

            {/* Inquire for this mountain */}
            <div className="pt-4 border-t border-[#1d2d20] flex items-center justify-between">
              <span className="text-xs text-[#8aa18e]">
                {language === 'en'
                  ? 'Batch certificates and GPS coordinates available per consignment'
                  : '每批次原料均提供山场GPS溯源与独立海关检疫证书'}
              </span>
              <button
                onClick={() => onSelectMountainForInquiry(selectedMountain.nameEn)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#273e2c] hover:bg-[#325239] text-[#e8f3ea] text-xs font-semibold transition-colors"
              >
                <span>{language === 'en' ? 'Inquire Mountain Stock' : '索取该山场配额'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scarcity Deep Dive: Ancient Arbor vs Industrial Plantation */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#121b15] to-[#0f1712] border border-[#223527]">
          <h3 className="text-lg sm:text-xl font-bold font-cinzel text-[#e4ede6] mb-2">
            {language === 'en'
              ? 'The Anatomy of Scarcity: Ancient Forest Arbors vs Commercial Bush Tea'
              : '原料稀缺的科学解构：原始林古树茶 vs 商业化台地密植茶'}
          </h3>
          <p className="text-xs sm:text-sm text-[#93ab96] max-w-3xl mb-6 font-serif-sc">
            {language === 'en'
              ? 'Understanding why authentic old-arbor Pu-erh commands world-class value in the international tea market.'
              : '国际茶叶专业买家选择云南深山古树的核心逻辑：根系深度、生物多样性与自然转化潜力的本质差异。'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ancient Arbor Column */}
            <div className="p-5 rounded-xl bg-[#17251a] border border-[#2e4732] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#8be295] font-cinzel">
                  {language === 'en' ? 'Wild & Ancient Forest Arbor (古树茶)' : '云南深山野生及古树纯料'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#2b4c30] text-[#b4f3bd] font-medium">
                  {language === 'en' ? 'Our Standard' : '云境古茶标准'}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#b8ccbb] font-serif-sc">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5ec66e] shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Root Depth:' : '根系深度：'}</strong>{' '}
                    {language === 'en'
                      ? '5 to 10 meters taproot penetrating volcanic mineral bedrock.'
                      : '直根系深扎地下5-10米，深层吸收亿万年岩石微量矿物与甘泉。'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5ec66e] shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Ecosystem:' : '生态环境：'}</strong>{' '}
                    {language === 'en'
                      ? 'Symbiotic with wild orchids, ferns, ancient moss; zero synthetic spray.'
                      : '与原始雨林高大乔木、野生兰花、苔藓融为一体，自然天敌平衡，无需任何农药。'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5ec66e] shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Steeping Potential:' : '耐泡度与内含物：'}</strong>{' '}
                    {language === 'en'
                      ? 'Rich in tea polyphenols & theanine; easily yields 25–35 brews without tiring.'
                      : '茶多酚、氨基酸与芳香油极高，耐泡度高达25至35道，越泡越清甜。'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5ec66e] shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Aging Horizon:' : '转化价值：'}</strong>{' '}
                    {language === 'en'
                      ? 'Retains active enzymes; increases in market value & complexity over 50 years.'
                      : '内含活性酵素充足，越陈越香，历经数十年陈化价值持续倍增。'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Industrial Plantation Column */}
            <div className="p-5 rounded-xl bg-[#171b18] border border-[#2b302c] space-y-3 opacity-80">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#b4bbb5] font-cinzel">
                  {language === 'en' ? 'Industrial Terrace Bush (台地茶 / 矮化茶)' : '工业化矮化密植台地茶'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#2b2b2b] text-[#9fa6a0] font-medium">
                  {language === 'en' ? 'Mass Market Only' : '大宗工业茶'}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#8f9a90] font-serif-sc">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#cc8a3b] shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Root Depth:' : '根系深度：'}</strong>{' '}
                    {language === 'en'
                      ? 'Shallow root web under 0.6m; requires chemical fertilizers for growth.'
                      : '须根仅深入表土0.5米以内，缺乏深层矿物，高度依赖化肥催生。'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#cc8a3b] shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Ecosystem:' : '生态环境：'}</strong>{' '}
                    {language === 'en'
                      ? 'Monoculture hedges prone to insect pest outbreaks; relies on pesticide sprays.'
                      : '单一矮树丛种植，缺乏生态天敌，病虫害高发，常有农药残留风险。'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#cc8a3b] shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Steeping Potential:' : '耐泡度与内含物：'}</strong>{' '}
                    {language === 'en'
                      ? 'Astringent, flat watery taste after 4-6 brews with harsh bitterness.'
                      : '苦涩难化，4-6道即水味明显，缺乏喉韵与生津感。'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#cc8a3b] shrink-0 mt-0.5" />
                  <span>
                    <strong>{language === 'en' ? 'Aging Horizon:' : '转化价值：'}</strong>{' '}
                    {language === 'en'
                      ? 'Turns sour and lifeless after 2-3 years due to nutrient depletion.'
                      : '缺乏深厚内质支撑，存放数年后容易发酸碳化，无长期收藏转化价值。'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
