'use client'
import { useState } from "react";
import { Search, Play } from "lucide-react"; 

interface User {
  name: string;
  role: string;
  status: "Disponível" | "Atendimento";
  duration: string;
  notifications?: number;
  avatarColor: string;
}

const users: User[] = [
  { name: "Leandro", role: "Administração", status: "Disponível", duration: "00:31:00", avatarColor: "bg-black" },
  { name: "Lizandra", role: "Médica", status: "Atendimento", duration: "00:31:00", notifications: 1, avatarColor: "bg-gray-500" },
  { name: "Andrey", role: "Médico", status: "Disponível", duration: "00:31:00", avatarColor: "bg-orange-500" },
];

export default function SideChat() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 p-4 border-[1.9px] rounded-2xl bg-gray-100">
      <h2 className="text-lg font-medium mb-4">Mensagens</h2>
      
      {/* Campo de Pesquisa */}
      <div className="relative mb-4">
        <input 
          type="text" 
          placeholder="Pesquisar chat" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 pl-10 rounded-lg border-[1.9px] text-gray-700 placeholder-gray-400 bg-gray-100"
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
      </div>

      {/* Lista de Usuários */}
      <div className="space-y-3">
        {filteredUsers.map((user, index) => (
          <div 
            key={index} 
            className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
              user.notifications ? "bg-indigo-50" : ""
            }`}
          >
            {/* Avatar com status */}
            <div className="relative">
              <div className={`w-10 h-10 ${user.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                {user.name[0]}
              </div>
              <span 
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                  user.status === "Disponível" ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>

            {/* Informações do Usuário */}
            <div className="ml-3 flex-grow">
              <h3 className="text-sm font-semibold text-gray-800">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>

            {/* Status e Ações */}
            <div className="text-right">
              <p className="text-xs text-gray-500">{user.duration}</p>
              {user.notifications ? (
                <span className="flex items-center justify-center text-[10px] font-semibold text-white bg-azulAps w-5 h-5 rounded-full">
                  {user.notifications}
                </span>
              ) : (
                <Play className="text-azulAps" size={16} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
