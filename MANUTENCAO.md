# Manutenção

Guia para quem edita o site — não é preciso saber programar.

---

## Trocar um texto

Abrir `index.html` e procurar o texto. Está tudo lá, em português, sem
código no meio. Trocar e salvar.

**Cuidado com a frase da abertura.** Ela é quebrada em palavras pelo
JavaScript para a esteira de peso funcionar. Pode trocar o texto à
vontade — o script refaz a quebra sozinho. Só evite frases muito longas:
a 118px, cada linha comporta cerca de 20 caracteres. Três linhas é o
limite antes de a composição perder o vazio de cima.

---

## Trocar a imagem da seção 01

1. Colocar o arquivo em `assets/img/`, na proporção **3:4**.
   Formato: `.avif` de preferência, `.webp` como alternativa.
2. Em `index.html`, procurar por `fig__campo` e trocar o bloco por:

```html
<img class="fig__campo" src="assets/img/nome-do-arquivo.avif"
     alt="Descrição curta do que a foto mostra"
     width="1200" height="1600" loading="lazy">
```

3. Trocar a legenda logo abaixo, dentro de `<figcaption>`.

`width` e `height` são obrigatórios: sem eles a página "pula" enquanto a
imagem carrega.

**As três proporções permitidas no site inteiro são 3:4, 16:9 e 1:1.**
Recorte fora dessas três não entra — é o que mantém a página parecendo
composta.

---

## Trocar uma cor

Em `assets/css/style.css`, seção **02. TOKENS**, no topo do arquivo.
Todas as cores do site saem de lá. Não trocar cor em outro lugar.

Uma regra importante: o **Sinal** (`#2033C9`) não deve passar de ~3% da
superfície da tela. Ele existe para marcar interação e numeração ativa.
Se começar a aparecer em blocos grandes, a direção se desfaz.

---

## Depois de editar o CSS

Trocar o número no final desta linha do `index.html`:

```html
<link rel="stylesheet" href="assets/css/style.css?v=4">
```

`?v=4` vira `?v=5`. Isso força o navegador de quem já visitou o site a
baixar a folha nova em vez de usar a antiga guardada.

---

## O que NÃO fazer

- **Não rodar subsetter na Switzer.** A licença proíbe. O arquivo em
  `assets/fonts/Switzer-Variable.woff2` tem que continuar sendo o oficial
  da Fontshare, byte por byte.
- **Não adicionar biblioteca de animação.** Os três gestos do sistema são
  CSS. Uma biblioteca traria dezenas de curvas novas e o movimento
  deixaria de parecer da Jozzi.
- **Não criar tamanho de letra entre 24 e 44px.** É a faixa deliberadamente
  vazia da escala. Se um texto parece precisar dela, ele provavelmente
  pertence ao registro de texto (17px) ou ao de display (48px+).
- **Não criar cartão** — retângulo com preenchimento, canto arredondado e
  sombra. Agrupamento se faz com fio de 1px e espaço.

---

## Estrutura

```
index.html                  as duas seções, em português
assets/css/style.css        folha única, com sumário numerado no topo
assets/js/main.js           IIFE, seis seções numeradas
assets/js/lenis.min.js      rolagem interpolada (não editar)
assets/fonts/               Switzer + IBM Plex Mono + licença
assets/svg/                 logotipo Jozzi
assets/img/                 imagens do site
```
