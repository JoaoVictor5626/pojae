# Spec 0011: Notificações de vagas, entrevistas e prazos

- **Status:** Proposto
- **Requisitos:** RF-12 e RF-19 do [PRD 0001](../prd/0001-pojae.md), RNF-10, RS07 e RS012
- **Decisões:** [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md), [ADR 0007](../adr/0007-trilha-de-auditoria-e-historico.md), [ADR 0009](../adr/0009-canal-de-notificacoes.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md), [Spec 0007](0007-painel-empresa.md), [Spec 0009](0009-vagas-salvas-e-recomendacoes.md)

## Entidade `Notification`

| Campo | Tipo | Regra |
|---|---|---|
| `recipient` | Perfil de conta | Obrigatório; destinatário resolvido pelo evento |
| `type` | Enum | Vaga, entrevista ou prazo |
| `subject` / `message` | String | Texto claro, sem documento ou dado sensível desnecessário |
| `resourceId` | UUID | Referência opcional ao recurso associado |
| `createdAt` | `Instant` | Gerado pelo sistema |
| `readAt` | `Instant` anulável | Preenchido quando o destinatário marca como lida |
| `deliveryStatus` | Enum | Situação por canal, definida pelo serviço de entrega |

## `NotificationService`

- Persiste notificação no sistema para destinatário e evento corretos.
- Lista e marca como lidas somente notificações do usuário autenticado.
- Pode solicitar entrega complementar por canal externo conforme [ADR 0009](../adr/0009-canal-de-notificacoes.md).
- Registra resultado por canal sem salvar segredos ou conteúdo sensível em log.
- Falha em canal externo não deve apagar a notificação interna.

## Rotas propostas

| Rota | Método | Acesso |
|---|---|---|
| `/notificacoes/minhas` | GET | Usuário autenticado; somente notificações próprias |
| `/notificacoes/{id}/leitura` | PATCH | Destinatário da notificação |

Os eventos de vagas, entrevistas e prazos chamam o service a partir dos respectivos fluxos; não aceitam um destinatário arbitrário como autoridade.

## Comportamento

- O destinatário é determinado pelo registro relacionado e confirmado no servidor.
- O corpo contém somente assunto, resumo e ação necessária; documentos e dados de outras candidaturas não são incluídos.
- Recomendações privadas são apresentadas ao próprio estagiário e respeitam permissões do perfil.
- A consulta e a atualização da leitura validam o dono pelo identificador da sessão.

## Decisões de produto pendentes

Definir os eventos que geram aviso, prazos e antecedência, canais externos habilitados, tentativas e política de retenção. O ADR 0009 propõe notificação interna como registro principal e e-mail complementar, aguardando decisão.

## Verificações

- [ ] Usuário consulta e altera somente notificações próprias.
- [ ] Destinatário incorreto não pode ser definido pelo navegador.
- [ ] Falha de entrega externa mantém o aviso interno e registra o resultado.
- [ ] Mensagens não divulgam documentos ou dados de terceiros.
- [ ] Notificações de vagas, entrevistas e prazos são geradas nos eventos definidos.
