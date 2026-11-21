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
    var country = '';
    var browserLang = String(navigator.language || navigator.userLanguage || 'en');

    /* Greasy Fork serves the same script under locale paths (/es/, /tr/…).
       Country and browser language decide which one a visitor lands on. */
    var GF_LOCALES = 'en ar bg ca cs da de el es fa fi fr he hr hu id it ja ko nb nl pl pt ro ru sk sl sr sv th tr uk vi zh-CN zh-TW'.split(' ');
    var COUNTRY_LOCALE = {
        TR: 'tr', ES: 'es', DE: 'de', FR: 'fr', IT: 'it', RU: 'ru',
        JP: 'ja', KR: 'ko', CN: 'zh-CN', TW: 'zh-TW', HK: 'zh-TW',
        BR: 'pt', PT: 'pt', NL: 'nl', PL: 'pl', SE: 'sv', NO: 'nb',
        DK: 'da', FI: 'fi', CZ: 'cs', SK: 'sk', HU: 'hu', RO: 'ro',
        GR: 'el', IL: 'he', SA: 'ar', AE: 'ar', EG: 'ar', IR: 'fa',
        ID: 'id', TH: 'th', VN: 'vi', UA: 'uk', BG: 'bg', HR: 'hr',
        RS: 'sr', SI: 'sl', MX: 'es', AR: 'es', CL: 'es', CO: 'es', PE: 'es'
    };

    function greasyForkLocale() {
        var raw = browserLang.replace('_', '-').toLowerCase();
        var base = raw.split('-')[0];
        var browser = base === 'zh'
            ? (/(tw|hk|mo)/.test(raw) ? 'zh-TW' : 'zh-CN')
            : (base === 'no' ? 'nb' : base);
        var byCountry = COUNTRY_LOCALE[country] || '';

        if (browser && browser !== 'en' && GF_LOCALES.indexOf(browser) !== -1) return browser;
        if (byCountry) return byCountry;
        return GF_LOCALES.indexOf(browser) !== -1 ? browser : 'en';
    }

    var DICT = {
        en: {
            'meta.title': 'enswr.dev — software developer',
            'meta.desc': 'enswr.dev — the portfolio of Ensar: userscripts, Python tools and small independent projects, built to be used.',

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
            'hero.title': 'I\'m <span class="grad">Ensar</span>.<span class="hero__title-sub">I build software.</span>',
            'hero.lede': 'From idea to code. From code to product.',
            'hero.github': 'GitHub',
            'hero.explore': 'View projects',
            'hero.contact': 'Get in touch',
            'hero.status': 'Open to new projects',
            'hero.clock': 'local time',
            'hero.scroll': 'scroll',

            'typing': ['Userscripts, Python tools, small experiments.', 'Built to solve one real problem.', 'Shipped, documented, still in use.'],

            'egg.line': 'you typed enswr — thanks for reading the code.',

            'term.status': 'status',
            'term.intro': 'intro',
            'term.matrix': 'matrix running',
            'term.projects': 'projects',
            'term.public': 'public',
            'term.stack': 'stack',

            'projects.label': '01 — selected work',
            'projects.title': 'Projects',
            'projects.sub': 'Open-source tools I build, ship and maintain. Each link goes to its real repository.',
            'project.featured': 'Featured',
            'project.github': 'View on GitHub',
            'project.details': 'Details',

            'detail.back': 'All projects',
            'detail.features': 'Features',
            'detail.install': 'Installation',
            'detail.readme': 'README — short version',
            'detail.fullReadme': 'Full README on GitHub',
            'detail.platforms': 'Supported platforms',
            'detail.info': 'Project details',
            'detail.next': 'Next project',
            'detail.notFound': 'Project not found',
            'detail.notFoundText': 'That project link does not exist. Head back to the project list and pick one.',

            'np.label': 'userscript · javascript',
            'np.word': 'Nexus<br>Patch',
            'np.meta': 'one nexus · two platforms',
            'np.corner': 'featured',
            'np.desc': 'A single-file userscript that gives YouTube and YouTube Music a cleaner, more consistent interface: custom branding, light cosmetic ad filtering and fewer distractions. No configuration needed.',
            'np.p1': 'Custom branding across both platforms, with light and dark theme support',
            'np.p2': 'CSS-based cosmetic filtering and dynamic DOM cleanup of promotional elements',
            'np.p3': 'MutationObserver keeps changes applied through YouTube\'s single-page navigation',
            'np.p4': 'Automatic updates through the userscript manager\'s update source',
            'np.installs': 'total installs',

            'siren.badge': 'python · desktop',
            'siren.desc': 'A configurable siren and flash controller for roleplay and simulation setups. Three sound modes, keyboard controls, alternating flash frames and live theme switching.',
            'siren.p1': 'ARMAS, CSR and ZER modes with siren, horn and extended siren controls',
            'siren.p2': 'Left / right flash system with a fullscreen icon overlay',
            'siren.p3': 'First-run setup saves theme, language and media folder to a config file',
            'siren.p4': 'Ships as a ready-to-run Windows build; source runs on Python 3.10–3.12',

            'pong.badge': 'python · computer vision',
            'pong.desc': 'A real-time computer-vision bot for the Instagram DM ping-pong minigame, run on Windows through Scrcpy. HSV tracking and trajectory prediction drive the paddle; a local virtual wall covers latency and dropped frames.',
            'pong.p1': 'Red-ball HSV mask with trajectory and wall-reflection prediction',
            'pong.p2': 'Hybrid local wall sweeps ±30 px at ~1 ms to widen paddle coverage',
            'pong.p3': 'Win32 mouse automation drags the paddle without manual clicks',
            'pong.p4': 'Live OpenCV HUD for centroids, impact markers and shield bounds',

            'about.label': '02 — about',
            'about.title': 'About',
            'about.lead': 'I\'m Ensar. I study computer engineering and build my own software.',
            'about.text': 'Most projects start with a problem in my own workflow: an interface that could be cleaner, a tool that needs better feedback, a game that needs a better paddle. I take them from first experiment to something others can install and use.',
            'about.tag1': 'Software developer',
            'about.tag2': 'Independent projects',
            'about.tag3': 'Build & ship',

            'who.role': 'role',
            'who.roleValue': 'software developer',
            'who.status': 'status',
            'who.statusValue': 'student',
            'who.study': 'study',
            'who.studyValue': 'computer engineering',
            'who.english': 'english',
            'who.englishValue': '> B2',
            'who.focus': 'focus',
            'who.focusValue': 'userscripts · python tools',
            'who.approach': 'approach',
            'who.approachValue': 'write, test, ship',
            'who.source': 'source',

            'stack.label': '03 — toolbox',
            'stack.title': 'Tech stack',
            'stack.sub': 'Only what shows up in the repositories above — nothing assumed.',
            'stack.languages': 'Languages',
            'stack.libraries': 'Libraries',
            'stack.tools': 'Tools & platforms',

            'social.label': '04 — contact',
            'social.title': 'Social',
            'social.sub': 'Where I share work and answer questions. WhatsApp is the fastest way to reach me.',
            'social.igDesc': 'Photos, stories and behind the scenes.',
            'social.waDesc': 'Direct message — usually the fastest reply.',
            'social.thDesc': 'Short thoughts and daily updates.',
            'social.xDesc': 'Dev notes and quick updates.',

            'contact.title': 'Questions?',
            'contact.text': 'For a question about a project, an idea or anything else, message me directly on WhatsApp.',
            'contact.cta': 'Message on WhatsApp',
            'wa.prefill': 'Hi! I\'m coming from enswrdev.github.io.',
            'wa.fab': 'Message me on WhatsApp',

            'footer.text': 'software developer · independent projects',
            'footer.top': 'Back to top'
        },

        tr: {
            'meta.title': 'enswr.dev — yazılım geliştirici',
            'meta.desc': 'enswr.dev — Ensar\'ın portfolyosu: userscript\'ler, Python araçları ve kullanılmak üzere geliştirilen küçük bağımsız projeler.',

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
            'hero.title': 'Ben <span class="grad">Ensar</span>.<span class="hero__title-sub">Yazılım geliştiriyorum.</span>',
            'hero.lede': 'Fikirden koda. Koddan ürüne.',
            'hero.github': 'GitHub',
            'hero.explore': 'Projeleri gör',
            'hero.contact': 'İletişime geç',
            'hero.status': 'Yeni projelere açık',
            'hero.clock': 'yerel saat',
            'hero.scroll': 'kaydır',

            'typing': ['Userscript\'ler, Python araçları, küçük denemeler.', 'Tek bir gerçek sorunu çözmek için.', 'Yayınlandı, belgelendi, hâlâ kullanımda.'],

            'egg.line': 'enswr yazdın — kodu okuduğun için teşekkürler.',

            'term.status': 'status',
            'term.intro': 'intro',
            'term.matrix': 'matrix çalışıyor',
            'term.projects': 'projeler',
            'term.public': 'herkese açık',
            'term.stack': 'stack',

            'projects.label': '01 — seçili işler',
            'projects.title': 'Projeler',
            'projects.sub': 'Açık kaynak olarak geliştirdiğim, yayınladığım ve bakımını sürdürdüğüm araçlar. Her bağlantı doğrudan depoya gider.',
            'project.featured': 'Öne çıkan',
            'project.github': 'GitHub\'da gör',
            'project.details': 'Detaylar',

            'detail.back': 'Tüm projeler',
            'detail.features': 'Özellikler',
            'detail.install': 'Kurulum',
            'detail.readme': 'README — kısa sürüm',
            'detail.fullReadme': 'GitHub\'da tam README',
            'detail.platforms': 'Desteklenen platformlar',
            'detail.info': 'Proje bilgileri',
            'detail.next': 'Sonraki proje',
            'detail.notFound': 'Proje bulunamadı',
            'detail.notFoundText': 'Bu proje bağlantısı mevcut değil. Proje listesine dönüp birini seçebilirsin.',

            'np.label': 'userscript · javascript',
            'np.word': 'Nexus<br>Patch',
            'np.meta': 'tek nexus · iki platform',
            'np.corner': 'öne çıkan',
            'np.desc': 'YouTube ve YouTube Music\'e daha temiz ve tutarlı bir arayüz kazandıran tek dosyalık bir userscript: özel markalama, hafif kozmetik reklam filtreleme ve daha az dikkat dağıtıcı öğe. Yapılandırma gerekmez.',
            'np.p1': 'Her iki platformda özel markalama, açık ve koyu tema desteği',
            'np.p2': 'CSS tabanlı kozmetik filtreleme ve promosyon öğelerinin dinamik DOM temizliği',
            'np.p3': 'MutationObserver, YouTube\'un tek sayfa gezinmesinde değişiklikleri korur',
            'np.p4': 'Userscript yöneticisinin güncelleme kaynağı üzerinden otomatik güncelleme',
            'np.installs': 'toplam kurulum',

            'siren.badge': 'python · masaüstü',
            'siren.desc': 'Roleplay ve simülasyon kurulumları için yapılandırılabilir siren ve çakar denetleyicisi. Üç ses modu, klavye kontrolleri, dönüşümlü çakar kareleri ve canlı tema değiştirme.',
            'siren.p1': 'ARMAS, CSR ve ZER modları; siren, korna ve uzatılmış siren kontrolleri',
            'siren.p2': 'Sol / sağ çakar sistemi ve tam ekran simge katmanı',
            'siren.p3': 'İlk açılış kurulumu tema, dil ve medya klasörünü bir yapılandırma dosyasına kaydeder',
            'siren.p4': 'Çalışmaya hazır Windows derlemesi olarak gelir; kaynak kodu Python 3.10–3.12\'de çalışır',

            'pong.badge': 'python · bilgisayarlı gör',
            'pong.desc': 'Instagram DM ping-pong mini oyunu için gerçek zamanlı bilgisayarlı gör botu; Windows\'ta Scrcpy üzerinden çalışır. HSV takibi ve yörünge tahmini raketi sürer, yerel bir sanal duvar gecikmeyi ve kare kaybını telafi eder.',
            'pong.p1': 'Kırmızı top için HSV maskesi, yörünge ve duvar yansıması tahmini',
            'pong.p2': 'Hibrit yerel duvar, raket kapsama alanını genişletmek için ±30 px\'te ~1 ms tarama yapar',
            'pong.p3': 'Win32 fare otomasyonu raketi elle tıklama olmadan sürükler',
            'pong.p4': 'Merkezler, çarpma işaretleri ve kalkan sınırları için canlı OpenCV HUD\'u',

            'about.label': '02 — hakkımda',
            'about.title': 'Hakkımda',
            'about.lead': 'Ben Ensar. Bilgisayar mühendisliği okuyor, kendi yazılımlarımı geliştiriyorum.',
            'about.text': 'Projelerimin çoğu kendi iş akışımdaki bir sorunla başlıyor: daha temiz olabilecek bir arayüz, daha iyi geri bildirim gerektiren bir araç, daha iyi bir raket gerektiren bir oyun. Hepsini ilk denemeden başkalarının kurup kullanabildiği bir noktaya kadar götürüyorum.',
            'about.tag1': 'Yazılım geliştirici',
            'about.tag2': 'Bağımsız projeler',
            'about.tag3': 'Geliştir ve yayınla',

            'who.role': 'rol',
            'who.roleValue': 'yazılım geliştirici',
            'who.status': 'durum',
            'who.statusValue': 'öğrenci',
            'who.study': 'bölüm',
            'who.studyValue': 'bilgisayar mühendisliği',
            'who.english': 'ingilizce',
            'who.englishValue': '> B2',
            'who.focus': 'odak',
            'who.focusValue': 'userscripts · python araçları',
            'who.approach': 'yaklaşım',
            'who.approachValue': 'yaz, test et, yayınla',
            'who.source': 'kaynak',

            'stack.label': '03 — araç kutusu',
            'stack.title': 'Teknoloji yığını',
            'stack.sub': 'Sadece yukarıdaki depolarda görünenler — varsayım yok.',
            'stack.languages': 'Diller',
            'stack.libraries': 'Kütüphaneler',
            'stack.tools': 'Araçlar ve platformlar',

            'social.label': '04 — iletişim',
            'social.title': 'Sosyal',
            'social.sub': 'Ürettiklerimi paylaştığım ve soruları yanıtladığım yerler. Bana ulaşmanın en hızlı yolu WhatsApp.',
            'social.igDesc': 'Fotoğraflar, hikâyeler ve kamera arkası.',
            'social.waDesc': 'Doğrudan mesaj — genelde en hızlı yanıt.',
            'social.thDesc': 'Kısa düşünceler ve günlük paylaşımlar.',
            'social.xDesc': 'Geliştirici notları ve hızlı güncellemeler.',

            'contact.title': 'Sorularınız mı var?',
            'contact.text': 'Bir proje, bir fikir ya da başka bir konu hakkında sormak istediğiniz olursa WhatsApp üzerinden doğrudan yazabilirsiniz.',
            'contact.cta': 'WhatsApp\'tan yaz',
            'wa.prefill': 'Merhaba! enswrdev.github.io adresinden geliyorum.',
            'wa.fab': 'WhatsApp\'tan yaz',

            'footer.text': 'yazılım geliştirici · bağımsız projeler',
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

    var settled = false;

    function settle(lang) {
        if (settled || manualPick || startLang) return;
        settled = true;
        if (lang !== current) setLang(lang, false);
    }

    function announceLocale() {
        var evt;
        try {
            evt = new CustomEvent('portfolio:locale', { detail: { country: country, greasyfork: greasyForkLocale() } });
        } catch (err) {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('portfolio:locale', false, false, { country: country, greasyfork: greasyForkLocale() });
        }
        document.dispatchEvent(evt);
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
                country = String((data && data.country) || '').toUpperCase();
                settle(country === 'TR' ? 'tr' : 'en');
                announceLocale();
            })
            .catch(function () {
                if (timer) window.clearTimeout(timer);
                settle(browserGuess());
                announceLocale();
            });
    } catch (e) {
        settle(browserGuess());
    }

    window.I18N = {
        t: t,
        setLang: setLang,
        get lang() { return current; },
        get country() { return country; },
        get browserLang() { return browserLang; },
        get greasyForkLocale() { return greasyForkLocale(); }
    };
})();
