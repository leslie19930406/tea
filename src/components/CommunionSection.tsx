import React, { useState, useEffect } from 'react';
import { Heart, Activity, Wind, Sparkles, Play, RotateCcw, Volume2, Droplets, Sun, Check } from 'lucide-react';
import { Language } from '../types/puerh';
import { humanNatureCommunion } from '../data/puerhData';
import { teaAudio } from '../utils/audioSynth';

interface CommunionSectionProps {
  language: Language;
}

export const CommunionSection: React.FC<CommunionSectionProps> = ({ language }) => {
  // Gongfu Tea Ritual State
  const [steepCount, setSteepCount] = useState(1);
  const [steepDuration, setSteepDuration] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [vessel, setVessel] = useState<'gaiwan' | 'yixing'>('gaiwan');
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Steeping stages arc
  const steepingStages = [
    {
      range: 'Steeps 1 - 5',
      rangeZh: '第 1 至 5 道 · 初醒山林',
      titleEn: 'Awakening Mountain Orchid',
      titleZh: '野兰初绽 · 汤色浅金透亮',
      notesEn: 'Ethereal wild blossom perfume, delicate nectar, light golden liquor awakening the senses.',
      notesZh: '轻柔高扬的野兰花香气在杯底弥漫，茶汤金黄透亮，初感微涩转瞬化为清泉般甘冽。',
      liquorColor: '#f1d77a',
    },
    {
      range: 'Steeps 6 - 12',
      rangeZh: '第 6 至 12 道 · 核心气韵',
      titleEn: 'Concentrated Honey & Deep Cha Qi',
      titleZh: '百花蜜韵 · 霸道茶气贯通周身',
      notesEn: 'Peak density and viscosity. Intense wild honey, ripe stone fruit, spine and chest warmth (Cha Qi).',
      notesZh: '茶汤厚度达到巅峰，如稠米汤般滑润。浓郁的花蜜香与果木香，后背微汗，胸腹通透舒泰。',
      liquorColor: '#e5aa42',
    },
    {
      range: 'Steeps 13 - 20',
      rangeZh: '第 13 至 20 道 · 岁月沉香',
      titleEn: 'Woody Sweet Camphor & Deep Throat',
      titleZh: '幽沉古木香 · 喉底持久清凉',
      notesEn: 'Subtle ancient camphor and forest floor sweetness. Enduring cooling sensation deep down the throat.',
      notesZh: '木质香与陈化沉香逐渐显现，水路愈发细密，咽喉深处持续泛起冰糖般持久甘甜与深幽凉意。',
      liquorColor: '#c8872b',
    },
    {
      range: 'Steeps 21 - 30+',
      rangeZh: '第 21 至 30+ 道 · 纯净泉韵',
      titleEn: 'Pure Mountain Spring Mineral Sweetness',
      titleZh: '雪山甘泉 · 见素抱朴的大道至简',
      notesEn: 'Pure rock sugar sweetness, crystal clean spring taste. Still vibrating with primeval earth minerals.',
      notesZh: '繁华落尽见真淳。滋味如饮未经世事的深山冰川甘泉，清甜纯粹，回甘依旧经久不绝。',
      liquorColor: '#dba951',
    },
  ];

  // Timer effect
  useEffect(() => {
    let interval: number | null = null;
    if (timerRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerRunning && timeLeft === 0) {
      setTimerRunning(false);
      teaAudio.playSingingBowlChime();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeLeft]);

  const handleStartTimer = () => {
    setTimeLeft(steepDuration);
    setTimerRunning(true);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(steepDuration);
  };

  const handleNextSteep = () => {
    const next = steepCount + 1;
    setSteepCount(next);
    // Automatically scale steep time gently
    const newDuration = Math.min(60, 8 + Math.floor(next * 2));
    setSteepDuration(newDuration);
    setTimeLeft(newDuration);
    setTimerRunning(false);

    if (next <= 5) setActiveStageIndex(0);
    else if (next <= 12) setActiveStageIndex(1);
    else if (next <= 20) setActiveStageIndex(2);
    else setActiveStageIndex(3);
  };

  return (
    <section id="communion" className="py-24 bg-[#0d140f] relative border-t border-[#1e2f22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17261a] border border-[#2d4733] text-xs text-[#86bf8c] mb-3">
            <Heart className="w-3.5 h-3.5 text-[#e57777]" />
            <span className="font-cinzel uppercase tracking-wider">
              {language === 'en' ? 'Pillar 4: Sensory & Spiritual Resonance' : '支柱四：品饮感受 · 人与自然深度沟通'}
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#eef5f0] tracking-tight">
            {language === 'en' ? (
              <>
                Drinking the Ancient Forest: <br />
                <span className="text-[#8bc492] font-serif italic">
                  Profound Communion with Nature
                </span>
              </>
            ) : (
              <>
                天人合一 · 身体与自然的无声对话 <br />
                <span className="text-[#8bc492] font-serif-sc font-normal">
                  一杯古树茶，如何重连人与大地原初的灵性
                </span>
              </>
            )}
          </h2>

          <div className="mt-6 p-4 rounded-2xl bg-[#142017]/80 border border-[#283e2c] max-w-2xl mx-auto">
            <blockquote className="italic font-serif-sc text-sm sm:text-base text-[#cfded1] leading-relaxed">
              {language === 'en' ? humanNatureCommunion.quoteEn : humanNatureCommunion.quoteZh}
            </blockquote>
          </div>
        </div>

        {/* 4 Spiritual & Physiological Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {humanNatureCommunion.dimensions.map((dim, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#121c15] border border-[#213526] hover:border-[#38593f] transition-all space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1a2d1e] flex items-center justify-center text-[#7cc285] font-cinzel text-xs font-bold">
                  0{idx + 1}
                </div>
                <h3 className="font-cinzel text-base sm:text-lg font-semibold text-[#e5f0e7]">
                  {language === 'en' ? dim.titleEn : dim.titleZh}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#a4b8a7] font-serif-sc leading-relaxed">
                {language === 'en' ? dim.descEn : dim.descZh}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Mindful Gongfu Tea Chamber */}
        <div className="rounded-3xl bg-gradient-to-br from-[#131d16] to-[#0c130e] border border-[#253a29] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#203123]">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#729d78] font-cinzel">
                {language === 'en' ? 'Mindful Sensory Simulation' : '茶道心流体验室'}
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#e8eee9] mt-1">
                {language === 'en' ? 'The 30-Steeping Evolutionary Arc' : '三十道茶汤的层次演化与感官计时器'}
              </h3>
            </div>

            {/* Vessel Selection */}
            <div className="flex items-center gap-2 bg-[#172219] p-1 rounded-xl border border-[#253928] text-xs">
              <button
                onClick={() => setVessel('gaiwan')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-serif-sc ${
                  vessel === 'gaiwan' ? 'bg-[#2b4430] text-white' : 'text-[#8da390] hover:text-[#d3e2d6]'
                }`}
              >
                {language === 'en' ? 'Porcelain Gaiwan (盖碗)' : '白瓷盖碗 · 审香透彻'}
              </button>
              <button
                onClick={() => setVessel('yixing')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-serif-sc ${
                  vessel === 'yixing' ? 'bg-[#2b4430] text-white' : 'text-[#8da390] hover:text-[#d3e2d6]'
                }`}
              >
                {language === 'en' ? 'Yixing Clay Pot (紫砂壶)' : '宜兴紫砂壶 · 聚气醇厚'}
              </button>
            </div>
          </div>

          {/* Steeping Interactive Playground */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            {/* Timer & Steeping Controls (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0f1711] border border-[#1e2f21] space-y-5 text-center">
              <div className="flex items-center gap-2 text-xs text-[#8aa38e]">
                <Droplets className="w-4 h-4 text-[#6ec279]" />
                <span className="font-serif-sc">
                  {language === 'en'
                    ? `Current Infusion: Steep #${steepCount}`
                    : `当前正在冲泡：第 ${steepCount} 道`}
                </span>
                <span className="text-[#425e46]">·</span>
                <span>98°C - 100°C</span>
              </div>

              {/* Circular Steeping Timer Display */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-4 border-[#243728]"
                  style={{
                    borderColor: timerRunning ? '#5ab768' : '#243728',
                    transition: 'border-color 0.5s ease',
                  }}
                />
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold font-cinzel text-[#eef6f0]">
                    {timeLeft}s
                  </span>
                  <span className="text-[11px] text-[#7ea082] uppercase tracking-wider font-cinzel mt-1">
                    {timerRunning
                      ? language === 'en'
                        ? 'Extracting Essence...'
                        : '茶汁浸润出汤中...'
                      : language === 'en'
                      ? 'Ready to Steep'
                      : '准备出汤'}
                  </span>
                </div>
              </div>

              {/* Steeping Controls */}
              <div className="flex items-center gap-3 w-full justify-center">
                {!timerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2d4933] hover:bg-[#385c3f] text-[#f0f8f2] text-xs font-semibold shadow-md transition-all border border-[#4d7b55]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{language === 'en' ? 'Start Steeping' : '开始浸润'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetTimer}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3f2b2b] hover:bg-[#523535] text-[#f7e8e8] text-xs font-semibold transition-all border border-[#6b4242]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Reset' : '重置'}</span>
                  </button>
                )}

                <button
                  onClick={handleNextSteep}
                  className="px-4 py-2.5 rounded-xl bg-[#18241b] hover:bg-[#203024] text-[#c0d4c3] text-xs font-medium border border-[#2b3e2e] transition-all"
                >
                  {language === 'en' ? 'Next Steep +' : '下一道 +'}
                </button>
              </div>

              <div className="text-[11px] text-[#718a75] font-serif-sc">
                {language === 'en'
                  ? 'A bronze singing bowl will sound when steeping is complete.'
                  : '倒计时结束将自动鸣响铜磬之声，提醒分杯出汤。'}
              </div>
            </div>

            {/* Steeping Evolution Stage Info (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {steepingStages.map((stage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeStageIndex === idx
                        ? 'bg-[#1e3022] border-[#4b7a52] shadow-md'
                        : 'bg-[#121a14] border-[#1d2a1f] text-[#7f9482] hover:border-[#314635]'
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-[#8de498]">
                      {language === 'en' ? stage.range : stage.rangeZh.split(' · ')[0]}
                    </div>
                    <div className="text-xs font-medium text-[#d9e6dc] mt-1 font-serif-sc truncate">
                      {language === 'en' ? stage.titleEn : stage.titleZh.split(' · ')[0]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Stage Details */}
              <div className="p-6 rounded-2xl bg-[#101712] border border-[#233326] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#8aa38e] uppercase tracking-wider font-cinzel">
                      {language === 'en'
                        ? steepingStages[activeStageIndex].range
                        : steepingStages[activeStageIndex].rangeZh}
                    </span>
                    <h4 className="text-lg font-bold font-cinzel text-[#e5f0e7] mt-0.5">
                      {language === 'en'
                        ? steepingStages[activeStageIndex].titleEn
                        : steepingStages[activeStageIndex].titleZh}
                    </h4>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: steepingStages[activeStageIndex].liquorColor }}
                    title="Tea Broth Color Tone"
                  />
                </div>

                <p className="text-xs sm:text-sm text-[#b2c6b5] font-serif-sc leading-relaxed">
                  {language === 'en'
                    ? steepingStages[activeStageIndex].notesEn
                    : steepingStages[activeStageIndex].notesZh}
                </p>

                <div className="pt-3 border-t border-[#1c2a1f] flex flex-wrap items-center justify-between text-xs text-[#7e9982] gap-2">
                  <span>
                    {language === 'en'
                      ? 'Mindful Guidance: Inhale tea vapor gently; let the broth rest on the tongue for 3 seconds before swallowing.'
                      : '静心指导：先轻嗅公道杯底挂杯冷香；茶汤入口在舌面含润三秒再缓缓咽下，体察喉底清凉。'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
