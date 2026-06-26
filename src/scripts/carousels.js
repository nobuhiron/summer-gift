/* 全カルーセルの Swiper 初期化。
   - data-carousel="free"   … 自由ドラッグ横スクロール＋スクロールバー（Ranking/Noshi/Koricha）
   - data-carousel="slides" … 1枚送り＋矢印（Reason）
   スクロールバー要素は data-scrollbar="#id" で外部指定（インセット配置のため）。 */
import Swiper from 'swiper';
import { FreeMode, Scrollbar, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

export function initFreeCarousel(el) {
  if (!el || el.swiper) return el && el.swiper;
  const barSel = el.getAttribute('data-scrollbar');
  const bar = barSel ? document.querySelector(barSel) : el.querySelector('.swiper-scrollbar');
  return new Swiper(el, {
    modules: [FreeMode, Scrollbar, Keyboard, Mousewheel],
    slidesPerView: 'auto',
    spaceBetween: 12,
    freeMode: { enabled: true, momentum: true, sticky: false },
    grabCursor: true,
    watchOverflow: true, // スクロール不要ならバー等を隠す
    keyboard: { enabled: true, onlyInViewport: true }, // ←→ キーで送り
    mousewheel: { forceToAxis: true, releaseOnEdges: true }, // 横スワイプ/横ホイール。縦のページスクロールは妨げない
    scrollbar: bar ? { el: bar, draggable: true, hide: false } : false,
  });
}

export function initSlidesCarousel(el) {
  if (!el || el.swiper) return el && el.swiper;
  const sw = new Swiper(el, {
    modules: [Keyboard],
    // 見せ方は 1.1 枚。ただし slidesPerView:1.1（端数）だと slidesOffsetAfter がスライド幅計算に
    // 巻き込まれて圧縮されるため、'auto' ＋ CSS固定幅（.p-reason__item = calc(100%/1.1 - 1px) = 1.1相当）にする。
    slidesPerView: 'auto',
    spaceBetween: 11,
    // 末尾カードを「右端そろえ」ではなく「左端そろえ」で止めるための末尾余白（≒ W − スライド幅 = のぞき幅+gap）。
    // SP本体幅固定前提の定数。CSS のスライド幅と対で調整すること。
    slidesOffsetAfter: 33,
    autoHeight: false,
    watchOverflow: true,
    keyboard: { enabled: true, onlyInViewport: true },
  });
  const wrap = el.closest('.p-reason__carousel');
  if (wrap) {
    const prevBtn = wrap.querySelector('[data-reason-prev]');
    const nextBtn = wrap.querySelector('[data-reason-next]');
    prevBtn?.addEventListener('click', () => sw.slidePrev());
    nextBtn?.addEventListener('click', () => sw.slideNext());
    const update = () => {
      prevBtn?.classList.toggle('is-disabled', sw.isBeginning);
      nextBtn?.classList.toggle('is-disabled', sw.isEnd);
    };
    sw.on('slideChange', update);
    update();
  }
  return sw;
}

/* slides 系（Reason）は可視になった時点で初期化し、
   高さ変化に追従して update する。 */
function initSlidesWhenVisible(el) {
  if (!el || el.swiper) return;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var sw = initSlidesCarousel(el);
        if (sw && 'ResizeObserver' in window) {
          new ResizeObserver(function () {
            sw.update();
          }).observe(el);
        }
        if (sw) sw.update();
        io.unobserve(el);
      });
    },
    { threshold: 0.01 }
  );
  io.observe(el);
}

function boot() {
  document.querySelectorAll('[data-carousel="free"]').forEach(initFreeCarousel);
  document.querySelectorAll('[data-carousel="slides"]').forEach(initSlidesWhenVisible);
}

if (document.readyState !== 'loading') {
  boot();
} else {
  document.addEventListener('DOMContentLoaded', boot);
}
