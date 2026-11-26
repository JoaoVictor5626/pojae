# Estado atual

Atualizado em: 2026-11-26

Este arquivo guarda apenas o que não está em outro lugar. Mantenha-o com cerca de 30 linhas e retire o que estiver resolvido. O status de cada documento fica no próprio documento, e o histórico fica no Git.

## Em andamento

Nada.

## Próximos passos

- Adicionar testes automatizados para a criação de candidaturas e validar o fluxo com PostgreSQL local.
- Definir critérios de compatibilidade, convênios, planos, entrevistas e avaliações antes de implementar as specs propostas.

## Pendências

- Antes de um deploy real (revisão OWASP de 2026-11-04):
  - Limitar tentativas de login e redefinição de senha antes de produção, conforme RS09.
  - Revisar a configuração de produção do Spring Boot, incluindo segurança de cookies e hosts permitidos, e resolver os avisos da verificação de configuração segura.
  - Registrar falhas de login e acessos negados, pois não há configuração de logging definida.
- Melhoria menor de segurança: adicionar CSP.
- O painel, o login, o perfil do estudante e o tema claro não foram conferidos no navegador depois das integrações/mudanças de estilo.
- Contas antigas não têm hash de senha; definir um fluxo de primeiro acesso para quem já estava cadastrado.
- A candidatura agora grava os dados e PDFs pelo backend; a spec 0006 segue proposta até os testes automatizados serem adicionados.
- Login e candidatura usam o mesmo host local do frontend na URL da API para que o navegador envie o cookie de sessão.
- A página inicial consulta `/session` e esconde os links de login no desktop e no menu mobile para sessões autenticadas.
- O painel da empresa foi ligado às vagas e candidaturas persistidas, com operações limitadas pela empresa da sessão; a spec 0007 segue proposta até os testes automatizados.
- O cadastro de vagas agora exige sessão de empresa e associa a vaga à empresa autenticada; o formulário mostra o nome dessa empresa.
- Os requisitos funcionais do PRD foram reorganizados para a plataforma de estágio, e as referências de autenticação, candidaturas e painel da empresa foram atualizadas.
- Os 14 requisitos não funcionais do PRD foram atualizados, mantendo localização, acessibilidade, segurança, desempenho, confiabilidade e prioridades.
- O PRD agora registra 12 requisitos de segurança com perigos e soluções relacionados aos requisitos funcionais.
- Os ADRs de autenticação e autorização foram realinhados ao PRD; propostas novas cobrem autorização, auditoria, documentos, notificações e recuperação de dados.
- A sessão informa o perfil autenticado para exibir somente o link de perfil correspondente no navbar da página inicial.
- As specs agora mapeiam os RFs/RSs do PRD; os fluxos ainda sem implementação foram separados em propostas e as specs editoriais antigas foram arquivadas.
- O dashboard do estudante carrega candidaturas e documentos do candidato autenticado pela API.
