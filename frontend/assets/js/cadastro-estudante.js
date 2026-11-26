// JAVASCRIPT: LÓGICA DE FORMULÁRIO, MÁSCARAS E HABILIDADES

// ESTADO INTERNO DAS HABILIDADES
let currentRating = 3;
let skillsList = [];
const API_BASE_URL = window.POJAE_API_URL || 'http://localhost:8080';

window.addEventListener('DOMContentLoaded', () => {
    renderSkillsTable();
    loadEducationalInstitutions();
});

async function loadEducationalInstitutions() {
    const select = document.getElementById('field-instituicao');

    try {
        const response = await fetch(`${API_BASE_URL}/instituicoesDeEnsino`);
        if (!response.ok) throw new Error('Falha ao carregar instituições');

        const institutions = await response.json();
        institutions.forEach(institution => {
            const option = document.createElement('option');
            option.value = institution.id;
            option.textContent = institution.name;
            select.appendChild(option);
        });
    } catch (error) {
        select.disabled = true;
        showToast('Não foi possível carregar as instituições. Tente novamente mais tarde.', 'info');
    }
}

// MODAL DE SELEÇÃO DE PERFIL
function openSelectionModal() {
    document.getElementById('modal-selection').classList.remove('hidden');
}

function closeSelectionModal() {
    document.getElementById('modal-selection').classList.add('hidden');
}

// MÁSCARAS DE ENTRADA
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

function maskDate(input) {
    let v = input.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/, "$1/$2");
    input.value = v;
}

// CONTROLE DA AVALIAÇÃO DE ESTRELAS (PROFICIÊNCIA 1 A 5)
function setRating(val) {
    currentRating = val;
    const container = document.getElementById('star-container');
    const stars = container.querySelectorAll('i');
    document.getElementById('rating-label').textContent = `${val} / 5`;

    stars.forEach((star, index) => {
        if (index < val) {
            star.className = 'fas fa-star';
        } else {
            star.className = 'far fa-star';
        }
    });
}

// ADIÇÃO DE HABILIDADE À LISTA
function addSkill() {
    const tipoSelect = document.getElementById('hab-tipo');
    const tipo = tipoSelect.value;
    const tipoNome = tipoSelect.options[tipoSelect.selectedIndex].text;
    const nome = document.getElementById('hab-nome').value.trim();
    const obs = document.getElementById('hab-obs').value.trim();

    if (!nome) {
        showToast("Informe o nome da habilidade.", "info");
        return;
    }

    skillsList.push({
        tipo,
        tipoNome,
        nome,
        nivel: currentRating,
        obs: obs || '-'
    });

    document.getElementById('hab-nome').value = '';
    document.getElementById('hab-obs').value = '';
    setRating(3);
    renderSkillsTable();
    showToast("Habilidade adicionada à lista com sucesso!", "success");
}

function removeSkill(index) {
    skillsList.splice(index, 1);
    renderSkillsTable();
}

function renderSkillsTable() {
    const tbody = document.getElementById('skills-table-body');
    tbody.innerHTML = '';

    if (skillsList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="p-4 text-center text-slate-400 text-xs">
                    Nenhuma habilidade cadastrada até o momento.
                </td>
            </tr>
        `;
        return;
    }

    skillsList.forEach((sk, idx) => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition";
        tr.innerHTML = `
            <td class="p-3 font-semibold text-slate-700">${sk.tipoNome}</td>
            <td class="p-3 font-bold text-slate-900">${sk.nome}</td>
            <td class="p-3">
                <span class="inline-flex items-center gap-1 text-amber-500 font-bold">
                    <i class="fas fa-star text-xs"></i> ${sk.nivel}/5
                </span>
            </td>
            <td class="p-3 text-slate-500">${sk.obs}</td>
            <td class="p-3 text-center">
                <button type="button" onclick="removeSkill(${idx})" class="text-red-500 hover:text-red-700 p-1" title="Remover">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// SUBMISSÃO FINAL DO CADASTRO
function handleStudentRegister(e) {
    e.preventDefault();
    submitStudentRegistration(e.currentTarget);
}

async function submitStudentRegistration(form) {
    const submitButton = form.querySelector('[type="submit"]');
    const password = document.getElementById('field-senha').value;
    if (password !== document.getElementById('field-confirmar-senha').value) {
        showToast('As senhas informadas não coincidem.', 'info');
        return;
    }

    const payload = {
        name: document.getElementById('field-nome').value.trim(),
        cpf: document.getElementById('field-cpf').value.replace(/\D/g, ''),
        password,
        email: document.getElementById('field-email').value.trim(),
        phone: document.getElementById('field-telefone').value.replace(/\D/g, ''),
        address: {
            cep: document.getElementById('field-cep').value,
            street: document.getElementById('field-endereco').value.trim(),
            number: Number(document.getElementById('field-numero').value),
            neighborhood: document.getElementById('field-bairro').value.trim(),
            city: document.getElementById('field-cidade').value,
            state: document.getElementById('field-estado').value
        },
        educationalInstitution: { id: document.getElementById('field-instituicao').value },
        courseName: document.getElementById('field-curso').value.trim(),
        gradeOrAcademicTerm: document.getElementById('field-periodo').value.trim(),
        studyShift: document.getElementById('field-turno').value,
        expectedGraduationDate: document.getElementById('field-conclusao').value.trim(),
        status: 'ACTIVE',
        skills: skillsList.map(skill => ({
            type: skill.tipo,
            description: skill.nome,
            proficiencyLevel: skill.nivel,
            notes: skill.obs === '-' ? '' : skill.obs
        }))
    };

    submitButton.disabled = true;
    try {
        const response = await fetch(`${API_BASE_URL}/candidatos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Cadastro não concluído');
        showToast('Cadastro de estagiário realizado com sucesso no POJAE!', 'success');
        setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    } catch (error) {
        showToast('Não foi possível concluir o cadastro. Confira os dados e tente novamente.', 'info');
        submitButton.disabled = false;
    }
}

// NOTIFICAÇÕES TOAST
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
