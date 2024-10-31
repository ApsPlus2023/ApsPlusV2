'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputWithIcon from "@/components/ui/input";


export default function EsqueciSenhaForm() {
  const [email, setEmail] = useState("");
 

  return (
    <>
     
      <form className="mt-8 space-y-6 w-full max-w-md">
        <div className="rounded-md shadow-sm space-y-5">
    
          <div className="relative mt-3">
            <p className="text-sm font-medium text-gray-600 mb-1">E-mail</p>
            <InputWithIcon
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-azulAps focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enviar código
          </button>
        </div>
      </form>
    </>
  );
}
