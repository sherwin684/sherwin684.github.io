// Web Resume Interactive Features
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate proficiency bars on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const proficiencyFills = entry.target.querySelectorAll('.proficiency-fill');
                proficiencyFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);

    // Observe the languages section
    const languagesSection = document.querySelector('.section:has(.languages-grid)');
    if (languagesSection) {
        observer.observe(languagesSection);
    }

    // Add loading animation to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';

        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Contact info click handlers
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const span = item.querySelector('span');
        if (span) {
            const text = span.textContent.trim();

            // Make email clickable
            if (text.includes('@')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    window.location.href = `mailto:${text}`;
                });
            }

            // Make phone clickable
            if (text.includes('+') || text.match(/\(\d{3}\)/)) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    window.location.href = `tel:${text.replace(/\D/g, '')}`;
                });
            }

            // Make LinkedIn clickable
            if (text.includes('linkedin.com')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    window.open(`https://${text}`, '_blank');
                });
            }
        }
    });

    // Add print functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Resume';
    printButton.className = 'print-btn';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    printButton.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
    });

    printButton.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
    });

    printButton.addEventListener('click', function () {
        window.print();
    });

    document.body.appendChild(printButton);

    // Add theme toggle functionality
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 50%;
        cursor: pointer;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(52, 73, 94, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    let isDarkMode = false;

    themeToggle.addEventListener('click', function () {
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            document.querySelector('.container').style.background = '#34495e';
            document.querySelector('.container').style.color = '#ecf0f1';
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.style.background = 'linear-gradient(135deg, #f8fbff 0%, #e8f4f8 100%)';
            document.querySelector('.container').style.background = 'white';
            document.querySelector('.container').style.color = '#2c3e50';
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    document.body.appendChild(themeToggle);

    // Add scroll to top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 50%;
        cursor: pointer;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
    `;

    scrollToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });

    document.body.appendChild(scrollToTop);

    // Add subtle parallax effect to header
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header && scrolled < header.offsetHeight) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    console.log('Web Resume loaded successfully! 🚀');
});
