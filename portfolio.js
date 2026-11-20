/* ============================================================
   enswr.dev — portfolio behaviour
   Nav, scroll spy, reveal, typing, clock, back-to-top.
   Nothing here touches the intro's canvas or timing.
   ============================================================ */

(function () {
    'use strict';

    var doc = document;
    var root = doc.documentElement;
    var site = doc.getElementById('site');
    if (!site) return;

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    /* ---------------- navigation ---------------- */

    var nav = doc.getElementById('nav');
    var navLinks = doc.getElementById('navLinks');
    var navToggle = doc.getElementById('navToggle');
    var links = Array.prototype.slice.call(doc.querySelectorAll('.nav__link'));

    function closeMenu() {
        if (!navLinks || !navToggle) return;
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
            navLinks.classList.toggle('is-open', !open);
        });
    }

    links.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    doc.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 880) closeMenu();
    });

    /* ---------------- active section indicator ---------------- */

    var sections = ['home', 'projects', 'about', 'stack']
        .map(function (id) { return doc.getElementById(id); })
        .filter(Boolean);

    function setActive(id) {
        links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
    }

    if ('IntersectionObserver' in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-42% 0px -52% 0px', threshold: 0 });

        sections.forEach(function (section) { spy.observe(section); });
    }

    /* ---------------- scroll chrome + back to top ---------------- */

    var toTop = doc.getElementById('toTop');
    var ticking = false;

    function onScroll() {
        var y = window.scrollY || window.pageYOffset || 0;

        if (nav) nav.classList.toggle('is-scrolled', y > 12);
        if (toTop) toTop.classList.toggle('is-visible', y > 640);

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(onScroll);
    }, { passive: true });

    onScroll();

    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    /* ---------------- live local clock ---------------- */

    var clock = doc.getElementById('clock');

    function tickClock() {
        if (!clock) return;
        var now = new Date();
        clock.textContent =
            String(now.getHours()).padStart(2, '0') + ':' +
            String(now.getMinutes()).padStart(2, '0') + ':' +
            String(now.getSeconds()).padStart(2, '0');
    }

    tickClock();
    window.setInterval(tickClock, 1000);

    /* ---------------- hero typing effect ---------------- */

    var typed = doc.getElementById('typed');
    var phrases = ['Developer & Creator.', 'Building useful tools.', 'Exploring the digital world.'];
    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var typingStarted = false;

    function typeLoop() {
        if (!typed) return;

        var phrase = phrases[phraseIndex];

        if (!deleting) {
            charIndex += 1;
            typed.textContent = phrase.slice(0, charIndex);

            if (charIndex >= phrase.length) {
                deleting = true;
                window.setTimeout(typeLoop, 1900);
                return;
            }

            window.setTimeout(typeLoop, 52 + Math.random() * 46);
        } else {
            charIndex -= 1;
            typed.textContent = phrase.slice(0, charIndex);

            if (charIndex <= 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                window.setTimeout(typeLoop, 380);
                return;
            }

            window.setTimeout(typeLoop, 26);
        }
    }

    function startTyping() {
        if (typingStarted || !typed) return;
        typingStarted = true;

        if (reduceMotion) {
            typed.textContent = phrases[0];
            return;
        }

        typed.textContent = '';
        window.setTimeout(typeLoop, 320);
    }

    /* ---------------- scroll reveal ---------------- */

    var revealItems = Array.prototype.slice.call(doc.querySelectorAll('[data-reveal]'));
    var revealStarted = false;

    function startReveal() {
        if (revealStarted) return;
        revealStarted = true;

        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealItems.forEach(function (el) { el.classList.add('is-in'); });
        } else {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                });
            }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

            revealItems.forEach(function (el) { io.observe(el); });
        }

        startTyping();
    }

    doc.addEventListener('portfolio:reveal', startReveal);

    // Resume path: the intro already finished earlier in this page load.
    if (root.classList.contains('intro-finished')) startReveal();
})();
