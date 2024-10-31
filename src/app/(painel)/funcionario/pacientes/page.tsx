import Navbar from "@/components/ui/navbar";
import TabelaPaciente from "@/components/ui/tabela-paciente";

export default function PatientPage() {
  return (
    <div className="flex flex-col w-full">
      
      <Navbar 
        h1="Pacientes"
        buttons={[
          { type: "download", label: "Download", iconClass: "bi bi-download" },
          { type: "addPaciente", label: "Adicionar Paciente", iconClass: "bi bi-plus" },
        ]}
        downloadOptions={["patients", "employees", "clinics"]}
      />
      
      <div className="-ml-2 mt-4">
        <TabelaPaciente />
      </div>
    </div>
  );
}
