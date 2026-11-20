
/* =====================================
   1. DEVICE DETECTION
===================================== */

function detectDevice() {

    const ua = navigator.userAgent;

    let os = "Unknown";

    if (/Windows NT/i.test(ua)) os = "Windows";
    else if (/Android/i.test(ua)) os = "Android";
    else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
    else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
    else if (/Linux/i.test(ua)) os = "Linux";

    let browser = "Unknown";

    if (/Edg\//i.test(ua)) browser = "Microsoft Edge";
    else if (/OPR\//i.test(ua)) browser = "Opera";
    else if (/Chrome\//i.test(ua)) browser = "Google Chrome";
    else if (/Firefox\//i.test(ua)) browser = "Mozilla Firefox";
    else if (/Safari\//i.test(ua)) browser = "Safari";

    return [
        { text: "GNU GRUB version 2.12", color: "white" },
        { text: "", color: "white" },
        { text: "Welcome to GRUB!", color: "green" },
        { text: "Starting ROOT LINUX SYSTEM...", color: "gray" },
        { text: "", color: "white" },
        { text: "Detecting hardware...", color: "yellow" },
        { text: "[ OK ] Operating System: " + os, color: "green" },
        { text: "[ OK ] Browser: " + browser, color: "green" },
        { text: "[ OK ] CPU Cores: " + (navigator.hardwareConcurrency || "Unknown"), color: "green" },
        { text: "[ OK ] RAM: " + (navigator.deviceMemory ? navigator.deviceMemory + " GB (estimated)" : "Restricted"), color: "green" },
        { text: "[ OK ] Display: " + screen.width + "x" + screen.height, color: "green" },
        { text: "[ OK ] Language: " + navigator.language, color: "green" },
        { text: "[ OK ] Timezone: " + Intl.DateTimeFormat().resolvedOptions().timeZone, color: "green" },
        { text: "[ OK ] Network: " + (navigator.onLine ? "Online" : "Offline"), color: "green" },
        { text: "", color: "white" },
        { text: "Initializing kernel...", color: "gray" },
        { text: "[ OK ] Loading system modules", color: "green" },
        { text: "[ OK ] Mounting filesystem", color: "green" },
        { text: "[ OK ] Initializing memory", color: "green" },
        { text: "[ OK ] Starting network manager", color: "green" },
        { text: "[ OK ] Starting security services", color: "green" },
        { text: "[ OK ] System initialization complete", color: "green" },
        { text: "", color: "white" },
        { text: "ROOT LINUX SYSTEM READY", color: "yellow" },
        { text: "", color: "white" },
        { text: "root@linux:~#", color: "green" }
    ];
}


/* =====================================
   2. LINUX BOOT ANIMATION
===================================== */

const output = document.getElementById("output");
const boot = document.getElementById("boot");

const messages = detectDevice();

let current = 0;

function bootSequence() {

    if (current >= messages.length) {

        // Terminal bittikten sonra 700 ms bekle
        setTimeout(() => {

            // Terminali gizle
            boot.style.display = "none";

            // Matrix ekranını göster
            document.getElementById("matrix-screen").style.display = "block";

            // Matrix animasyonunu başlat
            startMatrix();

        }, 700);

        return;
    }

    const message = messages[current];

    const line = document.createElement("div");

    line.className = message.color;
    line.textContent = message.text;

    output.appendChild(line);

    current++;

    let delay = Math.random() * 100 + 60;

    if (message.text === "") {
        delay = 150;
    }

    setTimeout(bootSequence, delay);
}

setTimeout(bootSequence, 500);


/* =====================================
   3. MATRIX RAIN
===================================== */

function startMatrix() {

    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    const fontSize = 15;

    let columns;
    let drops = [];

    function resize() {

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        columns = Math.ceil(window.innerWidth / fontSize);

        drops = [];

        // Matrix başlangıcında siyah ekran
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Sütunları rastgele başlat
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.floor(Math.random() * -50);
        }
    }

    resize();

    window.addEventListener("resize", resize);

    function draw() {

        // Karakterlerin arkasındaki iz
        ctx.fillStyle = "rgba(0, 0, 0, 0.055)";

        ctx.fillRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {

            // %80 0 ve 1 / %20 2-9

            let character;

            if (Math.random() < 0.80) {
                character = Math.random() < 0.5 ? "0" : "1";
            } else {
                character = Math.floor(Math.random() * 8) + 2;
            }

            ctx.fillStyle = "#00ff41";

            ctx.fillText(
                character,
                i * fontSize,
                drops[i] * fontSize
            );

            // Sütun ekranın altına ulaşınca yeniden başlat
            if (
                drops[i] * fontSize > window.innerHeight &&
                Math.random() > 0.975
            ) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);
}
