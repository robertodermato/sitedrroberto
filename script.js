/* ===== JAVASCRIPT MODULAR - MD DERMATOLOGIA INTEGRADA ===== */

// Global config object
let siteConfig = {};

// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Load configuration and then initialize modules
    loadConfigAndInitialize();
});

// ===== LOAD CONFIGURATION =====
async function loadConfigAndInitialize() {
    try {
        const response = await fetch('./config.json');
        siteConfig = await response.json();
        
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });

        // Initialize all modules
        DynamicContentModule.init();
        NavigationModule.init();
        CarouselModule.init();
        WhatsAppModule.init();
        MobileMenuModule.init();
        ScrollModule.init();
        PerformanceModule.init();
    } catch (error) {
        // Fallback initialization without config
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
        
        NavigationModule.init();
        CarouselModule.init();
        WhatsAppModule.init();
        MobileMenuModule.init();
        ScrollModule.init();
        PerformanceModule.init();
    }
}

// ===== MÓDULO DE CONTEÚDO DINÂMICO =====
const DynamicContentModule = {
    init() {
        if (siteConfig && Object.keys(siteConfig).length > 0) {
            this.populateGoogleMap();
            this.populateCarousel();
            this.populateDoctorInfo();
            this.populateClinicInfo();
            this.populateContactInfo();
            this.populateConvenios();
        }
    },

     populateConvenios() {
        const conveniosContainer = document.getElementById('convenios-container');
        if (conveniosContainer && siteConfig.clinica?.convenios && siteConfig.clinica.convenios.length > 0) {
            conveniosContainer.innerHTML = ''; // Limpa o container antes de adicionar os novos botões

            siteConfig.clinica.convenios.forEach(convenio => {
                const button = document.createElement('button');
                button.className = 'bg-verde-escuro text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-verde-claro transition duration-300 ease-in-out shadow-md';
                button.textContent = convenio;
                // Se você quiser que o botão faça algo (ex: abrir um modal com mais info), adicione um event listener aqui
                // button.addEventListener('click', () => {
                //     alert(`Você clicou no convênio: ${convenio}`);
                // });
                conveniosContainer.appendChild(button);
            });
        }
    },

    populateGoogleMap() {
        const mapIframe = document.getElementById('google-map');
        if (mapIframe && siteConfig.contato?.mapa?.iframe) {
            mapIframe.src = siteConfig.contato.mapa.iframe;
        }
    },

    populateCarousel() {
        const carouselContainer = document.getElementById('clinic-carousel');
        const indicatorsContainer = document.getElementById('carousel-indicators');
        
        if (carouselContainer && siteConfig.clinica?.imagens) {
            // Clear existing content
            carouselContainer.innerHTML = '';
            indicatorsContainer.innerHTML = '';
            
            // Generate slides
            siteConfig.clinica.imagens.forEach((imagem, index) => {
                const slide = document.createElement('div');
                slide.className = 'clinic-slide w-full flex-none relative';
                slide.innerHTML = `
                    <img src="./img/${imagem.arquivo}" alt="${imagem.alt_text || imagem.titulo}" class="w-full h-80 md:h-full object-cover">                    
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h4 class="text-white text-xl font-semibold">${imagem.titulo}</h4>
                        <p class="text-white/90">${imagem.descricao}</p>
                    </div>
                `;
                carouselContainer.appendChild(slide);
                
                // Generate indicator
                const indicator = document.createElement('button');
                indicator.className = `carousel-indicator w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-verde-escuro' : 'bg-gray-300 hover:bg-verde-forte'}`;
                indicator.setAttribute('data-slide', index);
                indicator.setAttribute('aria-label', `Ir para foto ${index + 1}`);
                indicatorsContainer.appendChild(indicator);
            });
        }
    },

    populateDoctorInfo() {
        const curriculumContainer = document.getElementById('doctor-curriculum-content');
        
        if (curriculumContainer && siteConfig.medico?.curriculo?.formacao) {        
            curriculumContainer.innerHTML = ''; // Limpa todo o conteúdo deste div

            // Adiciona a introdução ao currículo se ela existir no config.json
            if (siteConfig.medico.curriculo.titulo) {
                const introP = document.createElement('p');
                introP.className = 'text-gray-700 leading-relaxed';
                introP.innerHTML = `${siteConfig.medico.curriculo.titulo}`;
                curriculumContainer.appendChild(introP);
            }

            // Adiciona cada item de formação
            siteConfig.medico.curriculo.formacao.forEach(item => {
                const p = document.createElement('p');
                p.className = 'text-gray-700 leading-relaxed';
                p.setAttribute('data-generated-formation', 'true'); // Adiciona um atributo para fácil identificação
                p.innerHTML = `<strong>•</strong> ${item}`;
                curriculumContainer.appendChild(p);
            });
        }
    },

    populateClinicInfo() {
        // Populate clinic description
        const clinicSection = document.querySelector('#clinica .prose');
        if (clinicSection && siteConfig.clinica?.descricao) {
            clinicSection.innerHTML = `
                <p>${siteConfig.clinica.descricao.introducao}</p>
                <p><strong>${siteConfig.clinica.nome}</strong>, clínica do Dr. Roberto Luís Rezende e seus sócios, ${siteConfig.clinica.descricao.historia}</p>
                <p>${siteConfig.clinica.descricao.instalacoes}</p>
                <p class="bg-verde-claro p-6 rounded-xl border-l-4 border-verde-escuro">
                    <strong>${siteConfig.clinica.descricao.milestone}</strong>
                </p>
            `;
        }
    },

    populateContactInfo() {
        // Update contact information throughout the site
        if (siteConfig.contato) {
            // Update WhatsApp links
            const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
            whatsappLinks.forEach(link => {
                link.href = `https://wa.me/${siteConfig.contato.whatsapp_numero}?text=${encodeURIComponent(siteConfig.contato.whatsapp_mensagem)}`;
            });
            
            // Update phone links
            const phoneLinks = document.querySelectorAll('a[href*="tel:"]');
            phoneLinks.forEach(link => {
                link.href = `tel:+55${siteConfig.contato.telefone.replace(/\D/g, '')}`;
            });
        }
    }
};

// ===== MÓDULO DE NAVEGAÇÃO =====
const NavigationModule = {
    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupNavbarTransparency();
    },

    setupSmoothScrolling() {
        // Smooth scrolling para links internos
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fixa
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    MobileMenuModule.closeMenu();
                }
            });
        });
    },

    setupActiveNavigation() {
        // Highlighting ativo baseado na seção visível
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    // Remover classe ativa de todos os links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Adicionar classe ativa ao link correspondente
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-100px 0px -50% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    },

    setupNavbarTransparency() {
        const navbar = document.querySelector('nav');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Transparência baseada no scroll
            if (scrollTop > 100) {
                navbar.classList.add('backdrop-blur-lg');
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.classList.remove('backdrop-blur-lg');
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
};

// ===== MÓDULO MENU MOBILE =====
const MobileMenuModule = {
    init() {
        this.setupMobileMenu();
    },

    setupMobileMenu() {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            // Add click event listener
            mobileMenuButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMenu();
            });
            
            // Close menu when clicking on nav links
            const navLinks = mobileMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu();
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMenu();
                }
            });
        }
    },

    toggleMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const isOpen = mobileMenu.classList.contains('show');
        
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    },

    openMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuButton = document.querySelector('.mobile-menu-button');
        
        if (mobileMenu && menuButton) {
            mobileMenu.classList.add('show');
            menuButton.setAttribute('aria-expanded', 'true');
            
            // Animate hamburger icon
            const icon = menuButton.querySelector('svg');
            if (icon) {
                icon.style.transform = 'rotate(90deg)';
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    },

    closeMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuButton = document.querySelector('.mobile-menu-button');
        
        if (mobileMenu && menuButton) {
            mobileMenu.classList.remove('show');
            menuButton.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger icon
            const icon = menuButton.querySelector('svg');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }
};

// ===== MÓDULO CARROSSEL =====
const CarouselModule = {
    currentSlide: 0,
    totalSlides: 0,
    autoplayInterval: null,
    
    init() {
        // Wait for dynamic content to be loaded first
        setTimeout(() => {
            this.setupCarousel();
            this.startAutoplay();
        }, 500);
    },

    setupCarousel() {
        const carousel = document.querySelector('.clinic-carousel');
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        
        if (!carousel) return;
        
        // Recalculate slides after dynamic content load
        const slides = document.querySelectorAll('.clinic-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');
        this.totalSlides = slides.length;
        
        if (this.totalSlides === 0) return;
        
        // Setup controls
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.prevSlide();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                this.nextSlide();
            });
        }
        
        // Setup indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Touch/swipe support
        this.setupTouchEvents(carousel);
        
        // Keyboard support
        this.setupKeyboardEvents();
        
        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        carousel.addEventListener('mouseleave', () => this.startAutoplay());
    },

    setupTouchEvents(carousel) {
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    },

    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    },

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    },

    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
        
        this.currentSlide = slideIndex;
        const carousel = document.querySelector('.clinic-carousel');
        const translateX = -slideIndex * 100;
        
        carousel.style.transform = `translateX(${translateX}%)`;
        
        this.updateIndicators();
        this.resetAutoplay();
    },

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    },

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    },

    updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    },

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 segundos
    },

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    },

    resetAutoplay() {
        this.pauseAutoplay();
        this.startAutoplay();
    }
};

// ===== MÓDULO WHATSAPP =====
const WhatsAppModule = {
    init() {
        this.setupWhatsAppTracking();
        this.addPulseEffect();
    },

    setupWhatsAppTracking() {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Analytics tracking (if available)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        event_category: 'contact',
                        event_label: 'whatsapp_button'
                    });
                }
            });
        });
    },

    addPulseEffect() {
        const whatsappFloat = document.querySelector('.whatsapp-float a');
        if (whatsappFloat) {
            setInterval(() => {
                whatsappFloat.style.animation = 'none';
                setTimeout(() => {
                    whatsappFloat.style.animation = 'pulse-green 2s infinite';
                }, 10);
            }, 10000); // Pulse every 10 seconds
        }
    }
};

// ===== MÓDULO DE SCROLL =====
const ScrollModule = {
    init() {
        this.setupLazyLoading();
        this.setupScrollAnimations();
    },

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },

    setupScrollAnimations() {
        // Other scroll animations can be added here
        // Parallax effect has been removed as requested
    }
};

// ===== MÓDULO DE PERFORMANCE =====
const PerformanceModule = {
    init() {
        this.setupPreconnects();
        this.setupCriticalResourceHints();
        this.setupImageOptimization();
    },

    setupPreconnects() {
        // Adicionar preconnects para recursos externos
        const preconnects = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://static.elfsight.com',
            'https://wa.me'
        ];
        
        preconnects.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            document.head.appendChild(link);
        });
    },

    setupCriticalResourceHints() {
        // Prefetch para recursos importantes
        const prefetchResources = [
            './img/dr-roberto.jpg',
            './img/clinica-1.jpg'
        ];
        
        prefetchResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    },

    setupImageOptimization() {
        // Otimização de imagens com WebP fallback
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.src && !img.src.includes('.webp')) {
                // Adicionar loading lazy se não for crítica
                if (!img.closest('#inicio')) {
                    img.loading = 'lazy';
                }
                
                // Adicionar decode async
                img.decoding = 'async';
            }
        });
    }
};



// ===== MÓDULO DE ACESSIBILIDADE =====
const AccessibilityModule = {
    init() {
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
    },

    setupKeyboardNavigation() {
        // ESC para fechar modais/menus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                MobileMenuModule.closeMenu();
            }
        });
    },

    setupScreenReaderSupport() {
        // Anunciar mudanças de conteúdo
        const announceElement = document.createElement('div');
        announceElement.setAttribute('aria-live', 'polite');
        announceElement.setAttribute('aria-atomic', 'true');
        announceElement.className = 'sr-only';
        announceElement.id = 'aria-announcer';
        document.body.appendChild(announceElement);
    },

    setupFocusManagement() {
        // Melhorar visibilidade do foco
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },

    announce(message) {
        const announcer = document.getElementById('aria-announcer');
        if (announcer) {
            announcer.textContent = message;
        }
    }
};

// ===== MÓDULO DE UTILITIES =====
const Utils = {
    // Debounce function
    debounce(func, wait) {
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

    // Throttle function
    throttle(func, limit) {
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

    // Detectar se é mobile
    isMobile() {
        return window.innerWidth <= 768;
    },

    // Detectar se suporta touch
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // Smooth scroll para elementos específicos
    smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// ===== EXPORT MODULES (for future use) =====
window.SiteModules = {
    DynamicContentModule,
    NavigationModule,
    CarouselModule,
    WhatsAppModule,
    MobileMenuModule,
    ScrollModule,
    PerformanceModule,
    AccessibilityModule,
    Utils
};

// ===== FINAL INITIALIZATION =====
// Ensure everything is initialized after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSite);
} else {
    initializeSite();
}

function initializeSite() {
    // Initialize additional modules if needed
    AccessibilityModule.init();
}

// ===== FIM DO ARQUIVO JAVASCRIPT =====
