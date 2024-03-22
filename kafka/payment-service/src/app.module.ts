import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentService } from './payment/payment.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
