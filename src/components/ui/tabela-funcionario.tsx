// tabela-funcionario.tsx

'use client';

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast"; 
import { Toaster } from "@/components/ui/toaster";
import TabelaClinica from "@/components/ui/tabela-clinica";
import ConfirmDeleteModal from "@/components/ui/confirm-delete-modal";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Funcionario {
  id: number;
  nome: string;
  codigo: string;
  profissao: string;
  status: string;
  telefone: string;
  avatarColor: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  bairro: string;
}

const formatTelefone = (telefone: string) => {
  const cleanedValue = telefone.replace(/\D/g, '');
  return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, "+55 ($1) $2-$3");
};

export default function TabelaFuncionario() {
  const [mostrarClinicas, setMostrarClinicas] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);
  const { toast } = useToast();

  // Função para buscar os funcionários cadastrados do backend
  const fetchFuncionarios = async () => {
    try {
      const response = await fetch('/api/employees/getEmployees');
      if (response.ok) {
        const data = await response.json();
        setFuncionarios(data);
      } else {
        toast({
          title: "Erro ao carregar funcionários",
          description: "Não foi possível carregar a lista de funcionários.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro ao carregar funcionários",
        description: "Ocorreu um erro ao buscar a lista de funcionários.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const handleMostrarClinicas = () => {
    setMostrarClinicas(true);
  };

  const abrirModalExcluir = (funcionario: Funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setModalExcluirAberto(true);
  };

  const fecharModalExcluir = () => {
    setModalExcluirAberto(false);
    setFuncionarioSelecionado(null);
  };

  const excluirFuncionario = async () => {
    if (funcionarioSelecionado) {
      try {
        const response = await fetch(`/api/employees/deleteEmployees?id=${funcionarioSelecionado.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setFuncionarios((prev) => prev.filter((func) => func.id !== funcionarioSelecionado.id));
          toast({
            title: "Funcionário excluído com sucesso.",
            description: "O funcionário foi removido da lista.",
            variant: "success",
          });
          fecharModalExcluir();
        } else {
          toast({
            title: "Erro ao excluir funcionário",
            description: "Não foi possível excluir o funcionário.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Erro:", error);
        toast({
          title: "Erro ao excluir funcionário",
          description: "Ocorreu um erro ao excluir o funcionário.",
          variant: "destructive",
        });
      }
    }
  };

  if (mostrarClinicas) {
    return <TabelaClinica />;
  }

  return (
    <div className="rounded-xl w-[990px] h-[300px] bg-white ml-5 overflow-y-auto shadow">
      <Toaster />
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold mb-4 ml-3">
            Funcionários - Total de {funcionarios.length} funcionários cadastrados.
          </h2>
          <div className="flex space-x-4 mb-3 mr-3">
            <button
              onClick={fetchFuncionarios}
              className="flex items-center font-semibold justify-center border-[1.5px] border-[#C6C8CA] bg-white text-black text-xs px-3 py-1 rounded-lg hover:bg-gray-300 transition"
            >
              <i className="bi bi-arrow-clockwise mr-2"></i> 
              Recarregar
            </button>
            
            <button
              onClick={handleMostrarClinicas}
              className="font-semibold text-xs text-black border-[1.5px] border-[#C6C8CA] px-3 py-1 rounded-lg"
            >
              Visualizar Clínicas
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">NOME</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Código</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Profissão</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Status</th>
                <th className="text-left p-3 font-medium uppercase text-xs mr-4 text-[#8492A6]">Telefone</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Ações</th>
              </tr>
            </thead>
            <tbody className="font-regular text-sm">
              {funcionarios.map((funcionario, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 flex items-center space-x-3">
                    <span className={`inline-block h-8 w-8 rounded-full ${funcionario.avatarColor}`}></span>
                    <span className="font-semibold">{funcionario.nome}</span>
                  </td>
                  <td className="p-3">{funcionario.codigo}</td>
                  <td className="p-3">{funcionario.profissao}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-[6px] rounded-md text-xs font-medium ${
                        funcionario.status === "Ativo" ? "bg-[#4AAE8C] text-white" : "bg-[#F16063] text-white"
                      }`}
                    >
                      {funcionario.status}
                    </span>
                  </td>
                  <td className="p-3">{formatTelefone(funcionario.telefone)}</td>
                  <td className="p-3 flex space-x-3">
                    <button
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      onClick={() => abrirModalExcluir(funcionario)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <button
                      className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      onClick={() => alert('Inativar paciente')}
                    >
                      <i className="bi bi-dash-circle"></i>
                    </button>
                    <button
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      onClick={() => alert("Função de edição")}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-500 mt-3 ml-3">
          Mostrando {funcionarios.length} itens de {funcionarios.length} resultados encontrados.
        </div>
      </div>

      
      {funcionarioSelecionado && (
        <ConfirmDeleteModal
          isOpen={modalExcluirAberto}
          onClose={fecharModalExcluir}
          onConfirm={excluirFuncionario}
          entityName="funcionário"
        />
      )}
    </div>
  );
}
