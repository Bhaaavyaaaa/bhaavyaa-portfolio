/* ── main.js ── Bhavya Arora Portfolio ── */

/* 1. Cursor Glow */
const glow = document.getElementById('glow');
if (glow) {
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top  = e.clientY + 'px';
    });
}

/* 2. Particle Canvas */
(function () {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

    function makeParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            alpha: Math.random() * 0.5 + 0.1,
        };
    }

    for (let i = 0; i < 90; i++) particles.push(makeParticle());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const color = isDark() ? '56,189,248' : '0,100,180';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color},${p.alpha})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

/* 3. Theme Toggle */
(function () {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;

    const root = document.documentElement;
    const icon = btn.querySelector('i');
    const saved = localStorage.getItem('ba-theme') || 'dark';
    root.setAttribute('data-theme', saved);
    icon.className = saved === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

    btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('ba-theme', next);
        icon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    });
})();

/* 4. Mobile Hamburger */
(function () {
    const toggle = document.getElementById('menu-toggle');
    const links  = document.getElementById('menu-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open);
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('open');
        });
    });
})();

/* 5. Active Nav Link */
(function () {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
})();

/* 6. Scroll Animate (IntersectionObserver) */
(function () {
    const items = document.querySelectorAll('.scroll-animate');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach(el => observer.observe(el));
})();
