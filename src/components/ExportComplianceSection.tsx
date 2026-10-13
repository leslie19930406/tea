import React, { useState } from 'react';
import { ShieldCheck, Plane, Ship, FileText, CheckCircle2, Globe2, Calculator, ArrowRight, Award } from 'lucide-react';
import { Language } from '../types/puerh';
import { exportCertifications } from '../data/puerhData';

interface ExportComplianceSectionProps {
  language: Language;
  onOpenInquiry: () => void;
}

export const ExportComplianceSection: React.FC<ExportComplianceSectionProps> = ({
  language,
  onOpenInquiry,
}) => {
  const [selectedPort, setSelectedPort] = useState('los-angeles');
  const [shipmentMode, setShipmentMode] = useState<'air_sample' | 'air_cargo' | 'ocean_fcl'>('air_sample');

  const destinationPorts = [
    { id: 'los-angeles', nameEn: 'Port of Los Angeles / Long Beach, USA', nameZh: '美国洛杉矶/长滩口岸', airDays: '3 - 5 Days', oceanDays: '16 - 20 Days' },
    { id: 'rotterdam', nameEn: 'Port of Rotterdam / Hamburg, Europe', nameZh: '欧洲鹿特丹/汉堡口岸', airDays: '4 - 6 Days', oceanDays: '26 - 32 Days' },
    { id: 'london', nameEn: 'London Gateway / Felixstowe, UK', nameZh: '英国伦敦/费利克斯托口岸', airDays: '3 - 5 Days', oceanDays: '28 - 34 Days' },
    { id: 'tokyo', nameEn: 'Port of Tokyo / Yokohama, Japan', nameZh: '日本东京/横滨口岸', airDays: '2 - 3 Days', oceanDays: '7 - 10 Days' },
    { id: 'singapore', nameEn: 'Port of Singapore (SEA Hub)', nameZh: '新加坡港（东南亚枢纽）', airDays: '2 - 4 Days', oceanDays: '6 - 9 Days' },
    { id: 'sydney', nameEn: 'Port of Sydney / Melbourne, Australia', nameZh: '澳大利亚悉尼/墨尔本口岸', airDays: '4 - 6 Days', oceanDays: '18 - 24 Days' },
  ];

  const currentPort = destinationPorts.find((p) => p.id === selectedPort) || destinationPorts[0];

  return (
    <section id="certifications" className="py-24 bg-[#0a0f0c] relative border-t border-[#1a291e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18261c] border border-[#2b4432] text-xs text-[#8cb892] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5ec66e]" />
            <span className="font-cinzel uppercase tracking-wider">
              {language === 'en' ? 'Export Compliance & Global Logistics' : '国际外贸资质与全球物流配送'}
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#eff5f0] tracking-tight">
            {language === 'en' ? (
              <>
                Global Export Standards: <br />
                <span className="text-[#8bc492] font-serif italic">
                  Certified Purity for International Ports
                </span>
              </>
            ) : (
              <>
                严苛国际准入 · 畅行全球口岸 <br />
                <span className="text-[#8bc492] font-serif-sc font-normal">
                  SGS权威零农残 · 海关官方植检 · 完整清关链路
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#9fb3a2] font-serif-sc">
            {language === 'en'
              ? 'We provide end-to-end export documentation, lab test COA certificates, customs clearance assistance, and air/ocean freight to over 40 countries.'
              : '为全球茶叶进口商、高端茶室、有机食品连锁及私人典藏家提供全套合规出口单证、权威质检报告（COA）、产地证明与门到门/港到港国际物流。'}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {exportCertifications.map((cert) => (
            <div
              key={cert.code}
              className="p-6 rounded-2xl bg-[#111913] border border-[#213526] hover:border-[#38593f] transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8fe599] font-cinzel">
                  {cert.code}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1f3323] text-[#9ee4a6] font-medium font-cinzel">
                  {cert.badgeText}
                </span>
              </div>

              <h3 className="font-cinzel text-base font-semibold text-[#e8eee9]">
                {language === 'en' ? cert.titleEn : cert.titleZh}
              </h3>

              <p className="text-xs text-[#a2b5a5] font-serif-sc leading-relaxed">
                {language === 'en' ? cert.descriptionEn : cert.descriptionZh}
              </p>

              <div className="pt-2 border-t border-[#1a281e] flex items-center justify-between text-[11px] text-[#78917c]">
                <span>{cert.institution}</span>
                <span className="text-[#a4bfa8]">{cert.validThrough}</span>
              </div>
            </div>
          ))}

          {/* Private Label OEM Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#192b1e] to-[#121c15] border border-[#3b5e40] space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#e0b764] font-cinzel">
                  OEM / ODM
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#3b321a] text-[#f2cb78] font-medium font-cinzel">
                  {language === 'en' ? 'Bespoke Private Label' : '定制专属品牌'}
                </span>
              </div>

              <h3 className="font-cinzel text-base font-semibold text-[#f0f6f1]">
                {language === 'en' ? 'Private Label & Custom Packaging' : '外贸贴牌定制与个性化包装'}
              </h3>

              <p className="text-xs text-[#b8ccbb] font-serif-sc leading-relaxed">
                {language === 'en'
                  ? 'Custom handmade mulberry paper wrapping, personalized calligraphy seal, laser engraved wooden humidors, and bespoke tong casings.'
                  : '支持海外品牌商贴牌定制：定制手工构树皮棉纸版面、专属书法印章、实木典藏茶盒与天然竹笋壳原生态包装。'}
              </p>
            </div>

            <button
              onClick={onOpenInquiry}
              className="w-full py-2.5 rounded-xl bg-[#2b4831] hover:bg-[#365c3f] text-[#eff8f1] text-xs font-semibold transition-all border border-[#52845a] flex items-center justify-center gap-2"
            >
              <span>{language === 'en' ? 'Consult OEM Options' : '咨询OEM定制方案'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Shipping Port & Lead Time Calculator */}
        <div className="rounded-3xl bg-[#111a14] border border-[#233728] p-6 sm:p-10 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs text-[#7ea583] uppercase tracking-wider font-cinzel">
              <Calculator className="w-3.5 h-3.5 text-[#6ec279]" />
              <span>{language === 'en' ? 'Interactive Freight & Lead Time Calculator' : '全球主要港口物流时效测算'}</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#eef4f0] mt-1">
              {language === 'en'
                ? 'Export Logistics from Yunnan Origin to Global Destinations'
                : '从云南茶山源头仓，到海外目标港口与买家仓库'}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Port & Mode Selector (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#9eb4a1] font-serif-sc mb-1.5">
                  {language === 'en' ? 'Select Destination Port / Region:' : '选择目的港口 / 国家：'}
                </label>
                <select
                  value={selectedPort}
                  onChange={(e) => setSelectedPort(e.target.value)}
                  className="w-full bg-[#162319] border border-[#273c2a] text-[#e8eee9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4d7b55]"
                >
                  {destinationPorts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {language === 'en' ? p.nameEn : p.nameZh}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9eb4a1] font-serif-sc mb-1.5">
                  {language === 'en' ? 'Select Freight Mode:' : '选择运输方式：'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setShipmentMode('air_sample')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      shipmentMode === 'air_sample'
                        ? 'bg-[#223928] border-[#4e8257] text-[#ecf5ee]'
                        : 'bg-[#152018] border-[#223225] text-[#869c89] hover:text-[#d0ded2]'
                    }`}
                  >
                    <Plane className="w-4 h-4 mx-auto mb-1 text-[#6ec279]" />
                    <div className="text-[11px] font-semibold">
                      {language === 'en' ? 'Air Express' : '特快航空'}
                    </div>
                    <div className="text-[10px] text-[#718b74]">
                      {language === 'en' ? 'Sample (2-5kg)' : '茶样试喝'}
                    </div>
                  </button>

                  <button
                    onClick={() => setShipmentMode('air_cargo')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      shipmentMode === 'air_cargo'
                        ? 'bg-[#223928] border-[#4e8257] text-[#ecf5ee]'
                        : 'bg-[#152018] border-[#223225] text-[#869c89] hover:text-[#d0ded2]'
                    }`}
                  >
                    <Plane className="w-4 h-4 mx-auto mb-1 text-[#6ec279]" />
                    <div className="text-[11px] font-semibold">
                      {language === 'en' ? 'Air Cargo' : '航空空运'}
                    </div>
                    <div className="text-[10px] text-[#718b74]">
                      {language === 'en' ? '50 - 300kg' : '小批量首单'}
                    </div>
                  </button>

                  <button
                    onClick={() => setShipmentMode('ocean_fcl')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      shipmentMode === 'ocean_fcl'
                        ? 'bg-[#223928] border-[#4e8257] text-[#ecf5ee]'
                        : 'bg-[#152018] border-[#223225] text-[#869c89] hover:text-[#d0ded2]'
                    }`}
                  >
                    <Ship className="w-4 h-4 mx-auto mb-1 text-[#6ec279]" />
                    <div className="text-[11px] font-semibold">
                      {language === 'en' ? 'Ocean Freight' : '海运整柜/拼箱'}
                    </div>
                    <div className="text-[10px] text-[#718b74]">
                      {language === 'en' ? 'FCL / LCL' : '批量货柜'}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Result Lead-Time Card (6 cols) */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0e1610] border border-[#1f3021] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2a1d]">
                <span className="text-xs text-[#8aa38e] font-serif-sc">
                  {language === 'en' ? 'Target Route:' : '运输航线：'}
                </span>
                <span className="text-xs font-semibold text-[#e1eee3] font-serif-sc">
                  Yunnan Origin ➔ {language === 'en' ? currentPort.nameEn.split(',')[0] : currentPort.nameZh}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#142017] border border-[#213524]">
                  <div className="text-[11px] text-[#7b9c80] uppercase tracking-wider font-cinzel">
                    {language === 'en' ? 'Estimated Transit Time' : '预计航运时效'}
                  </div>
                  <div className="text-lg font-bold text-[#7be38d] font-cinzel mt-1">
                    {shipmentMode === 'ocean_fcl' ? currentPort.oceanDays : currentPort.airDays}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#142017] border border-[#213524]">
                  <div className="text-[11px] text-[#7b9c80] uppercase tracking-wider font-cinzel">
                    {language === 'en' ? 'HS Code for Clearance' : '出口海关HS编码'}
                  </div>
                  <div className="text-lg font-bold text-[#e1eee3] font-cinzel mt-1">
                    0902.40.90
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#9eb6a2] font-serif-sc">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5ec66e]" />
                  <span>
                    {language === 'en'
                      ? 'Includes phytosanitary inspection, Certificate of Origin (Form A / RCEP)'
                      : '包含海关出具官方植物检疫证书、原产地证书（RCEP / CO）'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5ec66e]" />
                  <span>
                    {language === 'en'
                      ? 'Trade terms supported: FOB Shenzhen, CIF Destination, DDP Door-to-Door'
                      : '支持国际贸易术语：FOB深圳/广州、CIF目的港、DDP完税后门到门'}
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenInquiry}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2c4b31] to-[#3a6442] hover:from-[#35593b] hover:to-[#43744c] text-white text-xs font-semibold tracking-wide uppercase shadow-lg transition-all border border-[#4f7f57] flex items-center justify-center gap-2"
              >
                <span>{language === 'en' ? 'Get Official Freight & Sample Quote' : '获取正式外贸报价单与样品'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
