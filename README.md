# Jozzi — site

**Método e Instinto.** Site da JOZZI.

> **Estado:** protótipo de direção com as **sete seções construídas**, 00 a 06.
> O que falta é conteúdo real, listado no fim deste documento.

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

| | | |
| --- | --- | --- |
| Papel | `#F0ECE3` | Fundo dominante |
| Tinta | `#16150F` | Texto e fundos invertidos |
| Ardósia | `#6F8290` | Herdada do logotipo. Fios do aparato — é a única cor legível sobre papel **e** sobre tinta |
| Sinal | `#2033C9` | Interação e numeração ativa. **Teto: 3% da superfície** |
| Sinal claro | `#8B95FF` | O mesmo sinal sobre tinta. `#2033C9` sobre fundo invertido dá ~2:1 e é ilegível — não é uma cor nova, é a mesma função adaptada, como o aparato que troca de cor na travessia |

Nenhum gradiente. Nenhuma sombra. Nenhum `border-radius`. Fios de 1px.
Profundidade vem de inversão de fundo, não de sombra.

Nas seções 00 a 02 o Sinal **não aparece**: três seções inteiras sem acento
nenhum. Ele estreia em Serviços, marcando a frente ativa do índice, e volta a
trabalhar no Contato. Um nome em azul por vez fica muito abaixo do teto de 3%.

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

### Movimento

Um gesto, uma curva, três durações.

- **Máscara** — `clip-path` abrindo de baixo para cima, com no máximo 10px de
  deslocamento. É o único jeito de algo aparecer no site.
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

Sem `prefers-reduced-motion`: as máscaras viram estado final imediato, o Lenis
não inicializa, a esteira não existe, o cursor não existe. Nenhum conteúdo
depende de animação.

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

Sem cartão. Sem ícone. Sem número grande decorativo. Sem elemento adicionado
porque "a seção precisava de algo". **O espaço vazio é parte da composição** —
não é sobra a ser preenchida.

Margens reais de cartaz, sem caixa central de 1200px. Todo elemento se ancora em
coluna nomeada; nada está centrado "porque sim".

### Imagem

Três proporções no site inteiro: **3:4, 16:9, 1:1**. Recorte fora dessas três não
entra. Um único tratamento de cor para todas.

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

Falta preencher, por serviço:

| Campo | Registro | Extensão | Estado |
| --- | --- | --- | --- |
| Descrição curta | Texto | 120 a 160 caracteres | ✗ a fornecer |
| Imagem | 3:4 no desktop, 1:1 no fluxo | — | ✗ a fornecer |
| Posição da Jozzi | Texto | uma frase, 60 a 90 caracteres | ✗ a fornecer |

O texto tem que responder **"como a Jozzi trabalha nessa frente"**, não "o que a
Jozzi entrega". Os rótulos dos campos vazios no HTML dizem isso literalmente,
para quem escrever não errar o alvo.

**Reservado:** o princípio *"Anúncio não conserta marca."* sai do Nosso Olhar e
pertence a **Tráfego Pago**, como posição específica sobre mídia paga.

### 04 — Marcas · construído

Blocos esparsos numa diagonal sobre campo aberto. Cada marca é um agrupamento
pequeno — nome, setor, escopo — e a regra de posição é: **cada marca avança três
colunas e uma linha em relação à anterior**, dando a volta a cada três. Coluna
1, 4, 7, 1, 4, 7…

**Todas as marcas no mesmo corpo.** Entre clientes, diferença de escala não é
lida como composição: é lida como declaração sobre a relação, e um cliente que
vê o próprio nome menor que o de outro tem um problema comercial. A variação é
toda de posição.

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
4. Os campos marcados como *a fornecer* nos componentes 03 a 06.
5. Ano de fundação e demais dados institucionais — sem lugar definido ainda; a
   ficha técnica que existia na seção 01 foi removida por repetir o parágrafo
   logo acima dela.

---

## Licenças de tipografia

- **Switzer** — ITF Free Font License. Gratuita para uso comercial,
  auto-hospedagem explicitamente permitida. Texto em `assets/fonts/FFL.txt`.
  **A licença proíbe subset e conversão de formato.** O `.woff2` no repositório é
  o arquivo oficial da Fontshare, sem alteração. Não rodar subsetter nele.
- **IBM Plex Mono** — SIL Open Font License 1.1.
