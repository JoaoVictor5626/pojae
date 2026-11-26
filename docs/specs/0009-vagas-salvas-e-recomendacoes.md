# Spec 0009: Vagas salvas e recomendações

- **Status:** Proposto
- **Requisitos:** RF-14 e RF-15 do [PRD 0001](../prd/0001-pojae.md), RNF-01, RNF-07, RS07 e RS11
- **Decisões:** [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md), [ADR 0009](../adr/0009-canal-de-notificacoes.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md), [Spec 0007](0007-painel-empresa.md), [Spec 0008](0008-cadastros-e-perfis.md)

## Entidade `SavedJob`

| Campo | Tipo | Regras |
|---|---|---|
| `candidate` | `ManyToOne(Candidate)` | Obrigatório; vem da sessão |
| `job` | `ManyToOne(Job)` | Obrigatório; deve existir e estar disponível |
| `createdAt` | `Instant` | Gerado no salvamento |

Uma vaga pode ser salva uma única vez por estagiário; a combinação candidato/vaga tem constraint única. Remover dos salvos não remove a vaga nem candidatura.

## `JobRecommendationService`

- Lista somente vagas elegíveis e da abrangência Maceió/AL.
- Compara perfil acadêmico e habilidades do estagiário aos critérios informados na vaga.
- Não exibe recomendações a outra conta nem envia dados do perfil a destinatários externos.
- O método de pontuação e os critérios mínimos de compatibilidade permanecem pendentes de decisão de produto; não devem ser inventados no controller.

## Rotas propostas

| Rota | Método | Acesso |
|---|---|---|
| `/candidatos/me/vagas-salvas` | GET | Estagiário autenticado |
| `/candidatos/me/vagas-salvas` | POST | Estagiário autenticado; recebe apenas `jobId` |
| `/candidatos/me/vagas-salvas/{jobId}` | DELETE | Estagiário autenticado; remove dos próprios salvos |
| `/vagas/recomendadas` | GET | Estagiário autenticado |

## Comportamento

- O servidor obtém o estagiário da sessão e ignora `candidateId` enviado pelo navegador.
- A tentativa duplicada de salvar a mesma vaga não cria registros duplicados.
- Rascunhos e vagas encerradas nunca podem ser salvos ou recomendados.
- Vagas e recomendações são filtradas por Maceió/AL, respeitando RNF-01.
- Pesquisa pública e ordenação por compatibilidade serão definidas antes da implementação detalhada.

## Verificações

- [ ] Estagiário salva e remove vagas próprias.
- [ ] Visitante, empresa ou instituição não consulta nem altera lista salva de outra conta.
- [ ] Vaga inexistente, indisponível ou duplicada é tratada sem criar vínculo inválido.
- [ ] Recomendações usam apenas o perfil do estagiário autenticado e vagas elegíveis.
- [ ] Filtros e recomendações respeitam Maceió/AL.
- [ ] A consulta atende o limite de resposta de 3 segundos definido em RNF-07.
