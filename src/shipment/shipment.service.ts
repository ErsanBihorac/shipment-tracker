import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueueService } from 'src/queue/queue.service';

@Injectable()
export class ShipmentService {
  constructor(
    private prismaService: PrismaService,
    private queueService: QueueService,
  ) {}

  async getShipmentById(id: string) {
    const shipment = await this.prismaService.shipment.findUnique({
      where: {
        id: id,
      },
    });

    if (!shipment) {
      throw new NotFoundException(`Order with id ${id} does not exist`);
    }

    return shipment;
  }

  async getAllShipments() {
    const shipments = await this.prismaService.shipment.findMany();

    if (!shipments) {
      throw new NotFoundException(`Orders not found`);
    }

    return shipments;
  }

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

    //simulation start
    await this.queueService.scheduleShipmentSimulation(createdShipment.id);

    return {
      trackingNumber: createdShipment.trackingNumber,
      status: createdShipment.status,
    };
  }
}
