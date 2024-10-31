'use client';

import { useState } from 'react';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { X } from 'lucide-react';


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalPatients({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    nomeSocial: '',
    rg: '',
    cpf: '',
    dataNascimento: '',
    genero: '',
    racaCor: '',
    telefone: '',
    email: '',
    estadoCivil: '',
    profissao: '',
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    numeroConvenio: '',
    relacaoComTitular: '',
    plano: '',
  });

  const [showEditCard, setShowEditCard] = useState(false); // Controla a exibição do card
  const [mensagemEditada, setMensagemEditada] = useState("Olá, seu cadastro foi concluído com sucesso!"); // Armazena a mensagem editada
  const { toast } = useToast();

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.code === 'Space') {
      e.preventDefault(); // Evita o comportamento padrão
      setMensagemEditada((prev) => prev + ' {{nome}}');
    }
  };

  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1); // Controle de etapas

  // Função para formatar CPF
  const formatCPF = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      .slice(0, 14);
  };

  // Função para formatar telefone
  const formatTelefone = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      .slice(0, 15);
  };

  // Função para formatar RG
  const formatRG = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length <= 8) {
      return cleanedValue
        .replace(/(\d{2})(\d{3})(\d{3})(\d{0,1})/, '$1.$2.$3-$4')
        .slice(0, 12); // RG com 8 dígitos
    } else {
      return cleanedValue
        .replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
        .slice(0, 13); // RG com 9 dígitos
    }
  };

  // Função para buscar o endereço completo usando o CEP
  const fetchAddressByCEP = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData((prevData) => ({
          ...prevData,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          endereco: '',
          bairro: '',
          cidade: '',
          estado: '',
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      setFormData((prevData) => ({
        ...prevData,
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
      }));
    }
  };

  // Função handleChange para atualizar o estado com o valor formatado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    } else if (name === 'rg') {
      formattedValue = formatRG(value);
    } else if (name === 'cep') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length === 8) {
        fetchAddressByCEP(formattedValue); // Busca o endereço automaticamente quando o CEP for completo
      }
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  // Validação dos campos obrigatórios
  const validateStep1 = () => {
    const step1Errors: string[] = [];
    if (!formData.nomeCompleto) step1Errors.push('nomeCompleto');
    if (!formData.cpf) step1Errors.push('cpf');
    if (!formData.dataNascimento) step1Errors.push('dataNascimento');
    if (!formData.genero) step1Errors.push('genero');
    if (!formData.racaCor) step1Errors.push('racaCor');

    setErrors(step1Errors);
    return step1Errors.length === 0;
  };

  const validateStep2 = () => {
    const step2Errors: string[] = [];
    if (!formData.telefone) step2Errors.push('telefone');
    if (!formData.email) step2Errors.push('email');
    if (!formData.estadoCivil) step2Errors.push('estadoCivil');
    if (!formData.profissao) step2Errors.push('profissao');

    setErrors(step2Errors);
    return step2Errors.length === 0;
  };

  const validateStep3 = () => {
    const step3Errors: string[] = [];
    if (!formData.cep) step3Errors.push('cep');
    if (!formData.endereco) step3Errors.push('endereco');
    if (!formData.numero) step3Errors.push('numero');
    if (!formData.bairro) step3Errors.push('bairro');
    if (!formData.cidade) step3Errors.push('cidade');
    if (!formData.estado) step3Errors.push('estado');

    setErrors(step3Errors);
    return step3Errors.length === 0;
  };

  const validateStep4 = () => {
    const step4Errors: string[] = [];
    if (!formData.numeroConvenio) step4Errors.push('numeroConvenio');
    if (!formData.relacaoComTitular) step4Errors.push('relacaoComTitular');
    if (!formData.plano) step4Errors.push('plano');

    setErrors(step4Errors);
    return step4Errors.length === 0;
  };

  const formatarMensagem = (mensagem: string, nome: string) => {
    return mensagem.replace('{{nome}}', nome);
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep4()) {
      try {
        const response = await fetch('/api/patients/createPatients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          toast({
            title: "Erro ao cadastrar paciente",
            description: data.error || "Erro inesperado.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Paciente cadastrado com sucesso!",
          description: "Os dados foram salvos.",
          variant: "success",
        });

        setTimeout(() => onClose(), 500);
      } catch (error) {
        console.error('Erro:', error);
        toast({
          title: "Erro de requisição",
          description: "Erro ao conectar ao servidor.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`bg-white w-full max-w-[70%] md:max-w-[700px] p-6 rounded-lg shadow-lg relative ${step === 4 ? 'md:-top-[15%]' : 'md:top-0'}`}>
          {/* Botão de Fechar (X) */}
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>

          <h1 className="mb-5 text-xl font-semibold">Adicionar Paciente</h1>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Nome Completo <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('nomeCompleto') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nome Social (opcional)</label>
                  <input
                    type="text"
                    name="nomeSocial"
                    value={formData.nomeSocial}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">RG <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="rg"
                    value={formData.rg}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CPF <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cpf') ? 'border-red-600' : ''}`}
                    maxLength={14}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Data de Nascimento <span className="text-red-600">*</span></label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('dataNascimento') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gênero <span className="text-red-600">*</span></label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('genero') ? 'border-red-600' : ''}`}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Raça/Cor Autodeclarada <span className="text-red-600">*</span></label>
                  <select
                    name="racaCor"
                    value={formData.racaCor}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('racaCor') ? 'border-red-600' : ''}`}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Branca">Branca</option>
                    <option value="Preta">Preta</option>
                    <option value="Parda">Parda</option>
                    <option value="Amarela">Amarela</option>
                    <option value="Indígena">Indígena</option>
                  </select>
                </div>

                <div className="col-span-2 flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-[#F16063] text-white rounded-lg font-medium text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) setStep(2);
                    }}
                    className="px-4 py-2 bg-azulAps text-white rounded-lg font-medium text-sm"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('telefone') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email <span className="text-red-600">*</span></label>
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
                  <label className="block text-sm font-medium mb-2">Estado Civil <span className="text-red-600">*</span></label>
                  <select
                    name="estadoCivil"
                    value={formData.estadoCivil}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('estadoCivil') ? 'border-red-600' : ''}`}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Solteiro(a)">Solteiro(a)</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Divorciado(a)">Divorciado(a)</option>
                    <option value="Viúvo(a)">Viúvo(a)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Profissão <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="profissao"
                    value={formData.profissao}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('profissao') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div className="col-span-2 flex justify-between space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-gray-200 text-black rounded-lg font-medium text-sm"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep2()) setStep(3);
                    }}
                    className="px-4 py-2 bg-azulAps text-white rounded-lg font-medium text-sm"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">CEP <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('cep') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Endereço <span className="text-red-600">*</span></label>
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
                  <label className="block text-sm font-medium mb-2">Bairro <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('bairro') ? 'border-red-600' : ''}`}
                    required
                    readOnly
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
                    readOnly
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
                    readOnly
                  />
                </div>

                <div className="col-span-2 flex justify-between space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-gray-200 text-black rounded-lg font-medium text-sm"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep3()) setStep(4);
                    }}
                    className="px-4 py-2 bg-azulAps text-white rounded-lg font-medium text-sm"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Número do Convênio <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="numeroConvenio"
                    value={formData.numeroConvenio}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('numeroConvenio') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Relação com o Titular do Convênio <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="relacaoComTitular"
                    value={formData.relacaoComTitular}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('relacaoComTitular') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Plano</label>
                  <input
                    type="text"
                    name="plano"
                    value={formData.plano}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg ${errors.includes('plano') ? 'border-red-600' : ''}`}
                    required
                  />
                </div>

                <div className="col-span-2 flex justify-between space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 bg-gray-200 text-black rounded-lg font-medium text-sm"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-azulAps text-white rounded-lg font-medium text-sm"
                  >
                    Salvar
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="flex -mb-0 mr-1 items-center font-semibold justify-center border-[1.5px] border-[#C6C8CA] bg-white text-black text-xs px-3 py-2 rounded-lg hover:bg-gray-300 transition"
                      onClick={() => setShowEditCard(true)} // Adiciona um estado para controlar a exibição do card
                    >
                      <i className="bi bi-pencil"></i> {/* Ícone de lápis da biblioteca Bootstrap Icons */}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const numeroFormatado = formData.telefone.replace(/\D/g, '');
                        const mensagemFormatada = formatarMensagem(mensagemEditada, formData.nomeCompleto); // Substitui {{nome}} pelo nome do paciente
                        const urlWhatsApp = `https://api.whatsapp.com/send?phone=55${numeroFormatado}&text=${mensagemFormatada}`;
                      window.open(urlWhatsApp, '_blank');
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm"
                    >
                      Enviar Mensagem
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showEditCard && (
              <div className="absolute z-50 bg-white shadow-lg p-4 rounded-lg top-[95%] left-0 w-full">
                <h3 className="font-semibold text-sm mb-2">Editar Mensagem</h3>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  rows={4}
                  value={mensagemEditada}
                  onChange={(e) => setMensagemEditada(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                />
                  <small className="text-gray-500"></small>
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg"
                    onClick={() => setShowEditCard(false)} // Fecha o card
                  >
                    Salvar
                  </button>
                  <button
                    className="px-3 py-1 text-sm font-medium text-black bg-gray-200 rounded-lg"
                    onClick={() => setShowEditCard(false)} // Cancela a edição e fecha o card
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
