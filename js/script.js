// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    // Toggle active class on hamburger
    hamburger.classList.toggle('active');
    // Toggle active class on nav links
    navLinks.classList.toggle('active');
    // Animate links
    animateLinks();
});

// Close mobile menu when clicking on a link
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Animate links when mobile menu opens
function animateLinks() {
    if (navLinks.classList.contains('active')) {
        links.forEach((link, index) => {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
    } else {
        links.forEach(link => {
            link.style.animation = '';
        });
    }
}

// Add animation to elements when scrolling
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .cta-button');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
    });
    
    ctaButtons.forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'all 0.6s ease-out 0.3s';
    });
    
    // Trigger initial animation
    setTimeout(() => {
        animateOnScroll();
    }, 500);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current page in navigation
const currentLocation = location.href;
const navItems = document.querySelectorAll('.nav-links a');
const navLength = navItems.length;

for (let i = 0; i < navLength; i++) {
    if (navItems[i].href === currentLocation) {
        navItems[i].classList.add('active');
    }
}
