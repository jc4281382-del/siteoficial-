// db.js - Mocking data and authentication for FinPulse using LocalStorage

const STORE_KEY = 'finpulse_data';
const AUTH_KEY = 'finpulse_auth';

function getStore() {
    const defaultStore = {
        users: [],
        transacoes: [],
        cartoes: [],
        investimentos: []
    };
    try {
        const data = localStorage.getItem(STORE_KEY);
        return data ? JSON.parse(data) : defaultStore;
    } catch (e) {
        return defaultStore;
    }
}

function saveStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

// Global window variables for DB operations
window.db = {
    auth: {
        signUp: async (email, password, name) => {
            const store = getStore();
            if (store.users.find(u => u.email === email)) {
                return { error: { message: "Usuário já existe" } };
            }
            const newUser = { id: crypto.randomUUID(), email, name, password }; // In a real app password is never stored plain
            store.users.push(newUser);
            saveStore(store);
            return { user: newUser, error: null };
        },
        signIn: async (email, password) => {
            const store = getStore();
            const user = store.users.find(u => u.email === email && u.password === password);
            if (!user) {
                return { error: { message: "Credenciais inválidas" } };
            }
            localStorage.setItem(AUTH_KEY, JSON.stringify({ user }));
            return { user, error: null };
        },
        signOut: async () => {
            localStorage.removeItem(AUTH_KEY);
            window.location.href = 'login.html';
        },
        getUser: () => {
            try {
                const data = localStorage.getItem(AUTH_KEY);
                return data ? JSON.parse(data).user : null;
            } catch {
                return null;
            }
        },
        requireAuth: () => {
            const user = window.db.auth.getUser();
            if (!user && !window.location.pathname.includes('login.html')) {
                window.location.href = 'login.html';
            }
            if (user && window.location.pathname.includes('login.html')) {
                window.location.href = 'inicio.html';
            }
        }
    },
    
    // CRUD Operations for the active user
    transacoes: {
        list: () => {
            const user = window.db.auth.getUser();
            if (!user) return [];
            return getStore().transacoes.filter(t => t.user_id === user.id);
        },
        add: (transacao) => {
            const user = window.db.auth.getUser();
            if (!user) return;
            const store = getStore();
            const newT = { ...transacao, id: crypto.randomUUID(), user_id: user.id, data: new Date().toISOString() };
            store.transacoes.push(newT);
            saveStore(store);
            return newT;
        }
    },
    
    cartoes: {
        list: () => {
            const user = window.db.auth.getUser();
            if (!user) return [];
            return getStore().cartoes.filter(c => c.user_id === user.id);
        },
        add: (cartao) => {
            const user = window.db.auth.getUser();
            if (!user) return;
            const store = getStore();
            const newC = { ...cartao, id: crypto.randomUUID(), user_id: user.id };
            store.cartoes.push(newC);
            saveStore(store);
            return newC;
        }
    },
    
    investimentos: {
        list: () => {
            const user = window.db.auth.getUser();
            if (!user) return [];
            return getStore().investimentos.filter(i => i.user_id === user.id);
        },
        add: (inv) => {
            const user = window.db.auth.getUser();
            if (!user) return;
            const store = getStore();
            const newI = { ...inv, id: crypto.randomUUID(), user_id: user.id };
            store.investimentos.push(newI);
            saveStore(store);
            return newI;
        }
    },
    
    metrics: {
        getDashboardMetrics: () => {
            const transacoes = window.db.transacoes.list();
            const cartoes = window.db.cartoes.list();
            const investimentos = window.db.investimentos.list();
            
            let totalEntradas = 0;
            let totalSaidas = 0;
            
            transacoes.forEach(t => {
                if (t.tipo === 'entrada') totalEntradas += parseFloat(t.valor || 0);
                if (t.tipo === 'saida') totalSaidas += parseFloat(t.valor || 0);
            });
            
            let saldo = totalEntradas - totalSaidas;
            
            let patrimonioTotal = saldo;
            investimentos.forEach(i => patrimonioTotal += parseFloat(i.valor_investido || 0));
            
            // Fatura de cartões mock
            let limiteUtilizado = 0;
            let limiteTotal = 0;
            cartoes.forEach(c => {
                limiteTotal += parseFloat(c.limite || 0);
            });
            
            return {
                saldo,
                entradas: totalEntradas,
                saidas: totalSaidas,
                patrimonioTotal,
                limiteUtilizado,
                limiteTotal
            };
        }
    }
};

// Check auth on script load
document.addEventListener('DOMContentLoaded', () => {
    window.db.auth.requireAuth();
});
