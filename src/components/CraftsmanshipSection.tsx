import React, { useState } from 'react';
import { Sparkles, Wind, Flame, Hand, Sun, Shield, Package, Check, Clock, AlertCircle } from 'lucide-react';
import { Language, CraftStep } from '../types/puerh';
import { craftSteps } from '../data/puerhData';
import regeneratedCraftImage from '../assets/images/regenerated_image_1791885957254.jpg';

interface CraftsmanshipSectionProps {
  language: Language;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({ language }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = craftSteps[currentStepIndex];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Wind':
        return <Wind className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Hand':
        return <Hand className="w-4 h-4" />;
      case 'Sun':
        return <Sun className="w-4 h-4" />;
      case 'Shield':
        return <Shield className="w-4 h-4" />;
      case 'Package':
        return <Package className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="craftsmanship" className="py-24 bg-[#0a0f0c] relative border-t border-[#1a291e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18261c] border border-[#2b4432] text-xs text-[#8cb892] mb-3">
            <Sun className="w-3.5 h-3.5 text-[#e5b35f]" />
            <span className="font-cinzel uppercase tracking-wider">
              {language === 'en' ? 'Pillar 3: The Living Craft' : '支柱三：遵道自然的古法工艺'}
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#eff5f0] tracking-tight">
            {language === 'en' ? (
              <>
                From Wild Canopy to Aged Gold: <br />
                <span className="text-[#8bc492] font-serif italic">
                  Ancestral Natural Craftsmanship
                </span>
              </>
            ) : (
              <>
                从一叶深山嫩芽，到一饼岁月陈金 <br />
                <span className="text-[#8bc492] font-serif-sc font-normal">
                  普洱茶从原料到成品七大古法工序
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#9fb3a2] font-serif-sc">
            {language === 'en'
              ? 'True Pu-erh is a living organism. Our non-heritage tea masters respect the natural seasons, utilizing open-air mountain sunlight, cast-iron wood fire, and granite stone molds rather than artificial baking machines.'
              : '真正的普洱茶具有生命。恪守非遗世代口传心授的自然制茶古法，依靠山风、柴火铁锅、高海拔纯日光与天然青石，绝不采用高温死化烘干机，完整守护微生物群落与活体活性酶。'}
          </p>
        </div>

        {/* Process Stepper Navigation */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-[#1b2b20]">
          {craftSteps.map((stepItem, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isPassed = idx < currentStepIndex;
            return (
              <button
                key={stepItem.step}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 border ${
                  isCurrent
                    ? 'bg-[#223928] border-[#4e8257] text-[#eff7f1] shadow-lg scale-105'
                    : isPassed
                    ? 'bg-[#142017] border-[#253928] text-[#a4baa7]'
                    : 'bg-[#101712] border-[#1c291f] text-[#6e8573] hover:text-[#b4c8b7]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent
                      ? 'bg-[#4f8458] text-white'
                      : isPassed
                      ? 'bg-[#233827] text-[#71be7b]'
                      : 'bg-[#18231a] text-[#5b7360]'
                  }`}
                >
                  {isPassed ? <Check className="w-3 h-3" /> : stepItem.step}
                </span>
                <span className="font-serif-sc whitespace-nowrap">
                  {language === 'en' ? `0${stepItem.step} ${stepItem.titleEn}` : `0${stepItem.step} ${stepItem.titleZh}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111a14] rounded-2xl border border-[#243729] p-6 sm:p-10 shadow-2xl">
          {/* Left Visual Imagery (5 cols) */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-square">
            <img
              src={regeneratedCraftImage}
              alt={currentStep.titleEn}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1610] via-transparent to-transparent" />

            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-[#0a100c]/80 backdrop-blur-md border border-[#233527] text-xs text-[#a1dca9] flex items-center gap-2">
              {getStepIcon(currentStep.iconName)}
              <span className="font-cinzel">
                {language === 'en' ? `Stage 0${currentStep.step} of 07` : `第七道工序之 第0${currentStep.step}道`}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#0e1610]/90 backdrop-blur-sm border border-[#233527]">
              <div className="flex items-center gap-1.5 text-xs text-[#e1b764]">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-serif-sc font-medium">
                  {language === 'en' ? currentStep.durationEn : currentStep.durationZh}
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Information (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#7fa984] font-cinzel">
                {language === 'en' ? currentStep.subtitleEn : currentStep.subtitleZh}
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#edf4ef] mt-1">
                {language === 'en' ? currentStep.titleEn : currentStep.titleZh}
              </h3>
            </div>

            {/* Core Craft Principle */}
            <div className="p-4 rounded-xl bg-[#152318] border border-[#263e2a] space-y-2">
              <h4 className="text-xs font-semibold text-[#8de498] uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Artisanal Significance' : '传统工序核心奥秘'}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#b8ccbb] font-serif-sc leading-relaxed">
                {language === 'en' ? currentStep.importanceEn : currentStep.importanceZh}
              </p>
            </div>

            {/* Why Nature Matters */}
            <div className="p-4 rounded-xl bg-[#18211a] border border-[#253928] space-y-2">
              <h4 className="text-xs font-semibold text-[#e5be6b] uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Natural Biochemical Principle' : '遵循自然的生物学原理'}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#b8ccbb] font-serif-sc leading-relaxed">
                {language === 'en' ? currentStep.naturalPrincipleEn : currentStep.naturalPrincipleZh}
              </p>
            </div>

            {/* Why Machine Fails Alert */}
            <div className="p-4 rounded-xl bg-[#1e1713] border border-[#442e1f] space-y-2">
              <h4 className="text-xs font-semibold text-[#e08953] uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Why Industrial Machines Ruin This' : '为何现代工业化机器在此步失败'}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#ceb2a4] font-serif-sc leading-relaxed">
                {language === 'en' ? currentStep.whyMachineFailsEn : currentStep.whyMachineFailsZh}
              </p>
            </div>

            {/* Next / Prev Step Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-lg bg-[#141e16] border border-[#253928] text-xs text-[#a4baa7] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {language === 'en' ? '← Previous Stage' : '← 上一道工序'}
              </button>

              <div className="text-xs text-[#6e8573] font-cinzel">
                {currentStepIndex + 1} / {craftSteps.length}
              </div>

              <button
                disabled={currentStepIndex === craftSteps.length - 1}
                onClick={() => setCurrentStepIndex((prev) => Math.min(craftSteps.length - 1, prev + 1))}
                className="px-4 py-2 rounded-lg bg-[#27402d] hover:bg-[#33563c] border border-[#4a7953] text-xs text-[#eff8f1] font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {language === 'en' ? 'Next Stage →' : '下一道工序 →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
