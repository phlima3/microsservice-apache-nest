import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class PaymentService {
  private kafka: Kafka;
  private consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'payment-service',
      brokers: ['localhost:9092'],
    });
    this.consumer = this.kafka.consumer({ groupId: 'payment-group' });
  }

  async processPayment(paymentData: any) {
    const paymentResult = { success: true, ...paymentData };
    return paymentResult;
  }

  async listenForOrderEvents() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'order-created' });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        // Processar evento de pedido
        const order = JSON.parse(message.value.toString());
        console.log('Received order event:', order);
        await this.processPayment(order);
      },
    });
  }
}
