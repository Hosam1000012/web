// ============================================
// SIGN IN - CREATIVE JAVASCRIPT
// ============================================

// Initialize all form effects and animations on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSignInPage();
    setupFormAnimations();
    setupInputValidation();
    setupPasswordStrengthIndicator();
    setupFormSubmission();
    setupTogglePassword();
    setupFormFocus();
    addDynamicBackgroundGlow();
    setupKeyboardShortcuts();
});

// ============================================
// 1. TYPEWRITER EFFECT FOR HEADING
// ============================================
function initializeSignInPage() {
    const heading = document.querySelector('.signin-section h2');
    if (heading) {
        const originalText = heading.textContent;
        heading.textContent = '';
        heading.style.opacity = '1';
        
        let charIndex = 0;
        const typeSpeed = 100;
        
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
    const form = document.querySelector('.signin-form');
    const formGroups = document.querySelectorAll('.form-group');
    const button = document.querySelector('.signin-button');
    const signupLink = document.querySelector('.signup-link');
    
    // Animate form groups with stagger
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateX(-30px)';
        group.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateX(0)';
        }, 100);
    });
    
    // Animate button
    if (button) {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s';
        
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate signup link
    if (signupLink) {
        signupLink.style.opacity = '0';
        signupLink.style.transition = 'opacity 0.6s ease 0.6s';
        
        setTimeout(() => {
            signupLink.style.opacity = '1';
        }, 100);
    }
}

// ============================================
// 4. INPUT FIELD FOCUS EFFECTS
// ============================================
function setupFormFocus() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    
    inputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.03)';
            this.parentElement.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 0 20px rgba(245, 197, 24, 0.5)';
            
            // Add glow to label
            const label = this.parentElement.querySelector('label');
            if (label) {
                label.style.color = '#f5c518';
                label.style.textShadow = '0 0 10px rgba(245, 197, 24, 0.5)';
            }
        });
        
        // Blur effect
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 0 3px rgba(245, 197, 24, 0.3)';
            
            const label = this.parentElement.querySelector('label');
            if (label) {
                label.style.color = '#f5c518';
                label.style.textShadow = 'none';
            }
        });
    });
}

// ============================================
// 5. INPUT VALIDATION WITH VISUAL FEEDBACK
// ============================================
function setupInputValidation() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Username validation
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            validateUsername(this);
        });
        
        usernameInput.addEventListener('blur', function() {
            validateUsername(this);
        });
    }
    
    // Password validation
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this);
        });
    }
}

// ============================================
// 6. USERNAME VALIDATION
// ============================================
function validateUsername(input) {
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
        errorMsg.textContent = '⚠️ Username must be at least 3 characters';
        return false;
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
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
        errorMsg.textContent = '⚠️ Username can only contain letters, numbers, _ and -';
        return false;
    }
    
    input.style.borderColor = '#6bcf7f';
    if (errorMsg) errorMsg.remove();
    
    // Add success checkmark
    if (!formGroup.querySelector('.success-icon')) {
        const icon = document.createElement('span');
        icon.className = 'success-icon';
        icon.textContent = '✓';
        icon.style.color = '#6bcf7f';
        icon.style.position = 'absolute';
        icon.style.right = '10px';
        icon.style.top = '50%';
        icon.style.transform = 'translateY(-50%)';
        icon.style.fontSize = '1.2rem';
        formGroup.style.position = 'relative';
        formGroup.appendChild(icon);
    }
    
    return true;
}

// ============================================
// 7. PASSWORD VALIDATION
// ============================================
function validatePassword(input) {
    const value = input.value;
    const formGroup = input.parentElement;
    
    if (value.length === 0) {
        input.style.borderColor = '#f5c518';
        return false;
    }
    
    if (value.length < 6) {
        input.style.borderColor = '#ff6b6b';
        return false;
    }
    
    input.style.borderColor = '#6bcf7f';
    return true;
}

// ============================================
// 8. PASSWORD STRENGTH INDICATOR
// ============================================
function setupPasswordStrengthIndicator() {
    const passwordInput = document.getElementById('password');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Check password strength criteria
            if (password.length >= 6) strength++;
            if (password.length >= 10) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
            
            // Create or update strength indicator
            let indicator = this.parentElement.querySelector('.strength-indicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'strength-indicator';
                indicator.style.marginTop = '8px';
                indicator.style.height = '5px';
                indicator.style.borderRadius = '3px';
                indicator.style.backgroundColor = '#444';
                indicator.style.overflow = 'hidden';
                indicator.style.position = 'relative';
                this.parentElement.appendChild(indicator);
            }
            
            // Clear previous fill
            indicator.innerHTML = '';
            
            // Create fill bar
            const fill = document.createElement('div');
            fill.style.height = '100%';
            fill.style.width = (strength / 5) * 100 + '%';
            fill.style.transition = 'width 0.3s ease, background-color 0.3s ease';
            fill.style.borderRadius = '3px';
            
            // Color based on strength
            if (strength <= 1) {
                fill.style.backgroundColor = '#ff6b6b';
            } else if (strength <= 2) {
                fill.style.backgroundColor = '#ffa500';
            } else if (strength <= 3) {
                fill.style.backgroundColor = '#ffd93d';
            } else if (strength <= 4) {
                fill.style.backgroundColor = '#6bcf7f';
            } else {
                fill.style.backgroundColor = '#00ff00';
            }
            
            indicator.appendChild(fill);
            
            // Add strength text
            let strengthText = this.parentElement.querySelector('.strength-text');
            if (!strengthText) {
                strengthText = document.createElement('small');
                strengthText.className = 'strength-text';
                strengthText.style.display = 'block';
                strengthText.style.marginTop = '5px';
                strengthText.style.fontSize = '0.85rem';
                this.parentElement.appendChild(strengthText);
            }
            
            const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
            strengthText.textContent = 'Strength: ' + strengthLabels[strength];
            strengthText.style.color = fill.style.backgroundColor;
        });
    }
}

// ============================================
// 9. TOGGLE PASSWORD VISIBILITY
// ============================================
function setupTogglePassword() {
    const passwordInput = document.getElementById('password');
    
    if (passwordInput) {
        const formGroup = passwordInput.parentElement;
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.textContent = '👁️';
        toggleBtn.style.position = 'absolute';
        toggleBtn.style.right = '10px';
        toggleBtn.style.top = '50%';
        toggleBtn.style.transform = 'translateY(-50%)';
        toggleBtn.style.background = 'none';
        toggleBtn.style.border = 'none';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.fontSize = '1.2rem';
        toggleBtn.style.color = '#f5c518';
        toggleBtn.style.transition = 'all 0.3s ease';
        
        formGroup.style.position = 'relative';
        formGroup.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        });
        
        toggleBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-50%) scale(1.2)';
        });
        
        toggleBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-50%) scale(1)';
        });
    }
}

// ============================================
// 10. FORM SUBMISSION WITH ANIMATION
// ============================================
function setupFormSubmission() {
    const form = document.querySelector('.signin-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const button = document.querySelector('.signin-button');
            
            // Validate inputs
            const usernameValid = validateUsername(usernameInput);
            const passwordValid = validatePassword(passwordInput);
            
            if (!usernameValid || !passwordValid) {
                shakeForm(form);
                showErrorNotification('Please fill in all fields correctly!');
                return;
            }
            
            // Disable button and show loading state
            button.disabled = true;
            button.style.pointerEvents = 'none';
            
            const originalText = button.textContent;
            button.innerHTML = '<span class="spinner"></span> Signing In...';
            button.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                button.style.backgroundColor = '#6bcf7f';
                button.innerHTML = '✓ Sign In Successful!';
                button.style.color = '#000';
                
                // Show success notification
                showSuccessNotification('Welcome to Rotten Potato! 🥔');
                
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
                    document.querySelectorAll('.success-icon').forEach(icon => icon.remove());
                    
                    // Reset input styles
                    document.querySelectorAll('input').forEach(input => {
                        input.style.borderColor = '#444';
                    });
                }, 2000);
            }, 1500);
        });
    }
}

// ============================================
// 11. FORM SHAKE ANIMATION
// ============================================
function shakeForm(form) {
    form.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        form.style.animation = 'none';
    }, 500);
}

// ============================================
// 12. ERROR NOTIFICATION
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
// 13. SUCCESS NOTIFICATION
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
    }, 3000);
}

// ============================================
// 14. DYNAMIC BACKGROUND GLOW
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
// 15. KEYBOARD SHORTCUTS
// ============================================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Enter to submit form
        if (e.key === 'Enter') {
            const form = document.querySelector('.signin-form');
            if (form && document.activeElement.tagName !== 'TEXTAREA') {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            const form = document.querySelector('.signin-form');
            if (form) {
                form.reset();
                document.querySelectorAll('.error-message').forEach(msg => msg.remove());
            }
        }
    });
}

// ============================================
// 16. ADD CSS ANIMATIONS DYNAMICALLY
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
    input[type="password"] {
        transition: all 0.3s ease !important;
    }
    
    input[type="text"]:focus,
    input[type="password"]:focus {
        outline: none !important;
    }
`;
document.head.appendChild(style);

// ============================================
// 17. ANALYTICS LOGGING
// ============================================
console.log('🥔 Welcome to Rotten Potato - Sign In Page');
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

