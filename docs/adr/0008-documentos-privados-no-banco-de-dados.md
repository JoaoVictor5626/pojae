# ADR 0008: Documentos privados e entrega autorizada

- **Status:** Proposto
- **Data:** 2026-11-26
- **Requisitos:** [RF-05 e RF-13](../prd/0001-pojae.md), [RNF-05](../prd/0001-pojae.md), [RS04](../prd/0001-pojae.md)

## Contexto

Currículos e históricos escolares contêm dados pessoais e precisam ser acessados pelo candidato e por pessoas autorizadas no processo seletivo. A spec de candidaturas atual armazena os PDFs em colunas `bytea` do PostgreSQL, mas o PRD exige que os documentos não sejam públicos e que cada download valide a permissão.

## Decisão

- Manter os documentos no armazenamento privado associado ao PostgreSQL, conforme o fluxo atual de candidaturas.
- Não expor caminhos ou URLs públicas permanentes para os arquivos.
- Entregar um documento somente após autenticação e validação do vínculo entre conta, candidatura e vaga.
- Validar formato e tamanho no recebimento e retornar metadados em DTOs, sem incluir os bytes em respostas JSON de listagem.

## Consequências

- Cópias de segurança do banco também contêm os documentos e precisam receber proteção equivalente.
- Arquivos aumentam o volume do banco e podem aumentar o tempo de backup e restauração.
- Limites de tamanho, autorização de download e comportamento de retenção precisam ser cobertos nos fluxos de candidatura e painel da empresa.
