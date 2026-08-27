# Manutenção

Guia para quem edita o site. Não é preciso saber programar.

As regras completas da direção estão no `README.md`. Aqui está só o que fazer,
e o que nunca fazer.

---

## Antes de escrever qualquer texto

O sistema verbal é regra do projeto, não sugestão. Toda frase nova passa por:

- afirmação, não promessa;
- específico, não genérico;
- opinião assumida;
- voz ativa, sujeito explícito;
- frases curtas — 12 palavras de média, nenhuma acima de 30;
- poucos adjetivos;
- **nenhum** superlativo ("a melhor", "referência");
- **nenhum** jargão de agência (ecossistema, jornada, storytelling, 360, DNA,
  expertise, mindset, solução, potencializar, alavancar, impulsionar);
- **nenhuma** pergunta retórica;
- **nenhum** ponto de exclamação.

**O teste:** troque "Jozzi" pelo nome de um concorrente. Se a frase continuar
funcionando, ela é descartável. Escreva outra.

A assinatura da voz é a frase em dois tempos: afirmação, depois correção ou
consequência. *"Somos pequenos por decisão, não por estágio."*

---

## Trocar um texto

Abrir `index.html` e procurar a frase. Está tudo lá, em português, sem código no
meio.

**A frase da abertura** é quebrada em palavras pelo JavaScript para a esteira de
peso funcionar. Pode trocar à vontade — o script refaz a quebra sozinho. Só
evite frases longas: a 118px cada linha comporta cerca de 20 caracteres, e três
linhas é o limite antes de a composição perder o vazio de cima.

**As quatro afirmações do Nosso Olhar** foram aprovadas. Não altere a lógica
verbal delas sem aprovação.

---

## Trocar a imagem da seção 01

1. Colocar o arquivo em `assets/img/`, na proporção **3:4**. Formato `.avif` de
   preferência, `.webp` como alternativa.
2. Em `index.html`, procurar `fig__campo` e trocar o bloco por:

```html
<img class="fig__campo" src="assets/img/nome-do-arquivo.avif"
     alt="Descrição curta do que a foto mostra"
     width="1200" height="1600" loading="lazy" decoding="async">
```

3. Trocar a legenda logo abaixo, dentro de `<figcaption>`.

`width` e `height` são obrigatórios: sem eles a página "pula" enquanto a imagem
carrega. O CSS já cuida do resto — `object-fit: cover` recorta em vez de
esticar, e `height: auto` deixa a proporção da classe mandar.

**Nunca escrever `height` ou `width` no CSS desses campos.** Tirar o
`height: auto` faz o atributo `height="1600"` do arquivo virar altura real e a
proporção da classe é ignorada. Já foi testado e quebra.

A imagem de Serviços não usa este padrão — ela é **16:9** e mora dentro do card,
com regra própria. Ver *Preencher um serviço*.

**As três proporções permitidas no site inteiro são 3:4, 16:9 e 1:1.** Recorte
fora dessas três não entra — é o que mantém a página parecendo composta.

Nunca usar stock photo, imagem genérica ou imagem gerada. Se não houver foto
real, o campo marcado continua. Um retângulo honesto é melhor que uma foto
emprestada.

---

## Preencher um serviço

Os cinco textos já estão no ar. Cada serviço é um **card** em `index.html`, e o
card tem quatro peças nesta ordem:

```html
<li class="serv__card rv" role="listitem" data-cursor="Ver">
  <div class="serv__plate">          <!-- a chapa 16:9 -->
    <span class="serv__plate-num" aria-hidden="true">01</span>
    <span class="ap">Imagem 16:9</span>
    <div class="serv__painel" id="serv-rev-branding" ...>
      <ul class="serv__tags ap">     <!-- as etiquetas -->
        <li>identidade</li>
      </ul>
    </div>
  </div>

  <button class="serv__nome" ...>    <!-- número + nome -->
    <span class="serv__num ap" aria-hidden="true">01</span>
    <span class="serv__rotulo">Branding</span>
  </button>

  <p class="serv__txt">A descrição.</p>
</li>
```

Para trocar o texto, editar o `<p class="serv__txt">`. Para trocar as
etiquetas, acrescentar ou remover `<li>` dentro do `.serv__tags` — o ponto médio
entre elas é do CSS, não se digita.

**Extensão da descrição:** 90 a 170 caracteres. Acima disso o card fica mais
alto que os vizinhos e a fila desalinha.

**As etiquetas ficam escondidas até o ponteiro, o foco ou o toque.** Isso é
proposital, e é por isso que **nenhuma informação essencial pode morar só ali** —
etiqueta é dado complementar, não a descrição do serviço.

### Colocar a imagem do serviço

A proporção é **16:9** — mudou de 3:4 quando a seção virou cards.

`.serv__plate` é sempre o contêiner e **nunca é substituído**: o numeral mora
dentro dele. A foto entra como irmã do numeral, no lugar do
`<span class="ap">Imagem 16:9</span>`:

```html
<div class="serv__plate">
  <span class="serv__plate-num" aria-hidden="true">01</span>
  <img class="serv__plate__foto" src="assets/img/servico-branding.avif"
       alt="Descrição curta" width="1600" height="900"
       loading="lazy" decoding="async">
  <div class="serv__painel" ...>…</div>
</div>
```

O `<div class="serv__painel">` continua onde está. Ele precisa vir **depois** da
imagem no HTML.

### O que nunca mexer no card

- **Não tirar o `isolation: isolate` de `.serv__plate`.** O numeral é
  `mix-blend-mode: multiply`; sem o isolamento ele atravessa o painel e
  reaparece por cima das etiquetas. Já quebrou uma vez.
- **Não deixar o fundo do `.serv__painel` translúcido.** A 92% o carimbo por
  baixo continuava legível e brigava com as etiquetas. Ele é opaco.
- **Não apagar a regra `.serv__painel .ap`.** Sem ela as etiquetas herdam a cor
  do rótulo da chapa e saem marrom sobre marrom, invisíveis.
- **Não encolher o nome para caber numa linha.** Os nomes longos quebram em duas
  linhas de propósito: encolher os joga dentro da faixa proibida de 24 a 44px.
- **Não pôr o painel para abrir empurrando** em vez de sobrepor. Empurrando,
  abrir um card muda a altura da fila e os outros quatro saltam.
- **Não dar sombra, raio de canto nem cor de fundo ao card.** O card é um fio de
  1px e uma caixa de papel. O estado ativo muda só a cor do fio.

---

## Acrescentar uma marca

Duas coisas. O `<li>` novo em `index.html`, dentro de `.marcas__lista`:

```html
<li class="cliente" role="listitem">
  <h3 class="cliente__nome d d--2 rv">Nome da marca</h3>
  <dl class="cliente__dados ap rv">
    <div><dt>Setor</dt><dd>Setor real</dd></div>
    <div><dt>Escopo</dt><dd>O que a Jozzi fez</dd></div>
  </dl>
</li>
```

E, se passar de doze marcas, uma linha em `style.css` na seção 10e:

```css
.cliente:nth-child(13) { grid-column: 1 / span 5; grid-row: 13; }
```

A coluna segue 1, 4, 7, 1, 4, 7… e a linha é o número da marca. A colocação
automática do Grid **não** serve: a partir da quarta marca ela encaixaria o
bloco ao lado do anterior em vez de abrir linha nova, e a diagonal quebraria.

**Todas as marcas ficam no mesmo corpo.** Não aumentar o nome de um cliente
para "dar destaque": entre clientes, escala é declaração sobre a relação, não
composição.

Sobre logotipos: hoje a seção usa só os nomes tipográficos. Se um dia entrarem
logos, precisam ser vetor bom para **todas** as marcas — um PNG no meio de dois
SVGs aparece. Nunca redesenhar, redimensionar fora de proporção ou aplicar
efeito no logo de um cliente.

---

## Preencher o contato

Quatro valores em `index.html`, dentro da seção `#contato`.

**E-mail** — três lugares, todos com o endereço real:

```html
<a class="contato__email rv" href="mailto:ENDEREÇO"
   data-copiar="ENDEREÇO" data-cursor="Copiar"
   aria-describedby="contato-email-ap">parte<wbr>@dominio.<wbr>com.br</a>
```

Os `<wbr>` marcam onde o navegador **pode** quebrar a linha se precisar. Não
são quebras forçadas: ponha um depois do `@` e outro depois do primeiro ponto
do domínio, e o endereço se acomoda de 1440 a 375 sozinho.

**WhatsApp** — trocar `https://wa.me/` por `https://wa.me/55DDNÚMERO`. Enquanto
o número não existir, **deixar como está**: `wa.me` sem número abre o site do
WhatsApp em vez de discar um número errado.

**Linha de expectativa** — o `<p class="contato__pe">` no fim da seção. Curta e
concreta, e só se for verdade operacional. "Respondemos no mesmo dia" só entra
se for o compromisso real.

Se um dia entrar formulário, será outra decisão — hoje não há backend, nem
dependência de terceiros, e a seção não precisa de nenhum dos dois.

---

## Onde ficamos

O endereço está em `<address>` dentro de `#onde-ficamos`. Trocar o texto basta.

**Se o endereço mudar, mudar em TRÊS lugares** — os dois últimos são URLs, com
o texto codificado (espaço vira `%20`, `ã` vira `%C3%A3`):

1. o `<address>`;
2. o `src` do iframe `.onde__mapa__quadro`;
3. o `query=` do link "Abrir no Google Maps".

O mapa é o embed do Google, montado a partir do endereço — sem chave de API,
sem coordenadas. **Manter `loading="lazy"`:** sem ele o mapa entra na carga
inicial e a cortina de carregamento passa a esperar por um servidor de
terceiro.

O iframe fica DENTRO do `<div class="onde__mapa">`, que continua sendo o
contêiner e a proporção **1:1**. Se o Google falhar ou for bloqueado, sobra o
campo bege em vez de um buraco branco. Não trocar o `<div>` pelo iframe.

⚠ **Este iframe é a única requisição externa do site.** O Google grava cookie e
registra quem chega até esta seção. Se um dia entrar aviso de cookies ou
política de privacidade, é este o item a declarar.

**Não acrescentar tipografia de display aqui.** Esta é a única seção do site sem
display, e é de propósito: o Contato é o ponto alto, e uma seção grande depois
dele rouba o clímax. Se algo aqui parecer "pequeno demais", provavelmente está
certo.

---

## Trocar uma cor

Em `assets/css/style.css`, seção **02. TOKENS**, no topo do arquivo. Estão lá os
sete hexadecimais da paleta oficial e, logo abaixo, as funções. Todo o resto do
site é transparência dessas sete — **não existe cor crua em nenhum outro lugar**.

Se trocar um hexadecimal, trocar também o canal correspondente logo abaixo
(`--marrom-rgb`, `--off-white-rgb`, `--azul-rgb`). São eles que alimentam as
transparências.

**Depois de qualquer troca de cor, medir contraste outra vez.** O aparato em
11px está a 4,56:1 contra um mínimo de 4,5 — é o par mais justo do site e o
primeiro a cair.

**O azul não serve para texto.** Dá 3,28:1 sobre papel: basta para anel de foco
e fio, não para letra. E é mais claro que o texto em repouso, então pintar um
item ativo de azul o deixa *menos* visível que os inativos. Sobre papel a
interação se marca indo para a tinta cheia; sobre tinta, quem sinaliza é o
amarelo.

---

## Depois de editar o CSS

Trocar o número no final desta linha do `index.html`:

```html
<link rel="stylesheet" href="assets/css/style.css?v=6">
```

`?v=6` vira `?v=7`. Isso força o navegador de quem já visitou a baixar a folha
nova em vez de usar a antiga guardada. Vale o mesmo para o `main.js`, se ele
ganhar versão.

---

## Ajustar a esteira de peso da abertura

Os três números ficam no topo de `assets/js/main.js`:

| | Hoje | O que faz |
| --- | --- | --- |
| `PESO_PICO` | 62 | Quanto o peso sobe sob o ponteiro. Subir daqui vira demonstração técnica. |
| `RAIO` | 2.0 × corpo | Alcance. Calibrado para o rastro pegar a palavra vizinha quando o ponteiro está entre as duas, e só a palavra atual quando está no meio dela. Maior, e a frase inteira acende junto. |
| `APROX` | 0.22 | Velocidade da resposta. Menor, e o efeito fica pairando. |

A passada automática acontece **uma vez**, 1,6s depois da entrada. Não
transformar em laço.

---

## Mexer no movimento

A gramática tem quatro níveis e cada um tem um lugar. Estão descritos no
`README.md`. Três coisas que quebram em silêncio se alguém mexer:

- **`[data-linhas]`** é o que faz um texto entrar linha a linha. Tirar o
  atributo devolve a entrada em bloco; pôr em qualquer elemento faz o
  JavaScript quebrá-lo em palavras, o que só faz sentido em display.
- **O teto de 12px** da diagonal de Marcas está em `TETO`, no `main.js`. Acima
  disso vira parallax.
- **A régua do aparato é montada sozinha** a partir dos `[data-secao]`, em
  `montarRegua()`. Seção nova ganha segmento sem que ninguém escreva nada — e
  seção removida perde o dela. Nenhum número está escrito à mão.
- **A troca do rótulo de seção vem da régua**, não de um observador separado.
  Havia dois mecanismos decidindo "que seção é esta" e eles discordavam na
  travessia. Não reintroduzir o segundo.
- ⚠ **`main.js` é uma IIFE só: todo `var` do primeiro nível divide o MESMO
  escopo.** Um `var TETO = 5000` escrito para o carregamento apagou o
  `var TETO = 12` da diagonal e os projetos foram parar a milhares de pixels
  da tela, sem erro nenhum no console. Constante nova de um módulo vai
  prefixada (`CARGA_PISO`, `CARGA_TETO`…). Para conferir antes de commitar:

```bash
grep -oE '^  (var|function) [A-Za-z_$][A-Za-z0-9_$]*' assets/js/main.js | awk '{print $2}' | sort | uniq -d
```

  Saída vazia = nenhum nome declarado duas vezes no escopo da IIFE.
- **O peso do item ativo em Serviços** (`430` → `560`) usa o eixo variável da
  Switzer. Se a fonte for trocada por uma estática, o estado ativo some.
- **A escala de Marcas** (`--escala`, teto de 5%) sai da mesma função que já
  calcula `--desloc` em `moverDiagonal()`. Mexer numa mexe na outra.

---

## `overflow: clip` nas seções — não remover

`[data-secao] { position: relative; overflow: clip; }` foi escrito para conter
um "numeral d'água" que já não existe, e depois passou a conter a sangria da
chapa de Serviços — que também já não existe, porque a seção virou cards.

**Medido em 27/08, em 1280 e 1440, com a regra desligada: nada transborda.** A
regra ficou porque é barata e porque `position: relative` continua sendo usada
para ancoragem dentro das seções. Se alguém a remover, medir antes:

```bash
# no console do navegador
document.documentElement.scrollWidth - innerWidth   // tem que dar 0
```

---

## Sobre a Jozzi — a seção 05

Vive no `index.html` como qualquer outra seção, entre Projetos e Contato.
(Houve um `sobre.html` separado por uma rodada; foi apagado quando a Jozzi
pediu a seção no scroll. Se algum link antigo apontar para `sobre.html`,
trocar por `#sobre`.)

Três blocos, cada um com sua grade: `.sobre__decl`, `.sobre__virada`,
`.sobre__pessoa`. Editar texto direto no HTML.

**Uma armadilha de CSS aqui**, se alguém for mexer: `.sobre__papel` (o cargo
da Letícia) também é um `<p>` dentro de `.sobre__bio`. Uma regra
`.sobre__bio p { margin: 0 }` tem especificidade maior que `.sobre__papel` e
zera a margem dele, colando a bio no cargo. Por isso a regra da bio é
`.sobre__bio > p:last-of-type`. Não simplificar de volta para `p`.

Único pendente de texto: o parágrafo sobre a origem do nome "Jozzi", que fui
eu quem escreveu (ver README) e pode precisar de ajuste de quem sabe a
história real.

---

## Trocar a mensagem ou o ritmo do carregamento

A frase está no `index.html`, dentro de `.carregando__linha`:

```
<span>we are creating for you&hellip;</span>
```

Ela sai em CAIXA ALTA porque a classe `.ap` é o registro de aparato do site e
todo texto de 11px aqui é caixa alta. Se a Jozzi quiser a frase em minúsculas
como no original, é uma linha: `.carregando__linha { text-transform: none; }`
— mas aí ela deixa de combinar com os outros textos de 11px da página.

Os tempos ficam no topo do módulo 09 do `main.js`:

- `PISO` (1400ms) — o mínimo que a cortina fica na tela. Abaixo de ~700ms
  ninguém lê a frase.
- `CHEIA` (420ms) — o último trecho da barra, animado pelo CSS. **Se mudar
  aqui, mudar `--t-cheia` no CSS junto** — os dois têm de bater, senão o
  número e a barra terminam em momentos diferentes.
- `PAUSA` (260ms) — o repouso em 100% antes de a cortina subir.
- `TETO` (5000ms) — o máximo. **Não aumentar muito:** é o que impede a cortina
  de virar uma porta trancada se algum recurso nunca chegar.

A espessura da barra é `.carregando__trilha { height }`, no CSS. A subida da
cortina é `--t-cortina` (900ms).

## Trocar o logotipo

Os 16 paths moram uma vez só, no `<symbol id="marca-jozzi">` logo depois do
`<body>`, e são usados três vezes por `<use href="#marca-jozzi">`. Para trocar a
arte, trocar os paths do símbolo — os três lugares acompanham sozinhos.

**Nenhum path pode ter `fill` próprio.** A cor vem de `currentColor`, e é isso
que faz o mesmo arquivo servir papel, verde e bordô. Se um path vier com
`fill="#..."` de dentro do Illustrator, tirar antes de colar.

O sprite usa `position:absolute; width:0; height:0` e **não** `display:none` —
`display:none` quebra a referência do `<use>` em alguns navegadores.

---

## O que NÃO fazer

- **Não rodar subsetter na Switzer.** A licença da ITF proíbe. O arquivo em
  `assets/fonts/Switzer-Variable.woff2` tem que continuar sendo o oficial da
  Fontshare, byte por byte.
- **Não adicionar biblioteca de animação.** Os gestos do sistema são CSS. Uma
  biblioteca traria dezenas de curvas novas e o movimento deixaria de parecer
  da Jozzi.
- **Não criar uma segunda animação em laço.** Existe uma, e é nomeada: o convite
  a rolar da abertura, que para sozinho depois de 40px de rolagem. Ela é a
  exceção; uma segunda faz a primeira deixar de ser exceção e vira ruído de
  fundo.
- **Não ler layout dentro do quadro de animação.** `getBoundingClientRect()`,
  `offsetTop` e `offsetHeight` dentro do rAF forçam o navegador a recalcular o
  layout a cada elemento. As medidas são tiradas em `medir()`, uma vez, e de
  novo no `resize`. **Dentro do quadro só se escreve.** Foi exatamente isso que
  causou o arrasto da diagonal e o pulo do aparato.
- **Não criar corpo de letra entre 24 e 44px** no desktop. É a faixa
  deliberadamente vazia da escala — onde vive o subtítulo de todo template.
  Em telas estreitas a regra vira razão: o menor display nunca fica abaixo de
  1,8 vez o corpo do texto.
- **Não dar sombra, raio de canto ou preenchimento colorido a um card.** A regra
  antiga era "não criar cartão"; caiu por decisão da Jozzi, e Serviços virou
  cinco cards. O que ficou no lugar dela é de material: **card é um fio de 1px
  e uma caixa de papel.** O estado ativo muda a cor do fio, e nada mais. Um card
  que precise de sombra para se destacar do fundo está resolvendo o problema
  errado.
- **Não criar ícone de serviço.**
- **Não criar número grande decorativo.** A única exceção é o carimbo sobre a
  chapa de cada card de Serviços (`.serv__plate-num`), que repete o número do
  próprio card. O numeral d'água das seções foi removido a pedido da Jozzi; não
  trazer de volta sem pedido.
- **Não inventar dado de contato.** Um e-mail plausível mas errado, publicado em
  100px, é pior que um campo marcado como pendente.
- **Não dar corpos diferentes aos nomes dos serviços.** Entre cards de mesma
  largura, corpo diferente é lido como ranking comercial. Os cinco usam o mesmo
  corpo, e os nomes longos quebram em duas linhas — encolher para caber numa
  linha os joga dentro da faixa proibida de 24 a 44px.
- **Não repetir "Creative Marketing Lab".** Ele aparece uma vez, no rodapé, como
  dado institucional. Não é assinatura e não é slogan.
- **Não dar fundo próprio a mais seções.** São três: papel, verde e bege, mais
  o bordô do Contato. Um quarto fundo desmancha o ritmo. E não encostar dois
  fundos de cor: entre o bege de Projetos e o bordô de Contato existe o papel
  de Sobre a Jozzi, que é o que faz o bordô bater quando chega.
- **Não preencher espaço vazio.** O vazio é composição. Se uma seção "parece
  precisar de algo", quase sempre precisa é de menos.
- **Não adicionar seção que repete a estrutura da anterior.**

---

## Estrutura

```
index.html                  as oito seções (00–07) + sprite da marca
assets/css/style.css        folha única, com sumário numerado no topo
assets/js/main.js           IIFE, nove módulos numerados
assets/js/lenis.min.js      rolagem interpolada (não editar)
assets/fonts/               Switzer + IBM Plex Mono + licença
assets/img/                 imagens do site + jozzi-creative-lab.svg (mestre)
```
