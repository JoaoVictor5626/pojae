---
name: security-owasp
description: Segurança de aplicações com base no OWASP Top 10:2025, aplicada ao POJAE com Java e Spring Boot. Use ao criar ou revisar rotas, permissões, autenticação, formulários, consultas, tratamento de erros, configurações ou dependências, e ao fazer revisões de segurança.
---

# Segurança com o OWASP Top 10:2025

Referência: <https://top10.owasp.org/2025/>. Quando houver conflito, `docs/architecture.md` prevalece sobre esta skill. Esta lista é um ponto de partida para revisão, não uma garantia de que a aplicação está segura.

## A01: Controle de acesso quebrado

- Verifique no service se o usuário tem direito ao objeto, e não apenas se está autenticado.
- Filtre pelo dono na própria consulta, como em `OportunidadeService.obterDoAutor`, e responda 404 para que ninguém descubra se o objeto de outra pessoa existe.
- Altere dados apenas com POST e proteção CSRF do Spring Security. Não desative a proteção CSRF.
- Valide redirecionamentos vindos do usuário restringindo o destino apenas a caminhos relativos internos (bloqueando URLs absolutas com esquema/domínio externo) e utilizando `UriComponentsBuilder` para higienizar o path.
- Declare os campos permitidos nos DTOs de entrada, para que um formulário não permita alterar `status`, `autor` ou `aprovado`.
- Teste as rotas protegidas com visitante, dono e outro usuário.

## A02: Configuração insegura

- Leia segredos de variáveis de ambiente, como `[ADAPTAR: nome da variável de ambiente para o segredo de aplicação do POJAE]`. Nunca os coloque no código nem no Git.
- Fora do desenvolvimento, desative configurações de depuração, restrinja os hosts permitidos e ative cookies seguros, HTTPS e HSTS.
- Rode `[ADAPTAR: comando de verificação de configuração segura do Spring Boot]` antes de qualquer deploy.
- Mantenha as configurações de segurança e proteção contra CSRF e clickjacking.

## A03: Falhas na cadeia de suprimentos de software

- Adicione uma dependência só quando for necessária e confira nome, origem e manutenção do pacote.
- Fixe as versões em um arquivo versionado e procure vulnerabilidades conhecidas, por exemplo com `[ADAPTAR: ferramenta de análise de vulnerabilidades para dependências Maven ou Gradle]`.
- Não execute scripts baixados sem antes ler o que fazem.

## A04: Falhas criptográficas

- Use o sistema de senhas do Spring Security (`PasswordEncoder`). Não armazene nem compare senhas por conta própria.
- Use `SecureRandom` para gerar valores secretos, nunca `Random`.
- Não crie algoritmos próprios de criptografia nem de assinatura.

## A05: Injeção

- Prefira Spring Data JPA. Em SQL bruto, passe valores como parâmetros, sem interpolar texto.
- Mantenha o escaping automático dos templates HTML. Não desative o escaping em conteúdo enviado por usuários ([ADR 0003](../../../docs/adr/0003-conteudo-em-texto-puro.md)).
- Não use execução dinâmica de código nem comandos de shell com dados externos.
- Teste a exibição de conteúdo com `<script>`.

## A06: Design inseguro

- Identifique abusos possíveis ainda na spec: quem pode fazer o quê, com que limite e o que acontece em caso de erro.
- Proteja invariantes no banco com constraints, além das validações no código.
- Registre na spec e no PRD os riscos aceitos.

## A07: Falhas de autenticação

- Use Spring Security, `PasswordEncoder` e as configurações de autenticação do projeto.
- Não revele nas mensagens de erro se um usuário existe.
- Encerre a sessão apenas com POST.
- Trate a falta de limite de tentativas de login como risco a resolver antes de um deploy real.

## A08: Falhas de integridade de software ou dados

- Não desserialize dados não confiáveis com `[ADAPTAR: mecanismo Java de desserialização segura ou alternativa adotada pelo POJAE]`.
- Grave pelos services, para que nenhum caminho ignore as regras. Por isso, o painel administrativo bloqueia a escrita nas entidades cujas regras dependem dos services.
- Não carregue scripts de CDN sem necessidade. Se precisar, use `integrity` (SRI).

## A09: Falhas de registro e alerta de segurança

- Registre eventos relevantes, como falhas de login e negações de acesso, sem depender de `System.out.println`.
- Não registre senhas, tokens, chaves de sessão nem dados pessoais desnecessários.
- Neutralize quebras de linha em valores enviados por usuários antes de registrá-los.

## A10: Tratamento incorreto de condições excepcionais

- Capture a exceção mais específica. Não ignore erros com blocos `catch` vazios.
- Falhe de forma segura: em caso de erro, negue o acesso e não deixe a operação pela metade. Use transações do Spring (`@Transactional`) em escritas dependentes.
- Não mostre rastreamentos nem detalhes internos a visitantes. Converta exceções de domínio em respostas HTTP no controller.
- Teste entradas inválidas, valores nos limites e recursos inexistentes.

## Ao revisar

Para cada problema, informe a categoria, o arquivo e a linha, o cenário de exploração e a correção. Não relate riscos hipotéticos como se fossem falhas confirmadas.