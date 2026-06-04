export function initSiteScripts() {
  initPageBackground();
}

function initPageBackground() {
  const pageBg = document.querySelector('.l-page__bg');
  const page = document.querySelector('.l-page');
  const aboutSection = document.getElementById('about');
  const giftSection = document.getElementById('gift');
  const timeSceneSection = document.getElementById('time-scene');
  const timeSceneItems = Array.from(document.querySelectorAll('.p-time-scene__item'));

  if (
    !(pageBg instanceof HTMLElement) ||
    !(page instanceof HTMLElement) ||
    !aboutSection ||
    !giftSection ||
    !timeSceneSection
  ) {
    return;
  }

  const setBackgroundState = (state) => {
    pageBg.dataset.bgState = state;
    page.dataset.chromeState = state;
  };

  const setChromeTone = (tone) => {
    page.dataset.chromeTone = tone;
  };

  const getStateFromViewportCenter = () => {
    const centerY = window.scrollY + window.innerHeight / 2;
    const aboutTop = aboutSection.offsetTop;
    const aboutBottom = aboutTop + aboutSection.offsetHeight;
    const giftTop = giftSection.offsetTop;
    const timeSceneBottom = timeSceneSection.offsetTop + timeSceneSection.offsetHeight;

    if (centerY >= giftTop && centerY < timeSceneBottom) {
      return 'gift-flow';
    }

    if (centerY >= aboutTop && centerY < aboutBottom) {
      return 'about';
    }

    return 'default';
  };

  const syncTimeSceneTone = () => {
    if (timeSceneItems.length === 0) {
      setChromeTone('dark');
      return;
    }

    const centerY = window.scrollY + window.innerHeight / 2;
    const fourthItem = timeSceneItems[3];
    const thresholdTop = fourthItem ? fourthItem.offsetTop : Number.POSITIVE_INFINITY;
    const tone = centerY >= thresholdTop ? 'light' : 'dark';
    setChromeTone(tone);
  };

  let ticking = false;
  const syncBackground = () => {
    ticking = false;
    syncTimeSceneTone();
    setBackgroundState(getStateFromViewportCenter());
  };

  const requestSync = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(syncBackground);
  };

  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync);
  window.addEventListener('load', requestSync);
  requestSync();
}

initSiteScripts();
