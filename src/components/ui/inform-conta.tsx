// components/AccountInfoForm.tsx
'use client';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

type UserData = {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function AccountInfoForm() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Função para buscar os dados do usuário
    async function fetchUserData() {
      try {
        // Obtém o token de autenticação dos cookies
        const cookies = parseCookies();
        const token = cookies.authToken;

        if (!token) {
          console.error('Token de autenticação não encontrado');
          return;
        }

        const response = await fetch('/api/users/getUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          console.error('Erro ao buscar dados do usuário:', data.error);
          return;
        }

        // Define os dados do usuário, garantindo que cada campo tenha um valor string ou string vazia
        setUserData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || ''
        });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <h2 className="font-semibold mb-7">Informações da Conta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Digite o seu primeiro nome"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="border border-gray-200 text-sm shadow-sm rounded-lg p-3 w-full h-9"
        />
        <input
          type="text"
          placeholder="Digite o seu sobrenome"
          value={userData.name.split(' ')[1] || ''} // Se houver sobrenome
          onChange={(e) => {
            const firstName = userData.name.split(' ')[0] || '';
            setUserData({ ...userData, name: `${firstName} ${e.target.value}` });
          }}
          className="border border-gray-200 text-sm shadow-sm rounded-lg p-3 w-full h-9"
        />
        <input
          type="email"
          placeholder="Digite o seu e-mail"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="border border-gray-200 text-sm shadow-sm rounded-lg p-3 w-full h-9"
        />
        <input
          type="tel"
          placeholder="(00) 00000-0000"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          className="border border-gray-200 text-sm shadow-sm rounded-lg p-3 w-full h-9"
        />
        <input
          type="text"
          placeholder="Digite o seu endereço completo"
          value={userData.address}
          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
          className="border border-gray-200 text-sm shadow-sm rounded-lg p-3 w-full md:col-span-2 h-9"
        />
      </div>
      <button className="mt-4 ml-[520px] bg-azulAps text-white text-sm py-2 px-3 rounded-lg">
        Salvar alterações
      </button>
    </div>
  );
}
