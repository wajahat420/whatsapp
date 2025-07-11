// src/logger/cloudwatch-logger.service.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-cloudwatch';

const isDevelopment = process.env.NODE_ENV === 'development';

const transports = [];

if (isDevelopment) {
    transports.push(new winston.transports.Console());
} else {
    transports.push(
        new (winston.transports as any).CloudWatch({
            logGroupName: 'whatsapp-backend-logs',
            logStreamName: 'backend-logs',
            awsRegion: 'ap-south-1',
        }),
    );
}


@Injectable()
export class WinstonLogger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports,
        });
    }

    log(message: string, meta?: any) {
        this.logger.info(message, meta);
    }

    error(message: string, meta?: any) {
        this.logger.error(message, meta);
    }

    warn(message: string, meta?: any) {
        this.logger.warn(message, meta);
    }
}
