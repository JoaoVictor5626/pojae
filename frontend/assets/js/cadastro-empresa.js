// JAVASCRIPT EM SCRIPT DEDICADO OU INLINE

// MÁSCARAS DE ENTRADA
function maskCNPJ(input) {
    let v = input.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    input.value = v;
}

function maskCPF(input) {
    let v = input.value.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    input.value = v;
}

function maskCEP(input) {
    let v = input.value.replace(/\D/g, "");
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    input.value = v;
}

function maskPhone(input) {
    let v = input.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    input.value = v;
}

const API_BASE_URL = window.POJAE_API_URL || 'http://localhost:8080';

// SUBMISSÃO DO FORMULÁRIO DE EMPRESA
async function handleCompanyRegister(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const submitButton = form.querySelector('[type="submit"]');
    const password = document.getElementById('field-senha-empresa').value;
    if (password !== document.getElementById('field-confirmar-senha-empresa').value) {
        showToast('As senhas informadas não coincidem.', 'info');
        return;
    }

    const companyData = {
        name: document.getElementById('field-nome-empresa').value.trim(),
        cnpj: document.getElementById('field-cnpj').value.trim(),
        password,
        email: document.getElementById('field-email-empresa').value.trim(),
        phone: document.getElementById('field-telefone-empresa').value.replace(/\D/g, ''),
        website: document.getElementById('field-site').value.trim(),
        address: {
            cep: document.getElementById('field-cep-empresa').value.trim(),
            street: document.getElementById('field-endereco-empresa').value.trim(),
            number: Number(document.getElementById('field-numero-empresa').value),
            neighborhood: document.getElementById('field-bairro-empresa').value.trim(),
            city: document.getElementById('field-cidade-empresa').value,
            state: document.getElementById('field-estado-empresa').value
        },
        representativeName: document.getElementById('field-nome-representante').value.trim(),
        representativePosition: document.getElementById('field-cargo-representante').value.trim(),
        internshipSupervisorName: document.getElementById('field-nome-supervisor').value.trim(),
        internshipSupervisorCpf: document.getElementById('field-cpf-supervisor').value.trim(),
        internshipSupervisorPosition: document.getElementById('field-cargo-supervisor').value.trim(),
        status: 'ACTIVE'
    };

    submitButton.disabled = true;
    try {
        const response = await fetch(`${API_BASE_URL}/empresas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(companyData)
        });

        if (!response.ok) throw new Error('Cadastro não concluído');
        showToast('Cadastro de empresa realizado com sucesso no POJAE!', 'success');
        setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    } catch (error) {
        showToast('Não foi possível concluir o cadastro. Confira os dados e tente novamente.', 'info');
        submitButton.disabled = false;
    }
}

// SISTEMA DE NOTIFICAÇÕES TOAST
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');

    const bgColor = type === 'success' ? 'bg-emerald-600' : 'bg-pojae-700';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';

    toast.className = `${bgColor} text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between text-xs font-semibold toast-slide pointer-events-auto`;
    toast.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas ${icon} text-sm"></i>
            <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" class="text-white/80 hover:text-white ml-3">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 4000);
}
