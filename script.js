document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Trigger ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const mobileNavLinks = document.querySelectorAll('.mobile-sidebar nav a');
    const body = document.body;

    function toggleMenu() {
        menuBtn.classList.toggle('active');
        mobileSidebar.classList.toggle('active');
        // Prevent body scroll when menu is active
        body.style.overflow = mobileSidebar.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileSidebar.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close mobile menu on resize to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileSidebar.classList.contains('active')) {
            toggleMenu();
        }
    });

    // --- 3. Experience Tab Switcher ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabHighlight = document.querySelector('.tab-highlight');

    function updateHighlight(index) {
        const isMobile = window.innerWidth <= 768;
        if (tabHighlight) {
            if (isMobile) {
                tabHighlight.style.transform = `translateX(${index * 150}px)`;
            } else {
                tabHighlight.style.transform = `translateY(${index * 42}px)`;
            }
        }
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.hidden = true;
            });

            // Add active class to selected tab
            button.classList.add('active');
            
            const panelId = button.getAttribute('aria-controls');
            const activePanel = document.getElementById(panelId);
            if (activePanel) {
                activePanel.classList.add('active');
                activePanel.hidden = false;
            }

            updateHighlight(index);
        });
    });

    // Re-align tab highlight on window resize
    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab) {
            const index = Array.from(tabButtons).indexOf(activeTab);
            updateHighlight(index);
        }
    });

    // --- 4. Intersection Observer / Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // Viewport
        threshold: 0.15 // Target 15% visibility
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
