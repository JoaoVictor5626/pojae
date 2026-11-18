// JAVASCRIPT EM SCRIPT DEDICADO OU INLINE

// MÁSCARA PARA MOEDA (BigDecimal)
function maskCurrency(input) {
    let value = input.value.replace(/\D/g, "");
    value = (value / 100).toFixed(2) + "";
    value = value.replace(".", ",");
    value = value.replace(/(\d)(\d{3}),/g, "$1.$2,");
    input.value = value;
}

const API_BASE_URL = window.POJAE_API_URL || 'http://localhost:8080';

window.addEventListener('DOMContentLoaded', loadCompanies);

async function loadCompanies() {
    const select = document.getElementById('field-empresa-resp');
    try {
        const response = await fetch(`${API_BASE_URL}/empresas`);
        if (!response.ok) throw new Error('Falha ao carregar empresas');

        const companies = await response.json();
        select.replaceChildren(new Option('Selecione a empresa...', ''));
        companies.forEach(company => select.add(new Option(company.name, company.id)));
        if (companies.length === 0) {
            select.disabled = true;
            showToast('Cadastre uma empresa antes de publicar uma vaga.', 'info');
        }
    } catch (error) {
        select.disabled = true;
        showToast('Não foi possível carregar as empresas cadastradas.', 'info');
    }
}

function countWorkDays(schedule) {
    const normalized = schedule.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const matches = [...normalized.matchAll(/\b(segunda|seg|terca|ter|quarta|qua|quinta|qui|sexta|sex|sabado|sab|domingo|dom)\b/g)];
    const dayIndexes = matches.map(match => {
        const day = match[1];
        if (day.startsWith('seg')) return 0;
        if (day.startsWith('ter')) return 1;
        if (day.startsWith('qua')) return 2;
        if (day.startsWith('qui')) return 3;
        if (day.startsWith('sex')) return 4;
        if (day.startsWith('sab')) return 5;
        return 6;
    });

    if (dayIndexes.length >= 2 && /\ba\b|\bate\b/.test(normalized)) {
        const distance = (dayIndexes[dayIndexes.length - 1] - dayIndexes[0] + 7) % 7;
        return distance + 1;
    }
    return new Set(dayIndexes).size;
}

function formatApiDate(value) {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
}

// SUBMISSÃO DO FORMULÁRIO DE CADASTRO DE VAGA
async function handleJobRegister(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const submitButton = form.querySelector('[type="submit"]');

    const schedule = document.getElementById('field-dias-semana').value.trim();
    const daysOfTheWeek = countWorkDays(schedule);
    if (daysOfTheWeek < 1) {
        showToast('Informe os dias da semana por nome, por exemplo: Seg a Sex.', 'info');
        return;
    }

    const jobData = {
        title: document.getElementById('field-titulo').value.trim(),
        description: document.getElementById('field-descricao').value.trim(),
        type: document.getElementById('field-tipo-vaga').value,
        numberOfPositions: Number(document.getElementById('field-qtd-vagas').value),
        dailyWorkingHours: Number(document.getElementById('field-ch-diaria').value),
        workSchedule: schedule,
        daysOfTheWeek,
        weeklyWorkingHours: Number(document.getElementById('field-ch-semanal').value),
        scholarshipAmount: Number(document.getElementById('field-bolsa').value.replace(/\./g, '').replace(',', '.')),
        opportunityObjective: document.getElementById('field-objetivo').value.trim(),
        expectedActivities: document.getElementById('field-atividades').value.trim(),
        recessPeriod: document.getElementById('field-recesso').value.trim(),
        expectedStartDate: formatApiDate(document.getElementById('field-inicio').value),
        expectedEndDate: formatApiDate(document.getElementById('field-termino').value),
        benefitsOffered: document.getElementById('field-beneficios').value.trim(),
        company: { id: document.getElementById('field-empresa-resp').value },
        location: document.getElementById('field-localidade').value.trim(),
        workModality: document.getElementById('field-modalidade').value,
        sector: document.getElementById('field-setor').value,
        minimumEducation: document.getElementById('field-escolaridade').value,
        gradeOrAcademicTerm: document.getElementById('field-serie-periodo').value.trim(),
        relatedCourses: document.getElementById('field-cursos').value.trim(),
        desiredSkills: document.getElementById('field-habilidades').value.trim(),
        criteriaObservations: document.getElementById('field-obs-criterios').value.trim(),
        supervisorName: document.getElementById('field-nome-supervisor-vaga').value.trim(),
        supervisorEducation: document.getElementById('field-formacao-supervisor').value
    };

    submitButton.disabled = true;
    try {
        const response = await fetch(`${API_BASE_URL}/vagas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobData)
        });
        if (!response.ok) throw new Error('Cadastro não concluído');

        showToast('Vaga cadastrada com sucesso no POJAE!', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 2000);
    } catch (error) {
        showToast('Não foi possível cadastrar a vaga. Confira os dados e tente novamente.', 'info');
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