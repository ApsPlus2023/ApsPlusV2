'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './modal-addfuncionario';
import ModalClinica from './modal-addclinica';
import ModalPatients from './modal-addpaciente';

type ButtonType = 'download' | 'addFuncionario' | 'addClinica' | 'addPaciente';
type DownloadOption = 'patients' | 'employees' | 'clinics';

type ButtonProps = {
  type: ButtonType;
  label: string;
  iconClass?: string;
};

type ConfigMenuItem = {
  label: string;
  path: string;
};

type NavbarProps = {
  h1: string;
  buttons?: ButtonProps[];
  downloadOptions?: DownloadOption[];
  configMenu?: { items: ConfigMenuItem[]; activePath: string };
};

export default function Navbar({
  h1,
  buttons,
  downloadOptions = [],
  configMenu,
}: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isClinicaModalOpen, setIsClinicaModalOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const router = useRouter();

  const toggleDownloadMenu = () => setIsDownloadMenuOpen((prev) => !prev);

  const handleDownloadCSV = (type: DownloadOption) => {
    const endpointMap: { [key in DownloadOption]: string } = {
      patients: `${process.env.NEXT_PUBLIC_API_URL}/download/patients`,
      employees: `${process.env.NEXT_PUBLIC_API_URL}/download/employees`,
      clinics: `${process.env.NEXT_PUBLIC_API_URL}/download/clinics`,
    };

    const endpoint = endpointMap[type];

    fetch(endpoint)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Erro ao baixar o arquivo');
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}.csv`;
        a.click();
      })
      .catch((error) => {
        console.error('Erro ao baixar o arquivo:', error);
      });
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleButtonClick = (type: ButtonType) => {
    switch (type) {
      case 'download':
        toggleDownloadMenu();
        break;
      case 'addFuncionario':
        setIsModalOpen(true);
        break;
      case 'addClinica':
        setIsClinicaModalOpen(true);
        break;
      case 'addPaciente':
        setIsPatientModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-white py-6 px-6 rounded-md shadow-sm">
        {/* Título e Menu de Configurações */}
        <div className="flex items-center space-x-8">
          <h1 className="text-lg font-semibold select-text">{h1}</h1>
          {/* Menu de configurações */}
          {configMenu && (
            <div className="flex space-x-8">
              {configMenu.items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`text-sm font-medium ${
                    item.path === configMenu.activePath
                      ? 'text-black border-b-[1.6px] border-azulAps pb-2'
                      : 'text-gray-400 opacity-70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Botões (Alinhados à Direita) */}
        <div className="flex items-center space-x-4">
          {buttons?.map((button, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => handleButtonClick(button.type)}
                className={`${
                  button.type === 'download'
                    ? 'border border-gray-300 text-gray-900 text-xs px-5 py-2 rounded-lg font-medium flex items-center gap-x-2'
                    : 'bg-azulAps text-white text-xs px-3 py-2 rounded-lg font-medium flex items-center gap-x-2'
                }`}
              >
                <i className={button.iconClass}></i> {button.label}
              </button>

              {/* Menu suspenso de download */}
              {button.type === 'download' && isDownloadMenuOpen && (
                <div className="absolute top-full mt-1 left-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul>
                    {downloadOptions.map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleDownloadCSV(option)}
                      >
                        {option === 'patients' && 'Pacientes'}
                        {option === 'employees' && 'Funcionários'}
                        {option === 'clinics' && 'Clínicas'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {isPatientModalOpen && (
        <ModalPatients isOpen={isPatientModalOpen} onClose={() => setIsPatientModalOpen(false)} />
      )}
      {isClinicaModalOpen && (
        <ModalClinica isOpen={isClinicaModalOpen} onClose={() => setIsClinicaModalOpen(false)} />
      )}
    </>
  );
}
