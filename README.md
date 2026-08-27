# Jozzi — site

**Método e Instinto.** Site da JOZZI.

> **Estado:** copy definitiva aplicada (rodada de 25/08). Sete seções (00 a 06)
> mais uma página independente, `sobre.html`. Ainda falta apenas imagem e alguns
> dados de contato — listados no fim deste documento.

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

**JOZZI** é o nome. "Creative Marketing Lab" é descriptor institucional: aparece
uma vez, no rodapé, como dado. Nunca ao lado do logotipo, nunca como assinatura,
nunca como slogan.

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

`papel · papel · VERDE · papel · BEGE · BORDÔ · papel`

Antes eram cinco seções idênticas em papel e duas em verde — a paleta existia
nos tokens e não na tela. **Marcas ganhou o bege** e **Contato ganhou o bordô**.
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
deslocamento. O aparato preenche o trecho já percorrido — a trilha deixa de ser
um fio com um ponto e passa a medir. E os três blocos da diagonal de Marcas se
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

**Não existe animação infinita, parallax de fundo, nem nada que se mova sem uma
ação do leitor ou sem a rolagem.**

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
  ponteiro fino e sem movimento reduzido. Hoje: *Ver* no índice de Serviços,
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

### Aparato

Trilha fixa à esquerda, acima de 1025px: número e nome da seção, fio de posição,
hora em Curitiba. 11px, 40% de tinta. **Instrumentação silenciosa** — se começar
a chamar atenção, está errado.

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

Sem cartão. Sem ícone. Sem elemento adicionado porque "a seção precisava de
algo". **O espaço vazio é parte da composição** — não é sobra a ser preenchida.

Margens reais de cartaz, sem caixa central de 1200px. Todo elemento se ancora em
coluna nomeada; nada está centrado "porque sim".

**Uma exceção deliberada à regra de "sem número grande":** o numeral d'água.
Cada seção carrega o próprio número (`data-num`) em escala de pôster, cortado
pela borda da tela, 6% da cor de texto da própria seção. Não é decoração
solta — é o mesmo dado que o aparato já mostra em 11px, só que a seção o veste
por dentro. É a resposta a uma pergunta concreta: *se alguém remover todo o
texto, a página ainda tem identidade reconhecível?* Antes, não. Implementado
como `<span class="marca-agua" aria-hidden="true">` logo na abertura de cada
`[data-secao]`, que ganhou `position: relative; overflow: clip;` para conter o
sangramento. Sempre `aria-hidden` — decoração pura, fora da árvore de
acessibilidade, e por isso fora também da régua de contraste de texto.

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

### 03 — Serviços · construído

Duas zonas. À esquerda o índice; à direita a metade da página que vira imagem —
sem moldura, sem preenchimento, sangrando até a margem. **A descrição não
acompanha a imagem:** ela mora embaixo do índice. É isso que impede a leitura
`[item] → [cartão]`, que é o que faz um índice virar componente de UI.

Os cinco campos ocupam a **mesma área da grade**, empilhados. A troca não move
nada: só muda qual deles está desmascarado, e o que sai só colapsa depois que o
que entra já cobriu. Verificado: a caixa da imagem e a posição dos cinco nomes
são idênticas em qualquer estado.

**O corpo de cada nome é função do comprimento da palavra**, meio caminho entre
corpo único e larguras iguais (`--fit` no CSS). Design é a terceira da lista e a
maior de todas: a ordem dos corpos não acompanha a numeração, e é isso que
impede a leitura como ranking comercial. Cada nome leva ainda uma correção
óptica de primeira letra (`--optico`) — alinha o glifo, não a caixa.

Sem JavaScript a seção fica em fluxo, com os cinco campos visíveis. A composição
de duas zonas só entra quando o módulo está de pé. Abaixo de 1025px, o item
ativo abre no próprio fluxo e a imagem passa de 3:4 para 1:1 — no fluxo, o 3:4
come uma tela inteira entre dois nomes.

**O número do serviço é carimbado sobre a própria imagem.** `.serv__plate-num`
repete o número que já está no índice (`01`–`05`), grande, com
`mix-blend-mode: multiply`: sobre o bege de hoje ele tinge; sobre a foto de
amanhã ele escurece por cima sem apagar a imagem, como tinta impressa por
cima. É o que faz o campo de imagem parar de ser "um retângulo vazio à espera
de conteúdo" — mesmo antes da foto chegar, a seção já tem uma composição.

**`.serv__plate` é sempre o contêiner, nunca é substituído pelo `<img>`.** O
numeral mora dentro dele; a foto entra como um segundo filho,
`.serv__plate__foto`, absolutamente posicionada para preencher a caixa. Isso é
diferente do padrão usado em `.fig__campo`/`.onde__mapa`, onde o próprio `<img>`
é o elemento sizado. Ver `MANUTENCAO.md` para o trecho exato.

A imagem ativa também ganha um assentamento sutil de escala na entrada — 1,04
para 1,00 — a única transformação de escala real do sistema, e só na imagem;
o texto nunca escala.

**Textos aprovados e no ar.** As cinco frentes são cinco formas de recusa, e o
verbo muda em cada uma: Branding recusa caminhos, Social Media recusa datas,
Design recusa alternativas, Web Development recusa dependência, Tráfego Pago
recusa a própria verba. A tese vem da sustentação do terceiro princípio do
Nosso Olhar — *"recusando quase tudo"*.

Os quatro primeiros "Como trabalhamos" afirmam fatos sobre a operação e foram
**confirmados um a um** antes de entrar. Não são redação: se um deixar de ser
verdade, sai.

| Campo | Registro | Extensão | Estado |
| --- | --- | --- | --- |
| Descrição curta | Texto | 120 a 160 caracteres | ✓ os cinco, 133 a 157 |
| Posição da Jozzi | Texto | uma frase, 60 a 90 caracteres | ✓ as cinco, 61 a 76 |
| Imagem | 3:4 no desktop, 1:1 no fluxo | — | ✗ a fornecer |

O texto responde **"como a Jozzi trabalha nessa frente"**, não "o que a Jozzi
entrega".

**Web Development não afirma característica técnica universal.** "Sem framework"
e "guia de manutenção junto" saíram: a Widepine Cafés é Shopify, e só um dos
dois sites feitos à mão tem guia. O que ficou — controle do código e
documentação — vale sempre; a autonomia do cliente está condicionada por
*"onde faz sentido"*.

**Nenhum número no site.** A régua da voz diz que número é a arma mais forte
("quatro marcas por vez" derrota "poucas marcas por vez"), e nenhum foi
confirmado. É o maior ganho disponível quando os dados existirem.

**Reservado:** o princípio *"Anúncio não conserta marca."* sai do Nosso Olhar e
pertence a **Tráfego Pago**, como posição específica sobre mídia paga.

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
índice de Serviços, não um corpo novo na escala.

**Azul:** zero em repouso. Só em hover, foco e confirmação de cópia. Fica bem
abaixo do teto de 3% — e abaixo do que a direção permitiria para esta seção.

Falta preencher:

| Campo | Estado |
| --- | --- |
| E-mail oficial | ✗ **só o domínio está confirmado** — `jozzicreative.com.br`, creditado nos sites dos clientes. A parte antes do `@` está como `a-definir` |
| WhatsApp | ✗ o `href` aponta para `https://wa.me/` **sem número**: nunca disca um número errado. Os três números encontrados nos projetos são dos **clientes**, não da Jozzi |
| Linha de expectativa de resposta | ✗ a fornecer, curta e concreta |
| Horário de atendimento | ✗ se houver |

### 06 — Onde ficamos · construído

Colofão. **A única seção do site sem tipografia de display** — o maior corpo
aqui é o lede, 21px. É deliberado: 05 é o ponto alto, e uma seção grande depois
dele roubaria o clímax em vez de fechá-lo. Também é a mais curta, 715px contra
836 a 1520 das outras.

Função narrativa: **resolver o aparato.** A trilha diz `CWB` em toda tela desde
a 00 sem nunca se explicar. Aqui a sigla ganha um endereço.

Endereço à esquerda em lede; campo do mapa encostado na margem direita, em 1:1
e não 16:9 — proporção larga é a forma dos widgets de mapa. Os dois alinhados
pela base, com o vão do meio vazio. Os dados do aparato fecham por baixo.

O link do Google Maps é real e monta a busca a partir do endereço confirmado —
sem coordenadas e **sem iframe**, então nenhuma cookie de terceiro é carregada.

Falta preencher:

| Campo | Estado |
| --- | --- |
| Endereço | ✓ Av. João Gualberto, 1342 · Urban Office, sala 1912 · Curitiba |
| Coordenadas | ✗ a confirmar — **não inventar.** Um par aproximado já foi inserido e removido numa rodada anterior |
| Mapa autoral | ✗ depende das coordenadas. Desenhar geometria de rua sem fonte é inventar conteúdo |
| Visitas | ✗ se recebe, e como |
| Bairro / CEP / estado | ✗ se quiser no endereço |

---

## O que falta de conteúdo

1. Texto definitivo de *Quem somos*. O que está no ar foi escrito para validar a
   escala e segue o sistema verbal, mas não foi aprovado como final.
2. Aprovação dos quatro textos de sustentação do *Nosso olhar* — as quatro
   afirmações estão aprovadas, o segundo tempo de cada uma ainda não.
3. Imagem real da seção 01, proporção 3:4.
4. Os campos marcados como *a fornecer* nos componentes 03 a 06 — em Serviços
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
- **`sobre.html`** — página nova, **fora do percurso 00–06** por decisão: o
  pedido veio como "aba/página", e inserir um capítulo 07 depois de Onde
  ficamos quebraria o final construído de propósito (05 clímax, 06 coda
  silenciosa). Mesmo sistema de tokens, sem `main.js` — é conteúdo parado, não
  precisa de coreografia de entrada. Alcançável pelo link no rodapé da home.

**Um parágrafo foi escrito por mim, não pela Jozzi:** o texto sobre a origem
do nome "Jozzi" e sua relação com moda, em `sobre.html`, porque a copy fornecida
pedia esse texto sem entregá-lo pronto ("mini texto explicando o termo").
Segue a Voz da Jozzi, mas precisa da aprovação de quem realmente sabe a
origem do nome.

---

## Licenças de tipografia

## Licenças de tipografia

- **Switzer** — ITF Free Font License. Gratuita para uso comercial,
  auto-hospedagem explicitamente permitida. Texto em `assets/fonts/FFL.txt`.
  **A licença proíbe subset e conversão de formato.** O `.woff2` no repositório é
  o arquivo oficial da Fontshare, sem alteração. Não rodar subsetter nele.
- **IBM Plex Mono** — SIL Open Font License 1.1.
# Jozzi
