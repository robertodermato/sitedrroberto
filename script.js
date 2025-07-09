/* ===== JAVASCRIPT MODULAR - MD DERMATOLOGIA INTEGRADA ===== */

// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Inicializar módulos
    NavigationModule.init();
    CarouselModule.init();
    WhatsAppModule.init();
    MobileMenuModule.init();
    ScrollModule.init();
    PerformanceModule.init();
});

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
            mobileMenuButton.addEventListener('click', () => {
                this.toggleMenu();
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
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
        
        mobileMenu.classList.add('show');
        menuButton.setAttribute('aria-expanded', 'true');
        
        // Animação do ícone hamburger
        const icon = menuButton.querySelector('svg');
        icon.style.transform = 'rotate(90deg)';
    },

    closeMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuButton = document.querySelector('.mobile-menu-button');
        
        mobileMenu.classList.remove('show');
        menuButton.setAttribute('aria-expanded', 'false');
        
        // Resetar ícone
        const icon = menuButton.querySelector('svg');
        icon.style.transform = 'rotate(0deg)';
    }
};

// ===== MÓDULO CARROSSEL =====
const CarouselModule = {
    currentSlide: 0,
    totalSlides: 0,
    autoplayInterval: null,
    
    init() {
        this.setupCarousel();
        this.startAutoplay();
    },

    setupCarousel() {
        const carousel = document.querySelector('.clinic-carousel');
        const slides = document.querySelectorAll('.clinic-slide');
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        if (!carousel || slides.length === 0) return;
        
        this.totalSlides = slides.length;
        
        // Configurar controles
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
        
        // Configurar indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Touch/swipe support
        this.setupTouchEvents(carousel);
        
        // Keyboard support
        this.setupKeyboardEvents();
        
        // Pausar autoplay ao hover
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
                // Analytics tracking (se disponível)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        event_category: 'contact',
                        event_label: 'whatsapp_button'
                    });
                }
                
                console.log('WhatsApp link clicked'); // Para debug
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
            }, 10000); // Pulse a cada 10 segundos
        }
    }
};

// ===== MÓDULO DE SCROLL =====
const ScrollModule = {
    init() {
        this.setupScrollToTop();
        this.setupLazyLoading();
        this.setupScrollAnimations();
    },

    setupScrollToTop() {
        // Criar botão scroll to top
        const scrollTopButton = document.createElement('button');
        scrollTopButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
        `;
        scrollTopButton.className = 'fixed bottom-6 left-6 bg-verde-escuro text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-40 hover:bg-verde-forte';
        scrollTopButton.style.transform = 'translateY(100px)';
        scrollTopButton.setAttribute('aria-label', 'Voltar ao topo');
        
        document.body.appendChild(scrollTopButton);
        
        // Mostrar/esconder baseado no scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopButton.style.opacity = '1';
                scrollTopButton.style.pointerEvents = 'auto';
                scrollTopButton.style.transform = 'translateY(0)';
            } else {
                scrollTopButton.style.opacity = '0';
                scrollTopButton.style.pointerEvents = 'none';
                scrollTopButton.style.transform = 'translateY(100px)';
            }
        });
        
        // Ação do clique
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
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
        // Paralax simples para hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.getElementById('inicio');
            
            if (hero) {
                const speed = scrolled * 0.5;
                hero.style.transform = `translateY(${speed}px)`;
            }
        });
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

// ===== MÓDULO DE FORMULÁRIOS =====
const FormModule = {
    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
    },

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
            
            // Validação em tempo real
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    },

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Validação de campo obrigatório
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }
        
        // Validação de email
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um email válido';
            }
        }
        
        // Validação de telefone
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um telefone válido';
            }
        }
        
        // Aplicar estilos de validação
        this.applyValidationStyles(field, isValid, errorMessage);
        
        return isValid;
    },

    applyValidationStyles(field, isValid, errorMessage) {
        const wrapper = field.closest('.form-group') || field.parentElement;
        
        // Remover mensagens de erro existentes
        const existingError = wrapper.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Aplicar estilos
        if (isValid) {
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
        } else {
            field.classList.remove('border-green-500');
            field.classList.add('border-red-500');
            
            // Adicionar mensagem de erro
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            errorDiv.textContent = errorMessage;
            wrapper.appendChild(errorDiv);
        }
    },

    setupFormSubmission() {
        // Implementar quando houver formulários no site
        console.log('Form submission module ready');
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

// ===== EXPORT MODULES (para uso futuro) =====
window.SiteModules = {
    NavigationModule,
    CarouselModule,
    WhatsAppModule,
    MobileMenuModule,
    ScrollModule,
    PerformanceModule,
    FormModule,
    AccessibilityModule,
    Utils
};

// ===== INICIALIZAÇÃO FINAL =====
// Garantir que tudo seja inicializado após o DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSite);
} else {
    initializeSite();
}

function initializeSite() {
    // Inicializar módulos adicionais se necessário
    FormModule.init();
    AccessibilityModule.init();
    
    // Log para debug
    console.log('🏥 MD Dermatologia Integrada - Site inicializado com sucesso!');
}

// ===== FIM DO ARQUIVO JAVASCRIPT =====