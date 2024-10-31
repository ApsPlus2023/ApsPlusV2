// layout.tsx
import Sidebar from "@/components/ui/sidebar";

export default function FuncionarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#000]">
      <Sidebar />

      <div className="flex flex-col flex-grow overflow-auto bg-gray-100">
        {children}
      </div>
    </div>
  );
}
