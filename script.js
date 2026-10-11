/**
 * JAVASCRIPT LOGIC FOR WEDDING INVITATION TEMPLATE
 * Kris Ossy Novian & Fazira Leonita Agustiningsih
 */

let ytPlayer = null;
let isMusicPlaying = false;
let isYtReady = false;

document.addEventListener('DOMContentLoaded', () => {
  initGuestName();
  renderContent();
  initYouTubeAudio();
  initCountdown();
  initGalleryLightbox();
  initRSVPForm();
  initPetalsAnimation();
});

let currentGuestName = "";

/* 1. Parse Guest Name from URL Parameter (?to=Nama+Tamu) */
function initGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameParam = urlParams.get('to');
  const guestNameElement = document.getElementById('guest-name');

  if (guestNameParam) {
    currentGuestName = decodeURIComponent(guestNameParam);
    guestNameElement.textContent = currentGuestName;
  } else {
    guestNameElement.textContent = "Tamu Undangan Yang Berbahagia";
  }
}

/* 2. Render Dynamic Content from WEDDING_CONFIG */
function renderContent() {
  // Populate Couple Details
  const groom = WEDDING_CONFIG.couple.groom;
  const bride = WEDDING_CONFIG.couple.bride;

  document.getElementById('groom-name').textContent = groom.fullName;
  document.getElementById('groom-parents').textContent = groom.parents;
  document.getElementById('groom-img').src = groom.image;

  document.getElementById('bride-name').textContent = bride.fullName;
  document.getElementById('bride-parents').textContent = bride.parents;
  document.getElementById('bride-img').src = bride.image;

  // Header and Cover Dates
  if (document.getElementById('cover-date')) {
    document.getElementById('cover-date').textContent = WEDDING_CONFIG.formattedDate;
  }
  if (document.getElementById('hero-date')) {
    document.getElementById('hero-date').textContent = WEDDING_CONFIG.headerDate;
  }
  if (document.getElementById('countdown-date')) {
    document.getElementById('countdown-date').textContent = WEDDING_CONFIG.formattedDate;
  }

  // Populate Events
  const eventsContainer = document.getElementById('events-container');
  if (eventsContainer && WEDDING_CONFIG.events) {
    eventsContainer.innerHTML = WEDDING_CONFIG.events.map(ev => `
      <div class="event-card">
        <div class="event-icon-box">
          <i class="fas ${ev.icon}"></i>
        </div>
        <h3 class="event-card-title">${ev.title}</h3>
        <div class="event-detail-item">
          <div class="event-detail-label">Hari & Tanggal</div>
          <div class="event-detail-val">${ev.day}, ${ev.date}</div>
        </div>
        <div class="event-detail-item">
          <div class="event-detail-label">Waktu</div>
          <div class="event-detail-val">${ev.time}</div>
        </div>
        <div class="event-detail-item">
          <div class="event-detail-label">Lokasi</div>
          <div class="event-detail-val">${ev.venue}</div>
          <p style="font-size:0.85rem; color:var(--color-text-muted); margin-top:0.4rem; padding:0 0.5rem;">${ev.address}</p>
        </div>
        <div class="btn-group">
          <a href="${ev.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            <i class="fas fa-map-marked-alt"></i> Petunjuk Lokasi (Google Maps)
          </a>
        </div>
      </div>
    `).join('');
  }

  // Populate Love Story (Perjalanan Kami)
  const storyContainer = document.getElementById('timeline-container');
  if (storyContainer && WEDDING_CONFIG.stories) {
    storyContainer.innerHTML = WEDDING_CONFIG.stories.map(st => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <span class="timeline-year">${st.year}</span>
          <h4 class="timeline-title">${st.title}</h4>
          <p class="timeline-desc">${st.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Populate Our Moments Gallery
  const gallerySection = document.getElementById('galeri');
  if (gallerySection) {
    if (!WEDDING_CONFIG.gallery || WEDDING_CONFIG.gallery.length === 0) {
      gallerySection.style.display = 'none';
    } else {
      gallerySection.style.display = 'block';
      const galleryGrid = document.getElementById('gallery-grid');
      if (galleryGrid) {
        galleryGrid.innerHTML = WEDDING_CONFIG.gallery.map((img) => `
          <div class="gallery-item" onclick="openLightbox('${img.src}', '${img.caption.replace(/'/g, "\\'")}')">
            <img src="${img.src}" alt="${img.caption}" class="gallery-img" loading="lazy" />
            <div class="gallery-overlay">
              <i class="fas fa-search-plus"></i>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // Populate Digital Gift & Send a Gift
  const giftContainer = document.getElementById('gift-container');
  if (giftContainer && WEDDING_CONFIG.digitalGift) {
    let giftHtml = '';

    // QRIS Card Kedai Mama Ros
    if (WEDDING_CONFIG.digitalGift.qrisImage) {
      giftHtml += `
        <div class="qris-card" style="margin-bottom: 2rem;">
          <h3 class="text-burgundy" style="font-family:var(--font-heading); margin-bottom:0.5rem;">${WEDDING_CONFIG.digitalGift.qrisTitle || 'QRIS Kedai Mama Ros'}</h3>
          <p style="font-size:0.85rem; color:var(--color-text-muted);">Scan QRIS di bawah ini untuk mengirimkan tanda kasih / angpao secara digital:</p>
          <img src="${WEDDING_CONFIG.digitalGift.qrisImage}" alt="QRIS Kedai Mama Ros" class="qris-img" style="width: 250px; height: auto; max-width: 100%; border-radius: 12px; border: 2px solid var(--color-gold); margin: 1.2rem auto;" />
          <p style="font-size:0.75rem; color:var(--color-text-muted);">Dapat di-scan via BCA Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, atau m-Banking</p>
        </div>
      `;
    }

    // Physical Gift Address Card (Send a Gift)
    if (WEDDING_CONFIG.digitalGift.physicalAddress) {
      const phys = WEDDING_CONFIG.digitalGift.physicalAddress;
      giftHtml += `
        <div class="gift-card" style="background: var(--color-cream-bg);">
          <div class="event-icon-box" style="margin-bottom:0.8rem; width:50px; height:50px; font-size:1.2rem;">
            <i class="fas fa-gift"></i>
          </div>
          <h4 style="font-family:var(--font-heading); font-size:1.3rem; color:var(--color-burgundy); margin-bottom:0.4rem;">${phys.title}</h4>
          <p style="font-size:0.85rem; color:var(--color-text-muted); margin-bottom:0.8rem;">Penerima: <strong>${phys.recipient}</strong></p>
          
          <div style="background: rgba(197, 160, 89, 0.1); padding: 1rem; border-radius: 12px; border: 1px dashed var(--color-gold); margin-bottom: 1rem;">
            <p id="physical-address-text" style="font-size:0.9rem; font-weight:600; color:var(--color-text-dark); line-height:1.5;">${phys.addressText}</p>
          </div>

          <button class="btn-copy" onclick="copyToClipboard('${phys.addressText.replace(/'/g, "\\'")}', 'Alamat Hadiah Berhasil Disalin! ✓')">
            <i class="far fa-copy"></i> Salin Alamat Kirim
          </button>
        </div>
      `;
    }

    giftContainer.innerHTML = giftHtml;
  }
}

/* 3. Official YouTube Audio Playback: Sezairi - It's You */
function initYouTubeAudio() {
  // Insert YouTube IFrame API script tag
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('yt-player', {
      height: '1',
      width: '1',
      videoId: WEDDING_CONFIG.youtubeAudio.videoId,
      playerVars: {
        'autoplay': 0,
        'controls': 0,
        'disablekb': 1,
        'fs': 0,
        'loop': 1,
        'playlist': WEDDING_CONFIG.youtubeAudio.videoId,
        'playsinline': 1,
        'rel': 0,
        'origin': window.location.origin
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    });
  };

  const btnOpen = document.getElementById('btn-open-invitation');
  const coverOverlay = document.getElementById('cover-overlay');
  const musicBtn = document.getElementById('music-btn');

  btnOpen.addEventListener('click', () => {
    coverOverlay.classList.add('opened');
    startMusic();
  });

  musicBtn.addEventListener('click', () => {
    toggleMusic();
  });
}

function onPlayerReady(event) {
  isYtReady = true;
  event.target.setVolume(85);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isMusicPlaying = true;
    updateMusicButton(true);
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    isMusicPlaying = false;
    updateMusicButton(false);
  }
}

function onPlayerError(err) {
  console.log("YouTube Player Error:", err);
}

function startMusic() {
  isMusicPlaying = true;
  if (ytPlayer && isYtReady && ytPlayer.playVideo) {
    try {
      ytPlayer.playVideo();
      updateMusicButton(true);
    } catch(e) {
      console.log("Error invoking yt playVideo:", e);
    }
  }
}

function toggleMusic() {
  if (isMusicPlaying) {
    isMusicPlaying = false;
    if (ytPlayer && isYtReady && ytPlayer.pauseVideo) {
      try { ytPlayer.pauseVideo(); } catch(e) {}
    }
    updateMusicButton(false);
  } else {
    isMusicPlaying = true;
    if (ytPlayer && isYtReady && ytPlayer.playVideo) {
      try { ytPlayer.playVideo(); } catch(e) {}
    }
    updateMusicButton(true);
  }
}

function updateMusicButton(isPlaying) {
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  if (isPlaying) {
    musicBtn.classList.add('playing');
    musicIcon.className = 'fas fa-compact-disc';
    musicBtn.title = "Jeda Musik: " + WEDDING_CONFIG.youtubeAudio.title;
  } else {
    musicBtn.classList.remove('playing');
    musicIcon.className = 'fas fa-pause';
    musicBtn.title = "Putar Musik: " + WEDDING_CONFIG.youtubeAudio.title;
  }
}

/* 4. Live Countdown Timer */
function initCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.eventDateISO).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* 5. Copy to Clipboard Utility */
function copyToClipboard(text, customToastMsg = "Berhasil Disalin! ✓") {
  navigator.clipboard.writeText(text).then(() => {
    showToast(customToastMsg);
  }).catch(() => {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(customToastMsg);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* Lightbox Modal Controller */
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
}

function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (lightbox && img) {
    img.src = src;
    if (cap) cap.textContent = caption || '';
    lightbox.classList.add('active');
  }
}

/* 6. RSVP Form & Guestbook Comments (Ucapan & Doa bersama, tersimpan & tampil dari Google Sheet) */

function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  loadGuestbookFromSheet();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('rsvp-name').value.trim();
      const statusInput = document.getElementById('rsvp-status').value;
      const messageInput = document.getElementById('rsvp-message').value.trim();

      if (!nameInput || !messageInput) return;

      sendRSVPToSheet({
        guestName: currentGuestName,
        name: nameInput,
        status: statusInput,
        message: messageInput
      });

      form.reset();
      showToast("Terima kasih! Ucapan & Doa Anda telah terkirim.");

      // Beri waktu Apps Script menyimpan baris baru, lalu muat ulang buku tamu bersama
      setTimeout(loadGuestbookFromSheet, 1500);
    });
  }
}

/* Kirim data RSVP ke Google Sheets lewat Google Apps Script Web App */
function sendRSVPToSheet(payload) {
  const scriptUrl = WEDDING_CONFIG.rsvp && WEDDING_CONFIG.rsvp.scriptUrl;
  if (!scriptUrl || scriptUrl.startsWith("PASTE_")) return;

  fetch(scriptUrl, {
    method: "POST",
    body: JSON.stringify(payload)
  }).catch(err => console.log("Gagal mengirim RSVP ke Google Sheets:", err));
}

/* Ambil seluruh Ucapan & Doa dari Google Sheet, agar semua tamu bisa saling melihat */
function loadGuestbookFromSheet() {
  const scriptUrl = WEDDING_CONFIG.rsvp && WEDDING_CONFIG.rsvp.scriptUrl;
  const list = document.getElementById('guestbook-list');
  if (!scriptUrl || scriptUrl.startsWith("PASTE_") || !list) return;

  fetch(scriptUrl)
    .then(res => res.json())
    .then(data => {
      if (data && data.result === "ok" && Array.isArray(data.comments)) {
        renderGuestbook(data.comments);
      }
    })
    .catch(err => console.log("Gagal memuat Ucapan & Doa dari Google Sheets:", err));
}

function renderGuestbook(comments) {
  const list = document.getElementById('guestbook-list');
  if (!list) return;

  list.innerHTML = comments.map(c => `
    <div class="guestbook-card">
      <div class="guestbook-header">
        <span class="guestbook-author">${escapeHtml(c.name)}</span>
        <span class="attendance-badge ${c.status === 'Hadir' ? 'badge-hadir' : 'badge-tidak'}">${c.status}</span>
      </div>
      <p class="guestbook-msg">${escapeHtml(c.message)}</p>
      <div class="guestbook-time"><i class="far fa-clock"></i> ${formatGuestbookTime(c.timestamp)}</div>
    </div>
  `).join('');
}

function formatGuestbookTime(isoTimestamp) {
  if (!isoTimestamp) return "";
  const date = new Date(isoTimestamp);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* 7. Falling Burgundy Flower Petals Canvas Effect */
function initPetalsAnimation() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const TOTAL_PETALS = 25;
  const petals = [];
  const petalColors = ['#8e2a41', '#6b1d2f', '#c5a059', '#b87d8b'];

  for (let i = 0; i < TOTAL_PETALS; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.sin(Math.random() * Math.PI) * 0.8,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-p.size, -p.size * 1.5, -p.size * 1.5, p.size, 0, p.size * 2);
    ctx.bezierCurveTo(p.size * 1.5, p.size, p.size, -p.size * 1.5, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of petals) {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * p.speedX;
      p.angle += p.spin;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      drawPetal(p);
    }
    requestAnimationFrame(animate);
  }

  animate();
}
