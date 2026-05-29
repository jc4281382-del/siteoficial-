"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Início", path: "/", icon: "home" },
    { name: "Transações", path: "/transacoes", icon: "swap_horiz" },
    { name: "Cartões", path: "/cartoes", icon: "credit_card" },
    { name: "Investimentos", path: "/investimentos", icon: "trending_up" },
    { name: "Diagnóstico", path: "/diagnostico", icon: "dashboard" }
  ];

  return (
    <nav className="bg-surface/90 dark:bg-surface/90 backdrop-blur-2xl text-primary dark:text-primary-fixed-dim font-label-sm text-label-sm docked full-width bottom-0 rounded-t-xl border-t border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pt-2 pb-6 h-20">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex flex-col items-center justify-center rounded-xl px-2 py-1.5 active:scale-90 transition-all duration-300 ${
              isActive 
                ? "bg-primary-container/20 text-primary dark:text-primary-fixed-dim" 
                : "text-on-surface-variant/70 hover:text-primary"
            }`}
          >
            <span 
              className="material-symbols-outlined mb-0.5" 
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-[10px] sm:text-[12px]">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
