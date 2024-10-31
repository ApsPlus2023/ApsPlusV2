import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Interface para descrever o relacionamento entre Patient e User
interface PatientWithUser {
  id: string;
  fullName: string;
  city: string;
  zipCode: string;
  address: string;
  district: string;
  state: string;
  user: {
    phone: string | null;
  };
}

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        user: true, // Inclui os dados do usuário relacionado
      },
    });

    // Mapeamento para formatar os dados
    const formattedPatients = patients.map((patient, index) => ({
      id: patient.id,
      nomeCompleto: patient.fullName,
      codigo: `#PC${String(index + 1).padStart(3, '0')}`,
      cidade: patient.city,
      status: "Ativo", // Exemplo de status estático, ajuste conforme necessário
      telefone: patient.user?.phone || "", // Usa o telefone do usuário, se disponível
      cep: patient.zipCode,
      endereco: patient.address,
      bairro: patient.district,
      estado: patient.state,
    }));

    return NextResponse.json(formattedPatients, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar pacientes.' },
      { status: 500 }
    );
  }
}
