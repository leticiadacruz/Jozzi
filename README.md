# Jozzi — site

**Método e Instinto.** Site da JOZZI.

> **Estado:** protótipo de direção. Seções **00 Abertura**, **01 Quem somos** e
> **02 Nosso olhar** construídas. As seções 03 a 06 estão especificadas neste
> documento mas **não foram implementadas** — a decisão é validar o núcleo da
> identidade digital antes de avançar.

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

Nenhum gradiente. Nenhuma sombra. Nenhum `border-radius`. Fios de 1px.
Profundidade vem de inversão de fundo, não de sombra.

Nas seções 00 a 02 o Sinal **não aparece**. Ele começa a trabalhar no Contato.
Isso é disciplina, não esquecimento.

### Tipografia

Dois registros, e nada entre eles.

| Registro | Corpo | Família |
| --- | --- | --- |
| Display | 96–176px | Switzer 500 |
| Display 2 | 48–72px | Switzer 500 (460 sobre tinta) |
| Lede | 20–22px | Switzer 400 |
| Texto | 16–17px | Switzer 400 |
| Aparato | 11px versal, `+.145em` | IBM Plex Mono 400 |

**A faixa de 24 a 44px não existe.** É onde vive o subtítulo de todo template.
Se um texto parece precisar dela, ele pertence ao registro de texto ou ao de
display — não a um terceiro inventado no meio.

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

Sem `prefers-reduced-motion`: as máscaras viram estado final imediato, o Lenis
não inicializa, a esteira não existe. Nenhum conteúdo depende de animação.

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

### 03 — Serviços · índice tipográfico + revelação

Cinco linhas em display 2, em escalas ligeiramente diferentes, com campo de
revelação em posição assimétrica fixa. No mobile, expansão no lugar — acordeão
na linguagem editorial, sem cartão.

Por serviço, o componente comporta:

| Campo | Registro | Extensão | Estado |
| --- | --- | --- | --- |
| Nome | Display 2 | dado | ✓ Branding, Social Media, Design, Web Development, Tráfego Pago |
| Número | Aparato | dado | ✓ 01–05 |
| Descrição curta | Texto | ~120–160 caracteres | ✗ a fornecer |
| Imagem | 3:4 ou 1:1 | — | ✗ a fornecer |
| Posição da Jozzi | Lede | ~60–90 caracteres, uma frase | ✗ opcional, a fornecer |

**Reservado:** o princípio *"Anúncio não conserta marca."* sai do Nosso Olhar e
pertence a **Tráfego Pago**, como posição específica sobre mídia paga.

### 04 — Marcas · ticker na entrada, índice editorial no corpo

Composição tipográfica em torno dos nomes reais. Informação adicional aparece na
interação. **Sem ano.** Estrutura preparada para receber novas marcas sem
redesenho — um item por marca, campos em atributos.

Confirmadas: **Collab**, **Claudia Choma**, **Widepine Cafés**.
**NORR não é cliente até confirmação.**

| Campo | Extensão | Estado |
| --- | --- | --- |
| Nome | dado | ✓ três marcas |
| Setor | ~15–25 caracteres | ✗ a fornecer |
| Escopo | ~30–60 caracteres | ✗ a fornecer |

Não inventar setor, escopo, ano ou qualquer outra informação.

### 05 — Contato · o clímax

Fundo invertido. O e-mail é o elemento de maior escala do site — ocupa o lugar
do título. WhatsApp e e-mail são as duas ações. **Sem formulário agora**; a
estrutura fica preparada para receber um depois, curto e secundário.

| Campo | Extensão | Estado |
| --- | --- | --- |
| E-mail oficial | dado | ✗ a fornecer |
| WhatsApp | dado | ✗ a fornecer |
| Linha de expectativa | ~40–60 caracteres | ✗ a fornecer |

### 06 — Onde ficamos · mapa autoral

Endereço como bloco tipográfico; mapa desenhado em SVG na paleta, ocupando parte
da composição e não o fundo dela. Link para abrir no Google Maps. **Sem iframe
permanente na página.**

Endereço: Av. João Gualberto, 1342 · Urban Office · Sala 1912 · Curitiba, PR.

O mapa será construído a partir do endereço real. **Não inventar coordenadas** e
não usar mapa genérico como placeholder final.

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
