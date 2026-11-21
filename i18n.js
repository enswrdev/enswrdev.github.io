/* ============================================================
   enswr.dev — language layer (EN / TR)
   ------------------------------------------------------------
   Order of resolution:
     1. saved choice in localStorage
     2. IP country (TR → Turkish, everything else → English)
     3. browser language, if the IP lookup fails
   ============================================================ */

(function () {
    'use strict';

    /* WhatsApp deep link. wa.me only accepts an international phone
       number (digits, no + or spaces), e.g. https://wa.me/905551112233 */
    var WHATSAPP_BASE = 'https://wa.me/enswr';

    var STORAGE_KEY = 'enswr.lang';

    var current = 'en';
    var manualPick = false;

    var DICT = {
        en: {
            'meta.title': 'enswr.dev — Developer Portfolio',
            'meta.desc': 'enswr.dev — the portfolio of Ensar, a developer and creator building userscripts, Python tools and experimental projects like YT NexusPatch, Siren Flash App and Insta Ping Pong Bot.',

            'skip.intro': 'Skip intro',
            'skip.content': 'Skip to content',
            'lang.label': 'Language',

            'nav.aria': 'Primary',
            'nav.home': 'Home',
            'nav.projects': 'Projects',
            'nav.about': 'About',
            'nav.stack': 'Stack',
            'nav.social': 'Social',
            'nav.github': 'GitHub',
            'nav.menu': 'Toggle navigation menu',

            'hero.eyebrow': 'portfolio',
            'hero.title': 'Hey, I\'m <span class="grad">Ensar</span>.',
            'hero.lede': 'Building creative projects, useful tools and exploring the digital world.',
            'hero.github': 'GitHub profile',
            'hero.explore': 'Explore projects',
            'hero.status': 'Available for new projects',
            'hero.clock': 'local time',
            'hero.scroll': 'scroll',

            'typing': ['Developer & Creator.', 'Building useful tools.', 'Exploring the digital world.'],

            'term.status': 'status',
            'term.intro': 'intro',
            'term.matrix': 'matrix running',
            'term.projects': 'projects',
            'term.public': 'public',
            'term.stack': 'stack',

            'projects.label': '01 — selected work',
            'projects.title': 'Projects',
            'projects.sub': 'Tools I build, ship and keep maintaining. Everything below links to its real repository.',
            'project.featured': 'Featured',
            'project.github': 'View on GitHub',

            'np.label': 'userscript · javascript',
            'np.word': 'Nexus<br>Patch',
            'np.meta': 'one nexus · two platforms',
            'np.corner': 'featured',
            'np.desc': 'A single-file userscript that gives YouTube and YouTube Music a cleaner, unified experience: Premium-inspired custom branding, lightweight cosmetic ad filtering and a tidier interface — no manual configuration required.',
            'np.p1': 'Custom branding across both platforms, with light and dark theme support',
            'np.p2': 'CSS-based cosmetic filtering and dynamic DOM cleanup of promotional elements',
            'np.p3': 'MutationObserver keeps changes applied through YouTube\'s single-page navigation',
            'np.p4': 'Automatic updates through the userscript manager\'s update source',

            'siren.badge': 'python · desktop',
            'siren.desc': 'A customizable police / EMS siren and flash controller for roleplay, simulation setups and emergency-signaling demos. Three sound modes, keyboard-driven sirens, alternating flash frames and live theme switching.',
            'siren.p1': 'ARMAS, CSR and ZER modes with siren, horn and extended siren controls',
            'siren.p2': 'Left / right flash system with a fullscreen icon overlay',
            'siren.p3': 'First-run setup saves theme, language and media folder to a config file',
            'siren.p4': 'Ships as a ready-to-run Windows build; source runs on Python 3.10–3.12',

            'pong.badge': 'python · computer vision',
            'pong.desc': 'A real-time computer-vision bot for the Instagram DM ping-pong minigame, mirrored on Windows through Scrcpy. HSV colour tracking and trajectory prediction drive the paddle, with a local virtual wall compensating for latency and dropped frames.',
            'pong.p1': 'Red-ball HSV mask with trajectory and wall-reflection prediction',
            'pong.p2': 'Hybrid local wall sweeps ±30 px at ~1 ms to widen paddle coverage',
            'pong.p3': 'Win32 mouse automation drags the paddle without manual clicks',
            'pong.p4': 'Live OpenCV HUD for centroids, impact markers and shield bounds',

            'about.label': '02 — about',
            'about.title': 'About',
            'about.lead': 'I\'m Ensar — a developer and creator who likes turning small frustrations into tools that actually work.',
            'about.text': 'Most of what I build starts with a problem in my own workflow: an interface that could be cleaner, a controller that needs better feedback, a minigame that needs a better paddle. I like the whole loop — from the first experiment to something other people can install and use.',
            'about.tag1': 'Developer & Creator',
            'about.tag2': 'Technology enthusiast',
            'about.tag3': 'Project builder',

            'who.role': 'role',
            'who.roleValue': 'developer & creator',
            'who.status': 'status',
            'who.statusValue': 'student',
            'who.study': 'study',
            'who.studyValue': 'computer engineering',
            'who.english': 'english',
            'who.englishValue': '> B2',
            'who.focus': 'focus',
            'who.focusValue': 'userscripts · python tools',
            'who.approach': 'approach',
            'who.approachValue': 'build it, test it, ship it',
            'who.source': 'source',

            'stack.label': '03 — toolbox',
            'stack.title': 'Tech stack',
            'stack.sub': 'Only what shows up in the repositories above — nothing assumed.',
            'stack.languages': 'Languages',
            'stack.libraries': 'Libraries',
            'stack.tools': 'Tools & platforms',

            'social.label': '04 — contact',
            'social.title': 'Social',
            'social.sub': 'Where I post, build in public and answer questions. WhatsApp is the fastest way to reach me.',
            'social.igDesc': 'Photos, stories and behind the scenes.',
            'social.waDesc': 'Direct message — usually the fastest reply.',
            'social.thDesc': 'Short thoughts and daily updates.',
            'social.xDesc': 'Dev notes and quick updates.',

            'contact.title': 'Got a question?',
            'contact.text': 'If you want to ask me something — about a project, an idea or anything else — you can reach me directly on WhatsApp.',
            'contact.cta': 'Message on WhatsApp',
            'wa.prefill': 'Hi! I\'m coming from enswrdev.github.io.',
            'wa.fab': 'Message me on WhatsApp',

            'footer.text': 'developer & creator — built with intent',
            'footer.top': 'Back to top'
        },

        tr: {
            'meta.title': 'enswr.dev — Geliştirici Portfolyosu',
            'meta.desc': 'enswr.dev — userscript, Python aracı ve deneysel projeler geliştiren Ensar\'ın portfolyosu: YT NexusPatch, Siren Flash App ve Insta Ping Pong Bot.',

            'skip.intro': 'Girişi atla',
            'skip.content': 'İçeriğe geç',
            'lang.label': 'Dil',

            'nav.aria': 'Ana menü',
            'nav.home': 'Ana Sayfa',
            'nav.projects': 'Projeler',
            'nav.about': 'Hakkımda',
            'nav.stack': 'Teknolojiler',
            'nav.social': 'Sosyal',
            'nav.github': 'GitHub',
            'nav.menu': 'Menüyü aç / kapat',

            'hero.eyebrow': 'portfolyo',
            'hero.title': 'Selam, ben <span class="grad">Ensar</span>.',
            'hero.lede': 'Yaratıcı projeler geliştiriyor, işe yarayan araçlar yapıyor ve dijital dünyayı keşfediyorum.',
            'hero.github': 'GitHub profili',
            'hero.explore': 'Projelere göz at',
            'hero.status': 'Yeni projelere açık',
            'hero.clock': 'yerel saat',
            'hero.scroll': 'kaydır',

            'typing': ['Geliştirici & Üretici.', 'İşe yarayan araçlar yapıyorum.', 'Dijital dünyayı keşfediyorum.'],

            'term.status': 'status',
            'term.intro': 'intro',
            'term.matrix': 'matrix çalışıyor',
            'term.projects': 'projeler',
            'term.public': 'herkese açık',
            'term.stack': 'stack',

            'projects.label': '01 — seçili işler',
            'projects.title': 'Projeler',
            'projects.sub': 'Geliştirdiğim, yayınladığım ve bakımını sürdürdüğüm araçlar. Aşağıdaki her bağlantı gerçek deposuna gider.',
            'project.featured': 'Öne çıkan',
            'project.github': 'GitHub\'da gör',

            'np.label': 'userscript · javascript',
            'np.word': 'Nexus<br>Patch',
            'np.meta': 'tek nexus · iki platform',
            'np.corner': 'öne çıkan',
            'np.desc': 'YouTube ve YouTube Music\'e daha temiz, tek parça bir deneyim kazandıran tek dosyalık bir userscript: Premium\'dan ilham alan özel markalama, hafif kozmetik reklam filtreleme ve daha derli toplu bir arayüz — elle yapılandırma gerekmeden.',
            'np.p1': 'Her iki platformda özel markalama, açık ve koyu tema desteği',
            'np.p2': 'CSS tabanlı kozmetik filtreleme ve promosyon öğelerinin dinamik DOM temizliği',
            'np.p3': 'MutationObserver, YouTube\'un tek sayfa gezinmesinde değişiklikleri korur',
            'np.p4': 'Userscript yöneticisinin güncelleme kaynağı üzerinden otomatik güncelleme',

            'siren.badge': 'python · masaüstü',
            'siren.desc': 'Roleplay, simülasyon kurulumları ve acil durum sinyali demoları için özelleştirilebilir polis / 112 sireni ve çakar denetleyicisi. Üç ses modu, klavyeyle sürülen sirenler, dönüşümlü çakar kareleri ve canlı tema değiştirme.',
            'siren.p1': 'ARMAS, CSR ve ZER modları; siren, korna ve uzatılmış siren kontrolleri',
            'siren.p2': 'Sol / sağ çakar sistemi ve tam ekran simge katmanı',
            'siren.p3': 'İlk açılış kurulumu tema, dil ve medya klasörünü bir yapılandırma dosyasına kaydeder',
            'siren.p4': 'Çalışmaya hazır Windows derlemesi olarak gelir; kaynak kodu Python 3.10–3.12\'de çalışır',

            'pong.badge': 'python · bilgisayarlı gör',
            'pong.desc': 'Instagram DM ping-pong mini oyunu için gerçek zamanlı bilgisayarlı gör botu; Windows\'ta Scrcpy ile yansıtılarak çalışır. HSV renk takibi ve yörünge tahmini raketi sürer, yerel bir sanal duvar gecikmeyi ve kare kaybını telafi eder.',
            'pong.p1': 'Kırmızı top için HSV maskesi, yörünge ve duvar yansıması tahmini',
            'pong.p2': 'Hibrit yerel duvar, raket kapsama alanını genişletmek için ±30 px\'te ~1 ms tarama yapar',
            'pong.p3': 'Win32 fare otomasyonu raketi elle tıklama olmadan sürükler',
            'pong.p4': 'Merkezler, çarpma işaretleri ve kalkan sınırları için canlı OpenCV HUD\'u',

            'about.label': '02 — hakkımda',
            'about.title': 'Hakkımda',
            'about.lead': 'Ben Ensar — küçük can sıkıcı şeyleri gerçekten işe yarayan araçlara çevirmeyi seven bir geliştirici ve üreticiyim.',
            'about.text': 'Ürettiklerimin çoğu kendi iş akışımdaki bir sorunla başlıyor: daha temiz olabilecek bir arayüz, daha iyi geri bildirim gerektiren bir denetleyici, daha iyi bir raket gerektiren bir mini oyun. Bütün döngüyü seviyorum — ilk denemeden başkalarının kurup kullanabileceği bir şeye kadar.',
            'about.tag1': 'Geliştirici & Üretici',
            'about.tag2': 'Teknoloji meraklısı',
            'about.tag3': 'Proje üreticisi',

            'who.role': 'rol',
            'who.roleValue': 'geliştirici & üretici',
            'who.status': 'durum',
            'who.statusValue': 'öğrenci',
            'who.study': 'bölüm',
            'who.studyValue': 'bilgisayar mühendisliği',
            'who.english': 'ingilizce',
            'who.englishValue': '> B2',
            'who.focus': 'odak',
            'who.focusValue': 'userscripts · python araçları',
            'who.approach': 'yaklaşım',
            'who.approachValue': 'yap, test et, yayınla',
            'who.source': 'kaynak',

            'stack.label': '03 — araç kutusu',
            'stack.title': 'Teknoloji yığını',
            'stack.sub': 'Sadece yukarıdaki depolarda görünenler — varsayım yok.',
            'stack.languages': 'Diller',
            'stack.libraries': 'Kütüphaneler',
            'stack.tools': 'Araçlar ve platformlar',

            'social.label': '04 — iletişim',
            'social.title': 'Sosyal',
            'social.sub': 'Paylaştığım, açık şekilde geliştirdiğim ve soruları yanıtladığım yerler. Bana ulaşmanın en hızlı yolu WhatsApp.',
            'social.igDesc': 'Fotoğraflar, hikâyeler ve kamera arkası.',
            'social.waDesc': 'Doğrudan mesaj — genelde en hızlı yanıt.',
            'social.thDesc': 'Kısa düşünceler ve günlük paylaşımlar.',
            'social.xDesc': 'Geliştirici notları ve hızlı güncellemeler.',

            'contact.title': 'Bir sorun mu var?',
            'contact.text': 'Bir proje, bir fikir ya da başka bir şey hakkında bana bir şey sormak istersen WhatsApp üzerinden doğrudan ulaşabilirsin.',
            'contact.cta': 'WhatsApp\'tan yaz',
            'wa.prefill': 'Merhaba! enswrdev.github.io adresinden geliyorum.',
            'wa.fab': 'WhatsApp\'tan yaz',

            'footer.text': 'geliştirici & üretici — özenle yapıldı',
            'footer.top': 'Yukarı dön'
        }
    };

    function t(key) {
        var lang = DICT[current] || DICT.en;
        var value = lang[key];
        if (value === undefined) value = DICT.en[key];
        return value === undefined ? key : value;
    }

    function whatsappUrl() {
        return WHATSAPP_BASE + '?text=' + encodeURIComponent(t('wa.prefill'));
    }

    function apply(lang) {
        current = lang === 'tr' ? 'tr' : 'en';

        document.documentElement.setAttribute('lang', current);
        document.title = t('meta.title');

        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', t('meta.desc'));

        var nodes = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'));
        }

        var htmlNodes = document.querySelectorAll('[data-i18n-html]');
        for (var j = 0; j < htmlNodes.length; j++) {
            htmlNodes[j].innerHTML = t(htmlNodes[j].getAttribute('data-i18n-html'));
        }

        var labels = document.querySelectorAll('[data-i18n-label]');
        for (var k = 0; k < labels.length; k++) {
            labels[k].setAttribute('aria-label', t(labels[k].getAttribute('data-i18n-label')));
        }

        var switches = document.querySelectorAll('[data-lang]');
        for (var s = 0; s < switches.length; s++) {
            var isOn = switches[s].getAttribute('data-lang') === current;
            switches[s].classList.toggle('is-active', isOn);
            switches[s].setAttribute('aria-pressed', isOn ? 'true' : 'false');
        }

        var waLinks = document.querySelectorAll('[data-wa]');
        for (var w = 0; w < waLinks.length; w++) {
            waLinks[w].setAttribute('href', whatsappUrl());
        }

        var evt;
        try {
            evt = new CustomEvent('portfolio:lang', { detail: { lang: current } });
        } catch (err) {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('portfolio:lang', false, false, { lang: current });
        }
        document.dispatchEvent(evt);
    }

    function setLang(lang, save) {
        lang = lang === 'tr' ? 'tr' : 'en';
        if (save !== false) {
            manualPick = true;
            try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
        }
        apply(lang);
    }

    /* ---------------- language switch ---------------- */

    var switches = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < switches.length; i++) {
        switches[i].addEventListener('click', function () {
            setLang(this.getAttribute('data-lang'), true);
        });
    }

    /* ---------------- auto detection ---------------- */

    function stored() {
        try {
            var v = localStorage.getItem(STORAGE_KEY);
            return v === 'tr' || v === 'en' ? v : null;
        } catch (e) {
            return null;
        }
    }

    function browserGuess() {
        var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        return nav.indexOf('tr') === 0 ? 'tr' : 'en';
    }

    var startLang = stored();
    apply(startLang || 'en');

    if (!startLang) {
        var settled = false;

        function settle(lang) {
            if (settled || manualPick) return;
            settled = true;
            if (lang !== current) setLang(lang, false);
        }

        try {
            var controller = window.AbortController ? new AbortController() : null;
            var timer = controller
                ? window.setTimeout(function () { controller.abort(); }, 4500)
                : null;

            fetch('https://get.geojs.io/v1/ip/country.json', controller ? { signal: controller.signal } : {})
                .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
                .then(function (data) {
                    if (timer) window.clearTimeout(timer);
                    var country = String((data && data.country) || '').toUpperCase();
                    settle(country === 'TR' ? 'tr' : 'en');
                })
                .catch(function () {
                    if (timer) window.clearTimeout(timer);
                    settle(browserGuess());
                });
        } catch (e) {
            settle(browserGuess());
        }
    }

    window.I18N = {
        t: t,
        setLang: setLang,
        get lang() { return current; }
    };
})();
