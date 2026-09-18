# Prints da queda

A queda mostra prints reais dos projetos, soltos no ar. Acrescentar um
não exige tocar em componente nenhum: são dois passos.

## 1. Soltar o arquivo aqui

O nome segue a convenção `<projeto>-<tela>-<largura>.png`:

| parte      | o que é                                        | exemplos                     |
| ---------- | ---------------------------------------------- | ---------------------------- |
| `projeto`  | o `id` do projeto em `FALL`, em `lib/content.ts` | `tableflow`, `livia`, `lith1um`, `meirendeu` |
| `tela`     | que tela do projeto é                          | `home`, `kds`, `cardapio`, `erp`, `chat`, `servicos` |
| `largura`  | a largura em que a captura foi tirada          | `1440` para desktop, `390` para celular |

Exemplos: `public/shots/tableflow-home-1440.png`,
`public/shots/meirendeu-chat-390.png`.

## 2. Ligar a flag

Em `lib/content.ts`, no print correspondente dentro de `FALL`,
acrescentar `shot: true`:

```ts
{
  file: "lith1um-erp-1440.png",
  kind: "desk",
  shot: true,
  t: 0.555,
  // …
}
```

Sem a flag o print **não entra na cena** — e não entra caixa vazia no
lugar dele. É o estado correto enquanto a captura não existe.

## Formato

`kind` decide a caixa, e a caixa tem proporção declarada antes de a
imagem chegar — é ela que impede a cena de saltar quando o print carrega:

| `kind`  | proporção | capturar em |
| ------- | --------- | ----------- |
| `desk`  | 16:10     | 1440×900    |
| `phone` | 390:844   | 390×844     |

Outras proporções são **cortadas a partir do canto superior esquerdo**
(`object-fit: cover` com `object-position: top left`), então o que
importa preservar tem que estar em cima e à esquerda. Uma captura mais
alta que a caixa perde o rodapé.

## O que já está aqui

| arquivo | onde aparece |
| --- | --- |
| `tableflow-home-1440.png` | queda, projeto Tableflow |
| `meirendeu-home-1440.png` | queda, projeto MEI Rendeu |
| `servin-home-1440.png` | nenhum lugar — Servin está em "Outros projetos", que é lista de texto |
| `tijolo-home-1440.png` | idem, Vale o Tijolo |

Os dois últimos ficam guardados na convenção nova caso "Outros projetos"
um dia ganhe imagem. Hoje nenhum componente os referencia.

## Texto alternativo

Cada print carrega o próprio `alt` nos dois idiomas, ali mesmo em `FALL`.
Descreva a tela, não o arquivo: "Página inicial do Tableflow", não
"captura de tela".

## Depois de trocar um arquivo

O Next guarda as imagens otimizadas em cache. Trocar o arquivo sem
limpar o cache não muda nada na tela:

```
rm -rf .next/cache/images
```
