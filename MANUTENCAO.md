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

### A cortina toca uma vez por sessão

**A cortina é a chegada ao site, não a chegada a cada página.** Ela abre na
primeira página que o leitor carrega e não volta mais enquanto a aba estiver
aberta. Quem controla isso é uma marca em `sessionStorage`
(`jozzi:entrou`), lida por `jaEntrou()` no módulo 09: se ela existe,
`ligarCarregamento` remove o `<div class="carregando">` do DOM e chama
`aoTerminar()` no mesmo quadro.

O motivo é que voltar de um projeto de styling para Serviços, ou pular da
grade para um projeto, são gestos que o leitor **pediu** e espera imediatos.
A cortina ali custava 1,7s antes de qualquer pixel de conteúdo, e ainda
competia com a transição de View Transitions — duas animações de entrada
sobrepostas.

A marca morre quando a aba fecha, então a próxima visita de verdade tem a
cortina inteira de volta. Consequência prática ao testar: **recarregar a
página não traz a cortina.** Para revê-la, abrir uma aba anônima, ou rodar
`sessionStorage.removeItem('jozzi:entrou')` no console.

⚠ `sessionStorage` **lança** em navegação privada de alguns navegadores e com
armazenamento de terceiros bloqueado — por isso `jaEntrou()` e
`marcarEntrada()` são `try/catch` e não um `if`. Falhar ali devolve o
comportamento antigo (mostrar a cortina), que é o lado seguro do erro. Não
trocar por acesso direto ao `sessionStorage`.

**As páginas de `projetos/` não têm o bloco da cortina no HTML**, nem
precisam da marca de sessão: ali ela nunca aparece, em nenhuma circunstância.
As 19 páginas de `styling/` **têm** o bloco — ele só sobrevive à primeira
carga da sessão.

**Os títulos entram por máscara, e entram na hora.** `#caso-titulo` leva
`.rv` em `styling/` e em `projetos/`, e a revelação sai do
IntersectionObserver: sem cortina na frente, ele dispara no primeiro quadro
— medido em 1 a 2ms, com a máscara tocando normalmente. Foi o que devolveu a
entrada às páginas de `projetos/`, que tinham ficado sem `.rv` nenhum numa
rodada anterior. O que atrapalhava lá era a cortina, não a animação: com ela
fora, "animado" e "instantâneo" deixam de ser opostos.

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
- **O peso do item ativo em Serviços** era `430` → `560` no eixo variável da
  Switzer; com a Nexa, que é estática, virou `400` → `600`. Uma fonte sem o
  peso de cima faz o estado ativo sumir.
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

## As fotos de um projeto de styling

Vivem em `assets/img/styling/<slug>/`, numeradas `01.avif`, `02.avif`… A
página lê a pasta pelo nome do arquivo, não por lista: acrescentar uma foto é
acrescentar um `<figure class="caso__foto rv">` na página, apontando para o
arquivo novo.

**Grade simétrica de três colunas** (duas em ≤768px, uma em ≤420px). Houve
uma versão assimétrica antes, com larguras variando de 4 a 6 colunas — a
Jozzi escolheu a simétrica porque vai entrar mais foto por projeto, e com
volume a assimétrica vira uma página de 6000px enquanto esta fecha em 2600.

**O recorte é o preço da simetria.** Para as colunas alinharem, a proporção é
forçada em 2:3 com `object-fit: cover`. Fotos que já são 2:3 não perdem nada;
uma 3:4 perde uma faixa. **É por isso que a galeria ampliada não é opcional**
— é lá que a foto aparece inteira, sem corte.

### A galeria ampliada

Cada foto é um `<button data-lupa-abre="N">` que abre o `<dialog id="lupa">`
no índice N. O `<dialog>` nativo entrega **foco preso, Esc e backdrop sem uma
linha de JavaScript** — o módulo 10 do `main.js` só troca qual foto está no
palco, navega e devolve o foco ao botão de origem ao fechar.

**A lista de fotos da galeria é lida da própria grade**, não de um array no
JS: acrescentar uma `<figure>` na página é acrescentar a foto na galeria.
Nada a sincronizar.

Numa página com uma foto só, o JS marca as setas com `hidden`.

⚠ **Duas armadilhas já pagas, não desfazer:**

1. `.lupa__nav[hidden] { display: none }` existe porque o `display: grid` dos
   controles **vence** o `display:none` que o navegador dá ao `[hidden]`. Sem
   essa regra as setas continuavam na tela na página de foto única, mesmo com
   o JS marcando corretamente.
2. `.lupa__palco` usa `grid-template-rows/columns: minmax(0, 1fr)`. Um item de
   grid não encolhe abaixo do próprio conteúdo por padrão, então o
   `max-height: 100%` da imagem media contra uma linha de altura automática —
   referência circular. Medido antes da correção: a foto abria com 1400px de
   altura numa tela de 900, com o rodapé fora da tela.

### Preparar os arquivos

Originais de câmera têm 4000 a 7000px e não vão para o site. O caminho usado:

```bash
sips -Z 1400 original.jpg --out /tmp/_r.jpg
avifenc -q 62 -s 6 /tmp/_r.jpg assets/img/styling/<slug>/01.avif
```

1400px na maior dimensão, AVIF q62 — as 26 fotos atuais somam 1,4MB (~55KB
cada). **Este ffmpeg não tem libwebp**; `avifenc` e `cwebp` estão instalados
e são o caminho.

Cada `<img>` leva `width` e `height` reais (evita o salto de layout ao
carregar) e `loading="lazy"`.

### A capa na grade

A grade em `styling.html` e as fotos dentro da página do projeto são **dois
lugares diferentes**: aplicar as fotos no caso não põe capa na grade. Os cards
sem capa continuam mostrando o placeholder *Foto 1:1*.

Para pôr a capa, trocar o `<span class="ap">Foto 1:1</span>` do card por:

```html
<img class="styling-grid__foto__real" src="assets/img/styling/<slug>/03.avif"
     alt="<Nome> — capa do projeto"
     width="931" height="1400" loading="lazy" decoding="async">
```

**A capa é recortada em 1:1**, então nem toda foto serve: as verticais de
corpo inteiro viram um torso sem cabeça nem pés. Escolher close ou plano
médio — a capa não precisa ser a foto 01. As atuais são a 03 (Carol Andrade),
05 (Leandra), 02 (Solstice) e 01 nas duas que só têm uma foto.

### Projeto sem foto

Fica com um `.fig__campo` marcado *Fotos a fornecer* — a mesma regra do resto
do site: campo pendente é marcado, não preenchido.

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

## As fontes

Título e texto vêm do **kit Typekit da Jozzi**
(`https://use.typekit.net/oyj0zig.css`), carregado por um `<link>` no `<head>`
de cada página, **antes** do `style.css`. Três tokens em `:root`:

| | |
| --- | --- |
| `--fonte-titulo` | `"gracio", "nexa", …` |
| `--fonte-texto` | `"nexa", …` |
| `--fonte-aparato` | IBM Plex Mono, local |

⚠ **A Gracio ainda não está no kit.** Conferido no CSS servido pelo Typekit:
só a família `nexa` é entregue, em nove pesos. Enquanto a Gracio não for
adicionada ao kit no Adobe Fonts, o título cai na Nexa sozinho — **nada
precisa mudar aqui depois**, o token já a pede em primeiro lugar.

**A Switzer saiu do projeto** e com ela o eixo variável. A Nexa tem nove pesos
FIXOS (100 a 900), então `font-variation-settings` deixou de funcionar e foi
trocado por `font-weight` em dois lugares:

- a esteira da abertura (`PESO_BASE` 450→400, `PESO_PICO` 62→200 no `main.js`,
  e `--peso-base` no CSS — os dois têm de bater);
- o estado ativo dos cards de Serviços (430/560 viraram 400/600).

**O que se perdeu:** a esteira era um gradiente contínuo de peso e virou uma
troca com degrau, porque o navegador arredonda para o peso mais próximo do
kit. Se a fluidez fizer falta, o caminho é uma família variável — não há como
interpolar entre pesos estáticos.

O aparato segue em IBM Plex Mono local: é o registro de instrumento do site, e
nenhuma das duas famílias novas tem desenho monoespaçado.

## A régua que vira índice

A barra lateral de progresso abre ao receber o ponteiro (ou foco pelo teclado)
e vira o índice da página: cada segmento mostra o nome da seção e leva até
ela. Continua medindo a rolagem como antes.

Os segmentos são montados pelo `main.js` (`montarRegua`) como `<a href="#id">`
quando a seção tem `id`; sem `id`, viram `<span>` — é o caso das páginas de
projeto, que têm uma seção só e nada a navegar.

**A largura do aparato não muda ao abrir.** Os nomes cabem no vão que o
`--recuo` já reserva à esquerda do conteúdo (88 a 136px, e o nome mais longo
mede ~90px em 11px). Sem empurrar layout e sem precisar de fundo próprio numa
faixa que atravessa seções de cores diferentes.

**Abre por aproximação, não por mira.** Acertar um fio com o ponteiro é
mira, não navegação. `.aparato__escala::after` é uma faixa invisível que
estende a área sensível por toda a calha que o `--recuo` já reserva — chegar
perto da borda esquerda basta. Ela fica em `z-index: -1`, **atrás** dos
segmentos (que são `position: relative`), senão cobriria os próprios links
que existe para revelar. Não é link e não tem fundo: passar por ali não
produz nada além do hover.

**A cor sai de um canal só, `--regua-rgb`, e muda por fração.** Os dois
rótulos do aparato são blocos pequenos: para eles "estou sobre fundo escuro"
é sim ou não, e `pintarBloco` resolve com um `toggle`. A régua tem ~700px de
altura e passa metade da travessia com um pé em cada fundo — ali um `toggle`
pisca no meio do gesto. Então o `pintar()` mede o **quanto**: a fração da
faixa da régua que cai dentro das seções invertidas vira o fator de mistura
entre a ardósia (`120 134 146`) e o off-white (`243 240 232`). Como a fração
cresce enquanto a aresta do fundo varre a régua, a cor sobe junto com a
rolagem. A escrita só acontece quando a mistura anda meio por cento, para não
gastar um estilo por quadro. Sem script, o `--regua-rgb: var(--azul-rgb)` do
CSS segura tudo em ardósia.

⚠ **Três armadilhas pagas, não desfazer:**

1. A régua tem máscara de entrada **própria** (`revelar-regua`), e não a
   `revelar` compartilhada. Aquela usa `inset(… 0 …)` à direita, o que corta
   tudo além da borda do elemento — e a régua tem 5px. Os nomes, que abrem a
   72px, sumiam por completo.
2. O afastamento à direita é `-320px` e **não** uma porcentagem. Em `inset()`
   a porcentagem é relativa à largura do próprio elemento: `-200%` de 3px
   liberava 6px, e o nome continuava cortado. Foi o meu primeiro conserto, e
   estava errado.
3. O recorte também precisa de `-160px` **à esquerda**. Com `left: 0` a faixa
   de aproximação era decepada e só o lado direito abria — o ponteiro tinha
   de estar praticamente em cima do fio de novo. Nenhum estilo computado
   acusa isso: `visibility` e `opacity` do nome continuam corretos, só o
   `elementFromPoint` denuncia.

O `.aparato` continua com `pointer-events: none`; só `.aparato__escala`
recebe ponteiro. Assim o número e o relógio seguem sendo instrumento passivo
e não roubam clique do conteúdo. O `aria-hidden` saiu do aparato (agora há
navegação real dentro dele) e ficou só nos dois blocos de texto redundantes.

## Nossa visão em cards (01/09)

A seção 02 deixou de ser a composição alternada — cada princípio ocupando
metade da largura numa metade que alternava — e virou **quatro cards em duas
fileiras**, por decisão da Jozzi.

O que a troca resolveu: a composição anterior era bonita e era ALTA. Quatro
movimentos separados por `gap: clamp(6rem, 25vh, 16rem)` empurravam Serviços
para muito longe da abertura. Em card os quatro princípios se leem como
conjunto — que é o que eles são, quatro faces de uma mesma postura, e não
quatro declarações sucessivas.

⚠ **O card é um campo delimitado por FIO, sem fundo próprio.** Sobre tinta,
uma superfície mais clara viraria segundo plano e a seção perderia a inversão
que ela existe para fazer. Não dar `background` ao `.prin`.

⚠ **Os títulos dos cards NÃO levam `data-linhas`, e isso é deliberado.**
`revelar()` só distribui `is-dentro` nas `.pal` quando o elemento revelado é
ele mesmo o `[data-linhas]`. Com `.rv` no card e `data-linhas` no `<h3>` de
dentro, as palavras nunca receberiam a classe e **o título ficaria invisível
para sempre — sem erro nenhum no console.** O card entra como uma peça só,
igual aos cards de Serviços. Se um dia alguém quiser a revelação linha a
linha de volta, o `.rv` tem de ir para o `<h3>`, não para o `<li>`.

`.prin__t` tem escala própria (`clamp(1.5rem, 1.5vw + .85rem, 2.5rem)`) e não
`--fs-display-2` cru: o display-2 chega a 4,5rem e dentro de um card de meia
largura isso quebra em quatro linhas.

## Justificação depende da medida, não do layout

A bio das fichas de pessoa é justificada — mas só a partir de **700px**, e o
número não é arbitrário. Medido nessa bio: 31 caracteres por linha a 390px,
48 a 600, **55 a 700**, 67 a 1440. Justificar abaixo de ~55 caracteres é o
pior caso do alinhamento: o espaço entre palavras vira buraco visível em
quase toda linha. Abaixo de 700 o texto fica à esquerda.

`hyphens: auto` acompanha em TODAS as larguras, e não é enfeite: sem
separação silábica o português justificado abre rios, e palavras como
"Joanesburgo" são exatamente o caso ruim.

## Duas fichas de pessoa, alinhadas pelo TOPO

`.sobre__ficha` usa `align-items: start`. A seção usava `end` quando havia uma
pessoa só — ali retrato e bio tinham altura parecida e a base comum era
composição. Com duas fichas de extensões diferentes o `end` empurra o nome da
ficha curta para o pé do retrato e abre um vazio acima dele. Pelo topo as duas
leem igual independentemente do tamanho do texto.

A grade de 12 colunas desceu um nível, para dentro de cada ficha: no
`.sobre__pessoa` ela faria a segunda pessoa cair nas colunas seguintes da
MESMA fileira em vez de numa fileira nova.

⚠ **PENDENTE: o texto do Murilo Ribeiro.** Cargo e biografia não foram
fornecidos e não podem ser inferidos. A ficha está montada, na mesma
formatação da Letícia, com os dois campos marcados como a definir.

## Corpos com escala própria, e por quê

Três frases de display fugiram de `--fs-display` / `--fs-display-2` crus.
Nenhuma delas é capricho — todas resolvem um problema medido:

| Elemento | Escala | Motivo |
| --- | --- | --- |
| `.quem__t` | `clamp(1.8rem, 2.5vw + .5rem, 3.5rem)` | A frase quebra num `<br>` declarado ("somos estratégia" embaixo). No corpo cheio cada metade ainda estourava a coluna de 6 de 12 e virava quatro linhas — a quebra pedida sumia no meio de outras três. |
| `.sobre__t` | `clamp(2rem, 4.4vw + .5rem, 5.4rem)` | 58 caracteres em corpo cheio ocupavam 912px, mais de uma tela só de título. |
| `.sobre__linha` | `clamp(1.8rem, 3.2vw + .5rem, 3.6rem)` | Competia com a declaração de abertura da seção, e ela é a VIRADA, não o clímax. |

O piso de `.quem__t` é **1,8rem e não menos**: a 360px isso dá 29px contra 16px
de texto, exatamente o **1,8×** que o sistema exige entre o menor display e o
corpo. Baixar para caber em duas linhas a 320/360 quebraria a regra da escala
— e a quebra que a Jozzi pediu continua garantida pelo `<br>` em toda largura,
mesmo quando cada metade ocupa duas linhas.

⚠ **`.contato__email` caiu de `.82` para `.52` do display** (o convite "Venha
criar com a gente" passou a ser quem fala primeiro). Isso derrubou o alvo de
toque para 24px no telefone. O `padding: .55em 0` no bloco ≤900 devolve a
área sem mexer no corpo — medido em 45px a 375 e 48px a 390. **Quem mexer
neste corpo tem de re-rodar a auditoria de alvos de toque.**

## ⚠ IMAGENS PROVISÓRIAS NA HOME — REMOVER ANTES DE PUBLICAR

Os dez campos de imagem da home estão preenchidos com **fotos provisórias**,
a pedido da Jozzi (02/09), só para avaliar o layout com imagem no lugar dos
campos vazios.

**Nenhuma delas é a imagem certa daquele lugar.** As fotos são as que já
estavam no repositório, de projetos de styling. Em particular:

- o retrato da fundadora é de uma **modelo de um projeto de styling**;
- o retrato do Murilo Ribeiro também — e é de uma mulher, porque não há
  retrato masculino no repositório;
- a imagem de "Estúdio, Curitiba" é uma foto de campanha, não do estúdio.

**Isto não pode ir ao ar.** As legendas continuam dizendo "imagem a definir"
de propósito, e as imagens são `aria-hidden` com `alt` vazio: para leitor de
tela elas não existem, então nada é dito de errado a ninguém.

Para arrancar todas de uma vez, quando as reais chegarem:

```
sed -i '' '/data-provisorio/,+1d' index.html
```

Depois apagar a seção **11z. IMAGENS PROVISÓRIAS** do `style.css`. O rótulo do
campo ("Imagem 16:9", "Retrato 3:4") continua no HTML por baixo da foto e
volta a aparecer sozinho quando ela sair — é isso que torna a remoção segura
e verificável.

Escolha deliberada: **não entrou nenhuma imagem nova no projeto.** Nada de
banco de imagens, nada baixado, nenhuma licença nova a rastrear. As 10 fotos
somam 476 KB, todas `loading="lazy"`.

### Duas coisas daqui que valem ficar

1. **O véu no pé da chapa de Serviços** (`.serv__plate:has(.prov)::after`) não
   é enfeite da provisória: o numeral usa `mix-blend-mode: multiply`, desenhado
   para bege liso, e sobre foto ele some — no escuro por ser escuro, no claro
   por não ter contra o que contrastar. As fotos reais vão precisar do mesmo
   tratamento. Quando elas entrarem, mover essas regras de `:has(.prov)` para
   `.serv__plate` puro.
2. **`:has()` entrou no projeto aqui, e é a primeira vez.** Se as provisórias
   saírem inteiras, ele sai junto. Se o véu ficar (item 1), o projeto passa a
   depender de `:has()` — suportado em todos os navegadores atuais, mas é uma
   dependência nova que não existia antes.

## ⚠ A ARMADILHA DO `transform` DENTRO DE UM `.rv`

**`transform` não aplica em nenhum elemento que tenha `.rv`.** Não falha, não
avisa, não aparece nada errado na lista de regras — simplesmente não acontece.

A causa: a máscara de entrada é uma **animação**
(`.js .rv.is-dentro { animation: revelar ... both }`), o último keyframe dela
declara `transform: none`, e `animation-fill-mode: both` mantém esse valor
valendo para sempre. Na cascata do CSS, **animação vence declaração normal** —
só perde para `!important`. Então `.prin:hover { transform: scale(1.03) }`
nunca teve chance.

Custou uma rodada de depuração: a cor da borda no mesmo bloco de regra mudava
normalmente, o que fazia parecer que a media query batia e o seletor casava —
e batia e casava. Só o `transform` morria.

**Como o projeto resolve, e é assim que deve continuar:** separar os dois
elementos, em vez de brigar por `!important`.

| Onde | Quem tem `.rv` | Quem recebe `transform` |
| --- | --- | --- |
| Nossa visão | `<li class="prin__w rv">` | `<article class="prin">` dentro |
| Equipe | `<li class="equipe__m rv">` | a `<img class="prov">` dentro do quadro |

Não juntar de volta num elemento só. Se um dia precisar de `transform` num
elemento que já tem `.rv`, a saída é a mesma: um envoltório.

## Os rótulos de Serviços em uma linha (02/09)

A Jozzi pediu os seis rótulos padronizados em uma linha. Foi feito, e **custou
a escala tipográfica** — vale registrar o número para a decisão poder ser
revista com informação.

A largura que manda é **1280px**: ali já são três colunas e a calha ainda não
cedeu, então o espaço útil dentro do card é de 298px. O rótulo mais longo,
"Captação de Conteúdos", só cabe numa linha até **26,5px** nessa largura.

O que a clamp `clamp(1.4rem, .55vw + 1.05rem, 1.6rem)` produz: 22 a 25px,
uma linha em todas as larguras medidas (320 a 1440). O que isso quebra:

- o corpo **entra na faixa proibida de 24 a 44px** acima de 1025;
- a razão para o texto cai de **2,2x para ~1,4x**, abaixo do mínimo de 1,8x
  que o resto do sistema respeita.

O rótulo deixou de ser display e virou um registro intermediário que só existe
nesta seção. Para compensar em parte, a cor de repouso subiu de `--fg-3` para
`--fg-2`: como o corpo não carrega mais a hierarquia contra a descrição logo
abaixo, o tom carrega. Se a decisão voltar atrás, o que volta é essa clamp, o
`min-height: 2.12em` do rótulo e a cor.

## Equipe: o conteúdo não pode morar só no hover

O nome e a função de cada pessoa estão **sempre** no HTML. Onde não há
ponteiro (`@media (hover: hover) and (pointer: fine)` não bate) eles ficam
visíveis embaixo do retrato, em texto normal. Só onde há ponteiro é que saem
do fluxo e sobem por cima da foto, sobre um véu.

Conteúdo que só existe no `:hover` não existe no telefone nem para quem
navega por teclado. O `:focus-within` acompanha o `:hover` em todas as regras
pela mesma razão.

A grade usa `auto-fit` com piso de 150px, e não `repeat(3, ...)`: com três
colunas fixas cada retrato ficava com 110px num telefone, e um 3:4 desse
tamanho não é retrato, é miniatura. Cai para 2 colunas por volta de 500px e
para 1 em 320.

⚠ **PENDENTE: a função de cada um dos três.** Os nomes foram fornecidos
(Guilherme Bernardino, Giovanna Gobbi, Loize Antiacomi); o que cada pessoa faz,
não. Os três campos estão marcados como "Função a definir".

## A sexta face do rolo, e a página que ela abre

O tambor tem **seis faces e cinco projetos**. A última não é um caso: é o
botão "Ver todos os projetos", que abre `projetos.html`.

Ela leva `data-rolo-item` como as outras — é isso que a faz **girar junto** e
chegar como "o próximo", em vez de ser um bloco colado embaixo da seção. E
leva `data-rolo-cta` para o contador saber que ali não há o que contar.

O trilho se alonga sozinho: `ligarRolo()` escreve `--rolo-n` a partir de
`roloItens.length`, e o CSS deriva a altura dali. Não há número de faces
escrito em lugar nenhum.

**O contador.** `roloProjetos` conta as faces que não são CTA. Enquanto a
face de saída está de frente, `.rolo__conta` recebe `is-fora` e some — senão
mostraria "06 / 05". O texto "/ 05" continua fixo no HTML porque cinco é o
número de projetos, não de faces.

⚠ **NÃO pôr `max-width` num `.rolo__item`.** As faces têm `width: 100%` e um
`scale(--rolo-fator)` que compensa a ampliação do `translateZ`. Uma face mais
estreita que a lista tira o próprio centro do ponto de fuga e desliza para
fora, encostando na borda da tela — o mesmo bug de perspectiva já pago numa
rodada anterior, que eu reintroduzi aqui ao limitar a face da CTA. A medida
vai no CONTEÚDO (`.rolo__item--cta .rolo__nome`), nunca no item. Medido depois
do conserto: a face fica dentro da margem em 320, 390, 768, 1024 e 1440.

**Por que a página existe em vez de um bloco na home.** A altura da seção do
rolo *é* o curso do tambor:

```js
var alt = rolo.offsetHeight;
med.rolo = { topo: t, base: t + alt, curso: Math.max(1, alt - med.vh) };
```

Conteúdo acrescentado dentro de `#marcas` alonga `offsetHeight`, o curso
cresce junto e o tambor deixa de terminar onde a seção termina. Uma página
separada resolve isso sem tocar na medição.

### projetos.html

**Cards, não lista** — mesmo tratamento visual da grade de Styling, a pedido
da Jozzi (03/09). A página reaproveita a classe `.styling-grid` inteira
(grade responsiva, véu no pé, título ancorado embaixo, hover que amplia a
foto) em vez de duplicar as regras: uma grade só para manter, dois lugares
que a usam. A versão de lista simples que existiu antes foi substituída
inteira — nenhuma das classes `.indice__lista`/`.indice__l`/`.indice__seta`
sobrou no CSS.

Cinco clientes de marca e dezenove de styling, com o **mesmo peso visual**: a
Jozzi foi explícita em que os projetos de styling são clientes iguais aos
outros. Os seis casos de styling que já têm foto real em `styling.html`
usam a mesma imagem aqui — mesmo `src`, mesmo `alt`, mesma dimensão. Os
outros treze e os cinco clientes de marca mostram o placeholder "Foto 1:1",
porque não há foto real para eles ainda; nenhuma foi inventada.

O problema dos nomes longos quebrando em três linhas (documentado aqui numa
rodada anterior) foi resolvido de vez em 03/09 — ver a seção abaixo,
"Títulos em uma linha via container query".

A página foi feita a partir de `styling.html` (mesma casca: cabeça, sprite do
logotipo, cortina, aparato, topo). Quatro coisas herdadas precisaram de
troca, e vale conferir se um dia outra página nascer do mesmo molde:

1. `<title>` e as metas `og:`;
2. o rótulo inicial do aparato (`data-aparato-sec`) — o `main.js` só troca o
   texto quando o NÚMERO da seção muda, e uma página de seção única nunca
   muda, então o que está escrito no HTML é o único que existe;
3. o destino do `.topo__voltar` (aqui: `index.html#marcas`);
4. o alvo do "Pular para o conteúdo" e o crédito do rodapé.

## Serviços sem numerais (02/09)

Saíram os dois numerais de cada card — o grande na chapa (`.serv__plate-num`)
e o pequeno acima do rótulo (`.serv__num`), a pedido da Jozzi. Com eles foram
embora três coisas que só existiam por causa deles:

- o `mix-blend-mode: multiply` do numeral grande;
- o véu no pé da chapa (`.serv__plate:has(.prov)::after`), que existia só para
  dar piso ao numeral sobre foto;
- a regra que trocava a cor do numeral quando havia imagem atrás.

O `isolation: isolate` da chapa **fica**: o comentário original o atribuía ao
multiply, mas ele também contém o painel de etiquetas, que continua existindo.

As correções ópticas por card (`--optico`) ficam: elas alinham o primeiro
glifo do nome, e isso não tinha nada a ver com numeral.

## Títulos em uma linha, via container query (03/09)

A Jozzi pediu que todos os títulos da grade de cards (`.styling-grid__titulo`,
usada em `styling.html` e `projetos.html`) coubessem em **uma linha só**. Os
24 nomes únicos das duas páginas — o pior é "Descomplica Perícias", 20
caracteres — precisavam caber do card mais estreito (mobile, ~150px) ao mais
largo (desktop 3 colunas, ~450px).

**Por que não dava para usar `vw` como o resto do site.** A grade pula de 1
para 2 colunas em 481px e de 2 para 3 em 1025px. Nesses saltos a largura do
CARD despenca (de ~408px de conteúdo disponível para ~180px, com a largura da
TELA quase igual) porque o mesmo espaço passa a ser dividido por mais
colunas. Uma fonte em `vw` só conhece a tela, então não tem como caber nos
dois lados do salto ao mesmo tempo — teria de ser pequena o bastante para o
pior caso (180px), o que a deixaria minúscula em todo o resto da faixa.

**A solução: `container-type: inline-size` no `.styling-grid__item`, e o
título mede a si mesmo em `cqw`.** `cqw` é para o container o que `vw` é
para a tela — 1cqw = 1% da largura do container mais próximo com
`container-type`. Como o item É o que encolhe no salto, o título encolhe
junto, no mesmo instante, proporcionalmente.

⚠ **A armadilha: o padding também precisa ser `cqw`, não `vw`.** Na primeira
tentativa o padding do `.styling-grid__base` continuou em `vw` (herdado, não
tocado de propósito) enquanto o título passou a `cqw`. As duas escalas
pareciam a mesma coisa — cresciam juntas na maior parte da faixa — mas nos
saltos de coluna elas se descolavam: a margem (medida pela tela) ficava
grande demais ou pequena demais para o texto (medido pelo card), e a régua de
segurança que eu tinha calibrado por cálculo — não por medição — deixava o
texto avançar por cima da margem. Resultado: "PERÍCIAS" perdia o S, cortado
pelo `overflow: hidden` do card, em pelo menos uma largura real
testada (1440px, terceira coluna). **Nenhum teste de contagem de linhas
pega isto** — com `white-space: nowrap` a altura do elemento é sempre uma
linha, quebrado ou não; só comparar `scrollWidth` contra `clientWidth`
revela o estouro.

Os dois valores finais **vieram de varredura, não de cálculo**:

```
padding: clamp(.9rem, 6cqw, 1.5rem);   /* .styling-grid__base */
font-size: clamp(.85rem, 6.2cqw, 2.6rem);   /* .styling-grid__titulo */
```

Testado com `scrollWidth > clientWidth` nos 24 títulos, em 230 amostras (115
larguras de tela × 2 páginas, de 300 a 1440px, passo de 10px): **0px de
estouro em todas**. 6.4cqw de fonte já estourava 2px numa amostra — 6.2cqw é
o maior valor seguro medido, não um valor redondo escolhido a olho. Não subir
o fator sem repetir a varredura (o script de calibração ficou fora do
repositório, em `/tmp` — refazer é simples: sobrepor os dois valores via
`page.addStyleTag` e medir `scrollWidth - clientWidth` em cada card, em
várias larguras de viewport).

`white-space: nowrap` substituiu o antigo `overflow-wrap: break-word`:
quebrar por palavra deixou de ser a estratégia — agora é caber numa linha, e
um nome que não coubesse teria de encolher mais a fonte, nunca quebrar.

## O bug do Ê cortado, pela segunda vez — e por que não haverá terceira

Em 03/09 o "Ê" voltou a ser cortado em "A primeira agência de marketing
com foco em moda de Curitiba." e em "Como criamos para você." — os dois
títulos citados pela Jozzi, mas na verdade **oito famílias de título no
site inteiro** estavam com o mesmo problema: `sobre__nome`, `rolo__nome`,
`styling-grid__titulo`, `equipe__t`, `olhar__t`, `quem__t`,
`contato__convite`, além dos dois citados.

**A causa não era um valor errado — era dois valores certos, escritos em
lugares diferentes, que pararam de concordar.** `.d--2` tinha
`line-height: 1.0` desde o commit em que nasceu, no MESMO commit em que
`.d` tinha `line-height: .93` (a métrica da Switzer, a fonte antiga).
Quando a troca para a Gracio exigiu subir `.d` para `1.02` — a correção
documentada há semanas nesta seção —, ninguém tocou em `.d--2`, porque
nada ali parecia relacionado: são duas classes, dois blocos de CSS, a
poucas linhas de distância um do outro, mas ninguém reabre uma regra que
não mudou para conferir se ela ainda concorda com uma que mudou.

Como as duas têm a MESMA especificidade (uma classe cada) e `.d--2` vem
depois no arquivo, ela sempre venceu na cascata para qualquer elemento
com as duas classes juntas — que é o padrão usado em TODO título do
site (`class="... d d--2"`). O `.sobre__t`, que só leva `.d` sozinha,
nunca teve o problema; foi por isso que a correção de semanas atrás
pareceu completa na hora — o teste manual caiu, por acaso, no único
lugar que não tinha `.d--2`.

**A correção, desta vez, elimina a possibilidade de as duas se
descolarem de novo:** o valor agora mora numa única variável,
`--lh-titulo`, declarada uma vez junto de `.d`. `.d--2` não declara
`line-height` — herda. Não há mais um segundo lugar para esquecer de
atualizar, porque não existe segundo lugar.

⚠ **Antes de mexer na tipografia de display de novo:** se algum dia
parecer necessário dar a `.d--2` (ou a um futuro `.d--3`) um
entrelinha diferente do de `.d`, isso é possível — mas precisa ser uma
decisão CONSCIENTE, com uma linha `line-height` nova e um comentário
explicando por quê, nunca um valor esquecido de uma versão anterior da
fonte. Depois de qualquer mudança, testar visualmente "AGÊNCIA",
"VOCÊ", "PERÍCIAS" e "MARANHÃO" — as quatro palavras do site com o
diacrítico mais alto — no mínimo numa família de título de uma linha e
numa de várias linhas (o comportamento não é o mesmo nas duas).

## REFACTOR DE 03/09 — paleta de duas cores e cabeçalho fixo

Mudança grande, pedida pela Jozzi em oito itens. O que vale saber:

### A paleta caiu de sete cores para duas

Saíram verde, bege, azul, amarelo, bordô e marrom. Ficaram **Marsala**
(Pantone 18-1438, `#955251`) e **off-white** (`#F3F0E8`), mais um terceiro
VALOR do mesmo matiz do Marsala (`#4A2A29`, mesmo H e S, L de 45% para 23%).

⚠ **O valor escuro não é uma terceira cor — é uma necessidade de contraste,
medida.** Marsala sobre off-white dá 5,0:1: passa em texto normal por pouco.
Mas o sistema inteiro é feito de alfas (`--fg-2`, `--fg-3`), e qualquer
clareamento do Marsala cai abaixo do mínimo: 75% → 3,1:1, 90% → 4,2:1. Com o
Marsala puro como tinta, o texto secundário do site inteiro ficaria fora da
acessibilidade. Com o valor escuro, off-white sobre ele dá 10,8:1 — e o
Marsala fica livre para ser o que a Jozzi pediu que ele fosse: destaque.

As frações dos derivados foram **re-medidas**, não copiadas: o marsala escuro
é mais claro que o marrom antigo, então os mesmos alfas dariam menos
contraste. Subiram de 75/65 para 82/70.

Os nomes antigos (`--marrom-rgb`, `--azul-rgb`) sobrevivem como **aliases**
apontando para os novos. São ~40 referências espalhadas em alfas; caçar as
quarenta era a forma mais provável de esquecer uma — exatamente como o bug do
entrelinha nasceu.

**Fotografia continua colorida.** A restrição é da paleta da INTERFACE; as
fotos são conteúdo. A exceção é o fundo da abertura, que é atmosfera atrás de
texto: ela entra em cinza e recebe o matiz por cima, num duotone de Marsala —
sem isso, o véu off-white sobre foto quente produzia um rosa pastel, uma
terceira cor que a paleta de duas não admite.

### A régua lateral saiu, o cabeçalho virou navegação

Foram 313 linhas de CSS: o instrumento fixo, os segmentos proporcionais, a
abertura por aproximação, a mistura de cor por fração. Duas consequências:

- `--recuo` voltou a ser `--margem` em toda largura. A calha de 88–136px que
  o aparato reservava à esquerda de TODAS as seções voltou para o conteúdo.
- o relógio de Curitiba sumiu do topo. "Onde ficamos" existia em parte para
  explicá-lo; ela continua mostrando a hora, agora como informação local.

Os links da nav são **escritos à mão no HTML**, não montados por JS.
`montarRegua()` deixou de criar elementos e passou a encontrá-los. A navegação
funciona com o motor morto; o script só acrescenta o realce da seção corrente.

⚠ **`segs[i].el` pode ser NULO.** "Abertura" é uma seção sem link na nav (a
marca já leva ao topo). Todo acesso a `.el` no `pintar()` é guardado.

### ⚠ DOIS BUGS QUE EU MESMO CAUSEI NESTE REFACTOR

**1. Apaguei código vizinho ao remover o aparato.** O bloco `06b. INVERSÃO`
(`.inv`, `.campo`, `.inv--bordo`) morava DENTRO do intervalo de linhas do
bloco 06, e eu apaguei o intervalo **por número de linha** em vez de por
delimitador. As duas seções invertidas passaram a renderizar com fundo
transparente e texto escuro — sem erro nenhum, só errado. Restaurado do git.
**Apagar por intervalo numérico é rápido e é assim que se perde código que
não se está olhando.**

**2. Duas regras `.marca`.** Criei uma nova no cabeçalho e a antiga
sobreviveu mais abaixo — vindo depois, ela vencia e zerava o alinhamento e a
largura da nova. No telefone o CTA passava por cima do logotipo. É o MESMO
padrão do bug do entrelinha (`.d` / `.d--2`): duas regras da mesma classe, a
de baixo anulando a de cima em silêncio. Consolidadas numa só.

### Alvos de toque agora vêm de `min-height`, não de padding

Três elementos reprovaram na auditoria durante o refactor (`marca` em 37px,
`serv__nome` em 43,x, `topo__cta` em 38px) — todos porque o alvo dependia do
corpo da letra ou da largura de um SVG, e eu mexi nessas duas coisas.
`min-height: 44px` não depende de nada. Onde o alvo importa, é assim que ele
deve ser garantido.

### Pendências que este refactor NÃO resolveu

- o **número do WhatsApp** continua sem existir: o botão flutuante novo
  aponta para `wa.me/` sem número, igual ao link de Contato. Quando o número
  chegar, entra nos DOIS lugares e em nenhum outro.
- as imagens de `data-provisorio` continuam provisórias, incluindo o fundo
  novo da abertura e o par de fotos de "Quem somos".
- `MOCKtráfegopago.jpeg` tem **7,1 MB** — sozinho, mais que todo o resto do
  site somado. Precisa ser reencodado antes de publicar.

## Ajustes de 04/09 — o que voltou atrás do refactor anterior

Seis correções da Jozzi sobre o refactor de 03/09. Vale registrar o que
**voltou**, porque metade disso eu tinha acabado de mudar:

- **"Mais que estética, somos estratégia" voltou para "Quem somos".** Eu a
  tinha movido para a abertura; ela volta ao lugar de origem, e as duas fotos
  novas passam a acompanhá-la DENTRO da mesma seção em vez de ocupar o vão
  que ela deixaria.
- **A barra de progresso lateral voltou** — mas só a barra.
- **O CTA "Ver todos os projetos" saiu do cabeçalho** e passou a viver na
  seção de Projetos, ao lado da frase que a abre. Fixo no topo ele acompanhava
  o leitor por seções onde "ver todos os projetos" não quer dizer nada.
- **O botão flutuante do WhatsApp foi removido.** O que ficou foi o link da
  seção de Contato, redimensionado: era `--fs-display-2` e agora é 40% do
  display, para acompanhar o e-mail. As duas portas em pesos parecidos, e
  nenhuma seguindo o leitor pela página.

### A barra lateral MEDE, não navega

Diferença importante em relação ao aparato antigo: os segmentos são `<span>`,
não `<a>`, e não há nome de seção ao lado deles. Os seletores moram no
cabeçalho; um índice clicável aqui seria a mesma navegação duas vezes na
mesma tela.

⚠ **O rótulo de número e nome NÃO volta para dentro dela.** Eu tentei manter
e quebrou: são texto largo (`04 PROJETOS`, `CWB 11:35`) dentro de um contêiner
de 3px, e transbordavam para dentro da coluna de conteúdo — no rolo, o
"04 PROJETOS" ficava por baixo da frase de abertura da seção. O `--recuo` não
reserva mais calha à esquerda (isso saiu com o aparato antigo e não volta),
então não há onde esse texto morar. O nome da seção está no cabeçalho,
realçado; a hora foi para "Onde ficamos", com o rótulo por extenso.

`trocarSecao()` sobreviveu para o caso de o rótulo voltar, mas ganhou uma
segunda guarda: `aparato` continua existindo (é a barra), `apNum`/`apSec` não.
Sem ela, isto lançava quatro vezes por carga.

A cor da barra continua interpolando por FRAÇÃO — agora de Marsala
(`149 82 81`) até off-white. Marsala sobre a tinta dá 2,15:1: a barra sumiria
nas seções invertidas.

### Cabeçalho dinâmico: três estados

- **repouso** — transparente, sem fio. A imagem da abertura passa inteira por
  baixo dele. Por isso o `body` NÃO tem `padding-top`.
- **`.is-preso`** — a partir de 8px de rolagem: fundo translúcido com
  `backdrop-filter`, fio embaixo, e encolhe. O desfoque é progressive
  enhancement (`@supports`); onde não existe, sobra o fundo translúcido.
- **`.is-fora`** — rolando PARA BAIXO ele sai de cena; subindo, volta. É isto
  que resolve a sobreposição no rolo, que é `sticky` e ocupa a tela inteira.

⚠ **O limiar de 6px na direção não é capricho.** Sem ele, o quique elástico do
fim da página e a própria interpolação do Lenis fazem o cabeçalho piscar
entrando e saindo várias vezes por segundo.

`.is-escuro` inverte a cor do cabeçalho sobre as seções de tinta — por
LIMIAR, não por fração como a barra: ele é um bloco pequeno e fixo no topo,
e para ele "estou sobre escuro" é sim ou não.

### "Onde ficamos" reestruturada

Estava vazia: endereço em três linhas no topo à esquerda, mapa à direita, e
toda a coluna esquerda em branco. Virou uma composição de duas colunas de
verdade — à esquerda endereço, uma lista de definição com os dados práticos e
a ação; à direita o mapa, mais alto, atravessando as três fileiras.

**Nada foi inventado.** O único conteúdo "novo" é a HORA, que já existia na
barra lateral: ela volta ao lugar onde se explica. `ligarRelogio()` passou a
usar `querySelectorAll` — a hora aparece em dois lugares e os dois têm de
bater no segundo.

### Três formas de chegar (04/09)

Google Maps, Waze e Uber. Os destinos saem das **mesmas coordenadas** que a
lista de dados mostra na tela — há uma checagem simples para confirmar que os
três continuam concordando: extrair o `<dd>` de Coordenadas e procurá-lo nos
`href`. Se alguém trocar o endereço, os três links têm de mudar junto.

Os esquemas são os documentados por cada serviço, e nenhum precisa de chave
ou conta nossa:

| Serviço | Esquema |
| --- | --- |
| Google Maps | Maps URLs API, busca por endereço |
| Waze | `waze.com/ul?ll=<lat>,<lng>&navigate=yes` |
| Uber | `m.uber.com/ul/?action=setPickup&dropoff[latitude]=…&dropoff[longitude]=…&dropoff[formatted_address]=…` |

O Uber leva **as coordenadas e o endereço escrito**. As coordenadas colocam o
alfinete; o `formatted_address` é o que passageiro e motorista LEEM na tela do
app. Só com coordenadas, o destino aparece como um ponto sem nome. O endereço
usado é o mesmo das três linhas do `<address>` da seção, numa linha só, com
"- PR" que o embed do mapa já usava.

No celular com o app instalado, Waze e Uber abrem o app; sem app, abrem a
versão web. Os colchetes do Uber vão percent-encoded (`%5B`/`%5D`) e os `&`
como `&amp;`, senão o HTML não valida.

⚠ **Uma regra órfã apareceu aqui.** A media query de ≤900px ainda apontava
para `.onde__dados`, que virou `.onde__lista` quando a seção foi
reestruturada. Regra órfã não avisa: ela simplesmente não aplica, e o
empilhamento no tablet ficava dependendo do acaso da ordem no HTML. Vale
rodar a checagem de classes órfãs (comparar os seletores do CSS com as
classes do HTML) depois de renomear qualquer coisa.

### Alvos de toque: a mesma lição, quarta vez

`contato__zap` reprovou em 25px depois de eu aumentar o corpo dele. O padding
era em `em` — encolhe junto com a letra, que é exatamente o que não pode
acontecer num alvo. `min-height: 44px`, como já está na marca, no `serv__nome`
e no CTA. **Onde o alvo importa, ele não pode depender do corpo da fonte.**

## O "Ê" cortado, terceira vez — e a causa que faltava

Duas correções anteriores mexeram no entrelinha e não resolveram. O motivo é
que havia **duas causas**, e as duas precisavam ser corrigidas:

**1 · A geometria.** As métricas da Gracio, medidas no navegador com
`TextMetrics`: ascendente 0,95em, descendente 0,24em → **caixa de conteúdo de
1,19em**. O `line-height` define a caixa de LINHA; quando ela é menor que o
conteúdo, a diferença vira meio-espaço negativo e o conteúdo sobra para fora.
Com 1.02: (1,02 − 1,19)/2 = −0,085em de cada lado. E o Ê usa a ascendente
inteira — o ápice fica a 0,95em da base, encostado no topo da caixa de
conteúdo, ou seja **0,085em acima da caixa de linha**: 4,6px num título de
54px. `--lh-titulo` passou de 1.02 para **1.2** (a caixa de conteúdo com folga
mínima). Abaixo disso o acento volta a sobrar — é geometria, não gosto.

**2 · O recorte.** As três máscaras de entrada terminavam em
`inset(0 0 -8% 0)`: soltas embaixo e nos lados, **zero em cima**, recortando
exatamente na borda superior da caixa — bem onde o acento sobra. Passaram a
`-14%` no topo. O gesto não mudou: a máscara continua subindo de baixo para
cima; ela só deixou de cortar o que passa do teto.

Cinco regras fugiam do token com valores próprios (`.prin__t` 1.04,
`.serv__nome` 1.06, `.equipe__nome` 1.12, `.contato__email` .95,
`.contato__zap` 1) — todas passaram a usar `var(--lh-titulo)`.

## ⚠ APAGAR CSS POR INTERVALO DE POSIÇÃO: NÃO FAZER

Aconteceu **duas vezes** nesta refatoração, e as duas custaram caro:

1. Ao remover o aparato, recortei `s[i:j]` por número de linha e levei junto
   `.inv` e `.campo` — as seções invertidas passaram a renderizar com fundo
   transparente.
2. Ao reescrever o contato, recortei de `.contato {` até `/* 11. RODAPÉ */` e
   apaguei **1031 linhas**: Onde ficamos, Sobre a Jozzi, a equipe, o
   carregamento, a grade de Styling, as páginas de caso e a lupa. O sintoma
   foi estouro horizontal em styling.html e projetos.html; o CSS não acusou
   nada.

**A regra:** recortar por posição só é seguro quando os dois extremos
delimitam o MESMO bloco. `.contato {` é o começo de uma seção; o rodapé é o
começo de OUTRA, seis seções depois. Use os comentários de seção
(`/* 10f. */` → `/* 10g. */`) como delimitadores, e confira o que sai antes de
gravar.

E a recuperação: tentei restaurar "só o que faltava" comparando blocos, e a
comparação casou `@media (...)` genéricos entre si, deixando duplicatas e
chaves desbalanceadas. **O caminho certo foi `git checkout HEAD -- style.css`
e refazer as mudanças recentes uma a uma**, verificando as chaves a cada
passo. O HEAD tinha 40 minutos.

## Regras duplicadas da mesma classe — o padrão que se repete

Já foram quatro: `.d`/`.d--2` (entrelinha), `.marca` (alinhamento e largura),
`.topo` (o cabeçalho estático anulando o dinâmico) e as regras órfãs de
`.onde__dados`. O padrão é sempre o mesmo: duas regras da mesma classe, a de
baixo vencendo em silêncio. Depois de renomear ou reescrever qualquer bloco,
rodar:

```
grep -oE '^\.[a-z][a-zA-Z0-9_-]*(__[a-zA-Z0-9_-]+)* \{' assets/css/style.css | sort | uniq -d
```

Nem toda duplicata é erro (há pares base+refinamento de propósito), mas toda
duplicata merece uma olhada.

## Alvos de toque: `min-height`, sempre

Sexta ocorrência. `contato__l` reprovou em 15px porque o alvo era o `<a>`
dentro da linha, não a linha. Onde o alvo importa, ele não pode depender do
corpo da fonte nem de padding em `em`.

## Links reais chegaram (04/09) — e um parâmetro removido

| Onde | Link |
| --- | --- |
| WhatsApp | `https://wa.me/message/A5HZRIZWCMH3O1` |
| Instagram | `https://www.instagram.com/jozzicreative` |

O WhatsApp está em **dois lugares** e só dois: a linha "WhatsApp" da tabela de
contato e a lista de redes. Se o link mudar, é nesses dois.

⚠ **O link do Instagram veio com rastreio e eu removi.** O original era
`instagram.com/jozzicreative?igsi=NDg5d3lkdThmYXZp&utm_source=qr` — parâmetros
que o Instagram anexa quando o endereço é copiado da tela de QR code. Num link
de site eles fariam o Instagram contar cada visita vinda do site como se
tivesse sido um QR escaneado, sujando a métrica da própria Jozzi. O endereço
limpo leva ao mesmo perfil.

**TikTok:** vai existir, o link ainda não. Está na lista como texto marcado,
não como link — um `<a>` sem destino é pior que texto: promete um clique que
não acontece. Quando o endereço chegar, é trocar o `<span data-pendente>` por
um `<a class="contato__l">` igual aos outros.

Continua pendente: **telefone** (a Jozzi nunca forneceu) e o **e-mail**
definitivo (só o domínio está confirmado).

## Harmonização de imagens (09/09)

A Jozzi pediu que as imagens diminuíssem e ganhassem harmonia entre si. As
medidas em 1440px, antes → depois:

| Imagem | Antes | Depois |
| --- | --- | --- |
| Declaração de "Sobre a Jozzi" | 5 colunas, ~499px | 4 colunas, teto de 22rem → 352px |
| Retratos das fichas (Letícia, Murilo) | 4 colunas, ~370px | 3 colunas, teto de 18rem → 288px |
| Retratos da equipe | `auto-fit` sem teto, ~390px | piso 190px + teto de 46rem → 231px |

Os **tetos em `rem` importam**: sem eles, `auto-fit` e as frações de coluna
voltam a crescer nas telas largas, e a equipe passava a pesar mais que os
fundadores logo acima dela.

As duas fotos de "Mais que estética" passaram a ficar **uma em cima da
outra**, centralizadas. Lado a lado, na coluna da direita, cada uma ficava com
metade de meia página — pequena demais para o 4:3 que elas têm.

⚠ **O teto e a centralização moram na FIGURA, não no contêiner.** `max-width`
+ `margin-inline: auto` no `.quem__par` criavam dependência circular: ele é
item de grid, e margem automática faz o item se dimensionar pelo conteúdo —
mas o conteúdo é uma faixa `1fr`, que depende da largura do contêiner. O
navegador resolve para ZERO e as duas fotos somem, sem erro nenhum. Medido
antes de publicar: faixa de 0px, figura 0x0.

### Mais uma regra duplicada — a quinta

`.sobre__ficha--a/b .sobre__fig` e `.sobre__bio` repetiam `grid-row: 1`, e
vinham DEPOIS da regra que põe foto e bio na fileira 2. Resultado: o numeral
da ficha caía na mesma fileira do texto e ficava por cima do cargo — "02" em
cima de "CARGO A DEFINIR". Corrigido tirando o `grid-row` das regras de baixo,
não acrescentando uma sexta. **Uma propriedade, um lugar.**

### A auditoria agora espera as transições assentarem

O script mediu a marca em 43,99px e reprovou o alvo de toque — mas a altura
real é exatamente 44. Estava medindo enquanto o cabeçalho voltava de
`is-fora`, e a transição de 600ms deixava sobra de subpixel. O script agora
espera 900ms e dois `requestAnimationFrame` antes de medir. **Falso positivo
de ferramenta custa tanto quanto bug: manda consertar o que não está quebrado.**

⚠ **O script de auditoria vive no scratchpad da sessão, não em `/tmp`.** Ele
sumiu entre uma sessão e outra e precisou ser reescrito. Se for para durar,
tem de entrar no repositório — mas aí vira dependência de Playwright num
projeto que não tem nenhuma. Fica no scratchpad, e reescrever é rápido.

## "Mais que estética": centro com centro (09/09)

`.quem` usava `align-items: end` — as duas colunas encostavam pela BASE. Como
o texto tem cerca de metade da altura da pilha de fotos, o centro dele ficava
**173px abaixo** do centro delas: alinhado pela base, desalinhado aos olhos.
Passou a `center`, e o `align-self: end` das fotos saiu junto. Medido: 0px de
diferença entre os centros em 1440 e 1200.

⚠ **Outra regra órfã, a sexta.** A media query de ≤1024 ainda continha
`.quem__txt { grid-column: 7 / span 6 }` — sobra de quando a FIGURA ficava à
esquerda e o texto à direita. A figura saiu em 04/09, o texto foi para a
coluna 1, e esta regra continuou empurrando-o para a metade direita abaixo de
1024px, onde as fotos já ocupam a largura toda. Medido: texto começando em
x=520 de 1024, espremido em meia página sem motivo nenhum.

**Regra órfã não avisa — ela só continua valendo.** Depois de mover qualquer
elemento entre colunas, conferir as media queries que o citam.

## Auditoria de design e responsividade (09/09)

Medida, não opinada: 25 combinações de página × largura (5 páginas × 320, 390,
768, 1024, 1440), coletando contraste calculado, escala tipográfica,
espaçamentos, raios, sombras, alvos de toque e cobertura de estados
interativos.

**Resultado: 0 reprovações de contraste, 0 estouros horizontais, 0 erros de
JS, 0 alvos abaixo de 44px** (depois das três correções abaixo).

### O que foi corrigido

| O quê | Era | Virou |
| --- | --- | --- |
| `.abertura__rolar` | 41px de **largura** (a altura já passava) | `min-width: 44px` |
| `.marca` | sem nenhum retorno ao ponteiro | hover em opacidade |
| `.serv__card` | respondia só via `is-ativo` do JS | hover/`focus-within` em CSS |

O card de serviço é o mais relevante dos três: **com o motor morto, seis cards
clicáveis ficavam completamente inertes ao ponteiro**, porque o único sinal
era a classe que o script põe. O `:focus-within` acompanha o `:hover` porque
quem chega pelo teclado foca o `<button>` DENTRO do card, não o card.

### O que foi verificado e está certo — não mexer

- **Cores:** tudo deriva de três valores (`marsala-fundo`, `off-white`,
  `marsala`) mais alfas. Nenhuma cor solta em 25 medições.
- **Raios e sombras:** zero de ambos, em todo o site. É decisão editorial, não
  esquecimento — "padronizar" aqui seria introduzir o que o sistema recusa.
- **Foco:** existe um `:focus-visible` **global** com anel de 2px. Todo
  elemento focável já tem foco visível sem precisar de regra própria.
- **Espaçamento fora da grade de 4px:** 33 de 49 valores. É consequência do
  sistema ser **fluido** (`clamp()` com vw/vh) e não escalonado. Forçar
  múltiplos de 4px significaria abandonar o dimensionamento fluido — uma troca
  ruim, e contrária à arquitetura documentada.
- **`serv__rotulo` a 24,7px:** dentro da faixa proibida de 24–44px e a 1,45x o
  corpo do texto (mínimo do sistema: 1,8x). **Já documentado** como o custo
  aceito do pedido de "títulos em uma linha".

### ⚠ A FERRAMENTA TEVE MAIS BUGS QUE O CÓDIGO

Quatro falsos positivos, todos capazes de me fazer "consertar" o que estava
certo. Vale a lista, porque qualquer auditoria futura vai cair neles:

1. **`color(srgb 0.9 0.87 0.84)`** — o `color-mix` do `--papel-2` sai nessa
   notação, com floats de 0 a 1. Lidos como 0–255, qualquer cor clara vira
   quase preta: acusou 1,36:1 num rótulo que tem 4,56:1.
2. **Opacidade de ancestral** — o painel da equipe tem `opacity: 0` no pai e 1
   no filho. Checar só o próprio elemento acusa texto invisível como se
   estivesse na tela (deu 1:1).
3. **Véu que é IRMÃO, não ancestral** — o título dos cards fica sobre um
   `.styling-grid__veu` absoluto, irmão do bloco de texto. Subindo só pela
   árvore, o véu não existe e o off-white aparece "sobre bege claro".
4. **CSS aninhado** — `CSSStyleRule.cssRules` hoje EXISTE (lista vazia, mas
   truthy). Uma recursão `if (r.cssRules)` trata toda regra como contêiner e
   nunca lê seletor nenhum: reportou "nenhum `:hover` no site" com 26 deles no
   arquivo. O teste certo é `r.cssRules && r.type !== 1`.

O script vive no scratchpad da sessão (`lib-medir.js` + `rodar-auditoria.js`).

### Ponto em aberto, não resolvido

**O telefone não tem navegação de seção.** Abaixo de 900px o cabeçalho é só a
marca: a nav some e o CTA mora dentro da seção de Projetos. Isso é coerente
com a página ser uma rolagem só, e é o comportamento que já existia (a régua
lateral também nunca apareceu no telefone). Mas é uma decisão de produto, não
um detalhe: se a Jozzi quiser um menu no celular, é uma adição — não um
conserto.

## JozziTacticalMatrix — o painel de combo (11/09)

Pedido da Jozzi: um painel "tático" em Serviços para combinar frentes, ver o
escopo e pedir orçamento. O pedido veio escrito para React + framer-motion +
lucide + Tailwind; **o site não tem nada disso**, e a decisão foi integrar no
stack atual — JS nativo e o CSS do próprio site, nenhuma biblioteca nova.

**Onde vive:** HTML no fim de `#servicos` (`index.html`, `#JozziTacticalMatrix`),
script em `assets/js/matriz.js`, CSS na seção **10c2** do `style.css`.

**De onde vêm os dados — não mexer nisso sem pensar:** as frentes, os nomes e
os entregáveis são LIDOS dos seis `.serv__card` da mesma seção (`.serv__rotulo`
e `.serv__tags li`). Mudou a copy de um card, a matriz acompanha. A
"telemetria" é contagem desses dados: frentes ativas, entregáveis mapeados,
entregáveis por frente. **Não há preço, prazo nem porcentagem** — a Jozzi não
forneceu nenhum, e o painel não inventa. Os três protocolos (Launch, Content
Scaling, Full Stack Growth) têm os nomes do pedido; a composição de cada um é
um ponto de partida editável em `PRESETS`, no topo do `matriz.js`.

**WhatsApp:** o link da Jozzi é `wa.me/message/…`, que **não aceita texto
pré-preenchido**. O botão copia a mensagem montada para a área de
transferência e abre o link normalmente (sem `preventDefault` nem
`window.open`, para não cair no bloqueador de pop-up); a pessoa só cola. Se a
cópia falhar, a mensagem aparece num campo selecionado. Se um dia a Jozzi
tiver o número em formato `wa.me/55…`, dá para trocar por `?text=` e a cópia
vira redundante.

**Comportamentos:** embaralhador de 300 ms (hexadecimais e símbolos, trava da
esquerda para a direita, cancela a mudança anterior); radar SVG girando só
enquanto o painel está na tela; onda na coordenada do clique (máx. 4 vivas);
vidro = alfa + `backdrop-filter`, cantos em L = oito fios de fundo. No
telefone (≤768) os três cards somem e entra o botão "Ver detalhes táticos do
combo", que abre uma folha (`<dialog>`) com abas *01. Escopo · 02. Telemetria ·
03. Orçamento*; fecha por Esc, botão, toque fora ou puxando a pega.

**Tela cheia, tamanho fixo (pedido da Jozzi, 11/09).** O painel ocupa a
largura inteira (sangra por cima do recuo do `.wrap`) e tem EXATAMENTE uma
tela de altura: `height: 100svh`. Trocar protocolo ou frente não muda nada
de tamanho — nem o painel, nem os cards, nem a folha do celular (que tem
`height: 85svh`, não `max-height`).
- **Por que `svh` e não `dvh`:** a `dvh` acompanha a barra de endereço do
  celular aparecendo e sumindo, e o painel mudaria de altura no meio da
  rolagem. A `svh` fica parada.
- **O que não cabe rola por dentro**, nunca empurra a borda: a lista do
  Escopo, o miolo da Telemetria (`.mz-tel__rolo`) e texto + mensagem do
  Orçamento (`.mz-orc__rolo`). O botão do WhatsApp e as notas ficam FORA
  dessas áreas, sempre no pé do card. Rolar só a mensagem, ou só a lista
  "por frente", não bastava: em 1280×720 e 1024×768 o resto do card já
  empurrava o botão para fora. As áreas que rolam levam
  `data-lenis-prevent`, senão o Lenis toma a roda do mouse.
- No celular quem rola, se preciso, é o bloco de controles; o botão "Ver
  detalhes táticos do combo" fica ancorado no pé da tela.
- Embaixo o painel desconta o respiro da seção (`--serv-pb`, declarado em
  `.serv`) para encostar na seção seguinte. Se o padding de `.serv` mudar,
  mude a variável — não o número solto.
- Testado em 1440×900, 1280×720, 1024×768, 900×1000, 390×844, 390×664,
  360×640 e 320×568, em quatro estados cada (Launch, Full Stack, nenhuma
  frente, Content Scaling): altura igual à tela em todos, nada vazando do
  card, botão sempre visível.

**Ordem dos scripts:** `matriz.js` carrega ANTES do `main.js`. Ele tira o
`hidden` do painel, e o `main.js` mede as faixas escuras (`[data-inv]`) ao
subir — na ordem inversa mediria o painel com altura zero e o cabeçalho não
escureceria sobre ele.

**Exceções assumidas às regras do sistema, por pedido explícito:** o radar é
uma segunda animação em laço (a regra abaixo diz uma só) e o painel é uma
superfície escura com grade. As duas ficam CONTIDAS no painel. A luz de status
ao lado do título é parada de propósito — pulsar seria um terceiro laço.

**Testado (11/09):** desktop 1440, tablet 900, telefone 390; preset, ajuste
manual (vira "Personalizado" e volta a reconhecer o protocolo), cópia real
para a área de transferência, abertura do WhatsApp, folha (abas por seta,
arrastar, Esc, foco devolvido ao botão), movimento reduzido (sem embaralhar,
radar parado), sem JavaScript (painel escondido, link simples visível), e a
auditoria de regressão das 9 páginas × 4 larguras: 0 problemas.

## A matriz em UMA TELA, sem rolagem (12/09)

Refatoração pedida pela Jozzi: o painel passa a ocupar **exatamente uma tela**
(`100dvh` + `overflow: hidden`) e **nada dentro dele rola** — nem os cards.
Antes havia rolagem interna em três caixas; agora não há nenhuma.

**O que faz caber é DENSIDADE, não rolagem.** O `matriz.js` (módulo 06) mede e
escolhe o maior nível de detalhe que cabe na altura disponível:
- `data-denso-painel` no painel (0–3): aperta cabeçalho e controles. Sobe de
  nível se o painel transbordar OU se os cards ficariam com menos de 220px.
- `data-denso` em cada card e em cada aba da folha (0–3): 0 mostra tudo; 1 corta
  etiquetas e prévia em menos linhas; 2 esconde detalhe (etiquetas, lista por
  frente, texto do orçamento); 3 é o mínimo (nomes em duas colunas, só o botão).

⚠ **Para a medição funcionar**, os filhos do corpo do card são `flex: none` — não
encolhem, e o excesso aparece no `scrollHeight`. Trocar por `min-height: 0` neles
quebra o ajuste em silêncio: tudo "cabe" e o conteúdo some recortado.

O ajuste roda depois de cada mudança, no `ResizeObserver` do painel (que pega a
barra de endereço do celular mudando a `dvh`) e quando as fontes chegam. Nunca
dentro de quadro de animação — ele lê layout.

**Outras decisões desta rodada:**
- `dvh` (e não `svh`): foi o pedido explícito. Custo: no celular a altura
  acompanha a barra de endereço aparecendo e sumindo.
- O radar virou FUNDO (grande, atrás dos cards, dentro de `.mz-fundo`, que
  recorta) — no cabeçalho ele comia altura. O recorte também mantém o radar fora
  do `scrollHeight` que a densidade mede.
- Cantos em L também nos botões ligados (perna de 7px em off-white).
- Chips compactos (32–37px) NO MOUSE; em `pointer: coarse` voltam a 44px. A
  auditoria do site cobra 44px nas larguras de telefone, e lá eles têm 44.
- A prévia da mensagem perde a linha em branco (a mensagem copiada não): cortada
  em 3 linhas, a linha vazia virava um "…" solto.
- `.mz-msg` usa `border-bottom` transparente no lugar de `padding-bottom`: o
  `overflow` corta na caixa de padding, e o padding deixava aparecer meia linha
  do texto que o `line-clamp` escondia.
- O pedido veio em Tailwind (`bg-neutral-950`, `p-6`, `line-clamp-2`). As
  medidas viraram CSS do site; o fundo continua Marsala escuro (paleta de duas
  cores), e as laterais continuam na margem do site — no desktop a barra de
  progresso mora dentro dela e passaria por cima do conteúdo.

**Testado (25/09):** 2560×1440, 1920×1080, 1440×900, 1280×720, 1280×600,
1024×768, 900×1000, 390×844, 390×664, 360×640 e 320×568, em quatro estados cada:
altura igual à tela, nenhuma caixa rolando, nada transbordando, botão sempre no
pé do card e a folha do celular cabendo nas três abas.

## Troca das fotos de styling (25/09)

Origem: uma pasta-mãe pública no Drive da Jozzi ("00 - PASTAS OK") com 23
pastas. **Regra da Jozzi: o que vai para o site é a subpasta `Selecionadas`
(ou `SELEÇÃO` / `01- SELEÇÃO`) mais a `Capa`.** Os arquivos soltos na raiz de
cada pasta são o take inteiro e NÃO entram — uma das pastas tem inclusive uma
subpasta `IGNORAR` com 82 fotos.

⚠ O filtro precisa aceitar as três grafias. A primeira versão procurava só
"Selecionadas"/"SELEÇÃO" e a Carol Andrade ("01- SELEÇÃO") caiu na raiz: foram
64 fotos erradas para a página. Hoje o casamento é por *substring* sem acento
(`sele`, `capa`).

**Como ficou:** 20 pastas viraram 20 projetos, 257 fotos. Em cada projeto,
`01.avif` é a Capa (é ela que a grade usa como card) e as seguintes são as
Selecionadas, na ordem do Drive.

**Processamento:** baixadas pelo endpoint de thumbnail do Drive em 2200px,
cortadas no centro para 2:3 (o mesmo recorte que `.caso__foto img` já fazia no
CSS), redimensionadas para 933×1400 e codificadas em AVIF com qualidade
adaptativa (80 → 56, parando quando a foto cabe em 105KB). Média final de 84KB;
antes, com qualidade fixa, a média dava 139KB e a maior batia 487KB.

**Três projetos novos** (Maysa, New Again, Old Money) ganharam página: as pastas
existiam e não havia caso no site. Etiquetas e texto ficaram MARCADOS
("etiquetas a fornecer" / "Texto a fornecer") — não há copy da Jozzi para eles
e nada foi inventado.

⚠ **A lupa mora na página, não no main.js.** As 15 páginas que ainda não tinham
foto também não tinham o `<dialog class="lupa">` — ao ganhar fotos, os botões de
ampliar existiam e não abriam nada (sem erro no console: o `ligarLupa` só
desiste quando não acha o diálogo). O bloco foi copiado para todas. **Página de
caso com foto tem que ter o `<dialog>`** — se criar uma nova a partir de uma
página sem foto, confira isso.

**A grade virou a lista da Jozzi (25/09).** A pedido, a grade de `styling.html`
passou a ter os 24 projetos da lista que ela mandou, **na ordem dela** — inclusive
as três pastas de cliente (Claudia Choma, Collab, Descomplica Perícias), cujos
cards apontam para `projetos/*.html`, não para `styling/`. As fotos delas ficam
em `assets/img/projetos/<slug>/` (mesma regra: `01.avif` é a Capa). Teacher Paula
NÃO estava na lista; o card continua no fim da grade até a Jozzi confirmar se sai.

⚠ Ao regerar cards da grade, preservar o `<p class="styling-grid__projeto ap">` —
é o rótulo acima do título (Stella Maranhão "Cartas de Tarot", Amanda Woman
"Woman"). Eu apaguei os dois numa regeneração e tive de restaurar do git.

**Pendências desta rodada:**
- `Bazaar Fashion` e `Effeá` não têm subpasta de seleção no Drive, só `CAPA`.
  Usei os arquivos da raiz (12 e 15 fotos). Se a Jozzi montar a `Selecionadas`
  dessas duas, é só rodar de novo.
- `Stella Maranhão` e `Teacher Paula` não têm pasta no Drive. A pedido da Jozzi
  (25/09), os dois cards da grade ganharam **capa PROVISÓRIA** — foto de outro
  projeto, marcada com `data-provisorio`, só para ver o layout preenchido. **Não
  pode ir ao ar assim.** As páginas de caso das duas seguem com o campo marcado
  ("Fotos a fornecer"), sem foto provisória.
  Para arrancar as duas quando a foto real chegar:
  `sed -i '' '/PROVISÓRIA/,+4d' styling.html` (confira o trecho antes) — e a
  regra `.styling-grid__foto:has(.prov) > .ap` do bloco 11z do CSS sai junto.
- As três pastas de cliente do Drive (Claudia Choma Nutri, Collab, Descomplica
  Perícias) ficaram de fora a pedido: são páginas de `projetos/`, não styling.

## Redesign: menos "painel tático", mais o resto do site (28/09)

A primeira versão da matriz tinha estética própria — grade de fundo, radar
girando, cartões em vidro fosco com cantos em L, uma luz piscando ao lado do
título, rótulos como "Protocolo" e "Sistema ativo". A Jozzi pediu para tirar o
clima de ficção científica e aproximar do resto do site. **Isto foi só
redesign visual — nenhum comportamento mudou** (zero rolagem, densidade,
embaralhador de 300ms, folha do celular, cópia + WhatsApp, tudo como estava).

**O que saiu, e por quê:**
- **O radar** (`.mz-fundo`, `<svg class="mz-radar">`, a varredura girando, os
  pontos por frente) — decoração pura, sem informação que não estivesse já nos
  cards.
- **A onda no clique** (`.mz-ondas` / `.mz-onda`, o `pointerdown` em
  `matriz.js`) — mesmo raciocínio.
- **A grade de fundo e o halo** atrás do painel e da folha do celular — o
  painel voltou a ser tinta cheia, exatamente como as outras seções invertidas
  (`.inv`) do site.
- **Os cantos em L** nos três cards e nos chips ativos — os cards viraram
  campo delimitado por fio, sem fundo próprio, a MESMA regra que `.prin`
  (Nossa Visão) já seguia. Zero sombra, zero raio de canto, zero blur — as
  mesmas restrições de sempre, só que agora aplicadas aqui também.
- **A luz piscando + "Matriz tática · Serviços · Sistema ativo"** — a linha
  inteira saiu; o painel abre direto no título.
- **O vidro fosco dos cards** (`backdrop-filter: blur`) — sem a grade atrás
  para desfocar, não tinha mais função.

**O que mudou de nome (só o texto visível, nada de estrutura):**
- "Protocolo" → **"Combo"** (rótulo do grupo de presets e da linha
  correspondente dentro do card de Telemetria) — reaproveita a palavra que o
  resto do componente já usava ("Monte o seu combo", "Combo: Launch").
- "Ver detalhes **táticos** do combo" → "Ver detalhes do combo" (botão do
  celular).
- Os códigos dos chips — `S01`…`S06` nos serviços, `P1`/`P2`/`P3` nos presets
  — perderam a letra e viraram só o numeral (`01`…`06`, `01`/`02`/`03`), na
  cor quieta `--fg-3`, o mesmo tratamento do índice dos cards (`.mz-idx`) e de
  `.prin__n` em Nossa Visão. Achar por letra parecia designação de sistema;
  numeral simples é só um índice, igual ao resto do site.

**Token reaproveitado:** `--mz-linha`, uma cor de fio própria da matriz
(`rgb(off-white / .14)`), foi embora — toda borda do componente usa
`var(--fio)` agora, o MESMO fio que `.inv` e `.prin` já usam (`rgb(off-white /
.22)`). Um card da matriz e um card de Nossa Visão têm, byte a byte, a mesma
borda.

**Testado (28/09):** a bateria de telas do bloco anterior (2560×1440 a
320×568, quatro seleções cada) continua em zero: mesma altura da tela, nada
rolando, nada transbordando, botão sempre no pé do card. Testado também sem
nenhum resíduo visual (busquei `.mz-radar`, `.mz-fundo`, `.mz-ondas`,
`.mz-onda`, `.mz-canto`, `.mz-sis` no DOM — nenhum), sem `background-image` nem
`backdrop-filter` no painel, embaralhador ainda troca o texto em 300ms, cópia
real para a área de transferência + abertura do WhatsApp, folha do celular
abre e fecha com Esc, movimento reduzido pula o embaralhador. Auditoria geral
do site (9 páginas × 4 larguras): 0 problemas.

## Segunda leva de capas + reordenação da grade (28/09)

A Jozzi mandou 21 fotos (zip "capas fotos") com uma ordem explícita de 27
projetos, numerada 01–27. Apliquei as duas coisas: a grade de `styling.html`
foi **refeita do zero nessa ordem exata**, e cada foto virou a `01.avif`
(capa) do projeto correspondente — mesmo tratamento das capas anteriores:
recorte central 2:3, 933×1400, AVIF com qualidade adaptativa (80 → 32, teto de
~105KB; `sis2-alfaiataria` fechou em 109KB mesmo no chão da escada — aceitei,
a diferença é imperceptível numa capa única).

⚠ **Nomes de arquivo vindos de Mac trazem acento em NFD** (`á` como `a` +
combinante U+0301), não NFC. Um dicionário Python escrito à mão (`'Effeá'`)
não bate com `os.path.basename()` se o disco devolver NFD — comparar só depois
de `unicodedata.normalize('NFC', …)` dos dois lados. Foi exatamente o que
aconteceu aqui: a foto do Effeá "sumiu" na primeira passada só por causa disso.

**A ordem trouxe três novidades que não existiam na grade:**
- **Widepine Cafés** (02) e **Shop Carol** (15) — as páginas já existiam em
  `projetos/` (casos de cliente antigos, de antes deste projeto de fotos) mas
  nunca tiveram card na grade de styling. Entraram sem foto (nenhuma das duas
  tinha capa no zip nem tem `<img>` na própria página — são `fig__campo`
  vazios com "Foto 1", "Foto 2", "Foto 3" desde sempre).
- **A.TEC** (07) — projeto novo, sem página, sem foto, sem texto. Criei
  `styling/a-tec.html` no molde do `teacher-paula.html` (a página mais
  recente que ainda tinha tudo marcado como pendente), com etiquetas e corpo
  **substituídos por "a fornecer"** — não herdei a copy da Teacher Paula por
  engano; o script confere que nenhum fragmento dela sobrou no arquivo novo.

**Teacher Paula saiu da grade.** A lista de 27 da Jozzi não inclui esse
projeto; a pedido dela, o card saiu de `styling.html`. **A página
`styling/teacher-paula.html` continua existindo** — só não tem mais link na
grade. Reversível: basta reinserir o `<li>`.

**Ficaram sem foto nova** (não vieram no zip): Widepine, Shop Carol e A.TEC
(nunca tiveram), e Stella Maranhão (26) — que mantém a capa PROVISÓRIA da
rodada de 25/09 (emprestada da Solstice Magazine), sem imagem nova.
**Etérea Cookies** (05) e **Collab** (09) também não vieram no zip, mas já
tinham capa real de antes (do lote grande do Drive) — mantidas como estavam.

**`projetos.html` ficou desatualizada.** É uma página separada, um índice em
texto (não uma grade de fotos) com "Clientes — 5" e "Styling — 19" — não foi
tocada nesta rodada porque o pedido era especificamente sobre capas/grade, e
essa página não tem imagem nenhuma. Ela já estava desatualizada antes disto
(não lista Maysa, New Again, Old Money) e agora também não lista A.TEC nem
reflete a ordem nova. Fica pendente até a Jozzi pedir para sincronizar.

**Testado (28/09):** styling.html e as 3 páginas novas/tocadas (a-tec,
widepine-cafes, shop-carol) em 390 e 1440px — zero imagem quebrada, zero 404,
zero estouro horizontal, zero erro de JavaScript. Nenhum `.avif` referenciado
ficou quebrado; nenhum arquivo de imagem ficou órfão em
`assets/img/styling/`.

## `projetos.html` fundida com a ordem da grade (28/09, parte 2)

A separação "Clientes" / "Styling" que o item anterior preservou durou pouco:
a Jozzi voltou e pediu para as duas listas se fundirem numa só, na MESMA
ordem 01–27 que rege `styling.html`. Feito:
- Os dois `<div class="indice__bloco">` (com seus `<h3>` de contagem) viraram
  UMA `<ul class="styling-grid">`, sem cabeçalho de grupo — o mesmo padrão
  simples que `styling.html` já usava.
- **Teacher Paula saiu daqui também.** "Nenhum card que não estiver nessa
  contagem" foi a instrução — antes eu tinha mantido essa página como o
  "índice completo" e deixado a Teacher Paula só fora da vitrine; agora as
  duas páginas mostram exatamente os mesmos 27, na mesma ordem. A página
  `styling/teacher-paula.html` continua existindo, só não tem link em
  lugar nenhum do site agora.
- A frase da introdução que explicava a separação ("Os projetos de styling
  entram aqui pelo mesmo motivo dos outros: são clientes") saiu — não fazia
  mais sentido sem a separação para explicar. A frase que sobrou já existia,
  não é texto novo.
- **`.indice__bloco` e `.indice__ap` saíram do CSS.** Eram usadas só pelos
  dois cabeçalhos de grupo que não existem mais; sem elas, zero seletor órfão.
  Isso mexeu no `style.css`, então o cache-bust subiu (`?v=133`) nas 31
  páginas.

**Testado:** as duas páginas (`styling.html` e `projetos.html`) batem — mesmos
27 slugs, mesma ordem, mesmas capas. 390 e 1440px, zero imagem quebrada, zero
estouro, zero erro. Rodei a auditoria geral do site três vezes seguidas (uma
delas relatou 1 falha isolada; as outras duas e uma nova rodada de
confirmação vieram limpas — timing do Chrome headless, não coisa do código).

## `projetos.html` sincronizada com a grade (28/09)

Ficou pendente da rodada anterior: essa página é um ÍNDICE separado de
`styling.html` — "Clientes" e "Styling" em duas listas, cada uma com sua
própria contagem no `<h3>`. Não usa a ordem numerada 01–27 da Jozzi (essa é
só da grade); usa a lógica que a própria página já tinha:
- **Clientes** — ordem de criação (não alfabética), sem mudar: Collab, Claudia
  Choma, Descomplica Perícias, Widepine Cafés, Shop Carol. Só as fotos e a
  contagem foram atualizadas.
- **Styling** — alfabética pelo título exibido. Entraram nas posições certas:
  **A.TEC** (entre "Amanda II" e "Bazaar Fashion" — tratei o ponto como se não
  existisse, senão ele ordena antes de tudo por ser ASCII baixo), **Maysa**,
  **New Again** e **Old Money** (entre "Luciana Burgos" e "Sis2 Alfaiataria").
  19 → 23 itens.

**Teacher Paula continua aqui**, mesmo tendo saído da grade de
`styling.html`. Esta página se chama "Todos os projetos" — ela é o índice
completo, a grade é a vitrine curada. Um projeto pode sair da vitrine sem
sair do índice.

**A foto provisória da Stella Maranhão (da rodada de 25/09) NÃO foi trazida
para cá.** Essa página nunca teve o dispositivo de capa emprestada — só
`styling.html` tem, porque foi pedido lá especificamente. Aqui ela mantém o
`Foto 1:1` normal, igual sempre teve.

**Testado:** 390 e 1440px, 28 cards, 23 imagens carregando sem 404 nem
quebra, sem estouro horizontal, zero erro de JavaScript.

## O que NÃO fazer

- **Não subsetar a Gracio.** É a fonte desenhada da marca (`assets/fonts/
  Gracio.woff2`, convertida do `.otf` do Fontself). Um subsetter tira os
  acentos e a página é em português — o "Ê" de AGÊNCIA é a primeira vítima.
- **Não declarar `line-height` numa classe da família `.d`/`.d--2` (nem
  numa futura `.d--3`).** O valor mora numa variável só, `--lh-titulo`,
  definida junto de `.d` — ver o comentário grande em cima dela na seção
  04 do CSS. `1.02` é o piso; abaixo disso o circunflexo da Gracio escapa
  da caixa de linha e o "Ê" aparece decepado (funcionava com a Switzer,
  a fonte antiga — não funciona com esta).
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
assets/js/matriz.js         JozziTacticalMatrix (painel de combo em Serviços)
assets/js/lenis.min.js      rolagem interpolada (não editar)
assets/fonts/               Gracio (marca) + IBM Plex Mono
assets/img/                 imagens do site + logotipo + favicon
assets/img/styling/<slug>/  as fotos de cada projeto de styling
```
