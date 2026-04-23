import { supabase } from './supabase.js';

let currentBarbeariaId = null;
let currentCadeiraId = null;
let currentFilter = 'dia';
let barbeariaData = null;
let sortedAguardando = [];
let queueRefreshInterval = null;
let currentProfissionalId = null; // ID do profissional logado (se não for gestor)
let isGestor = true; // Por padrão, quem faz login é gestor
let profissionaisLista = [];

document.addEventListener('DOMContentLoaded', async () => {
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
    const naFilaCount = document.getElementById('na-fila-count');
    const atendidosCount = document.getElementById('atendidos-count');
    const totalDiaCount = document.getElementById('total-dia');
    const navDashboard = document.getElementById('nav-dashboard');
    const navQr = document.getElementById('nav-qr');
    const navSettings = document.getElementById('nav-settings');
    const headerProfileImg = document.getElementById('header-profile-img');
    const headerProfileIcon = document.getElementById('header-profile-icon');
    const btnProfilePhoto = document.getElementById('btn-profile-photo');
    const btnEquipa = document.getElementById('btn-equipa');
    const modalEquipa = document.getElementById('modal-equipa');
    const closeEquipa = document.getElementById('close-equipa');
    const formAddProf = document.getElementById('form-add-profissional');
    const listaProf = document.getElementById('lista-profissionais');
    const equipaMsg = document.getElementById('equipa-msg');

    let isSignUp = false;

    // ─── Sidebar ─────────────────────────────────────────────────────
    function openSidebar() { sidebar.classList.add('open'); sidebarOverlay.classList.add('open'); }
    function closeSidebarFn() { sidebar.classList.remove('open'); sidebarOverlay.classList.remove('open'); }
    btnMenu.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarFn);
    sidebarOverlay.addEventListener('click', closeSidebarFn);

    // ─── Bottom Navigation ───────────────────────────────────────────
    navDashboard.addEventListener('click', () => document.querySelector('main').scrollIntoView({ behavior: 'smooth' }));
    navQr.addEventListener('click', () => { if (currentBarbeariaId) modalQrcode.classList.remove('hidden'); });
    navSettings.addEventListener('click', () => { if (currentBarbeariaId) { loadProfileData(); modalPerfil.classList.remove('hidden'); } });

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
        let query = supabase.from('filas').select('*')
            .eq('barbearia_id', currentBarbeariaId).eq('status', 'finalizado')
            .gte('criado_em', startDate.toISOString()).order('criado_em', { ascending: false });
        if (!isGestor && currentProfissionalId) query = query.eq('profissional_id', currentProfissionalId);
        const { data } = await query;
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
    if (!session) modalLogin.classList.remove('hidden');
    else await initDashboard(session.user.id);

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
            const { error: insertErr } = await supabase.from('barbearias').insert([{ nome, auth_id: signUpData.user.id }]);
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
        loginError.textContent = msg; loginError.classList.remove('hidden'); loginError.style.color = '#ba1a1a';
    }

    btnLogoutSidebar.addEventListener('click', async () => { await supabase.auth.signOut(); window.location.reload(); });
    btnProfilePhoto.addEventListener('click', () => { if (currentBarbeariaId) { loadProfileData(); modalPerfil.classList.remove('hidden'); } });

    // ─── Init Dashboard ─────────────────────────────────────────────
    async function initDashboard(userId) {
        // Verificar se é dono da barbearia (Gestor)
        const { data: barbearias } = await supabase.from('barbearias').select('*').eq('auth_id', userId).limit(1);

        if (barbearias && barbearias.length > 0) {
            // É GESTOR (dono da barbearia)
            barbeariaData = barbearias[0];
            currentBarbeariaId = barbeariaData.id;
            isGestor = true;
            currentProfissionalId = null;
            if (btnEquipa) btnEquipa.classList.remove('hidden');
        } else {
            // Verificar se é um profissional cadastrado
            const { data: prof } = await supabase.from('profissionais').select('*, barbearias(*)').eq('auth_id', userId).eq('ativo', true).limit(1);
            if (!prof || prof.length === 0) { alert('Nenhuma barbearia vinculada.'); return; }
            currentProfissionalId = prof[0].id;
            isGestor = prof[0].is_admin;
            barbeariaData = prof[0].barbearias;
            currentBarbeariaId = barbeariaData.id;
            if (isGestor && btnEquipa) btnEquipa.classList.remove('hidden');
        }

        if (barbeariaData.foto_perfil) {
            headerProfileImg.src = barbeariaData.foto_perfil;
            headerProfileImg.classList.remove('hidden');
            headerProfileIcon.classList.add('hidden');
        }

        const urlCliente = window.location.origin + '/cliente.html?barbearia_id=' + currentBarbeariaId;
        const urlAdmin = urlCliente + '&admin=true';
        new QRCode(qrcodeContainer, { text: urlCliente, width: 200, height: 200 });
        linkCliente.addEventListener('click', () => window.open(urlAdmin, '_blank'));

        // Carregar profissionais
        await loadProfissionais();
        await loadDashboardData();

        queueRefreshInterval = setInterval(() => loadDashboardData(), 60000);
        supabase.channel('dashboard-filas')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'filas', filter: `barbearia_id=eq.${currentBarbeariaId}` },
                () => loadDashboardData()
            ).subscribe();
    }

    async function loadProfissionais() {
        const { data } = await supabase.from('profissionais').select('*').eq('barbearia_id', currentBarbeariaId).eq('ativo', true);
        profissionaisLista = data || [];
    }

    // ─── Filter Date Helpers ─────────────────────────────────────────
    function getFilterDates() {
        const now = new Date(); const startDate = new Date();
        if (currentFilter === 'dia') startDate.setHours(0, 0, 0, 0);
        else if (currentFilter === 'semana') { startDate.setDate(now.getDate() - now.getDay()); startDate.setHours(0, 0, 0, 0); }
        else if (currentFilter === 'mes') { startDate.setDate(1); startDate.setHours(0, 0, 0, 0); }
        else if (currentFilter === 'ano') { startDate.setMonth(0, 1); startDate.setHours(0, 0, 0, 0); }
        return { startDate };
    }

    // ─── Load Dashboard Data (RBAC) ─────────────────────────────────
    async function loadDashboardData() {
        if (!currentBarbeariaId) return;
        const { startDate } = getFilterDates();
        const { data: filas, error } = await supabase.from('filas').select('*')
            .eq('barbearia_id', currentBarbeariaId).order('criado_em', { ascending: true });
        if (error) return;

        let aguardando = [], chamado = null, atendidosHoje = 0, totalRecebido = 0;

        filas.forEach(f => {
            const isMyQueue = isGestor || !currentProfissionalId || f.profissional_id === currentProfissionalId || f.profissional_id === null;
            if (f.status === 'aguardando' && isMyQueue) aguardando.push(f);
            else if (f.status === 'chamado' && isMyQueue) chamado = f;

            // KPIs: Gestor vê tudo, barbeiro vê só o dele
            if (f.status === 'finalizado' && new Date(f.criado_em) >= startDate) {
                if (isGestor || !currentProfissionalId || f.profissional_id === currentProfissionalId) {
                    atendidosHoje++; totalRecebido += Number(f.valor_corte) || 0;
                }
            }
        });

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

    function sortarFila(aguardando) {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const THRESHOLD_MIN = 10;
        const urgentes = [], normais = [], agendados = [];
        aguardando.forEach(cliente => {
            if (!cliente.horario_agendado) { normais.push(cliente); }
            else {
                const [h, m] = cliente.horario_agendado.split(':').map(Number);
                const scheduledMin = h * 60 + m;
                const diff = scheduledMin - currentMinutes;
                if (diff <= THRESHOLD_MIN) urgentes.push({ ...cliente, _scheduledMin: scheduledMin });
                else agendados.push({ ...cliente, _scheduledMin: scheduledMin });
            }
        });
        urgentes.sort((a, b) => a._scheduledMin - b._scheduledMin);
        normais.sort((a, b) => new Date(a.criado_em) - new Date(b.criado_em));
        agendados.sort((a, b) => a._scheduledMin - b._scheduledMin);
        return [...urgentes, ...normais, ...agendados];
    }

    function getProfissionalNome(id) {
        if (!id) return '';
        const p = profissionaisLista.find(x => x.id === id);
        return p ? p.nome : '';
    }

    // ─── Render Queue ────────────────────────────────────────────────
    function renderQueue(aguardando, chamado) {
        queueList.innerHTML = '';
        let count = 1;
        if (chamado) {
            const horario = chamado.horario_agendado ? `<span class="text-xs text-primary/70 ml-2">⏰ ${chamado.horario_agendado.substring(0,5)}</span>` : '';
            const profNome = getProfissionalNome(chamado.profissional_id);
            const profTag = profNome ? `<span class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">${profNome}</span>` : '';
            queueList.innerHTML += `
                <div class="bg-primary/5 p-6 rounded-3xl flex justify-between items-center border-2 border-primary/10 shadow-[0_10px_30px_rgba(0,67,200,0.08)]">
                    <div class="flex items-center gap-5">
                        <span class="text-3xl font-black text-primary">${count.toString().padStart(2, '0')}</span>
                        <div>
                            <p class="text-xl font-bold text-primary">${chamado.nome_cliente}${horario}${profTag}</p>
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
            const profNome = getProfissionalNome(cliente.profissional_id);
            const profTag = profNome ? `<span class="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full ml-2">${profNome}</span>` : (cliente.profissional_id === null ? `<span class="text-xs bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full ml-2">Geral</span>` : '');
            queueList.innerHTML += `
                <div class="bg-surface-container-low p-6 rounded-3xl flex justify-between items-center transition-all hover:bg-surface-container-high">
                    <div class="flex items-center gap-5">
                        <span class="text-3xl font-black text-outline opacity-40">${count.toString().padStart(2, '0')}</span>
                        <div>
                            <p class="text-xl font-bold">${cliente.nome_cliente}${horario}${profTag}</p>
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
    btnChamarProximo.addEventListener('click', async () => {
        if (!currentBarbeariaId || btnChamarProximo.disabled) return;
        if (sortedAguardando.length === 0) return;
        const proximoId = sortedAguardando[0].id;
        const updateData = { status: 'chamado' };
        // Se barbeiro individual, atribuir profissional_id ao chamar
        if (!isGestor && currentProfissionalId && sortedAguardando[0].profissional_id === null) {
            updateData.profissional_id = currentProfissionalId;
        }
        await supabase.from('filas').update(updateData).eq('id', proximoId);
    });

    // ─── Modals ──────────────────────────────────────────────────────
    closeQrcode.addEventListener('click', () => modalQrcode.classList.add('hidden'));
    window.abrirModalFinalizar = (id) => { currentCadeiraId = id; valorCorteInput.value = ''; modalFinalizar.classList.remove('hidden'); };
    closeFinalizar.addEventListener('click', () => modalFinalizar.classList.add('hidden'));
    formFinalizar.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentCadeiraId) return;
        await supabase.from('filas').update({ status: 'finalizado', valor_corte: parseFloat(valorCorteInput.value) || 0 }).eq('id', currentCadeiraId);
        modalFinalizar.classList.add('hidden'); currentCadeiraId = null;
    });

    // ─── Profile Modal ───────────────────────────────────────────────
    btnMeuPerfil.addEventListener('click', () => { if (currentBarbeariaId) { loadProfileData(); modalPerfil.classList.remove('hidden'); } closeSidebarFn(); });
    closePerfil.addEventListener('click', () => modalPerfil.classList.add('hidden'));

    function loadProfileData() {
        if (!barbeariaData) return;
        document.getElementById('perfil-nome').value = barbeariaData.nome || '';
        document.getElementById('perfil-abertura').value = barbeariaData.horario_abertura || '09:00';
        document.getElementById('perfil-fechamento').value = barbeariaData.horario_fechamento || '19:00';
        const preview = document.getElementById('perfil-foto-preview');
        const icon = document.getElementById('perfil-foto-icon');
        if (barbeariaData.foto_perfil) { preview.src = barbeariaData.foto_perfil; preview.classList.remove('hidden'); icon.classList.add('hidden'); }
        else { preview.classList.add('hidden'); icon.classList.remove('hidden'); }
    }

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
        perfilMsg.textContent = msg; perfilMsg.style.color = isError ? '#ba1a1a' : '#0043c8';
        perfilMsg.classList.remove('hidden'); setTimeout(() => perfilMsg.classList.add('hidden'), 3000);
    }

    // ─── Equipa / Profissionais Modal (Gestor Only) ──────────────────
    if (btnEquipa) {
        btnEquipa.addEventListener('click', () => { renderProfissionais(); modalEquipa.classList.remove('hidden'); closeSidebarFn(); });
    }
    if (closeEquipa) closeEquipa.addEventListener('click', () => modalEquipa.classList.add('hidden'));

    if (formAddProf) {
        formAddProf.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('prof-nome').value.trim();
            const isAdmin = document.getElementById('prof-is-admin').checked;
            if (!nome) return;
            const { error } = await supabase.from('profissionais').insert([{
                nome, barbearia_id: currentBarbeariaId, is_admin: isAdmin, ativo: true
            }]);
            if (error) { showEquipaMsg('Erro: ' + error.message, true); return; }
            document.getElementById('prof-nome').value = '';
            document.getElementById('prof-is-admin').checked = false;
            await loadProfissionais();
            renderProfissionais();
            showEquipaMsg('Profissional adicionado!', false);
        });
    }

    function renderProfissionais() {
        if (!listaProf) return;
        listaProf.innerHTML = '';
        if (profissionaisLista.length === 0) {
            listaProf.innerHTML = '<p class="text-center text-on-surface-variant text-sm opacity-60">Nenhum profissional cadastrado.</p>';
            return;
        }
        profissionaisLista.forEach(p => {
            const adminBadge = p.is_admin ? '<span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">Gestor</span>' : '';
            listaProf.innerHTML += `
                <div class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="material-symbols-outlined text-primary">person</span>
                        </div>
                        <div>
                            <p class="font-bold text-sm">${p.nome} ${adminBadge}</p>
                            <p class="text-xs text-on-surface-variant opacity-60">${p.ativo ? 'Ativo' : 'Inativo'}</p>
                        </div>
                    </div>
                    <button onclick="window.removerProfissional('${p.id}')" class="p-2 rounded-xl hover:bg-error/10 text-error transition-all active:scale-90">
                        <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>`;
        });
    }

    window.removerProfissional = async (id) => {
        if (!confirm('Remover este profissional?')) return;
        await supabase.from('profissionais').update({ ativo: false }).eq('id', id);
        await loadProfissionais();
        renderProfissionais();
        showEquipaMsg('Profissional removido.', false);
    };

    function showEquipaMsg(msg, isError) {
        if (!equipaMsg) return;
        equipaMsg.textContent = msg; equipaMsg.style.color = isError ? '#ba1a1a' : '#0043c8';
        equipaMsg.classList.remove('hidden'); setTimeout(() => equipaMsg.classList.add('hidden'), 3000);
    }
});
