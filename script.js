/**
 * SURIYA'S PORTFOLIO - SCRIPT
 * Handles typing effect, mobile nav, project filter, animations & contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Typing Effect for Hero Subtitle
  const typedTextSpan = document.getElementById('typedText');
  const roles = [
    'Full Stack Developer',
    'Web Developer',
    'Frontend Specialist',
    'UI/UX Designer',
    'Creative Technologist'
  ];
  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 1800; // Delay between current and next text
  let roleIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < roles[roleIndex].length) {
      typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      roleIndex++;
      if (roleIndex >= roles.length) roleIndex = 0;
      setTimeout(type, typingDelay + 300);
    }
  }

  if (typedTextSpan && roles.length) {
    setTimeout(type, 800);
  }

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu on link click
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 4. Scroll Active Navigation Link Tracker
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // 5. Stat Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-num');
  let animatedStats = false;

  function countUp() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.innerText.replace(/[0-9]/g, '');
      let count = 0;
      const speed = Math.ceil(target / 40);

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = count + suffix;
          setTimeout(updateCount, 30);
        } else {
          stat.innerText = target + suffix;
        }
      };
      updateCount();
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          countUp();
          animatedStats = true;
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(aboutSection);
  }

  // 6. Skill Bars Animation on Scroll
  const skillsSection = document.getElementById('skills');
  const skillFills = document.querySelectorAll('.skill-bar-fill');

  if (skillsSection && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillFills.forEach(fill => {
            const level = fill.style.getPropertyValue('--level') || '85%';
            fill.style.width = level;
          });
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  // 7. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 8. Contact Form Handling & Toast Notification
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message, isError = false) {
    if (!toast) return;
    toastMsg.textContent = message;
    const icon = toast.querySelector('i');
    if (icon) {
      if (isError) {
        icon.className = 'fa-solid fa-circle-exclamation';
        icon.style.color = '#ef4444';
      } else {
        icon.className = 'fa-solid fa-circle-check gold-text';
        icon.style.color = '';
      }
    }
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const senderName = nameInput.value.trim();
      const senderEmail = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (!senderName || !senderEmail || !message) {
        showToast('Please fill in all required fields.', true);
        return;
      }

      // Button feedback
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        // Construct mailto link as option to ensure direct delivery
        const mailtoUri = `mailto:suriyaprabha33@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + senderName)}&body=${encodeURIComponent("Name: " + senderName + "\nEmail: " + senderEmail + "\n\nMessage:\n" + message)}`;

        // Provide success feedback
        showToast(`Thank you, ${senderName}! Your message was prepared for Suriya (suriyaprabha33@gmail.com).`);

        // Reset form & button
        contactForm.reset();
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;

        // Optionally open user's default email client
        window.location.href = mailtoUri;
      }, 800);
    });
  }

  // 9. Subtle 3D Tilt & Light Effect for Metallic Frames on Mouse Move
  const metalCards = document.querySelectorAll('.metal-frame-card, .metal-frame-luxury');
  metalCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      card.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(212, 175, 55, 0.08), rgba(21, 23, 32, 0.95) 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // 10. Flying Codes Background Smooth Parallax
  const heroSection = document.getElementById('home');
  const flyingCodesBg = document.getElementById('flyingCodes');

  if (heroSection && flyingCodesBg) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      flyingCodesBg.style.transform = `translate(${x * 25}px, ${y * 20}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      flyingCodesBg.style.transform = 'translate(0px, 0px)';
    });
  }

  // 11. Medium Glassy Portrait - Specular Light Tracking
  const glassyPortrait = document.querySelector('.medium-glassy-portrait');
  if (glassyPortrait) {
    glassyPortrait.addEventListener('mousemove', (e) => {
      const rect = glassyPortrait.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
      const reflection = glassyPortrait.querySelector('.glass-reflection-layer');
      if (reflection) {
        reflection.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)`;
      }
    });

    glassyPortrait.addEventListener('mouseleave', () => {
      const reflection = glassyPortrait.querySelector('.glass-reflection-layer');
      if (reflection) {
        reflection.style.background = '';
      }
    });
  }
});
