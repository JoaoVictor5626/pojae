function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Fecha o modal ao clicar fora da caixa branca (no fundo escuro)
window.addEventListener('click', function(event) {
    if (event.target.id === 'modal-profile-info') {
        closeModal('modal-profile-info');
    }
});