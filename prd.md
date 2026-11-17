POJAE

## Documento de Requisitos

PLATAFORMA DE OPORTUNIDADES PARA JOVENS APRENDIZES E ESTAGIÁRIOS

POJAE


## Sumário


## 1. Introdução

Este documento especifica os requisitos do sistema Plataforma de Oportunidades para Jovens Aprendizes e Estagiários (POJAE), fornecendo aos desenvolvedores as informações necessárias para o projeto e implementação, assim como para a realização dos testes e homologação do sistema.

## 1.1 Visão geral do documento

Além desta seção introdutória, as seções seguintes estão organizadas como descrito abaixo.

- 1. Seção 2 – Descrição geral do sistema: apresenta uma visão geral do sistema, caracterizando qual é o seu escopo e descrevendo seus usuários.

- 2. Seção 3 – Requisitos funcionais (casos de uso): especifica todos os casos de uso do sistema, descrevendo os fluxos de eventos, prioridades, atores, entradas e saídas de cada caso de uso a ser implementado.

- 3. Seção 4 – Requisitos não-funcionais: especifica todos os requisitos não funcionais do sistema, divididos em requisitos de usabilidade, confiabilidade, desempenho, segurança, distribuição, adequação a padrões e requisitos de hardware e software.

- 4. Seção 5 – Matriz de rastreabilidade: registra a ligação dos requisitos dependentes;

- 5. Seção 6 – Requisitos de Segurança: especifica todos os requisitos de segurança relacionados aos requisitos funcionais e não funcionais;

- 6. Seção 7 – Matriz de Avaliação de Risco: registra os riscos de uma falha de requisito;

- 7. Seção 8 – Referências: apresenta referências para outros documentos utilizados para a confecção deste documento.

## 1.2 Convenções, termos e abreviações

A correta interpretação deste documento exige o conhecimento de algumas convenções e termos específicos, que são descritos a seguir.

## 1.2.1 Identificação dos requisitos

Por convenção, a referência a requisitos é feita através do nome da subseção onde eles estão descritos, seguidos do identificador do requisito, de acordo com a especificação a seguir: [nome da subseção. identificador do requisito], Por exemplo, o requisito funcional [Recuperação de dados.RF016] deve estar descrito em uma subseção chamada “Recuperação de dados”, em um bloco identificado pelo número [RF016]. Já o requisito não-funcional [Confiabilidade.NF008] deve estar descrito na seção de requisitos não-funcionais de Confiabilidade, em um bloco identificado por [NF008]. [RS001] trata dos requisitos de segurança

Os requisitos devem ser identificados com um identificador único. A numeração inicia com o identificador [RF001], [NF001] ou [RS001] e prossegue sendo incrementada à medida que forem surgindo novos requisitos.

## 1.2.2 Prioridades dos requisitos

Para estabelecer a prioridade dos requisitos, nas seções 4 e 5, foram adotadas as denominações “essencial”, “importante” e “desejável”.


- 8. Essencial é o requisito sem o qual o sistema não entra em funcionamento. Requisitos essenciais são requisitos imprescindíveis, que têm que ser implementados impreterivelmente.

- 9. Importante é o requisito sem o qual o sistema entra em funcionamento, mas de forma não satisfatória. Requisitos importantes devem ser implementados, mas, se não forem, o sistema poderá ser implantado e usado mesmo assim.

- 10. Desejável é o requisito que não compromete as funcionalidades básicas do sistema, isto é, o sistema pode funcionar de forma satisfatória sem ele. Requisitos desejáveis podem ser deixados para versões posteriores do sistema, caso não haja tempo hábil para implementá- los na versão que está sendo especificada.

## 2. Descrição geral do sistema

## 2.1 Abrangência e sistemas relacionados

O Sistema POJAE (Plataforma de Oportunidades para Jovens Aprendizes e Estagiários) tem como objetivo conectar jovens em busca de oportunidades de aprendizagem profissional e estágio às empresas que desejam divulgar vagas e encontrar candidatos. A plataforma permitirá que os jovens realizem seu cadastro, preencham suas informações pessoais e profissionais, consultem as vagas disponíveis e se candidatem àquelas que correspondam ao seu perfil e interesse.

As empresas poderão realizar seu cadastro na plataforma, disponibilizar informações sobre suas organizações, publicar vagas de aprendizagem profissional e estágio, além de consultar os candidatos inscritos em suas oportunidades. As vagas deverão apresentar informações relevantes, como descrição das atividades, requisitos, modalidade, localização e critérios necessários para a candidatura.

O sistema será direcionado principalmente a dois tipos de usuários: jovens que buscam ingressar no mercado de trabalho por meio de programas de aprendizagem ou estágio e empresas interessadas em divulgar oportunidades e selecionar candidatos. A plataforma deverá oferecer uma interface simples e intuitiva, facilitando o acesso às funcionalidades e tornando o processo de busca e divulgação de vagas mais organizado.

O POJAE também deverá considerar as regras aplicáveis às modalidades de contratação, especialmente os critérios de idade para vagas de aprendizagem profissional, além de garantir a validação das informações cadastradas e a proteção dos dados dos usuários.

Dessa forma, o sistema busca centralizar as oportunidades de aprendizagem e estágio em um único ambiente digital, facilitando a aproximação entre jovens e empresas, contribuindo para a inserção profissional dos estudantes e tornando o processo de divulgação e candidatura às vagas mais acessível e eficiente.


## 3. Requisitos funcionais (casos de uso)

## Requisito

## Descrição

Requisito responsável pelo cadastro dos dados do estagiário, vinculando-o à instituição de ensino e ao curso, e pelo registro de suas habilidades.

## RF001 -

Cadastro de Estagiários

## Cadastro de Estagiários:

Nome: String;

CPF: String; (xxx.xxx.xxx-xx)1

E-mail: String;2

Telefone: String; (xx)xxxxx-xxxx3

CEP: String; (xxxxx-xxx)4

Endereço: String;

Número: String;5

Bairro: String;

Cidade: String; (Maceió)6

Estado: String; (AL)6

Instituição de Ensino: Integer;7

Nome do Curso: String;8

Série/Período: String;

Turno: String; (Matutino, Vespertino, Noturno ou Integral)

Conclusão Prevista do Curso: Date; (MM/AAAA)9

Status: Integer;10

## Cadastro de Habilidades do Estagiário:

Tipo de Habilidade: Integer;11

Habilidade: String;11

Nível de Proficiência: Integer;12

Observações: String;13

## Regras e observações do preenchimento dos campos:

- 1 O CPF deverá ser validado por seus dígitos verificadores e não poderá estar duplicado no cadastro de estagiários.

- 2 O e-mail deverá ser informado no formato válido, contendo nome de usuário, o caractere @ e domínio. Não deverá conter espaços e deverá respeitar o limite de caracteres definido pelo sistema.

- 3 O telefone deverá conter DDD e número válido, aceitando telefone fixo ou celular.

- 4 Ao informar um CEP válido, o sistema deverá preencher automaticamente o logradouro e o bairro, quando disponíveis através do webservice ViaCEP. Caso a consulta não esteja disponível ou não retorne esses dados, eles poderão ser preenchidos manualmente.

- 5 O número do endereço deverá ser informado manualmente e poderá ser editado pelo usuário.


6 A cidade deverá ser fixa como Maceió, e o estado deverá ser fixo como AL. Esses campos não poderão ser alterados pelo usuário.

- 7 A instituição de ensino deverá ser selecionada entre as instituições cadastradas e ativas. O campo deverá armazenar o código identificador da instituição.

- 8 O nome do curso deverá ser informado pelo estagiário. O campo será de preenchimento obrigatório.

- 9 A conclusão prevista do curso deverá indicar mês e ano. O sistema deverá armazenar a data usando o primeiro dia do mês correspondente e exibi-la no formato MM/AAAA.

- 10 O status deverá indicar se o cadastro está ativo ou inativo. Os valores deverão ser mantidos em módulo configurável, e as alterações de status deverão preservar o histórico do registro.

- 11 O tipo de habilidade deverá ser selecionado de uma lista configurável, como idioma, ferramenta/tecnologia, certificação ou área de interesse. A habilidade será informada em texto.

- 12 O nível de proficiência deverá corresponder a um valor disponível para o tipo de habilidade selecionado, como básico, intermediário, avançado ou fluente. Para habilidades em que proficiência não se aplique, o preenchimento poderá ser dispensado.

- 13 As observações serão opcionais e deverão respeitar o limite de caracteres definido pelo sistema.

Obs1: Um estagiário poderá possuir várias habilidades, e uma mesma habilidade poderá estar vinculada a vários estagiários. O sistema deverá impedir que a mesma habilidade seja cadastrada mais de uma vez para o mesmo estagiário.

## Alteração:

A alteração será permitida somente a usuário com nível de acesso autorizado. O sistema deverá manter o histórico das operações, informando o usuário responsável, os dados alterados, os valores anteriores e novos, a data e a hora. Alterações em habilidades também deverão ser registradas.

## Exclusão:

Não será realizada exclusão física do cadastro do estagiário. O registro poderá ser marcado como inativo por meio do campo Status, mantendo seu histórico. A remoção de uma habilidade deverá desfazer sua associação com o estagiário sem apagar o histórico da operação.

## Pesquisa:

Será permitido pesquisar por CPF, nome, e-mail, telefone, instituição de ensino, curso, série/período, turno, status, tipo de habilidade, habilidade e nível de proficiência. Deverá ser possível combinar filtros na mesma pesquisa.


| RF002 - Cadastro de Empresas | Requisito responsável pelo cadastro das empresas que anunciarão vagas às quais os estagiários poderão se candidatar. Cadastro de Empresas: Nome: String;1 CNPJ: String; (xx.xxx.xxx/xxxx-xx)2 E-mail: String;3 Telefone: String; (xx)xxxxx-xxxx4 Site: String;5 CEP: String; (xxxxx-xxx)6 Endereço: String; Número: String;7 Bairro: String; Cidade: String; (Maceió)8 Estado: String; (AL)8 Status: Integer;11 Cadastro de Supervisor de Estágio: Nome do Supervisor de Estágio: String;1 CPF do Supervisor de Estágio: String; (xxx.xxx.xxx-xx)10 Cargo do Supervisor de Estágio: String;1 Cadastro de Representante: Nome do Representante: String;1 Cargo do Representante: String;1 Regras e observações do preenchimento dos campos: 1 O nome e cargos deverá ser informado em texto, sem espaços excedentes no início ou no fim, e respeitar o limite de caracteres definido pelo sistema. 2 O CNPJ deverá ser informado no formato indicado, validado por seus dígitos verificadores e não poderá estar duplicado no cadastro de empresas. 3 O e-mail deverá ser informado em formato válido, contendo nome de usuário, o caractere @ e domínio. Não deverá conter espaços e deverá respeitar o limite de caracteres definido pelo sistema. 4 O telefone deverá conter DDD e número válido, aceitando telefone fixo ou celular. 5 O site será opcional e, quando informado, deverá conter um endereço válido, com protocolo ou domínio reconhecível, e respeitar o limite de caracteres definido pelo sistema. 6 Ao informar um CEP válido, o sistema deverá preencher automaticamente o logradouro, o bairro, a cidade e o estado, quando disponíveis através do webservice ViaCEP. Caso a consulta não esteja disponível ou não retorne esses dados, eles poderão ser preenchidos manualmente. 7 O número do endereço deverá ser informado manualmente e poderá conter caracteres alfanuméricos, como “S/N”. |
| --- | --- |


- 8 A cidade deverá ser fixa como Maceió, e o estado deverá ser fixo como AL. Esses campos não poderão ser alterados pelo usuário.

9 O CPF do Supervisor de Estágio deverá ser informado no formato indicado e validado por seus dígitos verificadores. O documento será obrigatório quando a empresa oferecer vagas de estágio, e não poderá ser duplicado para o mesmo supervisor dentro do cadastro da empresa.

10 O status deverá indicar se o cadastro da empresa. Os valores deverão ser mantidos em módulo configurável, e as alterações de status deverão preservar o histórico do registro.

## Alteração:

A alteração será permitida somente a usuário com nível de acesso autorizado. O sistema deverá manter o histórico das operações, informando o usuário responsável, os dados alterados, os valores anteriores e novos, a data e a hora.

## Exclusão:

Não será realizada exclusão física do cadastro da empresa. O registro poderá ser marcado como inativo por meio do campo Status, mantendo seu histórico.

## Pesquisa:

Será permitido pesquisar pelos campos cadastrados da empresa, incluindo razão social, nome fantasia, CNPJ, e-mails, telefones, CEP, endereço, cidade, estado, responsável pelo contato, supervisor de estágio, CPF do supervisor,

representante e status. Deverá ser possível combinar filtros na mesma pesquisa.


Requisito responsável pelo cadastramento da instituição de ensino e de seus representantes e professores orientadores.

## RF003 – Cadastro de Instituiçõe s de Ensino

## Cadastro de Instituições de Ensino:

Nome: String;

CNPJ: String; (xx.xxx.xxx/xxxx-xx)¹, ⁶

Telefone: String; (xx)xxxxx-xxxx

E-mail: String;

Tipo de Instituição: Integer;² (Escola, Escola Técnica, Faculdade)

CEP: String; (xxxxx-xxx)⁵

Endereço: String⁴, ⁶

Número: String;

Bairro: String;

Cidade: String; (Maceió)

Estado: String; (AL)

## Cadastro de Professor Orientador:

Nome do Professor Orientador: String;

CPF do Professor Orientador: String; (xxx.xxx.xxx-xx)⁸, ⁶

Cargo do Professor Orientador: String;

## Cadastro de Representante:

Nome do Representante: String;

Cargo do Representante: String;

## Regra e observações do preenchimento dos campos:

- 1 CNPJ deverá ter um código de validação para os números digitados, se o mesmo segue um padrão correto.

- 2 A instituição deverá permitir o registro de seus representantes e professores orientadores, mantendo o vínculo de cada pessoa com a instituição.

3 A instituição cadastrada deverá permitir sua vinculação ao jovem, incluindo os dados do professor orientador e do representante da instituição.

4 A instituição poderá possuir mais de um endereço.

5 Ao informar um CEP válido, o sistema deverá preencher automaticamente o logradouro e o bairro, quando disponíveis através do webservice ViaCEP. Caso a consulta não esteja disponível ou não retorne esses dados, eles poderão ser preenchidos manualmente.

6 O status deverá registrar se a instituição está ativa, desativada, suspensa ou

cancelada, mantendo o histórico dos registros.

- 7 CPF deverá ter um código de validação para os números digitados, se o mesmo segue um padrão correto.

- 8 A instituição deverá permitir o registro e a consulta das informações necessárias ao acompanhamento do estágio, incluindo relatórios de atividades e termo de realização do estágio.


## Alteração:

Será realizado somente por um funcionário com o nível de acesso que permita essa modificação. Vale salientar que em todos os casos deve ser mantido os históricos dos registros, contendo quem realizou a operação juntamente com o que foi realizado, com data e hora.

## Exclusão:

Não será realizado a exclusão teremos um campo com o nome status onde o mesmo poderá ser (desativada, suspensa, cancelada), vale salientar que em todos os casos deve ser mantido os históricos dos registros.

Pesquisa: será permitido buscar a instituição por CNPJ, nome, município, estado, nome do representante, CPF do representante, nome do professor orientador, CPF do professor orientador, situação, dentre outros conforme tela abaixo.


## Protótipo:


| RF004 – Ofertas de vagas | Requisito responsável pelo cadastro e publicação das vagas de jovem aprendiz e estágio, vinculado à empresa cadastrada. Cadastro de Vaga: Título: String; Descrição: String; Tipo de vaga: Integer;(Jovem Aprendiz ou Estágio)2 Quantidade de vagas: Integer; 5 Dia(s) da Semana: String; (Horário de Entrada/Intervalo/Saída)9 Carga horária diária: Integer;9 Carga horária semanal: Integer;9 Valor da bolsa: BigDecimal;9 Objetivo da oportunidade: String;9 Atividades previstas: String;9 Período de recesso: String;9 Início previsto da oportunidade: Date;3, 9 Término previsto da oportunidade: Date;3, 9 Benefícios oferecidos: String; Empresa responsável: String;1, 8 Localidade da vaga: String;6 Modalidade de trabalho: Integer;6 Status: Integer; (Rascunho, Publicada, Encerrada)4, 6 Cadastro de Critérios/Perfis Desejados: Setor(es) de atuação desejada: Integer Habilidades desejadas: String; Curso(s) relacionado(s): String; Escolaridade: Integer; (Médio, Superior) Série/período: String; Observações: String; Regra e observações do preenchimento dos campos: 1 A vaga deverá estar obrigatoriamente vinculada a uma empresa previamente ce4adastrada e ativa. 2 O tipo de vaga deverá ser compatível com a legislação aplicável à aprendizagem ou ao estágio e com as informações da oportunidade cadastrada. 3 A publicação deverá respeitar o período de vigência e os prazos definidos para candidatura e processo seletivo. 4 A vaga poderá permanecer em rascunho, ser publicada e posteriormente encerrada, conforme o andamento da oportunidade. 5 A quantidade de vagas deverá ser controlada durante o processo seletivo e atualizada conforme as vagas forem preenchidas ou deixarem de estar disponíveis. 6 Somente vagas publicadas e vigentes deverão estar visíveis e disponíveis para busca e candidatura pelos candidatos, conforme seus critérios de pesquisa. |
| --- | --- |


7 Em todos os casos deverão ser mantidos os históricos das alterações realizadas na vaga e de suas publicações.

8 A publicação da vaga deverá estar integrada ao certificado ou registro da empresa, mantendo o vínculo e a situação cadastral correspondentes.

9 Nas vagas de estágio, o curso relacionado deverá corresponder aos objetivos e às atividades previstas para a oportunidade.

10 O cadastro deverá descrever os objetivos, as atividades e o cronograma da oportunidade.

11 O cadastro deverá informar o período previsto, os dias e horários da jornada, as cargas horárias diária e semanal e o período de recesso.

12 O valor da bolsa e os benefícios oferecidos deverão ser informados como condições da oportunidade e apresentados aos candidatos.

Obs1: Após a publicação deverá ser gerado um comprovante ou registro da publicação da vaga, com identificação da oportunidade e respectiva data e hora.

Obs2: Toda vaga deverá estar vinculada ao processo seletivo correspondente e ao cadastro da empresa responsável.

## Alteração:

A alteração será realizada somente por representante autorizado da empresa responsável pela vaga, observadas as condições de acesso e a situação da oportunidade. Em todos os casos deverá ser mantido o histórico dos registros, contendo quem realizou a operação, o que foi realizado, a data e a hora. As alterações das condições de estágio vinculadas a TCE formalizado deverão permanecer relacionadas ao respectivo TACE.

## Exclusão:

Não será realizada a exclusão física da vaga. O registro terá seu status alterado, podendo assumir as situações de rascunho, publicada, suspensa, encerrada ou cancelada. Em todos os casos deverá ser mantido o histórico dos registros e das alterações de status.

## Pesquisa:

Será permitido à empresa pesquisar suas vagas por identificação, título, tipo de vaga, área de atuação, processo seletivo, período de vigência e situação. Será permitido aos candidatos buscar e filtrar vagas publicadas por tipo de vaga, área de atuação, ocupação ou curso relacionado, localidade, modalidade, carga horária, remuneração ou bolsa, benefícios, prazo de candidatura e demais informações da oportunidade.


## Protótipo:


| RF005 – Permitir Candidatu ra | Requisito responsável por permitir que o candidato consulte vagas publicadas e disponíveis, candidate-se a uma oportunidade e acompanhe o andamento de sua candidatura. Cadastro de Candidatura: Candidato: Integer;2 Vaga: Integer;3 Data e hora da candidatura: DateTime;4 Status da candidatura: Integer; (enviada, em análise, aprovada, rejeitada, cancelada);5 Currículo: Integer;6 Histórico escolar: Integer;6 Mensagem de apresentação: String;7 Data e hora da última atualização: DateTime;8 Regras e observações do preenchimento dos campos: 1 A identificação da candidatura deverá ser gerada pelo sistema e ser única. 2 O candidato deverá estar autenticado e possuir cadastro ativo de estagiário no RF001. A candidatura deverá permanecer vinculada ao cadastro do candidato, mesmo que seus dados sejam posteriormente alterados. 3 A candidatura deverá estar vinculada a uma vaga cadastrada no RF004. A vaga deverá estar publicada e disponível para candidatura no momento da confirmação. 4 A data e a hora serão geradas automaticamente pelo sistema no envio da candidatura e não poderão ser alteradas pelo candidato. 5 O status deverá ser selecionado de uma lista configurável e deverá contemplar, no mínimo, as situações: Enviada, Em análise, Em processo seletivo, Selecionada, Não selecionada, Desistente e Cancelada. O sistema deverá permitir somente transições válidas entre os status. O candidato poderá desistir enquanto a candidatura não estiver encerrada. A empresa responsável pela vaga poderá atualizar o status durante o processo seletivo. 6 O currículo e o histórico escolar deverão ser vinculados conforme as regras do RF007. Quando exigidos pela vaga, deverão estar disponíveis e válidos antes da confirmação da candidatura. Os documentos deverão permanecer associados à candidatura e ser acessíveis apenas a usuários autorizados. 7 A mensagem de apresentação será opcional, salvo quando exigida pela vaga, e deverá respeitar o limite de caracteres definido pelo sistema. 8 A data e a hora da última atualização deverão ser geradas pelo sistema a cada alteração relevante na candidatura. Obs1: O sistema deverá impedir que o mesmo candidato mantenha mais de uma candidatura ativa para a mesma vaga. Uma nova candidatura após desistência ou cancelamento somente poderá ser feita se a vaga continuar disponível e as regras do processo seletivo permitirem. Obs2: Antes de confirmar o envio, o sistema deverá validar se o cadastro do candidato está ativo, se a vaga permanece publicada e disponível, se os requisitos obrigatórios foram preenchidos e se os documentos exigidos foram |
| --- | --- |


vinculados. Se alguma validação falhar, a candidatura não deverá ser registrada como enviada, e o sistema deverá informar o motivo ao candidato.

Obs3: A candidatura não garante seleção, contratação ou formalização de estágio ou aprendizagem. A seleção deverá seguir as etapas do processo seletivo definido para a vaga.

Obs4: A empresa responsável poderá consultar as candidaturas de suas próprias vagas. O candidato poderá consultar somente suas candidaturas. Usuários administrativos poderão consultá-las conforme seu nível de acesso.

Obs5: O sistema deverá manter o histórico das alterações e movimentações da candidatura, incluindo o usuário responsável, a ação realizada, os status anterior e novo, a data e a hora e, quando aplicável, a justificativa. O histórico não poderá ser apagado ou alterado pelo candidato.

## Alteração:

O candidato poderá alterar os dados da candidatura enquanto ela estiver em rascunho. Após o envio, alterações permitidas, desistências e cancelamentos deverão ser registrados no histórico. A empresa responsável poderá atualizar o status e incluir observações de avaliação, mantendo o registro do usuário responsável, da data e da hora.

## Exclusão:

Não será realizada exclusão física da candidatura. O candidato poderá desistir, e a empresa ou um usuário administrativo autorizado poderá cancelar a candidatura conforme as regras do processo seletivo. O registro e seu histórico deverão ser preservados.

## Pesquisa:

O candidato poderá consultar suas candidaturas por vaga, empresa, tipo de vaga, data de envio e status. A empresa poderá pesquisar candidaturas de suas vagas por candidato, vaga, data de envio e status. Os filtros poderão ser combinados na mesma pesquisa.

## Protótipo:


## 4. Requisito Não Funcional

| ID | Requisito | Descrição | Prioridade |
| --- | --- | --- | --- |
| RNF01 | Abrangência geográfica | A plataforma deverá atender oportunidades de estágio e usuários vinculados a Maceió/AL. Os cadastros e as pesquisas de vagas deverão respeitar essa abrangência. | Essencial |
| RNF02 | Facilidade de uso | A interface deverá ser clara e intuitiva para estudantes, empresas e instituições de ensino. Campos, ações e termos específicos deverão ter orientações quando necessário. | Importante |
| RNF03 | Tratamento de erros | Quando uma ação não puder ser concluída, o sistema deverá apresentar uma mensagem clara, informar o que ocorreu e orientar o usuário sobre como corrigir o problema, quando possível. | Importante |
| RNF04 | Privacidade e proteção de dados | O acesso a dados pessoais, currículos, históricos escolares e documentos deverá ser restrito a usuários autorizados e de acordo com suas funções. O sistema deverá proteger esses dados contra acesso ou divulgação indevidos. | Essencial |
| RNF05 | Controle de acesso | O sistema deverá autenticar os usuários e permitir acesso às funcionalidades conforme o perfil, por exemplo, estudante, empresa ou instituição de ensino. | Essencial |
| RNF06 | Integridade dos dados | O sistema deverá validar os dados informados nos cadastros, como formatos de e-mail, telefone, CNPJ e CPF, e impedir duplicidades nos campos que exigem unicidade. | Essencial |
| RNF07 | Histórico de alterações | Alterações relevantes em cadastros e mudanças de status deverão manter registro do usuário responsável, da data e hora e dos valores alterados, conforme aplicável. | Importante |
| RNF08 | Compatibilidad e | A plataforma deverá funcionar nos navegadores atuais de uso comum e adaptar sua interface a computadores e dispositivos móveis. | Importante |
| RNF09 | Desempenho | As principais operações, como acessar vagas, pesquisar oportunidades e consultar candidaturas, deverão responder em até 3 segundos em condições normais de uso. | Importante |


| RNF10 | Disponibilidad e | A plataforma deverá estar disponível para uso contínuo, exceto durante manutenções programadas, que deverão ser comunicadas aos usuários com antecedência. | Importante |
| --- | --- | --- | --- |
| RNF11 | Recuperação e cópias de segurança | Os dados da plataforma deverão ter cópias de segurança periódicas e um procedimento de recuperação em caso de falha. | Essencial |

## 5. Requisito de Segurança

| ID | Perigo | Soluções |
| --- | --- | --- |
| [RS001] | No RF002 foi verificado que uma consulta pode ser gerada para um paciente diferente caso os dados informados coincidam | Para resolver o perigo deve tomar as seguintes atitudes: 1- O CPF deve ser usado como filtragem de estagiários. |

## 6. Matriz de Avaliação de Risco

| Segurança/ probabilidade | Catastrófico (1) | Crítico (2) | Marginal (3) | Insignificante (4) |
| --- | --- | --- | --- | --- |
| Frequente (A) |   |   |   |   |
| Provável (B) |   |   |   |   |
| Ocasional (C) | RS004, RS006 | RS01 |   |   |
| Remoto (D) | RS003 | RS009 |   | RS005 |
| Improvável (E) | RS002 |   |   |   |
| Eliminado (F) |   |   |   |   |

## 7. Matriz de Rastreabilidade – Requisito Funcional

| ID de requisitos |   |   |   |   |   |   | RF001 RF002 RF003 RF004 RF005 RF006 RF007 RF008 RF009 RF010 RF011 RF012 RF013 |   |   |   |   |   |   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RF001 |   | R |   | D |   | D | D | R | D |   |   | D | D |
| RF002 | R |   |   |   |   |   |   |   |   |   |   |   |   |
| RF003 |   |   |   | R |   | D |   | D |   |   |   |   |   |
| RF004 D |   |   | R |   | R | D | D |   | D | D | D | R | R |
| RF005 |   |   |   | R |   |   | D |   |   |   | R |   |   |


| RF006 D |   |   | D | D |   |   |   | D | D | R | R | R | R |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RF007 D |   |   |   | D | D |   |   |   | D | R | R | D | D |
| RF008 | R |   | D |   |   | D |   |   |   |   |   |   |   |
| RF009 D |   |   |   | D |   | D | D |   |   | R |   | D | D |

## 8. Ponto de função

Para que seja conhecido o tamanho funcional de um software, são realizadas medições da quantidade de funcionalidades que um software possui, ou seja, quantas funcionalidades ele é capaz de fornecer ao seu usuário.

Desse modo, a Análise por Pontos de Função é um método que divide o aplicativo de software em partes menores, sendo realizada a contagem de funcionalidades em cada uma dessas partes, de modo a constatar qual o tamanho total do software analisado.

## 4.1 Componentes Fundamentais

Funções do tipo Dado: são aqueles relacionados ao armazenamento de dados, sendo o Arquivo Lógico Interno e o Arquivo Lógico Externo;

Funções do tipo Transação: são aquelas realizadas a atividades de processamento realizadas pelo usuário, englobando a Entrada Externa, Saída Externa e a Consulta Externa.

## Arquivo Lógico Interno (ALI)

O arquivo lógico interno corresponde a um grupo de dados de controle relacionados logicamente, reconhecidos pelos usuários, os quais são armazenados dentro da fronteira de aplicação. Em outras palavras, trata-se de dados mantidos em tabelas em um banco de dados.

## Arquivo de Interface Externa (AIE)

O arquivo de interface externa é similar ao ALI, sendo também um grupo de dados de controle logicamente relacionados, porém, eles são armazenados do lado externo/fora da fronteira de aplicação, sendo ele mantido por outra aplicação. Desse modo, um arquivo de interface externa de uma aplicação sempre será um arquivo lógico interno de outra aplicação.

## Entrada Externa (EE)

Uma entrada externa corresponde ao processamento de dados originados do lado de fora da fronteira de aplicação, ou seja, recebidos externamente. Essas entradas externas podem provocar ou não alterações no comportamento do sistema, através de exclusões, inclusões ou alterações em dados armazenados no ALI.

## Saída Externa (SE)


A saída externa, por sua vez, é realizada quando há o envio de dados de dentro da fronteira de aplicação para o ambiente externo, sendo que ela sempre irá alterar o comportamento do sistema. Em outras palavras, a saída externa exibe ao usuário informações que são obtidas por meio de um processamento lógico de dados, através de cálculos e operações dos dados, não sendo apenas uma mera consulta.

## Consulta Externa (SE)

Ela é similar à saída externa, porém, não há alteração do comportamento do sistema, não há nenhum cálculo ou alteração dos dados, sendo apenas realizada mera consulta/recuperação dos dados dentro da fronteira de aplicação.

## Determinar o tipo de contagem

Para esse projeto X, utilizaremos a contagem para projeto em desenvolvimento, que mede a funcionalidade fornecida aos usuários finais do software quando da primeira instalação entregue quando o projeto estiver pronto;

## Determinar Escopo e Fronteira

Escolhido o tipo de contagem a ser utilizado, é necessário agora definir qual será o escopo: O sistema realizará a contagem dos requisitos funcionais de todos os módulos que compõem o sistema X, vale salientar que o sistema está limitado aos módulos internos e não integrações com sistemas externos.

## Calcular pontos de função não-ajustados

A definição do tamanho funcional de um software, através da medição de cada um dos cinco componentes já informados anteriormente (ALI, AIE, EE, SE e CE).

Será utilizada a tabela abaixo para calculo dos pontos de função do sistema X.

Os valores acima serão utilizados para calcular o número de pontos de função não-ajustados. Multiplicando a quantidade dos componentes pelo valor da complexidade.

## PONTO DE FUNÇÃO – SISTEMA GESTÃO

|   | REQUISITO FUNCIONAL COMPLEXIDADE ALI AIE |   |   | SE | EE |   | CE TOTAL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RF001 | ALTA | 15 | 10 | 7 | 6 | 6 | 44 |
| RF002 | MÉDIA | 10 | 7 | 5 | 4 | 4 | 30 |


RF003

BAIXA

7

0

4

0

3

14


## 9. Referências

- 1. Baseado no documento de requisitos disponível em <https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&sqi=2&ved=0

- CCwQFjAC&url=http%3A%2F%2Fdemo.chiliproject.org%2Fattachments%2F169%2Fdocu mentoRequisitos.doc&ei=kPnfU- WKIs6XyATC5IC4Bw&usg=AFQjCNESjuE4x3e3nXsTuY3tnt4aqobn1A&bvm=bv.72197243, d.b2U&cad=rja> <Termo de compromisso de estágio (TCE)>

- <Lei do Estágio (Nº 11.788)>
