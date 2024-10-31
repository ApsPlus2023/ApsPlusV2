import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("id");

    if (!patientId) {
      return NextResponse.json(
        { error: "ID do paciente não fornecido." },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: { userId: true },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Paciente não encontrado." },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: { id: patient.userId },
    });

    return NextResponse.json(
      { message: "Paciente e usuário excluídos com sucesso." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao excluir paciente:", error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Paciente não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao excluir paciente." },
      { status: 500 }
    );
  }
}
