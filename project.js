/* ============================================================
   enswr.dev — project detail page
   Reads ?p=<slug> from the URL, renders the bilingual project
   data below (features, install guide, platforms, short README)
   and re-renders on language change.
   ============================================================ */

(function () {
    'use strict';

    var doc = document;

    var PROJECTS = {
        'yt-nexuspatch': {
            order: '01',
            title: 'YT NexusPatch',
            repo: 'https://github.com/enswrdev/yt-nexuspatch',
            install: '@greasyfork',
            stack: ['JavaScript', 'Userscript', 'CSS', 'MutationObserver', 'GPL-2.0'],
            en: {
                badge: 'userscript · javascript',
                installLabel: 'Install from Greasy Fork',
                tagline: 'One userscript that gives YouTube and YouTube Music a cleaner, more consistent interface.',
                about: 'Custom branding, cosmetic ad filtering and a tidier layout across both platforms. Install it once — it updates itself through your userscript manager and needs no configuration. The project is open source on GitHub under GPL-2.0.',
                features: [
                    'One stylesheet for both platforms: YouTube and YouTube Music share the same visual language, in light and dark themes.',
                    'Cosmetic filtering removes promotional rows, banners and upsell prompts from the DOM.',
                    'A MutationObserver re-applies everything as YouTube swaps pages without a reload.',
                    'Branding is pure CSS — no external assets and no layout reflow.',
                    'Updates arrive through the userscript manager; version 4.2.1 is current.'
                ],
                install: [
                    {
                        title: 'Install a userscript manager',
                        body: 'Tampermonkey or Violentmonkey — both run in every current Chromium browser and in Firefox.',
                        note: 'In Chrome and other Chromium browsers, open the manager on chrome://extensions and enable “Allow user scripts”. Chrome keeps userscripts switched off until you do.',
                        links: [
                            { label: 'Tampermonkey', href: '@tampermonkey', variant: 'primary' },
                            { label: 'Violentmonkey', href: '@violentmonkey' }
                        ]
                    },
                    {
                        title: 'Open the Greasy Fork page',
                        body: 'The script is published there, together with its changelog, version history and source.',
                        links: [{ label: 'Greasy Fork', href: '@greasyfork', variant: 'primary' }]
                    },
                    {
                        title: 'Press Install',
                        body: 'Confirm the prompt in your manager. This button passes the script straight to Tampermonkey.',
                        links: [{ label: 'Install YT NexusPatch', href: '@install', variant: 'primary' }]
                    },
                    {
                        title: 'Check it',
                        body: 'Open YouTube or YouTube Music — the branding is already applied. There is no setup step.',
                        links: [
                            { label: 'YouTube', href: 'https://www.youtube.com/' },
                            { label: 'YouTube Music', href: 'https://music.youtube.com/' }
                        ]
                    }
                ],
                installNote: 'Tampermonkey / Violentmonkey · v4.2.1 · GPL-2.0',
                platforms: [
                    { name: 'Google Chrome', note: 'Tampermonkey / Violentmonkey' },
                    { name: 'Microsoft Edge', note: 'Tampermonkey / Violentmonkey' },
                    { name: 'Mozilla Firefox', note: 'Tampermonkey / Violentmonkey' },
                    { name: 'Brave · Opera', note: 'Chromium-based managers' },
                    { name: 'YouTube Music', note: 'web player' }
                ],
                meta: [
                    { k: 'type', v: 'userscript · single file' },
                    { k: 'licence', v: 'GPL-2.0' },
                    { k: 'source', v: 'open source' },
                    { k: 'version', v: '4.2.1' },
                    { k: 'repo', v: 'enswrdev/yt-nexuspatch' }
                ],
                readme: [
                    { h: 'What it is', p: 'YT NexusPatch is a single userscript that restyles YouTube and YouTube Music. It ships as one file, injects its own CSS and cleans up promotional elements as the page changes.' },
                    { h: 'How it works', p: 'The script adds a stylesheet on load and watches the DOM with a MutationObserver. When YouTube swaps views through its single-page navigation, the observer re-applies the changes, so nothing disappears after the first click.' },
                    { h: 'Installing', p: 'Install Tampermonkey or Violentmonkey, open the Greasy Fork page and press Install. Updates are delivered by the manager — no manual reinstall.' },
                    { h: 'Compatibility and licence', p: 'Works in current Chromium and Firefox builds with an active userscript manager. Open source under GPL-2.0; the source lives on GitHub.' }
                ]
            },
            tr: {
                badge: 'userscript · javascript',
                installLabel: 'Greasy Fork\'tan kur',
                tagline: 'YouTube ve YouTube Music\'e daha temiz, daha tutarlı bir arayüz kazandıran tek userscript.',
                about: 'Her iki platformda özel markalama, kozmetik reklam filtreleme ve daha düzenli bir yerleşim. Bir kez kurulur — userscript yöneticisi üzerinden kendini günceller ve yapılandırma gerektirmez. Proje GitHub\'da açık kaynak ve GPL-2.0 lisanslı.',
                features: [
                    'Her iki platform için tek stil dosyası: YouTube ve YouTube Music, açık ve koyu temada aynı görsel dili paylaşır.',
                    'Kozmetik filtreleme; promosyon satırlarını, afişleri ve yükseltme uyarılarını DOM\'dan kaldırır.',
                    'MutationObserver, YouTube sayfa değiştirdiğinde her şeyi yeniden uygular — yenileme gerekmez.',
                    'Markalama saf CSS: harici görsel yok, yerleşim kayması yok.',
                    'Güncellemeler userscript yöneticisinden gelir; güncel sürüm 4.2.1.'
                ],
                install: [
                    {
                        title: 'Bir userscript yöneticisi kur',
                        body: "Tampermonkey veya Violentmonkey — ikisi de güncel Chromium tarayıcılarında ve Firefox'ta çalışır.",
                        note: 'Chrome ve diğer Chromium tarayıcılarında yöneticiyi chrome://extensions üzerinden açıp “Kullanıcı komut dosyalarına izin ver” seçeneğini etkinleştir; Chrome bu izin verilene kadar userscript\'leri çalıştırmaz.',
                        links: [
                            { label: 'Tampermonkey', href: '@tampermonkey', variant: 'primary' },
                            { label: 'Violentmonkey', href: '@violentmonkey' }
                        ]
                    },
                    {
                        title: 'Greasy Fork sayfasını aç',
                        body: 'Script orada yayınlanıyor; değişiklik kaydı, sürüm geçmişi ve kaynak kodu da aynı sayfada.',
                        links: [{ label: 'Greasy Fork', href: '@greasyfork', variant: 'primary' }]
                    },
                    {
                        title: 'Kur\'a bas',
                        body: 'Yöneticinin onay penceresini kabul et. Bu düğme script\'i doğrudan Tampermonkey\'e aktarır.',
                        links: [{ label: 'YT NexusPatch\'i kur', href: '@install', variant: 'primary' }]
                    },
                    {
                        title: 'Kontrol et',
                        body: 'YouTube veya YouTube Music\'i aç — markalama uygulanmış olmalı. Ayrı bir kurulum adımı yok.',
                        links: [
                            { label: 'YouTube', href: 'https://www.youtube.com/' },
                            { label: 'YouTube Music', href: 'https://music.youtube.com/' }
                        ]
                    }
                ],
                installNote: 'Tampermonkey / Violentmonkey · v4.2.1 · GPL-2.0',
                platforms: [
                    { name: 'Google Chrome', note: 'Tampermonkey / Violentmonkey' },
                    { name: 'Microsoft Edge', note: 'Tampermonkey / Violentmonkey' },
                    { name: 'Mozilla Firefox', note: 'Tampermonkey / Violentmonkey' },
                    { name: 'Brave · Opera', note: 'Chromium tabanlı yöneticiler' },
                    { name: 'YouTube Music', note: 'web oynatıcı' }
                ],
                meta: [
                    { k: 'tür', v: 'userscript · tek dosya' },
                    { k: 'lisans', v: 'GPL-2.0' },
                    { k: 'kaynak', v: 'açık kaynak' },
                    { k: 'sürüm', v: '4.2.1' },
                    { k: 'depo', v: 'enswrdev/yt-nexuspatch' }
                ],
                readme: [
                    { h: 'Nedir', p: 'YT NexusPatch, YouTube ve YouTube Music\'i yeniden biçimlendiren tek dosyalık bir userscript. Kendi CSS\'ini enjekte eder ve sayfa değiştikçe promosyon öğelerini temizler.' },
                    { h: 'Nasıl çalışır', p: 'Script yüklenirken bir stil sayfası ekler ve DOM\'u MutationObserver ile izler. YouTube tek sayfa gezinmesiyle görünüm değiştirdiğinde gözlemci değişiklikleri yeniden uygular; ilk tıklamadan sonra hiçbir şey kaybolmaz.' },
                    { h: 'Kurulum', p: 'Tampermonkey veya Violentmonkey kur, Greasy Fork sayfasını aç ve Kur\'a bas. Güncellemeler yönetici tarafından gelir; elle yeniden kurmak gerekmez.' },
                    { h: 'Uyumluluk ve lisans', p: 'Etkin bir userscript yöneticisiyle güncel Chromium ve Firefox sürümlerinde çalışır. Açık kaynak ve GPL-2.0 lisanslı; kaynak kodu GitHub\'da.' }
                ]
            }
        },

        'siren-flash-app': {
            order: '02',
            title: 'Siren Flash App',
            repo: 'https://github.com/enswrdev/siren-flash-app',
            install: 'https://github.com/enswrdev/siren-flash-app/releases/latest',
            stack: ['Python', 'Pygame', 'Tkinter', 'Pillow'],
            en: {
                badge: 'python · desktop',
                installLabel: 'Download the release',
                tagline: 'A configurable siren and flash controller for roleplay, simulation and emergency-signalling setups.',
                about: 'Three siren modes, keyboard triggers and an alternating left/right flash overlay, wrapped in a desktop app that remembers your configuration. The project is open source on GitHub.',
                features: [
                    'ARMAS, CSR and ZER modes, each with siren, horn and extended siren keys.',
                    'Left / right flash system with a fullscreen icon overlay.',
                    'First-run setup writes theme, language and media folder to a config file, so the next launch starts where you left off.',
                    'Live theme switching while the app is running.',
                    'Ships as a ready-to-run Windows build; the source runs on Python 3.10–3.12.'
                ],
                install: [
                    {
                        title: 'Download the Windows build',
                        body: 'Grab the latest release archive, extract it and run the executable. Dependencies are bundled.',
                        links: [{ label: 'Latest release', href: 'https://github.com/enswrdev/siren-flash-app/releases/latest', variant: 'primary' }]
                    },
                    { title: 'Or run from source', body: 'Clone the repository, install the requirements, then start the app with Python 3.10–3.12.', code: 'git clone https://github.com/enswrdev/siren-flash-app\ncd siren-flash-app\npip install -r requirements.txt' },
                    { title: 'Complete the first-run setup', body: 'Pick a theme and language and point the app at your media folder. The answers are saved to a config file.' },
                    { title: 'Learn the key map', body: 'Use the on-screen key map for siren, horn, extended siren and the flash channels.' }
                ],
                installNote: 'Windows 10 / 11 build · Python 3.10–3.12 for source · Pygame + Tkinter',
                platforms: [
                    { name: 'Windows 10 / 11', note: 'prebuilt release' },
                    { name: 'Python 3.10 – 3.12', note: 'running from source' }
                ],
                meta: [
                    { k: 'type', v: 'desktop application' },
                    { k: 'stack', v: 'Python · Pygame · Tkinter' },
                    { k: 'interface', v: 'Tkinter window + overlay' },
                    { k: 'source', v: 'open source' },
                    { k: 'repo', v: 'enswrdev/siren-flash-app' }
                ],
                readme: [
                    { h: 'What it is', p: 'A desktop siren and flash controller: three siren modes, keyboard-driven triggers and a fullscreen left/right flash overlay, aimed at roleplay and simulation scenes.' },
                    { h: 'Modes', p: 'ARMAS, CSR and ZER each map a different set of siren, horn and extended siren samples. You can switch modes while the app is running.' },
                    { h: 'Configuration', p: 'The first launch asks for theme, language and media folder; the answers go into a config file next to the app, so later launches skip the setup.' },
                    { h: 'Running it', p: 'Use the prebuilt Windows release, or run the source on Python 3.10–3.12 after installing the requirements. The source is open on GitHub.' }
                ]
            },
            tr: {
                badge: 'python · masaüstü',
                installLabel: 'Sürümü indir',
                tagline: 'Roleplay, simülasyon ve acil durum sinyali kurulumları için yapılandırılabilir siren ve çakar denetleyicisi.',
                about: 'Üç siren modu, klavye tetikleyicileri ve dönüşümlü sol/sağ çakar katmanı; yapılandırmanı hatırlayan bir masaüstü uygulaması içinde. Proje GitHub\'da açık kaynak.',
                features: [
                    'ARMAS, CSR ve ZER modları; her birinde siren, korna ve uzatılmış siren tuşları.',
                    'Tam ekran simge katmanıyla sol / sağ çakar sistemi.',
                    'İlk açılış kurulumu tema, dil ve medya klasörünü bir yapılandırma dosyasına yazar; sonraki açılış kaldığın yerden başlar.',
                    'Uygulama açıkken canlı tema değiştirme.',
                    'Çalışmaya hazır Windows derlemesi olarak gelir; kaynak kodu Python 3.10–3.12\'de çalışır.'
                ],
                install: [
                    {
                        title: 'Windows derlemesini indir',
                        body: 'En son sürüm arşivini indir, çıkar ve çalıştırılabilir dosyayı başlat. Bağımlılıklar paket içinde.',
                        links: [{ label: 'En son sürüm', href: 'https://github.com/enswrdev/siren-flash-app/releases/latest', variant: 'primary' }]
                    },
                    { title: 'Ya da kaynaktan çalıştır', body: 'Depoyu klonla, gereksinimleri kur, ardından uygulamayı Python 3.10–3.12 ile başlat.', code: 'git clone https://github.com/enswrdev/siren-flash-app\ncd siren-flash-app\npip install -r requirements.txt' },
                    { title: 'İlk açılış kurulumunu tamamla', body: 'Bir tema ve dil seç, medya klasörünü göster. Seçimler bir yapılandırma dosyasına kaydedilir.' },
                    { title: 'Tuş haritasını öğren', body: 'Siren, korna, uzatılmış siren ve çakar kanalları için ekrandaki tuş haritasını kullan.' }
                ],
                installNote: 'Windows 10 / 11 derlemesi · kaynak için Python 3.10–3.12 · Pygame + Tkinter',
                platforms: [
                    { name: 'Windows 10 / 11', note: 'hazır derleme' },
                    { name: 'Python 3.10 – 3.12', note: 'kaynaktan çalıştırma' }
                ],
                meta: [
                    { k: 'tür', v: 'masaüstü uygulaması' },
                    { k: 'yığın', v: 'Python · Pygame · Tkinter' },
                    { k: 'arayüz', v: 'Tkinter penceresi + katman' },
                    { k: 'kaynak', v: 'açık kaynak' },
                    { k: 'depo', v: 'enswrdev/siren-flash-app' }
                ],
                readme: [
                    { h: 'Nedir', p: 'Bir masaüstü siren ve çakar denetleyicisi: üç siren modu, klavyeyle tetikleme ve tam ekran sol/sağ çakar katmanı. Roleplay ve simülasyon sahneleri için tasarlandı.' },
                    { h: 'Modlar', p: 'ARMAS, CSR ve ZER, farklı siren, korna ve uzatılmış siren seslerini eşler. Uygulama açıkken mod değiştirebilirsin.' },
                    { h: 'Yapılandırma', p: 'İlk açılışta tema, dil ve medya klasörü sorulur; cevaplar uygulamanın yanındaki yapılandırma dosyasına yazılır, sonraki açılışlar kurulumu atlar.' },
                    { h: 'Çalıştırma', p: 'Hazır Windows derlemesini kullan ya da gereksinimleri kurduktan sonra kaynak kodu Python 3.10–3.12 ile çalıştır. Kaynak kodu GitHub\'da açık.' }
                ]
            }
        },

        'insta-ping-pong-bot': {
            order: '03',
            title: 'Insta Ping Pong Bot',
            repo: 'https://github.com/enswrdev/insta-ping-pong-bot',
            install: 'https://github.com/enswrdev/insta-ping-pong-bot',
            stack: ['Python', 'OpenCV', 'NumPy', 'mss', 'Scrcpy'],
            en: {
                badge: 'python · computer vision',
                installLabel: 'Open the repository',
                tagline: 'A real-time computer-vision bot for the Instagram DM ping-pong minigame, played on Windows through Scrcpy.',
                about: 'HSV colour tracking and trajectory prediction drive the paddle, while a local virtual wall covers the latency between the phone mirror and the game. The project is open source on GitHub.',
                features: [
                    'Red-ball HSV mask, filtered per frame, with centroid tracking.',
                    'Trajectory prediction including wall reflections, so the paddle moves before the ball arrives.',
                    'A hybrid local wall sweeps ±30 px in roughly 1 ms to widen effective paddle coverage.',
                    'Win32 mouse automation drags the paddle without manual clicks.',
                    'Live OpenCV HUD with centroids, impact markers and shield bounds for tuning.'
                ],
                install: [
                    {
                        title: 'Mirror the phone',
                        body: 'Connect the device over USB and start Scrcpy so the Instagram DM game is visible on the desktop.',
                        links: [{ label: 'Scrcpy releases', href: 'https://github.com/Genymobile/scrcpy/releases', variant: 'primary' }]
                    },
                    { title: 'Install the dependencies', body: 'Python 3 with OpenCV, NumPy and mss, plus pywin32 for the mouse automation.', code: 'pip install opencv-python numpy mss pywin32' },
                    { title: 'Set the capture region', body: 'Point the capture box at the game area in the mirrored window; the HUD preview shows what the bot sees.' },
                    { title: 'Run the bot', body: 'Start the script and keep the mirrored window visible and unoccluded — capture reads the screen directly.' }
                ],
                installNote: 'Windows only · OpenCV + NumPy + mss · Scrcpy mirror',
                platforms: [
                    { name: 'Windows 10 / 11' },
                    { name: 'Android' },
                    { name: 'Python 3' }
                ],
                meta: [
                    { k: 'type', v: 'automation script' },
                    { k: 'stack', v: 'Python · OpenCV · NumPy' },
                    { k: 'input', v: 'screen capture + Win32' },
                    { k: 'source', v: 'open source' },
                    { k: 'repo', v: 'enswrdev/insta-ping-pong-bot' }
                ],
                readme: [
                    { h: 'What it is', p: 'A bot that plays the Instagram DM ping-pong minigame from a mirrored phone screen. It reads frames, finds the ball and moves the paddle through the Windows cursor.' },
                    { h: 'Detection', p: 'Each frame is converted to HSV and masked for the red ball. The centroid of the largest blob becomes the ball position.' },
                    { h: 'Prediction', p: 'Velocity is estimated from recent centroids, then reflected off the side walls to guess where the ball will cross the paddle line.' },
                    { h: 'Limits', p: 'Built for a fixed camera framing and one screen resolution. A different mirror scale or UI layout needs new tuning. Open source on GitHub.' }
                ]
            },
            tr: {
                badge: 'python · bilgisayarlı gör',
                installLabel: 'Depoyu aç',
                tagline: 'Instagram DM ping-pong mini oyunu için gerçek zamanlı bilgisayarlı gör botu; Windows\'ta Scrcpy üzerinden oynar.',
                about: 'HSV renk takibi ve yörünge tahmini raketi sürer; yerel bir sanal duvar, telefon yansısı ile oyun arasındaki gecikmeyi telafi eder. Proje GitHub\'da açık kaynak.',
                features: [
                    'Kırmızı top için HSV maskesi, her karede filtrelenir ve merkez noktası izlenir.',
                    'Duvar yansımalarını da hesaba katan yörünge tahmini; raket top gelmeden hareket eder.',
                    'Hibrit yerel duvar, etkin raket kapsama alanını genişletmek için ±30 px\'i yaklaşık 1 ms\'de tarar.',
                    'Win32 fare otomasyonu raketi elle tıklama olmadan sürükler.',
                    'Ayarlama için merkezleri, çarpma işaretlerini ve kalkan sınırlarını gösteren canlı OpenCV HUD\'u.'
                ],
                install: [
                    {
                        title: 'Telefonu yansıt',
                        body: 'Cihazı USB ile bağla ve Scrcpy\'yi başlat; Instagram DM oyunu masaüstünde görünür olsun.',
                        links: [{ label: 'Scrcpy sürümleri', href: 'https://github.com/Genymobile/scrcpy/releases', variant: 'primary' }]
                    },
                    { title: 'Bağımlılıkları kur', body: 'Python 3 ile OpenCV, NumPy ve mss; fare otomasyonu için pywin32.', code: 'pip install opencv-python numpy mss pywin32' },
                    { title: 'Yakalama alanını ayarla', body: 'Yakalama kutusunu yansıtılan penceredeki oyun alanına denk getir; HUD önizlemesi botun ne gördüğünü gösterir.' },
                    { title: 'Botu çalıştır', body: 'Script\'i başlat ve yansıtılan pencereyi görünür, kapatılmamış tut — yakalama doğrudan ekranı okur.' }
                ],
                installNote: 'Yalnızca Windows · OpenCV + NumPy + mss · Scrcpy yansısı',
                platforms: [
                    { name: 'Windows 10 / 11' },
                    { name: 'Android' },
                    { name: 'Python 3' }
                ],
                meta: [
                    { k: 'tür', v: 'otomasyon script\'i' },
                    { k: 'yığın', v: 'Python · OpenCV · NumPy' },
                    { k: 'girdi', v: 'ekran yakalama + Win32' },
                    { k: 'kaynak', v: 'açık kaynak' },
                    { k: 'depo', v: 'enswrdev/insta-ping-pong-bot' }
                ],
                readme: [
                    { h: 'Nedir', p: 'Yansıtılan telefon ekranından Instagram DM ping-pong mini oyununu oynayan bir bot. Kareleri okur, topu bulur ve raketi Windows imleciyle hareket ettirir.' },
                    { h: 'Algılama', p: 'Her kare HSV\'ye çevrilir ve kırmızı top için maskelenir. En büyük kümenin merkez noktası topun konumu olur.' },
                    { h: 'Tahmin', p: 'Hız, son merkez noktalarından tahmin edilir; ardından yan duvarlardan yansıtılarak topun raket çizgisini nerede geçeceği hesaplanır.' },
                    { h: 'Sınırlar', p: 'Sabit bir kamera çerçevesi ve tek bir ekran çözünürlüğü için yapıldı. Farklı bir yansı ölçeği veya arayüz yerleşimi yeni ayar gerektirir. Kaynak kodu GitHub\'da açık.' }
                ]
            }
        }
    };

    var ORDER = ['yt-nexuspatch', 'siren-flash-app', 'insta-ping-pong-bot'];
    var slug = new URLSearchParams(window.location.search).get('p');
    var project = PROJECTS[slug];

    /* ---------------- browser + locale aware links ---------------- */

    var IS_FIREFOX = /firefox/i.test(navigator.userAgent || '');

    var TM_INSTALL = 'https://www.tampermonkey.net/script_installation.php#url=https://update.greasyfork.org/scripts/596625/YT%20%2B%20Music%20Nexus%20Patch.user.js';

    function greasyForkLocale() {
        if (window.I18N && window.I18N.greasyForkLocale) return window.I18N.greasyForkLocale;
        return 'en';
    }

    function resolveHref(href) {
        if (href === '@tampermonkey') {
            return IS_FIREFOX
                ? 'https://addons.mozilla.org/firefox/addon/tampermonkey/'
                : 'https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo';
        }
        if (href === '@violentmonkey') {
            return IS_FIREFOX
                ? 'https://addons.mozilla.org/firefox/addon/violentmonkey/'
                : 'https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag';
        }
        if (href === '@greasyfork') {
            return 'https://greasyfork.org/' + greasyForkLocale() + '/scripts/596625-yt-music-nexus-patch';
        }
        if (href === '@install') return TM_INSTALL;
        return href;
    }

    function t(key, fallback) {
        if (window.I18N && typeof window.I18N.t === 'function') {
            var value = window.I18N.t(key);
            if (value !== undefined && value !== key) return value;
        }
        return fallback;
    }

    function lang() {
        return window.I18N && window.I18N.lang === 'tr' ? 'tr' : 'en';
    }

    function clear(node) {
        while (node && node.firstChild) node.removeChild(node.firstChild);
    }

    function make(tag, className, text) {
        var node = doc.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function arrowIcon() {
        var svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'icon');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('aria-hidden', 'true');
        var path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M5 12h14M13 5.5 19.5 12 13 18.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '1.7');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
        return svg;
    }

    /* ---------------- render ---------------- */

    var dLabel = doc.getElementById('dLabel');
    var dTitle = doc.getElementById('dTitle');
    var dTagline = doc.getElementById('dTagline');
    var dAbout = doc.getElementById('dAbout');
    var dChips = doc.getElementById('dChips');
    var dActions = doc.getElementById('dActions');
    var dFeatures = doc.getElementById('dFeatures');
    var dSteps = doc.getElementById('dSteps');
    var dInstallNote = doc.getElementById('dInstallNote');
    var dPlatforms = doc.getElementById('dPlatforms');
    var dMeta = doc.getElementById('dMeta');
    var dReadme = doc.getElementById('dReadme');
    var dReadmeLink = doc.getElementById('dReadmeLink');
    var dNext = doc.getElementById('dNext');
    var dNextTitle = doc.getElementById('dNextTitle');

    function renderActions(data, copy) {
        clear(dActions);

        var github = make('a', 'btn btn--primary btn--sm');
        github.href = data.repo;
        github.target = '_blank';
        github.rel = 'noopener noreferrer';
        var ghLabel = make('span', null, t('project.github', 'View on GitHub'));
        github.appendChild(ghLabel);
        dActions.appendChild(github);

        var install = make('a', 'btn btn--outline btn--sm');
        install.href = resolveHref(data.install);
        install.target = '_blank';
        install.rel = 'noopener noreferrer';
        install.appendChild(make('span', null, copy.installLabel));
        install.appendChild(arrowIcon());
        dActions.appendChild(install);
    }

    function renderSteps(steps) {
        clear(dSteps);

        steps.forEach(function (step) {
            var li = make('li', 'detail__step');
            li.appendChild(make('span', 'detail__step-num mono', ''));
            var body = make('div', 'detail__step-body');
            body.appendChild(make('h3', 'detail__step-title', step.title));
            body.appendChild(make('p', 'detail__step-text', step.body));

            if (step.code) {
                var pre = make('pre', 'detail__code mono');
                pre.appendChild(make('code', null, step.code));
                body.appendChild(pre);
            }

            if (step.note) {
                body.appendChild(make('p', 'detail__step-note', step.note));
            }

            if (step.links && step.links.length) {
                var links = make('div', 'detail__step-links');
                step.links.forEach(function (link) {
                    var isPrimary = link.variant === 'primary';
                    var a = make('a', 'detail__step-link' + (isPrimary ? ' detail__step-link--primary' : '') + ' mono');
                    a.href = resolveHref(link.href);
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.appendChild(make('span', null, link.label));
                    a.appendChild(arrowIcon());
                    links.appendChild(a);
                });
                body.appendChild(links);
            }

            li.appendChild(body);
            dSteps.appendChild(li);
        });
    }

    function renderReadme(sections) {
        clear(dReadme);

        sections.forEach(function (section) {
            dReadme.appendChild(make('h3', 'detail__readme-h', section.h));
            dReadme.appendChild(make('p', 'detail__readme-p', section.p));
        });
    }

    function render() {
        if (!project) return;

        var code = lang();
        var copy = project[code] || project.en;

        doc.title = project.title + ' — enswr.dev';
        doc.documentElement.setAttribute('lang', code);

        dLabel.textContent = project.order + ' — ' + (code === 'tr' ? 'proje' : 'project');
        dTitle.textContent = project.title;
        dTagline.textContent = copy.tagline;
        dAbout.textContent = copy.about;

        clear(dChips);
        project.stack.forEach(function (item) {
            dChips.appendChild(make('span', 'chip', item));
        });

        renderActions(project, copy);

        clear(dFeatures);
        copy.features.forEach(function (item) {
            dFeatures.appendChild(make('li', null, item));
        });

        renderSteps(copy.install);
        dInstallNote.textContent = copy.installNote;

        clear(dPlatforms);
        copy.platforms.forEach(function (platform) {
            var li = make('li', 'detail__platform');
            li.appendChild(make('span', 'detail__platform-name', platform.name));
            if (platform.note) li.appendChild(make('span', 'detail__platform-note mono', platform.note));
            dPlatforms.appendChild(li);
        });

        clear(dMeta);
        copy.meta.forEach(function (row) {
            var wrap = make('div', 'detail__meta-row');
            wrap.appendChild(make('dt', null, row.k));
            wrap.appendChild(make('dd', null, row.v));
            dMeta.appendChild(wrap);
        });

        renderReadme(copy.readme);

        dReadmeLink.href = project.repo + '#readme';

        var index = ORDER.indexOf(slug);
        var nextSlug = ORDER[(index + 1) % ORDER.length];
        var nextProject = PROJECTS[nextSlug];
        var nextCopy = nextProject[code] || nextProject.en;

        dNext.href = 'project.html?p=' + nextSlug;
        dNextTitle.textContent = nextProject.title;
        dNext.setAttribute('aria-label', t('detail.next', 'Next project') + ': ' + nextProject.title + ' — ' + nextCopy.tagline);

        if (dLabel.parentNode) dLabel.parentNode.classList.add('is-ready');
    }

    function renderMissing() {
        var main = doc.getElementById('main');
        if (!main) return;
        clear(main);
        var wrap = make('div', 'detail__wrap');
        var box = make('div', 'detail__missing');
        box.appendChild(make('p', 'section__label mono', '404 — project'));
        box.appendChild(make('h1', 'detail__title', t('detail.notFound', 'Project not found')));
        box.appendChild(make('p', 'detail__about', t('detail.notFoundText', 'That project link does not exist. Head back to the project list and pick one.')));
        var back = make('a', 'btn btn--outline', t('detail.back', 'All projects'));
        back.href = 'index.html#projects';
        box.appendChild(back);
        wrap.appendChild(box);
        main.appendChild(wrap);
        doc.title = t('detail.notFound', 'Project not found') + ' — enswr.dev';
    }

    if (!project) {
        renderMissing();
    } else {
        render();
    }

    doc.addEventListener('portfolio:lang', function () {
        if (project) render();
        if (project) return;
        renderMissing();
    });

    /* the country lookup resolves after the first paint — relink Greasy Fork */
    doc.addEventListener('portfolio:locale', function () {
        if (project) render();
    });

    /* ---------------- nav + reveal (no intro on this page) ---------------- */

    var nav = doc.getElementById('nav');
    var navLinks = doc.getElementById('navLinks');
    var navToggle = doc.getElementById('navToggle');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
            navLinks.classList.toggle('is-open', !open);
        });
    }

    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    var revealItems = Array.prototype.slice.call(doc.querySelectorAll('[data-reveal]'));
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

    /* ---------------- scroll chrome ---------------- */

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
                doc.documentElement.style.setProperty('--sx', sx + 'px');
                doc.documentElement.style.setProperty('--sy', sy + 'px');
                spotlightQueued = false;
            });
        }, { passive: true });

        doc.addEventListener('mouseleave', function () {
            spotlight.classList.remove('is-on');
        });
    }
})();
