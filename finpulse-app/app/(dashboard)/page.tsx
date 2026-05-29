"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

export default function Inicio() {
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("food");
  const [parcelas, setParcelas] = useState(1);
  const [cartoes, setCartoes] = useState<any[]>([]);
  const [cartaoId, setCartaoId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch workspace
        const { data: wsData } = await supabase
          .from('workspace_users')
          .select('workspace_id')
          .eq('user_id', user.id)
          .single();
        if (wsData) setWorkspaceId(wsData.workspace_id);

        // Fetch cartoes
        const { data: cardsData } = await supabase
          .from('cartoes_credito')
          .select('id, nome');
        if (cardsData) {
          setCartoes(cardsData);
          if (cardsData.length > 0) setCartaoId(cardsData[0].id);
        }
      }
    };
    fetchData();
  }, []);

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId) {
      setMsg({ text: "Workspace não encontrado. Faça login novamente.", type: "error" });
      return;
    }
    setLoading(true);
    setMsg({ text: "", type: "" });

    // Parse valor
    const parsedValor = parseFloat(valor.replace(',', '.').replace(/[^0-9.-]+/g,""));

    const { error } = await supabase.from('transacoes').insert([{
      workspace_id: workspaceId,
      descricao,
      valor: isNaN(parsedValor) ? 0 : parsedValor,
      categoria,
      parcelas: isCreditCard ? parcelas : 1,
      cartao_id: isCreditCard && cartaoId ? cartaoId : null
    }]);

    setLoading(false);
    if (error) {
      setMsg({ text: error.message, type: "error" });
    } else {
      setMsg({ text: "Transação inserida com sucesso!", type: "success" });
      setDescricao("");
      setValor("");
    }
  };

  return (
    <>
      <section className="mb-gutter">
        <div className="gradient-card rounded-xl p-6 relative overflow-hidden active:scale-[0.98] transition-all duration-300">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-md text-white/80 uppercase tracking-widest">Saldo Disponível</span>
            <span className="material-symbols-outlined text-white/90">visibility</span>
          </div>
          <h2 className="font-display-lg text-display-lg text-white mb-1">R$ 14.250,80</h2>
          <div className="flex items-center gap-2 text-white/70">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="font-label-sm">+ 2,4% este mês</span>
          </div>
        </div>
      </section>

      <section className="mb-gutter">
        <div className="glass-card rounded-xl p-5 flex justify-between items-center active:scale-[0.98] transition-all">
          <div>
            <span className="font-label-sm text-on-surface-variant block mb-1">Fatura Atual</span>
            <h3 className="font-headline-md text-white">R$ 2.415,20</h3>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-on-surface-variant block mb-1">Vence em</span>
            <span className="font-label-md text-tertiary">15 OUT</span>
          </div>
        </div>
      </section>

      <section className="mb-gutter">
        <div className="bg-primary-container/10 border border-primary/20 rounded-xl p-4 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
          </div>
          <div>
            <p className="font-body-md text-on-surface leading-relaxed">
              Mestre, você ainda pode gastar <span className="text-primary font-bold">R$ 1.200</span>, mas que tal colocar parte disso na sua <span className="underline decoration-primary">Caixinha Selic</span> para render?
            </p>
          </div>
        </div>
      </section>

      <section className="mt-stack-lg">
        <h4 className="font-headline-md text-on-surface mb-gutter">Nova Transação</h4>
        <div className="glass-card rounded-xl p-6">
          {msg.text && (
            <div className={`p-3 mb-4 rounded-lg text-sm text-center ${msg.type === 'error' ? 'bg-error-container/20 text-error border border-error/50' : 'bg-tertiary-container/20 text-tertiary border border-tertiary/50'}`}>
              {msg.text}
            </div>
          )}
          <form className="space-y-gutter" id="transaction-form" onSubmit={handleTransaction}>
            <div className="space-y-2">
              <label className="font-label-md text-on-surface-variant">Descrição</label>
              <input className="w-full bg-white/5 border-none border-b border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-lg text-white font-body-md transition-all h-12 outline-none px-2" placeholder="Ex: Café Starbucks" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Valor</label>
                <input className="w-full bg-white/5 border-none border-b border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-lg text-white font-body-md transition-all h-12 outline-none px-2" placeholder="R$ 0,00" type="text" value={valor} onChange={(e) => setValor(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant">Categoria</label>
                <select className="w-full bg-white/5 border-none border-b border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-lg text-white font-body-md transition-all h-12 appearance-none outline-none px-2" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option className="bg-surface" value="food">Alimentação</option>
                  <option className="bg-surface" value="transport">Transporte</option>
                  <option className="bg-surface" value="leisure">Lazer</option>
                  <option className="bg-surface" value="others">Outros</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-label-md text-on-surface">Gastei no Cartão</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  className="sr-only peer" 
                  type="checkbox" 
                  checked={isCreditCard}
                  onChange={(e) => setIsCreditCard(e.target.checked)}
                />
                <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {isCreditCard && (
              <div className="space-y-gutter animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant">Selecionar Cartão</label>
                      <select className="w-full bg-white/5 border-none border-b border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-lg text-white font-body-md transition-all h-12 appearance-none outline-none px-2" value={cartaoId} onChange={(e) => setCartaoId(e.target.value)}>
                          {cartoes.length > 0 ? (
                            cartoes.map(c => (
                              <option key={c.id} className="bg-surface" value={c.id}>{c.nome}</option>
                            ))
                          ) : (
                            <option className="bg-surface" value="">Nenhum cartão cadastrado</option>
                          )}
                      </select>
                  </div>
                  <div className="space-y-2">
                      <label className="font-label-md text-on-surface-variant">Número de Parcelas</label>
                      <input className="w-full bg-white/5 border-none border-b border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-lg text-white font-body-md transition-all h-12 outline-none px-2" max="24" min="1" type="number" value={parcelas} onChange={(e) => setParcelas(parseInt(e.target.value))} />
                  </div>
              </div>
            )}

            <button className="w-full h-14 bg-primary text-on-primary font-headline-md rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg mt-4 disabled:opacity-50" type="submit" disabled={loading}>
              {loading ? "Aguarde..." : "Confirmar Transação"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
