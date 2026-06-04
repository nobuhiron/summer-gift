/** オンラインショップの便利なサービス（Frame 212.jpg より書き起こし） */
import { LINK_BASE } from './links';

export type ServiceButton = { label: string; tone: 'blue' | 'tan'; href: string };
export type Service = {
  freeIcon: string;
  lead: string;
  title: string;
  body: string;
  image: string;
  buttons: ServiceButton[];
};

export const SERVICES: Service[] = [
  {
    freeIcon: '/icon-free-1.svg',
    lead: '安心・丁寧な',
    title: 'のし紙サービス',
    body: 'お客様のご要望に合わせて、ショッピングカート内で、さまざまなパターンをお選びいただけます。',
    image: 'gift-1',
    buttons: [
      { label: 'ギフトラッピングについて', tone: 'blue', href: LINK_BASE },
      { label: 'のしガイド', tone: 'tan', href: LINK_BASE },
    ],
  },
  {
    freeIcon: '/icon-free-2.svg',
    lead: 'ご自宅送りで使える',
    title: '手提げ袋サービス',
    body: 'お客様のご要望に合わせて、手提げ袋を同封します。',
    image: 'gift-2',
    buttons: [{ label: 'お手提げ袋について', tone: 'blue', href: LINK_BASE }],
  },
  {
    freeIcon: '/icon-free-3.svg',
    lead: '贈りたい方へ直接',
    title: '丁寧な梱包',
    body: 'お届けする商品が傷つかないよう、段ボールに緩衝材を入れて丁寧に梱包し発送いたします。また、贈り物として安心してご利用いただけるよう、金額が分かる明細書や納品書は同梱しておりません。',
    image: 'gift-3',
    buttons: [],
  },
];
