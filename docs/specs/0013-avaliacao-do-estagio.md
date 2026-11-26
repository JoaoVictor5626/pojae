# Spec 0013: Avaliação do estágio

- **Status:** Proposto
- **Requisitos:** RF-11 do [PRD 0001](../prd/0001-pojae.md), RNF-07, RNF-12, RS06, RS11 e RS012
- **Decisões:** [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md), [ADR 0007](../adr/0007-trilha-de-auditoria-e-historico.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md), [Spec 0010](0010-convenios-e-validacao-do-estagio.md)

## Domínio

Uma avaliação pertence a um estágio/candidatura e identifica o avaliador autenticado e autorizado no processo. O sistema deve preservar autor e instante de envio, restringir leitura às partes autorizadas e manter o histórico de correções sem sobrescrever o registro original.

## `InternshipEvaluationService`

- Cria avaliação somente para estágio existente e para usuário com papel de avaliador naquele processo.
- Lista avaliações somente para as partes autorizadas, separando campos internos dos compartilhados.
- Registra correção como nova versão relacionada à anterior, com responsável, data/hora e justificativa quando requerida.

## Rotas propostas

| Rota | Método | Acesso |
|---|---|---|
| `/estagios/{id}/avaliacoes` | POST | Avaliador autorizado no processo |
| `/estagios/{id}/avaliacoes` | GET | Participante autorizado |
| `/estagios/{id}/avaliacoes/{evaluationId}` | PUT | Autor autorizado, mantendo versão anterior |

## Decisões de produto pendentes

Definir quais perfis avaliam, em que momentos e frequência, critérios/perguntas, escala ou formato de resposta, se avaliação é visível ao estagiário e quais campos são internos. Até essa definição, não presumir uma escala numérica nem liberar formulário genérico.

## Verificações

- [ ] Usuário fora do processo não cria, lê ou corrige avaliação.
- [ ] Avaliação registra ator, data/hora e relação válida com estágio.
- [ ] Correção preserva a versão anterior.
- [ ] Conteúdo interno não é mostrado a perfis sem autorização.
- [ ] Formato e obrigatoriedade dos critérios são validados conforme regra de produto definida.
