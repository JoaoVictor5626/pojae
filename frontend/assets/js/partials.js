async function incluirComponente(idElemento, caminhoArquivo) {
    try {
        const response = await fetch(caminhoArquivo);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo: ${caminhoArquivo}`);
        }
        const html = await response.text();
        
        const elemento = document.getElementById(idElemento);
        if (elemento) {
            elemento.innerHTML = html;
        }
    } catch (error) {
        console.error("Erro no carregamento do partial:", error);
    }
}

// Executa assim que a estrutura DOM da página estiver pronta
document.addEventListener("DOMContentLoaded", () => {
    incluirComponente("navbar-container", "./partials/navbar.html");
    incluirComponente("footer-container", "./partials/footer.html");
});