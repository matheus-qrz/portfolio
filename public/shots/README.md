# Prints do carrossel

Para um produto aparecer com imagem no carrossel da home:

1. Solte o arquivo aqui como `<id>.png`, onde `<id>` é o mesmo usado em
   `lib/content.ts` — hoje: `tableflow`, `meirendeu`, `servin`, `tijolo`, `copa`.
2. Em `lib/content.ts`, no objeto `PROJECTS` daquele produto, acrescente `shot: true`.

Só isso. O caminho é por convenção e nenhum componente precisa ser tocado.

## Padrão da captura
- Desktop **1440 × 900**, DPR 2 (o arquivo sai em 2880 × 1800)
- Sem moldura de navegador, zoom 100%, cursor fora do quadro
- Nenhuma lista em estado vazio, nenhum dado de teste visível

A caixa do carrossel é **16:10** — a mesma proporção de 1440 × 900, então um
print nesse padrão entra inteiro. Proporções diferentes são cortadas a partir
do canto superior esquerdo, que é onde costuma estar o que importa.
