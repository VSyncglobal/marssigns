/**
 * MarsSign - Core Logic, Carousel Engine, Hardware-Accelerated Motion & State Management
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GLOBAL LOADING STATE MANAGEMENT ---
    const loader = document.getElementById('global-loader');
    
    const showLoader = () => {
        if (loader) loader.classList.add('active');
    };

    const hideLoader = () => {
        if (loader) loader.classList.remove('active');
    };

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', () => showLoader());
    });

    const asyncLinks = document.querySelectorAll('.async-click');
    asyncLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const isBackLink = link.classList.contains('back-btn');
            if(!isBackLink) {
                // If it's a normal link, we show loader. 
                // Remove preventDefault if you want the browser to actually navigate immediately.
                showLoader();
                setTimeout(hideLoader, 850); 
            }
        });
    });

    // --- 2. HEADER DROPDOWN LOGIC ---
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.getElementById('work-with-us-btn');

    if (dropdown && dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // --- 3. FAQ ACCORDION LOGIC ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all others
                faqItems.forEach(faq => faq.classList.remove('active'));
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --- 4. AUTO-PLAYING HERO CAROUSEL ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.control-dot');
    const slideCount = slides.length;
    let autoplayInterval;

    function goToSlide(index) {
        if (!slides[currentSlide] || !dots[currentSlide]) return;
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slideCount;
        goToSlide(nextIndex);
    }

    if (slideCount > 0) {
        autoplayInterval = setInterval(nextSlide, 5500);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoplayInterval);
            goToSlide(index);
            autoplayInterval = setInterval(nextSlide, 5500);
        });
    });

    // --- 5. SCROLL-DRIVEN FADE ANIMATIONS ---
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.12 };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal-fade, .fade-in-section");
    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. DYNAMIC NUMBER COUNTER ---
    const counters = document.querySelectorAll('.stat-num');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const updateCount = () => {
                    const count = +entry.target.innerText;
                    const inc = target / 40; 
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 40);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => { counterObserver.observe(counter); });

    // --- 7. DYNAMIC FLOATING HEADER ---
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
        if (!header) return; 
        
        if (window.scrollY > 80) {
            header.style.width = "100%";
            header.style.borderRadius = "0px";
            header.style.top = "0px";
            header.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.08)";
        } else {
            header.style.width = "90%";
            header.style.borderRadius = "40px";
            header.style.top = "20px";
            header.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.04)";
        }
    }, { passive: true });

});