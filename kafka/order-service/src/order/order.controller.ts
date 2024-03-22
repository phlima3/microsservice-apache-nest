import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: any) {
    const createdOrder = await this.orderService.createOrder(orderData);
    return { message: 'Order created successfully', order: createdOrder };
  }
}
