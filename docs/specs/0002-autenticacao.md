# Spec 0002: Autenticação e acesso por perfil

- **Status:** Proposto
- **Requisitos:** RF-22, RF-24, RNF-04, RNF-06 e RS09 do [PRD 0001](../prd/0001-pojae.md)
- **Decisões:** [ADR 0005](../adr/0005-autenticacao-por-sessao-http.md), [ADR 0006](../adr/0006-autorizacao-por-perfil-e-vinculo.md)
- **Depende de:** [Spec 0001](0001-fundacao.md)

## Identidade e credenciais

- Estagiários, empresas e instituições de ensino são contas distintas, com os campos comuns herdados de `Account`.
- O estagiário se identifica com CPF; empresas e instituições de ensino, com CNPJ.
- Senhas são armazenadas como hash BCrypt e comparadas por `PasswordEncoder`.
- A autenticação bem-sucedida cria uma sessão HTTP com o UUID e o perfil da conta. A sessão anterior é invalidada antes de criar uma nova.
- A implementação atual autentica estagiários e empresas. A autenticação de instituições de ensino ainda precisa ser integrada.

## Rotas

| Rota | Método | Acesso | Comportamento |
|---|---|---|---|
| `/login` | POST | Público | Valida documento e senha e cria sessão para a conta autenticada |
| `/session` | GET | Público | Retorna 200 quando há sessão válida e 401 quando não há |
| `/logout` | POST | Público | Invalida a sessão existente; sem sessão, não altera dados |

Credenciais inválidas devem produzir uma resposta genérica, sem informar se o CPF ou CNPJ existe. A sessão deve ser invalidada no logout.

## Autorização

- As rotas protegidas obtêm perfil e UUID da sessão, nunca de identificadores de conta enviados pelo navegador.
- Cada operação valida no servidor se o perfil e o vínculo da conta permitem consultar ou alterar o recurso.
- A empresa acessa somente vagas, candidaturas e documentos relacionados às suas vagas.
- O estagiário acessa somente seus dados e candidaturas.
- O acesso da instituição de ensino fica pendente até a integração desse perfil.

## Critérios de verificação

- [ ] Login válido para estagiário e empresa cria sessão com tipo e UUID corretos.
- [ ] Credenciais inválidas retornam mensagem genérica e não criam sessão.
- [ ] `/session` diferencia sessão válida e ausente.
- [ ] `/logout` invalida a sessão.
- [ ] Instituições de ensino autenticam com CNPJ e senha.
- [ ] Visitante e conta de outro perfil não acessam recursos protegidos.
- [ ] IDs de conta e recurso alterados pelo navegador não permitem acesso a dados de terceiros.
