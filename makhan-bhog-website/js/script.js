document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    var menuIcon = toggle.querySelector('.icon-menu');
    var closeIcon = toggle.querySelector('.icon-close');

    function setOpen(isOpen) {
      mobileNav.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (menuIcon) menuIcon.style.display = isOpen ? 'none' : 'block';
      if (closeIcon) closeIcon.style.display = isOpen ? 'block' : 'none';
    }

    toggle.addEventListener('click', function () {
      setOpen(!mobileNav.classList.contains('is-open'));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
  }

  // Scroll-reveal: fade + slide up content blocks as they enter the viewport
  var revealObserver = null;
  function observeReveals() {
    var targets = document.querySelectorAll('.reveal:not([data-observed]), .reveal-stagger:not([data-observed])');
    if (!targets.length) return;

    if ('IntersectionObserver' in window) {
      if (!revealObserver) {
        revealObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      }
      targets.forEach(function (el) {
        el.setAttribute('data-observed', 'true');
        revealObserver.observe(el);
      });
    } else {
      targets.forEach(function (el) {
        el.setAttribute('data-observed', 'true');
        el.classList.add('is-visible');
      });
    }
  }
  window.observeReveals = observeReveals;
  observeReveals();
});
