/* ============================================
   SLIDE ENGINE + SIDEBAR + STEP ANIMATIONS
   + Edit/Present modes, Hide/Show slides
   ============================================ */
(function() {
  const deck = document.getElementById('deck');
  const allSlides = Array.from(deck.querySelectorAll('.slide'));
  const progressBar = document.getElementById('progressBar');
  const navHint = document.getElementById('navHint');
  const sidebar = document.getElementById('sidebar');
  let current = 0;

  // ==========================================
  // SIDEBAR MODE (edit vs present)
  // ==========================================
  const MODE_KEY = 'cowork-sidebar-mode';
  let editMode = localStorage.getItem(MODE_KEY) !== 'present';

  function saveMode() {
    localStorage.setItem(MODE_KEY, editMode ? 'edit' : 'present');
  }

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
  // SIDEBAR
  // ==========================================
  // Collapse state
  const COLLAPSE_KEY = 'cowork-sidebar-collapsed';
  let collapsed = localStorage.getItem(COLLAPSE_KEY) === 'true';

  function applyCollapsed() {
    sidebar.classList.toggle('collapsed', collapsed);
    localStorage.setItem(COLLAPSE_KEY, collapsed);
  }

  function buildSidebar() {
    sidebar.innerHTML = '';

    // Collapse toggle button (always visible)
    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'sidebar-collapse-btn';
    collapseBtn.innerHTML = collapsed ? '☰' : '◂';
    collapseBtn.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      collapsed = !collapsed;
      applyCollapsed();
      collapseBtn.innerHTML = collapsed ? '☰' : '◂';
      collapseBtn.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    });
    sidebar.appendChild(collapseBtn);

    // Collapsed icon (clickable to expand)
    const collapsedIcon = document.createElement('div');
    collapsedIcon.className = 'sidebar-collapsed-icon';
    collapsedIcon.innerHTML = '☰';
    collapsedIcon.addEventListener('click', () => {
      collapsed = false;
      applyCollapsed();
      buildSidebar();
      showSlide(current, true);
    });
    sidebar.appendChild(collapsedIcon);

    // Top controls
    const controls = document.createElement('div');
    controls.className = 'sidebar-controls';

    // Fullscreen button
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'sidebar-fullscreen-btn';
    fullscreenBtn.innerHTML = '▶ Fullscreen';
    fullscreenBtn.addEventListener('click', () => {
      document.documentElement.requestFullscreen();
    });
    controls.appendChild(fullscreenBtn);

    // Mode toggle
    const modeToggle = document.createElement('button');
    modeToggle.className = 'sidebar-mode-toggle' + (editMode ? ' mode-edit' : ' mode-present');
    modeToggle.innerHTML = editMode
      ? '<span class="mode-icon">✏️</span> Edit Mode'
      : '<span class="mode-icon">📺</span> Present Mode';
    modeToggle.addEventListener('click', () => {
      editMode = !editMode;
      saveMode();
      buildSidebar();
      // Re-sync current slide after mode switch
      const vis = getVisibleSlides();
      if (current >= vis.length) current = Math.max(0, vis.length - 1);
      showSlide(current, true);
    });
    controls.appendChild(modeToggle);

    sidebar.appendChild(controls);

    // Slide count
    const visible = getVisibleSlides();
    const countEl = document.createElement('div');
    countEl.className = 'sidebar-count';
    countEl.textContent = editMode
      ? visible.length + ' / ' + allSlides.length + ' slides'
      : visible.length + ' slides';
    sidebar.appendChild(countEl);

    // Slide list
    const list = document.createElement('div');
    list.className = 'sidebar-list';

    if (editMode) {
      // EDIT MODE: show all slides, with visibility toggles
      allSlides.forEach((slide, i) => {
        const title = slide.getAttribute('data-title') || ('Slide ' + (i + 1));
        const isHidden = hiddenSlides.has(i);
        const item = document.createElement('div');
        item.className = 'sidebar-item' + (isHidden ? ' sidebar-hidden' : '');
        item.dataset.absIndex = i;

        item.innerHTML =
          '<button class="sidebar-eye" title="' + (isHidden ? 'Show slide' : 'Hide slide') + '">' +
          (isHidden ? '👁‍🗨' : '👁') + '</button>' +
          '<div class="sidebar-num">' + (i + 1) + '</div>' +
          '<div class="sidebar-label">' + title + '</div>';

        // Click the eye to toggle visibility
        item.querySelector('.sidebar-eye').addEventListener('click', (e) => {
          e.stopPropagation();
          if (hiddenSlides.has(i)) {
            hiddenSlides.delete(i);
          } else {
            hiddenSlides.add(i);
          }
          saveHidden();
          buildSidebar();
          const vis = getVisibleSlides();
          if (current >= vis.length) current = Math.max(0, vis.length - 1);
          showSlide(current, true);
        });

        // Click anywhere else on the row to navigate
        item.addEventListener('click', () => {
          if (!isHidden) {
            const visIdx = getVisibleIndex(i);
            showSlide(visIdx, true);
          }
        });

        list.appendChild(item);
      });
    } else {
      // PRESENT MODE: only visible slides, clean list, full-row click
      let visNum = 0;
      allSlides.forEach((slide, i) => {
        if (hiddenSlides.has(i)) return;
        visNum++;
        const title = slide.getAttribute('data-title') || ('Slide ' + (i + 1));
        const item = document.createElement('div');
        item.className = 'sidebar-item';
        item.dataset.absIndex = i;

        item.innerHTML =
          '<div class="sidebar-num">' + visNum + '</div>' +
          '<div class="sidebar-label">' + title + '</div>';

        // Entire row navigates
        item.addEventListener('click', () => {
          const visIdx = getVisibleIndex(i);
          showSlide(visIdx, true);
        });

        list.appendChild(item);
      });
    }

    sidebar.appendChild(list);
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
    sidebar.querySelectorAll('.sidebar-item').forEach((item) => {
      item.classList.toggle('active', parseInt(item.dataset.absIndex) === absIndex);
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
      // Ecosystem slide: highlight Cowork on step
      const eco = visible[current].querySelector('.ecosystem-highlight');
      if (eco) visible[current].querySelector('.center-content').classList.add('ecosystem-focused');
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
      // Ecosystem slide: remove highlight when stepping back
      const ecoEl = visible[current].querySelector('.ecosystem-focused');
      if (ecoEl && info.current === 0) ecoEl.classList.remove('ecosystem-focused');
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

  // Click navigation (main area only) — any click advances
  document.querySelector('.main-area').addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, .sidebar')) return;
    next();
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

  applyCollapsed();
  buildSidebar();
  showSlide(current);
  setTimeout(() => navHint.classList.add('hidden'), 5000);
})();
