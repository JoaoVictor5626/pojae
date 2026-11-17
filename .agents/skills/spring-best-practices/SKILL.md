---
name: spring-best-practices
description: Boas práticas de Spring Boot para este projeto. Use ao criar ou alterar entidades, migrações, services, controllers, DTOs, templates, rotas, configurações ou testes Spring Boot.
---

# Boas práticas de Spring Boot

O projeto usa Spring Boot 4.1. As regras de arquitetura estão em `docs/architecture.md` e prevalecem sobre esta skill. Em caso de dúvida sobre uma API, consulte a documentação da versão instalada.

## Controllers

- Use `@Controller` ou `@RestController` e implemente apenas os métodos HTTP necessários.
- Mantenha cada método curto: ler a entrada, chamar o service e responder.
- Converta exceções de domínio em respostas HTTP, como `ResponseStatusException`.
- Redirecione após um POST bem-sucedido para evitar reenvio ao recarregar a página.
- Use apenas POST para alterar dados, nunca GET.
- Proteja os endpoints com Spring Security e verifique a autenticação e a autorização.

```java
@RestController
@RequestMapping("/candidatos")
public class CandidateController {

    @Autowired
    private CandidateService service;

    @PostMapping
    public Candidate create(@RequestBody Candidate candidate) {
        return service.create(candidate);
    }

    @GetMapping
    public List<Candidate> read() {
        return service.read();
    }

}
```

## Services

- Concentre aqui as regras de negócio e as consultas aos repositories.
- Receba dados simples ou objetos de domínio, nunca objetos de requisição HTTP.
- Lance exceções de domínio, sem `ResponseStatusException` nem outros tipos HTTP.
- Use `@Transactional` quando uma operação fizer mais de uma escrita dependente.
- Use projeções, paginação e agregações quando evitarem carregar dados desnecessários.

## Entidades e migrações

- Mantenha nas entidades apenas campos, relacionamentos e anotações de persistência.
- Proteja invariantes no banco com constraints únicas e `CheckConstraint`.
- Referencie o usuário com a entidade de usuário apropriada.
- Escolha conscientemente o comportamento de exclusão. Use restrições de chave estrangeira quando a exclusão perderia dados importantes.
- Use `enum` para valores fixos.
- Use campos anuláveis só quando houver motivo.
- Gere migrações com Flyway ou equivalente, revise os arquivos e versione-os. Não edite migrações já aplicadas em outros ambientes.
- Prefira não usar listeners para regras de negócio, pois eles escondem o fluxo.

## Consultas

- Evite N+1: use estratégias de carregamento apropriadas do Spring Data JPA.
- Use métodos de existência e contagem para verificar existência e contar, em vez de carregar a lista.
- Use atualizações baseadas no valor atual e operações em lote quando forem apropriadas.
- Pagine listagens públicas.
- Adicione índices com base nos filtros e ordenações realmente usados.

## DTOs

- Use DTOs para validar toda entrada de usuário e leia os valores validados.
- Declare explicitamente os campos permitidos nos DTOs de entrada.
- Deixe no DTO a validação de formato e no service as regras que dependem do estado do sistema.

## Templates e rotas

- Reutilize componentes e fragmentos HTML.
- Coloque templates em `frontend/`.
- Não coloque consultas nem regras de negócio nos templates.
- Nomeie as rotas e gere links sem caminhos fixos quando possível.
- Coloque arquivos estáticos em `fontend/assets/`.

## Segurança

- Inclua proteção CSRF do Spring Security em todo formulário POST.
- Não desative o escaping em conteúdo enviado por usuários.
- Valide redirecionamentos vindos do usuário com `[ADAPTAR: mecanismo de validação de URLs de redirecionamento permitido no Spring Boot]`.
- Verifique no service se o usuário tem direito ao objeto, e não apenas se está autenticado.
- Não use SQL com interpolação de texto. Prefira Spring Data JPA ou parâmetros em consultas brutas.
- Leia segredos de variáveis de ambiente e desative configurações de depuração fora do desenvolvimento.
- Rode `[ADAPTAR: comando de verificação de configuração segura do Spring Boot]` antes de qualquer deploy.

## Painel administrativo

- Configure listagem, filtros e busca quando forem úteis, e use estratégias de carregamento que evitem N+1.
- Faça as ações do painel administrativo chamarem services, para não duplicar regras.
- Bloqueie a escrita nas entidades cujas regras dependem de um service.

## Tempo e configuração

- Use `Instant.now()` ou um `Clock` injetado, nunca `LocalDateTime.now()` para representar instantes.
- Configure o uso de datas e fusos horários de forma consistente.
- Use a injeção de dependências do Spring para acessar configurações.

## Testes

- Use JUnit e Mockito para testes e crie dados compartilhados em métodos de configuração de teste.
- Teste as regras diretamente nos services e use `MockMvc` para rotas, permissões, status e redirecionamentos.
- Verifique os casos de visitante, dono e outro usuário nas rotas protegidas.
- Use testes de integração para detectar problemas de consultas e carregamento.
- Use nomes de rota e constantes nos testes, em vez de caminhos repetidos.
- Rode os testes e verifique as migrações antes de concluir.

## Antes de concluir

- [ ] O controller não contém regra de negócio nem acesso ao repository.
- [ ] O service não conhece HTTP.
- [ ] Toda alteração de dados usa POST e CSRF.
- [ ] Rotas protegidas verificam a autenticação e o dono do objeto.
- [ ] As migrações foram geradas e revisadas.
- [ ] Os testes e as verificações de configuração passam.