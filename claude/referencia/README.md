# Referência visual

Este diretório guarda os protótipos normativos do redesenho:

- `queda-v5.html` — protótipo da página inteira (layout, textos PT/EN, cores,
  tipografia, parâmetros de movimento, ordem das seções).
- `marca.html` — prancha da marca (cores, tipografia, monograma, regras).

**Os dois arquivos ainda não foram versionados.** A implementação atual foi
escrita a partir do briefing textual: tokens, ordem da página, arquitetura da
queda, modelo de movimento, preços e comportamento do formulário vieram todos
de lá e estão corretos. O que foi escrito sem o protótipo à vista, e portanto
é o que precisa ser conferido quando os arquivos chegarem:

| O quê | Onde mexer |
| --- | --- |
| Textos PT/EN de todas as seções novas | `lib/content.ts` |
| Parâmetros de movimento de cada print (`t`, `s`, `x`, `y`, `xm`, `ym`, `r`, `rr`, `sway`, `far`) | `FALL` em `lib/content.ts` |
| Paradas de cor do céu (`skyAt`) | `SKY_STOPS` em `components/fall/sky.ts` |
| Valores exatos de `wdth`/`wght` da tipografia | `app/globals.css` |

Tudo isso está isolado em dados: trocar os valores não pede mudança de
componente nenhum.
