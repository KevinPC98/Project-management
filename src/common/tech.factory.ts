import { Prisma, PrismaClient, Tech } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { datatype, name } from 'faker';
import { AbstractFactory } from './abstract.factory';

type TechtInput = Partial<Prisma.TechCreateInput>;

export class TechFactory extends AbstractFactory<Tech> {
  constructor(protected readonly prismaClient: PrismaService) {
    super();
  }

  async make(input: TechtInput): Promise<Tech> {
    return this.prismaClient.tech.create({
      data: {
        uuid: input.uuid ?? datatype.uuid(),
        name: input.name ?? name.firstName(),
      },
    });
  }

  async makeMany(factorial: number, input: TechtInput = {}): Promise<Tech[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)));
  }
}
