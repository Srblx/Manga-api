import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class CounterRequestGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('counterRequest') // plus utile car on ne recoit rien du front
  sendCounterRequest(@MessageBody('number') payload: number): number {
    this.server.emit('counterRequest', payload);
    return payload;
  }
}
