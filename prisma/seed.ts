import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { techs } from './seeds/techs';
const prisma = new PrismaClient();

async function main() {
  Logger.log('seeding...');
  techs.map(async (tech) => {
    await prisma.tech.create({
      data: {
        name: tech.name,
      },
    });
  });
}

main()
  .catch((e) => {
    Logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
