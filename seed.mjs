import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@kingpinlogistics.com';
  const name = 'Admin Employee';
  const role = 'EMPLOYEE';
  const plainPassword = 'admin123';
  
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  
  const employee = await prisma.employee.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });
  
  console.log('Successfully seeded employee:', employee.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
