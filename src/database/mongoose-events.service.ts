// src/database/mongoose-events.service.ts
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';


@Injectable()
export class MongooseEventsService implements OnApplicationBootstrap {
    private readonly logger = new Logger('MongoDB');

    constructor(
        @InjectConnection() private readonly connection: Connection
    ) { }

    onApplicationBootstrap() {
        if (this.connection.readyState === 1) {
            this.logger.log('✅ MongoDB connected');
        } else {
            this.connection.once('open', () => {
                this.logger.log('✅ MongoDB connected (event)');
            });
        }

        this.connection.on('error', (err) => {
            this.logger.error(`❌ MongoDB connection error: ${err}`);
        });

        this.connection.on('disconnected', () => {
            this.logger.warn('⚠️ MongoDB disconnected');
        });
    }
}
