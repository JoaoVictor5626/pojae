# Spec 0004: Comentários

- **Status:** Implementado
- **Requisitos:** RF-12 a RF-14 do [PRD 0001](../prd/0001-pojae.md)
- **Depende de:** [Spec 0003](0003-oportunidades.md)

## Entidade `Comentario`

| Campo | Tipo | Regras |
|---|---|---|
| `oportunidade` | `ManyToOne(Oportunidade, cascade = CascadeType.REMOVE, relacionamento = "comentarios")` | Obrigatório |
| `nome` | `String` com limite de 80 caracteres | Obrigatório |
| `texto` | `String` com limite de 2000 caracteres | Obrigatório |
| `aprovado` | `boolean` | Padrão `false` |
| `criadoEm` | `Instant` | Preenchido na criação |

O mapeamento define índice em `(oportunidade, aprovado, criadoEm)`. O método `toString()` retorna o nome e o título da oportunidade.

O e-mail de quem comenta não é coletado, porque nenhuma funcionalidade desta versão o utiliza.

## `ComentarioService`

| Método | Regra |
|---|---|
| `listarAprovados(oportunidade)` | Retorna os comentários aprovados, do mais antigo para o mais recente |
| `criar(slug, nome, texto)` | Cria um comentário pendente em uma oportunidade publicada. Lança `OportunidadeNaoEncontradaException` se a oportunidade não estiver publicada |
| `aprovar(comentarioIds)` | Marca os comentários informados como aprovados e retorna a quantidade alterada |

## DTO

`ComentarioDto` valida os campos `nome` e `texto`. O limite de 2000 caracteres do campo `texto` precisa ser validado pelo DTO.

## Rota

| Rota | Nome | Controller | Método | Acesso |
|---|---|---|---|---|
| `/oportunidades/{slug}/comentarios` | `oportunidades:comentar` | `ComentarioCreateController` | POST | Público |

## Fluxo

1. `OportunidadeDetailController` mostra a oportunidade, os comentários aprovados e o `ComentarioDto`.
2. O formulário envia um POST para `oportunidades:comentar`.
3. Se for válido, o controller chama `ComentarioService.criar`, adiciona a mensagem "Comentário enviado. Ele aparecerá após a moderação." e redireciona para o detalhe da oportunidade.
4. Se for inválido, o controller obtém a oportunidade e os comentários e renderiza `oportunidades/detalhe.html` novamente com os erros, mantendo o texto digitado.
5. Se a oportunidade não existir ou não estiver publicada, o controller responde 404.

O texto é exibido com escaping HTML e quebras de linha preservadas, sem desativar o escaping.

## Painel administrativo

`ComentarioAdmin` serve para moderação:

- A listagem mostra nome, oportunidade, início do texto, `aprovado` e `criadoEm`, com filtro por `aprovado` e carregamento da oportunidade sem consulta extra.
- A ação "Aprovar selecionados" chama `ComentarioService.aprovar`.
- A exclusão padrão do painel administrativo continua disponível.
- Não é possível adicionar comentários, e os campos não são editáveis, para que o texto de quem comentou não seja alterado.

## Testes

- [x] Um comentário válido é criado como pendente.
- [x] Um comentário pendente não aparece no detalhe da oportunidade.
- [x] Um comentário aprovado aparece no detalhe da oportunidade.
- [x] Comentar em rascunho ou em slug inexistente retorna 404.
- [x] Um POST inválido não cria comentário e mostra os erros.
- [x] Texto acima de 2000 caracteres é rejeitado.
- [x] GET na rota de comentar retorna 405.
- [x] Comentário com `<script>` aparece escapado.
- [x] A ação do painel administrativo aprova os comentários selecionados.
- [x] Excluir uma oportunidade exclui seus comentários.