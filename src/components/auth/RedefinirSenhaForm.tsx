'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputWithIcon from "@/components/ui/input";


export default function RedefinirSenhaForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
     
      <form className="mt-8 space-y-6 w-full max-w-md">
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
              placeholder="Confirme sua nova senha"
              type="password"
              icon="bi-eye"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-azulAps focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Redefinir senha
          </button>
        </div>
      </form>
    </>
  );
}
