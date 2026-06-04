(function () {
  const Splide = window.Splide;

  if (!Splide) {
    return;
  }

  const choiceBtns = document.querySelectorAll('.p-line-chat__choice-btn');
  const replyA = document.querySelector('[data-reply="a"]');
  const replyB = document.querySelector('[data-reply="b"]');
  const afterReplyBrandA = document.querySelectorAll('.p-line-chat__after-reply--brand-a');
  const afterReplyFooter = document.querySelectorAll(
    '.p-line-chat__after-reply:not(.p-line-chat__after-reply--gift):not(.p-line-chat__after-reply--b-note):not(.p-line-chat__after-reply--brand-a)'
  );
  const afterReplyBNote = document.querySelector('.p-line-chat__after-reply--b-note');
  const giftCarouselEls = document.querySelectorAll('.p-line-chat__after-reply--gift');
  const reasonCarouselRoots = document.querySelectorAll('[data-reason-carousel]');
  const mountedCarousels = new Set();
  const carouselOptions = {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '0px',
    padding: 0,
    trimSpace: true,
    pagination: true,
    arrows: true,
    autoplay: false,
    autoHeight: true,
  };
  const carouselSelectors = {
    a: ['#brand-carousel-a'],
    b: ['#brand-carousel-a', '#gift-carousel'],
  };

  let currentChoice = null;

  const mountCarousel = (selector) => {
    if (mountedCarousels.has(selector)) return;

    const element = document.querySelector(selector);
    if (!element) return;

    mountedCarousels.add(selector);
    new Splide(element, carouselOptions).mount();
  };

  const mountCarousels = (selectors) => {
    selectors.forEach((selector) => mountCarousel(selector));
  };

  const syncReasonCarouselHeights = () => {
    reasonCarouselRoots.forEach((root) => {
      if (root.hidden || root.offsetParent === null) return;

      const slides = root.querySelectorAll('.splide__slide');
      const cards = root.querySelectorAll('[data-reason-carousel-card]');
      const titles = root.querySelectorAll('.p-line-chat__card-title');
      if (!slides.length || !cards.length) return;

      slides.forEach((slide) => {
        slide.style.height = 'auto';
      });
      cards.forEach((card) => {
        card.style.height = 'auto';
        card.style.minHeight = '0';
      });
      titles.forEach((title) => {
        title.style.minHeight = '0';
      });

      const maxTitleHeight = Math.max(
        ...Array.from(titles).map((title) => title.getBoundingClientRect().height)
      );

      if (Number.isFinite(maxTitleHeight) && maxTitleHeight > 0) {
        titles.forEach((title) => {
          title.style.minHeight = `${maxTitleHeight}px`;
        });
      }

      const maxHeight = Math.max(...Array.from(cards).map((card) => card.getBoundingClientRect().height));
      const minCardHeight = root.classList.contains('p-line-chat__after-reply--gift') ? 560 : 0;
      const targetHeight = Math.ceil(Math.max(maxHeight, minCardHeight));

      if (!Number.isFinite(targetHeight) || targetHeight <= 0) return;

      slides.forEach((slide) => {
        slide.style.height = `${targetHeight}px`;
      });

      cards.forEach((card) => {
        card.style.height = '100%';
        card.style.minHeight = `${targetHeight}px`;
      });
    });
  };

  const scheduleReasonCarouselSync = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(syncReasonCarouselHeights);
    });
  };

  window.addEventListener('load', scheduleReasonCarouselSync);
  window.addEventListener('resize', scheduleReasonCarouselSync);

  choiceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.choice;
      if (choice === currentChoice) return;
      currentChoice = choice || null;

      choiceBtns.forEach((choiceBtn) => {
        choiceBtn.classList.toggle('is-selected', choiceBtn.dataset.choice === choice);
        choiceBtn.classList.toggle('is-dimmed', choiceBtn.dataset.choice !== choice);
      });

      const showReply = choice === 'a' ? replyA : replyB;
      const hideReply = choice === 'a' ? replyB : replyA;

      if (hideReply) {
        hideReply.hidden = true;
        hideReply.querySelectorAll('.p-line-chat__reply-msg').forEach((msg) => {
          msg.classList.remove('is-visible');
        });
      }

      if (showReply) {
        showReply.hidden = false;
        const msgs = showReply.querySelectorAll('.p-line-chat__reply-msg');
        msgs.forEach((msg, i) => {
          msg.style.animationDelay = `${i * 0.3}s`;
          msg.classList.add('is-visible');
        });
      }

      [...afterReplyBrandA, ...afterReplyFooter].forEach((el) => {
        if (el.hidden) {
          el.hidden = false;
          el.style.animationDelay = '0.6s';
          el.classList.add('is-visible');
        }
      });

      if (choice === 'b') {
        if (afterReplyBNote && afterReplyBNote.hidden) {
          afterReplyBNote.hidden = false;
          afterReplyBNote.style.animationDelay = '0.75s';
          afterReplyBNote.classList.add('is-visible');
        }
        giftCarouselEls.forEach((el) => {
          if (el.hidden) {
            el.hidden = false;
            el.style.animationDelay = '0.9s';
            el.classList.add('is-visible');
          }
        });
      } else {
        if (afterReplyBNote) {
          afterReplyBNote.hidden = true;
          afterReplyBNote.classList.remove('is-visible');
        }
        giftCarouselEls.forEach((el) => {
          el.hidden = true;
          el.classList.remove('is-visible');
        });
      }

      setTimeout(() => {
        mountCarousels(choice === 'a' ? carouselSelectors.a : carouselSelectors.b);
        scheduleReasonCarouselSync();
      }, 800);
    });
  });

  const chatBody = document.querySelector('.p-line-chat__body');
  if (chatBody) {
    const animElements = chatBody.querySelectorAll('.p-line-chat__anim');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animElements.forEach((el, i) => {
              el.style.animationDelay = `${i * 0.4}s`;
              el.classList.add('is-visible');
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(chatBody);
  }
})();
