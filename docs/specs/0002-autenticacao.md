# Spec 0002: Autenticação

- **Status:** Implementado
- **Requisitos:** RF-05 e RF-15 do [PRD 0001](../prd/0001-pojae.md)
- **Decisão:** [ADR 0002](../adr/0002-modelo-de-usuario-customizado.md)
- **Depende de:** [Spec 0001](0001-fundacao.md)

## Entidade

```java
@Entity
public class Usuario {
    // Campos de identificação e autenticação.
}
```

A entidade é gerenciada pelo painel administrativo, onde o administrador cria contas e as desativa com o campo `ativo`.

## Rotas

| Rota | Nome | Controller | Métodos | Acesso |
|---|---|---|---|---|
| `/entrar` | `contas:entrar` | `EntrarController` | GET, POST | Público |
| `/sair` | `contas:sair` | `SairController` | POST | Autenticado |

## Comportamento

### `EntrarController`

- **GET:** exibe o formulário de login. Quem já está autenticado é redirecionado para `/oportunidades/painel`.
- **POST válido:** Spring Security autentica o usuário e redireciona para o destino `next`, se for seguro, ou para `/oportunidades/painel`.
- **POST inválido:** exibe o formulário novamente com uma mensagem de erro padrão, sem revelar se o usuário existe.
- O destino `next` é validado para aceitar apenas o host da requisição. O valor é repassado do GET para o POST em um campo oculto.

### `SairController`

- **POST:** encerra a sessão com Spring Security e redireciona para `/oportunidades`.
- **GET:** retorna 405, pois a rota não aceita esse método.

## Testes

- [x] Login com credenciais válidas redireciona para o painel.
- [x] Login com senha errada não cria sessão e mostra erro.
- [x] Conta desativada não consegue entrar.
- [x] Destino `next` interno é respeitado.
- [x] Destino `next` externo, como `https://exemplo.com`, é ignorado.
- [x] Usuário autenticado que acessa `/entrar` é redirecionado para o painel.
- [x] POST em `/sair` encerra a sessão, e GET retorna 405.