# Sistema POJAE (Plataforma de Oportunidades de Jovens Aprendizes e Estagiários)

O **Sistema POJAE** é uma solução voltada para conectar jovens aprendizes e estagiários a oportunidades de mercado. Este projeto foi desenvolvido de forma integrada para atender aos requisitos avaliativos de três disciplinas do curso no **CESMAC**:
1. **Engenharia de Software** (Modelagem, requisitos e arquitetura do sistema)
2. **Laboratório de Programação IV** (Desenvolvimento do sistema backend em Java)
3. **Projetos Extensionistas Curriculares IV** (Aplicação prática e impacto social através do projeto Impulso Web)

---

## 🛠️ Arquitetura e Tecnologias

O projeto está dividido em duas camadas principais:

### 📺 Frontend (Interface do Usuário)
A interface visual representa a primeira versão funcional e protótipo navegável da aplicação.
* **Tecnologias:** HTML5, Tailwind CSS e JavaScript vanilla.
* **Responsabilidades:** Apresentação da identidade visual, funcionamento do menu mobile, carrossel de imagens, filtros de busca e integração de links de contato via WhatsApp.

### ⚙️ Backend (Sistema de Lógica e Dados)
O motor que gerencia as regras de negócio, persistência de dados e inteligência do sistema.
* **Tecnologia:** Java.
* **Responsabilidades:** Processamento das regras de Engenharia de Software, gerenciamento de usuários/vagas e lógica estruturada em conformidade com as diretrizes de Laboratório de Programação IV.

---

## 📂 Estrutura de Arquivos Principais

- `index.html`: Estrutura e conteúdo da página principal.
- `assets/css/style.css`: Identidade visual construída com auxílio do Tailwind CSS e regras de responsividade.
- `assets/js/script.js`: Comportamentos do lado do cliente (menu mobile, filtros, carrossel, redirecionamentos do WhatsApp e atualização automática do ano do rodapé).
- `assets/images/`: Materiais enviados pelo cliente e recortes provisórios do protótipo visual.
- `[Inserir pasta do backend aqui]/`: Código-fonte do sistema desenvolvido em Java. *(Ex: src/main/java)*

---

## 🚀 Como Executar o Projeto

### Para visualizar o Frontend:
1. Extraia a pasta do projeto.
2. Abra o arquivo `index.html` diretamente em qualquer navegador.
3. Para edição com atualização em tempo real, abra a pasta no VS Code e utilize a extensão **Live Server**.

*Nota: A interface cliente não exige instalação de dependências ou inicialização de servidores locais para visualização básica.*

### Para executar o Backend (Java):
*(Nota para o grupo: Adicione aqui brevemente como rodar o Java, ex: "Abra o projeto na IDE IntelliJ/Eclipse e execute a classe Main" ou "Execute o comando mvn spring-boot:run")*

---

## 👥 Integrantes do Grupo

- João Victor Araújo Coêlho
- Vinícius Araújo Coêlho

---

## ⚠️ Observações de Negócio

* **Precificação:** Todos os valores e preços foram omitidos conforme decisão estratégica e solicitação direta do cliente.
* **Fluxo de Transação:** A plataforma não processa pedidos, checkout ou pagamentos nativos. Toda a conversão e fechamento de contatos são direcionados diretamente para o WhatsApp dos responsáveis.

