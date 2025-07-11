import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './logger/winston-logger.service';
import { AllExceptionsFilter } from './middleware/exception-handling';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose']
    });

    app.enableCors({
        origin: ['http://wajahatsarwat.com', 'http://localhost:3000'],
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
    })

    const logger = app.get(WinstonLogger);
    app.useLogger(logger);

    app.useGlobalFilters(new AllExceptionsFilter(logger));

    await app.listen(5000);
}
bootstrap();
