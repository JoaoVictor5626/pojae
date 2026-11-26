# ADR 0007: Trilha de auditoria e preservação do histórico

- **Status:** Proposto
- **Data:** 2026-11-26
- **Requisitos:** [RNF-12](../prd/0001-pojae.md) e os requisitos de segurança do [PRD 0001](../prd/0001-pojae.md)

## Contexto

O PRD exige identificar quem realizou alterações relevantes em vagas, candidaturas, entrevistas, convênios, avaliações e aprovações. Cancelamentos e encerramentos também precisam preservar o histórico do processo, e registros de auditoria devem ser acessíveis somente a pessoas autorizadas.

## Decisão

- Registrar eventos de negócio relevantes como entradas de histórico vinculadas ao registro afetado.
- Cada evento deve identificar o ator, a ação, o recurso, a data e hora e, quando aplicável, os valores anterior e novo e a justificativa.
- Tratar eventos de auditoria como append-only: correções geram novo evento, sem apagar ou sobrescrever o evento original.
- Usar mudanças de situação para cancelar, encerrar ou inativar registros que precisem ser preservados.
- Restringir a consulta da trilha a usuários autorizados e evitar incluir senhas, tokens ou conteúdo desnecessário de documentos e dados pessoais.

## Consequências

- As operações geram mais dados e precisam de regras de retenção, consulta e proteção contra alteração indevida.
- A trilha melhora a investigação de incidentes, mas não substitui cópias de segurança nem os controles de acesso aos registros originais.
- A retenção e os campos de auditoria de cada fluxo precisam ser definidos antes de implementar os respectivos módulos.
