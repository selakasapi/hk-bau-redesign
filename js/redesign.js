// ============================================
// HK BAU — RADICAL REDESIGN JAVASCRIPT
// Brutalist Minimalism Interactions
// ============================================

(function() {
    'use strict';

    // ========== CUSTOM CURSOR ==========
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Expand cursor on hover
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.background = 'rgba(251, 187, 33, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.background = 'transparent';
            });
        });
    }

    // ========== NAV SCROLL ==========
    const nav = document.getElementById('nav');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== INTERSECTION OBSERVER (FADE IN) ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .project-item, .fact-block').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // ========== PROJECT IMAGE PARALLAX ==========
    const projectImages = document.querySelectorAll('.project-image');
    
    window.addEventListener('scroll', () => {
        projectImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                const translateY = (scrollPercent - 0.5) * 50;
                img.style.transform = `translateY(${translateY}px) scale(1.1)`;
            }
        });
    });

    // ========== COUNTER ANIMATION (META NUMBERS) ==========
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
            }
        }, 20);
    }

    // Trigger counters on scroll
    const metaNumbers = document.querySelectorAll('.meta-number');
    let countersTriggered = false;

    window.addEventListener('scroll', () => {
        if (!countersTriggered) {
            const heroRect = document.querySelector('.hero').getBoundingClientRect();
            if (heroRect.top < window.innerHeight * 0.5) {
                metaNumbers.forEach(num => {
                    const text = num.textContent;
                    const value = parseInt(text);
                    animateCounter(num, value);
                });
                countersTriggered = true;
            }
        }
    });

    // ========== GRID ANIMATION ON LOAD ==========
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';

})();
