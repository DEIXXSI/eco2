/* ============================================================
   ЭКОТАТАРСТАН 2026 — MODERN EDITION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. GLASS HEADER ---------- */
  const header = document.querySelector('.glass-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. MOBILE NAV ---------- */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- 3. AOS ---------- */
  if (window.AOS) AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 80 });

  /* ---------- 4. GSAP HERO ---------- */
  if (window.gsap) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-anim-1', { y: 40, opacity: 0, duration: 1, delay: .2 })
      .from('.hero-anim-2', { y: 60, opacity: 0, duration: 1 }, '-=.7')
      .from('.hero-anim-3', { y: 40, opacity: 0, duration: .8 }, '-=.6')
      .from('.hero-anim-4', { y: 30, opacity: 0, duration: .8 }, '-=.5')
      .from('.hero-anim-5', { y: 40, opacity: 0, stagger: .12, duration: .8 }, '-=.5');
  }

  /* ---------- 5. PARALLAX HERO ---------- */
  const heroBg = document.querySelector('.fullhero__photo, .hero-page__bg');
  if (heroBg && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(heroBg, {
      yPercent: 20, ease: 'none',
      scrollTrigger: { trigger: heroBg.parentElement, start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ---------- 6. FAQ ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* ---------- 7. MODAL ---------- */
  const modal = document.getElementById('modal');
  const modalClose = modal?.querySelector('.modal__close');
  const detailTitle = modal?.querySelector('#detailTitle');
  const detailBody = modal?.querySelector('#detailBody');
  const DETAIL_DATA = window.DETAIL_DATA || {};

  function openDetail(id) {
    if (!modal || !DETAIL_DATA[id]) return;
    const d = DETAIL_DATA[id];
    if (detailTitle) detailTitle.textContent = d.title || 'Подробнее';
    let html = '';
    if (d.image) html += `<div style="border-radius:20px;overflow:hidden;margin-bottom:1.5rem;aspect-ratio:16/9;background:url('${d.image}') center/cover"></div>`;
    if (d.meta?.length) {
      html += `<div style="display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:1.2rem">`;
      d.meta.forEach(m => { html += `<span style="display:inline-flex;align-items:center;gap:.3rem;background:linear-gradient(135deg,#d8f3dc,#a8e6c1);color:#0a2a18;padding:.4rem .9rem;border-radius:100px;font-size:.78rem;font-weight:700">${m}</span>`; });
      html += `</div>`;
    }
    if (d.description) html += `<p style="color:#5a5a5a;line-height:1.7;font-size:.95rem;margin-bottom:1.2rem">${d.description}</p>`;
    if (d.details?.length) {
      html += `<div style="background:linear-gradient(135deg,#f5f1e8,#eef6f0);border-radius:18px;padding:1.3rem;margin-bottom:1rem">`;
      html += `<div style="font-weight:800;color:#1b4332;margin-bottom:.6rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em">Что вас ждёт</div>`;
      d.details.forEach(item => { html += `<div style="display:flex;gap:.7rem;margin-bottom:.55rem;font-size:.9rem;color:#1b4332;line-height:1.5"><span style="flex-shrink:0;color:#40916c;font-weight:900">•</span><span>${item}</span></div>`; });
      html += `</div>`;
    }
    if (d.rules) html += `<div style="background:#fff8e1;border-radius:18px;padding:1.3rem;margin-bottom:1rem;border:1px solid #f4e5b8"><div style="font-weight:800;color:#8a6d3b;margin-bottom:.5rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em">⚠️ Важно знать</div><div style="font-size:.9rem;color:#8a6d3b;line-height:1.6">${d.rules}</div></div>`;
    if (d.contact) html += `<div style="background:linear-gradient(135deg,#d8f3dc,#a8e6c1);border-radius:18px;padding:1.3rem"><div style="font-weight:800;color:#0a2a18;margin-bottom:.4rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em">📞 Контакт организатора</div><div style="font-size:.9rem;color:#0a2a18;line-height:1.6;font-weight:600">${d.contact}</div></div>`;
    if (detailBody) detailBody.innerHTML = html;
    modal.classList.add('open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.js-detail').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); openDetail(btn.dataset.detail); });
  });
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ---------- 8. FILTERS ---------- */
  const filterInputs = document.querySelectorAll('[data-filter]');
  const filterableItems = document.querySelectorAll('[data-category]');

  function applyFilters() {
    if (!filterableItems.length) return;
    const filters = {};
    filterInputs.forEach(inp => {
      const key = inp.dataset.filter;
      if (inp.type === 'checkbox') {
        if (!filters[key]) filters[key] = [];
        if (inp.checked) filters[key].push(inp.value);
      } else filters[key] = inp.value.trim().toLowerCase();
    });
    let visible = 0;
    filterableItems.forEach(item => {
      let show = true;
      if (filters.type?.length) {
        const types = (item.dataset.type || '').split(',').map(s => s.trim());
        if (!filters.type.some(t => types.includes(t))) show = false;
      }
      if (filters.district) {
        const d = (item.dataset.district || '').toLowerCase();
        if (filters.district === 'все районы') {
          if (d !== 'все районы') show = false;
        } else if (!d.includes(filters.district)) show = false;
      }
      if (filters.difficulty && (item.dataset.difficulty || '').toLowerCase() !== filters.difficulty) show = false;
      if (filters.category && (item.dataset.category || '').toLowerCase() !== filters.category) show = false;
      if (filters.access?.length && !filters.access.includes(item.dataset.access)) show = false;
      if (filters.date && (item.dataset.date || '') !== filters.date) show = false;
      if (filters.search && !item.textContent.toLowerCase().includes(filters.search)) show = false;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    document.querySelector('.js-empty')?.classList.toggle('hidden', visible > 0);
    const counter = document.getElementById('ooptCount');
    if (counter) counter.textContent = `${visible} ООПТ`;
  }
  filterInputs.forEach(inp => {
    inp.addEventListener('input', applyFilters);
    inp.addEventListener('change', applyFilters);
  });

  /* ---------- 9. MAP TRAILS ---------- */
  if (document.getElementById('map') && typeof L !== 'undefined') {
    const map = L.map('map', { scrollWheelZoom: false }).setView([55.75, 49.2], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 18 }).addTo(map);
    const trails = window.TRAILS || [];
    const icons = {
      'лёгкая': L.divIcon({ className:'', html:'<div style="background:#74e0a0;width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 4px 16px rgba(116,224,160,.8)"></div>', iconSize:[24,24], iconAnchor:[12,12] }),
      'средняя': L.divIcon({ className:'', html:'<div style="background:#40916c;width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 4px 16px rgba(64,145,108,.8)"></div>', iconSize:[24,24], iconAnchor:[12,12] }),
      'сложная': L.divIcon({ className:'', html:'<div style="background:#1b4332;width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 4px 16px rgba(27,67,50,.8)"></div>', iconSize:[24,24], iconAnchor:[12,12] }),
    };
    const markers = {};
    trails.forEach(t => {
      markers[t.id] = L.marker([t.lat, t.lng], { icon: icons[t.difficulty] || icons['лёгкая'] })
        .addTo(map)
        .bindPopup(`<div style="font-family:Inter,system-ui;min-width:200px"><strong style="color:#1b4332;font-size:1.05rem">${t.name}</strong><br><span style="color:#5a5a5a;font-size:.85rem">${t.district} · ${t.length} · ${t.difficulty}</span><p style="margin:.5rem 0;font-size:.88rem;color:#5a5a5a">${t.desc}</p></div>`);
    });
    document.querySelectorAll('.trail-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const t = trails.find(x => x.id === id);
        if (!t) return;
        document.querySelectorAll('.trail-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        map.flyTo([t.lat, t.lng], 12, { duration: 1.2 });
        markers[id]?.openPopup();
      });
    });
  }

  /* ---------- 10. MAP OOPT ---------- */
  if (document.getElementById('ooptMap') && typeof L !== 'undefined') {
    const map = L.map('ooptMap', { scrollWheelZoom: false }).setView([55.7, 49.4], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 18 }).addTo(map);
    const oopts = window.OOPT || [];
    const markers = {};
    oopts.forEach(o => {
      const icon = L.divIcon({ className:'', html:`<div class="oopt-marker" style="background:${o.color}">${o.icon}</div>`, iconSize:[30,30], iconAnchor:[15,15] });
      markers[o.id] = L.marker([o.lat, o.lng], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:Inter,system-ui;min-width:210px"><strong style="color:#1b4332;font-size:1.05rem">${o.name}</strong><br><span style="color:#5a5a5a;font-size:.85rem">${o.category} · ${o.district}</span><p style="margin:.5rem 0;font-size:.85rem;color:#5a5a5a">${o.desc}</p></div>`);
    });
    document.querySelectorAll('.oopt-item').forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.closest('.js-detail')) return;
        const id = item.dataset.id;
        const o = oopts.find(x => x.id === id);
        if (!o) return;
        document.querySelectorAll('.oopt-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        map.flyTo([o.lat, o.lng], 11, { duration: 1.2 });
        markers[id]?.openPopup();
      });
    });
  }

  /* ============================================================
     CANVAS: ЛЕТАЮЩИЕ ЛИСТЬЯ
     ============================================================ */
  const canvas = document.createElement('canvas');
  canvas.id = 'leavesCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const mouse = { x: W / 2, y: H / 2 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const LEAF_EMOJIS = ['🍃','🌿','🌱','🍂','🍁'];
  const LEAF_COLORS = ['#74e0a0','#40916c','#a8e6c1','#f4a261','#d8f3dc'];

  class Leaf {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : -50;
      this.size = 12 + Math.random() * 22;
      this.speedY = .3 + Math.random() * .8;
      this.speedX = (Math.random() - .5) * .6;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - .5) * .03;
      this.emoji = LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)];
      this.color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      this.opacity = .3 + Math.random() * .5;
      this.swayPhase = Math.random() * Math.PI * 2;
      this.swayAmp = 20 + Math.random() * 40;
    }
    update(t) {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(t * .001 + this.swayPhase) * .5;
      this.rot += this.rotSpeed;

      // Отталкивание от курсора
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        const force = (120 - d) / 120;
        this.x += (dx / d) * force * 3;
        this.y += (dy / d) * force * 3;
      }

      if (this.y > H + 50) this.reset();
      if (this.x < -50) this.x = W + 50;
      if (this.x > W + 50) this.x = -50;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.opacity;
      ctx.font = `${this.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 15;
      ctx.fillText(this.emoji, 0, 0);
      ctx.restore();
    }
  }

  const leaves = [];
  const leafCount = window.innerWidth < 768 ? 15 : 30;
  for (let i = 0; i < leafCount; i++) leaves.push(new Leaf());

  function animateLeaves(t) {
    ctx.clearRect(0, 0, W, H);
    leaves.forEach(l => { l.update(t); l.draw(); });
    requestAnimationFrame(animateLeaves);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(animateLeaves);
  }

  /* ============================================================
     CURSOR: DOT + RING
     ============================================================ */
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  const cursorRing = document.createElement('div');
  cursorRing.className = 'cursor-ring';
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);

  let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
  document.addEventListener('mousemove', e => {
    dotX = e.clientX; dotY = e.clientY;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
  });

  function animateCursor() {
    ringX += (dotX - ringX) * .15;
    ringY += (dotY - ringY) * .15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  if (window.matchMedia('(hover: hover)').matches) animateCursor();

  // Hover-эффект на интерактивных элементах
  document.querySelectorAll('a, button, .feat-card, .photo-card, .glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  /* ============================================================
     RIPPLE ON CLICK
     ============================================================ */
  document.addEventListener('click', e => {
    const r = document.createElement('div');
    r.className = 'ripple';
    const size = 60;
    r.style.width = r.style.height = size + 'px';
    r.style.left = e.clientX + 'px';
    r.style.top = e.clientY + 'px';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 900);
  });

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  document.querySelectorAll('.btn-hero, .btn-join, .btn-play').forEach(el => {
    el.classList.add('magnetic');
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * .3}px, ${y * .3}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ============================================================
     3D TILT CARDS
     ============================================================ */
  document.querySelectorAll('.feat-card, .photo-card, .glass-card, .stat-cell').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        el.classList.add('counter-pulse');
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('ru-RU') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: .4 });
    counters.forEach(c => obs.observe(c));
  }

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  const revealEls = document.querySelectorAll('.reveal, [data-reveal]');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: .12 });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ============================================================
     KINETIC TEXT (буквы дышат)
     ============================================================ */
  document.querySelectorAll('.kinetic').forEach(el => {
    const text = el.textContent;
    el.innerHTML = text.split('').map((ch, i) =>
      ch === ' ' ? ' ' : `<span style="--i:${i}">${ch}</span>`
    ).join('');
  });

});