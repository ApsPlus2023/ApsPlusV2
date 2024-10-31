
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface PatientWithUser {
  id: string;
  user: {
    phone: string | null;
  };
  fullName: string;
  socialName?: string;
  rg?: string;
  birthDate: Date;
  gender: string;
  selfDeclaredColor?: string;
  maritalStatus?: string;
  profession?: string;
  zipCode: string;
  address: string;
  addressNumber: string;
  district: string;
  city: string;
  state: string;
  insuranceNumber?: string;
  insuranceRelation?: string;
  insurancePlan?: string;
}

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        user: true, 
      },
    });

    const formattedPatients = patients.map((patient: PatientWithUser, index: number) => ({
      id: patient.id,
      nomeCompleto: patient.fullName,
      codigo: `#PC${String(index + 1).padStart(3, '0')}`,
      cidade: patient.city,
      status: "Ativo",
      telefone: patient.user.phone || "",
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
