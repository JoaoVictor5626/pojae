---
description: Padrões das views HTML e partials do POJAE.
globs: frontend/**/*.html
alwaysApply: false
---

# Templates HTML

- Reutilizar partials: `frontend/partials/navbar.html` e `frontend/partials/footer.html` via `<script src="./assets/js/partials.js"></script>`.
- Passar aos templates apenas os **atributos de modelo** necessários (ex.: `oportunidades`, `erro`, `valores`, `sucesso`); evitar globais fictícios.
- Conteúdo gerado a partir do usuário: aplicar escaping adequado ao renderizar no HTML; incluir HTML confiável só com intenção explícita e com cuidado.
- Formulários: `method`/`action` corretos (`POST` para cadastro/login); nomes dos campos alinhados aos DTOs e controllers no servidor.
- Manter **HTML semântico** e classes compatíveis com `frontend/assets/css/style.css` antes de criar CSS novo.