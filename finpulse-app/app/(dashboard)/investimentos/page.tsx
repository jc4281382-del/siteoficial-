"use client";

export default function Investimentos() {
  return (
    <>
        <div className="flex items-center gap-3 mb-6">
            <h1 className="font-headline-md text-headline-md-mobile text-primary dark:text-primary-fixed-dim">Meus Investimentos</h1>
        </div>

        <section className="mt-stack-md -mx-container-margin px-container-margin">
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-4">
                <div className="snap-center shrink-0 w-[85vw] max-w-[340px] aspect-[1.586/1] bg-gradient-to-br from-[#2d5bff] to-[#6e06d0] rounded-xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2">
                    </div>
                    <div className="flex justify-between items-start z-10">
                        <span className="font-display-lg text-white text-headline-md opacity-90">Finance Class</span>
                        <div className="material-symbols-outlined text-white/40 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>contactless</div>
                    </div>
                    <div className="z-10 mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-7 bg-white/20 rounded-md backdrop-blur-sm border border-white/10"></div>
                        </div>
                        <p className="font-label-md text-white tracking-[0.2em] mb-4">•••• •••• •••• 8892</p>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-white/60 uppercase font-label-sm">Cardholder</p>
                                <p className="font-label-md text-white text-label-md">ALEXANDER M. SILVA</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-white/60 uppercase font-label-sm">Expires</p>
                                <p className="font-label-md text-white text-label-md">09/29</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="snap-center shrink-0 w-[85vw] max-w-[340px] aspect-[1.586/1] glass-card rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
                    <div className="flex justify-between items-start z-10">
                        <div className="flex flex-col">
                            <span className="font-display-lg text-primary text-headline-md">Virtual</span>
                            <span className="font-label-sm text-on-surface-variant/60 -mt-1">Digital Security</span>
                        </div>
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                    </div>
                    <div className="z-10 mt-auto">
                        <p className="font-label-md text-on-surface tracking-[0.2em] mb-4">•••• •••• •••• 1245</p>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-on-surface-variant/60 uppercase font-label-sm">Status</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#00dce5]"></div>
                                    <p className="font-label-md text-on-surface text-label-md">Ativo</p>
                                </div>
                            </div>
                            <button className="bg-primary-container/20 text-primary-fixed-dim px-3 py-1 rounded-lg border border-primary/10 text-label-sm active:scale-95 transition-all">
                                Ver Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
                <div className="w-6 h-1 rounded-full bg-primary"></div>
                <div className="w-1.5 h-1 rounded-full bg-surface-container-highest"></div>
            </div>
        </section>

        <section className="mt-stack-lg space-y-stack-md">
            <div className="glass-card p-6 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-label-md text-label-md">Limite Disponível</span>
                    <span className="text-on-surface font-headline-md text-headline-md">R$ 12.450,00</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[35%] shadow-[0_0_12px_rgba(184,195,255,0.4)]"></div>
                </div>
                <div className="flex justify-between items-center text-label-sm font-label-sm">
                    <span className="text-on-surface-variant/60">Limite Utilizado: R$ 6.550,00</span>
                    <span className="text-on-surface-variant/60">Total: R$ 19.000,00</span>
                </div>
            </div>
        </section>
    </>
  );
}
