export type Language = 'en' | 'zh';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CNY';

export interface CurrencyRate {
  symbol: string;
  rateFromUSD: number;
}

export type TeaType = 'sheng' | 'shou' | 'vintage' | 'single_arbor';

export interface TeaProduct {
  id: string;
  nameEn: string;
  nameZh: string;
  subtitleEn: string;
  subtitleZh: string;
  type: TeaType;
  vintageYear: number;
  originMountainEn: string;
  originMountainZh: string;
  altitude: number; // meters
  treeAge: string; // e.g. "500-600 years"
  weightGrams: number;
  shapeEn: string; // e.g. "357g Traditional Cake (七子饼)"
  shapeZh: string;
  priceUSD: number;
  samplePriceUSD: number;
  minimumWholesaleUnits: number;
  moqDiscountRate: number;
  harvestSeasonEn: string;
  harvestSeasonZh: string;
  masterArtisanEn: string;
  masterArtisanZh: string;
  descriptionEn: string;
  descriptionZh: string;
  tastingNotesEn: string[];
  tastingNotesZh: string[];
  chaQiLevel: number; // 1-5
  throatSweetnessLevel: number; // 1-5
  aromaProfileEn: string;
  aromaProfileZh: string;
  imageUrl: string;
  organicCertified: boolean;
  sgsPesticideZero: boolean;
  stockKg: number;
  specifications: {
    packagingEn: string;
    packagingZh: string;
    shelfLifeEn: string;
    shelfLifeZh: string;
    storageMethodEn: string;
    storageMethodZh: string;
    infusionPotential: string;
  };
}

export interface MountainTerroir {
  id: string;
  nameEn: string;
  nameZh: string;
  regionEn: string;
  regionZh: string;
  elevation: string;
  treeAgeAvg: string;
  forestEcologyEn: string;
  forestEcologyZh: string;
  flavorSignatureEn: string;
  flavorSignatureZh: string;
  scarcityFactorEn: string;
  scarcityFactorZh: string;
  annualOutputKg: string;
  imageUrl: string;
  coordinates: string;
  unescoHeritage?: boolean;
}

export interface CraftStep {
  step: number;
  titleEn: string;
  titleZh: string;
  subtitleEn: string;
  subtitleZh: string;
  durationEn: string;
  durationZh: string;
  importanceEn: string;
  importanceZh: string;
  naturalPrincipleEn: string;
  naturalPrincipleZh: string;
  whyMachineFailsEn: string;
  whyMachineFailsZh: string;
  imageUrl: string;
  iconName: string;
}

export interface B2BInquiryForm {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  inquiryType: 'sample_kit' | 'wholesale_order' | 'private_label_oem' | 'custom_blend';
  targetTeas: string[];
  estimatedVolumeKg: string;
  preferredTradeTerm: 'FOB' | 'CIF' | 'DDP' | 'EXW';
  shippingDestinationPort: string;
  additionalNotes: string;
}
