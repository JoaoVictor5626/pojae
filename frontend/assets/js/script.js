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
    },
    {
        id: 5,
        title: "Estágio em Suporte de TI e Redes",
        company: "Conecta Alagoas Telecom",
        location: "Ponta Verde, Maceió - AL",
        category: "Tecnologia",
        stipend: 1050,
        skills: ["Redes", "Linux", "Help Desk"],
        supervisor: "Tec. Tiago Rocha (Especialista)",
        active: true
    },
    {
        id: 6,
        title: "Estágio em Análise de Dados",
        company: "Nordeste Inteligência Digital",
        location: "Farol, Maceió - AL",
        category: "Tecnologia",
        stipend: 1350,
        skills: ["Python", "SQL", "Power BI"],
        supervisor: "Esp. Camila Barros (Pós-graduada)",
        active: true
    },
    {
        id: 7,
        title: "Estágio em Marketing Digital e Conteúdo",
        company: "Agência Litoral Criativo",
        location: "Jatiúca, Maceió - AL",
        category: "Administração",
        stipend: 900,
        skills: ["Copywriting", "Redes Sociais", "Canva"],
        supervisor: "Pub. Rafael Nunes (Graduado)",
        active: true
    },
    {
        id: 8,
        title: "Estágio em Finanças e Controladoria",
        company: "Atacadão Lagoa do Sul",
        location: "Tabuleiro do Martins, Maceió - AL",
        category: "Administração",
        stipend: 1100,
        skills: ["Excel Avançado", "Fluxo de Caixa", "Análise Financeira"],
        supervisor: "Adm. Fernanda Lima (Especialista)",
        active: true
    },
    {
        id: 9,
        title: "Estágio em Recursos Humanos",
        company: "Hospital Vida e Saúde AL",
        location: "Pajuçara, Maceió - AL",
        category: "Administração",
        stipend: 950,
        skills: ["Recrutamento", "Comunicação", "Excel Básico"],
        supervisor: "Psi. Patrícia Costa (Especialista)",
        active: true
    },
    {
        id: 10,
        title: "Estágio em Direito Trabalhista",
        company: "Melo & Vasconcelos Advocacia",
        location: "Centro, Maceió - AL",
        category: "Direito",
        stipend: 1150,
        skills: ["CLT", "Audiências", "Redação Jurídica"],
        supervisor: "Dra. Beatriz Vasconcelos (Especialista)",
        active: true
    },
    {
        id: 11,
        title: "Estágio em Direito Público e Licitações",
        company: "Consultoria Jurídica Alagoas",
        location: "Farol, Maceió - AL",
        category: "Direito",
        stipend: 1200,
        skills: ["Licitações", "Análise de Editais", "Legislação"],
        supervisor: "Dr. Henrique Alves (Mestre em Direito)",
        active: true
    },
    {
        id: 12,
        title: "Estágio em Direito Civil e Família",
        company: "Escritório Costa & Soares",
        location: "Ponta Verde, Maceió - AL",
        category: "Direito",
        stipend: 1050,
        skills: ["Peticionamento", "Pesquisa Jurisprudencial", "Organização"],
        supervisor: "Dra. Mariana Soares (Graduada)",
        active: false
    },
    {
        id: 13,
        title: "Estágio em Engenharia Elétrica",
        company: "Energia do Sol Nordeste",
        location: "Benedito Bentes, Maceió - AL",
        category: "Engenharia",
        stipend: 1300,
        skills: ["AutoCAD", "Energia Solar", "Normas Técnicas"],
        supervisor: "Eng. Lucas Ferreira (Pós-graduado)",
        active: true
    },
    {
        id: 14,
        title: "Estágio em Engenharia de Produção",
        company: "Indústria Açucareira Caeté",
        location: "Cruz das Almas, Maceió - AL",
        category: "Engenharia",
        stipend: 1250,
        skills: ["Lean Manufacturing", "Excel Intermediário", "Indicadores"],
        supervisor: "Eng. Gustavo Menezes (Especialista)",
        active: true
    },
    {
        id: 15,
        title: "Estágio em Engenharia Ambiental",
        company: "Saneamento Verde Alagoas",
        location: "Jacarecica, Maceió - AL",
        category: "Engenharia",
        stipend: 1150,
        skills: ["Licenciamento Ambiental", "QGIS", "Relatórios Técnicos"],
        supervisor: "Eng. Daniela Cavalcante (Mestre)",
        active: true
    },
    {
        id: 16,
        title: "Estágio em QA e Testes de Software",
        company: "Sistemas Maceió Tech",
        location: "Jatiúca, Maceió - AL",
        category: "Tecnologia",
        stipend: 1100,
        skills: ["Testes Manuais", "Postman", "Git"],
        supervisor: "Esp. Bruno Araújo (Graduado)",
        active: true
    },
    {
        id: 17,
        title: "Estágio em UX/UI Design",
        company: "Estúdio Digital Pajuçara",
        location: "Pajuçara, Maceió - AL",
        category: "Tecnologia",
        stipend: 1150,
        skills: ["Figma", "Prototipagem", "Design System"],
        supervisor: "Des. Larissa Vieira (Especialista)",
        active: true
    },
    {
        id: 18,
        title: "Estágio em Logística e Suprimentos",
        company: "Porto & Carga Maceió",
        location: "Jaraguá, Maceió - AL",
        category: "Administração",
        stipend: 1050,
        skills: ["Controle de Estoque", "Logística", "Excel Intermediário"],
        supervisor: "Adm. André Barbosa (Graduado)",
        active: true
    },
    {
        id: 19,
        title: "Estágio em Direito Digital e LGPD",
        company: "Proteção de Dados AL",
        location: "Mangabeiras, Maceió - AL",
        category: "Direito",
        stipend: 1250,
        skills: ["LGPD", "Políticas de Privacidade", "Contratos"],
        supervisor: "Dra. Sofia Mendonça (Pós-graduada)",
        active: true
    },
    {
        id: 20,
        title: "Estágio em Planejamento de Obras",
        company: "Construtora Horizonte AL",
        location: "Gruta de Lourdes, Maceió - AL",
        category: "Engenharia",
        stipend: 1350,
        skills: ["MS Project", "Cronograma Físico-Financeiro", "Orçamento"],
        supervisor: "Eng. Ricardo Dantas (Especialista)",
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
let jobsLoadedFromBackend = false;
const API_HOST = window.location.hostname || 'localhost';
const API_BASE_URL = window.POJAE_API_URL || `http://${API_HOST}:8080`;

// Configuração de paginação
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

// Controle do contador progressivo de vagas
let hasAnimatedJobsCounter = false;

/* -------------------------------------------------------------------------- */
/* INICIALIZAÇÃO DA APLICAÇÃO E ANIMAÇÕES AO CARREGAR A PÁGINA                */
/* -------------------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    renderJobCards();
    loadJobsForApplications();
    hideLoginLinksForAuthenticatedUser();
    renderRecruiterCandidates();
    setupScrollReveal();
    setupMobileMenu();
    setupJobsCounterObserver();
});

async function hideLoginLinksForAuthenticatedUser() {
    try {
        const response = await fetch(`${API_BASE_URL}/session`, { credentials: 'include' });
        if (!response.ok) return;

        ['desktop-login-link', 'mobile-login-link'].forEach(id => {
            const loginLink = document.getElementById(id);
            if (loginLink) loginLink.style.display = 'none';
        });
    } catch (error) {
        // Sem conexão com o backend, os links continuam visíveis para permitir o login.
    }
}

async function loadJobsForApplications() {
    try {
        const response = await fetch(`${API_BASE_URL}/vagas/opcoes-candidatura`);
        if (!response.ok) throw new Error('Não foi possível carregar as vagas.');

        const jobs = await response.json();
        jobsData = jobs.map(job => ({
            id: String(job.id),
            title: job.title,
            company: job.company,
            location: job.location,
            category: job.category,
            stipend: Number(job.stipend),
            skills: (job.skills || '').split(/[,;]/).map(skill => skill.trim()).filter(Boolean),
            supervisor: job.supervisor,
            active: true,
            backendId: true
        }));
        jobsLoadedFromBackend = true;
        currentPage = 1;
        renderJobCards();
    } catch (error) {
        console.warn('As vagas de demonstração continuam visíveis; candidaturas exigem vagas cadastradas no sistema.');
    }
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

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
/* 3. CONTADOR PROGRESSIVO DE VAGAS ATIVAS (0 -> TOTAL REAL)                  */
/* -------------------------------------------------------------------------- */
function getActiveJobsCount() {
    if (!Array.isArray(jobsData)) return 0;
    return jobsData.filter(job => job.active !== false).length;
}

function animateJobsCounter(targetTotal, duration = 1200) {
    const counterEl = document.getElementById('jobs-counter');
    if (!counterEl) return;

    if (targetTotal <= 0) {
        counterEl.textContent = '0';
        return;
    }

    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Curva easeOutQuart para desaceleração suave no final
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(easedProgress * targetTotal);

        counterEl.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            counterEl.textContent = targetTotal;
        }
    }

    requestAnimationFrame(step);
}

function setupJobsCounterObserver() {
    const sectionEl = document.getElementById('indicadores-locais');
    const counterEl = document.getElementById('jobs-counter');
    if (!sectionEl || !counterEl) return;

    counterEl.textContent = '0';

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedJobsCounter) {
                hasAnimatedJobsCounter = true;
                animateJobsCounter(getActiveJobsCount());
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    observer.observe(sectionEl);
}

/* -------------------------------------------------------------------------- */
/* RENDERIZAÇÃO DO FEED DE VAGAS COM PAGINAÇÃO                                */
/* -------------------------------------------------------------------------- */
function renderJobCards() {
    const container = document.getElementById('job-cards-container');
    const paginationContainer = document.getElementById('pagination-container');
    if (!container) return;

    const searchKeywordInput = document.getElementById('search-keyword');
    const searchCategoryInput = document.getElementById('search-category');

    const searchKeyword = searchKeywordInput ? searchKeywordInput.value.toLowerCase() : '';
    const searchCategory = searchCategoryInput ? searchCategoryInput.value : '';

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
        if (paginationContainer) paginationContainer.classList.add('hidden');
        return;
    }

    // Fatiamento de no máximo 6 vagas por página
    const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    paginatedJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:-translate-y-0.5 hover:shadow-xl transition-[transform,box-shadow] duration-300 will-change-transform flex flex-col justify-between group";

        card.innerHTML = `
            <div>
                <div class="flex items-start justify-between gap-2 mb-3">
                    <span class="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-blue-50 text-pojae-700 border border-blue-100">
                        ${escapeHtml(job.category)}
                    </span>
                    <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        R$ ${escapeHtml(job.stipend)}/mês
                    </span>
                </div>

                <h3 class="font-bold text-base text-slate-900 group-hover:text-pojae-600 transition mb-1">${escapeHtml(job.title)}</h3>
                <p class="text-xs font-medium text-slate-600 mb-3"><i class="fas fa-building text-slate-400 mr-1"></i> ${escapeHtml(job.company)}</p>
                
                <div class="text-xs text-slate-500 space-y-1 mb-4">
                    <div><i class="fas fa-map-marker-alt text-red-400 mr-1.5"></i> ${escapeHtml(job.location)}</div>
                    <div><i class="fas fa-user-tie text-blue-500 mr-1.5"></i> Supervisor: ${escapeHtml(job.supervisor)}</div>
                </div>

                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${job.skills.map(s => `<span class="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md">#${escapeHtml(s)}</span>`).join('')}
                </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[10px] text-slate-400 font-medium"><i class="fas fa-clock mr-1"></i> ${job.active ? 'Vaga Ativa' : 'Vaga Encerrada'}</span>
                <button onclick="openApplyModal('${escapeHtml(job.id)}')" class="bg-pojae-600 hover:bg-pojae-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer">
                    <i class="fas fa-paper-plane"></i> Candidatar-se
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    // Renderiza os botões de paginação abaixo dos cards
    renderPagination(filteredJobs.length, totalPages);
}

/* -------------------------------------------------------------------------- */
/* LÓGICA DE EXIBIÇÃO DOS BOTÕES DE PAGINAÇÃO                                 */
/* -------------------------------------------------------------------------- */
function getPaginationItems(current, total) {
    if (total <= 10) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
        return [
            1, 2, 3, 4, 5,
            '...',
            total - 4, total - 3, total - 2, total - 1, total
        ];
    }

    if (current >= total - 7) {
        const tail = [];
        for (let i = total - 7; i <= total; i++) {
            tail.push(i);
        }
        return [1, 2, '...', ...tail];
    }

    const middle = [];
    for (let i = current - 1; i <= current + 4; i++) {
        middle.push(i);
    }
    return [1, 2, '...', ...middle, '...', total - 1, total];
}

function renderPagination(totalItems, totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;

    if (totalItems <= ITEMS_PER_PAGE || totalPages <= 1) {
        paginationContainer.classList.add('hidden');
        paginationContainer.innerHTML = '';
        return;
    }

    paginationContainer.classList.remove('hidden');
    paginationContainer.innerHTML = '';

    const baseBtnClass = "min-w-[38px] h-9 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center justify-center select-none";
    const inactiveBtnClass = "bg-white text-slate-600 border-slate-200 hover:bg-blue-50/80 hover:border-pojae-300 hover:text-pojae-600 cursor-pointer";
    const activeBtnClass = "bg-pojae-600 text-white border-pojae-600 shadow-sm cursor-default";
    const disabledBtnClass = "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-60";

    // Botão Anterior (<)
    const prevBtn = document.createElement('button');
    prevBtn.type = "button";
    prevBtn.setAttribute("aria-label", "Página anterior");
    prevBtn.disabled = currentPage === 1;
    prevBtn.className = `${baseBtnClass} ${currentPage === 1 ? disabledBtnClass : inactiveBtnClass}`;
    prevBtn.innerHTML = `<i class="fas fa-chevron-left text-xs"></i>`;
    if (currentPage > 1) {
        prevBtn.onclick = () => goToPage(currentPage - 1);
    }
    paginationContainer.appendChild(prevBtn);

    // Números e Reticências
    const items = getPaginationItems(currentPage, totalPages);
    items.forEach(item => {
        if (item === '...') {
            const dots = document.createElement('span');
            dots.className = "px-1.5 text-slate-400 font-bold text-sm select-none";
            dots.textContent = "...";
            paginationContainer.appendChild(dots);
        } else {
            const pageBtn = document.createElement('button');
            pageBtn.type = "button";
            const isActive = item === currentPage;
            pageBtn.className = `${baseBtnClass} ${isActive ? activeBtnClass : inactiveBtnClass}`;
            pageBtn.textContent = item;
            if (isActive) {
                pageBtn.setAttribute("aria-current", "page");
            } else {
                pageBtn.onclick = () => goToPage(item);
            }
            paginationContainer.appendChild(pageBtn);
        }
    });

    // Botão Próximo (>)
    const nextBtn = document.createElement('button');
    nextBtn.type = "button";
    nextBtn.setAttribute("aria-label", "Próxima página");
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.className = `${baseBtnClass} ${currentPage === totalPages ? disabledBtnClass : inactiveBtnClass}`;
    nextBtn.innerHTML = `<i class="fas fa-chevron-right text-xs"></i>`;
    if (currentPage < totalPages) {
        nextBtn.onclick = () => goToPage(currentPage + 1);
    }
    paginationContainer.appendChild(nextBtn);
}

function goToPage(page) {
    currentPage = page;
    renderJobCards();

    const vagasSection = document.getElementById('vagas');
    if (vagasSection) {
        vagasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    currentPage = 1; // Volta para a página 1 ao filtrar por categoria

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const targetElement = e ? e.currentTarget : window.event?.currentTarget;
    if (targetElement) {
        targetElement.classList.add('active');
    }

    renderJobCards();
}

function filterJobs() {
    currentPage = 1; // Volta para a página 1 ao pesquisar
    renderJobCards();
}

/* -------------------------------------------------------------------------- */
/* CONTROLE DOS MODAIS                                                        */
/* -------------------------------------------------------------------------- */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
}

async function openApplyModal(jobId) {
    const job = jobsData.find(j => String(j.id) === String(jobId));
    if (!job) return;
    if (!jobsLoadedFromBackend || !job.backendId) {
        showToast('As vagas de demonstração não recebem candidaturas. Conecte-se ao servidor e tente novamente.', 'info');
        return;
    }
    currentActiveJobForApply = job;

    const jobIdInput = document.getElementById('apply-job-id');
    const messageInput = document.getElementById('apply-message');
    if (jobIdInput) jobIdInput.value = job.id;
    if (messageInput) messageInput.value = '';

    document.getElementById('modal-job-title').textContent = job.title;
    document.getElementById('modal-job-company').textContent = `${job.company} • ${job.location}`;
    try {
        const response = await fetch(`${API_BASE_URL}/candidaturas/perfil`, { credentials: 'include' });
        if (response.status === 401) {
            showToast('Sua sessão não foi encontrada. Entre novamente para se candidatar.', 'info');
            return;
        }
        if (response.status === 403) {
            showToast('Entre com uma conta de candidato para se candidatar.', 'info');
            return;
        }
        if (!response.ok) throw new Error('Não foi possível carregar o perfil.');
        const profile = await response.json();
        if (currentActiveJobForApply !== job) return;
        document.getElementById('candidate-name').value = profile.name;
        document.getElementById('candidate-email').value = profile.email;
        document.getElementById('candidate-institution').value = profile.institution;
        openModal('modal-apply');
    } catch (error) {
        showToast('Não foi possível carregar seus dados. Tente novamente.', 'info');
    }
}

function updateFileLabel(input, labelId) {
    if (input.files && input.files[0]) {
        document.getElementById(labelId).textContent = `${input.files[0].name} (Anexado com sucesso)`;
    }
}

/* -------------------------------------------------------------------------- */
/* SUBMISSÃO DOS FORMULÁRIOS COM FEEDBACK                                     */
/* -------------------------------------------------------------------------- */
async function handleApplySubmit(e) {
    e.preventDefault();

    const vagaIdEl = document.getElementById('apply-job-id');
    const fileCvEl = document.getElementById('file-cv');
    const fileHistEl = document.getElementById('file-historico');
    const messageEl = document.getElementById('apply-message');
    const form = e.currentTarget;
    const submitButton = form.querySelector('[type="submit"]');
    if (!currentActiveJobForApply?.backendId || !vagaIdEl.value) {
        showToast('Selecione uma vaga cadastrada no sistema.', 'info');
        return;
    }
    if (!fileCvEl.files[0] || !fileHistEl.files[0]) {
        showToast('Selecione o currículo e o histórico escolar em PDF.', 'info');
        return;
    }

    const formData = new FormData();
    formData.append('jobId', vagaIdEl.value);
    formData.append('resume', fileCvEl.files[0]);
    formData.append('academicHistory', fileHistEl.files[0]);
    formData.append('presentationMessage', messageEl.value.trim());

    submitButton.disabled = true;
    try {
        const response = await fetch(`${API_BASE_URL}/candidaturas`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            showToast(error.message || 'Não foi possível enviar a candidatura.', 'info');
            submitButton.disabled = false;
            return;
        }

        const name = document.getElementById('candidate-name').value;
        const inst = document.getElementById('candidate-institution').value;
        candidatesData.unshift({
            id: Date.now(),
            name,
            course: `Estudante (${inst})`,
            status: 'Inscrito Hoje',
            cv: true,
            historico: true,
            mensagem: messageEl.value.trim()
        });

        renderRecruiterCandidates();
        closeModal('modal-apply');
        showToast(`Candidatura enviada para ${currentActiveJobForApply.company} com sucesso!`, 'success');
    } catch (error) {
        showToast('Não foi possível acessar o sistema. Tente novamente.', 'info');
        submitButton.disabled = false;
    }
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
    currentPage = 1;
    renderJobCards();

    // Atualiza o contador de vagas ativas na faixa de indicadores
    if (hasAnimatedJobsCounter) {
        animateJobsCounter(getActiveJobsCount(), 600);
    }

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
        if (titleEl) titleEl.innerHTML = 'Visualizando como: <span class="text-pojae-600">Estudante / Candidato</span>';
        if (btnStudent) btnStudent.className = 'px-3 py-1 text-xs font-bold rounded-md bg-pojae-600 text-white transition';
        if (btnRecruiter) btnRecruiter.className = 'px-3 py-1 text-xs font-bold rounded-md text-slate-600 hover:text-pojae-600 transition';
        showToast("Modo de navegação alterado para Visão do Estudante", "info");
    } else {
        if (titleEl) titleEl.innerHTML = 'Visualizando como: <span class="text-emerald-600">Empresa / Recrutador</span>';
        if (btnRecruiter) btnRecruiter.className = 'px-3 py-1 text-xs font-bold rounded-md bg-emerald-600 text-white transition';
        if (btnStudent) btnStudent.className = 'px-3 py-1 text-xs font-bold rounded-md text-slate-600 hover:text-pojae-600 transition';
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
