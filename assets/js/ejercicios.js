(() => {
  'use strict';
  const LANG = ((document.documentElement.lang || 'es').slice(0, 2).toLowerCase());
  const I = {
    es: { choose: 'Elige la respuesta', next: 'Siguiente →', see: 'Ver resultado →', result: 'Resultado', again: 'Repetir los ejercicios ↺',
      wa: 'Hola, Luis. He hecho los ejercicios de tu web y me gustaría reservar mi clase de prueba gratis.', waBtn: 'Practicarlo hablando, en una clase gratis',
      count: (a, b) => 'Ejercicio ' + a + ' de ' + b, of: (a, b) => a + ' de ' + b, ok: '¡Muy bien!', ko: 'Casi.', done: 'Completado',
      msg: ['¡Perfecto! Lo tienes muy claro.', '¡Muy bien! Casi lo dominas.', 'Vas por buen camino: repasa la regla y vuelve a intentarlo.', 'Es normal al principio: lee otra vez la regla y prueba de nuevo.'] },
    it: { choose: 'Scegli la risposta', next: 'Avanti →', see: 'Vedi il risultato →', result: 'Risultato', again: 'Ripeti gli esercizi ↺',
      wa: 'Ciao Luis, ho fatto gli esercizi sul tuo sito e vorrei prenotare la mia lezione di prova gratuita.', waBtn: 'Mettilo in pratica parlando, in una lezione gratis',
      count: (a, b) => 'Esercizio ' + a + ' di ' + b, of: (a, b) => a + ' su ' + b, ok: 'Bravissimo!', ko: 'Quasi.', done: 'Completato',
      msg: ['Perfetto! Ce l’hai chiarissimo.', 'Molto bene! Ci sei quasi.', 'Sei sulla buona strada: ripassa la regola e riprova.', 'All’inizio è normale: rileggi la regola e riprova.'] },
    en: { choose: 'Choose the answer', next: 'Next →', see: 'See my result →', result: 'Result', again: 'Do the exercises again ↺',
      wa: 'Hi Luis, I’ve done the exercises on your website and I’d like to book my free trial lesson.', waBtn: 'Practise it by speaking, in a free lesson',
      count: (a, b) => 'Exercise ' + a + ' of ' + b, of: (a, b) => a + ' of ' + b, ok: 'Well done!', ko: 'Almost.', done: 'Completed',
      msg: ['Perfect! You’ve really got it.', 'Very good! You’ve nearly mastered it.', 'You’re on the right track: review the rule and try again.', 'That’s normal at first: read the rule again and have another go.'] }
  };
  const t = I[LANG] || I.es;

  document.querySelectorAll('[data-ejercicios]').forEach(init);

  function init(root) {
    const src = document.getElementById(root.getAttribute('data-ejercicios'));
    if (!src) return;
    const Q = JSON.parse(src.textContent);
    const $ = (s) => root.querySelector(s);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0, ok = 0, answered = false;

    root.innerHTML = `
      <div class="q-top">
        <span class="q-count" aria-live="polite"></span>
        <svg class="q-prog" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true"><path class="q-prog-bg" pathLength="1" d="M4 12 C 60 2, 110 2, 166 12 S 272 22, 333 12 S 439 2, 500 12 S 606 22, 666 12 S 772 2, 833 12 S 939 22, 996 12"/><path class="q-prog-fg" pathLength="1" d="M4 12 C 60 2, 110 2, 166 12 S 272 22, 333 12 S 439 2, 500 12 S 606 22, 666 12 S 772 2, 833 12 S 939 22, 996 12"/></svg>
      </div>
      <div class="ex-run">
        <p class="q-text ex-text" tabindex="-1"></p>
        <div class="q-opts ex-opts" role="group" aria-label="${t.choose}"></div>
        <div class="ex-fb" aria-live="polite" hidden></div>
        <div class="ex-nav"><button type="button" class="cta cta--sm ex-next" hidden>${t.next}</button></div>
      </div>
      <div class="ex-end" hidden>
        <p class="res-kicker">${t.result}</p>
        <p class="h2 ex-score" tabindex="-1"></p>
        <p class="ex-msg"></p>
        <div class="res-actions">
          <button type="button" class="btn-line ex-again">${t.again}</button>
          <a class="more" href="https://wa.me/393669050198?text=${encodeURIComponent(t.wa)}" target="_blank" rel="noopener">${t.waBtn} <span aria-hidden="true">→</span></a>
        </div>
      </div>`;

    function sentence(el, t, fill, good) {
      el.textContent = '';
      const [a, b] = t.split('___');
      el.append(document.createTextNode(a));
      const g = document.createElement('span');
      g.className = 'q-gap' + (fill ? ' q-gap--on' : '') + (good === true ? ' is-ok' : good === false ? ' is-ko' : '');
      g.textContent = fill || ' ';
      el.append(g, document.createTextNode(b || ''));
    }

    function render() {
      answered = false;
      const q = Q[i];
      $('.q-count').textContent = t.count(i + 1, Q.length);
      $('.q-prog-fg').style.strokeDashoffset = String(1 - i / Q.length);
      sentence($('.ex-text'), q.t, '');
      const box = $('.ex-opts'); box.textContent = '';
      q.o.forEach((label, k) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'q-opt'; b.textContent = label;
        b.addEventListener('click', () => pick(k, b));
        box.appendChild(b);
      });
      $('.ex-fb').hidden = true; $('.ex-next').hidden = true;
      root.classList.remove('q-in'); void root.offsetWidth; root.classList.add('q-in');
    }

    function pick(k, btn) {
      if (answered) return; answered = true;
      const q = Q[i], good = k === q.a;
      if (good) ok++;
      [...$('.ex-opts').children].forEach((c, n) => {
        c.disabled = true;
        if (n === q.a) c.classList.add('is-ok');
        else if (c === btn) c.classList.add('is-ko');
      });
      sentence($('.ex-text'), q.t, q.o[q.a], good);
      const fb = $('.ex-fb');
      fb.className = 'ex-fb ' + (good ? 'ex-fb--ok' : 'ex-fb--ko');
      fb.innerHTML = '<b>' + (good ? t.ok : t.ko) + '</b> ' + q.e;
      fb.hidden = false;
      const nx = $('.ex-next');
      nx.textContent = i < Q.length - 1 ? t.next : t.see;
      nx.hidden = false; nx.focus({ preventScroll: true });
    }

    function end() {
      $('.q-prog-fg').style.strokeDashoffset = '0';
      $('.ex-run').hidden = true; $('.ex-end').hidden = false;
      $('.q-count').textContent = t.done;
      $('.ex-score').innerHTML = t.of(ok, Q.length) + '<span class="p">.</span>';
      const r = ok / Q.length;
      $('.ex-msg').textContent = t.msg[r === 1 ? 0 : r >= 0.75 ? 1 : r >= 0.5 ? 2 : 3];
      root.classList.remove('q-in'); void root.offsetWidth; root.classList.add('q-in');
      $('.ex-score').focus({ preventScroll: true });
    }

    $('.ex-next').addEventListener('click', () => {
      if (i < Q.length - 1) { i++; render(); $('.ex-text').focus({ preventScroll: true }); }
      else end();
    });
    $('.ex-again').addEventListener('click', () => {
      i = 0; ok = 0; $('.ex-run').hidden = false; $('.ex-end').hidden = true; render();
      root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
    render();
  }
})();
