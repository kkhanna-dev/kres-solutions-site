// Mobile menu toggle. The site works without JavaScript; this only
// collapses the navigation on small screens.
(function () {
  var button = document.querySelector('.menu-button');
  var nav = document.getElementById('site-nav');
  if (!button || !nav) return;
  document.querySelector('.site-header').classList.add('has-menu');

  button.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.focus();
    }
  });
})();

// Skip link: move focus to the main content without adding a # to the URL.
(function () {
  var skip = document.querySelector('.skip-link');
  var main = document.getElementById('main');
  if (!skip || !main) return;
  skip.addEventListener('click', function (event) {
    event.preventDefault();
    main.focus();
  });
})();
