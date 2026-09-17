import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentModule } from './shipment/shipment.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ShipmentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
