/* -------------------------------------------------------------------------- */
/* DADOS INICIAIS DE SIMULAÇÃO                                                */
/* -------------------------------------------------------------------------- */
const initialJobs = [
    {
        id: 1,
        title: "Estágio em Desenvolvimento Web & Software",
        company: "Tecnologia Alagoana S.A.",
        location: "Farol, Maceió - AL",
        category: "Tecnologia",
        stipend: 1200,
        skills: ["JavaScript", "HTML/CSS", "Git"],
        supervisor: "Eng. Roberto Melo (Pós-graduado)",
        active: true
    },
    {
        id: 2,
        title: "Estágio em Gestão Administrativa",
        company: "Grupo Comercial Pajuçara",
        location: "Centro, Maceió - AL",
        category: "Administração",
        stipend: 950,
        skills: ["Excel Intermediário", "Organização", "Atendimento"],
        supervisor: "Adm. Luciana Santos (Graduada)",
        active: true
    },
    {
        id: 3,
        title: "Estágio Jurídico - Contratos e Processos",
        company: "Alves & Coêlho Advogados Assoc.",
        location: "Jatiúca, Maceió - AL",
        category: "Direito",
        stipend: 1100,
        skills: ["Pesquisa Jurídica", "Peças Processuais"],
        supervisor: "Dr. Mozart Melo (Mestre em Direito)",
        active: true
    },
    {
        id: 4,
        title: "Estágio em Engenharia Civil e Obras",
        company: "Maceió Engenharias Unidas",
        location: "Mangabeiras, Maceió - AL",
        category: "Engenharia",
        stipend: 1300,
        skills: ["AutoCAD", "Orçamento", "AutoCAD 3D"],
        supervisor: "Eng. Vinícius Coêlho (Especialista)",
        active: true
    }
];

const initialCandidates = [
    { id: 101, name: "João Victor A. Coêlho", course: "Engenharia de Software (CESMAC)", status: "Em Análise", cv: true, historico: true },
    { id: 102, name: "Maria Fernanda Lima", course: "Administração (UFAL)", status: "Entrevista Agendada", cv: true, historico: true },
    { id: 103, name: "Lucas Gabriel Torres", course: "Direito (CESMAC)", status: "Documentação Pendente", cv: true, historico: false }
];

let jobsData = [...initialJobs];
let candidatesData = [...initialCandidates];
let currentFilterCategory = 'all';
let currentActiveJobForApply = null;

/* -------------------------------------------------------------------------- */
/* INICIALIZAÇÃO DA APLICAÇÃO E ANIMAÇÕES AO CARREGAR A PÁGINA                */
/* -------------------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    renderJobCards();
    renderRecruiterCandidates();
    setupScrollReveal();
    setupMobileMenu();
});

/* --------------------------------------------------------------------------------- */
/* 1. MENU HAMBÚRGUER: LÓGICA, MICROINTERAÇÕES, ANIMAÇÕES MOBILE, BOTÃO X E BACKDROP */
/* --------------------------------------------------------------------------------- */

function setupMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    
    // Proteção preventiva caso mude de página
    if (!btn || !menu) return; 

    const links = menu.querySelectorAll('a');

    // Alternar ao clicar no botão hambúrguer do topo
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita conflito de cliques
        const isOpen = btn.classList.contains('is-active');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Fechar ao clicar em qualquer link interno
    links.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

function openMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    btn.classList.add('is-active');
    menu.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
}

function closeMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    btn.classList.remove('is-active');
    menu.classList.remove('is-open');
    document.body.style.overflow = ''; // Restaura o scroll
}

// Permite fechar o menu ao clicar na área escura (fora dos links)
function closeMobileMenuOnBackdrop(e) {
    if (e.target.id === 'mobile-menu') {
        closeMobileMenu();
    }
}

/* -------------------------------------------------------------------------- */
/* 2. ANIMAÇÃO DE SCROLL COM BLUR SUAVE (INTERSECTION OBSERVER NATIVO)        */
/* -------------------------------------------------------------------------- */
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.15 
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/* -------------------------------------------------------------------------- */
/* RENDERIZAÇÃO DO FEED DE VAGAS                                              */
/* -------------------------------------------------------------------------- */
function renderJobCards() {
    const container = document.getElementById('job-cards-container');
    const searchKeyword = document.getElementById('search-keyword').value.toLowerCase();
    const searchCategory = document.getElementById('search-category').value;

    container.innerHTML = '';

    const filteredJobs = jobsData.filter(job => {
        const matchesCategory = (currentFilterCategory === 'all' || job.category === currentFilterCategory) &&
                                (!searchCategory || job.category === searchCategory);
        const matchesKeyword = !searchKeyword || 
                                job.title.toLowerCase().includes(searchKeyword) || 
                                job.company.toLowerCase().includes(searchKeyword) ||
                                job.skills.some(s => s.toLowerCase().includes(searchKeyword));
        return matchesCategory && matchesKeyword;
    });

    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200">
                <i class="fas fa-search text-3xl text-slate-300 mb-3"></i>
                <p class="text-sm font-bold text-slate-700">Nenhuma vaga encontrada para os critérios selecionados.</p>
                <p class="text-xs text-slate-400 mt-1">Tente buscar por termos mais genéricos ou limpe os filtros em Maceió.</p>
            </div>
        `;
        return;
    }

    filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group";
        
        card.innerHTML = `
            <div>
                <div class="flex items-start justify-between gap-2 mb-3">
                    <span class="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-blue-50 text-pojae-700 border border-blue-100">
                        ${job.category}
                    </span>
                    <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        R$ ${job.stipend}/mês
                    </span>
                </div>

                <h3 class="font-bold text-base text-slate-900 group-hover:text-pojae-600 transition mb-1">${job.title}</h3>
                <p class="text-xs font-medium text-slate-600 mb-3"><i class="fas fa-building text-slate-400 mr-1"></i> ${job.company}</p>
                
                <div class="text-xs text-slate-500 space-y-1 mb-4">
                    <div><i class="fas fa-map-marker-alt text-red-400 mr-1.5"></i> ${job.location}</div>
                    <div><i class="fas fa-user-tie text-blue-500 mr-1.5"></i> Supervisor: ${job.supervisor}</div>
                </div>

                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${job.skills.map(s => `<span class="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md">#${s}</span>`).join('')}
                </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[10px] text-slate-400 font-medium"><i class="fas fa-clock mr-1"></i> Vaga Ativa</span>
                <button onclick="openApplyModal(${job.id})" class="bg-pojae-600 hover:bg-pojae-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md shadow-blue-600/20 flex items-center gap-1.5">
                    <i class="fas fa-paper-plane"></i> Candidatar-se
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

/* -------------------------------------------------------------------------- */
/* PREVIEW DO PAINEL DO RECRUTADOR                                            */
/* -------------------------------------------------------------------------- */
function renderRecruiterCandidates() {
    const list = document.getElementById('recruiter-candidates-list');
    if (!list) return;
    list.innerHTML = '';

    candidatesData.forEach(c => {
        const item = document.createElement('div');
        item.className = "bg-slate-700/60 p-3 rounded-xl border border-slate-600 flex items-center justify-between gap-3 text-xs";
        item.innerHTML = `
            <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center text-xs">
                    ${c.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                    <div class="font-bold text-white">${c.name}</div>
                    <div class="text-[10px] text-slate-400">${c.course}</div>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-[10px] bg-blue-900/60 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-500/30">
                    ${c.status}
                </span>
                <button onclick="showToast('Visualizando histórico de ${c.name}', 'info')" class="text-slate-300 hover:text-white p-1" title="Ver Histórico (RF07)">
                    <i class="fas fa-file-alt"></i>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
}

/* -------------------------------------------------------------------------- */
/* FILTROS E PESQUISA DE VAGAS                                                */
/* -------------------------------------------------------------------------- */
function filterByCategory(cat, e) {
    currentFilterCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-pojae-600', 'text-white');
        btn.classList.add('bg-white', 'text-slate-600');
    });
    
    const targetElement = e ? e.target : window.event.srcElement;
    if(targetElement) {
        targetElement.classList.remove('bg-white', 'text-slate-600');
        targetElement.classList.add('bg-pojae-600', 'text-white');
    }
    renderJobCards();
}

function filterJobs() {
    renderJobCards();
}

/* -------------------------------------------------------------------------- */
/* CONTROLE DOS MODAIS                                                        */
/* -------------------------------------------------------------------------- */
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function openApplyModal(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    currentActiveJobForApply = job;

    document.getElementById('modal-job-title').textContent = job.title;
    document.getElementById('modal-job-company').textContent = `${job.company} • ${job.location}`;
    openModal('modal-apply');
}

function updateFileLabel(input, labelId) {
    if (input.files && input.files[0]) {
        document.getElementById(labelId).textContent = `${input.files[0].name} (Anexado com sucesso)`;
    }
}

/* -------------------------------------------------------------------------- */
/* SUBMISSÃO DOS FORMULÁRIOS COM FEEDBACK                                     */
/* -------------------------------------------------------------------------- */
function handleApplySubmit(e) {
    e.preventDefault();
    const name = document.getElementById('candidate-name').value;
    const inst = document.getElementById('candidate-institution').value;

    candidatesData.unshift({
        id: Date.now(),
        name: name,
        course: `Estudante (${inst})`,
        status: "Inscrito Hoje",
        cv: true,
        historico: true
    });

    renderRecruiterCandidates();
    closeModal('modal-apply');
    showToast(`Candidatura enviada para ${currentActiveJobForApply ? currentActiveJobForApply.company : 'empresa'} com sucesso!`, 'success');
}

function handlePostJobSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('new-job-title').value;
    const company = document.getElementById('new-job-company').value;
    const location = document.getElementById('new-job-location').value;
    const category = document.getElementById('new-job-category').value;
    const stipend = document.getElementById('new-job-stipend').value;

    const newJob = {
        id: Date.now(),
        title,
        company,
        location: `${location}, Maceió - AL`,
        category,
        stipend,
        skills: ["Estágio Formativo", "Aprendizado"],
        supervisor: "Supervisor Indicado (Conforme RN02)",
        active: true
    };

    jobsData.unshift(newJob);
    renderJobCards();
    closeModal('modal-post-job');
    showToast(`Nova vaga para "${title}" publicada com sucesso em Maceió!`, 'success');
}

/* -------------------------------------------------------------------------- */
/* ALTERNÂNCIA DE MODO SIMULADOR                                              */
/* -------------------------------------------------------------------------- */
function switchView(view) {
    const titleEl = document.getElementById('current-view-title');
    const btnStudent = document.getElementById('toggle-tab-student');
    const btnRecruiter = document.getElementById('toggle-tab-recruiter');

    if (view === 'student') {
        if(titleEl) titleEl.innerHTML = 'Visualizando como: <span class="text-pojae-600">Estudante / Candidato</span>';
        if(btnStudent) btnStudent.className = 'px-3 py-1 text-xs font-bold rounded-md bg-pojae-600 text-white transition';
        if(btnRecruiter) btnRecruiter.className = 'px-3 py-1 text-xs font-bold rounded-md text-slate-600 hover:text-pojae-600 transition';
        showToast("Modo de navegação alterado para Visão do Estudante", "info");
    } else {
        if(titleEl) titleEl.innerHTML = 'Visualizando como: <span class="text-emerald-600">Empresa / Recrutador</span>';
        if(btnRecruiter) btnRecruiter.className = 'px-3 py-1 text-xs font-bold rounded-md bg-emerald-600 text-white transition';
        if(btnStudent) btnStudent.className = 'px-3 py-1 text-xs font-bold rounded-md text-slate-600 hover:text-pojae-600 transition';
        showToast("Modo de navegação alterado para Visão da Empresa (Recrutador)", "info");
    }
}

/* -------------------------------------------------------------------------- */
/* SISTEMA DE NOTIFICAÇÃO TOAST                                               */
/* -------------------------------------------------------------------------- */
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

    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 4000);
}
