import { supabase } from './supabase.js';

let currentBarbeariaId = null;
let currentCadeiraId = null;
let currentFilter = 'dia';
let barbeariaData = null;
let sortedAguardando = []; // Fila ordenada com lógica de horário agendado
let queueRefreshInterval = null;

document.addEventListener('DOMContentLoaded', async () => {
    // ─── Referências DOM ─────────────────────────────────────────────
    const modalLogin = document.getElementById('modal-login');
    const formLogin = document.getElementById('form-login');
    const loginError = document.getElementById('login-error');
    const fieldNome = document.getElementById('field-nome');
    const btnToggleLogin = document.getElementById('btn-toggle-login');
    const loginTitle = document.getElementById('login-title');
    const loginSubtitle = document.getElementById('login-subtitle');
    const btnSubmitLogin = document.getElementById('btn-submit-login');

    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const btnMenu = document.getElementById('btn-menu');
    const closeSidebar = document.getElementById('close-sidebar');
    const btnLogoutSidebar = document.getElementById('btn-logout-sidebar');

    const modalQrcode = document.getElementById('modal-qrcode');
    const closeQrcode = document.getElementById('close-qrcode');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const linkCliente = document.getElementById('link-cliente');

    const modalFinalizar = document.getElementById('modal-finalizar');
    const formFinalizar = document.getElementById('form-finalizar');
    const closeFinalizar = document.getElementById('close-finalizar');
    const valorCorteInput = document.getElementById('valor-corte');

    const modalPerfil = document.getElementById('modal-perfil');
    const formPerfil = document.getElementById('form-perfil');
    const closePerfil = document.getElementById('close-perfil');
    const btnMeuPerfil = document.getElementById('btn-meu-perfil');
    const perfilMsg = document.getElementById('perfil-msg');

    const queueList = document.getElementById('queue-list');
    const labelQtd = document.getElementById('label-qtd-clientes');
    const btnChamarProximo = document.getElementById('btn-chamar-proximo');
    const filterLabel = document.getElementById('filter-label');

    // KPIs
    const naFilaCount = document.getElementById('na-fila-count');
    const atendidosCount = document.getElementById('atendidos-count');
    const totalDiaCount = document.getElementById('total-dia');

    // Bottom Nav
    const navDashboard = document.getElementById('nav-dashboard');
    const navQr = document.getElementById('nav-qr');
    const navSettings = document.getElementById('nav-settings');

    // Profile photo elements
    const headerProfileImg = document.getElementById('header-profile-img');
    const headerProfileIcon = document.getElementById('header-profile-icon');
    const btnProfilePhoto = document.getElementById('btn-profile-photo');

    let isSignUp = false;

    // ─── Sidebar ─────────────────────────────────────────────────────
    function openSidebar() { sidebar.classList.add('open'); sidebarOverlay.classList.add('open'); }
    function closeSidebarFn() { sidebar.classList.remove('open'); sidebarOverlay.classList.remove('open'); }
    btnMenu.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFn);
    sidebarOverlay.addEventListener('click', closeSidebarFn);

    // ─── Bottom Navigation ───────────────────────────────────────────
    navDashboard.addEventListener('click', () => {
        document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
    });
    navQr.addEventListener('click', () => {
        if (currentBarbeariaId) modalQrcode.classList.remove('hidden');
    });
    navSettings.addEventListener('click', () => {
        if (currentBarbeariaId) { loadProfileData(); modalPerfil.classList.remove('hidden'); }
    });

    // ─── Filter Buttons ─────────────────────────────────────────────
    const filterLabels = { dia: 'Hoje', semana: 'Esta Semana', mes: 'Este Mês', ano: 'Este Ano' };
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterLabel.textContent = 'Mostrando: ' + filterLabels[currentFilter];
            loadDashboardData();
            closeSidebarFn();
        });
    });

    // ─── Export Report ───────────────────────────────────────────────
    document.getElementById('btn-exportar').addEventListener('click', async () => {
        if (!currentBarbeariaId) return;
        const { startDate } = getFilterDates();
        const { data } = await supabase.from('filas').select('*')
            .eq('barbearia_id', currentBarbeariaId).eq('status', 'finalizado')
            .gte('criado_em', startDate.toISOString()).order('criado_em', { ascending: false });
        if (!data || data.length === 0) { alert('Sem dados para exportar.'); return; }
        const csv = 'Nome,Valor,Data\n' + data.map(f =>
            `"${f.nome_cliente}",${f.valor_corte || 0},"${new Date(f.criado_em).toLocaleString('pt-BR')}"`
        ).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = `relatorio_${currentFilter}.csv`; a.click();
        closeSidebarFn();
    });

    // ─── Login/Register Toggle ───────────────────────────────────────
    btnToggleLogin.addEventListener('click', () => {
        isSignUp = !isSignUp;
        fieldNome.classList.toggle('hidden', !isSignUp);
        loginTitle.textContent = isSignUp ? 'Cadastro' : 'Login';
        loginSubtitle.textContent = isSignUp ? 'Crie sua conta' : 'Acesso Restrito';
        btnSubmitLogin.innerHTML = isSignUp
            ? '<span class="material-symbols-outlined text-sm">person_add</span>Cadastrar'
            : '<span class="material-symbols-outlined text-sm">login</span>Entrar';
        btnToggleLogin.textContent = isSignUp ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se aqui';
    });

    // ─── Auth ────────────────────────────────────────────────────────
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { modalLogin.classList.remove('hidden'); } 
    else { await initDashboard(session.user.id); }

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.classList.add('hidden');
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (isSignUp) {
            const nome = document.getElementById('login-nome').value.trim();
            if (!nome) { showLoginError('Insira o nome da barbearia.'); return; }
            const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({ email, password });
            if (signUpErr) { showLoginError(signUpErr.message); return; }
            const { error: insertErr } = await supabase.from('barbearias')
                .insert([{ nome, auth_id: signUpData.user.id }]);
            if (insertErr) { showLoginError(insertErr.message); return; }
            modalLogin.classList.add('hidden');
            await initDashboard(signUpData.user.id);
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) { showLoginError(error.message); return; }
            modalLogin.classList.add('hidden');
            await initDashboard(data.user.id);
        }
    });

    function showLoginError(msg) {
        loginError.textContent = msg;
        loginError.classList.remove('hidden');
        loginError.style.color = '#ba1a1a';
    }

    btnLogoutSidebar.addEventListener('click', async () => {
        await supabase.auth.signOut(); window.location.reload();
    });
    btnProfilePhoto.addEventListener('click', () => {
        if (currentBarbeariaId) { loadProfileData(); modalPerfil.classList.remove('hidden'); }
    });

    // ─── Init Dashboard ─────────────────────────────────────────────
    async function initDashboard(userId) {
        const { data: barbearias, error } = await supabase.from('barbearias')
            .select('*').eq('auth_id', userId).limit(1);
        if (error || !barbearias || barbearias.length === 0) {
            alert('Nenhuma barbearia vinculada.'); return;
        }
        barbeariaData = barbearias[0];
        currentBarbeariaId = barbeariaData.id;

        // Set header profile photo
        if (barbeariaData.foto_perfil) {
            headerProfileImg.src = barbeariaData.foto_perfil;
            headerProfileImg.classList.remove('hidden');
            headerProfileIcon.classList.add('hidden');
        }

        // Generate QR Code with admin link
        const urlCliente = window.location.origin + '/cliente.html?barbearia_id=' + currentBarbeariaId;
        const urlAdmin = urlCliente + '&admin=true';
        new QRCode(qrcodeContainer, { text: urlCliente, width: 200, height: 200 });
        linkCliente.addEventListener('click', () => window.open(urlAdmin, '_blank'));

        await loadDashboardData();

        // Re-ordena a fila a cada 60s (horários agendados mudam de prioridade com o tempo)
        queueRefreshInterval = setInterval(() => loadDashboardData(), 60000);

        supabase.channel('dashboard-filas')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'filas', filter: `barbearia_id=eq.${currentBarbeariaId}` },
                () => loadDashboardData()
            ).subscribe();
    }

    // ─── Filter Date Helpers ─────────────────────────────────────────
    function getFilterDates() {
        const now = new Date();
        const startDate = new Date();
        if (currentFilter === 'dia') { startDate.setHours(0, 0, 0, 0); }
        else if (currentFilter === 'semana') { startDate.setDate(now.getDate() - now.getDay()); startDate.setHours(0, 0, 0, 0); }
        else if (currentFilter === 'mes') { startDate.setDate(1); startDate.setHours(0, 0, 0, 0); }
        else if (currentFilter === 'ano') { startDate.setMonth(0, 1); startDate.setHours(0, 0, 0, 0); }
        return { startDate };
    }

    // ─── Load Dashboard Data ────────────────────────────────────────
    async function loadDashboardData() {
        if (!currentBarbeariaId) return;
        const { startDate } = getFilterDates();

        const { data: filas, error } = await supabase.from('filas').select('*')
            .eq('barbearia_id', currentBarbeariaId).order('criado_em', { ascending: true });
        if (error) { console.error('Erro:', error); return; }

        let aguardando = [], chamado = null, atendidosHoje = 0, totalRecebido = 0;
        filas.forEach(f => {
            if (f.status === 'aguardando') aguardando.push(f);
            else if (f.status === 'chamado') chamado = f;
            else if (f.status === 'finalizado' && new Date(f.criado_em) >= startDate) {
                atendidosHoje++; totalRecebido += Number(f.valor_corte) || 0;
            }
        });

        // Ordena a fila com lógica de horário agendado
        sortedAguardando = sortarFila(aguardando);

        naFilaCount.textContent = sortedAguardando.length.toString().padStart(2, '0');
        atendidosCount.textContent = atendidosHoje.toString().padStart(2, '0');
        totalDiaCount.textContent = totalRecebido.toFixed(2);
        labelQtd.textContent = (sortedAguardando.length + (chamado ? 1 : 0)) + ' Clientes';

        if (sortedAguardando.length > 0 && !chamado) {
            btnChamarProximo.disabled = false;
            btnChamarProximo.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            btnChamarProximo.disabled = true;
            btnChamarProximo.classList.add('opacity-50', 'cursor-not-allowed');
        }
        renderQueue(sortedAguardando, chamado);
    }

    /**
     * sortarFila — Ordena a fila com lógica de horário agendado.
     * 
     * Regras:
     * 1. Clientes SEM horário agendado → ordenados por criado_em (quem chegou primeiro)
     * 2. Clientes COM horário agendado MAS o horário ainda está longe (>10min) → ficam no FINAL da fila
     * 3. Clientes COM horário agendado E o horário está próximo (≤10min) → sobem para o TOPO da fila
     * 
     * Exemplo: São 13:16. Um cliente agendado para 14:00 fica no fundo.
     * Às 13:50, ele sobe automaticamente para o topo.
     */
    function sortarFila(aguardando) {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const THRESHOLD_MIN = 10; // Minutos antes do horário para subir na fila

        // Separa em 3 grupos
        const urgentes = [];  // Agendados com horário próximo (≤10min)
        const normais = [];   // Sem horário agendado
        const agendados = []; // Agendados com horário longe (>10min)

        aguardando.forEach(cliente => {
            if (!cliente.horario_agendado) {
                normais.push(cliente);
            } else {
                const [h, m] = cliente.horario_agendado.split(':').map(Number);
                const scheduledMin = h * 60 + m;
                const diff = scheduledMin - currentMinutes;

                if (diff <= THRESHOLD_MIN) {
                    urgentes.push({ ...cliente, _scheduledMin: scheduledMin });
                } else {
                    agendados.push({ ...cliente, _scheduledMin: scheduledMin });
                }
            }
        });

        // Urgentes: quem tem horário mais cedo primeiro
        urgentes.sort((a, b) => a._scheduledMin - b._scheduledMin);
        // Normais: quem chegou primeiro
        normais.sort((a, b) => new Date(a.criado_em) - new Date(b.criado_em));
        // Agendados distantes: quem tem horário mais cedo primeiro
        agendados.sort((a, b) => a._scheduledMin - b._scheduledMin);

        // Ordem final: urgentes → normais → agendados distantes
        return [...urgentes, ...normais, ...agendados];
    }

    // ─── Render Queue ────────────────────────────────────────────────
    function renderQueue(aguardando, chamado) {
        queueList.innerHTML = '';
        let count = 1;
        if (chamado) {
            const horario = chamado.horario_agendado ? `<span class="text-xs text-primary/70 ml-2">⏰ ${chamado.horario_agendado.substring(0,5)}</span>` : '';
            queueList.innerHTML += `
                <div class="bg-primary/5 p-6 rounded-3xl flex justify-between items-center border-2 border-primary/10 shadow-[0_10px_30px_rgba(0,67,200,0.08)]">
                    <div class="flex items-center gap-5">
                        <span class="text-3xl font-black text-primary">${count.toString().padStart(2, '0')}</span>
                        <div>
                            <p class="text-xl font-bold text-primary">${chamado.nome_cliente}${horario}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                <span class="text-xs font-bold uppercase tracking-widest text-primary">chamado</span>
                            </div>
                        </div>
                    </div>
                    <button onclick="window.abrirModalFinalizar('${chamado.id}')"
                        class="bg-primary text-white px-5 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95">
                        <span class="material-symbols-outlined text-sm">payments</span>Finalizar
                    </button>
                </div>`;
            count++;
        }
        aguardando.forEach((cliente, index) => {
            const tempoEst = (index + 1) * 30;
            const horario = cliente.horario_agendado ? `<span class="text-xs text-tertiary ml-2">⏰ ${cliente.horario_agendado.substring(0,5)}</span>` : '';
            queueList.innerHTML += `
                <div class="bg-surface-container-low p-6 rounded-3xl flex justify-between items-center transition-all hover:bg-surface-container-high">
                    <div class="flex items-center gap-5">
                        <span class="text-3xl font-black text-outline opacity-40">${count.toString().padStart(2, '0')}</span>
                        <div>
                            <p class="text-xl font-bold">${cliente.nome_cliente}${horario}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="w-2 h-2 rounded-full bg-tertiary"></span>
                                <span class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">aguardando</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Tempo est.</p>
                        <p class="text-lg font-bold">${tempoEst} min</p>
                    </div>
                </div>`;
            count++;
        });
    }

    // ─── Queue Actions ───────────────────────────────────────────────
    // Chama o primeiro da fila ORDENADA (não o mais antigo por criado_em)
    btnChamarProximo.addEventListener('click', async () => {
        if (!currentBarbeariaId || btnChamarProximo.disabled) return;
        if (sortedAguardando.length === 0) return;
        const proximoId = sortedAguardando[0].id;
        await supabase.from('filas').update({ status: 'chamado' }).eq('id', proximoId);
    });

    // ─── Modals ──────────────────────────────────────────────────────
    closeQrcode.addEventListener('click', () => modalQrcode.classList.add('hidden'));
    window.abrirModalFinalizar = (id) => {
        currentCadeiraId = id; valorCorteInput.value = '';
        modalFinalizar.classList.remove('hidden');
    };
    closeFinalizar.addEventListener('click', () => modalFinalizar.classList.add('hidden'));
    formFinalizar.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentCadeiraId) return;
        await supabase.from('filas').update({ status: 'finalizado', valor_corte: parseFloat(valorCorteInput.value) || 0 }).eq('id', currentCadeiraId);
        modalFinalizar.classList.add('hidden'); currentCadeiraId = null;
    });

    // ─── Profile Modal ───────────────────────────────────────────────
    btnMeuPerfil.addEventListener('click', () => {
        if (currentBarbeariaId) { loadProfileData(); modalPerfil.classList.remove('hidden'); }
        closeSidebarFn();
    });
    closePerfil.addEventListener('click', () => modalPerfil.classList.add('hidden'));

    function loadProfileData() {
        if (!barbeariaData) return;
        document.getElementById('perfil-nome').value = barbeariaData.nome || '';
        document.getElementById('perfil-abertura').value = barbeariaData.horario_abertura || '09:00';
        document.getElementById('perfil-fechamento').value = barbeariaData.horario_fechamento || '19:00';
        const preview = document.getElementById('perfil-foto-preview');
        const icon = document.getElementById('perfil-foto-icon');
        if (barbeariaData.foto_perfil) {
            preview.src = barbeariaData.foto_perfil; preview.classList.remove('hidden'); icon.classList.add('hidden');
        } else { preview.classList.add('hidden'); icon.classList.remove('hidden'); }
    }

    // Photo upload via base64
    document.getElementById('input-foto').addEventListener('change', (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const preview = document.getElementById('perfil-foto-preview');
            const icon = document.getElementById('perfil-foto-icon');
            preview.src = ev.target.result; preview.classList.remove('hidden'); icon.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    });

    formPerfil.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('perfil-nome').value.trim();
        const abertura = document.getElementById('perfil-abertura').value;
        const fechamento = document.getElementById('perfil-fechamento').value;
        const fotoPreview = document.getElementById('perfil-foto-preview');
        const fotoUrl = fotoPreview.classList.contains('hidden') ? null : fotoPreview.src;

        const { error } = await supabase.from('barbearias').update({
            nome, horario_abertura: abertura, horario_fechamento: fechamento, foto_perfil: fotoUrl
        }).eq('id', currentBarbeariaId);

        if (error) { showPerfilMsg('Erro ao salvar.', true); return; }
        barbeariaData = { ...barbeariaData, nome, horario_abertura: abertura, horario_fechamento: fechamento, foto_perfil: fotoUrl };
        if (fotoUrl) { headerProfileImg.src = fotoUrl; headerProfileImg.classList.remove('hidden'); headerProfileIcon.classList.add('hidden'); }
        showPerfilMsg('Salvo com sucesso!', false);
    });

    function showPerfilMsg(msg, isError) {
        perfilMsg.textContent = msg;
        perfilMsg.style.color = isError ? '#ba1a1a' : '#0043c8';
        perfilMsg.classList.remove('hidden');
        setTimeout(() => perfilMsg.classList.add('hidden'), 3000);
    }
});
