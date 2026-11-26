# Spec 0007: Painel da empresa

- **Status:** Proposto
- **Requisitos:** RF-06 e RF-07 do [PRD 0001](../prd/0001-pojae.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md), [Spec 0003](0003-oportunidades.md), [Spec 0006](0006-candidaturas.md)

## `CompanyDashboardService`

- Carrega os dados cadastrais da empresa autenticada, suas vagas e candidaturas relacionadas.
- Converte entidades em DTOs do painel; não inclui o conteúdo binário dos documentos.
- Atualiza vaga, situação da vaga e situação da candidatura somente quando pertencem à empresa da sessão.
- Retorna documentos somente para candidaturas de vagas da empresa autenticada.
- Ao excluir uma vaga pelo painel, exclui suas candidaturas e arquivos associados.

## Rotas

| Rota | Método | Acesso |
|---|---|---|
| `/vagas/minhas` | GET | Empresa autenticada |
| `/vagas/minhas/{id}` | PUT, DELETE | Empresa dona da vaga |
| `/vagas/minhas/{id}/status?status=` | PATCH | Empresa dona da vaga |
| `/candidaturas/{id}/status` | PATCH | Empresa dona da vaga |
| `/candidaturas/{id}/documentos/{tipo}` | GET | Empresa dona da vaga |

## Comportamento

O navegador envia o cookie da sessão em cada chamada. O servidor usa o UUID da empresa guardado na sessão para filtrar e autorizar operações; IDs enviados pelo navegador nunca definem o escopo de acesso. Os status de candidatura são `1` enviada, `2` em análise, `3` aprovada, `4` rejeitada e `5` cancelada. Os arquivos são entregues como PDF e não são incluídos no DTO do painel.

## Testes

- [ ] Visitante e candidato não carregam o painel.
- [ ] Empresa consulta apenas vagas e candidaturas próprias.
- [ ] Empresa não altera nem baixa dados pertencentes a outra empresa.
- [ ] Edição, exclusão, atualização de status e download persistem/refletem os dados do backend.
