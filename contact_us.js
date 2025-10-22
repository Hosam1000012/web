// ============================================
// CONTACT US - CREATIVE JAVASCRIPT
// ============================================

// Initialize all form effects and animations on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
    setupFormAnimations();
    setupInputValidation();
    setupCharacterCounter();
    setupFormSubmission();
    setupFormFocus();
    addDynamicBackgroundGlow();
    setupKeyboardShortcuts();
    setupInfoBoxAnimations();
});

// ============================================
// 1. TYPEWRITER EFFECT FOR HEADING
// ============================================
function initializeContactPage() {
    const heading = document.querySelector('.contact-section h2');
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
                // Add blinking cursor
                addHeadingCursor(heading);
            }
        }
        
        typeCharacter();
    }
    
    // Animate subtitle
    const subtitle = document.querySelector('.contact-subtitle');
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(20px)';
        subtitle.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
        
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ============================================
// 2. ADD CURSOR TO HEADING
// ============================================
function addHeadingCursor(element) {
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    cursor.style.marginLeft = '2px';
    cursor.style.color = '#f5c518';
    element.appendChild(cursor);
}

// ============================================
// 3. FORM ANIMATIONS
// ============================================
function setupFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    const button = document.querySelector('.contact-button');
    
    // Animate form groups with stagger
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateX(-30px)';
        group.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateX(0)';
        }, 100);
    });
    
    // Animate button
    if (button) {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s';
        
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ============================================
// 4. INPUT FIELD FOCUS EFFECTS
// ============================================
function setupFormFocus() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], select, textarea');
    
    inputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
            
            // Add glow to label
            const label = this.parentElement.querySelector('label');
            if (label) {
                label.style.color = '#fff';
                label.style.textShadow = '0 0 10px rgba(245, 197, 24, 0.5)';
                label.style.transform = 'translateY(-2px)';
            }
        });
        
        // Blur effect
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            
            const label = this.parentElement.querySelector('label');
            if (label) {
                label.style.color = '#f5c518';
                label.style.textShadow = 'none';
                label.style.transform = 'translateY(0)';
            }
        });
    });
}

// ============================================
// 5. INPUT VALIDATION
// ============================================
function setupInputValidation() {
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const categoryInput = document.getElementById('category');
    const messageInput = document.getElementById('message');
    
    // Full Name validation
    if (fullnameInput) {
        fullnameInput.addEventListener('blur', function() {
            validateFullName(this);
        });
    }
    
    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });
        emailInput.addEventListener('input', function() {
            validateEmail(this);
        });
    }
    
    // Subject validation
    if (subjectInput) {
        subjectInput.addEventListener('blur', function() {
            validateSubject(this);
        });
    }
    
    // Category validation
    if (categoryInput) {
        categoryInput.addEventListener('change', function() {
            validateCategory(this);
        });
    }
    
    // Message validation
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateMessage(this);
        });
    }
}

// ============================================
// 6. FULL NAME VALIDATION
// ============================================
function validateFullName(input) {
    const value = input.value.trim();
    const formGroup = input.parentElement;
    let errorMsg = formGroup.querySelector('.error-message');
    
    if (value.length === 0) {
        input.style.borderColor = '#f5c518';
        if (errorMsg) errorMsg.remove();
        return false;
    }
    
    if (value.length < 2) {
        input.style.borderColor = '#ff6b6b';
        if (!errorMsg) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#ff6b6b';
            errorMsg.style.display = 'block';
            errorMsg.style.marginTop = '5px';
            errorMsg.style.fontSize = '0.85rem';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = '⚠️ Please enter a valid name';
        return false;
    }
    
    input.style.borderColor = '#6bcf7f';
    if (errorMsg) errorMsg.remove();
    return true;
}

// ============================================
// 7. EMAIL VALIDATION
// ============================================
function validateEmail(input) {
    const value = input.value.trim();
    const formGroup = input.parentElement;
    let errorMsg = formGroup.querySelector('.error-message');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value.length === 0) {
        input.style.borderColor = '#f5c518';
        if (errorMsg) errorMsg.remove();
        return false;
    }
    
    if (!emailRegex.test(value)) {
        input.style.borderColor = '#ff6b6b';
        if (!errorMsg) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#ff6b6b';
            errorMsg.style.display = 'block';
            errorMsg.style.marginTop = '5px';
            errorMsg.style.fontSize = '0.85rem';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = '⚠️ Please enter a valid email address';
        return false;
    }
    
    input.style.borderColor = '#6bcf7f';
    if (errorMsg) errorMsg.remove();
    return true;
}

// ============================================
// 8. SUBJECT VALIDATION
// ============================================
function validateSubject(input) {
    const value = input.value.trim();
    const formGroup = input.parentElement;
    let errorMsg = formGroup.querySelector('.error-message');
    
    if (value.length === 0) {
        input.style.borderColor = '#f5c518';
        if (errorMsg) errorMsg.remove();
        return false;
    }
    
    if (value.length < 3) {
        input.style.borderColor = '#ff6b6b';
        if (!errorMsg) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#ff6b6b';
            errorMsg.style.display = 'block';
            errorMsg.style.marginTop = '5px';
            errorMsg.style.fontSize = '0.85rem';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = '⚠️ Subject must be at least 3 characters';
        return false;
    }
    
    input.style.borderColor = '#6bcf7f';
    if (errorMsg) errorMsg.remove();
    return true;
}

// ============================================
// 9. CATEGORY VALIDATION
// ============================================
function validateCategory(input) {
    const value = input.value;
    
    if (value === '') {
        input.style.borderColor = '#ff6b6b';
        return false;
    }
    
    input.style.borderColor = '#6bcf7f';
    return true;
}

// ============================================
// 10. MESSAGE VALIDATION
// ============================================
function validateMessage(input) {
    const value = input.value.trim();
    const formGroup = input.parentElement;
    let errorMsg = formGroup.querySelector('.error-message');
    
    if (value.length === 0) {
        input.style.borderColor = '#f5c518';
        if (errorMsg) errorMsg.remove();
        return false;
    }
    
    if (value.length < 10) {
        input.style.borderColor = '#ff6b6b';
        if (!errorMsg) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#ff6b6b';
            errorMsg.style.display = 'block';
            errorMsg.style.marginTop = '5px';
            errorMsg.style.fontSize = '0.85rem';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = '⚠️ Message must be at least 10 characters';
        return false;
    }
    
    input.style.borderColor = '#6bcf7f';
    if (errorMsg) errorMsg.remove();
    return true;
}

// ============================================
// 11. CHARACTER COUNTER FOR MESSAGE
// ============================================
function setupCharacterCounter() {
    const messageInput = document.getElementById('message');
    const charCountDisplay = document.querySelector('.char-count');
    const maxChars = 500;
    
    if (messageInput && charCountDisplay) {
        messageInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCountDisplay.textContent = currentLength + ' / ' + maxChars;
            
            // Change color based on usage
            if (currentLength > maxChars) {
                this.value = this.value.substring(0, maxChars);
                charCountDisplay.style.color = '#ff6b6b';
            } else if (currentLength > maxChars * 0.8) {
                charCountDisplay.style.color = '#ffd93d';
            } else {
                charCountDisplay.style.color = '#888';
            }
        });
    }
}

// ============================================
// 12. FORM SUBMISSION WITH VALIDATION
// ============================================
function setupFormSubmission() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullnameInput = document.getElementById('fullname');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const categoryInput = document.getElementById('category');
            const messageInput = document.getElementById('message');
            const button = document.querySelector('.contact-button');
            
            // Validate all fields
            const fullnameValid = validateFullName(fullnameInput);
            const emailValid = validateEmail(emailInput);
            const subjectValid = validateSubject(subjectInput);
            const categoryValid = validateCategory(categoryInput);
            const messageValid = validateMessage(messageInput);
            
            if (!fullnameValid || !emailValid || !subjectValid || !categoryValid || !messageValid) {
                shakeForm(form);
                showErrorNotification('Please fill in all fields correctly!');
                return;
            }
            
            // Disable button and show loading state
            button.disabled = true;
            button.style.pointerEvents = 'none';
            
            const originalText = button.textContent;
            button.innerHTML = '<span class="spinner"></span> Sending...';
            button.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                button.style.backgroundColor = '#6bcf7f';
                button.innerHTML = '✓ Message Sent Successfully!';
                button.style.color = '#000';
                
                // Show success notification
                showSuccessNotification('Thank you for contacting us! We\'ll get back to you soon. 🥔');
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    button.style.backgroundColor = '#f5c518';
                    button.innerHTML = originalText;
                    button.style.color = '#000000';
                    button.style.opacity = '1';
                    button.disabled = false;
                    button.style.pointerEvents = 'auto';
                    
                    // Reset form
                    form.reset();
                    
                    // Clear error messages
                    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
                    
                    // Reset input styles
                    document.querySelectorAll('input, select, textarea').forEach(input => {
                        input.style.borderColor = '#444';
                    });
                    
                    // Reset character counter
                    document.querySelector('.char-count').textContent = '0 / 500';
                    document.querySelector('.char-count').style.color = '#888';
                }, 2000);
            }, 1500);
        });
    }
}

// ============================================
// 13. FORM SHAKE ANIMATION
// ============================================
function shakeForm(form) {
    form.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        form.style.animation = 'none';
    }, 500);
}

// ============================================
// 14. ERROR NOTIFICATION
// ============================================
function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error-notification';
    notification.textContent = '❌ ' + message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'rgba(255, 107, 107, 0.9)';
    notification.style.color = '#fff';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideInRight 0.3s ease';
    notification.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// 15. SUCCESS NOTIFICATION
// ============================================
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success-notification';
    notification.textContent = '✓ ' + message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'rgba(107, 207, 127, 0.9)';
    notification.style.color = '#fff';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideInRight 0.3s ease';
    notification.style.boxShadow = '0 4px 12px rgba(107, 207, 127, 0.3)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// 16. INFO BOX ANIMATIONS
// ============================================
function setupInfoBoxAnimations() {
    const infoBoxes = document.querySelectorAll('.contact-info-box');
    
    infoBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, 100);
    });
}

// ============================================
// 17. DYNAMIC BACKGROUND GLOW
// ============================================
function addDynamicBackgroundGlow() {
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
// 18. KEYBOARD SHORTCUTS
// ============================================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Enter to submit form (when in textarea, use Ctrl+Enter)
        if (e.key === 'Enter' && e.ctrlKey) {
            const form = document.querySelector('.contact-form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            const form = document.querySelector('.contact-form');
            if (form) {
                form.reset();
                document.querySelectorAll('.error-message').forEach(msg => msg.remove());
                document.querySelectorAll('input, select, textarea').forEach(input => {
                    input.style.borderColor = '#444';
                });
            }
        }
    });
}

// ============================================
// 19. SOCIAL LINK ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ============================================
// 20. ADD CSS ANIMATIONS DYNAMICALLY
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .spinner {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        border-top-color: #000000;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
    }
    
    .form-group {
        position: relative;
    }
    
    input[type="text"],
    input[type="email"],
    select,
    textarea {
        transition: all 0.3s ease !important;
    }
    
    input[type="text"]:focus,
    input[type="email"]:focus,
    select:focus,
    textarea:focus {
        outline: none !important;
    }
`;
document.head.appendChild(style);

// ============================================
// 21. ANALYTICS LOGGING
// ============================================
console.log('🥔 Welcome to Rotten Potato - Contact Us Page');
console.log('Page loaded at: ' + new Date().toLocaleString());
console.log('All interactive features are ready!');

// Track form interactions
let formInteractions = 0;
document.addEventListener('input', function() {
    formInteractions++;
});

window.addEventListener('beforeunload', function() {
    console.log('Form interactions: ' + formInteractions);
});

