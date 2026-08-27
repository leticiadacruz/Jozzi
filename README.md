# Jozzi — site

**Método e Instinto.** Site da JOZZI.

> **Estado:** copy definitiva aplicada (rodada de 25/08). **Oito seções, 00 a 07**,
> todas no mesmo scroll. Ainda falta apenas imagem e alguns dados de contato —
> listados no fim deste documento.
>
> **Rodada de movimento (27/08).** Quatro pedidos da Jozzi, todos no ar:
> Serviços virou cinco cards; o aparato virou régua de segmentos que se
> transforma a cada seção; o convite a rolar da abertura ganhou rótulo e
> animação própria; e o cálculo do movimento saiu de dentro do quadro de
> animação, que era a causa do arrasto. Três regras do sistema mudaram por
> decisão da Jozzi e estão marcadas com ⚠ ao longo deste documento:
> **"sem cartão"**, **"nenhuma animação infinita"** e a proporção da imagem de
> Serviços.

---

## Sumário

- [Como rodar](#como-rodar)
- [Tecnologias](#tecnologias)
- [O sistema](#o-sistema) — as regras que não podem ser quebradas
- [Componentes previstos](#componentes-previstos) — 03 a 06
- [O que falta de conteúdo](#o-que-falta-de-conteúdo)
- [Licenças de tipografia](#licenças-de-tipografia)

---

## Como rodar

Não há build.

```bash
cd ~/jozzi-site && python3 -m http.server 8000
```

Abrir `http://localhost:8000`. Abrir o `index.html` direto pelo Finder também
funciona, mas as fontes não carregam por `file://`.

---

## Tecnologias

| Camada | O que é usado |
| --- | --- |
| Marcação | HTML5 semântico, página única com âncoras reais |
| Estilo | CSS autoral — Grid, custom properties, `clamp()`, `clip-path` |
| Comportamento | JavaScript nativo, sem transpilação |
| Rolagem | [Lenis 1.1.18](https://lenis.darkroom.engineering/), auto-hospedado |
| Tipografia | Switzer Variable (ITF) + IBM Plex Mono (OFL), auto-hospedadas |

Sem framework, sem bundler, sem biblioteca de animação. Fontes: **63 KB**
(Switzer variável 43 KB + Plex Mono 2 × 10 KB).

---

## O sistema

Esta seção existe para impedir que uma alteração futura desfaça a direção de
arte. Cada regra tem um motivo. Se uma delas precisar ser quebrada, é sinal de
que o problema está em outro lugar.

### Marca

O logotipo oficial é o lockup **JOZZI CREATIVE LAB** — traço arredondado, com
irregularidade de mão, proporção 15,6:1. Não é a Switzer: é arte fechada, e por
isso entra como SVG, nunca como texto.

**Uma geometria, três escalas.** Os 16 paths moram uma vez só, num `<symbol>`
no topo do `<body>`, e são instanciados por `<use>`:

| Onde | Largura | Altura resultante |
| --- | --- | --- |
| Cabeçalho | `clamp(11rem, 17vw, 15rem)` | 11 a 15px |
| Carregamento | 100% da margem | ~64px |
| Rodapé | 100% da margem | ~79px |

É a proporção extrema que faz isso funcionar: em largura cheia o lockup deixa de
ser "logotipo grande" e vira **faixa** — o documento abre e fecha com a mesma
arte, em escalas opostas.

**Nenhum path tem `fill` próprio: a cor vem de `currentColor`.** O pacote
entregue trazia nove arquivos, um por cor da paleta (branco, off-white, bege,
amarelo, ardósia, verde, marrom, bordô, e um sem cor). Nenhum dos nove coloridos
entrou no projeto — o sem-cor serve a todos os fundos, e o dia em que o logotipo
precisar aparecer sobre o verde ou o bordô já está resolvido sem arquivo novo.
Mestre versionado em `assets/img/jozzi-creative-lab.svg`.

⚠ **Conflito de nome, pendente de decisão da Jozzi.** O logotipo diz
JOZZI CREATIVE **LAB**; o texto do rodapé dizia Jozzi Creative **Marketing**
Lab. Dois nomes diferentes empilhados a 40px de distância leem como erro, então
a linha de texto saiu do rodapé — o logotipo agora carrega o nome sozinho. Qual
dos dois é o oficial é decisão da Jozzi, não minha.

### Paleta

A paleta oficial da Jozzi. **As sete cores entram porque as sete têm função** —
nenhuma foi forçada para mostrar a paleta.

| | | Função |
| --- | --- | --- |
| Off white | `#F3F0E8` | Papel, o fundo dominante |
| Marrom | `#372215` | A tinta do texto sobre papel — 13,2:1 |
| Verde | `#3B3D33` | O fundo das duas inversões, 02 e 05 |
| Bege | `#DDDCCC` | Superfície secundária: os campos de imagem |
| Azul | `#788692` | Instrumento do aparato e anel de foco |
| Amarelo | `#EEE3B5` | O sinal sobre tinta, onde o azul não alcança |
| Bordô | `#402428` | Seleção de texto |

Tudo o mais é **transparência dessas mesmas sete**. Os canais estão em
`--marrom-rgb`, `--off-white-rgb` e `--azul-rgb`: trocar o hexadecimal leva
junto todas as derivações. Nenhuma cor crua sobrou fora dos tokens, exceto no
bloco de impressão — lá `#fff` significa "sem tinta no papel" e `#000` significa
"tinta cheia", que não são cores de marca.

**Onde o azul pode e não pode ir.** Medido: `#788692` dá **3,28:1** sobre o
papel. Isso basta para anel de foco e fio de instrumento, que exigem 3:1, e não
basta para texto. Mais importante: o azul é **mais claro** que o texto em
repouso, então pintar um elemento ativo de azul o deixaria *menos* contrastado
que os inativos e o sinal se inverteria. Por isso, sobre papel, **interação se
marca por contraste** — o item ativo vai para a tinta cheia. Sobre tinta o azul
dá 2,96:1 e nem como foco serve: ali quem sinaliza é o amarelo, com 8,6:1.

Nenhum gradiente. Nenhuma sombra. Nenhum `border-radius`. Fios de 1px.
Profundidade vem de inversão de fundo.

**Contraste verificado em 1440 e 390 com composição de alfa:** 25 e 23 pares de
texto medidos, **zero abaixo do mínimo**. O mais justo é o aparato em 11px, a
4,56:1 contra o mínimo de 4,5. Sobre bege o aparato precisa de 72% em vez de
65% para alcançar o mesmo — a regra está local nos campos de imagem.

### Tipografia

Dois registros, e nada entre eles.

| Registro | Corpo | Família |
| --- | --- | --- |
| Display | 96–176px | Switzer 500 |
| Display 2 | 48–72px | Switzer 500 (460 sobre tinta) |
| Lede | 20–22px | Switzer 400 |
| Texto | 16–17px | Switzer 400 |
| Aparato | 11px versal, `+.145em` | IBM Plex Mono 400 |

**A faixa de 24 a 44px não existe** — no desktop. É onde vive o subtítulo de
todo template. Se um texto parece precisar dela, ele pertence ao registro de
texto ou ao de display, não a um terceiro inventado no meio.

A regra em pixels vale acima de 1025px. **A regra geral, válida em qualquer
largura, é a razão:** existem dois registros e nada entre eles, e o menor corpo
de display nunca fica abaixo de **1,8 vez** o corpo do texto. A 390px o texto é
16px e o menor display é 31px — 1,9 vez. Foi assim que a faixa absoluta
apareceu: ela é a expressão dessa razão numa tela de 1440.

Entreletra: `-.045em` no display, `-.035em` no display 2, `-.012em` nas versais
(caixa alta pede menos aperto que caixa baixa). Medida do texto corrido: 58 a
64 caracteres, sempre.

A mono nunca aparece acima de 13px e nunca compete com a Switzer.

### Os três fundos

`papel · papel · VERDE · papel · BEGE · papel · BORDÔ · papel`

Antes eram cinco seções idênticas em papel e duas em verde — a paleta existia
nos tokens e não na tela. **Marcas ganhou o bege** e **Contato ganhou o bordô**.
Sobre a Jozzi entrou entre os dois em papel, de propósito: **dois fundos de cor
nunca se encostam** — o papel é a respiração que faz o bordô seguinte bater.
O bordô não é troca de cor: o manifesto e o clímax não podem dividir o mesmo
fundo, e a 05 era a seção que a auditoria apontou como a mais genérica do site.

O amarelo passa a existir **em repouso**, nomeando as duas portas do Contato —
10,9:1 sobre bordô.

### Movimento — a gramática, em quatro níveis

O movimento tem hierarquia: alguns momentos são fortes porque os anteriores
foram silenciosos. Uma curva e duas durações valem para os quatro níveis.

**1 · Máscara de entrada.** O gesto universal. Todo `.rv` entra por
`clip-path` de baixo para cima com 10px de deslocamento.

**2 · Revelação por linha.** Um container com `[data-linhas]` não entra
inteiro: entram as linhas dele, 55ms entre uma e outra. Reservado ao que o site
mais quer que se leia — a frase da abertura e as quatro afirmações do olhar.
Mesmo mecanismo que alimenta a esteira de peso: as palavras já estavam
quebradas.

**3 · Interpolação por scroll.** Dois usos, ambos com teto de 12px de
deslocamento. A régua do aparato preenche o segmento da seção corrente — a
trilha deixa de ser um fio com um ponto e passa a medir, capítulo a capítulo. E
os três blocos da diagonal de Marcas se
deslocam em tempos ligeiramente diferentes ao cruzar o meio da tela — mais um
teto de 5% de escala no bloco mais próximo do centro, a única transformação de
escala do sistema fora de Serviços. O bastante para a diagonal respirar, pouco
o bastante para não virar parallax.

**4 · Resposta do estado ativo.** Em Serviços o item ativo responde **no eixo
variável da Switzer** — 430 para 560 — que é o mesmo recurso da esteira da
abertura. O nome não muda de tamanho nem de posição: muda de peso.

**A abertura não entra: ela se monta,** em quatro tempos medidos —
`120ms` o instrumento se desenha · `370ms` a marca · `610ms` a frase, linha a
linha · `730–980ms` o rodapé. O silêncio entre os tempos é o que dá presença,
não o tamanho de nenhum deles.

O cursor assume o sinal do fundo em que está: azul sobre papel, amarelo sobre
tinta. Mesma gramática de três rótulos, nada de novo.

**Não existe parallax de fundo nem nada que se mova sem uma ação do leitor ou
sem a rolagem** — com **uma exceção, nomeada**: o convite a rolar da abertura.

⚠ **A exceção do laço.** A Jozzi pediu a seta da abertura mais explícita e com
animação. Ela ganhou rótulo (*Rolar*), trilho de 34px e um traço de 12px que
desce esse trilho em laço de 2,2s, com a ponta do chevron acompanhando em 4px.

Três coisas mantêm a exceção sob controle, e as três precisam continuar
valendo:

1. **Ela é a única.** Nenhuma outra animação em laço entra no site.
2. **Ela se apaga.** Passando de 40px de rolagem, o convite recebe
   `is-cumprido`, some em 600ms e o laço para. Depois da primeira tela não há
   nada em movimento próprio no documento inteiro.
3. **Ela é de fio, não de forma.** 1px, na cor do texto, na curva do sistema.
   Nenhuma forma nova, nenhuma cor nova.

Com `prefers-reduced-motion` o laço não existe: fica o rótulo e o chevron
parados, que já são a parte explícita do pedido.

### Carregamento — o aparato deitado

Cortina de tela cheia em verde, com o logotipo em largura total embaixo à
esquerda e, sob ele, a medida: barra à esquerda para a direita, mensagem
`we are creating for you…` num canto e a porcentagem no outro.

A referência pedida foi o preloader da Twist. O que veio de lá é o **dispositivo**
— cortina, mensagem de um lado, contador do outro. O material é daqui: a barra é
desenhada no **mesmo off-white do logotipo** que está logo acima dela, e a
trilha é esse off-white a 16%. Nenhuma cor nova entrou.

A primeira versão citava o fio do aparato — 2px, em ardósia. Ficou discreta
demais para uma barra de carregamento, que precisa ser lida a metros de
distância, e a Jozzi pediu mais corpo. Hoje tem 10px e 9,7:1 de contraste
contra o verde, no lugar dos 2,96:1 da ardósia.

A composição rima com a abertura de propósito — marca embaixo à esquerda, medida
sob ela. Quando a cortina sobe, o olho já está na altura em que
*"We create for you."* aparece.

**A barra não é um cronômetro falso.** Ela anda com `document.fonts.ready` (os
63KB de tipografia são o peso real desta página) e `window.load`; o quadro a
quadro só interpola entre um marco e o outro, para o número não ficar parado.

Os tempos, todos no topo do módulo 09 do `main.js`:

| | | |
| --- | --- | --- |
| `PISO` | 1400ms | mínimo na tela. Abaixo de ~700ms ninguém lê a frase |
| `CHEIA` | 420ms | o último trecho, entregue ao CSS |
| `PAUSA` | 260ms | repouso em 100% antes de subir |
| `TETO` | 5000ms | o que impede a cortina de virar porta trancada |

**O fecho é um gesto só.** Passando de 96%, o JS solta o volante: marca a
cortina como `is-cheia`, o CSS leva a barra até a borda em `--t-cheia` e o
número termina de contar junto, na mesma duração. Sem isso a barra trava em 99,
o número salta e a cortina sai por cima — três eventos onde deveria haver um.
Depois vem a `PAUSA`, para o olho fechar a conta, e só então a subida.

**Quatro modos de falha, todos testados:**

| Situação | O que acontece |
| --- | --- |
| Sem JavaScript | O CSS só mostra a cortina sob `.js` — ela nunca aparece |
| `prefers-reduced-motion` | O módulo nem liga; a cortina é removida do DOM |
| `main.js` não sobe | A rede do `<head>` a remove aos 2,6s e solta a rolagem |
| Fontes nunca chegam | O teto age; medido saindo em 2,4s |

Sem a rede do `<head>`, o pior caso do site deixaria de ser "sem animação" e
passaria a ser **tela verde para sempre** — o CSS mostra a cortina quando há
`.js`, e quem a remove é o `main.js`.

A subida é a mesma máscara que revela todo o resto do site, na direção inversa.
E o conteúdo só se monta *depois* que ela começa a subir: a abertura tem quatro
tempos medidos e não pode ser gasta atrás de um painel opaco.

A subida usa `--t-cortina` (900ms) e não os 600ms do sistema: a cortina é a
maior superfície que se move no site inteiro, e no tempo padrão a tela toda
saltando lê como corte, não como gesto. É a única coisa que anda mais devagar
que o padrão.

### Como o movimento é calculado — um quadro, e nenhuma leitura de layout

Isto não é otimização prematura: era a causa real do arrasto.

A versão anterior lia `getBoundingClientRect()` de cada bloco da diagonal, dos
dois blocos do aparato e da escala **dentro do quadro de animação**, alternando
leitura e escrita elemento a elemento. Cada par leitura-escrita obriga o
navegador a recalcular o layout antes de responder. Com três clientes, dois
blocos e uma escala, era meia dúzia de recálculos de layout por quadro, em cima
da rolagem interpolada — o que aparecia como diagonal arrastando e marca de
posição pulando.

Agora vale uma regra, e ela precisa continuar valendo:

> **Dentro do quadro não se lê layout. Só se escreve.**

As medidas — topo e altura de cada seção, meio de cada bloco de cliente, posição
dos dois blocos fixos do aparato — são tiradas **uma vez** em `medir()`, e de
novo no `resize`. O quadro só escreve. Enquanto a rolagem não muda, o quadro
custa uma comparação de número.

O aparato é `position: fixed`: a posição dele **na tela** não muda com a
rolagem, então medi-la uma vez basta. É o que permite decidir o claro/escuro de
cada bloco sem tocar no layout.

**A troca de seção tem token.** Atravessar três seções em rolagem rápida
deixava três `setTimeout` de 200ms na fila, e o rótulo podia terminar exibindo a
seção do meio. Cada troca agora carrega um número de série e só escreve se ainda
for a última.

**A régua também é a fonte da troca de seção.** Antes havia um
`IntersectionObserver` separado só para trocar o rótulo, com faixa de -45%: dois
mecanismos decidindo "que seção é esta" podiam discordar na travessia. Hoje quem
decide é a linha do meio da tela contra as medidas, e ela decide **uma vez** —
para o rótulo, para o segmento e para o preenchimento.

### Durações e curva

Um gesto, uma curva, três durações.

- **Máscara** — `clip-path` abrindo de baixo para cima, com no máximo 10px de
  deslocamento, na animação `revelar`. É o único jeito de algo aparecer no site.

  **O estado de repouso de `.rv` é opacidade, não recorte** — e isso não é
  detalhe de implementação. O `IntersectionObserver` calcula a interseção sobre
  a caixa **já recortada**: um elemento com `clip-path: inset(0 0 102% 0)` tem
  razão de interseção zero e nunca atinge um limiar de 0,01. Com a máscara no
  repouso, o observador nunca revelou nada, em lugar nenhum — a entrada só
  parecia funcionar porque a rede de segurança revelava tudo aos 3,5s. Se
  alguém devolver o `clip-path` para o estado de repouso, a animação de entrada
  morre em silêncio outra vez.
- **Curva** — `cubic-bezier(.16, 1, .3, 1)`. Se uma animação nova precisar de
  outra curva, ela não entra.
- **Durações** — 200ms para micro-interação e troca de estado, 600ms para
  entrada. Só duas, e nada acima disso.
- **Esteira de peso** — o eixo variável da Switzer responde à leitura na
  abertura. Amplitude reduzida de propósito (450 → 512): é comportamento
  tipográfico, não demonstração. Uma passada automática, 1,6s depois da entrada,
  **uma única vez**. O título nunca vira animação contínua.

- **Cursor** — sobre elementos com `data-cursor`, o ponteiro nativo dá lugar a
  um rótulo curto em mono, lido do próprio elemento. Um rótulo, não um círculo,
  e sem atraso nem mola: o rastro elástico é o clichê a evitar. Só existe com
  ponteiro fino e sem movimento reduzido. Hoje: *Ver* nos cards de Serviços,
  *Copiar* / *Copiado* no endereço de e-mail.

- **Estados de clique** — `:active` nos dois links do Contato e no link do
  Maps, na mesma cor do foco. No telefone não existe hover, e sem `:active` o
  toque não devolve nada antes de a página trocar.

Sem `prefers-reduced-motion`: as máscaras viram estado final imediato, o Lenis
não inicializa, a esteira não existe, o cursor não existe. Nenhum conteúdo
depende de animação.

### Rede de segurança, em duas camadas

Nada pode ficar escondido por causa da máscara.

1. **Fora do `main.js`**, no `<head>`: se o script principal não subir em 2s, a
   classe `js--sem-motor` revela tudo. O `main.js` tem `defer`, então roda antes
   do `DOMContentLoaded` — se existe, marca `js--pronto` muito antes do prazo.
2. **Dentro do `main.js`**, aos 3,5s: se o observador não subiu, revela tudo. Se
   subiu, desbloqueia só o que o leitor já alcançou e deixa o resto com ele.

A camada 2 já cobriu demais uma vez: revelava a página inteira, e por isso o
sistema de movimento passou meses morto sem ninguém notar. Ela cobre a falha,
não o funcionamento.

Um elemento ainda não revelado continua focável, então `.rv:focus-within`
força a aparição — invisível e focável é a pior combinação possível.

### Aparato — a régua das seções

Trilha fixa à esquerda, acima de 1025px: número e nome da seção, a régua, hora
em Curitiba. 11px, 40% de tinta. **Instrumentação silenciosa** — se começar a
chamar atenção, está errado.

**A régua tem um segmento por seção, e a altura de cada segmento é a altura real
daquela seção no documento.** A régua mede o documento; ela não conta seções em
partes iguais. Os segmentos são montados pelo `main.js` a partir dos
`[data-secao]` — nenhum número está escrito à mão, e acrescentar uma seção nova
acrescenta um segmento sozinho.

A cada seção o instrumento **se transforma**:

| Estado | O que acontece |
| --- | --- |
| Seção corrente | o segmento engorda de 1px para 3px e ganha uma agulha horizontal de 9px na borda do preenchimento |
| Já lida | fica cheia, em ardósia a 52% |
| Ainda por ler | continua no fio de 28% |

O preenchimento do segmento corrente anda com a rolagem **dentro daquela
seção**, não com a rolagem do documento — é isso que responde "quanto falta
deste capítulo", que o escorregador contínuo anterior não respondia.

Sem transição no preenchimento, de propósito: quem suaviza é a rolagem
interpolada, e uma transição por cima dela vira arrasto. A transição existe só
na largura e na cor, que trocam uma vez por seção.

**Se o script não subir, a régua não se monta e sobra o fio contínuo de sempre**
— desenhado no `::before` da escala, apagado pela classe `js--regua`. O
instrumento nunca some.

O fio e a marca de posição são em Ardósia e nunca trocam de cor. Os dois blocos
de texto trocam **cada um pelo que está atrás dele**, não pela seção corrente:
na travessia de papel para tinta, o topo e o rodapé do aparato estão sobre
fundos diferentes.

Abaixo de 1025px o aparato some e o nome da seção reaparece dentro do conteúdo.
Acima de 1025px esse rótulo fica escondido (`clip-path`, ainda legível por
leitor de tela) — o aparato já o mostra a dois centímetros de distância.

### Inversão

Papel vira tinta como pontuação entre capítulos, não como fundo escuro
decorativo. Ritmo: 00 papel · 01 papel · **02 tinta** · 03 papel · 04 papel ·
**05 tinta** · 06 papel. Sem borda na divisa — a aresta de cor é a divisa.

### Composição

Nenhuma seção repete a estrutura da anterior. Se duas seguidas usam a mesma
grade, uma das duas é redesenhada.

Sem ícone. Sem elemento adicionado porque "a seção precisava de algo". **O
espaço vazio é parte da composição** — não é sobra a ser preenchida.

⚠ **"Sem cartão" caiu, por decisão da Jozzi.** Serviços passou a ser cinco
cards. A regra que a substitui é de material, e vale para qualquer card que
venha depois: **um fio de 1px e uma caixa de papel.** Sem raio, sem sombra, sem
gradiente, sem preenchimento colorido, sem elevação. O que muda no estado ativo
é a cor do fio — de 20% para 45% de tinta — e nada mais. Um card que precise de
sombra para se destacar do fundo está resolvendo o problema errado.

Margens reais de cartaz, sem caixa central de 1200px. Todo elemento se ancora em
coluna nomeada; nada está centrado "porque sim".

**Sem número grande decorativo.** Houve por algumas rodadas um "numeral
d'água" — o número de cada seção em escala de pôster, a 6%, sangrando pelo
canto. A Jozzi pediu a remoção e ele saiu inteiro. O que ficou daquela rodada
é o `overflow: clip` em `[data-secao]`. Ele chegou a mudar de dono — passou a
conter a sangria da chapa de Serviços — e ficou sem dono de novo quando a seção
virou cards. Medido em 27/08, com a regra desligada, em 1280 e 1440: nada
transborda. Ficou por ser barato e porque o `position: relative` do mesmo bloco
continua ancorando conteúdo.

O único número em corpo grande que sobrou é o carimbo sobre a chapa de cada
card de Serviços (`.serv__plate-num`), que não é marca d'água: é sólido, fica
sobre a foto e repete o número do próprio card.

### Imagem

Três proporções no site inteiro: **3:4, 16:9, 1:1**. Recorte fora dessas três não
entra. Um único tratamento de cor para todas.

**Os campos estão prontos para receber os arquivos.** `object-fit: cover` e
`object-position: center` valem para a `<div>` marcada de hoje e para o `<img>`
de amanhã: o arquivo preenche a caixa e é recortado, nunca esticado. Testado com
arquivo real em 1440 e 390 — serviço 3:4 no desktop e 1:1 no fluxo, seção 01
sempre 3:4, mapa sempre 1:1.

**`height: auto` no `<img>` é obrigatório.** Sem ele o atributo `height` do
arquivo vira altura usada e o `aspect-ratio` da classe é ignorado. E não pode
ser `height: 100%`: dentro da grade de Serviços o campo abrange seis linhas, e a
altura forçada estica o `<img>` para 0,49 em vez de manter 3:4.

**Área segura:** o recorte 3:4 → 1:1 do mobile tira um oitavo em cima e um
oitavo embaixo. Nada essencial pode viver nessas duas faixas.

**Nunca stock photo. Nunca imagem genérica. Nunca imagem gerada.** A direção
depende de material real da Jozzi e dos clientes. Enquanto não houver material,
o campo fica marcado — um retângulo em papel-2 com a proporção anotada em
aparato. É honesto e some quando a foto real chega.

### Conteúdo

O documento **Voz da Jozzi** é regra global. Antes de escrever qualquer texto
novo, aplicar: afirmação em vez de promessa, especificidade, opinião, voz ativa,
frases curtas, sujeito explícito, poucos adjetivos. Nenhum superlativo, nenhum
jargão de agência, nenhuma pergunta retórica, nenhum ponto de exclamação.

**Teste obrigatório:** troque "Jozzi" pelo nome de um concorrente. Se o texto
continuar funcionando, reescreva.

Quando uma seção precisar de texto que ainda não existe, construa apenas a
estrutura e anote quantos caracteres ela comporta. **Nunca preencher com copy
genérica de agência** — nem provisoriamente.

### Acessibilidade

- Um `h1` (a abertura). O nome de cada seção é o `h2`; as afirmações do Nosso
  Olhar são `h3`. As seções são amarradas por `aria-labelledby`.
- O aparato é `aria-hidden`: é instrumentação, e o conteúdo já carrega a
  informação semanticamente.
- Nada existe só no `hover`. O que aparece ao passar o mouse aparece também por
  toque e por teclado.
- Foco visível em Sinal, com 4px de afastamento. `skip link` para o conteúdo.
- Sem JavaScript o site fica completo: as máscaras são o estado final por
  padrão, e o script só as reverte para animar. Há ainda uma rede de segurança
  que revela tudo em 3,5s se qualquer coisa falhar.
- Alvos de toque com no mínimo 44px. Alturas em `dvh`/`svh`, nunca `vh`.

---

## Componentes previstos

Especificados, **não construídos**. Cada um lista o que precisa de conteúdo
antes de existir.

### 03 — Serviços · construído · **cards**

Cinco cards, os cinco na tela ao mesmo tempo. Substitui o índice tipográfico de
duas zonas, por decisão da Jozzi. Registro do que a troca custou e do que ela
resolveu, porque as duas coisas importam para a próxima decisão:

**O que se perdeu.** O índice era a única composição do site em que o corpo do
nome variava por comprimento de palavra, e era a seção mais densa — a que dava
peso ao meio do documento. Cinco cards de mesma largura são, por definição, uma
grade regular.

**O que se ganhou.** As cinco frentes ficam legíveis de uma vez, sem depender de
descobrir o ponteiro. A descrição de cada uma fica junto do nome dela. E a
segunda fila entra deslocada, o que impede a grade de ler como tabela.

Cada card tem quatro peças, nesta ordem:

| Peça | O que é |
| --- | --- |
| Chapa | campo de imagem 16:9 com o numeral carimbado em `multiply` |
| Painel | as etiquetas, que sobem por cima da chapa |
| Nome | número em aparato + nome em display |
| Texto | a descrição da frente |

**O painel sobrepõe, nunca empurra.** Se as etiquetas abrissem no fluxo, abrir
um card mudaria a altura da fila inteira e os outros quatro saltariam. Sobrepondo,
nada se move fora do próprio card. O gesto é a mesma máscara de baixo para cima
que revela o site inteiro.

**A chapa é isolada (`isolation: isolate`).** O numeral é `mix-blend-mode:
multiply` e, sem isolar, ele mistura com tudo o que está atrás — painel incluído
— e reaparece por cima das etiquetas. Isolado, o multiply acontece dentro da
chapa e o painel cobre o grupo inteiro. O painel também é **opaco**: a 92% a
tinta do carimbo ainda subia. Os dois foram testados quebrados antes de
funcionar.

**As etiquetas precisam de cor própria.** `.serv__plate .ap` pinta o rótulo da
chapa em tinta a 72%, e o painel é filho da chapa — sem a regra
`.serv__painel .ap`, as etiquetas saem marrom sobre marrom, invisíveis.

**Corpo único para os cinco nomes**, ao contrário do índice. Entre cards de
mesma largura, corpo diferente é lido como ranking comercial, não como
composição. Os nomes longos **quebram em duas linhas em corpo cheio** em vez de
encolher, e o rótulo tem duas linhas reservadas — é o que alinha o texto dos
cinco cards. A correção óptica de primeira letra (`--optico`) sobreviveu; o
`--fit` não.

**A escala do nome é própria, e não `--fs-display-2` cru.** Medido: o display--2
vale 41px em 1025 e 44px em 1100, ou seja, dentro da faixa proibida de 24 a 44 —
que é justamente a faixa onde a regra em pixels vale. A clamp usada
(`3.6vw + .6rem`, de 2,2rem a 3,6rem) começa em **46,5px em 1025** e nunca entra
na faixa. Medido em 390, 769, 900, 1025, 1100, 1279, 1280, 1440 e 1920: nenhuma
largura cai na faixa, nenhuma transborda o card, e o menor corpo abaixo de 1025
é 35px contra 16px de texto — 2,2 vezes, acima do mínimo de 1,8.

**A grade muda de três em três larguras**, e o motivo é o mesmo:

| Largura | Cards por fila | Por quê |
| --- | --- | --- |
| até 768 | 1 | fluxo |
| 769 a 1024 | 2 | — |
| 1025 a 1279 | 2 | o aparato come 8,5rem; um terço do que sobra não comporta "Development" em corpo de display sem encolher para a faixa proibida |
| 1280 em diante | 3 + 2 | a segunda fila começa na coluna 3, não na margem |

**Entrada escalonada.** Os cards de uma mesma fila entram juntos pelo
observador; 70ms de atraso por índice devolvem a sequência de leitura. Mesma
máscara, mesma curva, mesma duração — só o atraso é novo.

**Sem JavaScript o card está inteiro na tela, com as etiquetas abertas.** É o
`.js--serv` que as FECHA, nunca o contrário. Se fosse ao contrário, um script
que não sobe esconderia conteúdo — e nada neste site pode depender de
JavaScript para existir.

**Textos aprovados e no ar.** As cinco frentes são cinco formas de recusa. A
ordem — Branding, Social Media, Styling, Tráfego Pago, Web Development — é a da
copy de 25/08.

| Campo | Registro | Estado |
| --- | --- | --- |
| Descrição | Texto | ✓ as cinco |
| Etiquetas | Aparato | ✓ as cinco |
| Imagem | **16:9** | ✗ a fornecer — cinco arquivos |

⚠ **A proporção da imagem de Serviços mudou de 3:4 para 16:9.** Continua dentro
das três permitidas. A chapa antiga era a metade direita da página, sangrando
até a margem; dentro de um card, 3:4 faria cada card ter duas telas de altura.

**Nenhum número no site.** A régua da voz diz que número é a arma mais forte
("quatro marcas por vez" derrota "poucas marcas por vez"), e nenhum foi
confirmado. É o maior ganho disponível quando os dados existirem.

### 04 — Marcas · construído

Blocos esparsos numa diagonal sobre campo aberto. Cada marca é um agrupamento
pequeno — nome, setor, escopo — e a regra de posição é: **cada marca avança três
colunas e uma linha em relação à anterior**, dando a volta a cada três. Coluna
1, 4, 7, 1, 4, 7…

**O corpo em repouso é o mesmo para todas.** Entre clientes, diferença de
escala PERMANENTE não é lida como composição: é lida como declaração sobre a
relação, e um cliente que vê o próprio nome menor que o de outro tem um
problema comercial.

O que existe é diferente: uma variação **momentânea**, presa ao scroll — o
bloco mais perto do meio da tela cresce até 5% e volta assim que passa do
centro (`--escala`, calculado em `moverDiagonal()`, teto de 12px de
deslocamento já existente mais 5% de escala). Não é hierarquia fixa entre as
marcas; é o leitor cruzando o campo. Nenhuma marca "vale mais" — todas passam
pelo mesmo pico, na mesma posição da tela, na sua vez.

Primeira seção desde a abertura **sem nenhuma interação**. Depois da densidade
de Serviços, o silêncio é o ritmo. Não há ticker, hover nem laço: a entrada é a
mesma máscara de sempre, e a diagonal já sequencia a chegada dos blocos pela
posição vertical, sem escalonamento programado.

Confirmadas: **Collab**, **Claudia Choma**, **Widepine Cafés**.
**NORR não é cliente até confirmação.**

**Sem logotipos, por decisão.** Auditoria dos arquivos: Collab tem SVG oficial
(CorelDRAW, com logotipo, assinatura e símbolo separados) e PNG 1080×188;
Claudia Choma tem SVG (viewBox 750×111); **Widepine Cafés só tem PNG** —
1063×132 — e um PDF. Qualidade desigual aparece quando os três estão no mesmo
campo, três logotipos lado a lado são uma parede de logos em miniatura, e o
nome de um cliente composto na tipografia do estúdio diz mais do que um
logotipo emprestado. Nenhum arquivo foi redesenhado, redimensionado ou tratado.

Falta preencher, por marca:

| Campo | Extensão | Estado |
| --- | --- | --- |
| Setor | 15 a 25 caracteres | ✗ a fornecer |
| Escopo | 30 a 60 caracteres | ✗ a fornecer |

Sem ano, por decisão anterior. Não inventar setor, escopo ou qualquer outra
informação. Se as marcas passarem de umas doze, o índice de créditos (marca ·
setor · escopo, em rigor documental) volta a ser a melhor solução — com três,
ele renderizaria como uma tabela de três linhas visivelmente incompleta.

### 05 — Contato · construído

Segunda inversão do site. **A troca de fundo é a transição** — não existe
animação própria desta seção.

O endereço é o maior elemento, quebrado por `<wbr>` onde o navegador precisar.
A legenda dele e o WhatsApp dividem a mesma faixa horizontal, alinhados pelo
topo: as duas portas são uma composição só, não duas colunas e não dois
cartões. A posição do WhatsApp não depende do comprimento do endereço.

Sem formulário, sem backend, sem terceiros. Duas âncoras reais.

**Copiar o endereço:** clicar copia em vez de abrir o cliente de e-mail — mas
só onde o rótulo do cursor avisou antes do clique. No toque não há rótulo,
então o `mailto:` vale como link normal, que é o comportamento certo num
telefone. A confirmação troca no lugar, sem toast e sem modal, e um
`<span role="status">` entrega a mesma informação à tecnologia assistiva.

O corpo do endereço é `--fs-display × .82` — mesma técnica de ajuste óptico do
índice de Serviços que existia ali antes, não um corpo novo na escala.

**Azul:** zero em repouso. Só em hover, foco e confirmação de cópia. Fica bem
abaixo do teto de 3% — e abaixo do que a direção permitiria para esta seção.

Falta preencher:

| Campo | Estado |
| --- | --- |
| E-mail oficial | ✗ **só o domínio está confirmado** — `jozzicreative.com.br`, creditado nos sites dos clientes. A parte antes do `@` está como `a-definir` |
| WhatsApp | ✗ o `href` aponta para `https://wa.me/` **sem número**: nunca disca um número errado. Os três números encontrados nos projetos são dos **clientes**, não da Jozzi |
| Linha de expectativa de resposta | ✗ a fornecer, curta e concreta |
| Horário de atendimento | ✗ se houver |

### 05 — Sobre a Jozzi · construído

Três movimentos, três lógicas de grade — a seção não repete a estrutura de
nenhuma outra.

**1 · A declaração.** O título grande em 1–8, o parágrafo em 7–12 na linha de
baixo. Não alinham nem à esquerda nem à direita: o parágrafo começa no meio da
largura que o título ocupou. É degrau, não coluna.

**2 · A virada.** *"Cada marca é singular."* em corpo de display à esquerda, e
as expertises em 11px à direita, na **mesma faixa horizontal**, alinhadas pela
base. Esse é o ponto de composição da seção: a frase de display não flutua
sozinha num campo vazio — tem contrapeso, e é o contraste de escala entre os
dois blocos, não o tamanho da frase, que segura a página. Foi a resposta direta
ao "minimalista não é muito espaço vazio + texto grande".

**3 · A pessoa.** A seção contrai. Retrato pequeno de propósito — 3 de 12
colunas — e o nome em display--2 em 5–9. Depois de dois movimentos de volume,
o fecho é íntimo, e é ele que prepara a inversão do bordô que vem em seguida.

Abaixo de 1025px os três movimentos empilham e o retrato é limitado a 15rem:
em fluxo, um 3:4 de largura total comeria uma tela inteira sozinho.

| Campo | Registro | Estado |
| --- | --- | --- |
| Título, corpo, "Cada marca é singular." | Display + texto | ✓ copy da Jozzi |
| Nossas expertises | Texto | ✓ copy da Jozzi |
| Letícia Cruz + cargo | Display--2 + aparato | ✓ copy da Jozzi |
| Origem do nome "Jozzi" | Texto | ⚠ escrito por mim — precisa de aprovação |
| Retrato da fundadora | 3:4 | ✗ a fornecer |

### 07 — Onde ficamos · construído

Colofão. **A única seção do site sem tipografia de display** — o maior corpo
aqui é o lede, 21px. É deliberado: 05 é o ponto alto, e uma seção grande depois
dele roubaria o clímax em vez de fechá-lo. Também é a mais curta, 715px contra
836 a 1520 das outras.

Função narrativa: **resolver o aparato.** A trilha diz `CWB` em toda tela desde
a 00 sem nunca se explicar. Aqui a sigla ganha um endereço.

Endereço à esquerda em lede; campo do mapa encostado na margem direita, em 1:1
e não 16:9 — proporção larga é a forma dos widgets de mapa. Os dois alinhados
pela base, com o vão do meio vazio. Os dados do aparato fecham por baixo.

O link do Google Maps é real e monta a busca a partir do endereço confirmado,
sem coordenadas.

**O campo agora é o mapa do Google, por decisão da Jozzi.** A direção anterior
pedia mapa autoral e proibia iframe; foi revertida. Duas consequências que
precisam ficar escritas:

1. **Este iframe é a única requisição externa do site.** Até aqui a página não
   falava com servidor nenhum além do próprio — medido: zero hosts externos até
   o leitor chegar na seção 07. Depois dela entram `google.com`,
   `maps.gstatic.com`, `maps.googleapis.com`, `fonts.googleapis.com` e
   `fonts.gstatic.com`. O Google grava cookie e registra o acesso — relevante
   para LGPD, e qualquer aviso de cookies precisa considerar isto.
2. **`loading="lazy"` é obrigatório.** Sem ele o mapa entra na carga inicial e a
   cortina de carregamento passa a esperar por um servidor de terceiro.

O `<div>` continua sendo o contêiner e o iframe mora dentro dele — mesmo padrão
de `.serv__plate`/`.serv__plate__foto`. Se o Google falhar ou for bloqueado,
sobra o campo bege em vez de um buraco branco.

O mapa chega com a paleta do Google — azul de via, verde de parque. Um
`filter: grayscale(1) sepia(.32) contrast(.92) brightness(1.04)` puxa a
temperatura para o papel da seção. É correção de cor, não estilização: nenhum
traço some, o mapa continua legível e a atribuição do Google continua visível.

Falta preencher:

| Campo | Estado |
| --- | --- |
| Endereço | ✓ Av. João Gualberto, 1342 · Urban Office, sala 1912 · Curitiba |
| Mapa | ✓ embed do Google, montado a partir do endereço |
| Coordenadas | ✗ a confirmar — **não inventar.** Um par aproximado já foi inserido e removido numa rodada anterior |
| Visitas | ✗ se recebe, e como |
| Bairro / CEP / estado | ✗ se quiser no endereço |

---

## O que falta de conteúdo

1. Texto definitivo de *Quem somos*. O que está no ar foi escrito para validar a
   escala e segue o sistema verbal, mas não foi aprovado como final.
2. Aprovação dos quatro textos de sustentação do *Nosso olhar* — as quatro
   afirmações estão aprovadas, o segundo tempo de cada uma ainda não.
3. Imagem real da seção 01, proporção 3:4.
4. Os campos marcados como *a fornecer* nos componentes 03 a 07 — em Serviços
   restam só as cinco imagens.
6. Qualquer número que possa ir ao ar: clientes por vez, projetos por ano,
   prazo de resposta, tempo de existência.
5. Ano de fundação e demais dados institucionais — sem lugar definido ainda; a
   ficha técnica que existia na seção 01 foi removida por repetir o parágrafo
   logo acima dela.

---

## Antes de publicar

O site está com **`<meta name="robots" content="noindex">`**. Isso é
deliberado enquanto for protótipo, e é a única coisa capaz de anular o trabalho
de SEO inteiro se alguém esquecer. Junto dela, quatro itens que dependem de
decisão e por isso não foram inventados:

| | |
| --- | --- |
| `robots` | tirar o `noindex` |
| `canonical` e `og:url` | dependem da URL final |
| `og:image` | depende de uma imagem que ainda não existe |
| `rel="icon"` | **não existe favicon.** Depende de decidir qual marca vai em 16px: o logotipo inteiro é ilegível nesse tamanho, e recortá-lo é decisão de marca |

Já resolvido: `<title>`, `description`, `og:type`, `og:title`,
`og:description`, `og:site_name`, `og:locale`, `lang="pt-BR"`, `theme-color`,
hierarquia de títulos, landmarks e zero recurso externo.

---

## Copy definitiva (25/08) — o que mudou

Rodada de aplicação de texto fornecido pela Jozzi, substituindo grande parte
do conteúdo anterior. Registro do que mudou de estrutura, não só de palavra:

- **Abertura** — `<h1>` virou "We create for you.", em inglês (copy literal,
  não decisão de voz). Lista de frentes reordenada: Branding, Social Media,
  Styling, Tráfego Pago, Web Development. Novo elemento: `.abertura__rolar`,
  uma seta desenhada em duas linhas de 1px (não é ícone de fonte), com
  microinteração só no hover — sem loop, sem `infinite`.
- **Quem somos** — novo título e corpo, ainda no mesmo slot estrutural.
- **Nosso olhar → Nossa visão** — id, `data-nome` e h2 renomeados. Os quatro
  princípios têm texto novo; a estrutura de dois tempos (afirmação + linha de
  sustentação) não mudou.
- **Serviços** — **"Design" saiu, "Styling" entrou**, na terceira posição.
  Ordem final: Branding, Social Media, Styling, Tráfego Pago, Web Development
  (as duas últimas trocaram de lugar). `--fit`/`--optico` recalculados para a
  nova ordem. A estrutura de dois parágrafos (como trabalhamos + posição) virou
  **um parágrafo + uma lista de etiquetas** (`.serv__tags`), acompanhando o
  formato da copy recebida — a frase reservada "Anúncio não conserta marca."
  saiu do ar.
- **Marcas → Projetos que já fizemos** — de blocos curtos (setor + escopo) para
  quatro estudos de caso completos: Collab, Claudia Choma, **Descomplica
  Perícias** (cliente novo, confirmado pela própria Jozzi) e Widepine Cafés.
  `.cliente__dados`/`.cliente__falta` saíram; entrou `.cliente__corpo`
  (parágrafo) e `.marcas__lede` (subtítulo da seção). A diagonal e o teto de
  escala por scroll não mudaram.
- **Sobre a Jozzi — seção 05, no scroll principal.** Primeiro entregue como
  página separada (`sobre.html`); a Jozzi corrigiu o rumo e pediu seção,
  **depois de Projetos**. A página foi apagada e Contato/Onde ficamos
  desceram para 06 e 07. O medo de quebrar o final (05 clímax, 06 coda) não
  se confirmou: entrando ANTES do Contato, a seção não desmancha o fecho —
  atrasa o clímax, o que na verdade ajuda, porque agora o leitor sabe quem é
  a Jozzi antes de receber o endereço.

**Um parágrafo foi escrito por mim, não pela Jozzi:** o texto sobre a origem
do nome "Jozzi" e sua relação com moda, em `.sobre__bio`, porque a copy
fornecida pedia esse texto sem entregá-lo pronto ("mini texto explicando o
termo"). Segue a Voz da Jozzi, mas precisa da aprovação de quem realmente sabe
a origem do nome.

---

## Licenças de tipografia

## Licenças de tipografia

- **Switzer** — ITF Free Font License. Gratuita para uso comercial,
  auto-hospedagem explicitamente permitida. Texto em `assets/fonts/FFL.txt`.
  **A licença proíbe subset e conversão de formato.** O `.woff2` no repositório é
  o arquivo oficial da Fontshare, sem alteração. Não rodar subsetter nele.
- **IBM Plex Mono** — SIL Open Font License 1.1.
# Jozzi
