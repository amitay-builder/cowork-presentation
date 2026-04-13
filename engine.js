/* ============================================
   SLIDE ENGINE + SIDEBAR + STEP ANIMATIONS
   + Present mode, Hide/Show slides
   ============================================ */
(function() {
  const deck = document.getElementById('deck');
  const allSlides = Array.from(deck.querySelectorAll('.slide'));
  const progressBar = document.getElementById('progressBar');
  const navHint = document.getElementById('navHint');
  const sidebar = document.getElementById('sidebar');
  let current = 0;

  // ==========================================
  // HIDDEN SLIDES (persisted in localStorage)
  // ==========================================
  const STORAGE_KEY = 'cowork-hidden-slides';
  let hiddenSlides = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

  function saveHidden() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...hiddenSlides]));
  }

  function getVisibleSlides() {
    return allSlides.filter((_, i) => !hiddenSlides.has(i));
  }

  function getVisibleIndex(absoluteIndex) {
    let count = -1;
    for (let i = 0; i <= absoluteIndex; i++) {
      if (!hiddenSlides.has(i)) count++;
    }
    return count;
  }

  function getAbsoluteIndex(visibleIndex) {
    let count = -1;
    for (let i = 0; i < allSlides.length; i++) {
      if (!hiddenSlides.has(i)) count++;
      if (count === visibleIndex) return i;
    }
    return 0;
  }

  // ==========================================
  // STEP ANIMATIONS
  // ==========================================
  const slideSteps = new Map();
  allSlides.forEach((slide, i) => {
    const stepEls = slide.querySelectorAll('[data-step]');
    const hideEls = slide.querySelectorAll('[data-step-hide]');
    if (stepEls.length > 0 || hideEls.length > 0) {
      const groups = {};
      stepEls.forEach(el => {
        const n = parseInt(el.dataset.step);
        if (!groups[n]) groups[n] = { show: [], hide: [] };
        groups[n].show.push(el);
      });
      hideEls.forEach(el => {
        const n = parseInt(el.dataset.stepHide);
        if (!groups[n]) groups[n] = { show: [], hide: [] };
        groups[n].hide.push(el);
      });
      const stepNums = Object.keys(groups).map(Number).sort((a, b) => a - b);
      const orderedGroups = stepNums.map(n => groups[n]);
      slideSteps.set(i, { groups: orderedGroups, current: 0 });
    }
  });

  // ==========================================
  // SIDEBAR (with hide toggle + present button)
  // ==========================================
  function buildSidebar() {
    sidebar.innerHTML = '';

    // Present button
    const presentBtn = document.createElement('button');
    presentBtn.className = 'present-btn';
    presentBtn.textContent = '▶  Present';
    presentBtn.addEventListener('click', () => {
      document.documentElement.requestFullscreen();
    });
    sidebar.appendChild(presentBtn);

    // Slide count
    const visible = getVisibleSlides();
    const countEl = document.createElement('div');
    countEl.className = 'sidebar-count';
    countEl.textContent = visible.length + ' / ' + allSlides.length + ' slides';
    sidebar.appendChild(countEl);

    // Slide items
    allSlides.forEach((slide, i) => {
      const title = slide.getAttribute('data-title') || ('Slide ' + (i + 1));
      const isHidden = hiddenSlides.has(i);
      const item = document.createElement('div');
      item.className = 'sidebar-item' + (isHidden ? ' sidebar-hidden' : '');
      item.innerHTML =
        '<div class="sidebar-num">' + (i + 1) + '</div>' +
        '<div class="sidebar-label">' + title + '</div>' +
        '<div class="sidebar-toggle" title="' + (isHidden ? 'Show slide' : 'Hide slide') + '">' +
        (isHidden ? '○' : '●') + '</div>';

      // Click label to navigate
      item.querySelector('.sidebar-label').addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isHidden) {
          const visIdx = getVisibleIndex(i);
          showSlide(visIdx, true);
        }
      });
      item.querySelector('.sidebar-num').addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isHidden) {
          const visIdx = getVisibleIndex(i);
          showSlide(visIdx, true);
        }
      });

      // Click toggle to hide/show
      item.querySelector('.sidebar-toggle').addEventListener('click', (e) => {
        e.stopPropagation();
        if (hiddenSlides.has(i)) {
          hiddenSlides.delete(i);
        } else {
          hiddenSlides.add(i);
        }
        saveHidden();
        buildSidebar();
        // Re-show current slide (index may have shifted)
        const vis = getVisibleSlides();
        if (current >= vis.length) current = vis.length - 1;
        showSlide(current, true);
      });

      sidebar.appendChild(item);
    });
  }

  // ==========================================
  // SHOW SLIDE
  // ==========================================
  function showSlide(visibleIndex, showAllSteps) {
    const visible = getVisibleSlides();
    if (visibleIndex < 0 || visibleIndex >= visible.length) return;

    // Hide all, show target
    allSlides.forEach(s => s.classList.remove('active'));
    visible[visibleIndex].classList.add('active');
    current = visibleIndex;

    // Progress
    progressBar.style.width = ((current + 1) / visible.length * 100) + '%';
    history.replaceState(null, '', '#slide-' + (current + 1));

    // Find absolute index for step tracking
    const absIdx = allSlides.indexOf(visible[visibleIndex]);
    const info = slideSteps.get(absIdx);
    if (info) {
      if (showAllSteps) {
        info.groups.forEach(group => {
          group.show.forEach(el => el.classList.add('step-visible'));
          group.hide.forEach(el => el.classList.add('step-hidden'));
        });
        info.current = info.groups.length;
      } else {
        info.groups.forEach(group => {
          group.show.forEach(el => el.classList.remove('step-visible'));
          group.hide.forEach(el => el.classList.remove('step-hidden'));
        });
        info.current = 0;
      }
    }

    // Update sidebar active state
    const absIndex = allSlides.indexOf(visible[visibleIndex]);
    sidebar.querySelectorAll('.sidebar-item').forEach((item, i) => {
      item.classList.toggle('active', i === absIndex);
    });
    const activeItem = sidebar.querySelector('.sidebar-item.active');
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // ==========================================
  // NAVIGATION
  // ==========================================
  function next() {
    const visible = getVisibleSlides();
    const absIdx = allSlides.indexOf(visible[current]);
    const info = slideSteps.get(absIdx);
    if (info && info.current < info.groups.length) {
      const group = info.groups[info.current];
      group.show.forEach(el => el.classList.add('step-visible'));
      group.hide.forEach(el => el.classList.add('step-hidden'));
      info.current++;
      return;
    }
    if (current < visible.length - 1) showSlide(current + 1);
  }

  function prev() {
    const visible = getVisibleSlides();
    const absIdx = allSlides.indexOf(visible[current]);
    const info = slideSteps.get(absIdx);
    if (info && info.current > 0) {
      info.current--;
      const group = info.groups[info.current];
      group.show.forEach(el => el.classList.remove('step-visible'));
      group.hide.forEach(el => el.classList.remove('step-hidden'));
      return;
    }
    if (current > 0) showSlide(current - 1, true);
  }

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
    else if (e.key === 'Escape' && document.fullscreenElement) {
      document.exitFullscreen();
    }
    navHint.classList.add('hidden');
  });

  // Touch / swipe
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  });

  // Click navigation (main area only)
  document.querySelector('.main-area').addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, .sidebar')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    if (x > 0.65) next();
    else if (x < 0.35) prev();
  });

  // ==========================================
  // INIT
  // ==========================================
  // Read hash
  const hash = window.location.hash;
  if (hash && hash.startsWith('#slide-')) {
    const n = parseInt(hash.replace('#slide-', ''));
    if (n >= 1) current = n - 1;
  }

  buildSidebar();
  showSlide(current);
  setTimeout(() => navHint.classList.add('hidden'), 5000);
})();
