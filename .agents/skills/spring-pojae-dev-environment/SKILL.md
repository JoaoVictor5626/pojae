---
name: spring-pojae-dev-environment
description: Subir e validar o ambiente local do POJAE (Java, Spring Boot, PostgreSQL). Use ao rodar o projeto, depurar a conexão com o banco ou orientar o setup de desenvolvimento.
---

# Ambiente de desenvolvimento — POJAE

## Pré-requisitos

- Java `26`
- Maven
- PostgreSQL acessível com as configurações definidas em `application.yaml`

## Passos

1. Na raiz do repositório: `mvn clean install`
2. Configurar as variáveis de ambiente exigidas por `application.yaml`, incluindo a URL, o usuário e a senha do PostgreSQL.
3. Subir a aplicação:
   - `mvn spring-boot:run` — porta `8080`
   - ou `mvn spring-boot:run -Dspring-boot.run.profiles=dev` (para executar com o perfil de desenvolvimento ativo)
4. Abrir `http://localhost:8080`

## PostgreSQL

- No cliente PostgreSQL: conectar ao banco definido nas configurações de `application.yaml`.
- `[ADAPTAR: configuração de migrações e constraints do banco usada na inicialização da aplicação]`

## Falha comum

- **Falha ao iniciar / conectar:** PostgreSQL não está rodando ou as configurações de conexão estão incorretas; verificar o processo, a porta e as variáveis de ambiente.

## Documentação de produto

- O escopo funcional pode estar em `docs/prd/` (complementa o README na raiz).