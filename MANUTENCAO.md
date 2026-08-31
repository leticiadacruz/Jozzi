# Manutenção

Guia para quem edita o site.

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

São seis serviços, e os seis estão com a copy definitiva no ar (a de Captação
de Conteúdos entrou em 28/08 — ver histórico do git para o texto que ficava no
lugar antes).

Cada serviço é um **card** em `index.html`, e o card tem quatro peças nesta
ordem:

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

### O card de Styling é diferente dos outros cinco

Todo `.serv__nome` é um `<button>`, exceto o de Styling, que é um `<a
href="styling.html">` — ver "Portfólio de Styling" mais abaixo. Se algum script
futuro fizer `document.querySelectorAll('.serv__nome')` esperando só botões,
esse é o card que quebra a suposição.

**A nota de margem da abertura ainda lista só cinco frentes**, sem Captação de
Conteúdos — é a copy literal que a Jozzi mandou para a capa, não um esquecimento
meu. Se um dia pedirem para incluir a sexta, é lá que mexe, não aqui.

### Acrescentar um serviço

O card novo é uma cópia de qualquer um dos existentes, com quatro trocas: o
número (nos DOIS lugares — `.serv__plate-num` e `.serv__num`), o nome, o `id` do
painel e do botão (que precisam continuar batendo entre `id` e
`aria-controls`/`aria-labelledby`), e o texto.

No CSS há duas linhas por card, as duas em `nth-child`: a do `--i`, que é o
atraso de entrada, e a do `--optico`, que é a correção óptica da primeira letra.
Sem a linha do `--i` o card entra junto com o primeiro em vez de na sua vez.

⚠ **Se o total voltar a ser ímpar, a última fila fica incompleta em 1280+** —
e aí ela não pode começar na margem. Com cinco cards existia uma regra
deslocando a segunda fila para as colunas 3 e 7; ela saiu quando o sexto entrou,
e o comentário no CSS diz exatamente onde ela morava.

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
  Hoje quebram quatro: Social Media, Tráfego Pago, Web Development e Captação de
  Conteúdo.
- **Não tirar a classe `serv__txt--falta` sem pôr o texto real no lugar** — e
  não deixá-la quando o texto chegar. Ela pinta o campo na cor do aparato, que é
  a marca de pendência; num texto de verdade ela sai como texto apagado.
- **Não pôr o painel para abrir empurrando** em vez de sobrepor. Empurrando,
  abrir um card muda a altura da fila e os outros quatro saltam.
- **Não dar sombra, raio de canto nem cor de fundo ao card.** O card é um fio de
  1px e uma caixa de papel. O estado ativo muda só a cor do fio.

---

## Acrescentar um projeto ao rolo

A seção 04 deixou de ser uma lista estática e virou um **tambor 3D**
dirigido pela rolagem (referência pedida pela Jozzi: twist.com.br). Cada
projeto é um `<li>` dentro de `[data-rolo-lista]`, no `index.html`:

```html
<li class="rolo__item" data-rolo-item>
  <h3 class="rolo__nome d d--2">Nome do cliente</h3>
  <p class="rolo__frase lede">Uma frase. Curta.</p>
</li>
```

**Não precisa mexer em CSS nem em JS para acrescentar.** O JS conta os itens
sozinho (`--rolo-n`), o trilho cresce um passo por projeto e os ângulos são
calculados a partir da contagem. Duas coisas ficam à mão: o `0N` do contador
em `.rolo__conta` (é o total), e o `<video>` correspondente — ver abaixo.

**O texto pode ser um parágrafo** — foi recalibrado para isso em 29/08,
quando a Jozzi trocou as frases curtas pelos textos completos dos cases. O
teto real hoje é **cerca de 20 linhas no telefone**. Acima disso a face passa
de ~520px e o `overflow` do `.rolo__fixo` corta as últimas linhas em telas
baixas (medido em 320×568, o pior caso).

Se um texto novo estourar esse limite, os lugares para mexer, nesta ordem:
`--rolo-passo` (mais curso), `max-width` da `.rolo__frase` (mais largura,
menos linhas) e a media query `max-height: 660px`, que já encolhe o corpo
para caber.

### O "Saiba mais" e as páginas de projeto

Cada projeto do rolo tem um `<a class="rolo__saiba">` **dentro do próprio
`<li>`**, apontando para `projetos/<slug>.html`. Não existe um botão lateral
separado: com o tambor montado o link sai do fluxo e vai para a margem
direita, e como só a face da frente está opaca, só existe um na tela por vez.
O "botão lateral" É o link do projeto que está sendo lido.

Sem JavaScript ele volta para o fluxo, embaixo do texto — e no telefone fica
assim mesmo, empilhado, que é onde faz sentido.

**Acrescentou um projeto?** Além do `<li>`, do vídeo e do total do contador,
crie `projetos/<slug>.html`. O texto dessas páginas é **cópia do que está no
rolo** — se mudar um, mude o outro, senão as duas versões divergem.

**As faces invisíveis recebem `inert`.** Sem isso o Tab passava por cinco
links escondidos antes de sair da seção: `aria-hidden` esconde do leitor de
tela mas não tira do foco. `inert` tira dos três de uma vez.

⚠ **Ao auditar alvo de toque, ignore o que está dentro de `[inert]`.** As
faces giradas têm caixa achatada pela projeção 3D (12 a 33px), e uma
auditoria ingênua acusa quatro alvos pequenos que não são tocáveis nem
focáveis. O link de verdade mede 44×114px — medido em 320, 375, 390 e 768.

### A transição de página

`@view-transition { navigation: auto }` mais duas animações em
`::view-transition-old/new(root)`: a página nova entra pela direita, a
anterior sai pela esquerda sem chegar ao fim.

É a API nativa do navegador, não JavaScript — onde ela não existe (Firefox,
hoje) a regra é ignorada e a navegação é a de sempre. Não há fallback a
manter. Sob `prefers-reduced-motion` a animação é desligada.

**As páginas de projeto não têm cortina de carregamento**, de propósito: a
cortina reaparecendo no meio da navegação mata a fluidez da transição — são
duas animações competindo. Elas também não usam `.rv`: numa página que entra
deslizando, o conteúdo surgindo depois seria uma segunda animação por cima da
primeira. O gesto é um só.

Isso vale para `projetos/`. As 19 páginas de `styling/` **ainda têm** a
cortina e as revelações — se quiser o mesmo comportamento lá, é remover o
bloco `<div class="carregando">` e as classes `rv`, como está feito em
`projetos/`.

### Trocar os vídeos de fundo

**Os quatro `.mp4` em `assets/video/` são temporários**: stock do Pexels
(seda em movimento), baixado em HD e tratado aqui — dessaturado e puxado para
o marrom da paleta, o mesmo tratamento do mapa do Google em Onde ficamos.
Licença Pexels: uso gratuito e comercial, sem atribuição, modificação
permitida.

**Não são material de campanha da Jozzi e não deviam ir ao ar assim.** São
tecido genérico — servem porque a Jozzi é uma agência de moda e a textura
conversa com isso, mas não mostram trabalho nenhum. A licença do Pexels
também proíbe usar a imagem de forma que sugira endosso de marca: por isso
são texturas e não cenas que finjam ser o cliente.

Para pôr o vídeo real: **substituir o arquivo mantendo o nome**
(`collab.mp4`, `claudia-choma.mp4`, `descomplica-pericias.mp4`,
`widepine-cafes.mp4`). Nada mais muda — nem HTML, nem CSS, nem JS.

Ao exportar o vídeo real:

- **Sem áudio.** A tag não tem `controls` e o autoplay depende de `muted`;
  faixa de som só adiciona peso.
- **Curto e em laço** (8 a 15s). Ele repete enquanto o leitor estiver
  naquele projeto.
- **Leve.** Os quatro temporários somam 4,2MB (~1MB cada). O vídeo entra por
  cima de um véu a 82% — detalhe fino se perde de qualquer jeito, então não
  vale exportar em alta taxa. 1280×720 e CRF 31 é o que está sendo usado.
- **Dessaturar.** O comando de tratamento está no histórico do git (commit do
  vídeo): `hue=s=0.14` mais `colorbalance` puxando para o quente. Vídeo cru,
  com cor saturada, briga com a paleta de sete cores do site.
- **O centro é o que aparece.** `object-fit: cover` recorta as bordas
  conforme a proporção da tela.

**Não pôr `autoplay` na tag.** Quem manda tocar é o JS, e só no vídeo que
está à frente — com `autoplay` no HTML os quatro baixariam e tocariam na
carga da página, mesmo para quem nunca chega na seção 04. O `preload="none"`
é par disso.

**Acrescentou um projeto? Acrescente o vídeo na mesma ordem.** O JS casa
vídeo com face por índice: o terceiro `<video>` é a face do terceiro `<li>`.

### Os três números do tambor

Todos no `.rolo`, em `style.css`:

| | | |
| --- | --- | --- |
| `--rolo-passo` | 88svh | quanto de rolagem cada projeto ocupa. Aumentar = tambor mais "pesado" |
| `--rolo-raio-n` | 380 | o raio do cilindro. Maior = faces mais espalhadas |
| `--rolo-persp-n` | 1600 | a profundidade. Menor = distorção mais dramática |

E três no `main.js`, que decidem o RITMO da troca:

| | | |
| --- | --- | --- |
| `ROLO_PASSO_ANG` | 60° | ângulo entre uma face e a seguinte |
| `ROLO_OP_INI` / `ROLO_OP_FIM` | 0.34 / 0.64 | onde a opacidade começa e termina de cair |

**Os três platôs.** Tanto o ângulo quanto a opacidade usam `suavizar()`
(smoothstep) com o início deslocado, e não uma rampa. A razão é a mesma nos
dois casos: com rampa, a face da frente carrega inclinação e transparência
durante todo o trecho em que está sendo lida. Com platô, ela fica reta e
opaca enquanto é o assunto, e a mudança se concentra num pedaço curto de
rolagem. Com parágrafo de oito linhas isso é a diferença entre ler e não ler
— alguns graus de rotação num texto longo leem como itálico torto.

**`--rolo-fator` é derivado, não se mexe nele.** Ele existe porque
`translateZ` positivo aproxima do observador e AMPLIA: sem compensar, a face
da frente saía 14% maior e transbordava a margem da página pelos dois lados.
O `scale(var(--rolo-fator))` devolve a face da frente ao tamanho real. Se
mudar o raio ou a perspectiva, o fator se recalcula sozinho — é por isso que
os dois são números puros e não comprimentos (CSS não divide `px` por `px`).

### Duas armadilhas já pagas

**`ligarRolo()` tem de rodar ANTES de `ligarMarca()`.** É `ligarRolo` que põe
a classe `.js--rolo`, e é `.js--rolo` que dá ao trilho a altura alta.
`ligarMarca` chama `medir()`, que lê essa altura. Na ordem inversa o rolo é
medido com o tamanho da lista empilhada e o tambor gira inteiro em poucos
pixels de rolagem.

**A opacidade cai com o QUADRADO da distância, não linearmente.** Com queda
linear existe um vale no meio do caminho entre um projeto e o seguinte onde
nenhum dos dois passa de 55% — o texto fica lavado em boa parte do curso. Com
o quadrado, o pior ponto é 75%. Medido.

### Sem JavaScript, sem tambor e sem vídeo

O 3D inteiro vive atrás de `.js--rolo`. Sem script, com o script quebrado
(`.js--sem-motor`) ou sob `prefers-reduced-motion`, a seção é o que o HTML
diz que ela é: quatro nomes e quatro frases empilhados, todos opacos, sem
trilho alto e sem `sticky`. **É essa a ordem certa** — o JS MONTA o tambor,
nunca o desmonta. Um script que não sobe não pode esconder conteúdo.

O vídeo segue a mesma regra, e mais uma: **nesses três casos nenhum arquivo
de vídeo é baixado** (medido). É por isso que a inversão de cor está em
`.js--rolo` e não na classe `.inv` — sem vídeo por baixo, a seção continua
bege com texto marrom, como sempre foi. Inverter à toa deixaria uma seção
escura sem motivo.

**O `data-inv` no HTML é par disso.** Ele não pinta nada: é o que avisa o
aparato para trocar de cor ao atravessar a seção. Sem JS o aparato nunca
aplica `is-claro`, então o atributo fica inerte e a leitura continua certa
nos dois estados.

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

## Portfólio de Styling — `styling.html` + `styling/*.html`

**Duas camadas, desde 28/08 (segunda rodada).** `styling.html` é a GRADE —
fotos 1:1, três colunas, título sobre a foto, referência pedida pela Jozzi
(mrjobim.com/projetos). Cada card leva a uma página própria em
`styling/<slug>.html` — 19 arquivos, um por caso —, onde mora o texto
completo e é onde entram mais fotos de cada trabalho.

**A primeira versão desta página era uma lista longa** (reaproveitando
`.cliente`/`.marcas__lista`, o mesmo componente de "Projetos que já
fizemos"). Foi trocada pela grade a pedido da Jozzi. Se encontrar rastro de
`.cliente` em `styling.html` no histórico do git, é essa versão anterior —
não voltar a ela sem pedido.

**O que é copiado em TODA página deste site (index, styling, e os 19 de
styling/), e por quê não é um `<link>`/import:** o site inteiro é HTML
autoral sem build step, então cada página duplica os blocos que precisa —
sprite do logotipo (`<symbol id="marca-jozzi">`), a cortina de carregamento,
o aparato, o rodapé. **Se algum desses blocos mudar em `index.html`,
replicar a mudança em TODAS as outras 20 manualmente.** Não existe
sincronização automática — isso é o preço de não ter build step, e com 19
páginas de caso o preço ficou mais alto do que quando só existia
`styling.html`.

**A armadilha do aparato hardcoded, que já pegou duas vezes:** o texto
inicial do aparato (`<span data-aparato-sec>`) é hardcoded no HTML — o
`main.js` só o atualiza quando o NÚMERO da seção muda (`trocarSecao` faz
early-return se `num === secaoAtual`, e `secaoAtual` começa em `"00"`). Toda
página deste portfólio tem uma seção só, `data-num="00"`, então o número
nunca muda e o JS nunca reescreve o texto. Por isso o hardcoded já nasce
certo em cada arquivo — "Styling" em `styling.html`, o nome do caso em cada
`styling/*.html`. **Ao gerar uma página nova, conferir que o texto do
aparato bate com `data-nome` da seção**, ou vai ficar "Abertura" (o valor
copiado do `index.html`) travado pra sempre.

**Links de volta:** `styling.html` volta pra `index.html#servicos`; cada
`styling/<slug>.html` volta pra `styling.html` (dois links: `.topo__voltar`
no cabeçalho e `.caso__voltar` acima do título). Os arquivos em `styling/`
usam `../` em TODO caminho — CSS, fontes, JS, sprite, links de volta. Um
`href="assets/..."` sem o `../` funciona em `styling.html` mas quebra dentro
de `styling/`, porque a pasta é um nível mais funda.

### O card da grade

```html
<li class="styling-grid__item">
  <a class="ap" href="styling/carol-merlo.html" data-cursor="Ver">
    <div class="styling-grid__foto">
      <span class="ap">Foto 1:1</span>              <!-- some quando entrar a foto -->
      <div class="styling-grid__veu" aria-hidden="true"></div>
      <div class="styling-grid__base">
        <p class="styling-grid__projeto ap">Woman</p> <!-- opcional -->
        <h3 class="styling-grid__titulo d d--2">Amanda</h3>
      </div>
    </div>
  </a>
</li>
```

**Duas armadilhas de CSS já corrigidas aqui, registradas para não repetir:**

1. `.styling-grid__projeto` nasceu posicionado ACIMA da caixa
   (`bottom: 100%`), fora da área visível — e `.styling-grid__foto` tem
   `overflow: hidden` (precisa ter, para a foto futura ser recortada em
   quadrado). O projeto sumia, cortado. Corrigido: projeto e título moram
   os dois DENTRO de `.styling-grid__base`, empilhados.
2. **"Grid blowout":** um nome de uma palavra só (Alfaiataria, Klisievicz)
   sem espaço pra quebrar virava o `min-content` da coluna do grid e
   estourava a caixa por baixo do `overflow: hidden`, mesmo com
   `overflow-wrap: break-word` no título — porque todo item de grid tem
   `min-width: auto` implícito, que ignora o overflow-wrap do conteúdo.
   Corrigido com `min-width: 0` em `.styling-grid__base` e nos filhos
   diretos. **Se tirar essas duas linhas, o sintoma some em nomes curtos e
   só reaparece com um nome de uma palavra só numa coluna estreita** — fácil
   de não notar no teste.

**Quando a foto chegar:** trocar o `<span class="ap">Foto 1:1</span>` por
`<img class="styling-grid__foto__real" src="..." alt="...">` — mesmo padrão
de `.serv__plate`/`.serv__plate__foto`, contêiner permanente e a foto como
filho absoluto.

### A página de um caso — `styling/<slug>.html`

```html
<div class="caso__cabeca">
  <a class="ap caso__voltar" href="../styling.html">&larr; Styling</a>
  <h1 class="d rv" data-linhas>Amanda</h1>
  <p class="caso__projeto ap rv">Woman</p>              <!-- opcional -->
  <ul class="serv__tags ap rv" aria-label="Etiquetas">   <!-- opcional -->
    <li>styling</li>
  </ul>
  <div class="caso__corpo">
    <p class="rv">O texto que já estava na grade.</p>    <!-- acrescentar <p> pra escrever mais -->
  </div>
</div>

<ul class="caso__galeria" role="list">
  <li><div class="fig__campo"><span class="ap">Foto 1</span></div></li>
  <!-- mais fotos: copiar este <li>, ou trocar fig__campo por <img class="fig__campo"> -->
</ul>
```

Três placeholders de foto por padrão — acrescentar mais é só copiar o
`<li>`. Mais texto é só acrescentar `<p>` dentro de `.caso__corpo`.

**Conteúdo:** copy definitiva da Jozzi (28/08), a lista "Styling" do
documento. Três entradas ficaram de fora por não terem texto pronto pra
site, só nota interna de produção — **não inventar texto pra elas**:

| Entrada | Por quê ficou de fora |
| --- | --- |
| Shop Carol | só uma linha de etiquetas, sem parágrafo |
| Evento Apelo Fashion | "Versão pro site:" no documento, sem texto depois |
| Malena — "New Again" | o parágrafo corta no meio: `A campanha "New Again"` |

Se a Jozzi mandar o texto de qualquer uma das três: criar
`styling/<slug-novo>.html` a partir do template acima, e acrescentar o
`<li>` correspondente na grade de `styling.html`.

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

## Favicon

`assets/img/favicon.svg` é o arquivo oficial da Jozzi (Logos - Jozzi
Creative-26.svg — o círculo bordô com "JZI" em negativo), copiado sem
alteração. Referenciado em TODAS as 21 páginas do site:

```html
<link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
```

Nas páginas dentro de `styling/`, os três caminhos levam `../` na frente.

**Por que três `<link>` e não só o SVG:** navegadores modernos leem
`image/svg+xml` direto, mas o Safari mais antigo e alguns contextos (aba
fixada, atalho de tela inicial no iOS) só aceitam raster. `favicon-32.png` e
`apple-touch-icon.png` foram gerados a partir do próprio SVG — via
`qlmanage -t -s 1024` (renderiza o SVG usando o motor do QuickLook) e depois
`sips -z` para os tamanhos finais — não são um arquivo novo desenhado, é o
mesmo círculo, só rasterizado. Se o SVG mudar, os dois PNGs têm que ser
regerados do mesmo jeito.

---

## Auditoria mobile (28/08)

Três achados reais, os três a mesma causa: **alvo de toque menor que 44px**
em links de navegação reais (não decorativos) — `.marca` (o logotipo no
topo, 11 a 15px de altura por desenho, proporção 15,6:1), `.topo__voltar` e
`.caso__voltar` (o texto de 11px do aparato tem ~15px de linha). Testado em
320/375/390/768px nas cinco páginas-modelo do site (home, grade de Styling,
três páginas de caso).

**A correção é sempre a mesma receita — padding invisível + margem
negativa que cancela o padding:** a área clicável cresce até 44px, a
posição visual do texto/logo não muda nada. Não é a única forma de resolver
(dava pra crescer o próprio texto, por exemplo), mas é a que não mexe em
nenhuma medida que já estava calibrada.

**Se acrescentar um link de navegação novo e pequeno** (um ícone, um "voltar"
em outra seção), aplicar a mesma receita direto — não como reação a uma
próxima auditoria:

```css
.alvo-pequeno {
  padding: Npx 0;
  margin: -Npx 0;   /* ou -Npx 0 <margem-que-já-existia-menos-N> */
}
```

Onde N é grande o bastante pra `altura-visível + 2N ≥ 44`.

Zero overflow horizontal e zero erro de console nas cinco páginas-modelo, nas
quatro larguras — a mesma bateria de sempre, sem achado novo além dos alvos
de toque.

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
projetos/                   uma página por projeto do rolo (5)
styling.html                grade de fotos do portfólio de Styling
styling/*.html               19 páginas de caso, uma por trabalho
assets/css/style.css        folha única, com sumário numerado no topo
assets/js/main.js           IIFE, nove módulos numerados
assets/js/lenis.min.js      rolagem interpolada (não editar)
assets/fonts/               Switzer + IBM Plex Mono + licença
assets/img/                 imagens do site + jozzi-creative-lab.svg (mestre) + favicon.{svg,png}
```
