/** 森半が選ばれている理由（森半が選ばれている理由.jpg より書き起こし） */
import { LINK_BASE } from './links';

export type Reason = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
};

export const REASONS: Reason[] = [
  {
    eyebrow: 'Reason 01',
    title: '森半のブランドについて',
    body: '天保7年(1836年)、宇治小倉に創業した森半。古くから新しい事に挑戦する精神を持ち、昭和初期には現在の水出し緑茶の元祖である「氷茶」や関西のご当地ドリンクである「グリーンティー」の販売を開始しました。その後も日本緑茶初のハイバキューム缶詰、世界初の泡立つ抹茶オーレの製造・販売、お茶のテーマパーク「TEASQUARE MORIHAN」をオープンするなど、今もなお革新的創造に挑戦する精神は引き継がれています。',
    cta: '森半について詳しく見る',
    href: LINK_BASE,
  },
];
