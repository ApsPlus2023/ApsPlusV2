'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputWithIcon from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setCookie } from 'nookies';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Erro de login",
          description: data.error || 'Erro ao fazer login',
          variant: "destructive",
        });
        return;
      }

      const { token, userType } = data;

      setCookie(null, 'authToken', token, {
        maxAge: 60 * 60 * 24 * 7, // expira em 1 semana
        path: '/',
      });

      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando...",
        variant: "success",
      });

      if (userType === 'paciente') {
        router.push('/paciente/dash');
      } else if (userType === 'funcionario') {
        router.push('/funcionario/agenda');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast({
        title: "Erro de login",
        description: "Erro ao fazer login. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <form className="mt-8 space-y-6 w-full max-w-md" onSubmit={handleLogin}>
        <div className="rounded-md shadow-sm space-y-5">
          <div className="relative">
            <p className="text-sm font-medium text-gray-600 mb-1">E-mail</p>
            <InputWithIcon
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mt-3">
            <p className="text-sm font-medium text-gray-600 mb-1">Senha</p>
            <InputWithIcon
              placeholder="Digite sua senha"
              type="password"
              icon="bi-eye"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <div className="text-sm -mt-5">
            <a href="/esqueci-a-senha" className="font-medium text-azulAps hover:underline">
              Esqueceu a senha?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-azulAps focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}
