'use client';

import { useState } from "react";
import TabelaFuncionario from "@/components/ui/tabela-funcionario";
import { useToast } from "@/hooks/use-toast";

interface Clinica {
  id: number;
  nome: string;
  codigo: string;
  cidade: string;
  status: string;
  telefone: string;
  avatarColor: string;
}

// Função para formatar o telefone (aplicando máscara)
const formatTelefone = (telefone: string) => {
  const cleanedValue = telefone.replace(/\D/g, '');
  return cleanedValue.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "+55 ($1) $2-$3");
};

export default function TabelaClinica() {
  const [clinicas, setClinicas] = useState<Clinica[]>([
    // Dados de exemplo
    { id: 1, nome: "Clínica A", codigo: "#CL001", cidade: "São Paulo", status: "Ativo", telefone: "11987654321", avatarColor: "bg-gray-300" },
    { id: 2, nome: "Clínica B", codigo: "#CL002", cidade: "Rio de Janeiro", status: "Inativo", telefone: "21987654321", avatarColor: "bg-orange-300" },
    // Adicione mais dados de exemplo conforme necessário
  ]);
  const [mostrarFuncionarios, setMostrarFuncionarios] = useState(false);
  const { toast } = useToast();

  const handleMostrarFuncionarios = () => {
    setMostrarFuncionarios(true);
  };

  // Função para simular a exclusão de uma clínica com toast de confirmação
  const excluirClinica = (id: number) => {
    setClinicas((prev) => prev.filter((clinica) => clinica.id !== id));
    toast({
      title: "Clínica excluída com sucesso!",
      description: "A clínica foi removida da lista.",
      variant: "success"
    });
  };

  if (mostrarFuncionarios) {
    return <TabelaFuncionario />;
  }

  return (
    <div className={`rounded-xl w-[990px] h-[300px] bg-white ml-5 overflow-y-auto shadow`}>
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold mb-4 ml-3">
            Clínicas - Total de {clinicas.length} clínicas cadastradas.
          </h2>
          <div className="flex space-x-4 mb-3 mr-3">
            {/* Botão para visualizar funcionários */}
            <button
              onClick={handleMostrarFuncionarios}
              className="font-semibold text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg"
            >
              Visualizar Funcionários
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">NOME</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Código</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">CIDADE</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Status</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Telefone</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Ações</th>
              </tr>
            </thead>
            <tbody className="font-regular text-sm">
              {clinicas.map((clinica, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 flex items-center space-x-3">
                    <span className={`inline-block h-8 w-8 rounded-full ${clinica.avatarColor}`}></span>
                    <span className="font-semibold">{clinica.nome}</span>
                  </td>
                  <td className="p-3">{clinica.codigo}</td>
                  <td className="p-3">{clinica.cidade}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-[6px] rounded-md text-xs font-medium ${
                        clinica.status === "Ativo" ? "bg-[#4AAE8C] text-white" : "bg-[#F16063] text-white"
                      }`}
                    >
                      {clinica.status}
                    </span>
                  </td>
                  <td className="p-3">{formatTelefone(clinica.telefone)}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => excluirClinica(clinica.id)} 
                      className="bg-white font-semibold text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-500 mt-3 ml-3">
          Mostrando {clinicas.length} itens de {clinicas.length} resultados encontrados.
        </div>
      </div>
    </div>
  );
}
