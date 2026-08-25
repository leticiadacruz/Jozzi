# Jozzi — site

**Método e Instinto.** Site da Jozzi Creative Marketing Lab.

> Este repositório contém o **protótipo de direção**: apenas as seções
> 00 (Abertura) e 01 (Quem somos). As seções 02–06 ainda não foram
> construídas — a linguagem precisa ser validada em tela antes.

---

## Como rodar

Não há build. Qualquer servidor estático serve:

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000`. Abrir o `index.html` direto pelo Finder
também funciona, mas as fontes não carregam por `file://`.

---

## Tecnologias

| Camada | O que é usado |
| --- | --- |
| Marcação | HTML5 semântico, página única com âncoras reais |
| Estilo | CSS autoral — Grid, custom properties, `clamp()`, `clip-path` |
| Comportamento | JavaScript nativo, sem transpilação (`IntersectionObserver`, `requestAnimationFrame`) |
| Rolagem | [Lenis 1.1.18](https://lenis.darkroom.engineering/), auto-hospedado |
| Tipografia | Switzer Variable (Fontshare/ITF) + IBM Plex Mono (OFL), auto-hospedadas |

**Sem framework, sem bundler, sem biblioteca de animação.** Os três gestos
de movimento do sistema são resolvidos por `clip-path` + uma transição CSS.

Peso das fontes: 63 KB no total (Switzer variável 43 KB + Plex Mono 2 × 10 KB).

---

## Direção

A direção completa está no documento de aprovação. Em resumo, três regras
governam tudo:

1. **Escala dupla, meio ausente.** Só existem dois registros: display
   (96–176px) e aparato (11px mono). Nada entre 24 e 44px — é onde vive
   todo template. Se um subtítulo de 20px aparecer no CSS, algo saiu do
   sistema.
2. **O aparato é permanente e silencioso.** A trilha à esquerda mostra
   seção, posição e hora em Curitiba, em 11px a 40% de tinta. Instrumentação,
   nunca protagonista.
3. **Inversão como pontuação.** O site alterna papel e tinta para marcar
   capítulos. As seções 00 e 01 são ambas papel; a primeira inversão
   acontece na 02.

### Paleta

| | | |
| --- | --- | --- |
| Papel | `#F0ECE3` | Fundo dominante |
| Tinta | `#16150F` | Texto e fundos invertidos |
| Ardósia | `#6F8290` | Herdada do logotipo |
| Sinal | `#2033C9` | Só em interação e numeração ativa. Teto: 3% da superfície |

### Movimento

Um gesto (máscara de baixo para cima), 10px de deslocamento máximo, uma
curva (`cubic-bezier(.16, 1, .3, 1)`), três durações (200 / 600 / 900ms).

O elemento vivo da abertura é a **esteira de peso**: o eixo variável da
Switzer sobe onde a leitura está e desce atrás dela. A largura de cada
palavra é travada na medida do peso base para que a variação não empurre
a linha.

---

## O que ainda falta

- Texto definitivo de *Quem somos* — o que está no ar é provisório,
  escrito para validar a escala.
- Imagem real da seção 01 (proporção 3:4). Hoje há um campo marcado.
- Seções 02 a 06.
- Ano de fundação e demais dados da ficha técnica.

---

## Licenças de tipografia

- **Switzer** — ITF Free Font License, gratuita para uso comercial,
  auto-hospedagem permitida. `assets/fonts/FFL.txt`.
  **A licença proíbe subset e conversão de formato**: o `.woff2` no
  repositório é o arquivo oficial da Fontshare, sem qualquer alteração.
  Não rode subsetter nele.
- **IBM Plex Mono** — SIL Open Font License 1.1.
