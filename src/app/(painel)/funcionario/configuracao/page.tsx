import Navbar from "@/components/ui/navbar";
import ProfileUpload from "@/components/ui/profile-upload";
import AccountInfoForm from "@/components/ui/inform-conta";
import SettingsSwitches from "@/components/ui/switches";

export default function ConfigPage() {
  return (
    <div className="flex flex-col w-full">
      <Navbar
        h1="Configurações"
        configMenu={{
          items: [
            { label: 'Sua Conta', path: '/funcionario/configuracao' },
            { label: 'Segurança', path: '/funcionario/seguranca' },
          ],
          activePath: '/funcionario/configuracao', // Define o caminho ativo
        }}
      />
      
      <div className="flex flex-col items-center bg-gray-100 min-h-screen space-y-6 p-6">
        
        {/* Componente de Upload do Perfil */}
        <ProfileUpload />
        
        {/* Componente de Informações da Conta */}
        <AccountInfoForm />
        
        {/* Componente de Configurações com Switches */}
        <SettingsSwitches />
        
      </div>
    </div>
  );
}
