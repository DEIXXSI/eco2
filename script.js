/* ============================================================
   ЭКОТАТАРСТАН — общий скрипт (обновлён 2026)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. МОБИЛЬНОЕ МЕНЮ ---------- */
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

  /* ---------- 2. АКТИВНАЯ ССЫЛКА ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* ---------- 3. AOS INIT ---------- */
  if (window.AOS) {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 });
  }

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
  const heroImg = document.querySelector('.hero-bg__image');
  if (heroImg && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(heroImg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-bg',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ---------- 6. FAQ АККОРДЕОН ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- 7. УНИВЕРСАЛЬНОЕ МОДАЛЬНОЕ ОКНО (детали) ---------- */
  const modal = document.getElementById('modal');
  const modalClose = modal?.querySelector('.modal__close');
  const detailTitle = modal?.querySelector('#detailTitle');
  const detailBody = modal?.querySelector('#detailBody');

  // Данные для детального просмотра (задаются в каждой HTML-странице)
  const DETAIL_DATA = window.DETAIL_DATA || {};

  function openDetail(id) {
    if (!modal || !DETAIL_DATA[id]) return;
    const d = DETAIL_DATA[id];

    if (detailTitle) detailTitle.textContent = d.title || 'Подробнее';

    let html = '';

    // Картинка
    if (d.image) {
      html += `<div style="border-radius:20px;overflow:hidden;margin-bottom:1.5rem;aspect-ratio:16/9;background:url('${d.image}') center/cover"></div>`;
    }

    // Мета-бейджи
    if (d.meta && d.meta.length) {
      html += `<div style="display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:1.2rem">`;
      d.meta.forEach(m => {
        html += `<span style="display:inline-flex;align-items:center;gap:.3rem;background:#d8f3dc;color:#1b4332;padding:.4rem .9rem;border-radius:100px;font-size:.78rem;font-weight:700">${m}</span>`;
      });
      html += `</div>`;
    }

    // Описание
    if (d.description) {
      html += `<p style="color:#5a5a5a;line-height:1.7;font-size:.95rem;margin-bottom:1.2rem">${d.description}</p>`;
    }

    // Детали (список)
    if (d.details && d.details.length) {
      html += `<div style="background:#f5f1e8;border-radius:16px;padding:1.2rem;margin-bottom:1rem">`;
      html += `<div style="font-weight:800;color:#1b4332;margin-bottom:.6rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em">Что вас ждёт</div>`;
      d.details.forEach(item => {
        html += `<div style="display:flex;gap:.7rem;margin-bottom:.55rem;font-size:.9rem;color:#1b4332;line-height:1.5"><span style="flex-shrink:0;color:#40916c;font-weight:900">•</span><span>${item}</span></div>`;
      });
      html += `</div>`;
    }

    // Правила / важное
    if (d.rules) {
      html += `<div style="background:#fff3cd;border-radius:16px;padding:1.2rem;margin-bottom:1rem">
        <div style="font-weight:800;color:#8a6d3b;margin-bottom:.5rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em">⚠️ Важно знать</div>
        <div style="font-size:.9rem;color:#8a6d3b;line-height:1.6">${d.rules}</div>
      </div>`;
    }

    // Контакт
    if (d.contact) {
      html += `<div style="background:#d8f3dc;border-radius:16px;padding:1.2rem">
        <div style="font-weight:800;color:#1b4332;margin-bottom:.4rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em">📞 Контакт организатора</div>
        <div style="font-size:.9rem;color:#1b4332;line-height:1.6;font-weight:600">${d.contact}</div>
      </div>`;
    }

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

  // Обработчики кнопок «Подробнее»
  document.querySelectorAll('.js-detail').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openDetail(btn.dataset.detail);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ---------- 8. ФИЛЬТРАЦИЯ (календарь, карта, ООПТ) ---------- */
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
      } else {
        filters[key] = inp.value.trim().toLowerCase();
      }
    });

    let visible = 0;
    filterableItems.forEach(item => {
      let show = true;

      // Тип активности (чекбоксы, может быть несколько)
      if (filters.type?.length) {
        const types = (item.dataset.type || '').split(',').map(s => s.trim());
        if (!filters.type.some(t => types.includes(t))) show = false;
      }

      // Район
      if (filters.district) {
        const d = (item.dataset.district || '').toLowerCase();
        // Специальная обработка "все районы"
        if (filters.district === 'все районы') {
          if (d !== 'все районы') show = false;
        } else if (!d.includes(filters.district)) {
          show = false;
        }
      }

      // Сложность (для карты троп)
      if (filters.difficulty && (item.dataset.difficulty || '').toLowerCase() !== filters.difficulty) show = false;

      // Категория (для ООПТ)
      if (filters.category && (item.dataset.category || '').toLowerCase() !== filters.category) show = false;

      // Режим доступа (для ООПТ)
      if (filters.access?.length && !filters.access.includes(item.dataset.access)) show = false;

      // Дата
      if (filters.date && (item.dataset.date || '') !== filters.date) show = false;

      // Поиск
      if (filters.search && !item.textContent.toLowerCase().includes(filters.search)) show = false;

      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    // Сообщение "Ничего не найдено"
    document.querySelector('.js-empty')?.classList.toggle('hidden', visible > 0);

    // Счётчик для ООПТ
    const counter = document.getElementById('ooptCount');
    if (counter) counter.textContent = `${visible} ООПТ`;
  }

  filterInputs.forEach(inp => {
    inp.addEventListener('input', applyFilters);
    inp.addEventListener('change', applyFilters);
  });

  /* ---------- 9. КАРТА ЭКОТРОП (Leaflet) ---------- */
  if (document.getElementById('map') && typeof L !== 'undefined') {
    const map = L.map('map', { scrollWheelZoom: false }).setView([55.75, 49.2], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    const trails = window.TRAILS || [];

    const icons = {
      'лёгкая': L.divIcon({
        className: '',
        html: '<div style="background:#74c69d;width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.35)"></div>',
        iconSize: [24, 24], iconAnchor: [12, 12],
      }),
      'средняя': L.divIcon({
        className: '',
        html: '<div style="background:#40916c;width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.35)"></div>',
        iconSize: [24, 24], iconAnchor: [12, 12],
      }),
      'сложная': L.divIcon({
        className: '',
        html: '<div style="background:#1b4332;width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.35)"></div>',
        iconSize: [24, 24], iconAnchor: [12, 12],
      }),
    };

    const markers = {};

    trails.forEach(t => {
      markers[t.id] = L.marker([t.lat, t.lng], { icon: icons[t.difficulty] || icons['лёгкая'] })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:Inter,system-ui;min-width:200px">
            <strong style="color:#1b4332;font-size:1.05rem">${t.name}</strong><br>
            <span style="color:#5a5a5a;font-size:.85rem">${t.district} · ${t.length} · ${t.difficulty}</span>
            <p style="margin:.5rem 0;font-size:.88rem;color:#5a5a5a">${t.desc}</p>
            <span style="font-size:.78rem;color:#40916c">${t.lat.toFixed(4)}, ${t.lng.toFixed(4)}</span>
          </div>
        `);
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

  /* ---------- 10. КАРТА ООПТ (Leaflet) ---------- */
  if (document.getElementById('ooptMap') && typeof L !== 'undefined') {
    const map = L.map('ooptMap', { scrollWheelZoom: false }).setView([55.7, 49.4], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    const oopts = window.OOPT || [];
    const markers = {};

    oopts.forEach(o => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="oopt-marker" style="background:${o.color}">${o.icon}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      markers[o.id] = L.marker([o.lat, o.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:Inter,system-ui;min-width:210px">
            <strong style="color:#1b4332;font-size:1.05rem">${o.name}</strong><br>
            <span style="color:#5a5a5a;font-size:.85rem">${o.category} · ${o.district}</span>
            <p style="margin:.5rem 0;font-size:.85rem;color:#5a5a5a">${o.desc}</p>
          </div>
        `);
    });

    document.querySelectorAll('.oopt-item').forEach(item => {
      item.addEventListener('click', e => {
        // Не срабатывает при клике на кнопку «Подробнее»
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

});