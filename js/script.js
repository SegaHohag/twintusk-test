const AVITO_URL = 'https://www.avito.ru/8058479133';

const VIDEO_SETTINGS = {
  mode: 'local',
  youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  localUrl: 'videos/install.mp4',
  poster: 'images/photo1.jpg'
};

const compatibilityModels = [
  { model: 'Honda Civic', years: 'VIII (2005-2009)', body: '5D', status: 'Совместимо' },
  { model: 'Honda Civic', years: 'VIII рестайлинг (2008-2011)', body: '5D', status: 'Совместимо' },
  { model: 'Honda Civic Type R', years: 'VIII (2005-2009)', body: '5D', status: 'Совместимо' },
  { model: 'Honda Civic Type R', years: 'VIII рестайлинг (2008-2011)', body: '5D', status: 'Совместимо' }
];

const faqItems = [
  ['Из какого материала изготовлена ручка?', 'Ручка изготовлена из прочного пластика методом 3D-печати и рассчитана на ежедневное использование.'],
  ['Подойдет ли на мой автомобиль?', 'Изделие предназначено только для Honda Civic 5D: Civic VIII, Civic VIII рестайлинг, Civic Type R VIII и Civic Type R VIII рестайлинг. На Civic 4D не подходит. Перед покупкой проконсультируйтесь с продавцом.'],
  ['Сложно ли установить?', 'Установка простая и обычно не требует сложной доработки: снять старую ручку, подготовить посадочное место и установить новую.'],
  ['Есть ли доставка?', 'Заказ оформляется через Авито, доступны варианты доставки, указанные в объявлении.'],
  ['Сколько служит такая деталь?', 'Срок службы зависит от условий эксплуатации, но каждая деталь проходит контроль качества перед отправкой.'],
  ['Отличается ли от оригинала?', 'Деталь повторяет размеры оригинала и совместима со штатным креплением, при этом производится методом 3D-печати.']
];

const reviews = [
  {
    name: 'Железякин, Honda Civic 8',
    photos: ['images/honda-civic-8-otzyv-ruchka-ruchnika.jpg'],
    text: `Установил ручку, всё хорошо. Спасибо за фото! Резинку в основание переставили, тоже всё нормально, всё встало по месту.`
  },
  {
    name: 'Василий, Civic 5D',
    photos: [
      'images/otzyv-ruchka-ruchnika-civic-5d-1.jpg',
      'images/otzyv-ruchka-ruchnika-civic-5d-2.jpg',
      'images/otzyv-ruchka-ruchnika-civic-5d-3.jpg',
      'images/otzyv-ruchka-ruchnika-civic-5d-4.jpg',
      'images/otzyv-ruchka-ruchnika-civic-5d-5.jpg'
    ],
    text: `Ручку получил, качество приятно удивило. Всё встало отлично. Спасибо!`
  },
  {
    name: 'Покупатель',
    photos: [
      'images/otzyv-ruchka-ruchnika-1.jpg',
      'images/otzyv-ruchnika-2.jpg'
    ],
    text: `Ручку получил, качество приятно удивило. Всё встало отлично. Спасибо!`
  },
  {
    name: 'Владислав, Civic 5D',
    photos: ['images/review1.jpg', 'images/review2.jpg'],
    text: `Замена отличная !!!\nВстало все четко. В руке сидит уверенно. Полосы видно только если в плотную смотреть. Всем рекомендую.`
  },
  {
    name: 'Илья, Civic 5D',
    photos: [],
    text: `Понравилось качество печати и посадка. Установка заняла несколько минут.`
  },
  {
    name: 'Марина, Civic VIII',
    photos: [],
    text: `Заказывала вместо б/у детали. Новая ручка выглядит намного лучше, доставка прошла спокойно.`
  }
];

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

document.querySelectorAll('.avito-link').forEach((link) => {
  link.href = AVITO_URL;
});

document.querySelectorAll('img[data-fallback="true"]').forEach((img) => {
  img.addEventListener('error', () => {
    const fallback = document.createElement('div');
    fallback.className = 'image-fallback';
    fallback.innerHTML = '<strong>Фото изделия</strong><br>Замените файл по этому пути на реальное изображение';
    img.replaceWith(fallback);
  }, { once: true });
});

const videoMount = document.getElementById('videoMount');
videoMount.innerHTML = `
<div style="position:relative;width:100%;height:100%;cursor:pointer;">
  <img src="${VIDEO_SETTINGS.poster}" style="width:100%;height:100%;object-fit:cover;" alt="Видео установки">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:16px 24px;background:#e21b2d;color:white;font-weight:bold;border-radius:8px;">▶ Смотреть видео установки</div>
</div>`;
videoMount.addEventListener('click', () => {
  videoMount.innerHTML = `<video controls autoplay style="width:100%;height:100%;" poster="${VIDEO_SETTINGS.poster}"><source src="${VIDEO_SETTINGS.localUrl}" type="video/mp4"></video>`;
}, { once:true });

document.getElementById('compatibilityRows').innerHTML = compatibilityModels.map((item) => `
  <tr><td>${escapeHTML(item.model)}</td><td>${escapeHTML(item.years)}</td><td>${escapeHTML(item.body)}</td><td>${escapeHTML(item.status)}</td></tr>
`).join('');

document.getElementById('faqList').innerHTML = faqItems.map(([question, answer]) => `
  <article class="faq-item"><button class="faq-question" type="button" aria-expanded="false"><span>${escapeHTML(question)}</span><span>+</span></button><div class="faq-answer">${escapeHTML(answer)}</div></article>
`).join('');

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.querySelector('span:last-child').textContent = isOpen ? '-' : '+';
  });
});

function getReviewPhotos(review) {
  if (Array.isArray(review.photos)) return review.photos.filter(Boolean);
  return review.photo ? [review.photo] : [];
}

function renderReviewPhotos(review) {
  const photos = getReviewPhotos(review);
  if (!photos.length) return '';
  return `<div class="review-photos" data-count="${photos.length}">${photos.map((photo, index) => `
    <button class="review-photo" type="button" aria-label="Увеличить фото отзыва ${index + 1}">
      <img src="${escapeHTML(photo)}" alt="Фото отзыва ${escapeHTML(review.name)} ${index + 1}" loading="lazy">
    </button>`).join('')}</div>`;
}

document.getElementById('reviewsGrid').innerHTML = reviews.map((review) => `
  <article class="review reveal">${renderReviewPhotos(review)}<div class="review-stars" aria-label="5 из 5 звезд" title="5 из 5 звезд">★★★★★</div><p>«${escapeHTML(review.text)}»</p><strong>${escapeHTML(review.name)}</strong></article>
`).join('');

document.querySelectorAll('.review-photo img').forEach((img) => {
  img.addEventListener('error', () => {
    img.closest('.review-photo').remove();
    document.querySelectorAll('.review-photos').forEach((group) => {
      const count = group.querySelectorAll('.review-photo').length;
      group.dataset.count = String(count);
      if (!count) group.remove();
    });
  }, { once: true });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
const lightboxItems = [];
let lightboxIndex = 0;
let lightboxScale = 1;
let lightboxTranslateX = 0;
let lightboxTranslateY = 0;
let lightboxDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragOriginX = 0;
let dragOriginY = 0;
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;

function collectLightboxItems() {
  lightboxItems.length = 0;
  document.querySelectorAll('.gallery-item img, .review-photo img').forEach((img) => {
    if (!img.src) return;
    lightboxItems.push({ src: img.currentSrc || img.src, alt: img.alt || '' });
  });
}

function resetLightboxZoom() {
  lightboxScale = 1;
  lightboxTranslateX = 0;
  lightboxTranslateY = 0;
  lightboxDragging = false;
  lightboxImage.style.transform = 'translate3d(0, 0, 0) scale(1)';
  lightboxImage.style.cursor = 'zoom-in';
}

function applyLightboxZoom() {
  lightboxImage.style.transform = `translate3d(${lightboxTranslateX}px, ${lightboxTranslateY}px, 0) scale(${lightboxScale})`;
  lightboxImage.style.cursor = lightboxScale > 1 ? 'grab' : 'zoom-in';
}

function updateLightboxCounter() {
  let counter = lightbox.querySelector('.lightbox-counter');
  if (!counter) {
    counter = document.createElement('div');
    counter.className = 'lightbox-counter';
    lightbox.appendChild(counter);
  }
  counter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
}

function updateLightboxArrows() {
  const visible = lightboxItems.length > 1;
  lightboxPrev.hidden = !visible;
  lightboxNext.hidden = !visible;
}

function showLightboxItem(index) {
  if (!lightboxItems.length) return;
  lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
  const item = lightboxItems[lightboxIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  resetLightboxZoom();
  updateLightboxCounter();
  updateLightboxArrows();
}

function openLightbox(src, alt) {
  collectLightboxItems();
  const index = lightboxItems.findIndex((item) => item.src === src);
  showLightboxItem(index >= 0 ? index : 0);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    openLightbox(img.currentSrc || img.src, img.alt);
  });
});

document.querySelectorAll('.review-photo').forEach((button) => {
  button.addEventListener('click', () => {
    const img = button.querySelector('img');
    if (!img) return;
    openLightbox(img.currentSrc || img.src, img.alt);
  });
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.style.maxWidth = '';
  lightboxImage.style.maxHeight = '';
  lightboxImage.style.touchAction = '';
  resetLightboxZoom();
  document.body.style.overflow = '';
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (event) => {
  event.stopPropagation();
  showLightboxItem(lightboxIndex - 1);
});
lightboxNext.addEventListener('click', (event) => {
  event.stopPropagation();
  showLightboxItem(lightboxIndex + 1);
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

// Клик по фотографии: левая половина — назад, правая — вперед.
// На телефоне используем тот же pointer-сценарий, что и для обычного касания.
lightboxImage.addEventListener('click', (event) => {
  if (lightboxScale !== 1 || lightboxDragging || touchMoved) return;
  const rect = lightboxImage.getBoundingClientRect();
  const x = event.clientX - rect.left;
  if (x < rect.width / 2) {
    showLightboxItem(lightboxIndex - 1);
  } else {
    showLightboxItem(lightboxIndex + 1);
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') showLightboxItem(lightboxIndex + 1);
  if (event.key === 'ArrowLeft') showLightboxItem(lightboxIndex - 1);
});

lightboxImage.addEventListener('load', () => {
  lightboxImage.style.maxWidth = 'min(92vw, 1100px)';
  lightboxImage.style.maxHeight = '86vh';
  lightboxImage.style.width = 'auto';
  lightboxImage.style.height = 'auto';
  lightboxImage.style.objectFit = 'contain';
  lightboxImage.style.display = 'block';
  lightboxImage.style.margin = '0 auto';
  lightboxImage.style.touchAction = 'none';
  resetLightboxZoom();
});

lightboxImage.addEventListener('dblclick', (event) => {
  event.preventDefault();
  if (lightboxScale === 1) lightboxScale = 2;
  else { resetLightboxZoom(); return; }
  applyLightboxZoom();
});

lightboxImage.addEventListener('wheel', (event) => {
  if (!lightbox.classList.contains('is-open')) return;
  event.preventDefault();
  const direction = event.deltaY < 0 ? 0.25 : -0.25;
  lightboxScale = Math.min(4, Math.max(1, lightboxScale + direction));
  if (lightboxScale === 1) { lightboxTranslateX = 0; lightboxTranslateY = 0; }
  applyLightboxZoom();
}, { passive: false });

lightboxImage.addEventListener('pointerdown', (event) => {
  if (event.pointerType !== 'mouse' || lightboxScale <= 1) return;
  lightboxDragging = true;
  lightboxImage.setPointerCapture(event.pointerId);
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragOriginX = lightboxTranslateX;
  dragOriginY = lightboxTranslateY;
  lightboxImage.style.cursor = 'grabbing';
});

lightboxImage.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse' || !lightboxDragging) return;
  lightboxTranslateX = dragOriginX + event.clientX - dragStartX;
  lightboxTranslateY = dragOriginY + event.clientY - dragStartY;
  applyLightboxZoom();
});

function stopLightboxMouseDrag(event) {
  if (event.pointerType !== 'mouse') return;
  lightboxDragging = false;
  if (event.pointerId != null && lightboxImage.hasPointerCapture(event.pointerId)) lightboxImage.releasePointerCapture(event.pointerId);
  applyLightboxZoom();
}

lightboxImage.addEventListener('pointerup', stopLightboxMouseDrag);
lightboxImage.addEventListener('pointercancel', stopLightboxMouseDrag);
lightboxImage.addEventListener('pointerleave', (event) => {
  if (event.pointerType === 'mouse' && !lightboxImage.hasPointerCapture(event.pointerId)) lightboxDragging = false;
});

// Мобильная навигация: свайп перелистывает, обычное касание по фото —
// левая половина назад, правая вперед. Клик после свайпа блокируем.
lightboxImage.addEventListener('touchstart', (event) => {
  if (event.touches.length !== 1) return;
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
  touchMoved = false;
}, { passive: true });

lightboxImage.addEventListener('touchmove', (event) => {
  if (event.touches.length !== 1) return;
  const touch = event.touches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  touchMoved = Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10;
}, { passive: true });

lightboxImage.addEventListener('touchend', (event) => {
  if (!event.changedTouches.length) return;
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (touchMoved && Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
    showLightboxItem(lightboxIndex + (deltaX < 0 ? 1 : -1));
  }

  // Не даём последующему click от touch сработать как ещё один переход.
  setTimeout(() => { touchMoved = false; }, 250);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));