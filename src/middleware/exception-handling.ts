// src/common/filters/all-exceptions.filter.ts
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        // let message =
        //     exception instanceof HttpException
        //         ? exception.getResponse()
        //         : (exception as any)?.message || 'Internal server error';

        let message = (exception as any)?.message || 'Internal server error';


        // Log the full stack or the message
        this.logger.error(
            typeof message === 'string' ? message : JSON.stringify(message),
            (exception as any)?.stack,
        );


        response.status(status).json({
            // statusCode: status,
            path: request.url,
            error: message,
        });
    }
}
