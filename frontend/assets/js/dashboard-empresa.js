// JAVASCRIPT PRINCIPAL

/* -------------------------------------------------------------------------- */
/* TABELAS DE DOMÍNIO                                                         */
/* -------------------------------------------------------------------------- */
const TIPO_VAGA_MAP = { 1: "1 - Estágio (Lei 11.788/08)", 2: "2 - Jovem Aprendiz" };
const MODALIDADE_MAP = { 1: "1 - Presencial", 2: "2 - Híbrido", 3: "3 - Remoto" };
const SETOR_MAP = {
    1: "1 - Tecnologia da Informação (TI)",
    2: "2 - Administração / Gestão",
    3: "3 - Jurídico / Direito",
    4: "4 - Engenharia / Arquitetura",
    5: "5 - Comunicação / Marketing"
};
const ESCOLARIDADE_MAP = { 1: "1 - Ensino Médio / Técnico", 2: "2 - Ensino Superior em Andamento" };
const FORMACAO_SUPERVISOR_MAP = {
    "Graduado": "Graduado na Área",
    "Especialista": "Pós-Graduado / Especialista",
    "Mestre": "Mestre / Doutor"
};

// Status da Candidatura (Integer -> Label)
const STATUS_CANDIDATURA_MAP = {
    1: "1 - Enviada",
    2: "2 - Em Análise",
    3: "3 - Aprovada",
    4: "4 - Rejeitada",
    5: "5 - Cancelada"
};

// Instituição de Ensino (Integer -> Label)
const INSTITUICAO_MAP = {
    1: "1 - Centro Universitário CESMAC",
    2: "2 - Universidade Federal de Alagoas (UFAL)",
    3: "3 - Instituto Federal de Alagoas (IFAL)",
    4: "4 - UNCISAL",
    5: "5 - Escola Estadual Moreira e Silva"
};

/* -------------------------------------------------------------------------- */
/* DADOS MOCKADOS COMPLETOS (VAGAS + CANDIDATURAS DETALHADAS)                 */
/* -------------------------------------------------------------------------- */
let companyVacancies = [];
const API_HOST = window.location.hostname || 'localhost';
const API_BASE_URL = window.POJAE_API_URL || `http://${API_HOST}:8080`;

async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        credentials: 'include',
        ...options,
        headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) }
    });
    if (!response.ok) throw new Error(response.status === 401 ? 'Entre com uma conta de empresa para acessar o painel.' : 'Não foi possível concluir a operação.');
    return response.status === 204 ? null : response.json();
}

function mapVacancy(v) {
    return { ...v, id: String(v.id), candidaturas: (v.candidaturas || []).map(c => ({ ...c,
        idCandidatura: String(c.idCandidatura), statusCandidatura: Number(c.statusCandidatura),
        habilidades: c.habilidades || [] })) };
}

let currentStatusFilter = 'ALL';

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const dashboard = await apiRequest('/vagas/minhas');
        companyVacancies = dashboard.vacancies.map(mapVacancy);
        const companyName = document.getElementById('company-name');
        const companyCnpj = document.getElementById('company-cnpj');
        const companyInitials = document.getElementById('company-initials');
        if (companyName) companyName.textContent = dashboard.companyName;
        if (companyCnpj) companyCnpj.textContent = dashboard.cnpj;
        if (companyInitials) companyInitials.textContent = dashboard.companyName.split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase();
        syncStorage(); updateMetrics(); renderVacancies();
        const openVagaId = new URLSearchParams(window.location.search).get('openCandidatesVagaId');
        if (openVagaId) openCandidatesModal(openVagaId);
    } catch (error) {
        companyVacancies = []; updateMetrics(); renderVacancies(); showToast(error.message, 'error');
    }
});

function syncStorage() {
    sessionStorage.setItem('pojae_company_vacancies', JSON.stringify(companyVacancies));
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatRawCurrency(value) {
    return Number(value).toFixed(2).replace('.', ',').replace(/(\d)(\d{3}),/g, '$1.$2,');
}

function maskCurrency(input) {
    let value = input.value.replace(/\D/g, "");
    value = (value / 100).toFixed(2) + "";
    value = value.replace(".", ",");
    value = value.replace(/(\d)(\d{3}),/g, "$1.$2,");
    input.value = value;
}

function formatDateBR(isoDate) {
    if (!isoDate) return '-';
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

function getStatusBadge(status) {
    switch (status) {
        case 'Publicada':
            return `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Publicada
                    </span>`;
        case 'Rascunho':
            return `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <i class="fas fa-pen-to-square text-[10px]"></i> Rascunho
                    </span>`;
        case 'Encerrada':
            return `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        <i class="fas fa-lock text-[10px]"></i> Encerrada
                    </span>`;
        default:
            return `<span class="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">${status}</span>`;
    }
}

function updateMetrics() {
    document.getElementById('metric-total').textContent = companyVacancies.length;
    document.getElementById('metric-publicadas').textContent = companyVacancies.filter(v => v.status === 'Publicada').length;
    document.getElementById('metric-rascunho').textContent = companyVacancies.filter(v => v.status === 'Rascunho').length;
    document.getElementById('metric-candidaturas').textContent = companyVacancies.reduce((acc, v) => acc + v.candidaturas.length, 0);
}

function setStatusFilter(status, btnElement) {
    currentStatusFilter = status;
    document.querySelectorAll('.status-tab').forEach(btn => {
        btn.classList.remove('bg-pojae-600', 'text-white', 'shadow-sm');
        btn.classList.add('bg-slate-100', 'text-slate-600');
    });
    btnElement.classList.remove('bg-slate-100', 'text-slate-600');
    btnElement.classList.add('bg-pojae-600', 'text-white', 'shadow-sm');
    renderVacancies();
}

function renderVacancies() {
    const container = document.getElementById('vacancies-list');
    const searchTerm = document.getElementById('filter-search').value.toLowerCase().trim();
    const typeFilter = document.getElementById('filter-type').value;

    const filtered = companyVacancies.filter(vaga => {
        const matchStatus = currentStatusFilter === 'ALL' || vaga.status === currentStatusFilter;
        const matchType = typeFilter === 'ALL' || String(vaga.tipoVaga) === typeFilter;
        const matchSearch = !searchTerm ||
            String(vaga.id).includes(searchTerm) ||
            vaga.titulo.toLowerCase().includes(searchTerm) ||
            vaga.cursosRelacionados.toLowerCase().includes(searchTerm) ||
            vaga.localidadeVaga.toLowerCase().includes(searchTerm);

        return matchStatus && matchType && matchSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-3xl p-12 border border-slate-200/80 text-center shadow-sm">
                <div class="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto mb-3">
                    <i class="fas fa-folder-open"></i>
                </div>
                <h3 class="text-base font-bold text-slate-800">Nenhuma vaga encontrada</h3>
                <p class="text-xs text-slate-500 mt-1 max-w-md mx-auto">Não há oportunidades cadastradas que correspondam aos filtros selecionados.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(vaga => `
        <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="font-mono text-xs font-extrabold bg-slate-900 text-white px-2.5 py-1 rounded-lg">#${vaga.id}</span>
                    ${getStatusBadge(vaga.status)}
                    <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-pojae-700 border border-blue-100">${TIPO_VAGA_MAP[vaga.tipoVaga]}</span>
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">${MODALIDADE_MAP[vaga.modalidadeTrabalho]}</span>
                </div>

                <div class="flex flex-wrap items-center gap-2">
                    <div class="flex items-center gap-1.5 mr-1">
                        <label for="status-select-${vaga.id}" class="text-[11px] font-bold text-slate-500">Status:</label>
                        <select id="status-select-${vaga.id}" onchange="changeVacancyStatus('${vaga.id}', this.value)" class="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-pojae-600 cursor-pointer">
                            <option value="Rascunho" ${vaga.status === 'Rascunho' ? 'selected' : ''}>Rascunho</option>
                            <option value="Publicada" ${vaga.status === 'Publicada' ? 'selected' : ''}>Publicada</option>
                            <option value="Encerrada" ${vaga.status === 'Encerrada' ? 'selected' : ''}>Encerrada</option>
                        </select>
                    </div>

                    <button onclick="openEditModal('${vaga.id}')" class="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold transition flex items-center gap-1.5">
                        <i class="fas fa-pen"></i><span>Editar</span>
                    </button>

                    <button onclick="openDeleteModal('${vaga.id}')" class="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition flex items-center gap-1.5">
                        <i class="fas fa-trash-alt"></i><span>Excluir</span>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 py-5 items-center">
                <div class="lg:col-span-8 space-y-2.5">
                    <h2 class="text-lg sm:text-xl font-extrabold text-slate-900">${vaga.titulo}</h2>
                    <p class="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">${vaga.descricao}</p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-600">
                        <div class="flex items-center gap-2"><i class="fas fa-map-marker-alt text-red-500 w-4 text-center"></i><span><strong>Local:</strong> ${vaga.localidadeVaga}</span></div>
                        <div class="flex items-center gap-2"><i class="fas fa-money-bill-wave text-emerald-600 w-4 text-center"></i><span><strong>Bolsa:</strong> ${formatCurrencyBRL(vaga.valorBolsa)}</span></div>
                        <div class="flex items-center gap-2"><i class="fas fa-user-plus text-pojae-600 w-4 text-center"></i><span><strong>Vagas:</strong> ${vaga.quantidadeVagas} ${vaga.quantidadeVagas > 1 ? 'posições' : 'posição'}</span></div>
                        <div class="flex items-center gap-2"><i class="fas fa-clock text-blue-500 w-4 text-center"></i><span><strong>Carga:</strong> ${vaga.cargaHorariaDiaria}h/dia (${vaga.cargaHorariaSemanal}h/sem)</span></div>
                        <div class="flex items-center gap-2"><i class="fas fa-user-shield text-amber-600 w-4 text-center"></i><span class="truncate"><strong>Supervisor:</strong> ${vaga.supervisorNome}</span></div>
                        <div class="flex items-center gap-2"><i class="fas fa-calendar-alt text-slate-400 w-4 text-center"></i><span><strong>Vigência:</strong> ${formatDateBR(vaga.inicioPrevisto)} a ${formatDateBR(vaga.terminoPrevisto)}</span></div>
                    </div>
                </div>

                <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <button onclick="openCandidatesModal('${vaga.id}')" class="w-full text-left bg-white hover:bg-blue-50/70 border border-slate-200 hover:border-pojae-500 p-3.5 rounded-xl transition flex items-center justify-between group shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="w-11 h-11 rounded-xl bg-pojae-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                                ${vaga.candidaturas.length}
                            </div>
                            <div>
                                <span class="block text-xs font-extrabold text-slate-900 group-hover:text-pojae-700 transition">Candidaturas Recebidas</span>
                                <span class="text-[11px] text-pojae-600 font-semibold flex items-center gap-1 mt-0.5">Clique para ver candidatos <i class="fas fa-chevron-right text-[9px]"></i></span>
                            </div>
                        </div>
                    </button>

                    <button onclick="openDetailsModal('${vaga.id}')" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2">
                        <i class="fas fa-eye"></i><span>Visualizar Ficha Completa da Vaga</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

async function changeVacancyStatus(vagaId, newStatus) {
    const vaga = companyVacancies.find(v => String(v.id) === String(vagaId));
    if (!vaga) return;
    const oldStatus = vaga.status;
    try { await apiRequest(`/vagas/minhas/${vagaId}/status?status=${encodeURIComponent(newStatus)}`, { method: 'PATCH' }); }
    catch (error) { showToast(error.message, 'error'); renderVacancies(); return; }
    vaga.status = newStatus;
    syncStorage();
    updateMetrics();
    renderVacancies();
    showToast(`Vaga #${vaga.id} alterada de "${oldStatus}" para "${newStatus}".`, 'success');
}

async function changeApplicationStatus(vagaId, idCandidatura, newStatusInt) {
    const vaga = companyVacancies.find(v => String(v.id) === String(vagaId));
    if (!vaga) return;
    const cand = vaga.candidaturas.find(c => c.idCandidatura === idCandidatura);
    if (!cand) return;

    const status = Number(newStatusInt);
    try { await apiRequest(`/candidaturas/${idCandidatura}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }); }
    catch (error) { showToast(error.message, 'error'); renderVacancies(); return; }
    cand.statusCandidatura = status;
    syncStorage();
    showToast(`Candidatura #${idCandidatura} atualizada para "${STATUS_CANDIDATURA_MAP[cand.statusCandidatura]}".`, 'success');
}

/* -------------------------------------------------------------------------- */
/* MODAL 1: FICHA DETALHADA DA VAGA                                           */
/* -------------------------------------------------------------------------- */
function openDetailsModal(vagaId) {
    const vaga = companyVacancies.find(v => String(v.id) === String(vagaId));
    if (!vaga) return;

    const content = document.getElementById('modal-details-content');
    content.innerHTML = `
        <div class="border-b border-slate-100 pb-5 mb-6 pr-8">
            <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="font-mono text-xs font-extrabold bg-pojae-900 text-white px-2.5 py-1 rounded-lg">ID da Vaga: #${vaga.id}</span>
                ${getStatusBadge(vaga.status)}
                <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-pojae-700 border border-blue-100">${TIPO_VAGA_MAP[vaga.tipoVaga]}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">${vaga.titulo}</h2>
            <p class="text-xs text-slate-500 mt-1">
                <i class="fas fa-building text-pojae-600 mr-1"></i> <strong>Empresa Concedente:</strong> ${vaga.empresaResponsavel} • 
                <i class="fas fa-map-marker-alt text-red-500 ml-1 mr-1"></i> ${vaga.localidadeVaga}
            </p>
        </div>

        <div class="space-y-6 text-xs">
            <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 class="text-sm font-extrabold text-slate-900 flex items-center gap-2"><i class="fas fa-bullhorn text-pojae-600"></i> Informações Básicas</h3>
                <div>
                    <span class="font-bold text-slate-700 block mb-1">Descrição Geral da Vaga:</span>
                    <p class="text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/60">${vaga.descricao}</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Tipo de Vaga</span><span class="font-bold text-slate-800">${TIPO_VAGA_MAP[vaga.tipoVaga]}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Modalidade</span><span class="font-bold text-slate-800">${MODALIDADE_MAP[vaga.modalidadeTrabalho]}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Qtd. de Vagas</span><span class="font-bold text-slate-800">${vaga.quantidadeVagas} vaga(s)</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Valor da Bolsa</span><span class="font-extrabold text-emerald-600 text-sm">${formatCurrencyBRL(vaga.valorBolsa)}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Candidaturas Recebidas</span><span class="font-bold text-pojae-700">${vaga.candidaturas.length} inscrito(s)</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Localidade</span><span class="font-bold text-slate-800">${vaga.localidadeVaga}</span></div>
                </div>
                <div>
                    <span class="font-bold text-slate-700 block mb-1">Benefícios Oferecidos:</span>
                    <p class="text-slate-600 bg-white p-3 rounded-xl border border-slate-200/60">${vaga.beneficiosOferecidos || 'Não informado'}</p>
                </div>
            </div>

            <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 class="text-sm font-extrabold text-slate-900 flex items-center gap-2"><i class="fas fa-clock text-pojae-600"></i> Jornada & Vigência</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60 sm:col-span-3"><span class="text-[11px] text-slate-400 font-semibold block">Dia(s) da Semana & Horário</span><span class="font-bold text-slate-800">${vaga.diasSemana}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Carga Horária Diária</span><span class="font-bold text-slate-800">${vaga.cargaHorariaDiaria} horas/dia</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Carga Horária Semanal</span><span class="font-bold text-slate-800">${vaga.cargaHorariaSemanal} horas/semana</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Início Previsto</span><span class="font-bold text-slate-800">${formatDateBR(vaga.inicioPrevisto)}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Término Previsto</span><span class="font-bold text-slate-800">${formatDateBR(vaga.terminoPrevisto)}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60 sm:col-span-2"><span class="text-[11px] text-slate-400 font-semibold block">Período de Recesso</span><span class="font-bold text-slate-800">${vaga.periodoRecesso}</span></div>
                </div>
            </div>

            <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 class="text-sm font-extrabold text-slate-900 flex items-center gap-2"><i class="fas fa-tasks text-pojae-600"></i> Plano Formativo & Critérios</h3>
                <div><span class="font-bold text-slate-700 block mb-1">Objetivo da Oportunidade:</span><p class="text-slate-600 bg-white p-3 rounded-xl border border-slate-200/60">${vaga.objetivoOportunidade}</p></div>
                <div><span class="font-bold text-slate-700 block mb-1">Atividades Previstas:</span><p class="text-slate-600 bg-white p-3 rounded-xl border border-slate-200/60">${vaga.atividadesPrevistas}</p></div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Setor de Atuação</span><span class="font-bold text-slate-800">${SETOR_MAP[vaga.setorAtuacao]}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Escolaridade</span><span class="font-bold text-slate-800">${ESCOLARIDADE_MAP[vaga.escolaridade]}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200/60"><span class="text-[11px] text-slate-400 font-semibold block">Série / Período</span><span class="font-bold text-slate-800">${vaga.seriePeriodoDesejado}</span></div>
                </div>
                <div><span class="font-bold text-slate-700 block mb-1">Curso(s) Relacionado(s):</span><p class="text-slate-600 bg-white p-3 rounded-xl border border-slate-200/60">${vaga.cursosRelacionados}</p></div>
                <div><span class="font-bold text-slate-700 block mb-1">Habilidades Desejadas:</span><p class="text-slate-600 bg-white p-3 rounded-xl border border-slate-200/60">${vaga.habilidadesDesejadas}</p></div>
                <div><span class="font-bold text-slate-700 block mb-1">Observações Adicionais:</span><p class="text-slate-600 bg-white p-3 rounded-xl border border-slate-200/60">${vaga.observacoesCriterios || 'Nenhuma observação adicional.'}</p></div>
            </div>

            <div class="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80 space-y-4">
                <h3 class="text-sm font-extrabold text-amber-950 flex items-center gap-2"><i class="fas fa-user-shield text-amber-700"></i> Orientador / Supervisor Responsável (RN02)</h3>
                <div class="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div class="bg-white p-3 rounded-xl border border-amber-200/60 sm:col-span-8"><span class="text-[11px] text-amber-800/70 font-semibold block">Nome Completo do Supervisor</span><span class="font-bold text-slate-900">${vaga.supervisorNome}</span></div>
                    <div class="bg-white p-3 rounded-xl border border-amber-200/60 sm:col-span-4"><span class="text-[11px] text-amber-800/70 font-semibold block">Nível de Formação</span><span class="font-bold text-slate-900">${FORMACAO_SUPERVISOR_MAP[vaga.supervisorFormacao] || vaga.supervisorFormacao}</span></div>
                </div>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between gap-3 pt-6 mt-6 border-t border-slate-100">
            <div class="flex gap-2">
                <button onclick="closeModal('modal-vacancy-details'); openEditModal('${vaga.id}');" class="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5"><i class="fas fa-pen"></i> Editar Vaga</button>
                <button onclick="closeModal('modal-vacancy-details'); openDeleteModal('${vaga.id}');" class="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5"><i class="fas fa-trash-alt"></i> Excluir</button>
            </div>
            <div class="flex gap-2">
                <button onclick="closeModal('modal-vacancy-details'); openCandidatesModal('${vaga.id}');" class="px-5 py-2.5 bg-pojae-600 hover:bg-pojae-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2"><i class="fas fa-users"></i> Ver Candidatos (${vaga.candidaturas.length})</button>
                <button onclick="closeModal('modal-vacancy-details')" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition">Fechar</button>
            </div>
        </div>
    `;
    openModal('modal-vacancy-details');
}

/* -------------------------------------------------------------------------- */
/* MODAL 2 & 3: EDIÇÃO E EXCLUSÃO                                             */
/* -------------------------------------------------------------------------- */
function openEditModal(vagaId) {
    const vaga = companyVacancies.find(v => String(v.id) === String(vagaId));
    if (!vaga) return;
    document.getElementById('edit-id').value = vaga.id;
    document.getElementById('edit-modal-id-label').textContent = `#${vaga.id}`;
    document.getElementById('edit-titulo').value = vaga.titulo;
    document.getElementById('edit-tipo-vaga').value = vaga.tipoVaga;
    document.getElementById('edit-empresa-resp').value = vaga.empresaResponsavel;
    document.getElementById('edit-qtd-vagas').value = vaga.quantidadeVagas;
    document.getElementById('edit-modalidade').value = vaga.modalidadeTrabalho;
    document.getElementById('edit-localidade').value = vaga.localidadeVaga;
    document.getElementById('edit-status').value = vaga.status;
    document.getElementById('edit-descricao').value = vaga.descricao;
    document.getElementById('edit-bolsa').value = formatRawCurrency(vaga.valorBolsa);
    document.getElementById('edit-ch-diaria').value = vaga.cargaHorariaDiaria;
    document.getElementById('edit-ch-semanal').value = vaga.cargaHorariaSemanal;
    document.getElementById('edit-dias-semana').value = vaga.diasSemana;
    document.getElementById('edit-recesso').value = vaga.periodoRecesso;
    document.getElementById('edit-inicio').value = vaga.inicioPrevisto;
    document.getElementById('edit-termino').value = vaga.terminoPrevisto;
    document.getElementById('edit-beneficios').value = vaga.beneficiosOferecidos;
    document.getElementById('edit-objetivo').value = vaga.objetivoOportunidade;
    document.getElementById('edit-atividades').value = vaga.atividadesPrevistas;
    document.getElementById('edit-setor').value = vaga.setorAtuacao;
    document.getElementById('edit-escolaridade').value = vaga.escolaridade;
    document.getElementById('edit-serie-periodo').value = vaga.seriePeriodoDesejado;
    document.getElementById('edit-cursos').value = vaga.cursosRelacionados;
    document.getElementById('edit-habilidades').value = vaga.habilidadesDesejadas;
    document.getElementById('edit-obs-criterios').value = vaga.observacoesCriterios || '';
    document.getElementById('edit-supervisor-nome').value = vaga.supervisorNome;
    document.getElementById('edit-supervisor-formacao').value = vaga.supervisorFormacao;
    openModal('modal-edit-vacancy');
}

async function handleEditSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const vaga = companyVacancies.find(v => String(v.id) === String(id));
    if (!vaga) return;

    const rawBolsa = document.getElementById('edit-bolsa').value.replace(/\./g, '').replace(',', '.');
    vaga.titulo = document.getElementById('edit-titulo').value;
    vaga.tipoVaga = parseInt(document.getElementById('edit-tipo-vaga').value);
    vaga.empresaResponsavel = document.getElementById('edit-empresa-resp').value;
    vaga.quantidadeVagas = parseInt(document.getElementById('edit-qtd-vagas').value);
    vaga.modalidadeTrabalho = parseInt(document.getElementById('edit-modalidade').value);
    vaga.localidadeVaga = document.getElementById('edit-localidade').value;
    vaga.status = document.getElementById('edit-status').value;
    vaga.descricao = document.getElementById('edit-descricao').value;
    vaga.valorBolsa = parseFloat(rawBolsa) || 0;
    vaga.cargaHorariaDiaria = parseInt(document.getElementById('edit-ch-diaria').value);
    vaga.cargaHorariaSemanal = parseInt(document.getElementById('edit-ch-semanal').value);
    vaga.diasSemana = document.getElementById('edit-dias-semana').value;
    vaga.periodoRecesso = document.getElementById('edit-recesso').value;
    vaga.inicioPrevisto = document.getElementById('edit-inicio').value;
    vaga.terminoPrevisto = document.getElementById('edit-termino').value;
    vaga.beneficiosOferecidos = document.getElementById('edit-beneficios').value;
    vaga.objetivoOportunidade = document.getElementById('edit-objetivo').value;
    vaga.atividadesPrevistas = document.getElementById('edit-atividades').value;
    vaga.setorAtuacao = parseInt(document.getElementById('edit-setor').value);
    vaga.escolaridade = parseInt(document.getElementById('edit-escolaridade').value);
    vaga.seriePeriodoDesejado = document.getElementById('edit-serie-periodo').value;
    vaga.cursosRelacionados = document.getElementById('edit-cursos').value;
    vaga.habilidadesDesejadas = document.getElementById('edit-habilidades').value;
    vaga.observacoesCriterios = document.getElementById('edit-obs-criterios').value;
    vaga.supervisorNome = document.getElementById('edit-supervisor-nome').value;
    vaga.supervisorFormacao = document.getElementById('edit-supervisor-formacao').value;

    const toApiDate = value => value ? value.split('-').reverse().join('/') : null;
    const payload = {
        title: vaga.titulo, description: vaga.descricao, dailyWorkingHours: vaga.cargaHorariaDiaria,
        workSchedule: vaga.diasSemana, type: vaga.tipoVaga === 1 ? 'ESTAGIARIO' : 'JOVEM_APRENDIZ',
        numberOfPositions: vaga.quantidadeVagas, daysOfTheWeek: vaga.diasSemanaCount || 5,
        weeklyWorkingHours: vaga.cargaHorariaSemanal, scholarshipAmount: vaga.valorBolsa,
        opportunityObjective: vaga.objetivoOportunidade, expectedActivities: vaga.atividadesPrevistas,
        sector: String(vaga.setorAtuacao), minimumEducation: String(vaga.escolaridade),
        gradeOrAcademicTerm: vaga.seriePeriodoDesejado, relatedCourses: vaga.cursosRelacionados,
        desiredSkills: vaga.habilidadesDesejadas, criteriaObservations: vaga.observacoesCriterios,
        supervisorName: vaga.supervisorNome, supervisorEducation: vaga.supervisorFormacao,
        recessPeriod: vaga.periodoRecesso, expectedStartDate: toApiDate(vaga.inicioPrevisto),
        expectedEndDate: toApiDate(vaga.terminoPrevisto), benefitsOffered: vaga.beneficiosOferecidos,
        location: vaga.localidadeVaga, workModality: ['PRESENCIAL','HIBRIDO','REMOTO'][vaga.modalidadeTrabalho - 1],
        status: vaga.status === 'Rascunho' ? 'RASCUNHO' : vaga.status === 'Encerrada' ? 'ENCERRADA' : 'PUBLICADA'
    };
    try { await apiRequest(`/vagas/minhas/${id}`, { method: 'PUT', body: JSON.stringify(payload) }); }
    catch (error) { showToast(error.message, 'error'); return; }
    syncStorage();
    updateMetrics();
    renderVacancies();
    closeModal('modal-edit-vacancy');
    showToast(`Vaga #${vaga.id} atualizada com sucesso!`, 'success');
}

function openDeleteModal(vagaId) {
    const vaga = companyVacancies.find(v => String(v.id) === String(vagaId));
    if (!vaga) return;
    document.getElementById('delete-vacancy-id').value = vaga.id;
    document.getElementById('delete-modal-title').textContent = vaga.titulo;
    document.getElementById('delete-modal-id').textContent = `#${vaga.id}`;
    openModal('modal-delete-vacancy');
}

async function confirmDeleteVacancy() {
    const id = document.getElementById('delete-vacancy-id').value;
    try { await apiRequest(`/vagas/minhas/${id}`, { method: 'DELETE' }); }
    catch (error) { showToast(error.message, 'error'); return; }
    companyVacancies = companyVacancies.filter(v => String(v.id) !== String(id));
    syncStorage();
    updateMetrics();
    renderVacancies();
    closeModal('modal-delete-vacancy');
    showToast(`Vaga #${id} removida permanentemente.`, 'info');
}

/* -------------------------------------------------------------------------- */
/* MODAL 4: GESTÃO DE CANDIDATOS INSCRITOS (ATUALIZADO CONFORME REQUISITOS)   */
/* -------------------------------------------------------------------------- */
function openCandidatesModal(vagaId) {
    const vaga = companyVacancies.find(v => String(v.id) === String(vagaId));
    if (!vaga) return;

    const content = document.getElementById('modal-candidates-content');

    const candidatesHTML = vaga.candidaturas.length > 0
        ? vaga.candidaturas.map(cand => `
            <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                <!-- TOPO DO CARD: ID CANDIDATURA, DATA/HORA E STATUS -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="font-mono text-[11px] font-extrabold bg-slate-900 text-white px-2.5 py-0.5 rounded-md">
                            Candidatura #${cand.idCandidatura}
                        </span>
                        <span class="text-[11px] text-slate-500 font-medium">
                            <i class="far fa-clock text-pojae-600 mr-1"></i> ${formatDateTimeBR(cand.dataHoraCandidatura)}
                        </span>
                    </div>

                    <div class="flex items-center gap-1.5">
                        <label class="text-[11px] font-bold text-slate-500">Status:</label>
                        <select onchange="changeApplicationStatus('${vaga.id}', '${cand.idCandidatura}', this.value)" class="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-pojae-800 focus:outline-none focus:border-pojae-600 cursor-pointer">
                            <option value="1" ${cand.statusCandidatura === 1 ? 'selected' : ''}>1 - Enviada</option>
                            <option value="2" ${cand.statusCandidatura === 2 ? 'selected' : ''}>2 - Em Análise</option>
                            <option value="3" ${cand.statusCandidatura === 3 ? 'selected' : ''}>3 - Aprovada</option>
                            <option value="4" ${cand.statusCandidatura === 4 ? 'selected' : ''}>4 - Rejeitada</option>
                            <option value="5" ${cand.statusCandidatura === 5 ? 'selected' : ''}>5 - Cancelada</option>
                        </select>
                    </div>
                </div>

                <!-- DADOS DO CANDIDATO (NOME, CONTATO, CURSO E INSTITUIÇÃO) -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div class="flex items-start gap-3.5">
                        <div class="w-11 h-11 rounded-2xl bg-pojae-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                            ${cand.nomeCandidato.substring(0, 2).toUpperCase()}
                        </div>
                        <div class="space-y-1">
                            <h4 class="text-base font-extrabold text-slate-900">${cand.nomeCandidato}</h4>
                            <p class="text-xs text-slate-600 font-medium">
                                <i class="fas fa-university text-pojae-600 mr-1"></i> ${cand.instituicaoEnsino} • <strong>${cand.nomeCurso}</strong> (${cand.seriePeriodo} - ${cand.turno})
                            </p>
                            <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                                <span><i class="fas fa-envelope text-slate-400 mr-1"></i> ${cand.email}</span>
                                <span><i class="fas fa-phone text-slate-400 mr-1"></i> ${cand.telefone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MENSAGEM DE APRESENTAÇÃO -->
                <div class="bg-white p-3.5 rounded-xl border border-slate-200/70 text-xs text-slate-600 leading-relaxed">
                    <span class="font-bold text-slate-800 block mb-1">
                        <i class="fas fa-comment-alt text-pojae-600 mr-1"></i> Mensagem de Apresentação:
                    </span>
                    "${cand.mensagemApresentacao}"
                </div>

                <!-- RODAPÉ DO CARD: ANEXOS (RF07) E BOTÃO VER MAIS SOBRE O CANDIDATO -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div class="flex flex-wrap gap-2">
                        <button onclick="downloadApplicationDocument('${cand.idCandidatura}', 'curriculo')" class="text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5">
                            <i class="fas fa-file-pdf text-red-500"></i> Currículo (#${cand.curriculoId})
                        </button>
                        <button onclick="downloadApplicationDocument('${cand.idCandidatura}', 'historico')" class="text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition flex items-center gap-1.5">
                            <i class="fas fa-graduation-cap text-blue-600"></i> Histórico (#${cand.historicoEscolarId})
                        </button>
                    </div>

                    <!-- BOTÃO SOLICITADO: VER MAIS SOBRE O CANDIDATO (ABRE PÁGINA DO PERFIL COMPLETO) -->
                    <a href="visualizar-candidato.html?vagaId=${vaga.id}&candidaturaId=${cand.idCandidatura}" class="bg-pojae-600 hover:bg-pojae-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2">
                        <i class="fas fa-id-card"></i>
                        <span>Ver mais sobre ${cand.nomeCandidato.split(' ')[0]}</span>
                        <i class="fas fa-arrow-right text-[10px]"></i>
                    </a>
                </div>
            </div>
        `).join('')
        : `
            <div class="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 text-center">
                <i class="fas fa-user-clock text-3xl text-slate-300 mb-2"></i>
                <p class="text-sm font-bold text-slate-700">Ainda não há candidatos inscritos nesta oportunidade.</p>
                <p class="text-xs text-slate-500 mt-1">
                    ${vaga.status === 'Rascunho' ? 'Publique a vaga para que estudantes de Maceió possam se candidatar.' : 'Aguardando novas inscrições de estudantes.'}
                </p>
            </div>
        `;

    content.innerHTML = `
        <div class="border-b border-slate-100 pb-4 mb-5 pr-8">
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-pojae-600 mb-1">
                <i class="fas fa-users"></i> RF08 - GESTÃO DE CANDIDATOS INSCRITOS
            </div>
            <h2 class="text-xl font-extrabold text-slate-900">${vaga.titulo}</h2>
            <p class="text-xs text-slate-500 mt-0.5">
                Vaga <strong>#${vaga.id}</strong> • Total de candidaturas recebidas: <strong>${vaga.candidaturas.length}</strong>
            </p>
        </div>

        <div class="space-y-4">
            ${candidatesHTML}
        </div>

        <div class="flex justify-end pt-5 mt-5 border-t border-slate-100">
            <button onclick="closeModal('modal-vacancy-candidates')" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition">
                Fechar
            </button>
        </div>
    `;

    openModal('modal-vacancy-candidates');
}

async function downloadApplicationDocument(applicationId, type) {
    try {
        const response = await fetch(`${API_BASE_URL}/candidaturas/${applicationId}/documentos/${type}`, { credentials: 'include' });
        if (!response.ok) throw new Error('Não foi possível abrir o documento.');
        const blob = await response.blob(); const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = url; link.download = `${type}.pdf`; link.click(); URL.revokeObjectURL(url);
    } catch (error) { showToast(error.message, 'error'); }
}

/* -------------------------------------------------------------------------- */
/* CONTROLE DE MODAIS E TOASTS                                                */
/* -------------------------------------------------------------------------- */
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = '';
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
