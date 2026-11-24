/* ============================================================
   JozziTacticalMatrix — o painel de combo da seção 03 (11/09)

   Pedido original: um componente React com framer-motion, lucide e
   Tailwind. O site não tem nada disso (nem bundler), e a Jozzi
   decidiu integrar no stack atual: JS nativo + o CSS do próprio
   site, nenhuma biblioteca nova. As cores são as duas da marca.

   REGRA DE DADOS: o painel não inventa nada. As frentes, os nomes e
   os entregáveis são LIDOS dos seis `.serv__card` da própria seção.
   A telemetria é contagem disso (frentes ativas, entregáveis). Sem
   preço, sem prazo, sem porcentagem — a Jozzi não forneceu nenhum.

   O WhatsApp da Jozzi é um link `wa.me/message/…`, que NÃO aceita
   texto pré-preenchido. Decisão da Jozzi: o botão copia a mensagem
   montada para a área de transferência e abre o link; a pessoa só
   cola.

   UMA TELA, ZERO ROLAGEM (12/09): o painel tem 100dvh e nada nele
   rola. Quem faz caber é o módulo 05 (densidade): mede e escolhe o
   nível de detalhe que cabe na altura disponível. Ver a seção 10c2
   do CSS.

   REDESIGN (28/09): a Jozzi pediu menos "painel tático" e mais
   alinhado ao resto do site. Saíram os pontos do radar
   (desenharPontos) e a onda no clique — nenhum dos dois tinha
   função além de decoração. O texto visível trocou "Protocolo" por
   "Combo" e "detalhes táticos" por "detalhes", em index.html.
   ============================================================ */
(function () {
  'use strict';

  var raiz = document.getElementById('JozziTacticalMatrix');
  if (!raiz) return;

  var menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WHATSAPP = raiz.getAttribute('data-whatsapp');
  /* NÚMERO COMERCIAL (opcional). O link `wa.me/message/…` da Jozzi
     NÃO carrega texto: o redirecionamento dele descarta o `?text=`
     (testado em 01/10 — a resposta é idêntica com e sem o parâmetro).
     Só `wa.me/<número>?text=…` preenche a conversa. Enquanto
     `data-numero` estiver vazio no HTML, vale o fluxo antigo (copiar
     e colar); com o número, a mensagem já vai preenchida e a cópia
     deixa de ser necessária. Formato: só dígitos com DDI, ex.:
     55DDNÚMERO. */
  var NUMERO = (raiz.getAttribute('data-numero') || '').replace(/\D/g, '');

  function linkWhatsapp(sel) {
    if (!NUMERO || !sel.length) return WHATSAPP;
    return 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(mensagem(sel));
  }
  var SCRAMBLE_MS = 300;
  var CARACTERES = '0123456789ABCDEF#%&*+/<>=';


  /* 01. AS FRENTES, LIDAS DOS CARDS ------------------------- */
  var servicos = [].slice.call(document.querySelectorAll('#servicos .serv__card')).map(function (card, i) {
    var bt = card.querySelector('.serv__nome');
    var rot = card.querySelector('.serv__rotulo');
    return {
      slug: bt && bt.id ? bt.id.replace('serv-bt-', '') : 'frente-' + (i + 1),
      cod:  dois(i + 1),
      nome: rot ? rot.textContent.trim() : '',
      tags: [].slice.call(card.querySelectorAll('.serv__tags li')).map(function (li) {
        return li.textContent.trim();
      })
    };
  }).filter(function (s) { return s.nome; });

  if (!servicos.length) return;

  function dois(n) { return (n < 10 ? '0' : '') + n; }
  function existe(slug) { return servicos.some(function (s) { return s.slug === slug; }); }

  /* Os três protocolos. Os NOMES vieram do pedido; a composição de
     cada um é um ponto de partida, e a pessoa ajusta frente a
     frente. Uma frente que sumir da seção some do protocolo junto. */
  var PRESETS = [
    { id: 'launch',            cod: '01', nome: 'Launch',
      frentes: ['branding', 'social-media', 'styling', 'captacao-de-conteudo'] },
    { id: 'content-scaling',   cod: '02', nome: 'Content Scaling',
      frentes: ['social-media', 'captacao-de-conteudo', 'trafego-pago'] },
    { id: 'full-stack-growth', cod: '03', nome: 'Full Stack Growth',
      frentes: servicos.map(function (s) { return s.slug; }) }
  ].map(function (p) {
    p.frentes = p.frentes.filter(existe);
    return p;
  });


  /* 02. ESTADO ---------------------------------------------- */
  var ativos = {};          /* slug → true */
  var protocolo = null;     /* preset em uso, ou null = personalizado */

  function selecionados() {
    return servicos.filter(function (s) { return ativos[s.slug]; });
  }

  function aplicarPreset(p) {
    ativos = {};
    p.frentes.forEach(function (slug) { ativos[slug] = true; });
    protocolo = p;
  }

  /* depois de um ajuste manual, se a combinação bater exatamente com
     um protocolo, ele volta a acender */
  function reconhecerPreset() {
    var sel = selecionados().map(function (s) { return s.slug; }).sort().join('|');
    protocolo = null;
    PRESETS.forEach(function (p) {
      if (p.frentes.slice().sort().join('|') === sel) protocolo = p;
    });
  }


  /* 03. CONTROLES ------------------------------------------- */
  var caixaPresets = raiz.querySelector('[data-mz-presets]');
  var caixaFrentes = raiz.querySelector('[data-mz-frentes]');
  var btPresets = [];
  var btFrentes = [];

  PRESETS.forEach(function (p) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'mz-preset';
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<span class="mz-cod">' + p.cod + '</span><span class="mz-preset__n">' + esc(p.nome) + '</span>';
    b.addEventListener('click', function () {
      aplicarPreset(p);
      atualizar(true);
    });
    caixaPresets.appendChild(b);
    btPresets.push({ el: b, p: p });
  });

  servicos.forEach(function (s) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'mz-frente';
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<span class="mz-cod">' + s.cod + '</span>' +
                  '<span class="mz-frente__n">' + esc(s.nome) + '</span>' +
                  '<span class="mz-frente__st" aria-hidden="true"></span>';
    b.addEventListener('click', function () {
      if (ativos[s.slug]) delete ativos[s.slug]; else ativos[s.slug] = true;
      reconhecerPreset();
      atualizar(true);
    });
    caixaFrentes.appendChild(b);
    btFrentes.push({ el: b, s: s });
  });

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }


  /* 04. A MENSAGEM ------------------------------------------ */
  function mensagem(sel) {
    var l = ['Olá, Jozzi! Vim pelo site e quero um orçamento personalizado.', ''];
    l.push('Plano: ' + (protocolo ? protocolo.nome : 'personalizado'));
    sel.forEach(function (s) {
      l.push('• ' + s.nome + (s.tags.length ? ' (' + s.tags.join(', ') + ')' : ''));
    });
    return l.join('\n');
  }


  /* 05. O QUE OS CARDS MOSTRAM ------------------------------
     Cada alvo (card no desktop, aba da folha no telefone) é
     reescrito inteiro a cada mudança. Os nós com [data-scr] são
     folhas de texto — o embaralhador troca o textContent deles, e
     um nó com filhos perderia os filhos.

     Cada alvo tem no máximo DOIS filhos: o bloco de cima e o de
     baixo. O CSS os afasta (`space-between`), e é assim que a nota
     e o botão do WhatsApp ficam ancorados no rodapé do card. */
  var total = servicos.length;

  function htmlEscopo(sel) {
    if (!sel.length) return '<p class="mz-vazio">Nenhuma frente selecionada. Escolha um plano ou ligue as frentes acima.</p>';
    return '<ol class="mz-escopo" role="list">' + sel.map(function (s) {
      return '<li class="mz-escopo__i">' +
               '<span class="mz-cod" data-scr>' + s.cod + '</span>' +
               '<div><p class="mz-escopo__n" data-scr>' + esc(s.nome) + '</p>' +
               (s.tags.length ? '<p class="mz-escopo__tags" data-scr>' + esc(s.tags.join(' · ')) + '</p>' : '') +
               '</div></li>';
    }).join('') + '</ol>';
  }

  function htmlTelemetria(sel) {
    var entregaveis = sel.reduce(function (n, s) { return n + s.tags.length; }, 0);
    var barras = servicos.map(function (s) {
      return '<i class="' + (ativos[s.slug] ? 'is-on' : '') + '"></i>';
    }).join('');
    function linha(rot, val) {
      return '<div class="mz-tel__l"><dt class="mz-rot">' + rot + '</dt><dd class="mz-val" data-scr>' + val + '</dd></div>';
    }
    return '<div class="mz-bloco"><dl class="mz-tel">' +
      linha('Frentes escolhidas', dois(sel.length) + '/' + dois(total)) +
      linha('Entregas previstas', dois(entregaveis)) +
      linha('Plano', esc(protocolo ? protocolo.cod + ' · ' + protocolo.nome : 'Personalizado')) +
      '</dl>' +
      '<div class="mz-barras" aria-hidden="true">' + barras + '</div>' +
      (sel.length ? '<p class="mz-rot mz-tel__sub">Entregas por frente</p><ul class="mz-porfrente" role="list">' +
        sel.map(function (s) {
          return '<li><span class="mz-cod" data-scr>' + s.cod + '</span>' +
                 '<span class="mz-porfrente__n" data-scr>' + esc(s.nome) + '</span>' +
                 '<span class="mz-val" data-scr>' + dois(s.tags.length) + '</span></li>';
        }).join('') + '</ul>' : '') +
      '</div><p class="mz-nota">Somamos as frentes e as entregas listadas nos serviços.</p>';
  }

  function htmlOrcamento(sel) {
    var vazio = !sel.length;
    return '<div class="mz-bloco">' +
      '<p class="mz-orc__txt">Cada projeto parte de um diagnóstico do seu objetivo — por isso o orçamento é conversado, não tabelado.</p>' +
      '<div class="mz-orc__bloco-msg"><p class="mz-rot">Prévia da mensagem</p>' +
      /* a prévia perde a linha em branco (a mensagem copiada não):
         cortada em 3 linhas, a linha vazia virava um "…" solto */
      '<p class="mz-msg" data-scr>' + esc(vazio ? 'Selecione ao menos uma frente.' : mensagem(sel).replace('\n\n', '\n')) + '</p></div>' +
      '</div>' +
      '<div class="mz-bloco mz-orc__pe">' +
      '<a class="mz-cta" data-mz-cta href="' + esc(linkWhatsapp(sel)) + '" target="_blank" rel="noopener noreferrer"' +
        (vazio ? ' aria-disabled="true"' : '') + '>Solicitar orçamento no WhatsApp</a>' +
      '<p class="mz-aviso" role="status" data-mz-aviso>' + (NUMERO ? 'A conversa abre no WhatsApp já com a mensagem preenchida.' : 'A mensagem é copiada ao clicar; no WhatsApp, é só colar.') + '</p>' +
      '<textarea class="mz-copia" data-mz-copia readonly hidden aria-label="Mensagem para copiar"></textarea>' +
      '</div>';
  }

  var MONTA = { escopo: htmlEscopo, telemetria: htmlTelemetria, orcamento: htmlOrcamento };
  var alvos = [].slice.call(raiz.querySelectorAll('[data-mz-alvo]'));
  var cards = raiz.querySelector('[data-mz-cards]');
  var resumo = raiz.querySelector('[data-mz-resumo]');
  var stProtocolo = raiz.querySelector('[data-mz-protocolo]');
  var stContagem = raiz.querySelector('[data-mz-contagem]');
  var vivo = raiz.querySelector('[data-mz-vivo]');
  var avisoVivo = null;

  function atualizar(animar) {
    var sel = selecionados();
    var entregaveis = sel.reduce(function (n, s) { return n + s.tags.length; }, 0);

    btPresets.forEach(function (b) { b.el.setAttribute('aria-pressed', String(protocolo === b.p)); });
    btFrentes.forEach(function (b) { b.el.setAttribute('aria-pressed', String(!!ativos[b.s.slug])); });

    alvos.forEach(function (a) { a.innerHTML = MONTA[a.getAttribute('data-mz-alvo')](sel); });

    stProtocolo.textContent = '· ' + (protocolo ? protocolo.nome : 'Personalizado');
    stContagem.textContent = '· ' + dois(sel.length) + '/' + dois(total);
    resumo.innerHTML = '<span data-scr>' + dois(sel.length) + '/' + dois(total) + ' frentes · ' +
                       dois(entregaveis) + ' entregas</span>';

    /* a densidade é escolhida com o texto FINAL no lugar — antes do
       embaralhador começar a trocar caracteres */
    ajustar();

    if (animar) {
      /* só embaralha o que está na tela: os cards no desktop, o
         resumo no telefone (lá os cards moram na folha fechada) */
      var visiveis = cards.offsetParent !== null ? [].slice.call(cards.querySelectorAll('[data-scr]')) : [];
      if (resumo.offsetParent !== null) visiveis = visiveis.concat([].slice.call(resumo.querySelectorAll('[data-scr]')));
      embaralhar(visiveis);

      /* uma frase só para o leitor de tela, e só quando a pessoa
         para de clicar — não uma a cada frente */
      window.clearTimeout(avisoVivo);
      avisoVivo = window.setTimeout(function () {
        vivo.textContent = 'Plano ' + (protocolo ? protocolo.nome : 'personalizado') + ': ' +
          sel.length + ' de ' + total + ' frentes, ' + entregaveis + ' entregas.';
      }, 450);
    }
  }

  /* 05. DENSIDADE — FAZER CABER SEM ROLAR --------------------
     Uma tela, e nada rola dentro dela. Para cada caixa, tenta o
     nível 0 (tudo) e vai subindo até o conteúdo caber:
       · o painel sobe de nível se transbordar, ou se os cards
         ficariam com menos de CARDS_MIN px de altura;
       · cada card / aba da folha sobe de nível se o corpo
         transbordar.
     Roda depois de cada mudança, no redimensionamento (inclusive
     a barra do celular mudando a dvh) e quando as fontes chegam.
     NÃO roda dentro de quadro de animação: lê layout, e ler layout
     por quadro é exatamente o que o MANUTENCAO proíbe. */
  var CARDS_MIN = 220;

  function transborda(el) { return el.scrollHeight > el.clientHeight + 1; }

  function nivelar(el, attr, excede) {
    for (var n = 0; n <= 3; n++) {
      el.setAttribute(attr, String(n));
      if (!excede()) return;
    }
  }

  function caber(alvo) {
    /* offsetParent nulo = não está na tela (cards no telefone, aba
       escondida, folha fechada): medir ali daria zero */
    if (!alvo || alvo.offsetParent === null) return;
    nivelar(alvo, 'data-denso', function () { return transborda(alvo); });
  }

  function ajustar() {
    if (raiz.hidden) return;
    var comCards = cards.offsetParent !== null;
    nivelar(raiz, 'data-denso-painel', function () {
      return transborda(raiz) || (comCards && cards.clientHeight < CARDS_MIN);
    });
    alvos.forEach(caber);
  }


  /* 06. O EMBARALHADOR — 300ms ------------------------------
     Cada caractere gira entre hexadecimais e símbolos e trava da
     esquerda para a direita. Espaço e quebra de linha nunca giram:
     é o que mantém a forma do texto legível enquanto ele assenta.
     Uma mudança nova cancela a anterior (o `giro`), e como os alvos
     são reescritos inteiros, nada fica preso no meio. */
  var giro = 0;

  function embaralhar(els) {
    if (menosMovimento || !els.length) return;
    var id = ++giro;
    var itens = els.map(function (el) { return { el: el, fim: el.textContent }; });
    var t0 = null;
    raiz.setAttribute('aria-busy', 'true');

    function passo(t) {
      if (id !== giro) return;
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / SCRAMBLE_MS);

      itens.forEach(function (it) {
        var s = it.fim;
        if (p >= 1) { it.el.textContent = s; return; }
        var trava = Math.floor(p * s.length);
        var out = '';
        for (var i = 0; i < s.length; i++) {
          var c = s.charAt(i);
          out += (i < trava || c === ' ' || c === '\n') ? c : CARACTERES.charAt((Math.random() * CARACTERES.length) | 0);
        }
        it.el.textContent = out;
      });

      if (p < 1) window.requestAnimationFrame(passo);
      else raiz.removeAttribute('aria-busy');
    }
    window.requestAnimationFrame(passo);
  }


  /* 07. COPIAR E ABRIR --------------------------------------
     O clipboard é chamado DENTRO do clique e o link segue o seu
     caminho normal (sem preventDefault, sem window.open): é o que
     evita o bloqueador de pop-up. Se a cópia falhar, a mensagem
     aparece num campo selecionado para copiar à mão. */
  raiz.addEventListener('click', function (e) {
    var cta = e.target.closest('[data-mz-cta]');
    if (!cta) return;
    var bloco = cta.parentNode;
    var aviso = bloco.querySelector('[data-mz-aviso]');
    var campo = bloco.querySelector('[data-mz-copia]');
    var sel = selecionados();

    if (!sel.length) {
      e.preventDefault();
      aviso.textContent = 'Selecione ao menos uma frente para montar a mensagem.';
      return;
    }

    /* com número, o href já carrega o texto — nada a copiar */
    if (NUMERO) return;

    var msg = mensagem(sel);
    function manual() {
      campo.value = msg;
      campo.hidden = false;
      /* o campo ocupa altura: o card pode precisar apertar */
      caber(cta.closest('[data-mz-alvo]'));
      campo.focus();
      campo.select();
      aviso.textContent = 'Não foi possível copiar sozinho. Copie a mensagem abaixo e cole no WhatsApp.';
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(msg).then(function () {
        aviso.textContent = 'Mensagem copiada. No WhatsApp, é só colar.';
      }, manual);
    } else {
      manual();
    }
  });


  var folha = raiz.querySelector('[data-mz-folha]');

  /* 08. A FOLHA DO TELEFONE ---------------------------------
     <dialog> nativo, como a lupa do styling: foco preso, Esc e
     retorno de foco vêm do navegador. Fecha por Esc, pelo botão,
     tocando fora ou puxando a pega para baixo. */
  var abrir = raiz.querySelector('[data-mz-abrir]');
  var fechar = raiz.querySelector('[data-mz-fechar]');
  var pega = raiz.querySelector('[data-mz-pega]');
  var abas = [].slice.call(folha.querySelectorAll('[role="tab"]'));
  var saida = null;

  function abrirFolha() {
    if (folha.open || typeof folha.showModal !== 'function') return;
    folha.classList.remove('is-aberta');
    folha.showModal();
    document.documentElement.classList.add('mz-travado');
    /* aberta, a folha tem altura: agora dá para medir a aba */
    caber(folha.querySelector('.mz-painel:not([hidden])'));
    /* dois quadros: o primeiro pinta a folha fora da tela, o
       segundo a traz — sem isso a transição não tem de onde partir */
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { folha.classList.add('is-aberta'); });
    });
  }

  function fecharFolha() {
    if (!folha.open) return;
    folha.classList.remove('is-aberta');
    folha.style.transform = '';
    if (menosMovimento) { folha.close(); return; }
    window.clearTimeout(saida);
    saida = window.setTimeout(function () { if (folha.open) folha.close(); }, 320);
  }

  abrir.addEventListener('click', abrirFolha);
  fechar.addEventListener('click', fecharFolha);
  folha.addEventListener('cancel', function (e) { e.preventDefault(); fecharFolha(); });
  folha.addEventListener('click', function (e) { if (e.target === folha) fecharFolha(); });
  folha.addEventListener('close', function () {
    document.documentElement.classList.remove('mz-travado');
    folha.classList.remove('is-aberta');
    abrir.focus();
  });

  /* arrastar para fechar: 100px de curso OU um puxão rápido */
  var arr = null;
  pega.addEventListener('pointerdown', function (e) {
    if (e.target.closest('button') || e.button > 0) return;
    arr = { y0: e.clientY, t0: e.timeStamp, dy: 0 };
    pega.setPointerCapture(e.pointerId);
    folha.classList.add('is-arrastando');
  });
  pega.addEventListener('pointermove', function (e) {
    if (!arr) return;
    arr.dy = Math.max(0, e.clientY - arr.y0);
    folha.style.transform = 'translateY(' + arr.dy + 'px)';
  });
  function soltar(e) {
    if (!arr) return;
    var v = arr.dy / Math.max(1, e.timeStamp - arr.t0);
    var dy = arr.dy;
    arr = null;
    folha.classList.remove('is-arrastando');
    if (dy > 100 || (dy > 24 && v > 0.6)) fecharFolha();
    else folha.style.transform = '';
  }
  pega.addEventListener('pointerup', soltar);
  pega.addEventListener('pointercancel', soltar);

  /* abas: setas, Home e End movem entre elas (padrão ARIA) */
  function irAba(aba, focar) {
    abas.forEach(function (a) {
      var on = a === aba;
      a.setAttribute('aria-selected', String(on));
      a.tabIndex = on ? 0 : -1;
      document.getElementById(a.getAttribute('aria-controls')).hidden = !on;
    });
    caber(document.getElementById(aba.getAttribute('aria-controls')));
    if (focar) aba.focus();
  }
  abas.forEach(function (a, i) {
    a.addEventListener('click', function () { irAba(a, false); });
    a.addEventListener('keydown', function (e) {
      var n = abas.length, j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % n;
      else if (e.key === 'ArrowLeft') j = (i - 1 + n) % n;
      else if (e.key === 'Home') j = 0;
      else if (e.key === 'End') j = n - 1;
      if (j === null) return;
      e.preventDefault();
      irAba(abas[j], true);
    });
  });


  /* 09. REMEDIR QUANDO A TELA MUDA ---------------------------
     O ResizeObserver pega também a barra de endereço do celular
     aparecendo e sumindo (a altura é dvh). Mudar a densidade não
     muda o tamanho do painel, então não há laço. */
  window.addEventListener('resize', function () {
    /* a folha só existe abaixo de 769px */
    if (folha.open && window.innerWidth > 768) folha.close();
  });
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () {
      ajustar();
      if (folha.open) caber(folha.querySelector('.mz-painel:not([hidden])'));
    }).observe(raiz);
  } else {
    window.addEventListener('resize', ajustar);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustar);


  /* 10. LIGAR ----------------------------------------------- */
  var semJs = document.querySelector('[data-mz-semjs]');
  if (semJs) semJs.hidden = true;
  raiz.hidden = false;
  aplicarPreset(PRESETS[0]);
  atualizar(false);
})();
