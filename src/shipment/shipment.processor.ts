import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ShipmentStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';

@Processor('shipment-simulation')
export class ShipmentProcessor extends WorkerHost {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async process(job: Job) {
    await this.updateShipmentStatus(job.data.id, job.data.nextStatus);
  }

  async updateShipmentStatus(id: string, nextStatus: ShipmentStatus) {
    await this.prismaService.shipment.update({
      where: {
        id: id,
      },
      data: {
        status: nextStatus,
      },
    });
  }
}
