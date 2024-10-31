// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { patient: true, employee: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const isPasswordValid = user.password && await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
    }

    // Verifica se o usuário é paciente ou funcionário
    const userType = user.patient ? 'paciente' : 'funcionario';
    const userRole = user.role;

    // Gera o token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: userRole,
        type: userType,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna o token e o tipo de usuário para o frontend
    return NextResponse.json({ token, userType, userRole });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
