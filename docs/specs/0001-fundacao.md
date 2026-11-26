# Spec 0001: Fundação da aplicação

- **Status:** Implementado
- **Decisões:** [ADR 0001](../adr/0001-mvc-com-camada-de-service.md), [ADR 0004](../adr/0004-postgresql-como-banco-de-dados.md)

## Arquitetura

- O backend usa Java, Spring Boot, Spring MVC e Spring Data JPA.
- O frontend é composto por páginas HTML, Tailwind CSS e JavaScript e consome a API do backend.
- Controllers recebem HTTP e delegam operações aos services. Regras de negócio e consultas ficam nos services.
- O PostgreSQL persiste contas, vagas, candidaturas e demais dados da plataforma.
- Configurações e credenciais do banco são fornecidas pelo ambiente, sem versionar segredos.

## Sessão e acesso

A sessão HTTP é lida pelo controller. O perfil e o identificador interno da conta autenticada são passados aos services para aplicar as regras de acesso no servidor, conforme [ADR 0005](../adr/0005-autenticacao-por-sessao-http.md) e [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md).

## Verificações

- [ ] A aplicação inicia com PostgreSQL configurado por variáveis de ambiente.
- [ ] Os controllers não acessam repositories nem concentram regras de negócio.
- [ ] Operações protegidas não usam identificadores enviados pelo navegador como prova de autorização.
