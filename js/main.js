/**
 * Harish S — Cybersecurity Engineering Portfolio
 * CHROMATIC PRISMATIC DUAL-MODE EDITION (DARK & LIGHT)
 * Includes:
 * - Dynamic Theme Switcher with persistence & system preference
 * - Live form submission delivering directly to joy862380@gmail.com
 * - Dynamic preloader and chromatic toast notifications
 * - Multi-title cybersecurity typewriter
 * - Endorsement/like counter with localStorage persistence
 * - Floating dock active state & scroll spy
 * - Monospace IDE tab switcher (Rust / JSON / Bash)
 * - Skills interactive category filter
 * - Achievements & Experience multi-tab view
 */

document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. CHROMATIC DUAL-MODE THEME MANAGER =================
  const rootHtml = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeDockToggle = document.querySelector('.theme-dock-toggle');
  const themeMetaTag = document.querySelector('meta[name="theme-color"]');

  function updateThemeIcons(theme) {
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    const modeTexts = document.querySelectorAll('.theme-mode-text');

    if (theme === 'light') {
      sunIcons.forEach(icon => icon.style.display = 'none');
      moonIcons.forEach(icon => icon.style.display = 'block');
      modeTexts.forEach(t => t.textContent = 'Light');
    } else {
      sunIcons.forEach(icon => icon.style.display = 'block');
      moonIcons.forEach(icon => icon.style.display = 'none');
      modeTexts.forEach(t => t.textContent = 'Dark');
    }
  }

  function applyTheme(theme, notify = false) {
    rootHtml.setAttribute('data-theme', theme);
    localStorage.setItem('harish_portfolio_theme', theme);

    if (themeMetaTag) {
      themeMetaTag.setAttribute('content', theme === 'light' ? '#f6f8fe' : '#090a16');
    }

    updateThemeIcons(theme);

    if (notify) {
      showToast(`🎨 Switched to Chromatic ${theme === 'light' ? 'Light' : 'Dark'} Mode`);
    }
  }

  // Detect saved preference or system mode
  const savedTheme = localStorage.getItem('harish_portfolio_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme, false);

  function toggleThemeAction() {
    const currentTheme = rootHtml.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleThemeAction);
  }
  if (themeDockToggle) {
    themeDockToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleThemeAction();
    });
  }


  // ================= 2. PRELOADER =================
  const loader = document.getElementById('loader-wrapper');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('loaded');
    }, 450);
  });
  // Fallback timer
  setTimeout(() => {
    if (loader && !loader.classList.contains('loaded')) {
      loader.classList.add('loaded');
    }
  }, 1300);


  // ================= 3. TOAST NOTIFICATION SYSTEM =================
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3400);
  }


  // ================= 4. DYNAMIC TYPEWRITER (CYBER ROLES) =================
  const jobTitles = [
    "Cybersecurity Engineer",
    "Ethical Hacker & Reverse Engineer",
    "Memory Forensics Specialist",
    "Rust Systems Security Developer",
    "Network Defense Analyst",
    "Data Technology Specialist"
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElem = document.getElementById('typewriter-text');

  function typeStep() {
    if (!typewriterElem) return;
    const currentTitle = jobTitles[titleIndex];

    if (isDeleting) {
      charIndex--;
      typewriterElem.textContent = currentTitle.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % jobTitles.length;
        setTimeout(typeStep, 450);
        return;
      }
      setTimeout(typeStep, 35);
    } else {
      charIndex++;
      typewriterElem.textContent = currentTitle.substring(0, charIndex);
      if (charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeStep, 2200);
        return;
      }
      setTimeout(typeStep, 65);
    }
  }
  typeStep();


  // ================= 5. PERSISTENT LIKE / ENDORSEMENT BUTTON =================
  const likeBtn = document.getElementById('like-button');
  const likeText = document.getElementById('like-text');
  let likes = parseInt(localStorage.getItem('harish_portfolio_likes'), 10) || 142;
  let hasLiked = localStorage.getItem('harish_has_liked') === 'true';

  function updateLikeDisplay() {
    if (likeText) likeText.textContent = `Likes: ${likes}`;
    if (hasLiked && likeBtn) {
      likeBtn.classList.add('fa-pump');
    }
  }
  updateLikeDisplay();

  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      if (!hasLiked) {
        likes++;
        hasLiked = true;
        localStorage.setItem('harish_portfolio_likes', likes);
        localStorage.setItem('harish_has_liked', 'true');
        likeBtn.classList.add('fa-pump');
        updateLikeDisplay();
        showToast("❤️ Thank you for endorsing Harish's portfolio!");
      } else {
        showToast("✨ You have already endorsed Harish's portfolio!");
      }
    });
  }


  // ================= 6. FLOATING DOCK SCROLL SPY =================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#dock-nav a[href^="#"]');

  function handleScrollSpy() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}` || 
             (sectionId === 'work' && link.getAttribute('data-nav') === 'work')) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', handleScrollSpy, { passive: true });


  // ================= 7. ABOUT SECTION: MONOSPACE CODING IDE TABS =================
  const ideTabBtns = document.querySelectorAll('.ide-tab-btn');
  const ideBodies = document.querySelectorAll('.code-ide-body');
  const ideLangLabel = document.querySelector('.ide-lang');

  const langMap = {
    'rust': 'UTF-8 • Rust',
    'json': 'UTF-8 • JSON',
    'shell': 'UTF-8 • Bash Shell'
  };

  ideTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ideTabBtns.forEach(b => b.classList.remove('active'));
      ideBodies.forEach(b => b.classList.remove('active'));

      btn.classList.add('active');
      const targetCode = btn.getAttribute('data-tab-code');
      const targetBody = document.getElementById(`code-${targetCode}`);
      if (targetBody) targetBody.classList.add('active');
      if (ideLangLabel && langMap[targetCode]) {
        ideLangLabel.textContent = langMap[targetCode];
      }
    });
  });


  // ================= 8. SKILLS FILTERING =================
  const skillFilterBtns = document.querySelectorAll('.skills-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // ================= 9. ACHIEVEMENTS & EXPERIENCE TABS =================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });


  // ================= 10. WORK INQUIRY FORM: DIRECT SUBMISSION TO joy862380@gmail.com =================
  const workForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const targetEmail = "joy862380@gmail.com";

  if (workForm) {
    workForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const engagement = document.getElementById('form-engagement')?.value || "General Inquiry";
      const subject = document.getElementById('form-subject')?.value.trim();
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !subject || !message) {
        showToast("⚠️ Please fill in all required fields.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
            <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>
          </svg>
          Dispatching to ${targetEmail}...
        `;
      }

      try {
        // Asynchronous post directly to FormSubmit endpoint configured for joy862380@gmail.com
        const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            engagement_type: engagement,
            subject: subject,
            message: message,
            _subject: `New Portfolio Work Proposal from ${name} [${engagement}]`,
            _template: "table"
          })
        });

        if (response.ok) {
          showToast(`📬 Proposal sent! Directly dispatched to ${targetEmail}.`);
          workForm.reset();
        } else {
          // If FormSubmit requires first-time confirmation or returned an error, fallback to mailto
          showToast(`📬 Forwarding proposal directly to ${targetEmail}...`);
          window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nEngagement: " + engagement + "\n\nMessage:\n" + message)}`;
        }
      } catch (err) {
        console.warn("Direct API dispatch error, utilizing mailto fallback:", err);
        showToast(`✉️ Opening email client to deliver to ${targetEmail}...`);
        window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nEngagement: " + engagement + "\n\nMessage:\n" + message)}`;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Submit Work Proposal
          `;
        }
      }
    });
  }


  // ================= 11. SMOOTH RESUME DOWNLOAD ENDORSEMENT =================
  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      showToast("📄 Downloading Harish S Official Resume PDF...");
    });
  }


  // ================= 12. SCROLL-TRIGGERED SKILL BAR ANIMATIONS =================
  const skillFills = document.querySelectorAll('.skill-progress-fill');

  // Store the target widths and reset to 0 initially
  skillFills.forEach(fill => {
    fill.dataset.targetWidth = fill.style.width;
    fill.style.width = '0%';
    fill.style.transition = 'width 1.1s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        setTimeout(() => {
          fill.style.width = fill.dataset.targetWidth;
        }, 120);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.25 });

  skillFills.forEach(fill => skillObserver.observe(fill));

});
