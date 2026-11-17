# Estado atual

Atualizado em: 2026-11-04

Este arquivo guarda apenas o que não está em outro lugar. Mantenha-o com cerca de 30 linhas e retire o que estiver resolvido. O status de cada documento fica no próprio documento, e o histórico fica no Git.

## Em andamento

Nada.

## Próximos passos

Nenhum definido.

## Pendências

- Antes de um deploy real (revisão OWASP de 2026-11-04):
  - Limitar tentativas de login e envios de comentário, que o PRD deixou fora do escopo.
  - Revisar a configuração de produção do Spring Boot, incluindo segurança de cookies e hosts permitidos, e resolver os avisos da verificação de configuração segura.
  - Registrar falhas de login e acessos negados, pois não há configuração de logging definida.
- Melhoria menor de segurança: adicionar CSP.
- As publicações iniciais usam "admin" como autor e têm todas a mesma data.
- O painel, o login e o tema claro não foram conferidos no navegador depois da mudança de estilo.