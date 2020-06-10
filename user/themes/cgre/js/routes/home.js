import zenscroll from 'zenscroll';
import appState from '../util/appState';
import autosize from 'autosize';

const home = {
  init() {
    // JavaScript to be fired on the homepage

    // Reload links (from failed contact msg)
    document.addEventListener('click', e => {
      if (e.target.matches('a.reload')) {
        e.preventDefault();
        location.href = e.target.href;
        location.reload();
      }
    });

    // Nav links scroll to page containers
    document.querySelectorAll('.nav-main a').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        // Set nav item to active state immediately
        document.querySelectorAll('.nav-main a').forEach(el => { el.classList.remove('active'); })
        el.classList.add('active');
        // Find matching page
        let title = el.getAttribute('data-title');
        let page = document.querySelector(`section.page[data-title="${title}"`);
        // Set state to animating for various checks
        appState.isAnimating = true;
        zenscroll.intoView(page, 500, () => {
          appState.isAnimating = false;
        });
      });
    });

    // Logo click scrolls to top of page
    document.querySelectorAll('.header a.logo,footer .logo-stacked a').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        // Ignore click if already animating
        if (!appState.isAnimating) {
          // Set nav item to active state immediately
          document.querySelectorAll('.nav-main a').forEach(el => { el.classList.remove('active'); })
          appState.isAnimating = true;
          zenscroll.toY(0, 500, () => {
            appState.isAnimating = false;
          });
        }
      });
    });

    // Contact submit button changes text on hover
    document.querySelector('#contact button[type=submit]').addEventListener('mouseover', e => {
      e.target.textContent = 'Let’s Go';
    });
    document.querySelector('#contact button[type=submit]').addEventListener('mouseout', e => {
      e.target.textContent = 'Submit';
    });

    // Contact message autoexpands
    let contactText = document.querySelector('#contact-form textarea');
    if (contactText) {
      autosize(contactText);
    }

    // AJAXify contact form submission
    let form = $('#contact-form');
    let formResponse = document.querySelector('#contact .form-response');
    let formWrap = document.querySelector('#contact .form-wrap');
    form.submit(function(e) {
      e.preventDefault();
      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        dataType: 'html',
        data: form.serialize(),
        success: (result) => {
          formResponse.innerHTML = result;
          if (result.match('success')) {
            formWrap.classList.add('-success');
          } else {
            formWrap.classList.add('-error');
          }
          zenscroll.center(formResponse);
        },
        error: (result) => {
          formResponse.innerHTML = '<div class="notices error red"><p>There was an error, please <a class="reload" href="/#contact">try again</a>.</p></div>';
          formWrap.classList.add('-error');
          zenscroll.center(formResponse);
        }
      });
    });

  },

  finalize() {
    // JavaScript to be fired on the homepage, after the init JS
  },
};

export default home
