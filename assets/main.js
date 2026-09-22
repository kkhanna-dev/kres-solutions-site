(function () {
  document.documentElement.classList.add('js');

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile nav
  var nav = document.getElementById('nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll (elements start visible without JS; with JS they fade in once)
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = ((i % 4) * 60) + 'ms';
      io.observe(el);
    });
    // Anything already in view on load shows immediately
    setTimeout(function () {
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('in');
      });
    }, 50);
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Copy email
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy') || '';
      var done = function () { btn.textContent = 'copied'; setTimeout(function () { btn.textContent = 'copy'; }, 1600); };
      var fallback = function () {
        var el = document.getElementById('email-text');
        if (el && window.getSelection) {
          var range = document.createRange(); range.selectNodeContents(el);
          var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else { fallback(); }
    });
  });

  // Contact form: opens the visitor's mail client with the message pre-filled.
  // To switch to a hosted form backend (Formspree, Basin, Netlify Forms), see README.md.
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var TO = 'kkhanna.dev@gmail.com';
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.name.value.trim();
      var org = form.org.value.trim();
      var email = form.email.value.trim();
      var type = form.type.value;
      var msg = form.message.value.trim();

      if (!name || !email || !msg || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.className = 'form-status show';
        status.textContent = 'Please add your name, a valid email, and a short description so we know how to reply.';
        return;
      }

      var subject = 'KRES Solutions inquiry: ' + type + (org ? ' (' + org + ')' : '');
      var body = 'Name: ' + name + '\n' + (org ? 'Organization: ' + org + '\n' : '') + 'Email: ' + email + '\nNeed: ' + type + '\n\n' + msg;
      var href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      status.className = 'form-status show';
      status.innerHTML = 'Opening your email app with the message filled in. If nothing happens, send it directly to <code>' + TO + '</code> and we\'ll get back to you within one business day.';
      window.location.href = href;
    });
  }
})();
