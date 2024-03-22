import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class OrderService {
  private kafka: Kafka;
  private producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'order-service',
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async createOrder(orderData: any) {
    const order = {
      id: Math.random().toString(36).substring(7),
      ...orderData,
    };

    // Publicar evento de pedido no tópico 'order-created'
    await this.producer.connect();
    await this.producer.send({
      topic: 'order-created',
      messages: [{ value: JSON.stringify(order) }],
    });

    await this.producer.disconnect();

    return order;
  }
}
