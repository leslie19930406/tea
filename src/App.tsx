/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TerroirSection } from './components/TerroirSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { CommunionSection } from './components/CommunionSection';
import { TastingWheelSection } from './components/TastingWheelSection';
import { ProductCatalogSection } from './components/ProductCatalogSection';
import { ExportComplianceSection } from './components/ExportComplianceSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { Language, Currency, TeaProduct } from './types/puerh';
import { Send, Sparkles } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedProduct, setSelectedProduct] = useState<TeaProduct | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [preSelectedTeaName, setPreSelectedTeaName] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (teaName?: string) => {
    setPreSelectedTeaName(teaName);
    setIsInquiryOpen(true);
  };

  const handleSelectProductForInquiry = (product: TeaProduct) => {
    const teaName = language === 'en' ? product.nameEn : product.nameZh;
    handleOpenInquiry(teaName);
  };

  const handleSelectMountainForInquiry = (mountainName: string) => {
    handleOpenInquiry(mountainName);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0c] text-[#e8eee9] font-sans selection:bg-[#48714e] selection:text-white">
      {/* Top Fixed Header with Navigation, Soundscape Audio & Currency Switcher */}
      <Header
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          language={language}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* 2. Primeval Terroir & Raw Material Scarcity (Pillar 1 & 2) */}
        <TerroirSection
          language={language}
          onSelectMountainForInquiry={handleSelectMountainForInquiry}
        />

        {/* 3. 7-Stage Living Artisanal Craftsmanship (Pillar 3) */}
        <CraftsmanshipSection language={language} />

        {/* 4. Communion with Nature: Spiritual & Physiological Resonance (Pillar 4) */}
        <CommunionSection language={language} />

        {/* 5. Sensory Tasting Wheel & Cupping Compass */}
        <TastingWheelSection language={language} />

        {/* 6. Export Collection Catalog & B2B Allocations */}
        <ProductCatalogSection
          language={language}
          currency={currency}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onOpenInquiryForProduct={handleSelectProductForInquiry}
        />

        {/* 7. Export Compliance, Certifications & Freight Calculator */}
        <ExportComplianceSection
          language={language}
          onOpenInquiry={() => handleOpenInquiry()}
        />
      </main>

      {/* Footer with Kunming & Shenzhen Hubs, Incoterms & Disclosures */}
      <Footer
        language={language}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Floating Action Button for Instant B2B Export Quote / Sample Kit */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleOpenInquiry()}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#2c4e33] to-[#3d6945] hover:from-[#375e3f] hover:to-[#497c53] text-[#f4faf5] text-xs font-semibold shadow-2xl border border-[#528459] transition-all hover:scale-105"
          title={language === 'en' ? 'Quick Sample Kit Request' : '快速索取外贸茶样'}
        >
          <span className="w-2 h-2 rounded-full bg-[#64e375] animate-ping" />
          <Send className="w-4 h-4 text-[#88e796]" />
          <span className="font-serif-sc tracking-wide pr-1">
            {language === 'en' ? 'B2B Sample / Quote' : '免费寄样 / 询价'}
          </span>
        </button>
      </div>

      {/* Detailed Product Cupping & Specs Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        language={language}
        currency={currency}
        onOpenInquiryForProduct={handleSelectProductForInquiry}
      />

      {/* B2B Export Inquiry & Wholesale Sample Request Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        language={language}
        preSelectedTeaName={preSelectedTeaName}
      />
    </div>
  );
}
