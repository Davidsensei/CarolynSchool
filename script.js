// Enjoy English Maebashi — Site Scripts

// --- Sticky nav shadow on scroll ---
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Contact form ---
// Submits to Formspree (form action) via AJAX so the visitor stays on the
// page and sees the thank-you message instead of being redirected.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = form.querySelector('#name').value.trim() || 'お客様';
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '送信中…';
    }

    const showSuccess = () => {
      form.innerHTML = `
        <div class="form-success">
          <div style="font-size:48px">✅</div>
          <h3>${name}様、ありがとうございます！</h3>
          <p>お問い合わせを受け付けました。<br>2〜3営業日以内にご連絡いたします。</p>
        </div>
      `;
    };

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        showSuccess();
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '送信する';
      }
      alert('申し訳ありません。送信に失敗しました。お手数ですが、お電話（027-237-3400）でお問い合わせください。');
    }
  });
}
// --- Homepage photo carousel ---
const initHeroCarousel = () => {
  const carousel = document.querySelector('.hero__carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.photo'));
  if (slides.length < 2) return;

  let current = 0;
  let timer;

  // Create navigation dots
  const dots = document.createElement('div');
  dots.className = 'hero__carousel-dots';
  dots.setAttribute('aria-label', '写真を選択');

  const buttons = slides.map((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hero__carousel-dot';
    button.setAttribute('aria-label', `写真 ${index + 1} を表示`);
    button.setAttribute('aria-pressed', String(index === 0));

    button.addEventListener('click', () => {
      showSlide(index);
      restartTimer();
    });

    dots.appendChild(button);
    return button;
  });

  carousel.appendChild(dots);

  function showSlide(index) {
    slides[current].classList.remove('active');
    buttons[current].setAttribute('aria-pressed', 'false');

    current = index;

    slides[current].classList.add('active');
    buttons[current].setAttribute('aria-pressed', 'true');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 5000);
  }

  function restartTimer() {
    startTimer();
  }

  // Pause while visitors interact with the carousel
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', startTimer);
  carousel.addEventListener('focusin', () => clearInterval(timer));
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) startTimer();
  });

  startTimer();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
  initHeroCarousel();
}
