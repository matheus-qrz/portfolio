# Portfólio — estado da implementação

Site pessoal de Matheus Oliveira. Next 15 (App Router), React 19,
TypeScript, Tailwind v4 e CSS Modules. Deploy na Vercel.

O site deixou de ser um portfólio editorial e virou uma oferta de
freelance: o visitante cai do espaço, passa pela lua e pelas nuvens
enquanto quatro projetos sobem soltos, aterrissa numa cidade à noite e
chega à oferta, à prova, ao formulário e ao sobre.

Público: dono de negócio que quer um site, e empresa que quer sistema
sob medida. Não é recrutador.

## Ordem da página

`nav fixo` → **queda** (hero + 4 projetos) → **sites** → **sistemas** →
**prova** → **orçamento** → **sobre** (com trajetória) → **footer**.

A ordem canônica vive em `SECTIONS`, em `lib/content.ts`. `hero` e
`work` são os dois dentro da queda: `work` é a âncora do primeiro
projeto, não uma seção própria.

O menu tem quatro itens — Sites, Sistemas, Trabalho, Sobre — e o botão
"Pedir orçamento" fica sempre visível, inclusive no celular, onde o menu
some.

## Arquitetura da queda

```
components/fall/
  Fall.tsx          seção alta (720vh) + cena sticky de 100svh; dona do loop
  FallContext.ts    registro de itens e de camadas, sem estado React por frame
  FallItem.tsx      wrapper posicionado; registra-se no contexto
  Atmosphere.tsx    nebulosas, lua, nuvens; carregado depois do load
  Starfield.tsx     canvas de estrelas + luzes da cidade; idem
  Shot.tsx          print desktop (16:10) ou celular (390×844), next/image fill
  sky.ts            paradas de cor do céu e janelas das camadas
  random.ts         gerador determinístico das posições
```

### Modelo de movimento

`P` é o progresso da seção (0 a 1), lido de `useScroll` do Motion com
offset `['start start','end end']`. `D` é a altura da seção menos a da
tela. Para cada item, a partir de `t`, `s`, `x/y`, `xm/ym`, `r`, `rr`,
`sway`, `fade` e `far`:

```
dv        = (t − P) × D / H
dy        = dv × H × s
transform = translate(-50%,-50%)
            translate3d(bx + sin(dv×1.6 + fase)×sway, by + dy, 0)
            rotate(r + dv×rr) scale(far ? .78 : 1)
opacidade = 1 − clamp((|dy| − .22H) / .32H, 0, 1)   // ×.82 se far
```

`visibility: hidden` quando `|dy| > 1.6H`.

Todos os parâmetros são dados, em `FALL` e `FALL_HERO` (`lib/content.ts`).
Ajustar a composição não pede mudança de componente nenhum.

### Regras de performance (não negociáveis)

- **Um `requestAnimationFrame` para a página inteira**, dentro do `Fall`.
  Nenhum `setState` por quadro: o loop escreve `style.transform`,
  `style.opacity` e `style.visibility` direto nas refs registradas. Só
  transform e opacity animam.
- A atmosfera e o canvas **não abrem loop próprio**: registram-se em
  `FallContext.registerLayer` e recebem o quadro já calculado.
- Medidas (`H`, `W`, `D`, celular) só em `resize`, por `ResizeObserver`
  na seção e na cena.
- O loop pausa quando a seção sai da tela (`IntersectionObserver`) e
  quando `document.hidden`.
- `Atmosphere` e `Starfield` entram por `next/dynamic` com `ssr: false`,
  montados depois do `load` num momento ocioso (`requestIdleCallback`,
  com `setTimeout(…, 250)` de reserva). Entram por opacidade.
- Celular (<900px): 160 estrelas e 160 luzes em vez de 380/340, sete
  nuvens em vez de doze, nenhuma nuvem na frente do conteúdo, DPR do
  canvas limitado a 1,5 (desktop, 2).
- `prefers-reduced-motion`: sem loop, sem atmosfera, sem canvas. A cena
  vira coluna estática e tudo continua legível e clicável. É o
  `data-fall="live"`, ligado só depois da montagem, que tira os itens do
  fluxo — então a mesma coluna é também o que fica de pé sem JavaScript.

### Âncoras

O alvo de "Trabalho" está dentro de uma cena sticky e transformada:
`scrollIntoView` miraria onde o elemento foi desenhado, não onde a
rolagem precisa parar. O `Fall` registra em `SmoothScroll` a posição
real, `topo + t × D`. Na coluna estática o elemento está onde parece
estar, e o registro nem existe. Âncoras fora da queda rolam normalmente,
com folga de 40px.

## Marca

Uma família só: **Archivo** com eixo de largura. Display larga
(`wdth 118–125`, `wght 800–850`), linha de contraste estreita
(`wdth 64`, `wght 300`), texto em `wdth 100`. `--font-sans` aponta para
ela, com o fallback dentro do `var()`.

| token | valor | uso |
| --- | --- | --- |
| `--noite` | `#090C14` | fundo do site |
| `--papel` | `#EFE9DD` | texto sobre a noite (16:1) |
| `--brasa` | `#F0703F` | acento sobre a noite (6,6:1) |
| `--brasa-esc` | `#A63D22` | acento sobre fundo claro (5,2:1) |
| `--ceu` | `#16264A` | só na atmosfera |
| `--nevoa` | `#9A958C` | texto secundário sobre a noite |
| `--grafite` | `#625E58` | texto secundário sobre fundo claro |

O site é escuro sempre: nada reage a `prefers-color-scheme`. A brasa
marca **uma coisa por tela** — um botão, um preço ou uma palavra — e
nunca aparece como decoração solta. Nenhuma seção usa card fechado: o
que separa uma coluna da outra é um fio.

## Prints

Convenção: `public/shots/<projeto>-<tela>-<largura>.png`, por exemplo
`tableflow-home-1440.png`, `meirendeu-chat-390.png`. Cada print declara
`file`, `kind` (`desk` | `phone`), os parâmetros de movimento e o `alt`
por idioma, dentro de `FALL`.

`Shot` usa `next/image` com `fill` e `object-position: top left`, dentro
de uma caixa com `aspect-ratio` — 16/10 no desktop, 390/844 no celular.
É a caixa que impede a cena de saltar enquanto o arquivo não chegou.

**Print sem a flag `shot` não entra na cena**, e não fica caixa vazia no
lugar dele. Detalhes em `public/shots/README.md`.

## Oferta

- **Sites**: preço por idioma — PT "A partir de R$ 800", EN "Starting
  at US$500". Não existe plano nem mensalidade obrigatória; manutenção
  mensal é opcional. A moeda segue o idioma; se um dia precisar seguir o
  país, o header `x-vercel-ip-country` já chega na requisição (há um
  comentário no ponto exato, em `components/Sites.tsx`).
- **Sistemas**: sem preço. Escopo por escrito antes do código.

## Formulário

`components/Contact.tsx` → `POST /api/orcamento` → Resend.

Campos: `kind` (`site` | `sistema` | `indefinido`, padrão `indefinido`),
`name`, `company`, `email`, `phone` (WhatsApp, opcional), `need`, e o
honeypot `website`. O schema é um só, compartilhado entre cliente e
servidor (`lib/quote.ts`); o cliente é conveniência, a rota nunca confia
no que chega.

O `kind` chega pré-marcado: as duas portas do hero e os CTAs de seção
escrevem em `QuoteKindContext` antes de rolar.

Variáveis de ambiente:

| variável | efeito |
| --- | --- |
| `RESEND_API_KEY` | sem ela a rota responde 500 e o formulário mostra o estado de erro |
| `QUOTE_TO_EMAIL` | destino; padrão `mthsqrz97@gmail.com` |
| `QUOTE_FROM_EMAIL` | remetente; padrão `onboarding@resend.dev` |
| `NEXT_PUBLIC_WHATSAPP` | só dígitos, com DDI. Sem ela o botão fixo e o atalho do contato não renderizam |

`NEXT_PUBLIC_WHATSAPP` é embutida no bundle em tempo de **build**:
mudá-la exige um build novo, não basta reiniciar o servidor.

## Idioma

`LocaleProvider` (`lib/i18n.tsx`) guarda a preferência em `localStorage`
(`mo-lang`). Sem valor salvo, o idioma inicial segue `navigator.language`
(começa com `pt` → PT, senão EN), sempre depois da hidratação — o
primeiro render continua `pt` nos dois lados. Título e descrição da aba
acompanham a troca.

Todo texto vive em `Content`, nos dois idiomas.

## O que foi removido

Componentes: `PrintDemo`, `Showcase`, `Rails`, `Projects`, `Nav`,
`Hero`, `Experience`, `Scramble`, `Wordmark`, e os CSS Modules
correspondentes.

Dados: `RECEIPT_LINES`, `BYTES`, `OWN_PRODUCTS`, `SHOWCASE`,
`sectionIndex()`, `navLabel`, `hero.meta/kicker/domains/rail`,
`showcase`, `print`, e a entrada `copa` de `PROJECTS` e de todos os
dicionários (Copa AI saiu do site inteiro).

Também saíram: o `.grain` do layout, as fontes Fraunces, Inter, Martian
Mono e IBM Plex Mono, o hook `useScrollState`, e o GSAP com o
ScrollTrigger — a revelação por rolagem virou um `IntersectionObserver`
que acrescenta uma classe, com o resto em transição de CSS.

`components/ui/magnetic-dock.tsx` e `lib/utils.ts` continuam no
repositório e nenhum componente os importa. Ficaram porque vieram do
shadcn, não da página antiga.

## Armadilhas já pagas

- `"use client"` tem que ser a primeira instrução do arquivo.
- Imagem trocada em `public/` não aparece sem `rm -rf .next/cache/images`.
- O retrato é `public/matheus.jpeg`, **não** `.jpg`.
- O Motion está no `package.json` como `framer-motion` (v13), então a
  importação é `from "framer-motion"`, não `motion/react`.
- O fallback de fonte vai **dentro** do `var()`: sem ele, uma variável
  ausente invalida a declaração `font-family` inteira.
- `NEXT_PUBLIC_*` é embutida no build, não lida em tempo de execução.

## Desempenho

Lighthouse mobile, build de produção, navegador em pt-BR, três execuções:

| métrica | valor | meta |
| --- | --- | --- |
| Performance | 97 | ≥ 90 |
| Acessibilidade | 100 | — |
| Boas práticas | 100 | — |
| SEO | 100 | — |
| FCP | 0,91s | — |
| **LCP** | **2,56s** | ≤ 2,5s |
| CLS | 0 | ≤ 0,05 |
| TBT | 26–79ms | — |
| Speed Index | 1,4s | — |

O LCP fica ~60ms acima do teto. Sem a simulação do Lighthouse, e com o
processador a 1/4 da velocidade, ele é **224ms**: o parágrafo do hero
pinta uma vez só, no lugar definitivo. O que a simulação cobra é a
cadeia de 4G lento até a fonte.

Duas alavancas continuam disponíveis, se o número simulado precisar
mesmo entrar debaixo de 2,5s:

1. Sair do `useScroll` do Motion e calcular `P` a partir do
   `getBoundingClientRect` da seção. Tira o Motion inteiro do bundle
   (~30 kB), mas contraria a decisão de arquitetura da queda.
2. Inline do CSS crítico. Foi testado (`experimental.optimizeCss` com o
   `critters`) e não moveu o número; a dependência é depreciada e saiu.

## Pendências

- Os protótipos normativos (`queda-v5.html`, `marca.html`) nunca foram
  versionados. Textos PT/EN, parâmetros de movimento de cada print,
  paradas do `skyAt()` e os valores exatos de `wdth`/`wght` foram
  escritos a partir do briefing, não copiados do protótipo. Ver
  `claude/referencia/README.md` para onde mexer quando eles chegarem.
- Faltam os prints de Lívia Lacerda, LITH1UM, do cardápio e do painel do
  Tableflow e da conversa do MEI Rendeu. As entradas já estão em `FALL`,
  sem a flag `shot`.
- `TESTIMONIALS` está vazio. A seção de prova começa direto em "Outros
  projetos" até haver depoimento real.
- Envio do formulário com `RESEND_API_KEY` de verdade ainda não foi
  testado; só o caminho de erro, sem chave.
