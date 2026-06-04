/** 森半の氷茶（森半の氷茶.jpg より書き起こし） */
import { LINK_BASE } from './links';

export const HYOCHA_INTRO = [
  'ある朝のドラマにも登場したシーン。「笊籠（いかき）と呼ばれる竹を編んだざるにお茶と氷を入れる。」それだけ。',
  'ゆっくりゆっくり溶けてゆく氷と、じっくりじっくり開いてゆく茶葉。ヒタヒタと笊籠から落ちてゆくのは、うま味たっぷりのお茶。',
  '100年以上の歴史を持つ森半の「氷茶」は創業当時の製法を守りながら、現代の技術も取り入れています。',
  '丁寧に抽出する事で実現する厳選された茶葉の深い味わいと爽やかな香りは多くのお客様に愛され続けています。',
];

export type HyochaProduct = {
  name: string;
  unit: string;
  price: string;
  description: string;
  href: string;
};

export const HYOCHA_PRODUCTS: HyochaProduct[] = [
  {
    name: '氷茶 水出し玉露',
    unit: '[10P入り]',
    price: '1,404',
    description:
      '緑茶の極みの玉露を低温で抽出することにより、玉露特有の豊かな香りと濃厚な旨み、甘みが引き立ちます。',
    href: LINK_BASE,
  },
  {
    name: '氷茶 水出しプレミアム',
    unit: '[10P入り]',
    price: '972',
    description:
      '上質な煎茶を低温で抽出することにより、渋みを抑えたまろやかな旨みと爽やかな香りをお手軽にお楽しみいただけます。',
    href: LINK_BASE,
  },
];
