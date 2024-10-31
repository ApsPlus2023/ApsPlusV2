import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Senha criada com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);

    return NextResponse.json({ error: "Erro ao atualizar senha" }, { status: 500 });
  }
}
