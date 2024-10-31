// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  // Primeiro administrador
  const password1 = await bcrypt.hash("Pietro@272", saltRounds);
  await prisma.user.upsert({
    where: { email: "pietrosantos@blockcode.online" },
    update: {},
    create: {
      email: "pietrosantos@blockcode.online",
      password: password1,
      name: "Pietro Santos",
      cpf: "12345678901", // CPF fictício
      role: "ADMIN",
      employee: {
        create: {
          fullName: "Pietro Santos",
          phone: "0000000000",
          profession: "ADMIN",
          zipCode: "00000-000",
          address: "Rua Exemplo",
          addressNumber: "100",
          district: "Centro",
          city: "Cidade Exemplo",
          state: "Estado Exemplo",
        },
      },
    },
  });

  // Segundo administrador
  const password2 = await bcrypt.hash("Le@ndroSilv@2101", saltRounds);
  await prisma.user.upsert({
    where: { email: "leandroafsilva84@gmail.com" },
    update: {},
    create: {
      email: "leandroafsilva84@gmail.com",
      password: password2,
      name: "Leandro Silva",
      cpf: "10987654321", // CPF fictício
      role: "ADMIN",
      employee: {
        create: {
          fullName: "Leandro Silva",
          phone: "1111111111",
          profession: "ADMIN",
          zipCode: "00000-000",
          address: "Avenida Exemplo",
          addressNumber: "200",
          district: "Bairro Exemplo",
          city: "Cidade Exemplo",
          state: "Estado Exemplo",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
