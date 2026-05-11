(() => {
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  async function copyValue(value, sourceEl) {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`Copied ${value.length > 40 ? value.slice(0, 38) + '…' : value}`);
      if (sourceEl) {
        sourceEl.classList.add('copied');
        setTimeout(() => sourceEl.classList.remove('copied'), 900);
      }
    } catch (err) {
      // fallback for older browsers / insecure contexts
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showToast(`Copied ${value}`); }
      catch (e) { showToast('Could not copy — please copy manually'); }
      document.body.removeChild(ta);
    }
  }

  // every element with [data-copy] copies its value when clicked
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-copy]');
    if (!target) return;
    const value = target.getAttribute('data-copy');
    if (!value) return;
    copyValue(value, target);
  });

  // keyboard activation on swatch chips (since they are not native buttons)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const target = e.target.closest('.swatch-chip');
    if (!target) return;
    e.preventDefault();
    const value = target.getAttribute('data-copy');
    if (value) copyValue(value, target);
  });

  // make swatch chips focusable for keyboard users
  document.querySelectorAll('.swatch-chip').forEach((chip) => {
    if (!chip.hasAttribute('tabindex')) chip.setAttribute('tabindex', '0');
    if (!chip.hasAttribute('role')) chip.setAttribute('role', 'button');
    const v = chip.getAttribute('data-copy');
    if (v) chip.setAttribute('aria-label', `Copy ${v}`);
  });

  // highlight current nav section on scroll
  const navLinks = Array.from(document.querySelectorAll('.masthead-nav a'));
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${id}`;
          link.style.borderBottomColor = active ? 'var(--california-poppy)' : 'transparent';
          link.style.color = active ? 'var(--california-poppy)' : '';
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((s) => observer.observe(s));
  }
})();
