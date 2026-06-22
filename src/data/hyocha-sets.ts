/** 氷茶 詰め合わせ / 氷茶・くず餅 詰め合わせ（氷茶詰め合わせ.jpg・氷茶・くず餅 詰め合わせ.jpg より） */
import { LINK_BASE } from './links';

export const HYOCHA_SET_DESC =
  '氷を浮かべることで引き立つ、玉露の豊かな香りと濃厚な旨み、やさしい甘み。暑い季節に、涼やかで贅沢なお茶時間をお楽しみください。';

export type Assortment = {
  no: string;
  title: string;
  spec?: string;
  price: string;
  href: string;
};

/** 氷茶 詰め合わせ */
export const HYOCHA_ASSORTMENTS: Assortment[] = [
  {
    no: 'Assortment 01',
    title: '氷茶詰め合わせ',
    spec: '[氷茶(玉露) 10P入、氷茶(煎茶) 10P入]',
    price: '2,484',
    href: 'https://www.tea-and-coffee.shop/view/item/000000000495',
  },
  {
    no: 'Assortment 02',
    title: '氷茶 詰め合わせ (IP-30U)',
    price: '3,240',
    href: 'https://www.tea-and-coffee.shop/view/item/000000000109',
  },
  {
    no: 'Assortment 03',
    title: '氷茶 詰め合わせ 5本セット (IP-50U)',
    price: '5,400',
    href: 'https://www.tea-and-coffee.shop/view/item/000000000108',
  },
];

/** 氷茶・くず餅 詰め合わせ */
export const KUZU_ASSORTMENTS: Assortment[] = [
  {
    no: 'Assortment 04',
    title: '氷茶・くず餅詰め合わせ (IPM-30U)',
    price: '3,240',
    href: 'https://www.tea-and-coffee.shop/view/item/000000000501',
  },
  {
    no: 'Assortment 05',
    title: '氷茶・くず餅詰め合わせ (IPM-50U)',
    price: '5,400',
    href: 'https://www.tea-and-coffee.shop/view/item/000000000500',
  },
];

export type GridProduct = { name: string; price: string; href: string };

export const KUZU_GRID: GridProduct[] = [
  { name: '氷茶(水出し玉露)・くず餅(白)', price: '2,365', href: 'https://www.tea-and-coffee.shop/view/item/000000000496' },
  { name: '氷茶(水出し玉露)・くず餅(柚子)', price: '2,365', href: 'https://www.tea-and-coffee.shop/view/item/000000000497' },
  { name: '氷茶(水出し煎茶 プレミアム)・くず餅(白)', price: '1,825', href: 'https://www.tea-and-coffee.shop/view/item/000000000498' },
  { name: '氷茶(水出し煎茶 プレミアム)・くず餅(柚子)', price: '1,825', href: 'https://www.tea-and-coffee.shop/view/item/000000000499' },
];
