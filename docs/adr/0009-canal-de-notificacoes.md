# ADR 0009: Notificações no sistema e entrega complementar

- **Status:** Proposto
- **Data:** 2026-11-26
- **Requisitos:** [RF-12 e RF-19](../prd/0001-pojae.md), [RNF-10](../prd/0001-pojae.md), [RS07](../prd/0001-pojae.md)

## Contexto

O POJAE precisa notificar usuários sobre vagas, recomendações, entrevistas e prazos. O PRD exige registrar o envio e seu resultado, proteger os destinatários e indicar a ação necessária, mas ainda não define o canal de entrega.

## Decisão

- Manter uma notificação persistida no sistema como registro principal, associada ao destinatário autenticado e ao evento que a originou.
- Permitir canais externos, como e-mail, como entrega complementar configurável; esses canais não devem substituir o registro no sistema.
- Incluir nas mensagens externas somente o necessário para identificar o assunto e direcionar o usuário a consultar os detalhes após autenticação.
- Registrar estado de envio e resultado por canal, sem expor notificações de outros usuários.

## Consequências

- O sistema precisa manter notificações e estados de entrega, e um canal externo adiciona dependência de configuração e disponibilidade.
- O usuário pode consultar o aviso no sistema mesmo se a entrega complementar falhar.
- O canal externo, os prazos de retenção e a política de tentativas precisam ser definidos antes da implementação do envio.
