/**
 * Main JavaScript
 * Minimalist interactions for portfolio site
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initScrollReveal();
        initSmoothScroll();
        initHeaderScroll();
    }

    /**
     * Scroll Reveal Animation
     * Reveals elements as they enter the viewport
     */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.section');
        
        if (!revealElements.length) return;

        const revealOnScroll = function() {
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            revealElements.forEach(function(element) {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('visible');
                }
            });
        };

        // Add reveal class to sections
        revealElements.forEach(function(element) {
            element.classList.add('reveal');
        });

        // Initial check
        revealOnScroll();

        // Check on scroll
        window.addEventListener('scroll', revealOnScroll, { passive: true });
    }

    /**
     * Smooth Scroll for Navigation Links
     */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;

                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Header Background on Scroll
     */
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            } else {
                header.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

})();