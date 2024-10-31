import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface EmployeeWithUser {
  id: string;
  user: {
    name: string;
  };
  profession: string;
  phone: string;
  zipCode: string;
  address: string;
  city: string;
  state: string;
  district: string;
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        user: true,
      },
    });

    
    const professionMap: Record<string, string> = {
      ADMIN: "Administrador",
      DOCTOR: "Médico",
      NURSE: "Enfermeiro",
      ATTENDANT: "Atendente",
      PATIENT: "Paciente",
    };

    const formattedEmployees = employees.map((employee: EmployeeWithUser, index: number) => ({
      id: employee.id,
      nome: employee.user.name,
      codigo: `#FC${String(index + 1).padStart(3, '0')}`,
      profissao: professionMap[employee.profession] || employee.profession, 
      status: "Ativo",
      telefone: employee.phone,
      avatarColor: "bg-gray-300", 
      cep: employee.zipCode,
      endereco: employee.address,
      cidade: employee.city,
      estado: employee.state,
      bairro: employee.district,
    }));

    
    return NextResponse.json(formattedEmployees, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    return NextResponse.json({ message: "Erro ao buscar funcionários." }, { status: 500 });
  }
}
