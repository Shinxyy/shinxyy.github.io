// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const typingText = document.getElementById('typing-text');
    
    // Only show loading screen on main page and if not already shown in this session
    const isMainPage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '/home/shinxy/Documents/portfolio_website/';
    const hasShownLoading = sessionStorage.getItem('loadingShown');
    
    if (!loadingScreen) {
        return; // No loading screen on this page
    }
    
    if (!isMainPage || hasShownLoading) {
        // Hide loading screen immediately if not main page or already shown
        loadingScreen.style.display = 'none';
        return;
    }
    
    // Mark that loading has been shown in this session
    sessionStorage.setItem('loadingShown', 'true');
    
    const commands = [
        'Accessing secure network...'
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    
    function typeCommand() {
        if (commandIndex < commands.length) {
            if (charIndex < commands[commandIndex].length) {
                typingText.textContent += commands[commandIndex][charIndex];
                charIndex++;
                setTimeout(typeCommand, 20);
            } else {
                setTimeout(() => {
                    typingText.textContent = '';
                    charIndex = 0;
                    commandIndex++;
                    if (commandIndex < commands.length) {
                        typeCommand();
                    } else {
                        setTimeout(() => {
                            loadingScreen.style.opacity = '0';
                            setTimeout(() => {
                                loadingScreen.style.display = 'none';
                            }, 300);
                        }, 200);
                    }
                }, 200);
            }
        }
    }
    
    typeCommand();
});

// Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Matrix background animation
function createMatrixRain() {
    const matrix = document.querySelector('.matrix-bg');
    const characters = '01';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = i * 20 + 'px';
        column.style.color = '#00ff0020';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'monospace';
        column.style.animation = `matrix-fall ${Math.random() * 5 + 5}s linear infinite`;
        column.style.animationDelay = Math.random() * 5 + 's';
        
        let text = '';
        for (let j = 0; j < 50; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;
        
        matrix.appendChild(column);
    }
}

// Add matrix fall animation
const style = document.createElement('style');
style.textContent = `
    @keyframes matrix-fall {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
    }
`;
document.head.appendChild(style);

// Initialize matrix background
createMatrixRain();

// Skill bar animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Writeups filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const writeupCards = document.querySelectorAll('.writeup-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        writeupCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typingElement = document.querySelector('.typing-animation');
            if (typingElement && !typingElement.classList.contains('typed')) {
                typingElement.classList.add('typed');
                typeWriter(typingElement, 'Patrick Kuin', 150);
            }
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Terminal form submission
const terminalForm = document.querySelector('.terminal-form');
if (terminalForm) {
    terminalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Simulate sending
        submitBtn.textContent = '$ sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = '$ message sent!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    });
}

// Add glitch effect to random elements
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.hero-title, .section-title');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s ease-in-out';
            setTimeout(() => {
                element.style.animation = '';
            }, 300);
        });
    });
}

// Add glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(glitchStyle);

addGlitchEffect();

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.matrix-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects to cards
document.querySelectorAll('.writeup-card, .achievement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Subtle hover effect for skill categories (handled by CSS)
document.querySelectorAll('.skill-category').forEach(category => {
    // Skill category hover is now handled entirely by CSS for smoother effects
});

// Terminal cursor blinking
function blinkCursor() {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 1000);
    });
}

blinkCursor();

// Add random binary background
function addBinaryBackground() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const binaryOverlay = document.createElement('div');
            binaryOverlay.style.position = 'absolute';
            binaryOverlay.style.top = '0';
            binaryOverlay.style.left = '0';
            binaryOverlay.style.width = '100%';
            binaryOverlay.style.height = '100%';
            binaryOverlay.style.opacity = '0.03';
            binaryOverlay.style.zIndex = '1';
            binaryOverlay.style.pointerEvents = 'none';
            binaryOverlay.style.fontFamily = 'monospace';
            binaryOverlay.style.fontSize = '12px';
            binaryOverlay.style.color = '#00ff00';
            binaryOverlay.style.overflow = 'hidden';
            
            let binaryText = '';
            for (let i = 0; i < 1000; i++) {
                binaryText += Math.random() > 0.5 ? '1' : '0';
                if (i % 50 === 0) binaryText += '\n';
            }
            binaryOverlay.textContent = binaryText;
            
            section.style.position = 'relative';
            section.appendChild(binaryOverlay);
        }
    });
}

addBinaryBackground();

// Enhance button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activation
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        konamiCode = [];
        
        // Show easter egg message
        const message = document.createElement('div');
        message.textContent = 'H4CK3R M0D3 4CT1V4T3D!';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'var(--gradient-primary)';
        message.style.color = 'var(--bg-primary)';
        message.style.padding = '20px 40px';
        message.style.borderRadius = '12px';
        message.style.fontFamily = 'var(--font-mono)';
        message.style.fontSize = '24px';
        message.style.fontWeight = 'bold';
        message.style.zIndex = '10000';
        message.style.animation = 'glitch 2s ease-in-out';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
});

console.log('🔒 Security Portfolio Loaded Successfully');
console.log('💻 Ready for hacking challenges!');
console.log('🎯 Try the Konami code for a surprise...');
