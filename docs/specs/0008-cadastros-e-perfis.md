# Spec 0008: Cadastro de contas e perfis

- **Status:** Proposto
- **Requisitos:** RF-01, RF-02, RF-03 e RF-24 do [PRD 0001](../prd/0001-pojae.md), RNF-02, RNF-09, RNF-11, RS01 e RS10
- **Decisões:** [ADR 0005](../adr/0005-autenticacao-por-sessao-http.md), [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md)
- **Depende de:** [Spec 0001](0001-fundacao.md), [Spec 0002](0002-autenticacao.md)

## Contas

Os três perfis usam os campos comuns de `Account`: nome, telefone, e-mail, senha, endereço e situação. A senha nunca é devolvida nas respostas. Cada conta usa endereço identificado por CEP; a plataforma atende Maceió/AL conforme RNF-01.

| Perfil | Campos próprios |
|---|---|
| `Candidate` | CPF, instituição de ensino, curso, série/período, turno, previsão de conclusão e habilidades |
| `Company` | CNPJ, supervisor de estágio, representante, cargos e website |
| `EducationalInstitution` | CNPJ, tipo de instituição, orientador acadêmico e representante |

CPF/CNPJ e dados que o modelo declarar únicos devem ser validados no servidor. Conhecer um documento ou UUID não concede acesso ao perfil. A criação de senha confirma o campo de senha no frontend, mas somente a senha validada pelo backend é armazenada como hash BCrypt.

## Services

| Operação | Regra |
|---|---|
| `createCandidate(data)` | Valida duplicidade, resolve instituição existente, endereço e habilidades; armazena senha protegida |
| `createCompany(data)` | Valida duplicidade, endereço e campos empresariais; armazena senha protegida |
| `createInstitution(data)` | Valida duplicidade, endereço e campos institucionais; armazena senha protegida |
| `getOwnProfile(profileId)` | Retorna somente campos do perfil da sessão, sem senha |
| `updateOwnProfile(profileId, data)` | Atualiza somente campos permitidos do perfil autenticado |
| `deleteOwnProfile(profileId)` | Aplica a política de encerramento e preservação definida na Spec 0015 |

## Rotas

| Rota | Método | Acesso |
|---|---|---|
| `/candidatos` | POST | Público, criação de estagiário |
| `/empresas` | POST | Público, criação de empresa |
| `/instituicoesDeEnsino` | POST | Público, criação de instituição |
| `/candidatos/me` | GET, PUT, DELETE | Estagiário autenticado, próprio perfil |
| `/empresas/me` | GET, PUT, DELETE | Empresa autenticada, próprio perfil |
| `/instituicoesDeEnsino/me` | GET, PUT, DELETE | Instituição autenticada, próprio perfil |

As rotas públicas de listagem por coleção e de alteração por UUID não devem expor nem alterar contas sem autorização. Substituí-las ou protegê-las é parte desta spec.

## Comportamento

- A validação, autorização, prevenção de duplicidade e persistência ficam no service.
- Campos comuns são herdados de `Account`; campos específicos permanecem no respectivo perfil.
- A instituição de ensino deve existir e ser selecionada pelo estagiário; o identificador não substitui a autorização para consultar dados da instituição.
- As respostas usam DTOs com campos necessários à tela e nunca incluem senha em texto ou hash.
- O navbar e as rotas protegidas usam o perfil devolvido pela sessão, sem inferir autorização a partir de dados do navegador.

## Pendências

- Definir se a criação de conta exige verificação de e-mail ou aprovação administrativa.
- Definir o fluxo de exclusão/encerramento de conta e a retenção de candidaturas e documentos conforme RNF-05, RS04 e RS012.
- A autenticação de instituições ainda não está integrada; ver Spec 0002.

## Verificações

- [ ] Cada tipo de conta é criado com os campos próprios e comuns exigidos.
- [ ] Documento duplicado não cria uma segunda conta.
- [ ] Senhas são persistidas apenas como hash e nunca aparecem em respostas.
- [ ] Um perfil não consulta ou altera o perfil de outra pessoa ao trocar UUID ou CPF/CNPJ.
- [ ] Respostas de perfil retornam apenas campos autorizados.
- [ ] Dados de endereço respeitam Maceió/AL quando exigido pelo produto.
