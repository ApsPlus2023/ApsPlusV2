// src/app/api/employees/createEmployees/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Especifique o host correto
  port: 587,                  // Porta 587 para TLS (STARTTLS)
  secure: false,              // `secure` deve ser `false` para TLS na porta 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,    // Habilita o modo de depuração
  logger: true,   // Habilita o log completo
});

export async function POST(request: Request) {
  try {
    const { nome, cpf, telefone, email, profissao, cep, endereco, numero, complemento, bairro, cidade, estado } = await request.json();

    // Validação das variáveis de ambiente
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Variáveis de ambiente para o email não estão configuradas.");
    }

    // Mapeamento de profissões em português para valores esperados pelo Prisma
    const professionMap: Record<string, string> = {
      Administrador: "ADMIN",
      Médico: "DOCTOR",
      Enfermeiro: "NURSE",
      Atendente: "ATTENDANT",
      Paciente: "PATIENT",
    };

    const role = professionMap[profissao];
    if (!role) {
      return NextResponse.json({ error: `Profissão inválida: ${profissao}` }, { status: 400 });
    }

    // Verifica se o email e o CPF já estão cadastrados
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { cpf }] },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Usuário com este email ou CPF já existe." }, { status: 400 });
    }

    // Cria o usuário associado ao funcionário
    const user = await prisma.user.create({
      data: {
        email,
        cpf,
        name: nome,
        phone: telefone,
        role,  // Usa o valor mapeado
      },
    });

    // Cria o funcionário associado ao usuário criado
    const employee = await prisma.employee.create({
      data: {
        userId: user.id,
        fullName: nome,
        phone: telefone,
        profession: role,
        zipCode: cep,
        address: endereco,
        addressNumber: numero,
        district: bairro,
        city: cidade,
        state: estado,
      },
    });

    // Configuração do conteúdo do e-mail
    const emailContent = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Bem-vindo ao sistema! Crie sua senha de acesso",
      html: `
        <p>Olá ${nome},</p>
        <p>Você foi cadastrado no sistema. Para acessar, crie uma senha clicando no botão abaixo:</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/criar-senha?email=${encodeURIComponent(email)}" style="display: inline-block; margin: 10px 0; padding: 10px 15px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 5px;">Criar Senha</a>
        <p>Atenciosamente,</p>
        <p>Equipe</p>
      `,
    };

    try {
      // Tenta enviar o e-mail
      await transporter.sendMail(emailContent);
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
      return NextResponse.json({
        message: "Funcionário cadastrado com sucesso, mas o e-mail não pôde ser enviado.",
        employee
      }, { status: 201 });
    }

    return NextResponse.json({ message: "Funcionário cadastrado com sucesso e e-mail enviado!", employee }, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar funcionário:", error);

    // Log específico para erros do Nodemailer
    if (error.response) {
      console.error("Erro específico do Nodemailer:", error.response);
    }

    return NextResponse.json({ error: "Erro ao cadastrar funcionário. Verifique o log do servidor." }, { status: 500 });
  }
}
