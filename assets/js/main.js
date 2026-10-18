(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const reduce = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const WA = 'https://wa.me/393669050198?text=';

  const LANG = ((document.documentElement.lang || 'es').slice(0, 2).toLowerCase());
  const I = {
    es: { pause: 'Pausa', play: 'Seguir', ckX: 'Cerrar y rechazar', ckT: 'Tu privacidad, primero',
      ckD: 'Esta web solo usa lo <b>esencial</b> para funcionar y recordar tu elección. Si aceptas todas, en el futuro podré medir las visitas de forma anónima para mejorarla. Puedes cambiar de opinión cuando quieras. <a href="privacidad.html#cookies">Más información</a>',
      ckNone: 'Rechazar', ckEss: 'Solo esenciales', ckAll: 'Aceptar todas',
      typing: 'escribiendo…', online: 'en línea', typingA: 'Luis está escribiendo', step: (n) => 'Paso ' + n + ' de 4', choose: 'Elige tu respuesta', top: 'Volver arriba' },
    it: { pause: 'Pausa', play: 'Riprendi', ckX: 'Chiudi e rifiuta', ckT: 'La tua privacy, prima di tutto',
      ckD: 'Questo sito usa solo l’<b>essenziale</b> per funzionare e ricordare la tua scelta. Se accetti tutti, in futuro potrò misurare le visite in forma anonima per migliorarlo. Puoi cambiare idea quando vuoi. <a href="privacidad.html#cookies">Maggiori informazioni</a>',
      ckNone: 'Rifiuta', ckEss: 'Solo essenziali', ckAll: 'Accetta tutti',
      typing: 'sta scrivendo…', online: 'online', typingA: 'Luis sta scrivendo', step: (n) => 'Passo ' + n + ' di 4', choose: 'Scegli la tua risposta', top: 'Torna su' },
    en: { pause: 'Pause', play: 'Play', ckX: 'Close and reject', ckT: 'Your privacy comes first',
      ckD: 'This site only uses what is <b>essential</b> to work and to remember your choice. If you accept all, in the future I may measure visits anonymously to improve it. You can change your mind at any time. <a href="privacidad.html#cookies">More information</a>',
      ckNone: 'Reject', ckEss: 'Essential only', ckAll: 'Accept all',
      typing: 'typing…', online: 'online', typingA: 'Luis is typing', step: (n) => 'Step ' + n + ' of 4', choose: 'Choose your answer', top: 'Back to top' }
  };
  const t = I[LANG] || I.es;

  const hdr = $('#hdr');
  const onScroll = () => hdr && hdr.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const menuBtn = $('#menuBtn'), menuPanel = $('#menuPanel'), menuIco = $('#menuIco');
  const setMenu = (open) => {
    if (!menuBtn) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuPanel.hidden = !open;
    menuIco.setAttribute('d', open ? 'M4 4 L14 14 M14 4 L4 14' : 'M3 5 H15 M3 9 H15 M3 13 H15');
  };
  if (menuBtn) {
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    menuPanel.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    menuPanel.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); } });
    menuBtn.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  const track = $('#track'), mqBtn = $('#mqBtn');
  if (mqBtn) mqBtn.addEventListener('click', () => {
    const paused = track.classList.toggle('paused');
    mqBtn.setAttribute('aria-pressed', String(paused));
    mqBtn.innerHTML = paused ? '<span aria-hidden="true">▶</span><span class="mq-txt">' + t.play + '</span>' : '<span aria-hidden="true">❚❚</span><span class="mq-txt">' + t.pause + '</span>';
  });

  (function orbit() {
    const box = document.querySelector('[data-orbit]'); if (!box) return;
    const quote = box.querySelector('blockquote'); const NS = 'http://www.w3.org/2000/svg';
    const mk = (t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); return e; };
    const id = 'orbitMask' + Math.random().toString(36).slice(2, 7);
    const svg = mk('svg', { class: 'orbit', 'aria-hidden': 'true' });
    const mask = mk('mask', { id, maskUnits: 'userSpaceOnUse' });
    const mp = mk('path', { fill: 'none', stroke: '#fff', 'stroke-width': 30, 'stroke-linecap': 'butt', pathLength: 1, 'stroke-dasharray': '1 2', 'stroke-dashoffset': 1 });
    mask.appendChild(mp); const defs = mk('defs', {}); defs.appendChild(mask); svg.appendChild(defs);
    const dots = mk('path', { class: 'dots', mask: 'url(#' + id + ')' });
    const wave = mk('path', { class: 'wv', pathLength: 1 });
    svg.append(dots, wave); box.appendChild(svg);
    let seg = 0.1, state = 'idle', timers = [];
    const ease = 'cubic-bezier(.42,0,.38,1)';
    const set = (el, off, dur, extra) => { el.style.transition = dur ? 'stroke-dashoffset ' + dur + ' ' + ease + (extra || '') : 'none'; el.style.strokeDashoffset = off; };

    function shape() {
      const B = box.getBoundingClientRect(), rg = document.createRange(); rg.selectNodeContents(quote); const Q = rg.getBoundingClientRect();
      const small = B.width < 600;
      const cx = Q.left - B.left + Q.width / 2, cy = Q.top - B.top + Q.height / 2;
      const a = Math.min(Q.width / 2 * 1.2 + 12, B.width / 2 - 16), b = Math.min(Q.height / 2 * 1.2 + 26, B.height / 2 - 16);

      const n = 3.2, N = 600, G = [], acc = [0];
      for (let i = 0; i <= N; i++) {
        const t = -Math.PI / 2 + 2 * Math.PI * i / N, c = Math.cos(t), s = Math.sin(t);
        G.push([cx + a * Math.sign(c) * Math.pow(Math.abs(c), 2 / n), cy + b * Math.sign(s) * Math.pow(Math.abs(s), 2 / n)]);
        if (i) acc.push(acc[i - 1] + Math.hypot(G[i][0] - G[i - 1][0], G[i][1] - G[i - 1][1]));
      }
      const L = acc[N], AMP = small ? 7 : 11, periods = Math.max(6, Math.round(L / (small ? 80 : 104))), PER = L / periods;

      const pts = G.map((p, i) => {
        const a0 = G[Math.max(0, i - 1)], a1 = G[Math.min(N, i + 1)];
        const tx = a1[0] - a0[0], ty = a1[1] - a0[1], tl = Math.hypot(tx, ty) || 1;
        const o = AMP * Math.sin(2 * Math.PI * acc[i] / PER);
        return [p[0] + (ty / tl) * o, p[1] + (-tx / tl) * o];
      });
      const Qp = pts.filter((p, i) => i % 3 === 0 || i === N), f = v => v.toFixed(1);
      let d = 'M' + f(Qp[0][0]) + ' ' + f(Qp[0][1]);
      for (let i = 0; i < Qp.length - 1; i++) {
        const p0 = Qp[Math.max(0, i - 1)], p1 = Qp[i], p2 = Qp[i + 1], p3 = Qp[Math.min(Qp.length - 1, i + 2)];
        d += ' C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f(p1[1] + (p2[1] - p0[1]) / 6) + ' ' + f(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
      }
      svg.setAttribute('viewBox', '0 0 ' + f(B.width) + ' ' + f(B.height));
      dots.setAttribute('d', d); mp.setAttribute('d', d); wave.setAttribute('d', d);
      wave.style.strokeWidth = small ? 5 : 7;
      seg = 1 / periods;
      wave.style.strokeDasharray = seg + ' 3';
      if (state === 'idle') { set(wave, seg); wave.style.opacity = 0; set(mp, 1); }
      if (state === 'done') { set(mp, 0); wave.style.opacity = 0; }
    }

    function play() {
      if (state !== 'idle') return; state = 'run';
      if (reduce()) { state = 'done'; set(mp, 0); return; }
      timers.forEach(clearTimeout); timers = [];
      const T = (ms, fn) => timers.push(setTimeout(fn, ms));

      wave.style.transition = 'opacity .3s ease'; wave.style.opacity = 1;
      T(30, () => { set(wave, 0, '.9s'); set(mp, 1 - seg, '.9s'); });

      T(950, () => { set(wave, -(1 - seg), '3.4s'); set(mp, 0, '3.4s'); });

      T(4300, () => { wave.style.transition = 'opacity .5s ease'; wave.style.opacity = 0; state = 'done'; });
    }
    box.addEventListener('revealed', play);
    shape();
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(shape, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(shape);
  })();

  const playSmil = (el) => { el.querySelectorAll('animate, animateMotion').forEach(a => { try { a.beginElement(); } catch (e) {} }); el.dispatchEvent(new Event('revealed')); };

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce()) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); playSmil(en.target); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => {
    el.classList.add('in'); el.dispatchEvent(new Event('revealed'));

    el.querySelectorAll('animate').forEach(a => a.parentNode.setAttribute('stroke-dashoffset', '0'));
  });

  (function cookies() {
    const KEY = 'tpl-consent', VERSION = 1;
    const read = () => { try { const v = JSON.parse(localStorage.getItem(KEY)); return v && v.v === VERSION ? v : null; } catch (e) { return null; } };
    const save = (choice) => { try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, choice, date: new Date().toISOString() })); } catch (e) {} window.tplConsent = choice; document.dispatchEvent(new CustomEvent('tpl:consent', { detail: choice })); };
    const saved = read(); window.tplConsent = saved ? saved.choice : null;
    let box = null, lastFocus = null;
    function close() { if (!box) return; box.classList.remove('open'); document.documentElement.classList.remove('ck-open'); const b = box; box = null; setTimeout(() => b.remove(), 300); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    function open() {
      if (box) return;
      lastFocus = document.activeElement;
      box = document.createElement('section');
      box.className = 'cookie'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'false');
      box.setAttribute('aria-labelledby', 'ck-t'); box.setAttribute('aria-describedby', 'ck-d');
      box.innerHTML = `
        <button type="button" class="ghost ck-x" aria-label="${t.ckX}">×</button>
        <svg class="ck-tilde" viewBox="0 0 40 10" aria-hidden="true"><path d="M2 7 C 10 0, 16 0, 20 5 S 30 10, 38 3" fill="none" stroke="#A84A22" stroke-width="3" stroke-linecap="round"/></svg>
        <h2 id="ck-t">${t.ckT}</h2>
        <p id="ck-d">${t.ckD}</p>
        <div class="ck-btns">
          <button type="button" class="btn-line" data-c="none">${t.ckNone}</button>
          <button type="button" class="btn-line" data-c="essential">${t.ckEss}</button>
          <button type="button" class="btn-line ck-all" data-c="all">${t.ckAll}</button>
        </div>`;
      document.body.appendChild(box);
      box.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => { save(b.getAttribute('data-c')); close(); }));
      box.querySelector('.ck-x').addEventListener('click', () => { save('none'); close(); });
      box.addEventListener('keydown', (e) => { if (e.key === 'Escape') { save('none'); close(); } });
      requestAnimationFrame(() => { box.classList.add('open'); });
      document.documentElement.classList.add('ck-open');
    }
    if (!saved) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', open); else open(); }
    document.addEventListener('click', (e) => { const t = e.target.closest('[data-cookie-prefs]'); if (t) { e.preventDefault(); open(); const f = box && box.querySelector('[data-c]'); if (f) f.focus(); } });
  })();

  (function toTop() {
    const first = document.querySelector('#hero, .phero'); if (!first) return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'totop'; b.setAttribute('aria-label', t.top); b.title = t.top;
    b.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 19V6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M6 11.5 C 8.5 8, 10 6.5, 12 5 C 14 6.5, 15.5 8, 18 11.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(b);
    const show = (on) => { b.classList.toggle('on', on); b.tabIndex = on ? 0 : -1; b.setAttribute('aria-hidden', String(!on)); };
    show(false);
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => show(!e.isIntersecting && e.boundingClientRect.top < 0)).observe(first);
    else window.addEventListener('scroll', () => show(window.scrollY > first.offsetHeight), { passive: true });
    b.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduce() ? 'auto' : 'smooth' });
      const logo = document.querySelector('.hdr .logo'); if (logo) logo.focus({ preventScroll: true });
    });
  })();

  const hero = $('#hero');
  if (!hero) return;
  const main = $('#hmain'), dotEl = $('#hdot'), lead = $('#lead'), ldot = $('#ldot');
  const l1 = $('#l1'), l2 = $('#l2'), l3 = $('#l3');
  const chatSec = $('#chatsec'), card = $('#ccard');
  const wave = $('#wave'), wavePath = $('#wavePath');
  const L2 = $('.rest', l2).textContent, L3 = $('.rest', l3).textContent;
  const NA = L2.length + 1, NZ = L2.length + L3.length;
  let hTimers = [];

  const stage = (n) => { for (let i = 1; i <= n; i++) hero.classList.add('s' + i); };
  const typeLine = (el, full, n, caret) => {
    $('.typed', el).textContent = full.slice(0, n);
    $('.rest', el).textContent = full.slice(n);
    $('.caretw', el).hidden = !caret;
  };
  const setTyped = (hN, phase) => {
    const n2 = Math.min(hN, L2.length), n3 = Math.max(0, hN - L2.length);
    typeLine(l2, L2, n2, phase === 0 && hN > 0 && hN < L2.length);
    typeLine(l3, L3, n3, phase === 1 || (phase === 2 && n3 < L3.length));
  };

  let geo = null;
  function measure() {
    const M = main.getBoundingClientRect(), D = dotEl.getBoundingClientRect(), C = lead.getBoundingClientRect();
    const X = r => r - M.left, Y = r => r - M.top;
    const sx = X(D.left) + D.width * 10 / 24, sy = Y(D.top) + D.height * 18 / 28;
    const l1R = X(l1.getBoundingClientRect().right), l2R = X(l2.getBoundingClientRect().right);
    const fs = parseFloat(getComputedStyle(lead).fontSize) || 32;
    const ex = X(C.left) + fs * 0.25, ey = Y(C.top) + fs * 1.125;
    const stacked = window.matchMedia('(max-width: 1079px)').matches;
    const P0 = [sx, sy], P3 = [ex, ey]; let P1, P2;
    if (stacked) {

      const W = main.offsetWidth, dy = Math.max(60, ey - sy);
      P1 = [Math.min(sx + 60, W - 14), sy + dy * 0.35]; P2 = [ex + 70, ey - dy * 0.55];
    } else {

      const clear = (ey < sy - 130 ? Math.max(l1R, l2R) : l2R) + 30;
      P1 = [Math.max(clear, sx + 220), sy - 4]; P2 = [ex - 110, ey + 4];
    }
    const bz = u => { const v = 1 - u; return [0, 1].map(i => v*v*v*P0[i] + 3*v*v*u*P1[i] + 3*v*u*u*P2[i] + u*u*u*P3[i]); };
    const N = 420, G = [], acc = [0];
    for (let i = 0; i <= N; i++) { G.push(bz(i / N)); if (i) acc.push(acc[i-1] + Math.hypot(G[i][0]-G[i-1][0], G[i][1]-G[i-1][1])); }
    const Lg = acc[N], PER = stacked ? 78 : 104, AMP = stacked ? 8 : 11;

    const pts = G.map((p, i) => {
      const a0 = G[Math.max(0, i-1)], a1 = G[Math.min(N, i+1)];
      const tx = a1[0]-a0[0], ty = a1[1]-a0[1], tl = Math.hypot(tx, ty) || 1;
      const s = acc[i], amp = AMP * Math.min(1, (Lg - s) / PER), o = amp * Math.sin(2 * Math.PI * s / PER);
      return [p[0] + (ty/tl)*o, p[1] + (-tx/tl)*o];
    });
    let len = 0, firstLen = 0;
    pts.forEach((p, i) => { if (i) { len += Math.hypot(p[0]-pts[i-1][0], p[1]-pts[i-1][1]); if (acc[i] <= PER) firstLen = len; } });

    const Q = pts.filter((p, i) => i % 3 === 0 || i === N), f = v => v.toFixed(1);
    let d = 'M' + f(Q[0][0]) + ' ' + f(Q[0][1]);
    for (let i = 0; i < Q.length - 1; i++) {
      const p0 = Q[Math.max(0, i-1)], p1 = Q[i], p2 = Q[i+1], p3 = Q[Math.min(Q.length-1, i+2)];
      d += ' C' + f(p1[0] + (p2[0]-p0[0])/6) + ' ' + f(p1[1] + (p2[1]-p0[1])/6) + ' ' + f(p2[0] - (p3[0]-p1[0])/6) + ' ' + f(p2[1] - (p3[1]-p1[1])/6) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    geo = { seg: Math.min(0.45, firstLen / len) };
    wave.setAttribute('width', main.offsetWidth); wave.setAttribute('height', main.offsetHeight);
    wavePath.setAttribute('d', d);
    wavePath.style.strokeWidth = stacked ? 5 : 7;
    wavePath.style.strokeDasharray = geo.seg + ' 3';
    wavePath.style.strokeDashoffset = geo.seg;
    wavePath.style.opacity = 0;
  }
  function measureDot() {
    const S = chatSec.getBoundingClientRect(), D = ldot.getBoundingClientRect();
    card.style.transformOrigin = Math.round(D.left - S.left + D.width * 6 / 40) + 'px ' + Math.round(D.top - S.top + D.height * 27 / 32) + 'px';
  }

  function runHero() {
    hTimers.forEach(clearTimeout); hTimers = [];
    if (reduce()) { setTyped(99, 3); stage(10); startChat(); return; }
    setTyped(0, 0);
    const T = (ms, fn) => hTimers.push(setTimeout(fn, ms));
    let t = 500;
    for (let i = 1; i <= NA; i++) { const n = i; T(t, () => setTyped(n, 0)); t += 55; }
    T(t, () => setTyped(NA, 1)); t += 560;
    for (let i = NA + 1; i <= NZ; i++) { const n = i; T(t, () => setTyped(n, 2)); t += 80; }
    t += 120; T(t, () => { setTyped(NZ, 3); measure(); stage(3); }); t += 1000;
    T(t, () => {
      stage(4);
      wavePath.style.opacity = 1;
      wavePath.style.transition = 'stroke-dashoffset 1.05s cubic-bezier(.4,0,.3,1), opacity .4s ease';
      wavePath.style.strokeDashoffset = 0;
    }); t += 1050;
    T(t, () => {
      stage(5);
      wavePath.style.transition = 'stroke-dashoffset 3s cubic-bezier(.42,0,.38,1), opacity .4s ease';
      wavePath.style.strokeDashoffset = -1;
    }); t += 2150;
    T(t, () => stage(6)); t += 1500;
    T(t, () => { stage(7); wavePath.style.opacity = 0; }); t += 380;
    T(t, () => measureDot()); t += 40;
    T(t, () => stage(8)); t += 1050;
    T(t, () => stage(9)); t += 760;
    T(t, () => { stage(10); startChat(); });
  }

  const list = $('#clist'), body = $('#cbody'), statusEl = $('#cstatus'), prog = $('#cprog'), replayBtn = $('#creplay');
  let run = 0, timers = [], typingEl = null, goal = null, msgCount = 0;
  const wait = (ms, r) => new Promise(res => timers.push(setTimeout(() => res(r === run), reduce() ? 0 : ms)));
  const scrollDown = () => { body.scrollTop = body.scrollHeight; };
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  const clearExtras = () => list.querySelectorAll('.opts,.endbox').forEach(n => n.remove());

  function bubble(from, parts) {
    const b = el('p', 'bub bub--' + from);
    parts.forEach(p => {
      if (typeof p === 'string') b.appendChild(document.createTextNode(p));
      else { const s = el('b', null, p[0]); if (p[1]) s.style.color = p[1]; b.appendChild(s); }
    });
    list.appendChild(b); msgCount++;
    replayBtn.hidden = msgCount <= 3;
    scrollDown();
  }
  function setTyping(on) {
    statusEl.textContent = on ? t.typing : t.online;
    if (on && !typingEl) {
      typingEl = el('div', 'typing'); typingEl.setAttribute('aria-label', t.typingA);
      typingEl.append(el('span'), el('span'), el('span')); list.appendChild(typingEl); scrollDown();
    } else if (!on && typingEl) { typingEl.remove(); typingEl = null; }
  }
  async function luis(lines, r) {
    for (const parts of lines) {
      setTyping(true);
      if (!(await wait(950, r))) return false;
      setTyping(false); bubble('luis', parts);
      if (!(await wait(350, r))) return false;
    }
    return true;
  }
  function me(text) { bubble('me', [text]); }
  function setProgress(stageN) {
    [...prog.children].forEach((s, i) => s.classList.toggle('on', stageN >= i + 1));
    prog.setAttribute('aria-label', t.step(Math.min(stageN + 1, 4)));
  }
  function ask(opts) {
    clearExtras();
    const g = el('div', 'opts'); g.setAttribute('role', 'group'); g.setAttribute('aria-label', t.choose);
    opts.forEach(o => { const b = el('button', 'chip', o.text); b.type = 'button'; b.addEventListener('click', () => { g.remove(); o.pick(); }); g.appendChild(b); });
    list.appendChild(g); scrollDown();
  }

  const G1 = '#9FD9B4', G2 = '#F2C9A6';
  const CH = {
    es: {
      intro: [['¡Enhorabuena!… aunque creo que querías decir ', ['«me da vergüenza»'], '. ', ['Embarazada'], ' = incinta.'],
              ['Les pasa a muchos italianos. Ahora tú: ¿cómo dirías ', ['«ieri sono uscita con gli amici»'], '?']],
      q1ok: [[['¡Perfecto! ', G1], 'Con «ayer» va el indefinido, y uscire es ', ['salir'], ', no subir.'], ['Otra: tu mejor amiga ha aprobado el examen. ¿Qué le dices?']],
      q1subi: [['Casi. ', G2], '«Subir» es salire. ¿Cuál es el verbo de uscire? Prueba otra vez.'],
      q1he: [['Muy italiano. ', G2], 'Con «ayer» el español no usa el pretérito perfecto. Prueba otra vez.'],
      q2ok: [[['¡Muy bien! ', G1], 'Dos de dos: tienes buen oído.'], ['Cuéntame, ¿para qué quieres el español?']],
      q2ko: [['Ojo, ', G2], '«para» es finalidad o destino. La causa de la alegría va con otra preposición. ¿Otra vez?'],
      goals: [['Hablar con soltura', 'Entonces hablaremos desde el primer minuto, con temas que te interesen de verdad.'],
              ['Aprobar el DELE o el SIELE', 'Perfecto: preparamos las cuatro pruebas con simulacros y estrategias de examen.'],
              ['Usarlo en el trabajo', 'Genial: emails, reuniones y llamadas, con el vocabulario de tu sector.'],
              ['Empezar desde cero', '¡Me encanta! Vamos paso a paso y sin agobios.']],
      offer: ['¿Te reservo una ', ['clase de prueba gratis de 30 minutos'], '? Nos conocemos y te preparo un plan a tu medida.'],
      yes: '¡Sí, quiero mi clase gratis!', no: 'Antes, el test de nivel',
      yesR: '¡Genial! Te he dejado el mensaje preparado: escríbeme por WhatsApp y elegimos día y hora.',
      wa: 'Hola, Luis. Quiero reservar mi clase de prueba gratis de 30 minutos.', waGoal: ' Mi objetivo: ',
      waBtn: 'Reservar mi clase gratis por WhatsApp →', waSmall: '30 minutos · sin compromiso · eliges tú el día',
      noR: '¡Claro! Son 20 preguntas, unos 10 minutos. Y la clase gratis te espera cuando quieras.',
      testBtn: 'Hacer el test de nivel →', rather: 'Mejor reservo la clase gratis'
    },
    it: {
      intro: [['Congratulazioni!… anche se credo che volessi dire ', ['«me da vergüenza»'], '. ', ['Embarazada'], ' = incinta.'],
              ['Succede a tanti italiani. Ora tocca a te: come diresti ', ['«ieri sono uscita con gli amici»'], '?']],
      q1ok: [[['Perfetto! ', G1], 'Con «ayer» si usa l’indefinido, e uscire si dice ', ['salir'], ', non subir.'], ['Un’altra: la tua migliore amica ha superato l’esame. Cosa le dici?']],
      q1subi: [['Quasi. ', G2], '«Subir» vuol dire salire. Qual è il verbo per uscire? Riprova.'],
      q1he: [['Molto italiano. ', G2], 'Con «ayer» lo spagnolo non usa il pretérito perfecto. Riprova.'],
      q2ok: [[['Bravissima! ', G1], 'Due su due: hai un buon orecchio.'], ['Raccontami, a cosa ti serve lo spagnolo?']],
      q2ko: [['Attenzione: ', G2], '«para» indica scopo o destinazione. La causa della gioia vuole un’altra preposizione. Riprovi?'],
      goals: [['Parlare con scioltezza', 'Allora parleremo dal primo minuto, di argomenti che ti interessano davvero.'],
              ['Superare il DELE o il SIELE', 'Perfetto: prepariamo le quattro prove con simulazioni e strategie d’esame.'],
              ['Usarlo al lavoro', 'Ottimo: email, riunioni e telefonate, con il lessico del tuo settore.'],
              ['Iniziare da zero', 'Mi piace! Andiamo passo dopo passo, senza ansia.']],
      offer: ['Ti prenoto una ', ['lezione di prova gratuita di 30 minuti'], '? Ci conosciamo e ti preparo un piano su misura.'],
      yes: 'Sì, voglio la mia lezione gratis!', no: 'Prima il test di livello',
      yesR: 'Perfetto! Ti ho preparato il messaggio: scrivimi su WhatsApp e scegliamo giorno e ora.',
      wa: 'Ciao Luis, vorrei prenotare la mia lezione di prova gratuita di 30 minuti.', waGoal: ' Il mio obiettivo: ',
      waBtn: 'Prenota la lezione gratis su WhatsApp →', waSmall: '30 minuti · senza impegno · scegli tu il giorno',
      noR: 'Certo! Sono 20 domande, circa 10 minuti. E la lezione gratis ti aspetta quando vuoi.',
      testBtn: 'Fai il test di livello →', rather: 'Meglio prenotare la lezione gratis'
    },
    en: {
      intro: [['Congratulations!… although I think you meant ', ['«me da vergüenza»'], '. ', ['Embarazada'], ' = pregnant, not embarrassed.'],
              ['It happens to lots of learners. Your turn: how would you say ', ['«yesterday I went out with my friends»'], '?']],
      q1ok: [[['Perfect! ', G1], 'With «ayer» you use the indefinido, and “to go out” is ', ['salir'], ', not subir.'], ['Another one: your best friend has passed her exam. What do you say?']],
      q1subi: [['Almost. ', G2], '«Subir» means “to go up”. What’s the verb for “to go out”? Try again.'],
      q1he: [['Close. ', G2], 'With «ayer», Spanish doesn’t use the pretérito perfecto. Try again.'],
      q2ok: [[['Well done! ', G1], 'Two out of two: you have a good ear.'], ['Tell me, what do you want Spanish for?']],
      q2ko: [['Careful: ', G2], '«para» is for purpose or destination. The reason you’re happy takes another preposition. Try again?'],
      goals: [['Speak fluently', 'Then we’ll speak from the very first minute, about topics you really care about.'],
              ['Pass the DELE or SIELE', 'Perfect: we’ll prepare all four papers with mock exams and exam strategies.'],
              ['Use it at work', 'Great: emails, meetings and calls, with the vocabulary of your field.'],
              ['Start from scratch', 'I love that! Step by step, with no stress.']],
      offer: ['Shall I book you a ', ['free 30-minute trial lesson'], '? We get to know each other and I prepare a plan made for you.'],
      yes: 'Yes, I want my free lesson!', no: 'The level test first',
      yesR: 'Great! I’ve prepared the message for you: text me on WhatsApp and we’ll pick a day and time.',
      wa: 'Hi Luis, I’d like to book my free 30-minute trial lesson.', waGoal: ' My goal: ',
      waBtn: 'Book my free lesson on WhatsApp →', waSmall: '30 minutes · no commitment · you choose the day',
      noR: 'Of course! It’s 20 questions, about 10 minutes. And the free lesson will be waiting whenever you like.',
      testBtn: 'Take the level test →', rather: 'I’d rather book the free lesson'
    }
  };
  const c = CH[LANG] || CH.es;

  async function startChat() {
    timers.forEach(clearTimeout); timers = [];
    const r = ++run;
    list.querySelectorAll('.bub,.typing,.opts,.endbox').forEach(n => n.remove());
    typingEl = null; goal = null; msgCount = 0; replayBtn.hidden = true; setProgress(0); statusEl.textContent = t.online;
    if (!(await wait(700, r))) return;
    me('Hola, Luis. Estoy muy embarazada por mi español…');
    if (!(await luis(c.intro, r))) return;
    q1([]);
  }
  function q1(tried) {
    const all = [
      { id: 'sali', text: 'Ayer salí con mis amigos' },
      { id: 'subi', text: 'Ayer subí con mis amigos' },
      { id: 'he', text: 'Ayer he salido con mis amigos' }
    ].filter(o => !tried.includes(o.id));
    ask(all.map(o => ({ text: o.text, pick: () => answerQ1(o, tried) })));
  }
  async function answerQ1(o, tried) {
    const r = run; me(o.text);
    if (o.id === 'sali') {
      setProgress(1);
      if (!(await luis(c.q1ok, r))) return;
      q2([]);
    } else {
      if (!(await luis([o.id === 'subi' ? c.q1subi : c.q1he], r))) return;
      q1(tried.concat([o.id]));
    }
  }
  function q2(tried) {
    const all = [
      { id: 'por', text: '¡Me alegro mucho por ti!' },
      { id: 'para', text: '¡Me alegro mucho para ti!' }
    ].filter(o => !tried.includes(o.id));
    ask(all.map(o => ({ text: o.text, pick: () => answerQ2(o, tried) })));
  }
  async function answerQ2(o, tried) {
    const r = run; me(o.text);
    if (o.id === 'por') {
      setProgress(2);
      if (!(await luis(c.q2ok, r))) return;
      qGoal();
    } else {
      if (!(await luis([c.q2ko], r))) return;
      q2(tried.concat([o.id]));
    }
  }
  function qGoal() {
    ask(c.goals.map(([text, reply]) => ({ text, pick: () => answerGoal({ text, reply }) })));
  }
  async function answerGoal(g) {
    const r = run; goal = g.text; setProgress(3); me(g.text);
    if (!(await luis([[g.reply], c.offer], r))) return;
    ask([{ text: c.yes, pick: () => book(true) }, { text: c.no, pick: () => book(false) }]);
  }
  async function book(yes) {
    const r = run; clearExtras();
    me(yes ? c.yes : c.no);
    const box = el('div', 'endbox');
    if (yes) {
      setProgress(4);
      if (!(await luis([[c.yesR]], r))) return;
      const txt = c.wa + (goal ? c.waGoal + goal.toLowerCase() + '.' : '');
      const a = el('a', 'cta cta--sm', c.waBtn);
      a.href = WA + encodeURIComponent(txt); a.target = '_blank'; a.rel = 'noopener';
      box.append(a, el('small', null, c.waSmall));
    } else {
      if (!(await luis([[c.noR]], r))) return;
      const a = el('a', 'chip', c.testBtn); a.href = 'test.html';
      const b = el('button', 'ghost linkbtn', c.rather); b.type = 'button';
      b.addEventListener('click', () => book(true));
      box.append(a, b);
    }
    list.appendChild(box); scrollDown();
  }
  replayBtn.addEventListener('click', startChat);

  const go = () => runHero();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else window.addEventListener('load', go);
})();
