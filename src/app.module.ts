import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentModule } from './shipment/shipment.module';
import { PrismaService } from './prisma/prisma.service';
import { BullModule } from '@nestjs/bullmq';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ShipmentModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
