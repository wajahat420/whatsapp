// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseEventsService } from './mongoose-events.service';

@Module({
    imports: [
        // Load .env variables
        ConfigModule.forRoot({
            isGlobal: true, // Makes config available across app without importing repeatedly
        }),

        // Connect to MongoDB
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MongooseEventsService],
})
export class DatabaseModule { }
