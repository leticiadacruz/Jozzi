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
     width="1200" height="1600" loading="lazy">
```

3. Trocar a legenda logo abaixo, dentro de `<figcaption>`.

`width` e `height` são obrigatórios: sem eles a página "pula" enquanto a imagem
carrega.

**As três proporções permitidas no site inteiro são 3:4, 16:9 e 1:1.** Recorte
fora dessas três não entra — é o que mantém a página parecendo composta.

Nunca usar stock photo, imagem genérica ou imagem gerada. Se não houver foto
real, o campo marcado continua. Um retângulo honesto é melhor que uma foto
emprestada.

---

## Preencher um serviço

Em `index.html`, dentro do `<li>` do serviço, trocar os dois parágrafos
`serv__falta` pelo texto real:

```html
<div class="serv__txt">
  <p>Como a Jozzi trabalha nessa frente. 120 a 160 caracteres.</p>
  <p class="serv__posicao">A frase de posição sobre a disciplina.</p>
</div>
```

E o campo da imagem:

```html
<img class="serv__plate" src="assets/img/servico-branding.avif"
     alt="Descrição curta" width="1200" height="1600" loading="lazy">
```

O texto responde **"como trabalhamos"**, não "o que entregamos". Essa é a
diferença entre a seção parecer método e parecer catálogo.

A frase de posição de **Tráfego Pago** já está escolhida: *"Anúncio não conserta
marca."* Veio do Nosso Olhar e foi reservada para lá.

**Acrescentar um sexto serviço** exige três coisas: o `<li>` novo, uma linha em
`.serv__item:nth-child(6)` com `--fit` e `--optico`, e uma linha
`.serv__item:nth-child(6) .serv__nome { grid-row: 6 }` — além de mudar o campo e
o texto para `grid-row: 1 / span 7` e `grid-row: 7`. O `--fit` sai do
comprimento da palavra: `(1 + 6 ÷ nº de caracteres) ÷ 2`.

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

## Trocar uma cor

Em `assets/css/style.css`, seção **02. TOKENS**, no topo do arquivo. Todas as
cores do site saem de lá. Não trocar cor em nenhum outro lugar.

O **Sinal** (`#2033C9`) não pode passar de ~3% da superfície da tela. Ele existe
para marcar interação e numeração ativa. Se começar a aparecer em blocos
grandes, a direção se desfaz.

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

## O que NÃO fazer

- **Não rodar subsetter na Switzer.** A licença da ITF proíbe. O arquivo em
  `assets/fonts/Switzer-Variable.woff2` tem que continuar sendo o oficial da
  Fontshare, byte por byte.
- **Não adicionar biblioteca de animação.** Os gestos do sistema são CSS. Uma
  biblioteca traria dezenas de curvas novas e o movimento deixaria de parecer
  da Jozzi.
- **Não criar corpo de letra entre 24 e 44px** no desktop. É a faixa
  deliberadamente vazia da escala — onde vive o subtítulo de todo template.
  Em telas estreitas a regra vira razão: o menor display nunca fica abaixo de
  1,8 vez o corpo do texto.
- **Não criar cartão** — retângulo com preenchimento, canto arredondado e sombra.
  Agrupamento se faz com fio de 1px e espaço.
- **Não criar ícone de serviço.**
- **Não usar número grande decorativo.** A numeração vive no aparato, em 11px.
- **Não fazer o corpo dos nomes de serviço seguir a ordem da lista.** O corpo é
  função do comprimento da palavra. Se o primeiro serviço virar o maior e o
  último o menor, a composição vira ranking comercial.
- **Não repetir "Creative Marketing Lab".** Ele aparece uma vez, no rodapé, como
  dado institucional. Não é assinatura e não é slogan.
- **Não preencher espaço vazio.** O vazio é composição. Se uma seção "parece
  precisar de algo", quase sempre precisa é de menos.
- **Não adicionar seção que repete a estrutura da anterior.**

---

## Estrutura

```
index.html                  as três seções, em português
assets/css/style.css        folha única, com sumário numerado no topo
assets/js/main.js           IIFE, seis seções numeradas
assets/js/lenis.min.js      rolagem interpolada (não editar)
assets/fonts/               Switzer + IBM Plex Mono + licença
assets/svg/                 logotipo Jozzi
assets/img/                 imagens do site
```
