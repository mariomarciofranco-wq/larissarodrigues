/* ========================================
   CLÍNICA LARISSA RODRIGUES — SCRIPT.JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- NAV SCROLL ---------- */
    const nav = document.getElementById('nav');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 80);
                ticking = false;
            });
            ticking = true;
        }
    });

    /* ---------- MOBILE MENU ---------- */
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
            toggle.classList.toggle('active');
        });
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                links.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }

    /* ---------- FADE IN OBSERVER ---------- */
    const fadeEls = document.querySelectorAll('.fade-in, .words__item, .split__block, .phrase__text');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.getAttribute('data-delay')) || 0;
                setTimeout(() => el.classList.add('visible'), delay);
                fadeObserver.unobserve(el);
            }
        });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
    fadeEls.forEach(el => fadeObserver.observe(el));

    /* ---------- METRICS COUNTER ---------- */
    const metricsNums = document.querySelectorAll('.metrics__num');
    const metricsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const num = entry.target;
                const target = parseInt(num.getAttribute('data-target'));
                let current = 0;
                const step = Math.ceil(target / 60);
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    num.textContent = current;
                }, 25);
                metricsObserver.unobserve(num);
                num.parentElement.classList.add('visible');
            }
        });
    }, { rootMargin: '0px 0px -100px 0px' });
    metricsNums.forEach(el => metricsObserver.observe(el));

    /* ---------- FLOW STEPS OBSERVER ---------- */
    const flowSteps = document.querySelectorAll('.flow__step');
    const flowObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const allSteps = entry.target.parentElement.querySelectorAll('.flow__step');
                allSteps.forEach((s, i) => {
                    setTimeout(() => s.classList.add('visible'), i * 100);
                });
                flowObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.2 });
    if (flowSteps.length) flowObserver.observe(flowSteps[0]);

    /* ---------- ENDOLASER CAROUSEL ---------- */
    (function() {
        const slides = document.querySelectorAll('.endolaser__slide');
        const dots = document.querySelectorAll('.endolaser__dot');
        if (!slides.length) return;
        let current = 0;
        let interval;

        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'));
                goTo(idx);
                clearInterval(interval);
                interval = setInterval(() => goTo(current + 1), 4000);
            });
        });

        interval = setInterval(() => goTo(current + 1), 4000);
    })();

    /* ---------- FLOATING WORDS ---------- */
    const wordItems = document.querySelectorAll('.words__item');
    const wordObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const speed = parseFloat(entry.target.getAttribute('data-speed')) || 1;
                setTimeout(() => entry.target.classList.add('visible'), 100 * wordItems.length * (1 - speed * 0.5));
                wordObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px' });
    wordItems.forEach(el => wordObserver.observe(el));

    /* ---------- TIMELINE SCROLL ---------- */
    const steps = document.querySelectorAll('.timeline__step');
    const timelineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target;
                const idx = Array.from(steps).indexOf(step);
                steps.forEach((s, i) => {
                    setTimeout(() => s.classList.add('active'), i * 200);
                });
                timelineObserver.unobserve(step);
            }
        });
    }, { rootMargin: '0px 0px -150px 0px', threshold: 0.3 });
    steps.forEach(s => timelineObserver.observe(s));

    /* ---------- CIRCLES TOOLTIP ---------- */
    const circles = document.querySelectorAll('.circles__item');
    const tooltip = document.getElementById('circles-tooltip');
    if (circles.length && tooltip) {
        circles.forEach(c => {
            c.addEventListener('mouseenter', e => {
                const label = c.getAttribute('data-label');
                if (label) {
                    tooltip.textContent = label;
                    tooltip.classList.add('show');
                }
            });
            c.addEventListener('mousemove', e => {
                tooltip.style.left = (e.clientX + 16) + 'px';
                tooltip.style.top = (e.clientY + 16) + 'px';
            });
            c.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    }

    /* ---------- GALLERY LIGHTBOX ---------- */
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;
            const overlay = document.createElement('div');
            overlay.className = 'lightbox';
            overlay.innerHTML = `<div class="lightbox__bg"></div>
                <img src="${img.src}" alt="${img.alt}" class="lightbox__img">
                <button class="lightbox__close" aria-label="Fechar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>`;
            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.classList.add('show'));
            overlay.querySelector('.lightbox__bg').addEventListener('click', () => overlay.remove());
            overlay.querySelector('.lightbox__close').addEventListener('click', () => overlay.remove());
        });
    });

    /* ---------- VIDEO PLAY ---------- */
    document.querySelectorAll('.mural__card--image').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (!img) return;
            const overlay = document.createElement('div');
            overlay.className = 'lightbox';
            overlay.innerHTML = `<div class="lightbox__bg"></div>
                <div class="lightbox__video">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64"><path d="M8 5v14l11-7z"/></svg>
                    <p style="color:white;margin-top:12px;opacity:0.6">Play</p>
                </div>
                <button class="lightbox__close" aria-label="Fechar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>`;
            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.classList.add('show'));
            overlay.querySelector('.lightbox__bg').addEventListener('click', () => overlay.remove());
            overlay.querySelector('.lightbox__close').addEventListener('click', () => overlay.remove());
        });
    });

    /* ---------- SMOOTH NAV LINKS ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---------- PARALLAX ON HERO ---------- */
    const heroImg = document.querySelector('.hero__image img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y < window.innerHeight) {
                heroImg.style.transform = `translateY(${y * 0.15}px)`;
            }
        }, { passive: true });
    }
});
