'use client';

import { useState } from 'react';
import InputMask from 'react-input-mask';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    profissao: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateStep1 = () => {
    const step1Errors: string[] = [];
    if (!formData.nome) step1Errors.push('nome');
    if (!formData.cpf) step1Errors.push('cpf');
    if (!formData.telefone) step1Errors.push('telefone');
    if (!formData.email) step1Errors.push('email');
    if (!formData.profissao) step1Errors.push('profissao');
    setErrors(step1Errors);
    return step1Errors.length === 0;
  };

  const validateStep2 = () => {
    const step2Errors: string[] = [];
    if (!formData.cep) step2Errors.push('cep');
    if (!formData.endereco) step2Errors.push('endereco');
    if (!formData.numero) step2Errors.push('numero');
    if (!formData.bairro) step2Errors.push('bairro');
    if (!formData.cidade) step2Errors.push('cidade');
    if (!formData.estado) step2Errors.push('estado');
    setErrors(step2Errors);
    return step2Errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep2()) {
      try {
        const response = await fetch("/api/employees/createEmployees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: formData.nome,
            cpf: formData.cpf,
            telefone: formData.telefone,
            email: formData.email,
            profissao: formData.profissao,
            cep: formData.cep,
            endereco: formData.endereco,
            numero: formData.numero,
            complemento: formData.complemento,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
          }),
        });

        if (response.ok) {
          toast({
            title: "Funcionário cadastrado com sucesso!",
            description: "O cadastro foi concluído e o e-mail foi enviado.",
            variant: "success",
            action: <ToastAction altText="Fechar" />,
          });
          onClose();
          setFormData({
            nome: '',
            cpf: '',
            telefone: '',
            email: '',
            profissao: '',
            cep: '',
            endereco: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro ao cadastrar funcionário.");
        }
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message || "Ocorreu um erro durante o cadastro.",
          variant: "destructive",
          action: <ToastAction altText="Fechar" />,
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        <h1 className="mb-5 text-xl font-semibold">Adicionar Funcionário</h1>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Nome Completo <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('nome') ? 'border-red-600' : ''}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CPF <span className="text-red-600">*</span></label>
                <InputMask
                  mask="999.999.999-99"
                  value={formData.cpf}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cpf') ? 'border-red-600' : ''}`}
                  name="cpf"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefone <span className="text-red-600">*</span></label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('telefone') ? 'border-red-600' : ''}`}
                  name="telefone"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-mail <span className="text-red-600">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('email') ? 'border-red-600' : ''}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Profissão <span className="text-red-600">*</span></label>
                <select
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('profissao') ? 'border-red-600' : ''}`}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Médico">Médico</option>
                  <option value="Enfermeiro">Enfermeiro</option>
                  <option value="Atendente">Atendente</option>
                </select>
              </div>
              <div className="col-span-2 flex justify-end space-x-4 mt-4">
                <button className="bg-red-400 px-4 py-2 rounded text-white" onClick={onClose}>Cancelar</button>
                <button className="px-4 py-2 bg-azulAps text-white rounded-lg font-medium text-sm" onClick={() => validateStep1() && setStep(2)}>Próximo</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">CEP <span className="text-red-600">*</span></label>
                <InputMask
                  mask="99999-999"
                  value={formData.cep}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cep') ? 'border-red-600' : ''}`}
                  name="cep"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Endereço <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('endereco') ? 'border-red-600' : ''}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Número <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('numero') ? 'border-red-600' : ''}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Complemento</label>
                <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bairro <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('bairro') ? 'border-red-600' : ''}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cidade <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cidade') ? 'border-red-600' : ''}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Estado <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.includes('estado') ? 'border-red-600' : ''}`}
                  required
                />
              </div>
              <div className="col-span-2 flex justify-end space-x-4 mt-4">
                <button className="px-4 py-2 bg-gray-200 text-black rounded-lg font-medium text-sm" onClick={() => setStep(1)}>Voltar</button>
                <button className="bg-red-400 px-4 py-2 rounded text-white" onClick={onClose}>Cancelar</button>
                <button className="px-4 py-2 bg-azulAps text-white rounded-lg font-medium text-sm" type="submit">Salvar</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
