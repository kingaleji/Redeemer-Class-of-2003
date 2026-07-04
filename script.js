// ============================================================
// Redeemer Class of 2003 — Alumni Directory logic
// ============================================================

const grid = document.getElementById('alumniGrid');
const searchInput = document.getElementById('searchInput');
const hobbyFilter = document.getElementById('hobbyFilter');
const resultCount = document.getElementById('resultCount');
const modalOverlay = document.getElementById('modalOverlay');
const modalCard = document.getElementById('modalCard');

// Build the avatar URL. If an alum has a real "photo" field set (a URL to
// an actual photo), that will be used instead of the placeholder avatar.
function getPhotoUrl(alum) {
  if (alum.photo) return alum.photo;
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(alum.avatarSeed)}&backgroundType=gradientLinear`;
}

// Populate the hobby filter dropdown from the dataset
function buildHobbyOptions() {
  const hobbySet = new Set();
  ALUMNI_DATA.forEach(a => a.hobbies.forEach(h => hobbySet.add(h)));
  [...hobbySet].sort().forEach(hobby => {
    const opt = document.createElement('option');
    opt.value = hobby;
    opt.textContent = hobby;
    hobbyFilter.appendChild(opt);
  });
}

function cardTemplate(alum) {
  const topHobbies = alum.hobbies.slice(0, 2);
  return `
    <article class="alumni-card" data-id="${alum.id}" tabindex="0" role="button" aria-label="View profile for ${alum.name}">
      <div class="punch"></div>
      <div class="photo-wrap">
        <img src="${getPhotoUrl(alum)}" alt="${alum.name}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-id">Classmate #${String(alum.id).padStart(3,'0')}</div>
        <h3>${alum.name}</h3>
        <div class="card-city">${alum.city}</div>
        <div class="tag-row">
          ${topHobbies.map(h => `<span class="tag">${h}</span>`).join('')}
        </div>
      </div>
    </article>
  `;
}

function renderGrid(list) {
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">😅 No classmates match that search. Try a different name, city, or hobby.</div>`;
  } else {
    grid.innerHTML = list.map(cardTemplate).join('');
  }
  resultCount.textContent = `${list.length} of ${ALUMNI_DATA.length} classmates`;

  grid.querySelectorAll('.alumni-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter') openModal(card.dataset.id);
    });
  });
}

function socialIcon(type) {
  const icons = {
    instagram: '📷',
    twitter: '🐦',
    facebook: '📘',
    linkedin: '💼'
  };
  return icons[type] || '🔗';
}

function openModal(id) {
  const alum = ALUMNI_DATA.find(a => a.id === Number(id));
  if (!alum) return;

  const socialEntries = Object.entries(alum.socials || {});
  const socialsHtml = socialEntries.length
    ? `<div class="social-row">${socialEntries.map(([type, url]) =>
        `<a class="social-btn ${type}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${alum.name} on ${type}">${socialIcon(type)}</a>`
      ).join('')}</div>`
    : `<p class="no-contact">No social links added yet.</p>`;

  const contactHtml = (alum.email || alum.phone)
    ? `<div class="modal-contact-row">
        ${alum.email ? `<a href="mailto:${alum.email}">✉️ ${alum.email}</a>` : ''}
        ${alum.phone ? `<a href="tel:${alum.phone.replace(/\s/g,'')}">📞 ${alum.phone}</a>` : ''}
      </div>`
    : `<p class="no-contact">No contact info added yet.</p>`;

  modalCard.innerHTML = `
    <button class="modal-close" aria-label="Close">✕</button>
    <div class="modal-top">
      <img src="${getPhotoUrl(alum)}" alt="${alum.name}">
      <div>
        <h2>${alum.name}</h2>
        <div class="modal-city">${alum.city}</div>
      </div>
    </div>

    <div class="modal-section">
      <h4>Favourite Primary School Memory</h4>
      <div class="modal-memory">"${alum.memory}"</div>
    </div>

    <div class="modal-section">
      <h4>Hobbies</h4>
      <div class="tag-row" style="justify-content:flex-start;">
        ${alum.hobbies.map(h => `<span class="tag">${h}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <h4>Contact</h4>
      ${contactHtml}
    </div>

    <div class="modal-section" style="margin-bottom:0;">
      <h4>Find them online</h4>
      ${socialsHtml}
    </div>
  `;

  modalCard.querySelector('.modal-close').addEventListener('click', closeModal);
  modalOverlay.classList.add('open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const hobby = hobbyFilter.value;

  const filtered = ALUMNI_DATA.filter(a => {
    const matchesQuery = !query ||
      a.name.toLowerCase().includes(query) ||
      a.city.toLowerCase().includes(query);
    const matchesHobby = !hobby || a.hobbies.includes(hobby);
    return matchesQuery && matchesHobby;
  });

  renderGrid(filtered);
}

searchInput.addEventListener('input', applyFilters);
hobbyFilter.addEventListener('change', applyFilters);

// init
buildHobbyOptions();
renderGrid(ALUMNI_DATA);
