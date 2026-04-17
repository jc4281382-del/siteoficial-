import { supabase } from './supabase.js';

let currentBarbeariaId = null;
let currentCadeiraId = null; // Guardar ID do cliente que está sendo finalizado

document.addEventListener('DOMContentLoaded', async () => {
    // Referências DOM
    const modalLogin = document.getElementById('modal-login');
    const formLogin = document.getElementById('form-login');
    const loginError = document.getElementById('login-error');
    const btnLogout = document.getElementById('btn-logout');

    const modalQrcode = document.getElementById('modal-qrcode');
    const btnVerQrcode = document.getElementById('btn-ver-qrcode');
    const closeQrcode = document.getElementById('close-qrcode');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const linkCliente = document.getElementById('link-cliente');

    const modalFinalizar = document.getElementById('modal-finalizar');
    const formFinalizar = document.getElementById('form-finalizar');
    const closeFinalizar = document.getElementById('close-finalizar');
    const valorCorteInput = document.getElementById('valor-corte');

    const queueList = document.getElementById('queue-list');
    const labelQtd = document.getElementById('label-qtd-clientes');
    const btnChamarProximo = document.getElementById('btn-chamar-proximo');
    
    // KPIs
    const naFilaCount = document.getElementById('na-fila-count');
    const atendidosCount = document.getElementById('atendidos-count');
    const totalDiaCount = document.getElementById('total-dia');

    // 1. Verificação de Autenticação
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        modalLogin.classList.remove('hidden');
    } else {
        await initDashboard(session.user.id);
    }

    // 2. Eventos de Login e Logout
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.classList.add('hidden');
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            loginError.textContent = 'Erro ao fazer login: ' + error.message;
            loginError.classList.remove('hidden');
        } else {
            modalLogin.classList.add('hidden');
            await initDashboard(data.user.id);
        }
    });

    btnLogout.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.reload();
    });

    // 3. Inicialização Principal
    async function initDashboard(userId) {
        btnLogout.classList.remove('hidden');

        // Buscar barbearia associada
        const { data: barbearias, error } = await supabase
            .from('barbearias')
            .select('*')
            .eq('auth_id', userId)
            .limit(1);

        if (error || !barbearias || barbearias.length === 0) {
            alert("Nenhuma barbearia vinculada ao seu usuário.");
            return;
        }

        currentBarbeariaId = barbearias[0].id;

        // Gerar Link e QR Code
        const urlCliente = window.location.origin + '/cliente.html?barbearia_id=' + currentBarbeariaId;
        new QRCode(qrcodeContainer, {
            text: urlCliente,
            width: 200,
            height: 200
        });
        linkCliente.addEventListener('click', () => window.open(urlCliente, '_blank'));

        // Carga inicial
        await loadDashboardData();

        // Configurar Supabase Realtime
        supabase.channel('dashboard-filas')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'filas', filter: `barbearia_id=eq.${currentBarbeariaId}` }, 
                () => loadDashboardData()
            )
            .subscribe();
    }

    // 4. Lógica de Carregamento
    async function loadDashboardData() {
        if (!currentBarbeariaId) return;

        // Pegar início do dia para métricas
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Fetch das filas ativas (aguardando ou chamado) e finalizados hoje
        const { data: filas, error } = await supabase
            .from('filas')
            .select('*')
            .eq('barbearia_id', currentBarbeariaId)
            .order('criado_em', { ascending: true });

        if (error) {
            console.error("Erro ao carregar fila:", error);
            return;
        }

        let aguardando = [];
        let chamado = null;
        let atendidosHoje = 0;
        let totalRecebido = 0.0;

        filas.forEach(f => {
            if (f.status === 'aguardando') {
                aguardando.push(f);
            } else if (f.status === 'chamado') {
                chamado = f; // assumimos que só deve haver 1
            } else if (f.status === 'finalizado') {
                const criadoEm = new Date(f.criado_em);
                if (criadoEm >= startOfDay) {
                    atendidosHoje++;
                    totalRecebido += Number(f.valor_corte) || 0;
                }
            }
        });

        // Atualizar KPIs
        naFilaCount.textContent = aguardando.length.toString().padStart(2, '0');
        atendidosCount.textContent = atendidosHoje.toString().padStart(2, '0');
        totalDiaCount.textContent = totalRecebido.toFixed(2);
        labelQtd.textContent = (aguardando.length + (chamado ? 1 : 0)) + ' Clientes';

        // Botão de Chamar Próximo
        if (aguardando.length > 0 && !chamado) {
            btnChamarProximo.disabled = false;
            btnChamarProximo.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            btnChamarProximo.disabled = true;
            btnChamarProximo.classList.add('opacity-50', 'cursor-not-allowed');
        }

        // Renderizar Lista
        renderQueue(aguardando, chamado);
    }

    function renderQueue(aguardando, chamado) {
        queueList.innerHTML = '';
        let count = 1;

        if (chamado) {
            queueList.innerHTML += `
                <div class="bg-primary/5 p-6 rounded-full flex justify-between items-center border-2 border-primary/10 shadow-[0_10px_30px_rgba(0,67,200,0.08)]">
                    <div class="flex items-center gap-6">
                        <span class="text-3xl font-black text-primary">${count.toString().padStart(2, '0')}</span>
                        <div>
                            <p class="text-xl font-bold text-primary">${chamado.nome_cliente}</p>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                <span class="text-xs font-bold uppercase tracking-widest text-primary">chamado</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="text-right hidden sm:block">
                            <p class="text-xs font-bold uppercase tracking-widest text-primary opacity-60">Status</p>
                            <p class="text-lg font-bold text-primary">Na cadeira</p>
                        </div>
                        <button onclick="window.abrirModalFinalizar('${chamado.id}')"
                            class="bg-primary text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95">
                            <span class="material-symbols-outlined text-sm">payments</span>
                            Finalizar
                        </button>
                    </div>
                </div>
            `;
            count++;
        }

        aguardando.forEach((cliente, index) => {
            const tempoEst = (index + 1) * 30; // ex: 30 min por cliente
            queueList.innerHTML += `
                <div class="bg-surface-container-low p-6 rounded-full flex justify-between items-center transition-all hover:bg-surface-container-high cursor-pointer">
                    <div class="flex items-center gap-6">
                        <span class="text-3xl font-black text-outline opacity-40">${count.toString().padStart(2, '0')}</span>
                        <div>
                            <p class="text-xl font-bold">${cliente.nome_cliente}</p>
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
                </div>
            `;
            count++;
        });
    }

    // 5. Ações da Fila
    btnChamarProximo.addEventListener('click', async () => {
        if (!currentBarbeariaId || btnChamarProximo.disabled) return;
        
        // Pega o cara mais antigo aguardando
        const { data, error } = await supabase
            .from('filas')
            .select('id')
            .eq('barbearia_id', currentBarbeariaId)
            .eq('status', 'aguardando')
            .order('criado_em', { ascending: true })
            .limit(1);

        if (error || !data || data.length === 0) return;

        const clienteId = data[0].id;
        await supabase.from('filas').update({ status: 'chamado' }).eq('id', clienteId);
        // O Realtime irá atualizar a UI em seguida
    });

    // 6. Configuração dos Modais
    btnVerQrcode.addEventListener('click', () => modalQrcode.classList.remove('hidden'));
    closeQrcode.addEventListener('click', () => modalQrcode.classList.add('hidden'));

    window.abrirModalFinalizar = (id) => {
        currentCadeiraId = id;
        valorCorteInput.value = '';
        modalFinalizar.classList.remove('hidden');
    };

    closeFinalizar.addEventListener('click', () => modalFinalizar.classList.add('hidden'));

    formFinalizar.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentCadeiraId) return;

        const val = parseFloat(valorCorteInput.value) || 0;
        
        await supabase.from('filas').update({ 
            status: 'finalizado',
            valor_corte: val
        }).eq('id', currentCadeiraId);

        modalFinalizar.classList.add('hidden');
        currentCadeiraId = null;
    });
});
