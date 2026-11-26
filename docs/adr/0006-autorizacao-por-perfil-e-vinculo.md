# ADR 0006: Autorização por perfil e vínculo com o recurso

- **Status:** Proposto
- **Data:** 2026-11-26
- **Requisitos:** [RF-24](../prd/0001-pojae.md), [RNF-04 e RNF-05](../prd/0001-pojae.md), [RS01 a RS11](../prd/0001-pojae.md)

## Contexto

Autenticação confirma a identidade da conta, mas não garante que ela possa acessar uma vaga, candidatura, documento, convênio ou aprovação. Os identificadores enviados pelo navegador podem ser alterados ou conhecidos por terceiros. O POJAE precisa aplicar regras diferentes para estagiários, empresas e instituições de ensino.

## Decisão

- Negar por padrão qualquer operação protegida sem sessão válida e perfil compatível.
- Obter o identificador do usuário e o perfil da sessão no servidor; nunca aceitar esses valores como autoridade quando vierem do corpo ou da URL da requisição.
- Verificar no service o vínculo do usuário com o recurso em cada operação, incluindo consultas, alterações, aprovações, cancelamentos e downloads.
- Filtrar as consultas pelo proprietário ou vínculo autorizado, sem carregar dados de outros perfis para depois ocultá-los na interface.
- Retornar somente os campos necessários à operação por meio de DTOs.

## Consequências

- Cada fluxo protegido precisa de verificações específicas para o perfil e o vínculo da conta.
- Testes precisam cobrir visitante, usuário autorizado e usuário de outro perfil ou proprietário.
- A interface pode ocultar ações indisponíveis para facilitar o uso, mas essa apresentação não substitui a autorização do servidor.
