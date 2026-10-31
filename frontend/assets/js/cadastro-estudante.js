// JAVASCRIPT: LÓGICA DE FORMULÁRIO, MÁSCARAS E HABILIDADES

// ESTADO INTERNO DAS HABILIDADES
let currentRating = 3;
let skillsList = [
    { tipoId: 1, tipoNome: "Técnica / Hard Skill", nome: "Lógica de Programação", nivel: 4, obs: "Projetos em C# e Java" },
    { tipoId: 2, tipoNome: "Comportamental / Soft Skill", nome: "Trabalho em Equipe", nivel: 5, obs: "Experiência em projetos acadêmicos" }
];

window.addEventListener('DOMContentLoaded', () => {
    renderSkillsTable();
});

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
    const tipoId = parseInt(tipoSelect.value);
    const tipoNome = tipoSelect.options[tipoSelect.selectedIndex].text;
    const nome = document.getElementById('hab-nome').value.trim();
    const obs = document.getElementById('hab-obs').value.trim();

    if (!nome) {
        showToast("Informe o nome da habilidade.", "info");
        return;
    }

    skillsList.push({
        tipoId,
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

    const studentData = {
        nome: document.getElementById('field-nome').value,
        cpf: document.getElementById('field-cpf').value,
        endereco: document.getElementById('field-endereco').value,
        numero: document.getElementById('field-numero').value,
        bairro: document.getElementById('field-bairro').value,
        cidade: document.getElementById('field-cidade').value,
        estado: document.getElementById('field-estado').value,
        cep: document.getElementById('field-cep').value,
        telefone: document.getElementById('field-telefone').value,
        email: document.getElementById('field-email').value,
        instituicaoId: parseInt(document.getElementById('field-instituicao').value),
        nomeCurso: document.getElementById('field-curso').value,
        seriePeriodo: document.getElementById('field-periodo').value,
        turno: document.getElementById('field-turno').value,
        conclusaoPrevista: document.getElementById('field-conclusao').value,
        habilidades: skillsList
    };

    console.log("Dados do Estudante Cadastrado (RF01):", studentData);
    showToast("Cadastro de Estagiário realizado com sucesso no POJAE!", "success");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
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
