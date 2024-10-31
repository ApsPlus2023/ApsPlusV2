'use client';

import { useState } from 'react';
import InputMask from 'react-input-mask';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalClinica({ isOpen, onClose }: ModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nomeClinica: '',
    telefone: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  // Função para buscar o endereço com base no CEP
  const fetchAddressByCEP = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData((prevData) => ({
          ...prevData,
          endereco: data.logradouro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          endereco: '',
          cidade: '',
          estado: '',
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      setFormData((prevData) => ({
        ...prevData,
        endereco: '',
        cidade: '',
        estado: '',
      }));
    }
  };

  // Função handleChange para atualizar o estado com o valor formatado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cep') {
      formattedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP
      if (formattedValue.length === 8) {
        fetchAddressByCEP(formattedValue); // Busca o endereço automaticamente quando o CEP for completo
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  // Função para validar os campos obrigatórios
  const validateForm = () => {
    const formErrors: string[] = [];
    if (!formData.nomeClinica) formErrors.push('nomeClinica');
    if (!formData.telefone) formErrors.push('telefone');
    if (!formData.cep) formErrors.push('cep');
    if (!formData.endereco) formErrors.push('endereco');
    if (!formData.cidade) formErrors.push('cidade');
    if (!formData.estado) formErrors.push('estado');

    setErrors(formErrors);
    return formErrors.length === 0;
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      toast({
        title: "Clínica cadastrada com sucesso!",
        description: "O cadastro foi concluído.",
        variant: "success",
        action: <ToastAction altText="Fechar" />,
      });

      setTimeout(() => {
        onClose(); // Fecha o modal após o toast de sucesso
      }, 500);

      // Limpa os campos do formulário
      setFormData({
        nomeClinica: '',
        telefone: '',
        cep: '',
        endereco: '',
        cidade: '',
        estado: '',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white w-full max-w-[70%] md:max-w-[600px] p-6 rounded-lg shadow-lg">
        {/* Botão de Fechar no canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1 className="mb-5 text-xl font-semibold">Adicionar Clínica</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome da Clínica */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Nome da Clínica <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="nomeClinica"
                value={formData.nomeClinica}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.includes('nomeClinica') ? 'border-red-600' : ''}`}
                required
              />
            </div>

            {/* Telefone da Clínica */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Telefone <span className="text-red-600">*</span>
              </label>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.includes('telefone') ? 'border-red-600' : ''}`}
                name="telefone"
                required
              />
            </div>

            {/* CEP */}
            <div>
              <label className="block text-sm font-medium mb-2">
                CEP <span className="text-red-600">*</span>
              </label>
              <InputMask
                mask="99999-999"
                value={formData.cep}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cep') ? 'border-red-600' : ''}`}
                name="cep"
                required
              />
            </div>

            {/* Endereço */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Endereço <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.includes('endereco') ? 'border-red-600' : ''}`}
                required
                readOnly
              />
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Cidade <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cidade') ? 'border-red-600' : ''}`}
                required
                readOnly
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Estado <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.includes('estado') ? 'border-red-600' : ''}`}
                required
                readOnly
              />
            </div>

            {/* Botões de Ação */}
            <div className="col-span-2 flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-400 px-4 py-2 rounded text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-azulAps px-4 py-2 rounded text-white"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
