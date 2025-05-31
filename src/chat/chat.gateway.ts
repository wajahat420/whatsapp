import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger('MongoDB');

    @WebSocketServer() server: Server;

    constructor(private readonly chatService: ChatService) { }

    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId;

        client.join(String(userId))
        this.logger.log(`Client connected: ${client.id}, userId = ${userId}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // triggered for tests
    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        this.server.emit('message', data);
    }

    // triggered when the user open the chat of any user
    @SubscribeMessage('joinRoom')
    async joinRoom(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket) {
        client.join(String(data.room));

        client.to(data.room).emit('joinedRoom', 'user joined your room');
    }

    // triggered when user sends message 
    @SubscribeMessage('sendToRoom')
    handleSendToRoom(@MessageBody() data: { room: string, message: string }, @ConnectedSocket() client: Socket) {
        client.to(data.room).emit('roomMessage', data.message);
    }

}
