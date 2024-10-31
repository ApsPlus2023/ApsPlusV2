import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken'; 

export async function GET(request: Request) {
  try {
    const cookies = parseCookies();
    const token = cookies.authToken;

    if (!token) {
      return NextResponse.json({ error: 'Token de autenticação não encontrado' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decoded as { id: string }).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: true,
        employee: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    return NextResponse.json({ error: 'Erro ao buscar o usuário' }, { status: 500 });
  }
}
