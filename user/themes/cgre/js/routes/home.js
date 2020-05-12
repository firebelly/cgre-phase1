import zenscroll from 'zenscroll';
import appState from '../util/appState';

const home = {
  init() {
    // JavaScript to be fired on the homepage

    document.querySelectorAll('.nav-main a').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        // Ignore click if already animating
        if (!appState.isAnimating) {
          // Set nav item to active state immediately
          document.querySelectorAll('.nav-main a').forEach(el => { el.classList.remove('active'); })
          el.classList.add('active');
          // Find matching page
          let title = el.getAttribute('data-title');
          let page = document.querySelector(`section.page[data-title="${title}"`);
          // Set state to animating for various checks
          appState.isAnimating = true;
          zenscroll.intoView(page, 777, () => {
            appState.isAnimating = false;
          });
        }
      });
    });

    document.querySelector('#contact button[type=submit]').addEventListener('mouseover', e => {
      e.target.textContent = 'Let’s Go';
    });
    document.querySelector('#contact button[type=submit]').addEventListener('mouseout', e => {
      e.target.textContent = 'Submit';
    });

  },

  finalize() {
    // JavaScript to be fired on the homepage, after the init JS
  },
};

export default home
