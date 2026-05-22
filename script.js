/* ============================================================================
   MINIMAL BRUTALIST PORTFOLIO - JAVASCRIPT
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize reveal animations
    initRevealAnimations();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ============================================================================
// REVEAL ANIMATIONS ON SCROLL
// ============================================================================

function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .reveal-stagger');

    // Check if element is in viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }

    // Trigger animations on scroll
    function checkReveals() {
        reveals.forEach(el => {
            if (isInViewport(el) && !el.classList.contains('active')) {
                el.classList.add('active');
            }
        });
    }

    // Initial check
    checkReveals();

    // Check on scroll
    window.addEventListener('scroll', () => {
        checkReveals();
    }, { passive: true });

    // Check on resize
    window.addEventListener('resize', () => {
        checkReveals();
    }, { passive: true });
}

// ============================================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}, { passive: true });
