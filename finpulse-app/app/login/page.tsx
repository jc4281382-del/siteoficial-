"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { setupUserWorkspace } from "@/app/actions/auth";

export default function Login() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const res = await setupUserWorkspace(data.user.id, name || email.split("@")[0]);
      if (!res.success) {
        setError("Erro ao preparar seu ambiente de dados.");
        setLoading(false);
        return;
      }
    }
    
    // Sucesso, pode logar ou redirecionar
    router.push("/");
  };

  return (
    <div className="text-on-surface min-h-screen flex flex-col items-center bg-black relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(110, 6, 208, 0.15) 0%, rgba(0, 0, 0, 0) 70%)" }}></div>
      
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-sm flex items-center justify-between px-container-margin h-16 w-full z-50">
        <div className="flex items-center gap-2">
            <img alt="Finance Class Logo" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_6obasz_CWvbd5QKbkmDVgLJKUsB8yP2RkAkksCbRawwWhmyjiRF4J9aGGRX3rzC2EX04Fc8nS6hUW2qur9Y63ft9XgNzeQDnVrGFWIPTC9Wj9iSe6R5dZStc1qNxP3K-xnbG3uMJ6Po9UfE1AiJeV24CBOpJA_klJ9j7A0VETUN1z9Tl49_QKOKd9XwrgD6yJ9EgHC35gmfMdHBZzOMmQJpYQauyROEC-Wi6hjlhcHaSFJRp9JFO0wSEg2S39P_yhkdLwnZNCHk" />
            <span className="font-headline-md text-headline-md font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Finance Class</span>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] px-container-margin pt-24 pb-32 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="z-10 text-center mb-10">
            <img alt="Finance Class Large Logo" className="w-20 h-20 mx-auto mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_6obasz_CWvbd5QKbkmDVgLJKUsB8yP2RkAkksCbRawwWhmyjiRF4J9aGGRX3rzC2EX04Fc8nS6hUW2qur9Y63ft9XgNzeQDnVrGFWIPTC9Wj9iSe6R5dZStc1qNxP3K-xnbG3uMJ6Po9UfE1AiJeV24CBOpJA_klJ9j7A0VETUN1z9Tl49_QKOKd9XwrgD6yJ9EgHC35gmfMdHBZzOMmQJpYQauyROEC-Wi6hjlhcHaSFJRp9JFO0wSEg2S39P_yhkdLwnZNCHk" />
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-2">
                Bem-vindo ao futuro das suas finanças
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                Gestão inteligente, segurança elite e precisão tecnológica em um só lugar.
            </p>
        </div>

        <div className="z-10 w-full max-w-md glass-card rounded-xl p-8 shadow-2xl">
            <div className="flex p-1 bg-surface-container-low rounded-full mb-8 relative">
                <div 
                  className="absolute h-10 w-[calc(50%-4px)] bg-primary-container rounded-full transition-all duration-300 ease-out z-0" 
                  style={{ transform: tab === 'login' ? 'translateX(0)' : 'translateX(calc(100% + 4px))' }}
                ></div>
                <button className={`flex-1 py-2 text-center font-label-md text-label-md relative z-10 transition-colors duration-300 ${tab === 'login' ? 'text-on-primary-container' : 'text-on-surface-variant'}`} onClick={() => {setTab('login'); setError('');}}>Entrar</button>
                <button className={`flex-1 py-2 text-center font-label-md text-label-md relative z-10 transition-colors duration-300 ${tab === 'register' ? 'text-on-primary-container' : 'text-on-surface-variant'}`} onClick={() => {setTab('register'); setError('');}}>Criar Conta</button>
            </div>

            {error && (
              <div className="bg-error-container/20 border border-error/50 text-error p-3 rounded-lg mb-6 text-sm text-center">
                {error}
              </div>
            )}

            {tab === 'login' && (
              <form className="space-y-6" onSubmit={handleLogin}>
                  <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">E-mail</label>
                      <div className="relative group">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                          <input className="w-full bg-surface-container-highest/30 border-b border-outline-variant focus:border-primary outline-none py-3 pl-10 pr-4 rounded-t-lg font-body-md text-body-md transition-all focus:bg-surface-container-highest/50" placeholder="nome@exemplo.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <div className="flex justify-between items-center">
                          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Senha</label>
                          <a className="font-label-sm text-label-sm text-primary hover:opacity-80" href="#">Esqueci minha senha</a>
                      </div>
                      <div className="relative group">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                          <input className="w-full bg-surface-container-highest/30 border-b border-outline-variant focus:border-primary outline-none py-3 pl-10 pr-4 rounded-t-lg font-body-md text-body-md transition-all focus:bg-surface-container-highest/50" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                  </div>
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2d5bff] to-[#6e06d0] text-on-primary-container font-headline-md text-headline-md font-bold shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50" type="submit" disabled={loading}>
                      {loading ? "Aguarde..." : "Entrar na Conta"}
                  </button>
              </form>
            )}

            {tab === 'register' && (
              <form className="space-y-6" onSubmit={handleRegister}>
                  <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Nome Completo</label>
                      <div className="relative group">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">person</span>
                          <input className="w-full bg-surface-container-highest/30 border-b border-outline-variant focus:border-primary outline-none py-3 pl-10 pr-4 rounded-t-lg font-body-md text-body-md transition-all focus:bg-surface-container-highest/50" placeholder="Seu Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">E-mail</label>
                      <div className="relative group">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                          <input className="w-full bg-surface-container-highest/30 border-b border-outline-variant focus:border-primary outline-none py-3 pl-10 pr-4 rounded-t-lg font-body-md text-body-md transition-all focus:bg-surface-container-highest/50" placeholder="nome@exemplo.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Senha</label>
                      <div className="relative group">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                          <input className="w-full bg-surface-container-highest/30 border-b border-outline-variant focus:border-primary outline-none py-3 pl-10 pr-4 rounded-t-lg font-body-md text-body-md transition-all focus:bg-surface-container-highest/50" placeholder="Mínimo 8 caracteres" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                  </div>
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2d5bff] to-[#6e06d0] text-on-primary-container font-headline-md text-headline-md font-bold shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50" type="submit" disabled={loading}>
                      {loading ? "Criando..." : "Começar Agora"}
                  </button>
              </form>
            )}

            <div className="relative my-8 text-center">
                <span className="relative z-10 px-4 bg-[#131313] text-on-surface-variant font-label-sm text-label-sm">Ou entre com</span>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant -z-0"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-outline-variant bg-surface-container hover:bg-surface-bright transition-colors active:scale-95 duration-200">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    <span className="font-label-md text-label-md">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-outline-variant bg-surface-container hover:bg-surface-bright transition-colors active:scale-95 duration-200">
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.96 0-2.04-.6-3.23-.6s-2.27.56-3.23.56c-1.38 0-4.27-2.72-4.27-7.15 0-4.33 2.83-6.63 5.51-6.63 1.41 0 2.61.48 3.5.48s1.98-.48 3.39-.48c1.19 0 4.54.47 4.54 3.23-.12.07-2.14 1.25-2.14 3.47 0 2.72 2.45 3.69 2.45 3.69-.02.04-.38 1.28-1.28 2.62-.77 1.15-1.57 2.31-2.87 2.31zM14.67 4.41c0-1.11.44-2.16 1.22-2.94a4.11 4.11 0 0 1 3.01-1.22c.11 1.22-.38 2.37-1.11 3.22-.73.85-1.92 1.46-3.04 1.34a3.83 3.83 0 0 1-.08-.4z"></path>
                    </svg>
                    <span className="font-label-md text-label-md">Apple</span>
                </button>
            </div>
        </div>
      </main>
    </div>
  );
}
