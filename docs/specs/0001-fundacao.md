# Spec 0001: Fundação do projeto

- **Status:** Implementado
- **Requisitos:** RNF-01, RNF-03 e RNF-04 do [PRD 0001](../prd/0001-pojae.md)
- **Decisões:** [ADR 0001](../adr/0001-mvc-com-camada-de-service.md), [ADR 0002](../adr/0002-modelo-de-usuario-customizado.md)

Esta especificação deve ser implementada primeiro, e a entidade de usuário precisa existir antes da primeira migração.

## Configurações (`src/main/resources/application.yaml`)

| Configuração | Valor |
|---|---|
| Dependências | Adicionar Spring Web, Spring Data JPA, Spring Security, PostgreSQL Driver e Flyway ao `pom.xml` |
| `SPRING_DATASOURCE_URL` | Variável de ambiente para a URL de conexão PostgreSQL |
| `SPRING_DATASOURCE_USERNAME` | Variável de ambiente para o usuário do banco |
| `SPRING_DATASOURCE_PASSWORD` | Variável de ambiente para a senha do banco |
| `server.servlet.session.cookie.secure` | Ativar em produção |
| `spring.messages.basename` | `messages` |
| `spring.web.locale` | `pt_BR` |
| `spring.thymeleaf.prefix` | `classpath:/templates/` |
| `spring.web.resources.static-locations` | `classpath:/static/` |

## Estrutura

```text
src/main/java/br/edu/cesmac/pojae/
  config/
    SecurityConfig.java
  contas/
    entity/Usuario.java
    repository/
    service/
    controller/
    dto/
  oportunidade/
    entity/
    repository/
    service/
    controller/
    dto/
    exception/
  PojA eApplication.java
src/main/resources/
  application.yaml
  templates/
    base.html
  static/
    css/site.css
  db/migration/
src/test/java/br/edu/cesmac/pojae/
  contas/
  oportunidade/
```

Cada pacote `entity/`, `controller/`, `service/`, `repository/` e `dto/` mantém suas classes públicas organizadas no próprio pacote.

## Layout base (`src/main/resources/templates/base.html`)

Todas as páginas usam este layout base, que contém:

- `<html lang="pt-br">` e a meta tag `viewport`
- Cabeçalho com link para a página inicial
- Para visitantes: link "Entrar"
- Para autores: link "Painel" e botão "Sair", em um formulário POST com proteção CSRF do Spring Security
- Área de mensagens do Spring MVC
- Fragmentos `title` e `content`

## Rotas do projeto

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("inicio");
    }

}
```

## Teste de arquitetura

`src/test/java/br/edu/cesmac/pojae/ArquiteturaTest.java` percorre os pacotes de `contas.controller` e `oportunidade.controller` e falha se:

1. uma classe de controller contiver regras de negócio ou acesso direto ao repository;
2. uma rota alterar dados usando GET, ou um controller protegido não verificar autenticação e autorização.

## Critérios de aceite

- [x] A aplicação Spring Boot inicia sem reportar problemas de configuração.
- [x] As migrações Flyway executam em um banco PostgreSQL novo usando a entidade `Usuario`.
- [x] O teste de arquitetura passa.