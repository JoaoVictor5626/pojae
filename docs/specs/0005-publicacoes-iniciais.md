# Spec 0005: Publicações iniciais

- **Status:** Implementado
- **Depende de:** [Spec 0003](0003-oportunidades.md)

O comando abaixo cria e publica as oportunidades de `src/main/resources/data/publicacoes-iniciais.yaml`, para que a plataforma não comece vazia:

```bash
[ADAPTAR: comando Spring Boot para criar e publicar as oportunidades iniciais]
```

- `--autor` é opcional, e o valor padrão é `admin`. O usuário precisa existir: caso contrário, o comando falha sem criar oportunidades.
- A gravação é feita por `PublicacaoInicialService.criarPublicacoes`, que usa o `OportunidadeService`.
- Uma publicação cujo título já existe é ignorada, portanto o comando pode ser executado novamente.
- Não se usa migração de dados, para que as oportunidades não apareçam no banco de testes nem dependam de um usuário existente.