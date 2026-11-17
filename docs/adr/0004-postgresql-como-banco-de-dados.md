# ADR 0004: PostgreSQL como banco de dados

- **Status:** Aceito
- **Data:** 2026-11-04

## Contexto

O POJAE usa PostgreSQL como banco de dados para persistir contas e oportunidades. A conexão e as credenciais são configuradas por variáveis de ambiente em `application.yaml`.

## Decisão

Usar PostgreSQL. O código acessa os dados por Spring Data JPA e migrations, evitando SQL específico do banco quando possível.

## Consequências

- É necessário instalar ou configurar um serviço de banco de dados PostgreSQL.
- O PostgreSQL permite escritas simultâneas e oferece recursos adequados à persistência do POJAE.
- Mudanças futuras na estratégia de persistência devem ser avaliadas em uma nova ADR.
- Credenciais e dados locais do banco não devem ser versionados.