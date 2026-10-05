(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const photoPath = (name) => `assets/photos/${name}.webp`;

  const memories = [
    { period: 'ГЛАВА ПЕРВАЯ', title: 'В одной группе.\nНа одной волне.', text: 'Пары, лабы, разговоры между делом. Тогда это была обычная жизнь. Сейчас — те самые студенческие годы, за которые я тебе благодарен.', quote: '«Прост тот Даурен с универа иногда даёт о себе знать».', source: 'ДАУРЕН · 17.07.2025', photo: 'photo1-jpg', second: 'photo7-jpg', alt: 'Даурен за партой в университете', secondAlt: 'Ислам и Даурен в студенческие годы', caption: 'Первые дни в МУИТе', note: 'два дебила. начало истории.', label: 'СТУДЕНЧЕСКИЕ ГОДЫ' },
    { period: 'МИССИЯ: ВЫПУСТИТЬСЯ', title: 'Лабы. Диплом.\nИ весь этот хаос.', text: 'Усердно работали над хуеломкой — я так и подписал наше фото. Как-то пережили всё это. А главное, остались рядом и после последней пары.', quote: '«Благодаря тебе у меня были лучшие студенческие годы».', source: 'ИСЛАМ · 14.10.2024', photo: 'photo5-jpg', second: 'photo24-jpg', alt: 'Ислам и Даурен в студенческие годы', secondAlt: 'Друзья на выпускном в мантиях', caption: 'Усердно работали над хуеломкой(дипломкой)', note: 'наконец-то, выпустили.', label: 'УНИВЕРСКАЯ ГЛАВА' },
    { period: 'ЛОББИ ОТКРЫТО', title: 'Ещё одна катка.\nНу, последняя.', text: 'Работа закончилась. Discord включился. Кому-то опять не зашли тайминги. Но вообще-то ради этих разговоров мы и собираемся.', quote: '«Так что жду не дождусь дня когда ты будешь играть со мной».', source: 'ДАУРЕН · 14.12.2022', photo: 'photo13-jpg', second: 'photo14-jpg', alt: 'Друзья общаются по видеосвязи', secondAlt: 'Даурен показывает знак мира', caption: 'Каждый в своём мире. Всё равно вместе.', note: 'в пятницу — наше лобби.', label: 'НА РАЗНЫХ ЭКРАНАХ' },
    { period: 'БЕЗ ОСОБОГО ПОВОДА', title: 'Просто прогулка.\nПросто мы.', text: 'Летние вечера, разговоры обо всём. И мелочи, которые почему-то помнишь годами. Например, кто впервые угостил тебя латте в универе.', quote: '«Крч латте я впервые пробовал когда кажется мы в универе были».\n«Ты тогда угощал».', source: 'ДАУРЕН · 03.06.2025', photo: 'photo23-jpg', second: 'photo22-jpg', alt: 'Ислам и Даурен на прогулке летом', secondAlt: 'Совместное фото Ислама и Даурена', caption: 'Эх, душевные прогулки летом', note: 'потные Алатауские вечера.', label: 'ТЕ САМЫЕ ДНИ' },
    { period: 'РАССТОЯНИЕ НЕ ПОМЕХА', title: 'У каждого дела.\nА брад всё тот же.', text: 'После универа у каждого началась своя жизнь. Работа, заботы, планы. Тем приятнее снова оказаться за одним столом. Мой сюрприз-приезд тогда удался.', quote: '«Ещё один год прошёл а наша дружба только крепчает (даст Бог так будет и дальше), несмотря на расстояние».', source: 'ДАУРЕН · 19.08.2025', photo: 'photo9-jpg', second: 'photo11-jpg', alt: 'Друзья собрались за столом', secondAlt: 'Ислам и Даурен на совместном фото', caption: 'Мой сюрприз-приезд удался', note: 'встретились. словно и не уезжали.', label: 'СНОВА РЯДОМ' },
    { period: 'ПРОДОЛЖЕНИЕ СЛЕДУЕТ', title: 'Семь лет спустя.\nВсё ещё мы.', text: 'Сколько ещё у тебя секретов от меня, засранец? Семь лет дружим, а всё равно находишь чем удивить. Пусть впереди будет ещё больше наших фотографий и поводов собраться.', quote: '«Мы уже 7 лет дружим».', source: 'ИСЛАМ · 26.08.2026', photo: 'photo2-jpg', second: 'photo12-jpg', alt: 'Ислам и Даурен вместе', secondAlt: 'Даурен смеётся в университете', caption: 'Те же два брада', note: 'улыбайся чаще. тебе идёт.', label: 'НАШЕ СОХРАНЕНИЕ' },
  ];
  let memoryIndex = 0;
  function changeMemory(index) {
    memoryIndex = (index + memories.length) % memories.length;
    const memory = memories[memoryIndex];
    $('#memoryPeriod').textContent = memory.period;
    $('#memoryTitle').replaceChildren(...memory.title.split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    $('#memoryText').textContent = memory.text;
    $('#memoryQuote').textContent = memory.quote;
    $('#memoryQuoteSource').textContent = memory.source;
    $('#memoryCurrent').textContent = String(memoryIndex + 1).padStart(2, '0');
    $('#memoryImage').src = photoPath(memory.photo);
    $('#memoryImage').alt = memory.alt;
    $('#memorySecondImage').src = photoPath(memory.second);
    $('#memorySecondImage').alt = memory.secondAlt;
    $('#memoryPhoto').dataset.photo = photoPath(memory.photo);
    $('#memoryPhoto').dataset.caption = memory.caption;
    $('#memoryHandwritten').textContent = memory.note;
    $('#memoryPhotoLabel').textContent = memory.label;
    $$('[data-memory]').forEach((button) => {
      const active = Number(button.dataset.memory) === memoryIndex;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  $('#memoryNext').addEventListener('click', () => changeMemory(memoryIndex + 1));
  $('#memoryPrev').addEventListener('click', () => changeMemory(memoryIndex - 1));
  $$('[data-memory]').forEach((button) => button.addEventListener('click', () => changeMemory(Number(button.dataset.memory))));
  $('.memory-layout').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      changeMemory(memoryIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  const games = {
    spider: { title: 'Брад, человека\nпаука пройди.', text: '«Брат, ты там человека паука пройди что ль».\nНапоминание от Даурена. 17.01.2026.' },
    gow: { title: 'Это masterpiece,\nбратан.', text: '«То что они придумали с мифилогией, все связали».\nДаурен про God of War. 23.04.2023.' },
    ori: { title: 'Не просто\nещё одна игра.', text: '«Вы засранцы Ori не прошли».\nИстория, боёвка, музыка — всё на высоте.' },
    cs: { title: 'Лучше, когда\nесть с кем.', text: '«Я фанат стрелялок только если есть с кем то играть».\nНаше лобби. Наши пятницы.' },
  };
  $$('[data-game]').forEach((button) => button.addEventListener('click', () => {
    const game = games[button.dataset.game];
    $('#gameTitle').textContent = game.title;
    $('#gameText').textContent = game.text;
    $('.games-tile').dataset.world = button.dataset.game;
    $$('[data-game]').forEach((other) => {
      other.classList.toggle('active', other === button);
      other.setAttribute('aria-pressed', String(other === button));
    });
  }));
  $('#oriPromise').addEventListener('click', () => {
    $('#promiseResponse').hidden = false;
    $('#oriPromise').innerHTML = 'Обещание принято <span aria-hidden="true">✓</span>';
    toast('Всё. Теперь придётся пройти Ori.');
  });

  const questions = [
    { quote: '«От твоего слишком потного друхана»', answer: 'dauren', note: 'Даурен. Подпись в поздравлении тебе, 19 августа 2025.' },
    { quote: '«Мой лучший друг Даурен такое не сказал бы»', answer: 'islam', note: 'Ислам. Даурен ответил, что тот брад с универа иногда возвращается.' },
    { quote: '«Обнимаю до измельчения рёбер, удачи🤝»', answer: 'dauren', note: 'Даурен. В поздравлении 19 августа 2026. Рёбра береги.' },
  ];
  let questionIndex = 0;
  let quizScore = 0;
  let answered = false;
  function renderQuestion() {
    answered = false;
    $('#quizStep').textContent = `ВОПРОС ${String(questionIndex + 1).padStart(2, '0')} / 03`;
    $('#quizQuote').textContent = questions[questionIndex].quote;
    $('#quizFeedback').textContent = '';
    $('#quizNext').hidden = true;
    $('#quizRestart').hidden = true;
    $('.quiz-answers').hidden = false;
    $$('[data-answer]').forEach((button) => { button.disabled = false; button.classList.remove('correct', 'wrong'); });
  }
  $$('[data-answer]').forEach((button) => button.addEventListener('click', () => {
    if (answered) return;
    answered = true;
    const correct = button.dataset.answer === questions[questionIndex].answer;
    if (correct) quizScore += 1;
    $('#quizScore').textContent = `${quizScore} / 3`;
    $$('[data-answer]').forEach((other) => {
      other.disabled = true;
      if (other.dataset.answer === questions[questionIndex].answer) other.classList.add('correct');
    });
    if (!correct) button.classList.add('wrong');
    $('#quizFeedback').textContent = `${correct ? 'Узнал брада. ' : 'Ахаха, не угадал. '}${questions[questionIndex].note}`;
    if (questionIndex < questions.length - 1) $('#quizNext').hidden = false;
    else {
      $('#quizStep').textContent = 'ПРОВЕРКА ЗАВЕРШЕНА';
      $('#quizRestart').hidden = false;
      const result = quizScore === 3 ? '3 из 3. Брад подтверждён. Без вопросов.' : `${quizScore} из 3. Всё равно брад. Тут без пересдачи.`;
      $('#quizFeedback').textContent += ` ${result}`;
    }
  }));
  $('#quizNext').addEventListener('click', () => { questionIndex += 1; renderQuestion(); });
  $('#quizRestart').addEventListener('click', () => { questionIndex = 0; quizScore = 0; $('#quizScore').textContent = '0 / 3'; renderQuestion(); });

  let toastTimer;
  function toast(text) {
    const target = $('#toast');
    clearTimeout(toastTimer);
    target.textContent = text;
    target.classList.add('visible');
    toastTimer = setTimeout(() => target.classList.remove('visible'), 3500);
  }

  // Photographs are curated copies, never the complete chat export.
  const gallery = [
    ['photo1-jpg', 'Первые дни в МУИТе'], ['photo7-jpg', 'Опять эти, два дебила'],
    ['photo5-jpg', 'Усердно работали над хуеломкой'], ['photo12-jpg', 'Смешинка попала'],
    ['photo13-jpg', 'Каждый в своём мире'], ['photo23-jpg', 'Душевные прогулки летом'],
    ['photo22-jpg', 'Потные Алатауские вечера'], ['photo9-jpg', 'Мой сюрприз-приезд удался'],
    ['photo24-jpg', 'Наконец-то, выпустили'], ['photo2-jpg', 'Те же два брада'],
    ['photo20-jpg', 'Некачественное — качественное фото'], ['photo5-png', 'Улыбайся чаще, брад'],
  ];
  const photoDialog = $('#photoDialog');
  const galleryDialog = $('#galleryDialog');
  function syncModalState() { document.body.classList.toggle('modal-open', photoDialog.open || galleryDialog.open); }
  function showPhoto(path, caption) {
    $('#dialogImage').src = path;
    $('#dialogImage').alt = caption;
    $('#dialogCaption').textContent = caption;
    if (!photoDialog.open) photoDialog.showModal();
    syncModalState();
  }
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.photo-open');
    if (button) showPhoto(button.dataset.photo, button.dataset.caption);
  });
  $('#closePhoto').addEventListener('click', () => photoDialog.close());
  $('#closeGallery').addEventListener('click', () => galleryDialog.close());
  [photoDialog, galleryDialog].forEach((dialog) => {
    dialog.addEventListener('close', syncModalState);
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  $('#openGallery').addEventListener('click', () => {
    if (!$('#galleryGrid').childElementCount) {
      gallery.forEach(([photo, caption]) => {
        const button = document.createElement('button');
        button.className = 'gallery-item photo-open';
        button.dataset.photo = photoPath(photo);
        button.dataset.caption = caption;
        button.setAttribute('aria-label', `Открыть: ${caption}`);
        const image = document.createElement('img');
        image.src = photoPath(photo); image.alt = caption; image.loading = 'lazy';
        const label = document.createElement('span'); label.textContent = caption;
        button.append(image, label);
        $('#galleryGrid').append(button);
      });
    }
    galleryDialog.showModal(); syncModalState();
  });

  // The user's selected soundtrack for the main birthday story.
  const mainMusic = new Audio('assets/music/stay-the-same.mp3');
  mainMusic.preload = 'metadata'; mainMusic.loop = true; mainMusic.volume = .25;
  mainMusic.hidden = true; mainMusic.id = 'mainMusic'; document.body.append(mainMusic);
  let musicOn = false, mainMusicToken = 0;
  function updateMainMusicUI() {
    const button = $('.sound-toggle');
    button.setAttribute('aria-pressed', String(musicOn));
    button.setAttribute('aria-label', musicOn ? 'Выключить музыку' : 'Включить музыку');
    button.querySelector('span').textContent = musicOn ? 'Звук вкл.' : 'Звук выкл.';
    button.title = 'Stay the Same — mell-ø';
  }
  async function playMainMusic() {
    const token = ++mainMusicToken;
    try { await mainMusic.play(); }
    catch { if (token === mainMusicToken) { musicOn = false; updateMainMusicUI(); toast('Не удалось включить музыку. Попробуй ещё раз.'); } }
  }
  $('.sound-toggle').addEventListener('click', () => {
    musicOn = !musicOn; updateMainMusicUI();
    if (musicOn) playMainMusic(); else { mainMusicToken++; mainMusic.pause(); }
  });
  mainMusic.addEventListener('error', () => { musicOn = false; updateMainMusicUI(); });
  window.addEventListener('pagehide', () => { mainMusicToken++; mainMusic.pause(); musicOn = false; updateMainMusicUI(); });
  updateMainMusicUI();

  const canvas = $('#heartsCanvas');
  const context = canvas.getContext('2d');
  let width = 0, height = 0, particles = [], animationFrame = 0;
  let heartsInView = false, heartActivated = false, counting = false, countStart = 0;
  const numberFormat = new Intl.NumberFormat('ru-RU');
  function resizeHearts() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    if (context) context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = width < 720 ? 120 : 210;
    const scale = Math.min(width / 41, height / 32);
    particles = Array.from({ length: count }, (_, index) => {
      const t = (index / count) * Math.PI * 2;
      const spread = (index % 3 - 1) * 7;
      const tx = width / 2 + (16 * Math.pow(Math.sin(t), 3)) * scale + spread;
      const ty = height / 2 - (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale + spread;
      return { x: Math.random() * width, y: Math.random() * height, tx, ty, radius: .9 + Math.random() * 1.6, phase: Math.random() * Math.PI * 2, speed: .2 + Math.random() * .3 };
    });
    if (reducedMotion.matches) {
      if (heartActivated) particles.forEach((p) => { p.x = p.tx; p.y = p.ty; });
      drawHearts(performance.now(), false);
    }
  }
  function drawHearts(time, move = true) {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    particles.forEach((p, index) => {
      if (move) {
        if (heartActivated) {
          p.x += (p.tx - p.x) * .028;
          p.y += (p.ty - p.y) * .028;
        } else {
          p.y -= p.speed;
          p.x += Math.sin(time * .0003 + p.phase) * .14;
          if (p.y < -4) p.y = height + 4;
        }
      }
      const alpha = heartActivated ? .25 + Math.sin(time * .001 + p.phase) * .12 : .07 + (index % 4) * .025;
      context.fillStyle = `rgba(243,79,67,${alpha})`;
      context.beginPath(); context.arc(p.x, p.y, p.radius, 0, Math.PI * 2); context.fill();
    });
  }
  function completeCount() {
    counting = false;
    $('#heartCount').textContent = numberFormat.format(1000000);
    $('#heartButton').disabled = false;
    $('#heartButton').innerHTML = 'Ещё миллион? <span aria-hidden="true">♡</span>';
    $('#heartsComplete').hidden = false;
    $('.million-display').classList.add('celebrated');
    toast('Миллион сердец — твоих, брад.');
  }
  function heartsFrame(time) {
    animationFrame = 0;
    if (!heartsInView || document.hidden) return;
    drawHearts(time);
    if (counting) {
      const progress = Math.min((time - countStart) / 3600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      $('#heartCount').textContent = numberFormat.format(Math.floor(eased * 1000000));
      if (progress === 1) completeCount();
    }
    if (!reducedMotion.matches) animationFrame = requestAnimationFrame(heartsFrame);
  }
  function startHeartsFrame() {
    if (!animationFrame && heartsInView && !document.hidden && !reducedMotion.matches) animationFrame = requestAnimationFrame(heartsFrame);
  }
  $('#heartButton').addEventListener('click', () => {
    if (counting) return;
    heartActivated = true;
    $('.million-display').classList.remove('celebrated');
    $('#heartsComplete').hidden = true;
    if (reducedMotion.matches) {
      particles.forEach((p) => { p.x = p.tx; p.y = p.ty; });
      drawHearts(performance.now(), false);
      completeCount();
    } else {
      counting = true;
      countStart = performance.now();
      $('#heartButton').disabled = true;
      $('#heartButton').innerHTML = 'Отправляю отдуши… <span aria-hidden="true">♥</span>';
      startHeartsFrame();
    }
  });
  const heartsObserver = new IntersectionObserver((entries) => {
    heartsInView = entries[0].isIntersecting;
    if (heartsInView) startHeartsFrame();
    else if (animationFrame) { cancelAnimationFrame(animationFrame); animationFrame = 0; }
  }, { threshold: .05 });
  heartsObserver.observe(canvas);
  new ResizeObserver(resizeHearts).observe(canvas);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrame) { cancelAnimationFrame(animationFrame); animationFrame = 0; }
      mainMusicToken++; mainMusic.pause();
    } else {
      startHeartsFrame();
      if (musicOn) playMainMusic();
    }
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      if (animationFrame) { cancelAnimationFrame(animationFrame); animationFrame = 0; }
      if (counting) completeCount();
      resizeHearts();
    } else startHeartsFrame();
  });

  const progressBar = $('.reading-progress');
  let scrollTick = false;
  function updateProgress() {
    const fullHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${fullHeight > 0 ? window.scrollY / fullHeight * 100 : 0}%`;
    scrollTick = false;
  }
  window.addEventListener('scroll', () => { if (!scrollTick) { scrollTick = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
  if (!reducedMotion.matches) {
    const reveals = $$('.section-heading, .character-grid, .chat-grid, .quiz, .quiet-copy, .million-intro, .letter-body, .ending>h2');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: .08 });
    reveals.forEach((element) => { element.classList.add('reveal-ready'); revealObserver.observe(element); });
  }
})();
