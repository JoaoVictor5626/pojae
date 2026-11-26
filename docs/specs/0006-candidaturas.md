# Spec 0006: Candidaturas

- **Status:** Proposto
- **Requisitos:** RF-05, RF-08, RF-13 e RF-16 do [PRD 0001](../prd/0001-pojae.md)
- **Decisões:** [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md), [ADR 0007](../adr/0007-trilha-de-auditoria-e-historico.md), [ADR 0008](../adr/0008-documentos-privados-no-banco-de-dados.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md)

## Entidade `JobApplication`

| Campo | Tipo | Regras |
|---|---|---|
| `id` | UUID | Gerado pelo sistema |
| `candidate` | `ManyToOne(Candidate)` | Obrigatório; UUID obtido da sessão |
| `job` | `ManyToOne(Job)` | Obrigatório; vaga existente e elegível para candidatura |
| `submittedAt` | `LocalDateTime` | Preenchido no envio |
| `status` | `JobApplicationStatus` | `ENVIADA`, `EM_ANALISE`, `APROVADA`, `REJEITADA` ou `CANCELADA`; inicia em `ENVIADA` |
| `resumeContent` / `resumeFileName` | `byte[]` / `String` | Documento privado; formato e limite de tamanho devem ser validados |
| `academicHistoryContent` / `academicHistoryFileName` | `byte[]` / `String` | Documento privado; formato e limite de tamanho devem ser validados |
| `presentationMessage` | String | Obrigatória; até 2000 caracteres |
| `updatedAt` | `LocalDateTime` | Preenchida na criação e atualizada em cada mudança de estado |

## `JobApplicationService`

| Operação | Regra |
|---|---|
| `submit(candidateId, jobId, documents, message)` | Obtém candidato da sessão, valida vaga e arquivos, cria candidatura e estado inicial |
| `listByCandidate(candidateId)` | Retorna somente candidaturas do estagiário autenticado |
| `cancel(candidateId, applicationId)` | Cancela somente candidatura própria quando permitido e preserva o histórico |
| `updateStatus(companyId, applicationId, status)` | Empresa altera situação somente de candidatura associada a vaga própria |
| `getDocument(companyId, applicationId, type)` | Entrega documento após validar vínculo da empresa com a vaga |

O service não recebe objetos HTTP. Falta de sessão retorna 401; perfil incompatível retorna 403; recurso de outro usuário deve ser indistinguível de recurso inexistente, retornando 404. Dados inválidos retornam 400.

## Rotas

| Rota | Método | Acesso | Situação |
|---|---|---|---|
| `/candidaturas` | POST multipart/form-data | Estagiário autenticado | Implementada; validar arquivos conforme RS04 |
| `/candidaturas/perfil` | GET | Estagiário autenticado | Atualmente retorna dados para preencher o formulário, não o histórico |
| `/candidaturas/minhas` | GET | Estagiário autenticado | Retorna candidaturas próprias, ordenadas da mais recente para a mais antiga |
| `/candidaturas/{id}/cancelar` | PATCH | Dono da candidatura | A especificar/implementar para RF-16 |
| `/candidaturas/{id}/status` | PATCH | Empresa dona da vaga | Implementada |
| `/candidaturas/{id}/documentos/{tipo}` | GET | Dono da candidatura ou empresa responsável pela vaga | Entrega documento próprio inline ao estagiário e como anexo à empresa |

## Comportamento

1. O frontend envia o UUID da vaga, currículo, histórico escolar e mensagem como `multipart/form-data` com cookie de sessão.
2. O backend ignora qualquer identificador de candidato enviado pelo navegador e associa a candidatura à conta da sessão.
3. A listagem de histórico filtra no service pelo candidato autenticado. Alterar o ID da candidatura não pode revelar candidaturas de terceiros.
4. O dashboard do candidato mostra status, vaga, empresa, localidade, bolsa, modalidade, data, mensagem e nomes dos documentos recebidos do backend.
5. Candidato e empresa acessam arquivos somente quando têm vínculo autorizado. O conteúdo binário não aparece em DTOs de listagem.
6. Cancelar altera a situação e acrescenta evento ao histórico; não apaga a candidatura nem os documentos.

## Pendências de negócio

- Definir se um candidato pode se candidatar novamente à mesma vaga depois de cancelar.
- Definir quais situações permitem cancelamento e se a empresa recebe notificação.
- Definir formato permitido, tamanho máximo e política de retenção dos arquivos.

## Verificações

- [ ] Estagiário autenticado cria candidatura válida e recebe metadados sem bytes dos documentos.
- [ ] Visitante, empresa e instituição não consultam nem enviam candidaturas como estagiário.
- [ ] Candidato lista e cancela somente as próprias candidaturas.
- [ ] Dashboard apresenta lista real e estados persistidos, inclusive estado vazio e erro de sessão.
- [ ] Empresa consulta e atualiza apenas candidaturas de suas vagas.
- [ ] Estagiário e empresa acessam arquivos somente quando têm vínculo autorizado.
- [ ] Arquivo inválido ou acima do limite é rejeitado sem persistir candidatura.
- [ ] Vaga inválida, candidatura duplicada conforme regra definida e transição de estado inválida são rejeitadas.
