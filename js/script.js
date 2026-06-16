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
  ['Есть ли доставка?', 'Да. Заказ оформляется через Авито, а доступные способы доставки указаны в объявлении.'],
  ['Сколько служит такая деталь?', 'Срок службы зависит от эксплуатации, но каждая деталь проходит контроль качества перед отправкой.'],
  ['Отличается ли от оригинала?', 'Деталь повторяет размеры оригинала и совместима со штатным креплением, но производится методом 3D-печати.']
];

// Новые отзывы можно добавлять в начало этого списка, сразу после строки `const reviews = [`.
// Если у отзыва есть фото, положите файлы в папку images и укажите пути в поле photos.
// Можно указать 1, 2, 3, 4 и больше фото. Если фото нет, оставьте photos: [].
// Для длинного текста используйте обратные кавычки `...`.
const reviews = [
  {
    name: 'Владислав, Civic 5D',
    photos: ['images/review1.jpg', 'images/review2.jpg'],
    text: `Замена отличная !!!
Встало все четко. В руке сидит уверенно. Полосы видно только если в плотную смотреть. Всем рекомендую.`
  },
  {
    name: 'Алексей, Civic 5D',
    photos: [],
    text: `Старая ручка была вся потертая. Новая встала плотно, салон сразу выглядит аккуратнее.`
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
  <img src="${VIDEO_SETTINGS.poster}"
       style="width:100%;height:100%;object-fit:cover;"
       alt="Видео установки">
  <div style="
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      padding:16px 24px;
      background:#e21b2d;
      color:white;
      font-weight:bold;
      border-radius:8px;">
      ▶ Смотреть видео установки
  </div>
</div>
`;

videoMount.addEventListener('click', () => {
  videoMount.innerHTML = `
    <video controls autoplay style="width:100%;height:100%;" poster="${VIDEO_SETTINGS.poster}">
      <source src="${VIDEO_SETTINGS.localUrl}" type="video/mp4">
    </video>
  `;
}, { once:true });
document.getElementById('compatibilityRows').innerHTML = compatibilityModels.map((item) => `
  <tr>
    <td>${escapeHTML(item.model)}</td>
    <td>${escapeHTML(item.years)}</td>
    <td>${escapeHTML(item.body)}</td>
    <td>${escapeHTML(item.status)}</td>
  </tr>
`).join('');

document.getElementById('faqList').innerHTML = faqItems.map(([question, answer]) => `
  <article class="faq-item">
    <button class="faq-question" type="button" aria-expanded="false">
      <span>${escapeHTML(question)}</span><span>+</span>
    </button>
    <div class="faq-answer">${escapeHTML(answer)}</div>
  </article>
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

  return `
    <div class="review-photos" data-count="${photos.length}">
      ${photos.map((photo, index) => `
        <button class="review-photo" type="button" aria-label="Увеличить фото отзыва ${index + 1}">
          <img src="${escapeHTML(photo)}" alt="Фото отзыва ${escapeHTML(review.name)} ${index + 1}" loading="lazy">
        </button>
      `).join('')}
    </div>
  `;
}

document.getElementById('reviewsGrid').innerHTML = reviews.map((review) => `
  <article class="review reveal">
    ${renderReviewPhotos(review)}
    <p>«${escapeHTML(review.text)}»</p>
    <strong>${escapeHTML(review.name)}</strong>
  </article>
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

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
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
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
