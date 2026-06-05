/* =====================================================
   BHAVYA ARORA PORTFOLIO — SHARED JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ── THEME TOGGLE ──
    const themeBtn = document.getElementById('theme-btn');
    const htmlRoot = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlRoot.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const next = htmlRoot.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlRoot.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector('i');
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // ── MOBILE HAMBURGER ──
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks  = document.getElementById('menu-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        menuLinks.classList.toggle('mobile-active');
    });

    // Close mobile nav on link click
    menuLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            menuLinks.classList.remove('mobile-active');
        });
    });

    // ── ACTIVE NAV LINK ──
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // ── CURSOR GLOW ──
    const glow = document.getElementById('glow');
    if (glow) {
        document.addEventListener('mousemove', e => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top  = `${e.clientY}px`;
        });
    }

    // ── PARTICLE CANVAS ──
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x      = Math.random() * canvas.width;
                this.y      = Math.random() * canvas.height;
                this.size   = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.alpha  = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height)  this.speedY *= -1;
            }
            draw() {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                ctx.fillStyle = isDark
                    ? `rgba(56, 189, 248, ${this.alpha})`
                    : `rgba(2, 132, 199, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 65; i++) particles.push(new Particle());

        (function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        })();
    }

    // ── 3D TILT CARDS ──
    document.querySelectorAll('.glass-card, .tool-item').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left - r.width  / 2;
            const y = e.clientY - r.top  - r.height / 2;
            card.style.transform = `rotateX(${(y / (r.height / 2)) * -10}deg) rotateY(${(x / (r.width / 2)) * 10}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ── SCROLL ANIMATIONS ──
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

});
