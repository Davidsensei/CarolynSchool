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
