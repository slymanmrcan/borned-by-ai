// Animated Counter for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            const displayValue = Math.floor(current);
            if (element.textContent.includes('$')) {
                element.textContent = '$' + displayValue.toLocaleString();
            } else {
                element.textContent = displayValue.toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (element.textContent.includes('$')) {
                element.textContent = '$' + target.toLocaleString() + (target >= 1000 ? 'B+' : '');
            } else {
                element.textContent = target.toLocaleString() + (target >= 100 ? '+' : 'M+');
            }
        }
    };
    
    updateCounter();
}

// Initialize counters when hero section is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.stat-value');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const hero = document.querySelector('.hero');
if (hero) {
    heroObserver.observe(hero);
}

// Category Filter
const categoryButtons = document.querySelectorAll('.category-btn');
const categorySections = document.querySelectorAll('.category-section');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter sections
        categorySections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            
            if (category === 'all') {
                section.classList.remove('hidden');
                // Re-trigger animations
                const cards = section.querySelectorAll('.birth-card');
                cards.forEach((card, index) => {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                });
            } else if (sectionCategory === category) {
                section.classList.remove('hidden');
                // Re-trigger animations
                const cards = section.querySelectorAll('.birth-card');
                cards.forEach((card, index) => {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                });
            } else {
                section.classList.add('hidden');
            }
        });
        
        // Smooth scroll to first visible section
        setTimeout(() => {
            const firstVisible = document.querySelector('.category-section:not(.hidden)');
            if (firstVisible && category !== 'all') {
                firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    });
});

// Intersection Observer for card animations
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all cards
const cards = document.querySelectorAll('.birth-card');
cards.forEach(card => {
    cardObserver.observe(card);
});

// Parallax effect for hero background
let scrollPosition = 0;

window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg && scrollPosition < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        heroBg.style.opacity = 1 - (scrollPosition / window.innerHeight);
    }
});

// Add sparkle effect on hover for cards
cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        createSparkles(e.currentTarget);
    });
});

function createSparkles(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'var(--neon-green)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = Math.random() * rect.width + 'px';
    sparkle.style.top = Math.random() * rect.height + 'px';
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(1) translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add typing effect to hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after page load
    setTimeout(typeWriter, 1000);
}

// Add glow effect to cards on scroll
const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
            setTimeout(() => {
                entry.target.style.boxShadow = '';
            }, 500);
        }
    });
}, { threshold: 0.5 });

cards.forEach(card => {
    glowObserver.observe(card);
});

// Dynamic gradient on mouse move for hero
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg && window.pageYOffset < window.innerHeight) {
            heroBg.style.background = `
                radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0, 255, 136, 0.2) 0%, transparent 50%),
                radial-gradient(circle at ${(1-x) * 100}% ${(1-y) * 100}%, rgba(0, 212, 255, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 60%)
            `;
        }
    });
}

// Add floating animation to timeline events
const timelineEvents = document.querySelectorAll('.timeline-event');
timelineEvents.forEach((event, index) => {
    event.style.animationDelay = `${index * 0.1}s`;
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 3s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Performance: Lazy load cards
const lazyCards = document.querySelectorAll('.birth-card');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyObserver.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '200px'
});

lazyCards.forEach(card => {
    lazyObserver.observe(card);
});

// Celebrate button clicks with confetti effect
function createConfetti(x, y) {
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 5;
        
        confetti.velocity = { x: vx, y: vy };
        document.body.appendChild(confetti);
        
        animateConfetti(confetti);
    }
}

function animateConfetti(confetti) {
    let opacity = 1;
    let y = parseFloat(confetti.style.top);
    let x = parseFloat(confetti.style.left);
    
    function update() {
        confetti.velocity.y += 0.3; // gravity
        x += confetti.velocity.x;
        y += confetti.velocity.y;
        opacity -= 0.02;
        
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(update);
        } else {
            confetti.remove();
        }
    }
    
    update();
}

// Add confetti to growth badges on click
document.querySelectorAll('.growth-badge, .salary-badge').forEach(badge => {
    badge.addEventListener('click', (e) => {
        e.stopPropagation();
        createConfetti(e.clientX, e.clientY);
    });
});

console.log('🚀 Born by AI - Where winners are celebrated!');
console.log('💰 Built with HTML, CSS, and JavaScript');
console.log('✨ Try the Konami code for a surprise!');
