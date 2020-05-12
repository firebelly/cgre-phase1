import zenscroll from 'zenscroll';
import appState from '../util/appState';

const home = {
  init() {
    // JavaScript to be fired on the homepage

    document.querySelectorAll('.nav-main a').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.nav-main a').forEach(el => { el.classList.remove('active'); })
        el.classList.add('active');
        let title = el.getAttribute('data-title');
        let page = document.querySelector(`section.page[data-title="${title}"`);
        appState.isAnimating = true;
        zenscroll.intoView(page, 777, () => { appState.isAnimating = false; });
      });
    });

  },

  finalize() {
    // JavaScript to be fired on the homepage, after the init JS
  },
};

export default home
