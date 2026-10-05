(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const heroines = {
    aira: { name: 'Айра', world: 'GAMING DISTRICT', tagline: 'Та самая, которая зовёт на ещё одну катку.', voice: 'assets/voices/aira.mp3', text: $('greetingText').textContent },
    saga: { name: 'Сага', world: 'NORTHERN REALM', tagline: 'Сила узнаёт силу. И немного подкалывает.', voice: 'assets/voices/saga.mp3', text: 'Даурен, с двадцать пятым днём рождения. Мне рассказали про твои кольца. Уважаю: характер не появляется от красивых слов, его собирают повторение за повторением. Желаю тебе силы для своего пути, здоровья и спокойствия за близких. И дома, где будут турник, брусья и место для тех, кого любишь. Сегодня можешь отложить подвиги. Трицепсы и так в ахуе. Отдыхай, герой. Ты заслужил.' },
    lumi: { name: 'Луми', world: 'SPIRIT FOREST', tagline: 'Хранит свет даже после трудных уровней.', voice: 'assets/voices/lumi.mp3', text: 'С днём рождения, Даурен. Говорят, ты любишь истории, в которых музыка и свет остаются с тобой после финала. Пусть и в твоей жизни будет много такого света. Тихих вечеров, крепких объятий, хороших новостей от близких. Ты умеешь быть сильным. Желаю тебе ещё и возможности выдохнуть. Пусть рядом остаются люди, с которыми можно быть собой. А друзья пусть наконец пройдут Ори. Я тоже за тобой в этом вопросе.' },
    nova: { name: 'Нова', world: 'NEO ALMATY', tagline: 'Знает короткую дорогу домой. И к хорошему латте.', voice: 'assets/voices/nova.mp3', text: 'Салам, Даурен! На связи Алматы из другой вселенной. Маршрут знакомый: Ташкент, Алматы, университет, свои люди и свой путь. Сегодня у города особый повод: тебе двадцать пять. Желаю, чтобы работа приносила удовольствие, планы становились реальностью, а времени хватало и на жизнь. И чтобы твой брад был рядом, даже когда между вами километры. Семь лет дружбы — отличный маршрут. Продолжайте. Имениннику сегодня зелёный свет.' }
  };
  const items = {
    glasses: ['LEGENDARY / ПАССИВНОЕ УМЕНИЕ', 'Очки наблюдателя.', 'Видят баги до релиза и засранцев издалека. Без них образ брада был бы неполным.', '«Why am I not surprised?» — ещё до того, как что-то случилось.', 'ИЗ ЛИЧНОГО ИНВЕНТАРЯ ДАУРЕНА'],
    rings: ['LEGENDARY / СИЛА', 'Кольца дисциплины.', 'Не дают силу мгновенно. Зато знают, сколько раз ты выбрал тренировку и сделал ещё одно повторение.', 'Кольца — game changer. Трицепсы подтвердят.', 'ПРОЧНОСТЬ РАСТЁТ ВМЕСТЕ С ВЛАДЕЛЬЦЕМ'],
    latte: ['EPIC / ВОСПОМИНАНИЕ', 'Латте из универа.', 'Обычный кофе из студенческих дней. Но некоторые люди помнят не только напиток, а того, кто угощал.', 'Восстанавливает ощущение: «Брад, я рядом».', 'ПОИЩИ ИСТОРИЮ НА ДНЕ ЧАШКИ'],
    headset: ['EPIC / КОМАНДА', 'Портал в Discord.', 'Пары закончились. Города и графики меняются. А знакомый голос всё ещё появляется в наушниках.', 'Расстояние между брадами временно равно нулю.', 'ДЛЯ КАТОК И РАЗГОВОРОВ ПОСЛЕ НИХ'],
    friendship: ['ONE OF ONE / НАВСЕГДА', 'Сохранение: братство.', 'Семь лет, одна группа, тысячи разговоров. Можно продолжать с любого места: объяснять, кто ты, уже не нужно.', 'Миллион сердец. База данных выдержит.', 'НЕ ПРОДАЁТСЯ. НЕ ТЕРЯЕТСЯ. НЕ ЗАНИМАЕТ СЛОТ.']
  };
  const secrets = {
    signal: ['25.14 / Личный сигнал', 'Двадцать пять лет. Четырнадцатое октября. Среди всех сигналов этот адресован одному человеку.'],
    latte: ['Кофе, который помнят', '«Ты тогда угощал». Самые тёплые воспоминания часто начинаются с чего-то совсем обычного.'],
    frequency: ['7.0 / Наша частота', 'Семь лет дружбы. Общие пары закончились, а связь осталась.'],
    home: ['Сохранение найдено', 'Какой бы мир ты ни исследовал, у тебя есть свой брад. Следующая глава — вместе.']
  };
  let toastTimer, currentHeroine = 'aira', currentItem = 'glasses', voiceToken = 0, voiceTimer;
  const toast = text => { $('verseToast').textContent = text; $('verseToast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('verseToast').classList.remove('visible'), 4200); };
  let found = new Set();
  try { found = new Set(JSON.parse(localStorage.getItem('daurenverse-secrets-v1') || '[]').filter(key => key in secrets)); } catch {}
  function renderSecrets() {
    $('secretCounter').textContent = `${found.size} / 4`;
    $('secretList').replaceChildren();
    Object.entries(secrets).forEach(([key, [title, description]], i) => {
      const entry = document.createElement('article'); entry.className = 'secret-entry' + (found.has(key) ? ' unlocked' : '');
      const number = document.createElement('span'); number.textContent = String(i + 1).padStart(2, '0');
      const content = document.createElement('div'), heading = document.createElement('h3'), text = document.createElement('p');
      entry.classList.toggle('locked', !found.has(key));
      heading.textContent = found.has(key) ? title : 'Сигнал ещё не найден';
      text.textContent = found.has(key) ? description : ['Прислушайся к поздравлениям.', 'Некоторые предметы хранят память.', 'У радио бывает своя частота.', 'Герою тоже нужен дом.'][i];
      content.append(heading, text); entry.append(number, content); $('secretList').append(entry);
    });
    $('secretReward').hidden = found.size !== 4;
    $('secretIntro').textContent = found.size === 4 ? 'Ты нашёл все четыре сигнала. Это поздравление — тебе.' : 'Некоторые вещи находятся, если присмотреться.';
  }
  function unlock(key) {
    if (!found.has(key)) { found.add(key); try { localStorage.setItem('daurenverse-secrets-v1', JSON.stringify([...found])); } catch {} renderSecrets(); toast(`✦ Найден секрет: ${secrets[key][0]}`); }
    else toast(secrets[key][1]);
  }
  renderSecrets();
  document.querySelectorAll('[data-secret]').forEach(button => button.addEventListener('click', () => unlock(button.dataset.secret)));
  $('openSecretLog').addEventListener('click', () => $('secretDialog').showModal());
  $('closeSecret').addEventListener('click', () => $('secretDialog').close());
  $('saveReward').addEventListener('click', () => {
    const link = document.createElement('a'); link.href = 'assets/verse/postcard.svg'; link.download = 'DaurenVerse-25.svg'; document.body.append(link); link.click(); link.remove();
    toast('Открытка готова к сохранению.');
  });
  document.querySelectorAll('[data-item]').forEach(button => button.addEventListener('click', () => {
    currentItem = button.dataset.item;
    document.querySelectorAll('[data-item]').forEach(b => { const selected = b === button; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', selected); });
    ['itemCategory', 'itemTitle', 'itemDescription', 'itemEffect', 'itemOrigin'].forEach((id, i) => $(id).textContent = items[currentItem][i]);
  }));
  $('inspectItem').addEventListener('click', () => currentItem === 'latte' ? unlock('latte') : toast({glasses:'Всё на месте. Даже фирменный взгляд.',rings:'Следы использования. Владелец не пропускает.',headset:'Соединение с брадом устойчивое.',friendship:'Автосохранение включено. Продолжение следует.'}[currentItem]));

  const tracks = [
    {name:'Where Is Your Love', artist:'J Lisk', src:'assets/music/where-is-your-love.mp3'},
    {name:'Ghosts', artist:'Michael Jackson', src:'assets/music/ghosts.mp3'},
    {name:'Airplanes', artist:'B.o.B feat. Hayley Williams', src:'assets/music/airplanes.mp3'},
    {name:'Lose Control', artist:'Teddy Swims', src:'assets/music/lose-control.mp3'}
  ];
  const radioAudio = new Audio(tracks[0].src);
  radioAudio.preload = 'metadata'; radioAudio.volume = .4;
  radioAudio.hidden = true; radioAudio.id = 'radioAudio'; document.body.append(radioAudio);
  let trackIndex = 0, musicWanted = false, speaking = false, musicToken = 0;
  function stopMusic() { musicToken++; radioAudio.pause(); }
  function updateMusicUI() {
    const playing = musicWanted && !speaking && !radioAudio.paused;
    $('ambientButton').setAttribute('aria-pressed', musicWanted); $('ambientLabel').textContent = musicWanted ? 'Радио вкл.' : 'Радио выкл.';
    $('radioPlay').setAttribute('aria-pressed', musicWanted); $('radioPlay').setAttribute('aria-label', musicWanted ? 'Выключить радио' : 'Включить радио'); $('radioPlay').textContent = musicWanted ? 'Ⅱ' : '▶';
    $('radioState').textContent = musicWanted && speaking ? 'СЛУШАЕМ ПОЗДРАВЛЕНИЕ' : playing ? 'В ЭФИРЕ' : musicWanted ? 'ЗАГРУЖАЕМ ПЕСНЮ' : 'НА ПАУЗЕ';
    document.querySelector('.radio-player').classList.toggle('playing', playing);
  }
  async function startMusic() {
    stopMusic(); const token = musicToken;
    if (!musicWanted || speaking || document.hidden) { updateMusicUI(); return; }
    updateMusicUI();
    try {
      await radioAudio.play();
      if (token === musicToken) updateMusicUI();
    } catch {
      if (token !== musicToken) return;
      musicWanted = false; updateMusicUI(); toast('Не удалось включить песню. Попробуй ещё раз.');
    }
  }
  function toggleMusic() { musicWanted = !musicWanted; startMusic(); }
  function selectTrack(index) {
    stopMusic(); trackIndex = (index + tracks.length) % tracks.length;
    radioAudio.src = tracks[trackIndex].src; radioAudio.load();
    $('radioTrack').textContent = tracks[trackIndex].name; $('radioWorld').textContent = `ЛЮБИМЫЕ ПЕСНИ / ${trackIndex + 1} ИЗ ${tracks.length}`; $('radioDescription').textContent = tracks[trackIndex].artist;
    document.querySelectorAll('[data-track]').forEach(b => {const active = Number(b.dataset.track) === trackIndex; b.classList.toggle('active',active); b.setAttribute('aria-pressed',active);}); startMusic();
  }
  radioAudio.addEventListener('playing', updateMusicUI);
  radioAudio.addEventListener('ended', () => { if (musicWanted && !speaking) selectTrack(trackIndex + 1); });
  radioAudio.addEventListener('error', () => { if (musicWanted) { musicWanted = false; stopMusic(); updateMusicUI(); toast('Не удалось загрузить песню. Выбери другой трек или попробуй ещё раз.'); } });
  $('ambientButton').addEventListener('click', toggleMusic); $('radioPlay').addEventListener('click', toggleMusic);
  $('radioPrev').addEventListener('click', () => selectTrack(trackIndex - 1)); $('radioNext').addEventListener('click', () => selectTrack(trackIndex + 1));
  document.querySelectorAll('[data-track]').forEach(b => b.addEventListener('click', () => selectTrack(Number(b.dataset.track))));
  $('radioVolume').addEventListener('input', () => { radioAudio.volume = Number($('radioVolume').value); });
  const formatTime = seconds => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2,'0')}` : '0:00';
  function updateRadioProgress() {
    const duration = radioAudio.duration;
    $('radioSeek').disabled = !Number.isFinite(duration) || duration <= 0;
    $('radioSeek').value = Number.isFinite(duration) && duration > 0 ? Math.round(radioAudio.currentTime / duration * 1000) : 0;
    $('radioSeek').setAttribute('aria-valuetext', `${formatTime(radioAudio.currentTime)} из ${formatTime(duration)}`);
    $('radioElapsed').textContent = formatTime(radioAudio.currentTime); $('radioDuration').textContent = formatTime(duration);
  }
  ['timeupdate','durationchange','emptied'].forEach(event => radioAudio.addEventListener(event, updateRadioProgress));
  $('radioSeek').addEventListener('input', () => { if (Number.isFinite(radioAudio.duration)) radioAudio.currentTime = Number($('radioSeek').value) / 1000 * radioAudio.duration; });
  const voicePlayers = Object.fromEntries(Object.entries(heroines).map(([key, hero]) => {
    const player = new Audio(hero.voice);
    player.preload = 'auto';
    player.hidden = true; player.dataset.voice = key; document.body.append(player);
    return [key, player];
  }));
  let activeVoice = null, removeVoiceListeners = () => {};
  function stopGreeting(message = 'Нажми, чтобы послушать', resumeMusic = true) {
    voiceToken++; clearTimeout(voiceTimer); removeVoiceListeners(); removeVoiceListeners = () => {};
    if (activeVoice) { activeVoice.pause(); activeVoice.currentTime = 0; activeVoice = null; }
    speaking = false;
    $('greetingStop').disabled = true; $('greetingPlay').disabled = false;
    $('playIcon').textContent = '▶'; $('playLabel').textContent = 'Послушать поздравление'; $('voiceStatus').textContent = message;
    if (resumeMusic) startMusic(); else updateMusicUI();
  }
  document.querySelectorAll('[data-heroine]').forEach(button => button.addEventListener('click', () => {
    stopGreeting(); currentHeroine = button.dataset.heroine; const hero = heroines[currentHeroine]; document.body.dataset.world = currentHeroine;
    document.querySelectorAll('[data-heroine]').forEach(b => { const selected = b === button; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', selected); });
    $('speakerName').textContent = hero.name; $('speakerWorld').textContent = hero.world + ' / НА СВЯЗИ'; $('speakerTagline').textContent = hero.tagline; $('greetingText').textContent = hero.text; $('greetingPlay').setAttribute('aria-label', 'Послушать поздравление: ' + hero.name);
  }));
  $('greetingPlay').addEventListener('click', () => {
    stopGreeting('Загружаем поздравление…', false);
    const token = voiceToken, hero = heroines[currentHeroine], player = voicePlayers[currentHeroine];
    activeVoice = player; player.currentTime = 0; player.volume = Number($('voiceVolume').value);
    speaking = true; stopMusic(); updateMusicUI();
    $('greetingStop').disabled = false; $('greetingPlay').disabled = true; $('playLabel').textContent = 'Подключаем голос…';
    const onPlaying = () => { if (token === voiceToken) { clearTimeout(voiceTimer); $('voiceStatus').textContent = 'На связи: ' + hero.name; $('playLabel').textContent = 'Поздравление звучит'; $('playIcon').textContent = '♫'; } };
    const onEnded = () => { if (token === voiceToken) stopGreeting('Поздравление прослушано ✦'); };
    const onError = () => { if (token === voiceToken) { stopGreeting('Не удалось воспроизвести запись'); toast('Не удалось загрузить озвучку. Попробуй ещё раз.'); } };
    player.addEventListener('playing', onPlaying); player.addEventListener('ended', onEnded); player.addEventListener('error', onError);
    removeVoiceListeners = () => { player.removeEventListener('playing', onPlaying); player.removeEventListener('ended', onEnded); player.removeEventListener('error', onError); };
    voiceTimer = setTimeout(onError, 15000);
    player.play().catch(onError);
  });
  $('greetingStop').addEventListener('click', () => stopGreeting('Остановлено'));
  $('voiceVolume').addEventListener('input', () => { if (activeVoice) activeVoice.volume = Number($('voiceVolume').value); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { musicWanted = false; stopGreeting(); stopMusic(); updateMusicUI(); } });
  window.addEventListener('pagehide', () => { musicWanted = false; stopGreeting(); stopMusic(); });

  let comicPages = [], pageIndex = 0;
  function renderPage(scrollToStart = false) {
    const page = comicPages[pageIndex]; $('comicPageImage').src = page.src; $('comicPageImage').alt = page.alt || `Страница ${pageIndex + 1} комикса о Даурене`;
    if (page.width && page.height) { $('comicPageImage').width = page.width; $('comicPageImage').height = page.height; }
    $('comicPageNumber').textContent = page.label || `${pageIndex + 1} / ${comicPages.length}`; $('comicPrev').disabled = pageIndex === 0; $('comicNext').disabled = pageIndex === comicPages.length - 1;
    $('comicPageOpen').setAttribute('aria-label', `Увеличить: ${page.label || 'страница комикса'}`);
    const nextPage = comicPages[pageIndex + 1]; if (nextPage) { const preload = new Image(); preload.src = nextPage.src; }
    [...$('comicPageDots').children].forEach((button, i) => {button.classList.toggle('active', i === pageIndex); button.setAttribute('aria-pressed', i === pageIndex);});
    if (scrollToStart) $('comicReader').scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  function turnPage(delta) {pageIndex = Math.max(0, Math.min(comicPages.length - 1, pageIndex + delta)); if (comicPages.length) renderPage(true);}
  $('comicPrev').addEventListener('click', () => turnPage(-1)); $('comicNext').addEventListener('click', () => turnPage(1));
  $('comicReader').addEventListener('keydown', event => {if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault(); turnPage(event.key === 'ArrowLeft' ? -1 : 1);}});
  $('comicPageOpen').addEventListener('click', () => { $('comicZoomImage').src = $('comicPageImage').src; $('comicZoomImage').alt = $('comicPageImage').alt; $('comicDialog').classList.remove('is-zoomed'); $('comicZoomToggle').setAttribute('aria-pressed', 'false'); $('comicZoomToggle').textContent = 'Масштаб 100%'; $('comicDialog').showModal(); $('comicDialog').scrollTop = 0; $('comicDialog').scrollLeft = 0; });
  $('comicZoomToggle').addEventListener('click', () => { const zoomed = $('comicDialog').classList.toggle('is-zoomed'); $('comicZoomToggle').setAttribute('aria-pressed', zoomed); $('comicZoomToggle').textContent = zoomed ? 'Вписать в экран' : 'Масштаб 100%'; $('comicDialog').scrollTop = 0; $('comicDialog').scrollLeft = 0; });
  $('closeComic').addEventListener('click', () => $('comicDialog').close());
  [$('comicDialog'), $('secretDialog')].forEach(dialog => dialog.addEventListener('click', event => {if (event.target === dialog) {const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();}}));
  fetch('comic.json').then(response => {if (!response.ok) throw new Error('manifest'); return response.json();}).then(async data => {
    if (!Array.isArray(data.pages) || !data.pages.length) return;
    const pages = data.pages.map(page => typeof page === 'string' ? {src:page} : page);
    if (!pages.every(page => page && typeof page.src === 'string' && /^assets\/comic\/[\w./-]+\.(webp|png|jpe?g|svg)$/i.test(page.src) && !page.src.includes('..'))) throw new Error('pages');
    await new Promise((resolve,reject) => {const image = new Image(); image.onload = resolve; image.onerror = reject; image.src = pages[0].src;});
    comicPages = pages; $('comicBookTitle').textContent = typeof data.title === 'string' ? data.title : 'ДауренVerse · Глава первая';
    pages.forEach((page, i) => {const button = document.createElement('button'); button.textContent = page.label === 'Обложка' ? 'Обл.' : page.label?.replace('Страница ','') || i+1; button.setAttribute('aria-label', page.label || `Страница ${i+1}`); button.addEventListener('click', () => {pageIndex = i; renderPage(true);}); $('comicPageDots').append(button);});
    renderPage(); $('comicWaiting').hidden = true; $('comicReader').hidden = false;
  }).catch(() => { /* Комикс появится только с доступными, готовыми страницами. */ });
})();
