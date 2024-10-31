import Navbar from "@/components/ui/navbar";

export default function AgendaPage() {
  return (
    <div className="flex flex-col w-full">
      <Navbar 
        h1="Agenda"
        buttons={[
          { type: "download", label: "Download", iconClass: "bi bi-download" },
        ]}
        downloadOptions={["patients", "employees", "clinics"]}
      />

      <div className="p-6">
        <p>Conteúdo da Agenda...</p>
      </div>
    </div>
  );
}
