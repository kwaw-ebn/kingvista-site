// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
  // Gallery loader
  async function loadGallery() {
    try {
      const res = await fetch('/images-list.json');
      if (!res.ok) return;
      const all = await res.json(); // format: { "kente": ["kente/1.jpg", ...], "general": [...], "clothing": [...] }
      document.querySelectorAll('.gallery-grid').forEach(grid => {
        const cat = grid.dataset.category || 'general';
        const list = all[cat] || [];
        grid.innerHTML = list.map(src => `
          <div class="thumb">
            <img loading="lazy" data-src="assets/images/${src}" alt="${src.split('/').pop()}" />
          </div>
        `).join('');
      });
      // Progressive lazy load
      const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const img = e.target;
          const src = img.getAttribute('data-src');
          if (src) { img.src = src; img.removeAttribute('data-src'); }
          observer.unobserve(img);
        });
      }, {rootMargin: "200px 0px"});
      lazyImgs.forEach(i => io.observe(i));
      // lightbox binding
      document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('click', e => openLightbox(e.target));
      });
    } catch (err) {
      console.error('Gallery load failed', err);
    }
  }

  function openLightbox(imgEl) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const lbImg = document.getElementById('lb-img');
    const caption = document.getElementById('lb-caption');
    lbImg.src = imgEl.src || imgEl.getAttribute('data-src');
    caption.textContent = imgEl.alt || '';
    lb.setAttribute('aria-hidden', 'false');
  }

  const closeBtn = document.getElementById('lb-close');
  if (closeBtn) closeBtn.addEventListener('click', () => {
    document.getElementById('lightbox').setAttribute('aria-hidden','true');
  });
  // close on overlay click
  const lb = document.getElementById('lightbox');
  if (lb) lb.addEventListener('click', e => {
    if (e.target === lb) lb.setAttribute('aria-hidden','true');
  });

  loadGallery();

  // Optional: add WhatsApp message builder if you want dynamic messages
  // (Already an anchor exists, so browsers open WhatsApp/WhatsApp Web)
});
