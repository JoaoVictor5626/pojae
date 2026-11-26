# Spec 0012: Entrevistas com candidatos

- **Status:** Proposto
- **Requisitos:** RF-17 e RF-18 do [PRD 0001](../prd/0001-pojae.md), RNF-07, RNF-10, RS08, RS11 e RS012
- **Decisões:** [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md), [ADR 0007](../adr/0007-trilha-de-auditoria-e-historico.md), [ADR 0009](../adr/0009-canal-de-notificacoes.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md), [Spec 0006](0006-candidaturas.md), [Spec 0007](0007-painel-empresa.md), [Spec 0011](0011-notificacoes.md)

## Entidade `Interview`

A entrevista pertence a uma candidatura, que identifica a vaga, a empresa e o candidato. Deve registrar horário agendado, situação atual, responsável pela criação/alteração e timestamps. Link ou local de realização pode ser armazenado se o produto decidir que será exibido às partes.

Estados mínimos: agendada, confirmada, recusada e cancelada. A transição de agendada para confirmada/recusada só pode ser feita pelo candidato da candidatura; agendar, alterar horário ou cancelar é permitido apenas à empresa responsável pela vaga.

## `InterviewService`

| Operação | Regra |
|---|---|
| `schedule(companyId, applicationId, schedule)` | Cria entrevista para candidatura de vaga da empresa autenticada |
| `reschedule(companyId, interviewId, schedule)` | Altera entrevista da própria vaga e mantém histórico |
| `respond(candidateId, interviewId, decision)` | Candidato confirma ou recusa entrevista própria |
| `cancel(companyId, interviewId)` | Cancela entrevista administrada pela empresa responsável |

## Rotas propostas

| Rota | Método | Acesso |
|---|---|---|
| `/entrevistas` | POST | Empresa responsável pela vaga |
| `/entrevistas/{id}` | PUT | Empresa responsável pela vaga |
| `/entrevistas/{id}/resposta` | PATCH | Candidato da candidatura |
| `/entrevistas/{id}/cancelamento` | PATCH | Empresa responsável pela vaga |
| `/entrevistas/minhas` | GET | Candidato autenticado, somente entrevistas próprias |

## Comportamento

- Cada solicitação valida relação entre entrevista, candidatura, vaga, empresa e candidato no service.
- IDs fornecidos pelo cliente não alteram a identidade da empresa ou do candidato da sessão.
- Agendamento, alteração, resposta e cancelamento registram ator, decisão e data/hora e preservam estados anteriores.
- Após definir ou alterar uma entrevista, o evento elegível inicia o fluxo de notificação da Spec 0013.
- Horários são interpretados no fuso da plataforma e exibidos de forma inequívoca às pessoas envolvidas.

## Decisões de produto pendentes

Definir antecedência mínima, limites de reagendamento, se uma candidatura pode ter mais de uma entrevista ativa, quais dados de local/link são obrigatórios, estados de cancelamento e se o candidato pode propor outro horário.

## Verificações

- [ ] Empresa só agenda e altera entrevistas de candidaturas de suas próprias vagas.
- [ ] Candidato só confirma/recusa entrevista de candidatura própria.
- [ ] Perfil incompatível ou ID trocado não acessa entrevista de terceiros.
- [ ] Transições inválidas e horários inválidos são recusados.
- [ ] Mudanças preservam histórico e notificam somente os participantes corretos.
