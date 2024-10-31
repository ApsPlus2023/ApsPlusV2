'use client';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "./logo";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); 
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  };

  const handleLinkClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botão de Menu para Mobile */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 focus:outline-none"
        >
          <i className="bi bi-list text-2xl"></i> {/* Ícone de Menu */}
        </button>
      </div>

      {/* Sidebar para Telas Grandes */}
      <div className="hidden md:flex w-64 flex-col h-screen bg-white border-r-[1.5px] border-[#C6C8CA] overflow-y-auto">
        <div className="flex justify-center p-4 mt-5 mb-5">
          <Logo size={160} />
        </div>
        <SidebarContent handleLinkClick={handleLinkClick} pathname={pathname} handleLogout={handleLogout} />
      </div>

      {/* Sidebar para Mobile como Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex w-64 flex-col h-full bg-white border-r-[1.5px] border-[#C6C8CA] overflow-y-auto">
            <div className="flex justify-between p-4">
              <Logo size={160} />
              <button onClick={() => setIsOpen(false)} className="text-gray-600">
                <i className="bi bi-x-lg text-2xl"></i> {/* Ícone de Fechar */}
              </button>
            </div>
            <SidebarContent handleLinkClick={handleLinkClick} pathname={pathname} handleLogout={handleLogout} />
          </div>

          {/* Fundo Branco ao lado do Drawer */}
          <div className="flex-1 bg-white" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}

// Definindo os tipos das props do SidebarContent
interface SidebarContentProps {
  handleLinkClick: (path: string) => void;
  pathname: string;
  handleLogout: () => void;
}

// Componente separado para o conteúdo da Sidebar
function SidebarContent({ handleLinkClick, pathname, handleLogout }: SidebarContentProps) {
  return (
    <div className="mx-4 flex-grow">
      <div className="flex flex-col p-4 space-y-7 font-semibold text-md">
        <a 
          onClick={() => handleLinkClick("/funcionario/agenda")}
          className={`flex items-center space-x-2 cursor-pointer ${
            pathname === "/funcionario/agenda" ? "text-azulAps" : "text-gray-600"
          }`}
        >
          <i className={`bi bi-calendar3 w-5 h-5 font-bold ${
            pathname === "/funcionario/agenda" ? "text-azulAps" : "text-[#A0AEC0]"
          }`}></i>
          <span>Agenda</span>
        </a>

        <a 
          onClick={() => handleLinkClick("/funcionario/coordenacao")}
          className={`flex items-center space-x-2 cursor-pointer ${
            pathname === "/funcionario/coordenacao" ? "text-azulAps" : "text-gray-600"
          }`}
        >
          <i className={`bi bi-bar-chart-line w-5 h-5 ${
            pathname === "/funcionario/coordenacao" ? "text-azulAps" : "text-[#A0AEC0]"
          }`}></i>
          <span>Coordenação</span>
        </a>

        <a 
          onClick={() => handleLinkClick("/funcionario/pacientes")}
          className={`flex items-center space-x-2 cursor-pointer ${
            pathname === "/funcionario/pacientes" ? "text-azulAps" : "text-gray-600"
          }`}
        >
          <i className={`bi bi-person-bounding-box w-5 h-5 ${
            pathname === "/funcionario/pacientes" ? "text-azulAps" : "text-[#A0AEC0]"
          }`}></i>
          <span>Pacientes</span>
        </a>

        <a 
          onClick={() => handleLinkClick("/funcionario/admin")}
          className={`flex items-center space-x-2 cursor-pointer ${
            pathname === "/funcionario/admin" ? "text-azulAps" : "text-gray-600"
          }`}
        >
          <i className={`bi bi-briefcase w-5 h-5 ${
            pathname === "/funcionario/admin" ? "text-azulAps" : "text-[#A0AEC0]"
          }`}></i>
          <span>Administração</span>
        </a>

        <a 
          onClick={() => handleLinkClick("/dashboard/gestao")}
          className={`flex items-center space-x-2 cursor-pointer ${
            pathname === "/dashboard/gestao" ? "text-azulAps" : "text-gray-600"
          }`}
        >
          <i className={`bi bi-people w-5 h-5 ${
            pathname === "/dashboard/gestao" ? "text-azulAps" : "text-[#A0AEC0]"
          }`}></i>
          <span>Gestão</span>
        </a>
      </div>

      <div className="w-full border-t-[1.2px] border-[#C6C8CA] my-7"></div>

      {/* Seção de Conversas */}
      <div className="p-3">
        <div className="flex gap-2 items-center mb-7">
          <span 
            onClick={() => handleLinkClick("/conversas")}
            className={`text-gray-500 font-semibold text-sm cursor-pointer ${
              pathname === "/conversas" ? "text-azulAps" : ""
            }`}
          >
            CONVERSAS
          </span>
          <span 
            onClick={() => handleLinkClick("/conversas/novo")}
            className="text-white font-medium bg-azulAps py-[0.5px] px-2 rounded-lg text-xs cursor-pointer"
          >
            Novo Chat
          </span>
        </div>
      </div>

      {/* Seção de Configurações e Conta */}
      <div className="p-3 space-y-6 mt-10 mb-7 font-semibold text-md">
        <a 
          onClick={() => handleLinkClick("/funcionario/seguranca")}
          className={`flex items-center space-x-2 cursor-pointer ${
            pathname === "/funcionario/seguranca" ? "text-azulAps" : "text-gray-600"
          }`}
        >
          <i className={`bi bi-gear w-5 h-5 ${
            pathname === "/funcionario/seguranca" ? "text-azulAps" : "text-[#A0AEC0]"
          }`}></i>
          <span>Configuração</span>
        </a>
        <a 
          onClick={() => handleLinkClick("/funcionario/configuracao")}
          className={`flex items-center space-x-2 cursor-pointer ${
            pathname === "/funcionario/configuracao" ? "text-azulAps" : "text-gray-600"
          }`}
        >
          <i className={`bi bi-person-circle w-5 h-5 ${
            pathname === "/funcionario/configuracao" ? "text-azulAps" : "text-[#A0AEC0]"
          }`}></i>
          <span>Sua Conta</span>
        </a>
        <a 
          onClick={handleLogout} 
          className="flex items-center space-x-2 text-gray-600 cursor-pointer"
        >
          <i className="bi bi-box-arrow-right w-5 h-5 text-[#A0AEC0]"></i>
          <span>Sair</span>
        </a>
      </div>
    </div>
  );
}
