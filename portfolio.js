// Start
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector('.hamburger');
            const mainNav = document.querySelector('.main-nav');
            const navLinks = document.querySelectorAll('.nav-link');

            // --- Mobile Navigation ---
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mainNav.classList.toggle('active');
            });
            navLinks.forEach(link => link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            }));

            // --- Active Nav Link on Scroll ---
            const sections = document.querySelectorAll('section');
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.6 };
            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href').substring(1) === entry.target.id) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);
            sections.forEach(section => sectionObserver.observe(section));

            // --- Hide Header on Scroll ---
            let lastScrollTop = 0;
            const header = document.querySelector('.main-header');
            window.addEventListener('scroll', function() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.style.top = '-80px';
                } else {
                    header.style.top = '0';
                }
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }, false);

            // --- Fade-in Elements on Scroll ---
            const fadeElements = document.querySelectorAll('.fade-in');
            const fadeInObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            fadeElements.forEach(el => fadeInObserver.observe(el));

            // --- Contact Form ---
            const contactForm = document.getElementById('contact-form');
            const formMessage = document.getElementById('form-message');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                formMessage.textContent = "Thank you! Your message has been sent.";
                formMessage.style.color = 'var(--primary-color)';
                setTimeout(() => {
                    contactForm.reset();
                    formMessage.textContent = '';
                }, 4000);
            });
        });
