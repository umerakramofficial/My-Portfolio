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

  // 3. Active Nav Link on Scroll & Click
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  const setActiveLink = (currentId) => {
    navLinks.forEach(link => {
      const targetHref = link.getAttribute('href');
      if (targetHref === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Immediate highlight on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (targetId) {
        setActiveLink(targetId);
      }
    });
  });

  // Highlight based on scroll position & bottom-of-page detection
  const updateActiveSectionOnScroll = () => {
    const scrollPosition = window.scrollY + 180;
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 90);

    if (isAtBottom) {
      setActiveLink('contact');
      return;
    }

    let activeId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeId = section.getAttribute('id');
      }
    });

    if (activeId) {
      setActiveLink(activeId);
    }
  };

  window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });
  updateActiveSectionOnScroll();

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

  // 6. Dynamic Contact Form with Purpose Selection & Direct Submission
  const contactForm = document.getElementById('contact-form');
  const purposeSelect = document.getElementById('contact-purpose');
  const dynamicFields = document.getElementById('dynamic-form-fields');
  const formStatus = document.getElementById('form-status');
  const purposeFieldsets = {
    project: document.getElementById('fields-project'),
    hiring: document.getElementById('fields-hiring'),
    other: document.getElementById('fields-other')
  };

  if (purposeSelect && dynamicFields) {
    purposeSelect.addEventListener('change', () => {
      const selectedPurpose = purposeSelect.value;
      if (selectedPurpose) {
        dynamicFields.style.display = 'flex';
        // Show selected section, hide others
        Object.keys(purposeFieldsets).forEach(key => {
          if (purposeFieldsets[key]) {
            purposeFieldsets[key].style.display = key === selectedPurpose ? 'flex' : 'none';
          }
        });
        if (formStatus) formStatus.textContent = '';
      } else {
        dynamicFields.style.display = 'none';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const purpose = purposeSelect?.value;
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();

      if (!purpose) {
        showStatus('Please select a purpose for your contact.', 'error');
        return;
      }
      if (!name || !email) {
        showStatus('Please enter your name and email address.', 'error');
        return;
      }

      let subject = `[Portfolio Contact] New ${purpose.toUpperCase()} Inquiry from ${name}`;
      let bodyLines = [
        `Purpose: ${purpose.toUpperCase()}`,
        `Sender Name: ${name}`,
        `Sender Email: ${email}`,
        `----------------------------------------`
      ];

      if (purpose === 'project') {
        const projectType = document.getElementById('project-type')?.value;
        const budget = document.getElementById('project-budget')?.value;
        const details = document.getElementById('project-details')?.value.trim();

        if (!details) {
          showStatus('Please describe your project details.', 'error');
          return;
        }

        subject = `[Project Inquiry] ${projectType} - ${name}`;
        bodyLines.push(`Project Type: ${projectType}`);
        bodyLines.push(`Estimated Budget: ${budget}`);
        bodyLines.push(`\nProject Details:\n${details}`);

      } else if (purpose === 'hiring') {
        const company = document.getElementById('company-name')?.value.trim();
        const role = document.getElementById('role-position')?.value.trim();
        const employmentType = document.getElementById('employment-type')?.value;
        const hiringDetails = document.getElementById('hiring-details')?.value.trim();

        if (!company) {
          showStatus('Please enter your company or organization name.', 'error');
          return;
        }

        subject = `[Hiring Opportunity] ${role || 'Opportunity'} at ${company} - ${name}`;
        bodyLines.push(`Company / Organization: ${company}`);
        bodyLines.push(`Role / Position: ${role || 'N/A'}`);
        bodyLines.push(`Employment Type: ${employmentType}`);
        bodyLines.push(`\nRole Overview & Next Steps:\n${hiringDetails || 'N/A'}`);

      } else {
        const otherSubject = document.getElementById('other-subject')?.value.trim();
        const otherMsg = document.getElementById('other-message')?.value.trim();

        if (!otherMsg) {
          showStatus('Please write your message.', 'error');
          return;
        }

        if (otherSubject) {
          subject = `[Inquiry] ${otherSubject} - ${name}`;
        }
        bodyLines.push(`\nMessage:\n${otherMsg}`);
      }

      const formattedBody = bodyLines.join('\n');
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=umerakramofficial@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

      showStatus('✓ Opening Gmail with your details...', 'success');

      window.open(gmailUrl, '_blank');
    });
  }

  function showStatus(text, type) {
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
  }
});
