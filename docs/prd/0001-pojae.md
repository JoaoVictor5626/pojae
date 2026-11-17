# PRD 0001: Plataforma de Oportunidades para Jovens Aprendizes e Estagiários (POJAE)

- **Status:** Aceito
- **Data:** 2026-11-04
- **Especificações:** [fundação](../specs/0001-fundacao.md), [autenticação](../specs/0002-autenticacao.md), [oportunidades](../specs/0003-oportunidades.md), [comentários](../specs/0004-comentarios.md), [publicações iniciais](../specs/0005-publicacoes-iniciais.md)

## Objetivo

Conectar estudantes a oportunidades de aprendizagem e estágio por meio de uma plataforma desenvolvida para o CESMAC, com foco em impacto social.

## Perfis de uso

| Perfil | Quem é | O que precisa fazer |
|---|---|---|
| Estudante | Estudante que busca oportunidades | Consultar oportunidades disponíveis e enviar comentários |
| Autor | Usuário com conta | Criar, editar, publicar e excluir as próprias oportunidades |
| Administrador | Usuário com perfil administrativo | Criar contas e moderar comentários no painel administrativo |

## Requisitos funcionais

### Leitura

- **RF-01:** A página inicial lista as oportunidades publicadas, da mais recente para a mais antiga.
- **RF-02:** A listagem mostra 10 oportunidades por página, com título, autor, data de publicação e um trecho do conteúdo.
- **RF-03:** Cada oportunidade publicada tem uma página própria, com URL legível baseada no título.
- **RF-04:** Rascunhos não aparecem na listagem pública, e o acesso direto à URL deles retorna 404.

### Autoria

- **RF-05:** O autor entra e sai do sistema com usuário e senha.
- **RF-06:** O autor tem um painel com todas as suas oportunidades, rascunhos e publicadas.
- **RF-07:** O autor cria oportunidades com título e conteúdo. Toda oportunidade nova começa como rascunho.
- **RF-08:** O autor edita as próprias oportunidades. A URL pública continua a mesma quando o título muda.
- **RF-09:** O autor publica um rascunho e pode voltar uma oportunidade publicada para rascunho.
- **RF-10:** O autor exclui as próprias oportunidades depois de confirmar a ação.
- **RF-11:** O autor não acessa nem altera oportunidades de outros autores.

### Comentários

- **RF-12:** O estudante comenta em oportunidades publicadas informando nome e texto.
- **RF-13:** O comentário só aparece na página depois de aprovado por um administrador.
- **RF-14:** O administrador aprova e exclui comentários no painel administrativo.

### Administração

- **RF-15:** O administrador cria e desativa contas de autores no painel administrativo.

## Requisitos não funcionais

- **RNF-01 (arquitetura):** O código segue as regras de [`docs/architecture.md`](../architecture.md).
- **RNF-02 (segurança):** Toda alteração de dados usa POST com proteção CSRF, e o conteúdo enviado por usuários é sempre escapado na exibição.
- **RNF-03 (interface):** As páginas são renderizadas no servidor, em português do Brasil, com HTML semântico e legíveis em telas de celular e computador.
- **RNF-04 (qualidade):** Cada requisito funcional tem pelo menos um teste automatizado, e os testes JUnit e Mockito passam por completo.

## Fora do escopo desta versão

- Cadastro público de contas e recuperação de senha pela interface da plataforma
- Categorias, tags, busca e feed RSS
- Editor visual, Markdown e envio de imagens ([ADR 0003](../adr/0003-conteudo-em-texto-puro.md))
- Agendamento de publicação e pré-visualização do rascunho na página pública
- Respostas a comentários e notificações por e-mail
- Limite de tentativas de login e proteção automática contra spam
- API REST e deploy em produção

## Critérios de conclusão

1. Um autor consegue fazer o ciclo completo pelo navegador: entrar, criar um rascunho, publicar, editar, voltar para rascunho e excluir.
2. Um estudante consegue consultar uma oportunidade e enviar um comentário, que só aparece depois da aprovação no painel administrativo.
3. Todos os requisitos funcionais têm testes, e a suíte passa.
4. O teste de arquitetura da [especificação de fundação](../specs/0001-fundacao.md) passa.