import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async processPayment(@Body() paymentData: any) {
    const paymentResult = await this.paymentService.processPayment(paymentData);
    return {
      message: 'Payment processed successfully',
      payment: paymentResult,
    };
  }
}
