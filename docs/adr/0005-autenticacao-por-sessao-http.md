# ADR 0005: Autenticação por sessão HTTP e contas tipadas

- **Status:** Proposto
- **Data:** 2026-11-26
- **Substitui:** [ADR 0002](0002-modelo-de-usuario-customizado.md)
- **Requisitos:** [RF-01 a RF-03](../prd/0001-pojae.md), [RF-22 a RF-24](../prd/0001-pojae.md), [RNF-04 e RNF-06](../prd/0001-pojae.md)

## Contexto

O POJAE possui perfis de estagiário, empresa e instituição de ensino, com dados próprios em entidades separadas que herdam os campos comuns de `Account`. A implementação atual cria uma sessão HTTP após validar CPF ou CNPJ e senha. O projeto não usa JWT nem o fluxo de autenticação do Spring Security, embora utilize `PasswordEncoder` para proteger senhas.

A ADR 0002 descreve uma entidade `Usuario` e autenticação integrada ao Spring Security, o que não corresponde ao modelo e ao fluxo atuais nem ao cadastro de instituições de ensino exigido pelo PRD.

## Decisão

- Manter os dados específicos nos perfis `Candidate`, `Company` e `EducationalInstitution`, herdando os campos comuns de `Account`.
- Autenticar CPF de estagiário e CNPJ de empresa ou instituição de ensino com senha.
- Após autenticação válida, criar uma sessão HTTP que guarde o identificador interno da conta e seu tipo de perfil; invalidar a sessão no logout.
- Usar `PasswordEncoder` com BCrypt para comparar e armazenar senhas. Não usar JWT nem filtros de autenticação do Spring Security.
- O controller lê a sessão HTTP e repassa ao service somente o identificador e o perfil necessários à operação.

## Consequências

- O navegador precisa enviar o cookie da sessão em requisições autenticadas, e produção exige HTTPS e configuração adequada de cookies.
- As operações de perfil, instituição e senha precisam consultar os repositórios corretos conforme o tipo da conta.
- Sessões precisam ser invalidadas no logout e após alterações de credenciais ou outras situações definidas pelo fluxo.
- O uso de sessões exige afinidade ou armazenamento compartilhado caso o backend seja executado em múltiplas instâncias.
