/* ============================================================
   INTRO BRIDGE
   ------------------------------------------------------------
   script.js is untouched. This file only watches the original
   intro and, once startMatrix() has put the rain on screen,
   reveals the portfolio above the SAME canvas — so the rain
   never restarts, it just becomes the site background.
   ============================================================ */

(function () {
    'use strict';

    var root = document.documentElement;
    var body = document.body;
    var matrixScreen = document.getElementById('matrix-screen');
    var site = document.getElementById('site');

    if (!matrixScreen || !site) return;

    // If the intro already ran during this page load, never replay it.
    if (root.classList.contains('intro-finished')) {
        root.classList.add('intro-instant');
        revealPortfolio(true);
        return;
    }

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    // Let the rain establish itself before the UI fades in over it.
    var HOLD_MS = reduceMotion ? 250 : 1900;
    var revealed = false;
    var poll = null;
    var observer = null;
    var holdTimer = null;

    function revealPortfolio(instant) {
        if (revealed) return;
        revealed = true;

        if (holdTimer) window.clearTimeout(holdTimer);
        if (poll) window.clearInterval(poll);
        if (observer) observer.disconnect();

        root.classList.add('intro-finished');
        body.classList.add('portfolio-visible');

        if (instant) root.classList.add('intro-instant');

        site.removeAttribute('aria-hidden');

        // Announce the stage change to portfolio.js (scroll reveal, typing).
        var evt;
        try {
            evt = new CustomEvent('portfolio:reveal');
        } catch (err) {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('portfolio:reveal', false, false, null);
        }
        document.dispatchEvent(evt);
    }

    function matrixStarted() {
        if (revealed) return;
        holdTimer = window.setTimeout(revealPortfolio, HOLD_MS);
    }

    /* -------- detect the exact moment script.js reveals the matrix -------- */

    if (matrixScreen.style.display === 'block') {
        matrixStarted();
        return;
    }

    observer = new MutationObserver(function () {
        if (matrixScreen.style.display === 'block') {
            observer.disconnect();
            observer = null;
            matrixStarted();
        }
    });

    observer.observe(matrixScreen, { attributes: true, attributeFilter: ['style', 'class'] });

    // Safety net in case the attribute is applied differently.
    poll = window.setInterval(function () {
        if (window.getComputedStyle(matrixScreen).display !== 'none') {
            window.clearInterval(poll);
            poll = null;
            matrixStarted();
        }
    }, 200);

    // Absolute fallback: the portfolio can never stay locked out.
    window.setTimeout(function () { revealPortfolio(false); }, 45000);
})();
