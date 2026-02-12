/* ==========================================
   BORN BY AI - Main JavaScript
   ==========================================
   
   Features:
   - Particle system (growth sparkles)
   - Success counter (F key → celebration)
   - Live counters (growth metrics)
   - Scroll animations
   - Card entrance animations
   - Confetti system
   - Easter eggs
   
   ========================================== */

(function() {
    'use strict';

    /* ==========================================
       CONFIGURATION
       ========================================== */
    const CONFIG = {
        particles: {
            count: 50,
            colors: ['#10b981', '#3b82f6', '#f59e0b', '#34d399'],
            minSize: 2,
            maxSize: 4
        },
        counters: {
            chatgptLaunchDate: new Date('2022-11-30'),
            queryMultiplier: 100, // billions per day estimate
            jobsCreated: 15, // millions
            successRate: 85 // percentage
        },
        animations: {
            observerThreshold: 0.1,
            staggerDelay: 100
        }
    };

    /* ==========================================
       DOM ELEMENTS
       ========================================== */
    const DOM = {
        particles: null,
        scrollTop: null,
        successCounter: null,
        graves: null,
        counters: {
            days: null,
            queries: null,
            jobs: null,
            stackoverflow: null
        }
    };

    /* ==========================================
       STATE
       ========================================== */
    const STATE = {
        successPresses: 0,
        particlesCreated: false,
        countersStarted: false,
        konamiCode: [],
        konamiPattern: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    };

    /* ==========================================
       INITIALIZATION
       ========================================== */
    function init() {
        cacheDOMElements();
        createParticles();
        setupEventListeners();
        initScrollAnimations();
        initNavigation();
        startCounters();
        
        console.log('🌟 Born by AI initialized successfully!');
    }

    function cacheDOMElements() {
        DOM.particles = document.getElementById('particles');
        DOM.scrollTop = document.getElementById('scrollTop');
        DOM.successCounter = document.getElementById('fCounter');
        DOM.graves = document.querySelectorAll('.grave');
        
        // Counter elements
        DOM.counters.days = document.getElementById('days-counter');
        DOM.counters.queries = document.getElementById('queries-counter');
        DOM.counters.jobs = document.getElementById('jobs-counter');
        DOM.counters.stackoverflow = document.getElementById('stackoverflow-counter');
    }

    /* ==========================================
       PARTICLE SYSTEM - GROWTH SPARKLES
       ========================================== */
    function createParticles() {
        if (!DOM.particles || STATE.particlesCreated) return;

        for (let i = 0; i < CONFIG.particles.count; i++) {
            createParticle();
        }

        STATE.particlesCreated = true;
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * (CONFIG.particles.maxSize - CONFIG.particles.minSize) + CONFIG.particles.minSize;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 10;
        const color = CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)];
        
        particle.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        
        DOM.particles.appendChild(particle);
    }

    /* ==========================================
       EVENT LISTENERS
       ========================================== */
    function setupEventListeners() {
        // Scroll to top button
        window.addEventListener('scroll', handleScroll);
        if (DOM.scrollTop) {
            DOM.scrollTop.addEventListener('click', scrollToTop);
        }

        // Success key (F) - celebration instead of respect
        document.addEventListener('keydown', handleKeyPress);

        // Grave card hover effects
        DOM.graves.forEach(grave => {
            grave.addEventListener('mouseenter', handleGraveHover);
        });

        // Navigation smooth scroll
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', handleNavClick);
        });
    }

    function handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Show/hide scroll to top button
        if (DOM.scrollTop) {
            if (scrolled > 500) {
                DOM.scrollTop.classList.add('visible');
            } else {
                DOM.scrollTop.classList.remove('visible');
            }
        }

        // Show success counter if any presses
        if (DOM.successCounter && STATE.successPresses > 0) {
            if (scrolled > 200) {
                DOM.successCounter.classList.add('visible');
            } else {
                DOM.successCounter.classList.remove('visible');
            }
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function handleKeyPress(e) {
        // Success key (F) - celebrates instead of paying respects
        if (e.key === 'f' || e.key === 'F') {
            celebrateSuccess();
        }

        // Konami code easter egg
        STATE.konamiCode.push(e.key);
        if (STATE.konamiCode.length > 10) {
            STATE.konamiCode.shift();
        }
        checkKonamiCode();
    }

    function celebrateSuccess() {
        STATE.successPresses++;
        updateSuccessCounter();
        createFloatingCelebration();
        createConfetti();
        
        // Find random grave and celebrate it
        const randomGrave = DOM.graves[Math.floor(Math.random() * DOM.graves.length)];
        if (randomGrave) {
            randomGrave.classList.add('respected');
            setTimeout(() => {
                randomGrave.classList.remove('respected');
            }, 500);
        }
    }

    function updateSuccessCounter() {
        const countElement = DOM.successCounter?.querySelector('.f-count');
        if (countElement) {
            countElement.textContent = STATE.successPresses;
            animateNumber(countElement);
        }
    }

    function createFloatingCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'floating-f';
        celebration.textContent = '🌟';
        celebration.style.left = `${Math.random() * 80 + 10}%`;
        celebration.style.top = `${Math.random() * 80 + 10}%`;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 2000);
    }

    function createConfetti() {
        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#34d399', '#60a5fa'];
        const confettiCount = 20;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = `${Math.random() * 0.5}s`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 50);
        }
    }

    function handleGraveHover(e) {
        const grave = e.currentTarget;
        const icon = grave.querySelector('.grave-icon');
        
        if (icon && !icon.querySelector('img')) {
            // Animate emoji icons on hover
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 300);
        }
    }

    /* ==========================================
       SCROLL ANIMATIONS
       ========================================== */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: CONFIG.animations.observerThreshold,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * CONFIG.animations.staggerDelay);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all grave cards
        DOM.graves.forEach(grave => {
            observer.observe(grave);
        });

        // Observe other animated elements
        document.querySelectorAll('.collateral-card, .source-card, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    /* ==========================================
       NAVIGATION
       ========================================== */
    function initNavigation() {
        const sections = document.querySelectorAll('.cemetery-section');
        const navTabs = document.querySelectorAll('.nav-tab');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('href') === `#${current}`) {
                    tab.classList.add('active');
                }
            });
        });
    }

    function handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for sticky nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    /* ==========================================
       LIVE COUNTERS - GROWTH METRICS
       ========================================== */
    function startCounters() {
        if (STATE.countersStarted) return;
        
        const counterSection = document.querySelector('.counter-section');
        if (!counterSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !STATE.countersStarted) {
                    STATE.countersStarted = true;
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(counterSection);
    }

    function animateCounters() {
        // Days since ChatGPT launch
        const daysSince = Math.floor((new Date() - CONFIG.counters.chatgptLaunchDate) / (1000 * 60 * 60 * 24));
        animateCounter(DOM.counters.days, 0, daysSince, 2000);

        // Total queries (in trillions)
        const totalQueries = (daysSince * CONFIG.counters.queryMultiplier / 1000).toFixed(1);
        animateCounter(DOM.counters.queries, 0, parseFloat(totalQueries), 2000, 1);

        // Jobs created (in millions)
        animateCounter(DOM.counters.jobs, 0, CONFIG.counters.jobsCreated, 2000, 1, 'M+');

        // Success rate
        animateCounter(DOM.counters.stackoverflow, 0, CONFIG.counters.successRate, 2000, 0, '%');

        // Keep updating queries in real-time
        setInterval(() => {
            if (DOM.counters.queries) {
                const current = parseFloat(DOM.counters.queries.textContent);
                const increment = 0.001; // Small increment every second
                DOM.counters.queries.textContent = (current + increment).toFixed(1);
            }
        }, 1000);
    }

    function animateCounter(element, start, end, duration, decimals = 0, suffix = '') {
        if (!element) return;

        const startTime = performance.now();
        const range = end - start;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * easeOut);
            
            element.textContent = current.toFixed(decimals) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end.toFixed(decimals) + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    function animateNumber(element) {
        element.style.transform = 'scale(1.2)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    /* ==========================================
       KONAMI CODE EASTER EGG
       ========================================== */
    function checkKonamiCode() {
        const codeMatch = STATE.konamiCode.join(',') === STATE.konamiPattern.join(',');
        
        if (codeMatch) {
            triggerPartyMode();
            STATE.konamiCode = [];
        }
    }

    function triggerPartyMode() {
        document.body.classList.add('party-mode');
        
        // Show success message
        showEasterEggMessage('🎉 CELEBRATION MODE ACTIVATED! 🎉');
        
        // Create massive confetti burst
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 50);
        }

        // Turn off party mode after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('party-mode');
        }, 10000);
    }

    function showEasterEggMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'easter-egg-message';
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.opacity = '0';
            setTimeout(() => {
                messageEl.remove();
            }, 300);
        }, 3000);
    }

    /* ==========================================
       STAT BOX INTERACTIONS
       ========================================== */
    function initStatBoxes() {
        const statBoxes = document.querySelectorAll('.stat-box');
        
        statBoxes.forEach(box => {
            box.addEventListener('click', function() {
                // Create a sparkle effect
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: absolute;
                    font-size: 2rem;
                    pointer-events: none;
                    animation: floatUp 1s ease-out forwards;
                `;
                
                const rect = this.getBoundingClientRect();
                sparkle.style.left = `${rect.left + rect.width/2}px`;
                sparkle.style.top = `${rect.top}px`;
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            });
        });
    }

    /* ==========================================
       THEME TOGGLE (if theme toggle button exists)
       ========================================== */
    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            const sunIcon = themeToggle.querySelector('.icon-sun');
            const moonIcon = themeToggle.querySelector('.icon-moon');
            
            if (sunIcon && moonIcon) {
                if (newTheme === 'dark') {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                }
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    /* ==========================================
       FORM VALIDATION (if submit form exists)
       ========================================== */
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show success message
                showEasterEggMessage('✅ Submission received! Thank you for contributing! 🙏');
                
                // Create success confetti
                createConfetti();
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                }, 1000);
            });
        });
    }

    /* ==========================================
       TOOLTIP SYSTEM
       ========================================== */
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                const tooltip = this.getAttribute('data-tooltip');
                this.style.position = 'relative';
            });
        });
    }

    /* ==========================================
       COPY TO CLIPBOARD
       ========================================== */
    function initCopyButtons() {
        const codeBlocks = document.querySelectorAll('code');
        
        codeBlocks.forEach(code => {
            if (code.textContent.length > 20) {
                code.style.cursor = 'pointer';
                code.title = 'Click to copy';
                
                code.addEventListener('click', function() {
                    const text = this.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        showToast('✅ Copied to clipboard!', 'success');
                    });
                });
            }
        });
    }

    /* ==========================================
       TOAST NOTIFICATIONS
       ========================================== */
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✅' : 
                     type === 'error' ? '❌' : 
                     type === 'warning' ? '⚠️' : 'ℹ️';
        
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">×</button>
        `;
        
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(toast);
        
        // Auto remove after 3 seconds
        const timeout = setTimeout(() => {
            removeToast(toast);
        }, 3000);
        
        // Manual close
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeout);
            removeToast(toast);
        });
    }

    function removeToast(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    /* ==========================================
       PERFORMANCE MONITORING
       ========================================== */
    function logPerformance() {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`🚀 Page loaded in ${pageLoadTime}ms`);
        }
    }

    /* ==========================================
       ACCESSIBILITY ENHANCEMENTS
       ========================================== */
    function initAccessibility() {
        // Skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Keyboard navigation for cards
        DOM.graves.forEach(grave => {
            grave.setAttribute('tabindex', '0');
            grave.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    grave.click();
                }
            });
        });
    }

    /* ==========================================
       LAZY LOADING IMAGES
       ========================================== */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /* ==========================================
       ANALYTICS (Privacy-friendly)
       ========================================== */
    function trackEvent(eventName, eventData = {}) {
        // Simple console logging for now
        // Replace with your analytics solution
        console.log(`📊 Event: ${eventName}`, eventData);
    }

    /* ==========================================
       MOBILE MENU TOGGLE
       ========================================== */
    function initMobileMenu() {
        const nav = document.querySelector('.category-nav');
        if (!nav) return;

        // Create mobile menu toggle button
        if (window.innerWidth <= 768) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'Toggle menu');
            
            nav.parentElement.insertBefore(menuToggle, nav);
            
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('mobile-open');
                menuToggle.innerHTML = nav.classList.contains('mobile-open') ? '×' : '☰';
            });
        }
    }

    /* ==========================================
       MAIN ENTRY POINT
       ========================================== */
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Additional initializations after load
    window.addEventListener('load', () => {
        initStatBoxes();
        initThemeToggle();
        initFormValidation();
        initTooltips();
        initCopyButtons();
        initAccessibility();
        initLazyLoading();
        initMobileMenu();
        logPerformance();
        
        console.log('🎉 All systems ready!');
    });

    /* ==========================================
       ERROR HANDLING
       ========================================== */
    window.addEventListener('error', (e) => {
        console.error('⚠️ Runtime error:', e.error);
        trackEvent('error', {
            message: e.error.message,
            stack: e.error.stack
        });
    });

    /* ==========================================
       EXPORT FOR DEBUGGING
       ========================================== */
    window.BornByAI = {
        version: '1.0.0',
        state: STATE,
        config: CONFIG,
        celebrateSuccess,
        triggerPartyMode,
        showToast
    };

})();