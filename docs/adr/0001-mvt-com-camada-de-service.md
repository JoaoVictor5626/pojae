# ADR 0001: MVC com camada de service e controllers explícitos

- **Status:** Aceito
- **Data:** 2026-11-04

## Contexto

No Spring Boot, a regra de negócio pode se espalhar entre controllers, DTOs, entidades e listeners. Isso dificulta encontrar a regra, testá-la sem HTTP e reutilizá-la em outros pontos, como o painel administrativo.

Abstrações de controller podem reduzir código, mas esconder o fluxo em herança e levar regra de negócio para métodos sobrescritos.

## Decisão

O projeto segue MVC, com todas as regras de negócio em uma camada de service que não conhece HTTP. Os controllers chamam os services e não contêm regras de negócio nem acessam os repositories diretamente.

As regras de cada camada estão em [`docs/arquitetura.md`](../arquitetura.md).

## Consequências

- As regras podem ser testadas sem cliente HTTP.
- O painel administrativo em Spring Boot reaproveita as regras chamando os mesmos services.
- Há mais código repetitivo nos controllers, principalmente em formulários.
- A gravação é feita pelo service, que controla a persistência usando Spring Data JPA.
- Um teste automatizado verifica a separação das responsabilidades ([especificação de fundação](../specs/0001-fundacao.md)).