import Navbar from "@/components/ui/navbar";

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
          activePath: '/funcionario/seguranca',
        }}
      />
      <div className="p-6">
        <p>Conteúdo da Configuração...</p>
      </div>
    </div>
  );
}
