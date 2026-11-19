# Regras essenciais

- O projeto segue MVC, e toda regra de negócio e consulta ao banco de dados fica nos services.
- Controllers usam Spring MVC e implementam apenas os métodos HTTP necessários. As regras de acesso são aplicadas com Spring Security.
- Services não recebem objetos de requisição HTTP nem retornam respostas HTTP.

# Ao iniciar e concluir

- Ao iniciar, leia `docs/state.md`, com o trabalho em andamento, os próximos passos e as pendências.
- Ao concluir uma tarefa, atualize esse arquivo e retire o que estiver resolvido.

# Antes de alterar código

- Leia `docs/arquitetura.md`, com as regras completas de cada camada.
- Leia a especificação da funcionalidade em `docs/specs/`, seguindo a ordem da numeração.
- Em código Java, leia `.agents/skills/java-best-practices/SKILL.md`.
- Em código Spring Boot, leia também `.agents/skills/spring-best-practices/SKILL.md`.
- Em rotas, permissões, autenticação, entrada de usuários, configurações, dependências ou revisões de segurança, leia `.agents/skills/security-owasp/SKILL.md`.

# Outros documentos

- Requisitos do produto: `docs/prd/`. Antes de criar ou alterar, leia `.agents/skills/prd/SKILL.md`.
- Especificações: `docs/specs/`. Antes de criar ou alterar, leia `.agents/skills/spec/SKILL.md`.
- Decisões de arquitetura: `docs/adr/`. Antes de criar ou alterar, leia `.agents/skills/adr/SKILL.md`.