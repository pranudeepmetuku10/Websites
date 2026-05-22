/* ============================================================================
   ELITE AI/ML ENGINEER PORTFOLIO - JAVASCRIPT
   ============================================================================ */

// ============================================================================
// BOOT SEQUENCE & INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('yearDisplay').textContent = `© ${new Date().getFullYear()}`;

    // Initialize typing effect after boot
    setTimeout(() => {
        document.body.classList.remove('boot-active');
        initTypingEffect();
        initScrollAnimations();
        initParticleBackground();
    }, 3500);

    // Initialize other features
    initNavigation();
    initMusicToggle();
    initCommandPalette();
    initThemeToggle();
});

// ============================================================================
// TYPING EFFECT
// ============================================================================

function initTypingEffect() {
    const textSequences = [
        'Building AI systems that scale',
        'Training neural networks',
        'Engineering data pipelines',
        'Shipping intelligent products',
        'Obsessed with clean code'
    ];

    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let charIndex = 0;
    const typingElement = document.querySelector('.typing-text');
    const speed = 50;
    const deleteSpeed = 30;
    const pauseDuration = 2000;

    function type() {
        const text = textSequences[currentIndex];

        if (isDeleting) {
            // Deleting characters
            charIndex--;
            currentText = text.substring(0, charIndex);
            typingElement.textContent = currentText;

            if (charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % textSequences.length;
                setTimeout(type, 300);
            } else {
                setTimeout(type, deleteSpeed);
            }
        } else {
            // Typing characters
            charIndex++;
            currentText = text.substring(0, charIndex);
            typingElement.textContent = currentText;

            if (charIndex === text.length) {
                isDeleting = true;
                setTimeout(type, pauseDuration);
            } else {
                setTimeout(type, speed);
            }
        }
    }

    type();
}

// ============================================================================
// NAVIGATION & SMOOTH SCROLLING
// ============================================================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero buttons
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.stat-card, .tech-item, .project-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================================================
// PARTICLE BACKGROUND
// ============================================================================

function initParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.querySelector('.background-particles');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';

    particlesContainer.appendChild(canvas);

    // Particles array
    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.color = Math.random() > 0.5
                ? `rgba(139, 92, 246, ${Math.random() * 0.5})`
                : `rgba(59, 130, 246, ${Math.random() * 0.5})`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================================================
// MUSIC TOGGLE
// ============================================================================

function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const audio = document.getElementById('ambientMusic');
    let isPlaying = false;

    // Create a simple tone instead of trying to load an external file
    function createAmbientTone() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.frequency.value = 432; // Hz (A4 "healing" frequency)
        oscillator.type = 'sine';

        gain.gain.setValueAtTime(0.05, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        musicToggle.classList.toggle('active');

        if (isPlaying) {
            try {
                // Try to play ambient tone
                createAmbientTone();
            } catch (e) {
                console.log('Audio context not available');
            }
        }
    });
}

// ============================================================================
// COMMAND PALETTE (EASTER EGG)
// ============================================================================

function initCommandPalette() {
    const palette = document.getElementById('commandPalette');
    const input = document.getElementById('commandInput');
    const output = document.getElementById('paletteOutput');
    const closeBtn = document.getElementById('closePalette');
    let paletteActive = false;

    // Commands database
    const commands = {
        'help': 'Available commands: help, theme, secret, clear, about, skills, whoami, weather, matrix',
        'theme': 'Dark mode locked. Light mode coming soon (probably never 😎)',
        'secret': '𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓽𝓱𝓮 𝓸𝓹𝓾𝓼. 𝔸𝕯 𝕱𝖆𝖘𝖈𝖎𝖓𝖆𝖙𝖊𝖘.',
        'clear': 'console_cleared',
        'about': 'AI/ML Engineer • Stanford • Building intelligent systems • Obsessed with clean code',
        'skills': 'PyTorch • TensorFlow • LLMs • RAG • MLOps • Data Engineering • Kubernetes',
        'whoami': 'You are currently exploring the terminal of an elite AI engineer.',
        'weather': 'Status: All systems operational ✓ Temperature: Cool as ice ❄️ Motivation: 📈 Rising',
        'matrix': 'ripple_effect_detected: The code flows through us all',
        'easter': 'You found the easter egg! 🎉',
        'ai': 'Artificial Intelligence is just mathematics applied creatively',
        'ml': 'Machine Learning is finding patterns in data at scale',
        '404': 'Command not found. Try "help"',
    };

    // Keyboard shortcut to open palette
    document.addEventListener('keydown', (e) => {
        // Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            togglePalette();
        }
        // Escape to close
        if (e.key === 'Escape' && paletteActive) {
            closePalette();
        }
    });

    function togglePalette() {
        paletteActive = !paletteActive;
        palette.classList.toggle('active');
        if (paletteActive) {
            input.focus();
            output.innerHTML = '> Type "help" to see available commands<br>';
        }
    }

    function closePalette() {
        paletteActive = false;
        palette.classList.remove('active');
        input.value = '';
    }

    closeBtn.addEventListener('click', closePalette);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            input.value = '';

            if (command) {
                output.innerHTML += `> ${command}<br>`;
                const response = commands[command] || commands['404'];

                // Special effects for certain commands
                if (command === 'matrix') {
                    output.innerHTML += applyMatrixEffect(response) + '<br>';
                } else if (command === 'secret') {
                    output.innerHTML += applyGlitchEffect(response) + '<br>';
                } else if (command === 'clear') {
                    setTimeout(() => {
                        output.innerHTML = '> Console cleared<br>> Type "help" for commands<br>';
                    }, 100);
                } else {
                    output.innerHTML += response + '<br>';
                }

                output.scrollTop = output.scrollHeight;
            }
        }
    });

    // Apply matrix effect
    function applyMatrixEffect(text) {
        const chars = '01アイウエオカキク';
        let result = '';
        for (let char of text) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    // Apply glitch effect
    function applyGlitchEffect(text) {
        return text.split('').map((char, i) => {
            if (Math.random() > 0.7) {
                return char.toUpperCase();
            }
            return char;
        }).join('');
    }
}

// ============================================================================
// THEME TOGGLE (PLACEHOLDER)
// ============================================================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    themeToggle.addEventListener('click', () => {
        // Easter egg
        const messages = [
            'Light mode? Never.',
            'Darkness is my friend',
            'The night is calling...',
            'Too bright for elite engineers',
            'Stay in the shadows',
            'Dark mode is the way',
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        alert(`${randomMessage} 🌙`);
    });
}

// ============================================================================
// PARALLAX SCROLL EFFECT
// ============================================================================

window.addEventListener('scroll', () => {
    const backgroundGlow = document.querySelector('.background-glow');
    const scrolled = window.pageYOffset;

    // Subtle parallax effect
    if (backgroundGlow) {
        backgroundGlow.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.5}px))`;
    }

    // Update nav on scroll
    const nav = document.querySelector('.navbar');
    if (scrolled > 100) {
        nav.style.borderBottomColor = 'rgba(139, 92, 246, 0.3)';
    } else {
        nav.style.borderBottomColor = 'rgba(139, 92, 246, 0.2)';
    }
});

// ============================================================================
// REVEAL COMMAND PALETTE HINT
// ============================================================================

// Show command palette hint after 5 seconds
setTimeout(() => {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 24px;
        background: rgba(139, 92, 246, 0.2);
        border: 1px solid rgba(139, 92, 246, 0.4);
        padding: 12px 16px;
        border-radius: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #06b6d4;
        z-index: 100;
        animation: fadeInUp 0.8s ease-out;
        cursor: pointer;
    `;
    hint.innerHTML = 'Tip: Press <strong>Ctrl+K</strong> to open terminal';

    hint.addEventListener('click', () => {
        hint.style.animation = 'fadeOutBoot 0.3s ease-out forwards';
        setTimeout(() => hint.remove(), 300);
    });

    document.body.appendChild(hint);

    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (hint.parentNode) {
            hint.style.animation = 'fadeOutBoot 0.3s ease-out forwards';
            setTimeout(() => hint.remove(), 300);
        }
    }, 8000);
}, 5000);

// ============================================================================
// ENHANCED PROJECT INTERACTIVITY
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        // Add stagger animation
        card.style.animation = `fadeInUp 0.8s ease-out ${0.1 * index}s both`;
    });
});

// ============================================================================
// PREVENT DOUBLE-BOOT ANIMATION
// ============================================================================

// Add boot-active class on load
document.body.classList.add('boot-active');

// ============================================================================
// SMOOTH SCROLL RESTORATION
// ============================================================================

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

// Preload critical resources
function preloadResources() {
    // Preload fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
}

preloadResources();

// ============================================================================
// EASTER EGG: KONAMI CODE
// ============================================================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonamiCode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiCode() {
    document.body.style.animation = 'spinAnimation 0.5s ease-in-out';
    alert('🎮 You are 1337! Elite engineer unlocked! 🚀');

    // Create floating text
    const flyingText = document.createElement('div');
    flyingText.innerHTML = '🚀 ELITE ENGINEER MODE ACTIVATED 🚀';
    flyingText.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        font-weight: 700;
        color: #06b6d4;
        font-family: 'JetBrains Mono', monospace;
        text-shadow: 0 0 20px rgba(6, 182, 212, 0.8);
        animation: floatAway 3s ease-out forwards;
        z-index: 10000;
        pointer-events: none;
    `;
    document.body.appendChild(flyingText);

    setTimeout(() => flyingText.remove(), 3000);
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spinAnimation {
        0% { transform: rotateZ(0deg); }
        100% { transform: rotateZ(5deg); }
    }
    @keyframes floatAway {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -200%) scale(0.5); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ============================================================================
// LAZY LOADING FOR IMAGES (WHEN ADDED)
// ============================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('%c🚀 Welcome to the AI Engineer Portfolio', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
console.log('%cPress Ctrl+K to open the command palette', 'color: #06b6d4; font-size: 12px;');
console.log('%cOr try the Konami Code... if you know it 👀', 'color: #3b82f6; font-size: 12px;');
