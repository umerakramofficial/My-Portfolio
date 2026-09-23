/**
 * Umer Akram Portfolio - Interactive Features & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

  if (mobileToggleBtn && mobileMenuDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileMenuDrawer.classList.toggle('open');
      mobileToggleBtn.classList.toggle('active', isOpen);
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggleBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking any link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenuDrawer.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // 2. Header Background on Scroll
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 4. Subtle Card Tilt Effect on Hover (Desktop only)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll('.satisfaction-card, .card-visual-wrapper, .skill-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 5. Read More / Read Less Toggle in About Me
  const readMoreBtn = document.getElementById('about-read-more-btn');
  const expandableContent = document.getElementById('about-expandable');
  const readMoreText = readMoreBtn?.querySelector('.read-more-text');

  if (readMoreBtn && expandableContent) {
    readMoreBtn.addEventListener('click', () => {
      const isExpanded = expandableContent.classList.toggle('expanded');
      readMoreBtn.classList.toggle('active', isExpanded);
      readMoreBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      if (readMoreText) {
        readMoreText.textContent = isExpanded ? 'Read Less' : 'Read More';
      }
    });
  }
});
