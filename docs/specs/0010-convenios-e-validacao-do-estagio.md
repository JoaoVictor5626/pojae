# Spec 0010: Convênios e validações do estágio

- **Status:** Proposto
- **Requisitos:** RF-09, RF-10, RF-20 e RF-21 do [PRD 0001](../prd/0001-pojae.md), RS05, RS06, RS11 e RS012
- **Decisões:** [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md), [ADR 0007](../adr/0007-trilha-de-auditoria-e-historico.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md), [Spec 0006](0006-candidaturas.md), [Spec 0008](0008-cadastros-e-perfis.md)

## Domínio

O fluxo relaciona uma empresa e uma instituição de ensino por um convênio, e relaciona um estagiário autenticado a um processo de estágio. A instituição vinculada valida o estagiário e registra decisões sobre o plano de atividades e a aprovação do estágio.

Todo vínculo deve apontar para registros existentes e compatíveis. Usuários de empresa e instituição só podem agir em processos aos quais suas organizações estejam vinculadas. Cada decisão registra responsável, resultado, data e hora e justificativa quando o fluxo exigir.

## Serviços

| Operação | Regra |
|---|---|
| `createAgreement(companyId, institutionId, data)` | Cria convênio em nome de parte autorizada e valida os dois vínculos |
| `validateCandidate(institutionId, candidateId, decision)` | Instituição valida somente estagiário associado a ela |
| `registerActivityPlan(applicationId, plan)` | Vincula plano a candidatura e partes correspondentes |
| `approveActivityPlan(institutionId, planId, decision)` | Registra decisão de usuário autorizado da instituição vinculada |
| `approveInternship(institutionId, applicationId, decision)` | Aprova ou recusa estágio somente dentro do processo vinculado |

Os services não recebem HTTP. A identidade organizacional é derivada da sessão no controller e passada como identificador ao service. A autorização e a consistência dos vínculos são verificadas pelo service em toda operação.

## Rotas propostas

| Rota | Método | Acesso |
|---|---|---|
| `/convenios` | POST | Empresa ou instituição autenticada e autorizada |
| `/convenios/meus` | GET | Parte autenticada, apenas convênios vinculados |
| `/instituicoesDeEnsino/me/candidatos/{candidateId}/validacao` | POST | Instituição vinculada |
| `/estagios/{applicationId}/plano-de-atividades` | POST, GET | Partes autorizadas do processo |
| `/estagios/{applicationId}/plano-de-atividades/aprovacao` | POST | Instituição vinculada |
| `/estagios/{applicationId}/aprovacao` | POST | Instituição vinculada |

## Comportamento

- Nenhum ID enviado pelo cliente, isoladamente, concede acesso ou define a empresa/instituição atuante.
- Convênio, candidatura e plano só podem ser associados quando os participantes e o contexto do estágio forem compatíveis.
- A aprovação preserva o histórico da decisão; correções acrescentam registro em vez de sobrescrever decisão anterior.
- A interface separa conteúdo interno de conteúdo compartilhado entre estagiário, empresa e instituição.
- Erros de vínculo ou recurso alheio não revelam dados de terceiros.

## Decisões de produto pendentes

Antes da implementação, definir campos e documentos do convênio, quem inicia e aceita o vínculo, vigência e estados possíveis; definir os dados do plano, participantes que podem consultá-lo e as transições de validação/aprovação; definir se aprovação exige justificativa e se há prazo ou possibilidade de revisão.

## Verificações

- [ ] Usuário de outra empresa ou instituição não cria, lê ou altera convênio alheio.
- [ ] Instituição valida somente estagiários e processos vinculados a ela.
- [ ] Plano e aprovação ficam associados a uma candidatura e a participantes compatíveis.
- [ ] Decisão registra ator, resultado, data/hora e justificativa quando aplicável.
- [ ] IDs manipulados na requisição não permitem assumir vínculo ou atribuir decisão a outra pessoa.
