import { Prisma, PrismaClient, Tech, TechInProject } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { datatype } from 'faker';
import { AbstractFactory } from './abstract.factory';

type TechInProjectInput = Partial<Prisma.TechInProjectCreateInput>;

export class TechInProjectFactory extends AbstractFactory<TechInProject> {
  constructor(protected readonly prismaClient: PrismaService) {
    super();
  }

  async make(input: TechInProjectInput): Promise<TechInProject> {
    return this.prismaClient.techInProject.create({
      data: {
        uuid: datatype.uuid(),
        project: input.project,
        tech: input.tech,
      },
    });
  }

  async makeMany(
    factorial: number,
    input: TechInProjectInput = {},
  ): Promise<TechInProject[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)));
  }
}
