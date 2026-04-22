import { supabase } from './supabase.js';

/**
 * Cliente.js — Lógica do check-in do cliente
 * 
 * Funcionalidades:
 * 1. Check-in normal (nome + sobrenome)
 * 2. Modo Admin (?admin=true) — exibe campo de horário agendado
 * 3. Web Push Notifications quando status muda para "chamado"
 * 4. Vibration API para alertar o utilizador
 * 5. Realtime via Supabase para atualização de posição
 */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const barbeariaId = params.get('barbearia_id');
    const isAdmin = params.get('admin') === 'true';

    const viewEntrada = document.getElementById('view-entrada');
    const viewAguardando = document.getElementById('view-aguardando');
    const viewChamado = document.getElementById('view-chamado');
    const formCheckin = document.getElementById('form-checkin');
    const nomeClienteInput = document.getElementById('nome-cliente');
    const errorCheckin = document.getElementById('error-checkin');
    const posicaoFila = document.getElementById('posicao-fila');
    const campoHorario = document.getElementById('campo-horario');
    const horarioInput = document.getElementById('horario-agendado');

    let minhaFilaId = null;

    // ─── Modo Admin: mostrar campo de horário ────────────────────────
    if (isAdmin && campoHorario) {
        campoHorario.classList.remove('hidden');
    }

    // ─── Validação de barbearia ──────────────────────────────────────
    if (!barbeariaId) {
        errorCheckin.textContent = "Erro: Barbearia não identificada na URL.";
        errorCheckin.classList.remove('hidden');
        formCheckin.querySelector('button[type="submit"]').disabled = true;
        return;
    }

    // ─── Submit Check-in ─────────────────────────────────────────────
    formCheckin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = nomeClienteInput.value.trim();
        if (!nome) return;

        errorCheckin.classList.add('hidden');
        const btnSubmit = formCheckin.querySelector('button[type="submit"]');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Processando...';

        // Preparar dados do insert
        const insertData = {
            barbearia_id: barbeariaId,
            nome_cliente: nome,
            status: 'aguardando',
        };

        // Se admin e horário preenchido, incluir horario_agendado
        if (isAdmin && horarioInput && horarioInput.value) {
            insertData.horario_agendado = horarioInput.value;
        }

        const { data, error } = await supabase
            .from('filas')
            .insert([insertData])
            .select()
            .single();

        if (error || !data) {
            console.error("Erro ao entrar na fila:", error);
            errorCheckin.textContent = "Houve um erro ao tentar entrar na fila.";
            errorCheckin.classList.remove('hidden');
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<span>Entrar na Fila</span><span class="material-symbols-outlined">arrow_forward</span>';
            return;
        }

        minhaFilaId = data.id;

        // Pedir permissão de notificação ao entrar na fila
        requestNotificationPermission();

        // Transição de telas
        viewEntrada.classList.add('hidden');
        viewAguardando.classList.remove('hidden');

        await atualizarPosicao();
        iniciarRealtime();
    });

    // ─── Notification Permission ─────────────────────────────────────
    function requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(perm => {
                console.log('[Notificação] Permissão:', perm);
            });
        }
    }

    /**
     * Dispara uma Web Notification + vibração quando o cliente é chamado.
     * Funciona mesmo se a aba estiver em background (se permissão concedida).
     */
    function dispararNotificacao() {
        // Vibração
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 400]);
        }

        // Web Notification
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification('🔔 Precision Barber', {
                body: 'Chegou a sua vez! Dirija-se à cadeira do barbeiro.',
                icon: './logo.png',
                tag: 'chamado-notification',
                renotify: true,
                vibrate: [200, 100, 200, 100, 400]
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }
    }

    // ─── Atualizar Posição na Fila ───────────────────────────────────
    async function atualizarPosicao() {
        if (!minhaFilaId) return;
        const { data: filas, error } = await supabase.from('filas')
            .select('id, status').eq('barbearia_id', barbeariaId)
            .eq('status', 'aguardando').order('criado_em', { ascending: true });
        if (error) { console.error("Erro posição:", error); return; }

        const index = filas.findIndex(f => f.id === minhaFilaId);
        if (index !== -1) {
            posicaoFila.textContent = (index + 1).toString().padStart(2, '0');
        } else {
            verificarStatusAtual();
        }
    }

    async function verificarStatusAtual() {
        if (!minhaFilaId) return;
        const { data: cliente } = await supabase.from('filas')
            .select('status').eq('id', minhaFilaId).single();
        if (cliente?.status === 'chamado') mostrarViewChamado();
        else if (cliente?.status === 'finalizado') {
            alert('Seu atendimento foi concluído!'); window.location.reload();
        }
    }

    function mostrarViewChamado() {
        viewAguardando.classList.add('hidden');
        viewChamado.classList.remove('hidden');
        dispararNotificacao();
    }

    // ─── Realtime ────────────────────────────────────────────────────
    function iniciarRealtime() {
        supabase.channel('cliente-fila')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'filas', filter: `barbearia_id=eq.${barbeariaId}` },
                (payload) => {
                    if (payload.new?.id === minhaFilaId) {
                        if (payload.new.status === 'chamado') mostrarViewChamado();
                        else if (payload.new.status === 'finalizado') {
                            alert('Atendimento concluído. Obrigado!'); window.location.reload();
                        } else atualizarPosicao();
                    } else atualizarPosicao();
                }
            ).subscribe();
    }
});
