# Capturas do carrossel

Acrescentar um print ao carrossel da home não exige tocar em componente
nenhum. São dois passos.

## 1. Soltar o arquivo aqui

O nome do arquivo é o **id do produto**, em `.png`:

| id          | produto        |
| ----------- | -------------- |
| `tableflow` | Tableflow      |
| `meirendeu` | MEI Rendeu     |
| `servin`    | Servin         |
| `tijolo`    | Vale o Tijolo? |

Ou seja: `public/shots/tableflow.png`, `public/shots/servin.png`, e assim
por diante.

## 2. Ligar a flag

Em `lib/content.ts`, no item de `PROJECTS` daquele produto, acrescentar
`shot: true`:

```ts
{
  id: "servin",
  tags: ["Next.js", "Node.js", "MongoDB", "AWS"],
  live: false,
  shot: true,
},
```

Sem a flag o slide fica tipográfico — que é o estado correto enquanto a
captura não existe. Com a flag e sem o arquivo, a imagem quebra.

## Formato

A caixa do carrossel é **16:10**, igual ao padrão de captura de
**1440×900** do roadmap. Um print nesse formato entra inteiro.

Outras proporções são **cortadas a partir do canto superior esquerdo**
(`object-fit: cover`), então o que importa preservar tem que estar em
cima e à esquerda. Uma captura mais alta que 16:10 perde o rodapé.

A caixa tem altura fixa em qualquer caso: é ela que impede a página e os
controles do carrossel de pularem entre um slide com imagem e um sem.

## Depois de trocar um arquivo

Next.js guarda as imagens otimizadas em cache. Trocar o arquivo sem
limpar o cache não muda nada na tela:

```
rm -rf .next/cache/images
```
