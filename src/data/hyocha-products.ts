/** 森半の氷茶（森半の氷茶.jpg より書き起こし） */
import { LINK_BASE } from './links';

export const HYOCHA_INTRO = [
  'ある朝のドラマにも登場したシーン。\n「笊籠（いかき）と呼ばれる竹を編んだざるに\nお茶と氷を入れる。」それだけ。',
  'ゆっくりゆっくり溶けてゆく氷と、\nじっくりじっくり開いてゆく茶葉。\nヒタヒタと笊籠から落ちてゆくのは、\nうま味たっぷりのお茶。',
  '100年以上の歴史を持つ森半の「氷茶」は\n創業当時の製法を守りながら、\n現代の技術も取り入れながら作っています。',
  '丁寧に抽出する事で実現する厳選された\n茶葉の深い味わいと爽やかな香りは\n多くのお客様に愛され続けています。',
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
    name: '氷茶 水出し煎茶 プレミアム',
    unit: '[10P入り]',
    price: '972',
    description:
      '上質な煎茶を低温で抽出することにより、渋みが抑えられ、まろやかな旨みと際立つ爽やかな香りをお手軽に愉しめます。',
    href: LINK_BASE,
  },
  {
    name: '氷茶 水出し煎茶',
    unit: '[8P入り]',
    price: '756',
    description:
      '抽出性を上げる三角ティーバッグを使用し、時間がかかりがちな水出しの煎茶をご自宅でお手軽に。',
    href: LINK_BASE,
  },
];
