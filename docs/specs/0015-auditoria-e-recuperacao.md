# Spec 0015: Auditoria, retenção e recuperação de dados

- **Status:** Proposto
- **Requisitos:** RNF-08, RNF-12, RNF-13, requisitos de segurança RS01 a RS11 e RS012 do [PRD 0001](../prd/0001-pojae.md)
- **Decisões:** [ADR 0007](../adr/0007-trilha-de-auditoria-e-historico.md), [ADR 0010](../adr/0010-backup-e-recuperacao-de-dados.md)
- **Depende de:** [Spec 0001](0001-fundacao.md), [Spec 0002](0002-autenticacao.md), [Spec 0006](0006-candidaturas.md), [Spec 0007](0007-painel-empresa.md), [Spec 0008](0008-cadastros-e-perfis.md), [Spec 0009](0009-vagas-salvas-e-recomendacoes.md), [Spec 0010](0010-convenios-e-validacao-do-estagio.md), [Spec 0011](0011-notificacoes.md), [Spec 0012](0012-entrevistas.md), [Spec 0013](0013-avaliacao-do-estagio.md), [Spec 0014](0014-recuperacao-de-acesso.md)

## Trilha de auditoria

Registrar evento imutável para alterações relevantes em cadastros protegidos, vagas, candidaturas, documentos, convênios, entrevistas, validações, planos, aprovações e avaliações. Cada evento registra ator autenticado, ação, recurso, instante e, quando aplicável, resultado, valores anterior/novo e justificativa.

Consultas restritas também são auditadas quando exigido pelo fluxo. Não registrar senha, token, conteúdo completo de documento ou dados pessoais sem necessidade. Somente perfis autorizados consultam a trilha.

## Retenção e encerramento

Encerrar, cancelar, rejeitar e inativar altera o estado e mantém histórico relacionado. Exclusão física só é permitida quando política de retenção e obrigação de preservação forem verificadas, com regra aprovada para arquivos e relações.

## Cópias de segurança

- Produzir backups periódicos do PostgreSQL em armazenamento separado e protegido.
- Criptografar cópias, limitar credenciais de backup/restauração e registrar execuções.
- Documentar e exercitar a restauração em ambiente controlado.
- Incluir documentos binários armazenados no banco nos cálculos de volume, proteção e recuperação.

## Decisões pendentes

Definir período de retenção por tipo de dado, frequência dos backups, RPO, RTO, política de descarte e acessos à trilha. Antes de produção, esses valores devem ser aceitos conforme os riscos do PRD e a [ADR 0010](../adr/0010-backup-e-recuperacao-de-dados.md).

## Verificações

- [ ] Eventos obrigatórios registram ator, ação, recurso e instante sem segredos.
- [ ] Usuário não autorizado não consulta a trilha.
- [ ] Alterações de status preservam o evento anterior e relações que precisam ser mantidas.
- [ ] Backups são protegidos e incluem os dados/documentos exigidos.
- [ ] Uma restauração de teste recupera os dados conforme RPO/RTO aceitos.
