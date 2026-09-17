import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShipmentService {
  constructor(private prismaService: PrismaService) {}

  async createShipment(
    createShipmentDto: CreateShipmentDto,
  ): Promise<{ trackingNumber: string; status: string }> {
    const trackingNumber = randomUUID();

    const createdShipment = await this.prismaService.shipment.create({
      data: {
        trackingNumber: trackingNumber,
        senderName: createShipmentDto.senderName,
        senderFacility: createShipmentDto.senderFacility,
        recipientName: createShipmentDto.recipientName,
        recipientFacility: createShipmentDto.recipientFacility,
        weight: createShipmentDto.weight,
      },
    });

    return {
      trackingNumber: createdShipment.trackingNumber,
      status: createdShipment.status,
    };
  }
}
