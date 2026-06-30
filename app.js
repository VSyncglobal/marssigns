/**
 * MarsSign - Core Logic, Carousel Engine & Hardware-Accelerated Motion
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. AUTO-PLAYING HERO CAROUSEL
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.control-dot');
    const slideCount = slides.length;
    let autoplayInterval;

    function goToSlide(index) {
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

    // 2. SCROLL-DRIVEN FADE ANIMATIONS
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.12 };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal-fade");
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. DYNAMIC NUMBER COUNTER
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

    // 4. DYNAMIC FLOATING HEADER
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
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