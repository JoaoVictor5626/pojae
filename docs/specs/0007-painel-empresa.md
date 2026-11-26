# Spec 0007: Ofertas de vagas e painel da empresa

- **Status:** Proposto
- **Requisitos:** RF-04, RF-06 e RF-07 do [PRD 0001](../prd/0001-pojae.md)
- **Decisões:** [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md), [ADR 0007](../adr/0007-trilha-de-auditoria-e-historico.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md), [Spec 0006](0006-candidaturas.md)

## Entidade `Job`

A vaga possui título, descrição, modalidade/tipo, quantidade de posições, jornada e dias da semana, bolsa, objetivo, atividades, setor, escolaridade/cursos/habilidades desejados, supervisor, período previsto, benefícios, localização, empresa responsável, situação e timestamps. O cadastro associa a empresa pelo UUID da sessão, nunca por ID de empresa enviado pelo navegador.

Situações existentes: `PUBLICADA`, `RASCUNHO` e `ENCERRADA`. A transição para suspensa/inativa precisa ser definida no fluxo de convênios e políticas de publicação; não criar um estado novo sem decisão de domínio.

## `JobService` e `CompanyDashboardService`

| Operação | Regra |
|---|---|
| `create(companyId, job)` | Cria a vaga associada à empresa autenticada e registra data de criação |
| `load(companyId)` | Retorna dados cadastrais, vagas e candidaturas relacionadas somente à empresa |
| `updateOwned(companyId, jobId, input)` | Atualiza campos permitidos de vaga própria e registra data de alteração |
| `updateOwnedStatus(companyId, jobId, status)` | Altera apenas para situação permitida e registra a operação |
| `deleteOwned(companyId, jobId)` | A política desejada é encerramento lógico, preservando candidaturas e auditoria; a implementação atual exclui fisicamente vaga e candidaturas |

## Rotas

| Rota | Método | Acesso |
|---|---|---|
| `/vagas` | GET | Público; retornar somente vagas disponíveis conforme regra de publicação |
| `/vagas` | POST | Empresa autenticada |
| `/vagas/minhas` | GET | Empresa autenticada |
| `/vagas/minhas/{id}` | PUT, DELETE | Empresa proprietária |
| `/vagas/minhas/{id}/status?status=` | PATCH | Empresa proprietária |
| `/candidaturas/{id}/status` | PATCH | Empresa proprietária da vaga |
| `/candidaturas/{id}/documentos/{tipo}` | GET | Empresa autorizada à candidatura |

## Comportamento

- O backend obtém a empresa da sessão e associa a vaga a esse cadastro, ainda que a requisição contenha outro ID.
- Consultas, alterações, encerramento e acesso a candidaturas verificam o vínculo no servidor em cada chamada.
- A listagem pública e as opções de candidatura não expõem rascunhos nem vagas encerradas.
- A empresa vê apenas candidaturas de vagas próprias, com documentos entregues por rota privada.
- Mudanças relevantes registram usuário, operação, data e hora conforme [ADR 0007](../adr/0007-trilha-de-auditoria-e-historico.md).

## Pendências de negócio

- Definir o significado de vaga suspensa e quem pode reativá-la.
- Definir se uma vaga já vinculada a candidaturas pode ser encerrada ou excluída e por quanto tempo seus dados são retidos.
- Definir os campos de pesquisa pública e quais estados são elegíveis para candidatura.

## Verificações

- [ ] Visitante ou candidato não cadastra nem gerencia vagas.
- [ ] Empresa não consulta, altera, encerra ou remove vagas de outra empresa.
- [ ] A criação sempre associa a empresa da sessão.
- [ ] O painel retorna apenas vagas e candidaturas próprias.
- [ ] Vagas indisponíveis não aparecem nas opções de candidatura.
- [ ] Alterações de estado inválidas são recusadas e operações são auditáveis.
