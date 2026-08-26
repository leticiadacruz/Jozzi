/* ============================================================
   JOZZI — MÉTODO E INSTINTO
   JavaScript nativo, sem transpilação.

   01. PALAVRAS DO ELEMENTO VIVO
   02. ENTRADA POR MÁSCARA
   03. ESTEIRA DE PESO (o elemento vivo da abertura)
   04. APARATO — seção, inversão, marca de posição, relógio
   05. SERVIÇOS — índice e revelação
   06. CURSOR
   06b. COPIAR O ENDEREÇO
   07. ROLAGEM INTERPOLADA
   08. REDE DE SEGURANÇA
   ============================================================ */
(function () {
  'use strict';

  var menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* A esteira é comportamento tipográfico, não demonstração. Os
     números abaixo foram reduzidos de propósito: o efeito tem que
     ser notado sem ser assistido. */
  var PESO_BASE = 450;   /* precisa bater com --peso-base no CSS */
  var PESO_PICO = 62;    /* delta do eixo wght sob o ponteiro. Meio
                            corte de peso, não um salto de peso. */
  var RAIO      = 280;   /* alcance — recalculado a partir do corpo
                            real da fonte, para se comportar igual a
                            1440 e a 390. Curto: pega a palavra e
                            quase nada além dela. */
  var ACHATA    = 4.4;   /* achatamento vertical. Com entrelinha 0.93
                            as linhas quase se tocam; sem isso a linha
                            de baixo acende junto. */
  var APROX     = 0.22;  /* velocidade de aproximação. Mais alto que
                            antes: a resposta chega e sai mais rápido,
                            em vez de ficar pairando. */


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

  /* quebra qualquer elemento em palavras. Serve à esteira de peso da
     abertura e à revelação por linha das afirmações do olhar — o
     mesmo mecanismo, dois usos. */
  function partirEmPalavras(el) {
    var texto = (el.textContent || '').trim().replace(/\s+/g, ' ');
    var saida = [];
    el.textContent = '';

    texto.split(' ').forEach(function (palavra, i, todas) {
      var span = document.createElement('span');
      span.className = 'pal';
      span.textContent = palavra;
      el.appendChild(span);
      if (i < todas.length - 1) el.appendChild(document.createTextNode(' '));
      saida.push(span);
    });

    el.classList.add('is-pronto');
    return saida;
  }

  function montarPalavras() {
    document.querySelectorAll('[data-linhas]').forEach(function (el) {
      var spans = partirEmPalavras(el);
      if (el !== alvo) return;
      palavras = spans;
      spans.forEach(function () { pesos.push(PESO_BASE); });
    });
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
    RAIO = parseFloat(window.getComputedStyle(alvo).fontSize) * 2.0;

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
    document.querySelectorAll('[data-linhas]').forEach(function (el) {
      var topoAnterior = null;
      var linha = -1;

      el.querySelectorAll('.pal').forEach(function (s) {
        var t = Math.round(s.getBoundingClientRect().top);
        if (topoAnterior === null || Math.abs(t - topoAnterior) > 4) {
          linha += 1;
          topoAnterior = t;
        }
        s.setAttribute('data-linha', String(linha));
      });
    });
  }


  /* 02. ENTRADA POR MÁSCARA --------------------------------- */
  var observador = null;

  function revelar(el, atraso) {
    window.setTimeout(function () {
      el.classList.add('is-dentro');

      /* um container de linhas não entra inteiro: entram as linhas */
      var pecas = el.hasAttribute('data-linhas') ? el.querySelectorAll('.pal') : [];
      pecas.forEach(function (s) {
        var linha = parseInt(s.getAttribute('data-linha'), 10) || 0;
        window.setTimeout(function () { s.classList.add('is-dentro'); }, linha * 55);
      });
    }, atraso || 0);
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
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

    document.querySelectorAll('.rv:not([data-atraso])').forEach(function (el) { observador.observe(el); });
  }

  /* A abertura não entra: ela se monta, em quatro tempos.
     Primeiro o instrumento se desenha, depois a marca, depois a
     frase linha a linha, e por último o rodapé. A ordem é a da
     leitura, e o silêncio entre os tempos é o que dá presença — não
     o tamanho de nenhum deles. */
  function revelarAbertura() {
    if (aparato) aparato.classList.add('is-ligado');

    if (alvo) revelar(alvo, 460);

    document.querySelectorAll('[data-atraso]').forEach(function (el) {
      revelar(el, 200 + (parseInt(el.getAttribute('data-atraso'), 10) || 0));
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
      pesos[i] += (destino - pesos[i]) * APROX;

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

    /* uma passada única, 1,6s depois da entrada — depois de um
       tempo de imobilidade, para ler como um evento próprio e não
       como sobra da entrada. Acontece uma vez e nunca se repete. */
    window.setTimeout(function () {
      if (dentro) return;
      var base = alvo.getBoundingClientRect();
      var inicio = performance.now();
      var duracao = 1500;

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
    }, 1600);
  }


  /* 04. APARATO --------------------------------------------- */
  var aparato    = document.getElementById('aparato');
  var apNum      = document.querySelector('[data-aparato-num]');
  var apSec      = document.querySelector('[data-aparato-sec]');
  var apMarca    = document.querySelector('[data-aparato-marca]');
  var apFeito    = document.querySelector('[data-aparato-feito]');
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
    }, menosMovimento ? 0 : 200);
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

  var apId    = document.querySelector('.aparato__id');
  var apHora  = document.querySelector('.aparato__hora');
  var invSecs = [].slice.call(document.querySelectorAll('[data-inv]'));

  /* O aparato atravessa a tela inteira. Na passagem de papel para
     tinta, o topo e o rodapé dele estão sobre fundos diferentes — por
     isso cada bloco decide a própria cor pelo que está atrás DELE, e
     não pela seção corrente. Sem isso o relógio some por meia tela. */
  function pintarAparato() {
    if (!invSecs.length) return;

    [apId, apHora].forEach(function (el) {
      if (!el) return;
      var r = el.getBoundingClientRect();
      var meio = r.top + r.height / 2;
      var claro = invSecs.some(function (sec) {
        var q = sec.getBoundingClientRect();
        return meio >= q.top && meio <= q.bottom;
      });
      el.classList.toggle('is-claro', claro);
    });
  }

  var quadroMarca = null;

  var clientes = [].slice.call(document.querySelectorAll('.cliente'));
  var TETO = 12;   /* mesmo limite de deslocamento do resto do sistema */

  /* NÍVEL 3 — os três blocos da diagonal se deslocam em tempos
     ligeiramente diferentes conforme passam pelo meio da tela. Doze
     pixels de teto: o bastante para a diagonal respirar, pouco o
     bastante para ninguém chamar de parallax. */
  function moverDiagonal() {
    if (!clientes.length || menosMovimento) return;
    var meio = window.innerHeight / 2;

    clientes.forEach(function (el, i) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      var d = (r.top + r.height / 2 - meio) / window.innerHeight;
      var y = Math.max(-TETO, Math.min(TETO, d * TETO * (1 + i * 0.45)));
      el.style.setProperty('--desloc', y.toFixed(1) + 'px');

      /* a marca mais perto do meio da tela cresce um pouco — a
         mesma regra que já dizia que nenhuma marca tem corpo maior
         que outra continua valendo em repouso; a variação aqui é
         momentânea, do scroll, e some assim que o bloco passa do
         centro. Não é hierarquia, é o leitor cruzando o campo. */
      var prox = Math.max(0, 1 - Math.min(1, Math.abs(d) * 2.2));
      var escala = 1 + prox * .05;
      el.style.setProperty('--escala', escala.toFixed(3));
    });
  }

  function moverMarca() {
    quadroMarca = null;
    pintarAparato();
    moverDiagonal();
    if (!apMarca) return;

    var escala = apMarca.parentNode.getBoundingClientRect().height;
    var total  = document.documentElement.scrollHeight - window.innerHeight;
    var razao  = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;

    apMarca.style.transform = 'translateY(' + (razao * (escala - 14)).toFixed(1) + 'px)';
    if (apFeito) apFeito.style.height = (razao * (escala - 14)).toFixed(1) + 'px';
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


  /* 05. SERVIÇOS — ÍNDICE E REVELAÇÃO -----------------------
     Um só DOM para as duas composições. Acima de 1025 os campos
     ficam empilhados na mesma área da grade e só troca qual está
     desmascarado; abaixo, o campo ativo abre no próprio fluxo.

     O nome é <button>: ponteiro, toque e teclado entram pelo mesmo
     caminho, e o foco também ativa — nada existe só no hover.
     -------------------------------------------------------- */
  var itens = [].slice.call(document.querySelectorAll('.serv__item'));
  var ativo = -1;

  function ativarServico(i) {
    if (i === ativo || !itens[i]) return;
    ativo = i;

    itens.forEach(function (li, n) {
      var ligado = n === i;
      li.classList.toggle('is-ativo', ligado);
      li.querySelector('.serv__nome').setAttribute('aria-expanded', String(ligado));
      li.querySelector('.serv__rev').setAttribute('aria-hidden', String(!ligado));
    });
  }

  function ligarServicos() {
    if (!itens.length) return;

    /* só agora a seção adota a composição de duas zonas. Sem esta
       classe — script ausente ou quebrado — ela fica em fluxo, com
       os cinco campos visíveis. Nada some por falta de JavaScript. */
    document.documentElement.classList.add('js--serv');

    itens.forEach(function (li, i) {
      var bt = li.querySelector('.serv__nome');

      bt.addEventListener('pointerenter', function (e) {
        /* toque dispara pointerenter junto com o clique; deixa o
           clique resolver, senão o primeiro toque ativa duas vezes */
        if (e.pointerType === 'touch') return;
        ativarServico(i);
      });
      bt.addEventListener('focus', function () { ativarServico(i); });
      bt.addEventListener('click', function () { ativarServico(i); });
    });

    /* o primeiro já entra revelado: sem isso a seção é cinco
       palavras num campo vazio até alguém descobrir o ponteiro */
    ativarServico(0);
  }


  /* 06. CURSOR -----------------------------------------------
     Um rótulo, não um círculo, e sem atraso: o rastro elástico é o
     clichê a evitar. O texto vem do próprio elemento, em
     data-cursor — o cursor não sabe nada sobre as seções.
     -------------------------------------------------------- */
  var cursor = document.getElementById('cursor');
  var quadroCursor = null;
  var ultimoAlvo = null;
  var ponteiroCursor = { x: 0, y: 0 };

  function desenharCursor() {
    quadroCursor = null;
    cursor.style.transform =
      'translate(' + ponteiroCursor.x + 'px,' + ponteiroCursor.y + 'px)';
  }

  function ligarCursor() {
    if (!cursor || menosMovimento) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.documentElement.classList.add('js--cursor');

    document.addEventListener('pointermove', function (e) {
      var alvo = e.target.closest ? e.target.closest('[data-cursor]') : null;

      if (alvo !== ultimoAlvo) {
        ultimoAlvo = alvo;
        if (alvo) {
          cursor.textContent = alvo.getAttribute('data-cursor');
          /* o rótulo assume o sinal do fundo em que está */
          cursor.classList.toggle('is-inv', !!alvo.closest('[data-inv]'));
        }
        cursor.classList.toggle('is-visivel', !!alvo);
      }
      if (!alvo) return;

      ponteiroCursor.x = e.clientX;
      ponteiroCursor.y = e.clientY;
      if (!quadroCursor) quadroCursor = window.requestAnimationFrame(desenharCursor);
    }, { passive: true });
  }


  /* 06b. COPIAR O ENDEREÇO -----------------------------------
     Clicar copia, em vez de abrir o cliente de e-mail — mas só
     onde o rótulo do cursor avisou antes do clique. No toque não
     há rótulo, então o mailto vale como link normal, que é o
     comportamento certo num telefone.

     A confirmação troca no lugar: sem toast, sem modal, sem
     elemento novo. O <span role="status"> entrega a mesma
     informação à tecnologia assistiva.
     -------------------------------------------------------- */
  function ligarCopia() {
    var alvo = document.querySelector('[data-copiar]');
    var estado = document.querySelector('.contato__estado');
    if (!alvo || !estado || !navigator.clipboard) return;

    var volta = null;

    alvo.addEventListener('click', function (e) {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      e.preventDefault();

      navigator.clipboard.writeText(alvo.getAttribute('data-copiar')).then(function () {
        estado.textContent = 'Endereço copiado';
        if (ultimoAlvo === alvo) cursor.textContent = 'Copiado';

        window.clearTimeout(volta);
        volta = window.setTimeout(function () {
          estado.textContent = '';
          if (ultimoAlvo === alvo) cursor.textContent = alvo.getAttribute('data-cursor');
        }, 2000);
      });
    });
  }


  /* 07. ROLAGEM INTERPOLADA --------------------------------- */
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


  /* 08. REDE DE SEGURANÇA -----------------------------------
     Cobre a falha, não o funcionamento.

     A versão anterior chamava revelarTudo() aos 3,5s sem
     condição — e revelava as 38 peças abaixo da dobra junto
     com as duas visíveis. Resultado: a entrada por máscara só
     acontecia na primeira tela, e as seções 01 a 06 nunca
     animavam. O sistema de movimento estava morto em 95% do
     site sem que nada parecesse quebrado.

     Agora: se o observador não subiu, revela tudo. Se subiu,
     só desbloqueia o que o leitor já alcançou — o resto
     continua a cargo dele.
     -------------------------------------------------------- */
  function redeDeSeguranca() {
    if (!observador) { revelarTudo(); return; }

    document.querySelectorAll('.rv:not(.is-dentro), .pal:not(.is-dentro)').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-dentro');
      }
    });
  }

  window.setTimeout(redeDeSeguranca, 3500);


  /* PARTIDA ------------------------------------------------- */
  function iniciar() {
    document.documentElement.className += ' js--pronto';
    montarPalavras();

    var seguir = function () {
      travarLarguras();
      marcarLinhas();

      if (menosMovimento) revelarTudo();
      else { revelarAbertura(); ligarObservador(); ligarEsteira(); }

      ligarSecoes();
      ligarMarca();
      ligarRelogio();
      ligarServicos();
      ligarCursor();
      ligarCopia();
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
