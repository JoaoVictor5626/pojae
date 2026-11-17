---
description: Convenções do servidor Spring Boot e rotas neste repositório.
globs: backend/src/main/java/**/*.java
alwaysApply: false
---

# Spring Boot (Controllers e Services)

- Ordem habitual: inicialização do Spring Boot → configuração de segurança e dependências → controllers e rotas.
- **`repository`:** use Spring Data JPA para persistência no PostgreSQL; configure a conexão em `application.yaml`.
- **Cadastro/usuários:** persistir senhas com hash usando Bcrypt; tratar e-mail duplicado ao cadastrar.
- **Oportunidades:** `[ADAPTAR: fonte de dados atual das oportunidades e evolução prevista, conforme o PRD do POJAE]`; preservar URLs amigáveis e alinhar com o PRD (autorização por autor, quando aplicável).
- **Erros:** `exception` no servidor para falhas inesperadas; respostas ao cliente com mensagens claras sem vazar stack em produção.

Novas rotas POST que alteram dados: validar entrada no servidor sempre (nunca confiar só no HTML).