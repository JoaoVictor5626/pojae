# ADR 0003: Conteúdo das oportunidades em texto puro

- **Status:** Aceito
- **Data:** 2026-11-04

## Contexto

O conteúdo de uma oportunidade pode ser guardado como texto puro, Markdown ou HTML. Markdown e HTML permitem mais formatação, mas exigem dependências adicionais e sanitização para evitar XSS.

## Decisão

O conteúdo é guardado como texto puro e exibido em templates HTML com escaping automático, preservando as quebras de linha na apresentação. Conteúdo HTML não confiável não é renderizado sem sanitização.

## Consequências

- Não há novas dependências, e o risco de XSS pelo conteúdo fica coberto pelo escaping automático.
- As oportunidades não têm títulos internos, links clicáveis, imagens nem outras formatações.
- Adotar Markdown no futuro exigirá uma nova ADR, com renderização e sanitização, mas não exigirá migrar os textos já gravados.