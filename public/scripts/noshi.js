(function () {
  function init() {
    var Splide = window.Splide;
    if (!Splide) return;

    var el = document.getElementById('noshi-carousel');
    if (!el || el.classList.contains('is-initialized')) return;

    new Splide(el, {
      autoWidth: true,
      gap: '16px',
      arrows: false,
      pagination: false,
      drag: 'free',
      snap: true,
      trimSpace: false,
      // スクロールバーは後日追加予定
    }).mount();
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
