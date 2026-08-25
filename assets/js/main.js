/* ============================================================
   JOZZI — MÉTODO E INSTINTO
   JavaScript nativo, sem transpilação.

   01. PALAVRAS DO ELEMENTO VIVO
   02. ENTRADA POR MÁSCARA
   03. ESTEIRA DE PESO (o elemento vivo da abertura)
   04. APARATO — seção, marca de posição, relógio
   05. ROLAGEM INTERPOLADA
   06. REDE DE SEGURANÇA
   ============================================================ */
(function () {
  'use strict';

  var menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var PESO_BASE = 450;   /* precisa bater com --peso-base no CSS */
  var PESO_PICO = 115;   /* delta máximo do eixo wght sob o ponteiro */
  var RAIO      = 280;   /* alcance da esteira — recalculado a partir
                            do corpo real da fonte, para se comportar
                            igual a 1440 e a 390 */
  var ACHATA    = 3.6;   /* quanto a esteira é achatada na vertical.
                            Com entrelinha 0.93 as linhas quase se
                            tocam; sem isso a linha de baixo acende
                            junto e a esteira perde a direção. */


  /* 01. PALAVRAS DO ELEMENTO VIVO ---------------------------
     A frase da abertura é quebrada em palavras para que o eixo
     variável da Switzer possa responder à leitura. Cada palavra
     tem a largura travada na medida do peso base: assim a
     variação de peso não empurra a linha, que é o defeito
     clássico de animar `wght` em texto corrido.
     -------------------------------------------------------- */
  var alvo = document.querySelector('[data-peso]');
  var palavras = [];
  var deslocs  = [];
  var pesos    = [];

  function montarPalavras() {
    if (!alvo) return;

    var texto = (alvo.textContent || '').trim().replace(/\s+/g, ' ');
    alvo.textContent = '';

    texto.split(' ').forEach(function (palavra, i, todas) {
      var span = document.createElement('span');
      span.className = 'pal';
      span.textContent = palavra;
      alvo.appendChild(span);
      if (i < todas.length - 1) alvo.appendChild(document.createTextNode(' '));
      palavras.push(span);
      pesos.push(PESO_BASE);
    });

    alvo.classList.add('is-pronto');
  }

  /* mede tudo antes de escrever nada, para não provocar reflow em cascata */
  function travarLarguras() {
    if (!palavras.length) return;

    palavras.forEach(function (s) { s.style.width = ''; });

    var larguras = palavras.map(function (s) { return s.getBoundingClientRect().width; });
    palavras.forEach(function (s, i) { s.style.width = larguras[i].toFixed(2) + 'px'; });

    /* guarda a caixa de cada palavra, não o centro: a distância é
       medida até a borda. Com o centro, uma palavra larga como
       "laboratório" joga as vizinhas para fora do alcance e a
       esteira fica irregular. */
    RAIO = parseFloat(window.getComputedStyle(alvo).fontSize) * 2.4;

    var base = alvo.getBoundingClientRect();
    deslocs = palavras.map(function (s) {
      var r = s.getBoundingClientRect();
      return {
        e: r.left - base.left,
        d: r.right - base.left,
        t: r.top - base.top,
        b: r.bottom - base.top
      };
    });
  }

  /* agrupa por linha para escalonar a entrada: palavras da mesma
     linha revelam juntas, linhas seguintes com 40ms de atraso */
  function marcarLinhas() {
    var topoAnterior = null;
    var linha = -1;

    palavras.forEach(function (s) {
      var t = Math.round(s.getBoundingClientRect().top);
      if (topoAnterior === null || Math.abs(t - topoAnterior) > 4) {
        linha += 1;
        topoAnterior = t;
      }
      s.setAttribute('data-linha', String(linha));
    });
  }


  /* 02. ENTRADA POR MÁSCARA --------------------------------- */
  var observador = null;

  function revelar(el, atraso) {
    window.setTimeout(function () { el.classList.add('is-dentro'); }, atraso || 0);
  }

  function ligarObservador() {
    if (!('IntersectionObserver' in window)) {
      revelarTudo();
      return;
    }

    observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        revelar(e.target, 0);
        observador.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });

    document.querySelectorAll('.rv:not([data-atraso])').forEach(function (el) { observador.observe(el); });
  }

  function revelarAbertura() {
    document.querySelectorAll('[data-atraso]').forEach(function (el) {
      revelar(el, parseInt(el.getAttribute('data-atraso'), 10) || 0);
    });

    palavras.forEach(function (s) {
      var linha = parseInt(s.getAttribute('data-linha'), 10) || 0;
      revelar(s, 120 + linha * 40);
    });
  }

  function revelarTudo() {
    document.querySelectorAll('.rv, .pal').forEach(function (el) {
      el.classList.add('is-dentro');
    });
  }


  /* 03. ESTEIRA DE PESO -------------------------------------
     O único elemento vivo da abertura. Não é um efeito sobre o
     texto: é o texto. O peso das palavras sobe onde a leitura
     está e desce atrás dela.
     -------------------------------------------------------- */
  var ponteiro = { x: -9999, y: -9999 };
  var quadro   = null;
  var dentro   = false;

  function laco() {
    var base = alvo.getBoundingClientRect();
    var px = ponteiro.x - base.left;
    var py = ponteiro.y - base.top;
    var seguir = dentro;

    for (var i = 0; i < palavras.length; i++) {
      var c  = deslocs[i];
      var dx = Math.max(c.e - px, 0, px - c.d);
      /* a esteira é achatada na vertical: segue a linha lida,
         não um círculo, que borraria as linhas vizinhas */
      var dy = Math.max(c.t - py, 0, py - c.b) * ACHATA;
      var d  = Math.sqrt(dx * dx + dy * dy);

      var destino = PESO_BASE + PESO_PICO * Math.max(0, 1 - d / RAIO);
      pesos[i] += (destino - pesos[i]) * 0.16;

      if (Math.abs(pesos[i] - PESO_BASE) > 0.6) seguir = true;
      palavras[i].style.fontVariationSettings = "'wght' " + pesos[i].toFixed(0);
    }

    quadro = seguir ? window.requestAnimationFrame(laco) : null;
  }

  function acordar() {
    if (!quadro) quadro = window.requestAnimationFrame(laco);
  }

  function afastar() {
    dentro = false;
    ponteiro.x = -9999;
    ponteiro.y = -9999;
    acordar();
  }

  /* a aba escondida congela o requestAnimationFrame; ao voltar,
     o laço precisa ser reatado ou os pesos ficam parados */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) acordar();
  });

  function ligarEsteira() {
    if (!alvo || menosMovimento) return;

    /* pointermove cobre mouse, caneta e toque. Registrar sempre:
       condicionar ao `pointer: fine` deixava a esteira morta em
       qualquer navegador que não reporte ponteiro preciso. */
    alvo.addEventListener('pointermove', function (e) {
      ponteiro.x = e.clientX;
      ponteiro.y = e.clientY;
      dentro = true;
      acordar();
    });
    alvo.addEventListener('pointerleave', afastar);
    alvo.addEventListener('pointercancel', afastar);

    /* uma passada única, 1,2s depois da entrada: é o que deixa
       imediatamente claro que a página está viva, sem pedir
       nada ao usuário. Acontece uma vez e nunca se repete. */
    window.setTimeout(function () {
      if (dentro) return;
      var base = alvo.getBoundingClientRect();
      var inicio = performance.now();
      var duracao = 1900;

      dentro = true;
      (function passada(agora) {
        var t = Math.min(1, (agora - inicio) / duracao);
        var suave = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        ponteiro.x = base.left - 120 + suave * (base.width + 240);
        ponteiro.y = base.top + base.height * 0.42;
        acordar();

        if (t < 1) window.requestAnimationFrame(passada);
        else {
          dentro = false;
          ponteiro.x = -9999;
          ponteiro.y = -9999;
          acordar();
        }
      })(inicio);
    }, 1200);
  }


  /* 04. APARATO --------------------------------------------- */
  var aparato    = document.getElementById('aparato');
  var apNum      = document.querySelector('[data-aparato-num]');
  var apSec      = document.querySelector('[data-aparato-sec]');
  var apMarca    = document.querySelector('[data-aparato-marca]');
  var relogio    = document.querySelector('[data-relogio]');
  var secaoAtual = '00';

  function trocarSecao(num, nome) {
    if (!aparato || num === secaoAtual) return;
    secaoAtual = num;

    aparato.classList.add('is-trocando');
    window.setTimeout(function () {
      apNum.textContent = num;
      apSec.textContent = nome;
      aparato.classList.remove('is-trocando');
    }, menosMovimento ? 0 : 180);
  }

  function ligarSecoes() {
    if (!('IntersectionObserver' in window)) return;

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        trocarSecao(e.target.getAttribute('data-num'), e.target.getAttribute('data-nome'));
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    document.querySelectorAll('[data-secao]').forEach(function (s) { obs.observe(s); });
  }

  var quadroMarca = null;

  function moverMarca() {
    quadroMarca = null;
    if (!apMarca) return;

    var escala = apMarca.parentNode.getBoundingClientRect().height;
    var total  = document.documentElement.scrollHeight - window.innerHeight;
    var razao  = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;

    apMarca.style.transform = 'translateY(' + (razao * (escala - 14)).toFixed(1) + 'px)';
  }

  function ligarMarca() {
    if (!apMarca) return;
    window.addEventListener('scroll', function () {
      if (!quadroMarca) quadroMarca = window.requestAnimationFrame(moverMarca);
    }, { passive: true });
    moverMarca();
  }

  function ligarRelogio() {
    if (!relogio) return;

    var opcoes = menosMovimento
      ? { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false }
      : { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    var tique = function () {
      relogio.textContent = new Date().toLocaleTimeString('pt-BR', opcoes);
    };

    tique();
    window.setInterval(tique, menosMovimento ? 30000 : 1000);
  }


  /* 05. ROLAGEM INTERPOLADA --------------------------------- */
  function ligarLenis() {
    if (menosMovimento || typeof window.Lenis === 'undefined') return;

    document.documentElement.style.scrollBehavior = 'auto';

    var lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 1 });

    (function passo(tempo) {
      lenis.raf(tempo);
      window.requestAnimationFrame(passo);
    })(0);

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var destino = document.querySelector(link.getAttribute('href'));
        if (!destino) return;
        e.preventDefault();
        lenis.scrollTo(destino, { offset: 0 });
      });
    });
  }


  /* 06. REDE DE SEGURANÇA -----------------------------------
     Se qualquer coisa acima falhar, nada fica escondido.
     -------------------------------------------------------- */
  window.setTimeout(revelarTudo, 3500);


  /* PARTIDA ------------------------------------------------- */
  function iniciar() {
    montarPalavras();

    var seguir = function () {
      travarLarguras();
      marcarLinhas();

      if (menosMovimento) revelarTudo();
      else { revelarAbertura(); ligarObservador(); ligarEsteira(); }

      ligarSecoes();
      ligarMarca();
      ligarRelogio();
      ligarLenis();
    };

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(seguir);
    else window.addEventListener('load', seguir);

    var recompor = null;
    window.addEventListener('resize', function () {
      window.clearTimeout(recompor);
      recompor = window.setTimeout(function () {
        travarLarguras();
        marcarLinhas();
        moverMarca();
      }, 180);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

})();
