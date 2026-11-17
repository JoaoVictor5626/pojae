---
name: java-best-practices
description: Boas práticas de Java para o POJAE. Use ao escrever, revisar ou refatorar qualquer código Java, incluindo nomes, tipagem, tratamento de exceções, organização de pacotes e testes.
---

# Boas práticas de Java

O projeto usa Java. Quando houver conflito, `docs/architecture.md` prevalece sobre esta skill.

## Estilo e nomes

- Siga as convenções Java: 4 espaços, `camelCase` para métodos e variáveis, `PascalCase` para classes e `UPPER_SNAKE_CASE` para constantes.
- Use termos do domínio e sufixos técnicos em inglês: `OportunidadeService.listarPublicadas`, `EstudanteDto`, `OportunidadeController`.
- Prefira nomes que dispensem comentários. Comente o motivo de uma decisão, não o que o código faz.
- Agrupe os imports em biblioteca padrão, terceiros e projeto. Não use imports com curingas.
- Use interpolação de texto apropriada ao Java e `Path` para caminhos.

## Funções e classes

- Dê uma única responsabilidade a cada método.
- Use retorno antecipado para evitar aninhamento profundo.
- Não use objetos mutáveis como valores padrão.
- Em métodos com vários parâmetros do mesmo tipo, use argumentos nomeados para evitar trocas.
- Use métodos `static` só quando a classe realmente agrupar o comportamento.
- Prefira composição a heranças profundas.

## Tipagem

- Declare tipos explícitos nas assinaturas públicas, especialmente nos services.
- Use tipos genéricos apropriados, como `List<String>`, `Map<String, Integer>` e `Optional<String>`, em vez de coleções sem tipo ou valores nulos ambíguos.
- Use imports de tipo apenas para tipagem e evite dependências circulares.

```java
public Job findJobById(UUID id) {
    ...
}
```

## Exceções

- Capture a exceção mais específica possível. Nunca use blocos `catch` vazios nem silencie erros.
- Crie exceções de domínio para falhas previstas, como `OportunidadeNaoEncontradaException`.
- Preserve a causa ao converter uma exceção, por exemplo: `throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recurso não encontrado", exc);`.
- Mantenha o bloco `try` restrito às linhas que podem falhar.

## Coleções e recursos

- Use operações simples de Stream. Se ficarem difíceis de ler, use um laço `for`.
- Use `anyMatch()` e `allMatch()` para verificações sobre coleções.
- Use `try-with-resources` para arquivos, conexões e outros recursos.
- Use `java.time` com fuso horário. Em código Spring Boot, use `Instant.now()` ou `Clock` injetado.

## Segurança

- Não coloque segredos no código. Leia-os de variáveis de ambiente.
- Não use mecanismos de execução dinâmica nem desserialização insegura com dados externos.
- Não registre senhas, tokens ou dados pessoais em logs.

## Testes

- Escreva testes com nomes que descrevam o comportamento: `publicarPreencheDataNaPrimeiraVezTest`.
- Organize cada teste em preparar, executar e verificar, testando um comportamento por vez.
- Teste também caminhos de erro e casos de borda.
- Ao corrigir um bug, primeiro escreva um teste que o reproduza.

## Antes de concluir

- [ ] Os testes passam.
- [ ] Não há imports, variáveis ou código sem uso.
- [ ] Os métodos públicos novos têm tipos.
- [ ] Nenhum bloco `catch` esconde erros inesperados.