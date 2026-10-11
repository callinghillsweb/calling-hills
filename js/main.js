// THREE.js loaded via CDN (window.THREE)
// GSAP loaded via CDN (window.gsap)
// ScrollTrigger loaded via CDN (window.ScrollTrigger)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════
   LOADER
═══════════════════════════════════════════ */
(function() {
    const loaderBar = document.getElementById('loader-bar');
    const loader = document.getElementById('loader');
    if (!loader) return;

    function dismiss() {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            if (typeof initHeroAnimations === 'function') {
                initHeroAnimations();
            }
        }
    }

    if (loaderBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 35;
            loaderBar.style.width = Math.min(progress, 100) + '%';
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(dismiss, 80);
            }
        }, 20);
    }

    // Bulletproof fallbacks
    setTimeout(dismiss, 500);
    window.addEventListener('DOMContentLoaded', dismiss);
    window.addEventListener('load', dismiss);
})();

    /* ═══════════════════════════════════════════
       THREE.JS PARTICLE FIELD
    ═══════════════════════════════════════════ */
    (function() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js is not loaded. Particle field bypassed.');
            return;
        }
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        // Particle field
        const PARTICLE_COUNT = 2500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3]     = (Math.random() - 0.5) * 28;  // x: -14 to 14
            positions[i * 3 + 1] = (Math.random() - 0.5) * 16;  // y: -8 to 8
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;   // z: -4 to 4
            sizes[i] = Math.random() * 0.5 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.018,
            color: new THREE.Color('#F4F2EE'),
            transparent: true,
            opacity: 0.45,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let scrollProgress = 0;

        // Listen for scroll
        window.addEventListener('scroll', () => {
            const heroEl = document.getElementById('hero');
            if (!heroEl) return;
            const rect = heroEl.getBoundingClientRect();
            const heroH = heroEl.offsetHeight;
            scrollProgress = Math.min(1, Math.max(0, -rect.top / heroH));
        });

        // Animation loop
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();
            const posArr = geometry.attributes.position.array;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                // Gentle upward float + sinusoidal drift
                posArr[i3 + 1] += 0.004 + Math.sin(elapsed * 0.5 + i) * 0.001;
                posArr[i3]     += Math.sin(elapsed * 0.3 + i * 0.01) * 0.002;

                // Wrap around
                if (posArr[i3 + 1] > 9)  posArr[i3 + 1] = -9;
                if (posArr[i3] > 15)      posArr[i3] = -15;
                if (posArr[i3] < -15)     posArr[i3] = 15;
            }

            geometry.attributes.position.needsUpdate = true;

            // Fade out based on scroll
            material.opacity = 0.45 * (1 - scrollProgress);

            renderer.render(scene, camera);
        }
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    })();

    /* ═══════════════════════════════════════════
       GSAP HERO ANIMATIONS
    ═══════════════════════════════════════════ */
    function initHeroAnimations() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP is not loaded. Skipping animations.');
            // Fallback: manually reveal elements that were supposed to be animated
            document.querySelectorAll('.hero-title .line-inner').forEach(el => { el.style.transform = 'translateY(0)'; });
            const fadeEls = ['#hero-tag', '#hero-script', '#hero-subtitle', '#hero-ctas', '#scroll-indicator'];
            fadeEls.forEach(sel => {
                const el = document.querySelector(sel);
                if(el) { el.style.opacity = 1; el.style.transform = 'translateY(0)'; }
            });
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Title lines reveal
        const lineInners = document.querySelectorAll('.hero-title .line-inner');
        gsap.to(lineInners, {
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.15,
            delay: 0.2
        });

        // Fade up elements
        const fadeEls = [
            { el: '#hero-tag',       delay: 0.3 },
            { el: '#hero-script',    delay: 0.6 },
            { el: '#hero-subtitle',  delay: 1.4 },
            { el: '#hero-ctas',      delay: 1.8 },
            { el: '#scroll-indicator', delay: 2.2 },
        ];

        fadeEls.forEach(({ el, delay }) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay
            });
        });

        // ScrollTrigger — parallax & fade
        gsap.to('#hero-bg', {
            scale: 1.07,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: '+=700',
                scrub: true
            }
        });

        gsap.to('#hero-content', {
            y: -120,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: '+=600',
                scrub: true
            }
        });

        // Scroll indicator fade
        gsap.to('#scroll-indicator', {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: '60px top',
                end: '+=100',
                scrub: true
            }
        });
    }

    /* ═══════════════════════════════════════════
       NAVBAR SCROLL EFFECT
    ═══════════════════════════════════════════ */
    (function() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    })();

    /* ═══════════════════════════════════════════
       MOBILE MENU
    ═══════════════════════════════════════════ */
    (function() {
        const hamburger = document.getElementById('nav-hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        if (!hamburger || !mobileMenu) return;
        const links = mobileMenu.querySelectorAll('a');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    })();

    /* ═══════════════════════════════════════════
       MAGNETIC BUTTONS
    ═══════════════════════════════════════════ */
    (function() {
        const magneticEls = document.querySelectorAll('.magnetic');

        magneticEls.forEach(el => {
            const strength = 10; // ±10px range

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const maxDist = Math.max(rect.width, rect.height) / 2;
                const dist = Math.sqrt(x * x + y * y);
                const factor = Math.min(dist / maxDist, 1);

                gsap.to(el, {
                    x: (x / maxDist) * strength * factor,
                    y: (y / maxDist) * strength * factor,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.4)'
                });
            });
        });
    })();



    /* ═══════════════════════════════════════════
       ABOUT SECTION — GSAP ENTRANCE
    ═══════════════════════════════════════════ */
    (function() {
        if (typeof gsap === 'undefined') return;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        tl.from('.about-section .section-tag, .about-section .section-title', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15
        })
        .from('.about-text > *', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1
        }, '-=0.4')
        .from('.about-image', {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.about-image-badge', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.5)'
        }, '-=0.4');
    })();

    /* ═══════════════════════════════════════════
       STUNNING DESTINATIONS SECTION — GSAP ENTRANCE
    ═══════════════════════════════════════════ */
    (function() {
        if (typeof gsap === 'undefined') return;
        const tlDest = gsap.timeline({
            scrollTrigger: {
                trigger: '.stunning-destinations',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        tlDest.from('.stunning-destinations .sd-cursive', {
            y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
        })
        .from('.stunning-destinations .sd-massive-text', {
            y: 50, opacity: 0, duration: 1, ease: 'back.out(1.2)'
        }, '-=0.6')
        .from('.sd-card', {
            x: (i) => i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2
        }, '-=0.6');

        // Continuous gentle floating for cards
        gsap.to('.sd-card', {
            y: '-=12',
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.3
        });
    })();

    /* ═══════════════════════════════════════════
       PACKAGES SECTION — GSAP ENTRANCE & ACCORDION
    ═══════════════════════════════════════════ */
    (function() {
        // Entrance Animations
        if (typeof gsap !== 'undefined') {
            const tlPkg = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cinematic-packages',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            tlPkg.from('.cinematic-packages .cp-title, .cinematic-packages .cp-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1
            })
            .from('.cp-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.15
            }, '-=0.4');
        }

        // Accordion Logic using event delegation
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.accordion-btn');
            if (!btn) return;
            
            btn.classList.toggle('active');
            const parent = btn.parentElement;
            if (parent) {
                parent.classList.toggle('active');
            }
            const content = btn.nextElementSibling;
            if (content) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    // Re-calculate scrollTrigger layout just in case height change affects scroll positions
                    if (typeof ScrollTrigger !== 'undefined') {
                        setTimeout(() => ScrollTrigger.refresh(), 400);
                    }
                }
            }
        });
    })();

    /* ═══════════════════════════════════════════
       TREKKING SECTION — GSAP ENTRANCE
    ═══════════════════════════════════════════ */
    (function() {
        if (typeof gsap === 'undefined') return;
        const tlTreks = gsap.timeline({
            scrollTrigger: {
                trigger: '.hanging-treks-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        tlTreks.from('.hanging-treks-section .section-tag, .hanging-treks-section .section-title, .hanging-treks-section p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1
        })
        .from('.hanging-card', {
            top: 40,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.2)',
            stagger: 0.1
        }, '-=0.4');
    })();

    /* ═══════════════════════════════════════════
       SERVICES SECTION — GSAP ENTRANCE
    ═══════════════════════════════════════════ */
    (function() {
        if (typeof gsap === 'undefined') return;
        const tlServices = gsap.timeline({
            scrollTrigger: {
                trigger: '.services-section',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        tlServices.from('.services-section .section-tag, .services-section .section-title', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1
        })
        .from('.service-card', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.05
        }, '-=0.5')
        .from('.assure-item', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.1
        }, '-=0.2');
    })();

    /* ═══════════════════════════════════════════
       GALLERY & LIGHTBOX
    ═══════════════════════════════════════════ */
    (function() {
        if (typeof gsap !== 'undefined') {
            const tlGallery = gsap.timeline({
                scrollTrigger: {
                    trigger: '.gallery-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            tlGallery.from('.gallery-section .section-tag, .gallery-section .section-title, .gallery-section > p', {
                y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1
            })
            .from('.gallery-item', {
                y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05
            }, '-=0.4');
        }

        // Lightbox functionality
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const lightbox = document.getElementById('lightbox');
        
        if (lightbox) {
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            const closeBtn = lightbox.querySelector('.lightbox-close');
            const prevBtn = lightbox.querySelector('.lightbox-prev');
            const nextBtn = lightbox.querySelector('.lightbox-next');
            let currentIndex = 0;

            galleryItems.forEach((img, index) => {
                const clone = img.cloneNode();
                clone.classList.add('lightbox-img');
                clone.dataset.index = index;
                lightboxContent.appendChild(clone);

                img.parentElement.addEventListener('click', () => {
                    openLightbox(index);
                });
            });

            const lightboxImages = lightboxContent.querySelectorAll('.lightbox-img');

            function openLightbox(index) {
                currentIndex = index;
                updateLightbox();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }

            function updateLightbox() {
                lightboxImages.forEach((img, idx) => {
                    if(idx === currentIndex) img.classList.add('active');
                    else img.classList.remove('active');
                });
            }

            closeBtn.addEventListener('click', closeLightbox);
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
                updateLightbox();
            });
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
                updateLightbox();
            });
            lightbox.addEventListener('click', (e) => {
                if(e.target === lightbox) closeLightbox();
            });
        }
    })();

    /* ═══════════════════════════════════════════
       CONTACT GSAP
    ═══════════════════════════════════════════ */
    (function() {
        if (typeof gsap === 'undefined') return;
        gsap.from('.cta-strip', {
            y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-section', start: 'top 90%' }
        });
        
        gsap.from('.contact-info > *', {
            x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: '.contact-container', start: 'top 80%' }
        });

        gsap.from('.contact-form', {
            x: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-container', start: 'top 80%' }
        });
    })();

    /* ═══════════════════════════════════════════
       BACK TO TOP BUTTON
    ═══════════════════════════════════════════ */
    (function() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) btn.classList.add('visible');
            else btn.classList.remove('visible');
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();

    /* ═══════════════════════════════════════════
       CART & ENQUIRY MODAL LOGIC
    ═══════════════════════════════════════════ */
    let cart = [];
    
    // Inject contact form into modal dynamically
    // Modal Global Functions
    window.openEnquiryModal = function(prefillMessage = '') {
        const phone = '919051966561';
        let message = prefillMessage || "Hello CallingHills, I am interested in planning a trip. Please provide more details.";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };
    
    window.closeEnquiryModal = function() {
        // No longer used, but kept for compatibility if called anywhere
    };

    // Cart Global Functions
    window.toggleCart = function() {
        document.getElementById('cart-drawer').classList.toggle('active');
        document.getElementById('cart-overlay').classList.toggle('active');
    };

    window.addToCart = function(title, dest) {
        cart.push({ title, dest: dest || '', id: Date.now() });
        updateCartUI();
        
        try {
            const btn = window.event && window.event.currentTarget ? window.event.currentTarget : null;
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '✔ Added';
                setTimeout(() => { btn.innerHTML = originalText; }, 2000);
            }
        } catch(e) {}
    };

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    };

    window.proceedToEnquiry = function() {
        toggleCart();
        let message = "Hi, I'm interested in the following packages/treks:\n\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.title} (${item.dest})\n`;
        });
        message += "\nPlease provide more details.";
        openEnquiryModal(message);
    };

    function updateCartUI() {
        const badge = document.getElementById('cart-badge');
        const itemsContainer = document.getElementById('cart-items');
        
        badge.innerText = cart.length;
        badge.style.opacity = cart.length > 0 ? 1 : 0;
        
        if (cart.length === 0) {
            itemsContainer.innerHTML = '<p style="color: var(--ch-text-mid); text-align: center; margin-top: 40px; font-family: var(--font-body);">Your list is empty.</p>';
            return;
        }
        
        itemsContainer.innerHTML = '';
        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <div>
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-dest">${item.dest}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove">&times;</button>
            `;
            itemsContainer.appendChild(el);
        });
    }

    // Attach Add to Cart and Enquire Now handlers to all buttons dynamically generated
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        
        // Handle "Add to Cart" dynamically if it doesn't have an inline onclick
        const btnText = btn.textContent || btn.innerText || '';
        if ((btnText.includes('Add to Cart') || btnText.includes('🛒')) && !btn.getAttribute('onclick')) {
            const card = btn.closest('.dest-card, .pkg-card, .trek-card, .hanging-card');
            if (card) {
                const titleEl = card.querySelector('h3, .trek-title');
                const destEl = card.querySelector('.dest-tagline, .pkg-duration, .trek-region');
                const title = titleEl ? titleEl.innerText : 'Unknown Package';
                const dest = destEl ? destEl.innerText.replace('📍 ', '') : '';
                
                window.addToCart(title, dest);
                
                const originalText = btn.innerHTML;
                btn.innerHTML = '✔ Added';
                setTimeout(() => { btn.innerHTML = originalText; }, 2000);
            }
        } 
        // Handle "Enquire Now", "Explore Now", "Plan My Trip" dynamically if it doesn't have an inline onclick
        else if ((btnText.includes('Enquire') || btnText.includes('Explore') || btnText.includes('Plan')) && !btnText.includes('Add') && !btn.getAttribute('onclick')) {
            const card = btn.closest('.dest-card, .pkg-card, .trek-card, .hanging-card, .sd-card, .cp-card');
            let itemName = 'Custom Trip';
            if (card) {
                const titleEl = card.querySelector('h3, .trek-title, .cp-title, .cp-subtitle');
                if (titleEl) itemName = titleEl.innerText;
            }
            window.openEnquiryModal(`Hello CallingHills, I am interested in knowing more about: ${itemName}. Please provide more details.`);
        }
    });

    

// Expose functions to global scope for inline onclick handlers
// Note: toggleCart, addToCart, etc. are already assigned above via window.X = function()
// Only re-assign those that are defined at module scope.
// submitContact, openLightbox, closeLightbox, changeImage are either 
// scoped inside IIFEs or not defined — referencing them crashes the module.
try { window.toggleCart = toggleCart; } catch(e) {}
try { window.addToCart = addToCart; } catch(e) {}
try { window.removeFromCart = removeFromCart; } catch(e) {}
try { window.proceedToEnquiry = proceedToEnquiry; } catch(e) {}
try { window.closeEnquiryModal = closeEnquiryModal; } catch(e) {}

/* ==========================================================================
   SNOW PARTICLES FOR STUNNING DESTINATIONS
   ========================================================================== */
function initSnowParticles() {
    console.log("initSnowParticles is running!");
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) {
        console.log("snow-canvas not found!");
        return;
    }
    console.log("snow-canvas found, parent:", canvas.parentElement);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resize() {
        const section = canvas.parentElement;
        console.log("resize called, section width:", section.offsetWidth);
        if (canvas.width !== section.offsetWidth) {
            width = canvas.width = section.offsetWidth;
        } else {
            width = canvas.width;
        }
        if (canvas.height !== section.offsetHeight) {
            const oldHeight = height || 0;
            height = canvas.height = section.offsetHeight;
            if (oldHeight < 100 && height > 100) {
                particles.forEach(p => {
                    p.x = Math.random() * width;
                    p.y = Math.random() * height;
                });
            }
        } else {
            height = canvas.height;
        }
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Create snow particles
    const particleCount = window.innerWidth < 768 ? 40 : 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5, // Smaller snow
            speedY: Math.random() * 1.5 + 0.5, // Falling speed
            speedX: Math.random() * 1 - 0.5, // Slight wind
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    function draw() {
        resize(); // Recalculate dimensions dynamically
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(173, 216, 230, ${p.opacity})`; // Light blue-white snow
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Loop particles back to top
            if (p.y > height) {
                p.y = -10;
                p.x = Math.random() * width;
            }
            // Loop particles left/right
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;
        });
        
        requestAnimationFrame(draw);
    }
    
    draw();
}

// Initialize snow after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSnowParticles);
} else {
    initSnowParticles();
}


    /* ═══════════════════════════════════════════
       HIMALAYAN TREKS — INFINITE SLIDER CONTROL
    ═══════════════════════════════════════════ */
    (function() {
        const track = document.querySelector('.ht-slider-track');
        const container = document.querySelector('.ht-slider-container');
        const btnLeft = document.querySelector('.ht-nav-left');
        const btnRight = document.querySelector('.ht-nav-right');
        if (!track || !container) return;

        let cards = track.querySelectorAll('.hanging-card');
        if (cards.length === 0) return;

        // Dynamic step calculation: card width + gap (30px)
        const getStepWidth = () => {
            const cardWidth = cards[0].offsetWidth || 300;
            return cardWidth + 30; // 330px default
        };

        let step = getStepWidth();
        let halfWidth = (cards.length / 2) * step;

        // Handle resize/init dynamic recalculation
        window.addEventListener('resize', () => {
            step = getStepWidth();
            halfWidth = (cards.length / 2) * step;
        });

        let currentX = 0;
        let targetX = 0;
        let isPaused = false;
        let isAnimating = false;

        // Object state that GSAP will tween
        const sliderState = { x: 0 };

        // Wrap scroll position around cleanly for infinite loop effect
        function wrapScroll(val) {
            if (val <= -halfWidth) {
                val += halfWidth;
            } else if (val > 0) {
                val -= halfWidth;
            }
            return val;
        }

        // Auto-scroll loop run on animation frames
        function autoScroll() {
            if (!isPaused && !isAnimating) {
                currentX -= 1.1; // Smooth speed corresponding to original 40s loop
                currentX = wrapScroll(currentX);
                sliderState.x = currentX;
                track.style.transform = `translateX(${currentX}px) translateZ(0)`;
            }
            requestAnimationFrame(autoScroll);
        }

        // Mouse hover pause triggers
        container.addEventListener('mouseenter', () => { isPaused = true; });
        container.addEventListener('mouseleave', () => { isPaused = false; });
        
        // Touch events hover pause support
        container.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
        container.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

        // Nav click navigation handler
        function navigate(direction) {
            isAnimating = true;
            
            // Sync sliderState to the wrapped current scroll position
            currentX = wrapScroll(currentX);
            sliderState.x = currentX;

            if (typeof gsap !== 'undefined') {
                // Stop any ongoing tweens
                gsap.killTweensOf(sliderState);

                // Target position step alignment
                let newTarget = currentX - (direction * step);
                
                // Snap new target cleanly to card steps to avoid layout splits
                newTarget = Math.round(newTarget / step) * step;

                gsap.to(sliderState, {
                    x: newTarget,
                    duration: 0.6,
                    ease: "power2.out",
                    onUpdate: () => {
                        track.style.transform = `translateX(${sliderState.x}px) translateZ(0)`;
                    },
                    onComplete: () => {
                        currentX = wrapScroll(sliderState.x);
                        sliderState.x = currentX;
                        track.style.transform = `translateX(${currentX}px) translateZ(0)`;
                        isAnimating = false;
                    }
                });
            } else {
                // Fallback if GSAP is not loaded
                currentX -= (direction * step);
                currentX = wrapScroll(currentX);
                track.style.transform = `translateX(${currentX}px) translateZ(0)`;
                isAnimating = false;
            }
        }

        // Navigation click event listeners
        if (btnLeft) {
            btnLeft.addEventListener('click', (e) => {
                e.preventDefault();
                navigate(-1); // scrolls content to the right (view previous)
            });
        }

        if (btnRight) {
            btnRight.addEventListener('click', (e) => {
                e.preventDefault();
                navigate(1); // scrolls content to the left (view next)
            });
        }

        // Start the infinite animation loop
        requestAnimationFrame(autoScroll);
    })();
