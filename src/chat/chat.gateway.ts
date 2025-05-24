import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: 'chat', cors: true })
export class ChatGateway {
    @WebSocketServer() server: Server;

    constructor(private readonly chatService: ChatService) { }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('message', data);
    }

    @SubscribeMessage('joinRoom')
    joinRoom(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket) {
        client.join(data.room);
        client.emit('joinedRoom', data.room);
    }

    @SubscribeMessage('sendToRoom')
    handleSendToRoom(@MessageBody() data: { room: string, message: string }, @ConnectedSocket() client: Socket) {
        client.to(data.room).emit('roomMessage', data.message);
    }
}
