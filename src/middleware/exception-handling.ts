// src/common/filters/all-exceptions.filter.ts
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WinstonLogger } from 'src/logger/winston-logger.service';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: WinstonLogger) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;

        let message = 'Internal server error';
        if (exception instanceof HttpException) {
            const res = exception.getResponse();
            message = typeof res === 'string'
                ? res
                : (res as any).message || JSON.stringify(res);
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        const log = {
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            statusCode: status,
            message,
            ip: request.ip || request.headers['x-forwarded-for'] || 'unknown',
            stack: exception instanceof Error ? exception.stack : undefined,
        };

        this.logger.error('Exception caught', log);

        response.status(status).json({
            statusCode: status,
            timestamp: log.timestamp,
            path: request.url,
            message,
        });
    }
}
