---
description: Stack e objetivos da Plataforma de Oportunidades para Jovens Aprendizes e Estagiários (Java, Spring Boot, HTML, CSS/Tailwind, JavaScript, PostgreSQL). Use em qualquer mudança no repositório.
alwaysApply: true
---

# POJAE — contexto do projeto

- **Stack:** **Java e Spring Boot** (`backend/`), **HTML, CSS/Tailwind e JavaScript** (`frontend/`), **PostgreSQL**, **Spring Data JPA** para persistência, **Spring Security** para autenticação.
- **Escopo produto:** conectar estudantes a oportunidades de aprendizagem e estágio, com foco em impacto social. Requisitos e prioridades estão em `docs/prd/`.
- **Idioma da interface:** mensagens visíveis ao usuário em **português** (Brasil).
- **Dados:** banco **PostgreSQL**; configuração em `application.yaml`.
- **Estático:** CSS e assets em `frontend/assets/` (não embutir estilos grandes inline nos templates sem necessidade).

Não introduzir outro servidor de templates, ORM ou framework frontend **salvo pedido explícito**; manter o padrão do projeto.