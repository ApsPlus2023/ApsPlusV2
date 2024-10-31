import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('id');

    if (!employeeId) {
      return NextResponse.json({ error: "ID do funcionário não fornecido." }, { status: 400 });
    }

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      select: { userId: true },
    });

    if (!employee) {
      return NextResponse.json({ error: "Funcionário não encontrado." }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id: employee.userId },
    });

    return NextResponse.json({ message: "Funcionário e usuário excluídos com sucesso." }, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao deletar funcionário:", error);

    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Funcionário não encontrado." }, { status: 404 });
    }

    return NextResponse.json({ error: "Erro ao excluir funcionário." }, { status: 500 });
  }
}
