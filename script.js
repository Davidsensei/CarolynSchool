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
// Currently shows a thank-you message on submit.
//
// TO CONNECT A REAL FORM SERVICE:
//   Option A — Formspree (free, easy):
//     1. Sign up at https://formspree.io
//     2. Create a new form and copy your endpoint URL
//     3. Set the <form> action to your endpoint and remove the JS below
//
//   Option B — Netlify Forms (free if hosting on Netlify):
//     Add  data-netlify="true"  to the <form> tag and deploy to Netlify
//
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim() || 'お客様';

    form.innerHTML = `
      <div class="form-success">
        <div style="font-size:48px">✅</div>
        <h3>${name}様、ありがとうございます！</h3>
        <p>お問い合わせを受け付けました。<br>2〜3営業日以内にご連絡いたします。</p>
      </div>
    `;
  });
}
