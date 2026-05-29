// app.js - Global Logic for FinPulse

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

const updateMetrics = () => {
    if (!window.db || !window.db.metrics) return;
    
    const metrics = window.db.metrics.getDashboardMetrics();
    
    const saldoEl = document.getElementById('saldo-disponivel');
    const faturaEl = document.getElementById('fatura-atual');
    const entradasEl = document.getElementById('total-entradas');
    const saidasEl = document.getElementById('total-saidas');
    const patrimonioEl = document.getElementById('patrimonio-total');
    
    if (saldoEl) saldoEl.innerText = formatCurrency(metrics.saldo);
    if (faturaEl) faturaEl.innerText = formatCurrency(metrics.limiteUtilizado);
    if (entradasEl) entradasEl.innerText = formatCurrency(metrics.entradas);
    if (saidasEl) saidasEl.innerText = formatCurrency(metrics.saidas);
    if (patrimonioEl) patrimonioEl.innerText = formatCurrency(metrics.patrimonioTotal);
};

document.addEventListener('DOMContentLoaded', () => {
    // Ensure metrics are updated on load
    updateMetrics();

    // Handle Transaction Form in inicio.html
    const form = document.getElementById('transaction-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const desc = document.getElementById('transacao-desc').value;
            const val = parseFloat(document.getElementById('transacao-valor').value);
            const tipo = document.getElementById('transacao-tipo').value;
            
            if (!desc || isNaN(val)) return;
            
            window.db.transacoes.add({
                descricao: desc,
                valor: val,
                tipo: tipo, // 'entrada' ou 'saida'
                categoria: 'Outros'
            });
            
            form.reset();
            updateMetrics();
            alert('Transação adicionada com sucesso!');
        });
    }
});
