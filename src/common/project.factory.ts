import { Prisma, PrismaClient, Project } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { datatype, internet, name, random } from 'faker';
import { AbstractFactory } from './abstract.factory';

type ProjectInput = Partial<Prisma.ProjectCreateInput>;

export class ProjectFactory extends AbstractFactory<Project> {
  constructor(protected readonly prismaClient: PrismaService) {
    super();
  }

  async make(input: ProjectInput): Promise<Project> {
    return this.prismaClient.project.create({
      data: {
        uuid: input.uuid ?? datatype.uuid(),
        name: input.name ?? name.firstName(),
        startDate: input.startDate ?? '2025-12-11T02:13:34.634Z',
        status: input.status ?? 'TODO',
      },
    });
  }

  async makeMany(
    factorial: number,
    input: ProjectInput = {},
  ): Promise<Project[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)));
  }
}
