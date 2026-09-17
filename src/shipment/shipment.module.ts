import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipmentProcessor } from './shipment.processor';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [QueueModule],
  providers: [ShipmentService, PrismaService, ShipmentProcessor],
  controllers: [ShipmentController],
})
export class ShipmentModule {}
