(() => {
  'use strict';
  const LANG = ((document.documentElement.lang || 'es').slice(0, 2).toLowerCase());
  const TX = {
    es: { dk: 'No lo sé', gap: 'hueco', count: (a, b) => 'Pregunta ' + a + ' de ' + b, starting: 'estás empezando', first: 'Estás dando tus primeros pasos en español.',
      score: (a, b) => a + ' de ' + b + ' respuestas correctas', of: (a, b) => a + ' de ' + b, yours: 'tu nivel',
      wa: (l, s) => 'Hola, Luis. He hecho el test de nivel en tu web: mi resultado es ' + l + ' (' + s + '). Me gustaría reservar mi clase de prueba gratis.',
      show: 'Ver mis respuestas', hide: 'Ocultar mis respuestas', right: 'Correcta', your: 'Tu respuesta:' },
    it: { dk: 'Non lo so', gap: 'spazio vuoto', count: (a, b) => 'Domanda ' + a + ' di ' + b, starting: 'stai iniziando', first: 'Stai muovendo i primi passi in spagnolo.',
      score: (a, b) => a + ' risposte corrette su ' + b, of: (a, b) => a + ' su ' + b, yours: 'il tuo livello',
      wa: (l, s) => 'Ciao Luis, ho fatto il test di livello sul tuo sito: il mio risultato è ' + l + ' (' + s + '). Vorrei prenotare la mia lezione di prova gratuita.',
      show: 'Vedi le mie risposte', hide: 'Nascondi le mie risposte', right: 'Corretta', your: 'La tua risposta:',
      desc: { A1: 'Ti presenti e te la cavi nelle situazioni di base.', A2: 'Parli della tua vita quotidiana e racconti cosa hai fatto.', B1: 'Te la cavi in viaggio e dai la tua opinione.', B2: 'Conversi con scioltezza su quasi ogni argomento.', C1: 'Ti esprimi con precisione al lavoro e nello studio.', C2: 'Parli con sfumature, quasi come un madrelingua.' },
      next: { START: 'Partiamo dalla base, passo dopo passo e senza ansia. Nella lezione di prova vediamo da dove cominciare.', A1: 'Il tuo prossimo obiettivo è l’A2: parlare della vita quotidiana e del passato con sicurezza.', A2: 'Il tuo prossimo obiettivo è il B1: raccontare esperienze e dare la tua opinione senza bloccarti.', B1: 'Il tuo prossimo obiettivo è il B2: guadagnare scioltezza e padroneggiare il congiuntivo.', B2: 'Il tuo prossimo obiettivo è il C1: precisione, sfumature e uno spagnolo più naturale.', C1: 'Il tuo prossimo obiettivo è il C2: espressioni, registro e le ultime sfumature.', C2: 'Complimenti! Possiamo lavorare sul registro, sulla cultura o preparare il DELE C2.' } },
    en: { dk: 'I don’t know', gap: 'blank', count: (a, b) => 'Question ' + a + ' of ' + b, starting: 'just starting', first: 'You’re taking your first steps in Spanish.',
      score: (a, b) => a + ' of ' + b + ' answers correct', of: (a, b) => a + ' of ' + b, yours: 'your level',
      wa: (l, s) => 'Hi Luis, I’ve taken the level test on your website: my result is ' + l + ' (' + s + '). I’d like to book my free trial lesson.',
      show: 'See my answers', hide: 'Hide my answers', right: 'Correct', your: 'Your answer:',
      desc: { A1: 'You can introduce yourself and handle basic situations.', A2: 'You talk about your daily life and what you’ve done.', B1: 'You get by when travelling and give your opinion.', B2: 'You talk fluently about almost any topic.', C1: 'You express yourself precisely at work and in your studies.', C2: 'You speak with nuance, almost like a native.' },
      next: { START: 'We start from the basics, step by step and with no stress. In the trial lesson we’ll see where to begin.', A1: 'Your next goal is A2: talking confidently about your daily life and the past.', A2: 'Your next goal is B1: telling stories and giving your opinion without freezing.', B1: 'Your next goal is B2: gaining fluency and mastering the subjunctive.', B2: 'Your next goal is C1: precision, nuance and more natural Spanish.', C1: 'Your next goal is C2: idioms, register and the finest nuances.', C2: 'Congratulations! We can work on register and culture, or prepare the DELE C2.' } }
  };

  const $ = (s) => document.querySelector(s);
  const quiz = $('#quiz'); if (!quiz) return;

  const Q = [
    { l: 'A1', t: 'Hola, ___ Marta. ¿Y tú?', o: ['me llamo', 'soy llamo', 'me llama', 'llamo me'], a: 0 },
    { l: 'A1', t: 'Mis padres ___ en Roma.', o: ['vive', 'viven', 'vivimos', 'vivís'], a: 1 },
    { l: 'A1', t: '¿___ años tienes?', o: ['Cuántos', 'Cuántas', 'Qué', 'Cuál'], a: 0 },
    { l: 'A2', t: 'Ayer ___ al cine con mis amigos.', o: ['he ido', 'fui', 'iba', 'voy'], a: 1 },
    { l: 'A2', t: 'Mi hermano ___ muy cansado hoy.', o: ['es', 'está', 'hay', 'tiene'], a: 1 },
    { l: 'A2', t: '—¿Te gusta el chocolate? —Sí, ___ encanta.', o: ['me', 'te', 'le', 'lo'], a: 0 },
    { l: 'A2', t: 'Cuando era pequeño, ___ al fútbol todos los días.', o: ['jugué', 'jugaba', 'he jugado', 'juego'], a: 1 },
    { l: 'B1', t: 'Gracias ___ tu ayuda.', o: ['por', 'para', 'de', 'a'], a: 0 },
    { l: 'B1', t: 'Espero que ___ un buen viaje.', o: ['tienes', 'tengas', 'tendrás', 'tenías'], a: 1 },
    { l: 'B1', t: 'Me da ___ hablar en público.', o: ['vergüenza', 'embarazo', 'imbarazo', 'burro'], a: 0 },
    { l: 'B1', t: 'Si tengo tiempo, ___ a verte mañana.', o: ['iré', 'iría', 'fuera', 'vaya'], a: 0 },
    { l: 'B2', t: 'Si ___ más dinero, viajaría por todo el mundo.', o: ['tengo', 'tendría', 'tuviera', 'tenga'], a: 2 },
    { l: 'B2', t: 'No creo que Juan ___ razón.', o: ['tiene', 'tenga', 'tendrá', 'tuvo'], a: 1 },
    { l: 'B2', t: 'Llevo tres años ___ español.', o: ['estudiar', 'estudiando', 'estudiado', 'estudio'], a: 1 },
    { l: 'B2', t: 'Te lo digo ___ que no te preocupes.', o: ['para', 'por', 'porque', 'a'], a: 0 },
    { l: 'C1', t: 'Ojalá ___ venido a la fiesta ayer.', o: ['hubieras', 'habías', 'hayas', 'habrías'], a: 0 },
    { l: 'C1', t: 'No es que no ___, es que no puedo.', o: ['quiero', 'quiera', 'querría', 'quise'], a: 1 },
    { l: 'C1', t: 'De ___ sabido, no habría venido.', o: ['haberlo', 'haber', 'habiendo', 'haberse'], a: 0 },
    { l: 'C2', t: 'Ese examen fue pan ___: lo aprobé sin problemas.', o: ['comido', 'cocido', 'tostado', 'duro'], a: 0 },
    { l: 'C2', t: 'Cuando le dieron la noticia, se quedó de ___.', o: ['piedra', 'roca', 'plomo', 'cemento'], a: 0 }
  ];
  const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const NEED = { A1: 2, A2: 3, B1: 3, B2: 3, C1: 2, C2: 2 };
  const DESC_ES = {
    A1: 'Te presentas y resuelves situaciones básicas.',
    A2: 'Hablas de tu día a día y cuentas lo que has hecho.',
    B1: 'Te desenvuelves de viaje y das tu opinión.',
    B2: 'Conversas con fluidez sobre casi cualquier tema.',
    C1: 'Te expresas con precisión en el trabajo y los estudios.',
    C2: 'Hablas con matices, casi como un nativo.'
  };
  const NEXT_ES = {
    START: 'Empezamos desde la base, paso a paso y sin agobios. En la clase de prueba vemos por dónde empezar.',
    A1: 'Tu siguiente objetivo es el A2: hablar de tu día a día y del pasado con seguridad.',
    A2: 'Tu siguiente objetivo es el B1: contar experiencias y dar tu opinión sin bloquearte.',
    B1: 'Tu siguiente objetivo es el B2: ganar fluidez y dominar el subjuntivo.',
    B2: 'Tu siguiente objetivo es el C1: precisión, matices y un español más natural.',
    C1: 'Tu siguiente objetivo es el C2: expresiones, registro y los últimos matices.',
    C2: '¡Enhorabuena! Podemos trabajar el registro, la cultura o preparar el DELE C2.'
  };
  const DESC = (TX[LANG] || TX.es).desc || DESC_ES, NEXT = (TX[LANG] || TX.es).next || NEXT_ES;
  const t = TX[LANG] || TX.es;
  const DONTKNOW = t.dk;

  const S = { i: 0, ans: new Array(Q.length).fill(null) };
  const scr = { intro: $('#qIntro'), run: $('#qRun'), res: $('#qResult') };
  const show = (k) => Object.entries(scr).forEach(([n, el]) => { el.hidden = n !== k; });
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function sentence(el, txt, fill) {
    el.textContent = '';
    const [a, b] = txt.split('___');
    el.append(document.createTextNode(a));
    const gap = document.createElement('span'); gap.className = 'q-gap' + (fill ? ' q-gap--on' : '');
    gap.textContent = fill || ' '; gap.setAttribute('aria-label', fill ? fill : t.gap);
    el.append(gap, document.createTextNode(b || ''));
  }

  function render(focus = true) {
    const q = Q[S.i];
    $('#qCount').textContent = t.count(S.i + 1, Q.length);
    $('#qProg').style.strokeDashoffset = String(1 - (S.i) / Q.length);
    const txt = $('#qText');
    sentence(txt, q.t, S.ans[S.i] != null && S.ans[S.i] >= 0 ? q.o[S.ans[S.i]] : '');
    const box = $('#qOpts'); box.textContent = '';
    q.o.concat([DONTKNOW]).forEach((label, k) => {
      const idx = k < q.o.length ? k : -1;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'q-opt' + (idx === -1 ? ' q-opt--dk' : '');
      b.textContent = label;
      b.setAttribute('aria-pressed', String(S.ans[S.i] === idx));
      b.addEventListener('click', () => pick(idx, b));
      box.appendChild(b);
    });
    $('#qBack').disabled = S.i === 0;
    quiz.classList.remove('q-in'); void quiz.offsetWidth; quiz.classList.add('q-in');
    if (focus) txt.focus({ preventScroll: true });
  }

  let lock = false;
  function pick(idx, btn) {
    if (lock) return; lock = true;
    S.ans[S.i] = idx;
    [...$('#qOpts').children].forEach(c => c.setAttribute('aria-pressed', String(c === btn)));
    if (idx >= 0) sentence($('#qText'), Q[S.i].t, Q[S.i].o[idx]);
    setTimeout(() => {
      lock = false;
      if (S.i < Q.length - 1) { S.i++; render(); }
      else result();
    }, reduce ? 60 : 420);
  }

  function result() {
    $('#qProg').style.strokeDashoffset = '0';
    const per = {}; LEVELS.forEach(l => per[l] = { ok: 0, n: 0 });
    Q.forEach((q, k) => { per[q.l].n++; if (S.ans[k] === q.a) per[q.l].ok++; });
    let level = null;
    for (const l of LEVELS) { if (per[l].ok >= NEED[l]) level = l; else break; }
    const total = Q.reduce((s, q, k) => s + (S.ans[k] === q.a ? 1 : 0), 0);
    const shown = level || 'A1';
    $('#rLevel').textContent = shown;
    $('#rTitle').innerHTML = shown + (level ? '' : ' <small>· ' + t.starting + '</small>') + '<span class="p">.</span>';
    $('#rDesc').textContent = level ? DESC[level] : t.first;
    $('#rScore').textContent = t.score(total, Q.length);
    $('#rNext').textContent = NEXT[level || 'START'];

    const sc = $('#rScale'); sc.textContent = '';
    LEVELS.forEach((l, k) => {
      const li = document.createElement('li');
      li.style.setProperty('--i', k);
      li.style.setProperty('--p', per[l].ok / per[l].n);
      if (l === shown) li.className = 'is-you';
      li.innerHTML = '<span class="bar"><i></i></span><b>' + l + '</b><small>' + per[l].ok + '/' + per[l].n + '</small>';
      li.setAttribute('aria-label', l + ': ' + t.of(per[l].ok, per[l].n) + (l === shown ? ' (' + t.yours + ')' : ''));
      sc.appendChild(li);
    });

    const msg = t.wa(shown, total + '/' + Q.length);
    $('#rWa').href = 'https://wa.me/393669050198?text=' + encodeURIComponent(msg);

    const list = $('#rList'); list.textContent = ''; list.hidden = true;
    $('#rReview').setAttribute('aria-expanded', 'false'); $('#rReview').textContent = t.show;
    Q.forEach((q, k) => {
      const li = document.createElement('li');
      const ok = S.ans[k] === q.a;
      li.className = ok ? 'ok' : 'ko';
      const yours = S.ans[k] == null || S.ans[k] < 0 ? DONTKNOW : q.o[S.ans[k]];
      li.innerHTML = '<span class="rl">' + q.l + '</span><p>' + q.t.replace('___', '<b>' + q.o[q.a] + '</b>') + '</p>' +
        (ok ? '<small>✓ ' + t.right + '</small>' : '<small>' + t.your + ' <s>' + yours + '</s></small>');
      list.appendChild(li);
    });

    show('res');
    quiz.classList.remove('q-in'); void quiz.offsetWidth; quiz.classList.add('q-in');
    $('#rTitle').focus({ preventScroll: true });
    quiz.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  $('#qStart').addEventListener('click', () => { S.i = 0; S.ans.fill(null); show('run'); render(); quiz.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); });
  $('#qBack').addEventListener('click', () => { if (S.i > 0) { S.i--; render(); } });
  $('#rAgain').addEventListener('click', () => { S.i = 0; S.ans.fill(null); show('run'); render(); });
  $('#rReview').addEventListener('click', (e) => {
    const l = $('#rList'); l.hidden = !l.hidden;
    e.currentTarget.setAttribute('aria-expanded', String(!l.hidden));
    e.currentTarget.textContent = l.hidden ? t.show : t.hide;
  });
})();
