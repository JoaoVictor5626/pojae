document.addEventListener("DOMContentLoaded", () => {
    // Carrega a Navbar
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
        fetch('/partials/navbar.html')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar a navbar');
                return response.text();
            })
            .then(data => {
                navbarElement.innerHTML = data;
            })
            .catch(error => console.error(error));
    }

    // Carrega o Footer
    const footerElement = document.getElementById("footer");
    if (footerElement) {
        fetch('/partials/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar o footer');
                return response.text();
            })
            .then(data => {
                footerElement.innerHTML = data;
            })
            .catch(error => console.error(error));
    }
});