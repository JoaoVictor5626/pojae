# PRD 0001: Plataforma de Oportunidades para Jovens Aprendizes e Estagiários (POJAE)

- **Status:** Aceito
- **Data:** 2026-11-04
- **Especificações:** [fundação](../specs/0001-fundacao.md), [autenticação](../specs/0002-autenticacao.md), [oportunidades](../specs/0003-oportunidades.md), [comentários](../specs/0004-comentarios.md), [publicações iniciais](../specs/0005-publicacoes-iniciais.md), [candidaturas](../specs/0006-candidaturas.md), [painel da empresa](../specs/0007-painel-empresa.md)

## Objetivo

Conectar estudantes a oportunidades de aprendizagem e estágio por meio de uma plataforma desenvolvida para o CESMAC, com foco em impacto social.

## Perfis de uso

| Perfil | Quem é | O que precisa fazer |
|---|---|---|
| Estudante | Estudante que busca oportunidades | Consultar oportunidades disponíveis e enviar comentários |
| Autor | Usuário com conta | Criar, editar, publicar e excluir as próprias oportunidades |
| Administrador | Usuário com perfil administrativo | Criar contas e moderar comentários no painel administrativo |

## Requisitos funcionais

### Cadastro e oportunidades

- **RF-01 – Cadastro de Estagiários:** O sistema permite cadastrar estagiários.
- **RF-02 – Cadastro de Empresas:** O sistema permite cadastrar empresas.
- **RF-03 – Cadastro de Instituições de Ensino:** O sistema permite cadastrar instituições de ensino.
- **RF-04 – Ofertas de Vagas:** O sistema permite que empresas ofereçam vagas.
- **RF-05 – Permitir Candidatura:** O sistema permite que estagiários se candidatem a vagas.
- **RF-06 – Acompanhamento de Vagas pela Empresa:** A empresa acompanha suas vagas.
- **RF-07 – Visualização de Candidatos e Candidaturas pela Empresa:** A empresa visualiza candidatos e candidaturas às suas vagas.
- **RF-08 – Acompanhamento da Candidatura pelo Candidato:** O estagiário acompanha suas candidaturas.
- **RF-09 – Cadastro de Convênio entre Empresa e Instituição de Ensino:** O sistema permite cadastrar convênios entre empresas e instituições de ensino.
- **RF-10 – Validação do Estagiário pela Instituição de Ensino:** A instituição de ensino valida estagiários.
- **RF-11 – Avaliação do Estágio:** O sistema permite avaliar estágios.
- **RF-12 – Notificação de Vaga:** O sistema notifica usuários sobre vagas.
- **RF-13 – Envio de Currículo e Histórico Escolar:** O estagiário envia currículo e histórico escolar.
- **RF-14 – Recomendações de Vagas Compatíveis com o Perfil do Estagiário:** O sistema recomenda vagas compatíveis com o perfil do estagiário.
- **RF-15 – Salvamento de Vagas:** O estagiário salva vagas.
- **RF-16 – Cancelamento de Candidatura pelo Estagiário:** O estagiário cancela uma candidatura.
- **RF-17 – Agendamento de Entrevistas com Candidatos:** A empresa agenda entrevistas com candidatos.
- **RF-18 – Confirmação ou Recusa de Entrevista pelo Candidato:** O candidato confirma ou recusa uma entrevista.
- **RF-19 – Notificar os Usuários sobre Entrevistas e Prazos Importantes:** O sistema notifica usuários sobre entrevistas e prazos importantes.
- **RF-20 – Registro da Aprovação do Plano de Atividades do Estágio:** O sistema registra a aprovação do plano de atividades do estágio.
- **RF-21 – Aprovação do Estágio pela Instituição de Ensino:** A instituição de ensino aprova o estágio.
- **RF-22 – Autenticação de Usuários:** O sistema autentica usuários.
- **RF-23 – Recuperação de Acesso por Redefinição de Senha:** O usuário recupera o acesso redefinindo a senha.
- **RF-24 – Visualização e Utilização de Funcionalidades por Perfil:** O sistema apresenta e permite utilizar funcionalidades conforme o perfil do usuário.

## Requisitos não funcionais

- **RNF-01 — Requisito organizacional: abrangência geográfica (Essencial):** A plataforma deverá atender oportunidades de estágio localizadas em **Maceió/AL**. A localização deverá ser considerada no cadastro, na pesquisa e nas recomendações de vagas.
- **RNF-02 — Requisito de produto: facilidade de uso (Importante):** A interface deverá ser intuitiva para estagiários, empresas e instituições de ensino. Campos e funcionalidades deverão apresentar instruções claras, com termos adequados a cada perfil.
- **RNF-03 — Requisito de produto: facilidade de uso (Importante):** As principais páginas e funcionalidades deverão ser utilizáveis por pessoas com deficiência, incluindo navegação por teclado, identificação de campos e mensagens compreensíveis.
- **RNF-04 — Requisito externo: segurança (Essencial):** O acesso deverá exigir autenticação. As funcionalidades e informações disponíveis deverão respeitar o perfil do usuário, conforme **RF-22** e **RF-24**.
- **RNF-05 — Requisito externo: privacidade (Essencial):** Dados pessoais, currículos e históricos escolares deverão ser acessíveis somente a usuários autorizados e protegidos contra divulgação ou acesso indevido.
- **RNF-06 — Requisito externo: segurança (Essencial):** As senhas deverão ser armazenadas de forma segura. A redefinição de senha deverá usar um mecanismo que confirme a identidade do usuário antes de permitir a alteração.
- **RNF-07 — Requisito de produto: desempenho (Importante):** Em condições normais de uso, as páginas e operações principais (como pesquisar vagas, consultar candidaturas e abrir perfis) deverão responder em até **3 segundos**.
- **RNF-08 — Requisito de produto: confiabilidade (Importante):** A plataforma deverá permanecer disponível para uso, exceto durante manutenções programadas. Interrupções previstas deverão ser comunicadas com antecedência.
- **RNF-09 — Requisito de produto: portabilidade (Importante):** A plataforma deverá funcionar nos navegadores atuais de uso comum e adaptar-se a computadores, tablets e celulares.
- **RNF-10 — Requisito de produto: confiabilidade (Importante):** Notificações de vagas, entrevistas e prazos deverão ser enviadas ao canal definido para o sistema e apresentar informações suficientes para identificar o assunto e a ação necessária.
- **RNF-11 — Requisito de produto: confiabilidade (Essencial):** O sistema deverá validar os dados cadastrados e enviados, prevenir duplicidades quando aplicável e informar claramente quando houver campos inválidos ou obrigatórios não preenchidos.
- **RNF-12 — Requisito organizacional: confiabilidade (Importante):** O sistema deverá registrar alterações relevantes em candidaturas, entrevistas, aprovações e avaliações, identificando o usuário responsável e a data e hora da ação.
- **RNF-13 — Requisito de produto: confiabilidade (Essencial):** Os dados deverão ter cópias de segurança periódicas, com procedimento para recuperação em caso de falha.
- **RNF-14 — Requisito de produto: facilidade de uso (Importante):** Quando uma ação não puder ser concluída, o sistema deverá apresentar uma mensagem clara, informar o que ocorreu e orientar o usuário sobre como corrigir o problema, quando possível.

## Requisitos de segurança

### RS01

**Perigo:** Nos RF-01, RF-02 e RF-03, uma pessoa pode consultar ou alterar cadastros de estagiários, empresas ou instituições sem autorização, ou acessar um registro ao conhecer seu identificador ou documento.

**Soluções:**

1. O sistema deve verificar a identidade do usuário e seu vínculo com o cadastro antes de permitir consultas ou alterações.
2. CPF e CNPJ podem ser usados para localizar e validar cadastros, mas não devem, sozinhos, conceder acesso.
3. As operações devem validar as permissões no servidor e registrar o usuário responsável, a ação, a data e a hora.

### RS02

**Perigo:** Nos RF-05, RF-08 e RF-16, um estagiário pode consultar ou cancelar a candidatura de outra pessoa ao informar ou alterar o identificador da candidatura.

**Soluções:**

1. O sistema deve associar cada candidatura ao identificador interno do estagiário autenticado e retornar somente as candidaturas desse usuário.
2. O acesso deve validar o vínculo entre o usuário, a candidatura e a vaga em cada solicitação, inclusive quando for informado um identificador válido.
3. O estagiário poderá cancelar somente a própria candidatura e quando o processo seletivo permitir. O cancelamento deve ser registrado no histórico, sem apagar a candidatura.

### RS03

**Perigo:** Nos RF-04, RF-06 e RF-07, um usuário pode publicar ou alterar vagas, acompanhar vagas ou consultar candidatos de uma empresa à qual não está vinculado.

**Soluções:**

1. Somente usuários autorizados e vinculados à empresa responsável poderão cadastrar, publicar, alterar, suspender ou encerrar suas vagas.
2. A empresa poderá visualizar candidatos e candidaturas somente das vagas vinculadas ao seu cadastro.
3. A autorização deve ser verificada no servidor para cada operação, não apenas na tela da aplicação.
4. As alterações de vagas e candidaturas devem manter registro do usuário responsável, da operação e da data e hora.

### RS04

**Perigo:** Nos RF-01, RF-05 e RF-13, currículos, históricos escolares e outros documentos podem ser acessados por usuários sem permissão ou enviados em formato inadequado.

**Soluções:**

1. O sistema deve validar os tipos e tamanhos de arquivo aceitos e associar cada documento ao estagiário e à candidatura correspondentes.
2. Os documentos não devem ter acesso público direto. A consulta ou o download deve exigir autenticação e validação de permissão.
3. Empresas poderão acessar documentos de candidatos somente quando estes tiverem se candidatado a uma vaga da empresa e o usuário tiver autorização adequada.
4. Quando necessário ao processo seletivo, o sistema deve preservar a versão enviada e registrar autor e data de envio.

### RS05

**Perigo:** Nos RF-03, RF-10, RF-20 e RF-21, uma pessoa pode validar o cadastro de um estagiário ou aprovar um plano de atividades ou estágio em nome da instituição de ensino sem estar autorizada.

**Soluções:**

1. Somente usuários autenticados e autorizados pela instituição relacionada poderão validar cadastros ou registrar aprovações.
2. O sistema deve verificar o vínculo do usuário com a instituição e sua permissão para a ação solicitada.
3. Cada validação ou aprovação deve registrar o responsável, a decisão, a data e a hora, além de justificativa quando exigida pelo fluxo.
4. O sistema deve preservar o histórico das decisões e impedir que uma aprovação seja atribuída a outra pessoa sem autorização delegada.

### RS06

**Perigo:** Nos RF-09, RF-11 e RF-20, dados de convênios, avaliações e planos de atividades podem ser consultados ou alterados por participantes que não fazem parte do processo ou não têm permissão para aquela ação.

**Soluções:**

1. O acesso deve respeitar os vínculos entre empresa, instituição, vaga, candidatura e avaliador.
2. Somente usuários autorizados poderão criar, consultar, alterar ou aprovar convênios, avaliações e planos de atividades.
3. O sistema deve distinguir informações internas de informações compartilhadas entre empresa, instituição, avaliador e estagiário, exibindo cada conteúdo somente ao público autorizado.
4. Correções em registros enviados ou concluídos devem preservar a versão anterior, o responsável, a data e a hora, e a justificativa quando exigida.

### RS07

**Perigo:** Nos RF-12, RF-14 e RF-19, notificações sobre vagas, recomendações, entrevistas ou prazos podem ser enviadas ao destinatário incorreto ou revelar dados pessoais a terceiros.

**Soluções:**

1. O sistema deve confirmar a identidade e o destinatário antes de enviar notificações, usando os dados de contato associados à conta.
2. As mensagens devem conter apenas as informações necessárias e não devem expor documentos, dados pessoais sensíveis ou informações de outros candidatos.
3. Recomendações de vagas devem ser apresentadas ao próprio estagiário autenticado e considerar apenas os dados de perfil aos quais o sistema está autorizado a ter acesso.
4. O sistema deve registrar o envio e o resultado da notificação, sem permitir que um usuário consulte notificações de outra pessoa sem permissão.

### RS08

**Perigo:** Nos RF-17 e RF-18, um usuário pode agendar, alterar ou responder a uma entrevista em nome de outra empresa ou candidato.

**Soluções:**

1. Somente usuários autorizados da empresa responsável pela vaga poderão agendar ou alterar entrevistas com seus candidatos.
2. O candidato poderá confirmar ou recusar somente entrevistas associadas às próprias candidaturas.
3. O sistema deve validar o vínculo entre entrevista, vaga, empresa e candidatura antes de permitir qualquer operação.
4. O agendamento, as alterações e a resposta do candidato devem ser registrados com responsável, data e hora.

### RS09

**Perigo:** Nos RF-22 e RF-23, terceiros podem acessar contas de usuários por tentativa de adivinhar credenciais ou abusar do processo de redefinição de senha.

**Soluções:**

1. O sistema deve exigir autenticação antes de liberar funcionalidades protegidas e armazenar senhas de forma segura, sem mantê-las em texto legível.
2. O processo de redefinição deve usar um mecanismo temporário, de uso único e enviado por um canal de contato previamente associado à conta.
3. O sistema deve limitar tentativas inválidas de autenticação e de redefinição e registrar eventos relevantes para auditoria.
4. Após a redefinição, o mecanismo temporário deve perder a validade e o usuário deve receber uma confirmação da alteração.

### RS10

**Perigo:** No RF-24, usuários podem visualizar ou utilizar funcionalidades incompatíveis com seu perfil, como acessar dados administrativos ou executar ações destinadas a empresas ou instituições.

**Soluções:**

1. O sistema deve associar cada conta a um perfil e conceder somente as permissões necessárias às suas funções.
2. A permissão deve ser verificada em todas as operações protegidas, inclusive consultas, alterações, aprovações e cancelamentos.
3. A interface deve apresentar as funcionalidades permitidas ao usuário, e o servidor deve impedir operações não autorizadas mesmo que sejam solicitadas diretamente.

### RS11

**Perigo:** Nos RF-04 a RF-21, vínculos incorretos ou dados inconsistentes podem associar uma vaga, candidatura, entrevista, convênio, avaliação ou aprovação a outro candidato, empresa ou instituição.

**Soluções:**

1. O sistema deve validar os vínculos entre os registros antes de permitir sua criação ou alteração.
2. Uma candidatura deve estar vinculada a um único estagiário e a uma única vaga, e o sistema deve impedir duplicidades conforme as regras do processo seletivo.
3. Convênios, avaliações, entrevistas e aprovações devem ser associados somente a registros compatíveis e existentes.
4. Alterações de status devem respeitar as transições permitidas para cada processo e manter o histórico, sem apagar registros relacionados.

### RS012

**Perigo:** Nos RF-04 a RF-21, operações importantes podem ser realizadas sem que seja possível identificar quem fez a alteração, dificultando a análise de erros ou acessos indevidos.

**Soluções:**

1. O sistema deve registrar operações relevantes, incluindo consultas restritas quando exigido, alterações, publicações, aprovações, cancelamentos e mudanças de status.
2. Os registros devem conter o usuário responsável, a ação realizada e a data e hora; quando aplicável, também devem conter os valores anteriores e novos.
3. Vagas, candidaturas, convênios, avaliações e históricos que precisem ser preservados não devem ser apagados fisicamente. Encerramentos, cancelamentos e inativações devem ser registrados como mudanças de situação.
4. O acesso aos registros de auditoria deve ser restrito a usuários autorizados.

## Fora do escopo desta versão

- Cadastro público de contas
- Categorias, tags e feed RSS
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
