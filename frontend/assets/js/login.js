// Fallback caso o arquivo externo não esteja carregado no ambiente de teste
if (typeof tailwind !== 'undefined' && !tailwind.config?.theme?.extend?.colors?.pojae) {
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Plus Jakarta Sans', 'sans-serif'],
                },
                colors: {
                    pojae: {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        500: '#3b82f6',
                        600: '#2563eb',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a',
                    }
                }
            }
        }
    }
}





// MÁSCARA DINÂMICA CPF/CNPJ, VISUALIZAR SENHA E SIMULAÇÃO DE LOGIN 

// Máscara dinâmica que alterna automaticamente entre CPF (11 dígitos) e CNPJ (14 dígitos)
function maskCpfCnpj(input) {
    let v = input.value.replace(/\D/g, "");

    if (v.length <= 11) {
        // Formato CPF: 000.000.000-00
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        // Formato CNPJ: 00.000.000/0000-00
        v = v.substring(0, 14);
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }

    input.value = v;
}

// Alternar visibilidade da senha ("olhinho")
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('login-senha');
    const icon = document.getElementById('toggle-password-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Simulação de autenticação e redirecionamento conforme perfil (CPF x CNPJ)
function handleLogin(e) {
    e.preventDefault();
    const docRaw = document.getElementById('login-documento').value.replace(/\D/g, "");

    if (docRaw.length !== 11 && docRaw.length !== 14) {
        showToast("Por favor, digite um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.", "info");
        return;
    }

    if (docRaw.length === 14) {
        showToast("Login realizado como Empresa! Redirecionando para o painel...", "success");
        setTimeout(() => {
            window.location.href = "dashboard-empresa.html";
        }, 1500);
    } else {
        showToast("Login realizado como Estudante! Redirecionando para as vagas...", "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    }
}

// Simulação de envio de recuperação de senha
function handleForgotPassword(e) {
    e.preventDefault();
    closeModal('modal-forgot-password');
    showToast("Instruções de recuperação enviadas para o e-mail cadastrado!", "success");
}

// Controle dos Modais
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// Notificações Toast (Padrão POJAE)
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






