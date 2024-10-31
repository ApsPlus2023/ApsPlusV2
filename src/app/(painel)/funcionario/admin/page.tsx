// /funcionario/admin/page.tsx
import Navbar from "@/components/ui/navbar";
import AdminCards from "@/components/ui/cards-admin";
import TabelaFuncionario from "@/components/ui/tabela-funcionario";

export default function AdminPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Navbar no topo */}
      <Navbar 
        h1="Administração"
        buttons={[
          { type: "download", label: "Download", iconClass: "bi bi-download" },
          { type: "addClinica", label: "Adicionar Clínica", iconClass: "bi bi-plus" },
          { type: "addFuncionario", label: "Adicionar Funcionário", iconClass: "bi bi-plus" },
        ]}
        downloadOptions={["patients", "employees", "clinics"]}
      />

      <div className="-ml-2 -mt-2">
        
        <AdminCards />
      </div>

      
      <div className="-ml-2 mt-4">
        <TabelaFuncionario />
      </div>
    </div>
  );
}
