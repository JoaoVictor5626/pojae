# Spec 0014: Recuperação de acesso e redefinição de senha

- **Status:** Proposto
- **Requisitos:** RF-23 do [PRD 0001](../prd/0001-pojae.md), RNF-06, RS09
- **Decisões:** [ADR 0005](../adr/0005-autenticacao-por-sessao-http.md), [ADR 0009](../adr/0009-canal-de-notificacoes.md)
- **Depende de:** [Spec 0002](0002-autenticacao.md), [Spec 0011](0011-notificacoes.md)

## Fluxo

1. O usuário informa identificador de conta ou canal previamente associado à conta.
2. A resposta inicial não revela se a conta existe.
3. Para conta elegível, o sistema gera mecanismo de redefinição aleatório, temporário e de uso único, e envia por canal verificado.
4. O usuário confirma a identidade e define senha nova; o token é invalidado após uso ou expiração.
5. O sistema armazena a nova senha como BCrypt, invalida sessões antigas e envia confirmação sem incluir a senha.

## Serviço e dados

O service valida token, prazo, uso único e conta, atualiza o hash e encerra sessões associadas. O token não é armazenado em texto puro; deve ter validade curta e nunca aparecer em logs, URLs de analytics ou respostas de listagem.

## Rotas propostas

| Rota | Método | Acesso |
|---|---|---|
| `/acesso/recuperacao` | POST | Público; solicita instruções sem revelar existência da conta |
| `/acesso/redefinicao` | POST | Público; token válido e senha nova |

## Decisões pendentes

Definir canal verificado (e-mail, telefone ou ambos), tempo de validade, limites de tentativas, critérios de senha e política de revogação de sessões. RS09 exige limitação de tentativas; esse limite deve ser decidido antes da implementação.

## Verificações

- [ ] Resposta não permite enumerar contas existentes.
- [ ] Token é aleatório, de uso único, expira e não é armazenado em texto puro.
- [ ] Token expirado, usado ou alterado não permite redefinir senha.
- [ ] Senha nova é armazenada com BCrypt e sessões anteriores são invalidadas.
- [ ] Tentativas de solicitação e confirmação são limitadas.
- [ ] Usuário recebe confirmação sem exposição de segredo.
