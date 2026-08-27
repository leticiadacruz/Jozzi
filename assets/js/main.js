/* ============================================================
   JOZZI — MÉTODO E INSTINTO
   JavaScript nativo, sem transpilação.

   01. PALAVRAS DO ELEMENTO VIVO
   02. ENTRADA POR MÁSCARA
   03. ESTEIRA DE PESO (o elemento vivo da abertura)
   04. APARATO — a régua das seções, inversão, relógio
   05. SERVIÇOS — os cinco cards
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


  /* 04. APARATO — A RÉGUA DAS SEÇÕES -------------------------
     Um quadro só, e nenhuma leitura de layout dentro dele.

     A versão anterior lia getBoundingClientRect() de cada cliente,
     de cada bloco do aparato e da escala DENTRO do rAF, alternando
     leitura e escrita elemento a elemento — o navegador recalculava
     o layout a cada par. Era a causa real do arrasto na diagonal de
     Projetos e do pulo da marca de posição.

     Agora as medidas são tiradas UMA vez (e de novo no resize) e o
     quadro só escreve. Enquanto a rolagem não muda, o quadro custa
     uma comparação de número.
     -------------------------------------------------------- */
  var aparato   = document.getElementById('aparato');
  var apNum     = document.querySelector('[data-aparato-num]');
  var apSec     = document.querySelector('[data-aparato-sec]');
  var apEscala  = document.querySelector('[data-aparato-escala]');
  var apId      = document.querySelector('.aparato__id');
  var apHora    = document.querySelector('.aparato__hora');
  var relogio   = document.querySelector('[data-relogio]');
  var rolar     = document.querySelector('.abertura__rolar');

  var secoes   = [].slice.call(document.querySelectorAll('[data-secao]'));
  var invSecs  = [].slice.call(document.querySelectorAll('[data-inv]'));
  var clientes = [].slice.call(document.querySelectorAll('.cliente'));

  var TETO = 12;   /* teto de deslocamento, o mesmo do resto do sistema */

  var med = { vh: 0, secs: [], inv: [], cli: [], idMeio: 0, horaMeio: 0, regua: false };
  var segs = [];

  function topoDoc(el) {
    return el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
  }

  /* ---- a régua ----
     Um segmento por seção, com peso igual à altura real dela no
     documento: a régua mede o documento, não conta seções. */
  function montarRegua() {
    if (!apEscala || !secoes.length) return;
    apEscala.textContent = '';
    segs = secoes.map(function () {
      var seg  = document.createElement('span');
      var fill = document.createElement('i');
      seg.className  = 'aparato__seg';
      fill.className = 'aparato__seg-feito';
      seg.appendChild(fill);
      apEscala.appendChild(seg);
      return { el: seg, fill: fill, ativo: false, feito: false, altura: -1 };
    });
    document.documentElement.classList.add('js--regua');
  }

  function medir() {
    med.vh = window.innerHeight;

    med.secs = secoes.map(function (el) {
      return {
        topo: topoDoc(el),
        alt:  Math.max(1, el.offsetHeight),
        num:  el.getAttribute('data-num'),
        nome: el.getAttribute('data-nome')
      };
    });

    med.inv = invSecs.map(function (el) {
      var t = topoDoc(el);
      return { topo: t, base: t + el.offsetHeight };
    });

    med.cli = clientes.map(function (el) {
      return { el: el, meio: topoDoc(el) + el.offsetHeight / 2 };
    });

    /* o aparato é fixo: a posição dos dois blocos na TELA não muda
       com a rolagem, então basta medi-la uma vez */
    if (apId)   { var a = apId.getBoundingClientRect();   med.idMeio   = a.top + a.height / 2; }
    if (apHora) { var b = apHora.getBoundingClientRect(); med.horaMeio = b.top + b.height / 2; }

    /* abaixo de 1025 o aparato é display:none — não há o que pintar */
    med.regua = !!(apEscala && apEscala.offsetParent !== null);

    med.secs.forEach(function (s, i) {
      if (segs[i]) segs[i].el.style.setProperty('--peso', s.alt.toFixed(0));
    });

    ultimoY = -1;   /* força o próximo quadro a redesenhar */
  }

  /* ---- a troca de seção ----
     Um token por troca. Sem ele, atravessar três seções em rolagem
     rápida deixava três setTimeout de 200ms na fila e o rótulo podia
     terminar exibindo a seção do meio. */
  var secaoAtual = '00';
  var trocaAtual = 0;

  function trocarSecao(num, nome) {
    if (!aparato || num === secaoAtual) return;
    secaoAtual = num;

    var meu = ++trocaAtual;
    aparato.classList.add('is-trocando');
    window.setTimeout(function () {
      if (meu !== trocaAtual) return;   /* já houve outra troca */
      apNum.textContent = num;
      apSec.textContent = nome;
      aparato.classList.remove('is-trocando');
    }, menosMovimento ? 0 : 200);
  }

  /* ---- o quadro: só escreve ---- */
  function pintar(y) {
    var meio = y + med.vh * 0.5;

    if (med.regua) {
      /* qual seção está sob a linha do meio da tela. Exatamente uma,
         sempre: no rodapé o índice trava na última. */
      var corrente = 0;
      for (var k = 0; k < med.secs.length; k++) {
        if (med.secs[k].topo <= meio) corrente = k;
      }

      for (var i = 0; i < segs.length; i++) {
        var s = med.secs[i], seg = segs[i];
        var p = (meio - s.topo) / s.alt;
        p = p < 0 ? 0 : (p > 1 ? 1 : p);

        var h = Math.round(p * 1000) / 10;
        if (h !== seg.altura) { seg.altura = h; seg.fill.style.height = h + '%'; }

        var ativo = (i === corrente);
        if (ativo !== seg.ativo) {
          seg.ativo = ativo;
          seg.el.classList.toggle('is-ativo', ativo);
          if (ativo) trocarSecao(s.num, s.nome);
        }
        var feito = (i < corrente);
        if (feito !== seg.feito) {
          seg.feito = feito;
          seg.el.classList.toggle('is-feito', feito);
        }
      }

      /* cada bloco do aparato decide a própria cor pelo que está
         atrás DELE, não pela seção corrente: o instrumento atravessa
         a tela inteira e, na travessia, topo e rodapé estão sobre
         fundos diferentes. */
      pintarBloco(apId,   y + med.idMeio);
      pintarBloco(apHora, y + med.horaMeio);
    }

    /* NÍVEL 3 — a diagonal de Projetos. Doze pixels de teto: o
       bastante para respirar, pouco o bastante para não virar
       parallax. */
    if (!menosMovimento) {
      for (var c = 0; c < med.cli.length; c++) {
        var alvoC = med.cli[c];
        var dist  = alvoC.meio - meio;
        if (dist < -med.vh - 200 || dist > med.vh + 200) continue;
        var d = dist / med.vh;
        var desloc = Math.max(-TETO, Math.min(TETO, d * TETO * (1 + c * 0.45)));
        var prox   = Math.max(0, 1 - Math.min(1, Math.abs(d) * 2.2));
        alvoC.el.style.setProperty('--desloc', desloc.toFixed(1) + 'px');
        alvoC.el.style.setProperty('--escala', (1 + prox * 0.05).toFixed(3));
      }
    }

    /* o convite a rolar cumpriu a função no primeiro gesto */
    if (rolar) rolar.classList.toggle('is-cumprido', y > 40);
  }

  function pintarBloco(el, meioDoc) {
    if (!el) return;
    var claro = false;
    for (var i = 0; i < med.inv.length; i++) {
      if (meioDoc >= med.inv[i].topo && meioDoc <= med.inv[i].base) { claro = true; break; }
    }
    el.classList.toggle('is-claro', claro);
  }

  var ultimoY = -1;

  function ligarMarca() {
    montarRegua();
    medir();

    (function quadro() {
      var y = window.scrollY || window.pageYOffset;
      if (y !== ultimoY) { ultimoY = y; pintar(y); }
      window.requestAnimationFrame(quadro);
    })();
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


  /* 05. SERVIÇOS — CARDS ------------------------------------
     Os cinco cards estão inteiros na tela desde a entrada. O que o
     módulo faz é uma coisa só: FECHAR o painel de etiquetas, que no
     HTML nasce aberto, e abri-lo de novo no card sob o ponteiro, sob
     o foco ou sob o toque.

     Essa é a ordem certa. Se o painel nascesse fechado e o script
     fosse quem abre, um script que não sobe esconderia conteúdo — e
     nada neste site pode depender de JavaScript para existir.

     O nome continua sendo <button>: ponteiro, toque e teclado
     entram pelo mesmo caminho.
     -------------------------------------------------------- */
  var cards = [].slice.call(document.querySelectorAll('.serv__card'));
  var servAtivo = -1;
  var temHover  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function ativarServico(i) {
    if (i === servAtivo) return;
    servAtivo = i;

    cards.forEach(function (li, n) {
      var ligado = (n === i);
      li.classList.toggle('is-ativo', ligado);
      li.querySelector('.serv__nome').setAttribute('aria-expanded', String(ligado));
      li.querySelector('.serv__painel').setAttribute('aria-hidden', String(!ligado));
    });
  }

  function ligarServicos() {
    if (!cards.length) return;

    /* só agora os painéis fecham. Sem esta classe — script ausente
       ou quebrado — os cinco cards ficam abertos e completos. */
    document.documentElement.classList.add('js--serv');

    cards.forEach(function (li, i) {
      var bt = li.querySelector('.serv__nome');

      li.addEventListener('pointerenter', function (e) {
        /* o toque dispara pointerenter junto do clique; deixa o
           clique resolver, senão o primeiro toque abre e fecha */
        if (e.pointerType === 'touch') return;
        ativarServico(i);
      });

      li.addEventListener('pointerleave', function (e) {
        if (e.pointerType === 'touch') return;
        /* o ponteiro sair não pode fechar um card que está com o
           foco do teclado dentro dele */
        if (li.contains(document.activeElement)) return;
        ativarServico(-1);
      });

      bt.addEventListener('focus', function () { ativarServico(i); });
      bt.addEventListener('blur',  function () { ativarServico(-1); });

      bt.addEventListener('click', function () {
        /* no telefone não há hover: o clique é o único gesto, e
           precisa fechar também */
        ativarServico(temHover ? i : (servAtivo === i ? -1 : i));
      });
    });
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


  /* 09. CARREGAMENTO ----------------------------------------
     A barra anda com a carga REAL desta página, não com um
     cronômetro: document.fonts.ready (os 63KB de tipografia são o
     peso de verdade aqui) e window.load. O que o cronômetro faz é
     só interpolar entre um marco e o seguinte, para o número não
     ficar parado esperando.

     CARGA_PISO (1400ms): o tempo que a cortina fica na tela no mínimo.
     Começou em 900ms e a Jozzi pediu mais devagar — abaixo de
     ~700ms ninguém lê "we are creating for you" e a cortina vira
     um piscar.
     CARGA_PAUSA: o repouso em 100% antes de subir. Sem ele o número
     chega a 100 e a tela some no mesmo quadro; o olho não fecha a
     conta.
     CARGA_TETO (5s): se algum marco nunca chegar, sai assim mesmo. A
     cortina não pode virar uma porta trancada — este é o número que
     não deve crescer muito.
     ----------------------------------------------------------- */
  /* Prefixo CARGA_ obrigatório. Estes quatro vivem no escopo da
     IIFE inteira, junto com os do módulo 04 — e lá já existe um
     `var TETO` (o teto de 12px da diagonal de Marcas). Como `var`
     tem escopo de função, havia UM só TETO: o desta seção
     sobrescrevia o de lá, e a diagonal passava a deslocar milhares
     de pixels em vez de 12, jogando três dos quatro projetos para
     fora da tela. Qualquer constante nova daqui vem prefixada. */
  var CARGA_PISO  = 1400;
  var CARGA_CHEIA = 420;   /* == --t-cheia no CSS */
  var CARGA_PAUSA = 260;
  var CARGA_TETO  = 5000;

  function ligarCarregamento(aoTerminar) {
    var cortina = document.getElementById('carregando');

    /* sem cortina no HTML, ou leitor que pediu menos movimento:
       o site começa direto. */
    if (!cortina || menosMovimento) {
      if (cortina && cortina.parentNode) cortina.parentNode.removeChild(cortina);
      aoTerminar();
      return;
    }

    var raiz = document.documentElement;
    raiz.className += ' esta-carregando';

    /* o teto é armado ANTES de qualquer outra coisa: se qualquer
       linha abaixo lançar, a cortina ainda sai sozinha. */
    window.setTimeout(function () { marco(100); }, CARGA_TETO);
    window.setTimeout(function () { sair(); }, CARGA_TETO + 600);

    var barra  = cortina.querySelector('[data-carregando-barra]');
    var numero = cortina.querySelector('[data-carregando-pct]');

    var t0      = Date.now();
    var alvo    = 8;      /* para onde a barra está indo */
    var atual   = 0;      /* onde ela está agora */
    var cheia   = false;  /* o CSS assumiu o último trecho */
    var fechado = false;
    var quadro  = null;

    function pintar() {
      /* aproxima do alvo por fração: chega rápido no começo e
         desacelera, sem precisar de curva declarada. 0.045 e não
         0.08 — a Jozzi pediu mais devagar, e a fração é o que
         controla a sensação, não só a duração total. */
      atual += (alvo - atual) * 0.045;

      /* Chegando perto do fim o JS solta o volante: marca a
         cortina como cheia, o CSS leva a barra até a borda em
         --t-cheia e o número termina de contar junto. Um só
         movimento até o 100, sem o degrau de um valor por quadro. */
      if (alvo === 100 && atual > 96 && !cheia) {
        cheia = true;
        cortina.classList.add('is-cheia');
        contarAteCem();
        return;
      }

      escrever(atual);
      quadro = window.requestAnimationFrame(pintar);
    }

    function escrever(v) {
      if (barra && !cheia) barra.style.setProperty('--p', (v / 100).toFixed(4));
      if (numero) {
        var n = Math.min(100, Math.floor(v));
        numero.textContent = (n < 10 ? '0' : '') + n + '%';
      }
    }

    /* o número acompanha a barra que o CSS está animando, na mesma
       duração, e só então a cortina descansa cheia e sobe */
    function contarAteCem() {
      var de = atual;
      var t = Date.now();
      (function passo() {
        var f = Math.min(1, (Date.now() - t) / CARGA_CHEIA);
        escrever(de + (100 - de) * f);
        if (f < 1) { quadro = window.requestAnimationFrame(passo); return; }
        window.setTimeout(sair, CARGA_PAUSA);
      })();
    }

    function marco(valor) {
      if (valor > alvo) alvo = valor;
    }

    function concluir() {
      var espera = Math.max(0, CARGA_PISO - (Date.now() - t0));
      window.setTimeout(function () { marco(100); }, espera);
    }

    function sair() {
      if (fechado) return;
      fechado = true;
      if (quadro) window.cancelAnimationFrame(quadro);

      cortina.classList.add('is-fora');
      raiz.className = raiz.className.replace(' esta-carregando', '');

      /* o conteúdo só se monta depois que a cortina começou a
         subir: a abertura tem quatro tempos medidos e não pode
         ser gasta atrás de um painel opaco. */
      aoTerminar();

      window.setTimeout(function () {
        if (cortina.parentNode) cortina.parentNode.removeChild(cortina);
      }, 1200);   /* > --t-cortina, senão some no meio da subida */
    }

    /* marcos reais */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { marco(72); concluir(); });
    } else {
      marco(72);
    }
    if (document.readyState === 'complete') { marco(94); concluir(); }
    else window.addEventListener('load', function () { marco(94); concluir(); });

    quadro = window.requestAnimationFrame(pintar);
  }


  /* PARTIDA ------------------------------------------------- */
  function iniciar() {
    document.documentElement.className += ' js--pronto';
    montarPalavras();

    var seguir = function () {
      travarLarguras();
      marcarLinhas();

      if (menosMovimento) revelarTudo();
      else { revelarAbertura(); ligarObservador(); ligarEsteira(); }

      ligarMarca();
      ligarRelogio();
      ligarServicos();
      ligarCursor();
      ligarCopia();
      ligarLenis();
    };

    ligarCarregamento(seguir);

    var recompor = null;
    window.addEventListener('resize', function () {
      window.clearTimeout(recompor);
      recompor = window.setTimeout(function () {
        travarLarguras();
        marcarLinhas();
        /* as medidas do aparato e da diagonal dependem da altura
           real das seções: reflow muda todas elas de uma vez */
        medir();
      }, 180);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

})();
