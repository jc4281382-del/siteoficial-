import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const barbeariaId = params.get('barbearia_id');

    const viewEntrada = document.getElementById('view-entrada');
    const viewAguardando = document.getElementById('view-aguardando');
    const viewChamado = document.getElementById('view-chamado');

    const formCheckin = document.getElementById('form-checkin');
    const nomeClienteInput = document.getElementById('nome-cliente');
    const errorCheckin = document.getElementById('error-checkin');
    const posicaoFila = document.getElementById('posicao-fila');

    let minhaFilaId = null;

    if (!barbeariaId) {
        errorCheckin.textContent = "Erro: Barbearia não identificada na URL.";
        errorCheckin.classList.remove('hidden');
        formCheckin.querySelector('button').disabled = true;
        return;
    }

    formCheckin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = nomeClienteInput.value.trim();
        if (!nome) return;

        errorCheckin.classList.add('hidden');

        // O RLS permite public INSERT na tabela filas
        const { data, error } = await supabase
            .from('filas')
            .insert([{
                barbearia_id: barbeariaId,
                nome_cliente: nome,
                status: 'aguardando',
                // valor_corte vazio inicialmente
            }])
            .select()
            .single();

        if (error || !data) {
            console.error("Erro ao entrar na fila:", error);
            errorCheckin.textContent = "Houve um erro ao tentar entrar na fila.";
            errorCheckin.classList.remove('hidden');
            return;
        }

        minhaFilaId = data.id;

        // Transição de telas
        viewEntrada.classList.add('hidden');
        viewAguardando.classList.remove('hidden');

        // Carrega posicao atual e inicia o listen
        await atualizarPosicao();
        iniciarRealtime();
    });

    async function atualizarPosicao() {
        if (!minhaFilaId) return;

        // Na política de RLS, clientes podem ler fila ativa ('aguardando' ou 'chamado')
        const { data: filas, error } = await supabase
            .from('filas')
            .select('id, status')
            .eq('barbearia_id', barbeariaId)
            .eq('status', 'aguardando')
            .order('criado_em', { ascending: true });

        if (error) {
            console.error("Erro ao buscar posição:", error);
            return;
        }

        // Calcula a posição (o index no array ordenado de quem está aguardando)
        const index = filas.findIndex(f => f.id === minhaFilaId);
        
        if (index !== -1) {
            posicaoFila.textContent = (index + 1).toString().padStart(2, '0');
        } else {
            // Se não está entre os que aguardam, checar se foi chamado
            verificarStatusAtual();
        }
    }

    async function verificarStatusAtual() {
        if (!minhaFilaId) return;

        const { data: cliente, error } = await supabase
            .from('filas')
            .select('status')
            .eq('id', minhaFilaId)
            .single();

        if (cliente && cliente.status === 'chamado') {
            mostrarViewChamado();
        } else if (cliente && cliente.status === 'finalizado') {
            alert('Seu atendimento foi concluído!');
            window.location.reload();
        }
    }

    function mostrarViewChamado() {
        viewAguardando.classList.add('hidden');
        viewChamado.classList.remove('hidden');

        // Notificação e Vibração
        if (navigator.vibrate) {
            // Vibra durante 200ms, pausa 100ms, vibra 200ms
            navigator.vibrate([200, 100, 200]);
        }
    }

    function iniciarRealtime() {
        // Escutar a tabela filas para atualizar posição em tempo real
        supabase.channel('cliente-fila')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'filas', filter: `barbearia_id=eq.${barbeariaId}` }, 
                (payload) => {
                    // Se o payload for a mutação do próprio cliente
                    if (payload.new && payload.new.id === minhaFilaId) {
                        if (payload.new.status === 'chamado') {
                            mostrarViewChamado();
                        } else if (payload.new.status === 'finalizado') {
                            alert('Atendimento concluído. Obrigado!');
                            window.location.reload();
                        } else {
                            atualizarPosicao();
                        }
                    } else {
                        // Se outro cliente mudou de status (alguém foi chamado/saiu), a posição muda
                        atualizarPosicao();
                    }
                }
            )
            .subscribe();
    }
});
