'use client';

import { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { useToast } from "@/hooks/use-toast";
import ConfirmDeleteModal from "@/components/ui/confirm-delete-modal"; // Importando o modal de confirmação
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Paciente {
  id: string;
  nomeCompleto: string;
  codigo: string;
  cidade: string;
  status: string;
  telefone: string;
  avatarColor: string;
  cep: string;
  endereco: string;
  bairro: string;
  estado: string;
}

export default function TabelaPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
  const { toast } = useToast();

  // Função para buscar os pacientes cadastrados do backend
  const fetchPacientes = async () => {
    try {
      const response = await fetch('/api/patients/getPatients');
      if (response.ok) {
        const data = await response.json();
        setPacientes(data);
      } else {
        toast({
          title: "Erro",
          description: "Erro ao buscar os pacientes.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar os pacientes.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const abrirModalExcluir = (paciente: Paciente) => {
    setPacienteSelecionado(paciente);
    setModalExcluirAberto(true);
  };

  const fecharModalExcluir = () => {
    setModalExcluirAberto(false);
    setPacienteSelecionado(null);
  };

  const excluirPaciente = async () => {
    if (pacienteSelecionado) {
      try {
        const response = await fetch(`/api/patients/deletePatients?id=${pacienteSelecionado.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPacientes((prev) => prev.filter((paciente) => paciente.id !== pacienteSelecionado.id));
          toast({
            title: "Paciente excluído com sucesso.",
            description: "O paciente foi removido da lista.",
            variant: "success",
          });
          fecharModalExcluir();
        } else {
          toast({
            title: "Erro ao excluir paciente",
            description: "Não foi possível excluir o paciente.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Erro:", error);
        toast({
          title: "Erro ao excluir paciente",
          description: "Ocorreu um erro ao excluir o paciente.",
          variant: "destructive",
        });
      }
    }
  };

  const exibirPaciente = (paciente: Paciente) => {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPacienteSelecionado(null);
  };

  return (
    <div className="rounded-xl w-[980px] h-[450px] bg-white ml-5 overflow-y-auto shadow">
      <div className="py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold mb-4 ml-3">
            Pacientes - Total de {pacientes.length} pacientes cadastrados.
          </h2>
          <button
            onClick={fetchPacientes}
            className="flex mb-3 mr-5 items-center font-semibold justify-center border-[1.5px] border-[#C6C8CA] bg-white text-black text-xs px-3 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <i className="bi bi-arrow-clockwise mr-2"></i>
            Recarregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">NOME</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Código</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Cep</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Cidade</th>
                <th className="text-left p-3 font-medium uppercase text-xs mr-4 text-[#8492A6]">Telefone</th>
                <th className="text-left p-3 font-medium uppercase text-xs text-[#8492A6]">Ações</th>
              </tr>
            </thead>
            <tbody className="font-regular text-sm">
              {pacientes.map((paciente, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 flex items-center space-x-3">
                    <span className={`inline-block h-8 w-8 rounded-full ${paciente.avatarColor}`}></span>
                    <span className="font-semibold">{paciente.nomeCompleto}</span>
                  </td>
                  <td className="p-3">{paciente.codigo}</td>
                  <td className="p-3">{paciente.cep}</td>
                  <td className="p-3">{paciente.cidade}</td>
                  <td className="p-3">
                    <InputMask
                      mask="+55 (99) 99999-9999"
                      value={paciente.telefone}
                      disabled
                      className="border-none bg-transparent"
                    />
                  </td>
                  <td className="p-3 flex space-x-3">
                    <button
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      onClick={() => abrirModalExcluir(paciente)}
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
                      onClick={() => exibirPaciente(paciente)}
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
          Mostrando {pacientes.length} itens de {pacientes.length} resultados encontrados.
        </div>
      </div>

      {/* Modal de Detalhes do Paciente */}
      {modalAberto && pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-[70%] md:max-w-[700px] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Detalhes do Paciente</h2>
            <p><strong>Nome Completo:</strong> {pacienteSelecionado.nomeCompleto}</p>
            <p><strong>Telefone:</strong> <InputMask mask="+55 (99) 99999-9999" value={pacienteSelecionado.telefone} disabled className="border-none bg-transparent"/></p>
            <p><strong>CEP:</strong> {pacienteSelecionado.cep}</p>
            <p><strong>Endereço:</strong> {pacienteSelecionado.endereco}, {pacienteSelecionado.bairro}</p>
            <p><strong>Cidade:</strong> {pacienteSelecionado.cidade}</p>
            <p><strong>Estado:</strong> {pacienteSelecionado.estado}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={fecharModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {pacienteSelecionado && (
        <ConfirmDeleteModal
          isOpen={modalExcluirAberto}
          onClose={fecharModalExcluir}
          onConfirm={excluirPaciente}
          entityName="paciente"
        />
      )}
    </div>
  );
}
