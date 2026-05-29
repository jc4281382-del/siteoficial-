"use client";

export default function Transacoes() {
  return (
    <>
        <section className="mb-stack-md">
            <div className="glass-card rounded-xl p-stack-md flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2d5bff] to-[#6e06d0] blur-[80px] opacity-20 -mr-10 -mt-10">
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                            Resumo de Outubro</p>
                        <p className="font-headline-md text-headline-md-mobile text-on-surface">R$ 12.450,00</p>
                    </div>
                    <div className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        <span className="font-label-sm text-label-sm">12%</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface-variant">Gastos: R$ 4.200,00</span>
                        <span className="text-primary">Limite: R$ 6.000,00</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-br from-[#2d5bff] to-[#6e06d0] w-[70%] rounded-full shadow-[0_0_8px_rgba(45,91,255,0.5)]">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="mb-stack-md space-y-stack-sm">
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input
                    className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/50 transition-all font-body-md text-body-md outline-none"
                    placeholder="Buscar transações..." type="text" />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                <button className="flex-shrink-0 px-5 py-2 rounded-full bg-gradient-to-br from-[#2d5bff] to-[#6e06d0] text-on-primary font-label-md text-label-md transition-all active:scale-95">Todas</button>
                <button className="flex-shrink-0 px-5 py-2 rounded-full glass-card text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high/50 transition-all active:scale-95">Alimentação</button>
                <button className="flex-shrink-0 px-5 py-2 rounded-full glass-card text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high/50 transition-all active:scale-95">Lazer</button>
                <button className="flex-shrink-0 px-5 py-2 rounded-full glass-card text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high/50 transition-all active:scale-95">Serviços</button>
                <button className="flex-shrink-0 px-5 py-2 rounded-full glass-card text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high/50 transition-all active:scale-95">Educação</button>
            </div>
        </section>

        <section className="space-y-stack-md">
            <div className="space-y-stack-sm">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest px-1">Hoje</h3>
                <div className="space-y-1">
                    <div className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-surface-container-high/30 transition-colors active:scale-[0.98] duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">restaurant</span>
                            </div>
                            <div>
                                <p className="font-body-md text-body-md text-on-surface">Starbucks Reserve</p>
                                <p className="font-label-sm text-label-sm text-on-surface-variant">Alimentação • 09:41</p>
                            </div>
                        </div>
                        <p className="font-headline-md text-headline-md-mobile text-on-surface">- R$ 32,50</p>
                    </div>
                    <div className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-surface-container-high/30 transition-colors active:scale-[0.98] duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <div>
                                <p className="font-body-md text-body-md text-on-surface">Transferência Recebida</p>
                                <p className="font-label-sm text-label-sm text-on-surface-variant">Serviços • 08:15</p>
                            </div>
                        </div>
                        <p className="font-headline-md text-headline-md-mobile text-primary">+ R$ 1.200,00</p>
                    </div>
                </div>
            </div>
            
            <div className="space-y-stack-sm">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest px-1">Ontem</h3>
                <div className="space-y-1">
                    <div className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-surface-container-high/30 transition-colors active:scale-[0.98] duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                                <span className="material-symbols-outlined">shopping_bag</span>
                            </div>
                            <div>
                                <p className="font-body-md text-body-md text-on-surface">Apple Store</p>
                                <p className="font-label-sm text-label-sm text-on-surface-variant">Lazer • 18:30</p>
                            </div>
                        </div>
                        <p className="font-headline-md text-headline-md-mobile text-on-surface">- R$ 899,00</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
