import Navbar from "@/components/ui/navbar";
import SideChat from "@/components/ui/sidechat";
import Chat from "@/components/ui/chat"; // Importe o componente Chat

export default function ConversasPage() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar h1="Conversas" />

      <div className="flex flex-grow mt-5 ml-2 space-x-2">
        
        {/* Sidebar de Conversas */}
        <SideChat />

        {/* Conteúdo Principal - Componente de Chat */}
        <div className="flex-grow -ml-2">
          <Chat />
        </div>
      </div>
    </div>
  );
}
