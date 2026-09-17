import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentService } from './shipment.service';

@Controller('shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Post()
  createShipment(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentService.createShipment(createShipmentDto);
  }

  @Get()
  getShipments() {
    return this.shipmentService.getAllShipments();
  }

  @Get(':id')
  getShipmentById(@Param('id') id: string) {
    return this.shipmentService.getShipmentById(id);
  }
}
