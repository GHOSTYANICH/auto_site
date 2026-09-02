(function () {
  const track = document.getElementById('fleetTrack');
  const dotsBox = document.getElementById('fleetDots');
  const cards = Array.from(track.children);

  function perView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  let visible = perView();
  let pages = Math.ceil(cards.length / visible);
  let current = 0;
  let autoTimer = null;

  function buildDots() {
    dotsBox.innerHTML = '';
    pages = Math.ceil(cards.length / visible);

    for (let i = 0; i < pages; i++) {
      const b = document.createElement('button');

      if (i === current) b.classList.add('on');

      b.addEventListener('click', () => {
        goTo(i);
        restartAuto();
      });

      dotsBox.appendChild(b);
    }
  }

  function update() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    const offset = current * visible * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    Array.from(dotsBox.children).forEach((d, i) => {
      d.classList.toggle('on', i === current);
    });
  }

  function goTo(i) {
    current = (i + pages) % pages;
    update();
  }

  function next() {
    goTo(current + 1);
  }

  function restartAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 3500);
  }

  window.addEventListener('resize', () => {
    const v = perView();

    if (v !== visible) {
      visible = v;
      current = 0;
      buildDots();
      update();
    }
  });

  buildDots();
  update();
  restartAuto();
})();


(function () {
  const form = document.getElementById('ctaForm');
  const nameEl = document.getElementById('ctaName');
  const phoneEl = document.getElementById('ctaPhone');
  const errEl = document.getElementById('ctaError');
  const btn = document.getElementById('ctaSubmit');
  const success = document.getElementById('ctaSuccess');

  function isValidName(v) {
    return v.trim().length >= 2;
  }

  function isValidPhone(v) {
    const digits = v.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  }

  function clearInvalid() {
    nameEl.classList.remove('invalid');
    phoneEl.classList.remove('invalid');
    errEl.textContent = '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearInvalid();

    const nameOk = isValidName(nameEl.value);
    const phoneOk = isValidPhone(phoneEl.value);

    if (!nameOk) nameEl.classList.add('invalid');
    if (!phoneOk) phoneEl.classList.add('invalid');

    if (!nameOk || !phoneOk) {
      errEl.textContent = 'Проверьте, пожалуйста, правильность заполнения полей';
      return;
    }

    form.style.display = 'none';
    success.classList.add('show');
  });

  [nameEl, phoneEl].forEach(function (el) {
    el.addEventListener('input', function () {
      el.classList.remove('invalid');
      errEl.textContent = '';
    });
  });
})();


// ---------- Placeholder links ----------
document.querySelectorAll(
  'a[href="#"]:not([data-nav]):not([data-scroll-to]):not(.social-link):not(.read-more)'
).forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Этот раздел скоро появится');
  });
});

function showToast(message) {
  const toast = document.getElementById('toast');

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
