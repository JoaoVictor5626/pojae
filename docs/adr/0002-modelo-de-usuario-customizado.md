# ADR 0002: Modelo de usuário customizado e autenticação própria

- **Status:** Substituído por [ADR 0005](0005-autenticacao-por-sessao-http.md)
- **Data:** 2026-11-04

## Contexto

O POJAE precisa de contas para estudantes, autores de oportunidades e administradores. O projeto usa Spring Boot com Spring Security e PostgreSQL. Definir o modelo de usuário no início evita migrações complexas ao adicionar campos de perfil posteriormente.

O fluxo de autenticação será implementado em controllers explícitos, conforme a [ADR 0001](0001-mvc-com-camada-de-service.md).

## Decisão

- Criar o módulo `contas`, com a entidade `Usuario`, sem campos adicionais por enquanto.
- Definir a entidade de usuário e sua configuração de persistência antes da primeira execução das migrações.
- Usar Spring Security para autenticação e autorização, com `PasswordEncoder` para senhas.
- Escrever os controllers de entrar e sair como classes Spring MVC.
- Gerenciar a autenticação e a sessão HTTP no controller, pois dependem da requisição. Essa é uma exceção esperada à delegação para services.

## Consequências

- Novos campos de perfil poderão ser adicionados por meio de migrações.
- O código deve referenciar o usuário pela entidade `Usuario`, sem acoplar outras partes do sistema a detalhes de persistência.
- Há um módulo a mais, e a validação segura do parâmetro de redirecionamento após o login passa a ser responsabilidade do projeto.
