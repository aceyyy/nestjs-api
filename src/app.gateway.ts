import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    // adjust if needed
    origin: "*",
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log('Received message:', payload);
    return 'Hello from server';
  }

  sendMessage(event: string, message: any) {
    console.log("EVENT", event, "message", message);
    this.server.emit(event, message);
  }
}