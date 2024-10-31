import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const {
      nomeCompleto,
      nomeSocial,
      rg,
      cpf,
      dataNascimento,
      genero,
      racaCor,
      telefone,
      email,
      estadoCivil,
      profissao,
      cep,
      endereco,
      bairro,
      cidade,
      estado,
      numero,
      numeroConvenio,
      relacaoComTitular,
      plano,
    } = await request.json();

    // Verifica se o usuário já existe pelo email ou CPF
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Usuário com este email ou CPF já existe.' },
        { status: 400 }
      );
    }

    // Criação do usuário com role definida como string
    const user = await prisma.user.create({
      data: {
        email,
        cpf,
        name: nomeCompleto,
        phone: telefone,
        role: "PATIENT",  // Define como string
      },
    });

    // Criação do paciente vinculado ao usuário recém-criado
    const patient = await prisma.patient.create({
      data: {
        userId: user.id,
        fullName: nomeCompleto,
        socialName: nomeSocial,
        rg,
        birthDate: new Date(dataNascimento),
        gender: genero,
        selfDeclaredColor: racaCor,
        maritalStatus: estadoCivil,
        profession: profissao,
        zipCode: cep,
        address: endereco,
        addressNumber: numero,
        district: bairro,
        city: cidade,
        state: estado,
        insuranceNumber: numeroConvenio,
        insuranceRelation: relacaoComTitular,
        insurancePlan: plano,
      },
    });

    return NextResponse.json(
      { message: 'Paciente cadastrado com sucesso.', patient },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    return NextResponse.json(
      { error: 'Erro ao cadastrar paciente. Verifique o log do servidor.' },
      { status: 500 }
    );
  }
}
