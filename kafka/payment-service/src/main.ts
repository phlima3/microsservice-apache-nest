import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PaymentService } from './payment/payment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const paymentService = app.get(PaymentService);
  await paymentService.listenForOrderEvents();
  await app.listen(3000);
}
bootstrap();
