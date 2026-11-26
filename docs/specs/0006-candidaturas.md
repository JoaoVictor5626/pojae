# Spec 0006: Candidaturas

- **Status:** Proposto
- **Depende de:** [Spec 0001](0001-fundacao.md), [Spec 0002](0002-autenticacao.md)
- **Requisitos:** RF-05 e RF-13 do [PRD 0001](../prd/0001-pojae.md)

## Entidade `JobApplication`

| Campo | Tipo | Regras |
|---|---|---|
| `candidate` | `ManyToOne(Candidate)` | Obrigatório; candidato vem da sessão autenticada |
| `job` | `ManyToOne(Job)` | Obrigatório; vaga precisa existir |
| `submittedAt` | `Instant` | Preenchido pelo service ao criar |
| `status` | `Integer` | `1` enviada, `2` em análise, `3` aprovada, `4` rejeitada, `5` cancelada; início em `1` |
| `resumeContent` / `resumeFileName` | `byte[]` / `String` | PDF obrigatório, até 5 MiB |
| `academicHistoryContent` / `academicHistoryFileName` | `byte[]` / `String` | PDF obrigatório, até 5 MiB |
| `presentationMessage` | `String` | Obrigatória, até 2000 caracteres |
| `updatedAt` | `Instant` | Inicializado junto com `submittedAt` |

Os IDs de candidato e vaga são UUIDs, conforme as entidades já existentes, mesmo que os placeholders atuais do HTML sejam números. Os arquivos são persistidos em colunas `bytea` do PostgreSQL e não são incluídos em respostas JSON.

## `JobApplicationService`

| Método | Regra |
|---|---|
| `submit(candidateId, jobId, resume, academicHistory, message)` | Verifica candidato e vaga, valida os dois PDFs e a mensagem, cria candidatura com status `1` e timestamps atuais |

O service não recebe objetos HTTP. Falhas de entrada e arquivos inválidos são convertidos em HTTP 400 pelo controller; falta de sessão de candidato retorna 401; vaga ou candidato inexistente retorna 404.

## DTOs

- `JobApplicationRequestDto`: `jobId`, `resume`, `academicHistory`, `presentationMessage`.
- `JobApplicationResponseDto`: ID, status e timestamps; não contém os bytes dos arquivos.
- `JobApplicationCommand`: dados simples e conteúdo dos arquivos passados do controller ao service.
- `JobApplicationJobDto`: campos mínimos para as vagas disponíveis no formulário, inclusive ID UUID.

## Rotas

| Rota | Controller | Método | Acesso |
|---|---|---|---|
| `/vagas/opcoes-candidatura` | `JobController` | GET | Público |
| `/candidaturas/perfil` | `JobApplicationController` | GET | Candidato autenticado |
| `/candidaturas` | `JobApplicationController` | POST multipart/form-data | Candidato autenticado |

## Comportamento

1. A página inicial carrega as vagas persistidas pela API e usa os IDs reais ao abrir o modal.
2. O formulário envia os arquivos selecionados e a mensagem como `multipart/form-data`, com cookie de sessão.
3. O controller obtém o candidato pela sessão, ignora qualquer ID de candidato vindo do navegador e delega a gravação ao service.
4. O modal carrega nome, e-mail e instituição do candidato pela sessão, sem confiar nos valores demonstrativos do HTML.
5. Em caso de sucesso, responde 201 com os metadados da candidatura. O frontend só exibe sucesso depois dessa resposta.
6. Sem sessão de candidato, com vaga inexistente, dados inválidos ou upload não-PDF/acima do limite, a candidatura não é gravada.

## Testes

- [ ] Candidato autenticado cria candidatura com arquivos PDF válidos.
- [ ] Visitante ou sessão de empresa não consulta o perfil nem cria candidatura.
- [ ] Vaga inexistente, arquivos inválidos e mensagem inválida são rejeitados.
- [ ] Resposta não expõe conteúdo binário dos arquivos.
