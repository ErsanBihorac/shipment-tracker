import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ShipmentStatus } from 'generated/prisma/enums';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('shipment-simulation') private shipmentSimulationQueue: Queue,
  ) {}

  async scheduleShipmentSimulation(id: string) {
    await this.shipmentSimulationQueue.add(
      'statusChange',
      {
        nextStatus: ShipmentStatus.IN_TRANSIT,
        id: id,
      },
      {
        delay: 5000,
      },
    );

    await this.shipmentSimulationQueue.add(
      'statusChange',
      {
        nextStatus: ShipmentStatus.DELIVERED,
        id: id,
      },
      {
        delay: 10000,
      },
    );
  }
}
