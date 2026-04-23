import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
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
    const campoProfissional = document.getElementById('campo-profissional');
    const selectProfissional = document.getElementById('select-profissional');

    let minhaFilaId = null;

    if (isAdmin && campoHorario) campoHorario.classList.remove('hidden');

    if (!barbeariaId) {
        errorCheckin.textContent = "Erro: Barbearia não identificada na URL.";
        errorCheckin.classList.remove('hidden');
        formCheckin.querySelector('button[type="submit"]').disabled = true;
        return;
    }

    // Adaptação Inteligente: verifica quantos profissionais a barbearia possui
    const { data: profissionais } = await supabase.from('profissionais')
        .select('id, nome').eq('barbearia_id', barbeariaId).eq('ativo', true);

    if (profissionais && profissionais.length > 1 && campoProfissional && selectProfissional) {
        campoProfissional.classList.remove('hidden');
        profissionais.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nome;
            selectProfissional.appendChild(opt);
        });
    }

    formCheckin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = nomeClienteInput.value.trim();
        if (!nome) return;
        errorCheckin.classList.add('hidden');
        const btnSubmit = formCheckin.querySelector('button[type="submit"]');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Processando...';

        const insertData = { barbearia_id: barbeariaId, nome_cliente: nome, status: 'aguardando' };
        if (isAdmin && horarioInput && horarioInput.value) insertData.horario_agendado = horarioInput.value;
        if (selectProfissional && selectProfissional.value) insertData.profissional_id = selectProfissional.value;

        const { data, error } = await supabase.from('filas').insert([insertData]).select().single();
        if (error || !data) {
            errorCheckin.textContent = "Houve um erro ao tentar entrar na fila.";
            errorCheckin.classList.remove('hidden');
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<span>Entrar na Fila</span><span class="material-symbols-outlined">arrow_forward</span>';
            return;
        }
        minhaFilaId = data.id;
        requestNotificationPermission();
        viewEntrada.classList.add('hidden');
        viewAguardando.classList.remove('hidden');
        await atualizarPosicao();
        iniciarRealtime();
    });

    function requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    function dispararNotificacao() {
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
        if ('Notification' in window && Notification.permission === 'granted') {
            const n = new Notification('🔔 Precision Barber', {
                body: 'Chegou a sua vez! Dirija-se à cadeira do barbeiro.',
                icon: './logo-192.png', tag: 'chamado-notification', renotify: true
            });
            n.onclick = () => { window.focus(); n.close(); };
        }
    }

    async function atualizarPosicao() {
        if (!minhaFilaId) return;
        const { data: filas, error } = await supabase.from('filas')
            .select('id, status').eq('barbearia_id', barbeariaId)
            .eq('status', 'aguardando').order('criado_em', { ascending: true });
        if (error) return;
        const index = filas.findIndex(f => f.id === minhaFilaId);
        if (index !== -1) posicaoFila.textContent = (index + 1).toString().padStart(2, '0');
        else verificarStatusAtual();
    }

    async function verificarStatusAtual() {
        if (!minhaFilaId) return;
        const { data: cliente } = await supabase.from('filas').select('status').eq('id', minhaFilaId).single();
        if (cliente?.status === 'chamado') mostrarViewChamado();
        else if (cliente?.status === 'finalizado') { alert('Seu atendimento foi concluído!'); window.location.reload(); }
    }

    function mostrarViewChamado() {
        viewAguardando.classList.add('hidden');
        viewChamado.classList.remove('hidden');
        dispararNotificacao();
    }

    function iniciarRealtime() {
        supabase.channel('cliente-fila')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'filas', filter: `barbearia_id=eq.${barbeariaId}` },
                (payload) => {
                    if (payload.new?.id === minhaFilaId) {
                        if (payload.new.status === 'chamado') mostrarViewChamado();
                        else if (payload.new.status === 'finalizado') { alert('Atendimento concluído. Obrigado!'); window.location.reload(); }
                        else atualizarPosicao();
                    } else atualizarPosicao();
                }
            ).subscribe();
    }
});
