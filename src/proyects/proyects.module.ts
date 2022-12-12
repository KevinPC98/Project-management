import { Module } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { ProyectsController } from './proyects.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProyectsController],
  providers: [ProyectsService, PrismaService],
})
export class ProyectsModule {}
