// ============================================
// WHO WE ARE - CREATIVE JAVASCRIPT
// ============================================

// Initialize all animations and effects on page load
document.addEventListener('DOMContentLoaded', function() {
    initializePageAnimations();
    setupScrollAnimations();
    setupParallaxEffect();
    setupInteractiveElements();
    addGlowEffect();
    setupKeyboardNavigation();
});

// ============================================
// 1. TYPEWRITER EFFECT FOR HEADING
// ============================================
function initializePageAnimations() {
    const heading = document.querySelector('.about-section h2');
    if (heading) {
        const originalText = heading.textContent;
        heading.textContent = '';
        heading.style.opacity = '1';
        
        let charIndex = 0;
        const typeSpeed = 80;
        
        function typeCharacter() {
            if (charIndex < originalText.length) {
                heading.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, typeSpeed);
            } else {
                // Add cursor blink effect at the end
                addCursorBlink(heading);
            }
        }
        
        typeCharacter();
    }
    
    // Animate paragraphs with staggered fade-in
    animateParagraphs();
}

// ============================================
// 2. STAGGERED PARAGRAPH ANIMATIONS
// ============================================
function animateParagraphs() {
    const paragraphs = document.querySelectorAll('.about-section p');
    
    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(30px)';
        p.style.transition = `opacity 0.8s ease ${index * 0.3}s, transform 0.8s ease ${index * 0.3}s`;
        
        // Trigger animation
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 100);
    });
}

// ============================================
// 3. SCROLL-TRIGGERED ANIMATIONS
// ============================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-section p').forEach(p => {
        observer.observe(p);
    });
}

// ============================================
// 4. PARALLAX SCROLLING EFFECT
// ============================================
function setupParallaxEffect() {
    const mainContent = document.querySelector('.main-content');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (mainContent) {
            mainContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

// ============================================
// 5. INTERACTIVE PARAGRAPH HOVER EFFECTS
// ============================================
function setupInteractiveElements() {
    const paragraphs = document.querySelectorAll('.about-section p');
    
    paragraphs.forEach((p, index) => {
        // Hover effect
        p.addEventListener('mouseenter', function() {
            this.style.color = '#f5c518';
            this.style.transform = 'scale(1.02) translateX(10px)';
            this.style.transition = 'all 0.3s ease';
            this.style.textShadow = '0 0 20px rgba(245, 197, 24, 0.5)';
            
            // Highlight the underline
            const heading = document.querySelector('.about-section h2');
            if (heading && heading.style.textShadow !== '0 0 20px rgba(245, 197, 24, 0.5)') {
                heading.style.textShadow = '0 0 20px rgba(245, 197, 24, 0.3)';
            }
        });
        
        p.addEventListener('mouseleave', function() {
            this.style.color = '#c0c0c0';
            this.style.transform = 'scale(1) translateX(0)';
            this.style.textShadow = 'none';
            
            const heading = document.querySelector('.about-section h2');
            if (heading) {
                heading.style.textShadow = 'none';
            }
        });
    });
}

// ============================================
// 6. DYNAMIC GLOW EFFECT
// ============================================
function addGlowEffect() {
    const mainContent = document.querySelector('.main-content');
    let glowIntensity = 0;
    let glowDirection = 1;
    
    setInterval(() => {
        glowIntensity += glowDirection * 0.02;
        
        if (glowIntensity >= 1) glowDirection = -1;
        if (glowIntensity <= 0) glowDirection = 1;
        
        if (mainContent) {
            mainContent.style.boxShadow = `0 8px 32px rgba(245, 197, 24, ${0.3 + glowIntensity * 0.2})`;
        }
    }, 50);
}

// ============================================
// 7. CURSOR BLINK EFFECT
// ============================================
function addCursorBlink(element) {
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    cursor.style.marginLeft = '2px';
    element.appendChild(cursor);
}

// ============================================
// 8. KEYBOARD NAVIGATION
// ============================================
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Home key - scroll to top
        if (e.key === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // End key - scroll to bottom
        else if (e.key === 'End') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        // Arrow keys for navigation
        else if (e.key === 'ArrowUp') {
            window.scrollBy({ top: -100, behavior: 'smooth' });
        }
        else if (e.key === 'ArrowDown') {
            window.scrollBy({ top: 100, behavior: 'smooth' });
        }
    });
}

// ============================================
// 9. MOUSE TRACKING EFFECT ON HEADING
// ============================================
document.addEventListener('mousemove', function(e) {
    const heading = document.querySelector('.about-section h2');
    if (heading) {
        const rect = heading.getBoundingClientRect();
        const headingCenterX = rect.left + rect.width / 2;
        const headingCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - headingCenterY, e.clientX - headingCenterX);
        const distance = 3;
        
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        heading.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        heading.style.transition = 'transform 0.1s ease-out';
    }
});

// ============================================
// 10. SMOOTH SCROLL BEHAVIOR
// ============================================
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

// ============================================
// 11. DYNAMIC BACKGROUND ANIMATION
// ============================================
function animateBackground() {
    const aboutSection = document.querySelector('.about-section');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 0.3) % 360;
        // Subtle color shift in the background
        const lightness = 15 + Math.sin(hue / 360 * Math.PI) * 2;
    }, 100);
}

// ============================================
// 12. PAGE VISIBILITY DETECTION
// ============================================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - pausing animations');
    } else {
        console.log('Page visible - resuming animations');
    }
});

// ============================================
// 13. INTERSECTION OBSERVER FOR LAZY ANIMATIONS
// ============================================
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-section p').forEach(p => {
    animationObserver.observe(p);
});

// ============================================
// 14. ADD CSS ANIMATIONS DYNAMICALLY
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 8px 32px rgba(245, 197, 24, 0.3);
        }
        50% {
            box-shadow: 0 8px 32px rgba(245, 197, 24, 0.6);
        }
    }
    
    .about-section p {
        cursor: pointer;
        position: relative;
    }
    
    .about-section p::before {
        content: '';
        position: absolute;
        left: -5px;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 0;
        background-color: #f5c518;
        transition: height 0.3s ease;
    }
    
    .about-section p:hover::before {
        height: 100%;
    }
`;
document.head.appendChild(style);

// ============================================
// 15. ANALYTICS LOGGING
// ============================================
console.log('🥔 Welcome to Rotten Potato - Who We Are Page');
console.log('Page loaded at: ' + new Date().toLocaleString());
console.log('User Agent: ' + navigator.userAgent);

// Track time spent on page
let timeOnPage = 0;
setInterval(() => {
    timeOnPage++;
}, 1000);

window.addEventListener('beforeunload', function() {
    console.log('Time spent on page: ' + timeOnPage + ' seconds');
});

