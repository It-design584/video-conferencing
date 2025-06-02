// Vidco About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    function initMobileNav() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert mobile menu button before nav
        header.insertBefore(mobileMenuBtn, nav);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            mobileMenuBtn.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('nav-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target)) {
                nav.classList.remove('nav-open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
    
    // Testimonials Carousel
    function initTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        let currentTestimonial = 1; // Start with middle card active
        
        function showTestimonial(index) {
            // Remove active class from all cards and dots
            testimonialCards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current card and dot
            if (testimonialCards[index]) {
                testimonialCards[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            currentTestimonial = index;
        }
        
        // Add click events to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        const testimonialsSection = document.querySelector('.testimonials');
        
        testimonialsSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        testimonialsSection.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next testimonial
                    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                } else {
                    // Swipe right - previous testimonial
                    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
                }
                showTestimonial(currentTestimonial);
            }
        }
    }
    
    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu if open
                const nav = document.querySelector('nav');
                nav.classList.remove('nav-open');
            });
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Observe team members
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
            member.style.animationDelay = `${index * 0.1}s`;
            observer.observe(member);
        });
    }
    
    // Header Scroll Effect
    function initHeaderScroll() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide header on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Team Member Hover Effects
    function initTeamHovers() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            member.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });
    }
    
    // Sign Up Button Interaction
    function initSignUpButton() {
        const signUpBtn = document.querySelector('.sign-up-btn');
        
        if (signUpBtn) {
            signUpBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add loading state
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Simulate API call
                setTimeout(() => {
                    // Reset button
                    this.classList.remove('loading');
                    this.innerHTML = 'Sign Up';
                    
                    // Show success message or redirect
                    alert('Thank you for your interest! Redirecting to sign up page...');
                    // window.location.href = '/signup';
                }, 2000);
            });
        }
    }
    
    // Star Rating Interaction
    function initStarRatings() {
        const ratings = document.querySelectorAll('.rating');
        
        ratings.forEach(rating => {
            const stars = rating.querySelectorAll('i');
            
            stars.forEach((star, index) => {
                star.addEventListener('mouseenter', function() {
                    // Highlight stars up to current one
                    for (let i = 0; i <= index; i++) {
                        stars[i].classList.remove('far');
                        stars[i].classList.add('fas');
                    }
                });
                
                star.addEventListener('mouseleave', function() {
                    // Reset to original state
                    stars.forEach((s, i) => {
                        if (s.classList.contains('fas')) {
                            // Keep original filled stars
                        } else {
                            s.classList.remove('fas');
                            s.classList.add('far');
                        }
                    });
                });
            });
        });
    }
    
    // Lazy Loading for Images
    function initLazyLoading() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Form Validation (if forms are added later)
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.classList.add('error');
                        isValid = false;
                    } else {
                        input.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // Submit form
                    console.log('Form is valid, submitting...');
                }
            });
        });
    }
    
    // Keyboard Navigation
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // ESC key closes mobile menu
            if (e.key === 'Escape') {
                const nav = document.querySelector('nav');
                nav.classList.remove('nav-open');
            }
            
            // Arrow keys for testimonial navigation
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const dots = document.querySelectorAll('.dot');
                const activeDot = document.querySelector('.dot.active');
                
                if (activeDot) {
                    const currentIndex = Array.from(dots).indexOf(activeDot);
                    let newIndex;
                    
                    if (e.key === 'ArrowLeft') {
                        newIndex = (currentIndex - 1 + dots.length) % dots.length;
                    } else {
                        newIndex = (currentIndex + 1) % dots.length;
                    }
                    
                    dots[newIndex].click();
                }
            }
        });
    }
   
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    const testimonialsSection = document.querySelector('.testimonials');
    
    if (testimonialsSection) {
        testimonialsSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            clearInterval(autoplayInterval); // Pause autoplay on touch
        });
        
        testimonialsSection.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoplay(); // Resume autoplay after touch
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next testimonial
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            } else {
                // Swipe right - previous testimonial
                currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            }
            showTestimonial(currentTestimonial);
        }
    }
    
    // Initialize the carousel
    showTestimonial(currentTestimonial);
    startAutoplay();
    
    // Pause autoplay when hovering over testimonials
    testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    testimonialsSection.addEventListener('mouseleave', () => {
        startAutoplay();
    });
}

// Make sure to call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonials();
});
    // Performance Monitoring
    function initPerformanceMonitoring() {
        // Log page load time
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
        
        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    scrollTimeout = null;
                    // Scroll performance logic here
                }, 16); // ~60fps
            }
        });
    }
    
    // Initialize all functionality
    function init() {
        initMobileNav();
        initTestimonials();
        initSmoothScrolling();
        initScrollAnimations();
        initHeaderScroll();
        initTeamHovers();
        initSignUpButton();
        initStarRatings();
        initLazyLoading();
        initFormValidation();
        initKeyboardNavigation();
        initPerformanceMonitoring();
        
        console.log('Vidco About Page JavaScript initialized successfully!');
    }
    
    // Start the application
    init();
    
    // Expose some functions globally for debugging
    window.VidcoApp = {
        init,
        version: '1.0.0'
    };
});

// Utility Functions
const VidcoUtils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};