"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-surface/80 dark:bg-surface/80 backdrop-blur-xl text-primary dark:text-primary-fixed-dim font-headline-md text-headline-md-mobile docked full-width top-0 border-b border-white/10 shadow-sm flex justify-between items-center w-full px-container-margin py-base sticky top-0 z-50 h-16">
      <div className="flex items-center gap-3">
        <img alt="Finance Class Logo" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0apHcWszLVTpmsQm86nMHsXshjR8pGdcuZtJ3bhype9830RuGK4GOKjqTSLeAOdmCgZkBae4nKlIQTH0CgJnHXhUC0dz6Km5HEgcCQEW3cWK2L7BxfeInxyNMiPYLyaYU4e3Y6TG0nsNWwkMEARaYFQzH0pILOzDvXabhADbiaRDDfzXnoJvwNxrksu76S7wkcUSuSRkkCgxp5uahaP-Y7ZGTMwLzHmocHTqEYIqfBJAOCElcZ2Mp7rYZq8sATorCxXGTVsgxILs" />
        <span className="font-display-lg text-headline-md text-primary dark:text-primary-fixed-dim">Finance Class</span>
      </div>
      
      <div className="relative">
        <div 
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-surface-container hover:bg-surface-container-high/50 transition-colors cursor-pointer active:scale-95 transition-transform duration-200 overflow-hidden"
        >
          <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmcBV6w-B9MtxWqrgjj3GHyfTkCjuQbOj3y4QWGDi3inxnrH5zkaL_jFSX1sO_RfOP8mSPlk5pp3d3VAYuJCN8Ag1FSnfRDjC8gui2LTc-bxCSAB6deGsOom-FfgPwbXrHQHMPGMSDUDMZsCoLw8fxwlRoROvoUxh47FAEdBiwsOYYGv8oyrMnviLIIMhsN5GDC7GvXud8gFztm_Sfq0V5d2Mbv5TH90giFkp2yKCrpRqPpxMSeP4PRylWJBNTX0kqQ1WIfVOqwPU" />
        </div>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-surface-container border border-white/10 rounded-xl shadow-lg py-2 z-50">
            <button className="w-full text-left px-4 py-2 hover:bg-white/5 text-on-surface font-body-md flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              Alterar Foto
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-white/5 text-on-surface font-body-md flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Relatório Excel
            </button>
            <a href="https://wa.me/5521992341112" target="_blank" rel="noreferrer" className="w-full text-left px-4 py-2 hover:bg-white/5 text-on-surface font-body-md flex items-center gap-2 block">
              <span className="material-symbols-outlined text-[20px] align-middle">support_agent</span>
              <span className="align-middle ml-1">Suporte</span>
            </a>
            <div className="border-t border-white/10 my-1"></div>
            <button className="w-full text-left px-4 py-2 hover:bg-error/10 text-error font-body-md flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
