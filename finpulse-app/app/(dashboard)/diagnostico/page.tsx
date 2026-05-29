"use client";

export default function Diagnostico() {
  return (
    <>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar mb-gutter">
            <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 shrink-0">Mês</button>
            <button className="bg-surface-container-high text-on-surface-variant/80 px-6 py-2 rounded-full font-label-md text-label-md transition-all hover:bg-surface-container-highest shrink-0">Trimestre</button>
            <button className="bg-surface-container-high text-on-surface-variant/80 px-6 py-2 rounded-full font-label-md text-label-md transition-all hover:bg-surface-container-highest shrink-0">Ano</button>
            <button className="bg-surface-container-high text-on-surface-variant/80 px-6 py-2 rounded-full font-label-md text-label-md transition-all hover:bg-surface-container-highest shrink-0">Personalizado</button>
        </div>

        <section className="bg-secondary-container/10 border border-secondary-container/30 rounded-xl p-4 flex gap-4 items-start mb-gutter">
            <div className="bg-secondary-container/20 p-2 rounded-lg">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-body-md text-on-surface-variant text-sm">
                    <span className="font-bold text-on-surface">Alerta:</span> Seus gastos em Lazer aumentaram 25% este mês
                </p>
                <p className="font-label-sm text-label-sm text-secondary/80">
                    <span className="font-bold">Dica:</span> Aumente seu aporte em Tesouro Selic para melhorar sua reserva.
                </p>
            </div>
        </section>

        <section className="glass-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden mb-gutter">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
            <div>
                <p className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Saldo Disponível</p>
                <h2 className="font-display-lg text-headline-lg-mobile text-white mt-1">R$ 14.250,80</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-sm">north_east</span>
                        <span className="font-label-sm text-label-sm uppercase">Entradas</span>
                    </div>
                    <p className="font-headline-md text-lg text-on-surface">R$ 8.500,00</p>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-4">
                    <div className="flex items-center gap-1 text-error">
                        <span className="material-symbols-outlined text-sm">south_west</span>
                        <span className="font-label-sm text-label-sm uppercase">Saídas</span>
                    </div>
                    <p className="font-headline-md text-lg text-on-surface">R$ 4.250,00</p>
                </div>
            </div>
            <div className="bg-tertiary-container/20 px-3 py-2 rounded-lg flex items-center gap-2 self-start border border-tertiary-container/30 mt-2">
                <span className="text-sm">✅</span>
                <span className="font-label-sm text-label-sm text-tertiary-fixed">Você está gastando dentro da meta</span>
            </div>
        </section>

        <section className="glass-card rounded-2xl p-6 flex flex-col gap-5 mb-gutter">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="font-label-md text-on-surface-variant text-xs">Patrimônio Total</p>
                    <h3 className="font-headline-md text-headline-md text-primary">R$ 45.280,50</h3>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl">trending_up</span>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span>Alocação</span>
                    <span className="text-on-surface">Total 100%</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                    <div className="h-full bg-secondary" style={{ width: "25%" }}></div>
                    <div className="h-full bg-tertiary" style={{ width: "10%" }}></div>
                </div>
                <div className="flex flex-wrap gap-4 mt-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Renda Fixa (65%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Ações (25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Cripto (10%)</span>
                    </div>
                </div>
            </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <section className="glass-card rounded-2xl p-6 flex flex-col gap-6">
                <h4 className="font-headline-md text-body-lg">Gastos por Categoria</h4>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary text-lg">home_work</span>
                                <span className="font-body-md text-on-surface-variant">Moradia</span>
                            </div>
                            <span className="font-label-md">40%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary transition-all duration-1000" style={{ width: "40%" }}></div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary text-lg">restaurant</span>
                                <span className="font-body-md text-on-surface-variant">Alimentação</span>
                            </div>
                            <span className="font-label-md">30%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary transition-all duration-1000" style={{ width: "30%" }}></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary text-lg">sports_esports</span>
                                <span className="font-body-md text-on-surface-variant">Lazer</span>
                            </div>
                            <span className="font-label-md">15%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary transition-all duration-1000" style={{ width: "15%" }}></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary text-lg">directions_car</span>
                                <span className="font-body-md text-on-surface-variant">Transporte</span>
                            </div>
                            <span className="font-label-md">15%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary transition-all duration-1000" style={{ width: "15%" }}></div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="glass-card rounded-2xl p-6 flex flex-col gap-6 mt-gutter md:mt-0">
                <h4 className="font-headline-md text-body-lg">Fontes de Receita</h4>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <div>
                                <p className="font-body-md text-on-surface">Salário</p>
                                <p className="font-label-sm text-on-surface-variant text-xs">82% do total</p>
                            </div>
                        </div>
                        <p className="font-label-md text-on-surface">R$ 7.000,00</p>
                    </div>
                    
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                                <span className="material-symbols-outlined">laptop_mac</span>
                            </div>
                            <div>
                                <p className="font-body-md text-on-surface">Freelance</p>
                                <p className="font-label-sm text-on-surface-variant text-xs">12% do total</p>
                            </div>
                        </div>
                        <p className="font-label-md text-on-surface">R$ 1.000,00</p>
                    </div>

                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                                <span className="material-symbols-outlined">analytics</span>
                            </div>
                            <div>
                                <p className="font-body-md text-on-surface">Dividendos</p>
                                <p className="font-label-sm text-on-surface-variant text-xs">6% do total</p>
                            </div>
                        </div>
                        <p className="font-label-md text-on-surface">R$ 500,00</p>
                    </div>
                </div>
            </section>
        </div>

        <section className="glass-card rounded-2xl p-6 flex flex-col gap-4 border-l-4 border-primary mt-gutter mb-10">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-label-md text-on-surface-variant uppercase text-xs">Fatura Atual • Vence 15 Out</p>
                    <h3 className="font-headline-md text-headline-md mt-1">R$ 2.842,40</h3>
                </div>
                <span className="material-symbols-outlined text-primary-fixed-dim">credit_card</span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2d5bff] to-[#6e06d0]" style={{ width: "34.5%" }}></div>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span>Limite utilizado: R$ 6.550,00</span>
                    <span>Total: R$ 19.000,00</span>
                </div>
            </div>
            <button className="bg-gradient-to-r from-[#2d5bff] to-[#6e06d0] text-white w-full py-3 rounded-xl font-headline-md text-body-md mt-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                Pagar Fatura
            </button>
        </section>
    </>
  );
}
