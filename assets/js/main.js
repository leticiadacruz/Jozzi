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
  /* A Switzer era variável e o peso podia cair em qualquer valor;
     a Nexa vem em nove pesos fixos (100 a 900). Por isso a base
     passou de 450 para 400 e o pico de 62 para 200: entre 400 e
     600 existem pesos DE VERDADE no kit, e a esteira continua
     acendendo a palavra sob o ponteiro. O que se perdeu foi a
     interpolação contínua — agora o navegador arredonda para o
     peso mais próximo, e a passagem tem degrau. */
  var PESO_BASE = 400;   /* precisa bater com --peso-base no CSS */
  var PESO_PICO = 200;
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
      /* cascata: quem entra no mesmo lote entra em sequência,
         80ms de diferença, no máximo 5 passos */
      var n = 0;
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        revelar(e.target, Math.min(n, 5) * 80);
        n += 1;
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
      palavras[i].style.fontWeight = pesos[i].toFixed(0);
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
  var navLinks  = [].slice.call(document.querySelectorAll('[data-nav-secao] a[href^="#"]'));
  var segEls    = [];   /* os segmentos da barra lateral, na ordem das seções */
  var topo      = document.querySelector('.topo');
  var apId      = document.querySelector('.aparato__id');
  var apHora    = document.querySelector('.aparato__hora');
  /* querySelectorAll e não querySelector: a hora aparece em DOIS
     lugares — na barra lateral, abreviada como "CWB", e em "Onde
     ficamos", com o rótulo inteiro. É a segunda que explica a
     primeira, e as duas têm de bater no segundo. */
  var relogios  = [].slice.call(document.querySelectorAll('[data-relogio]'));
  var rolar     = document.querySelector('.abertura__rolar');

  var secoes   = [].slice.call(document.querySelectorAll('[data-secao]'));
  var invSecs  = [].slice.call(document.querySelectorAll('[data-inv]'));
  var TETO = 12;   /* teto de deslocamento, o mesmo do resto do sistema */

  /* ---- o rolo de Projetos ----
     O tambor 3D da seção 04. Os números vieram medidos da
     referência que a Jozzi pediu (twist.com.br): 30° entre uma face
     e a seguinte, e a opacidade caindo 1 → 1/3 → 0 conforme a face
     se afasta da frente. */
  var rolo      = document.querySelector('[data-rolo]');
  var roloLista = document.querySelector('[data-rolo-lista]');
  var roloItens = [].slice.call(document.querySelectorAll('[data-rolo-item]'));
  var roloConta = document.querySelector('[data-rolo-conta]');
  var roloContaCaixa = roloConta ? roloConta.closest('.rolo__conta') : null;
  var roloVideos = [].slice.call(document.querySelectorAll('[data-rolo-video]'));
  var roloTocando = -1;   /* qual vídeo está tocando agora */
  /* 60° e não os 30° da referência: lá cada face é um nome e uma
     linha; aqui é um parágrafo inteiro. Com 30° as faces vizinhas
     ficavam quase de frente e o texto de trás atravessava o da
     frente. A 60° a vizinha já está bem inclinada — o texto dela
     comprime e sai de leitura sozinho, antes mesmo da opacidade. */
  var ROLO_PASSO_ANG = 60;
  /* A opacidade tem PLATÔ e depois cai — não é uma rampa.
     Rampa (linear, ou mesmo o quadrado que usei enquanto os textos
     eram curtos) mantém as duas faces meio visíveis por metade do
     curso, e com parágrafo inteiro isso vira dois textos sobrepostos
     e ilegíveis. Com o platô, a face da frente fica CHEIA em quase
     todo o trecho dela e a troca acontece rápido, num pedaço curto
     de rolagem: lê-se um texto por vez.
     Os dois números são o começo e o fim da queda, em unidades de
     "distância até a face". */
  var ROLO_OP_INI = 0.34;
  var ROLO_OP_FIM = 0.64;

  /* transição suave entre 0 e 1 — sem isto a troca tem quina */
  function suavizar(a, b, x) {
    var t = (x - a) / (b - a);
    if (t < 0) t = 0; else if (t > 1) t = 1;
    return t * t * (3 - 2 * t);
  }
  var roloUltimo = -1;
  /* quantas faces são projeto de verdade: a face de saída (o botão
     "ver todos os projetos") gira junto, mas não entra na conta */
  var roloProjetos = [].slice.call(document.querySelectorAll('[data-rolo-item]'))
                       .filter(function (e) { return !e.hasAttribute('data-rolo-cta'); }).length;

  var med = { vh: 0, secs: [], inv: [], rolo: null, idMeio: 0, horaMeio: 0, regua: false };
  var segs = [];

  function topoDoc(el) {
    return el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
  }

  /* ---- a régua ----
     Um segmento por seção, com peso igual à altura real dela no
     documento: a régua mede o documento, não conta seções. */
  /* A régua lateral saiu (03/09) e a navegação de seções subiu para
     o cabeçalho. Esta função deixou de CRIAR os links e passou a
     ENCONTRÁ-LOS: eles agora moram no HTML, escritos à mão.

     A diferença não é estilística. Construídos por JS, os links não
     existiam sem script — e este site tem como princípio funcionar
     com o motor morto. Escritos no HTML, a navegação inteira
     funciona sem uma linha de JavaScript; o script só acrescenta o
     realce da seção corrente, que é enfeite e pode faltar.

     O `segs` continua com a mesma forma de antes ({el, fill, ...})
     porque o laço do `pintar()` não mudou — ele só não tem mais
     barra de preenchimento para escrever, e `fill` vem nulo. */
  /* Duas coisas ao mesmo tempo, e por isso `segs` tem dois campos:

     · `el` é o LINK do cabeçalho, escrito à mão no HTML. O script
       não o cria — só marca qual está ativo. A navegação inteira
       funciona com o motor morto; o realce é que é enfeite.
     · `fill` é o segmento da barra de progresso lateral, esse sim
       montado aqui: são um por seção, com altura proporcional à
       altura real dela no documento, e não dá para escrever isso à
       mão sem medir a página.

     A barra MEDE, não navega — os segmentos são <span>, não <a>.
     Um índice clicável aqui seria a mesma navegação do cabeçalho
     repetida na mesma tela. */
  function montarRegua() {
    if (!secoes.length) return;

    if (apEscala) {
      apEscala.textContent = '';
      document.documentElement.classList.add('js--regua');
    }

    segs = secoes.map(function (secao) {
      var id = secao.getAttribute('id');
      var el = null;
      for (var i = 0; i < navLinks.length; i++) {
        if (navLinks[i].getAttribute('href') === '#' + id) { el = navLinks[i]; break; }
      }

      var fill = null;
      if (apEscala) {
        var seg = document.createElement('span');
        fill = document.createElement('i');
        seg.className  = 'aparato__seg';
        fill.className = 'aparato__seg-feito';
        seg.appendChild(fill);
        apEscala.appendChild(seg);
        segEls.push(seg);
      }

      return { el: el, fill: fill, ativo: false, feito: false, altura: -1 };
    });
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

    /* o rolo mede o TRILHO, não os itens: o curso útil é a altura da
       seção menos uma tela — é nesse trecho que o tambor dá a volta
       inteira, e é ele que o progresso divide. */
    if (rolo) {
      var alt = rolo.offsetHeight;
      var t = topoDoc(rolo);
      med.rolo = { topo: t, base: t + alt, curso: Math.max(1, alt - med.vh) };
    }

    /* o aparato é fixo: a posição dos dois blocos na TELA não muda
       com a rolagem, então basta medi-la uma vez */
    if (apId)   { var a = apId.getBoundingClientRect();   med.idMeio   = a.top + a.height / 2; }
    if (apHora) { var b = apHora.getBoundingClientRect(); med.horaMeio = b.top + b.height / 2; }

    /* Há o que pintar se QUALQUER um dos dois estiver em cena: a
       barra lateral (acima de 1025) ou os links do cabeçalho
       (acima de 900). No telefone nenhum dos dois existe e o laço
       inteiro é pulado. */
    med.regua = !!((apEscala && apEscala.offsetParent !== null) ||
                   (navLinks.length && navLinks[0].offsetParent !== null));

    /* a régua atravessa quase a tela inteira: para saber o quanto
       dela está sobre fundo escuro num dado momento é preciso a
       faixa, não um ponto. Fixa na tela, medida uma vez. */
    if (apEscala) {
      var e = apEscala.getBoundingClientRect();
      med.escTopo = e.top;
      med.escAlt  = Math.max(1, e.height);
    }

    /* a faixa que o cabeçalho ocupa na tela — usada para decidir se
       ele está sobre uma seção de tinta */
    med.topoAlt = topo ? topo.getBoundingClientRect().height : 0;

    med.secs.forEach(function (s, i) {
      /* `--peso` era a altura do segmento na régua, proporcional à
         altura real da seção. A régua não existe mais; o link do
         cabeçalho tem largura de texto, não de peso. A linha fica
         só porque `segs` continua sendo a ponte entre seção e
         elemento — e `el` pode ser NULO agora: "Abertura" é uma
         seção sem link na nav (a marca já leva ao topo). */
      if (segs[i] && segs[i].el) segs[i].el.style.setProperty('--peso', s.alt.toFixed(0));
    });

    ultimoY = -1;   /* força o próximo quadro a redesenhar */
  }

  /* ---- a troca de seção ----
     Um token por troca. Sem ele, atravessar três seções em rolagem
     rápida deixava três setTimeout de 200ms na fila e o rótulo podia
     terminar exibindo a seção do meio. */
  var secaoAtual = '00';
  var trocaAtual = 0;

  /* A barra lateral virou SÓ a barra (04/09): o rótulo de número e
     nome saiu dela, porque era texto largo dentro de um contêiner
     de 3px e transbordava para dentro da coluna de conteúdo. Esta
     função sobrevive porque o rótulo pode voltar; enquanto ele não
     existe, ela sai cedo.

     ⚠ Os dois `if` são necessários, não redundantes: `aparato`
     continua existindo (é a barra), mas `apNum`/`apSec` não. Sem o
     segundo, isto lançava quatro vezes por carga. */
  function trocarSecao(num, nome) {
    if (!aparato || num === secaoAtual) return;
    if (!apNum || !apSec) { secaoAtual = num; return; }
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
        if (seg.fill && h !== seg.altura) { seg.altura = h; seg.fill.style.height = h + '%'; }

        var ativo = (i === corrente);
        if (ativo !== seg.ativo) {
          seg.ativo = ativo;
          if (segEls[i]) segEls[i].classList.toggle('is-ativo', ativo);
          if (seg.el) {
            seg.el.classList.toggle('is-ativo', ativo);
            /* aria-current diz ao leitor de tela o que a cor diz ao
               olho: esta é a seção em que você está. */
            if (ativo) seg.el.setAttribute('aria-current', 'true');
            else seg.el.removeAttribute('aria-current');
          }
          if (ativo) trocarSecao(s.num, s.nome);
        }
        var feito = (i < corrente);
        if (feito !== seg.feito) {
          seg.feito = feito;
          if (segEls[i]) segEls[i].classList.toggle('is-feito', feito);
          if (seg.el) seg.el.classList.toggle('is-feito', feito);
        }
      }

      /* cada bloco do aparato decide a própria cor pelo que está
         atrás DELE, não pela seção corrente: o instrumento atravessa
         a tela inteira e, na travessia, topo e rodapé estão sobre
         fundos diferentes. */
      pintarBloco(apId,   y + med.idMeio);
      pintarBloco(apHora, y + med.horaMeio);

      /* A RÉGUA TAMBÉM TROCA DE COR — mas por fração, não por
         chaveamento. Os dois rótulos são blocos pequenos: para eles
         "estou sobre fundo escuro" é sim ou não. A régua tem 700px de
         altura e passa metade da travessia com um pé em cada fundo;
         um `toggle` ali pisca no meio do gesto.

         Então mede-se o QUANTO: a fração da faixa da régua que está
         dentro de seções invertidas vira o próprio fator de mistura
         entre a ardósia e o off-white. Como a fração cresce enquanto a
         aresta do fundo varre a régua, a cor sobe junto com a rolagem
         em vez de saltar. */
      var eTopo = y + med.escTopo, eBase = eTopo + med.escAlt, cob = 0;
      for (var q = 0; q < med.inv.length; q++) {
        var c1 = eTopo > med.inv[q].topo ? eTopo : med.inv[q].topo;
        var c2 = eBase < med.inv[q].base ? eBase : med.inv[q].base;
        if (c2 > c1) cob += c2 - c1;
      }
      var f = cob / med.escAlt;
      if (f > 1) f = 1;

      /* o cabeçalho olha só a FAIXA DELE, não a barra inteira: o que
         importa é o que passa atrás dos 60px do topo da tela. */
      var hTopo = y + med.topoAlt;
      var escuroNoTopo = false;
      for (var w = 0; w < med.inv.length; w++) {
        if (hTopo >= med.inv[w].topo && hTopo <= med.inv[w].base) { escuroNoTopo = true; break; }
      }

      /* só escreve quando a mistura andou meio por cento: sem isso
         seria uma escrita de estilo por quadro para nada */
      if (Math.abs(f - reguaClaro) > 0.005) {
        reguaClaro = f;
        /* Marsala (149 82 81) até off-white (243 240 232). Marsala
           sobre a tinta dá 2,15:1 — a barra sumiria nas seções
           invertidas. A interpolação é por FRAÇÃO da barra que está
           sobre fundo escuro, e não por chaveamento: ela tem a
           altura da tela e passa metade da travessia com um pé em
           cada fundo, onde um toggle piscaria no meio do gesto. */
        if (apEscala) {
          apEscala.style.setProperty('--regua-rgb',
            Math.round(149 +  94 * f) + ' ' +
            Math.round( 82 + 158 * f) + ' ' +
            Math.round( 81 + 151 * f));
        }
        /* o cabeçalho troca no mesmo compasso, mas por limiar: ele
           é um bloco pequeno e fixo no topo, não uma faixa de tela
           inteira — para ele "estou sobre escuro" é sim ou não. */
        if (topo) topo.classList.toggle('is-escuro', escuroNoTopo);
      }
    }

    /* O ROLO — o tambor 3D de Projetos.
       Uma conta só, sem ler layout nenhum: o progresso dentro do
       trilho vira um índice contínuo, e o índice vira ângulo. A face
       k está de frente (0°); a de trás dela, a 30°; e assim por
       diante, nos dois sentidos. */
    if (med.rolo && roloItens.length) {
      var p = (y - med.rolo.topo) / med.rolo.curso;
      p = p < 0 ? 0 : (p > 1 ? 1 : p);

      var k = p * (roloItens.length - 1);

      for (var r = 0; r < roloItens.length; r++) {
        var delta = k - r;
        var op    = 1 - suavizar(ROLO_OP_INI, ROLO_OP_FIM, Math.abs(delta));

        /* O ângulo também tem platô. Linear (ang = delta * passo), a
           face da frente só fica reta no ponto exato da troca — em
           todo o resto do trecho ela carrega alguns graus de
           inclinação, e num parágrafo de oito linhas isso lê como
           itálico torto. Com a suavização a face fica praticamente
           reta na maior parte do curso e gira rápido na passagem.
           Custa a equidistância angular entre as faces, que ninguém
           percebe; devolve texto reto, que todo mundo percebe. */
        var d1 = Math.abs(delta);
        if (d1 > 1) d1 = 1;
        /* o platô começa em 0,30 e não em 0: suavizar(0,1,x) ainda
           devolvia 21° no meio do trecho de leitura. Deslocado, a
           face fica a ~1° enquanto está sendo lida e concentra o
           giro no fim, quando já está saindo. */
        var giro = (delta < 0 ? -1 : 1) * suavizar(0.30, 1, d1) * ROLO_PASSO_ANG;
        /* fora do primeiro vizinho o ângulo volta a ser linear, senão
           as faces distantes empilhariam todas no mesmo lugar */
        if (Math.abs(delta) > 1) giro = delta * ROLO_PASSO_ANG;

        var est = roloItens[r].style;
        est.setProperty('--ang', giro.toFixed(2) + 'deg');
        est.setProperty('--op', op.toFixed(3));
        /* A face que sumiu sai do caminho por inteiro. `aria-hidden`
           sozinho não bastava depois que cada projeto ganhou um
           "Saiba mais": ele esconde do leitor de tela mas NÃO tira
           do Tab, e o teclado passava por cinco links invisíveis
           antes de sair da seção. `inert` tira dos três de uma vez —
           foco, ponteiro e árvore de acessibilidade. */
        var sumiu = op < 0.05;
        roloItens[r].setAttribute('aria-hidden', sumiu ? 'true' : 'false');
        if (sumiu) roloItens[r].setAttribute('inert', '');
        else roloItens[r].removeAttribute('inert');
      }

      /* o vídeo de cada projeto acompanha a face dele, mas some mais
         rápido que o texto: com a mesma curva os quatro ficariam
         translúcidos ao mesmo tempo no meio do caminho e o fundo
         viraria uma sopa. 1.6 dá um crossfade curto. */
      for (var v = 0; v < roloVideos.length; v++) {
        var ov = 1 - Math.abs(k - v) * 1.6;
        roloVideos[v].style.setProperty('--opv', (ov < 0 ? 0 : ov).toFixed(3));
      }

      /* O contador conta PROJETOS, e a última face não é um: é o
         botão de saída. Em vez de mostrar "06 / 05", o contador
         inteiro sai de cena enquanto essa face está de frente. */
      var atual = Math.round(k) + 1;
      if (atual !== roloUltimo) {
        roloUltimo = atual;
        if (roloConta && atual <= roloProjetos) {
          roloConta.textContent = (atual < 10 ? '0' : '') + atual;
        }
        if (roloContaCaixa) {
          roloContaCaixa.classList.toggle('is-fora', atual > roloProjetos);
        }
      }

      /* Só UM vídeo toca, e só enquanto a seção está em cena. Quatro
         vídeos rodando ao mesmo tempo — ou continuando a rodar depois
         que o leitor passou — é gasto de bateria sem ninguém olhando.
         O play/pause acontece na TROCA, não a cada quadro: chamar
         play() 60 vezes por segundo devolve uma enxurrada de
         promises rejeitadas. */
      var emCena = (y + med.vh > med.rolo.topo) && (y < med.rolo.base);
      var querTocar = emCena ? Math.round(k) : -1;

      if (querTocar !== roloTocando) {
        if (roloVideos[roloTocando]) roloVideos[roloTocando].pause();
        roloTocando = querTocar;
        var alvoV = roloVideos[roloTocando];
        if (alvoV) {
          var pr = alvoV.play();
          /* navegador que recusa autoplay não pode derrubar o resto */
          if (pr && pr.catch) pr.catch(function () {});
        }
      }
    }

    /* ---- O CABEÇALHO DINÂMICO ----
       Dois estados, decididos aqui porque aqui já se sabe o `y`.

       `is-preso`: assim que a rolagem sai do topo, ele deixa de ser
       transparente e vira barra — fundo translúcido e fio embaixo.

       `is-fora`: rolando PARA BAIXO ele sai de cena; ao subir, volta.
       É isto que resolve a sobreposição no rolo, que é `sticky` e
       ocupa a tela inteira: descendo, o leitor está lendo o projeto
       e não precisa do cabeçalho; subindo, ele quer navegar.

       O limiar de 6px não é capricho: sem ele, o quique elástico do
       fim da página (e o próprio Lenis, que interpola) fazem o
       cabeçalho piscar entrando e saindo. */
    if (topo) {
      topo.classList.toggle('is-preso', y > 8);

      var d = y - topoUltimoY;
      if (d > 6 && y > med.topoAlt * 2) topoFora = true;
      else if (d < -6 || y <= med.topoAlt) topoFora = false;
      if (Math.abs(d) > 1) topoUltimoY = y;

      topo.classList.toggle('is-fora', topoFora);
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
  var reguaClaro = -1;   /* fração da régua sobre fundo escuro */
  var topoUltimoY = 0;   /* para saber a DIREÇÃO da rolagem */
  var topoFora = false;

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
    if (!relogios.length) return;

    var opcoes = menosMovimento
      ? { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false }
      : { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    var tique = function () {
      var agora = new Date().toLocaleTimeString('pt-BR', opcoes);
      for (var i = 0; i < relogios.length; i++) relogios[i].textContent = agora;
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

  /* Monta o tambor. É esta função que TROCA a lista empilhada pelo
     cilindro — nunca o contrário: sem ela (script fora do ar, ou
     leitor que pediu menos movimento) a seção continua sendo quatro
     nomes legíveis, em pé. */
  function ligarRolo() {
    if (!rolo || !roloItens.length || menosMovimento) return;
    rolo.style.setProperty('--rolo-n', String(roloItens.length));
    document.documentElement.classList.add('js--rolo');
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
  /* 06b2. PARALLAX DA ABERTURA ---------------------------------
     O fundo desce mais devagar que a página: a imagem se desloca
     18% da rolagem (e só durante a primeira tela). É UMA escrita de
     `--par` por quadro, num único elemento, e o CSS transforma — só
     `transform`, nada de layout, nada lido dentro do quadro (a
     rolagem vem do evento, que já a entrega). A imagem é ampliada
     12% no CSS para o deslocamento nunca expor a borda. Desligado
     em movimento reduzido: sem a classe `js--parallax` no <html> a
     regra de CSS nem existe. */
  function ligarParalaxe() {
    var img = document.querySelector('.abertura__fundo img');
    if (!img || menosMovimento) return;
    document.documentElement.classList.add('js--parallax');

    var quadro = 0;
    function escrever() {
      quadro = 0;
      var y = window.pageYOffset || 0;
      if (y > window.innerHeight * 1.2) return;
      img.style.setProperty('--par', (y * 0.18).toFixed(1) + 'px');
    }
    window.addEventListener('scroll', function () {
      if (!quadro) quadro = window.requestAnimationFrame(escrever);
    }, { passive: true });
  }


  /* 06b3. FOTO ENTRA SUAVE ----------------------------------------
     O "esqueleto" já existe: cada moldura de foto tem o tom
     `--papel-2` por trás. O que faltava é a foto ENTRAR por cima
     dele em vez de estalar no meio da rolagem. Só as fotos que
     AINDA NÃO carregaram ganham `is-pendente` (opacidade 0), e
     `load`/`error` tiram a classe. Foto que já veio do cache nunca
     recebe a classe — não pisca. Sem JavaScript a classe nunca é
     posta e a foto aparece como sempre. */
  function ligarFotosSuaves() {
    if (menosMovimento) return;
    [].slice.call(document.querySelectorAll(
      '.styling-grid__foto__real, .caso__foto img, .marcas-mini__item img'
    )).forEach(function (img) {
      if (img.complete) return;
      img.classList.add('is-pendente');
      var pronta = function () { img.classList.remove('is-pendente'); };
      img.addEventListener('load', pronta, { once: true });
      img.addEventListener('error', pronta, { once: true });
      if (img.complete) pronta();
    });
  }


  /* 06c. LER MAIS — bios da seção Sobre ------------------------
     O texto inteiro sempre esteve no HTML; o corte de 3 linhas é
     só CSS (`-webkit-line-clamp`). Aqui a única função é medir se
     o corte está de fato tirando alguma coisa (`scrollHeight` >
     `clientHeight`) e, só nesse caso, mostrar o botão. Uma bio
     curta (a do Murilo, pendente) pode nem precisar de botão — o
     texto cabe inteiro em 3 linhas e o corte não faz nada.
     Reaproveitado no resize: a mesma bio pode passar de "cabe" a
     "não cabe" só por a coluna ter ficado mais estreita. */
  var leiaMaisLigado = false;

  function medirLeiaMais() {
    [].slice.call(document.querySelectorAll('.sobre__bio')).forEach(function (bio) {
      var p = bio.querySelector('p:last-of-type');
      var bt = bio.querySelector('[data-leiamais]');
      if (!p || !bt) return;
      /* uma bio que já está aberta não deve fechar sozinha só
         porque a janela mudou de tamanho */
      if (bio.classList.contains('is-expandida')) return;
      bt.hidden = p.scrollHeight <= p.clientHeight + 1;
    });
  }

  function ligarLeiaMais() {
    if (!document.querySelector('[data-leiamais]')) return;
    medirLeiaMais();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(medirLeiaMais);

    if (leiaMaisLigado) return;
    leiaMaisLigado = true;
    document.addEventListener('click', function (e) {
      var bt = e.target.closest('[data-leiamais]');
      if (!bt) return;
      var bio = bt.closest('.sobre__bio');
      var expandida = bio.classList.toggle('is-expandida');
      bt.textContent = expandida ? 'Ler menos' : 'Ler mais';
      bt.setAttribute('aria-expanded', String(expandida));
    });
  }


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
    if (menosMovimento) return;

    /* NO TOQUE, SEM LENIS (29/09) — a Jozzi pediu um scroll
       "dinâmico, que acabe rápido" no telefone. O `lerp: 0.09` do
       desktop existe para suavizar a RODA DO MOUSE, que anda em
       saltos; o dedo já é contínuo, e o Lenis por cima dele só
       acrescentava um atraso de assentamento que o toque nativo do
       telefone não tem — a rolagem por inércia do próprio sistema
       operacional já é rápida e já acaba rápido. */
    var pointerGrosso = window.matchMedia('(pointer: coarse)').matches;

    if (!pointerGrosso && typeof window.Lenis !== 'undefined') {
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
      return;
    }

    /* sem Lenis: a rolagem por âncora ainda precisa ser suave, só
       que pela API nativa — sem o atraso de assentamento */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var destino = document.querySelector(link.getAttribute('href'));
        if (!destino) return;
        e.preventDefault();
        destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  /* A cortina é a chegada AO SITE, e não a chegada a cada página.
     Vindo de dentro — voltar de um projeto de styling para Serviços,
     pular da grade de styling para um projeto, sair de um projeto
     para Projetos — ela deixa de ser entrada e vira pedágio: o
     leitor já esperou uma vez, já leu a frase, e agora só quer
     chegar. Pior: são 1,7s antes de qualquer conteúdo aparecer, num
     gesto que ele mesmo pediu e espera imediato.

     Uma marca de sessão resolve sem cookie e sem estado no
     servidor. Ela morre quando a aba fecha, então a próxima visita
     de verdade tem a cortina de volta inteira — que é o ponto: a
     entrada da marca acontece uma vez, e uma vez só.

     `sessionStorage` LANÇA em navegação privada de alguns
     navegadores e com cookies de terceiros bloqueados — daí o
     try/catch e não um `if`. Falhar aqui devolve o comportamento
     antigo (mostrar a cortina), que é feio mas nunca quebra a
     página. */
  function jaEntrou() {
    try { return window.sessionStorage.getItem('jozzi:entrou') === '1'; }
    catch (e) { return false; }
  }

  function marcarEntrada() {
    try { window.sessionStorage.setItem('jozzi:entrou', '1'); } catch (e) {}
  }

  function ligarCarregamento(aoTerminar) {
    var cortina = document.getElementById('carregando');

    /* sem cortina no HTML, leitor que pediu menos movimento, ou
       navegação interna dentro da mesma sessão: o site começa
       direto. O conteúdo ainda ENTRA — as máscaras do módulo 02
       tocam normalmente — só não espera atrás de um painel opaco. */
    if (!cortina || menosMovimento || jaEntrou()) {
      if (cortina && cortina.parentNode) cortina.parentNode.removeChild(cortina);
      aoTerminar();
      return;
    }

    marcarEntrada();

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


  /* 10. GALERIA AMPLIADA ------------------------------------
     O <dialog> nativo já entrega foco preso, Esc e backdrop. O que
     falta é só: qual foto está no palco, e como andar entre elas.

     Nada aqui é obrigatório para o conteúdo existir — sem
     JavaScript a grade de fotos continua completa na página, e é
     por isso que os botões de ampliar nascem no HTML mas não fazem
     nada até este módulo ligar.
     ----------------------------------------------------------- */
  /* 06d. MENU DO TELEFONE ---------------------------------
     Mesmo padrão da lupa: <dialog> nativo, showModal(), Esc e
     foco preso vêm do navegador. Fecha pelo X, tocando fora, por
     Esc, ou clicando em qualquer link de dentro — é navegação por
     âncora, então o gesto natural é o menu sair do caminho assim
     que a pessoa escolhe para onde ir. */
  function ligarMenu() {
    var menu = document.querySelector('[data-menu]');
    var abrir = document.querySelector('[data-menu-abre]');
    if (!menu || !abrir || !menu.showModal) return;

    var fechar = menu.querySelector('[data-menu-fecha]');
    var saida = null;

    function abrirMenu() {
      if (menu.open) return;
      menu.classList.remove('is-aberto');
      menu.showModal();
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { menu.classList.add('is-aberto'); });
      });
    }

    function fecharMenu() {
      if (!menu.open) return;
      menu.classList.remove('is-aberto');
      if (menosMovimento) { menu.close(); return; }
      window.clearTimeout(saida);
      saida = window.setTimeout(function () { if (menu.open) menu.close(); }, 420);
    }

    abrir.addEventListener('click', abrirMenu);
    if (fechar) fechar.addEventListener('click', fecharMenu);
    menu.addEventListener('cancel', function (e) { e.preventDefault(); fecharMenu(); });
    menu.addEventListener('click', function (e) { if (e.target === menu) fecharMenu(); });
    [].slice.call(menu.querySelectorAll('[data-menu-link]')).forEach(function (a) {
      a.addEventListener('click', fecharMenu);
    });
    menu.addEventListener('close', function () { menu.classList.remove('is-aberto'); abrir.focus(); });
  }


  function ligarLupa() {
    var lupa = document.getElementById('lupa');
    if (!lupa || !lupa.showModal) return;

    var botoes = [].slice.call(document.querySelectorAll('[data-lupa-abre]'));
    if (!botoes.length) return;

    var img    = lupa.querySelector('[data-lupa-img]');
    var conta  = lupa.querySelector('[data-lupa-conta]');
    var total  = lupa.querySelector('[data-lupa-total]');
    var ant    = lupa.querySelector('[data-lupa-ant]');
    var prox   = lupa.querySelector('[data-lupa-prox]');
    var fechar = lupa.querySelector('[data-lupa-fechar]');

    /* a fonte da verdade é a própria grade: nenhuma lista de
       arquivos duplicada no JS. Acrescentar uma foto na página é
       acrescentar uma foto na galeria. */
    var fotos = botoes.map(function (b) {
      var im = b.querySelector('img');
      return { src: im.getAttribute('src'), alt: im.getAttribute('alt') || '' };
    });

    var atual = 0;
    var voltarPara = null;   /* para devolver o foco ao fechar */

    if (total) total.textContent = (fotos.length < 10 ? '0' : '') + fotos.length;

    /* uma foto só não tem para onde navegar */
    if (fotos.length < 2) {
      if (ant) ant.hidden = true;
      if (prox) prox.hidden = true;
    }

    function mostrar(i) {
      atual = (i + fotos.length) % fotos.length;   /* dá a volta */
      img.setAttribute('src', fotos[atual].src);
      img.setAttribute('alt', fotos[atual].alt);
      if (conta) conta.textContent = (atual + 1 < 10 ? '0' : '') + (atual + 1);
    }

    botoes.forEach(function (b, i) {
      b.addEventListener('click', function () {
        voltarPara = b;
        mostrar(i);
        lupa.showModal();
      });
    });

    if (prox)   prox.addEventListener('click', function () { mostrar(atual + 1); });
    if (ant)    ant.addEventListener('click', function () { mostrar(atual - 1); });
    if (fechar) fechar.addEventListener('click', function () { lupa.close(); });

    lupa.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(atual + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); mostrar(atual - 1); }
    });

    /* clique fora da foto fecha. O <dialog> ocupa a tela inteira,
       então o alvo do clique É o dialog quando se clica no vazio —
       clicar na imagem ou num botão não borbulha até aqui. */
    lupa.addEventListener('click', function (e) {
      if (e.target === lupa || e.target.classList.contains('lupa__palco')) lupa.close();
    });

    /* devolve o foco ao botão que abriu: sem isto o leitor de
       teclado volta para o começo do documento */
    lupa.addEventListener('close', function () {
      if (voltarPara) voltarPara.focus();
    });
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

      /* ligarRolo ANTES de ligarMarca: é ele que põe .js--rolo, e é
         .js--rolo que dá ao trilho a altura alta. ligarMarca chama
         medir(), e medir lê essa altura — na ordem inversa o rolo
         seria medido com o tamanho da lista empilhada e o tambor
         giraria inteiro em poucos pixels de rolagem. */
      ligarRolo();
      ligarMenu();
      ligarLupa();
      ligarMarca();
      ligarRelogio();
      ligarServicos();
      ligarCursor();
      ligarCopia();
      ligarLeiaMais();
      ligarParalaxe();
      ligarFotosSuaves();
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
        medirLeiaMais();
      }, 180);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

})();
