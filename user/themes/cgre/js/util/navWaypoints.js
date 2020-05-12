// Nav waypoints tied to section.page elements

import appState from './appState';

let $pages = [],
    $nav,
    $window,
    scrollTop,
    ticking;

const navWaypoints = {

  // Init sticky headers
  init() {
    if ($('section.page').length) {
      $window = $(window);
      $nav = $('.nav-main');
      $pages = $('section.page');

      $window.off('scroll.navWaypoints').on('scroll.navWaypoints', navWaypoints.scrolling);
      $window.off('resize.navWaypoints').on('resize.navWaypoints', navWaypoints.resizing);
      $window.off('load.navWaypoints').on('load.navWaypoints', navWaypoints.resizing);
    }
  },

  // Request update using requestAnimationFrame
  requestTick() {
    if(!ticking) {
      requestAnimationFrame(navWaypoints.update);
    }
    ticking = true;
  },

  // Update sticky title
  update() {
    ticking = false;
    if (appState.isAnimating) {
      return;
    }
    let currentPage = '';
    // Find current sticky section title based on scroll position
    $pages.each(function(i) {
      if (this.offsetTop - 10 <= scrollTop) {
        currentPage = this.getAttribute('data-title');
      }
    });
    $nav.find('a').removeClass('active');
    $nav.find(`a[data-title="${currentPage}"]`).addClass('active');
  },

  // Scrolling
  scrolling(event) {
    scrollTop = $window.scrollTop();
    navWaypoints.requestTick();
  }

};

export default navWaypoints
