# Spec 0003: Oportunidades

- **Status:** Implementado
- **Decisões:** [ADR 0001](../adr/0001-mvc-com-camada-de-service.md), [ADR 0003](../adr/0003-conteudo-em-texto-puro.md)
- **Depende de:** [Spec 0001](0001-fundacao.md), [Spec 0002](0002-autenticacao.md)

## Entidade `Oportunidade`

| Campo | Tipo | Regras |
|---|---|---|
| `titulo` | `String` com limite de 200 caracteres | Obrigatório |
| `slug` | `String` com limite de 220 caracteres e valor único | Gerado pelo service e imutável |
| `conteudo` | `String` com texto longo | Obrigatório, texto puro |
| `autor` | `ManyToOne(Usuario)` com exclusão protegida e relacionamento `oportunidades` | Obrigatório |
| `status` | `enum` | `RASCUNHO` (padrão) ou `PUBLICADO` |
| `publicadoEm` | `Instant` anulável | Preenchido na primeira publicação |
| `criadoEm` | `Instant` | Preenchido na criação |
| `atualizadoEm` | `Instant` | Atualizado na alteração |

No mapeamento da entidade:

- Constraint de verificação: uma oportunidade com status `PUBLICADO` precisa ter `publicadoEm`.
- Índice em `(status, publicadoEm DESC)` para a listagem pública.

O método `toString()` retorna o título.

## Exceções (`oportunidades/exception/`)

- `OportunidadeNaoEncontradaException`: a oportunidade não existe, não está publicada ou pertence a outro autor, conforme a operação.

## `OportunidadeService`

| Método | Regra |
|---|---|
| `listarPublicadas(pagina=1)` | Retorna uma página (`Page`) com 10 oportunidades publicadas, ordenadas por `publicadoEm` decrescente, carregando o autor sem consulta adicional |
| `obterPublicada(slug)` | Retorna a oportunidade publicada ou lança `OportunidadeNaoEncontradaException` |
| `listarDoAutor(autor, pagina=1)` | Retorna uma página com 10 oportunidades do autor, ordenadas por `criadoEm` decrescente |
| `obterDoAutor(oportunidadeId, autor)` | Retorna a oportunidade do autor ou lança `OportunidadeNaoEncontradaException` |
| `criar(autor, titulo, conteudo)` | Cria um rascunho e gera o slug |
| `atualizar(oportunidadeId, autor, titulo, conteudo)` | Atualiza título e conteúdo, sem alterar slug, status ou `publicadoEm` |
| `publicar(oportunidadeId, autor)` | Define `PUBLICADO`. Preenche `publicadoEm` só se estiver vazio. Publicar de novo não altera nada |
| `despublicar(oportunidadeId, autor)` | Define `RASCUNHO` e mantém `publicadoEm` |
| `excluir(oportunidadeId, autor)` | Exclui a oportunidade e, em cascata, seus comentários |

Páginas inválidas seguem o comportamento de paginação do Spring Data: um valor não numérico retorna a primeira página, e um valor além do limite retorna uma página vazia.

### Geração do slug

1. Aplicar a normalização de slug ao título, removendo acentos e caracteres especiais.
2. Se o resultado ficar vazio, como em um título `"!!!"`, usar `"oportunidade"`.
3. Limitar a base a 200 caracteres.
4. Se o slug já existir, acrescentar `-2`, `-3` e assim por diante.

Duas criações simultâneas com o mesmo título podem gerar uma violação de constraint única. A constraint impede o dado duplicado, e esse caso raro é aceitável nesta versão.

## DTO

`OportunidadeDto` valida os campos `titulo` e `conteudo`. Ele apenas valida. A gravação é feita pelo service.

## Rotas

| Rota | Nome | Controller | Métodos | Acesso |
|---|---|---|---|---|
| `/` | `oportunidades:lista` | `OportunidadeListController` | GET | Público |
| `/oportunidades/{slug}` | `oportunidades:detalhe` | `OportunidadeDetailController` | GET | Público |
| `/painel` | `oportunidades:painel` | `PainelController` | GET | Autor |
| `/painel/oportunidades/nova` | `oportunidades:criar` | `OportunidadeCreateController` | GET, POST | Autor |
| `/painel/oportunidades/{oportunidadeId}/editar` | `oportunidades:editar` | `OportunidadeUpdateController` | GET, POST | Dono |
| `/painel/oportunidades/{oportunidadeId}/excluir` | `oportunidades:excluir` | `OportunidadeDeleteController` | GET, POST | Dono |
| `/painel/oportunidades/{oportunidadeId}/publicar` | `oportunidades:publicar` | `OportunidadePublicarController` | POST | Dono |
| `/painel/oportunidades/{oportunidadeId}/despublicar` | `oportunidades:despublicar` | `OportunidadeDespublicarController` | POST | Dono |

As rotas do painel usam Spring Security. Quando `OportunidadeNaoEncontradaException` é lançada, o controller responde 404. Assim, um autor não descobre se uma oportunidade de outro autor existe.

As páginas usam `oportunidades/lista.html`, `oportunidades/detalhe.html`, `oportunidades/painel.html`, `oportunidades/form.html` e `oportunidades/confirmar_exclusao.html`. A listagem mostra um trecho do conteúdo, e o detalhe mostra o conteúdo com quebras de linha preservadas, sem desativar o escaping HTML.

## Exemplo de controller

```java
@Controller
public class OportunidadePublicarController {
    private final OportunidadeService oportunidadeService;

    public OportunidadePublicarController(OportunidadeService oportunidadeService) {
        this.oportunidadeService = oportunidadeService;
    }

    @PostMapping("/painel/oportunidades/{oportunidadeId}/publicar")
    public String publicar(@PathVariable Long oportunidadeId,
                           Principal principal,
                           RedirectAttributes redirectAttributes) {
        try {
            oportunidadeService.publicar(oportunidadeId, principal.getName());
        } catch (OportunidadeNaoEncontradaException exc) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exc.getMessage(), exc);
        }
        redirectAttributes.addFlashAttribute("mensagem", "Oportunidade publicada.");
        return "redirect:/painel";
    }
}
```

## Painel administrativo

`Oportunidade` é somente leitura no painel administrativo enquanto gravar por lá ignorar o `OportunidadeService`.

## Testes

### Service

- [x] `criar` gera rascunho com o slug esperado, incluindo título acentuado.
- [x] Títulos iguais geram slugs diferentes.
- [x] Título sem caracteres válidos gera slug com base `oportunidade`.
- [x] `atualizar` não altera o slug.
- [x] `publicar` preenche `publicadoEm`, e uma nova publicação mantém a data.
- [x] `despublicar` volta para rascunho e tira a oportunidade da listagem pública.
- [x] Operações com a oportunidade de outro autor lançam `OportunidadeNaoEncontradaException`.
- [x] `listarPublicadas` ignora rascunhos, ordena corretamente e pagina de 10 em 10.
- [x] `listarPublicadas` não faz uma consulta extra por autor.

### Controllers

- [x] A página inicial e o detalhe de uma oportunidade publicada retornam 200.
- [x] O detalhe de um rascunho retorna 404, inclusive para o próprio autor.
- [x] Rotas do painel redirecionam visitantes para o login.
- [x] Rotas do painel retornam 404 para oportunidades de outro autor.
- [x] GET em `publicar` e `despublicar` retorna 405.
- [x] GET em `excluir` não exclui, e POST exclui.
- [x] Conteúdo com `<script>` aparece escapado no detalhe.
