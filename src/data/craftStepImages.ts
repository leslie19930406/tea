// ==============================================================================
// 🍵 普洱茶七大古法工序图片集中配置文件 (Craftsmanship Step Images Configuration)
// ==============================================================================
// 您可以随时在这里【一次性批量修改】这7道工序的配图：
// 1. 本地图片：将新图片放入 src/assets/images/，然后使用 import 或相对路径引入
// 2. 外部图片：直接填入任何网络图片 URL（如 CDN、图床、Unsplash 或 GitHub 地址）
// ==============================================================================

import step1Plucking from '../assets/images/regenerated_image_1791901060057.jpg';

export interface CraftStepImageItem {
  step: number;
  titleZh: string;
  titleEn: string;
  imageUrl: string;
}

export const CRAFT_STEP_IMAGES: Record<number, string> = {
  // 第01道工序：高树徒手古法采摘 (Canopy Hand-Plucking)
  1: step1Plucking,

  // 第02道工序：竹席自然通透萎凋 (Natural Ambient Withering)
  2: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',

  // 第03道工序：柴火铁锅古法杀青 (Wood-Fired Cast-Iron Sha-Qing)
  3: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1000&q=80',

  // 第04道工序：竹匾纯手工揉捻 (Gentle Bamboo-Sieve Rolling)
  4: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=80',

  // 第05道工序：高原纯日光自然晒青 (Natural Living Sun-Drying)
  5: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',

  // 第06道工序：甘泉蒸软与古法石磨压制 (Spring Steam & Stone-Mold Pressing)
  6: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80',

  // 第07道工序：原生态野生竹笋壳包封与陈化 (Bamboo Shoot Husk Wrapping & Maturation)
  7: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
};
