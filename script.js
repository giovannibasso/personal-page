// ============================================
// Tab Navigation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const megaMenuLinks = document.querySelectorAll('.mega-menu a[data-company]');
    const megaMenuItem = document.querySelector('.has-mega-menu');

    // Switch tabs
    function switchTab(tabId) {
        // Update nav links
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Update tab content
        tabContents.forEach(content => content.classList.remove('active'));
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add('active');
            // Re-trigger animation
            activeContent.style.animation = 'none';
            activeContent.offsetHeight; // trigger reflow
            activeContent.style.animation = '';
        }

        // Close mobile menu
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.dataset.tab;
            switchTab(tabId);
        });
    });

    // Mega menu company links
    megaMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const companyId = link.dataset.company;
            switchTab('experience');

            // Scroll to the specific company after tab switch
            setTimeout(() => {
                const companyEl = document.getElementById(`company-${companyId}`);
                if (companyEl) {
                    companyEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Highlight effect
                    companyEl.querySelector('.timeline-content').style.borderColor = 'var(--copilot-purple)';
                    setTimeout(() => {
                        companyEl.querySelector('.timeline-content').style.borderColor = '';
                    }, 2000);
                }
            }, 100);
        });
    });

    // Mobile toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        mobileToggle.classList.toggle('active');
    });

    // Mobile mega menu toggle
    if (megaMenuItem) {
        const megaLink = megaMenuItem.querySelector('.nav-link');
        megaLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                megaMenuItem.classList.toggle('mega-open');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
        }
    });

    // Animate proficiency bars on languages tab visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.proficiency-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.3 });

    const langGrid = document.querySelector('.languages-grid');
    if (langGrid) observer.observe(langGrid);
});
