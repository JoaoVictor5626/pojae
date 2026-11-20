// JAVASCRIPT: LEITURA DOS PARÂMETROS DA CANDIDATURA E RENDERIZAÇÃO 

const STATUS_CANDIDATURA_MAP = {
    1: "1 - Enviada",
    2: "2 - Em Análise",
    3: "3 - Aprovada",
    4: "4 - Rejeitada",
    5: "5 - Cancelada"
};

const INSTITUICAO_MAP = {
    1: "1 - Centro Universitário CESMAC",
    2: "2 - Universidade Federal de Alagoas (UFAL)",
    3: "3 - Instituto Federal de Alagoas (IFAL)",
    4: "4 - UNCISAL",
    5: "5 - Escola Estadual Moreira e Silva"
};

const TIPO_HABILIDADE_MAP = {
    1: "1 - Técnica / Hard Skill",
    2: "2 - Ferramenta / Software",
    3: "3 - Comportamental / Soft Skill",
    4: "4 - Idioma"
};

// Fallback caso a página seja aberta diretamente sem passar antes pelo dashboard-empresa.html
const FALLBACK_DATA = {
    vaga: { id: 1042, titulo: "Estágio em Desenvolvimento Web Full Stack" },
    candidatura: {
        idCandidatura: 9001,
        dataHoraCandidatura: "2026-11-15T14:32:00",
        statusCandidatura: 2,
        candidatoId: 101,
        nomeCandidato: "João Victor Araújo Coêlho",
        email: "joao.victor@cesmac.edu.br",
        telefone: "(82) 99812-3456",
        curriculoId: 501,
        historicoEscolarId: 801,
        mensagemApresentacao: "Prezados, sou estudante do 5º período de Engenharia de Software no CESMAC e tenho grande interesse em aplicar meus conhecimentos em JavaScript, Tailwind CSS e Git nos projetos da Tecnologia Alagoana.",
        instituicaoEnsino: 1,
        nomeCurso: "Engenharia de Software",
        seriePeriodo: "5º Período",
        turno: "Noturno",
        conclusaoPrevista: "2027-12-15",
        habilidades: [
            { tipoHabilidade: 1, habilidade: "JavaScript ES6+ & DOM", nivelProficiencia: 4, observacoes: "Desenvolvimento de aplicações web interativas e consumo de APIs REST." },
            { tipoHabilidade: 1, habilidade: "HTML5 & Tailwind CSS", nivelProficiencia: 5, observacoes: "Construção de interfaces responsivas e protótipos de alta fidelidade." },
            { tipoHabilidade: 2, habilidade: "Git & GitHub", nivelProficiencia: 4, observacoes: "Controle de versão, branches e pull requests em equipe." }
        ]
    }
};

let activeVaga = null;
let activeCandidatura = null;
let allVacancies = [];

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const vagaId = params.get('vagaId');
    const candidaturaId = params.get('candidaturaId');

    const stored = sessionStorage.getItem('pojae_company_vacancies');
    if (stored) {
        allVacancies = JSON.parse(stored);
        activeVaga = allVacancies.find(v => String(v.id) === String(vagaId));
        if (activeVaga) {
            activeCandidatura = activeVaga.candidaturas.find(c => String(c.idCandidatura) === String(candidaturaId));
        }
    }

    if (!activeVaga || !activeCandidatura) {
        activeVaga = FALLBACK_DATA.vaga;
        activeCandidatura = FALLBACK_DATA.candidatura;
    } else {
        document.getElementById('btn-back-to-vacancies').href = `dashboard-empresa.html?openCandidatesVagaId=${activeVaga.id}`;
    }

    renderCandidateProfile();
});

function formatDateBR(isoDate) {
    if (!isoDate) return '-';
    if (/^\d{2}\/\d{4}$/.test(isoDate)) return isoDate;
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
}

function formatDateTimeBR(isoDateTime) {
    if (!isoDateTime) return '-';
    const dt = new Date(isoDateTime);
    const dia = String(dt.getDate()).padStart(2, '0');
    const mes = String(dt.getMonth() + 1).padStart(2, '0');
    const ano = dt.getFullYear();
    const hora = String(dt.getHours()).padStart(2, '0');
    const min = String(dt.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} às ${hora}:${min}`;
}

function renderStars(level) {
    let html = '<div class="inline-flex items-center gap-1 text-amber-400">';
    for (let i = 1; i <= 5; i++) {
        html += i <= level
            ? '<i class="fas fa-star text-xs"></i>'
            : '<i class="far fa-star text-slate-300 text-xs"></i>';
    }
    html += `<span class="ml-1.5 text-xs font-extrabold text-slate-700">(${level}/5)</span></div>`;
    return html;
}

async function updateCandidateApplicationStatus(newStatusInt) {
    const status = Number(newStatusInt);
    const host = window.location.hostname || 'localhost';
    try {
        const response = await fetch(`${window.POJAE_API_URL || `http://${host}:8080`}/candidaturas/${activeCandidatura.idCandidatura}/status`, {
            method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('Não foi possível atualizar o status.');
    } catch (error) { showToast(error.message, 'error'); renderCandidateProfile(); return; }
    activeCandidatura.statusCandidatura = status;

    if (allVacancies.length > 0) {
        const vIndex = allVacancies.findIndex(v => String(v.id) === String(activeVaga.id));
        if (vIndex !== -1) {
            const cIndex = allVacancies[vIndex].candidaturas.findIndex(c => String(c.idCandidatura) === String(activeCandidatura.idCandidatura));
            if (cIndex !== -1) {
                allVacancies[vIndex].candidaturas[cIndex].statusCandidatura = activeCandidatura.statusCandidatura;
                sessionStorage.setItem('pojae_company_vacancies', JSON.stringify(allVacancies));
            }
        }
    }

    showToast(`Status da candidatura #${activeCandidatura.idCandidatura} atualizado para "${STATUS_CANDIDATURA_MAP[activeCandidatura.statusCandidatura]}".`, 'success');
}

function renderCandidateProfile() {
    const c = activeCandidatura;
    const v = activeVaga;
    const container = document.getElementById('candidate-profile-container');

    const skillsRowsHTML = c.habilidades && c.habilidades.length > 0
        ? c.habilidades.map(h => `
            <tr class="hover:bg-slate-50/80 transition">
                <td class="px-4 py-3.5 text-xs font-semibold text-pojae-700">
                    <span class="bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg inline-block">
                        ${TIPO_HABILIDADE_MAP[h.tipoHabilidade] || h.tipoHabilidade}
                    </span>
                </td>
                <td class="px-4 py-3.5 text-xs font-bold text-slate-900">${h.habilidade}</td>
                <td class="px-4 py-3.5">${renderStars(h.nivelProficiencia)}</td>
                <td class="px-4 py-3.5 text-xs text-slate-600">${h.observacoes || '-'}</td>
            </tr>
        `).join('')
        : `<tr><td colspan="4" class="px-4 py-6 text-center text-xs text-slate-400">Nenhuma habilidade cadastrada pelo estudante.</td></tr>`;

    container.innerHTML = `
        <!-- CABEÇALHO DO PERFIL E DADOS DA CANDIDATURA -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pojae-900 to-pojae-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
                        ${c.nomeCandidato.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <div class="flex flex-wrap items-center gap-2 mb-1">
                            <span class="font-mono text-xs font-extrabold bg-slate-900 text-white px-2.5 py-0.5 rounded-lg">
                                Candidatura #${c.idCandidatura}
                            </span>
                            <span class="text-xs font-semibold text-slate-500">
                                <i class="far fa-clock text-pojae-600 mr-1"></i> Enviada em ${formatDateTimeBR(c.dataHoraCandidatura)}
                            </span>
                        </div>
                        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">${c.nomeCandidato}</h1>
                        <p class="text-xs text-slate-500 mt-0.5">
                            Concorrendo à vaga: <strong class="text-pojae-700">#${v.id} - ${v.titulo}</strong>
                        </p>
                    </div>
                </div>

                <!-- CONTROLE DE STATUS DA CANDIDATURA -->
                <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 shrink-0">
                    <label for="profile-status-select" class="block text-[11px] font-bold text-slate-500 mb-1">
                        Status da Candidatura (RF08):
                    </label>
                    <select id="profile-status-select" onchange="updateCandidateApplicationStatus(this.value)" class="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-pojae-800 focus:outline-none focus:border-pojae-600 cursor-pointer">
                        <option value="1" ${c.statusCandidatura === 1 ? 'selected' : ''}>1 - Enviada</option>
                        <option value="2" ${c.statusCandidatura === 2 ? 'selected' : ''}>2 - Em Análise</option>
                        <option value="3" ${c.statusCandidatura === 3 ? 'selected' : ''}>3 - Aprovada</option>
                        <option value="4" ${c.statusCandidatura === 4 ? 'selected' : ''}>4 - Rejeitada</option>
                        <option value="5" ${c.statusCandidatura === 5 ? 'selected' : ''}>5 - Cancelada</option>
                    </select>
                </div>
            </div>

            <!-- MENSAGEM DE APRESENTAÇÃO -->
            <div class="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 space-y-1.5">
                <span class="text-xs font-extrabold text-pojae-900 flex items-center gap-1.5">
                    <i class="fas fa-quote-left text-pojae-600"></i> Mensagem de Apresentação do Candidato
                </span>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "${c.mensagemApresentacao}"
                </p>
            </div>
        </div>

        <!-- BLOCO 1: DADOS DE CONTATO E DOCUMENTAÇÃO ACADÊMICA (RF01 & RF07) -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-pojae-700 flex items-center justify-center font-bold text-lg">
                    <i class="fas fa-address-card"></i>
                </div>
                <div>
                    <h2 class="text-base font-bold text-slate-900">Dados de Contato & Documentação Anexada</h2>
                    <p class="text-xs text-slate-500">Informações disponibilizadas no cadastro do estudante e anexos da candidatura (RF07).</p>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    <span class="text-[11px] font-semibold text-slate-400 block mb-1">Nome Completo do Candidato</span>
                    <span class="font-bold text-slate-900 text-sm">${c.nomeCandidato}</span>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    <span class="text-[11px] font-semibold text-slate-400 block mb-1">E-mail de Contato</span>
                    <span class="font-bold text-slate-900 text-sm">${c.email}</span>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                    <span class="text-[11px] font-semibold text-slate-400 block mb-1">Telefone / WhatsApp</span>
                    <span class="font-bold text-slate-900 text-sm">${c.telefone}</span>
                </div>
            </div>

            <!-- DOCUMENTOS ANEXADOS (CURRÍCULO E HISTÓRICO ESCOLAR) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                        <div>
                            <span class="text-xs font-extrabold text-slate-900 block">Currículo do Estudante</span>
                            <span class="text-[11px] text-slate-500 font-mono">Identificador do Documento: #${c.curriculoId}</span>
                        </div>
                    </div>
                    <button onclick="showToast('Visualizando arquivo PDF do Currículo #${c.curriculoId}...', 'info')" class="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition">
                        <i class="fas fa-external-link-alt mr-1"></i> Abrir
                    </button>
                </div>

                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-blue-100 text-pojae-700 flex items-center justify-center text-lg">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div>
                            <span class="text-xs font-extrabold text-slate-900 block">Histórico Escolar</span>
                            <span class="text-[11px] text-slate-500 font-mono">Identificador do Documento: #${c.historicoEscolarId}</span>
                        </div>
                    </div>
                    <button onclick="showToast('Visualizando arquivo PDF do Histórico Escolar #${c.historicoEscolarId}...', 'info')" class="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition">
                        <i class="fas fa-external-link-alt mr-1"></i> Abrir
                    </button>
                </div>
            </div>
        </div>

        <!-- BLOCO 2: VÍNCULO ACADÊMICO (RF01) -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-pojae-700 flex items-center justify-center font-bold text-lg">
                    <i class="fas fa-university"></i>
                </div>
                <div>
                    <h2 class="text-base font-bold text-slate-900">Vínculo Acadêmico & Formação</h2>
                    <p class="text-xs text-slate-500">Dados escolares/universitários cadastrados pelo candidato em Maceió - AL.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 text-xs">
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 lg:col-span-6">
                    <span class="text-[11px] font-semibold text-slate-400 block mb-1">Instituição de Ensino (ID / Nome)</span>
                    <span class="font-bold text-slate-900 text-sm">${INSTITUICAO_MAP[c.instituicaoEnsino] || c.instituicaoEnsino}</span>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 lg:col-span-6">
                    <span class="text-[11px] font-semibold text-slate-400 block mb-1">Nome do Curso</span>
                    <span class="font-bold text-slate-900 text-sm">${c.nomeCurso}</span>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 lg:col-span-4">
                    <span class="text-[11px] font-semibold text-slate-400 block mb-1">Série / Período Atual</span>
                    <span class="font-bold text-slate-900 text-sm">${c.seriePeriodo}</span>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 lg:col-span-4">
                    <span class="text-[11px] font-semibold text-slate-400 block mb-1">Turno de Estudo</span>
                    <span class="font-bold text-slate-900 text-sm">${c.turno}</span>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 lg:col-span-4">
                    <span class="text-[11px] font-semibold text-slate-400 block mb-1">Conclusão Prevista do Curso</span>
                    <span class="font-bold text-slate-900 text-sm">${formatDateBR(c.conclusaoPrevista)}</span>
                </div>
            </div>
        </div>

        <!-- BLOCO 3: HABILIDADES E PROFICIÊNCIA DO CANDIDATO -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-pojae-700 flex items-center justify-center font-bold text-lg">
                    <i class="fas fa-star"></i>
                </div>
                <div>
                    <h2 class="text-base font-bold text-slate-900">Habilidades & Nível de Proficiência</h2>
                    <p class="text-xs text-slate-500">Competências técnicas e comportamentais declaradas pelo estudante.</p>
                </div>
            </div>

            <div class="overflow-x-auto border border-slate-200 rounded-2xl">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                            <th class="px-4 py-3">Tipo de Habilidade</th>
                            <th class="px-4 py-3">Habilidade</th>
                            <th class="px-4 py-3">Nível de Proficiência</th>
                            <th class="px-4 py-3">Observações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${skillsRowsHTML}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

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
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 4000);
}
