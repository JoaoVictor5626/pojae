# ADR 0010: Cópias de segurança e recuperação do PostgreSQL

- **Status:** Proposto
- **Data:** 2026-11-26
- **Requisitos:** [RNF-08 e RNF-13](../prd/0001-pojae.md), [RS04 e RS12](../prd/0001-pojae.md)

## Contexto

O PostgreSQL contém cadastros, processos de estágio, trilhas de auditoria e documentos enviados. Perda ou divulgação das cópias pode interromper o serviço ou expor dados pessoais. O PRD exige backups periódicos e procedimento de recuperação, mas não define frequência, retenção ou tempo máximo de recuperação.

## Decisão

- Manter cópias periódicas do banco em armazenamento separado do ambiente principal.
- Criptografar as cópias e restringir o acesso às credenciais e operações de backup e restauração.
- Documentar o procedimento de restauração e exercitá-lo periodicamente em ambiente controlado.
- Definir frequência, retenção, RPO e RTO antes da implantação em produção, considerando o volume dos documentos armazenados no banco.

## Consequências

- Backups consomem armazenamento e exigem gestão de chaves e permissões.
- Uma cópia não verificada pode ser inutilizável; por isso, restaurações de teste também fazem parte do processo.
- A disponibilidade prometida e a quantidade de dados que podem ser perdidos dependem dos valores de RPO e RTO definidos para produção.
