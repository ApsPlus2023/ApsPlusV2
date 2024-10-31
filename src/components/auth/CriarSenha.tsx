// components/auth/CriarSenha.tsx
'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputWithIcon from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function CriarSenha() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const response = await fetch("/api/users/setPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        toast({
          title: "Senha criada com sucesso!",
          description: "Agora você pode fazer login.",
          variant: "success",
        });
        router.push("/login");
      } else {
        throw new Error("Erro ao criar senha");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar a senha.",
        variant: "destructive",
      });
    }
  };  

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 w-full max-w-md">
      <div className="rounded-md shadow-sm space-y-5">
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
        <div className="relative mt-3">
          <p className="text-sm font-medium text-gray-600 mb-1">Confirme sua senha</p>
          <InputWithIcon
            placeholder="Confirme sua senha"
            type="password"
            icon="bi-eye"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-azulAps focus:outline-none"
        >
          Criar senha
        </button>
      </div>
    </form>
  );
}
