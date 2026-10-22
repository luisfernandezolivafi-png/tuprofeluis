(() => {
  'use strict';
  const LANG = ((document.documentElement.lang || 'es').slice(0, 2).toLowerCase());

  const TX = {
    es: { round: (a, b) => 'Ronda ' + a + ' de ' + b, streak: (n) => '¡' + n + ' seguidas!', ok: '¡Correcto!', ko: 'Casi.',
      is: (m, c) => '<em>' + m + '</em> es un marcador <b>' + c.toLowerCase() + '</b>:', next: 'Siguiente →', see: 'Ver resultado →', over: 'Partida terminada',
      of: (a, b) => a + ' de ' + b, msg: ['¡Nivel experto! ', '¡Muy bien! ', 'Buen trabajo. ', 'Sigue practicando. '],
      best: (n) => 'Tu mejor racha: ' + n + (n === 1 ? ' acierto seguido.' : ' aciertos seguidos.'),
      hits: 'Aciertos', hitsL: 'aciertos', q: '¿Qué función tiene este marcador?', choose: 'Elige la función', result: 'Resultado', again: 'Jugar otra vez ↺', cta: 'Conviértelo en fluidez, en clase', url: 'clases.html' },
    it: { round: (a, b) => 'Round ' + a + ' di ' + b, streak: (n) => n + ' di fila!', ok: 'Giusto!', ko: 'Quasi.',
      is: (m, c) => '<em>' + m + '</em> appartiene ai <b>' + c + '</b>:', next: 'Avanti →', see: 'Vedi il risultato →', over: 'Partita finita',
      of: (a, b) => a + ' su ' + b, msg: ['Livello esperto! ', 'Molto bene! ', 'Buon lavoro. ', 'Continua ad allenarti. '],
      best: (n) => 'La tua serie migliore: ' + n + (n === 1 ? ' risposta giusta di fila.' : ' risposte giuste di fila.'),
      hits: 'Risposte giuste', hitsL: 'giuste', q: 'Che funzione ha questo marcatore?', choose: 'Scegli la funzione', result: 'Risultato', again: 'Gioca ancora ↺', cta: 'Trasformalo in scioltezza, a lezione', url: 'lezioni.html',
      f: ['Ordinano le parti del discorso.', 'Aggiungono informazioni nella stessa direzione argomentativa.', 'Introducono un’idea che si oppone a quella precedente o la limita.', 'Ammettono un’obiezione che non impedisce quanto affermato.', 'Presentano una conseguenza di quanto detto.', 'Spiegano la causa o il motivo.', 'Chiariscono, correggono o riassumono quanto detto prima.', 'Introducono un esempio che illustra l’idea.', 'Chiudono o ricapitolano il discorso.', 'Esprimono il punto di vista o il grado di certezza.', 'Collocano e mettono in sequenza i fatti nel tempo.', 'Gestiscono l’interazione orale: prendono il turno, chiedono attenzione o sfumano.'] },
    en: { round: (a, b) => 'Round ' + a + ' of ' + b, streak: (n) => n + ' in a row!', ok: 'Correct!', ko: 'Almost.',
      is: (m, c) => '<em>' + m + '</em> belongs to the <b>' + c + '</b>:', next: 'Next →', see: 'See my result →', over: 'Game over',
      of: (a, b) => a + ' of ' + b, msg: ['Expert level! ', 'Very good! ', 'Good job. ', 'Keep practising. '],
      best: (n) => 'Your best streak: ' + n + (n === 1 ? ' right answer in a row.' : ' right answers in a row.'),
      hits: 'Right answers', hitsL: 'right', q: 'What does this marker do?', choose: 'Choose the function', result: 'Result', again: 'Play again ↺', cta: 'Turn it into fluency, in class', url: 'lessons.html',
      f: ['They order the parts of a text or speech.', 'They add information in the same line of argument.', 'They introduce an idea that opposes or limits the previous one.', 'They admit an objection that doesn’t cancel what is said.', 'They present a consequence of what has been said.', 'They explain the cause or reason.', 'They clarify, correct or sum up what came before.', 'They introduce an example that illustrates the idea.', 'They close or sum up the discourse.', 'They express a point of view or a degree of certainty.', 'They place and sequence events in time.', 'They manage spoken interaction: taking the turn, asking for attention or softening.'] }
  };
  const t = TX[LANG] || TX.es;

  const root = document.getElementById('juego'); if (!root) return;
  const DATA = [{"c":"Organizadores","f":"Ordenan las partes del discurso.","i":[["En primer lugar","En primer lugar, conviene aclarar el término."],["En segundo lugar","En segundo lugar, hay que hablar del coste."],["Por un lado / por otro (lado)","Por un lado, es barato; por otro, es incómodo."],["Para empezar","Para empezar, nadie sabía dónde estaba el ataúd."],["A continuación","A continuación, pasamos a la parte práctica."],["Por último","Por último, revisamos el presupuesto."],["Finalmente","Finalmente, el barco se hundió."]]},{"c":"Aditivos","f":"Suman información en la misma dirección argumentativa.","i":[["Además","Es barato y, además, está en el centro."],["Asimismo","Asimismo, se recomienda llegar con antelación."],["Incluso","Lo compartió todo, incluso la billetera."],["Es más","No me gusta; es más, me parece perjudicial."],["Por si fuera poco","Llovía y, por si fuera poco, se fue la luz."],["Encima (coloq.)","Llega tarde y encima se queja."],["Aparte de eso","Aparte de eso, todo salió bien."]]},{"c":"Contraargumentativos","f":"Introducen una idea que se opone o limita a la anterior.","i":[["Sin embargo","Estudió mucho; sin embargo, suspendió."],["No obstante","El plan es bueno. No obstante, es caro."],["En cambio","Yo madrugo; ella, en cambio, duerme como un tronco."],["Por el contrario","No fue una derrota; por el contrario, fue un éxito."],["Aun así","Estaba agotado y, aun así, siguió."],["De todos modos","No sé si vendrá; de todos modos, lo esperamos."],["De todas formas","De todas formas, ya es tarde."],["Con todo","Con todo, el resultado fue positivo."],["Ahora bien","Puedes salir. Ahora bien, vuelve antes de las diez."],["Eso sí","Te lo presto; eso sí, devuélvemelo mañana."]]},{"c":"Concesivos","f":"Admiten una objeción que no impide lo afirmado.","i":[["Aunque","Aunque llueva, saldremos."],["A pesar de (que)","A pesar del frío, fuimos a la playa."],["Si bien","Si bien es caro, merece la pena."],["Por mucho que (+ subj.)","Por mucho que insistas, no iré."],["Aun cuando","Aun cuando lo supiera, no lo diría."]]},{"c":"Consecutivos","f":"Presentan una consecuencia de lo dicho.","i":[["Por lo tanto","No ha estudiado; por lo tanto, no aprobará."],["Por consiguiente","Hubo fraude; por consiguiente, se anuló."],["En consecuencia","Bajaron los recursos y, en consecuencia, las ayudas."],["Así que","Estaba harto, así que se fue."],["De ahí que (+ subj.)","Trabaja mucho; de ahí que esté agobiado."],["Así pues","Así pues, aplazamos la reunión."],["Conque (coloq.)","Ya es tarde, conque date prisa."]]},{"c":"Causales","f":"Explican la causa o el motivo.","i":[["Ya que","No salí, ya que estaba lloviendo."],["Puesto que","Puesto que insistes, te lo cuento."],["Dado que","Dado que vamos justos de tiempo, empecemos."],["Como (al inicio)","Como no llegabas, me fui."],["Debido a (que)","Se canceló debido a la tormenta."],["Gracias a","Gracias a la rehabilitación, volvió a correr."]]},{"c":"Reformuladores","f":"Aclaran, corrigen o resumen lo anterior.","i":[["Es decir","Es un remanso, es decir, un lugar tranquilo."],["O sea","Está apollardado, o sea, atontado."],["Mejor dicho","Vendrá mañana, mejor dicho, pasado."],["Dicho de otro modo","Dicho de otro modo: no hay dinero."],["En otras palabras","En otras palabras, tienes un morro que te lo pisas."],["Esto es","El IVA, esto es, el impuesto."],["Más bien","No es tímido, más bien reservado."]]},{"c":"Ejemplificadores","f":"Introducen un ejemplo que ilustra la idea.","i":[["Por ejemplo","Hay verduras de hoja, por ejemplo, la acelga."],["Pongamos por caso","Pongamos por caso que te pierdes."],["Sin ir más lejos","Sin ir más lejos, ayer me pasó a mí."],["Tal es el caso de","Tal es el caso de los canónigos."]]},{"c":"Conclusivos","f":"Cierran o recapitulan el discurso.","i":[["En resumen","En resumen, fue un día lavadora."],["En definitiva","En definitiva, no merece la pena."],["En conclusión","En conclusión, hay que ahorrar."],["En suma","En suma, un éxito."],["Al fin y al cabo","Al fin y al cabo, es tu decisión."],["A fin de cuentas","A fin de cuentas, todos salimos ganando."],["Total (coloq.)","Total, que nos quedamos en casa."]]},{"c":"Opinión y modalidad","f":"Expresan el punto de vista o el grado de certeza.","i":[["A mi juicio","A mi juicio, es perjudicial."],["Desde mi punto de vista","Desde mi punto de vista, tiene razón."],["A mi modo de ver","A mi modo de ver, falta información."],["Por lo visto","Por lo visto, se quedó frito en el sofá."],["Al parecer","Al parecer, la grúa ya ha llegado."],["Sin duda","Sin duda, es la mejor opción."],["Desde luego","Desde luego, no es barato."],["En realidad","En realidad, no lo sabía."],["La verdad es que","La verdad es que me asombró."]]},{"c":"Temporales","f":"Sitúan y secuencian los hechos en el tiempo.","i":[["Mientras tanto","Mientras tanto, el hielo se derretía."],["Entretanto","Entretanto, la pandilla esperaba."],["De repente","De repente, tropezó con un cable."],["Acto seguido","Acto seguido, se asomó a la ventana."],["Al cabo de","Al cabo de una hora, escampó."],["A la larga","A la larga, ahorrar compensa."],["Tarde o temprano","Tarde o temprano, se dará cuenta."]]},{"c":"Conversacionales (diálogo)","f":"Gestionan la interacción oral: toman el turno, piden atención o matizan.","i":[["Bueno","Bueno, ¿empezamos?"],["Pues","Pues yo no estoy de acuerdo."],["A ver","A ver, ¿es un objeto?"],["Oye / Oiga","Oye, ¿se puede comer?"],["Mira / Mire","Mira, te lo explico de otra manera."],["Vale","Vale, entonces es un verbo."],["Venga","Venga, otra pista."],["Hombre / Mujer","Hombre, no exactamente."],["¿Sabes?","Es como una verdura, ¿sabes?"],["Claro","Claro, por eso es abstracto."],["Digamos","Es, digamos, una herramienta."],["Vamos","Es una persona joven, vamos, un chaval."],["Ya ves","Ya ves, nadie lo adivinó."]]}];
  const ROUNDS = 10;
  const fn = (ci) => (t.f && t.f[ci]) || DATA[ci].f;
  const $ = (s) => root.querySelector(s);
  const rnd = (n) => Math.floor(Math.random() * n);
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let rounds = [], i = 0, ok = 0, streak = 0, best = 0, answered = false;

  function build() {
    const pool = [];
    DATA.forEach((c, ci) => c.i.forEach(it => pool.push({ ci, m: it[0], ex: it[1] })));
    rounds = shuffle(pool).slice(0, ROUNDS).map(r => {
      const others = shuffle(DATA.map((_, k) => k).filter(k => k !== r.ci)).slice(0, 3);
      return Object.assign(r, { opts: shuffle([r.ci].concat(others)) });
    });
    i = 0; ok = 0; streak = 0; best = 0;
  }

  function mark(ex, m) {
    const key = m.split(/\s*\/\s*|\s*\(/)[0].replace(/[¿?¡!]/g, '').trim();
    const idx = ex.toLowerCase().indexOf(key.toLowerCase());
    if (!key || idx < 0) return esc(ex);
    return esc(ex.slice(0, idx)) + '<mark>' + esc(ex.slice(idx, idx + key.length)) + '</mark>' + esc(ex.slice(idx + key.length));
  }
  function dots() {
    $('.g-streak').innerHTML = Array.from({ length: ROUNDS }, (_, k) => '<i class="' + (k < i ? (rounds[k].good ? 'ok' : 'ko') : k === i ? 'now' : '') + '"></i>').join('');
  }
  function render() {
    answered = false;
    const r = rounds[i];
    $('.q-count').textContent = t.round(i + 1, ROUNDS);
    $('.g-marker').textContent = r.m;
    $('.g-ex').innerHTML = '«' + mark(r.ex, r.m) + '»';
    const box = $('.g-opts'); box.textContent = '';
    r.opts.forEach(ci => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'q-opt'; b.textContent = DATA[ci].c;
      b.addEventListener('click', () => pick(ci, b));
      box.appendChild(b);
    });
    $('.ex-fb').hidden = true; $('.ex-next').hidden = true;
    dots();
    root.classList.remove('q-in'); void root.offsetWidth; root.classList.add('q-in');
  }
  function pick(ci, btn) {
    if (answered) return; answered = true;
    const r = rounds[i], good = ci === r.ci; r.good = good;
    if (good) { ok++; streak++; best = Math.max(best, streak); } else streak = 0;
    [...$('.g-opts').children].forEach((c, n) => {
      c.disabled = true;
      if (r.opts[n] === r.ci) c.classList.add('is-ok'); else if (c === btn) c.classList.add('is-ko');
    });
    const fb = $('.ex-fb');
    fb.className = 'ex-fb ' + (good ? 'ex-fb--ok' : 'ex-fb--ko');
    fb.innerHTML = '<b>' + (good ? (streak >= 3 ? t.streak(streak) : t.ok) : t.ko) + '</b> ' + t.is(esc(r.m), esc(DATA[r.ci].c)) + ' ' + esc(fn(r.ci).charAt(0).toLowerCase() + fn(r.ci).slice(1));
    fb.hidden = false;
    const nx = $('.ex-next'); nx.textContent = i < ROUNDS - 1 ? t.next : t.see; nx.hidden = false; nx.focus({ preventScroll: true });
    $('.g-score').textContent = ok;
  }
  function end() {
    i = ROUNDS; dots();
    $('.g-run').hidden = true; $('.g-end').hidden = false; $('.q-count').textContent = t.over;
    $('.ex-score').innerHTML = t.of(ok, ROUNDS) + '<span class="p">.</span>';
    $('.ex-msg').textContent = t.msg[ok >= 9 ? 0 : ok >= 7 ? 1 : ok >= 5 ? 2 : 3] + t.best(best);
    root.classList.remove('q-in'); void root.offsetWidth; root.classList.add('q-in');
    $('.ex-score').focus({ preventScroll: true });
  }

  root.innerHTML = `
    <div class="g-head">
      <span class="q-count" aria-live="polite"></span>
      <span class="g-points" aria-label="${t.hits}"><b class="g-score">0</b> ${t.hitsL}</span>
    </div>
    <div class="g-streak" aria-hidden="true"></div>
    <div class="g-run">
      <p class="g-q">${t.q}</p>
      <p class="g-marker"></p>
      <p class="g-ex"></p>
      <div class="q-opts g-opts" role="group" aria-label="${t.choose}"></div>
      <div class="ex-fb" aria-live="polite" hidden></div>
      <div class="ex-nav"><button type="button" class="cta cta--sm ex-next" hidden>${t.next}</button></div>
    </div>
    <div class="g-end" hidden>
      <p class="res-kicker">${t.result}</p>
      <p class="h2 ex-score" tabindex="-1"></p>
      <p class="ex-msg"></p>
      <div class="res-actions">
        <button type="button" class="btn-line g-again">${t.again}</button>
        <a class="more" href="${t.url}">${t.cta} <span aria-hidden="true">→</span></a>
      </div>
    </div>`;
  $('.ex-next').addEventListener('click', () => { if (i < ROUNDS - 1) { i++; render(); } else end(); });
  $('.g-again').addEventListener('click', () => { build(); $('.g-run').hidden = false; $('.g-end').hidden = true; $('.g-score').textContent = '0'; render(); });
  build(); render();
})();
