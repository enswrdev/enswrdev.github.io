/* ============================================================
   enswr.dev — portfolio behaviour
   Nav, scroll spy, reveal, typing, clock, back-to-top and the
   live GitHub numbers in the hero terminal.
   Nothing here touches the intro's canvas or timing.
   ============================================================ */

(function () {
    'use strict';

    var doc = document;
    var root = doc.documentElement;
    var site = doc.getElementById('site');
    if (!site) return;

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    function t(key, fallback) {
        if (window.I18N && typeof window.I18N.t === 'function') {
            var value = window.I18N.t(key);
            if (value !== undefined && value !== key) return value;
        }
        return fallback;
    }

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

    var sections = ['home', 'projects', 'about', 'stack', 'social']
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

    /* ---------------- live GitHub numbers ---------------- */

    var GITHUB_USER = 'enswrdev';
    var SITE_REPO = 'enswrdev.github.io';
    var GH_CACHE_KEY = 'enswr.gh.v1';
    var GH_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

    var ghProjects = doc.getElementById('ghProjects');
    var ghStack = doc.getElementById('ghStack');

    function renderStats(repos) {
        if (!Array.isArray(repos) || !repos.length) return;

        var own = repos.filter(function (repo) {
            if (!repo || repo.fork || repo.archived) return false;
            return String(repo.name).toLowerCase() !== SITE_REPO;
        });

        if (own.length && ghProjects) ghProjects.textContent = String(own.length);

        var counts = {};
        own.forEach(function (repo) {
            if (!repo.language) return;
            counts[repo.language] = (counts[repo.language] || 0) + 1;
        });

        var langs = Object.keys(counts)
            .sort(function (a, b) {
                return counts[b] - counts[a] || a.localeCompare(b);
            })
            .slice(0, 3)
            .map(function (lang) { return lang.toLowerCase(); });

        if (langs.length && ghStack) ghStack.textContent = langs.join(', ');
    }

    function loadGithubStats() {
        var cached = null;
        try {
            cached = JSON.parse(sessionStorage.getItem(GH_CACHE_KEY) || 'null');
        } catch (e) {
            cached = null;
        }

        if (cached && cached.repos && (Date.now() - cached.t) < GH_CACHE_TTL) {
            renderStats(cached.repos);
            return;
        }

        if (!window.fetch) return;

        fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=100&sort=pushed', {
            headers: { Accept: 'application/vnd.github+json' }
        })
            .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
            .then(function (data) {
                if (!Array.isArray(data)) return;
                renderStats(data);
                try {
                    sessionStorage.setItem(GH_CACHE_KEY, JSON.stringify({ t: Date.now(), repos: data }));
                } catch (e) {}
            })
            .catch(function () {
                /* keep the static fallback already in the markup */
            });
    }

    loadGithubStats();

    /* ---------------- NexusPatch total installs (Greasy Fork) ---------------- */

    var installNode = doc.getElementById('npInstalls');
    var INSTALL_URL = 'https://greasyfork.org/en/scripts/596625-yt-music-nexus-patch';
    var INSTALL_CACHE_KEY = 'enswr.np.v1';

    function setInstallCount(count) {
        if (!installNode || !count) return;
        installNode.textContent = String(count).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function loadInstallCount() {
        if (!installNode || !window.fetch) return;

        var cached = null;
        try { cached = JSON.parse(sessionStorage.getItem(INSTALL_CACHE_KEY) || 'null'); } catch (e) { cached = null; }

        if (cached && cached.n && (Date.now() - cached.t) < 6 * 60 * 60 * 1000) {
            setInstallCount(cached.n);
            return;
        }

        fetch(INSTALL_URL)
            .then(function (res) { return res.ok ? res.text() : Promise.reject(res.status); })
            .then(function (html) {
                var match = html.match(/script-show-total-installs[\s\S]{0,200}?<span>([\d.,]+)<\/span>/);
                if (!match) return;
                var count = parseInt(match[1].replace(/[^\d]/g, ''), 10);
                if (!count) return;
                setInstallCount(count);
                try { sessionStorage.setItem(INSTALL_CACHE_KEY, JSON.stringify({ t: Date.now(), n: count })); } catch (e) {}
            })
            .catch(function () {
                /* the markup already shows the last known number */
            });
    }

    loadInstallCount();

    /* ---------------- project cards -> detail page ---------------- */

    Array.prototype.forEach.call(doc.querySelectorAll('[data-project]'), function (card) {
        card.addEventListener('click', function (e) {
            if (e.target && e.target.closest && e.target.closest('a, button')) return;
            if (window.getSelection && String(window.getSelection())) return;

            var id = card.getAttribute('data-project');
            if (id) window.location.href = 'project.html?p=' + encodeURIComponent(id);
        });
    });

    /* ---------------- Greasy Fork link follows country / browser language ---------------- */

    var gfLink = doc.getElementById('npGreasyfork');

    function setGreasyForkHref() {
        if (!gfLink) return;
        var locale = window.I18N && window.I18N.greasyForkLocale ? window.I18N.greasyForkLocale : 'en';
        gfLink.href = 'https://greasyfork.org/' + locale + '/scripts/596625-yt-music-nexus-patch';
    }

    setGreasyForkHref();
    doc.addEventListener('portfolio:locale', setGreasyForkHref);

    /* ---------------- cursor spotlight ---------------- */

    var spotlight = doc.querySelector('.spotlight');
    if (spotlight && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        var sx = 0;
        var sy = 0;
        var spotlightQueued = false;

        window.addEventListener('pointermove', function (e) {
            sx = e.clientX;
            sy = e.clientY;
            spotlight.classList.add('is-on');

            if (spotlightQueued) return;
            spotlightQueued = true;

            window.requestAnimationFrame(function () {
                root.style.setProperty('--sx', sx + 'px');
                root.style.setProperty('--sy', sy + 'px');
                spotlightQueued = false;
            });
        }, { passive: true });

        doc.addEventListener('mouseleave', function () {
            spotlight.classList.remove('is-on');
        });
    }

    /* ---------------- hero typing effect ---------------- */

    var typed = doc.getElementById('typed');
    var phrases = [];
    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var typingStarted = false;
    var typeTimer = null;

    function readPhrases() {
        var list = window.I18N ? window.I18N.t('typing') : null;
        return Array.isArray(list) && list.length ? list : ['Developer & Creator.'];
    }

    function schedule(fn, ms) {
        typeTimer = window.setTimeout(fn, ms);
    }

    function typeLoop() {
        if (!typed) return;

        var phrase = phrases[phraseIndex];

        if (!deleting) {
            charIndex += 1;
            typed.textContent = phrase.slice(0, charIndex);

            if (charIndex >= phrase.length) {
                deleting = true;
                schedule(typeLoop, 1900);
                return;
            }

            schedule(typeLoop, 52 + Math.random() * 46);
        } else {
            charIndex -= 1;
            typed.textContent = phrase.slice(0, charIndex);

            if (charIndex <= 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                schedule(typeLoop, 380);
                return;
            }

            schedule(typeLoop, 26);
        }
    }

    function startTyping() {
        if (typingStarted || !typed) return;
        typingStarted = true;
        phrases = readPhrases();

        if (reduceMotion) {
            typed.textContent = phrases[0];
            return;
        }

        typed.textContent = '';
        schedule(typeLoop, 320);
    }

    /* ---------------- easter egg: type "enswr" ---------------- */

    var eggWord = 'enswr';
    var eggBuffer = '';
    var eggFound = false;

    doc.addEventListener('keydown', function (e) {
        if (eggFound || e.ctrlKey || e.metaKey || e.altKey) return;

        var el = e.target;
        var tag = el && el.tagName ? el.tagName.toLowerCase() : '';
        if (tag === 'input' || tag === 'textarea' || (el && el.isContentEditable)) return;
        if (!e.key || e.key.length !== 1) return;

        eggBuffer = (eggBuffer + e.key.toLowerCase()).slice(-eggWord.length);
        if (eggBuffer !== eggWord) return;

        var body = doc.querySelector('.terminal__body');
        if (!body) return;

        eggFound = true;

        var line = doc.createElement('p');
        line.className = 't-green';
        line.setAttribute('data-i18n', 'egg.line');
        line.textContent = t('egg.line');
        body.appendChild(line);
    });

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

    /* ---------------- language changes ---------------- */

    doc.addEventListener('portfolio:lang', function () {
        if (!typingStarted) return;

        phrases = readPhrases();
        phraseIndex = 0;
        charIndex = 0;
        deleting = false;

        if (typeTimer) window.clearTimeout(typeTimer);

        if (reduceMotion || !typed) {
            if (typed) typed.textContent = phrases[0];
            return;
        }

        typed.textContent = '';
        schedule(typeLoop, 240);
    });

    // Resume path: the intro already finished earlier in this page load.
    if (root.classList.contains('intro-finished')) startReveal();
})();
